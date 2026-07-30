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
  { id: "mol-tdf", enCue: [/tenofovir|TDF|NRTI/i, /eGFR cut-off|viral-load target/i] },
  { id: "mol-lamivudine", enCue: [/lamivudine|3TC|NRTI/i, /combination rule|viral-load target/i] },
  {
    id: "mol-dolutegravir",
    enCue: [/dolutegravir|integrase/i, /food-timing hour|viral-load target/i],
  },
  { id: "mol-efavirenz", enCue: [/efavirenz|NNRTI/i, /bedtime hour|viral-load target/i] },
  {
    id: "mol-clopidogrel",
    enCue: [/clopidogrel|antiplatelet/i, /dual-therapy duration|procedure hold rule/i],
  },
  {
    id: "mol-valproate",
    enCue: [/valproate|antiepileptic|pregnancy/i, /blood-level target|contraception rule/i],
  },
  {
    id: "mol-carbamazepine",
    enCue: [/carbamazepine|antiepileptic/i, /blood-level target|titration schedule/i],
  },
  {
    id: "mol-cetirizine",
    enCue: [/cetirizine|antihistamine/i, /dose or age-band rule/i],
  },
  {
    id: "mol-loratadine",
    enCue: [/loratadine|antihistamine/i, /dose or age-band rule/i],
  },
  {
    id: "mol-fluclox",
    enCue: [/flucloxacillin|penicillin/i, /dose, interval, or course length/i],
  },
  {
    id: "mol-cephalexin",
    enCue: [/cephalexin|cephalosporin/i, /dose, interval, or course length/i],
  },
  {
    id: "mol-sertraline",
    enCue: [/sertraline|SSRI/i, /dose, titration schedule, or washout rule/i],
  },
] as const;

describe("v404–v415 deepened counselling batch §9 (thin core deepen)", () => {
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

  it("lists all twelve batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    assert.equal(BATCH.length, 12);
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
