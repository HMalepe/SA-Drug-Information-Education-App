import type { Molecule, SourcedFact } from "./types.js";
import { renderableFact } from "./publish.js";

/**
 * Build Spec §7.3 — Match mini-game (mechanism ↔ medicine).
 * Pairs come only from published moaSummary facts. Never invents mechanisms.
 */

export interface MatchPair {
  moleculeId: string;
  moleculeSlug: string;
  moleculeName: string;
  mechanism: string;
}

export interface MatchRound {
  roundId: string;
  /** Shuffled left column (mechanisms) */
  mechanisms: Array<{ id: string; text: string }>;
  /** Shuffled right column (medicines) — ids must be matched to mechanism ids */
  medicines: Array<{ id: string; name: string; slug: string }>;
  pairCount: number;
  note: string;
  disclaimer: string;
}

export interface MatchGradeResult {
  correct: boolean;
  score: number;
  total: number;
  detail: Array<{ mechanismId: string; expectedMedicineId: string; chosenMedicineId: string; ok: boolean }>;
  message: string;
}

const DISCLAIMER =
  "Match is an educational game using published Materia mechanism summaries. Not clinical advice.";

function publishedMoa(fact: SourcedFact<string> | undefined): string | null {
  if (!fact) return null;
  const r = renderableFact(fact);
  return r ? String(r.value) : null;
}

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], seed: string): T[] {
  const rand = mulberry32(hashSeed(seed));
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

export function collectMatchPairs(molecules: Molecule[]): MatchPair[] {
  const pairs: MatchPair[] = [];
  for (const m of molecules) {
    if (m.publishState !== "published") continue;
    const mechanism = publishedMoa(m.moaSummary);
    if (!mechanism || mechanism.length < 12) continue;
    pairs.push({
      moleculeId: m.id,
      moleculeSlug: m.slug,
      moleculeName: m.innName,
      mechanism,
    });
  }
  return pairs;
}

export function buildMatchRound(input: {
  molecules: Molecule[];
  seed: string;
  size?: number;
  roundId?: string;
}): (MatchRound & { answerKey: Record<string, string> }) | null {
  const pool = collectMatchPairs(input.molecules);
  const size = Math.max(2, Math.min(input.size ?? 4, 6, pool.length));
  if (pool.length < 2) return null;

  const picked = shuffle(pool, `${input.seed}|pick`).slice(0, size);
  const answerKey: Record<string, string> = {};
  for (const p of picked) {
    answerKey[p.moleculeId] = p.moleculeId;
  }

  const mechanisms = shuffle(
    picked.map((p) => ({ id: p.moleculeId, text: p.mechanism })),
    `${input.seed}|mech`,
  );
  const medicines = shuffle(
    picked.map((p) => ({ id: p.moleculeId, name: p.moleculeName, slug: p.moleculeSlug })),
    `${input.seed}|med`,
  );

  return {
    roundId: input.roundId ?? `match-${hashSeed(input.seed).toString(16)}`,
    mechanisms,
    medicines,
    pairCount: picked.length,
    note: "Drag is optional — pick which medicine matches each mechanism. Published MOA text only.",
    disclaimer: DISCLAIMER,
    answerKey,
  };
}

/** Public payload without answer key. */
export function publicMatchRound(
  round: MatchRound & { answerKey: Record<string, string> },
): MatchRound {
  const { answerKey: _k, ...pub } = round;
  return pub;
}

/**
 * Grade a mapping of mechanismId → medicineId.
 * Both ids are molecule ids in this implementation.
 */
export function gradeMatch(input: {
  answerKey: Record<string, string>;
  mapping: Record<string, string>;
}): MatchGradeResult {
  const detail: MatchGradeResult["detail"] = [];
  let score = 0;
  const total = Object.keys(input.answerKey).length;
  for (const [mechanismId, expectedMedicineId] of Object.entries(input.answerKey)) {
    const chosenMedicineId = input.mapping[mechanismId] ?? "";
    const ok = chosenMedicineId === expectedMedicineId;
    if (ok) score += 1;
    detail.push({ mechanismId, expectedMedicineId, chosenMedicineId, ok });
  }
  return {
    correct: score === total && total > 0,
    score,
    total,
    detail,
    message:
      score === total
        ? "Perfect match — all published mechanisms paired correctly."
        : `Matched ${score}/${total}. Review the misses, then open the molecule 360° pages to reinforce.`,
  };
}
