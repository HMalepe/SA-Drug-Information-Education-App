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
  { id: "mol-beclomethasone", enCue: [/beclomethasone|ICS|controller|reliever/i, /puff counts|spacer schedules/i] },
  { id: "mol-ipratropium", enCue: [/ipratropium|SAMA|nebuliser|asthma|COPD/i, /puff or nebuliser doses/i] },
  { id: "mol-glibenclamide", enCue: [/glibenclamide|sulfonylurea|hypoglycaemia|hypo/i, /dose or renal cut-off/i] },
  { id: "mol-amiodarone", enCue: [/amiodarone|antiarrhythmic|thyroid|interaction/i, /loading\/maintenance doses|monitoring intervals/i] },
  { id: "mol-adenosine", enCue: [/adenosine|SVT|cardiac monitoring/i, /dose or flush technique/i] },
  { id: "mol-nevirapine", enCue: [/nevirapine|NNRTI|ART|rash|liver/i, /regimen or lead-in schedule/i] },
  { id: "mol-atazanavir", enCue: [/atazanavir|protease|booster|ART/i, /dose, booster pairing|interaction list/i] },
  { id: "mol-chlorpromazine", enCue: [/chlorpromazine|antipsychotic|sedat/i, /dose or titration/i] },
  { id: "mol-clozapine", enCue: [/clozapine|haematolog|FBC|treatment-resistant/i, /titration or FBC monitoring schedule/i] },
  { id: "mol-phenobarbital", enCue: [/phenobarbital|barbiturate|seizure|sedat/i, /dose or blood-level target/i] },
  { id: "mol-potassium-chloride", enCue: [/potassium chloride|fatal|hospital|electrolyte/i, /infusion rate or mmol dose/i] },
  { id: "mol-thiamine", enCue: [/thiamine|vitamin B1|Wernicke/i, /dose or infusion sequence/i] },
  { id: "mol-pyridoxine", enCue: [/pyridoxine|vitamin B6|isoniazid|TB/i, /does not invent a dose/i] },
  { id: "mol-oseltamivir", enCue: [/oseltamivir|influenza|neuraminidase/i, /start-window or renal adjustment/i] },
  { id: "mol-misoprostol", enCue: [/misoprostol|prostaglandin|obstetric|indication/i, /dose or route regimen/i] },
] as const;

describe("v330–v344 deepened counselling batch §9 (STG Batch C)", () => {
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

  it("lists all fifteen batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    assert.equal(BATCH.length, 15);
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
