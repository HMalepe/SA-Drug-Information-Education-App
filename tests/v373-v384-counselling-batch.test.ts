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
  {
    id: "mol-caffeine",
    enCue: [/caffeine|neonatal apnoea|hospital/i, /loading dose|serum-level target/i],
  },
  {
    id: "mol-cefotaxime",
    enCue: [/cefotaxime|cephalosporin|neonatal|paediatric/i, /mg\/kg dose or meningitis regimen/i],
  },
  {
    id: "mol-ceftazidime",
    enCue: [/ceftazidime|antipseudomonal|cephalosporin/i, /does not invent a mg\/kg dose/i],
  },
  {
    id: "mol-amikacin",
    enCue: [/amikacin|aminoglycoside|hearing|kidney/i, /mg\/kg dose or level-monitoring interval/i],
  },
  {
    id: "mol-piperacillin-tazobactam",
    enCue: [/piperacillin|tazobactam|penicillin/i, /mg\/kg dose or infusion schedule/i],
  },
  {
    id: "mol-flucytosine",
    enCue: [/flucytosine|antifungal|cryptococcal|Candida/i, /dose or therapeutic-drug-monitoring target/i],
  },
  {
    id: "mol-primaquine",
    enCue: [/primaquine|antimalarial|G6PD/i, /mg\/kg dose or course length/i],
  },
  {
    id: "mol-miconazole",
    enCue: [/miconazole|imidazole|Candida/i, /application schedule or oral-gel regimen/i],
  },
  {
    id: "mol-levofloxacin",
    enCue: [/levofloxacin|fluoroquinolone|tendon/i, /does not invent a mg\/kg dose/i],
  },
  { id: "mol-dapsone", enCue: [/dapsone|sulfone|G6PD|haemolysis/i, /does not invent a dose/i] },
  {
    id: "mol-ethionamide",
    enCue: [/ethionamide|antimycobacterial|TB/i, /does not invent a mg\/kg dose/i],
  },
  {
    id: "mol-ganciclovir",
    enCue: [/ganciclovir|CMV|myelosuppression/i, /induction or maintenance schedule/i],
  },
] as const;

describe("v373–v384 deepened counselling batch §9 (Paediatric Batch G)", () => {
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

  it("lists all twelve batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    assert.equal(BATCH.length, 12);
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
