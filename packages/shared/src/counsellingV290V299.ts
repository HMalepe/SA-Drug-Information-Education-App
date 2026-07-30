/**
 * v290–v299 deepened SA counselling batch (6 lines × 5 langs) — vaccines.
 * Original Materia educational scripts only — no invented doses, schedule ages, hours, or titres.
 * Types kept local to avoid circular import with counselling.ts.
 */

export type ExtLang = "en" | "zu" | "af" | "st" | "xh";

export interface ExtScript {
  lang: ExtLang;
  lines: string[];
  sourceNote: string;
  publishState: "published" | "draft";
}

const EN_NOTE = "Materia original counselling — founder-reviewed educational layer";
const ZU_NOTE = "Materia original isiZulu counselling — founder-reviewed educational layer";
const AF_NOTE = "Materia original Afrikaans counselling — founder-reviewed educational layer";
const ST_NOTE = "Materia original Sesotho counselling — founder-reviewed educational layer";
const XH_NOTE = "Materia original isiXhosa counselling — founder-reviewed educational layer";

function five(
  en: string[],
  zu: string[],
  af: string[],
  st: string[],
  xh: string[],
): Partial<Record<ExtLang, ExtScript>> {
  return {
    en: { lang: "en", publishState: "published", sourceNote: EN_NOTE, lines: en },
    zu: { lang: "zu", publishState: "published", sourceNote: ZU_NOTE, lines: zu },
    af: { lang: "af", publishState: "published", sourceNote: AF_NOTE, lines: af },
    st: { lang: "st", publishState: "published", sourceNote: ST_NOTE, lines: st },
    xh: { lang: "xh", publishState: "published", sourceNote: XH_NOTE, lines: xh },
  };
}

