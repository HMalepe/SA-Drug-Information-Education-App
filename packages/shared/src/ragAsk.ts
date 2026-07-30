/**
 * Grounded ask pipeline — retrieve then compose (docs/17).
 * Composition uses GroundedComposer (default: template). Any future in-region LLM
 * must receive ONLY retrieved chunks — never free-form clinical invention.
 */

import type { GroundedAnswer, GroundedCitation } from "./types.js";
import type { RetrievableChunk } from "./grounding.js";
import {
  indexRagChunks,
  indexRagChunksAsync,
  retrieveRagChunks,
  retrieveRagChunksAsync,
  type RetrieveOptions,
} from "./ragRetrieve.js";
import {
  getGroundedComposer,
  type ComposeInput,
  type ComposeOutput,
  type GroundedComposer,
} from "./ragCompose.js";
import type { AsyncEmbedder } from "./ragEmbeddings.js";
import { renderableFact } from "./publish.js";

export interface GroundedAskOptions extends RetrieveOptions {
  /** Max chunks to quote in the composed answer. */
  answerTopK?: number;
  /** Override composer (tests / in-region LLM adapter). */
  composer?: GroundedComposer;
}

export interface GroundedAskAsyncOptions extends GroundedAskOptions {
  /** Hosted in-region embedder — when set, index + query embed over HTTP. */
  asyncEmbedder?: AsyncEmbedder;
  /**
   * Hosted in-region LLM compose — when set, replaces sync template composer.
   * Must receive chunks only; failures refuse (no offshore fallback).
   */
  composeAsync?: (input: ComposeInput) => Promise<ComposeOutput>;
}

/**
 * Full RAG path: index → hybrid retrieve → cite-or-refuse → compose from chunks only.
 */
export function groundedAskFromCorpus(
  question: string,
  corpus: RetrievableChunk[],
  opts: GroundedAskOptions = {},
): GroundedAnswer {
  const q = question.trim();
  if (!q) {
    return { status: "refused", citations: [], refusalReason: "Empty question." };
  }

  const usable = corpus.filter((c) => renderableFact(c.fact) && c.source);
  if (usable.length === 0) {
    return {
      status: "refused",
      citations: [],
      refusalReason:
        "No published, sourced content covers this question. Materia will not invent a clinical answer.",
    };
  }

  const index = indexRagChunks(usable, { embedder: opts.embedder });
  const answerTopK = opts.answerTopK ?? 3;
  const { chunks, scores } = retrieveRagChunks(q, index, {
    ...opts,
    topK: opts.topK ?? Math.max(5, answerTopK),
  });

  if (chunks.length === 0) {
    return {
      status: "refused",
      citations: [],
      refusalReason:
        "Retrieved records do not match this question closely enough. Ask about a published field (dosing, interactions, counselling, etc.).",
    };
  }

  const top = chunks.slice(0, answerTopK);
  const topScores = scores.slice(0, answerTopK);
  const citations: GroundedCitation[] = top.map((c) => ({
    sourceId: c.source.id,
    citation: c.source.citation,
    lastReviewed: c.source.lastReviewed,
    fieldPath: c.fieldPath,
  }));

  const composer = opts.composer ?? getGroundedComposer();
  try {
    const { answer } = composer.compose({ question: q, chunks: top, scores: topScores });
    return { status: "answered", answer, citations };
  } catch {
    return {
      status: "refused",
      citations: [],
      refusalReason:
        "Composer refused — no retrieved chunks available to ground an answer. Materia will not invent.",
    };
  }
}

/**
 * Async grounded ask — optional hosted in-region embedder + LLM (chunks-only).
 * Default path (no URLs) matches sync template + local bag-of-words.
 */
export async function groundedAskFromCorpusAsync(
  question: string,
  corpus: RetrievableChunk[],
  opts: GroundedAskAsyncOptions = {},
): Promise<GroundedAnswer> {
  if (!opts.asyncEmbedder && !opts.composeAsync) {
    return groundedAskFromCorpus(question, corpus, opts);
  }

  const q = question.trim();
  if (!q) {
    return { status: "refused", citations: [], refusalReason: "Empty question." };
  }

  const usable = corpus.filter((c) => renderableFact(c.fact) && c.source);
  if (usable.length === 0) {
    return {
      status: "refused",
      citations: [],
      refusalReason:
        "No published, sourced content covers this question. Materia will not invent a clinical answer.",
    };
  }

  const answerTopK = opts.answerTopK ?? 3;
  const topK = opts.topK ?? Math.max(5, answerTopK);

  const index = await indexRagChunksAsync(usable, {
    embedder: opts.asyncEmbedder,
  });
  const { chunks, scores } = await retrieveRagChunksAsync(q, index, {
    ...opts,
    topK,
    asyncEmbedder: opts.asyncEmbedder,
  });

  if (chunks.length === 0) {
    return {
      status: "refused",
      citations: [],
      refusalReason:
        "Retrieved records do not match this question closely enough. Ask about a published field (dosing, interactions, counselling, etc.).",
    };
  }

  const top = chunks.slice(0, answerTopK);
  const topScores = scores.slice(0, answerTopK);
  const citations: GroundedCitation[] = top.map((c) => ({
    sourceId: c.source.id,
    citation: c.source.citation,
    lastReviewed: c.source.lastReviewed,
    fieldPath: c.fieldPath,
  }));

  try {
    if (opts.composeAsync) {
      const { answer } = await opts.composeAsync({
        question: q,
        chunks: top,
        scores: topScores,
      });
      return { status: "answered", answer, citations };
    }
    const composer = opts.composer ?? getGroundedComposer();
    const { answer } = composer.compose({ question: q, chunks: top, scores: topScores });
    return { status: "answered", answer, citations };
  } catch (err) {
    const detail = err instanceof Error ? err.message : "composer failure";
    return {
      status: "refused",
      citations: [],
      refusalReason: `Composer refused — ${detail}. Materia will not invent or fall back offshore.`,
    };
  }
}
