import type { Molecule, Product, SearchHit } from "./types.js";

function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Compact Levenshtein for misspellings (e.g. augumentin → Augmentin). */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const prev = new Array<number>(b.length + 1);
  const curr = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        (prev[j] ?? 0) + 1,
        (curr[j - 1] ?? 0) + 1,
        (prev[j - 1] ?? 0) + cost,
      );
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j] ?? 0;
  }
  return prev[b.length] ?? b.length;
}

function fuzzyMatch(q: string, candidate: string): number | null {
  if (!candidate) return null;
  if (candidate === q) return 100;
  if (candidate.startsWith(q) || q.startsWith(candidate)) return 85;
  if (candidate.includes(q) || q.includes(candidate)) return 70;
  const maxLen = Math.max(candidate.length, q.length);
  if (maxLen <= 3) return null;
  const dist = editDistance(q.replace(/\s/g, ""), candidate.replace(/\s/g, ""));
  const threshold = maxLen <= 6 ? 1 : 2;
  if (dist <= threshold) return 65 - dist * 5;
  return null;
}

/**
 * Authored educational indication → area/class routes (Build Spec §5.1).
 * Original Materia aliases — not copied from SAMF/MIMS. Never invents molecules.
 */
export interface IndicationRoute {
  id: string;
  phrases: string[];
  /** Match molecules whose therapeuticArea is in this set (normalized). */
  therapeuticAreas?: string[];
  /** Substring match against published className (normalized). */
  classContains?: string[];
}

export const INDICATION_ROUTES: IndicationRoute[] = [
  {
    id: "ace-inhibitors",
    phrases: ["ace inhibitor", "ace inhibitors", "acei"],
    classContains: ["ace inhibitor"],
  },
  {
    id: "arb",
    phrases: ["arb", "arbs", "angiotensin receptor blocker", "angiotensin ii receptor"],
    classContains: ["angiotensin receptor", "arb"],
  },
  {
    id: "beta-blocker",
    phrases: ["beta blocker", "beta blockers", "beta-blocker"],
    classContains: ["beta blocker", "beta-blocker", "beta adrenergic"],
  },
  {
    id: "ccb",
    phrases: ["ccb", "calcium channel blocker", "calcium-channel blocker", "dihydropyridine"],
    classContains: ["calcium channel", "dihydropyridine", "ccb"],
  },
  {
    id: "sa-hypertension",
    phrases: [
      "hypertension",
      "high blood pressure",
      "first line sa hypertension",
      "first-line sa hypertension",
      "sa hypertension",
    ],
    therapeuticAreas: ["antihypertensives", "cardiovascular"],
  },
  {
    id: "diabetes",
    phrases: ["diabetes", "type 2 diabetes", "t2dm", "glycaemic", "glycemic"],
    therapeuticAreas: ["diabetes", "endocrine"],
  },
  {
    id: "macrolide",
    phrases: ["macrolide", "macrolides"],
    classContains: ["macrolide"],
  },
  {
    id: "antibiotics",
    phrases: ["antibiotic", "antibiotics", "antimicrobial"],
    therapeuticAreas: ["antibiotics"],
  },
  {
    id: "ppi",
    phrases: ["ppi", "proton pump inhibitor", "proton-pump inhibitor"],
    classContains: ["proton pump"],
  },
  {
    id: "ssri",
    phrases: ["ssri", "selective serotonin reuptake"],
    classContains: ["selective serotonin reuptake", "ssri"],
  },
];

function matchIndicationRoute(q: string, routes: IndicationRoute[]): IndicationRoute | null {
  for (const route of routes) {
    for (const phrase of route.phrases) {
      const p = normalize(phrase);
      if (!p) continue;
      if (q === p || q.includes(p) || p.includes(q)) return route;
      // multi-word: all tokens present
      const tokens = p.split(" ").filter((t) => t.length > 2);
      if (tokens.length >= 2 && tokens.every((t) => q.includes(t))) return route;
    }
  }
  return null;
}

