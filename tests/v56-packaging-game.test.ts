import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildPackagingRound,
  collectPackagingCues,
  gradePackaging,
  publicPackagingRound,
  type Molecule,
  type Product,
} from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-amox",
    slug: "amoxicillin",
    innName: "Amoxicillin",
    className: "Penicillin",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-doxy",
    slug: "doxycycline",
    innName: "Doxycycline",
    className: "Tetracycline",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-draft",
    slug: "draft-mol",
    innName: "Draft Only",
    className: "X",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "draft",
  },
];

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
    id: "prod-doxy",
    moleculeId: "mol-doxy",
    manufacturerId: "m2",
    brandName: "Doxitab SA",
    strength: "100 mg",
    form: "tablet",
    schedule: "S4",
    isOriginator: false,
    isDiscontinued: false,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
  {
    id: "prod-draft-mol",
    moleculeId: "mol-draft",
    manufacturerId: "m3",
    brandName: "Hidden",
    strength: "10 mg",
    form: "tablet",
    schedule: "S4",
    isOriginator: true,
    isDiscontinued: false,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
];

describe("v56 packaging recognition §7.6", () => {
  it("collects only published molecule+product cues and never exposes imprints", () => {
    const cues = collectPackagingCues(molecules, products);
    assert.equal(cues.length, 2);
    assert.ok(cues.every((c) => c.brandName && c.formLabel));
    assert.doesNotMatch(JSON.stringify(cues), /imprint/i);
  });

  it("builds a public round without answer keys and grades mappings", () => {
    const round = buildPackagingRound({
      molecules,
      products,
      seed: "v56-test",
      size: 2,
    });
    assert.ok(round);
    assert.equal(round!.pairCount, 2);
    const pub = publicPackagingRound(round!);
    assert.equal("answerKey" in pub, false);
    assert.ok(pub.packs.every((p) => p.hint && !("moleculeId" in p)));
    assert.doesNotMatch(JSON.stringify(pub), /\b\d+\s*mg\b/i);

    const mapping: Record<string, string> = {};
    for (const [cueId, molId] of Object.entries(round!.answerKey)) {
      mapping[cueId] = molId;
    }
    const ok = gradePackaging({ answerKey: round!.answerKey, mapping });
    assert.equal(ok.correct, true);
    assert.equal(ok.score, 2);

    const wrong = gradePackaging({
      answerKey: round!.answerKey,
      mapping: Object.fromEntries(Object.keys(round!.answerKey).map((k) => [k, "mol-wrong"])),
    });
    assert.equal(wrong.correct, false);
    assert.match(wrong.message, /imprint/i);
  });
});
