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
  { id: "mol-bcg-vaccine", enCue: [/live BCG|pustule|scar|immune/i, /conversion schedule|reaction timeline|antibody titre/i] },
  { id: "mol-ppsv-vaccine", enCue: [/PPSV|pneumococcal|PCV/i, /re-vaccination interval|antibody titre/i] },
  { id: "mol-rabies-vaccine", enCue: [/rabies|post-exposure|wound|immunoglobulin/i, /series schedule|immunoglobulin dose|antibody titre/i] },
  { id: "mol-oxytocin", enCue: [/uterotonic|self-administration|labour|hospital/i, /infusion rate|contraction target/i] },
  { id: "mol-protamine", enCue: [/protamine|heparin|antidote|hospital/i, /reversal dose|infusion rate|anti-Xa/i] },
  { id: "mol-bupivacaine", enCue: [/bupivacaine|local anaesthetic|toxicity|anaesthet/i, /maximum dose|concentration|infusion rate/i] },
  { id: "mol-ropivacaine", enCue: [/ropivacaine|local anaesthetic|toxicity|anaesthetic/i, /maximum dose|concentration|infusion rate/i] },
  { id: "mol-ketamine", enCue: [/ketamine|dissociative|emergence|hospital/i, /induction dose|maintenance rate/i] },
  { id: "mol-propofol", enCue: [/propofol|IV anaesthetic|hospital|lipid|asepsis/i, /induction dose|infusion rate/i] },
  { id: "mol-suxamethonium", enCue: [/suxamethonium|neuromuscular|malignant hyperthermia|theatre/i, /intubation dose|malignant hyperthermia treatment/i] },
] as const;

describe("v300–v309 deepened counselling batch §9", () => {
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
