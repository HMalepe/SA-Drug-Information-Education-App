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

/** Lightweight brand → molecule resolution (Build Spec §5.1). */
export function resolveSearch(
  query: string,
  molecules: Molecule[],
  products: Product[],
  limit = 10,
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

  hits.sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const deduped: SearchHit[] = [];
  for (const h of hits) {
    const k = `${h.kind}:${h.moleculeId}:${h.brandName ?? ""}`;
    if (seen.has(k)) continue;
    seen.add(k);
    deduped.push(h);
    if (deduped.length >= limit) break;
  }
  return deduped;
}
