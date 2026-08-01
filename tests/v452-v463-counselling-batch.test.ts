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
  { id: "mol-amitriptyline", enCue: [/amitriptyline|tricyclic|TCA/i, /dose or titration schedule/i] },
  { id: "mol-apixaban", enCue: [/apixaban|DOAC/i, /bleeding|black stools/i] },
  { id: "mol-carvedilol", enCue: [/carvedilol|beta-blocker/i, /stop suddenly/i] },
  { id: "mol-empagliflozin", enCue: [/empagliflozin|SGLT2/i, /dehydration|genital/i] },
  { id: "mol-ethambutol", enCue: [/ethambutol|antimycobacterial/i, /vision|eye/i] },
  { id: "mol-fluconazole", enCue: [/fluconazole|azole|antifungal/i, /interaction/i] },
  { id: "mol-insulin-glargine", enCue: [/insulin|glargine/i, /hypoglycaemia/i] },
  { id: "mol-loperamide", enCue: [/loperamide|antimotility/i, /diarrhoea/i] },
  { id: "mol-montelukast", enCue: [/montelukast|leukotriene|controller/i, /mood|suicid/i] },
  { id: "mol-nitro", enCue: [/nitrofurantoin|nitrofuran|UTI/i, /urine/i] },
  { id: "mol-pyrazinamide", enCue: [/pyrazinamide|antimycobacterial/i, /liver/i] },
  { id: "mol-rivaroxaban", enCue: [/rivaroxaban|DOAC/i, /bleeding/i] },
] as const;

describe("v452–v463 deepened counselling batch §9 (final thin-core clear)", () => {
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

  it("clears the published thin 4-line counselling backlog", () => {
    const thin = listMoleculesWithPublishedCounselling().filter((id) => {
      const en = getCounsellingScript(id, "en");
      return en != null && en.lines.length < 6;
    });
    assert.deepEqual(thin, []);
  });
});
