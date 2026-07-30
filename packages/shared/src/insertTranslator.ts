import type { PublishState, Source } from "./types.js";

/**
 * Build Spec §9 — Plain-English insert translator.
 * Reading-level toggle: professional ↔ Grade-5.
 * Both levels must be authored & published — Materia never invents a plain rewrite.
 */

export type InsertReadingLevel = "professional" | "grade5";

export interface InsertPassage {
  level: InsertReadingLevel;
  title: string;
  body: string;
  publishState: PublishState;
  sourceId: string;
  lastReviewed: string;
}

export interface InsertDocument {
  id: string;
  moleculeId: string;
  moleculeSlug: string;
  productId?: string;
  brandName?: string;
  passages: InsertPassage[];
}

export interface InsertTranslateResult {
  status: "ok" | "unavailable";
  level: InsertReadingLevel;
  title?: string;
  body?: string;
  availableLevels: InsertReadingLevel[];
  source?: Source;
  message: string;
  disclaimer: string;
}

const DISCLAIMER =
  "Educational insert summary from Materia. Not a substitute for the labelled package insert. " +
  "Confirm against the physical pack and professional judgement.";

const INSERT_SOURCE = "src-insert-owned";

/** Original Materia educational insert excerpts — not copied from commercial PILs. */
export const INSERT_LIBRARY: InsertDocument[] = [
  {
    id: "insert-amox-demo",
    moleculeId: "mol-amox",
    moleculeSlug: "amoxicillin",
    productId: "prod-amoxil",
    brandName: "Amoxil (educational demo)",
    passages: [
      {
        level: "professional",
        title: "Professional insert excerpt (educational)",
        body: [
          "Amoxicillin is a beta-lactam antibiotic that inhibits bacterial cell-wall synthesis.",
          "Use only for labelled susceptible infections; confirm allergy history before supply.",
          "Counsel on completing the prescribed course unless a clinician advises otherwise.",
          "Seek urgent care for rash with systemic features, angioedema, or breathing difficulty.",
          "Materia does not invent a dose, interval, or course length — confirm against the labelled product.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
      {
        level: "grade5",
        title: "Plain-language insert summary (Grade ~5)",
        body: [
          "Amoxicillin is an antibiotic. It helps stop some germs from building their outer wall.",
          "Only use it for the infection your clinician treated. Tell your pharmacist about any penicillin allergy.",
          "Take it as the label says. Finish the course unless your clinician tells you to stop.",
          "If you get a bad rash, swelling, or trouble breathing, get emergency help right away.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
    ],
  },
  {
    id: "insert-paracetamol-demo",
    moleculeId: "mol-paracetamol",
    moleculeSlug: "paracetamol",
    brandName: "Paracetamol (educational demo)",
    passages: [
      {
        level: "professional",
        title: "Professional insert excerpt (educational)",
        body: [
          "Paracetamol is an analgesic/antipyretic used within labelled maximum daily limits.",
          "Counsel patients about duplicate products (cold/flu combos) to avoid exceeding the daily maximum.",
          "Overdose risk is time-critical — early presentation matters even if the person feels well.",
          "Materia does not invent a mg maximum — confirm against the labelled product.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
      {
        level: "grade5",
        title: "Plain-language insert summary (Grade ~5)",
        body: [
          "Paracetamol helps with pain and fever. Do not take more than the label allows in one day.",
          "Check other cold or flu medicines — many also contain paracetamol.",
          "If too much was taken, get help even if you feel fine at first.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
    ],
  },
  {
    id: "insert-metformin",
    moleculeId: "mol-metformin",
    moleculeSlug: "metformin",
    brandName: "Metformin (educational)",
    passages: [
      {
        level: "professional",
        title: "Professional insert excerpt (educational)",
        body: [
          "Metformin is a biguanide used in type 2 diabetes within labelled indications.",
          "Counsel on gastrointestinal tolerability, sick-day rules, and when to escalate for lactic-acidosis warning signs.",
          "Materia does not invent a dose, titration schedule, or eGFR cut-off — confirm against the labelled product and current SA guidance.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
      {
        level: "grade5",
        title: "Plain-language insert summary (Grade ~5)",
        body: [
          "Metformin helps lower blood sugar in type 2 diabetes when your clinician chooses it.",
          "It can upset the stomach at first. Ask your pharmacist what to do if you are very sick with vomiting or dehydration.",
          "Take only as the label and your clinician say — Materia does not invent a dose.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
    ],
  },
  {
    id: "insert-warfarin",
    moleculeId: "mol-warfarin",
    moleculeSlug: "warfarin",
    brandName: "Warfarin (educational)",
    passages: [
      {
        level: "professional",
        title: "Professional insert excerpt (educational)",
        body: [
          "Warfarin is a vitamin K antagonist anticoagulant requiring monitoring and interaction checks.",
          "Counsel on bleeding signs, consistent vitamin K intake patterns, and not starting/stopping medicines without pharmacist or clinician review.",
          "Materia does not invent INR targets, loading doses, or bridging schedules — confirm against protocol and the labelled product.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
      {
        level: "grade5",
        title: "Plain-language insert summary (Grade ~5)",
        body: [
          "Warfarin helps stop harmful blood clots. Your blood tests help keep it in a safe range.",
          "Tell your pharmacist before starting any new medicine, herbal, or vitamin.",
          "Get urgent help for unusual bleeding or severe bruising. Materia does not invent a dose or blood-test number.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
    ],
  },
  {
    id: "insert-rifampicin",
    moleculeId: "mol-rifampicin",
    moleculeSlug: "rifampicin",
    brandName: "Rifampicin (educational)",
    passages: [
      {
        level: "professional",
        title: "Professional insert excerpt (educational)",
        body: [
          "Rifampicin is a rifamycin used in TB and selected other labelled indications.",
          "Counsel on orange-red body fluids, adherence, hepatotoxicity watch, and strong enzyme-induction interactions (including hormonal contraception).",
          "Materia does not invent weight-band doses or interaction dose changes — confirm against current SA TB/STG guidance and the labelled product.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
      {
        level: "grade5",
        title: "Plain-language insert summary (Grade ~5)",
        body: [
          "Rifampicin is a TB medicine. It can turn urine, tears, and sweat orange-red — this is expected.",
          "Take it every day as told. Tell your pharmacist about all other medicines — some become less effective.",
          "Report yellowing of the eyes, severe tummy pain, or unusual tiredness. Materia does not invent a dose.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
    ],
  },
  {
    id: "insert-ibuprofen",
    moleculeId: "mol-ibuprofen",
    moleculeSlug: "ibuprofen",
    brandName: "Ibuprofen (educational)",
    passages: [
      {
        level: "professional",
        title: "Professional insert excerpt (educational)",
        body: [
          "Ibuprofen is an NSAID analgesic/anti-inflammatory used within labelled limits and cautions.",
          "Counsel on GI bleed risk, renal caution, pregnancy trimester limits, and combinations with anticoagulants or other NSAIDs.",
          "Materia does not invent a maximum daily mg or dosing interval — confirm against the labelled product.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
      {
        level: "grade5",
        title: "Plain-language insert summary (Grade ~5)",
        body: [
          "Ibuprofen helps with pain, fever, and swelling. Take with food if your stomach is sensitive.",
          "Do not mix with other anti-inflammatory painkillers unless your clinician says so.",
          "Seek help for black stools, vomiting blood, or severe stomach pain. Materia does not invent a dose.",
        ].join(" "),
        publishState: "published",
        sourceId: INSERT_SOURCE,
        lastReviewed: "2026-07-30",
      },
    ],
  },
];

export function listInsertDocuments(docs: InsertDocument[] = INSERT_LIBRARY): InsertDocument[] {
  return docs.filter((d) => d.passages.some((p) => p.publishState === "published"));
}

export function findInsertDocument(
  input: { moleculeSlug?: string; moleculeId?: string; productId?: string },
  docs: InsertDocument[] = INSERT_LIBRARY,
): InsertDocument | null {
  const slug = input.moleculeSlug?.trim().toLowerCase();
  const molId = input.moleculeId?.trim();
  const productId = input.productId?.trim();
  return (
    docs.find((d) => productId && d.productId === productId) ??
    docs.find((d) => molId && d.moleculeId === molId) ??
    docs.find((d) => slug && d.moleculeSlug === slug) ??
    null
  );
}

export function availableInsertLevels(doc: InsertDocument, allowDraft = false): InsertReadingLevel[] {
  const levels: InsertReadingLevel[] = [];
  for (const p of doc.passages) {
    if (p.publishState === "published" || (allowDraft && p.publishState === "draft")) {
      if (!levels.includes(p.level)) levels.push(p.level);
    }
  }
  return levels;
}

export function translateInsert(input: {
  document: InsertDocument | null;
  level: InsertReadingLevel;
  sources?: Source[];
  allowDraft?: boolean;
}): InsertTranslateResult {
  const { document: doc, level, allowDraft = false } = input;
  if (!doc) {
    return {
      status: "unavailable",
      level,
      availableLevels: [],
      message:
        "No published educational insert excerpt for this molecule yet. Materia will not invent a plain-English rewrite.",
      disclaimer: DISCLAIMER,
    };
  }

  const availableLevels = availableInsertLevels(doc, allowDraft);
  const passage = doc.passages.find((p) => {
    if (p.level !== level) return false;
    return p.publishState === "published" || (allowDraft && p.publishState === "draft");
  });

  if (!passage) {
    return {
      status: "unavailable",
      level,
      availableLevels,
      message: `No published ${level === "grade5" ? "Grade-5" : "professional"} insert passage. Toggle only selects authored levels — nothing is auto-invented.`,
      disclaimer: DISCLAIMER,
    };
  }

  const source = input.sources?.find((s) => s.id === passage.sourceId);

  return {
    status: "ok",
    level,
    title: passage.title,
    body: passage.body,
    availableLevels,
    source,
    message: "Published educational insert passage for the selected reading level.",
    disclaimer: DISCLAIMER,
  };
}
