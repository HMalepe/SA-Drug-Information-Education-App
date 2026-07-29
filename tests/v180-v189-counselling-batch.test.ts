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
  { id: "mol-cefuroxime", enCue: [/cephalosporin/i, /meal clock|course length|bloody diarrhoea/i] },
  { id: "mol-lansoprazole", enCue: [/proton-pump|before food/i, /meal clock|clopidogrel|stop date/i] },
  { id: "mol-dexamethasone", enCue: [/corticosteroid|blood-sugar|infection/i, /taper|glucose target|sick-day/i] },
  { id: "mol-donepezil", enCue: [/cholinesterase|heart-rate|evening/i, /cognition score|fainting|black stools/i] },
  { id: "mol-tamsulosin", enCue: [/alpha-blocker|dizziness/i, /blood-pressure target|cataract|erection/i] },
  { id: "mol-finasteride", enCue: [/5-alpha-reductase|pregnant|sexual/i, /PSA target|crushed/i] },
  { id: "mol-desloratadine", enCue: [/antihistamine|drowsiness|alcohol/i, /sedation score/i] },
  { id: "mol-febuxostat", enCue: [/xanthine-oxidase|gout|flare/i, /uric-acid target|allopurinol/i] },
  { id: "mol-isosorbide-mn", enCue: [/nitrate|PDE5|headache/i, /nitrate-free|blood-pressure target/i] },
  { id: "mol-leflunomide", enCue: [/DMARD|pregnancy|infection/i, /lab target|washout/i] },
] as const;

describe("v180–v189 deepened counselling batch §9", () => {
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
