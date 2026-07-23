import { getCounsellingScript, type CounsellingLang } from "./counselling.js";
import { renderableFact } from "./publish.js";
import type {
  Interaction,
  Molecule,
  Product,
  SafetyProfile,
  SourcedFact,
} from "./types.js";

/**
 * Build Spec §12 — Export & share: molecule monograph (print-ready HTML).
 * Assembles published facts only. Never invents doses, schedules, or imprints.
 */

export interface MonographSection {
  id: string;
  title: string;
  body: string;
  sourceId?: string;
  lastReviewed?: string;
}

export interface MonographPayload {
  title: string;
  moleculeName: string;
  moleculeSlug: string;
  className: string;
  therapeuticArea: string;
  sections: MonographSection[];
  omittedDraftTabs: string[];
  disclaimer: string;
  generatedAt: string;
  plainText: string;
  html: string;
}

export const MONOGRAPH_DISCLAIMER =
  "Materia educational monograph for reference and sharing. Not a prescription, not a SAMF/MIMS reproduction, and not a substitute for clinical judgement. Confirm every clinical decision against the labelled product and current SA guidance. Draft dosing is omitted until published.";

function publishedText(fact: SourcedFact<string> | undefined): {
  text: string;
  sourceId?: string;
  lastReviewed?: string;
} | null {
  if (!fact) return null;
  const r = renderableFact(fact);
  if (!r) return null;
  const text = String(r.value).trim();
  if (text.length < 4) return null;
  return { text, sourceId: fact.sourceId, lastReviewed: fact.lastReviewed };
}

function publishedList(
  facts: SourcedFact<string>[] | undefined,
): { text: string; sourceId?: string; lastReviewed?: string } | null {
  if (!facts?.length) return null;
  const lines: string[] = [];
  let sourceId: string | undefined;
  let lastReviewed: string | undefined;
  for (const f of facts) {
    const p = publishedText(f);
    if (!p) continue;
    lines.push(`• ${p.text}`);
    sourceId ??= p.sourceId;
    lastReviewed ??= p.lastReviewed;
  }
  if (!lines.length) return null;
  return { text: lines.join("\n"), sourceId, lastReviewed };
}

