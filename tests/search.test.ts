import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  INDICATION_ROUTES,
  listPublishedClasses,
  resolveSearch,
  type Molecule,
  type Product,
} from "@materia/shared";

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
  {
    id: "mol-ena",
    slug: "enalapril",
    innName: "Enalapril",
    className: "ACE inhibitor",
    therapeuticArea: "antihypertensives",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-lis",
    slug: "lisinopril",
    innName: "Lisinopril",
    className: "ACE inhibitor",
    therapeuticArea: "antihypertensives",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-aml",
    slug: "amlodipine",
    innName: "Amlodipine",
    className: "Dihydropyridine calcium-channel blocker",
    therapeuticArea: "antihypertensives",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-draft",
    slug: "drafty",
    innName: "Drafty",
    className: "ACE inhibitor",
    therapeuticArea: "antihypertensives",
    synonyms: [],
    publishState: "draft",
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

describe("v47 class & indication search §5.1", () => {
  it("lists ACE inhibitors from class phrase", () => {
    const hits = resolveSearch("ACE inhibitors", molecules, products, 20);
    assert.ok(hits.length >= 2);
    assert.ok(hits.every((h) => h.moleculeSlug !== "drafty"));
    assert.ok(hits.some((h) => h.moleculeSlug === "enalapril"));
    assert.ok(hits.some((h) => h.moleculeSlug === "lisinopril"));
    assert.ok(hits.some((h) => h.kind === "indication" || h.kind === "class"));
  });

  it("routes first-line SA hypertension to antihypertensive area", () => {
    const hits = resolveSearch("first-line SA hypertension", molecules, products, 20);
    assert.ok(hits.some((h) => h.moleculeSlug === "amlodipine"));
    assert.ok(hits.some((h) => h.kind === "indication"));
    assert.equal(hits.some((h) => h.moleculeSlug === "amoxicillin"), false);
  });

  it("exposes indication routes and published classes", () => {
    assert.ok(INDICATION_ROUTES.some((r) => r.id === "ace-inhibitors"));
    const classes = listPublishedClasses(molecules);
    assert.ok(classes.includes("ACE inhibitor"));
  });
});
