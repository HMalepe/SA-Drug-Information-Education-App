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
  { id: "mol-warfarin", enCue: [/warfarin|vitamin K|INR/i, /INR target|dose, or bridging/i] },
  { id: "mol-losartan", enCue: [/losartan|ARB/i, /dose or blood-pressure target/i] },
  { id: "mol-simvastatin", enCue: [/simvastatin|statin/i, /dose, lipid target, or interaction list/i] },
  { id: "mol-hctz", enCue: [/thiazide|urination|sun/i, /dose, clock time, or potassium target/i] },
  { id: "mol-azithro", enCue: [/azithromycin|macrolide/i, /interaction list/i] },
  { id: "mol-cipro", enCue: [/ciprofloxacin|fluoroquinolone/i, /dairy|antacid|mineral/i] },
  { id: "mol-doxy", enCue: [/doxycycline|tetracycline/i, /dairy|antacid|mineral/i] },
  { id: "mol-metro", enCue: [/metronidazole|antimicrobial/i, /does not invent a duration/i] },
  { id: "mol-prednisone", enCue: [/prednisone|corticosteroid/i, /dose or taper schedule/i] },
  { id: "mol-diclofenac", enCue: [/diclofenac|NSAID/i, /black stools/i] },
  { id: "mol-gliclazide", enCue: [/gliclazide|sulfonylurea/i, /hypoglycaemia/i] },
  { id: "mol-allopurinol", enCue: [/allopurinol|xanthine/i, /rash|uric-acid target/i] },
] as const;

describe("v428–v439 deepened counselling batch §9 (thin high-volume core)", () => {
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