export const COUNSELLING_V290_TO_V299: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-hep-b-vaccine": five(
    [
      "Receive this hepatitis B vaccine exactly as directed on your labelled product and clinic / EPI plan — series timing belongs with the vaccinator.",
      "Hepatitis B vaccine counselling commonly includes mild injection-site soreness and completing the labelled series. Materia does not invent a dose, series interval, or antibody titre.",
      "Tell your pharmacist or nurse about prior hep B vaccine doses, severe allergy history, and ALL other vaccines due the same day.",
      "Report high fever, unusual rash, or severe allergic signs early after vaccination.",
      "Ask how missed doses fit the clinic catch-up plan — do not invent a personal series schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Yamukela le hepatitis B vaccine njengoba kubhalwe kumkhiqizo onelebula nohlelo lwekliniki / EPI — isikhathi sochungechunge sihambisana nomjovo.",
      "Ukwelulekwa kwe-hepatitis B vaccine kuvame ukufaka ubuhlungu bendawo yokujova nokugcwalisa uchungechunge lwelebula. I-Materia ayiqambi umthamo, isikhathi sochungechunge, noma i-antibody titre.",
      "Tshela umkhiqizi noma umhlengikazi ngemithamo yangaphambilini ye-hep B, umlando we-allergy enkulu, NAWO WONKE amanye ama-vaccine afanele ngosuku olufanayo.",
      "Bika umkhuhlane ophezulu, ukuqubuka okungajwayelekile, noma izimpawu ze-allergy ezinkulu ngokushesha ngemva kokugoma.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwekliniki lokubuyisela — ungayiqiqi uhlelo lwakho lochungechunge.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Ontvang hierdie hepatitis B-entstof soos op die geëtiketteerde produk en kliniek- / EPI-plan aangedui — reekstiming behoort by die entstoftoediener.",
      "Hepatitis B-entstofberading sluit dikwels ligte inspuitingsplekpyn en voltooiing van die geëtiketteerde reeks in. Materia versin nie ’n dosis, reeksinterval of teenliggaamtiter nie.",
      "Sê vir jou apteker of verpleegkundige van vorige hep B-dosisse, ernstige allergiegeskiedenis, en ALLE ander entstowwe wat dieselfde dag verskuldig is.",
      "Rapporteer hoë koors, ongewone uitslag, of ernstige allergiese tekens vroeg ná inenting.",
      "Vra hoe gemiste dosisse by die kliniek-inhaalplan pas — moenie ’n persoonlike reeksskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná ’n entstof kry — soek noodhulp.",
    ],
    [
      "Amohela hepatitis B vaccine ena hantle kamoo e hlalositsoeng holabel le moralo oa kliniki / EPI — nako ea letoto ke ea motho ea enteang.",
      "Keletso ea hepatitis B vaccine hangata e kenyelletsa bohloko ba sebaka sa ho enteoa bo bobebe le ho qeta letoto la leibole. Materia ha e iqape tekanyo, nako ea letoto, kapa antibody titre.",
      "Bolella rakhemisi kapa mooki ka litekanyo tsa hep B tsa pejana, histori ea allergy e matla, le LI-VACCINE TSOHLE tse lokelang ka letsatsi le le leng.",
      "Tlaleha feberu e phahameng, lekhopho le sa tloaelehang, kapa matšoao a allergy a matla kapele ka mor'a ente.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa kliniki oa ho tsosolosa — se ke oa iqapa kemiso ea hau ea letoto.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Yamkela le hepatitis B vaccine ngokuchanekileyo njengoko kubhaliwe kwileyibhile nesicwangciso seklinikhi / EPI — ixesha lothotho lihamba nomjovo.",
      "Iingcebiso ze-hepatitis B vaccine zihlala zibandakanya iintlungu zendawo yokutofa ezincinci nokugqiba uthotho lweleyibhile. I-Materia ayiyiqiqi idosi, ixesha lothotho, okanye i-antibody titre.",
      "Xelela usokhemisti okanye umongikazi ngeedosi zangaphambili ze-hep B, imbali ye-allergy enzima, NAZO ZONKE ezinye ii-vaccine ezifanelekileyo ngosuku olufanayo.",
      "Xela umkhuhlane ophezulu, irhashalala engaqhelekanga, okanye iimpawu ze-allergy ezinzima kwangoko emva kogonyo.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seklinikhi sokubuyisela — sukuyiqqa ishedyuli yakho yothotho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-hep-a-vaccine": five(
    [
      "Receive this hepatitis A vaccine exactly as directed on your labelled product and travel / clinic plan — booster timing belongs with the vaccinator.",
      "Hepatitis A vaccine counselling commonly includes mild injection-site soreness and clarifying travel timing with the clinic. Materia does not invent a dose, booster interval, or antibody titre.",
      "Tell your pharmacist or nurse about prior hep A doses, severe allergy history, and ALL other vaccines due the same day.",
      "Report high fever, unusual rash, or severe allergic signs early after vaccination.",
      "Ask how missed doses fit the clinic catch-up plan — do not invent a personal series schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Yamukela le hepatitis A vaccine njengoba kubhalwe kumkhiqizo onelebula nohlelo lokuhamba / lwekliniki — isikhathi se-booster sihambisana nomjovo.",
      "Ukwelulekwa kwe-hepatitis A vaccine kuvame ukufaka ubuhlungu bendawo yokujova nokucacisa isikhathi sokuhamba nekliniki. I-Materia ayiqambi umthamo, isikhathi se-booster, noma i-antibody titre.",
      "Tshela umkhiqizi noma umhlengikazi ngemithamo yangaphambilini ye-hep A, umlando we-allergy enkulu, NAWO WONKE amanye ama-vaccine afanele ngosuku olufanayo.",
      "Bika umkhuhlane ophezulu, ukuqubuka okungajwayelekile, noma izimpawu ze-allergy ezinkulu ngokushesha ngemva kokugoma.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwekliniki lokubuyisela — ungayiqiqi uhlelo lwakho lochungechunge.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Ontvang hierdie hepatitis A-entstof soos op die geëtiketteerde produk en reis- / kliniekplan aangedui — booster-timing behoort by die entstoftoediener.",
      "Hepatitis A-entstofberading sluit dikwels ligte inspuitingsplekpyn in en om reistiming met die kliniek duidelik te maak. Materia versin nie ’n dosis, boosterinterval of teenliggaamtiter nie.",
      "Sê vir jou apteker of verpleegkundige van vorige hep A-dosisse, ernstige allergiegeskiedenis, en ALLE ander entstowwe wat dieselfde dag verskuldig is.",
      "Rapporteer hoë koors, ongewone uitslag, of ernstige allergiese tekens vroeg ná inenting.",
      "Vra hoe gemiste dosisse by die kliniek-inhaalplan pas — moenie ’n persoonlike reeksskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná ’n entstof kry — soek noodhulp.",
    ],
    [
      "Amohela hepatitis A vaccine ena hantle kamoo e hlalositsoeng holabel le moralo oa ho etela / kliniki — nako ea booster ke ea motho ea enteang.",
      "Keletso ea hepatitis A vaccine hangata e kenyelletsa bohloko ba sebaka sa ho enteoa bo bobebe le ho hlakisa nako ea ho etela le kliniki. Materia ha e iqape tekanyo, nako ea booster, kapa antibody titre.",
      "Bolella rakhemisi kapa mooki ka litekanyo tsa hep A tsa pejana, histori ea allergy e matla, le LI-VACCINE TSOHLE tse lokelang ka letsatsi le le leng.",
      "Tlaleha feberu e phahameng, lekhopho le sa tloaelehang, kapa matšoao a allergy a matla kapele ka mor'a ente.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa kliniki oa ho tsosolosa — se ke oa iqapa kemiso ea hau ea letoto.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Yamkela le hepatitis A vaccine ngokuchanekileyo njengoko kubhaliwe kwileyibhile nesicwangciso sokuhamba / seklinikhi — ixesha le-booster lihamba nomjovo.",
      "Iingcebiso ze-hepatitis A vaccine zihlala zibandakanya iintlungu zendawo yokutofa ezincinci nokucacisa ixesha lokuhamba neklinikhi. I-Materia ayiyiqiqi idosi, ixesha le-booster, okanye i-antibody titre.",
      "Xelela usokhemisti okanye umongikazi ngeedosi zangaphambili ze-hep A, imbali ye-allergy enzima, NAZO ZONKE ezinye ii-vaccine ezifanelekileyo ngosuku olufanayo.",
      "Xela umkhuhlane ophezulu, irhashalala engaqhelekanga, okanye iimpawu ze-allergy ezinzima kwangoko emva kogonyo.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seklinikhi sokubuyisela — sukuyiqqa ishedyuli yakho yothotho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-hpv-vaccine": five(
    [
      "Receive this HPV vaccine exactly as directed on your labelled product and clinic / school plan — series timing belongs with the vaccinator.",
      "HPV vaccine counselling commonly includes mild injection-site soreness and clarifying who still needs catch-up doses. Materia does not invent a dose, series interval, or antibody titre.",
      "Tell your pharmacist or nurse about prior HPV doses, pregnancy status if relevant, and ALL other vaccines due the same day.",
      "Report fainting after injection, high fever, or severe allergic signs early.",
      "Ask how missed doses fit the clinic catch-up plan — do not invent a personal series schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Yamukela le HPV vaccine njengoba kubhalwe kumkhiqizo onelebula nohlelo lwekliniki / lesikole — isikhathi sochungechunge sihambisana nomjovo.",
      "Ukwelulekwa kwe-HPV vaccine kuvame ukufaka ubuhlungu bendawo yokujova nokucacisa ukuthi ubani osadinga imithamo yokubuyisela. I-Materia ayiqambi umthamo, isikhathi sochungechunge, noma i-antibody titre.",
      "Tshela umkhiqizi noma umhlengikazi ngemithamo yangaphambilini ye-HPV, isimo sokukhulelwa uma kufanele, NAWO WONKE amanye ama-vaccine afanele ngosuku olufanayo.",
      "Bika ukuwa ngemva kokujova, umkhuhlane ophezulu, noma izimpawu ze-allergy ezinkulu ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwekliniki lokubuyisela — ungayiqiqi uhlelo lwakho lochungechunge.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Ontvang hierdie HPV-entstof soos op die geëtiketteerde produk en kliniek- / skoolplan aangedui — reekstiming behoort by die entstoftoediener.",
      "HPV-entstofberading sluit dikwels ligte inspuitingsplekpyn in en om duidelik te maak wie nog inhaaldosisse nodig het. Materia versin nie ’n dosis, reeksinterval of teenliggaamtiter nie.",
      "Sê vir jou apteker of verpleegkundige van vorige HPV-dosisse, swangerskapstatus indien relevant, en ALLE ander entstowwe wat dieselfde dag verskuldig is.",
      "Rapporteer floute ná inspuiting, hoë koors, of ernstige allergiese tekens vroeg.",
      "Vra hoe gemiste dosisse by die kliniek-inhaalplan pas — moenie ’n persoonlike reeksskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná ’n entstof kry — soek noodhulp.",
    ],
    [
      "Amohela HPV vaccine ena hantle kamoo e hlalositsoeng holabel le moralo oa kliniki / sekolo — nako ea letoto ke ea motho ea enteang.",
      "Keletso ea HPV vaccine hangata e kenyelletsa bohloko ba sebaka sa ho enteoa bo bobebe le ho hlakisa hore na mang o ntse a hloka litekanyo tsa ho tsosolosa. Materia ha e iqape tekanyo, nako ea letoto, kapa antibody titre.",
      "Bolella rakhemisi kapa mooki ka litekanyo tsa HPV tsa pejana, boemo ba boimana haeba e ameha, le LI-VACCINE TSOHLE tse lokelang ka letsatsi le le leng.",
      "Tlaleha ho akheha ka mor'a ho enteoa, feberu e phahameng, kapa matšoao a allergy a matla kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa kliniki oa ho tsosolosa — se ke oa iqapa kemiso ea hau ea letoto.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Yamkela le HPV vaccine ngokuchanekileyo njengoko kubhaliwe kwileyibhile nesicwangciso seklinikhi / sesikolo — ixesha lothotho lihamba nomjovo.",
      "Iingcebiso ze-HPV vaccine zihlala zibandakanya iintlungu zendawo yokutofa ezincinci nokucacisa ukuba ngubani osafuna iidosi zokubuyisela. I-Materia ayiyiqiqi idosi, ixesha lothotho, okanye i-antibody titre.",
      "Xelela usokhemisti okanye umongikazi ngeedosi zangaphambili ze-HPV, imeko yokukhulelwa ukuba ifanelekile, NAZO ZONKE ezinye ii-vaccine ezifanelekileyo ngosuku olufanayo.",
      "Xela ukuwa emva kokutofa, umkhuhlane ophezulu, okanye iimpawu ze-allergy ezinzima kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seklinikhi sokubuyisela — sukuyiqqa ishedyuli yakho yothotho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-influenza-vaccine": five(
    [
      "Receive this seasonal influenza vaccine exactly as directed on your labelled product and clinic plan — formulation years differ; confirm this season’s product.",
      "Influenza vaccine counselling commonly includes mild arm soreness and clarifying that it does not treat current flu illness. Materia does not invent a dose, season clock, or protection score.",
      "Tell your pharmacist or nurse about egg or prior flu-vaccine allergy history, Guillain–Barré history if relevant, and ALL other vaccines due the same day.",
      "Report high fever, unusual rash, or severe allergic signs early after vaccination.",
      "Ask how this fits with other same-day vaccines — do not invent a personal combination plan.",
      "If you get severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Yamukela le seasonal influenza vaccine njengoba kubhalwe kumkhiqizo onelebula nohlelo lwekliniki — iminyaka yefomu iyahluka; qinisekisa umkhiqizo walesi sikhathi.",
      "Ukwelulekwa kwe-influenza vaccine kuvame ukufaka ubuhlungu bengalo okuncane nokucacisa ukuthi ayilaphi i-flu yamanje. I-Materia ayiqambi umthamo, iwashi lesikhathi, noma isikali sokuvikela.",
      "Tshela umkhiqizi noma umhlengikazi ngomlando we-allergy yamaqanda noma ye-flu vaccine yangaphambilini, umlando we-Guillain–Barré uma kufanele, NAWO WONKE amanye ama-vaccine afanele ngosuku olufanayo.",
      "Bika umkhuhlane ophezulu, ukuqubuka okungajwayelekile, noma izimpawu ze-allergy ezinkulu ngokushesha ngemva kokugoma.",
      "Buza ukuthi lokhu kuhambisana kanjani namanye ama-vaccine osuku olufanayo — ungayiqiqi uhlelo lwakho lokuhlanganisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Ontvang hierdie seisoenale griepentstof soos op die geëtiketteerde produk en kliniekplan aangedui — formuleringsjare verskil; bevestig hierdie seisoen se produk.",
      "Griepentstofberading sluit dikwels ligte armpyn in en maak duidelik dat dit nie huidige griepsiekte behandel nie. Materia versin nie ’n dosis, seisoenklok of beskermingstelling nie.",
      "Sê vir jou apteker of verpleegkundige van eier- of vorige griepentstof-allergiegeskiedenis, Guillain–Barré-geskiedenis indien relevant, en ALLE ander entstowwe wat dieselfde dag verskuldig is.",
      "Rapporteer hoë koors, ongewone uitslag, of ernstige allergiese tekens vroeg ná inenting.",
      "Vra hoe dit by ander dieselfde-dag entstowwe pas — moenie ’n persoonlike kombinasieplan versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná ’n entstof kry — soek noodhulp.",
    ],
    [
      "Amohela seasonal influenza vaccine ena hantle kamoo e hlalositsoeng holabel le moralo oa kliniki — lilemo tsa sebopeho lia fapana; netefatsa sehlahiswa sa sehla sena.",
      "Keletso ea influenza vaccine hangata e kenyelletsa bohloko ba letsoho bo bobebe le ho hlakisa hore ha e phekola lefu la flu la hona joale. Materia ha e iqape tekanyo, nako ea sehla, kapa lintlha tsa tšireletso.",
      "Bolella rakhemisi kapa mooki ka histori ea allergy ea mahe kapa flu vaccine ea pejana, histori ea Guillain–Barré haeba e ameha, le LI-VACCINE TSOHLE tse lokelang ka letsatsi le le leng.",
      "Tlaleha feberu e phahameng, lekhopho le sa tloaelehang, kapa matšoao a allergy a matla kapele ka mor'a ente.",
      "Botsa hore sena se tšoana joang le li-vaccine tse ling tsa letsatsi le le leng — se ke oa iqapa moralo oa hau oa ho kopanya.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Yamkela le seasonal influenza vaccine ngokuchanekileyo njengoko kubhaliwe kwileyibhile nesicwangciso seklinikhi — iminyaka yefomu iyahluka; qinisekisa imveliso yale xesha.",
      "Iingcebiso ze-influenza vaccine zihlala zibandakanya iintlungu zengalo ezincinci nokucacisa ukuba ayinyangi isifo se-flu sangoku. I-Materia ayiyiqiqi idosi, iwotshi yexesha, okanye amanqaku okukhusela.",
      "Xelela usokhemisti okanye umongikazi ngembali ye-allergy yamaqanda okanye ye-flu vaccine yangaphambili, imbali ye-Guillain–Barré ukuba ifanelekile, NAZO ZONKE ezinye ii-vaccine ezifanelekileyo ngosuku olufanayo.",
      "Xela umkhuhlane ophezulu, irhashalala engaqhelekanga, okanye iimpawu ze-allergy ezinzima kwangoko emva kogonyo.",
      "Buza indlela oku kuhambelana ngayo nezinye ii-vaccine zosuku olufanayo — sukuyiqqa isicwangciso sakho sokudibanisa.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-mmr-vaccine": five(
    [
      "Receive this live MMR vaccine exactly as directed on your labelled product and EPI / clinic plan — live-vaccine precautions belong with the vaccinator.",
      "MMR counselling commonly includes mild fever or rash days later and clarifying pregnancy / immune-suppression questions before dosing. Materia does not invent a dose, series interval, or antibody titre.",
      "Tell your pharmacist or nurse about pregnancy plans, immune-suppressing medicines, prior MMR doses, and ALL other live vaccines on your list.",
      "Report high fever, unusual bruising, or severe allergic signs early after vaccination.",
      "Ask how missed doses fit the clinic catch-up plan — do not invent a personal series schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Yamukela le live MMR vaccine njengoba kubhalwe kumkhiqizo onelebula nohlelo lwe-EPI / lwekliniki — izexwayiso ze-live vaccine zihambisana nomjovo.",
      "Ukwelulekwa kwe-MMR kuvame ukufaka umkhuhlane noma ukuqubuka okuncane ezinsukwini ezilandelayo nokucacisa imibuzo yokukhulelwa / yokucindezelwa kwe-immune ngaphambi komthamo. I-Materia ayiqambi umthamo, isikhathi sochungechunge, noma i-antibody titre.",
      "Tshela umkhiqizi noma umhlengikazi ngezinhlelo zokukhulelwa, amaphilisi acindezela i-immune, imithamo yangaphambilini ye-MMR, NAWO WONKE amanye ama-live vaccine.",
      "Bika umkhuhlane ophezulu, ukulimala okungajwayelekile, noma izimpawu ze-allergy ezinkulu ngokushesha ngemva kokugoma.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwekliniki lokubuyisela — ungayiqiqi uhlelo lwakho lochungechunge.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Ontvang hierdie lewende MMR-entstof soos op die geëtiketteerde produk en EPI- / kliniekplan aangedui — lewende-entstofvoorsorg behoort by die entstoftoediener.",
      "MMR-berading sluit dikwels ligte koors of uitslag dae later in en maak swangerskap- / immuunonderdrukkingsvrae voor dosering duidelik. Materia versin nie ’n dosis, reeksinterval of teenliggaamtiter nie.",
      "Sê vir jou apteker of verpleegkundige van swangerskapsplanne, immuunonderdrukkende medisyne, vorige MMR-dosisse, en ALLE ander lewende entstowwe op jou lys.",
      "Rapporteer hoë koors, ongewone kneusings, of ernstige allergiese tekens vroeg ná inenting.",
      "Vra hoe gemiste dosisse by die kliniek-inhaalplan pas — moenie ’n persoonlike reeksskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná ’n entstof kry — soek noodhulp.",
    ],
    [
      "Amohela live MMR vaccine ena hantle kamoo e hlalositsoeng holabel le moralo oa EPI / kliniki — litlhokomelo tsa live vaccine ke tsa motho ea enteang.",
      "Keletso ea MMR hangata e kenyelletsa feberu e fokolang kapa lekhopho matsatsing a latelang le ho hlakisa lipotso tsa boimana / ho hatella immune pele ho tekanyo. Materia ha e iqape tekanyo, nako ea letoto, kapa antibody titre.",
      "Bolella rakhemisi kapa mooki ka merero ea boimana, meriana e hatellang immune, litekanyo tsa MMR tsa pejana, le LI-LIVE VACCINE TSOHLE.",
      "Tlaleha feberu e phahameng, ho otloloa ho sa tloaelehang, kapa matšoao a allergy a matla kapele ka mor'a ente.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa kliniki oa ho tsosolosa — se ke oa iqapa kemiso ea hau ea letoto.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Yamkela le live MMR vaccine ngokuchanekileyo njengoko kubhaliwe kwileyibhile nesicwangciso se-EPI / seklinikhi — izilumkiso ze-live vaccine zihamba nomjovo.",
      "Iingcebiso ze-MMR zihlala zibandakanya umkhuhlane okanye irhashalala encinci kwiintsuku ezilandelayo nokucacisa imibuzo yokukhulelwa / yokucinezela i-immune phambi kwedosi. I-Materia ayiyiqiqi idosi, ixesha lothotho, okanye i-antibody titre.",
      "Xelela usokhemisti okanye umongikazi ngezicwangciso zokukhulelwa, amayeza acinezela i-immune, iidosi zangaphambili ze-MMR, NAZO ZONKE ezinye ii-live vaccine.",
      "Xela umkhuhlane ophezulu, ukulimala okungaqhelekanga, okanye iimpawu ze-allergy ezinzima kwangoko emva kogonyo.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seklinikhi sokubuyisela — sukuyiqqa ishedyuli yakho yothotho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tdap-vaccine": five(
    [
      "Receive this Tdap vaccine exactly as directed on your labelled product and clinic / pregnancy plan — booster timing belongs with the vaccinator.",
      "Tdap counselling commonly includes mild arm soreness and clarifying tetanus / whooping-cough booster context. Materia does not invent a dose, booster interval, or antibody titre.",
      "Tell your pharmacist or nurse about prior Td / Tdap doses, pregnancy status if relevant, and ALL other vaccines due the same day.",
      "Report high fever, unusual rash, or severe allergic signs early after vaccination.",
      "Ask how this fits with wound tetanus advice — do not invent a personal booster schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Yamukela le Tdap vaccine njengoba kubhalwe kumkhiqizo onelebula nohlelo lwekliniki / lokukhulelwa — isikhathi se-booster sihambisana nomjovo.",
      "Ukwelulekwa kwe-Tdap kuvame ukufaka ubuhlungu bengalo okuncane nokucacisa umongo we-booster ye-tetanus / whooping cough. I-Materia ayiqambi umthamo, isikhathi se-booster, noma i-antibody titre.",
      "Tshela umkhiqizi noma umhlengikazi ngemithamo yangaphambilini ye-Td / Tdap, isimo sokukhulelwa uma kufanele, NAWO WONKE amanye ama-vaccine afanele ngosuku olufanayo.",
      "Bika umkhuhlane ophezulu, ukuqubuka okungajwayelekile, noma izimpawu ze-allergy ezinkulu ngokushesha ngemva kokugoma.",
      "Buza ukuthi lokhu kuhambisana kanjani neseluleko se-tetanus sesilonda — ungayiqiqi uhlelo lwakho lwe-booster.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Ontvang hierdie Tdap-entstof soos op die geëtiketteerde produk en kliniek- / swangerskapsplan aangedui — booster-timing behoort by die entstoftoediener.",
      "Tdap-berading sluit dikwels ligte armpyn in en maak tetanus- / kinkhoes-booster-konteks duidelik. Materia versin nie ’n dosis, boosterinterval of teenliggaamtiter nie.",
      "Sê vir jou apteker of verpleegkundige van vorige Td- / Tdap-dosisse, swangerskapstatus indien relevant, en ALLE ander entstowwe wat dieselfde dag verskuldig is.",
      "Rapporteer hoë koors, ongewone uitslag, of ernstige allergiese tekens vroeg ná inenting.",
      "Vra hoe dit by wond-tetanusadvies pas — moenie ’n persoonlike boosterskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná ’n entstof kry — soek noodhulp.",
    ],
    [
      "Amohela Tdap vaccine ena hantle kamoo e hlalositsoeng holabel le moralo oa kliniki / boimana — nako ea booster ke ea motho ea enteang.",
      "Keletso ea Tdap hangata e kenyelletsa bohloko ba letsoho bo bobebe le ho hlakisa moelelo oa booster ea tetanus / whooping cough. Materia ha e iqape tekanyo, nako ea booster, kapa antibody titre.",
      "Bolella rakhemisi kapa mooki ka litekanyo tsa Td / Tdap tsa pejana, boemo ba boimana haeba e ameha, le LI-VACCINE TSOHLE tse lokelang ka letsatsi le le leng.",
      "Tlaleha feberu e phahameng, lekhopho le sa tloaelehang, kapa matšoao a allergy a matla kapele ka mor'a ente.",
      "Botsa hore sena se tšoana joang le keletso ea tetanus ea leqeba — se ke oa iqapa kemiso ea hau ea booster.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Yamkela le Tdap vaccine ngokuchanekileyo njengoko kubhaliwe kwileyibhile nesicwangciso seklinikhi / sokukhulelwa — ixesha le-booster lihamba nomjovo.",
      "Iingcebiso ze-Tdap zihlala zibandakanya iintlungu zengalo ezincinci nokucacisa umxholo we-booster ye-tetanus / whooping cough. I-Materia ayiyiqiqi idosi, ixesha le-booster, okanye i-antibody titre.",
      "Xelela usokhemisti okanye umongikazi ngeedosi zangaphambili ze-Td / Tdap, imeko yokukhulelwa ukuba ifanelekile, NAZO ZONKE ezinye ii-vaccine ezifanelekileyo ngosuku olufanayo.",
      "Xela umkhuhlane ophezulu, irhashalala engaqhelekanga, okanye iimpawu ze-allergy ezinzima kwangoko emva kogonyo.",
      "Buza indlela oku kuhambelana ngayo nengcebiso ye-tetanus yesilonda — sukuyiqqa ishedyuli yakho ye-booster.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-td-vaccine": five(
    [
      "Receive this Td vaccine exactly as directed on your labelled product and clinic / wound plan — booster timing belongs with the vaccinator.",
      "Td counselling commonly includes mild arm soreness and clarifying tetanus booster context for wounds or travel. Materia does not invent a dose, booster interval, or antibody titre.",
      "Tell your pharmacist or nurse about prior Td / Tdap doses, severe allergy history, and ALL other vaccines due the same day.",
      "Report high fever, unusual rash, or severe allergic signs early after vaccination.",
      "Ask how this fits with wound tetanus advice — do not invent a personal booster schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Yamukela le Td vaccine njengoba kubhalwe kumkhiqizo onelebula nohlelo lwekliniki / lwesilonda — isikhathi se-booster sihambisana nomjovo.",
      "Ukwelulekwa kwe-Td kuvame ukufaka ubuhlungu bengalo okuncane nokucacisa umongo we-booster ye-tetanus yezilonda noma ukuhamba. I-Materia ayiqambi umthamo, isikhathi se-booster, noma i-antibody titre.",
      "Tshela umkhiqizi noma umhlengikazi ngemithamo yangaphambilini ye-Td / Tdap, umlando we-allergy enkulu, NAWO WONKE amanye ama-vaccine afanele ngosuku olufanayo.",
      "Bika umkhuhlane ophezulu, ukuqubuka okungajwayelekile, noma izimpawu ze-allergy ezinkulu ngokushesha ngemva kokugoma.",
      "Buza ukuthi lokhu kuhambisana kanjani neseluleko se-tetanus sesilonda — ungayiqiqi uhlelo lwakho lwe-booster.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Ontvang hierdie Td-entstof soos op die geëtiketteerde produk en kliniek- / wondplan aangedui — booster-timing behoort by die entstoftoediener.",
      "Td-berading sluit dikwels ligte armpyn in en maak tetanus-booster-konteks vir wonde of reis duidelik. Materia versin nie ’n dosis, boosterinterval of teenliggaamtiter nie.",
      "Sê vir jou apteker of verpleegkundige van vorige Td- / Tdap-dosisse, ernstige allergiegeskiedenis, en ALLE ander entstowwe wat dieselfde dag verskuldig is.",
      "Rapporteer hoë koors, ongewone uitslag, of ernstige allergiese tekens vroeg ná inenting.",
      "Vra hoe dit by wond-tetanusadvies pas — moenie ’n persoonlike boosterskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná ’n entstof kry — soek noodhulp.",
    ],
    [
      "Amohela Td vaccine ena hantle kamoo e hlalositsoeng holabel le moralo oa kliniki / leqeba — nako ea booster ke ea motho ea enteang.",
      "Keletso ea Td hangata e kenyelletsa bohloko ba letsoho bo bobebe le ho hlakisa moelelo oa booster ea tetanus bakeng sa maqeba kapa ho etela. Materia ha e iqape tekanyo, nako ea booster, kapa antibody titre.",
      "Bolella rakhemisi kapa mooki ka litekanyo tsa Td / Tdap tsa pejana, histori ea allergy e matla, le LI-VACCINE TSOHLE tse lokelang ka letsatsi le le leng.",
      "Tlaleha feberu e phahameng, lekhopho le sa tloaelehang, kapa matšoao a allergy a matla kapele ka mor'a ente.",
      "Botsa hore sena se tšoana joang le keletso ea tetanus ea leqeba — se ke oa iqapa kemiso ea hau ea booster.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Yamkela le Td vaccine ngokuchanekileyo njengoko kubhaliwe kwileyibhile nesicwangciso seklinikhi / sesilonda — ixesha le-booster lihamba nomjovo.",
      "Iingcebiso ze-Td zihlala zibandakanya iintlungu zengalo ezincinci nokucacisa umxholo we-booster ye-tetanus yezilonda okanye ukuhamba. I-Materia ayiyiqiqi idosi, ixesha le-booster, okanye i-antibody titre.",
      "Xelela usokhemisti okanye umongikazi ngeedosi zangaphambili ze-Td / Tdap, imbali ye-allergy enzima, NAZO ZONKE ezinye ii-vaccine ezifanelekileyo ngosuku olufanayo.",
      "Xela umkhuhlane ophezulu, irhashalala engaqhelekanga, okanye iimpawu ze-allergy ezinzima kwangoko emva kogonyo.",
      "Buza indlela oku kuhambelana ngayo nengcebiso ye-tetanus yesilonda — sukuyiqqa ishedyuli yakho ye-booster.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-pcv-vaccine": five(
    [
      "Receive this pneumococcal conjugate vaccine exactly as directed on your labelled product and EPI / clinic plan — infant and adult schedules differ; confirm with the vaccinator.",
      "PCV counselling commonly includes mild injection-site soreness and clarifying which pneumococcal product you were given. Materia does not invent a dose, series interval, or antibody titre.",
      "Tell your pharmacist or nurse about prior pneumococcal vaccines, immune problems, and ALL other vaccines due the same day.",
      "Report high fever, unusual rash, or severe allergic signs early after vaccination.",
      "Ask how missed doses fit the clinic catch-up plan — do not invent a personal series schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Yamukela le pneumococcal conjugate vaccine njengoba kubhalwe kumkhiqizo onelebula nohlelo lwe-EPI / lwekliniki — izinhlelo zezingane nezabantu abadala ziyahluka; qinisekisa nomjovo.",
      "Ukwelulekwa kwe-PCV kuvame ukufaka ubuhlungu bendawo yokujova nokucacisa ukuthi yimuphi umkhiqizo we-pneumococcal onikiwe. I-Materia ayiqambi umthamo, isikhathi sochungechunge, noma i-antibody titre.",
      "Tshela umkhiqizi noma umhlengikazi ngama-pneumococcal vaccine angaphambilini, izinkinga ze-immune, NAWO WONKE amanye ama-vaccine afanele ngosuku olufanayo.",
      "Bika umkhuhlane ophezulu, ukuqubuka okungajwayelekile, noma izimpawu ze-allergy ezinkulu ngokushesha ngemva kokugoma.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwekliniki lokubuyisela — ungayiqiqi uhlelo lwakho lochungechunge.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Ontvang hierdie pneumokokkale konjugaatentstof soos op die geëtiketteerde produk en EPI- / kliniekplan aangedui — baba- en volwasse skedules verskil; bevestig met die entstoftoediener.",
      "PCV-berading sluit dikwels ligte inspuitingsplekpyn in en maak duidelik watter pneumokokkale produk jy gekry het. Materia versin nie ’n dosis, reeksinterval of teenliggaamtiter nie.",
      "Sê vir jou apteker of verpleegkundige van vorige pneumokokkale entstowwe, immuunprobleme, en ALLE ander entstowwe wat dieselfde dag verskuldig is.",
      "Rapporteer hoë koors, ongewone uitslag, of ernstige allergiese tekens vroeg ná inenting.",
      "Vra hoe gemiste dosisse by die kliniek-inhaalplan pas — moenie ’n persoonlike reeksskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná ’n entstof kry — soek noodhulp.",
    ],
    [
      "Amohela pneumococcal conjugate vaccine ena hantle kamoo e hlalositsoeng holabel le moralo oa EPI / kliniki — merero ea masea le batho ba baholo ea fapana; netefatsa le motho ea enteang.",
      "Keletso ea PCV hangata e kenyelletsa bohloko ba sebaka sa ho enteoa bo bobebe le ho hlakisa hore ke sehlahiswa sefe sa pneumococcal seo u se fileng. Materia ha e iqape tekanyo, nako ea letoto, kapa antibody titre.",
      "Bolella rakhemisi kapa mooki ka li-pneumococcal vaccine tsa pejana, mathata a immune, le LI-VACCINE TSOHLE tse lokelang ka letsatsi le le leng.",
      "Tlaleha feberu e phahameng, lekhopho le sa tloaelehang, kapa matšoao a allergy a matla kapele ka mor'a ente.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa kliniki oa ho tsosolosa — se ke oa iqapa kemiso ea hau ea letoto.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Yamkela le pneumococcal conjugate vaccine ngokuchanekileyo njengoko kubhaliwe kwileyibhile nesicwangciso se-EPI / seklinikhi — iishedyuli zeentsana nezabantu abadala ziyahluka; qinisekisa nomjovo.",
      "Iingcebiso ze-PCV zihlala zibandakanya iintlungu zendawo yokutofa ezincinci nokucacisa ukuba yeyiphi imveliso ye-pneumococcal onikwe. I-Materia ayiyiqiqi idosi, ixesha lothotho, okanye i-antibody titre.",
      "Xelela usokhemisti okanye umongikazi ngee-pneumococcal vaccine zangaphambili, iingxaki ze-immune, NAZO ZONKE ezinye ii-vaccine ezifanelekileyo ngosuku olufanayo.",
      "Xela umkhuhlane ophezulu, irhashalala engaqhelekanga, okanye iimpawu ze-allergy ezinzima kwangoko emva kogonyo.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seklinikhi sokubuyisela — sukuyiqqa ishedyuli yakho yothotho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-rotavirus-vaccine": five(
    [
      "Give this live oral rotavirus vaccine exactly as directed on your labelled product and EPI plan — oral drops are not an injection; confirm the labelled technique.",
      "Rotavirus vaccine counselling commonly includes mild irritability or loose stools and clarifying age-window rules with the clinic. Materia does not invent a dose, age window, or series interval.",
      "Tell your pharmacist or nurse about immune problems in the infant or household, prior rotavirus doses, and ALL other vaccines due the same day.",
      "Report ongoing vomiting, bloody stools, severe abdominal pain, or high fever early after vaccination.",
      "Ask how a spit-out or missed dose fits the clinic plan — do not invent a personal catch-up schedule.",
      "If the infant gets severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Nikeza le live oral rotavirus vaccine njengoba kubhalwe kumkhiqizo onelebula nohlelo lwe-EPI — amathonsi omlomo awawona umjovo; qinisekisa indlela yelebula.",
      "Ukwelulekwa kwe-rotavirus vaccine kuvame ukufaka ukucasuka okuncane noma indle ethambile nokucacisa imithetho yewindi yobudala nekliniki. I-Materia ayiqambi umthamo, iwindi yobudala, noma isikhathi sochungechunge.",
      "Tshela umkhiqizi noma umhlengikazi ngezinkinga ze-immune kusana noma ekhaya, imithamo yangaphambilini ye-rotavirus, NAWO WONKE amanye ama-vaccine afanele ngosuku olufanayo.",
      "Bika ukuhlanza okuqhubekayo, indle enegazi, ubuhlungu besisu obukhulu, noma umkhuhlane ophezulu ngokushesha ngemva kokugoma.",
      "Buza ukuthi ukukhwehlela noma umthamo olahlekile uhambisana kanjani nohlelo lwekliniki — ungayiqiqi uhlelo lwakho lokubuyisela.",
      "Uma usana luthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Gee hierdie lewende orale rotavirus-entstof soos op die geëtiketteerde produk en EPI-plan aangedui — orale druppels is nie ’n inspuiting nie; bevestig die geëtiketteerde tegniek.",
      "Rotavirus-entstofberading sluit dikwels ligte prikkelbaarheid of los stoelgang in en maak ouderdomsvensterreëls met die kliniek duidelik. Materia versin nie ’n dosis, ouderdomsvenster of reeksinterval nie.",
      "Sê vir jou apteker of verpleegkundige van immuunprobleme by die baba of huishouding, vorige rotavirus-dosisse, en ALLE ander entstowwe wat dieselfde dag verskuldig is.",
      "Rapporteer aanhoudende braking, bloedige stoelgang, ernstige buikpyn, of hoë koors vroeg ná inenting.",
      "Vra hoe ’n uitspoeg of gemiste dosis by die kliniekplan pas — moenie ’n persoonlike inhaalskedule versin nie.",
      "As die baba ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná ’n entstof kry — soek noodhulp.",
    ],
    [
      "Fana live oral rotavirus vaccine ena hantle kamoo e hlalositsoeng holabel le moralo oa EPI — mathopa a molomo ha se ente; netefatsa mokhoa oa leibole.",
      "Keletso ea rotavirus vaccine hangata e kenyelletsa ho tsota ho fokolang kapa mantle a hlephileng le ho hlakisa melao ea window ea lilemo le kliniki. Materia ha e iqape tekanyo, window ea lilemo, kapa nako ea letoto.",
      "Bolella rakhemisi kapa mooki ka mathata a immune ho lesea kapa lapeng, litekanyo tsa rotavirus tsa pejana, le LI-VACCINE TSOHLE tse lokelang ka letsatsi le le leng.",
      "Tlaleha ho hlatsa ho tsoelang pele, mantle a nang le mali, bohloko ba mpeng bo matla, kapa feberu e phahameng kapele ka mor'a ente.",
      "Botsa hore ho tšoela kapa tekanyo e lahlehileng e tšoana joang le moralo oa kliniki — se ke oa iqapa kemiso ea hau ea ho tsosolosa.",
      "Haeba lesea le fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Nika le live oral rotavirus vaccine ngokuchanekileyo njengoko kubhaliwe kwileyibhile nesicwangciso se-EPI — amathontsi omlomo ayiyomjovo; qinisekisa ubuchule beleyibhile.",
      "Iingcebiso ze-rotavirus vaccine zihlala zibandakanya ukucaphuka okuncinci okanye indle ethambileyo nokucacisa imithetho yefestile yobudala neklinikhi. I-Materia ayiyiqiqi idosi, ifestile yobudala, okanye ixesha lothotho.",
      "Xelela usokhemisti okanye umongikazi ngeengxaki ze-immune kusana okanye ekhaya, iidosi zangaphambili ze-rotavirus, NAZO ZONKE ezinye ii-vaccine ezifanelekileyo ngosuku olufanayo.",
      "Xela ukuhlanza okuqhubekayo, indle enegazi, iintlungu zesisu ezinzima, okanye umkhuhlane ophezulu kwangoko emva kogonyo.",
      "Buza indlela ukutshiza okanye idosi elahlekileyo ehambelana ngayo nesicwangciso seklinikhi — sukuyiqqa ishedyuli yakho yokubuyisela.",
      "Ukuba usana lufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-ipv-vaccine": five(
    [
      "Receive this inactivated polio vaccine exactly as directed on your labelled product and EPI / clinic plan — IPV is not the same as oral polio drops; confirm the labelled form.",
      "IPV counselling commonly includes mild injection-site soreness and completing the labelled series. Materia does not invent a dose, series interval, or antibody titre.",
      "Tell your pharmacist or nurse about prior polio vaccine doses, severe allergy history, and ALL other vaccines due the same day.",
      "Report high fever, unusual rash, or severe allergic signs early after vaccination.",
      "Ask how missed doses fit the clinic catch-up plan — do not invent a personal series schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Yamukela le inactivated polio vaccine njengoba kubhalwe kumkhiqizo onelebula nohlelo lwe-EPI / lwekliniki — i-IPV ayifani namathonsi omlomo e-polio; qinisekisa ifomu yelebula.",
      "Ukwelulekwa kwe-IPV kuvame ukufaka ubuhlungu bendawo yokujova nokugcwalisa uchungechunge lwelebula. I-Materia ayiqambi umthamo, isikhathi sochungechunge, noma i-antibody titre.",
      "Tshela umkhiqizi noma umhlengikazi ngemithamo yangaphambilini ye-polio vaccine, umlando we-allergy enkulu, NAWO WONKE amanye ama-vaccine afanele ngosuku olufanayo.",
      "Bika umkhuhlane ophezulu, ukuqubuka okungajwayelekile, noma izimpawu ze-allergy ezinkulu ngokushesha ngemva kokugoma.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwekliniki lokubuyisela — ungayiqiqi uhlelo lwakho lochungechunge.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Ontvang hierdie geïnaktiveerde polio-entstof soos op die geëtiketteerde produk en EPI- / kliniekplan aangedui — IPV is nie dieselfde as orale polio-druppels nie; bevestig die geëtiketteerde vorm.",
      "IPV-berading sluit dikwels ligte inspuitingsplekpyn en voltooiing van die geëtiketteerde reeks in. Materia versin nie ’n dosis, reeksinterval of teenliggaamtiter nie.",
      "Sê vir jou apteker of verpleegkundige van vorige polio-entstofdosisse, ernstige allergiegeskiedenis, en ALLE ander entstowwe wat dieselfde dag verskuldig is.",
      "Rapporteer hoë koors, ongewone uitslag, of ernstige allergiese tekens vroeg ná inenting.",
      "Vra hoe gemiste dosisse by die kliniek-inhaalplan pas — moenie ’n persoonlike reeksskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná ’n entstof kry — soek noodhulp.",
    ],
    [
      "Amohela inactivated polio vaccine ena hantle kamoo e hlalositsoeng holabel le moralo oa EPI / kliniki — IPV ha e tšoane le mathopa a molomo a polio; netefatsa mofuta oa leibole.",
      "Keletso ea IPV hangata e kenyelletsa bohloko ba sebaka sa ho enteoa bo bobebe le ho qeta letoto la leibole. Materia ha e iqape tekanyo, nako ea letoto, kapa antibody titre.",
      "Bolella rakhemisi kapa mooki ka litekanyo tsa polio vaccine tsa pejana, histori ea allergy e matla, le LI-VACCINE TSOHLE tse lokelang ka letsatsi le le leng.",
      "Tlaleha feberu e phahameng, lekhopho le sa tloaelehang, kapa matšoao a allergy a matla kapele ka mor'a ente.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa kliniki oa ho tsosolosa — se ke oa iqapa kemiso ea hau ea letoto.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Yamkela le inactivated polio vaccine ngokuchanekileyo njengoko kubhaliwe kwileyibhile nesicwangciso se-EPI / seklinikhi — i-IPV ayifani namathontsi omlomo e-polio; qinisekisa ifomu yeleyibhile.",
      "Iingcebiso ze-IPV zihlala zibandakanya iintlungu zendawo yokutofa ezincinci nokugqiba uthotho lweleyibhile. I-Materia ayiyiqiqi idosi, ixesha lothotho, okanye i-antibody titre.",
      "Xelela usokhemisti okanye umongikazi ngeedosi zangaphambili ze-polio vaccine, imbali ye-allergy enzima, NAZO ZONKE ezinye ii-vaccine ezifanelekileyo ngosuku olufanayo.",
      "Xela umkhuhlane ophezulu, irhashalala engaqhelekanga, okanye iimpawu ze-allergy ezinzima kwangoko emva kogonyo.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seklinikhi sokubuyisela — sukuyiqqa ishedyuli yakho yothotho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),
};
