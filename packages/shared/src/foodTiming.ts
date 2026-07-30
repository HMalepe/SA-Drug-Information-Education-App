import type { RegimenItem } from "./companion.js";
import { renderableFact } from "./publish.js";
import type { SafetyProfile, SourcedFact } from "./types.js";

/**
 * Build Spec §6 — Nutrition / food-timing companion cues.
 * Surfaces published Food & Lifestyle facts for the saved regimen.
 * Never invents clock times, spacing hours, or doses.
 */

export type FoodTimingTag =
  | "with_food"
  | "empty_stomach"
  | "separate_dairy_or_minerals"
  | "alcohol_caution"
  | "general";

export interface FoodTimingCue {
  moleculeId: string;
  moleculeName: string;
  brandName?: string;
  tags: FoodTimingTag[];
  publishedNote: string;
  sourceId?: string;
  lastReviewed?: string;
  /** Support copy for reminder envelopes — never includes a dose */
  reminderHint: string;
}

export interface FoodTimingReport {
  cues: FoodTimingCue[];
  missingPublishedNote: Array<{ moleculeId: string; moleculeName: string }>;
  note: string;
  disclaimer: string;
}

const DISCLAIMER =
  "Food-timing cues repeat published Materia Food & Lifestyle notes for your saved list. They do not set a personal schedule or change your labelled dose.";

export function classifyFoodLifestyleText(text: string): FoodTimingTag[] {
  const t = text.toLowerCase();
  const tags: FoodTimingTag[] = [];
  if (/\b(empty[- ]stomach|before food|before breakfast|fasting)\b/.test(t)) {
    tags.push("empty_stomach");
  }
  if (/\b(with food|with meals|after food|after meals|take with food|stomach upset)\b/.test(t)) {
    tags.push("with_food");
  }
  if (/\b(dairy|milk|calcium|iron|antacid|mineral|chelat)\b/.test(t)) {
    tags.push("separate_dairy_or_minerals");
  }
  if (/\b(alcohol|ethanol|drinking)\b/.test(t)) {
    tags.push("alcohol_caution");
  }
  if (tags.length === 0 && text.trim().length > 0) tags.push("general");
  return tags;
}

export function reminderHintFromTags(tags: FoodTimingTag[], moleculeName: string): string {
  if (tags.includes("empty_stomach")) {
    return `Food note for ${moleculeName}: published counselling mentions empty-stomach / absorption timing — follow the labelled product; Materia does not invent a clock time.`;
  }
  if (tags.includes("separate_dairy_or_minerals")) {
    return `Food note for ${moleculeName}: published counselling mentions dairy/minerals/antacids — confirm separation against the label; Materia does not invent hours.`;
  }
  if (tags.includes("alcohol_caution")) {
    return `Food note for ${moleculeName}: published counselling mentions alcohol caution — confirm against the labelled product.`;
  }
  if (tags.includes("with_food")) {
    return `Food note for ${moleculeName}: published counselling mentions food / stomach comfort — follow the labelled product.`;
  }
  return `Food note for ${moleculeName}: see published Food & Lifestyle on the molecule page — not a new schedule.`;
}

function publishedFood(
  fact: SourcedFact<string> | undefined,
): { text: string; sourceId?: string; lastReviewed?: string } | null {
  if (!fact) return null;
  const r = renderableFact(fact);
  if (!r) return null;
  const text = String(r.value).trim();
  if (text.length < 8) return null;
  return { text, sourceId: fact.sourceId, lastReviewed: fact.lastReviewed };
}

/**
 * Authored educational Food & Lifestyle supplements (publish-gated).
 * Used when seed safety rows lack foodLifestyle — original Materia counselling, not SAMF copy.
 */
