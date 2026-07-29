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
  { id: "mol-ramipril", enCue: [/ACE inhibitor/i, /pregnan|face\/lips\/tongue/i] },
  { id: "mol-penv", enCue: [/penicillin/i, /empty-stomach|course/i] },
  { id: "mol-citalopram", enCue: [/SSRI|suicid/i, /heart rhythm|interaction list/i] },
  { id: "mol-venlafaxine", enCue: [/SNRI/i, /blood-pressure|taper|stop suddenly/i] },
  { id: "mol-diazepam", enCue: [/benzodiazepine/i, /alcohol|breathing/i] },
  { id: "mol-lithium", enCue: [/mood stabiliser|lithium level/i, /fluid|NSAID|ALL other/i] },
  { id: "mol-lamotrigine", enCue: [/rash|blister/i, /titration schedule|spacing hours/i] },
  { id: "mol-isotretinoin", enCue: [/retinoid|pregnan/i, /self-harm|mood/i] },
  { id: "mol-fluticasone", enCue: [/ICS|rinse|controller/i, /reliever|puff count/i] },
  { id: "mol-metoclopramide", enCue: [/antiemetic|movement/i, /Parkinson|muscle spasm/i] },
] as const;

describe("v140–v149 deepened counselling batch §9", () => {
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
