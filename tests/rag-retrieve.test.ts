import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  answerUsesOnlyRetrievedText,
  assertIndexableLicense,
  assertInRegionEndpoint,
  chunksFromInsertDocuments,
  chunksFromPublishedInteractions,
  chunksFromStgExtracts,
  cosineSimilarity,
  createHostedInRegionEmbedder,
  createHostedInRegionEmbedderStub,
  createHostedInRegionLlmComposer,
  groundedAskFromCorpus,
  groundedAskFromCorpusAsync,
  indexRagChunks,
  licenseClassForSourceId,
  localBagOfWordsEmbedder,
  parseInRegionRagEnv,
  describeInRegionRagEnv,
  retrieveRagChunks,
  strictQuoteComposer,
  templateGroundedComposer,
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

describe("RAG grounded composer", () => {
  const composeCorpus = [
    chunk("moa", "Amoxicillin blocks bacterial cell-wall synthesis.", edu),
    chunk(
      "counselling",
      "Take this antibiotic exactly as directed. Finish the course unless your clinician says stop.",
      edu,
    ),
  ];

  it("template composer refuses empty chunks", () => {
    assert.throws(() => templateGroundedComposer.compose({ question: "x", chunks: [], scores: [] }));
  });

  it("strict quote answer stays within retrieved text", () => {
    const ans = groundedAskFromCorpus("cell wall synthesis antibiotic", composeCorpus, {
      minScore: 0.05,
      composer: strictQuoteComposer,
    });
    assert.equal(ans.status, "answered");
    assert.ok(
      answerUsesOnlyRetrievedText(ans.answer ?? "", [
        "Amoxicillin blocks bacterial cell-wall synthesis.",
        "Take this antibiotic exactly as directed. Finish the course unless your clinician says stop.",
      ]),
    );
  });

  it("hosted in-region embedder stub never silently calls offshore", () => {
    const stub = createHostedInRegionEmbedderStub();
    assert.throws(() => stub.embed("amoxicillin"), /not configured|in-region/i);
    const withUrl = createHostedInRegionEmbedderStub({ endpointUrl: "https://embed.local.za" });
    assert.throws(() => withUrl.embed("amoxicillin"), /stub cannot|createHostedInRegionEmbedder|offshore/i);
  });
});

describe("RAG in-region HTTP adapters", () => {
  it("assertInRegionEndpoint refuses known offshore hosts", () => {
    assert.throws(
      () => assertInRegionEndpoint("https://api.openai.com/v1/embeddings"),
      /offshore|openai/i,
    );
    assert.throws(
      () => assertInRegionEndpoint("https://api.anthropic.com/v1/messages"),
      /offshore|anthropic/i,
    );
    assert.throws(
      () => assertInRegionEndpoint("https://embed.example.com/v1"),
      /allowlist/i,
    );
  });

  it("assertInRegionEndpoint allows localhost, .za, and founder allowHosts", () => {
    assert.equal(assertInRegionEndpoint("http://127.0.0.1:8080/embed").hostname, "127.0.0.1");
    assert.equal(
      assertInRegionEndpoint("https://rag.materia.za/embed").hostname,
      "rag.materia.za",
    );
    assert.equal(
      assertInRegionEndpoint("https://vendor.cloud.example/v1", {
        allowHosts: ["vendor.cloud.example"],
      }).hostname,
      "vendor.cloud.example",
    );
  });

  it("hosted embedder POSTs text and returns embedding (mock fetch)", async () => {
    const expected = Array.from({ length: 64 }, (_, i) => i / 64);
    let sawBody = "";
    const embedder = createHostedInRegionEmbedder({
      endpointUrl: "https://embed.local.za/v1",
      fetchImpl: async (_url, init) => {
        sawBody = init?.body ?? "";
        return {
          ok: true,
          status: 200,
          text: async () => "",
          json: async () => ({ embedding: expected }),
        };
      },
    });
    const vec = await embedder.embedAsync("amoxicillin counselling");
    assert.deepEqual(vec, expected);
    assert.match(sawBody, /"text"/);
    assert.match(sawBody, /amoxicillin counselling/);
  });

  it("hosted embedder refuses HTTP error without offshore fallback", async () => {
    const embedder = createHostedInRegionEmbedder({
      endpointUrl: "http://localhost:9999/embed",
      fetchImpl: async () => ({
        ok: false,
        status: 503,
        text: async () => "down",
        json: async () => ({}),
      }),
    });
    await assert.rejects(() => embedder.embedAsync("x"), /HTTP 503|offshore/i);
  });

  it("hosted LLM composer sends chunks-only payload and grounds answer", async () => {
    const chunkText = "Amoxicillin blocks bacterial cell-wall synthesis.";
    let payload = "";
    const composer = createHostedInRegionLlmComposer({
      endpointUrl: "https://llm.local.za/compose",
      fetchImpl: async (_url, init) => {
        payload = init?.body ?? "";
        return {
          ok: true,
          status: 200,
          text: async () => "",
          json: async () => ({ answer: chunkText }),
        };
      },
    });
    const out = await composer.composeAsync({
      question: "mechanism?",
      chunks: [
        {
          fieldPath: "moa",
          text: chunkText,
          fact: {
            value: chunkText,
            sourceId: "src-materia-edu",
            publishState: "published",
            lastReviewed: "2026-07-30",
          },
          source: edu,
          embedding: [],
          licenseClass: "owned_authoring",
        },
      ],
      scores: [0.9],
    });
    assert.equal(out.answer, chunkText);
    assert.match(payload, /"chunks"/);
    assert.match(payload, /fieldPath/);
    assert.ok(!payload.includes("patient"));
    assert.ok(!/"mg"|trough|INR/.test(payload));
  });

  it("hosted LLM composer refuses empty chunks and ungrounded answers", async () => {
    const composer = createHostedInRegionLlmComposer({
      endpointUrl: "https://llm.local.za/compose",
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        text: async () => "",
        json: async () => ({ answer: "Give 500 mg TDS — invented." }),
      }),
    });
    await assert.rejects(
      () => composer.composeAsync({ question: "dose?", chunks: [], scores: [] }),
      /no retrieved chunks/i,
    );
    await assert.rejects(
      () =>
        composer.composeAsync({
          question: "dose?",
          chunks: [
            {
              fieldPath: "dosing",
              text: "Adult dosing not published in Materia yet.",
              fact: {
                value: "Adult dosing not published in Materia yet.",
                sourceId: "src-doh-stg",
                publishState: "published",
                lastReviewed: "2026-07-01",
              },
              source: stg,
              embedding: [],
              licenseClass: "public_guideline",
            },
          ],
          scores: [0.5],
        }),
      /grounding check/i,
    );
  });
});

