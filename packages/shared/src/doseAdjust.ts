import type { Source } from "./types.js";

/**
 * Build Spec §8.5 — Dose-Adjustment Assistant.
 * Explains WHY adjustment may be needed and surfaces published guidance only.
 * Never invents a numeric adjusted dose or schedule.
 */

const DISCLAIMER =
  "Materia is a reference and education tool, not a medical device. " +
  "Adjustment guidance must be confirmed by a qualified clinician before use. " +
  "It does not direct treatment for a specific patient.";

export type AdjustContext =
  | "renal"
  | "hepatic"
  | "geriatric"
  | "pregnancy"
  | "dialysis"
  | "obesity"
  | "underweight";

/** Educational GFR bands (teaching labels) — not a diagnosis. */
export type RenalBand =
  | "normal_or_high"
  | "mild"
  | "moderate"
  | "severe"
  | "kidney_failure";

export interface PublishedAdjustmentGuidance {
  renal?: string | null;
  hepatic?: string | null;
  geriatric?: string | null;
  pregnancy?: string | null;
  source?: Source | null;
}

export interface DoseAdjustRequest {
  moleculeId: string;
  moleculeName?: string;
  context: AdjustContext;
  /** Optional eGFR (mL/min/1.73m²) or CrCl-style estimate for renal/dialysis framing */
  egfrMlMin?: number;
  clinicallyConfirmed: boolean;
  published: PublishedAdjustmentGuidance;
}

export type DoseAdjustStatus = "ok" | "needs_confirmation" | "unavailable" | "refused";

export interface DoseAdjustResult {
  status: DoseAdjustStatus;
  disclaimer: string;
  context: AdjustContext;
  whyAdjust: string;
  renalBand?: RenalBand;
  renalBandNote?: string;
  publishedGuidance?: string;
  working: string[];
  message: string;
  source?: Source;
  /** Always null — assistant never invents mg/schedule changes */
  inventedAdjustedDose: null;
}

const WHY: Record<AdjustContext, string> = {
  renal:
    "Kidney function changes how many medicines are cleared. Published renal notes matter when eGFR/CrCl is reduced — confirm the labelled recommendation clinically.",
  hepatic:
    "Hepatic impairment can alter metabolism and exposure. Use published hepatic notes only — do not invent a new dose.",
  geriatric:
    "Older adults may need caution for clearance, frailty, and polypharmacy. Surface published geriatric notes; confirm clinically.",
  pregnancy:
    "Pregnancy changes risk–benefit framing. Published pregnancy notes are educational — obstetric clinical judgement required.",
  dialysis:
    "Dialysis timing and clearance differ by medicine and modality. Without a published dialysis note, Materia refuses to invent one.",
  obesity:
    "Weight-based and fixed dosing behave differently in obesity. Without a published obesity note, Materia will not invent an adjusted figure.",
  underweight:
    "Low body weight can change exposure for some medicines. Without a published underweight note, Materia will not invent an adjusted figure.",
};

export function classifyEgfr(egfrMlMin: number): RenalBand | null {
  if (!Number.isFinite(egfrMlMin) || egfrMlMin <= 0 || egfrMlMin > 200) return null;
  if (egfrMlMin >= 90) return "normal_or_high";
  if (egfrMlMin >= 60) return "mild";
  if (egfrMlMin >= 30) return "moderate";
  if (egfrMlMin >= 15) return "severe";
  return "kidney_failure";
}

export function renalBandLabel(band: RenalBand): string {
  switch (band) {
    case "normal_or_high":
      return "Educational band: normal or high GFR (≥90)";
    case "mild":
      return "Educational band: mild decrease (60–89)";
    case "moderate":
      return "Educational band: moderate decrease (30–59)";
    case "severe":
      return "Educational band: severe decrease (15–29)";
    case "kidney_failure":
      return "Educational band: kidney failure (<15) — dialysis context may apply";
  }
}

function guidanceFor(
  context: AdjustContext,
  published: PublishedAdjustmentGuidance,
): string | null {
  switch (context) {
    case "renal":
    case "dialysis":
      return published.renal?.trim() || null;
    case "hepatic":
      return published.hepatic?.trim() || null;
    case "geriatric":
      return published.geriatric?.trim() || null;
    case "pregnancy":
      return published.pregnancy?.trim() || null;
    case "obesity":
    case "underweight":
      return null;
  }
}

export function assistDoseAdjustment(req: DoseAdjustRequest): DoseAdjustResult {
  const whyAdjust = WHY[req.context];
  const baseWorking = [
    `Molecule: ${req.moleculeName ?? req.moleculeId}`,
    `Context: ${req.context}`,
    `Why this context matters: ${whyAdjust}`,
  ];

  let renalBand: RenalBand | undefined;
  let renalBandNote: string | undefined;
  if (req.context === "renal" || req.context === "dialysis") {
    if (req.egfrMlMin != null) {
      const band = classifyEgfr(req.egfrMlMin);
      if (!band) {
        return {
          status: "refused",
          disclaimer: DISCLAIMER,
          context: req.context,
          whyAdjust,
          working: baseWorking,
          message: "eGFR/CrCl must be a realistic positive number (mL/min).",
          inventedAdjustedDose: null,
        };
      }
      renalBand = band;
      renalBandNote = renalBandLabel(band);
      baseWorking.push(`Input eGFR/CrCl-style value: ${req.egfrMlMin}`, renalBandNote);
    } else {
      baseWorking.push("No eGFR entered — band classification skipped; published renal text only.");
    }
  }

  const publishedGuidance = guidanceFor(req.context, req.published);
  if (!publishedGuidance) {
    return {
      status: "unavailable",
      disclaimer: DISCLAIMER,
      context: req.context,
      whyAdjust,
      renalBand,
      renalBandNote,
      working: [
        ...baseWorking,
        "No published adjustment text for this context.",
        "Materia will not invent an adjusted dose or schedule.",
      ],
      message:
        "No published, sourced adjustment guidance for this context. Materia will not invent a dose change.",
      inventedAdjustedDose: null,
    };
  }

  const source = req.published.source ?? undefined;
  if (source) {
    baseWorking.push(`Source: ${source.citation} · reviewed ${source.lastReviewed}`);
  }
  baseWorking.push(`Published guidance: ${publishedGuidance}`);
  baseWorking.push("No numeric adjusted dose is calculated by this assistant.");

  if (!req.clinicallyConfirmed) {
    return {
      status: "needs_confirmation",
      disclaimer: DISCLAIMER,
      context: req.context,
      whyAdjust,
      renalBand,
      renalBandNote,
      publishedGuidance,
      working: [
        ...baseWorking,
        "Clinical confirmation required before the published guidance panel is treated as reviewed.",
      ],
      message: "Tick clinical confirmation to acknowledge you will verify before acting.",
      source,
      inventedAdjustedDose: null,
    };
  }

  return {
    status: "ok",
    disclaimer: DISCLAIMER,
    context: req.context,
    whyAdjust,
    renalBand,
    renalBandNote,
    publishedGuidance,
    working: baseWorking,
    message:
      "Published adjustment notes shown. Confirm against the labelled product and current guidance — no invented mg/schedule.",
    source,
    inventedAdjustedDose: null,
  };
}
