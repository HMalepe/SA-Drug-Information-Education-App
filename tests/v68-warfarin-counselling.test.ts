import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v68 warfarin multilingual counselling §9", () => {
  it("publishes all five SA launch languages for warfarin", () => {
    const langs = listCounsellingLangs("mol-warfarin");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-warfarin");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-warfarin"));
  });

  it("teaches vitamin K consistency and bleed cues without inventing INR targets or doses", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-warfarin", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\bINR\s*[0-9]/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-warfarin", "en")!;
    assert.match(en.lines.join(" "), /vitamin K/i);
    assert.match(en.lines.join(" "), /clinician-directed|does not invent an INR/i);
    assert.match(en.lines.join(" "), /bleeding|black stools/i);
  });
});
