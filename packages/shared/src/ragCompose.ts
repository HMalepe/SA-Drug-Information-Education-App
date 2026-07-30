/**
 * Grounded answer composition (docs/17).
 * An LLM (when wired) may ONLY receive retrieved chunks + the stripped question.
 * It must never invent clinical values absent from those chunks.
 * Default: template composer (no model call) — production-safe offline.
 */

import type { IndexedRagChunk } from "./ragRetrieve.js";
import { assertInRegionEndpoint, type FetchLike } from "./ragInRegion.js";

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

export interface HostedLlmComposerOpts {
  endpointUrl: string;
  fetchImpl: FetchLike;
  allowHosts?: string[];
  authToken?: string;
  /** Default true — refuse answers that cannot be grounded in retrieved chunk text. */
  requireGroundingCheck?: boolean;
}

/**
 * Payload shape sent to an in-region LLM. Chunks only — never patient identifiers,
 * never model knowledge as a clinical source (constitution 3.1 / docs/17).
 */
export interface GroundedLlmRequestPayload {
  question: string;
  chunks: Array<{ fieldPath: string; text: string; sourceId?: string }>;
  scores: number[];
}

/**
 * Hosted in-region LLM composer (async).
 * Sends ONLY ComposeInput (question + retrieved chunks + scores).
 * Refuses empty chunks and known offshore hosts. Optionally rejects ungrounded answers.
 */
export function createHostedInRegionLlmComposer(opts: HostedLlmComposerOpts): {
  readonly id: string;
  composeAsync(input: ComposeInput): Promise<ComposeOutput>;
} {
  assertInRegionEndpoint(opts.endpointUrl, { allowHosts: opts.allowHosts });
  const requireGrounding = opts.requireGroundingCheck !== false;

  return {
    id: "hosted-in-region-llm-v1",
    async composeAsync(input: ComposeInput): Promise<ComposeOutput> {
      if (input.chunks.length === 0) {
        throw new Error("GroundedComposer refuse: no retrieved chunks — will not invent.");
      }
      const url = assertInRegionEndpoint(opts.endpointUrl, { allowHosts: opts.allowHosts });
      const payload: GroundedLlmRequestPayload = {
        question: input.question,
        chunks: input.chunks.map((c) => ({
          fieldPath: c.fieldPath,
          text: c.text,
          sourceId: c.source.id,
        })),
        scores: input.scores,
      };
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
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(
          `In-region LLM HTTP ${res.status}. Will not fall back to an offshore model.`,
        );
      }
      const body = (await res.json()) as { answer?: unknown };
      if (typeof body.answer !== "string" || !body.answer.trim()) {
        throw new Error("In-region LLM response missing answer string — refusing.");
      }
      const answer = body.answer.trim();
      if (requireGrounding) {
        const ok = answerUsesOnlyRetrievedText(
          answer,
          input.chunks.map((c) => c.text),
        );
        if (!ok) {
          throw new Error(
            "In-region LLM answer failed grounding check — refuse unattributable clinical text.",
          );
        }
      }
      return { answer, composerId: "hosted-in-region-llm-v1" };
    },
  };
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
