/**
 * Build Spec §7.3 — Build the Treatment mini-game.
 * Authored educational cases only. Learners pick a therapeutic class;
 * explanations teach reasoning after — never invent doses or regimens.
 */

export interface TreatmentOption {
  id: string;
  label: string;
}

export interface TreatmentCase {
  id: string;
  title: string;
  /** Educational vignette — demographics + comorbidities, no prescribed doses */
  vignette: string;
  /** What the learner is choosing (class / approach), not a product or dose */
  prompt: string;
  options: TreatmentOption[];
  correctOptionId: string;
  /** Teaching explanation shown after grade (right or wrong) */
  explanation: string;
  /** Optional molecule to deepen on after the round */
  relatedMoleculeSlug?: string;
  publishState: "published" | "draft";
  sourceNote: string;
}

export interface TreatmentRound {
  roundId: string;
  case: Omit<TreatmentCase, "correctOptionId" | "explanation">;
  note: string;
  disclaimer: string;
}

export interface TreatmentGrade {
  correct: boolean;
  correctOptionId: string;
  chosenOptionId: string;
  explanation: string;
  message: string;
  relatedMoleculeSlug?: string;
}

const DISCLAIMER =
  "Build the Treatment is an educational class-selection exercise. It does not prescribe, dose, or replace clinical judgement.";

/** Original Materia Academy fixtures — not copied from SAMF/MIMS/Lexicomp. */
export const BUILD_TREATMENT_LIBRARY: TreatmentCase[] = [
  {
    id: "bt-ckd-htn-ace",
    title: "Older adult with T2DM, hypertension, and CKD",
    vignette:
      "A 72-year-old with type 2 diabetes, long-standing hypertension, and reduced kidney function is being reviewed for blood-pressure class choice in an educational case discussion. No product or dose is set here.",
    prompt: "Which antihypertensive class is classically discussed first for this comorbidity pattern (education only)?",
    options: [
      { id: "ace", label: "ACE inhibitor" },
      { id: "nsaid", label: "NSAID for BP control" },
      { id: "stimulant", label: "CNS stimulant" },
      { id: "macrolide", label: "Macrolide antibiotic" },
    ],
    correctOptionId: "ace",
    explanation:
      "Teaching point: ACE inhibitors (and often ARBs) are the class usually discussed when hypertension coexists with diabetes and CKD — because of renal and cardiovascular teaching themes. This is class reasoning only; the clinician still chooses the labelled product, dose, and monitoring. An NSAID is not a BP class and can worsen kidney risk in teaching scenarios.",
    relatedMoleculeSlug: "enalapril",
    publishState: "published",
    sourceNote: "Materia Academy teaching fixture (ACE + diabetes/CKD class pattern)",
  },
  {
    id: "bt-gout-avoid-thia",
    title: "Hypertension with recurrent gout",
    vignette:
      "A middle-aged adult with hypertension also has recurrent gout flares. The case is about which BP class to avoid discussing as first-line in this teaching vignette — not about starting a medicine today.",
    prompt: "Which class is typically flagged as less ideal first-line when gout is active (education only)?",
    options: [
      { id: "thiazide", label: "Thiazide diuretic" },
      { id: "ace", label: "ACE inhibitor" },
      { id: "arb", label: "Angiotensin receptor blocker" },
      { id: "ccb", label: "Dihydropyridine calcium-channel blocker" },
    ],
    correctOptionId: "thiazide",
    explanation:
      "Teaching point: thiazide diuretics are often discussed as potentially raising uric acid and complicating gout — so they are commonly deprioritised in educational ‘gout + HTN’ cases. ACE/ARB/CCB are the classes more often kept on the teaching shortlist. Confirm any real choice against guidelines, labels, and the clinician’s plan — Materia does not invent a regimen.",
    relatedMoleculeSlug: "hydrochlorothiazide",
    publishState: "published",
    sourceNote: "Materia Academy teaching fixture (thiazide vs gout counselling pattern)",
  },
  {
    id: "bt-asthma-avoid-nsaid",
    title: "Analgesia with asthma and nasal polyps",
    vignette:
      "An adult with asthma and a history of nasal polyps needs an educational discussion of analgesic class risk — not a prescription.",
    prompt: "Which analgesic class is classically cautioned in aspirin-exacerbated respiratory disease teaching?",
    options: [
      { id: "nsaid", label: "Non-selective NSAID" },
      { id: "para", label: "Paracetamol (when labelled appropriate)" },
      { id: "ppi", label: "Proton pump inhibitor" },
      { id: "statin", label: "Statin" },
    ],
    correctOptionId: "nsaid",
    explanation:
      "Teaching point: non-selective NSAIDs are the class classically linked to aspirin-exacerbated respiratory disease patterns (asthma ± nasal polyps). Paracetamol is often discussed as a relatively safer labelled alternative when appropriate — still product- and patient-specific. PPIs and statins are not analgesic classes here.",
    relatedMoleculeSlug: "ibuprofen",
    publishState: "published",
    sourceNote: "Materia Academy teaching fixture (NSAID + AERD awareness)",
  },
  {
    id: "bt-uti-nitro-context",
    title: "Uncomplicated lower UTI counselling class",
    vignette:
      "A non-pregnant adult with symptoms consistent with uncomplicated cystitis in a teaching case. Focus on which antimicrobial class/agent family is commonly discussed for uncomplicated lower UTI education in SA primary care — not on inventing a course length.",
    prompt: "Which option best matches a commonly taught first-line class/agent family for uncomplicated cystitis education?",
    options: [
      { id: "nitrofuran", label: "Nitrofuran antibacterial (e.g. nitrofurantoin family)" },
      { id: "fluoro_systemic_first", label: "Systemic fluoroquinolone as default first teaching choice" },
      { id: "macrolide", label: "Macrolide antibiotic" },
      { id: "azole", label: "Azole antifungal" },
    ],
    correctOptionId: "nitrofuran",
    explanation:
      "Teaching point: nitrofuran antibacterials (nitrofurantoin family) are frequently taught for uncomplicated cystitis when local guidance and the labelled product allow. Fluoroquinolones are generally reserved in stewardship teaching, not default first-line education. Macrolides and azoles are the wrong class families for this vignette. Always confirm against local guidelines and the product insert — Materia does not invent dose or duration.",
    relatedMoleculeSlug: "nitrofurantoin",
    publishState: "published",
    sourceNote: "Materia Academy teaching fixture (UTI class stewardship pattern)",
  },
  {
    id: "bt-warfarin-bleed",
    title: "Pain relief while on warfarin",
    vignette:
      "An adult anticoagulated with warfarin needs educational discussion of analgesic class risk for bleeding — no INR target or dose is stated.",
    prompt: "Which analgesic class is typically flagged for bleeding-risk review with warfarin (education only)?",
    options: [
      { id: "nsaid", label: "NSAID" },
      { id: "para", label: "Paracetamol (labelled use, still check product)" },
      { id: "ppi", label: "Proton pump inhibitor as the analgesic" },
      { id: "ace", label: "ACE inhibitor as the analgesic" },
    ],
    correctOptionId: "nsaid",
    explanation:
      "Teaching point: NSAIDs are the class usually flagged for additive bleeding risk with warfarin and need clinical review. Paracetamol is often discussed as a labelled alternative when appropriate — still verify the product and the care plan. PPIs and ACE inhibitors are not analgesics.",
    relatedMoleculeSlug: "warfarin",
    publishState: "published",
    sourceNote: "Materia Academy teaching fixture (warfarin + NSAID bleeding pattern)",
  },
  {
    id: "bt-draft-hidden",
    title: "Draft case",
    vignette: "Should never appear.",
    prompt: "Hidden",
    options: [{ id: "x", label: "X" }],
    correctOptionId: "x",
    explanation: "Draft only.",
    publishState: "draft",
    sourceNote: "Draft only",
  },
];

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function listPublishedTreatmentCases(
  library: TreatmentCase[] = BUILD_TREATMENT_LIBRARY,
): TreatmentCase[] {
  return library.filter((c) => c.publishState === "published");
}

