import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v59 metronidazole multilingual counselling §9", () => {
  it("publishes all five SA launch languages for metronidazole", () => {
    const langs = listCounsellingLangs("mol-metro");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-metro");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-metro"));
  });

  it("teaches alcohol caution without inventing duration or doses", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-metro", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*hour/i);
      assert.doesNotMatch(blob, /\d+\s*day/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-metro", "en")!;
    assert.match(en.lines.join(" "), /alcohol/i);
    assert.match(en.lines.join(" "), /does not invent a duration/i);
    const af = getCounsellingScript("mol-metro", "af")!;
    assert.match(af.lines.join(" "), /Alkohol|alkohol/i);
  });
});
