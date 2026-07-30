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
  { id: "mol-levonorgestrel", enCue: [/progestogen|emergency contraception|IUS/i, /fertility score|clot|spacing hours/i] },
  { id: "mol-medroxyprogesterone", enCue: [/progestogen|Depo|injectable/i, /injection interval|bone target/i] },
  { id: "mol-ethinylestradiol", enCue: [/oestrogen|combined|clot|smoking/i, /pill clock|clot score/i] },
  { id: "mol-norethisterone", enCue: [/progestogen|period-delay|spotting/i, /day-count|clot score/i] },
  { id: "mol-brimonidine", enCue: [/alpha-2|eye drops|dry mouth/i, /drop count|intraocular|spacing minutes/i] },
  { id: "mol-dorzolamide", enCue: [/carbonic anhydrase|sulfa|bitter/i, /drop count|intraocular|spacing minutes/i] },
  { id: "mol-liothyronine", enCue: [/thyroid|T3|tremor|heart-rate/i, /TSH|free-T3 target/i] },
  { id: "mol-midazolam", enCue: [/benzodiazepine|procedural|drowsiness/i, /titration|breathing|alcohol/i] },
  { id: "mol-fentanyl", enCue: [/opioid|patch|breathing/i, /patch clock|titration|interchangeable/i] },
  { id: "mol-granisetron", enCue: [/5-HT3|antiemetic|constipation/i, /schedule hours|nausea score/i] },
] as const;

describe("v230–v239 deepened counselling batch §9", () => {
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
