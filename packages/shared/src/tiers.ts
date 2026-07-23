export type Tier = "free" | "student" | "professional" | "institution";

export type FeatureKey =
  | "molecule_lookup"
  | "academy_sample"
  | "academy_full"
  | "companion_schedule"
  | "companion_interaction_check"
  | "dose_calculator"
  | "substitution_sep"
  | "formulary_copay"
  | "locum_brief"
  | "cold_chain_notes"
  | "multilingual_counselling"
  | "offline_core"
  | "cpd_dashboard"
  | "voice_mode"
  | "vision_scan"
  | "institution_console"
  | "handout_export"
  | "ambassador_tools"
  | "shortage_alerts"
  | "clash_board"
  | "pearl_feed"
  | "ask_materia_unlimited"
  | "billing_manage";

const MATRIX: Record<Tier, FeatureKey[]> = {
  free: [
    "molecule_lookup",
    "academy_sample",
    "companion_schedule",
    "handout_export",
    "ambassador_tools",
    "ask_materia_unlimited",
  ],
  student: [
    "molecule_lookup",
    "academy_sample",
    "academy_full",
    "companion_schedule",
    "companion_interaction_check",
    "voice_mode",
    "handout_export",
    "ambassador_tools",
    "ask_materia_unlimited",
  ],
  professional: [
    "molecule_lookup",
    "academy_sample",
    "academy_full",
    "companion_schedule",
    "companion_interaction_check",
    "dose_calculator",
    "substitution_sep",
    "formulary_copay",
    "locum_brief",
    "cold_chain_notes",
    "multilingual_counselling",
    "offline_core",
    "cpd_dashboard",
    "voice_mode",
    "vision_scan",
    "handout_export",
    "ambassador_tools",
    "shortage_alerts",
    "clash_board",
    "pearl_feed",
    "ask_materia_unlimited",
    "billing_manage",
  ],
  institution: [
    "molecule_lookup",
    "academy_sample",
    "academy_full",
    "companion_schedule",
    "companion_interaction_check",
    "dose_calculator",
    "substitution_sep",
    "formulary_copay",
    "locum_brief",
    "cold_chain_notes",
    "multilingual_counselling",
    "offline_core",
    "cpd_dashboard",
    "voice_mode",
    "vision_scan",
    "institution_console",
    "handout_export",
    "ambassador_tools",
    "shortage_alerts",
    "clash_board",
    "pearl_feed",
    "ask_materia_unlimited",
    "billing_manage",
  ],
};

/** Launch hypothesis ZAR pricing (Doc 6) — not charged until Paystack wired. */
export const TIER_PRICES_ZAR: Record<Tier, { monthly: number; annual: number; label: string }> = {
  free: { monthly: 0, annual: 0, label: "Free" },
  student: { monthly: 39, annual: 390, label: "Student" },
  professional: { monthly: 129, annual: 1290, label: "Professional" },
  institution: { monthly: 0, annual: 0, label: "Institution (custom)" },
};

export function tierAllows(tier: Tier, feature: FeatureKey): boolean {
  return MATRIX[tier]?.includes(feature) ?? false;
}

export function gateFeature(tier: Tier, feature: FeatureKey): { allowed: boolean; upgradeTo?: Tier } {
  if (tierAllows(tier, feature)) return { allowed: true };
  if (tierAllows("student", feature)) return { allowed: false, upgradeTo: "student" };
  if (tierAllows("professional", feature)) return { allowed: false, upgradeTo: "professional" };
  return { allowed: false, upgradeTo: "professional" };
}
