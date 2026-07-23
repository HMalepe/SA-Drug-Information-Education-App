import type { Molecule, Product } from "./types.js";
import type { VisionResolveHit } from "./vision.js";

/** Build Spec §5.5 packaging forms pharmacists scroll on Medicine 360. */
export type PackagingVisualKind =
  | "box"
  | "tablet"
  | "capsule"
  | "vial"
  | "inhaler"
  | "patch"
  | "syrup"
  | "cream"
  | "injection"
  | "spray"
  | "other";

export interface PackagingVisualCard {
  productId: string;
  brandName: string;
  form: string;
  kind: PackagingVisualKind;
  /** Short UI label, e.g. "Tablet" */
  label: string;
  /** Honest placeholder — no licensed pack photos yet */
  placeholderNote: string;
  /**
   * Imprint / colour codes are NEVER invented.
   * Null until a published, sourced visual dossier exists.
   */
  imprintHint: null;
}

export const PACKAGING_VISUAL_LABELS: Record<PackagingVisualKind, string> = {
  box: "Box / blister",
  tablet: "Tablet",
  capsule: "Capsule",
  vial: "Vial / ampoule",
  inhaler: "Inhaler",
  patch: "Patch",
  syrup: "Syrup / liquid",
  cream: "Cream / ointment",
  injection: "Injection / pen",
  spray: "Spray",
  other: "Pack form",
};

const PLACEHOLDER =
  "Educational form silhouette only — licensed pack photography is not published yet. Confirm against the physical labelled product.";

/** Map free-text product.form → §5.5 visual kind. */
export function mapFormToVisualKind(form: string): PackagingVisualKind {
  const f = form.toLowerCase();
  if (/\b(inhaler|dpi|mdi|puff|aerosol)\b/.test(f)) return "inhaler";
  if (/\b(patch|transdermal)\b/.test(f)) return "patch";
  if (/\b(syrup|suspension|elixir|oral solution|solution oral)\b/.test(f)) return "syrup";
  if (/\b(cream|ointment|gel|lotion|topical)\b/.test(f)) return "cream";
  if (/\b(vial|ampoule|ampule)\b/.test(f)) return "vial";
  if (/\b(inject|injection|prefilled|pen injector|syringe)\b/.test(f)) return "injection";
  if (/\b(spray|nasal|drops)\b/.test(f) && !/\beye\b/.test(f)) return "spray";
  if (/\b(eye drops|eye ointment|ophthalmic)\b/.test(f)) return "spray";
  if (/\b(capsule|cap\b)/.test(f)) return "capsule";
  if (/\b(tablet|caplet|tab\b)/.test(f)) return "tablet";
  if (/\b(box|blister|pack)\b/.test(f)) return "box";
  if (/\b(shampoo|pessary|intrauterine|iud)\b/.test(f)) return "other";
  return "other";
}

export function buildProductVisualCard(product: Product): PackagingVisualCard {
  const kind = mapFormToVisualKind(product.form);
  return {
    productId: product.id,
    brandName: product.brandName,
    form: product.form,
    kind,
    label: PACKAGING_VISUAL_LABELS[kind],
    placeholderNote: PLACEHOLDER,
    imprintHint: null,
  };
}

export function buildMoleculeVisualGallery(products: Product[]): {
  cards: PackagingVisualCard[];
  kindsPresent: PackagingVisualKind[];
  note: string;
} {
  const published = products.filter((p) => p.publishState === "published");
  const cards = published.map(buildProductVisualCard);
  const kindsPresent = [...new Set(cards.map((c) => c.kind))];
  return {
    cards,
    kindsPresent,
    note: "Build Spec §5.5 — scroll the forms on this molecule. Silhouettes are educational placeholders; never invent imprint codes.",
  };
}

const FORM_KEYWORD_TO_KIND: Array<{ re: RegExp; kind: PackagingVisualKind }> = [
  { re: /\b(inhaler|puffer|mdi|dpi)\b/i, kind: "inhaler" },
  { re: /\b(patch|transdermal)\b/i, kind: "patch" },
  { re: /\b(syrup|liquid|suspension)\b/i, kind: "syrup" },
  { re: /\b(cream|ointment|gel)\b/i, kind: "cream" },
  { re: /\b(vial|ampoule|ampule)\b/i, kind: "vial" },
  { re: /\b(injection|injectable|pen|syringe)\b/i, kind: "injection" },
  { re: /\b(spray|nasal)\b/i, kind: "spray" },
  { re: /\b(capsule)\b/i, kind: "capsule" },
  { re: /\b(tablet|pill|caplet)\b/i, kind: "tablet" },
  { re: /\b(box|blister|carton)\b/i, kind: "box" },
];

/**
 * Suggestive visual-form resolve from text like "inhaler" or "white tablet".
 * Does NOT invent colour/imprint identity — form kind only, user must confirm.
 */
export function resolveVisualFormDescription(
  rawInput: string,
  molecules: Molecule[],
  products: Product[],
  limit = 5,
): VisionResolveHit[] {
  const q = rawInput.trim();
  if (!q) return [];

  const matched = FORM_KEYWORD_TO_KIND.find((row) => row.re.test(q));
  if (!matched) return [];

  const kind = matched.kind;
  const hits: VisionResolveHit[] = [];
  for (const product of products) {
    if (product.publishState !== "published") continue;
    if (mapFormToVisualKind(product.form) !== kind) continue;
    const mol = molecules.find((m) => m.id === product.moleculeId && m.publishState === "published");
    if (!mol) continue;
    hits.push({
      kind: "fuzzy",
      query: q,
      moleculeId: mol.id,
      moleculeSlug: mol.slug,
      moleculeName: mol.innName,
      brandName: product.brandName,
      confidence: "low",
      note: `Form cue matched "${PACKAGING_VISUAL_LABELS[kind]}" — suggestive only. Confirm the physical pack; imprint/colour ID is not invented.`,
    });
    if (hits.length >= limit) break;
  }
  return hits;
}
