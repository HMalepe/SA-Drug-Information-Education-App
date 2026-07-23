import type { Molecule } from "./types.js";

/**
 * Build Spec §7.3 — Drag & drop mini-game (sort medicines into classes).
 * Buckets and answers come only from published molecule.className. Never invents classes.
 */

export interface ClassBucketMember {
  moleculeId: string;
  moleculeSlug: string;
  moleculeName: string;
  className: string;
}

export interface DragDropRound {
  roundId: string;
  /** Shuffled medicines to sort */
  medicines: Array<{ id: string; name: string; slug: string }>;
  /** Class labels (shuffled) — pick one per medicine */
  buckets: Array<{ id: string; label: string }>;
  itemCount: number;
  bucketCount: number;
  note: string;
  disclaimer: string;
}

export interface DragDropGradeResult {
  correct: boolean;
  score: number;
  total: number;
  detail: Array<{
    medicineId: string;
    expectedBucketId: string;
    chosenBucketId: string;
    ok: boolean;
  }>;
  message: string;
}

const DISCLAIMER =
  "Class sort is an educational game using published Materia class labels. Not a prescribing aid.";

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

/** Group published molecules that have a non-empty className. */
export function collectClassMembers(molecules: Molecule[]): ClassBucketMember[] {
  const out: ClassBucketMember[] = [];
  for (const m of molecules) {
    if (m.publishState !== "published") continue;
    const className = m.className?.trim() ?? "";
    if (className.length < 3) continue;
    out.push({
      moleculeId: m.id,
      moleculeSlug: m.slug,
      moleculeName: m.innName,
      className,
    });
  }
  return out;
}

/**
 * Prefer classes that already have multiple published members (better teaching).
 * Falls back to any class with ≥1 member if needed for round construction.
 */
export function listSortableClasses(
  molecules: Molecule[],
  minPerClass = 2,
): Array<{ className: string; members: ClassBucketMember[] }> {
  const members = collectClassMembers(molecules);
  const byClass = new Map<string, ClassBucketMember[]>();
  for (const m of members) {
    const list = byClass.get(m.className) ?? [];
    list.push(m);
    byClass.set(m.className, list);
  }
  const preferred = [...byClass.entries()]
    .filter(([, list]) => list.length >= minPerClass)
    .map(([className, list]) => ({ className, members: list }));
  if (preferred.length >= 2) return preferred;
  return [...byClass.entries()]
    .filter(([, list]) => list.length >= 1)
    .map(([className, list]) => ({ className, members: list }));
}

export function buildDragDropRound(input: {
  molecules: Molecule[];
  seed: string;
  bucketCount?: number;
  perBucket?: number;
  roundId?: string;
}): (DragDropRound & { answerKey: Record<string, string> }) | null {
  const classes = listSortableClasses(input.molecules, 2);
  const bucketCount = Math.max(2, Math.min(input.bucketCount ?? 3, 5, classes.length));
  if (classes.length < 2) return null;

  const pickedClasses = shuffle(classes, `${input.seed}|classes`).slice(0, bucketCount);
  const perBucket = Math.max(1, Math.min(input.perBucket ?? 2, 3));

  const picked: ClassBucketMember[] = [];
  for (const c of pickedClasses) {
    const take = shuffle(c.members, `${input.seed}|${c.className}`).slice(0, perBucket);
    picked.push(...take);
  }
  if (picked.length < 2) return null;

  const answerKey: Record<string, string> = {};
  for (const m of picked) {
    answerKey[m.moleculeId] = m.className;
  }

  const medicines = shuffle(
    picked.map((m) => ({ id: m.moleculeId, name: m.moleculeName, slug: m.moleculeSlug })),
    `${input.seed}|meds`,
  );
  const buckets = shuffle(
    pickedClasses.map((c) => ({ id: c.className, label: c.className })),
    `${input.seed}|buckets`,
  );

  return {
    roundId: input.roundId ?? `sort-${hashSeed(input.seed).toString(16)}`,
    medicines,
    buckets,
    itemCount: medicines.length,
    bucketCount: buckets.length,
    note: "Sort each medicine into its published therapeutic class. Labels come from Materia seeds — not invented.",
    disclaimer: DISCLAIMER,
    answerKey,
  };
}

export function publicDragDropRound(
  round: DragDropRound & { answerKey: Record<string, string> },
): DragDropRound {
  const { answerKey: _k, ...pub } = round;
  return pub;
}

/** Grade mapping of medicineId → bucketId (className). */
export function gradeDragDrop(input: {
  answerKey: Record<string, string>;
  mapping: Record<string, string>;
}): DragDropGradeResult {
  const detail: DragDropGradeResult["detail"] = [];
  let score = 0;
  const total = Object.keys(input.answerKey).length;
  for (const [medicineId, expectedBucketId] of Object.entries(input.answerKey)) {
    const chosenBucketId = input.mapping[medicineId] ?? "";
    const ok = chosenBucketId === expectedBucketId;
    if (ok) score += 1;
    detail.push({ medicineId, expectedBucketId, chosenBucketId, ok });
  }
  return {
    correct: score === total && total > 0,
    score,
    total,
    detail,
    message:
      score === total
        ? "Perfect sort — every medicine landed in its published class."
        : `Sorted ${score}/${total}. Open the miss molecules’ 360° pages and re-check class labels.`,
  };
}
