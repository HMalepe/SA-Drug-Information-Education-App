import type { FormularyEntry, PriceRecord, Product } from "./types.js";
import { isRenderablePublishState } from "./publish.js";

export interface FormularyMatchRow {
  productId: string;
  brandName: string;
  schemeName: string;
  reimbursed: boolean;
  coPayEstimateZar: number | null;
  sepZar: number | null;
  bioequivalentFlag: boolean;
  isOriginator: boolean;
  switchSavesVsSelected: number | null;
  note: string;
}

export interface CoPaySwitchResult {
  schemeName: string;
  moleculeId: string;
  selectedProductId?: string;
  rows: FormularyMatchRow[];
  recommendedProductId: string | null;
  disclaimer: string;
}

function latestSep(productId: string, prices: PriceRecord[]): number | null {
  const rows = prices
    .filter((p) => p.productId === productId && isRenderablePublishState(p.publishState))
    .sort((a, b) => b.effectiveDate.localeCompare(a.effectiveDate));
  return rows[0]?.sepZar ?? null;
}

/**
 * Medical-aid formulary matcher + co-pay switch helper (Build Spec §12).
 * Only published FormularyEntry + PriceRecord rows — never invent scheme rules.
 */
export function matchFormularyAndCoPay(input: {
  moleculeId: string;
  schemeName: string;
  products: Product[];
  formulary: FormularyEntry[];
  prices: PriceRecord[];
  selectedProductId?: string;
}): CoPaySwitchResult {
  const scheme = input.schemeName.trim().toLowerCase();
  const products = input.products.filter(
    (p) => p.moleculeId === input.moleculeId && p.publishState === "published" && !p.isDiscontinued,
  );

  const entries = input.formulary.filter(
    (f) =>
      isRenderablePublishState(f.publishState) &&
      f.schemeName.toLowerCase() === scheme &&
      products.some((p) => p.id === f.productId),
  );

  const selectedSep = input.selectedProductId
    ? latestSep(input.selectedProductId, input.prices)
    : null;
  const selectedCoPay = entries.find((e) => e.productId === input.selectedProductId)?.coPayEstimateZar;

  const rows: FormularyMatchRow[] = products.map((p) => {
    const entry = entries.find((e) => e.productId === p.id);
    const sep = latestSep(p.id, input.prices);
    const coPay = entry?.coPayEstimateZar ?? null;
    let switchSaves: number | null = null;
    if (selectedCoPay != null && coPay != null) {
      switchSaves = Math.round((selectedCoPay - coPay) * 100) / 100;
    } else if (selectedSep != null && sep != null) {
      switchSaves = Math.round((selectedSep - sep) * 100) / 100;
    }
    return {
      productId: p.id,
      brandName: p.brandName,
      schemeName: entry?.schemeName ?? input.schemeName,
      reimbursed: entry?.reimbursed ?? false,
      coPayEstimateZar: coPay,
      sepZar: sep,
      bioequivalentFlag: Boolean(p.bioequivalentFlag) || p.isOriginator,
      isOriginator: p.isOriginator,
      switchSavesVsSelected: switchSaves,
      note: entry
        ? entry.reimbursed
          ? "On formulary (published seed)"
          : "Non-formulary (published seed)"
        : "No published formulary row for this scheme — do not assume cover",
    };
  });

  rows.sort((a, b) => {
    if (a.reimbursed !== b.reimbursed) return a.reimbursed ? -1 : 1;
    if (a.coPayEstimateZar != null && b.coPayEstimateZar != null) {
      return a.coPayEstimateZar - b.coPayEstimateZar;
    }
    if (a.coPayEstimateZar != null) return -1;
    if (b.coPayEstimateZar != null) return 1;
    return a.brandName.localeCompare(b.brandName);
  });

  const recommended =
    rows.find((r) => r.reimbursed && r.bioequivalentFlag) ??
    rows.find((r) => r.reimbursed) ??
    null;

  return {
    schemeName: input.schemeName,
    moleculeId: input.moleculeId,
    selectedProductId: input.selectedProductId,
    rows,
    recommendedProductId: recommended?.productId ?? null,
    disclaimer:
      "Illustrative scheme rows for demo until live formulary partnerships. Confirm against the patient's current scheme rules. Reference tool — does not authorize claims.",
  };
}

export function listSchemes(formulary: FormularyEntry[]): string[] {
  const set = new Set(
    formulary.filter((f) => isRenderablePublishState(f.publishState)).map((f) => f.schemeName),
  );
  return [...set].sort();
}
