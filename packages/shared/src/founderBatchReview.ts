/**
 * Founder review pack for STG/EML Batches A–I (constitution 3.2–3.3).
 * Surfaces draft dosing + draft STG extract pointers — never invents clinical text.
 */

import type { PublishState } from "./types.js";
import type { ReviewDecision, ReviewQueueItem } from "./reviewQueue.js";
import {
  classifyDosingPreview,
  nextPublishState,
  type DosingDraftClass,
  type ReviewDecisionKind,
} from "./reviewQueue.js";
import type { StgExtract } from "./ragCorpus.js";

export { classifyDosingPreview, type DosingDraftClass } from "./reviewQueue.js";

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

export interface StgBatchPublishPlan {
  batch: string;
  alreadyPublished: number;
  /** Draft/reviewed extracts that pass numeric + source gates (attestation checked if provided). */
  eligible: StgExtractReviewItem[];
  blocked: Array<{ extractId: string; reason: string; preview: string }>;
  note: string;
}

/**
 * Plan publishing all non-published STG extract pointers for a batch.
 * Does not invent text. Optional attestation pre-checks the publish gate.
 */
export function planStgBatchPublish(input: {
  batch: string;
  extracts: StgExtract[];
  moleculeIds: string[];
  attestation?: string;
}): StgBatchPublishPlan {
  const idSet = new Set(input.moleculeIds);
  const batchByMoleculeId = new Map(input.moleculeIds.map((id) => [id, input.batch]));
  const inBatch = input.extracts.filter((e) => idSet.has(e.moleculeId));
  const alreadyPublished = inBatch.filter((e) => e.publishState === "published").length;

  const candidates = buildStgExtractReviewQueue({
    extracts: inBatch,
    states: ["draft", "reviewed"],
    moleculeIds: input.moleculeIds,
    batchByMoleculeId,
  });

  const eligible: StgExtractReviewItem[] = [];
  const blocked: StgBatchPublishPlan["blocked"] = [];

  for (const item of candidates) {
    if (item.sourceId !== "src-doh-stg") {
      blocked.push({
        extractId: item.extractId,
        reason: "STG extracts must use sourceId src-doh-stg.",
        preview: item.preview.slice(0, 120),
      });
      continue;
    }
    if (/\d+\s*mg\b|\d+\s*mmol\b/i.test(item.preview)) {
      blocked.push({
        extractId: item.extractId,
        reason:
          "Extract preview contains numeric dose units — refuse until founder removes invented values (constitution 3.1).",
        preview: item.preview.slice(0, 120),
      });
      continue;
    }
    if (input.attestation) {
      const gate = validateStgExtractDecision({
        item,
        decision: "publish",
        attestation: input.attestation,
      });
      if (!gate.ok) {
        blocked.push({
          extractId: item.extractId,
          reason: gate.reason,
          preview: item.preview.slice(0, 120),
        });
        continue;
      }
    }
    eligible.push(item);
  }

  return {
    batch: input.batch,
    alreadyPublished,
    eligible,
    blocked,
    note:
      "STG batch publish changes publishState only. Draft pointers with no invented mg may enter RAG after founder attestation. Dosing scaffolds are NOT included.",
  };
}

export function planStgAllBatches(input: {
  batchMoleculeIds: Map<string, string[]>;
  extracts: StgExtract[];
  attestation?: string;
}): {
  batches: Array<StgBatchPublishPlan & { label: string }>;
  totals: {
    alreadyPublished: number;
    eligible: number;
    blocked: number;
  };
  note: string;
} {
  const batches: Array<StgBatchPublishPlan & { label: string }> = [];
  let alreadyPublished = 0;
  let eligible = 0;
  let blocked = 0;
  for (const ref of STG_BATCH_A_I_SEEDS) {
    const plan = planStgBatchPublish({
      batch: ref.batch,
      extracts: input.extracts,
      moleculeIds: input.batchMoleculeIds.get(ref.batch) ?? [],
      attestation: input.attestation,
    });
    batches.push({ ...plan, label: ref.label });
    alreadyPublished += plan.alreadyPublished;
    eligible += plan.eligible.length;
    blocked += plan.blocked.length;
  }
  return {
    batches,
    totals: { alreadyPublished, eligible, blocked },
    note:
      "Roll-up of plan-stg A–I. Use publish-stg-batch <letter> --write after review. Does not touch dosing.",
  };
}

