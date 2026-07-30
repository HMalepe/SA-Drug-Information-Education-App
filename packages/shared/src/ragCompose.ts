/**
 * Grounded answer composition (docs/17).
 * An LLM (when wired) may ONLY receive retrieved chunks + the stripped question.
 * It must never invent clinical values absent from those chunks.
 * Default: template composer (no model call) — production-safe offline.
 */

import type { IndexedRagChunk } from "./ragRetrieve.js";

export interface ComposeInput {
  question: string;
  chunks: IndexedRagChunk[];
  scores: number[];
}

export interface ComposeOutput {
  answer: string;
  composerId: string;
}

export interface GroundedComposer {
  readonly id: string;
  /**
   * Compose from retrieved chunks only.
   * Implementations MUST refuse (throw or return empty) when chunks.length === 0 —
   * callers already refuse before compose; this is a second gate.
   */
  compose(input: ComposeInput): ComposeOutput;
}

const FOOTER = [
  "",
  "This is a reference tool — confirm clinically before acting. Sources cited below.",
  "Licensed references (SAMF/MIMS/Lexicomp) are never ingested or reproduced.",
].join("\n");

/**
 * Template composer — quotes retrieved chunk text with field paths.
 * No LLM. Guarantees answer ⊆ retrieved text + fixed educational framing.
 */
export const templateGroundedComposer: GroundedComposer = {
  id: "template-v1",
  compose(input: ComposeInput): ComposeOutput {
    if (input.chunks.length === 0) {
      throw new Error("GroundedComposer refuse: no retrieved chunks — will not invent.");
    }
    const lines = [
      "Based only on Materia's curated, published records (hybrid RAG retrieve):",
      ...input.chunks.map((c, i) => {
        const score = input.scores[i];
        const scoreNote = typeof score === "number" ? ` [score ${score.toFixed(2)}]` : "";
        return `${i + 1}. (${c.fieldPath}${scoreNote}) ${c.text}`;
      }),
      FOOTER,
    ];
    return { answer: lines.join("\n"), composerId: "template-v1" };
  },
};

/**
 * Strict quote composer — same guarantee as template; alternate framing for tests /
 * future LLM swap validation (answer must still be built only from chunk.text).
 */
export const strictQuoteComposer: GroundedComposer = {
  id: "strict-quote-v1",
  compose(input: ComposeInput): ComposeOutput {
    if (input.chunks.length === 0) {
      throw new Error("GroundedComposer refuse: no retrieved chunks — will not invent.");
    }
    const body = input.chunks.map((c) => c.text).join("\n\n");
    return {
      answer: [
        "Quoted only from retrieved Materia records:",
        body,
        FOOTER,
      ].join("\n"),
      composerId: "strict-quote-v1",
    };
  },
};

/** Active composer — swap to an in-region LLM adapter that receives ONLY ComposeInput. */
let activeComposer: GroundedComposer = templateGroundedComposer;

export function getGroundedComposer(): GroundedComposer {
  return activeComposer;
}

export function setGroundedComposer(composer: GroundedComposer): void {
  activeComposer = composer;
}

export function resetGroundedComposer(): void {
  activeComposer = templateGroundedComposer;
}

/**
 * Guard for LLM adapters: every non-framing sentence must be attributable to a chunk.
 * Framing lines (headers/footers) are ignored. Used by tests and future hosted adapters.
 */
export function answerUsesOnlyRetrievedText(
  answer: string,
  chunkTexts: string[],
  framingAllowlist: RegExp[] = [
    /^Based only on Materia's/i,
    /^Quoted only from retrieved/i,
    /^This is a reference tool/i,
    /^Licensed references/i,
    /^\d+\.\s*\(/,
  ],
): boolean {
  if (chunkTexts.length === 0) return false;
  const lines = answer
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  for (const line of lines) {
    if (framingAllowlist.some((re) => re.test(line))) continue;
    // Strip leading "N. (fieldPath) " numbering from template lines
    const stripped = line.replace(/^\d+\.\s*\([^)]+\)\s*/, "").trim();
    const ok = chunkTexts.some((t) => stripped === t || t.includes(stripped) || stripped.includes(t));
    if (!ok && stripped.length > 0) return false;
  }
  return true;
}
