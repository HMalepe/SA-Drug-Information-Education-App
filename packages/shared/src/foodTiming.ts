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
