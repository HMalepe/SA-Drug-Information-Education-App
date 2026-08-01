import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  STG_BATCH_A_I_SEEDS,
  buildBatchChecklist,
  buildReviewQueue,
  planDosingBatch,
  planStgBatchPublish,
  summarizeFounderProgress,
  type StgExtract,
} from "@materia/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("buildBatchChecklist", () => {
  it("assembles Batch A sweep pack without --write on any CLI line", () => {
    const ref = STG_BATCH_A_I_SEEDS.find((b) => b.batch === "A")!;
    const doc = JSON.parse(
      readFileSync(join(root, "content/seed", ref.seedFile), "utf8"),
    ) as {
      molecules: Array<{ id: string }>;
      safetyProfiles: unknown[];
    };
    const ids = doc.molecules.map((m) => m.id);
    const extracts = (
      JSON.parse(readFileSync(join(root, "content/rag/stg-extracts.json"), "utf8")) as {
        extracts: StgExtract[];
      }
    ).extracts;
    const dosingItems = buildReviewQueue({
      molecules: doc.molecules as never[],
      safetyProfiles: doc.safetyProfiles as never[],
      states: ["draft", "reviewed"],
    });
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
    assert.equal(pack.progress.stg.eligible, stg.eligible.length);
    assert.equal(pack.progress.stg.blocked, stg.blocked.length);
    assert.equal(pack.stgCli.count, stg.eligible.length);
    assert.equal(pack.dosingCli.count, dosing.placeholderAbsent.length);
    assert.equal(pack.stgBlocked.length, stg.blocked.length);
    assert.equal(pack.dosingNumericSuspect.length, dosing.numericSuspect.length);
    assert.match(pack.stgBatchPreviewLine, /publish-stg-batch A/);
    assert.doesNotMatch(pack.stgBatchPreviewLine, /--write/);
    for (const line of [...pack.stgCli.lines, ...pack.dosingCli.lines]) {
      assert.doesNotMatch(line, /--write/);
    }
    assert.match(pack.note, /read-only/i);
  });
});