export interface StgBatchPublishMutation {
  extractId: string;
  moleculeId: string;
  moleculeSlug: string;
  batch: string;
  from: PublishState;
  to: PublishState;
  queueItemId: string;
}

export type ApplyStgBatchPublishResult =
  | {
      ok: true;
      scope: string;
      alreadyPublished: number;
      mutations: StgBatchPublishMutation[];
      decisions: ReviewDecision[];
      note: string;
    }
  | {
      ok: false;
      reason: string;
      blocked: Array<{ extractId: string; reason: string; preview: string; batch?: string }>;
    };

/**
 * Pure batch STG publish: publishState transitions + audit rows only.
 * Refuses the whole scope if any extract is blocked or attestation is weak.
 * Never changes extract text.
 */
export function applyStgBatchPublish(input: {
  scope: string;
  plans: Array<StgBatchPublishPlan & { label?: string }>;
  reviewerLabel: string;
  attestation: string;
  decisionIdPrefix?: string;
  at?: string;
}): ApplyStgBatchPublishResult {
  const attestation = input.attestation.trim();
  const okText = attestation.toLowerCase();
  if (!okText.includes("sourced") && !okText.includes("confirm")) {
    return {
      ok: false,
      reason:
        "Publishing STG extracts requires attestation containing 'sourced' or 'confirm' (RAG gate).",
      blocked: [],
    };
  }
  if (input.reviewerLabel.trim().length < 2) {
    return {
      ok: false,
      reason: "reviewerLabel must be at least 2 characters.",
      blocked: [],
    };
  }

  const blocked = input.plans.flatMap((p) =>
    p.blocked.map((b) => ({ ...b, batch: p.batch })),
  );
  if (blocked.length > 0) {
    return {
      ok: false,
      reason: "Refuse batch publish — one or more extracts blocked",
      blocked,
    };
  }

  const at = input.at ?? new Date().toISOString();
  const prefix = input.decisionIdPrefix ?? `stg-batch-${input.scope}`;
  const mutations: StgBatchPublishMutation[] = [];
  const decisions: ReviewDecision[] = [];
  let alreadyPublished = 0;

  for (const plan of input.plans) {
    alreadyPublished += plan.alreadyPublished;
    for (const item of plan.eligible) {
      const gate = validateStgExtractDecision({
        item,
        decision: "publish",
        attestation,
      });
      if (!gate.ok) {
        return {
          ok: false,
          reason: "Refuse batch publish — gate failed during apply",
          blocked: [
            {
              extractId: item.extractId,
              reason: gate.reason,
              preview: item.preview.slice(0, 120),
              batch: plan.batch,
            },
          ],
        };
      }
      const to = applyStgExtractDecisionState(item.publishState, "publish");
      mutations.push({
        extractId: item.extractId,
        moleculeId: item.moleculeId,
        moleculeSlug: item.moleculeSlug,
        batch: plan.batch,
        from: item.publishState,
        to,
        queueItemId: item.id,
      });
      decisions.push({
        id: `${prefix}-${item.extractId}`,
        queueItemId: item.id,
        decision: "publish",
        reviewerLabel: input.reviewerLabel.trim(),
        attestation,
        at,
        note: `publish-stg-batch ${input.scope} — publishState only`,
      });
    }
  }

  return {
    ok: true,
    scope: input.scope,
    alreadyPublished,
    mutations,
    decisions,
    note:
      "STG batch publish changes publishState only. Does not invent text or touch dosing scaffolds.",
  };
}

export interface DosingPlanItem {
  id: string;
  moleculeId: string;
  moleculeSlug: string;
  fieldPath: string;
  publishState: PublishState;
  classification: DosingDraftClass;
  preview: string;
}

export interface DosingBatchPlan {
  batch: string;
  placeholderAbsent: DosingPlanItem[];
  numericSuspect: DosingPlanItem[];
  otherDraft: DosingPlanItem[];
  note: string;
}

/**
 * Plan dosing review for a batch. Does NOT recommend inventing doses.
 * numeric_suspect must not be published until founder rewrites without invented values
 * OR replaces with sourced text. placeholder_absent may be published as honest "no dose in Materia".
 */
