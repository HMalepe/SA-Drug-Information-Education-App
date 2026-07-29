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
  { id: "mol-levetiracetam", enCue: [/antiepileptic/i, /mood|behaviour|suicid/i] },
  { id: "mol-phenytoin", enCue: [/gum|level|interaction/i, /blister|rash/i] },
  { id: "mol-celecoxib", enCue: [/COX-2|NSAID/i, /sulfa|black stools/i] },
  { id: "mol-enoxaparin", enCue: [/heparin|injection/i, /bleeding|spinal|epidural/i] },
  { id: "mol-quetiapine", enCue: [/antipsychotic/i, /sedat|suicid|fever.*rigidity/i] },
  { id: "mol-carbimazole", enCue: [/antithyroid/i, /sore throat|infection|fever/i] },
  { id: "mol-semaglutide", enCue: [/GLP-1/i, /nausea|pancreat|weight target/i] },
  { id: "mol-azathioprine", enCue: [/immunosuppressant/i, /allopurinol|infection|lab/i] },
  { id: "mol-sumatriptan", enCue: [/triptan|migraine/i, /chest|spacing hours/i] },
  { id: "mol-chlorphenamine", enCue: [/antihistamine|drowsiness/i, /alcohol|driving/i] },
] as const;

describe("v150–v159 deepened counselling batch §9", () => {
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