function publishedTrafficList(
  facts: Array<SourcedFact<{ level: string; text: string }>> | undefined,
): { text: string; sourceId?: string; lastReviewed?: string } | null {
  if (!facts?.length) return null;
  const lines: string[] = [];
  let sourceId: string | undefined;
  let lastReviewed: string | undefined;
  for (const f of facts) {
    const r = renderableFact(f);
    if (!r) continue;
    const v = r.value;
    const text = typeof v === "object" && v && "text" in v ? String(v.text) : "";
    if (!text.trim()) continue;
    const level = typeof v === "object" && v && "level" in v ? String(v.level) : "";
    lines.push(`• ${level ? `[${level}] ` : ""}${text.trim()}`);
    sourceId ??= f.sourceId;
    lastReviewed ??= f.lastReviewed;
  }
  if (!lines.length) return null;
  return { text: lines.join("\n"), sourceId, lastReviewed };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pushSection(
  sections: MonographSection[],
  omitted: string[],
  id: string,
  title: string,
  content: { text: string; sourceId?: string; lastReviewed?: string } | null,
): void {
  if (!content) {
    omitted.push(title);
    return;
  }
  sections.push({
    id,
    title,
    body: content.text,
    sourceId: content.sourceId,
    lastReviewed: content.lastReviewed,
  });
}

export function buildMoleculeMonograph(input: {
  molecule: Molecule;
  safety?: SafetyProfile | null;
  products?: Product[];
  interactions?: Interaction[];
  counsellingLang?: CounsellingLang;
}): MonographPayload | { error: string } {
  if (input.molecule.publishState !== "published") {
    return { error: "Molecule is not published." };
  }

  const sections: MonographSection[] = [];
  const omittedDraftTabs: string[] = [];
  const lang = input.counsellingLang ?? "en";

  sections.push({
    id: "identity",
    title: "Identity",
    body: [
      `INN: ${input.molecule.innName}`,
      `Class: ${input.molecule.className}`,
      `Therapeutic area: ${input.molecule.therapeuticArea}`,
      input.molecule.atcCode ? `ATC: ${input.molecule.atcCode}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  pushSection(sections, omittedDraftTabs, "chemistry", "Chemistry", publishedText(input.molecule.chemistrySummary));
  pushSection(sections, omittedDraftTabs, "moa", "Mechanism of action", publishedText(input.molecule.moaSummary));

  const products = (input.products ?? []).filter(
    (p) => p.moleculeId === input.molecule.id && p.publishState === "published" && !p.isDiscontinued,
  );
  if (products.length) {
    sections.push({
      id: "sa-products",
      title: "SA products & strengths",
      body: products
        .map((p) => {
          const flags = [
            p.isOriginator ? "originator" : null,
            p.bioequivalentFlag ? "bioequivalent flag" : null,
          ]
            .filter(Boolean)
            .join(", ");
          return `• ${p.brandName} — ${p.strength} ${p.form} (${p.schedule})${flags ? ` [${flags}]` : ""}`;
        })
        .join("\n"),
    });
  } else {
    omittedDraftTabs.push("SA products & strengths");
  }

  // High-stakes: only published dosing text; never invent if draft
  const dosingAdult = publishedText(input.safety?.dosingAdult);
  const dosingPaeds = publishedText(input.safety?.dosingPaediatric);
  if (dosingAdult || dosingPaeds) {
    sections.push({
      id: "dosing",
      title: "Dosing (published only)",
      body: [dosingAdult ? `Adult: ${dosingAdult.text}` : null, dosingPaeds ? `Paediatric: ${dosingPaeds.text}` : null]
        .filter(Boolean)
        .join("\n\n"),
      sourceId: dosingAdult?.sourceId ?? dosingPaeds?.sourceId,
      lastReviewed: dosingAdult?.lastReviewed ?? dosingPaeds?.lastReviewed,
    });
  } else {
    omittedDraftTabs.push("Dosing");
  }

  pushSection(
    sections,
    omittedDraftTabs,
    "contraindications",
    "Contraindications",
    publishedTrafficList(input.safety?.contraindications),
  );
  pushSection(sections, omittedDraftTabs, "warnings", "Warnings & monitoring", publishedList(input.safety?.warnings));
  pushSection(
    sections,
    omittedDraftTabs,
    "food-lifestyle",
    "Food & lifestyle",
    publishedText(input.safety?.foodLifestyle),
  );
  pushSection(sections, omittedDraftTabs, "pregnancy", "Pregnancy & breastfeeding", publishedText(input.safety?.pregnancy));

  const overdoseParts = [
    publishedText(input.safety?.overdoseEarlySigns),
    publishedText(input.safety?.overdoseSevereSigns),
    publishedText(input.safety?.antidoteOrSupportive),
  ].filter(Boolean) as Array<{ text: string; sourceId?: string; lastReviewed?: string }>;
  if (overdoseParts.length) {
    sections.push({
      id: "overdose",
      title: "Overdose & emergency",
      body: [
        "If overdose is suspected: call emergency services / Poisons Centre. Materia does not replace emergency care.",
        ...overdoseParts.map((p) => p.text),
      ].join("\n\n"),
      sourceId: overdoseParts[0]?.sourceId,
      lastReviewed: overdoseParts[0]?.lastReviewed,
    });
  } else {
    omittedDraftTabs.push("Overdose & emergency");
  }

  pushSection(sections, omittedDraftTabs, "pearls", "Clinical pearls", publishedList(input.safety?.clinicalPearls));

  const ix = (input.interactions ?? []).filter(
    (i) =>
      i.publishState === "published" &&
      (i.moleculeAId === input.molecule.id || i.moleculeBId === input.molecule.id),
  );
  if (ix.length) {
    sections.push({
      id: "interactions",
      title: "Drug interactions (published)",
      body: ix
        .map((i) => {
          const mech = publishedText(i.mechanism);
          const action = publishedText(i.action);
          return `• ${i.severity}${mech ? ` — ${mech.text}` : ""}${action ? ` (${action.text})` : ""}`;
        })
        .join("\n"),
    });
  } else {
    omittedDraftTabs.push("Drug interactions");
  }

  const script = getCounsellingScript(input.molecule.id, lang);
  if (script?.publishState === "published" && script.lines.length) {
    sections.push({
      id: "counselling",
      title: `Patient counselling (${lang})`,
      body: script.lines.map((l, i) => `${i + 1}. ${l}`).join("\n"),
    });
  } else {
    omittedDraftTabs.push("Patient counselling");
  }

  const generatedAt = new Date().toISOString();
  const title = `${input.molecule.innName} — Materia monograph`;
  const plainText = [
    title,
    `${input.molecule.className} · ${input.molecule.therapeuticArea}`,
    "",
    ...sections.flatMap((s) => [`## ${s.title}`, s.body, ""]),
    omittedDraftTabs.length
      ? `Omitted (not published yet): ${omittedDraftTabs.join("; ")}`
      : "",
    MONOGRAPH_DISCLAIMER,
    `Generated: ${generatedAt}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en-ZA">
<head><meta charset="utf-8"/><title>${escapeHtml(title)}</title>
<style>
  body{font-family:Georgia,"Times New Roman",serif;max-width:44rem;margin:2rem auto;padding:0 1rem;color:#14211c;line-height:1.55;background:#f7f4ef}
  h1{font-size:1.55rem;margin:0 0 .35rem;color:#0b3d36}
  h2{font-size:1.1rem;margin:1.6rem 0 .5rem;color:#0b3d36;border-bottom:1px solid #c9d5cf;padding-bottom:.25rem}
  .meta{color:#4a5c56;font-size:.92rem;margin-bottom:1.25rem}
  .section{white-space:pre-wrap;margin:0 0 .75rem}
  .omit{font-size:.88rem;color:#5c6b66;margin-top:1.5rem}
  .disclaimer{margin-top:2rem;padding-top:1rem;border-top:1px solid #c9d5cf;font-size:.86rem;color:#3d4f49}
  @media print{body{background:#fff;margin:0;max-width:none}}
</style></head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p class="meta">${escapeHtml(input.molecule.className)} · ${escapeHtml(input.molecule.therapeuticArea)} · Materia reference export</p>
  ${sections
    .map(
      (s) =>
        `<h2>${escapeHtml(s.title)}</h2><p class="section">${escapeHtml(s.body)}</p>${
          s.sourceId
            ? `<p class="meta">Source: ${escapeHtml(s.sourceId)}${s.lastReviewed ? ` · reviewed ${escapeHtml(s.lastReviewed)}` : ""}</p>`
            : ""
        }`,
    )
    .join("")}
  ${
    omittedDraftTabs.length
      ? `<p class="omit">Omitted (not published yet): ${escapeHtml(omittedDraftTabs.join("; "))}</p>`
      : ""
  }
  <p class="disclaimer">${escapeHtml(MONOGRAPH_DISCLAIMER)}</p>
  <p class="meta">Generated ${escapeHtml(generatedAt)}</p>
</body></html>`;

  return {
    title,
    moleculeName: input.molecule.innName,
    moleculeSlug: input.molecule.slug,
    className: input.molecule.className,
    therapeuticArea: input.molecule.therapeuticArea,
    sections,
    omittedDraftTabs,
    disclaimer: MONOGRAPH_DISCLAIMER,
    generatedAt,
    plainText,
    html,
  };
}
