/**
 * Build Spec §8.7 — Toxicity Timeline (educational arc).
 * Teaches that feeling fine early does not mean safe.
 * Default milestones are a teaching template, not molecule-specific clinical timing,
 * unless overridden by published custom milestones.
 */

export interface ToxicityMilestone {
  offsetLabel: string;
  offsetMinutes: number;
  title: string;
  teachingPoint: string;
}

export interface ToxicityTimelineView {
  milestones: ToxicityMilestone[];
  headline: string;
  educationalOnly: true;
  note: string;
}

/** Spec illustrative arc — educational placeholders until molecule-specific times are published. */
export const DEFAULT_TOXICITY_MILESTONES: ToxicityMilestone[] = [
  {
    offsetLabel: "0 min",
    offsetMinutes: 0,
    title: "Swallowed / exposed",
    teachingPoint: "Clock starts at exposure — early wellness does not equal safety.",
  },
  {
    offsetLabel: "30 min",
    offsetMinutes: 30,
    title: "Absorption may begin",
    teachingPoint: "Teaching marker: many oral medicines start absorbing in this window — not a diagnosis.",
  },
  {
    offsetLabel: "2 h",
    offsetMinutes: 120,
    title: "Symptoms may appear",
    teachingPoint: "Teaching marker: watch for early signs from the published overdose fields when available.",
  },
  {
    offsetLabel: "6 h",
    offsetMinutes: 360,
    title: "Organ-injury risk window (teaching)",
    teachingPoint: "Feeling well mid-course can still precede later harm — escalate via emergency services.",
  },
  {
    offsetLabel: "24 h",
    offsetMinutes: 1440,
    title: "Highest-risk teaching window",
    teachingPoint: "Illustrative peak-risk arc for education — confirm molecule-specific toxicology clinically.",
  },
  {
    offsetLabel: "72 h",
    offsetMinutes: 4320,
    title: "Recovery / ongoing monitoring",
    teachingPoint: "Some toxicities need days of observation — Materia does not manage overdose.",
  },
];

export function buildToxicityTimeline(input?: {
  moleculeLabel?: string;
  /** Only pass when sourced & published — never invent molecule timings. */
  publishedMilestones?: ToxicityMilestone[] | null;
}): ToxicityTimelineView {
  const custom = input?.publishedMilestones?.filter(
    (m) =>
      typeof m.offsetLabel === "string" &&
      typeof m.title === "string" &&
      typeof m.teachingPoint === "string" &&
      Number.isFinite(m.offsetMinutes),
  );
  const usingCustom = Boolean(custom && custom.length >= 3);
  const milestones = usingCustom ? custom! : DEFAULT_TOXICITY_MILESTONES;
  const label = input?.moleculeLabel?.trim() || "this medicine";

  return {
    milestones,
    headline: `Toxicity timeline (educational) — ${label}`,
    educationalOnly: true,
    note: usingCustom
      ? "Published molecule-specific milestones. Still educational — call emergency / Poisons Centre for real exposures."
      : "Default teaching arc from Build Spec §8.7 — not molecule-specific clinical timing. Empty custom times are intentional until reviewed.",
  };
}
