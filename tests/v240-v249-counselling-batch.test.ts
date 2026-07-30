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
  { id: "mol-desogestrel", enCue: [/progestogen-only|spotting|same-time/i, /late-pill|fertility score/i] },
  { id: "mol-drospirenone", enCue: [/progestogen|COC|potassium|clot/i, /pill clock|potassium target|clot score/i] },
  { id: "mol-cabergoline", enCue: [/dopamine|prolactin|impulse/i, /prolactin target/i] },
  { id: "mol-anastrozole", enCue: [/aromatase|joint|bone|hot flush/i, /oestradiol|bone target/i] },
  { id: "mol-tamoxifen", enCue: [/SERM|clot|endometrial|hot flush/i, /clot score/i] },
  { id: "mol-letrozole", enCue: [/aromatase|joint|bone|hot flush/i, /oestradiol|bone target/i] },
  { id: "mol-filgrastim", enCue: [/G-CSF|bone pain|neutropenia|chemotherapy/i, /neutrophil target|injection schedule/i] },
  { id: "mol-aprepitant", enCue: [/NK1|antiemetic|interaction|contracept/i, /schedule hours|nausea score/i] },
  { id: "mol-olopatadine", enCue: [/antihistamine|mast-cell|contact lens/i, /drop count|allergy score|spacing minutes/i] },
  { id: "mol-chloramphenicol-eye", enCue: [/ophthalmic antibiotic|drops|ointment/i, /drop clock|course length/i] },
] as const;

describe("v240–v249 deepened counselling batch §9", () => {
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
