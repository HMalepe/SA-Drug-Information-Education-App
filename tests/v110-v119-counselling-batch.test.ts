import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

const BATCH = [
  { id: "mol-fluclox", enCue: /penicillin|empty-stomach/i },
  { id: "mol-cephalexin", enCue: /cephalosporin|diarrhoea/i },
  { id: "mol-nitro", enCue: /nitrofuran|UTI|urine/i },
  { id: "mol-loratadine", enCue: /antihistamine|drowsiness/i },
  { id: "mol-empagliflozin", enCue: /SGLT2|dehydration|genital/i },
  { id: "mol-apixaban", enCue: /DOAC|bleeding/i },
  { id: "mol-amitriptyline", enCue: /tricyclic|TCA/i },
  { id: "mol-loperamide", enCue: /antimotility|diarrhoea/i },
  { id: "mol-fluconazole", enCue: /azole|antifungal|interaction/i },
  { id: "mol-carvedilol", enCue: /beta-blocker|stop suddenly/i },
] as const;

describe("v110–v119 counselling batch §9", () => {
  for (const { id, enCue } of BATCH) {
    it(`publishes five langs with safety gates for ${id}`, () => {
      const langs = listCounsellingLangs(id);
      assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
      const cov = counsellingCoverage(id);
      assert.equal(cov.length, 5);
      assert.ok(cov.every((c) => c.lineCount === 4));

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
