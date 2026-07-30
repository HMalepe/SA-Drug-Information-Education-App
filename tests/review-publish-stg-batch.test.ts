import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  STG_BATCH_A_I_SEEDS,
  applyStgBatchPublish,
  planStgAllBatches,
  planStgBatchPublish,
  setStgExtractPublishStateInDoc,
  type StgExtract,
} from "@materia/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ATTESTATION = "I confirm sourced from DoH STG pointer only — no invented doses.";

function loadBatchMoleculeIds(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const ref of STG_BATCH_A_I_SEEDS) {
    const doc = JSON.parse(
      readFileSync(join(root, "content/seed", ref.seedFile), "utf8"),
    ) as { molecules: Array<{ id: string }> };
    map.set(
      ref.batch,
      doc.molecules.map((m) => m.id),
    );
  }
  return map;
}

function loadExtracts(): StgExtract[] {
  return (
    JSON.parse(readFileSync(join(root, "content/rag/stg-extracts.json"), "utf8")) as {
      extracts: StgExtract[];
    }
  ).extracts;
}

describe("applyStgBatchPublish (API/CLI shared gate)", () => {
  it("refuses when attestation lacks sourced/confirm", () => {
    const batchMoleculeIds = loadBatchMoleculeIds();
    const extracts = loadExtracts();
    const plan = planStgBatchPublish({
      batch: "A",
      extracts,
      moleculeIds: batchMoleculeIds.get("A") ?? [],
    });
    const applied = applyStgBatchPublish({
      scope: "A",
      plans: [plan],
      reviewerLabel: "Founder pharmacist",
      attestation: "looks fine",
    });
    assert.equal(applied.ok, false);
    if (!applied.ok) {
      assert.match(applied.reason, /sourced|confirm/i);
      assert.equal(applied.blocked.length, 0);
    }
  });

  it("refuses whole batch when any extract is blocked", () => {
    const batchMoleculeIds = loadBatchMoleculeIds();
    const plan = planStgBatchPublish({
      batch: "A",
      extracts: loadExtracts(),
      moleculeIds: batchMoleculeIds.get("A") ?? [],
      attestation: ATTESTATION,
    });
    const poisoned = {
      ...plan,
      blocked: [
        ...plan.blocked,
        {
          extractId: "stg-fake-blocked",
          reason: "Extract preview contains numeric dose units — refuse.",
          preview: "pointer with 500 mg",
        },
      ],
    };
    const applied = applyStgBatchPublish({
      scope: "A",
      plans: [poisoned],
      reviewerLabel: "Founder pharmacist",
      attestation: ATTESTATION,
    });
    assert.equal(applied.ok, false);
    if (!applied.ok) {
      assert.match(applied.reason, /blocked/i);
      assert.ok(applied.blocked.some((b) => b.extractId === "stg-fake-blocked"));
    }
  });

  it("plan-stg blocks extracts whose preview contains numeric mg", () => {
    const batchMoleculeIds = loadBatchMoleculeIds();
    const ids = batchMoleculeIds.get("A") ?? [];
    assert.ok(ids.length > 0);
    const extracts = loadExtracts().map((e) => ({ ...e }));
    const victim = extracts.find((e) => ids.includes(e.moleculeId));
    assert.ok(victim, "expected an STG extract for a batch A molecule");
    victim!.publishState = "draft";
    victim!.text = "Educational pointer only — invented 500 mg — refuse.";
    const plan = planStgBatchPublish({
      batch: "A",
      extracts,
      moleculeIds: ids,
      attestation: ATTESTATION,
    });
    assert.ok(plan.blocked.some((b) => b.extractId === victim!.id));
  });

  it("on success mutates publishState only — extract text unchanged", () => {
    const batchMoleculeIds = loadBatchMoleculeIds();
    const extracts = loadExtracts().map((e) => ({ ...e }));
    const textBefore = new Map(extracts.map((e) => [e.id, e.text]));
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
      at: "2026-07-31T00:00:00.000Z",
    });
    assert.equal(applied.ok, true);
    if (!applied.ok) return;

    assert.equal(applied.mutations.length, plan.eligible.length);
    assert.equal(applied.decisions.length, plan.eligible.length);
    assert.ok(applied.decisions.every((d) => d.attestation === ATTESTATION));
    assert.ok(applied.decisions.every((d) => d.decision === "publish"));

    const doc = { extracts };
    for (const m of applied.mutations) {
      assert.ok(m.from === "draft" || m.from === "reviewed");
      assert.equal(m.to, "published");
      assert.ok(setStgExtractPublishStateInDoc(doc, m.extractId, m.to, "2026-07-31"));
    }
    for (const e of extracts) {
      assert.equal(e.text, textBefore.get(e.id), `${e.id} text must be unchanged`);
    }
    assert.ok(extracts.some((e) => e.publishState === "published"));
  });

  it("all-batch apply is idempotent when everything already published", () => {
    const batchMoleculeIds = loadBatchMoleculeIds();
    const extracts = loadExtracts().map((e) => ({
      ...e,
      publishState: "published" as const,
    }));
    const rollup = planStgAllBatches({
      batchMoleculeIds,
      extracts,
      attestation: ATTESTATION,
    });
    assert.equal(rollup.totals.eligible, 0);
    const applied = applyStgBatchPublish({
      scope: "all",
      plans: rollup.batches,
      reviewerLabel: "Founder pharmacist",
      attestation: ATTESTATION,
    });
    assert.equal(applied.ok, true);
    if (applied.ok) {
      assert.equal(applied.mutations.length, 0);
      assert.ok(applied.alreadyPublished > 0);
    }
  });
});