export function planDosingBatch(input: {
  batch: string;
  dosingItems: ReviewQueueItem[];
  moleculeIds: string[];
}): DosingBatchPlan {
  const dosing = dosingBacklogForBatch(input.dosingItems, input.moleculeIds).filter((i) =>
    /dosing/i.test(i.fieldPath),
  );
  const placeholderAbsent: DosingPlanItem[] = [];
  const numericSuspect: DosingPlanItem[] = [];
  const otherDraft: DosingPlanItem[] = [];

  for (const item of dosing) {
    const classification = classifyDosingPreview(item.preview);
    const row: DosingPlanItem = {
      id: item.id,
      moleculeId: item.moleculeId,
      moleculeSlug: item.moleculeSlug,
      fieldPath: item.fieldPath,
      publishState: item.publishState,
      classification,
      preview: item.preview.slice(0, 160),
    };
    if (classification === "placeholder_absent") placeholderAbsent.push(row);
    else if (classification === "numeric_suspect") numericSuspect.push(row);
    else otherDraft.push(row);
  }

  return {
    batch: input.batch,
    placeholderAbsent,
    numericSuspect,
    otherDraft,
    note:
      "Dosing plan only — Materia will not invent mg. numeric_suspect: do not publish. placeholder_absent: optional publish as honest absence after founder confirm. No batch auto-publish for dosing.",
  };
}

export function planDosingAllBatches(input: {
  batchMoleculeIds: Map<string, string[]>;
  dosingItems: ReviewQueueItem[];
}): {
  batches: Array<DosingBatchPlan & { label: string }>;
  totals: {
    placeholderAbsent: number;
    numericSuspect: number;
    otherDraft: number;
  };
  note: string;
} {
  const batches: Array<DosingBatchPlan & { label: string }> = [];
  let placeholderAbsent = 0;
  let numericSuspect = 0;
  let otherDraft = 0;
  for (const ref of STG_BATCH_A_I_SEEDS) {
    const plan = planDosingBatch({
      batch: ref.batch,
      dosingItems: input.dosingItems,
      moleculeIds: input.batchMoleculeIds.get(ref.batch) ?? [],
    });
    batches.push({ ...plan, label: ref.label });
    placeholderAbsent += plan.placeholderAbsent.length;
    numericSuspect += plan.numericSuspect.length;
    otherDraft += plan.otherDraft.length;
  }
  return {
    batches,
    totals: { placeholderAbsent, numericSuspect, otherDraft },
    note:
      "Roll-up dosing plan A–I. Prefer publishing honest placeholders only after clinical confirm; never publish numeric_suspect without sourced rewrite.",
  };
}

export const DEFAULT_HONEST_ABSENCE_ATTESTATION =
  "I confirm this honest absence is intentional — Materia has no sourced dose yet.";

export interface PlaceholderDosingCliExport {
  scope: string;
  count: number;
  skippedNumericSuspect: number;
  skippedOtherDraft: number;
  attestation: string;
  /** Commands without --write — founder appends --write after clinical confirm. */
  lines: string[];
  note: string;
}

/**
 * Export individual publish-dosing CLI lines for honest placeholders only.
 * Never includes numeric_suspect. Never batch-publishes. Does not invent mg.
 */
export function exportPlaceholderDosingCli(input: {
  scope: string;
  items: DosingPlanItem[];
  attestation?: string;
}): PlaceholderDosingCliExport {
  const attestation = (input.attestation ?? DEFAULT_HONEST_ABSENCE_ATTESTATION).trim();
  const skippedNumericSuspect = input.items.filter(
    (i) => i.classification === "numeric_suspect",
  ).length;
  const skippedOtherDraft = input.items.filter(
    (i) => i.classification === "other_draft",
  ).length;
  const placeholders = input.items.filter(
    (i) => i.classification === "placeholder_absent",
  );
  const attEscaped = attestation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const lines = placeholders.map(
    (row) =>
      `npm run review:batches -- publish-dosing ${row.moleculeId} ${row.fieldPath} --attestation "${attEscaped}"`,
  );
  return {
    scope: input.scope,
    count: lines.length,
    skippedNumericSuspect,
    skippedOtherDraft,
    attestation,
    lines,
    note:
      "Individual placeholder publish commands only — no --write (dry-run default). Append --write after clinical confirm. numeric_suspect omitted. No dosing batch auto-publish.",
  };
}

/** Flatten plan-dosing batch rows into one DosingPlanItem list for CLI export. */
export function flattenDosingPlanItems(
  batches: Array<Pick<DosingBatchPlan, "placeholderAbsent" | "numericSuspect" | "otherDraft">>,
): DosingPlanItem[] {
  return batches.flatMap((b) => [
    ...b.placeholderAbsent,
    ...b.numericSuspect,
    ...b.otherDraft,
  ]);
}

