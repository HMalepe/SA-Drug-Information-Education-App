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
  { id: "mol-dutasteride", enCue: [/5-alpha-reductase|pregnant|sexual/i, /PSA target|crushed/i] },
  { id: "mol-mirabegron", enCue: [/beta-3|overactive bladder|blood-pressure/i, /blood-pressure target|crushing/i] },
  { id: "mol-folic-acid", enCue: [/vitamin B9|pregnancy|conception/i, /lab target|methotrexate/i] },
  { id: "mol-cyanocobalamin", enCue: [/vitamin B12|injection/i, /blood-level target|injection interval/i] },
  { id: "mol-betamethasone", enCue: [/potent topical corticosteroid|thin layer/i, /finger-tip|course length/i] },
  { id: "mol-clobetasol", enCue: [/very potent|short courses/i, /finger-tip|course length|occlusion/i] },
  { id: "mol-fusidic-acid", enCue: [/topical antibiotic|thin layer/i, /application clock|course length/i] },
  { id: "mol-permethrin", enCue: [/scabicide|pediculicide|contacts/i, /leave-on|minutes|contact list/i] },
  { id: "mol-fluticasone-nasal", enCue: [/intranasal corticosteroid|septum/i, /spray count|step-up/i] },
  { id: "mol-desmopressin", enCue: [/vasopressin|fluid-restriction/i, /litre target|sodium target/i] },
] as const;

describe("v210–v219 deepened counselling batch §9", () => {
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
