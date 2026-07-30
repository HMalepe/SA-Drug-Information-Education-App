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
  { id: "mol-artesunate", enCue: [/artesunate|malaria|hospital|emergency/i, /dose|route sequence|step-down/i] },
  { id: "mol-artemether-lumefantrine", enCue: [/artemether|lumefantrine|ACT|malaria/i, /weight-band|food-timing hours|course length/i] },
  { id: "mol-albendazole", enCue: [/albendazole|anthelmintic|worm/i, /dose|duration|pregnancy rule/i] },
  { id: "mol-praziquantel", enCue: [/praziquantel|schistosom|tapeworm/i, /mg\/kg|food-timing rule/i] },
  { id: "mol-amphotericin-b", enCue: [/amphotericin|antifungal|hospital|formulation/i, /dose|premedication|monitoring schedule/i] },
  { id: "mol-ampicillin", enCue: [/ampicillin|penicillin|allergy|antibiotic/i, /dose|interval|course length/i] },
  { id: "mol-cefazolin", enCue: [/cefazolin|cephalosporin|prophylaxis|surgery/i, /dose|redosing interval|allergy algorithm/i] },
  { id: "mol-benzylpenicillin", enCue: [/benzylpenicillin|penicillin G|allergy/i, /unit dose|infusion rate|duration/i] },
] as const;

describe("v322–v329 deepened counselling batch §9 (STG Batch B)", () => {
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

  it("lists all eight batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
