import type { Medicine360TabId, UserMode } from "./types.js";

/**
 * Build Spec §5.7 — Patient / Pharmacist (and student/doctor) lenses.
 * Same molecule, different depth and vocabulary. Never invents clinical facts —
 * only framing and emphasis around published content.
 */

export const USER_MODES = ["patient", "student", "pharmacist", "doctor"] as const;

export const MODE_STORAGE_KEY = "materia.userMode";

export type ModeVocabulary = "plain" | "learner" | "clinical" | "prescriber";

export interface ModeLens {
  mode: UserMode;
  label: string;
  shortLabel: string;
  vocabulary: ModeVocabulary;
  defaultTab: Medicine360TabId;
  /** What this lens emphasises (educational copy only). */
  emphasizes: string[];
  framing: {
    chemistry: string;
    moa: string;
    dosing: string;
    warnings: string;
    pearls: string;
    counselling: string;
    contraindications: string;
  };
  /** Tabs that are professional-depth; patient lens gets a soft note, not hidden facts. */
  professionalDepthTabs: Medicine360TabId[];
}

const LENSES: Record<UserMode, ModeLens> = {
  patient: {
    mode: "patient",
    label: "Patient mode",
    shortLabel: "Patient",
    vocabulary: "plain",
    defaultTab: "counselling",
    emphasizes: ["how to take", "counselling", "food & lifestyle", "when to seek help"],
    framing: {
      chemistry: "Plain overview — ask your pharmacist if a detail is unclear.",
      moa: "In simple terms: how this medicine works in the body.",
      dosing: "Published educational dosing only. Confirm the right dose for you with a pharmacist or doctor — Materia does not invent numbers.",
      warnings: "Important cautions in plain language. Speak to a pharmacist or doctor about your own situation.",
      pearls: "These notes are written for professionals. Use counselling points for everyday how-to-take guidance.",
      counselling: "Patient lens: plain-language how-to-take and what to tell your pharmacist.",
      contraindications: "Situations where this medicine is usually avoided — confirm with a clinician; do not self-decide.",
    },
    professionalDepthTabs: ["pearls", "chemistry", "moa", "dosing"],
  },
  student: {
    mode: "student",
    label: "Student mode",
    shortLabel: "Student",
    vocabulary: "learner",
    defaultTab: "moa",
    emphasizes: ["mechanism", "Academy quiz", "SA brands", "counselling practice"],
    framing: {
      chemistry: "Learner depth — link structure ideas to class teaching.",
      moa: "Focus here first: mechanism before brands and dosing.",
      dosing: "Study the published ranges; calculator rules appear only when reviewed DoseRules exist.",
      warnings: "Learn monitoring cues you will counsel on later.",
      pearls: "Exam- and counter-ready teaching points from published pearls.",
      counselling: "Practise the counter script — patient-facing language with clinical anchors.",
      contraindications: "Traffic-light avoid / caution patterns for study — always check the sourced record.",
    },
    professionalDepthTabs: ["pearls", "dosing"],
  },
  pharmacist: {
    mode: "pharmacist",
    label: "Pharmacist mode",
    shortLabel: "Pharmacist",
    vocabulary: "clinical",
    defaultTab: "dosing",
    emphasizes: ["monitoring", "substitution", "excipients", "counselling script", "SEP"],
    framing: {
      chemistry: "Clinical depth — formulation and chemistry context for the counter.",
      moa: "Mechanism framing for counselling and interaction reasoning.",
      dosing: "Published dosing fields for counselling support. Numeric calculator refuses unpublished rules.",
      warnings: "Monitoring and caution lens — match to the patient's history before dispensing.",
      pearls: "Clinical pearls for the counter and locum briefs.",
      counselling: "Pharmacist lens: counselling script for the counter.",
      contraindications: "Contraindication checklist — confirm against labelled product and current guidance.",
    },
    professionalDepthTabs: [],
  },
  doctor: {
    mode: "doctor",
    label: "Doctor mode",
    shortLabel: "Doctor",
    vocabulary: "prescriber",
    defaultTab: "dosing",
    emphasizes: ["dosing adjustments", "interactions", "pregnancy", "monitoring"],
    framing: {
      chemistry: "Prescriber depth — kinetics-adjacent context when published.",
      moa: "Mechanism for differential and interaction reasoning.",
      dosing: "Published adjustment fields (renal/hepatic/geriatric) when available — confirm clinically; no invented schedules.",
      warnings: "Monitoring and specialist-caution framing for follow-up.",
      pearls: "Prescriber-facing published pearls — not a substitute for clinical judgement.",
      counselling: "Points you may reinforce with the patient after prescribing.",
      contraindications: "Avoid / specialist-only patterns from published facts.",
    },
    professionalDepthTabs: [],
  },
};

export function parseUserMode(raw: unknown, fallback: UserMode = "pharmacist"): UserMode {
  if (typeof raw !== "string") return fallback;
  const v = raw.trim().toLowerCase();
  return (USER_MODES as readonly string[]).includes(v) ? (v as UserMode) : fallback;
}

export function getModeLens(mode: UserMode | string | undefined): ModeLens {
  return LENSES[parseUserMode(mode)];
}

export function isProfessionalDepthTab(mode: UserMode, tabId: Medicine360TabId): boolean {
  return getModeLens(mode).professionalDepthTabs.includes(tabId);
}

/** Vocabulary depth flag for Chemistry / similar tabs. */
export function modeContentDepth(mode: UserMode): "plain" | "clinical" {
  const v = getModeLens(mode).vocabulary;
  return v === "plain" ? "plain" : "clinical";
}
