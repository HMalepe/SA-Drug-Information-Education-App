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
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antibiotic ena hantle kamoo e hlalositsoeng holabel ea hau.",
        "Bolella rakhemisi haeba u kile ua ba le allergy ea penicillin kapa beta-lactam.",
        "Qetella thero ntle le haeba ngaka ea hau e re u emise.",
        "Haeba u fumana lekhopho, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile yakho.",
        "Xelela usokhemisti ukuba wakhe waba ne-allergy ye-penicillin okanye ye-beta-lactam.",
        "Gqiba ikhosi ngaphandle kokuba ugqirha wakho athi uyeke.",
        "Ukuba ufumana irashi, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
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

/** Coverage helper for Academy / Insights — published SA counselling langs per molecule. */
export function counsellingCoverage(
  moleculeId: string,
): Array<{ lang: CounsellingLang; label: string; lineCount: number }> {
  return listCounsellingLangs(moleculeId).map((lang) => {
    const script = getCounsellingScript(moleculeId, lang)!;
    const label = COUNSELLING_LANGS.find((l) => l.code === lang)?.label ?? lang;
    return { lang, label, lineCount: script.lines.length };
  });
}
