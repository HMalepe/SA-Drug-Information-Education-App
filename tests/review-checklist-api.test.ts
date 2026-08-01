import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  STG_BATCH_A_I_SEEDS,
  buildBatchChecklist,
  buildReviewQueue,
  flattenStgEligibleItems,
  planDosingAllBatches,
  planDosingBatch,
  planStgAllBatches,
  planStgBatchPublish,
  summarizeFounderProgress,
  type StgExtract,
} from "@materia/shared";

/**
 * Mirrors GET /review/checklist?batch= composition (without starting the server).
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

describe("API GET /review/checklist?batch= (shared composition)", () => {
  it("batch=A checklist matches plan totals and never includes --write", () => {
    const batchMoleculeIds = loadBatchMoleculeIds();
    const extracts = loadExtracts();
    const dosingItems = loadDosingItems();
    const ids = batchMoleculeIds.get("A")!;
    const stg = planStgBatchPublish({ batch: "A", extracts, moleculeIds: ids });
    const dosing = planDosingBatch({ batch: "A", dosingItems, moleculeIds: ids });
    const progress = summarizeFounderProgress({
      scope: "A",
      stgTotals: {
        alreadyPublished: stg.alreadyPublished,
        eligible: stg.eligible.length,
        blocked: stg.blocked.length,
      },
      dosingTotals: {
        placeholderAbsent: dosing.placeholderAbsent.length,
        numericSuspect: dosing.numericSuspect.length,
        otherDraft: dosing.otherDraft.length,
      },
    });
    const pack = buildBatchChecklist({
      scope: "A",
      progress,
      stgBlocked: stg.blocked,
      dosingNumericSuspect: dosing.numericSuspect,
      stgEligible: stg.eligible.map((e) => ({ extractId: e.extractId })),
      dosingPlaceholders: dosing.placeholderAbsent,
    });
    assert.equal(pack.scope, "A");
    assert.equal(pack.stgCli.count, stg.eligible.length);
    assert.equal(pack.dosingCli.count, dosing.placeholderAbsent.length);
    assert.doesNotMatch(pack.stgBatchPreviewLine, /--write/);
    assert.ok(pack.stgCli.lines.every((l) => !l.includes("--write")));
    assert.ok(pack.dosingCli.lines.every((l) => !l.includes("--write")));
  });

  it("batch=all rolls up A–I eligible STG into checklist CLI count", () => {
    const batchMoleculeIds = loadBatchMoleculeIds();
    const extracts = loadExtracts();
    const dosingItems = loadDosingItems();
    const stg = planStgAllBatches({ batchMoleculeIds, extracts });
    const dosing = planDosingAllBatches({ batchMoleculeIds, dosingItems });
    const progress = summarizeFounderProgress({
      scope: "all",
      stgTotals: stg.totals,
      dosingTotals: dosing.totals,
    });
    const pack = buildBatchChecklist({
      scope: "all",
      progress,
      stgBlocked: stg.batches.flatMap((b) => b.blocked),
      dosingNumericSuspect: dosing.batches.flatMap((b) => b.numericSuspect),
      stgEligible: flattenStgEligibleItems(stg.batches),
      dosingPlaceholders: dosing.batches.flatMap((b) => b.placeholderAbsent),
    });
    assert.equal(pack.scope, "all");
    assert.equal(pack.stgCli.count, stg.totals.eligible);
    assert.equal(pack.dosingCli.count, dosing.totals.placeholderAbsent);
    assert.match(pack.stgBatchPreviewLine, /publish-stg-batch all/);
  });

  it("unknown batch is rejected by the same Map guard the route uses", () => {
    assert.equal(loadBatchMoleculeIds().get("Z"), undefined);
  });
});
