import { buildSubstitutionOptions, type SubstitutionResult } from "./substitution.js";
import type { PriceRecord, Product } from "./types.js";

/**
 * Doc 16 / Build Spec §6 — Pharmacy locator stub (Maps/Places later).
 * Authored illustrative SA pharmacy directory — not live stock, not Google Places.
 * When a molecule is supplied, attaches published SEP/substitution context only.
 */

export interface PharmacyFixture {
  id: string;
  name: string;
  chain?: string;
  city: string;
  suburb: string;
  /** WGS84 — approximate public area centroids for demo distance only */
  lat: number;
  lng: number;
  /** Illustrative display string — not dialled by Materia */
  phoneDisplay?: string;
  hoursNote: string;
  publishState: "published" | "draft";
}

export interface CityCentroid {
  key: string;
  label: string;
  lat: number;
  lng: number;
}

export interface PharmacyHit {
  pharmacy: PharmacyFixture;
  distanceKm: number | null;
  cityMatch: boolean;
}

export interface PharmacyLocatorResult {
  city?: string;
  queryLat?: number;
  queryLng?: number;
  pharmacies: PharmacyHit[];
  substitution: SubstitutionResult | null;
  refillPrompt: string | null;
  note: string;
  disclaimer: string;
}

const DISCLAIMER =
  "Illustrative Materia pharmacy directory for education and UX wiring. Not live stock, opening hours, or Google Places. Confirm locally before travelling. SEP figures appear only when published.";

/** Major SA city centroids for stub “near me” without GPS. */
export const SA_CITY_CENTROIDS: CityCentroid[] = [
  { key: "johannesburg", label: "Johannesburg", lat: -26.2041, lng: 28.0473 },
  { key: "pretoria", label: "Pretoria / Tshwane", lat: -25.7479, lng: 28.2293 },
  { key: "cape-town", label: "Cape Town", lat: -33.9249, lng: 18.4241 },
  { key: "durban", label: "Durban", lat: -29.8587, lng: 31.0218 },
  { key: "bloemfontein", label: "Bloemfontein", lat: -29.0852, lng: 26.1596 },
  { key: "gqeberha", label: "Gqeberha / PE", lat: -33.9608, lng: 25.6022 },
];

/** Original Materia demo fixtures — fictionalised community pharmacies for stub maps. */
export const PHARMACY_DIRECTORY: PharmacyFixture[] = [
  {
    id: "rx-jhb-braam",
    name: "Braamfontein Community Pharmacy",
    chain: "Independent",
    city: "johannesburg",
    suburb: "Braamfontein",
    lat: -26.1929,
    lng: 28.0305,
    phoneDisplay: "+27 11 000 1001",
    hoursNote: "Weekday daytime hours typical — confirm before visiting.",
    publishState: "published",
  },
  {
    id: "rx-jhb-sandton",
    name: "Sandton Medical Centre Pharmacy",
    chain: "Independent",
    city: "johannesburg",
    suburb: "Sandton",
    lat: -26.1076,
    lng: 28.0567,
    phoneDisplay: "+27 11 000 1002",
    hoursNote: "Mall hours vary — confirm before visiting.",
    publishState: "published",
  },
  {
    id: "rx-pta-hatfield",
    name: "Hatfield Student Pharmacy",
    chain: "Independent",
    city: "pretoria",
    suburb: "Hatfield",
    lat: -25.7485,
    lng: 28.238,
    hoursNote: "Near campus — confirm stock and hours locally.",
    publishState: "published",
  },
  {
    id: "rx-cpt-gardens",
    name: "Gardens Health Pharmacy",
    chain: "Independent",
    city: "cape-town",
    suburb: "Gardens",
    lat: -33.935,
    lng: 18.411,
    phoneDisplay: "+27 21 000 2001",
    hoursNote: "City-bowl hours — confirm before visiting.",
    publishState: "published",
  },
  {
    id: "rx-cpt-mitchells",
    name: "Mitchells Plain Care Pharmacy",
    chain: "Independent",
    city: "cape-town",
    suburb: "Mitchells Plain",
    lat: -34.0507,
    lng: 18.618,
    hoursNote: "Community hours — confirm before visiting.",
    publishState: "published",
  },
  {
    id: "rx-dbn-berea",
    name: "Berea Dispensary",
    chain: "Independent",
    city: "durban",
    suburb: "Berea",
    lat: -29.851,
    lng: 31.001,
    hoursNote: "Confirm hours and delivery options locally.",
    publishState: "published",
  },
  {
    id: "rx-bfn-westdene",
    name: "Westdene Family Pharmacy",
    chain: "Independent",
    city: "bloemfontein",
    suburb: "Westdene",
    lat: -29.116,
    lng: 26.174,
    hoursNote: "Confirm hours locally.",
    publishState: "published",
  },
  {
    id: "rx-pe-central",
    name: "Central Gqeberha Pharmacy",
    chain: "Independent",
    city: "gqeberha",
    suburb: "Central",
    lat: -33.961,
    lng: 25.61,
    hoursNote: "Confirm hours locally.",
    publishState: "published",
  },
  {
    id: "rx-draft-hidden",
    name: "Draft pharmacy — must not appear",
    city: "johannesburg",
    suburb: "Draft",
    lat: -26.2,
    lng: 28.0,
    hoursNote: "Draft",
    publishState: "draft",
  },
];

