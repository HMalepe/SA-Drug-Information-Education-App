import type { Molecule, SafetyProfile, Source } from "./types.js";
import { renderableFact } from "./publish.js";

/**
 * Build Spec §12 — Clinical-pearl feed.
 * Daily high-yield pearls from published safety clinicalPearls only.
 * Never invents pearls. Personalisation reorders; it does not fabricate.
 */

export interface PearlFeedItem {
  id: string;
  moleculeId: string;
  moleculeSlug: string;
  innName: string;
  therapeuticArea: string;
  className: string;
  text: string;
  sourceId: string;
  lastReviewed: string;
  sourceCitation?: string;
  /** Why this item was prioritised today */
  reason: "specialty" | "weak_area" | "daily_rotation";
}

export interface PearlFeedView {
  dateKey: string;
  items: PearlFeedItem[];
  totalPublishedPool: number;
  note: string;
  disclaimer: string;
}

export interface PearlCatalogEntry {
  molecule: Pick<Molecule, "id" | "slug" | "innName" | "therapeuticArea" | "className">;
  pearl: { value: string; sourceId: string; lastReviewed: string };
}

/** Collect published pearls across safety profiles. */
export function collectPublishedPearls(
  molecules: Molecule[],
  safetyProfiles: SafetyProfile[],
): PearlCatalogEntry[] {
  const molById = new Map(molecules.map((m) => [m.id, m] as const));
  const out: PearlCatalogEntry[] = [];
  for (const sp of safetyProfiles) {
    const mol = molById.get(sp.moleculeId);
    if (!mol || mol.publishState !== "published") continue;
    for (const fact of sp.clinicalPearls ?? []) {
      const rendered = renderableFact(fact);
      if (!rendered) continue;
      out.push({
        molecule: {
          id: mol.id,
          slug: mol.slug,
          innName: mol.innName,
          therapeuticArea: mol.therapeuticArea,
          className: mol.className,
        },
        pearl: {
          value: String(rendered.value),
          sourceId: rendered.sourceId,
          lastReviewed: rendered.lastReviewed,
        },
      });
    }
  }
  return out;
}

/** Stable hash for deterministic daily rotation (not crypto). */
export function hashPearlSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function dateKeyUtc(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function normalizeArea(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, "-");
}

/**
 * Build today's feed. Specialty / weak areas boost priority; daily seed rotates the rest.
 */
export function buildPearlFeed(input: {
  catalog: PearlCatalogEntry[];
  sources?: Source[];
  /** Prefer these therapeutic areas (e.g. antibiotics, hiv-tb) */
  specialtyAreas?: string[];
  /** Academy / self-declared weak areas — same area keys */
  weakAreas?: string[];
  /** ISO date YYYY-MM-DD — defaults to UTC today */
  dateKey?: string;
  /** Opaque user bucket for personalised rotation */
  userKey?: string;
  limit?: number;
}): PearlFeedView {
  const dateKey = input.dateKey ?? dateKeyUtc();
  const limit = Math.max(1, Math.min(input.limit ?? 5, 20));
  const specialty = new Set((input.specialtyAreas ?? []).map(normalizeArea));
  const weak = new Set((input.weakAreas ?? []).map(normalizeArea));
  const sourceCite = new Map((input.sources ?? []).map((s) => [s.id, s.citation] as const));

  const scored = input.catalog.map((entry, index) => {
    const area = normalizeArea(entry.molecule.therapeuticArea);
    let reason: PearlFeedItem["reason"] = "daily_rotation";
    let boost = 0;
    if (specialty.has(area)) {
      boost += 1000;
      reason = "specialty";
    }
    if (weak.has(area)) {
      boost += 500;
      reason = reason === "specialty" ? "specialty" : "weak_area";
    }
    const seed = hashPearlSeed(
      `${dateKey}|${input.userKey ?? "anon"}|${entry.molecule.id}|${entry.pearl.sourceId}|${index}|${entry.pearl.value.slice(0, 40)}`,
    );
    return { entry, reason, score: boost + (seed % 400), seed };
  });

  scored.sort((a, b) => b.score - a.score || a.entry.molecule.innName.localeCompare(b.entry.molecule.innName));

  const items: PearlFeedItem[] = scored.slice(0, limit).map(({ entry, reason }) => ({
    id: `pearl-${entry.molecule.id}-${hashPearlSeed(entry.pearl.value).toString(16)}`,
    moleculeId: entry.molecule.id,
    moleculeSlug: entry.molecule.slug,
    innName: entry.molecule.innName,
    therapeuticArea: entry.molecule.therapeuticArea,
    className: entry.molecule.className,
    text: entry.pearl.value,
    sourceId: entry.pearl.sourceId,
    lastReviewed: entry.pearl.lastReviewed,
    sourceCitation: sourceCite.get(entry.pearl.sourceId),
    reason,
  }));

  return {
    dateKey,
    items,
    totalPublishedPool: input.catalog.length,
    note:
      input.catalog.length === 0
        ? "No published clinical pearls in the seed set yet — empty feed is intentional."
        : "Published pearls only. Personalisation reorders today's card; it never invents content.",
    disclaimer:
      "Educational pearls for habit and teaching — not patient-specific advice. Confirm clinically.",
  };
}