describe("RAG in-region env + async ask", () => {
  it("parseInRegionRagEnv defaults to blank (local/template)", () => {
    const cfg = parseInRegionRagEnv({});
    assert.equal(cfg.embedderUrl, undefined);
    assert.equal(cfg.llmUrl, undefined);
    assert.deepEqual(cfg.allowHosts, []);
  });

  it("parseInRegionRagEnv refuses offshore LLM URL", () => {
    assert.throws(
      () =>
        parseInRegionRagEnv({
          MATERIA_IN_REGION_LLM_URL: "https://api.openai.com/v1/chat",
        }),
      /offshore|openai/i,
    );
  });

  it("parseInRegionRagEnv accepts .za URLs and allowHosts", () => {
    const cfg = parseInRegionRagEnv({
      MATERIA_IN_REGION_EMBEDDER_URL: "https://embed.materia.za/v1",
      MATERIA_IN_REGION_LLM_URL: "https://llm.vendor.example/compose",
      MATERIA_IN_REGION_ALLOW_HOSTS: "llm.vendor.example",
      MATERIA_IN_REGION_AUTH_TOKEN: "test-token-not-a-secret",
    });
    assert.match(cfg.embedderUrl ?? "", /embed\.materia\.za/);
    assert.match(cfg.llmUrl ?? "", /llm\.vendor\.example/);
    assert.equal(cfg.authToken, "test-token-not-a-secret");
  });

  it("groundedAskFromCorpusAsync uses hosted LLM compose when provided", async () => {
    const chunkText = "Amoxicillin blocks bacterial cell-wall synthesis.";
    const corpus = [
      {
        fieldPath: "moa",
        text: chunkText,
        fact: {
          value: chunkText,
          sourceId: "src-materia-edu",
          publishState: "published" as const,
          lastReviewed: "2026-07-30",
        },
        source: edu,
      },
    ];
    const ans = await groundedAskFromCorpusAsync("cell wall mechanism", corpus, {
      minScore: 0.05,
      composeAsync: async () => ({ answer: chunkText, composerId: "test-llm" }),
    });
    assert.equal(ans.status, "answered");
    assert.equal(ans.answer, chunkText);
  });

  it("groundedAskFromCorpusAsync refuses when hosted LLM invents", async () => {
    const chunkText = "Adult dosing not published in Materia yet.";
    const corpus = [
      {
        fieldPath: "dosing.adult",
        text: chunkText,
        fact: {
          value: chunkText,
          sourceId: "src-doh-stg",
          publishState: "published" as const,
          lastReviewed: "2026-07-01",
        },
        source: stg,
      },
    ];
    const ans = await groundedAskFromCorpusAsync(
      "adult dosing published Materia yet?",
      corpus,
      {
        minScore: 0.05,
        composeAsync: async () => {
          throw new Error("In-region LLM answer failed grounding check — refuse.");
        },
      },
    );
    assert.equal(ans.status, "refused");
    assert.match(ans.refusalReason ?? "", /grounding|will not invent|offshore/i);
  });
});

describe("RAG in-region env status (deploy/health)", () => {
  it("describeInRegionRagEnv reports local mode when blank", () => {
    const s = describeInRegionRagEnv({});
    assert.equal(s.ok, true);
    assert.equal(s.mode.embedder, "local-bow");
    assert.equal(s.mode.composer, "template");
    assert.equal(s.authTokenConfigured, false);
    assert.equal(s.embedderHost, null);
  });

  it("describeInRegionRagEnv reports hosts without leaking token", () => {
    const s = describeInRegionRagEnv({
      MATERIA_IN_REGION_EMBEDDER_URL: "https://embed.materia.za/v1",
      MATERIA_IN_REGION_LLM_URL: "https://llm.materia.za/compose",
      MATERIA_IN_REGION_AUTH_TOKEN: "super-secret-token-value",
    });
    assert.equal(s.ok, true);
    assert.equal(s.mode.embedder, "hosted-in-region");
    assert.equal(s.mode.composer, "hosted-in-region-llm");
    assert.equal(s.embedderHost, "embed.materia.za");
    assert.equal(s.llmHost, "llm.materia.za");
    assert.equal(s.authTokenConfigured, true);
    assert.ok(!JSON.stringify(s).includes("super-secret-token-value"));
  });

  it("describeInRegionRagEnv fails closed on offshore URL", () => {
    const s = describeInRegionRagEnv({
      MATERIA_IN_REGION_LLM_URL: "https://api.openai.com/v1/chat",
    });
    assert.equal(s.ok, false);
    assert.ok(s.errors.length >= 1);
    assert.match(s.errors[0] ?? "", /offshore|openai/i);
  });
});
