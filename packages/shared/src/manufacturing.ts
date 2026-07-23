import type { Manufacturer, Molecule, Product } from "./types.js";

/**
 * Build Spec §5.3 / §10.1 — Manufacturing transparency.
 * Originator → marketing company → plant / API / packaging sites from published
 * manufacturer rows only. Missing fields stay null — never invented.
 */

export interface ManufacturingChainRow {
  productId: string;
  brandName: string;
  isOriginator: boolean;
  schedule: string;
  manufacturerName: string | null;
  marketingCompany: string | null;
  plantSite: string | null;
  apiOrigin: string | null;
  packagingSite: string | null;
  madeInSa: boolean | null;
  missingFields: string[];
}

export interface ManufacturingTransparency {
  moleculeId: string;
  moleculeName: string;
  moleculeSlug: string;
  rows: ManufacturingChainRow[];
  publishedFieldCount: number;
  note: string;
  disclaimer: string;
}

export const MANUFACTURING_DISCLAIMER =
  "Manufacturing transparency shows published Materia manufacturer metadata only. Blank fields mean not yet ingested — Materia will not invent plant sites, API origin, or ownership.";

function missingOn(m: Manufacturer | null | undefined): string[] {
  if (!m) return ["manufacturer", "marketingCompany", "plantSite", "apiOrigin", "packagingSite", "madeInSa"];
  const miss: string[] = [];
  if (!m.name?.trim()) miss.push("manufacturer");
  if (!m.marketingCompany?.trim()) miss.push("marketingCompany");
  if (!m.plantSite?.trim()) miss.push("plantSite");
  if (!m.apiOrigin?.trim()) miss.push("apiOrigin");
  if (!m.packagingSite?.trim()) miss.push("packagingSite");
  if (m.madeInSa == null) miss.push("madeInSa");
  return miss;
}

export function buildManufacturingRow(
  product: Product,
  manufacturer: Manufacturer | null | undefined,
): ManufacturingChainRow {
  const miss = missingOn(manufacturer);
  return {
    productId: product.id,
    brandName: product.brandName,
    isOriginator: product.isOriginator,
    schedule: product.schedule,
    manufacturerName: manufacturer?.name?.trim() || null,
    marketingCompany: manufacturer?.marketingCompany?.trim() || null,
    plantSite: manufacturer?.plantSite?.trim() || null,
    apiOrigin: manufacturer?.apiOrigin?.trim() || null,
    packagingSite: manufacturer?.packagingSite?.trim() || null,
    madeInSa: manufacturer?.madeInSa ?? null,
    missingFields: miss,
  };
}

export function buildManufacturingTransparency(input: {
  molecule: Molecule;
  products: Product[];
  manufacturers: Manufacturer[];
}): ManufacturingTransparency | null {
  if (input.molecule.publishState !== "published") return null;

  const byId = new Map(input.manufacturers.map((m) => [m.id, m]));
  const published = input.products.filter(
    (p) =>
      p.moleculeId === input.molecule.id &&
      p.publishState === "published" &&
      !p.isDiscontinued &&
      p.brandName.trim().length >= 2,
  );

  const rows = published
    .map((p) => buildManufacturingRow(p, byId.get(p.manufacturerId)))
    .sort((a, b) => Number(b.isOriginator) - Number(a.isOriginator) || a.brandName.localeCompare(b.brandName));

  let publishedFieldCount = 0;
  for (const r of rows) {
    if (r.manufacturerName) publishedFieldCount += 1;
    if (r.marketingCompany) publishedFieldCount += 1;
    if (r.plantSite) publishedFieldCount += 1;
    if (r.apiOrigin) publishedFieldCount += 1;
    if (r.packagingSite) publishedFieldCount += 1;
    if (r.madeInSa != null) publishedFieldCount += 1;
  }

  return {
    moleculeId: input.molecule.id,
    moleculeName: input.molecule.innName,
    moleculeSlug: input.molecule.slug,
    rows,
    publishedFieldCount,
    note:
      rows.length === 0
        ? `No published SA products for ${input.molecule.innName} yet — Materia will not invent a manufacturing chain.`
        : `Published manufacturing cues for ${rows.length} brand row(s). Blank sites/origins are not guessed.`,
    disclaimer: MANUFACTURING_DISCLAIMER,
  };
}
