import { mapFormToVisualKind, PACKAGING_VISUAL_LABELS } from "./visualId.js";
import type { Molecule, Product, ScheduleCode } from "./types.js";

/**
 * Build Spec §7.6 — SA packaging-recognition exercise.
 * Match published brand + pack-form cues to the molecule.
 * Never invents imprint codes, colours, or unreviewed pack photos.
 */

export interface PackagingCue {
  cueId: string;
  productId: string;
  brandName: string;
  form: string;
  formLabel: string;
  schedule: ScheduleCode;
  moleculeId: string;
  moleculeName: string;
  moleculeSlug: string;
}

export interface PackagingRound {
  roundId: string;
  /** Shuffled pack cues (no molecule ids in public payload) */
  packs: Array<{
    cueId: string;
    brandName: string;
    formLabel: string;
    schedule: ScheduleCode;
    hint: string;
  }>;
  /** Shuffled molecule choices */
  medicines: Array<{ id: string; name: string; slug: string }>;
  pairCount: number;
  note: string;
  disclaimer: string;
}

export interface PackagingGradeResult {
  correct: boolean;
  score: number;
  total: number;
  detail: Array<{ cueId: string; expectedMedicineId: string; chosenMedicineId: string; ok: boolean }>;
  message: string;
}

const DISCLAIMER =
  "Packaging recognition uses published Materia brand and form metadata only. No imprint codes or licensed pack photos are invented. Confirm against the physical labelled product in practice.";

const HINT =
  "Educational brand + pack-form cue — not a photograph or imprint. Match the SA brand to its molecule.";

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

/**
 * One cue per published product whose molecule is published.
 * Prefer distinct molecules when building rounds.
 */
export function collectPackagingCues(
  molecules: Molecule[],
  products: Product[],
): PackagingCue[] {
  const molById = new Map(molecules.filter((m) => m.publishState === "published").map((m) => [m.id, m]));
  const cues: PackagingCue[] = [];
  for (const p of products) {
    if (p.publishState !== "published" || p.isDiscontinued) continue;
    const mol = molById.get(p.moleculeId);
    if (!mol) continue;
    const brand = p.brandName.trim();
    if (brand.length < 2) continue;
    const kind = mapFormToVisualKind(p.form);
    cues.push({
      cueId: p.id,
      productId: p.id,
      brandName: brand,
      form: p.form,
      formLabel: PACKAGING_VISUAL_LABELS[kind],
      schedule: p.schedule,
      moleculeId: mol.id,
      moleculeName: mol.innName,
      moleculeSlug: mol.slug,
    });
  }
  return cues;
}

/** Prefer originator / unique molecule picks for a clean teaching set. */
export function pickDistinctMoleculeCues(cues: PackagingCue[], size: number, seed: string): PackagingCue[] {
  const shuffled = shuffle(cues, `${seed}|cues`);
  const seen = new Set<string>();
  const picked: PackagingCue[] = [];
  for (const c of shuffled) {
    if (seen.has(c.moleculeId)) continue;
    seen.add(c.moleculeId);
    picked.push(c);
    if (picked.length >= size) break;
  }
  return picked;
}

export function buildPackagingRound(input: {
  molecules: Molecule[];
  products: Product[];
  seed: string;
  size?: number;
  roundId?: string;
}): (PackagingRound & { answerKey: Record<string, string> }) | null {
  const pool = collectPackagingCues(input.molecules, input.products);
  const size = Math.max(2, Math.min(input.size ?? 4, 6));
  const picked = pickDistinctMoleculeCues(pool, size, input.seed);
  if (picked.length < 2) return null;

  const answerKey: Record<string, string> = {};
  for (const c of picked) {
    answerKey[c.cueId] = c.moleculeId;
  }

  const packs = shuffle(
    picked.map((c) => ({
      cueId: c.cueId,
      brandName: c.brandName,
      formLabel: c.formLabel,
      schedule: c.schedule,
      hint: HINT,
    })),
    `${input.seed}|packs`,
  );

  const medicines = shuffle(
    picked.map((c) => ({
      id: c.moleculeId,
      name: c.moleculeName,
      slug: c.moleculeSlug,
    })),
    `${input.seed}|meds`,
  );

  return {
    roundId: input.roundId ?? `pack-${hashSeed(input.seed).toString(16)}`,
    packs,
    medicines,
    pairCount: picked.length,
    note: "Match each published SA brand pack cue to its molecule. Forms are educational silhouettes — not photos.",
    disclaimer: DISCLAIMER,
    answerKey,
  };
}

export function publicPackagingRound(
  round: PackagingRound & { answerKey?: Record<string, string> },
): PackagingRound {
  const { answerKey: _key, ...pub } = round as PackagingRound & { answerKey?: Record<string, string> };
  return pub;
}

export function gradePackaging(input: {
  answerKey: Record<string, string>;
  mapping: Record<string, string>;
}): PackagingGradeResult {
  const detail: PackagingGradeResult["detail"] = [];
  let score = 0;
  const keys = Object.keys(input.answerKey);
  for (const cueId of keys) {
    const expected = input.answerKey[cueId]!;
    const chosen = input.mapping[cueId] ?? "";
    const ok = chosen === expected;
    if (ok) score += 1;
    detail.push({ cueId, expectedMedicineId: expected, chosenMedicineId: chosen, ok });
  }
  const total = keys.length;
  const correct = score === total && total > 0;
  return {
    correct,
    score,
    total,
    detail,
    message: correct
      ? "All pack cues matched — packaging recognition from published SA brands only."
      : `Matched ${score} of ${total}. Re-check brand ↔ molecule pairs against published Materia product rows — never invent an imprint.`,
  };
}
