import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  PHARMACY_DIRECTORY,
  buildRefillSepPrompt,
  distanceKm,
  listPublishedPharmacies,
  locatePharmacies,
  resolveCityCentroid,
  type PriceRecord,
  type Product,
} from "@materia/shared";

const products: Product[] = [
  {
    id: "prod-amoxil",
    moleculeId: "mol-amox",
    manufacturerId: "m1",
    brandName: "Amoxil",
    strength: "500 mg",
    form: "capsule",
    schedule: "S4",
    isOriginator: true,
    isDiscontinued: false,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
  {
    id: "prod-aspen",
    moleculeId: "mol-amox",
    manufacturerId: "m2",
    brandName: "Amoxicillin Aspen",
    strength: "500 mg",
    form: "capsule",
    schedule: "S4",
    isOriginator: false,
    isDiscontinued: false,
    bioequivalentFlag: true,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
];

const prices: PriceRecord[] = [
  {
    id: "p1",
    productId: "prod-amoxil",
    sepZar: 89.95,
    effectiveDate: "2026-07-01",
    sourceId: "src-sep",
    publishState: "published",
  },
  {
    id: "p2",
    productId: "prod-aspen",
    sepZar: 52.4,
    effectiveDate: "2026-07-01",
    sourceId: "src-sep",
    publishState: "published",
  },
];

describe("v51 pharmacy locator Doc 16", () => {
  it("exposes published SA fixtures only", () => {
    assert.ok(listPublishedPharmacies().length >= 5);
    assert.equal(listPublishedPharmacies().some((p) => p.id === "rx-draft-hidden"), false);
    assert.ok(resolveCityCentroid("Jozi"));
    assert.ok(distanceKm({ lat: -26.2, lng: 28.0 }, { lat: -26.3, lng: 28.1 }) > 0);
  });

  it("filters by city and attaches published SEP refill prompt without inventing stock", () => {
    const r = locatePharmacies({
      city: "cape town",
      moleculeId: "mol-amox",
      products,
      prices,
      selectedProductId: "prod-amoxil",
    });
    assert.ok(r.pharmacies.length >= 1);
    assert.ok(r.pharmacies.every((h) => h.pharmacy.city === "cape-town"));
    assert.equal(r.pharmacies.some((h) => h.pharmacy.publishState === "draft"), false);
    assert.ok(r.substitution?.cheapestBioequivalentId);
    const prompt = buildRefillSepPrompt(r.substitution);
    assert.ok(prompt);
    assert.match(prompt!, /Amoxicillin Aspen|R52/);
    assert.doesNotMatch(prompt!, /in stock|available now/i);
    assert.match(r.disclaimer, /Not live stock/i);
    assert.equal(PHARMACY_DIRECTORY.some((p) => p.publishState === "draft"), true);
  });
});
