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
  { id: "mol-tadalafil", enCue: [/PDE5|nitrate|poppers/i, /blood-pressure target|timing hours/i] },
  { id: "mol-solifenacin", enCue: [/antimuscarinic|overactive bladder|dry mouth/i, /bladder score|glaucoma/i] },
  { id: "mol-alfuzosin", enCue: [/alpha-blocker|dizziness|prolonged-release/i, /blood-pressure target/i] },
  { id: "mol-benzoyl-peroxide", enCue: [/acne|bleaching|dryness/i, /application clock|course length/i] },
  { id: "mol-adapalene", enCue: [/retinoid|sun|peeling/i, /application clock|course length|escalation/i] },
  { id: "mol-tretinoin", enCue: [/retinoid|pregnancy|sun/i, /application clock|course length/i] },
  { id: "mol-ceftriaxone", enCue: [/cephalosporin|allergy|diarrhoea/i, /infusion clock|course length/i] },
  { id: "mol-vanco", enCue: [/glycopeptide|red man|kidney|hearing/i, /level target|infusion clock/i] },
  { id: "mol-ritonavir", enCue: [/protease|PK booster|interaction/i, /interaction list|viral-load/i] },
  { id: "mol-timolol-eye", enCue: [/beta-blocker|tear duct|asthma/i, /drop count|intraocular|spacing minutes/i] },
] as const;

describe("v220–v229 deepened counselling batch §9", () => {
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
