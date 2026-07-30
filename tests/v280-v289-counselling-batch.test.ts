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
  { id: "mol-mefenamic", enCue: [/NSAID|stomach|bleeding/i, /spacing hours|pain score/i] },
  { id: "mol-hydrocortisone-systemic", enCue: [/systemic corticosteroid|sick-day|replacement/i, /sick-day clock|cortisol target/i] },
  { id: "mol-folic-acid-rheum", enCue: [/folate|methotrexate|MTX/i, /MTX clock|folate target/i] },
  { id: "mol-phytomenadione", enCue: [/vitamin K|warfarin|bleeding/i, /INR target|clotting score/i] },
  { id: "mol-potassium-citrate", enCue: [/urinary alkaliniser|potassium|kidney/i, /urine pH|potassium target/i] },
  { id: "mol-tranexamic-haem", enCue: [/antifibrinolytic|haematology|clot/i, /bleed clock|clot score/i] },
  { id: "mol-cotrim", enCue: [/co-trimoxazole|sulfa|sun/i, /course length|infection score/i] },
  { id: "mol-tmp", enCue: [/trimethoprim|rash|folate/i, /course length|infection score/i] },
  { id: "mol-tropicamide", enCue: [/mydriatic|blurred|light sensitivity/i, /dilation clock|vision score|drop count/i] },
  { id: "mol-lidocaine", enCue: [/local anaesthetic|gels|sprays|patches/i, /application clock|numbness score/i] },
] as const;

describe("v280–v289 deepened counselling batch §9", () => {
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
