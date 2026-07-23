import type { PriceRecord, Product } from "./types.js";
import { isRenderablePublishState } from "./publish.js";

export interface SubstitutionOption {
  productId: string;
  brandName: string;
  strength: string;
  form: string;
  schedule: string;
  isOriginator: boolean;
  isDiscontinued: boolean;
  bioequivalentFlag: boolean;
  sepZar: number | null;
  sepPublished: boolean;
  priceDeltaVsSelected: number | null;
  rankReason: string;
}

export interface SubstitutionResult {
  moleculeId: string;
  selectedProductId?: string;
  options: SubstitutionOption[];
  cheapestBioequivalentId: string | null;
  note: string;
}

/**
 * Stockout substitution helper — ranks published SA products.
 * SEP only from published PriceRecords (never invented).
 */
export function buildSubstitutionOptions(
  moleculeId: string,
  products: Product[],
  prices: PriceRecord[],
  selectedProductId?: string,
): SubstitutionResult {
  const publishedProducts = products.filter(
    (p) => p.moleculeId === moleculeId && p.publishState === "published" && !p.isDiscontinued,
  );

  const latestPublishedSep = (productId: string): { sep: number | null; published: boolean } => {
    const rows = prices
      .filter((pr) => pr.productId === productId && isRenderablePublishState(pr.publishState))
      .sort((a, b) => b.effectiveDate.localeCompare(a.effectiveDate));
    const top = rows[0];
    if (!top || top.sepZar == null) return { sep: null, published: false };
    return { sep: top.sepZar, published: true };
  };

  const selectedSep = selectedProductId
    ? latestPublishedSep(selectedProductId).sep
    : null;

  const options: SubstitutionOption[] = publishedProducts.map((p) => {
    const { sep, published } = latestPublishedSep(p.id);
    const bio = Boolean(p.bioequivalentFlag) || p.isOriginator;
    let rankReason = "Registered SA product";
    if (p.isOriginator) rankReason = "Originator / first-to-market";
    if (p.bioequivalentFlag) rankReason = "SAHPRA bioequivalence flag (seed metadata)";
    if (published && sep != null) rankReason += " · published SEP";

    return {
      productId: p.id,
      brandName: p.brandName,
      strength: p.strength,
      form: p.form,
      schedule: p.schedule,
      isOriginator: p.isOriginator,
      isDiscontinued: p.isDiscontinued,
      bioequivalentFlag: bio,
      sepZar: sep,
      sepPublished: published,
      priceDeltaVsSelected:
        selectedSep != null && sep != null ? Math.round((sep - selectedSep) * 100) / 100 : null,
      rankReason,
    };
  });

  options.sort((a, b) => {
    // Prefer bioequivalent, then lowest published SEP, then brand name
    if (a.bioequivalentFlag !== b.bioequivalentFlag) return a.bioequivalentFlag ? -1 : 1;
    if (a.sepZar != null && b.sepZar != null) return a.sepZar - b.sepZar;
    if (a.sepZar != null) return -1;
    if (b.sepZar != null) return 1;
    return a.brandName.localeCompare(b.brandName);
  });

  const cheapestBio =
    options.find((o) => o.bioequivalentFlag && o.sepZar != null) ??
    options.find((o) => o.sepZar != null) ??
    null;

  return {
    moleculeId,
    selectedProductId,
    options,
    cheapestBioequivalentId: cheapestBio?.productId ?? null,
    note:
      "SEP values render only when published from the DoH SEP source. Missing SEP ≠ R0 — it means not yet ingested. Confirm substitution clinically and against current SAHPRA / scheme rules.",
  };
}
