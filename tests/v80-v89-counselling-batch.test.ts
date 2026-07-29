import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

const LANGS = ["en", "zu", "af", "st", "xh"] as const;

const BATCH = [
  { id: "mol-furosemide", enCue: [/loop|urination/i, /potassium|sodium|electrolyte/i] },
  { id: "mol-atenolol", enCue: [/beta-blocker/i, /stop suddenly/i] },
  { id: "mol-spironolactone", enCue: [/potassium/i, /pregnan|breast/i] },
  { id: "mol-digoxin", enCue: [/digoxin level/i, /visual|nausea|pulse/i] },
  { id: "mol-rifampicin", enCue: [/TB|orange/i, /contraception|ALL other|interaction list/i] },
  { id: "mol-isoniazid", enCue: [/TB|neuropathy|B6/i, /does not invent a B6 dose/i] },
  { id: "mol-cotrimoxazole", enCue: [/sulfa/i, /blister|fluid schedule/i] },
  { id: "mol-budesonide", enCue: [/ICS|rinse/i, /puff count|spacer|controller/i] },
  { id: "mol-tramadol", enCue: [/opioid/i, /alcohol|spacing hours/i] },
  { id: "mol-fluoxetine", enCue: [/SSRI|suicid/i, /titration schedule/i] },
] as const;

describe("v80–v89 deepened counselling batch §9", () => {
  for (const { id, enCue } of BATCH) {
    it(`publishes five langs at 6-line depth with safety gates for ${id}`, () => {
      const langs = listCounsellingLangs(id);
      assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
      const cov = counsellingCoverage(id);
      assert.equal(cov.length, 5);
      assert.ok(cov.every((c) => c.lineCount === 6), `${id} must be 6-line depth`);
      assert.ok(listMoleculesWithPublishedCounselling().includes(id));

      for (const lang of LANGS) {
        const script = getCounsellingScript(id, lang);
        assert.ok(script, `${id}/${lang}`);
        const blob = script!.lines.join(" ");
        assert.equal(script!.lines.length, 6);
        assert.doesNotMatch(blob, /\d+\s*mg/i);
        assert.doesNotMatch(blob, /\d+\s*mcg/i);
        assert.doesNotMatch(blob, /\d+\s*mmol/i);
        assert.doesNotMatch(blob, /\d+\s*hour/i);
        assert.doesNotMatch(blob, /\[Draft\]/i);
        assert.match(script!.sourceNote, /founder-reviewed/i);
      }

      const en = getCounsellingScript(id, "en")!;
      const enBlob = en.lines.join(" ");
      assert.match(enBlob, /Materia does not invent/i);
      for (const n of enCue) assert.match(enBlob, n);
    });
  }

  it("lists all ten batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
