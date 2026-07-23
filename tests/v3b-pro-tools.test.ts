import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildLocumBrief,
  getColdChainNote,
  listColdChainNotes,
  matchFormularyAndCoPay,
  tierAllows,
  type FormularyEntry,
  type PriceRecord,
  type Product,
  type SafetyProfile,
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

const formulary: FormularyEntry[] = [
  {
    id: "f1",
    productId: "prod-amoxil",
    schemeName: "Discovery Health",
    reimbursed: true,
    coPayEstimateZar: 45,
    sourceId: "src",
    publishState: "published",
  },
  {
    id: "f2",
    productId: "prod-aspen",
    schemeName: "Discovery Health",
    reimbursed: true,
    coPayEstimateZar: 15,
    sourceId: "src",
    publishState: "published",
  },
];

const prices: PriceRecord[] = [
  {
    id: "p1",
    productId: "prod-amoxil",
    sepZar: 90,
    effectiveDate: "2026-07-01",
    sourceId: "src-sep",
    publishState: "published",
  },
  {
    id: "p2",
    productId: "prod-aspen",
    sepZar: 50,
    effectiveDate: "2026-07-01",
    sourceId: "src-sep",
    publishState: "published",
  },
];

describe("formulary + co-pay", () => {
  it("recommends cheapest reimbursed bioequivalent and shows savings", () => {
    const r = matchFormularyAndCoPay({
      moleculeId: "mol-amox",
      schemeName: "Discovery Health",
      products,
      formulary,
      prices,
      selectedProductId: "prod-amoxil",
    });
    assert.equal(r.recommendedProductId, "prod-aspen");
    const aspen = r.rows.find((row) => row.productId === "prod-aspen");
    assert.equal(aspen?.switchSavesVsSelected, 30);
    assert.match(r.disclaimer, /Illustrative|Confirm/i);
  });
});

describe("locum brief", () => {
  it("assembles schedules, brands, and counselling from published data", () => {
    const safety: SafetyProfile = {
      id: "s1",
      moleculeId: "mol-amox",
      publishState: "published",
      contraindications: [
        {
          value: { level: "red", text: "Penicillin allergy" },
          sourceId: "src",
          publishState: "published",
          lastReviewed: "2026-07-01",
        },
      ],
      warnings: [
        {
          value: "Confirm allergy history",
          sourceId: "src",
          publishState: "published",
          lastReviewed: "2026-07-01",
        },
      ],
      clinicalPearls: [],
      counsellingPoints: [],
    };
    const brief = buildLocumBrief({
      moleculeId: "mol-amox",
      innName: "Amoxicillin",
      className: "Aminopenicillin",
      products,
      safety,
    });
    assert.ok(brief.schedules.includes("S4"));
    assert.ok(brief.topBrands.some((b) => b.brandName === "Amoxil"));
    assert.ok(brief.topWarnings.some((w) => /Penicillin allergy|allergy/i.test(w)));
  });
});

describe("cold-chain notes", () => {
  it("lists published load-shedding notes", () => {
    assert.ok(listColdChainNotes().length >= 2);
    assert.ok(getColdChainNote("insulin")?.loadSheddingSteps.length);
    assert.equal(getColdChainNote("missing"), null);
  });

  it("gates new pro tools", () => {
    assert.equal(tierAllows("free", "formulary_copay"), false);
    assert.equal(tierAllows("professional", "locum_brief"), true);
    assert.equal(tierAllows("professional", "cold_chain_notes"), true);
  });
});
