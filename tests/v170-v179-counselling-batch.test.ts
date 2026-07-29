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
  { id: "mol-esomeprazole", enCue: [/proton-pump|before food/i, /meal clock|clopidogrel|stop date/i] },
  { id: "mol-bisacodyl", enCue: [/stimulant laxative|cramps/i, /fluid schedule|bowel target/i] },
  { id: "mol-hyoscine-butylbromide", enCue: [/antispasmodic/i, /glaucoma|vision|pain score/i] },
  { id: "mol-mesalazine", enCue: [/5-ASA|flare/i, /sulfa|crush|interchangeable/i] },
  { id: "mol-beclometasone", enCue: [/inhaled corticosteroid|preventer/i, /puff count|action plan/i] },
  { id: "mol-formoterol", enCue: [/beta-agonist|controller/i, /puff count|action plan/i] },
  { id: "mol-meloxicam", enCue: [/NSAID|stomach bleed/i, /pain score|black stools/i] },
  { id: "mol-baclofen", enCue: [/muscle relaxant|drowsiness/i, /titration|alcohol|stop suddenly/i] },
  { id: "mol-levodopa-carbidopa", enCue: [/Parkinson|wearing-off|protein/i, /meal clock|ON\/OFF/i] },
  { id: "mol-topiramate", enCue: [/antiepileptic|kidney-stone|tingling/i, /fluid target|blood-level|litre/i] },
] as const;

describe("v170–v179 deepened counselling batch §9", () => {
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
