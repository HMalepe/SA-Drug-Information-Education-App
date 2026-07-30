/**
 * Grounded ask pipeline — retrieve then compose (docs/17).
 * Composition uses GroundedComposer (default: template). Any future in-region LLM
 * must receive ONLY retrieved chunks — never free-form clinical invention.
 */

import type { GroundedAnswer, GroundedCitation } from "./types.js";
import type { RetrievableChunk } from "./grounding.js";
import { indexRagChunks, retrieveRagChunks, type RetrieveOptions } from "./ragRetrieve.js";
import {
  getGroundedComposer,
  type GroundedComposer,
} from "./ragCompose.js";
import { renderableFact } from "./publish.js";

export interface GroundedAskOptions extends RetrieveOptions {
  /** Max chunks to quote in the composed answer. */
  answerTopK?: number;
  /** Override composer (tests / in-region LLM adapter). */
  composer?: GroundedComposer;
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

  const index = indexRagChunks(usable);
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
