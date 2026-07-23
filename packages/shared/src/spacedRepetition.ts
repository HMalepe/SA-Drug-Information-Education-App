import type { Course, Molecule, QuizQuestion, SafetyProfile } from "./types.js";
import { renderableFact } from "./publish.js";

/**
 * Build Spec §7.5 — Spaced-repetition scheduling (Anki-style).
 * Cards come only from published quiz / pearls. Never invents clinical facts.
 */

export type ReviewGrade = "again" | "hard" | "good" | "easy";

export type ReviewCardKind = "quiz" | "pearl";

export interface ReviewCard {
  id: string;
  kind: ReviewCardKind;
  prompt: string;
  answer: string;
  teachFromMiss?: string;
  moleculeId?: string;
  moleculeSlug?: string;
  moleculeName?: string;
  therapeuticArea?: string;
  sourceRef: string;
}

export interface CardState {
  cardId: string;
  userId: string;
  ease: number;
  intervalDays: number;
  repetitions: number;
  dueOn: string;
  lastGrade?: ReviewGrade;
  lapses: number;
  updatedAt: string;
}

export interface ReviewSession {
  dateKey: string;
  due: Array<ReviewCard & { state: CardState }>;
  weakAreas: string[];
  note: string;
  disclaimer: string;
}

export type ReviewCourse = Course & { quiz?: QuizQuestion[] };

const DISCLAIMER =
  "Spaced repetition is for learning retention. It does not direct treatment or invent clinical facts.";

export function reviewDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function addDays(dateKey: string, days: number): string {
  const d = new Date(`${dateKey}T12:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Collect published quiz + pearl cards for the catalog. */
export function collectReviewCards(input: {
  courses: ReviewCourse[];
  molecules: Molecule[];
  safetyProfiles: SafetyProfile[];
}): ReviewCard[] {
  const molById = new Map(input.molecules.map((m) => [m.id, m] as const));
  const cards: ReviewCard[] = [];

  for (const course of input.courses) {
    if (course.publishState !== "published") continue;
    const mol = molById.get(course.moleculeId);
    for (const q of course.quiz ?? []) {
      if (q.publishState !== "published") continue;
      const answer = q.choices[q.correctIndex] ?? "";
      cards.push({
        id: `quiz:${q.id}`,
        kind: "quiz",
        prompt: q.prompt,
        answer,
        teachFromMiss: q.teachFromMiss,
        moleculeId: mol?.id,
        moleculeSlug: mol?.slug,
        moleculeName: mol?.innName,
        therapeuticArea: mol?.therapeuticArea,
        sourceRef: `quiz:${q.id}`,
      });
    }
  }

  for (const sp of input.safetyProfiles) {
    const mol = molById.get(sp.moleculeId);
    if (!mol || mol.publishState !== "published") continue;
    (sp.clinicalPearls ?? []).forEach((fact, i) => {
      const rendered = renderableFact(fact);
      if (!rendered) return;
      const text = String(rendered.value);
      cards.push({
        id: `pearl:${mol.id}:${i}`,
        kind: "pearl",
        prompt: `Clinical pearl — ${mol.innName}: what is the teaching point?`,
        answer: text,
        moleculeId: mol.id,
        moleculeSlug: mol.slug,
        moleculeName: mol.innName,
        therapeuticArea: mol.therapeuticArea,
        sourceRef: rendered.sourceId,
      });
    });
  }

  return cards;
}

export function initialCardState(userId: string, cardId: string, dateKey = reviewDateKey()): CardState {
  return {
    cardId,
    userId,
    ease: 2.5,
    intervalDays: 0,
    repetitions: 0,
    dueOn: dateKey,
    lapses: 0,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * SM-2-inspired interval update — educational scheduler only.
 * again → due today; hard/good/easy stretch intervals.
 */
export function applyReviewGrade(
  state: CardState,
  grade: ReviewGrade,
  today = reviewDateKey(),
): CardState {
  let { ease, intervalDays, repetitions, lapses } = state;

  if (grade === "again") {
    repetitions = 0;
    intervalDays = 0;
    lapses += 1;
    ease = Math.max(1.3, ease - 0.2);
  } else if (grade === "hard") {
    ease = Math.max(1.3, ease - 0.15);
    intervalDays = repetitions === 0 ? 1 : Math.max(1, Math.round(intervalDays * 1.2));
    repetitions += 1;
  } else if (grade === "good") {
    if (repetitions === 0) intervalDays = 1;
    else if (repetitions === 1) intervalDays = 3;
    else intervalDays = Math.max(1, Math.round(intervalDays * ease));
    repetitions += 1;
  } else {
    ease = ease + 0.15;
    if (repetitions === 0) intervalDays = 2;
    else if (repetitions === 1) intervalDays = 4;
    else intervalDays = Math.max(1, Math.round(intervalDays * ease * 1.3));
    repetitions += 1;
  }

  return {
    ...state,
    ease: Math.round(ease * 100) / 100,
    intervalDays,
    repetitions,
    lapses,
    dueOn: addDays(today, intervalDays),
    lastGrade: grade,
    updatedAt: new Date().toISOString(),
  };
}

export function buildReviewSession(input: {
  catalog: ReviewCard[];
  states: CardState[];
  userId: string;
  dateKey?: string;
  limit?: number;
  preferAreas?: string[];
}): ReviewSession {
  const dateKey = input.dateKey ?? reviewDateKey();
  const limit = Math.max(1, Math.min(input.limit ?? 10, 30));
  const prefer = new Set((input.preferAreas ?? []).map((a) => a.trim().toLowerCase()));
  const stateById = new Map(input.states.filter((s) => s.userId === input.userId).map((s) => [s.cardId, s]));

  const dueCards = input.catalog
    .map((card) => {
      const state = stateById.get(card.id) ?? initialCardState(input.userId, card.id, dateKey);
      return { ...card, state };
    })
    .filter((c) => c.state.dueOn <= dateKey);

  dueCards.sort((a, b) => {
    const aWeak = a.therapeuticArea && prefer.has(a.therapeuticArea.toLowerCase()) ? 1 : 0;
    const bWeak = b.therapeuticArea && prefer.has(b.therapeuticArea.toLowerCase()) ? 1 : 0;
    if (aWeak !== bWeak) return bWeak - aWeak;
    if (a.state.lapses !== b.state.lapses) return b.state.lapses - a.state.lapses;
    return a.state.dueOn.localeCompare(b.state.dueOn) || a.prompt.localeCompare(b.prompt);
  });

  const weakAreas = [
    ...new Set(
      dueCards
        .filter((c) => c.state.lapses > 0 || c.state.ease < 2.2)
        .map((c) => c.therapeuticArea)
        .filter((a): a is string => Boolean(a)),
    ),
  ].slice(0, 5);

  return {
    dateKey,
    due: dueCards.slice(0, limit),
    weakAreas,
    note:
      dueCards.length === 0
        ? "No cards due today — complete Academy lessons/quizzes to grow the published card pool, or check back tomorrow."
        : "Due cards from published quiz items and pearls only. Personalisation reorders; it never invents content.",
    disclaimer: DISCLAIMER,
  };
}
