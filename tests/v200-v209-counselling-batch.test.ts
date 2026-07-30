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
  { id: "mol-heparin", enCue: [/unfractionated heparin|bleed/i, /aPTT target|injection schedule/i] },
  { id: "mol-morphine", enCue: [/opioid|drowsiness|constipation/i, /titration|breathing|alcohol/i] },
  { id: "mol-tranexamic-acid", enCue: [/antifibrinolytic|clot|heavy-period/i, /day-count|bleed score/i] },
  { id: "mol-doxazosin", enCue: [/alpha-blocker|first-dose|dizziness/i, /blood-pressure target/i] },
  { id: "mol-colecalciferol", enCue: [/vitamin D3|calcium/i, /IU count|blood-level target/i] },
  { id: "mol-calcium-carbonate", enCue: [/calcium salt|with food|constipation/i, /elemental-calcium|spacing hours/i] },
  { id: "mol-hydrocortisone", enCue: [/mild topical corticosteroid|thin layer/i, /finger-tip|course length/i] },
  { id: "mol-latanoprost", enCue: [/prostaglandin|iris|eyelash/i, /drop count|intraocular|spacing minutes/i] },
  { id: "mol-genta", enCue: [/aminoglycoside|kidney|hearing/i, /level target|course length/i] },
  { id: "mol-mupirocin", enCue: [/topical antibiotic|thin layer/i, /application clock|course length/i] },
] as const;

describe("v200–v209 deepened counselling batch §9", () => {
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
