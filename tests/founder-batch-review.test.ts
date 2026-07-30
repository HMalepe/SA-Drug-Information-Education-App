import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  STG_BATCH_A_I_SEEDS,
  applyStgExtractDecisionState,
  buildStgExtractReviewQueue,
  classifyDosingPreview,
  dosingBacklogForBatch,
  planDosingAllBatches,
  planDosingBatch,
  planStgAllBatches,
  planStgBatchPublish,
  setStgExtractPublishStateInDoc,
  summarizeBatchAiBacklog,
  validateStgExtractDecision,
  type ReviewQueueItem,
  type StgExtract,
} from "@materia/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("founder Batch A–I review pack", () => {
  it("lists nine curated seed files A–I", () => {
    assert.equal(STG_BATCH_A_I_SEEDS.length, 9);
    assert.deepEqual(
      STG_BATCH_A_I_SEEDS.map((b) => b.batch),
      ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    );
  });

  it("summarises dosing + STG draft backlog from live seed/extracts", () => {
    const batchMoleculeIds = new Map<string, string[]>();
    for (const ref of STG_BATCH_A_I_SEEDS) {
      const doc = JSON.parse(
        readFileSync(join(root, "content/seed", ref.seedFile), "utf8"),
      ) as { molecules: Array<{ id: string }> };
      batchMoleculeIds.set(
        ref.batch,
        doc.molecules.map((m) => m.id),
      );
    }
    const allIds = [...batchMoleculeIds.values()].flat();
    assert.ok(allIds.length >= 70);

    const dosingItems: ReviewQueueItem[] = allIds.map((id) => ({
      id: `${id}:dosingAdult`,
      moleculeId: id,
      moleculeSlug: id.replace(/^mol-/, ""),
      moleculeName: id,
      therapeuticArea: "batch",
      fieldPath: "dosingAdult",
      publishState: "draft",
      sourceId: "src-doh-stg",
      preview: "Adult dosing not published in Materia yet.",
      priority: "critical",
      highStakes: true,
    }));

    const extracts = (
      JSON.parse(readFileSync(join(root, "content/rag/stg-extracts.json"), "utf8")) as {
        extracts: StgExtract[];
      }
    ).extracts;

    const summary = summarizeBatchAiBacklog({
      batchMoleculeIds,
      dosingItems,
      extracts,
    });
    assert.equal(summary.batches.length, 9);
    assert.ok(summary.totals.molecules >= 70);
    assert.ok(summary.totals.dosingDraftCritical >= 70);
    assert.ok(summary.totals.stgExtractDraft >= 70);
    assert.match(summary.note, /never invents/i);

    const batchA = dosingBacklogForBatch(dosingItems, batchMoleculeIds.get("A") ?? []);
    assert.ok(batchA.length >= 7);
  });

  it("builds STG extract queue and gates publish attestation", () => {
    const extracts: StgExtract[] = [
      {
        id: "stg-demo-draft",
        moleculeId: "mol-atropine",
        moleculeSlug: "atropine",
        edition: "Hospital Level Adults STG/EML 2019 — verify current public edition",
        topic: "emergency-supportive-pointer",
        text: "Atropine appears in South African adult hospital pathways. Materia does not invent a dose.",
        sourceId: "src-doh-stg",
        publishState: "draft",
        lastReviewed: "2026-07-31",
      },
    ];
    const queue = buildStgExtractReviewQueue({
      extracts,
      batchByMoleculeId: new Map([["mol-atropine", "A"]]),
    });
    assert.equal(queue.length, 1);
    assert.equal(queue[0]!.batch, "A");
    assert.equal(queue[0]!.highStakes, true);

    assert.equal(
      validateStgExtractDecision({
        item: queue[0]!,
        decision: "publish",
        attestation: "looks ok",
      }).ok,
      false,
    );
    assert.equal(
      validateStgExtractDecision({
        item: queue[0]!,
        decision: "publish",
        attestation: "I confirm this is sourced from DoH STG pointer only",
      }).ok,
      true,
    );
    assert.equal(applyStgExtractDecisionState("draft", "publish"), "published");
  });

  it("refuses publish when extract preview contains numeric mg", () => {
    const item = buildStgExtractReviewQueue({
      extracts: [
        {
          id: "stg-bad",
          moleculeId: "mol-x",
          moleculeSlug: "x",
          edition: "x",
          text: "Give 500 mg TDS — invented.",
          sourceId: "src-doh-stg",
          publishState: "draft",
          lastReviewed: "2026-07-31",
        },
      ],
    })[0]!;
    const gate = validateStgExtractDecision({
      item,
      decision: "publish",
      attestation: "I confirm sourced",
    });
    assert.equal(gate.ok, false);
    if (!gate.ok) assert.match(gate.reason, /numeric dose|3\.1/i);
  });

  it("mutates STG extract publishState without changing text", () => {
    const doc = {
      extracts: [
        {
          id: "stg-demo",
          moleculeId: "mol-atropine",
          moleculeSlug: "atropine",
          edition: "test",
          text: "Pointer only — Materia does not invent a dose.",
          sourceId: "src-doh-stg",
          publishState: "draft" as const,
          lastReviewed: "2026-07-31",
          reviewerCredential: "Pending founder review",
        },
      ],
    };
    const textBefore = doc.extracts[0]!.text;
    assert.equal(setStgExtractPublishStateInDoc(doc, "stg-demo", "published"), true);
    assert.equal(doc.extracts[0]!.publishState, "published");
    assert.equal(doc.extracts[0]!.text, textBefore);
    assert.match(doc.extracts[0]!.reviewerCredential ?? "", /Founder pharmacist/i);
  });

  it("plans Batch A STG publish with eligible drafts and no dosing", () => {
    const ref = STG_BATCH_A_I_SEEDS.find((b) => b.batch === "A")!;
    const seed = JSON.parse(
      readFileSync(join(root, "content/seed", ref.seedFile), "utf8"),
    ) as { molecules: Array<{ id: string }> };
    const extracts = (
      JSON.parse(readFileSync(join(root, "content/rag/stg-extracts.json"), "utf8")) as {
        extracts: StgExtract[];
      }
    ).extracts;
    const plan = planStgBatchPublish({
      batch: "A",
      extracts,
      moleculeIds: seed.molecules.map((m) => m.id),
    });
    assert.ok(plan.eligible.length >= 3);
    assert.equal(plan.blocked.length, 0);
    assert.ok(plan.alreadyPublished >= 4);
    assert.match(plan.note, /Dosing scaffolds are NOT included/i);
    assert.ok(plan.eligible.every((e) => !/\d+\s*mg\b/i.test(e.preview)));
  });

  it("plans STG all batches with roll-up totals", () => {
    const batchMoleculeIds = new Map<string, string[]>();
    for (const ref of STG_BATCH_A_I_SEEDS) {
      const doc = JSON.parse(
        readFileSync(join(root, "content/seed", ref.seedFile), "utf8"),
      ) as { molecules: Array<{ id: string }> };
      batchMoleculeIds.set(
        ref.batch,
        doc.molecules.map((m) => m.id),
      );
    }
    const extracts = (
      JSON.parse(readFileSync(join(root, "content/rag/stg-extracts.json"), "utf8")) as {
        extracts: StgExtract[];
      }
    ).extracts;
    const plan = planStgAllBatches({ batchMoleculeIds, extracts });
    assert.equal(plan.batches.length, 9);
    assert.ok(plan.totals.eligible >= 70);
    assert.equal(plan.totals.blocked, 0);
  });

  it("classifies dosing drafts and plans Batch A without numeric suspects", () => {
    assert.equal(
      classifyDosingPreview("Adult dosing not published — Materia will not invent a dose."),
      "placeholder_absent",
    );
    assert.equal(classifyDosingPreview("Give 500 mg TDS"), "numeric_suspect");
    assert.equal(classifyDosingPreview("Take with food as directed."), "other_draft");

    const ref = STG_BATCH_A_I_SEEDS.find((b) => b.batch === "A")!;
    const seed = JSON.parse(
      readFileSync(join(root, "content/seed", ref.seedFile), "utf8"),
    ) as { molecules: Array<{ id: string; slug: string }> };
    const dosingItems: ReviewQueueItem[] = seed.molecules.map((m) => ({
      id: `${m.id}:dosingAdult`,
      moleculeId: m.id,
      moleculeSlug: m.slug,
      moleculeName: m.slug,
      therapeuticArea: "emergency-supportive",
      fieldPath: "dosingAdult",
      publishState: "draft",
      sourceId: "src-doh-stg",
      preview:
        "Adult dosing not published in Materia — confirm against current DoH STG/EML. Materia will not invent a dose.",
      priority: "critical",
      highStakes: true,
    }));
    const plan = planDosingBatch({
      batch: "A",
      dosingItems,
      moleculeIds: seed.molecules.map((m) => m.id),
    });
    assert.equal(plan.placeholderAbsent.length, 7);
    assert.equal(plan.numericSuspect.length, 0);
    assert.match(plan.note, /No batch auto-publish for dosing/i);

    const all = planDosingAllBatches({
      batchMoleculeIds: new Map([["A", seed.molecules.map((m) => m.id)]]),
      dosingItems,
    });
    assert.ok(all.totals.placeholderAbsent >= 7);
  });
});
