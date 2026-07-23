import type {
  Molecule,
  PublishState,
  SafetyProfile,
  SourcedFact,
} from "./types.js";

export type ReviewPriority = "critical" | "high" | "normal";

export interface ReviewQueueItem {
  id: string;
  moleculeId: string;
  moleculeSlug: string;
  moleculeName: string;
  therapeuticArea: string;
  fieldPath: string;
  publishState: PublishState;
  sourceId?: string;
  preview: string;
  priority: ReviewPriority;
  /** True when field looks like dosing / overdose clinical stakes */
  highStakes: boolean;
}

export interface CoverageAreaRow {
  therapeuticArea: string;
  molecules: number;
  factsTotal: number;
  factsDraft: number;
  factsReviewed: number;
  factsPublished: number;
  publishPercent: number;
}

export interface CoverageSummary {
  areas: CoverageAreaRow[];
  totals: Omit<CoverageAreaRow, "therapeuticArea">;
  note: string;
}

export type ReviewDecisionKind = "keep_draft" | "mark_reviewed" | "publish";

export interface ReviewDecision {
  id: string;
  queueItemId: string;
  decision: ReviewDecisionKind;
  reviewerLabel: string;
  attestation?: string;
  at: string;
  note?: string;
}

const HIGH_STAKES = /dosing|overdose|antidote|renal|hepatic|contraindicat|pregnancy|breastfeed/i;

function previewValue(value: unknown): string {
  if (typeof value === "string") return value.slice(0, 160);
  if (value && typeof value === "object" && "text" in (value as object)) {
    return String((value as { text: unknown }).text).slice(0, 160);
  }
  return JSON.stringify(value).slice(0, 160);
}

function pushFact(
  out: ReviewQueueItem[],
  mol: Molecule,
  fieldPath: string,
  fact: SourcedFact<unknown> | undefined,
) {
  if (!fact) return;
  const highStakes = HIGH_STAKES.test(fieldPath);
  out.push({
    id: `${mol.id}:${fieldPath}`,
    moleculeId: mol.id,
    moleculeSlug: mol.slug,
    moleculeName: mol.innName,
    therapeuticArea: mol.therapeuticArea,
    fieldPath,
    publishState: fact.publishState,
    sourceId: fact.sourceId,
    preview: previewValue(fact.value),
    priority: highStakes && fact.publishState !== "published" ? "critical" : fact.publishState === "draft" ? "high" : "normal",
    highStakes,
  });
}

/** Build founder review queue from molecule + safety sourced facts. */
export function buildReviewQueue(input: {
  molecules: Molecule[];
  safetyProfiles: SafetyProfile[];
  /** When set, only include these publish states (default: draft + reviewed). */
  states?: PublishState[];
}): ReviewQueueItem[] {
  const want = new Set(input.states ?? (["draft", "reviewed"] as PublishState[]));
  const byMol = new Map(input.molecules.map((m) => [m.id, m]));
  const items: ReviewQueueItem[] = [];

  for (const mol of input.molecules) {
    pushFact(items, mol, "chemistrySummary", mol.chemistrySummary);
    pushFact(items, mol, "moaSummary", mol.moaSummary);
    pushFact(items, mol, "discoveryNote", mol.discoveryNote);
  }

  for (const sp of input.safetyProfiles) {
    const mol = byMol.get(sp.moleculeId);
    if (!mol) continue;
    pushFact(items, mol, "dosingAdult", sp.dosingAdult);
    pushFact(items, mol, "dosingPaediatric", sp.dosingPaediatric);
    pushFact(items, mol, "dosingGeriatric", sp.dosingGeriatric);
    pushFact(items, mol, "renalAdjustment", sp.renalAdjustment);
    pushFact(items, mol, "hepaticAdjustment", sp.hepaticAdjustment);
    pushFact(items, mol, "foodLifestyle", sp.foodLifestyle);
    pushFact(items, mol, "pregnancy", sp.pregnancy);
    pushFact(items, mol, "breastfeeding", sp.breastfeeding);
    pushFact(items, mol, "overdoseEarlySigns", sp.overdoseEarlySigns);
    pushFact(items, mol, "overdoseSevereSigns", sp.overdoseSevereSigns);
    pushFact(items, mol, "antidoteOrSupportive", sp.antidoteOrSupportive);
    pushFact(items, mol, "emergencySteps", sp.emergencySteps);
    sp.contraindications?.forEach((f, i) => pushFact(items, mol, `contraindications[${i}]`, f));
    sp.warnings?.forEach((f, i) => pushFact(items, mol, `warnings[${i}]`, f));
    sp.clinicalPearls?.forEach((f, i) => pushFact(items, mol, `clinicalPearls[${i}]`, f));
    sp.counsellingPoints?.forEach((f, i) => pushFact(items, mol, `counsellingPoints[${i}]`, f));
  }

  return items
    .filter((i) => want.has(i.publishState))
    .sort((a, b) => {
      const rank = { critical: 0, high: 1, normal: 2 };
      return rank[a.priority] - rank[b.priority] || a.moleculeName.localeCompare(b.moleculeName);
    });
}

