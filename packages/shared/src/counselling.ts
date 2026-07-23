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
  "mol-doxy": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antibiotic exactly as directed on your labelled product.",
        "Dairy, antacids, and mineral supplements can reduce absorption — ask your pharmacist how to separate them from this medicine; Materia does not invent a spacing schedule.",
        "This class may increase sun sensitivity — use sun protection and check the label.",
        "If you get a severe rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic njengoba kubhalwe kumkhiqizo onelebula.",
        "Ubisi, ama-antacid, kanye nezithako zamaminerali kunganciphisa ukumunca — buza umkhiqizi wamaphilisi ukuthi uzihlukanise kanjani; i-Materia ayiqambi isikhathi.",
        "Lolu hlobo lungakhulisa ukuzwela ilanga — vikela isikhumba futhi uhlole ilebula.",
        "Uma uthola isikhumba esibi kakhulu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antibiotika soos op die geëtiketteerde produk aangedui.",
        "Suiwel, antasuurs en mineraalaanvullings kan absorpsie verminder — vra jou apteker hoe om dit te skei; Materia versin nie ’n tydskedule nie.",
        "Hierdie klas kan sonsensitiwiteit verhoog — beskerm jou vel en kontroleer die etiket.",
        "As jy ’n ernstige uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antibiotic ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Lebese, li-antacid le liminerale li ka fokotsa absorption — botsa rakhemisi hore u li arole ka mokhoa ofe; Materia ha e iqape nako.",
        "Sehlopha sena se ka eketsa ho utloa letsatsi haholo — sireletsa letlalo ’me u shebe leibole.",
        "Haeba u fumana lekhopho le tebileng, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Ubisi, ii-antacids kunye neziminerals zinokunciphisa ukufunxwa — buza usokhemisti indlela yokuzahlula; i-Materia ayiyiqiqi ixesha.",
        "Olu didi lunganyusa ukuziva ilanga — khuselani ulusu kwaye niqwalasele ileyibhile.",
        "Ukuba ufumana irashi eqatha, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-metro": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antimicrobial exactly as directed on your labelled product.",
        "Alcohol is commonly counselled against during and shortly after this course — confirm the labelled product and ask your pharmacist; Materia does not invent a duration.",
        "Metallic taste or mild stomach upset can occur — check the label and speak to your pharmacist if it worries you.",
        "If you get a severe rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antimicrobial njengoba kubhalwe kumkhiqizo onelebula.",
        "Utshwala kuvame ukwelulekwa ngakho ngesikhathi saleli khosi nangemva kwaso — qinisekisa ilebula futhi ubuze umkhiqizi; i-Materia ayiqambi isikhathi.",
        "Ukunambitha okufana nensimbi noma isisu esithambile kungenzeka — hlole ilebula futhi ukhulume nomkhiqizi uma ukhathazekile.",
        "Uma uthola isikhumba esibi kakhulu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antimikrobiese middel soos op die geëtiketteerde produk aangedui.",
        "Alkohol word dikwels afgeraai tydens en kort na hierdie kuur — bevestig die etiket en vra jou apteker; Materia versin nie ’n duur nie.",
        "’n Metaalsmaak of ligte maagongemak kan voorkom — kontroleer die etiket en praat met jou apteker as jy bekommerd is.",
        "As jy ’n ernstige uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antimicrobial ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Joala hangata ho eletsoa hore u e qobe nakong ea thero ena le haufinyane ka mor’a eona — netefatsa leibole ’me u botse rakhemisi; Materia ha e iqape nako.",
        "Tatso ea tšepe kapa ho opeloa ke mpeng ho ka etsahala — sheba leibole ’me u bue le rakhemisi haeba u tšoenyehile.",
        "Haeba u fumana lekhopho le tebileng, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antimicrobial ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Utywala kudla ngokucebiswa ukuba lungasetyenziswa ngexesha lekhosi nasekufutshane emva kwayo —qinisekisa ileyibhile kwaye ubuze usokhemisti; i-Materia ayiyiqiqi ixesha.",
        "Incasa yentsimbi okanye ukuqaqanjelwa kwesisu okuncinci kunokwenzeka —qwalasela ileyibhile kwaye uthethe nosokhemisti ukuba uyakhathazeka.",
        "Ukuba ufumana irashi eqatha, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-amoxclav": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this combination antibiotic exactly as directed on your labelled product.",
        "Tell your pharmacist if you have ever had a penicillin or beta-lactam allergy.",
        "Food may help if stomach upset occurs — still follow the labelled product; Materia does not invent a meal schedule.",
        "If you get a rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic ehlanganisiwe njengoba kubhalwe kumkhiqizo onelebula.",
        "Tshela umkhiqizi wamaphilisi uma wake waba ne-allergy ye-penicillin noma ye-beta-lactam.",
        "Ukudla kungasiza uma isisu sikhathaza — landela namanje umkhiqizo onelebula; i-Materia ayiqambi uhlelo lokudla.",
        "Uma uqala ukuba nesikhumba esibomvu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie kombinasie-antibiotika soos op die geëtiketteerde produk aangedui.",
        "Sê vir jou apteker as jy al ooit ’n penisillien- of beta-laktamienallergie gehad het.",
        "Kos kan help as jy maagongemak kry — volg steeds die geëtiketteerde produk; Materia versin nie ’n maaltydskedule nie.",
        "As jy ’n uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antibiotic ena e kopantsoeng hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Bolella rakhemisi haeba u kile ua ba le allergy ea penicillin kapa beta-lactam.",
        "Lijo li ka thusa haeba mpeng e o hloba — ntse u latele sehlahiswa se nang le leibole; Materia ha e iqape kemiso ea lijo.",
        "Haeba u fumana lekhopho, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic edibeneyo ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Xelela usokhemisti ukuba wakhe waba ne-allergy ye-penicillin okanye ye-beta-lactam.",
        "Ukutya kunokunceda ukuba isisu sikuxhalabisa — landela umkhiqizo oneleyibhile; i-Materia ayiyiqiqi ishedyuli yokutya.",
        "Ukuba ufumana irashi, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-cipro": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antibiotic exactly as directed on your labelled product.",
        "Dairy, antacids, and mineral supplements may affect absorption — ask your pharmacist how to separate them; Materia does not invent a spacing schedule.",
        "Fluoroquinolone counselling commonly includes sun protection and reporting unusual tendon pain — confirm against the labelled product.",
        "If you get a severe rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic njengoba kubhalwe kumkhiqizo onelebula.",
        "Ubisi, ama-antacid, kanye nezithako zamaminerali kungathinta ukumunca — buza umkhiqizi ukuthi uzihlukanise kanjani; i-Materia ayiqambi isikhathi.",
        "Ukwelulekwa kwe-fluoroquinolone kuvame ukufaka ukuvikela ilanga nokubika ubuhlungu bethendon obungajwayelekile — qinisekisa kumkhiqizo onelebula.",
        "Uma uthola isikhumba esibi kakhulu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antibiotika soos op die geëtiketteerde produk aangedui.",
        "Suiwel, antasuurs en mineraalaanvullings kan absorpsie beïnvloed — vra jou apteker hoe om dit te skei; Materia versin nie ’n tydskedule nie.",
        "Fluorokinoloon-berading sluit dikwels sonbeskerming en die aanmelding van ongewone peespyn in — bevestig teen die geëtiketteerde produk.",
        "As jy ’n ernstige uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antibiotic ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Lebese, li-antacid le liminerale li ka ama absorption — botsa rakhemisi hore u li arole joang; Materia ha e iqape nako.",
        "Keletso ea fluoroquinolone hangata e kenyelletsa tšireletso ea letsatsi le ho tlaleha bohloko ba tendon bo sa tloaelehang — netefatsa holabel.",
        "Haeba u fumana lekhopho le tebileng, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Ubisi, ii-antacids kunye neziminerals zinokuchaphazela ukufunxwa — buza usokhemisti indlela yokuzahlula; i-Materia ayiyiqiqi ixesha.",
        "Iingcebiso ze-fluoroquinolone zihlala zibandakanya ukukhusela ilanga nokuxela iintlungu ze-tendon ezingaqhelekanga — qinisekisa kwileyibhile.",
        "Ukuba ufumana irashi eqatha, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
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

/** Molecules with at least one published counselling language (SA moat coverage). */
export function listMoleculesWithPublishedCounselling(): string[] {
  return Object.keys(SCRIPTS).filter((id) => listCounsellingLangs(id).length > 0);
}
