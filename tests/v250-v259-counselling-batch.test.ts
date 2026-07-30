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
  { id: "mol-exemestane", enCue: [/aromatase|joint|bone|hot flush/i, /oestradiol|bone target/i] },
  { id: "mol-pegfilgrastim", enCue: [/pegylated G-CSF|bone pain|chemotherapy/i, /neutrophil target|injection schedule/i] },
  { id: "mol-denosumab", enCue: [/RANKL|calcium|dental/i, /calcium \/ bone target|injection interval/i] },
  { id: "mol-zoledronic-acid", enCue: [/bisphosphonate|dental|flu-like|infusion/i, /calcium \/ creatinine|infusion clock/i] },
  { id: "mol-capecitabine", enCue: [/fluoropyrimidine|hand-foot|diarrhoea/i, /cycle clock|DPD|lab target/i] },
  { id: "mol-mesna", enCue: [/uroprotectant|ifosfamide|cyclophosphamide|urine/i, /schedule hours|bladder score/i] },
  { id: "mol-epoetin-alfa", enCue: [/erythropoiesis|blood-pressure|clot/i, /haemoglobin target|injection schedule/i] },
  { id: "mol-hydroxycarbamide", enCue: [/antimetabolite|sickle|blood-count|contraception/i, /blood-count target|lab interval/i] },
  { id: "mol-ketotifen-eye", enCue: [/antihistamine|mast-cell|contact lens/i, /drop count|spacing minutes|allergy score/i] },
  { id: "mol-tobramycin-eye", enCue: [/aminoglycoside|drops|ointment/i, /drop clock|course length/i] },
] as const;

describe("v250–v259 deepened counselling batch §9", () => {
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
