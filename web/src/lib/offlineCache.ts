const KEY = "materia.offline.essentials.v1";

export interface CachedPack {
  generatedAt: string;
  essentials: Array<{
    moleculeId: string;
    slug: string;
    innName: string;
    className: string;
    scheduleHints: string[];
    counsellingEn: string[];
    overdoseFirstAid: string[];
    cachedAt: string;
    disclaimer: string;
  }>;
}

export function saveOfflinePack(pack: CachedPack) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(pack));
}

export function loadOfflinePack(): CachedPack | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CachedPack;
  } catch {
    return null;
  }
}

export function isBrowserOffline(): boolean {
  if (typeof navigator === "undefined") return false;
  return !navigator.onLine;
}
