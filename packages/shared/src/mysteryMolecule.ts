import type { Molecule, Product, SourcedFact } from "./types.js";
import { renderableFact } from "./publish.js";

/**
 * Build Spec §7.3 — Mystery Molecule mini-game.
 * Hints unlock: mechanism → class → area → SA brands → answer.
 * Only published facts. Never invents clinical content.
 */

export type MysteryHintKind = "mechanism" | "class" | "area" | "brands" | "reveal";

export interface MysteryHint {
  kind: MysteryHintKind;
  label: string;
  text: string;
}

export interface MysteryRound {
  roundId: string;
  moleculeId: string;
  /** Hidden until reveal / correct guess */
  answerSlug: string;
  answerName: string;
  hints: MysteryHint[];
  maxHintsBeforeReveal: number;
  note: string;
  disclaimer: string;
}

export interface MysteryGuessResult {
  correct: boolean;
  answerSlug: string;
  answerName: string;
  message: string;
  teachNote: string;
}

const DISCLAIMER =
  "Mystery Molecule is an educational game. It does not direct treatment or invent unpublished facts.";

function publishedText(fact: SourcedFact<string> | undefined): string | null {
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

export function pickMysteryCandidate(
  molecules: Molecule[],
  products: Product[],
  seed: string,
): Molecule | null {
  const eligible = molecules.filter((m) => {
    if (m.publishState !== "published") return false;
    const moa = publishedText(m.moaSummary);
    const brands = products.filter(
      (p) => p.moleculeId === m.id && p.publishState === "published",
    );
    return Boolean(moa || m.className) && brands.length >= 0;
  });
  if (eligible.length === 0) return null;
  const idx = hashSeed(seed) % eligible.length;
  return eligible[idx] ?? null;
}

export function buildMysteryRound(input: {
  molecules: Molecule[];
  products: Product[];
  /** Deterministic seed (date + user) */
  seed: string;
  roundId?: string;
}): MysteryRound | null {
  const mol = pickMysteryCandidate(input.molecules, input.products, input.seed);
  if (!mol) return null;

  const brands = input.products
    .filter((p) => p.moleculeId === mol.id && p.publishState === "published")
    .map((p) => p.brandName);
  const moa = publishedText(mol.moaSummary);
  const hints: MysteryHint[] = [];

  if (moa) {
    hints.push({
      kind: "mechanism",
      label: "Mechanism hint",
      text: moa,
    });
  }
  if (mol.className.trim()) {
    hints.push({
      kind: "class",
      label: "Class hint",
      text: mol.className,
    });
  }
  if (mol.therapeuticArea.trim()) {
    hints.push({
      kind: "area",
      label: "Therapeutic area",
      text: mol.therapeuticArea,
    });
  }
  if (brands.length > 0) {
    hints.push({
      kind: "brands",
      label: "SA brand cues",
      text: brands.slice(0, 5).join(", "),
    });
  }
  hints.push({
    kind: "reveal",
    label: "Reveal answer",
    text: `${mol.innName} (${mol.slug})`,
  });

  if (hints.length < 2) return null;

  return {
    roundId: input.roundId ?? `mystery-${hashSeed(input.seed).toString(16)}`,
    moleculeId: mol.id,
    answerSlug: mol.slug,
    answerName: mol.innName,
    hints,
    maxHintsBeforeReveal: Math.max(1, hints.length - 1),
    note: "Unlock hints in order. Guess the INN or slug anytime. Empty fields stay empty — nothing is invented.",
    disclaimer: DISCLAIMER,
  };
}

/** Public payload hides the answer until guess/reveal. */
export function publicMysteryRound(
  round: MysteryRound,
  unlockedCount: number,
): Omit<MysteryRound, "answerSlug" | "answerName" | "moleculeId"> & {
  unlockedHints: MysteryHint[];
  unlockedCount: number;
} {
  const n = Math.max(0, Math.min(unlockedCount, round.hints.length));
  return {
    roundId: round.roundId,
    hints: round.hints.map((h) =>
      h.kind === "reveal"
        ? { ...h, text: n >= round.hints.length ? h.text : "Locked — unlock earlier hints or guess." }
        : h,
    ),
    unlockedHints: round.hints.slice(0, n),
    unlockedCount: n,
    maxHintsBeforeReveal: round.maxHintsBeforeReveal,
    note: round.note,
    disclaimer: round.disclaimer,
  };
}

export function gradeMysteryGuess(input: {
  round: MysteryRound;
  guess: string;
}): MysteryGuessResult {
  const g = input.guess.trim().toLowerCase().replace(/\s+/g, " ");
  const slug = input.round.answerSlug.toLowerCase();
  const name = input.round.answerName.toLowerCase();
  const correct =
    g === slug ||
    g === name ||
    g.replace(/[-–—]/g, " ") === name.replace(/[-–—]/g, " ") ||
    (name.includes(g) && g.length >= 4);

  return {
    correct,
    answerSlug: input.round.answerSlug,
    answerName: input.round.answerName,
    message: correct
      ? `Correct — ${input.round.answerName}.`
      : "Not quite — unlock another hint or try a different name/slug.",
    teachNote: correct
      ? `Open /molecules/${input.round.answerSlug} to deepen on the full 360° page.`
      : "Spelling can vary — try the INN spelling used in Materia search.",
  };
}
