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
  { id: "mol-emtricitabine", enCue: [/emtricitabine|FTC|NRTI|PrEP|ART/i, /dose, fixed-dose pairing|renal cut-off/i] },
  { id: "mol-abacavir", enCue: [/abacavir|NRTI|hypersensitivity/i, /dose or HLA screening algorithm/i] },
  { id: "mol-zidovudine", enCue: [/zidovudine|AZT|NRTI|perinatal/i, /dose or PMTCT schedule/i] },
  { id: "mol-lopinavir", enCue: [/lopinavir|protease|ritonavir|booster/i, /dose, booster ratio|interaction list/i] },
  { id: "mol-darunavir", enCue: [/darunavir|protease|booster/i, /dose or booster pairing/i] },
  { id: "mol-bedaquiline", enCue: [/bedaquiline|drug-resistant TB|QT/i, /dose or ECG monitoring interval/i] },
  { id: "mol-quinine", enCue: [/quinine|antimalarial|cinchona|cinchonism/i, /dose or infusion rate/i] },
  { id: "mol-retinol", enCue: [/retinol|vitamin A/i, /IU dose or age-band schedule/i] },
  { id: "mol-sennosides", enCue: [/sennosides|laxative|constipation/i, /dose or overnight timing rule/i] },
  { id: "mol-orphenadrine", enCue: [/orphenadrine|anticholinergic|extrapyramidal/i, /does not invent a dose/i] },
  { id: "mol-biperiden", enCue: [/biperiden|anticholinergic|dystonia/i, /dose or dystonia protocol/i] },
  { id: "mol-zuclopenthixol", enCue: [/zuclopenthixol|antipsychotic|depot/i, /dose or depot interval/i] },
  { id: "mol-selenium-sulfide", enCue: [/selenium sulfide|antiseborrheic|tinea/i, /concentration or contact time/i] },
  { id: "mol-benzyl-benzoate", enCue: [/benzyl benzoate|scabicide|scabies/i, /dilution or application schedule/i] },
  { id: "mol-povidone-iodine", enCue: [/povidone-iodine|iodophor|antiseptic/i, /concentration or soak duration/i] },
  { id: "mol-nicotinamide", enCue: [/nicotinamide|vitamin B3|amide/i, /does not invent a dose/i] },
] as const;

describe("v357–v372 deepened counselling batch §9 (PHC Batches E–F)", () => {
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

  it("lists all sixteen batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    assert.equal(BATCH.length, 16);
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
