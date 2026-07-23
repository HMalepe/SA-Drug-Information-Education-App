export type CounsellingLang = "en" | "zu" | "af" | "st" | "xh";

export const COUNSELLING_LANGS: Array<{ code: CounsellingLang; label: string }> = [
  { code: "en", label: "English" },
  { code: "zu", label: "isiZulu" },
  { code: "af", label: "Afrikaans" },
  { code: "st", label: "Sesotho" },
  { code: "xh", label: "isiXhosa" },
];

export interface CounsellingScript {
  lang: CounsellingLang;
  lines: string[];
  sourceNote: string;
  publishState: "published" | "draft";
}

/**
 * Multilingual counselling — original Materia scripts only.
 * Draft languages must not be shown as verified clinical translation until founder review.
 */
const SCRIPTS: Record<string, Partial<Record<CounsellingLang, CounsellingScript>>> = {
  "mol-amox": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antibiotic exactly as directed on your label.",
        "Tell your pharmacist if you have ever had a penicillin or beta-lactam allergy.",
        "Finish the course unless your clinician tells you to stop.",
        "If you get a rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic njengoba kubhalwe kulebula yakho.",
        "Tshela umkhiqizi wamaphilisi uma wake waba ne-allergy ye-penicillin.",
        "Qeda ikhosi ngaphandle uma udokotela noma umkhiqizi ethi uma.",
        "Uma uqala ukuba nesikhumba esibomvu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antibiotika soos op jou etiket aangedui.",
        "Sê vir jou apteker as jy al ooit ’n penisillien-allergie gehad het.",
        "Voltooi die kuur tensy jou klinikus sê jy moet stop.",
        "As jy ’n uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "draft",
      sourceNote: "Draft Sesotho — awaiting founder native-speaker review before publish",
      lines: [
        "[Draft] Sebelisa antibiotic kamoo e hlalositsoeng ho label.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "draft",
      sourceNote: "Draft isiXhosa — awaiting founder native-speaker review before publish",
      lines: [
        "[Draft] Sebenzisa i-antibiotic njengoko kubhaliwe kwileyibhile yakho.",
      ],
    },
  },
};

export function getCounsellingScript(
  moleculeId: string,
  lang: CounsellingLang,
  allowDraft = false,
): CounsellingScript | null {
  const script = SCRIPTS[moleculeId]?.[lang];
  if (!script) return null;
  if (script.publishState !== "published" && !allowDraft) return null;
  return script;
}

export function listCounsellingLangs(moleculeId: string): CounsellingLang[] {
  const entry = SCRIPTS[moleculeId];
  if (!entry) return [];
  return (Object.keys(entry) as CounsellingLang[]).filter(
    (l) => entry[l]?.publishState === "published",
  );
}
