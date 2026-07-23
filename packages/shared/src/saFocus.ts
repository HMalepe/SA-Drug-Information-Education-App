import { counsellingCoverage, getCounsellingScript } from "./counselling.js";
import { mapFormToVisualKind, PACKAGING_VISUAL_LABELS } from "./visualId.js";
import type { Molecule, Product, ScheduleCode } from "./types.js";

/**
 * Build Spec §7.6 — SA focus per lesson.
 * Grounds Academy theory in products learners actually handle:
 * originator, common SA generics, pack forms, scheduling, counselling langs.
 * Never invents imprint codes, doses, or unreviewed counselling.
 */

export interface SaFocusBrand {
  productId: string;
  brandName: string;
  formLabel: string;
  schedule: ScheduleCode;
  isOriginator: boolean;
}

export interface SaFocusCard {
  moleculeId: string;
  moleculeName: string;
  moleculeSlug: string;
  therapeuticArea: string;
  className: string;
  originator: SaFocusBrand | null;
  generics: SaFocusBrand[];
  schedulesInUse: ScheduleCode[];
  packForms: string[];
  counsellingLangs: Array<{ lang: string; label: string; lineCount: number }>;
  /** First published English counselling line — educational teaser only */
  counsellingTeaserEn: string | null;
  packagingExercisePath: string;
  note: string;
  disclaimer: string;
}

export const SA_FOCUS_DISCLAIMER =
  "SA focus lists published Materia product and counselling metadata for learning. It is not a stock list, formulary, or dosing guide — confirm against the labelled product and your clinician.";

function toBrand(p: Product): SaFocusBrand {
  const kind = mapFormToVisualKind(p.form);
  return {
    productId: p.id,
    brandName: p.brandName,
    formLabel: PACKAGING_VISUAL_LABELS[kind],
    schedule: p.schedule,
    isOriginator: p.isOriginator,
  };
}

export function buildSaFocusCard(input: {
  molecule: Molecule;
  products: Product[];
}): SaFocusCard | null {
  if (input.molecule.publishState !== "published") return null;

  const published = input.products.filter(
    (p) =>
      p.moleculeId === input.molecule.id &&
      p.publishState === "published" &&
      !p.isDiscontinued &&
      p.brandName.trim().length >= 2,
  );

  const originatorRow = published.find((p) => p.isOriginator) ?? null;
  const generics = published
    .filter((p) => !p.isOriginator)
    .map(toBrand)
    .sort((a, b) => a.brandName.localeCompare(b.brandName))
    .slice(0, 8);

  const schedulesInUse = [...new Set(published.map((p) => p.schedule))].sort();
  const packForms = [
    ...new Set(published.map((p) => PACKAGING_VISUAL_LABELS[mapFormToVisualKind(p.form)])),
  ].sort();

  const counsellingLangs = counsellingCoverage(input.molecule.id);
  const en = getCounsellingScript(input.molecule.id, "en");
  const counsellingTeaserEn = en?.lines[0]?.trim() || null;

  const brandCount = published.length;
  return {
    moleculeId: input.molecule.id,
    moleculeName: input.molecule.innName,
    moleculeSlug: input.molecule.slug,
    therapeuticArea: input.molecule.therapeuticArea,
    className: input.molecule.className,
    originator: originatorRow ? toBrand(originatorRow) : null,
    generics,
    schedulesInUse,
    packForms,
    counsellingLangs,
    counsellingTeaserEn,
    packagingExercisePath: "/learn/packaging",
    note:
      brandCount > 0
        ? `Published SA picture for ${input.molecule.innName}: ${brandCount} brand row(s), ${counsellingLangs.length} counselling language(s).`
        : `No published SA brand rows for ${input.molecule.innName} yet — Materia will not invent generics or schedules.`,
    disclaimer: SA_FOCUS_DISCLAIMER,
  };
}
