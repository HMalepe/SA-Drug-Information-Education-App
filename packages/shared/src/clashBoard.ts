import type { Interaction, InteractionSeverity, Molecule, PublishState, SafetyProfile } from "./types.js";
import { checkRegimenInteractions, type ClashFlag, type RegimenItem } from "./companion.js";
import { isRenderablePublishState, renderableFact } from "./publish.js";

/**
 * Build Spec §12 — Full-regimen clash board.
 * At-a-glance: interactions, duplications, renal/hepatic flags, food notes.
 * Never invents clashes — empty ≠ safe.
 */

export type ClashBoardKind =
  | "interaction"
  | "duplication"
  | "same_class"
  | "renal_flag"
  | "hepatic_flag"
  | "food_flag";

export type ClashBoardTone = "red" | "orange" | "yellow" | "slate";

export interface ClashBoardRow {
  id: string;
  kind: ClashBoardKind;
  tone: ClashBoardTone;
  title: string;
  detail: string;
  moleculeIds: string[];
  moleculeNames: string[];
  severity?: InteractionSeverity;
  publishState?: PublishState;
}

export interface ClashBoardView {
  rows: ClashBoardRow[];
  summary: {
    red: number;
    orange: number;
    yellow: number;
    slate: number;
    total: number;
  };
  note: string;
  disclaimer: string;
}

function toneForSeverity(severity: InteractionSeverity): ClashBoardTone {
  switch (severity) {
    case "contraindicated":
      return "red";
    case "major":
      return "orange";
    case "moderate":
      return "yellow";
    default:
      return "slate";
  }
}

function publishedText(fact: SafetyProfile["renalAdjustment"]): string | null {
  if (!fact) return null;
  const r = renderableFact(fact);
  return r ? String(r.value) : null;
}