export const FOOD_TIMING_LIBRARY: Array<{
  moleculeId: string;
  fact: SourcedFact<string>;
}> = [
  {
    moleculeId: "mol-doxy",
    fact: {
      value:
        "Tetracycline-class teaching: dairy, antacids, and mineral supplements can reduce absorption — counsel patients to check the labelled product for separation guidance. Materia does not invent a spacing schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-metro",
    fact: {
      value:
        "Metronidazole counselling commonly includes avoiding alcohol during and shortly after the course per the labelled product — confirm product-specific advice; Materia does not invent a duration.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-cipro",
    fact: {
      value:
        "Fluoroquinolone teaching: dairy and mineral supplements may affect absorption — confirm separation guidance on the labelled product. Materia does not invent hours or doses.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-warfarin",
    fact: {
      value:
        "Keep vitamin K–rich foods reasonably consistent week to week; sudden diet swings can affect anticoagulation teaching discussions — INR targets stay clinician-directed. Materia does not invent an INR or dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-levothyroxine",
    fact: {
      value:
        "Common teaching: take on an empty stomach consistently; iron, calcium, and some foods reduce absorption — confirm against the labelled product. Materia does not invent a spacing schedule or mcg dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-ibuprofen",
    fact: {
      value:
        "NSAID counselling often includes taking with food if stomach upset occurs — still confirm against the labelled product and ulcer/asthma history. Materia does not invent a dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-gliclazide",
    fact: {
      value:
        "Sulfonylurea teaching: take with meals as on the labelled product — skipping meals raises hypoglycaemia risk discussions. Materia does not invent a dose or meal clock.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-prednisone",
    fact: {
      value:
        "Corticosteroid counselling often includes taking with food if stomach upset occurs — confirm against the labelled product. Materia does not invent a dose or taper.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-isoniazid",
    fact: {
      value:
        "Isoniazid counselling: follow labelled food advice; alcohol and liver concerns belong with the pharmacist/clinician. Materia does not invent a B6 dose or meal schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-furosemide",
    fact: {
      value:
        "Loop-diuretic teaching: strong urination is expected — confirm timing against the labelled product so toilet access is planned. Materia does not invent a clock schedule, dose, or electrolyte target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-rifampicin",
    fact: {
      value:
        "Rifampicin may be taken with or without food depending on the labelled product — confirm product-specific advice. Orange-red body fluids are a common teaching point, not a schedule. Materia does not invent a dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-digoxin",
    fact: {
      value:
        "Keep diet and brand reasonably consistent week to week when on digoxin teaching plans — levels stay clinician-directed. Materia does not invent a digoxin level or dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-spironolactone",
    fact: {
      value:
        "Potassium-sparing diuretic teaching: avoid unprescribed potassium supplements and salt substitutes unless the clinician agrees — confirm against the labelled product. Materia does not invent a potassium target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-23",
    },
  },
  {
    moleculeId: "mol-diclofenac",
    fact: {
      value:
        "NSAID teaching: take with food if stomach upset occurs — confirm against the labelled product. Materia does not invent a dose or meal clock.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-cetirizine",
    fact: {
      value:
        "Antihistamine teaching: alcohol may worsen drowsiness — confirm against the labelled product. Materia does not invent a dose or sedation score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-dolutegravir",
    fact: {
      value:
        "INSTI teaching: some calcium, iron, or antacid products may need separation as the labelled product describes. Materia does not invent hours or a dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-efavirenz",
    fact: {
      value:
        "NNRTI teaching: bedtime dosing is often discussed on the labelled product — confirm product-specific advice. Materia does not invent a clock time or dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-allopurinol",
    fact: {
      value:
        "Allopurinol teaching: often taken with food and water as the labelled product advises. Materia does not invent a dose or uric-acid target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-pantoprazole",
    fact: {
      value:
        "PPI teaching: often before food — confirm against the labelled product. Materia does not invent a clock time, dose, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-clopidogrel",
    fact: {
      value:
        "Antiplatelet teaching: take consistently as on the labelled product — food timing is product-specific. Materia does not invent a dose or platelet target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-codeine",
    fact: {
      value:
        "Opioid teaching: alcohol caution is common counselling — confirm against the labelled product. Materia does not invent a dose or maximum daily amount.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-lamivudine",
    fact: {
      value:
        "NRTI teaching: take consistently as on the labelled product — food timing is product-specific. Materia does not invent a dose or viral-load target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-tdf",
    fact: {
      value:
        "Tenofovir teaching: take as on the labelled product; kidney and bone discussions stay clinician-directed. Materia does not invent a dose or eGFR target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-pyrazinamide",
    fact: {
      value:
        "TB antimycobacterial teaching: alcohol caution is common counselling — confirm against the labelled product. Materia does not invent a dose or liver-enzyme target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-ethambutol",
    fact: {
      value:
        "Ethambutol teaching: take as on the labelled product — vision watch is counselling, not a schedule. Materia does not invent a dose or visual-acuity target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-sertraline",
    fact: {
      value:
        "SSRI teaching: alcohol may worsen sedation or mood effects — confirm against the labelled product. Materia does not invent a dose or taper schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-insulin-glargine",
    fact: {
      value:
        "Basal insulin teaching: meal pattern changes affect hypo risk discussions — confirm against the labelled product and clinician plan. Materia does not invent units or a glucose target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-rivaroxaban",
    fact: {
      value:
        "DOAC teaching: some strengths are taken with food — confirm against the labelled product. Materia does not invent a dose, INR, or clotting target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-carbamazepine",
    fact: {
      value:
        "Antiepileptic teaching: alcohol caution and interaction checks are common — confirm against the labelled product. Materia does not invent a dose or blood-level target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-valproate",
    fact: {
      value:
        "Valproate teaching: take as on the labelled product — food timing is product-specific. Materia does not invent a dose or blood-level target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-montelukast",
    fact: {
      value:
        "Leukotriene antagonist teaching: take as on the labelled product — not a sudden-relief inhaler substitute. Materia does not invent a dose or asthma-control score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-24",
    },
  },
  {
    moleculeId: "mol-fluclox",
    fact: {
      value:
        "Flucloxacillin teaching: empty-stomach timing is often discussed on the labelled product — confirm product advice. Materia does not invent a clock time or dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-cephalexin",
    fact: {
      value:
        "Cephalosporin teaching: take as on the labelled product — food timing is product-specific. Materia does not invent a dose or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-nitro",
    fact: {
      value:
        "Nitrofurantoin teaching: often with food if stomach upset occurs — confirm against the labelled product. Materia does not invent a dose or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-loratadine",
    fact: {
      value:
        "Antihistamine teaching: alcohol may worsen drowsiness — confirm against the labelled product. Materia does not invent a dose or sedation score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-empagliflozin",
    fact: {
      value:
        "SGLT2 teaching: illness with reduced eating or drinking raises dehydration discussions — confirm against the labelled product. Materia does not invent a dose or glucose target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-apixaban",
    fact: {
      value:
        "DOAC teaching: take consistently as on the labelled product — food timing is product-specific. Materia does not invent a dose, INR, or clotting target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-amitriptyline",
    fact: {
      value:
        "TCA teaching: alcohol and other sedatives may worsen drowsiness — confirm against the labelled product. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-loperamide",
    fact: {
      value:
        "Antimotility teaching: take as on the labelled product — do not invent a daily maximum. Materia does not invent a dose either.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-fluconazole",
    fact: {
      value:
        "Azole antifungal teaching: take as on the labelled product — interaction checks belong with the pharmacist. Materia does not invent a dose or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-carvedilol",
    fact: {
      value:
        "Beta-blocker teaching: often with food — confirm against the labelled product. Materia does not invent a dose or heart-rate target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-naproxen",
    fact: {
      value:
        "NSAID teaching: take with food if stomach upset occurs — confirm against the labelled product. Materia does not invent a dose or meal clock.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-rosuvastatin",
    fact: {
      value:
        "Statin teaching: take as on the labelled product — food timing is product-specific. Materia does not invent a dose or cholesterol target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-escitalopram",
    fact: {
      value:
        "SSRI teaching: alcohol may worsen sedation or mood effects — confirm against the labelled product. Materia does not invent a dose or taper schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-insulin-aspart",
    fact: {
      value:
        "Rapid-acting insulin teaching: meal timing follows the labelled product and clinician plan. Materia does not invent units or a glucose target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-methotrexate",
    fact: {
      value:
        "DMARD teaching: alcohol caution is common counselling — confirm against the labelled product. Materia does not invent a dose, day-of-week, or lab target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-alendronate",
    fact: {
      value:
        "Bisphosphonate teaching: often first thing with plain water, remaining upright as the labelled product describes. Materia does not invent a clock time or spacing hours.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-ferrous-sulfate",
    fact: {
      value:
        "Iron teaching: tea/coffee and some foods may affect absorption — confirm against the labelled product. Materia does not invent a dose or haemoglobin target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-clotrimazole",
    fact: {
      value:
        "Azole antifungal teaching: complete the labelled course — food timing is usually not the main counselling point. Materia does not invent a dose or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-ondansetron",
    fact: {
      value:
        "Antiemetic teaching: take as on the labelled product. Materia does not invent a dose or maximum daily amount.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-clarithro",
    fact: {
      value:
        "Macrolide teaching: take as on the labelled product — food timing is product-specific. Materia does not invent a dose or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-perindopril",
    fact: {
      value:
        "ACE-inhibitor teaching: take as on the labelled product — salt-substitute and potassium discussions belong with the pharmacist. Materia does not invent a dose or blood-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-sitagliptin",
    fact: {
      value:
        "DPP-4 teaching: take as on the labelled product — meal timing follows your diabetes plan. Materia does not invent a dose or glucose target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-dapagliflozin",
    fact: {
      value:
        "SGLT2 teaching: illness with reduced eating or drinking raises dehydration and sick-day discussions — confirm against the labelled product. Materia does not invent a dose or glucose target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-gabapentin",
    fact: {
      value:
        "Gabapentin teaching: alcohol and other sedatives may worsen drowsiness — confirm against the labelled product. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-pregabalin",
    fact: {
      value:
        "Pregabalin teaching: alcohol and other sedatives may worsen breathing-risk discussions — confirm against the labelled product. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-colchicine",
    fact: {
      value:
        "Colchicine teaching: take exactly as on the labelled product — do not invent an attack schedule. Materia does not invent a dose either.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-hydroxychloroquine",
    fact: {
      value:
        "Hydroxychloroquine teaching: often with food if stomach upset occurs — confirm against the labelled product. Materia does not invent a dose or eye-exam interval.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-clinda",
    fact: {
      value:
        "Clindamycin teaching: take as on the labelled product — diarrhoea watch is counselling, not a food schedule. Materia does not invent a dose or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-tiotropium",
    fact: {
      value:
        "LAMA inhaler teaching: take as on the labelled product — not a sudden-relief reliever substitute. Materia does not invent a puff count or dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-mirtazapine",
    fact: {
      value:
        "NaSSA teaching: alcohol may worsen sedation — confirm against the labelled product. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-ramipril",
    fact: {
      value:
        "ACE-inhibitor teaching: take as on the labelled product — salt-substitute and potassium discussions belong with the pharmacist. Materia does not invent a dose or blood-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-penv",
    fact: {
      value:
        "Phenoxymethylpenicillin teaching: empty-stomach timing is often discussed on some labelled products — confirm product advice. Materia does not invent a clock time or dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-citalopram",
    fact: {
      value:
        "SSRI teaching: alcohol may worsen sedation or mood effects — confirm against the labelled product. Materia does not invent a dose or taper schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-venlafaxine",
    fact: {
      value:
        "SNRI teaching: alcohol may worsen sedation — confirm against the labelled product. Materia does not invent a dose, BP target, or taper schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-diazepam",
    fact: {
      value:
        "Benzodiazepine teaching: alcohol caution is common counselling — confirm against the labelled product. Materia does not invent a dose or duration.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-lithium",
    fact: {
      value:
        "Lithium teaching: keep fluid intake reasonably consistent as the clinician advises — confirm against the labelled product. Materia does not invent a dose, fluid schedule, or lithium level target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-lamotrigine",
    fact: {
      value:
        "Lamotrigine teaching: take as on the labelled product — do not invent spacing hours or a catch-up plan. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-isotretinoin",
    fact: {
      value:
        "Oral retinoid teaching: take as on the labelled product — pregnancy-prevention counselling is label-directed. Materia does not invent a dose or pregnancy-test schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-fluticasone",
    fact: {
      value:
        "ICS teaching: rinse mouth after inhalation as the labelled product advises — not a sudden-relief reliever. Materia does not invent a puff count or dose.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-metoclopramide",
    fact: {
      value:
        "Antiemetic teaching: alcohol caution is common counselling — confirm against the labelled product. Materia does not invent a dose or maximum duration.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-levetiracetam",
    fact: {
      value:
        "Antiepileptic teaching: take as on the labelled product — alcohol may worsen sedation. Materia does not invent a dose or blood-level target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-phenytoin",
    fact: {
      value:
        "Phenytoin teaching: keep brand and timing reasonably consistent — confirm against the labelled product. Materia does not invent a dose or blood-level target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-celecoxib",
    fact: {
      value:
        "COX-2 NSAID teaching: take with food if stomach upset occurs — confirm against the labelled product. Materia does not invent a dose or pain target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-enoxaparin",
    fact: {
      value:
        "LMWH teaching: injection timing follows the labelled product and clinician plan. Materia does not invent a dose, units, or clotting target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-quetiapine",
    fact: {
      value:
        "Atypical antipsychotic teaching: alcohol may worsen sedation — confirm against the labelled product. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-carbimazole",
    fact: {
      value:
        "Antithyroid teaching: take as on the labelled product — infection watch is counselling, not a schedule. Materia does not invent a dose or thyroid-level target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-semaglutide",
    fact: {
      value:
        "GLP-1 teaching: illness with reduced eating raises hydration discussions — confirm against the labelled product. Materia does not invent a dose, units, or weight target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-azathioprine",
    fact: {
      value:
        "Immunosuppressant teaching: often with food if stomach upset occurs — confirm against the labelled product. Materia does not invent a dose or lab target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-sumatriptan",
    fact: {
      value:
        "Triptan teaching: take as on the labelled product — do not invent spacing hours for a second dose. Materia does not invent a dose or maximum daily amount.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-chlorphenamine",
    fact: {
      value:
        "First-generation antihistamine teaching: alcohol may worsen drowsiness — confirm against the labelled product. Materia does not invent a dose or sedation score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-glimepiride",
    fact: {
      value:
        "Sulfonylurea teaching: take with meals as on the labelled product — skipping meals raises hypoglycaemia risk discussions. Materia does not invent a dose or glucose target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-haloperidol",
    fact: {
      value:
        "Typical antipsychotic teaching: alcohol may worsen sedation — confirm against the labelled product. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-lorazepam",
    fact: {
      value:
        "Benzodiazepine teaching: alcohol caution is common counselling — confirm against the labelled product. Materia does not invent a dose or duration.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-risperidone",
    fact: {
      value:
        "Atypical antipsychotic teaching: alcohol may worsen sedation — confirm against the labelled product. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-terbinafine",
    fact: {
      value:
        "Allylamine antifungal teaching: take as on the labelled product — liver watch is counselling, not a schedule. Materia does not invent a dose or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-lactulose",
    fact: {
      value:
        "Osmotic laxative teaching: drink fluids as the clinician or labelled product advises. Materia does not invent a dose, fluid schedule, or bowel target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-sulfasalazine",
    fact: {
      value:
        "DMARD teaching: often with food and water as the labelled product advises. Materia does not invent a dose or lab target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-domperidone",
    fact: {
      value:
        "Antiemetic teaching: take as on the labelled product — heart-rhythm discussions belong with the pharmacist. Materia does not invent a dose or maximum duration.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-theophylline",
    fact: {
      value:
        "Methylxanthine teaching: keep brand and timing reasonably consistent — caffeine and smoking changes matter. Materia does not invent a dose or blood-level target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-erythro",
    fact: {
      value:
        "Macrolide teaching: food timing is product-specific — confirm against the labelled product. Materia does not invent a dose, meal clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-esomeprazole",
    fact: {
      value:
        "PPI teaching: many products are best before food — confirm against the labelled product. Materia does not invent a dose or meal clock.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-bisacodyl",
    fact: {
      value:
        "Stimulant laxative teaching: drink fluids as the clinician or labelled product advises. Materia does not invent a dose, fluid schedule, or bowel target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-hyoscine-butylbromide",
    fact: {
      value:
        "Antispasmodic teaching: take as on the labelled product — dry mouth and vision blur are common counselling. Materia does not invent a dose or pain score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-mesalazine",
    fact: {
      value:
        "5-ASA teaching: tablets, granules, and enemas are not interchangeable without advice — confirm against the labelled product. Materia does not invent a dose or flare schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-beclometasone",
    fact: {
      value:
        "Inhaled corticosteroid teaching: rinse mouth after inhaled doses if the product advises. Materia does not invent a puff count or step-up plan.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-formoterol",
    fact: {
      value:
        "LABA teaching: not a solo asthma controller unless the clinician’s plan says so — confirm against the labelled product. Materia does not invent a puff count or step-up plan.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-meloxicam",
    fact: {
      value:
        "NSAID teaching: often with food for stomach comfort — confirm against the labelled product. Materia does not invent a dose or pain score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-baclofen",
    fact: {
      value:
        "Muscle-relaxant teaching: alcohol may worsen drowsiness — confirm against the labelled product. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-levodopa-carbidopa",
    fact: {
      value:
        "Parkinson’s combination teaching: timing consistency matters — protein-timing questions belong with the clinician. Materia does not invent a dose, meal clock, or ON/OFF schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-topiramate",
    fact: {
      value:
        "Antiepileptic / migraine-preventer teaching: hydration discussions belong with the clinician — do not invent a litre target. Materia does not invent a dose or blood-level target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-cefuroxime",
    fact: {
      value:
        "Cephalosporin teaching: food timing can differ for tablets vs suspensions — confirm against the labelled product. Materia does not invent a dose, meal clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-lansoprazole",
    fact: {
      value:
        "PPI teaching: many products are best before food — confirm against the labelled product. Materia does not invent a dose or meal clock.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-dexamethasone",
    fact: {
      value:
        "Corticosteroid teaching: take with food if the labelled product advises — do not invent a taper or sick-day schedule. Materia does not invent a dose or glucose target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-donepezil",
    fact: {
      value:
        "Cholinesterase-inhibitor teaching: evening dosing is common counselling — confirm against the labelled product. Materia does not invent a dose or cognition score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-tamsulosin",
    fact: {
      value:
        "Alpha-blocker teaching: often after the same meal each day — confirm against the labelled product. Materia does not invent a dose or blood-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-finasteride",
    fact: {
      value:
        "5-ARI teaching: take as on the labelled product — crushed-tablet handling caution if pregnancy is a household concern. Materia does not invent a dose or PSA target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-desloratadine",
    fact: {
      value:
        "Non-sedating antihistamine teaching: alcohol may still add sedation — confirm against the labelled product. Materia does not invent a dose or sedation score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-febuxostat",
    fact: {
      value:
        "Xanthine-oxidase inhibitor teaching: not a sudden gout-pain rescue unless the clinician says otherwise. Materia does not invent a dose, uric-acid target, or flare schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-isosorbide-mn",
    fact: {
      value:
        "Nitrate teaching: timing gaps matter for some regimens — confirm against the labelled product. Materia does not invent a dose, nitrate-free interval, or blood-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-leflunomide",
    fact: {
      value:
        "DMARD teaching: take as on the labelled product — pregnancy-avoidance and washout discussions belong with the clinician. Materia does not invent a dose or lab target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-29",
    },
  },
  {
    moleculeId: "mol-eplerenone",
    fact: {
      value:
        "MRA teaching: potassium monitoring is common counselling — salt substitutes matter. Materia does not invent a dose or potassium target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-mefenamic-acid",
    fact: {
      value:
        "NSAID teaching: often with food for stomach comfort — confirm against the labelled product. Materia does not invent a dose, day-count, or pain score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-sildenafil",
    fact: {
      value:
        "PDE5 teaching: never combine with nitrates — confirm timing against the labelled product. Materia does not invent a dose, timing hours, or blood-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-oxybutynin",
    fact: {
      value:
        "Antimuscarinic teaching: tablets and patches differ — confirm the labelled product. Materia does not invent a dose or bladder score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-insulin-human",
    fact: {
      value:
        "Human insulin teaching: pens, vials, and mixes differ — confirm the labelled product and device. Materia does not invent a dose, carb ratio, or glucose target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-mometasone",
    fact: {
      value:
        "Potent topical corticosteroid teaching: thin layer to affected skin only — confirm against the labelled product. Materia does not invent a finger-tip unit count or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-fexofenadine",
    fact: {
      value:
        "Non-sedating antihistamine teaching: fruit juice may reduce absorption for some products — confirm against the labelled product. Materia does not invent a dose or sedation score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-ketoconazole",
    fact: {
      value:
        "Topical azole teaching: cream vs shampoo leave-on/rinse-off differs — confirm against the labelled product. Materia does not invent a dose, application clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-salmeterol",
    fact: {
      value:
        "LABA teaching: not a solo asthma controller unless the clinician’s plan says so — confirm against the labelled product. Materia does not invent a puff count or step-up plan.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-propylthiouracil",
    fact: {
      value:
        "Thionamide teaching: take as on the labelled product — infection and liver watch belong with the clinician. Materia does not invent a dose or thyroid lab target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-heparin",
    fact: {
      value:
        "UFH teaching: injection technique and monitoring belong with the care team. Materia does not invent a dose, aPTT target, or injection schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-morphine",
    fact: {
      value:
        "Opioid teaching: alcohol and other sedatives may worsen breathing risk — confirm against the labelled product. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-tranexamic-acid",
    fact: {
      value:
        "Antifibrinolytic teaching: heavy-period courses are common counselling — confirm the labelled window. Materia does not invent a dose, day-count, or bleed score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-doxazosin",
    fact: {
      value:
        "Alpha-blocker teaching: first-dose dizziness is common counselling — confirm against the labelled product. Materia does not invent a dose or blood-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-colecalciferol",
    fact: {
      value:
        "Vitamin D3 teaching: daily and weekly products differ — confirm against the labelled product. Materia does not invent a dose, IU count, or blood-level target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-calcium-carbonate",
    fact: {
      value:
        "Calcium salt teaching: with food is common counselling for many products — confirm against the labelled product. Materia does not invent a dose, elemental-calcium target, or spacing hours.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-hydrocortisone",
    fact: {
      value:
        "Mild topical corticosteroid teaching: thin layer to affected skin only — confirm against the labelled product. Materia does not invent a finger-tip unit count or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-latanoprost",
    fact: {
      value:
        "Prostaglandin eye-drop teaching: wait between different eye drops as the labelled product advises. Materia does not invent a drop count, spacing minutes, or intraocular-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-genta",
    fact: {
      value:
        "Aminoglycoside teaching: injection and topical/eye forms differ — confirm the labelled product. Materia does not invent a dose, level target, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-mupirocin",
    fact: {
      value:
        "Topical antibiotic teaching: thin layer to the affected area — confirm against the labelled product. Materia does not invent a dose, application clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-dutasteride",
    fact: {
      value:
        "5-ARI teaching: take as on the labelled product — crushed-capsule handling caution if pregnancy is a household concern. Materia does not invent a dose or PSA target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-mirabegron",
    fact: {
      value:
        "Beta-3 agonist teaching: blood-pressure watch is common counselling — confirm against the labelled product. Materia does not invent a dose or blood-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-folic-acid",
    fact: {
      value:
        "Vitamin B9 teaching: pregnancy and anaemia plans differ — confirm against the labelled product. Materia does not invent a dose or lab target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-cyanocobalamin",
    fact: {
      value:
        "Vitamin B12 teaching: tablets and injections differ — confirm the labelled product. Materia does not invent a dose, injection interval, or blood-level target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-betamethasone",
    fact: {
      value:
        "Potent topical corticosteroid teaching: thin layer to affected skin only — confirm against the labelled product. Materia does not invent a finger-tip unit count or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-clobetasol",
    fact: {
      value:
        "Very potent topical corticosteroid teaching: short courses are common counselling — confirm against the labelled product. Materia does not invent a finger-tip unit count or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-fusidic-acid",
    fact: {
      value:
        "Topical antibiotic teaching: thin layer to the affected area — confirm against the labelled product. Materia does not invent a dose, application clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-permethrin",
    fact: {
      value:
        "Scabicide / pediculicide teaching: cream and lotion instructions differ — confirm leave-on time against the labelled product. Materia does not invent a dose, leave-on clock, or contact list.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-fluticasone-nasal",
    fact: {
      value:
        "Intranasal corticosteroid teaching: shake and prime as the labelled product advises. Materia does not invent a spray count or step-up plan.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-desmopressin",
    fact: {
      value:
        "Vasopressin analogue teaching: fluid-restriction belongs with the clinician’s plan — do not invent a litre target. Materia does not invent a dose or sodium target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-tadalafil",
    fact: {
      value:
        "PDE5 teaching: daily and as-needed products differ — never combine with nitrates. Materia does not invent a dose, timing hours, or blood-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-solifenacin",
    fact: {
      value:
        "Antimuscarinic teaching: take as on the labelled product for overactive bladder. Materia does not invent a dose or bladder score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-alfuzosin",
    fact: {
      value:
        "Alpha-blocker teaching: often after the same meal each day — confirm against the labelled product. Materia does not invent a dose or blood-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-benzoyl-peroxide",
    fact: {
      value:
        "Topical acne antibacterial teaching: bleaching of fabrics is common counselling — confirm against the labelled product. Materia does not invent a dose, application clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-adapalene",
    fact: {
      value:
        "Topical retinoid teaching: night use and sun protection are common counselling — confirm against the labelled product. Materia does not invent a dose, application clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-tretinoin",
    fact: {
      value:
        "Topical retinoid teaching: pregnancy-avoidance teaching is common for many products — confirm against the labelled product. Materia does not invent a dose, application clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-ceftriaxone",
    fact: {
      value:
        "Third-generation cephalosporin teaching: injection technique belongs with the care team. Materia does not invent a dose, infusion clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-vanco",
    fact: {
      value:
        "Glycopeptide teaching: infusion rate and monitoring belong with the care team. Materia does not invent a dose, level target, or infusion clock.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-ritonavir",
    fact: {
      value:
        "HIV PK-booster teaching: interaction checks with ALL medicines and herbals are essential. Materia does not invent a dose, interaction list, or viral-load target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-timolol-eye",
    fact: {
      value:
        "Topical beta-blocker eye-drop teaching: wait between different eye drops as the labelled product advises. Materia does not invent a drop count, spacing minutes, or intraocular-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-levonorgestrel",
    fact: {
      value:
        "Progestogen teaching: tablets, implants, and IUSs differ — confirm the labelled product. Materia does not invent a dose, fertility score, or emergency-contraception clock.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-medroxyprogesterone",
    fact: {
      value:
        "Injectable / oral progestogen teaching: Depo and tablets differ — confirm the labelled product. Materia does not invent a dose, injection interval, or bone target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-ethinylestradiol",
    fact: {
      value:
        "Synthetic oestrogen teaching: usually part of a combined contraceptive pack — confirm against the labelled product. Materia does not invent a dose, pill clock, or clot score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-norethisterone",
    fact: {
      value:
        "Progestogen teaching: period-delay and contraception uses differ — confirm against the labelled product. Materia does not invent a dose, day-count, or clot score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-brimonidine",
    fact: {
      value:
        "Alpha-2 agonist eye-drop teaching: wait between different eye drops as the labelled product advises. Materia does not invent a drop count, spacing minutes, or intraocular-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-dorzolamide",
    fact: {
      value:
        "Carbonic anhydrase inhibitor eye-drop teaching: sulfa-allergy discussions belong with the pharmacist. Materia does not invent a drop count, spacing minutes, or intraocular-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-liothyronine",
    fact: {
      value:
        "T3 teaching: do not change brand or timing without the clinician — iron/calcium may need separation. Materia does not invent a dose or TSH / free-T3 target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-midazolam",
    fact: {
      value:
        "Benzodiazepine teaching: procedural and home uses differ — alcohol caution is common counselling. Materia does not invent a dose or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-fentanyl",
    fact: {
      value:
        "Opioid teaching: patches, lozenges, and injections are not interchangeable without advice. Materia does not invent a dose, patch clock, or titration schedule.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-granisetron",
    fact: {
      value:
        "5-HT3 antiemetic teaching: tablets and injections differ — confirm against the labelled product. Materia does not invent a dose, schedule hours, or nausea score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-desogestrel",
    fact: {
      value:
        "POP teaching: same-time habit is common counselling — confirm late-pill rules against the labelled pack. Materia does not invent a dose, late-pill clock, or fertility score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-drospirenone",
    fact: {
      value:
        "COC progestogen teaching: usually part of a combined pack — potassium and clot discussions belong with the pharmacist. Materia does not invent a dose, pill clock, potassium target, or clot score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-cabergoline",
    fact: {
      value:
        "Dopamine-agonist teaching: take as on the labelled product — prolactin and Parkinson’s uses differ. Materia does not invent a dose or prolactin target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-anastrozole",
    fact: {
      value:
        "Aromatase-inhibitor teaching: take as on the labelled product — bone-health discussions belong with the clinician. Materia does not invent a dose or oestradiol / bone target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-tamoxifen",
    fact: {
      value:
        "SERM teaching: take as on the labelled product — clot-risk and bleeding watch belong with the clinician. Materia does not invent a dose or clot score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-letrozole",
    fact: {
      value:
        "Aromatase-inhibitor teaching: take as on the labelled product — bone-health discussions belong with the clinician. Materia does not invent a dose or oestradiol / bone target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-filgrastim",
    fact: {
      value:
        "G-CSF teaching: injection technique belongs with the care team. Materia does not invent a dose, injection schedule, or neutrophil target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-aprepitant",
    fact: {
      value:
        "NK1 antiemetic teaching: interaction checks with many medicines and contraceptives are essential. Materia does not invent a dose, schedule hours, or nausea score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-olopatadine",
    fact: {
      value:
        "Ocular antihistamine teaching: remove contact lenses before drops if the labelled product advises. Materia does not invent a drop count, spacing minutes, or allergy score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-chloramphenicol-eye",
    fact: {
      value:
        "Ophthalmic antibiotic teaching: drops and ointment differ — confirm against the labelled product. Materia does not invent a dose, drop clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-exemestane",
    fact: {
      value:
        "Aromatase-inhibitor teaching: take as on the labelled product — bone-health discussions belong with the clinician. Materia does not invent a dose or oestradiol / bone target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-pegfilgrastim",
    fact: {
      value:
        "Pegylated G-CSF teaching: injection timing usually follows chemotherapy plans — confirm with the care team. Materia does not invent a dose, injection schedule, or neutrophil target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-denosumab",
    fact: {
      value:
        "RANKL-inhibitor teaching: oncology and osteoporosis uses differ — calcium and dental discussions belong with the clinician. Materia does not invent a dose, injection interval, or calcium / bone target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-zoledronic-acid",
    fact: {
      value:
        "Bisphosphonate infusion teaching: hydration and lab checks belong with the clinician. Materia does not invent a dose, infusion clock, or calcium / creatinine target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-capecitabine",
    fact: {
      value:
        "Oral fluoropyrimidine teaching: hand-foot care and diarrhoea watch are common counselling — confirm food timing against the labelled product. Materia does not invent a dose, cycle clock, or DPD / lab target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-mesna",
    fact: {
      value:
        "Uroprotectant teaching: timing usually follows ifosfamide or cyclophosphamide plans — confirm with the care team. Materia does not invent a dose, schedule hours, or bladder score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-epoetin-alfa",
    fact: {
      value:
        "ESA teaching: injection technique belongs with the care team — blood-pressure and clot discussions are clinician-led. Materia does not invent a dose, injection schedule, or haemoglobin target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-hydroxycarbamide",
    fact: {
      value:
        "Antimetabolite teaching: sickle-cell and myeloproliferative uses differ — blood-count monitoring belongs with the clinician. Materia does not invent a dose, lab interval, or blood-count target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-ketotifen-eye",
    fact: {
      value:
        "Ocular antihistamine teaching: remove contact lenses before drops if the labelled product advises. Materia does not invent a drop count, spacing minutes, or allergy score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-tobramycin-eye",
    fact: {
      value:
        "Ophthalmic aminoglycoside teaching: drops and ointment differ — confirm against the labelled product. Materia does not invent a dose, drop clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-darbepoetin",
    fact: {
      value:
        "Long-acting ESA teaching: injection technique belongs with the care team — blood-pressure and clot discussions are clinician-led. Materia does not invent a dose, injection schedule, or haemoglobin target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-eltrombopag",
    fact: {
      value:
        "TPO-agonist teaching: food and mineral spacing belong on the labelled product. Materia does not invent a dose, meal clock, or platelet target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-deferasirox",
    fact: {
      value:
        "Oral iron-chelator teaching: dispersible and film-coated forms differ — confirm food timing against the labelled product. Materia does not invent a dose, fasting clock, or ferritin target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-folinic-acid",
    fact: {
      value:
        "Reduced-folate teaching: rescue and support uses differ — timing with chemo or methotrexate belongs with the clinician. Materia does not invent a dose, rescue clock, or folate target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-fondaparinux",
    fact: {
      value:
        "Anti-Xa teaching: injection technique belongs with the care team — bleeding watch is essential. Materia does not invent a dose, injection schedule, or anti-Xa target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-aciclovir-eye",
    fact: {
      value:
        "Ophthalmic antiviral teaching: ointment technique belongs with eye-care advice. Materia does not invent a dose, application clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-ciprofloxacin-eye",
    fact: {
      value:
        "Ophthalmic fluoroquinolone teaching: drops and ointment differ — confirm against the labelled product. Materia does not invent a dose, drop clock, or course length.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-prednisolone-eye",
    fact: {
      value:
        "Ophthalmic corticosteroid teaching: do not prolong courses without clinician review. Materia does not invent a dose, drop clock, or eye-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-mometasone-nasal",
    fact: {
      value:
        "Intranasal corticosteroid teaching: technique and priming belong on the labelled product. Materia does not invent a dose, spray clock, or allergy score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-diphenhydramine",
    fact: {
      value:
        "Sedating antihistamine teaching: drowsiness is common — avoid driving if affected; check alcohol and other sedatives. Materia does not invent a dose, spacing hours, or allergy score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-pseudoephedrine",
    fact: {
      value:
        "Oral decongestant teaching: multi-ingredient cold packs differ — blood-pressure watch is common counselling. Materia does not invent a dose, spacing hours, or congestion score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-oxymetazoline",
    fact: {
      value:
        "Topical nasal decongestant teaching: short courses are common — confirm the labelled maximum duration. Materia does not invent a dose, spray clock, or congestion score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-xylometazoline",
    fact: {
      value:
        "Topical nasal decongestant teaching: short courses are common — confirm the labelled maximum duration. Materia does not invent a dose, spray clock, or congestion score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-hypromellose",
    fact: {
      value:
        "Artificial tears teaching: preservative-free and multi-dose packs differ — confirm against the labelled product. Materia does not invent a drop count, spacing minutes, or dryness score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-sodium-cromoglicate",
    fact: {
      value:
        "Mast-cell stabiliser teaching: nasal and ocular forms differ — regular use before full benefit is common counselling. Materia does not invent a dose, spray or drop clock, or allergy score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-rizatriptan",
    fact: {
      value:
        "Triptan teaching: for migraine attacks as labelled — do not stack triptans casually. Materia does not invent a dose, attack clock, or migraine score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-tolterodine",
    fact: {
      value:
        "Antimuscarinic teaching: immediate- and modified-release forms differ — dry mouth and constipation watch are common. Materia does not invent a dose, dosing clock, or bladder score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-vardenafil",
    fact: {
      value:
        "PDE5 teaching: never combine with nitrates without clinician advice — ask how food and alcohol fit the labelled product. Materia does not invent a dose, timing hours, or erection score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-prednisolone-oral",
    fact: {
      value:
        "Systemic corticosteroid teaching: do not stop suddenly without the clinician’s plan — infection and stomach watch are common. Materia does not invent a dose, taper clock, or steroid score.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
  {
    moleculeId: "mol-fludrocortisone",
    fact: {
      value:
        "Mineralocorticoid teaching: salt and fluid advice belongs with the clinician — blood-pressure and swelling watch are common. Materia does not invent a dose, sodium target, or blood-pressure target.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-30",
    },
  },
];

export function resolveFoodLifestyleFact(
  moleculeId: string,
  safetyProfiles: SafetyProfile[],
  library: typeof FOOD_TIMING_LIBRARY = FOOD_TIMING_LIBRARY,
): SourcedFact<string> | undefined {
  const fromSeed = safetyProfiles.find((s) => s.moleculeId === moleculeId)?.foodLifestyle;
  if (fromSeed && renderableFact(fromSeed)) return fromSeed;
  const lib = library.find((x) => x.moleculeId === moleculeId)?.fact;
  if (lib && renderableFact(lib)) return lib;
  return fromSeed;
}

export function buildFoodTimingCues(input: {
  regimen: RegimenItem[];
  safetyProfiles: SafetyProfile[];
  library?: typeof FOOD_TIMING_LIBRARY;
}): FoodTimingReport {
  const cues: FoodTimingCue[] = [];
  const missing: FoodTimingReport["missingPublishedNote"] = [];

  for (const item of input.regimen) {
    const fact = resolveFoodLifestyleFact(item.moleculeId, input.safetyProfiles, input.library);
    const pub = publishedFood(fact);
    if (!pub) {
      missing.push({ moleculeId: item.moleculeId, moleculeName: item.moleculeName });
      continue;
    }
    const tags = classifyFoodLifestyleText(pub.text);
    cues.push({
      moleculeId: item.moleculeId,
      moleculeName: item.moleculeName,
      brandName: item.brandName,
      tags,
      publishedNote: pub.text,
      sourceId: pub.sourceId,
      lastReviewed: pub.lastReviewed,
      reminderHint: reminderHintFromTags(tags, item.moleculeName),
    });
  }

  return {
    cues,
    missingPublishedNote: missing,
    note:
      cues.length === 0
        ? "No published Food & Lifestyle notes for this regimen yet. That is not permission to invent timing rules."
        : "Published Food & Lifestyle notes only. Reminder hints echo those notes — confirm against the labelled product.",
    disclaimer: DISCLAIMER,
  };
}

/** Attach food hints to reminder bodies when a published cue exists (still no doses). */
export function enrichReminderBody(baseBody: string, cue: FoodTimingCue | undefined): string {
  if (!cue) return baseBody;
  return `${baseBody} ${cue.reminderHint}`;
}