export function buildTreatmentRound(input: {
  seed: string;
  library?: TreatmentCase[];
  roundId?: string;
}): TreatmentRound | null {
  const pool = listPublishedTreatmentCases(input.library);
  if (pool.length === 0) return null;
  const c = pool[hashSeed(input.seed) % pool.length]!;
  return {
    roundId: input.roundId ?? `bt-${hashSeed(input.seed).toString(16)}`,
    case: {
      id: c.id,
      title: c.title,
      vignette: c.vignette,
      prompt: c.prompt,
      options: c.options,
      relatedMoleculeSlug: c.relatedMoleculeSlug,
      publishState: c.publishState,
      sourceNote: c.sourceNote,
    },
    note: "Pick the best educational class/approach. Reasoning unlocks after you submit — not a prescription.",
    disclaimer: DISCLAIMER,
  };
}

export function gradeBuildTreatment(input: {
  caseId: string;
  chosenOptionId: string;
  library?: TreatmentCase[];
}): TreatmentGrade | { error: string } {
  const c = listPublishedTreatmentCases(input.library).find((x) => x.id === input.caseId);
  if (!c) return { error: "Unknown or unpublished Build the Treatment case." };
  const known = c.options.some((o) => o.id === input.chosenOptionId);
  if (!known) return { error: "Choice is not one of the case options." };
  const correct = input.chosenOptionId === c.correctOptionId;
  return {
    correct,
    correctOptionId: c.correctOptionId,
    chosenOptionId: input.chosenOptionId,
    explanation: c.explanation,
    relatedMoleculeSlug: c.relatedMoleculeSlug,
    message: correct
      ? "Solid class reasoning — read the teaching note to lock it in."
      : "Not the teaching answer — the explanation shows the class logic, then try another case.",
  };
}