export function buildClashBoard(input: {
  regimen: Array<Pick<RegimenItem, "moleculeId" | "moleculeName">>;
  molecules: Molecule[];
  interactions: Interaction[];
  safetyByMoleculeId: Map<string, SafetyProfile>;
}): ClashBoardView {
  const rows: ClashBoardRow[] = [];
  const nameById = new Map(
    input.molecules.map((m) => [m.id, m.innName] as const),
  );
  for (const item of input.regimen) {
    if (!nameById.has(item.moleculeId)) nameById.set(item.moleculeId, item.moleculeName);
  }

  const ids = input.regimen.map((r) => r.moleculeId);
  const { clashes } = checkRegimenInteractions(ids, input.interactions, nameById);

  for (const c of clashes) {
    rows.push(interactionRow(c));
  }

  /* Duplications — same molecule listed more than once */
  const countById = new Map<string, number>();
  for (const id of ids) countById.set(id, (countById.get(id) ?? 0) + 1);
  for (const [id, count] of countById) {
    if (count < 2) continue;
    const name = nameById.get(id) ?? id;
    rows.push({
      id: `dup-${id}`,
      kind: "duplication",
      tone: "orange",
      title: `Duplicate listing: ${name}`,
      detail: `Appears ${count} times on this regimen list. Confirm it is intentional — Materia does not merge or stop medicines.`,
      moleculeIds: [id],
      moleculeNames: [name],
    });
  }

  /* Same therapeutic class (educational) — not an invented interaction */
  const classBuckets = new Map<string, Array<{ id: string; name: string }>>();
  const uniqueIds = [...new Set(ids)];
  for (const id of uniqueIds) {
    const mol = input.molecules.find((m) => m.id === id);
    if (!mol?.className?.trim()) continue;
    const key = mol.className.trim().toLowerCase();
    const bucket = classBuckets.get(key) ?? [];
    bucket.push({ id: mol.id, name: mol.innName });
    classBuckets.set(key, bucket);
  }
  for (const [classKey, members] of classBuckets) {
    if (members.length < 2) continue;
    const label = input.molecules.find((m) => m.className.trim().toLowerCase() === classKey)?.className ?? classKey;
    rows.push({
      id: `class-${classKey}`,
      kind: "same_class",
      tone: "yellow",
      title: `Same class on list: ${label}`,
      detail: `${members.map((m) => m.name).join(" + ")} share a class label. Educational flag only — confirm clinically (not an invented interaction).`,
      moleculeIds: members.map((m) => m.id),
      moleculeNames: members.map((m) => m.name),
    });
  }

  /* Renal / hepatic / food — only when published facts exist */
  for (const id of uniqueIds) {
    const safety = input.safetyByMoleculeId.get(id);
    const name = nameById.get(id) ?? id;
    const renal = publishedText(safety?.renalAdjustment);
    if (renal) {
      rows.push({
        id: `renal-${id}`,
        kind: "renal_flag",
        tone: "yellow",
        title: `Published renal note: ${name}`,
        detail: renal,
        moleculeIds: [id],
        moleculeNames: [name],
        publishState: safety?.renalAdjustment?.publishState,
      });
    }
    const hepatic = publishedText(safety?.hepaticAdjustment);
    if (hepatic) {
      rows.push({
        id: `hepatic-${id}`,
        kind: "hepatic_flag",
        tone: "yellow",
        title: `Published hepatic note: ${name}`,
        detail: hepatic,
        moleculeIds: [id],
        moleculeNames: [name],
        publishState: safety?.hepaticAdjustment?.publishState,
      });
    }
    const food = publishedText(safety?.foodLifestyle);
    if (food) {
      rows.push({
        id: `food-${id}`,
        kind: "food_flag",
        tone: "slate",
        title: `Food & lifestyle note: ${name}`,
        detail: food,
        moleculeIds: [id],
        moleculeNames: [name],
        publishState: safety?.foodLifestyle?.publishState,
      });
    }
  }

  const order: Record<ClashBoardTone, number> = { red: 0, orange: 1, yellow: 2, slate: 3 };
  rows.sort((a, b) => order[a.tone] - order[b.tone] || a.title.localeCompare(b.title));

  const summary = {
    red: rows.filter((r) => r.tone === "red").length,
    orange: rows.filter((r) => r.tone === "orange").length,
    yellow: rows.filter((r) => r.tone === "yellow").length,
    slate: rows.filter((r) => r.tone === "slate").length,
    total: rows.length,
  };

  return {
    rows,
    summary,
    note:
      rows.length === 0
        ? "No published clash-board flags for this list. That is not a guarantee of safety — verify clinically."
        : "Published facts and list structure only. Confirm clinically before acting.",
    disclaimer:
      "Materia is a reference and education tool. The clash board does not direct treatment, stop medicines, or invent interactions.",
  };
}

function interactionRow(c: ClashFlag): ClashBoardRow {
  return {
    id: `ix-${c.moleculeAId}-${c.moleculeBId}-${c.severity}`,
    kind: "interaction",
    tone: toneForSeverity(c.severity),
    title: `${c.moleculeAName} ↔ ${c.moleculeBName} (${c.severity})`,
    detail: c.action ?? "Published interaction — see molecule Interaction tab for mechanism when authored.",
    moleculeIds: [c.moleculeAId, c.moleculeBId],
    moleculeNames: [c.moleculeAName, c.moleculeBName],
    severity: c.severity,
    publishState: c.publishState,
  };
}

/** Resolve pasted brand/INN tokens to molecule ids via existing search maps — caller supplies resolved ids. */
export function regimenFromMoleculeIds(
  moleculeIds: string[],
  nameById: Map<string, string>,
): Array<Pick<RegimenItem, "moleculeId" | "moleculeName">> {
  return moleculeIds.map((id) => ({
    moleculeId: id,
    moleculeName: nameById.get(id) ?? id,
  }));
}

export function isRenderableSafetyPublish(state: PublishState | undefined): boolean {
  return state ? isRenderablePublishState(state) : false;
}
