import type { DoseCalcRequest, DoseCalcResult, Source, SourcedFact } from "./types.js";
import { renderableFact } from "./publish.js";
import { buildToxicityTimeline, type ToxicityTimelineView } from "./toxicityTimeline.js";

const DISCLAIMER =
  "Materia is a reference and education tool, not a medical device. " +
  "This calculation must be confirmed by a qualified clinician before use. " +
  "It does not direct treatment for a specific patient.";

export interface DoseRule {
  indicationKey: string;
  /** Placeholder-friendly: mg per kg per dose — only used when fact is published */
  mgPerKgPerDose?: number;
  maxMgPerDose?: number;
  frequencyNote: string;
  displayTemplate: string;
  fact: SourcedFact<string>;
  source: Source;
}

/**
 * Governed calculator (constitution 3.4): show working + require clinical confirmation.
 * Never invent rules — only published DoseRule facts may compute.
 */
export function calculateDose(req: DoseCalcRequest, rules: DoseRule[]): DoseCalcResult {
  if (!Number.isFinite(req.weightKg) || req.weightKg <= 0 || req.weightKg > 300) {
    return {
      status: "refused",
      disclaimer: DISCLAIMER,
      message: "Weight must be a realistic positive number (kg).",
    };
  }

  const rule = rules.find((r) => r.indicationKey === req.indicationKey);
  const fact = rule ? renderableFact(rule.fact) : undefined;

  if (!rule || !fact || rule.mgPerKgPerDose == null) {
    return {
      status: "unavailable",
      disclaimer: DISCLAIMER,
      message:
        "No published, sourced dosing rule for this indication. Materia will not invent a dose.",
    };
  }

  if (!req.clinicallyConfirmed) {
    return {
      status: "needs_confirmation",
      disclaimer: DISCLAIMER,
      working: [
        `Indication key: ${rule.indicationKey}`,
        `Published rule text: ${fact.value}`,
        `Source: ${rule.source.citation} (reviewed ${rule.source.lastReviewed})`,
        "Clinical confirmation required before a calculated figure is shown.",
      ],
      message: "Tick clinical confirmation to reveal the calculated working dose.",
      source: rule.source,
    };
  }

  const raw = req.weightKg * rule.mgPerKgPerDose;
  const capped = rule.maxMgPerDose != null ? Math.min(raw, rule.maxMgPerDose) : raw;
  const rounded = Math.round(capped * 10) / 10;

  const working = [
    `Weight = ${req.weightKg} kg`,
    `Published factor = ${rule.mgPerKgPerDose} mg/kg/dose`,
    `Raw = ${req.weightKg} × ${rule.mgPerKgPerDose} = ${raw} mg`,
    rule.maxMgPerDose != null
      ? `Apply max ${rule.maxMgPerDose} mg/dose → ${capped} mg`
      : "No max cap in published rule",
    `Frequency note: ${rule.frequencyNote}`,
    `Source: ${rule.source.citation} · last reviewed ${rule.source.lastReviewed}`,
  ];

  return {
    status: "ok",
    working,
    suggestedDoseDisplay: rule.displayTemplate.replace("{dose}", String(rounded)),
    source: rule.source,
    disclaimer: DISCLAIMER,
  };
}

/** Fixed safe overdose emergency template (Build Spec §8.6) — structure only. */
export interface OverdoseEmergencyView {
  earlySigns: string;
  severeSigns: string;
  antidoteOrSupportive: string;
  whatToDo: string[];
  callEmergency: string;
  disclaimer: string;
  /** Build Spec §8.7 educational arc */
  toxicityTimeline: ToxicityTimelineView;
}

export function buildOverdoseEmergencyTemplate(parts: {
  earlySigns?: string;
  severeSigns?: string;
  antidoteOrSupportive?: string;
  moleculeLabel?: string;
}): OverdoseEmergencyView {
  return {
    earlySigns: parts.earlySigns ?? "Not yet published — do not guess early signs.",
    severeSigns: parts.severeSigns ?? "Not yet published — do not guess severe signs.",
    antidoteOrSupportive:
      parts.antidoteOrSupportive ??
      "No published antidote guidance yet. Empty state: management may be supportive — confirm with emergency services / poison information.",
    whatToDo: [
      "Call emergency services / your local poison information centre immediately.",
      "Do not induce vomiting unless a clinician instructs you to.",
      "Take the medicine packaging / name with you.",
      "Materia stops at first aid — it does not manage overdose.",
    ],
    callEmergency: "Emergency: dial your local emergency number now if the person is unwell.",
    disclaimer: DISCLAIMER,
    toxicityTimeline: buildToxicityTimeline({ moleculeLabel: parts.moleculeLabel }),
  };
}
