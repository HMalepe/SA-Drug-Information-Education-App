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
  {
    id: "mol-metformin",
    enCue: [/metformin|diabetes/i, /dose, meal schedule, or kidney cut-off/i],
  },
  {
    id: "mol-amox",
    enCue: [/amoxicillin|penicillin/i, /dose, interval, or course length/i],
  },
  {
    id: "mol-amoxclav",
    enCue: [/amoxicillin|clavulanate|penicillin/i, /meal schedule/i],
  },
  {
    id: "mol-paracetamol",
    enCue: [/paracetamol|acetaminophen/i, /daily maximum/i],
  },
  {
    id: "mol-ibuprofen",
    enCue: [/ibuprofen|NSAID/i, /dose or combination rule/i],
  },
  {
    id: "mol-atorvastatin",
    enCue: [/atorvastatin|statin/i, /dose or lipid target/i],
  },
  {
    id: "mol-amlodipine",
    enCue: [/amlodipine|calcium-channel/i, /dose or blood-pressure target/i],
  },
  {
    id: "mol-omeprazole",
    enCue: [/omeprazole|PPI/i, /clock schedule or dose/i],
  },
  {
    id: "mol-aspirin",
    enCue: [/aspirin/i, /children or teens with viral/i],
  },
  {
    id: "mol-enalapril",
    enCue: [/enalapril|ACE/i, /dose or blood-pressure target/i],
  },
  {
    id: "mol-levothyroxine",
    enCue: [/levothyroxine|thyroid/i, /spacing schedule or mcg dose/i],
  },
  {
    id: "mol-salbutamol",
    enCue: [/salbutamol|SABA/i, /puff count or dose/i],
  },
] as const;

describe("v416–v427 deepened counselling batch §9 (thin high-volume core)", () => {
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
