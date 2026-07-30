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
  { id: "mol-naproxen", enCue: [/naproxen|NSAID/i, /black stools/i] },
  { id: "mol-rosuvastatin", enCue: [/rosuvastatin|statin/i, /muscle/i] },
  { id: "mol-escitalopram", enCue: [/escitalopram|SSRI/i, /suicid/i] },
  { id: "mol-insulin-aspart", enCue: [/insulin|aspart/i, /hypoglycaemia/i] },
  { id: "mol-methotrexate", enCue: [/methotrexate|DMARD/i, /weekly|folic/i] },
  { id: "mol-alendronate", enCue: [/alendronate|bisphosphonate/i, /upright|calcium/i] },
  { id: "mol-ferrous-sulfate", enCue: [/iron|ferrous/i, /children/i] },
  { id: "mol-clotrimazole", enCue: [/clotrimazole|azole|antifungal/i, /course length/i] },
  { id: "mol-ondansetron", enCue: [/ondansetron|antiemetic/i, /constipation/i] },
  { id: "mol-clarithro", enCue: [/clarithromycin|macrolide/i, /interaction/i] },
  { id: "mol-pantoprazole", enCue: [/pantoprazole|PPI/i, /before food/i] },
  { id: "mol-codeine", enCue: [/codeine|opioid/i, /breathing/i] },
] as const;

describe("v440–v451 deepened counselling batch §9 (thin core deepen)", () => {
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
