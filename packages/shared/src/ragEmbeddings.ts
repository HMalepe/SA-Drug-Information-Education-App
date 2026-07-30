/**
 * RAG embeddings — pluggable embedder behind an internal interface (docs/16, docs/17).
 * Default: deterministic local bag-of-words vector (no API key, offline-capable).
 * Never send identifiable patient text to offshore embedders — call sites strip first (POPIA).
 */

import { assertInRegionEndpoint, type FetchLike } from "./ragInRegion.js";

export const RAG_EMBED_DIM = 64;

export interface Embedder {
  readonly id: string;
  embed(text: string): number[];
}

/** Async-capable hosted embedder (HTTP). */
export interface AsyncEmbedder {
  readonly id: string;
  embedAsync(text: string): Promise<number[]>;
}

/** Stable 32-bit hash for token → dimension bucket. */
function hashToken(token: string): number {
  let h = 2166136261;
  for (let i = 0; i < token.length; i++) {
    h ^= token.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter((t) => t.length > 2);
}

/**
 * Local embedder — educational/runtime default until a hosted in-region embedder is wired.
 * Not a clinical model: only used to rank already-curated, published chunks.
 */
export const localBagOfWordsEmbedder: Embedder = {
  id: "local-bow-v1",
  embed(text: string): number[] {
    const vec = new Array<number>(RAG_EMBED_DIM).fill(0);
    const tokens = tokenize(text);
    if (tokens.length === 0) return vec;
    for (const t of tokens) {
      const bucket = hashToken(t) % RAG_EMBED_DIM;
      const sign = hashToken(`s:${t}`) % 2 === 0 ? 1 : -1;
      vec[bucket] = (vec[bucket] ?? 0) + sign;
    }
    // L2 normalise for cosine
    let norm = 0;
    for (const v of vec) norm += v * v;
    norm = Math.sqrt(norm) || 1;
    return vec.map((v) => v / norm);
  },
};

export function cosineSimilarity(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < n; i++) {
    dot += a[i]! * b[i]!;
    na += a[i]! * a[i]!;
    nb += b[i]! * b[i]!;
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}

export function keywordOverlapScore(question: string, haystack: string): number {
  const terms = tokenize(question);
  if (terms.length === 0) return 0;
  const hay = haystack.toLowerCase();
  return terms.reduce((acc, t) => (hay.includes(t) ? acc + 1 : acc), 0) / terms.length;
}

/**
 * Placeholder for a hosted in-region embedder (docs/17).
 * Refuses until MATERIA_IN_REGION_EMBEDDER_URL is set AND an adapter is registered —
 * never silently falls through to an offshore API.
 */
export function createHostedInRegionEmbedderStub(opts?: {
  endpointUrl?: string;
}): Embedder {
  const url = opts?.endpointUrl?.trim() ?? "";
  return {
    id: "hosted-in-region-stub",
    embed(_text: string): number[] {
      if (!url) {
        throw new Error(
          "In-region embedder not configured. Use localBagOfWordsEmbedder, or set a founder-approved in-region endpoint — never send health text offshore.",
        );
      }
      throw new Error(
        `In-region embedder stub cannot call HTTP. Use createHostedInRegionEmbedder({ endpointUrl, fetchImpl }) — falling open to offshore models is forbidden.`,
      );
    },
  };
}

export interface HostedEmbedderOpts {
  endpointUrl: string;
  /** Injected fetch for tests / runtimes without global fetch. */
  fetchImpl: FetchLike;
  allowHosts?: string[];
  expectedDim?: number;
  /**
   * Optional bearer token for the in-region service.
   * Never log or commit secrets — pass from env at the API boundary only.
   */
  authToken?: string;
}

/**
 * Hosted in-region embedder HTTP adapter (async).
 * POSTs `{ text }` to a founder-approved endpoint; expects `{ embedding: number[] }`.
 * Refuses known offshore hosts. Does not invent vectors on failure.
 */
export function createHostedInRegionEmbedder(opts: HostedEmbedderOpts): AsyncEmbedder {
  assertInRegionEndpoint(opts.endpointUrl, { allowHosts: opts.allowHosts });
  const expectedDim = opts.expectedDim ?? RAG_EMBED_DIM;

  return {
    id: "hosted-in-region-http-v1",
    async embedAsync(text: string): Promise<number[]> {
      return embedWithHostedInRegion(text, { ...opts, expectedDim });
    },
  };
}

/**
 * Async embed against a founder-approved in-region HTTP endpoint.
 */
export async function embedWithHostedInRegion(
  text: string,
  opts: HostedEmbedderOpts,
): Promise<number[]> {
  const url = assertInRegionEndpoint(opts.endpointUrl, { allowHosts: opts.allowHosts });
  const expectedDim = opts.expectedDim ?? RAG_EMBED_DIM;
  const headers: Record<string, string> = {
    "content-type": "application/json",
    accept: "application/json",
  };
  if (opts.authToken?.trim()) {
    headers.authorization = `Bearer ${opts.authToken.trim()}`;
  }
  const res = await opts.fetchImpl(url.toString(), {
    method: "POST",
    headers,
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    throw new Error(
      `In-region embedder HTTP ${res.status}. Will not fall back to an offshore model.`,
    );
  }
  const body = (await res.json()) as { embedding?: unknown };
  if (!Array.isArray(body.embedding) || !body.embedding.every((n) => typeof n === "number")) {
    throw new Error("In-region embedder response missing numeric embedding[] — refusing.");
  }
  if (body.embedding.length !== expectedDim) {
    throw new Error(
      `In-region embedder returned dim ${body.embedding.length}; expected ${expectedDim}.`,
    );
  }
  return body.embedding as number[];
}
