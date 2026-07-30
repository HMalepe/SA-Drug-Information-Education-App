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
  { id: "mol-adrenaline", enCue: [/adrenaline|epinephrine|anaphylaxis|emergency/i, /dilution|dose|route algorithm/i] },
  { id: "mol-atropine", enCue: [/atropine|antimuscarinic|hospital|bradycardia/i, /dose|titration|algorithm/i] },
  { id: "mol-naloxone", enCue: [/naloxone|opioid|revers|breathing/i, /dose|observation interval|titration/i] },
  { id: "mol-acetylcysteine", enCue: [/acetylcysteine|NAC|paracetamol|poison/i, /nomogram|infusion schedule|blood-level/i] },
  { id: "mol-activated-charcoal", enCue: [/charcoal|overdose|adsorb|poison/i, /gram dose|timing window/i] },
  { id: "mol-calcium-gluconate", enCue: [/calcium gluconate|electrolyte|hospital/i, /infusion rate|mmol dose/i] },
  { id: "mol-magnesium-sulfate", enCue: [/magnesium sulfate|eclampsia|hospital/i, /loading dose|maintenance rate|monitoring target/i] },
] as const;

describe("v315–v321 deepened counselling batch §9 (STG Batch A)", () => {
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

  it("lists all seven batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
