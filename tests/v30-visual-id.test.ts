import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildMoleculeVisualGallery,
  buildProductVisualCard,
  mapFormToVisualKind,
  resolveProductScan,
  resolveVisualFormDescription,
  type Molecule,
  type Product,
} from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-x",
    slug: "demo-mol",
    innName: "Demo Molecule",
    className: "Demo",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "published",
  },
];

const products: Product[] = [
  {
    id: "prod-tab",
    moleculeId: "mol-x",
    manufacturerId: "mfr-x",
    brandName: "DemoTab",
    strength: "500 mg",
    form: "tablet",
    schedule: "S2",
    isOriginator: false,
    isDiscontinued: false,
    synonymKeys: ["demotab"],
    excipientIds: [],
    publishState: "published",
  },
  {
    id: "prod-inh",
    moleculeId: "mol-x",
    manufacturerId: "mfr-x",
    brandName: "DemoHaler",
    strength: "MDI",
    form: "inhaler",
    schedule: "S3",
    isOriginator: false,
    isDiscontinued: false,
    synonymKeys: ["demohaler"],
    excipientIds: [],
    publishState: "published",
  },
];

describe("v30 visual identification §5.5", () => {
  it("maps product forms to packaging kinds", () => {
    assert.equal(mapFormToVisualKind("tablet"), "tablet");
    assert.equal(mapFormToVisualKind("hard capsule"), "capsule");
    assert.equal(mapFormToVisualKind("MDI inhaler"), "inhaler");
    assert.equal(mapFormToVisualKind("transdermal patch"), "patch");
    assert.equal(mapFormToVisualKind("oral syrup"), "syrup");
  });

  it("builds cards without inventing imprint codes", () => {
    const card = buildProductVisualCard(products[0]!);
    assert.equal(card.kind, "tablet");
    assert.equal(card.imprintHint, null);
    assert.match(card.placeholderNote, /Educational form silhouette/i);
  });

  it("builds molecule gallery of published forms", () => {
    const gallery = buildMoleculeVisualGallery(products);
    assert.equal(gallery.cards.length, 2);
    assert.ok(gallery.kindsPresent.includes("tablet"));
    assert.ok(gallery.kindsPresent.includes("inhaler"));
  });

  it("resolves form cue text when brand search misses", () => {
    const hits = resolveVisualFormDescription("blue inhaler", molecules, products);
    assert.ok(hits.length >= 1);
    assert.equal(hits[0]?.brandName, "DemoHaler");
    assert.equal(hits[0]?.confidence, "low");
    assert.match(hits[0]?.note ?? "", /imprint\/colour ID is not invented/i);
  });

  it("falls through resolveProductScan to form cues", () => {
    const hits = resolveProductScan("inhaler", molecules, products);
    assert.ok(hits.some((h) => h.brandName === "DemoHaler"));
  });
});
