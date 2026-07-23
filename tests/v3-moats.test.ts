import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildOfflineEssential,
  buildSubstitutionOptions,
  getCounsellingScript,
  listCounsellingLangs,
  tierAllows,
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
  {
    id: "p3",
    productId: "prod-aspen",
    sepZar: 999,
    effectiveDate: "2026-07-01",
    sourceId: "src-sep",
    publishState: "draft",
  },
];

describe("substitution + SEP", () => {
  it("ranks cheapest published bioequivalent and ignores draft SEP", () => {
    const r = buildSubstitutionOptions("mol-amox", products, prices, "prod-amoxil");
    assert.equal(r.cheapestBioequivalentId, "prod-aspen");
    const aspen = r.options.find((o) => o.productId === "prod-aspen");
    assert.equal(aspen?.sepZar, 52.4);
    assert.equal(aspen?.priceDeltaVsSelected, -37.55);
  });

  it("does not invent SEP when unpublished", () => {
    const r = buildSubstitutionOptions("mol-amox", products, [], undefined);
    assert.equal(r.options[0]?.sepZar, null);
    assert.match(r.note, /not yet ingested/i);
  });
});

describe("multilingual counselling", () => {
  it("returns published EN/ZU/AF for amoxicillin", () => {
    assert.deepEqual(listCounsellingLangs("mol-amox").sort(), ["af", "en", "zu"]);
    assert.ok(getCounsellingScript("mol-amox", "zu")?.lines.length);
  });

  it("hides draft Sesotho from default get", () => {
    assert.equal(getCounsellingScript("mol-amox", "st"), null);
    assert.ok(getCounsellingScript("mol-amox", "st", true));
  });
});

describe("offline + tier gates", () => {
  it("builds offline essential with first-aid framing", () => {
    const e = buildOfflineEssential({
      moleculeId: "mol-amox",
      slug: "amoxicillin",
      innName: "Amoxicillin",
      className: "Beta-lactam",
      scheduleHints: ["S4"],
      counsellingEn: ["Take as directed."],
    });
    assert.match(e.overdoseFirstAid[0] ?? "", /emergency/i);
    assert.match(e.disclaimer, /Offline cache/);
  });

  it("gates v3 moats to professional", () => {
    assert.equal(tierAllows("free", "substitution_sep"), false);
    assert.equal(tierAllows("professional", "substitution_sep"), true);
    assert.equal(tierAllows("professional", "offline_core"), true);
    assert.equal(tierAllows("professional", "multilingual_counselling"), true);
  });
});
