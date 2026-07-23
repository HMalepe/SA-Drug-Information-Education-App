import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildManufacturingTransparency,
  type Manufacturer,
  type Molecule,
  type Product,
} from "@materia/shared";

const mol: Molecule = {
  id: "mol-amox",
  slug: "amoxicillin",
  innName: "Amoxicillin",
  className: "Penicillin",
  therapeuticArea: "antibiotics",
  synonyms: [],
  publishState: "published",
};

const manufacturers: Manufacturer[] = [
  {
    id: "m-gsk",
    name: "GlaxoSmithKline",
    marketingCompany: "GSK",
    plantSite: "United Kingdom",
    apiOrigin: "Europe",
    packagingSite: "South Africa",
    madeInSa: false,
  },
  {
    id: "m-aspen",
    name: "Aspen Pharmacare",
    marketingCompany: "Aspen",
    plantSite: "South Africa",
    madeInSa: true,
  },
];

const products: Product[] = [
  {
    id: "prod-amoxil",
    moleculeId: "mol-amox",
    manufacturerId: "m-gsk",
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
    manufacturerId: "m-aspen",
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
];

describe("v63 manufacturing transparency §5.3 / §10.1", () => {
  it("surfaces published ownership chain and leaves missing fields null", () => {
    const card = buildManufacturingTransparency({ molecule: mol, products, manufacturers });
    assert.ok(card);
    assert.equal(card!.rows.length, 2);
    const originator = card!.rows.find((r) => r.isOriginator);
    assert.ok(originator);
    assert.equal(originator!.marketingCompany, "GSK");
    assert.equal(originator!.apiOrigin, "Europe");
    assert.equal(originator!.packagingSite, "South Africa");
    assert.equal(originator!.missingFields.length, 0);

    const generic = card!.rows.find((r) => r.brandName === "Amoxicillin Aspen");
    assert.ok(generic);
    assert.equal(generic!.plantSite, "South Africa");
    assert.equal(generic!.apiOrigin, null);
    assert.equal(generic!.packagingSite, null);
    assert.ok(generic!.missingFields.includes("apiOrigin"));
    assert.ok(generic!.missingFields.includes("packagingSite"));
    assert.match(card!.disclaimer, /will not invent/i);
  });

  it("refuses unpublished molecules and empty product invention", () => {
    assert.equal(
      buildManufacturingTransparency({
        molecule: { ...mol, publishState: "draft" },
        products,
        manufacturers,
      }),
      null,
    );
    const empty = buildManufacturingTransparency({
      molecule: mol,
      products: [],
      manufacturers,
    });
    assert.ok(empty);
    assert.equal(empty!.rows.length, 0);
    assert.match(empty!.note, /will not invent/i);
  });
});
