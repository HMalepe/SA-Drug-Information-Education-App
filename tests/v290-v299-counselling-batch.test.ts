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
  { id: "mol-hep-b-vaccine", enCue: [/hepatitis B vaccine|series|injection-site/i, /series interval|antibody titre/i] },
  { id: "mol-hep-a-vaccine", enCue: [/hepatitis A vaccine|travel|booster/i, /booster interval|antibody titre/i] },
  { id: "mol-hpv-vaccine", enCue: [/HPV vaccine|series|catch-up/i, /series interval|antibody titre/i] },
  { id: "mol-influenza-vaccine", enCue: [/influenza vaccine|seasonal|arm soreness/i, /season clock|protection score/i] },
  { id: "mol-mmr-vaccine", enCue: [/live MMR|pregnancy|immune/i, /series interval|antibody titre/i] },
  { id: "mol-tdap-vaccine", enCue: [/Tdap|tetanus|pertussis|whooping/i, /booster interval|antibody titre/i] },
  { id: "mol-td-vaccine", enCue: [/Td vaccine|tetanus|wound/i, /booster interval|antibody titre/i] },
  { id: "mol-pcv-vaccine", enCue: [/pneumococcal|PCV|infant|adult/i, /series interval|antibody titre/i] },
  { id: "mol-rotavirus-vaccine", enCue: [/rotavirus|oral|live|age-window/i, /age window|series interval/i] },
  { id: "mol-ipv-vaccine", enCue: [/IPV|inactivated polio|oral polio/i, /series interval|antibody titre/i] },
] as const;

describe("v290–v299 deepened counselling batch §9", () => {
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
