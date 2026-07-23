import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v69 paracetamol multilingual counselling §9", () => {
  it("publishes all five SA launch languages for paracetamol", () => {
    const langs = listCounsellingLangs("mol-paracetamol");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-paracetamol");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-paracetamol"));
  });

  it("teaches duplicate-product and overdose emergency cues without inventing maxima or antidotes", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-paracetamol", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*g\b/i);
      assert.doesNotMatch(blob, /N-acetylcysteine|NAC|\d+\s*hour/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-paracetamol", "en")!;
    assert.match(en.lines.join(" "), /double up|other.*products|paracetamol/i);
    assert.match(en.lines.join(" "), /emergency|too much/i);
    assert.match(en.lines.join(" "), /does not invent a daily maximum/i);
  });
});
