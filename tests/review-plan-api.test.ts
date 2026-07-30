import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  STG_BATCH_A_I_SEEDS,
  buildReviewQueue,
  planDosingAllBatches,
  planStgAllBatches,
  type StgExtract,
} from "@materia/shared";

/**
 * Mirrors GET /review/plan-stg?batch=all and GET /review/plan-dosing?batch=all
 * composition used by the API (without starting the server).
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("API review plan endpoints (shared composition)", () => {
  it("plan-stg all matches founder CLI roll-up shape", () => {
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
    assert.match(plan.note, /Does not touch dosing/i);
  });

  it("plan-dosing all flags zero numeric suspects in Batch A–I scaffolds", () => {
    const batchMoleculeIds = new Map<string, string[]>();
    const molecules = [];
    const safetyProfiles = [];
    for (const ref of STG_BATCH_A_I_SEEDS) {
      const doc = JSON.parse(
        readFileSync(join(root, "content/seed", ref.seedFile), "utf8"),
      ) as {
        molecules: Array<{ id: string }>;
        safetyProfiles: unknown[];
      };
      batchMoleculeIds.set(
        ref.batch,
        doc.molecules.map((m) => m.id),
      );
      molecules.push(...doc.molecules);
      safetyProfiles.push(...(doc.safetyProfiles as never[]));
    }
    const dosingItems = buildReviewQueue({
      molecules: molecules as never[],
      safetyProfiles: safetyProfiles as never[],
      states: ["draft", "reviewed"],
    });
    const plan = planDosingAllBatches({ batchMoleculeIds, dosingItems });
    assert.equal(plan.batches.length, 9);
    assert.ok(plan.totals.placeholderAbsent >= 70);
    assert.equal(plan.totals.numericSuspect, 0);
    assert.match(plan.note, /never publish numeric_suspect/i);
  });
});