export function normalizeCityKey(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function resolveCityCentroid(cityRaw: string): CityCentroid | null {
  const key = normalizeCityKey(cityRaw);
  if (!key) return null;
  const aliases: Record<string, string> = {
    jhb: "johannesburg",
    jozi: "johannesburg",
    tshwane: "pretoria",
    "cape-town": "cape-town",
    capetown: "cape-town",
    "port-elizabeth": "gqeberha",
    pe: "gqeberha",
  };
  const resolved = aliases[key] ?? key;
  return SA_CITY_CENTROIDS.find((c) => c.key === resolved) ?? null;
}

/** Haversine distance in km. */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)) * 10) / 10;
}

export function listPublishedPharmacies(
  directory: PharmacyFixture[] = PHARMACY_DIRECTORY,
): PharmacyFixture[] {
  return directory.filter((p) => p.publishState === "published");
}

/**
 * Build Spec refill prompt — educational only; never invents a due date or dose.
 */
export function buildRefillSepPrompt(sub: SubstitutionResult | null): string | null {
  if (!sub) return null;
  const cheap = sub.options.find((o) => o.productId === sub.cheapestBioequivalentId);
  if (cheap?.sepPublished && cheap.sepZar != null) {
    return `When your script is due, ask your pharmacist about published bioequivalent options. Cheapest published SEP example in Materia for this molecule: ${cheap.brandName} (R${cheap.sepZar.toFixed(2)}) — illustrative seed SEP, confirm live DoH SEP and local stock.`;
  }
  return "When your script is due, ask your pharmacist about bioequivalent brands and local stock. Materia has no published SEP for a cheapest option yet — it will not invent a price.";
}

export function locatePharmacies(input: {
  city?: string;
  lat?: number;
  lng?: number;
  limit?: number;
  directory?: PharmacyFixture[];
  moleculeId?: string;
  products?: Product[];
  prices?: PriceRecord[];
  selectedProductId?: string;
}): PharmacyLocatorResult {
  const limit = Math.max(1, Math.min(input.limit ?? 8, 20));
  const published = listPublishedPharmacies(input.directory);
  const city = input.city ? resolveCityCentroid(input.city) : null;
  const origin =
    input.lat != null && input.lng != null && Number.isFinite(input.lat) && Number.isFinite(input.lng)
      ? { lat: input.lat, lng: input.lng }
      : city
        ? { lat: city.lat, lng: city.lng }
        : null;

  let hits: PharmacyHit[] = published.map((pharmacy) => {
    const cityMatch = city ? pharmacy.city === city.key : false;
    const distanceKmVal = origin ? distanceKm(origin, pharmacy) : null;
    return { pharmacy, distanceKm: distanceKmVal, cityMatch };
  });

  if (city) {
    hits = hits.filter((h) => h.cityMatch);
  }

  hits.sort((a, b) => {
    if (a.distanceKm != null && b.distanceKm != null) return a.distanceKm - b.distanceKm;
    if (a.distanceKm != null) return -1;
    if (b.distanceKm != null) return 1;
    return a.pharmacy.name.localeCompare(b.pharmacy.name);
  });

  let substitution: SubstitutionResult | null = null;
  if (input.moleculeId && input.products && input.prices) {
    substitution = buildSubstitutionOptions(
      input.moleculeId,
      input.products,
      input.prices,
      input.selectedProductId,
    );
  }

  return {
    city: city?.label ?? input.city,
    queryLat: origin?.lat,
    queryLng: origin?.lng,
    pharmacies: hits.slice(0, limit),
    substitution,
    refillPrompt: buildRefillSepPrompt(substitution),
    note: city
      ? `Showing published stub pharmacies in ${city.label}.`
      : origin
        ? "Showing published stub pharmacies nearest the given coordinates."
        : "Showing published stub pharmacies nationwide — pass city or lat/lng to filter.",
    disclaimer: DISCLAIMER,
  };
}
