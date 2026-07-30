/**
 * Hybrid RAG retrieval — vector + keyword over curated published chunks (docs/17).
 * Enforcement lives here: draft / unsourced / forbidden-license chunks never retrieve.
 */

import type { RetrievableChunk } from "./grounding.js";
import {
  cosineSimilarity,
  keywordOverlapScore,
  localBagOfWordsEmbedder,
  type AsyncEmbedder,
  type Embedder,
} from "./ragEmbeddings.js";
import {
  assertIndexableLicense,
  isIndexableLicense,
  licenseClassForSourceId,
  type RagLicenseClass,
} from "./ragLicense.js";
import { renderableFact } from "./publish.js";

export interface IndexedRagChunk extends RetrievableChunk {
  embedding: number[];
  licenseClass: RagLicenseClass;
  moleculeId?: string;
}

export interface RetrieveOptions {
  topK?: number;
  /** Minimum hybrid score (0–1-ish) to keep a chunk. */
  minScore?: number;
  /** Weight for vector cosine vs keyword overlap (0–1). */
  vectorWeight?: number;
  embedder?: Embedder;
}

export interface RetrieveResult {
  chunks: IndexedRagChunk[];
  scores: number[];
  embedderId: string;
}

/** Build an in-memory index from already-assembled RetrievableChunks. */
export function indexRagChunks(
  chunks: RetrievableChunk[],
  opts?: { embedder?: Embedder; moleculeId?: string },
): IndexedRagChunk[] {
  const embedder = opts?.embedder ?? localBagOfWordsEmbedder;
  const out: IndexedRagChunk[] = [];

  for (const c of chunks) {
    const rendered = renderableFact(c.fact);
    if (!rendered || !c.source) continue;

    const license = licenseClassForSourceId(c.source.id);
    if (!license || !isIndexableLicense(license)) continue;

    assertIndexableLicense(license, c.fieldPath);

    out.push({
      ...c,
      text: String(rendered.value),
      fact: rendered,
      embedding: embedder.embed(`${c.fieldPath} ${rendered.value}`),
      licenseClass: license,
      moleculeId: opts?.moleculeId,
    });
  }

  return out;
}

/** Async index when a hosted in-region embedder is configured. */
export async function indexRagChunksAsync(
  chunks: RetrievableChunk[],
  opts?: { embedder?: AsyncEmbedder; moleculeId?: string },
): Promise<IndexedRagChunk[]> {
  if (!opts?.embedder) {
    return indexRagChunks(chunks, { moleculeId: opts?.moleculeId });
  }
  const embedder = opts.embedder;
  const out: IndexedRagChunk[] = [];

  for (const c of chunks) {
    const rendered = renderableFact(c.fact);
    if (!rendered || !c.source) continue;

    const license = licenseClassForSourceId(c.source.id);
    if (!license || !isIndexableLicense(license)) continue;

    assertIndexableLicense(license, c.fieldPath);

    out.push({
      ...c,
      text: String(rendered.value),
      fact: rendered,
      embedding: await embedder.embedAsync(`${c.fieldPath} ${rendered.value}`),
      licenseClass: license,
      moleculeId: opts?.moleculeId,
    });
  }

  return out;
}

/**
 * Hybrid retrieve: score = vectorWeight * cosine + (1 - vectorWeight) * keywordOverlap.
 * Returns empty when nothing clears minScore — caller must refuse (never invent).
 */
export function retrieveRagChunks(
  question: string,
  index: IndexedRagChunk[],
  opts: RetrieveOptions = {},
): RetrieveResult {
  const topK = opts.topK ?? 5;
  const minScore = opts.minScore ?? 0.12;
  const vectorWeight = opts.vectorWeight ?? 0.55;
  const embedder = opts.embedder ?? localBagOfWordsEmbedder;
  const q = question.trim();

  if (!q || index.length === 0) {
    return { chunks: [], scores: [], embedderId: embedder.id };
  }

  const qVec = embedder.embed(q);
  const ranked = index
    .map((chunk) => {
      const vec = cosineSimilarity(qVec, chunk.embedding);
      const kw = keywordOverlapScore(q, `${chunk.fieldPath} ${chunk.text}`);
      const score = vectorWeight * vec + (1 - vectorWeight) * kw;
      return { chunk, score };
    })
    .filter((r) => r.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return {
    chunks: ranked.map((r) => r.chunk),
    scores: ranked.map((r) => r.score),
    embedderId: embedder.id,
  };
}

/** Async retrieve when a hosted in-region embedder embeds the query. */
export async function retrieveRagChunksAsync(
  question: string,
  index: IndexedRagChunk[],
  opts: RetrieveOptions & { asyncEmbedder?: AsyncEmbedder } = {},
): Promise<RetrieveResult> {
  if (!opts.asyncEmbedder) {
    return retrieveRagChunks(question, index, opts);
  }
  const topK = opts.topK ?? 5;
  const minScore = opts.minScore ?? 0.12;
  const vectorWeight = opts.vectorWeight ?? 0.55;
  const embedder = opts.asyncEmbedder;
  const q = question.trim();

  if (!q || index.length === 0) {
    return { chunks: [], scores: [], embedderId: embedder.id };
  }

  const qVec = await embedder.embedAsync(q);
  const ranked = index
    .map((chunk) => {
      const vec = cosineSimilarity(qVec, chunk.embedding);
      const kw = keywordOverlapScore(q, `${chunk.fieldPath} ${chunk.text}`);
      const score = vectorWeight * vec + (1 - vectorWeight) * kw;
      return { chunk, score };
    })
    .filter((r) => r.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return {
    chunks: ranked.map((r) => r.chunk),
    scores: ranked.map((r) => r.score),
    embedderId: embedder.id,
  };
}
