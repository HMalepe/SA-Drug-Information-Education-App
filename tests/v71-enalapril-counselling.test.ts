import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v71 enalapril multilingual counselling §9", () => {
  it("publishes all five SA launch languages for enalapril", () => {
    const langs = listCounsellingLangs("mol-enalapril");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-enalapril");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-enalapril"));
  });

  it("teaches ACE pregnancy and angioedema cues without inventing doses or BP targets", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-enalapril", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*mmHg/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-enalapril", "en")!;
    assert.match(en.lines.join(" "), /ACE|pregnan/i);
    assert.match(en.lines.join(" "), /face|lips|tongue|breathing/i);
    assert.match(en.lines.join(" "), /does not invent a dose|blood-pressure target/i);
  });
});
