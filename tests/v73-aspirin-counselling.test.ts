import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v73 aspirin multilingual counselling §9", () => {
  it("publishes all five SA launch languages for aspirin (acetylsalicylic acid)", () => {
    const langs = listCounsellingLangs("mol-aspirin");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-aspirin");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-aspirin"));
  });

  it("teaches bleed, child/viral, and dual-use cues without inventing doses", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-aspirin", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-aspirin", "en")!;
    assert.match(en.lines.join(" "), /ulcer|bleeding|asthma/i);
    assert.match(en.lines.join(" "), /children|teens|viral/i);
    assert.match(en.lines.join(" "), /does not invent a dose/i);
  });
});
