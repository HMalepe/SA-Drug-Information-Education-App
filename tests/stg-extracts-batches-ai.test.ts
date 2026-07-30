import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { chunksFromStgExtracts, type Source, type StgExtract } from "@materia/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const BATCH_SEEDS: Array<{ batch: string; file: string }> = [
  { batch: "A", file: "emergency-supportive.json" },
  { batch: "B", file: "infectious-disease-eml.json" },
  { batch: "C", file: "hospital-chronic-eml.json" },
  { batch: "D", file: "phc-eml.json" },
  { batch: "E", file: "phc-hiv-tb-eml.json" },
  { batch: "F", file: "phc-supportive-eml.json" },
  { batch: "G", file: "paediatric-eml.json" },
  { batch: "H", file: "paediatric-cardio-neuro-eml.json" },
  { batch: "I", file: "paediatric-supportive-eml.json" },
];

const stgDoc = JSON.parse(
  readFileSync(join(root, "content/rag/stg-extracts.json"), "utf8"),
) as { extracts: StgExtract[] };

const byMolecule = new Map(stgDoc.extracts.map((e) => [e.moleculeId, e]));

const doh: Source = {
  id: "src-doh-stg",
  citation: "DoH STG/EML (public pointer)",
  sourceType: "guideline",
  lastReviewed: "2026-07-31",
};

describe("STG/RAG extracts for Batches A–I", () => {
  it("covers every scaffolded Batch A–I molecule with an extract row", () => {
    for (const { batch, file } of BATCH_SEEDS) {
      const seed = JSON.parse(readFileSync(join(root, "content/seed", file), "utf8")) as {
        molecules: Array<{ id: string; slug: string }>;
      };
      for (const m of seed.molecules) {
        assert.ok(
          byMolecule.has(m.id),
          `Batch ${batch} molecule ${m.id} missing from stg-extracts.json`,
        );
      }
    }
  });

  it("keeps Batch A–I refresh extracts draft-gated (no invent, no index until publish)", () => {
    const draftBatchIds = new Set<string>();
    for (const { file } of BATCH_SEEDS) {
      const seed = JSON.parse(readFileSync(join(root, "content/seed", file), "utf8")) as {
        molecules: Array<{ id: string }>;
      };
      for (const m of seed.molecules) draftBatchIds.add(m.id);
    }

    const refreshDrafts = stgDoc.extracts.filter(
      (e) => draftBatchIds.has(e.moleculeId) && e.publishState === "draft",
    );
    assert.ok(refreshDrafts.length >= 70, `expected many draft batch pointers, got ${refreshDrafts.length}`);

    for (const e of refreshDrafts) {
      assert.equal(e.sourceId, "src-doh-stg");
      assert.match(e.text, /does not invent/i);
      assert.match(e.text, /draft/i);
      assert.ok(!/\d+\s*mg\b/i.test(e.text), `numeric mg in ${e.id}`);
      assert.ok(!/\d+\s*mmol\b/i.test(e.text), `numeric mmol in ${e.id}`);
      assert.equal(
        chunksFromStgExtracts(e.moleculeId, [e], (id) => (id === "src-doh-stg" ? doh : undefined))
          .length,
        0,
        `draft extract ${e.id} must not index`,
      );
    }
  });

  it("still indexes published pointer extracts (pre-batch corpus)", () => {
    const published = stgDoc.extracts.find(
      (e) => e.moleculeId === "mol-amox" && e.publishState === "published",
    );
    assert.ok(published);
    const chunks = chunksFromStgExtracts("mol-amox", [published!], (id) =>
      id === "src-doh-stg" ? doh : undefined,
    );
    assert.equal(chunks.length, 1);
    assert.match(chunks[0]!.text, /Essential Medicines List|does not publish/i);
  });
});
