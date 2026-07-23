/**
 * Build Spec §7.3 — Spot the Error mini-game.
 * Authored educational statements only. Never invents clinical doses or new facts.
 */

export type SpotVerdict = "correct_statement" | "error";

export interface SpotErrorCard {
  id: string;
  moleculeSlug?: string;
  moleculeName?: string;
  statement: string;
  /** Whether the statement as written is clinically/educationally sound */
  verdict: SpotVerdict;
  explanation: string;
  publishState: "published" | "draft";
  sourceNote: string;
}

export interface SpotErrorRound {
  roundId: string;
  card: Omit<SpotErrorCard, "verdict" | "explanation">;
  note: string;
  disclaimer: string;
}

export interface SpotErrorGrade {
  correct: boolean;
  verdict: SpotVerdict;
  explanation: string;
  message: string;
  moleculeSlug?: string;
}

const DISCLAIMER =
  "Spot the Error is an educational game. Explanations are teaching notes — not patient-specific advice.";

/** Original Materia educational fixtures — not copied from SAMF/MIMS/Lexicomp. */
export const SPOT_ERROR_LIBRARY: SpotErrorCard[] = [
  {
    id: "spot-doxy-milk",
    moleculeSlug: "doxycycline",
    moleculeName: "Doxycycline",
    statement: "Take doxycycline with a glass of milk to protect the stomach.",
    verdict: "error",
    explanation:
      "Teaching point: divalent cations in milk can chelate tetracyclines and reduce absorption. Counsel on separating from dairy/antacids per the labelled product — Materia does not invent a timing schedule here.",
    publishState: "published",
    sourceNote: "Materia Academy teaching fixture (chelation counselling)",
  },
  {
    id: "spot-amox-finish",
    moleculeSlug: "amoxicillin",
    moleculeName: "Amoxicillin",
    statement: "Finish the antibiotic course unless a clinician tells you to stop.",
    verdict: "correct_statement",
    explanation:
      "Teaching point: completing prescribed courses (unless advised otherwise) is standard counselling language — still confirm against the labelled product and the clinician’s plan.",
    publishState: "published",
    sourceNote: "Materia Academy teaching fixture (course completion)",
  },
  {
    id: "spot-para-double",
    moleculeSlug: "paracetamol",
    moleculeName: "Paracetamol",
    statement: "Cold-and-flu combos never contain paracetamol, so doubling up is always safe.",
    verdict: "error",
    explanation:
      "Teaching point: many cold/flu products also contain paracetamol. Counsel patients to check labels to avoid exceeding the labelled daily maximum — Materia does not invent a mg limit here.",
    publishState: "published",
    sourceNote: "Materia Academy teaching fixture (duplicate paracetamol)",
  },
  {
    id: "spot-warfarin-nsaid",
    moleculeSlug: "warfarin",
    moleculeName: "Warfarin",
    statement: "Adding an NSAID for pain is always fine for someone on warfarin.",
    verdict: "error",
    explanation:
      "Teaching point: bleeding-risk combinations need clinical review. Flag the interaction pattern educationally — do not invent a dose change.",
    publishState: "published",
    sourceNote: "Materia Academy teaching fixture (bleeding-risk counselling)",
  },
  {
    id: "spot-insulin-fridge",
    moleculeSlug: "insulin-glargine",
    moleculeName: "Insulin glargine",
    statement: "Unused insulin pens are typically stored refrigerated until first use — check the specific product insert.",
    verdict: "correct_statement",
    explanation:
      "Teaching point: cold-chain storage is product-specific. Always confirm the labelled insert; Materia does not invent excursion windows.",
    publishState: "published",
    sourceNote: "Materia Academy teaching fixture (cold-chain awareness)",
  },
  {
    id: "spot-draft-hidden",
    statement: "Draft card — should never appear in live rounds.",
    verdict: "error",
    explanation: "Draft fixture.",
    publishState: "draft",
    sourceNote: "Draft only",
  },
];

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function listPublishedSpotCards(
  library: SpotErrorCard[] = SPOT_ERROR_LIBRARY,
): SpotErrorCard[] {
  return library.filter((c) => c.publishState === "published");
}

export function buildSpotErrorRound(input: {
  seed: string;
  library?: SpotErrorCard[];
  roundId?: string;
}): SpotErrorRound | null {
  const pool = listPublishedSpotCards(input.library);
  if (pool.length === 0) return null;
  const card = pool[hashSeed(input.seed) % pool.length]!;
  return {
    roundId: input.roundId ?? `spot-${hashSeed(input.seed).toString(16)}`,
    card: {
      id: card.id,
      moleculeSlug: card.moleculeSlug,
      moleculeName: card.moleculeName,
      statement: card.statement,
      publishState: card.publishState,
      sourceNote: card.sourceNote,
    },
    note: "Is this statement sound counselling, or does it contain an error? Pick one.",
    disclaimer: DISCLAIMER,
  };
}

export function gradeSpotError(input: {
  cardId: string;
  choice: SpotVerdict;
  library?: SpotErrorCard[];
}): SpotErrorGrade | { error: string } {
  const card = listPublishedSpotCards(input.library).find((c) => c.id === input.cardId);
  if (!card) return { error: "Unknown or unpublished Spot the Error card." };
  const correct = input.choice === card.verdict;
  return {
    correct,
    verdict: card.verdict,
    explanation: card.explanation,
    moleculeSlug: card.moleculeSlug,
    message: correct
      ? "Nice catch — you matched the teaching verdict."
      : "Not quite — read the explanation, then try another round.",
  };
}
