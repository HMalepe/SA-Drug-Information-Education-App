import type { Product } from "./types.js";
import { resolveSearch } from "./search.js";
import type { Molecule } from "./types.js";
import { resolveVisualFormDescription } from "./visualId.js";

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
 * Box / barcode / form-cue resolve — suggestive only; user must confirm.
 * Maps GTIN/barcode stubs, brand text, and §5.5 form keywords → molecule.
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

  const textHits = resolveSearch(q, molecules, products, 5).map((h) => ({
    kind: (h.kind === "brand" ? "brand_text" : "fuzzy") as "brand_text" | "fuzzy",
    query: q,
    moleculeId: h.moleculeId,
    moleculeSlug: h.moleculeSlug,
    moleculeName: h.moleculeName,
    brandName: h.brandName,
    confidence: (h.score >= 90 ? "high" : h.score >= 70 ? "medium" : "low") as
      | "high"
      | "medium"
      | "low",
    note: "Text/OCR resolve is suggestive — confirm the physical product. Camera capture lands later.",
  }));

  if (textHits.length > 0) return textHits;

  return resolveVisualFormDescription(q, molecules, products, 5);
}

/** Demo barcode → product map (replace with real GTIN ingest). */
export const DEMO_BARCODE_INDEX: Record<string, string> = {
  "6001234567890": "prod-amoxil",
  "6001234567891": "prod-amoxicillin-asp",
  "6009876543210": "prod-augmentin",
  "6009876543211": "prod-coamoxiclav-sandoz",
};
