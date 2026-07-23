import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveSearch, type Molecule, type Product } from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-amoxclav",
    slug: "amoxicillin-clavulanate",
    innName: "Amoxicillin–clavulanate",
    className: "Beta-lactam + inhibitor",
    therapeuticArea: "antibiotics",
    synonyms: ["co-amoxiclav", "augmentin"],
    publishState: "published",
  },
  {
    id: "mol-amox",
    slug: "amoxicillin",
    innName: "Amoxicillin",
    className: "Aminopenicillin",
    therapeuticArea: "antibiotics",
    synonyms: ["amoxil"],
    publishState: "published",
  },
];

const products: Product[] = [
  {
    id: "p1",
    moleculeId: "mol-amoxclav",
    manufacturerId: "m1",
    brandName: "Augmentin",
    strength: "625 mg",
    form: "tablet",
    schedule: "S4",
    isOriginator: true,
    isDiscontinued: false,
    synonymKeys: ["augmentin", "augumentin"],
    excipientIds: [],
    publishState: "published",
  },
];

describe("resolveSearch", () => {
  it("resolves brand Augmentin to amoxicillin-clavulanate", () => {
    const hits = resolveSearch("Augmentin", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "amoxicillin-clavulanate");
    assert.ok(hits.some((h) => h.kind === "brand" && h.brandName === "Augmentin"));
  });

  it("tolerates misspelling augumentin", () => {
    const hits = resolveSearch("augumentin", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "amoxicillin-clavulanate");
  });

  it("resolves molecule name", () => {
    const hits = resolveSearch("amoxicillin", molecules, products);
    assert.ok(hits.some((h) => h.moleculeSlug === "amoxicillin"));
  });
});
