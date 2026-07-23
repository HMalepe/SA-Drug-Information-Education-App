import type { Product, PublishState } from "./types.js";

/** Wholesaler stock signal (Build Spec §5.6 / §10) — illustrative until live feeds. */
export type StockSignal = "in_stock" | "limited" | "shortage" | "unknown";

export interface AvailabilitySignal {
  id: string;
  productId: string;
  wholesaler: string;
  signal: StockSignal;
  note?: string;
  observedAt: string;
  sourceId: string;
  publishState: PublishState;
}

export interface AvailabilityRow {
  productId: string;
  brandName: string;
  moleculeId: string;
  strength: string;
  form: string;
  signals: AvailabilitySignal[];
  worstSignal: StockSignal;
  isShortage: boolean;
  alternativesHint: string;
}

const SEVERITY: Record<StockSignal, number> = {
  shortage: 3,
  limited: 2,
  unknown: 1,
  in_stock: 0,
};

export function worstSignal(signals: AvailabilitySignal[]): StockSignal {
  if (signals.length === 0) return "unknown";
  return signals.reduce(
    (worst, s) => (SEVERITY[s.signal] > SEVERITY[worst] ? s.signal : worst),
    "in_stock" as StockSignal,
  );
}

export function buildAvailabilityForMolecule(input: {
  moleculeId: string;
  products: Product[];
  signals: AvailabilitySignal[];
}): AvailabilityRow[] {
  return input.products
    .filter((p) => p.moleculeId === input.moleculeId && p.publishState === "published")
    .map((p) => {
      const signals = input.signals.filter(
        (s) => s.productId === p.id && s.publishState === "published",
      );
      const worst = worstSignal(signals);
      const isShortage = worst === "shortage" || worst === "limited";
      return {
        productId: p.id,
        brandName: p.brandName,
        moleculeId: p.moleculeId,
        strength: p.strength,
        form: p.form,
        signals,
        worstSignal: worst,
        isShortage,
        alternativesHint: isShortage
          ? "Check published bioequivalents via substitution tool — confirm stock locally before switching."
          : "No published shortage signal for this brand.",
      };
    });
}

export function listActiveShortages(
  products: Product[],
  signals: AvailabilitySignal[],
): AvailabilityRow[] {
  const byMol = new Map<string, Product[]>();
  for (const p of products.filter((x) => x.publishState === "published")) {
    const list = byMol.get(p.moleculeId) ?? [];
    list.push(p);
    byMol.set(p.moleculeId, list);
  }
  const rows: AvailabilityRow[] = [];
  for (const [moleculeId, prods] of byMol) {
    rows.push(
      ...buildAvailabilityForMolecule({ moleculeId, products: prods, signals }).filter(
        (r) => r.isShortage,
      ),
    );
  }
  return rows;
}
