import type { CounsellingLang } from "./counselling.js";
import type { Molecule } from "./types.js";

export interface HandoutPayload {
  title: string;
  moleculeName: string;
  moleculeSlug: string;
  lang: CounsellingLang;
  lines: string[];
  disclaimer: string;
  generatedAt: string;
  /** Plain text + simple HTML for print/share — PDF later */
  plainText: string;
  html: string;
}

export const HANDOUT_DISCLAIMER =
  "Educational counselling handout from Materia. Not a prescription and not a substitute for pharmacist or clinician advice. Confirm against the labelled product and local practice.";

export function buildCounsellingHandout(input: {
  molecule: Pick<Molecule, "innName" | "slug">;
  lang: CounsellingLang;
  lines: string[];
  sourceNote?: string;
}): HandoutPayload {
  const generatedAt = new Date().toISOString();
  const title = `${input.molecule.innName} — counselling points`;
  const bodyLines = input.lines.map((l, i) => `${i + 1}. ${l}`);
  const plainText = [
    title,
    `Language: ${input.lang}`,
    "",
    ...bodyLines,
    "",
    input.sourceNote ? `Source: ${input.sourceNote}` : "",
    HANDOUT_DISCLAIMER,
    `Generated: ${generatedAt}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="${input.lang}">
<head><meta charset="utf-8"/><title>${escapeHtml(title)}</title>
<style>
  body{font-family:Georgia,serif;max-width:40rem;margin:2rem auto;padding:0 1rem;color:#1a1a1a;line-height:1.5}
  h1{font-size:1.4rem;margin-bottom:.25rem}
  .meta{color:#555;font-size:.9rem;margin-bottom:1.5rem}
  ol{padding-left:1.25rem}
  .disclaimer{margin-top:2rem;padding-top:1rem;border-top:1px solid #ccc;font-size:.85rem;color:#444}
</style></head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p class="meta">Materia · ${escapeHtml(input.lang)} · reference handout</p>
  <ol>${input.lines.map((l) => `<li>${escapeHtml(l)}</li>`).join("")}</ol>
  ${input.sourceNote ? `<p class="meta">${escapeHtml(input.sourceNote)}</p>` : ""}
  <p class="disclaimer">${escapeHtml(HANDOUT_DISCLAIMER)}</p>
</body></html>`;

  return {
    title,
    moleculeName: input.molecule.innName,
    moleculeSlug: input.molecule.slug,
    lang: input.lang,
    lines: input.lines,
    disclaimer: HANDOUT_DISCLAIMER,
    generatedAt,
    plainText,
    html,
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