export function summarizeCoverage(input: {
  molecules: Molecule[];
  safetyProfiles: SafetyProfile[];
}): CoverageSummary {
  const all = buildReviewQueue({
    ...input,
    states: ["draft", "reviewed", "published"],
  });
  const areas = new Map<string, CoverageAreaRow>();

  for (const mol of input.molecules) {
    const row = areas.get(mol.therapeuticArea) ?? {
      therapeuticArea: mol.therapeuticArea,
      molecules: 0,
      factsTotal: 0,
      factsDraft: 0,
      factsReviewed: 0,
      factsPublished: 0,
      publishPercent: 0,
    };
    row.molecules += 1;
    areas.set(mol.therapeuticArea, row);
  }

  for (const fact of all) {
    const row = areas.get(fact.therapeuticArea);
    if (!row) continue;
    row.factsTotal += 1;
    if (fact.publishState === "draft") row.factsDraft += 1;
    if (fact.publishState === "reviewed") row.factsReviewed += 1;
    if (fact.publishState === "published") row.factsPublished += 1;
  }

  const areaRows = [...areas.values()]
    .map((r) => ({
      ...r,
      publishPercent: r.factsTotal === 0 ? 0 : Math.round((r.factsPublished / r.factsTotal) * 100),
    }))
    .sort((a, b) => a.therapeuticArea.localeCompare(b.therapeuticArea));

  const totals = areaRows.reduce(
    (acc, r) => {
      acc.molecules += r.molecules;
      acc.factsTotal += r.factsTotal;
      acc.factsDraft += r.factsDraft;
      acc.factsReviewed += r.factsReviewed;
      acc.factsPublished += r.factsPublished;
      return acc;
    },
    { molecules: 0, factsTotal: 0, factsDraft: 0, factsReviewed: 0, factsPublished: 0, publishPercent: 0 },
  );
  totals.publishPercent =
    totals.factsTotal === 0 ? 0 : Math.round((totals.factsPublished / totals.factsTotal) * 100);

  return {
    areas: areaRows,
    totals,
    note: "Coverage counts sourced facts only. Empty dosing is intentional until founder publish.",
  };
}

export function validateReviewDecision(input: {
  item: ReviewQueueItem;
  decision: ReviewDecisionKind;
  attestation?: string;
}): { ok: true } | { ok: false; reason: string } {
  if (input.decision === "publish") {
    if (!input.item.sourceId) {
      return { ok: false, reason: "Cannot publish without a sourceId (constitution 3.2)." };
    }
    if (input.item.highStakes) {
      const okText = (input.attestation ?? "").toLowerCase();
      if (!okText.includes("sourced") && !okText.includes("confirm")) {
        return {
          ok: false,
          reason:
            "High-stakes publish requires attestation containing 'sourced' or 'confirm' (founder gate).",
        };
      }
    }
  }
  if (input.decision === "mark_reviewed" && input.item.publishState === "published") {
    return { ok: false, reason: "Already published — leave published or keep as-is." };
  }
  return { ok: true };
}

export function nextPublishState(
  current: PublishState,
  decision: ReviewDecisionKind,
): PublishState {
  if (decision === "keep_draft") return "draft";
  if (decision === "mark_reviewed") return "reviewed";
  if (decision === "publish") return "published";
  return current;
}
