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
  { id: "mol-pseudoephedrine", enCue: [/oral decongestant|blood-pressure|sleep/i, /spacing hours|congestion score/i] },
  { id: "mol-oxymetazoline", enCue: [/nasal decongestant|rebound|short course/i, /spray clock|congestion score/i] },
  { id: "mol-xylometazoline", enCue: [/nasal decongestant|rebound|short course/i, /spray clock|congestion score/i] },
  { id: "mol-hypromellose", enCue: [/artificial tears|preservative|contact/i, /drop count|dryness score|spacing minutes/i] },
  { id: "mol-sodium-cromoglicate", enCue: [/mast-cell|nasal|ocular|regular use/i, /allergy score|drop clock|spray/i] },
  { id: "mol-rizatriptan", enCue: [/triptan|migraine|chest/i, /attack clock|migraine score/i] },
  { id: "mol-tolterodine", enCue: [/antimuscarinic|dry mouth|constipation/i, /dosing clock|bladder score/i] },
  { id: "mol-vardenafil", enCue: [/PDE5|nitrate|vision|hearing/i, /timing hours|erection score/i] },
  { id: "mol-prednisolone-oral", enCue: [/systemic corticosteroid|infection|taper/i, /taper clock|steroid score/i] },
  { id: "mol-fludrocortisone", enCue: [/mineralocorticoid|blood-pressure|swelling|salt/i, /sodium target|blood-pressure target/i] },
] as const;

describe("v270–v279 deepened counselling batch §9", () => {
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
      for (const cue of enCue) {
        assert.match(enBlob, cue);
      }
    });
  }

  it("lists all ten batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
