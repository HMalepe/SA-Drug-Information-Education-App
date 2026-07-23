import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v67 levothyroxine multilingual counselling §9", () => {
  it("publishes all five SA launch languages for levothyroxine", () => {
    const langs = listCounsellingLangs("mol-levothyroxine");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-levothyroxine");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-levothyroxine"));
  });

  it("teaches empty-stomach and mineral cues without inventing mcg doses or hours", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-levothyroxine", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mcg/i);
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*hour/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-levothyroxine", "en")!;
    assert.match(en.lines.join(" "), /empty stomach|iron|calcium/i);
    assert.match(en.lines.join(" "), /brand|generic|switch/i);
  });
});
