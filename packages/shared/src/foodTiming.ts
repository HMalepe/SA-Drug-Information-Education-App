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
