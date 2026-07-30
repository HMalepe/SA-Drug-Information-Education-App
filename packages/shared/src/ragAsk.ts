/**
 * Grounded ask pipeline — retrieve then compose (docs/17).
 * Composition is template-only until an in-region LLM is wired behind an interface
 * that receives ONLY retrieved chunks (never free-form clinical invention).
 */

import type { GroundedAnswer, GroundedCitation } from "./types.js";
import type { RetrievableChunk } from "./grounding.js";
import { indexRagChunks, retrieveRagChunks, type RetrieveOptions } from "./ragRetrieve.js";
import { renderableFact } from "./publish.js";

export interface GroundedAskOptions extends RetrieveOptions {
  /** Max chunks to quote in the composed answer. */
  answerTopK?: number;
}

/**
 * Full RAG path: index → hybrid retrieve → cite-or-refuse.
 * Does not call an LLM. Does not invent values outside retrieved text.
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
  const citations: GroundedCitation[] = top.map((c) => ({
    sourceId: c.source.id,
    citation: c.source.citation,
    lastReviewed: c.source.lastReviewed,
    fieldPath: c.fieldPath,
  }));

  const answer = [
    "Based only on Materia's curated, published records (hybrid RAG retrieve):",
    ...top.map((c, i) => {
      const score = scores[i];
      const scoreNote = typeof score === "number" ? ` [score ${score.toFixed(2)}]` : "";
      return `${i + 1}. (${c.fieldPath}${scoreNote}) ${c.text}`;
    }),
    "",
    "This is a reference tool — confirm clinically before acting. Sources cited below.",
    "Licensed references (SAMF/MIMS/Lexicomp) are never ingested or reproduced.",
  ].join("\n");

  return { status: "answered", answer, citations };
}
