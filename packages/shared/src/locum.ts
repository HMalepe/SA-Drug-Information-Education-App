import type { Product, SafetyProfile, ScheduleCode } from "./types.js";
import { renderableFact } from "./publish.js";
import { getCounsellingScript } from "./counselling.js";

export interface LocumBrief {
  moleculeId: string;
  innName: string;
  className: string;
  schedules: ScheduleCode[];
  topBrands: Array<{ brandName: string; strength: string; isOriginator: boolean }>;
  topWarnings: string[];
  counsellingEn: string[];
  stockoutHint: string;
  disclaimer: string;
}

/**
 * Locum / handover one-screen brief (Build Spec §12).
 * Assembled only from published molecule + product + safety fields.
 */
export function buildLocumBrief(input: {
  moleculeId: string;
  innName: string;
  className: string;
  products: Product[];
  safety?: SafetyProfile;
}): LocumBrief {
  const products = input.products.filter(
    (p) => p.moleculeId === input.moleculeId && p.publishState === "published" && !p.isDiscontinued,
  );
  const schedules = [...new Set(products.map((p) => p.schedule))];
  const topBrands = products
    .slice()
    .sort((a, b) => Number(b.isOriginator) - Number(a.isOriginator))
    .slice(0, 5)
    .map((p) => ({
      brandName: p.brandName,
      strength: p.strength,
      isOriginator: p.isOriginator,
    }));

  const topWarnings = (input.safety?.warnings ?? [])
    .map((w) => renderableFact(w)?.value)
    .filter((v): v is string => Boolean(v))
    .slice(0, 3);

  const contra = (input.safety?.contraindications ?? [])
    .map((c) => renderableFact(c)?.value.text)
    .filter((v): v is string => Boolean(v))
    .slice(0, 2);

  const script = getCounsellingScript(input.moleculeId, "en");

  return {
    moleculeId: input.moleculeId,
    innName: input.innName,
    className: input.className,
    schedules,
    topBrands,
    topWarnings: [...contra.map((t) => `CI: ${t}`), ...topWarnings],
    counsellingEn: script?.lines ?? ["No published counselling yet — verify clinically."],
    stockoutHint:
      "Open Substitution tool for bioequivalent SA alternatives + published SEP deltas.",
    disclaimer:
      "Locum brief is a handover aid from published Materia records. Confirm against the dispensary's SOPs and current stock.",
  };
}
