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
  { id: "mol-propranolol", enCue: [/propranolol|beta-blocker/i, /mg\/kg dose or titration schedule/i] },
  { id: "mol-captopril", enCue: [/captopril|ACE inhibitor/i, /does not invent a mg\/kg dose/i] },
  { id: "mol-clonazepam", enCue: [/clonazepam|benzodiazepine|seizure/i, /mg\/kg dose or taper schedule/i] },
  {
    id: "mol-methylphenidate",
    enCue: [/methylphenidate|ADHD|stimulant/i, /dose or formulation switch rule/i],
  },
  {
    id: "mol-olanzapine",
    enCue: [/olanzapine|antipsychotic|metabolic/i, /dose or metabolic-monitoring schedule/i],
  },
  { id: "mol-glucagon", enCue: [/glucagon|hypoglycaemia/i, /dose or age-band kit rule/i] },
  { id: "mol-mannitol", enCue: [/mannitol|osmotic|ICP/i, /gram dose or osmolarity threshold/i] },
  { id: "mol-calcitriol", enCue: [/calcitriol|vitamin D/i, /microgram dose/i] },
  {
    id: "mol-aminophylline",
    enCue: [/aminophylline|methylxanthine|asthma/i, /loading dose or serum-level target/i],
  },
  {
    id: "mol-dopamine",
    enCue: [/dopamine|shock|catecholamine|vasopressor/i, /mcg\/kg\/min infusion rate/i],
  },
  { id: "mol-dobutamine", enCue: [/dobutamine|inotrope/i, /mcg\/kg\/min infusion rate/i] },
  { id: "mol-octreotide", enCue: [/octreotide|somatostatin/i, /dose or infusion schedule/i] },
  {
    id: "mol-zinc-sulfate",
    enCue: [/zinc|diarrhoea|deficiency/i, /elemental-mg dose or course length/i],
  },
  {
    id: "mol-sodium-bicarbonate",
    enCue: [/sodium bicarbonate|alkalinis|acidosis/i, /mmol\/kg dose or infusion rate/i],
  },
  {
    id: "mol-silver-sulfadiazine",
    enCue: [/silver sulfadiazine|burn|sulfonamide/i, /application thickness or dressing schedule/i],
  },
  {
    id: "mol-valganciclovir",
    enCue: [/valganciclovir|CMV/i, /mg\/kg dose or induction\/maintenance switch/i],
  },
  { id: "mol-rifabutin", enCue: [/rifabutin|rifamycin|MAC|TB/i, /dose or interaction list/i] },
  {
    id: "mol-macrogol",
    enCue: [/macrogol|PEG|laxative|constipation/i, /sachet dose or disimpaction schedule/i],
  },
  {
    id: "mol-sulfadiazine",
    enCue: [/sulfadiazine|sulfonamide|toxoplasmosis/i, /mg\/kg dose or pyrimethamine pairing rule/i],
  },
] as const;

describe("v385–v403 deepened counselling batch §9 (Paediatric Batches H–I)", () => {
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

  it("lists all nineteen batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    assert.equal(BATCH.length, 19);
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
