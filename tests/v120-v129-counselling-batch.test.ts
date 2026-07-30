import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

const BATCH = [
  { id: "mol-naproxen", enCue: /NSAID|black stools/i },
  { id: "mol-rosuvastatin", enCue: /statin|muscle/i },
  { id: "mol-escitalopram", enCue: /SSRI|suicid/i },
  { id: "mol-insulin-aspart", enCue: /insulin|hypoglycaemia/i },
  { id: "mol-methotrexate", enCue: /DMARD|weekly|folic/i },
  { id: "mol-alendronate", enCue: /bisphosphonate|upright|calcium/i },
  { id: "mol-ferrous-sulfate", enCue: /iron|children/i },
  { id: "mol-clotrimazole", enCue: /azole|antifungal/i },
  { id: "mol-ondansetron", enCue: /antiemetic|constipation/i },
  { id: "mol-clarithro", enCue: /macrolide|interaction/i },
] as const;

describe("v120–v129 counselling batch §9", () => {
  for (const { id, enCue } of BATCH) {
    it(`publishes five langs with safety gates for ${id}`, () => {
      const langs = listCounsellingLangs(id);
      assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
      const cov = counsellingCoverage(id);
      assert.equal(cov.length, 5);
      assert.ok(cov.every((c) => c.lineCount === 6));

      for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
        const script = getCounsellingScript(id, lang);
        assert.ok(script);
        const blob = script!.lines.join(" ");
        assert.doesNotMatch(blob, /\d+\s*mg/i);
        assert.doesNotMatch(blob, /\[Draft\]/i);
        assert.match(script!.sourceNote, /founder-reviewed/i);
      }

      const en = getCounsellingScript(id, "en")!;
      assert.match(en.lines.join(" "), enCue);
    });
  }

  it("lists all ten batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
