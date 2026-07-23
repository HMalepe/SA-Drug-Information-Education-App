import type { GroundedAnswer, GroundedCitation, Source, SourcedFact } from "./types.js";
import { renderableFact } from "./publish.js";

export interface RetrievableChunk {
  fieldPath: string;
  text: string;
  fact: SourcedFact<string>;
  source: Source;
}

/**
 * Grounding contract (constitution 3.1):
 * Answer ONLY from retrieved published chunks; refuse when unsourced.
 * Never invent clinical values.
 */
export function groundedAnswerFromChunks(
  question: string,
  chunks: RetrievableChunk[],
): GroundedAnswer {
  const q = question.trim();
  if (!q) {
    return {
      status: "refused",
      citations: [],
      refusalReason: "Empty question.",
    };
  }

  const usable = chunks.filter((c) => {
    const f = renderableFact(c.fact);
    return Boolean(f && c.source);
  });

  if (usable.length === 0) {
    return {
      status: "refused",
      citations: [],
      refusalReason:
        "No published, sourced content covers this question. Materia will not invent a clinical answer.",
    };
  }

  const terms = q
    .toLowerCase()
    .split(/\W+/)
    .filter((t) => t.length > 2);

  const ranked = usable
    .map((c) => {
      const hay = `${c.fieldPath} ${c.text}`.toLowerCase();
      const score = terms.reduce((acc, t) => (hay.includes(t) ? acc + 1 : acc), 0);
      return { c, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) {
    return {
      status: "refused",
      citations: [],
      refusalReason:
        "Retrieved records do not match this question closely enough. Ask about a published field (dosing, interactions, counselling, etc.).",
    };
  }

  const top = ranked.slice(0, 3).map((r) => r.c);
  const citations: GroundedCitation[] = top.map((c) => ({
    sourceId: c.source.id,
    citation: c.source.citation,
    lastReviewed: c.source.lastReviewed,
    fieldPath: c.fieldPath,
  }));

  const answer = [
    "Based only on Materia's curated, published records:",
    ...top.map((c, i) => `${i + 1}. (${c.fieldPath}) ${c.text}`),
    "",
    "This is a reference tool — confirm clinically before acting. Sources cited below.",
  ].join("\n");

  return { status: "answered", answer, citations };
}

/** Strip potential patient identifiers before any model call (POPIA). */
export function stripIdentifiers(text: string): string {
  return text
    .replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, "[NAME]")
    .replace(/\b\d{6,13}\b/g, "[ID]")
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[EMAIL]")
    .replace(/\b(\+27|0)\d{9,10}\b/g, "[PHONE]");
}
