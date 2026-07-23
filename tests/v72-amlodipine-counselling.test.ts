import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v72 amlodipine multilingual counselling §9", () => {
  it("publishes all five SA launch languages for amlodipine", () => {
    const langs = listCounsellingLangs("mol-amlodipine");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-amlodipine");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-amlodipine"));
  });

  it("teaches ankle swelling and grapefruit cues without inventing doses or BP targets", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-amlodipine", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*mmHg/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-amlodipine", "en")!;
    assert.match(en.lines.join(" "), /ankle|swelling|dizziness/i);
    assert.match(en.lines.join(" "), /grapefruit/i);
    assert.match(en.lines.join(" "), /does not invent a dose|blood-pressure target/i);
  });
});
