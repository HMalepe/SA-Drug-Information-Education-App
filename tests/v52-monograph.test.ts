import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildMoleculeMonograph,
  type Interaction,
  type Molecule,
  type Product,
  type SafetyProfile,
} from "@materia/shared";

const molecule: Molecule = {
  id: "mol-amox",
  slug: "amoxicillin",
  innName: "Amoxicillin",
  className: "Aminopenicillin",
  therapeuticArea: "antibiotics",
  synonyms: [],
  publishState: "published",
  moaSummary: {
    value: "Inhibits bacterial cell-wall synthesis.",
    sourceId: "src-edu",
    publishState: "published",
    lastReviewed: "2026-07-01",
  },
  chemistrySummary: {
    value: "Draft chemistry — should be omitted.",
    sourceId: "src-edu",
    publishState: "draft",
    lastReviewed: "2026-07-01",
  },
};

const safety: SafetyProfile = {
  id: "safe-amox",
  moleculeId: "mol-amox",
  publishState: "published",
  dosingAdult: {
    value: "Adult dosing not published — confirm label.",
    sourceId: "src-doh",
    publishState: "draft",
    lastReviewed: "2026-07-01",
  },
  foodLifestyle: {
    value: "May be taken with food if stomach upset occurs.",
    sourceId: "src-edu",
    publishState: "published",
    lastReviewed: "2026-07-01",
  },
  counsellingPoints: [],
  clinicalPearls: [],
  contraindications: [],
  warnings: [],
};

const products: Product[] = [
  {
    id: "p1",
    moleculeId: "mol-amox",
    manufacturerId: "m",
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
];

const interactions: Interaction[] = [];

describe("v52 molecule monograph export §12", () => {
  it("includes published sections and omits draft dosing/chemistry", () => {
    const mono = buildMoleculeMonograph({
      molecule,
      safety,
      products,
      interactions,
      counsellingLang: "en",
    });
    assert.equal("error" in mono, false);
    if ("error" in mono) return;
    assert.ok(mono.sections.some((s) => s.id === "moa"));
    assert.ok(mono.sections.some((s) => s.id === "food-lifestyle"));
    assert.ok(mono.sections.some((s) => s.id === "sa-products"));
    assert.ok(mono.sections.some((s) => s.id === "counselling"));
    assert.ok(mono.omittedDraftTabs.some((t) => /dosing/i.test(t)));
    assert.ok(mono.omittedDraftTabs.some((t) => /chemistry/i.test(t)));
    assert.equal(mono.sections.some((s) => s.id === "dosing"), false);
    assert.doesNotMatch(mono.plainText, /Adult dosing not published/);
    assert.match(mono.html, /<h1>/);
    assert.match(mono.disclaimer, /Not a prescription/i);
  });

  it("refuses unpublished molecules", () => {
    const r = buildMoleculeMonograph({
      molecule: { ...molecule, publishState: "draft" },
    });
    assert.equal("error" in r, true);
  });
});
