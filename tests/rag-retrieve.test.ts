import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  assertIndexableLicense,
  cosineSimilarity,
  groundedAskFromCorpus,
  indexRagChunks,
  licenseClassForSourceId,
  localBagOfWordsEmbedder,
  retrieveRagChunks,
  type RetrievableChunk,
  type Source,
} from "@materia/shared";

const edu: Source = {
  id: "src-materia-edu",
  citation: "Materia original counselling — founder-reviewed educational layer",
  sourceType: "original_authoring",
  lastReviewed: "2026-07-30",
};

const stg: Source = {
  id: "src-doh-stg",
  citation: "DoH STG/EML (public pointer)",
  sourceType: "guideline",
  lastReviewed: "2026-07-01",
};

function chunk(fieldPath: string, text: string, source: Source): RetrievableChunk {
  return {
    fieldPath,
    text,
    fact: {
      value: text,
      sourceId: source.id,
      publishState: "published",
      lastReviewed: source.lastReviewed,
    },
    source,
  };
}

describe("RAG license gate", () => {
  it("maps Materia seed sources to indexable classes", () => {
    assert.equal(licenseClassForSourceId("src-materia-edu"), "owned_authoring");
    assert.equal(licenseClassForSourceId("src-doh-stg"), "public_guideline");
    assert.equal(licenseClassForSourceId("src-sahpra"), "register_metadata");
  });

  it("flags SAMF/MIMS patterns as licensed_forbidden", () => {
    assert.equal(licenseClassForSourceId("src-samf-2023"), "licensed_forbidden");
    assert.equal(licenseClassForSourceId("src-mims-sa"), "licensed_forbidden");
    assert.throws(() => assertIndexableLicense("licensed_forbidden", "samf copy"));
  });
});

describe("RAG hybrid retrieve", () => {
  const corpus = [
    chunk("moa", "Amoxicillin blocks bacterial cell-wall synthesis.", edu),
    chunk(
      "counselling",
      "Take this antibiotic exactly as directed. Finish the course unless your clinician says stop.",
      edu,
    ),
    chunk(
      "dosing.adult",
      "Adult dosing not published in Materia yet — confirm against current SA STG/EML.",
      stg,
    ),
  ];

  it("indexes only published license-allowed chunks", () => {
    const index = indexRagChunks(corpus);
    assert.equal(index.length, 3);
    assert.ok(index.every((c) => c.embedding.length === 64));
  });

  it("retrieves MOA for mechanism questions via hybrid score", () => {
    const index = indexRagChunks(corpus);
    const { chunks, scores } = retrieveRagChunks(
      "How does amoxicillin cell wall mechanism work?",
      index,
      { minScore: 0.05 },
    );
    assert.ok(chunks.length > 0);
    assert.ok(scores[0]! > 0);
    assert.match(chunks.map((c) => c.fieldPath).join(" "), /moa/);
  });

  it("refuses when nothing matches (no invention)", () => {
    const ans = groundedAskFromCorpus("xyzzy quux vancomycin trough target invent mg?", corpus, {
      minScore: 0.35,
    });
    assert.equal(ans.status, "refused");
  });

  it("answers with citations and never claims SAMF", () => {
    const ans = groundedAskFromCorpus("cell wall synthesis antibiotic counselling course", corpus, {
      minScore: 0.05,
    });
    assert.equal(ans.status, "answered");
    assert.ok((ans.citations?.length ?? 0) > 0);
    assert.match(ans.answer ?? "", /hybrid RAG|curated/i);
    assert.match(ans.answer ?? "", /never ingested|SAMF/i);
  });

  it("local embedder is deterministic and cosine self-similar", () => {
    const a = localBagOfWordsEmbedder.embed("amoxicillin cell wall");
    const b = localBagOfWordsEmbedder.embed("amoxicillin cell wall");
    assert.deepEqual(a, b);
    assert.ok(cosineSimilarity(a, a) > 0.99);
  });
});
