import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildSaFocusCard,
  collectTypicalStrengths,
  type Molecule,
  type Product,
} from "@materia/shared";

const amox: Molecule = {
  id: "mol-amox",
  slug: "amoxicillin",
  innName: "Amoxicillin",
  className: "Penicillin",
  therapeuticArea: "antibiotics",
  synonyms: [],
  publishState: "published",
};

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
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
  {
    id: "prod-amox-250",
    moleculeId: "mol-amox",
    manufacturerId: "m2",
    brandName: "Amoxicillin Aspen Paeds",
    strength: "250 mg",
    form: "capsule",
    schedule: "S4",
    isOriginator: false,
    isDiscontinued: false,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
  {
    id: "prod-draft",
    moleculeId: "mol-amox",
    manufacturerId: "m3",
    brandName: "Draft Brand",
    strength: "125 mg",
    form: "tablet",
    schedule: "S4",
    isOriginator: false,
    isDiscontinued: false,
    synonymKeys: [],
    excipientIds: [],
    publishState: "draft",
  },
  {
    id: "prod-bad-strength",
    moleculeId: "mol-amox",
    manufacturerId: "m4",
    brandName: "Bad Strength Row",
    strength: "take 1 tablet daily",
    form: "tablet",
    schedule: "S4",
    isOriginator: false,
    isDiscontinued: false,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
];

describe("v60 SA focus typical strengths §7.6", () => {
  it("lists distinct published pack strengths and rejects regimen-like strength text", () => {
    const strengths = collectTypicalStrengths(products.filter((p) => p.moleculeId === "mol-amox"));
    assert.deepEqual(strengths, ["250 mg", "500 mg"]);
    assert.equal(strengths.includes("125 mg"), false);
    assert.equal(strengths.some((s) => /daily/i.test(s)), false);
  });

  it("surfaces typicalStrengths on the SA focus card without inventing when empty", () => {
    const card = buildSaFocusCard({ molecule: amox, products });
    assert.ok(card);
    assert.deepEqual(card!.typicalStrengths, ["250 mg", "500 mg"]);
    assert.match(card!.note, /pack strength/i);
    assert.match(card!.disclaimer, /not a prescribed dose/i);
    assert.doesNotMatch(card!.counsellingTeaserEn ?? "", /\b\d+\s*mg\b/i);

    const empty = buildSaFocusCard({ molecule: amox, products: [] });
    assert.ok(empty);
    assert.deepEqual(empty!.typicalStrengths, []);
    assert.match(empty!.note, /will not invent/i);
  });
});
