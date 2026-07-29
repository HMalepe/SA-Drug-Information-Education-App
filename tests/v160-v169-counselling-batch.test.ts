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
  { id: "mol-glimepiride", enCue: [/sulfonylurea|hypoglycaemia/i, /skip meals|sick-day|glucose target/i] },
  { id: "mol-haloperidol", enCue: [/antipsychotic|movement/i, /Parkinson|fever.*rigidity|muscle spasm/i] },
  { id: "mol-lorazepam", enCue: [/benzodiazepine/i, /alcohol|breathing|stop suddenly/i] },
  { id: "mol-risperidone", enCue: [/antipsychotic/i, /prolactin|suicid|sedat/i] },
  { id: "mol-terbinafine", enCue: [/antifungal|liver/i, /course length|yellow eyes/i] },
  { id: "mol-lactulose", enCue: [/laxative|bloating/i, /fluid schedule|bowel target/i] },
  { id: "mol-sulfasalazine", enCue: [/DMARD|sulfa|orange/i, /folic|rash|lab target/i] },
  { id: "mol-domperidone", enCue: [/antiemetic|heart-rhythm/i, /interaction list|palpitation/i] },
  { id: "mol-theophylline", enCue: [/methylxanthine|level/i, /smoking|caffeine|blood-level/i] },
  { id: "mol-erythro", enCue: [/macrolide/i, /interaction list|meal clock/i] },
] as const;

describe("v160–v169 deepened counselling batch §9", () => {
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
