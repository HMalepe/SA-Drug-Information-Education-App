import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  assertIndexableLicense,
  chunksFromInsertDocuments,
  chunksFromPublishedInteractions,
  chunksFromStgExtracts,
  cosineSimilarity,
  groundedAskFromCorpus,
  indexRagChunks,
  licenseClassForSourceId,
  localBagOfWordsEmbedder,
  retrieveRagChunks,
  type InsertDocument,
  type Interaction,
  type RetrievableChunk,
  type Source,
  type StgExtract,
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

describe("RAG corpus — interactions + STG extracts", () => {
  const sources: Record<string, Source> = { "src-materia-edu": edu, "src-doh-stg": stg };
  const byId = (id: string) => sources[id];

  const ix: Interaction = {
    id: "ix-warfarin-aspirin",
    moleculeAId: "mol-warfarin",
    moleculeBId: "mol-aspirin",
    severity: "major",
    mechanism: {
      value: "Additive bleeding risk — educational flag only.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
    action: {
      value: "Do not invent a dose change — confirm clinically.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
    publishState: "published",
  };

  it("indexes published interaction mechanism and action for a molecule", () => {
    const chunks = chunksFromPublishedInteractions("mol-warfarin", [ix], byId, (id) =>
      id === "mol-warfarin" ? "warfarin" : "aspirin",
    );
    assert.equal(chunks.length, 2);
    assert.match(chunks[0]!.text, /warfarin ↔ aspirin/i);
    assert.match(chunks.map((c) => c.fieldPath).join(" "), /interaction\.ix-warfarin-aspirin/);
  });

  it("skips draft interactions and wrong molecule", () => {
    const draft: Interaction = { ...ix, publishState: "draft" };
    assert.equal(chunksFromPublishedInteractions("mol-warfarin", [draft], byId).length, 0);
    assert.equal(chunksFromPublishedInteractions("mol-amox", [ix], byId).length, 0);
  });

  it("indexes published STG extracts and skips draft", () => {
    const extracts: StgExtract[] = [
      {
        id: "stg-amox-eml-pointer",
        moleculeId: "mol-amox",
        moleculeSlug: "amoxicillin",
        edition: "DoH STG/EML — verify current public edition",
        topic: "essential-list-pointer",
        text: "Amoxicillin is an EML workhorse — Materia does not publish a numeric dose here.",
        sourceId: "src-doh-stg",
        publishState: "published",
        lastReviewed: "2026-07-30",
      },
      {
        id: "stg-metformin-draft",
        moleculeId: "mol-metformin",
        moleculeSlug: "metformin",
        edition: "draft",
        text: "Should not index",
        sourceId: "src-doh-stg",
        publishState: "draft",
        lastReviewed: "2026-07-30",
      },
    ];
    const published = chunksFromStgExtracts("mol-amox", extracts, byId);
    assert.equal(published.length, 1);
    assert.match(published[0]!.text, /STG\/EML/);
    assert.equal(chunksFromStgExtracts("mol-metformin", extracts, byId).length, 0);
  });

  it("answers interaction questions from curated rows without inventing doses", () => {
    const chunks = chunksFromPublishedInteractions("mol-warfarin", [ix], byId, () => "drug");
    const ans = groundedAskFromCorpus("warfarin aspirin bleeding interaction risk?", chunks, {
      minScore: 0.05,
    });
    assert.equal(ans.status, "answered");
    assert.match(ans.answer ?? "", /bleeding|dose change/i);
    assert.ok(!(ans.answer ?? "").match(/\d+\s*mg/i));
  });

  it("indexes published insert paraphrases and skips draft grade5", () => {
    const insertSrc: Source = {
      id: "src-insert-owned",
      citation: "Owned insert paraphrases",
      sourceType: "insert",
      lastReviewed: "2026-07-30",
    };
    sources["src-insert-owned"] = insertSrc;
    assert.equal(licenseClassForSourceId("src-insert-owned"), "insert_owned");

    const docs: InsertDocument[] = [
      {
        id: "insert-amox-demo",
        moleculeId: "mol-amox",
        moleculeSlug: "amoxicillin",
        passages: [
          {
            level: "professional",
            title: "Pro",
            body: "Beta-lactam counselling — Materia does not invent a dose.",
            publishState: "published",
            sourceId: "src-insert-owned",
            lastReviewed: "2026-07-30",
          },
          {
            level: "grade5",
            title: "Plain",
            body: "Draft plain rewrite should not index.",
            publishState: "draft",
            sourceId: "src-insert-owned",
            lastReviewed: "2026-07-30",
          },
        ],
      },
    ];
    const chunks = chunksFromInsertDocuments("mol-amox", docs, byId);
    assert.equal(chunks.length, 1);
    assert.match(chunks[0]!.fieldPath, /insert\.insert-amox-demo\.professional/);
    assert.match(chunks[0]!.text, /Beta-lactam|does not invent/i);
  });
});
