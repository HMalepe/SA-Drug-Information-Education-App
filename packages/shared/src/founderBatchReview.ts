/**
 * Founder review pack for STG/EML Batches A–I (constitution 3.2–3.3).
 * Surfaces draft dosing + draft STG extract pointers — never invents clinical text.
 */

import type { PublishState } from "./types.js";
import type { ReviewQueueItem } from "./reviewQueue.js";
import { nextPublishState, type ReviewDecisionKind } from "./reviewQueue.js";
import type { StgExtract } from "./ragCorpus.js";

export interface StgBatchSeedRef {
  batch: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";
  label: string;
  seedFile: string;
  edition: string;
}

/** Curated seed files for Hospital / PHC / Paediatric STG scaffold batches. */
export const STG_BATCH_A_I_SEEDS: readonly StgBatchSeedRef[] = [
  {
    batch: "A",
    label: "Hospital Adults — emergency/supportive",
    seedFile: "emergency-supportive.json",
    edition: "Hospital Level Adults STG/EML 2019",
  },
  {
    batch: "B",
    label: "Hospital Adults — infectious disease",
    seedFile: "infectious-disease-eml.json",
    edition: "Hospital Level Adults STG/EML 2019",
  },
  {
    batch: "C",
    label: "Hospital Adults — chronic/supportive",
    seedFile: "hospital-chronic-eml.json",
    edition: "Hospital Level Adults STG/EML 2019",
  },
  {
    batch: "D",
    label: "PHC — clinic-core",
    seedFile: "phc-eml.json",
    edition: "PHC STG/EML 2024",
  },
  {
    batch: "E",
    label: "PHC — HIV/TB follow-on",
    seedFile: "phc-hiv-tb-eml.json",
    edition: "PHC STG/EML 2024",
  },
  {
    batch: "F",
    label: "PHC — supportive misc",
    seedFile: "phc-supportive-eml.json",
    edition: "PHC STG/EML 2024",
  },
  {
    batch: "G",
    label: "Paediatric — ID/neonatal",
    seedFile: "paediatric-eml.json",
    edition: "Hospital Level Paediatrics STG 2023",
  },
  {
    batch: "H",
    label: "Paediatric — cardio/neuro/endocrine",
    seedFile: "paediatric-cardio-neuro-eml.json",
    edition: "Hospital Level Paediatrics STG 2023",
  },
  {
    batch: "I",
    label: "Paediatric — supportive misc",
    seedFile: "paediatric-supportive-eml.json",
    edition: "Hospital Level Paediatrics STG 2023",
  },
] as const;

export interface StgExtractReviewItem {
  id: string;
  extractId: string;
  moleculeId: string;
  moleculeSlug: string;
  batch?: string;
  edition: string;
  topic?: string;
  publishState: PublishState;
  sourceId: string;
  preview: string;
  /** STG extracts enter RAG when published — treat publish as high-stakes. */
  highStakes: true;
  priority: "critical" | "high";
}

export function filterReviewQueueByMoleculeIds(
  items: ReviewQueueItem[],
  moleculeIds: Iterable<string>,
): ReviewQueueItem[] {
  const want = new Set(moleculeIds);
  return items.filter((i) => want.has(i.moleculeId));
}

export function dosingBacklogForBatch(
  items: ReviewQueueItem[],
  moleculeIds: Iterable<string>,
): ReviewQueueItem[] {
  return filterReviewQueueByMoleculeIds(items, moleculeIds).filter(
    (i) =>
      i.publishState !== "published" &&
      (/dosing/i.test(i.fieldPath) || i.highStakes),
  );
}

export function buildStgExtractReviewQueue(input: {
  extracts: StgExtract[];
  states?: PublishState[];
  moleculeIds?: Iterable<string>;
  batchByMoleculeId?: Map<string, string>;
}): StgExtractReviewItem[] {
  const want = new Set(input.states ?? (["draft", "reviewed"] as PublishState[]));
  const molFilter = input.moleculeIds ? new Set(input.moleculeIds) : null;

  return input.extracts
    .filter((e) => want.has(e.publishState))
    .filter((e) => (molFilter ? molFilter.has(e.moleculeId) : true))
    .map((e) => {
      const batch = input.batchByMoleculeId?.get(e.moleculeId);
      return {
        id: `stg:${e.id}`,
        extractId: e.id,
        moleculeId: e.moleculeId,
        moleculeSlug: e.moleculeSlug,
        batch,
        edition: e.edition,
        topic: e.topic,
        publishState: e.publishState,
        sourceId: e.sourceId,
        preview: e.text.slice(0, 200),
        highStakes: true as const,
        priority: e.publishState === "draft" ? ("critical" as const) : ("high" as const),
      };
    })
    .sort((a, b) => {
      const rank = { critical: 0, high: 1 };
      return (
        rank[a.priority] - rank[b.priority] ||
        (a.batch ?? "").localeCompare(b.batch ?? "") ||
        a.moleculeSlug.localeCompare(b.moleculeSlug)
      );
    });
}

