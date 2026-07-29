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
  { id: "mol-perindopril", enCue: [/ACE inhibitor/i, /pregnan|angioedema|face\/lips\/tongue/i] },
  { id: "mol-sitagliptin", enCue: [/DPP-4/i, /pancreat|abdominal pain/i] },
  { id: "mol-dapagliflozin", enCue: [/SGLT2/i, /sick-day|genital|hydrat/i] },
  { id: "mol-gabapentin", enCue: [/neuropathic|antiepileptic/i, /stop suddenly|sedat/i] },
  { id: "mol-pregabalin", enCue: [/neuropathic|antiepileptic/i, /opioid|breathing/i] },
  { id: "mol-colchicine", enCue: [/gout|colchicine/i, /diarrhoea|interaction|ALL other/i] },
  { id: "mol-hydroxychloroquine", enCue: [/DMARD|antimalarial/i, /eye|vision/i] },
  { id: "mol-clinda", enCue: [/clindamycin|antibiotic/i, /diarrhoea|watery/i] },
  { id: "mol-tiotropium", enCue: [/LAMA|controller/i, /reliever|puff count/i] },
  { id: "mol-mirtazapine", enCue: [/NaSSA|antidepressant/i, /suicid|stop suddenly/i] },
] as const;

describe("v130–v139 deepened counselling batch §9", () => {
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
