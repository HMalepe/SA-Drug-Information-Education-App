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
  { id: "mol-eplerenone", enCue: [/mineralocorticoid|potassium/i, /potassium target|salt substitute/i] },
  { id: "mol-mefenamic-acid", enCue: [/NSAID|period-pain|stomach/i, /pain score|day-count|black stools/i] },
  { id: "mol-sildenafil", enCue: [/PDE5|nitrate|poppers/i, /blood-pressure target|timing hours/i] },
  { id: "mol-oxybutynin", enCue: [/antimuscarinic|dry mouth|blurred/i, /bladder score|glaucoma/i] },
  { id: "mol-insulin-human", enCue: [/human insulin|hypo/i, /glucose target|carb ratio|sick-day/i] },
  { id: "mol-mometasone", enCue: [/topical corticosteroid|thin layer/i, /finger-tip|course length/i] },
  { id: "mol-fexofenadine", enCue: [/antihistamine|fruit juice/i, /sedation score/i] },
  { id: "mol-ketoconazole", enCue: [/azole|cream|shampoo/i, /application clock|course length|minutes/i] },
  { id: "mol-salmeterol", enCue: [/beta-agonist|controller/i, /puff count|action plan/i] },
  { id: "mol-propylthiouracil", enCue: [/thionamide|infection|liver/i, /thyroid lab target|sore throat/i] },
] as const;

describe("v190–v199 deepened counselling batch §9", () => {
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
