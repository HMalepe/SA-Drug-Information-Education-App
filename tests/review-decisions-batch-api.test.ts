import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  STG_BATCH_A_I_SEEDS,
  filterReviewDecisionsByMoleculeIds,
  listRecentReviewDecisions,
  type ReviewDecision,
  type StgExtract,
} from "@materia/shared";

/**
 * Mirrors GET /review/decisions?batch= composition in api/src/index.ts
 * (without starting the server). Uses real Batch A–I seed + STG extracts.
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

/** Compose the GET /review/decisions response body the same way the API does. */
function composeDecisions(input: {
  batchRaw: string | undefined;
  limitRaw: number;
  decisions: ReviewDecision[];
  batchMoleculeIds: Map<string, string[]>;
  extracts: StgExtract[];
}):
  | { ok: true; scope: string; total: number; limit: number; items: ReviewDecision[]; note: string }
  | { ok: false; status: 400; error: string } {
  const limit = Number.isFinite(input.limitRaw) ? input.limitRaw : 50;
  const batch = String(input.batchRaw ?? "all").trim().toUpperCase() || "ALL";

  let scoped = input.decisions;
  let scope = "all";
  if (batch !== "ALL") {
    const ids = input.batchMoleculeIds.get(batch);
    if (!ids) {
      return { ok: false, status: 400, error: `Unknown batch ${batch}. Use A–I or all.` };
    }
    const extractMoleculeById = new Map(input.extracts.map((e) => [e.id, e.moleculeId]));
    scoped = filterReviewDecisionsByMoleculeIds(input.decisions, ids, extractMoleculeById);
    scope = batch;
  }

  const items = listRecentReviewDecisions(scoped, limit);
  return {
    ok: true,
    scope,
    total: scoped.length,
    limit: items.length,
    items,
    note:
      scope === "all"
        ? "Audit journal (newest first). publishState changes only — never invented clinical text. Empty until first persisted decide."
        : `Audit journal filtered to Batch ${scope} molecules (dosing + STG queue ids). publishState only — never invented clinical text.`,
  };
}

describe("API GET /review/decisions?batch= (shared composition)", () => {
  const batchMoleculeIds = loadBatchMoleculeIds();
  const extracts = loadExtracts();
  const batchAIds = new Set(batchMoleculeIds.get("A") ?? []);
  const batchAExtract = extracts.find((e) => batchAIds.has(e.moleculeId));
  const otherExtract = extracts.find((e) => !batchAIds.has(e.moleculeId));

  assert.ok(batchAExtract, "expected at least one Batch A STG extract in seed corpus");
  assert.ok(otherExtract, "expected at least one non-A STG extract in seed corpus");

  const sample: ReviewDecision[] = [
    {
      id: "d1",
      queueItemId: `${[...batchAIds][0]}:dosingAdult`,
      decision: "publish",
      reviewerLabel: "Founder",
      at: "2026-07-01T00:00:00.000Z",
    },
    {
      id: "d2",
      queueItemId: `stg:${batchAExtract!.id}`,
      decision: "publish",
      reviewerLabel: "Founder",
      at: "2026-07-02T00:00:00.000Z",
    },
    {
      id: "d3",
      queueItemId: `stg:${otherExtract!.id}`,
      decision: "mark_reviewed",
      reviewerLabel: "Founder",
      at: "2026-07-03T00:00:00.000Z",
    },
    {
      id: "d4",
      queueItemId: `${otherExtract!.moleculeId}:dosingAdult`,
      decision: "keep_draft",
      reviewerLabel: "Founder",
      at: "2026-07-04T00:00:00.000Z",
    },
  ];

  it("batch=all returns full journal scope", () => {
    const body = composeDecisions({
      batchRaw: "all",
      limitRaw: 50,
      decisions: sample,
      batchMoleculeIds,
      extracts,
    });
    assert.equal(body.ok, true);
    if (!body.ok) return;
    assert.equal(body.scope, "all");
    assert.equal(body.total, 4);
    assert.equal(body.items.length, 4);
    assert.match(body.note, /newest first/i);
  });

  it("batch=A filters dosing + STG queue ids to Batch A molecules", () => {
    const body = composeDecisions({
      batchRaw: "a",
      limitRaw: 50,
      decisions: sample,
      batchMoleculeIds,
      extracts,
    });
    assert.equal(body.ok, true);
    if (!body.ok) return;
    assert.equal(body.scope, "A");
    assert.equal(body.total, 2);
    assert.deepEqual(
      body.items.map((d) => d.id).sort(),
      ["d1", "d2"],
    );
    assert.match(body.note, /Batch A/i);
  });

  it("unknown batch mirrors 400 guard", () => {
    assert.equal(batchMoleculeIds.get("Z"), undefined);
    const body = composeDecisions({
      batchRaw: "Z",
      limitRaw: 20,
      decisions: sample,
      batchMoleculeIds,
      extracts,
    });
    assert.equal(body.ok, false);
    if (body.ok) return;
    assert.equal(body.status, 400);
    assert.match(body.error, /Unknown batch Z/i);
  });

  it("limit truncates items but total stays scoped count", () => {
    const body = composeDecisions({
      batchRaw: "all",
      limitRaw: 2,
      decisions: sample,
      batchMoleculeIds,
      extracts,
    });
    assert.equal(body.ok, true);
    if (!body.ok) return;
    assert.equal(body.total, 4);
    assert.equal(body.limit, 2);
    assert.equal(body.items.length, 2);
    assert.deepEqual(
      body.items.map((d) => d.id),
      ["d4", "d3"],
    );
  });
});