export function validateStgExtractDecision(input: {
  item: StgExtractReviewItem;
  decision: ReviewDecisionKind;
  attestation?: string;
}): { ok: true } | { ok: false; reason: string } {
  if (input.item.sourceId !== "src-doh-stg") {
    return { ok: false, reason: "STG extracts must use sourceId src-doh-stg." };
  }
  if (input.decision === "publish") {
    const okText = (input.attestation ?? "").toLowerCase();
    if (!okText.includes("sourced") && !okText.includes("confirm")) {
      return {
        ok: false,
        reason:
          "Publishing an STG extract requires attestation containing 'sourced' or 'confirm' (RAG gate).",
      };
    }
    if (/\d+\s*mg\b|\d+\s*mmol\b/i.test(input.item.preview)) {
      return {
        ok: false,
        reason:
          "Extract preview contains numeric dose units — refuse publish until founder removes invented values (constitution 3.1).",
      };
    }
  }
  if (input.decision === "mark_reviewed" && input.item.publishState === "published") {
    return { ok: false, reason: "Already published — leave published or keep as-is." };
  }
  return { ok: true };
}

/**
 * Mutate publishState on an STG extracts document. Never changes extract text.
 */
export function setStgExtractPublishStateInDoc(
  doc: { extracts?: StgExtract[] },
  extractId: string,
  publishState: PublishState,
  reviewedAt = new Date().toISOString().slice(0, 10),
): boolean {
  const extracts = doc.extracts;
  if (!Array.isArray(extracts)) return false;
  const row = extracts.find((e) => e.id === extractId);
  if (!row) return false;
  row.publishState = publishState;
  row.lastReviewed = reviewedAt;
  if (publishState === "published" && row.reviewerCredential?.toLowerCase().startsWith("pending")) {
    row.reviewerCredential =
      "Founder pharmacist educational attestation — pointer only, no invented clinical values";
  }
  return true;
}

export function applyStgExtractDecisionState(
  current: PublishState,
  decision: ReviewDecisionKind,
): PublishState {
  return nextPublishState(current, decision);
}

export interface BatchAiBacklogRow {
  batch: string;
  label: string;
  seedFile: string;
  moleculeCount: number;
  dosingDraftCritical: number;
  stgExtractDraft: number;
  stgExtractPublished: number;
}

export function summarizeBatchAiBacklog(input: {
  batchMoleculeIds: Map<string, string[]>;
  dosingItems: ReviewQueueItem[];
  extracts: StgExtract[];
}): {
  batches: BatchAiBacklogRow[];
  totals: {
    molecules: number;
    dosingDraftCritical: number;
    stgExtractDraft: number;
    stgExtractPublished: number;
  };
  note: string;
} {
  const batches: BatchAiBacklogRow[] = [];
  let molecules = 0;
  let dosingDraftCritical = 0;
  let stgExtractDraft = 0;
  let stgExtractPublished = 0;

  for (const ref of STG_BATCH_A_I_SEEDS) {
    const ids = input.batchMoleculeIds.get(ref.batch) ?? [];
    const idSet = new Set(ids);
    const dosing = dosingBacklogForBatch(input.dosingItems, ids).filter(
      (i) => i.priority === "critical" || /dosing/i.test(i.fieldPath),
    );
    const stgDraft = input.extracts.filter(
      (e) => idSet.has(e.moleculeId) && e.publishState === "draft",
    ).length;
    const stgPub = input.extracts.filter(
      (e) => idSet.has(e.moleculeId) && e.publishState === "published",
    ).length;
    batches.push({
      batch: ref.batch,
      label: ref.label,
      seedFile: ref.seedFile,
      moleculeCount: ids.length,
      dosingDraftCritical: dosing.length,
      stgExtractDraft: stgDraft,
      stgExtractPublished: stgPub,
    });
    molecules += ids.length;
    dosingDraftCritical += dosing.length;
    stgExtractDraft += stgDraft;
    stgExtractPublished += stgPub;
  }

  return {
    batches,
    totals: { molecules, dosingDraftCritical, stgExtractDraft, stgExtractPublished },
    note:
      "Founder gate: publishState only — never invents mg/hours. Draft STG extracts do not index until published.",
  };
}
