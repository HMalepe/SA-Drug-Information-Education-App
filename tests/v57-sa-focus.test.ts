import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildSaFocusCard,
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
    id: "prod-draft",
    moleculeId: "mol-amox",
    manufacturerId: "m3",
    brandName: "Draft Brand",
    strength: "250 mg",
    form: "tablet",
    schedule: "S4",
    isOriginator: false,
    isDiscontinued: false,
    synonymKeys: [],
    excipientIds: [],
    publishState: "draft",
  },
];

describe("v57 Academy SA focus §7.6", () => {
  it("builds originator + generics + schedule + counselling without inventing doses", () => {
    const card = buildSaFocusCard({ molecule: amox, products });
    assert.ok(card);
    assert.equal(card!.originator?.brandName, "Amoxil");
    assert.equal(card!.generics.some((g) => g.brandName === "Amoxicillin Aspen"), true);
    assert.equal(card!.generics.some((g) => g.brandName === "Draft Brand"), false);
    assert.deepEqual(card!.schedulesInUse, ["S4"]);
    assert.ok(card!.packForms.includes("Capsule"));
    assert.ok(card!.counsellingLangs.length >= 5);
    assert.ok(card!.counsellingTeaserEn);
    assert.equal(card!.packagingExercisePath, "/learn/packaging");
    assert.doesNotMatch(JSON.stringify(card), /\b\d+\s*mg\b/i);
    assert.match(card!.disclaimer, /not a stock list/i);
  });

  it("refuses unpublished molecules and empty brand invention", () => {
    assert.equal(
      buildSaFocusCard({
        molecule: { ...amox, publishState: "draft" },
        products,
      }),
      null,
    );
    const empty = buildSaFocusCard({ molecule: amox, products: [] });
    assert.ok(empty);
    assert.equal(empty!.originator, null);
    assert.equal(empty!.generics.length, 0);
    assert.match(empty!.note, /will not invent/i);
  });
});
