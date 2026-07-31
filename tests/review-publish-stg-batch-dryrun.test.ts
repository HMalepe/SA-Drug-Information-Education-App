import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  STG_BATCH_A_I_SEEDS,
  applyStgBatchPublish,
  planStgBatchPublish,
  type StgExtract,
} from "@materia/shared";

/**
 * Mirrors POST /review/publish-stg-batch { dryRun: true } — gate runs, no write.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ATTESTATION = "I confirm sourced from DoH STG pointer only — no invented doses.";

describe("POST /review/publish-stg-batch dryRun composition", () => {
  it("dry-run lists planned mutations without requiring disk write", () => {
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

    const plan = planStgBatchPublish({
      batch: "A",
      extracts,
      moleculeIds: batchMoleculeIds.get("A") ?? [],
      attestation: ATTESTATION,
    });
    assert.equal(plan.blocked.length, 0);
    assert.ok(plan.eligible.length > 0);

    const applied = applyStgBatchPublish({
      scope: "A",
      plans: [plan],
      reviewerLabel: "Founder pharmacist",
      attestation: ATTESTATION,
    });
    assert.equal(applied.ok, true);
    if (!applied.ok) return;

    // API dryRun response shape — mutations planned, caller skips persist.
    const dryRunBody = {
      scope: "A",
      dryRun: true as const,
      count: applied.mutations.length,
      alreadyPublished: applied.alreadyPublished,
      results: applied.mutations.map((m) => ({
        batch: m.batch,
        extractId: m.extractId,
        moleculeSlug: m.moleculeSlug,
        from: m.from,
        to: m.to,
      })),
      persisted: null,
    };
    assert.equal(dryRunBody.dryRun, true);
    assert.equal(dryRunBody.persisted, null);
    assert.equal(dryRunBody.count, plan.eligible.length);
    assert.ok(dryRunBody.results.every((r) => r.to === "published"));
    assert.ok(dryRunBody.results.every((r) => r.from === "draft" || r.from === "reviewed"));

    // Disk extract states unchanged by dry-run composition (apply is pure).
    const onDisk = (
      JSON.parse(readFileSync(join(root, "content/rag/stg-extracts.json"), "utf8")) as {
        extracts: StgExtract[];
      }
    ).extracts;
    for (const m of applied.mutations) {
      const row = onDisk.find((e) => e.id === m.extractId);
      assert.ok(row);
      assert.notEqual(row!.publishState, "published");
    }
  });
});
