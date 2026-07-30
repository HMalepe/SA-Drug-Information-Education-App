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
  { id: "mol-darbepoetin", enCue: [/long-acting ESA|blood-pressure|clot/i, /haemoglobin target|injection schedule/i] },
  { id: "mol-eltrombopag", enCue: [/thrombopoietin|platelet|clot|food/i, /meal clock|platelet target/i] },
  { id: "mol-deferasirox", enCue: [/iron chelator|kidney|liver|ferritin|hearing/i, /fasting clock|ferritin target/i] },
  { id: "mol-folinic-acid", enCue: [/reduced folate|rescue|methotrexate|chemotherapy/i, /rescue clock|folate target/i] },
  { id: "mol-fondaparinux", enCue: [/pentasaccharide|anti-Xa|bleeding|anticoagulant/i, /anti-Xa target|injection schedule/i] },
  { id: "mol-aciclovir-eye", enCue: [/ophthalmic antiviral|ointment|course/i, /application clock|course length/i] },
  { id: "mol-ciprofloxacin-eye", enCue: [/fluoroquinolone|drops|ointment/i, /drop clock|course length/i] },
  { id: "mol-prednisolone-eye", enCue: [/ophthalmic corticosteroid|infection|pressure/i, /eye-pressure target|drop clock/i] },
  { id: "mol-mometasone-nasal", enCue: [/intranasal corticosteroid|nosebleed|priming/i, /spray clock|allergy score/i] },
  { id: "mol-diphenhydramine", enCue: [/sedating antihistamine|drowsiness|alcohol/i, /spacing hours|allergy score/i] },
] as const;

describe("v260–v269 deepened counselling batch §9", () => {
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
