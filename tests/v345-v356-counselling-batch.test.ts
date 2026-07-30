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
  { id: "mol-mebendazole", enCue: [/mebendazole|anthelmintic|worm/i, /dose, age band|repeat interval/i] },
  { id: "mol-ivermectin", enCue: [/ivermectin|antiparasitic/i, /mg\/kg dose|food-timing rule/i] },
  { id: "mol-nystatin", enCue: [/nystatin|Candida|thrush/i, /suspension volume|course length/i] },
  {
    id: "mol-benzathine-benzylpenicillin",
    enCue: [/benzathine|depot penicillin/i, /IU dose|dosing interval/i],
  },
  { id: "mol-griseofulvin", enCue: [/griseofulvin|dermatophyte|ringworm/i, /dose, duration|food-timing rule/i] },
  { id: "mol-chlorhexidine", enCue: [/chlorhexidine|mouthwash|antiseptic/i, /concentration|rinse volume/i] },
  { id: "mol-nifedipine", enCue: [/nifedipine|calcium-channel|blood-pressure/i, /dose or BP threshold/i] },
  { id: "mol-methyldopa", enCue: [/methyldopa|pregnancy hypertension|blood-pressure/i, /dose or titration/i] },
  {
    id: "mol-mifepristone",
    enCue: [/mifepristone|antiprogestogen|medical abortion/i, /dose, combination regimen|gestational-age cut-off/i],
  },
  { id: "mol-ergometrine", enCue: [/ergometrine|uterotonic|postpartum/i, /dose, route|oxytocin/i] },
  { id: "mol-promethazine", enCue: [/promethazine|antihistamine|sedat/i, /dose or paediatric rule/i] },
  { id: "mol-fosfomycin", enCue: [/fosfomycin|urinary|sachet/i, /sachet dose or course rule/i] },
] as const;

describe("v345–v356 deepened counselling batch §9 (PHC Batch D)", () => {
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
