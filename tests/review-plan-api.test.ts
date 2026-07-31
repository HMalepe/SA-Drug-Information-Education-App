import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  STG_BATCH_A_I_SEEDS,
  buildReviewQueue,
  planDosingAllBatches,
  planDosingBatch,
  planStgAllBatches,
  planStgBatchPublish,
  summarizeFounderProgress,
  type StgExtract,
} from "@materia/shared";

/**
 * Mirrors GET /review/plan-stg, /review/plan-dosing, /review/progress composition
 * used by the API (without starting the server).
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadBatchMoleculeIds(): Map<string, string[]> {
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
  return batchMoleculeIds;
}

function loadExtracts(): StgExtract[] {
  return (
    JSON.parse(readFileSync(join(root, "content/rag/stg-extracts.json"), "utf8")) as {
      extracts: StgExtract[];
    }
  ).extracts;
}

function loadDosingItems() {
  const molecules = [];
  const safetyProfiles = [];
  for (const ref of STG_BATCH_A_I_SEEDS) {
    const doc = JSON.parse(
      readFileSync(join(root, "content/seed", ref.seedFile), "utf8"),
    ) as {
      molecules: Array<{ id: string }>;
      safetyProfiles: unknown[];
    };
    molecules.push(...doc.molecules);
    safetyProfiles.push(...(doc.safetyProfiles as never[]));
  }
  return buildReviewQueue({
    molecules: molecules as never[],
    safetyProfiles: safetyProfiles as never[],
    states: ["draft", "reviewed"],
  });
}

describe("API review plan endpoints (shared composition)", () => {
  it("plan-stg all matches founder CLI roll-up shape", () => {
    const plan = planStgAllBatches({
      batchMoleculeIds: loadBatchMoleculeIds(),
      extracts: loadExtracts(),
    });
    assert.equal(plan.batches.length, 9);
    assert.ok(plan.totals.eligible >= 70);
    assert.equal(plan.totals.blocked, 0);
    assert.match(plan.note, /Does not touch dosing/i);
  });

  it("plan-dosing all flags zero numeric suspects in Batch A–I scaffolds", () => {
    const plan = planDosingAllBatches({
      batchMoleculeIds: loadBatchMoleculeIds(),
      dosingItems: loadDosingItems(),
    });
    assert.equal(plan.batches.length, 9);
    assert.ok(plan.totals.placeholderAbsent >= 70);
    assert.equal(plan.totals.numericSuspect, 0);
    assert.match(plan.note, /never publish numeric_suspect/i);
  });

  it("single-batch plan-stg/plan-dosing agree with all roll-up for Batch A", () => {
    const batchMoleculeIds = loadBatchMoleculeIds();
    const extracts = loadExtracts();
    const dosingItems = loadDosingItems();
    const ids = batchMoleculeIds.get("A")!;

    const stgOne = planStgBatchPublish({ batch: "A", extracts, moleculeIds: ids });
    const dosingOne = planDosingBatch({ batch: "A", dosingItems, moleculeIds: ids });
    const stgAll = planStgAllBatches({ batchMoleculeIds, extracts });
    const dosingAll = planDosingAllBatches({ batchMoleculeIds, dosingItems });
    const stgRow = stgAll.batches.find((b) => b.batch === "A")!;
    const dosingRow = dosingAll.batches.find((b) => b.batch === "A")!;

    assert.equal(stgOne.batch, "A");
    assert.equal(stgOne.alreadyPublished, stgRow.alreadyPublished);
    assert.equal(stgOne.eligible.length, stgRow.eligible.length);
    assert.equal(stgOne.blocked.length, stgRow.blocked.length);
    assert.equal(dosingOne.placeholderAbsent.length, dosingRow.placeholderAbsent.length);
    assert.equal(dosingOne.numericSuspect.length, dosingRow.numericSuspect.length);

    const snap = summarizeFounderProgress({
      scope: "A",
      stgTotals: {
        alreadyPublished: stgOne.alreadyPublished,
        eligible: stgOne.eligible.length,
        blocked: stgOne.blocked.length,
      },
      dosingTotals: {
        placeholderAbsent: dosingOne.placeholderAbsent.length,
        numericSuspect: dosingOne.numericSuspect.length,
        otherDraft: dosingOne.otherDraft.length,
      },
    });
    assert.equal(snap.scope, "a");
    assert.match(snap.nextActions.join("\n"), /Batch A/i);
  });
});