/** Lightweight brand → molecule resolution + class/indication lists (Build Spec §5.1). */
export function resolveSearch(
  query: string,
  molecules: Molecule[],
  products: Product[],
  limit = 20,
  routes: IndicationRoute[] = INDICATION_ROUTES,
): SearchHit[] {
  const q = normalize(query);
  if (!q) return [];

  const molById = new Map(molecules.map((m) => [m.id, m]));
  const hits: SearchHit[] = [];

  for (const m of molecules) {
    if (m.publishState !== "published") continue;
    const names = [m.innName, m.slug, ...m.synonyms].map(normalize);
    let best: number | null = null;
    for (const name of names) {
      const score = fuzzyMatch(q, name);
      if (score != null && (best == null || score > best)) best = score;
    }
    if (best != null) {
      hits.push({
        kind: "molecule",
        queryMatched: m.innName,
        moleculeId: m.id,
        moleculeSlug: m.slug,
        moleculeName: m.innName,
        score: best,
      });
    }
  }

  for (const p of products) {
    if (p.publishState !== "published") continue;
    const mol = molById.get(p.moleculeId);
    if (!mol || mol.publishState !== "published") continue;
    const keys = [p.brandName, ...p.synonymKeys].map(normalize);
    let best: number | null = null;
    for (const key of keys) {
      const score = fuzzyMatch(q, key);
      if (score != null && (best == null || score > best)) best = score;
    }
    if (best != null) {
      hits.push({
        kind: "brand",
        queryMatched: p.brandName,
        moleculeId: mol.id,
        moleculeSlug: mol.slug,
        moleculeName: mol.innName,
        brandName: p.brandName,
        score: Math.min(95, best),
      });
    }
  }

  // Direct className / therapeuticArea matching
  for (const m of molecules) {
    if (m.publishState !== "published") continue;
    const classN = normalize(m.className);
    const areaN = normalize(m.therapeuticArea);
    const classScore = fuzzyMatch(q, classN);
    if (classScore != null || (q.length >= 3 && classN.includes(q))) {
      hits.push({
        kind: "class",
        queryMatched: m.className,
        moleculeId: m.id,
        moleculeSlug: m.slug,
        moleculeName: m.innName,
        score: classScore ?? 60,
      });
    }
    if (q.length >= 3 && (areaN === q || areaN.includes(q) || q.includes(areaN))) {
      hits.push({
        kind: "area",
        queryMatched: m.therapeuticArea,
        moleculeId: m.id,
        moleculeSlug: m.slug,
        moleculeName: m.innName,
        score: areaN === q ? 80 : 62,
      });
    }
  }

  // Authored indication / class phrase routes
  const route = matchIndicationRoute(q, routes);
  if (route) {
    const areas = new Set((route.therapeuticAreas ?? []).map(normalize));
    const classNeedles = (route.classContains ?? []).map(normalize);
    for (const m of molecules) {
      if (m.publishState !== "published") continue;
      const areaN = normalize(m.therapeuticArea);
      const classN = normalize(m.className);
      const areaHit = areas.size > 0 && areas.has(areaN);
      const classHit = classNeedles.some((n) => n && classN.includes(n));
      if (!areaHit && !classHit) continue;
      hits.push({
        kind: "indication",
        queryMatched: route.phrases[0] ?? route.id,
        moleculeId: m.id,
        moleculeSlug: m.slug,
        moleculeName: m.innName,
        score: classHit ? 78 : 72,
      });
    }
  }

  hits.sort((a, b) => b.score - a.score || a.moleculeName.localeCompare(b.moleculeName));

  const preferred = hits.filter((h) => h.kind === "molecule" || h.kind === "brand");
  const secondary = hits.filter((h) => h.kind !== "molecule" && h.kind !== "brand");
  const ordered = [...preferred, ...secondary];

  const deduped: SearchHit[] = [];
  const seenExact = new Set<string>();
  const seenListMol = new Set<string>();
  for (const h of ordered) {
    if (h.kind === "molecule" || h.kind === "brand") {
      const k = `${h.kind}:${h.moleculeId}:${h.brandName ?? ""}`;
      if (seenExact.has(k)) continue;
      seenExact.add(k);
      deduped.push(h);
    } else {
      if (seenListMol.has(h.moleculeId)) continue;
      seenListMol.add(h.moleculeId);
      deduped.push(h);
    }
    if (deduped.length >= limit) break;
  }
  return deduped;
}

/** List distinct published class labels (for browse / typeahead later). */
export function listPublishedClasses(molecules: Molecule[]): string[] {
  const set = new Set<string>();
  for (const m of molecules) {
    if (m.publishState !== "published") continue;
    const c = m.className.trim();
    if (c) set.add(c);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
