import type { Product } from "./types.js";
import { resolveSearch } from "./search.js";
import type { Molecule } from "./types.js";

export interface VisionResolveHit {
  kind: "barcode" | "brand_text" | "fuzzy";
  query: string;
  moleculeId: string;
  moleculeSlug: string;
  moleculeName: string;
  brandName?: string;
  confidence: "high" | "medium" | "low";
  note: string;
}

/**
 * Box / barcode resolve — suggestive only; user must confirm.
 * Maps GTIN/barcode stubs and brand text → molecule via published product index.
 */
export function resolveProductScan(
  rawInput: string,
  molecules: Molecule[],
  products: Product[],
  barcodeIndex: Record<string, string> = {},
): VisionResolveHit[] {
  const q = rawInput.trim();
  if (!q) return [];

  const digits = q.replace(/\s/g, "");
  if (/^\d{8,14}$/.test(digits) && barcodeIndex[digits]) {
    const productId = barcodeIndex[digits];
    const product = products.find((p) => p.id === productId && p.publishState === "published");
    const mol = product ? molecules.find((m) => m.id === product.moleculeId) : undefined;
    if (product && mol && mol.publishState === "published") {
      return [
        {
          kind: "barcode",
          query: digits,
          moleculeId: mol.id,
          moleculeSlug: mol.slug,
          moleculeName: mol.innName,
          brandName: product.brandName,
          confidence: "high",
          note: "Barcode matched published seed index — confirm the pack visually before acting.",
        },
      ];
    }
  }

  const hits = resolveSearch(q, molecules, products, 5);
  return hits.map((h) => ({
    kind: h.kind === "brand" ? ("brand_text" as const) : ("fuzzy" as const),
    query: q,
    moleculeId: h.moleculeId,
    moleculeSlug: h.moleculeSlug,
    moleculeName: h.moleculeName,
    brandName: h.brandName,
    confidence: h.score >= 90 ? "high" : h.score >= 70 ? "medium" : "low",
    note: "Text/OCR resolve is suggestive — confirm the physical product. Pill ID camera lands later.",
  }));
}

/** Demo barcode → product map (replace with real GTIN ingest). */
export const DEMO_BARCODE_INDEX: Record<string, string> = {
  "6001234567890": "prod-amoxil",
  "6001234567891": "prod-amoxicillin-asp",
  "6009876543210": "prod-augmentin",
  "6009876543211": "prod-coamoxiclav-sandoz",
};
