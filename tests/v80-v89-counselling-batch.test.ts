import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

const BATCH = [
  {
    id: "mol-furosemide",
    enCue: /loop|urination/i,
  },
  {
    id: "mol-atenolol",
    enCue: /beta-blocker/i,
  },
  {
    id: "mol-spironolactone",
    enCue: /potassium/i,
  },
  {
    id: "mol-digoxin",
    enCue: /digoxin level/i,
  },
  {
    id: "mol-rifampicin",
    enCue: /orange/i,
  },
  {
    id: "mol-isoniazid",
    enCue: /alcohol|neuropathy/i,
  },
  {
    id: "mol-cotrimoxazole",
    enCue: /sulfa/i,
  },
  {
    id: "mol-budesonide",
    enCue: /ICS|rinse/i,
  },
  {
    id: "mol-tramadol",
    enCue: /opioid|alcohol/i,
  },
  {
    id: "mol-fluoxetine",
    enCue: /SSRI|suicid/i,
  },
] as const;

describe("v80–v89 counselling batch §9", () => {
  for (const { id, enCue } of BATCH) {
    it(`publishes five langs with safety gates for ${id}`, () => {
      const langs = listCounsellingLangs(id);
      assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
      const cov = counsellingCoverage(id);
      assert.equal(cov.length, 5);
      assert.ok(cov.every((c) => c.lineCount === 4));

      for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
        const script = getCounsellingScript(id, lang);
        assert.ok(script);
        const blob = script!.lines.join(" ");
        assert.doesNotMatch(blob, /\d+\s*mg/i);
        assert.doesNotMatch(blob, /\[Draft\]/i);
        assert.match(script!.sourceNote, /founder-reviewed/i);
      }

      const en = getCounsellingScript(id, "en")!;
      assert.match(en.lines.join(" "), enCue);
    });
  }

  it("lists all ten batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
