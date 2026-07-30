/**
 * v260–v269 deepened SA counselling batch (6 lines × 5 langs).
 * Original Materia educational scripts only — no invented doses, lab targets, hours, or interaction lists.
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

export const COUNSELLING_V260_TO_V269: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-darbepoetin": five(
    [
      "Use this long-acting ESA exactly as directed on your labelled product — injection technique belongs with your care team.",
      "Darbepoetin counselling commonly includes blood-pressure watch and clot-risk teaching. Materia does not invent a dose, injection schedule, or haemoglobin target.",
      "Tell your pharmacist about uncontrolled high blood pressure, clot history, cancer treatment plans, and ALL other ESA products on your list.",
      "Report severe headache, chest pain, calf swelling, sudden vision change, or seizure early.",
      "Ask how missed doses and monitoring visits fit your plan — do not invent a personal haemoglobin schedule.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le long-acting ESA njengoba kubhalwe kumkhiqizo onelebula — indlela yokujova ihambisana nethimba lakho lokunakekelwa.",
      "Ukwelulekwa kwe-darbepoetin kuvame ukufaka ukuqapha umfutho wegazi nokufundisa ngeqhwa. I-Materia ayiqambi umthamo, uhlelo lokujova, noma umgomo we-haemoglobin.",
      "Tshela umkhiqizi ngomfutho wegazi ophezulu ongalawuleki, umlando weqhwa, izinhlelo zokwelapha umdlavuza, NAWO WONKE amanye ama-ESA.",
      "Bika ikhanda elibuhlungu kakhulu, ubuhlungu besifuba, ukuvuvuka kweqakala, ukushintsha kokubona okuzumayo, noma ukuwa ngokushesha.",
      "Buza ukuthi imithamo elahlekile nokuvakashelwa kokuhlola kuhambisana kanjani nohlelo lwakho — ungayiqiqi uhlelo lwakho lwe-haemoglobin.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie lankwerkende ESA soos op die geëtiketteerde produk aangedui — inspuitingstegniek behoort by jou sorgspan.",
      "Darbepoetin-berading sluit dikwels bloeddrukwaak en klont-risiko-onderrig in. Materia versin nie ’n dosis, inspuitingskedule of hemoglobienteiken nie.",
      "Sê vir jou apteker van onbeheerde hoë bloeddruk, klontgeskiedenis, kankerbehandelingsplanne, en ALLE ander ESA-produkte op jou lys.",
      "Rapporteer ernstige hoofpyn, borspyn, kuitswelling, skielike sigverandering, of stuipe vroeg.",
      "Vra hoe gemiste dosisse en moniteringsbesoeke by jou plan pas — moenie ’n persoonlike hemoglobinskedule versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa long-acting ESA ena hantle kamoo e hlalositsoeng holabel — mokhoa oa ho enteoa ke oa sehlopha sa hau sa tlhokomelo.",
      "Keletso ea darbepoetin hangata e kenyelletsa ho hlokomela khatello ea mali le thuto ea kotsi ea tlala ea mali. Materia ha e iqape tekanyo, kemiso ea ho enteoa, kapa sepheo sa haemoglobin.",
      "Bolella rakhemisi ka khatello ea mali e phahameng e sa laoleheng, histori ea tlala ea mali, merero ea kalafo ea mofetše, le LIHLAHISWA TSOHLE tsa ESA.",
      "Tlaleha hlooho e bohloko haholo, bohloko ba sefuba, ho ruruha ha leoto, phetoho ea pono ka tšohanyetso, kapa ho tšoha kapele.",
      "Botsa hore litekanyo tse lahlehileng le maeto a ho hlokomela li tšoana joang le moralo oa hau — se ke oa iqapa kemiso ea hau ea haemoglobin.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le long-acting ESA ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ubuchule bokutofa buhamba neqela lakho lokhathalelo.",
      "Iingcebiso ze-darbepoetin zihlala zibandakanya ukuqapha uxinzelelo lwegazi nokufundisa ngomngcipheko weqhwa. I-Materia ayiyiqiqi idosi, ishedyuli yokutofa, okanye usukelo lwe-haemoglobin.",
      "Xelela usokhemisti ngoxinzelelo lwegazi oluphezulu olungalawulekiyo, imbali yeqhwa, izicwangciso zonyango lomhlaza, NAZO ZONKE ezinye ii-ESA.",
      "Xela intloko ebuhlungu kakhulu, iintlungu zesifuba, ukudumba kweqakala, utshintsho lokubona ngequbuliso, okanye ukuwa kwangoko.",
      "Buza indlela iidosi ezilahlekileyo neendwendwe zokuqapha ezihambelana ngayo nesicwangciso sakho — sukuyiqqa ishedyuli yakho ye-haemoglobin.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-eltrombopag": five(
    [
      "Take this thrombopoietin receptor agonist exactly as directed on your labelled product — food and mineral spacing rules belong on the label.",
      "Eltrombopag counselling commonly includes platelet monitoring and clot-risk teaching. Materia does not invent a dose, meal clock, or platelet target.",
      "Tell your pharmacist about liver disease, clot history, and ALL other medicines or mineral supplements on your list.",
      "Report unusual bruising, severe headache, abdominal pain, dark urine, or calf swelling early.",
      "Ask how missed doses and food / antacid spacing fit the labelled product — do not invent a personal schedule.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le thrombopoietin receptor agonist njengoba kubhalwe kumkhiqizo onelebula — imithetho yokudla nokuhlukanisa amaminerali isebhala ilebula.",
      "Ukwelulekwa kwe-eltrombopag kuvame ukufaka ukuhlolwa kwama-platelet nokufundisa ngeqhwa. I-Materia ayiqambi umthamo, iwashi lesidlo, noma umgomo we-platelet.",
      "Tshela umkhiqizi ngesifo sesibindi, umlando weqhwa, NAWO WONKE amaphilisi noma izengezo zamaminerali.",
      "Bika ukulimala okungajwayelekile, ikhanda elibuhlungu kakhulu, ubuhlungu besisu, umchamo omnyama, noma ukuvuvuka kweqakala ngokushesha.",
      "Buza ukuthi imithamo elahlekile nokuhlukanisa ukudla / ama-antacid kuhambisana kanjani nomkhiqizo onelebula — ungayiqiqi uhlelo lakho.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie trombopoëtien-reseptoragonis soos op die geëtiketteerde produk aangedui — kos- en mineraalspasiëringsreëls staan op die etiket.",
      "Eltrombopag-berading sluit dikwels plaatjiemonitering en klont-risiko-onderrig in. Materia versin nie ’n dosis, maaltydklok of plaatjieteiken nie.",
      "Sê vir jou apteker van lewersiekte, klontgeskiedenis, en ALLE ander medisyne of mineraalaanvullings op jou lys.",
      "Rapporteer ongewone kneusings, ernstige hoofpyn, buikpyn, donker urine, of kuitswelling vroeg.",
      "Vra hoe gemiste dosisse en kos- / antisuurspasiëring by die geëtiketteerde produk pas — moenie ’n persoonlike skedule versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa thrombopoietin receptor agonist ena hantle kamoo e hlalositsoeng holabel — melao ea lijo le ho arola liminerale e holabel.",
      "Keletso ea eltrombopag hangata e kenyelletsa ho hlokomela li-platelet le thuto ea kotsi ea tlala ea mali. Materia ha e iqape tekanyo, nako ea lijo, kapa sepheo sa platelet.",
      "Bolella rakhemisi ka lefu la sebete, histori ea tlala ea mali, le MERIANA KAPA LI-SUPPLEMENT TSOHLE tsa liminerale.",
      "Tlaleha ho otloloa ho sa tloaelehang, hlooho e bohloko haholo, bohloko ba mpeng, moroto o lefifi, kapa ho ruruha ha leoto kapele.",
      "Botsa hore litekanyo tse lahlehileng le ho arola lijo / li-antacid li tšoana joang le sehlahiswa se nang le leibole — se ke oa iqapa kemiso ea hau.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le thrombopoietin receptor agonist ngokuchanekileyo njengoko kubhaliwe kwileyibhile — imithetho yokutya nokwahlula iiminerali ibhalwe kwileyibhile.",
      "Iingcebiso ze-eltrombopag zihlala zibandakanya ukuqapha ii-platelet nokufundisa ngomngcipheko weqhwa. I-Materia ayiyiqiqi idosi, iwotshi yesidlo, okanye usukelo lwe-platelet.",
      "Xelela usokhemisti ngesifo sesibindi, imbali yeqhwa, NAWO ONKE amayeza okanye izongezo zeeminerali.",
      "Xela ukulimala okungaqhelekanga, intloko ebuhlungu kakhulu, iintlungu zesisu, umchamo omnyama, okanye ukudumba kweqakala kwangoko.",
      "Buza indlela iidosi ezilahlekileyo nokwahlula ukutya / ii-antacid ezihambelana ngayo nemveliso eneleyibhile — sukuyiqqa ishedyuli yakho.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-deferasirox": five(
    [
      "Take this oral iron chelator exactly as directed on your labelled product — dispersible and film-coated forms differ; confirm your labelled form.",
      "Deferasirox counselling commonly includes kidney, liver, and hearing / vision watch discussions. Materia does not invent a dose, fasting clock, or ferritin target.",
      "Tell your pharmacist about kidney or liver disease, hearing or vision problems, and ALL other medicines on your list.",
      "Report reduced urine, yellowing of eyes, severe diarrhoea, hearing change, or sudden vision change early.",
      "Ask how food timing and missed doses fit the labelled product — do not invent a personal chelation schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le oral iron chelator njengoba kubhalwe kumkhiqizo onelebula — amafomu a-dispersible ne-film-coated ayahluka; qinisekisa ifomu yakho yelebula.",
      "Ukwelulekwa kwe-deferasirox kuvame ukufaka izingxoxo zokuqapha izinto, isibindi, nokuzwa / ukubona. I-Materia ayiqambi umthamo, iwashi lokulamba, noma umgomo we-ferritin.",
      "Tshela umkhiqizi ngesifo sezinso noma sesibindi, izinkinga zokuzwa noma zokubona, NAWO WONKE amanye amaphilisi.",
      "Bika umchamo omncane, ukuphuzi kwamehlo, uhudo olukhulu, ukushintsha kokuzwa, noma ukushintsha kokubona okuzumayo ngokushesha.",
      "Buza ukuthi isikhathi sokudla nemithamo elahlekile kuhambisana kanjani nomkhiqizo onelebula — ungayiqiqi uhlelo lwakho lwe-chelation.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie orale ysterchelator soos op die geëtiketteerde produk aangedui — dispergeerbare en filmbedekte vorms verskil; bevestig jou geëtiketteerde vorm.",
      "Deferasirox-berading sluit dikwels nier-, lewer-, en gehoor- / sigwaakgesprekke in. Materia versin nie ’n dosis, vastydklok of ferritienteiken nie.",
      "Sê vir jou apteker van nier- of lewersiekte, gehoor- of sigprobleme, en ALLE ander medisyne op jou lys.",
      "Rapporteer verminderde urine, vergeling van oë, ernstige diarree, gehoorverandering, of skielike sigverandering vroeg.",
      "Vra hoe voedingstiming en gemiste dosisse by die geëtiketteerde produk pas — moenie ’n persoonlike chelasieskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa oral iron chelator ena hantle kamoo e hlalositsoeng holabel — mefuta ea dispersible le film-coated ea fapana; netefatsa mofuta oa hau oa leibole.",
      "Keletso ea deferasirox hangata e kenyelletsa lipuisano tsa ho hlokomela liphio, sebete, le kutlo / pono. Materia ha e iqape tekanyo, nako ea ho itima, kapa sepheo sa ferritin.",
      "Bolella rakhemisi ka lefu la liphio kapa sebete, mathata a kutlo kapa pono, le MERIANA EOHLE e meng.",
      "Tlaleha moroto o fokotsehileng, ho tšehla ha mahlo, letšollo le matla, phetoho ea kutlo, kapa phetoho ea pono ka tšohanyetso kapele.",
      "Botsa hore nako ea lijo le litekanyo tse lahlehileng li tšoana joang le sehlahiswa se nang le leibole — se ke oa iqapa kemiso ea hau ea chelation.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le oral iron chelator ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iifomu ze-dispersible ne-film-coated ziyahluka; qinisekisa ifomu yakho yeleyibhile.",
      "Iingcebiso ze-deferasirox zihlala zibandakanya iingxoxo zokuqapha izintso, isibindi, nokuva / ukubona. I-Materia ayiyiqiqi idosi, iwotshi yokulamba, okanye usukelo lwe-ferritin.",
      "Xelela usokhemisti ngesifo sezintso okanye sesibindi, iingxaki zokuva okanye zokubona, NAWO ONKE amanye amayeza.",
      "Xela umchamo omncinci, ukuphuzi kwamehlo, urhudo olunzima, utshintsho lokuva, okanye utshintsho lokubona ngequbuliso kwangoko.",
      "Buza indlela ixesha lokutya needosi ezilahlekileyo ezihambelana ngayo nemveliso eneleyibhile — sukuyiqqa ishedyuli yakho ye-chelation.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-folinic-acid": five(
    [
      "Use this reduced folate exactly as directed on your labelled product — rescue and support uses differ; confirm why you were given it.",
      "Folinic acid counselling commonly includes timing with chemotherapy or methotrexate plans. Materia does not invent a dose, rescue clock, or folate target.",
      "Tell your pharmacist about ALL other folate products, methotrexate, and chemotherapy-support medicines on your list.",
      "Report severe mouth ulcers, unexplained fever, or unusual bruising early for clinician review.",
      "Ask how missed doses fit your labelled rescue or support plan — do not invent a personal schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le reduced folate njengoba kubhalwe kumkhiqizo onelebula — ukusindisa nokusekela kuyahluka; qinisekisa ukuthi unikewe ngani.",
      "Ukwelulekwa kwe-folinic acid kuvame ukufaka isikhathi nezinhlelo ze-chemotherapy noma methotrexate. I-Materia ayiqambi umthamo, iwashi lokusindisa, noma umgomo we-folate.",
      "Tshela umkhiqizi NGOWO WONKE amanye amakhiqizo e-folate, i-methotrexate, namaphilisi asekelayo e-chemotherapy.",
      "Bika izilonda zomlomo ezinkulu, umkhuhlane ongachazeki, noma ukulimala okungajwayelekile ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwakho lwelebula lokusindisa noma lokusekela — ungayiqiqi uhlelo lakho.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie gereduseerde folaat soos op die geëtiketteerde produk aangedui — reddings- en ondersteuningsgebruike verskil; bevestig waarom jy dit gekry het.",
      "Folienzuur-berading sluit dikwels timing met chemoterapie- of metotreksaatplanne in. Materia versin nie ’n dosis, reddingsklok of folaatteiken nie.",
      "Sê vir jou apteker van ALLE ander folaatprodukte, metotreksaat, en chemoterapie-ondersteuningsmedisyne op jou lys.",
      "Rapporteer ernstige mondsere, onverklaarde koors, of ongewone kneusings vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse by jou geëtiketteerde reddings- of ondersteuningsplan pas — moenie ’n persoonlike skedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa reduced folate ena hantle kamoo e hlalositsoeng holabel — tšebeliso ea ho pholosa le tšehetso ea fapana; netefatsa hore na u e filoe hobaneng.",
      "Keletso ea folinic acid hangata e kenyelletsa nako le merero ea chemotherapy kapa methotrexate. Materia ha e iqape tekanyo, nako ea ho pholosa, kapa sepheo sa folate.",
      "Bolella rakhemisi ka LIHLAHISWA TSOHLE tsa folate, methotrexate, le meriana ea tšehetso ea chemotherapy.",
      "Tlaleha liso tsa molomo tse matla, feberu e sa hlaloseng, kapa ho otloloa ho sa tloaelehang kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa hau oa leibole oa ho pholosa kapa tšehetso — se ke oa iqapa kemiso ea hau.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le reduced folate ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukusindisa nokuxhasa kuyahluka; qinisekisa ukuba unikwe ntoni.",
      "Iingcebiso ze-folinic acid zihlala zibandakanya ixesha nezicwangciso ze-chemotherapy okanye methotrexate. I-Materia ayiyiqiqi idosi, iwotshi yokusindisa, okanye usukelo lwe-folate.",
      "Xelela usokhemisti NGAZO ZONKE ezinye iimveliso ze-folate, i-methotrexate, namayeza axhasa i-chemotherapy.",
      "Xela izilonda zomlomo ezinzima, umkhuhlane ongachazekiyo, okanye ukulimala okungaqhelekanga kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso sakho seleyibhile sokusindisa okanye soxhaso — sukuyiqqa ishedyuli yakho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-fondaparinux": five(
    [
      "Use this synthetic pentasaccharide anticoagulant exactly as directed on your labelled product — injection technique belongs with your care team.",
      "Fondaparinux counselling commonly includes bleeding watch and not mixing anticoagulant advice casually. Materia does not invent a dose, injection schedule, or anti-Xa target.",
      "Tell your pharmacist about kidney disease, recent surgery, bleeding history, and ALL other blood thinners on your list.",
      "Report unusual bruising, black stools, coughing blood, severe headache, or prolonged bleeding early.",
      "Ask how missed injections fit the labelled plan — do not invent a double-up schedule.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le synthetic pentasaccharide anticoagulant njengoba kubhalwe kumkhiqizo onelebula — indlela yokujova ihambisana nethimba lakho lokunakekelwa.",
      "Ukwelulekwa kwe-fondaparinux kuvame ukufaka ukuqapha ukopha nokungaxubi izeluleko ze-anticoagulant nje. I-Materia ayiqambi umthamo, uhlelo lokujova, noma umgomo we-anti-Xa.",
      "Tshela umkhiqizi ngesifo sezinso, ukuhlinzwa kwakamuva, umlando wokopha, NAWO WONKE amanye amaphilisi athambisa igazi.",
      "Bika ukulimala okungajwayelekile, indle emnyama, ukukhwehlela igazi, ikhanda elibuhlungu kakhulu, noma ukopha okude ngokushesha.",
      "Buza ukuthi ukujova okulahlekile kuhambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lokuphinda kabili.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie sintetiese pentasakkaride-antikoagulant soos op die geëtiketteerde produk aangedui — inspuitingstegniek behoort by jou sorgspan.",
      "Fondaparinux-berading sluit dikwels bloedingwaak in en nie antikoagulant-advies lukraak meng nie. Materia versin nie ’n dosis, inspuitingskedule of anti-Xa-teiken nie.",
      "Sê vir jou apteker van niersiekte, onlangse chirurgie, bloedinggeskiedenis, en ALLE ander bloedverdunners op jou lys.",
      "Rapporteer ongewone kneusings, swart stoelgang, bloed hoes, ernstige hoofpyn, of langdurige bloeding vroeg.",
      "Vra hoe gemiste inspuitings by die geëtiketteerde plan pas — moenie ’n verdubbelingskedule versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa synthetic pentasaccharide anticoagulant ena hantle kamoo e hlalositsoeng holabel — mokhoa oa ho enteoa ke oa sehlopha sa hau sa tlhokomelo.",
      "Keletso ea fondaparinux hangata e kenyelletsa ho hlokomela ho tsoa mali le ho se kopanye keletso ea anticoagulant feela. Materia ha e iqape tekanyo, kemiso ea ho enteoa, kapa sepheo sa anti-Xa.",
      "Bolella rakhemisi ka lefu la liphio, opereishene ea morao tjena, histori ea ho tsoa mali, le MERIANA EOHLE e fokotsang mali.",
      "Tlaleha ho otloloa ho sa tloaelehang, mantle a lefifi, ho khohlela mali, hlooho e bohloko haholo, kapa ho tsoa mali ho telele kapele.",
      "Botsa hore lienteo tse lahlehileng li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea ho pheta habeli.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le synthetic pentasaccharide anticoagulant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ubuchule bokutofa buhamba neqela lakho lokhathalelo.",
      "Iingcebiso ze-fondaparinux zihlala zibandakanya ukuqapha ukopha nokungaxubi iingcebiso ze-anticoagulant nje. I-Materia ayiyiqiqi idosi, ishedyuli yokutofa, okanye usukelo lwe-anti-Xa.",
      "Xelela usokhemisti ngesifo sezintso, utyando lwakutsha nje, imbali yokopha, NAWO ONKE amanye amayeza athambisa igazi.",
      "Xela ukulimala okungaqhelekanga, indle emnyama, ukukhohlela igazi, intloko ebuhlungu kakhulu, okanye ukopha okude kwangoko.",
      "Buza indlela ukutofa okulahlekileyo okuhambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yokuphinda kabini.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-aciclovir-eye": five(
    [
      "Use this topical ophthalmic antiviral exactly as directed on your labelled product — ointment technique belongs with your eye-care advice.",
      "Aciclovir eye counselling commonly includes completing the labelled course and not sharing eye products. Materia does not invent a dose, application clock, or course length.",
      "Tell your pharmacist about other eye medicines, contact lens use, and ALL antiviral products on your list.",
      "Report worsening redness, severe eye pain, new vision blur, or swelling of the lids early.",
      "Ask how to space other eye products on the labelled pack — do not invent a personal schedule.",
      "If you get severe allergic swelling around the eyes or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical ophthalmic antiviral njengoba kubhalwe kumkhiqizo onelebula — indlela ye-ointment ihambisana neseluleko sakho samehlo.",
      "Ukwelulekwa kwe-aciclovir eye kuvame ukufaka ukuqeda inkambo yelebula nokungabelani ngamakhiqizo amehlo. I-Materia ayiqambi umthamo, iwashi lokufaka, noma ubude benkambo.",
      "Tshela umkhiqizi ngamanye amaphilisi amehlo, ukusetshenziswa kwama-contact lens, NAWO WONKE amakhiqizo e-antiviral.",
      "Bika ukubomvu okuya ngokuba kubi, ubuhlungu beso obukhulu, ukufiphala kokubona okusha, noma ukuvuvuka kwezicabucabu ngokushesha.",
      "Buza ukuthi amanye amakhiqizo amehlo ahlukaniswa kanjani kuphakethe onelebula — ungayiqiqi uhlelo lakho.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese oftalmiese antivirusmiddel soos op die geëtiketteerde produk aangedui — salftegniek behoort by jou oogversorgingsadvies.",
      "Aciclovir-oogberading sluit dikwels voltooiing van die geëtiketteerde kuur en nie deel van oogprodukte in. Materia versin nie ’n dosis, toedieningsklok of kuurduur nie.",
      "Sê vir jou apteker van ander oogmedisyne, kontaklensgebruik, en ALLE antivirusprodukte op jou lys.",
      "Rapporteer verergerende rooiheid, ernstige oogpyn, nuwe sigwaas, of ooglidswelling vroeg.",
      "Vra hoe om ander oogprodukte op die geëtiketteerde pak te spasieer — moenie ’n persoonlike skedule versin nie.",
      "As jy ernstige allergiese swelling rondom die oë of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical ophthalmic antiviral ena hantle kamoo e hlalositsoeng holabel — mokhoa oa ointment ke oa keletso ea hau ea mahlo.",
      "Keletso ea aciclovir eye hangata e kenyelletsa ho qeta thuto ea leibole le ho se arolelane lihlahiswa tsa mahlo. Materia ha e iqape tekanyo, nako ea ho kenya, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka meriana e meng ea mahlo, tšebeliso ea contact lens, le LIHLAHISWA TSOHLE tsa antiviral.",
      "Tlaleha bofubelu bo mpefala, bohloko ba leihlo bo matla, ho fifala ha pono ho mocha, kapa ho ruruha ha likoalo kapele.",
      "Botsa hore lihlahiswa tse ling tsa mahlo li lokela ho arola joang pakeng ea leibole — se ke oa iqapa kemiso ea hau.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical ophthalmic antiviral ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ubuchule be-ointment buhamba nengcebiso yakho yamehlo.",
      "Iingcebiso ze-aciclovir eye zihlala zibandakanya ukugqiba ikhosi yeleyibhile nokungabelani ngeemveliso zamehlo. I-Materia ayiyiqiqi idosi, iwotshi yokufaka, okanye ubude bekhosi.",
      "Xelela usokhemisti ngamanye amayeza amehlo, ukusetyenziswa kwe-contact lens, NAZO ZONKE iimveliso ze-antiviral.",
      "Xela ububomvu obuya kuba mbi, iintlungu zeliso ezinzima, ukufiphala kokubona okutsha, okanye ukudumba kwezicabucabu kwangoko.",
      "Buza indlela ezinye iimveliso zamehlo ezifanele zahlulwe ngayo kwipakethi eneleyibhile — sukuyiqqa ishedyuli yakho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-ciprofloxacin-eye": five(
    [
      "Use this topical ophthalmic fluoroquinolone exactly as directed on your labelled product — drops and ointment differ; confirm the form you were given.",
      "Ciprofloxacin eye counselling commonly includes completing the labelled course and not sharing eye products. Materia does not invent a dose, drop clock, or course length.",
      "Tell your pharmacist about fluoroquinolone allergy history, contact lens use, and ALL other eye medicines on your list.",
      "Report worsening redness, severe eye pain, white crystals on the cornea if noticed, or vision change early.",
      "Ask how to space other eye drops on the labelled pack — do not invent a personal schedule.",
      "If you get severe allergic swelling around the eyes or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical ophthalmic fluoroquinolone njengoba kubhalwe kumkhiqizo onelebula — amathonsi ne-ointment ayahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-ciprofloxacin eye kuvame ukufaka ukuqeda inkambo yelebula nokungabelani ngamakhiqizo amehlo. I-Materia ayiqambi umthamo, iwashi lathonsi, noma ubude benkambo.",
      "Tshela umkhiqizi ngomlando we-fluoroquinolone allergy, ukusetshenziswa kwama-contact lens, NAWO WONKE amanye amaphilisi amehlo.",
      "Bika ukubomvu okuya ngokuba kubi, ubuhlungu beso obukhulu, amakristalu amhlophe ku-cornea uma ubona, noma ukushintsha kokubona ngokushesha.",
      "Buza ukuthi amanye amathonsi amehlo ahlukaniswa kanjani kuphakethe onelebula — ungayiqiqi uhlelo lakho.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese oftalmiese fluorokinoloon soos op die geëtiketteerde produk aangedui — druppels en salf verskil; bevestig die vorm wat jy gekry het.",
      "Ciprofloxacin-oogberading sluit dikwels voltooiing van die geëtiketteerde kuur en nie deel van oogprodukte in. Materia versin nie ’n dosis, druppelklok of kuurduur nie.",
      "Sê vir jou apteker van fluorokinoloon-allergiegeskiedenis, kontaklensgebruik, en ALLE ander oogmedisyne op jou lys.",
      "Rapporteer verergerende rooiheid, ernstige oogpyn, wit kristalle op die kornea indien opgemerk, of sigverandering vroeg.",
      "Vra hoe om ander oogdruppels op die geëtiketteerde pak te spasieer — moenie ’n persoonlike skedule versin nie.",
      "As jy ernstige allergiese swelling rondom die oë of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical ophthalmic fluoroquinolone ena hantle kamoo e hlalositsoeng holabel — mathopa le ointment lia fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea ciprofloxacin eye hangata e kenyelletsa ho qeta thuto ea leibole le ho se arolelane lihlahiswa tsa mahlo. Materia ha e iqape tekanyo, nako ea thopa, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka histori ea fluoroquinolone allergy, tšebeliso ea contact lens, le MERIANA EOHLE ea mahlo.",
      "Tlaleha bofubelu bo mpefala, bohloko ba leihlo bo matla, likristale tse tšoeu ho cornea haeba li hlokometsoe, kapa phetoho ea pono kapele.",
      "Botsa hore mathopa a mang a mahlo a lokela ho arola joang pakeng ea leibole — se ke oa iqapa kemiso ea hau.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical ophthalmic fluoroquinolone ngokuchanekileyo njengoko kubhaliwe kwileyibhile — amathontsi ne-ointment iyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-ciprofloxacin eye zihlala zibandakanya ukugqiba ikhosi yeleyibhile nokungabelani ngeemveliso zamehlo. I-Materia ayiyiqiqi idosi, iwotshi yethontsi, okanye ubude bekhosi.",
      "Xelela usokhemisti ngembali ye-fluoroquinolone allergy, ukusetyenziswa kwe-contact lens, NAWO ONKE amanye amayeza amehlo.",
      "Xela ububomvu obuya kuba mbi, iintlungu zeliso ezinzima, iikristale ezimhlophe kwi-cornea ukuba ziyabonwa, okanye utshintsho lokubona kwangoko.",
      "Buza indlela amanye amathontsi amehlo afanele ahlulwe ngayo kwipakethi eneleyibhile — sukuyiqqa ishedyuli yakho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-prednisolone-eye": five(
    [
      "Use this topical ophthalmic corticosteroid exactly as directed on your labelled product — do not prolong courses without clinician review.",
      "Prednisolone eye counselling commonly includes infection watch and pressure checks when used longer-term. Materia does not invent a dose, drop clock, or eye-pressure target.",
      "Tell your pharmacist about eye infection history, glaucoma history, contact lens use, and ALL other eye medicines on your list.",
      "Report worsening redness, severe eye pain, new vision blur, or light sensitivity early.",
      "Ask how to taper or stop on the labelled plan — do not invent a personal taper schedule.",
      "If you get severe allergic swelling around the eyes or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical ophthalmic corticosteroid njengoba kubhalwe kumkhiqizo onelebula — ungayidlulisi inkambo ngaphandle kokubuyekezwa kudokotela.",
      "Ukwelulekwa kwe-prednisolone eye kuvame ukufaka ukuqapha izifo nokuhlolwa komfutho uma kusetshenziswa isikhathi eside. I-Materia ayiqambi umthamo, iwashi lathonsi, noma umgomo womfutho weso.",
      "Tshela umkhiqizi ngomlando wezifo zamehlo, umlando we-glaucoma, ukusetshenziswa kwama-contact lens, NAWO WONKE amanye amaphilisi amehlo.",
      "Bika ukubomvu okuya ngokuba kubi, ubuhlungu beso obukhulu, ukufiphala kokubona okusha, noma ukuzwela ukukhanya ngokushesha.",
      "Buza ukuthi kuncishiswa noma kuyekwa kanjani ngohlelo lwelebula — ungayiqiqi uhlelo lwakho lokunciphisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese oftalmiese kortikosteroïed soos op die geëtiketteerde produk aangedui — moenie kurse verleng sonder klinikus-hersiening nie.",
      "Prednisolone-oogberading sluit dikwels infeksiewaak en drukkontroles by langer gebruik in. Materia versin nie ’n dosis, druppelklok of oogdrukteiken nie.",
      "Sê vir jou apteker van ooginfeksiegeskiedenis, gloukoomgeskiedenis, kontaklensgebruik, en ALLE ander oogmedisyne op jou lys.",
      "Rapporteer verergerende rooiheid, ernstige oogpyn, nuwe sigwaas, of ligsensitiwiteit vroeg.",
      "Vra hoe om af te bou of te stop volgens die geëtiketteerde plan — moenie ’n persoonlike afbouskedule versin nie.",
      "As jy ernstige allergiese swelling rondom die oë of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical ophthalmic corticosteroid ena hantle kamoo e hlalositsoeng holabel — se ke oa lelefatsa lithuto ntle le tlhahlobo ea ngaka.",
      "Keletso ea prednisolone eye hangata e kenyelletsa ho hlokomela tšoaetso le litlhahlobo tsa khatello ha e sebelisoa nako e telele. Materia ha e iqape tekanyo, nako ea thopa, kapa sepheo sa khatello ea leihlo.",
      "Bolella rakhemisi ka histori ea tšoaetso ea mahlo, histori ea glaucoma, tšebeliso ea contact lens, le MERIANA EOHLE ea mahlo.",
      "Tlaleha bofubelu bo mpefala, bohloko ba leihlo bo matla, ho fifala ha pono ho mocha, kapa ho utloa bohloko ha leseli kapele.",
      "Botsa hore ho fokotsoa kapa ho emisa ho etsoa joang ka moralo oa leibole — se ke oa iqapa kemiso ea hau ea ho fokotsa.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical ophthalmic corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyandisa iikhosi ngaphandle kokujongwa kugqirha.",
      "Iingcebiso ze-prednisolone eye zihlala zibandakanya ukuqapha usulelo nokuhlolwa koxinzelelo xa kusetyenziswa ixesha elide. I-Materia ayiyiqiqi idosi, iwotshi yethontsi, okanye usukelo loxinzelelo lweliso.",
      "Xelela usokhemisti ngembali yosulelo lwamehlo, imbali ye-glaucoma, ukusetyenziswa kwe-contact lens, NAWO ONKE amanye amayeza amehlo.",
      "Xela ububomvu obuya kuba mbi, iintlungu zeliso ezinzima, ukufiphala kokubona okutsha, okanye ukuzwia ukukhanya kwangoko.",
      "Buza indlela yokunciphisa okanye yokuyeka kwisicwangciso seleyibhile — sukuyiqqa ishedyuli yakho yokunciphisa.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-mometasone-nasal": five(
    [
      "Use this intranasal corticosteroid exactly as directed on your labelled product — technique and priming belong on the label.",
      "Mometasone nasal counselling commonly includes nosebleed watch and not expecting instant relief. Materia does not invent a dose, spray clock, or allergy score.",
      "Tell your pharmacist about recent nose surgery, nose ulcers, untreated infections, and ALL other steroid products on your list.",
      "Report persistent nosebleeds, white patches in the nose, vision change, or facial pain early.",
      "Ask how missed sprays fit the labelled plan — do not invent a double-up schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le intranasal corticosteroid njengoba kubhalwe kumkhiqizo onelebula — indlela nokuqalisa kusebhala ilebula.",
      "Ukwelulekwa kwe-mometasone nasal kuvame ukufaka ukuqapha ukopha kwamakhala nokungalindeli usizo olusheshayo. I-Materia ayiqambi umthamo, iwashi lespray, noma isikali se-allergy.",
      "Tshela umkhiqizi ngokuhlinzwa kwamakhala kwakamuva, izilonda zamakhala, izifo ezingelashwanga, NAWO WONKE amanye amakhiqizo e-steroid.",
      "Bika ukopha kwamakhala okuqhubekayo, amabala amhlophe emakhaleni, ukushintsha kokubona, noma ubuhlungu bobuso ngokushesha.",
      "Buza ukuthi amaspray alahlekile ahambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lokuphinda kabili.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie intranasale kortikosteroïed soos op die geëtiketteerde produk aangedui — tegniek en voorpriming staan op die etiket.",
      "Mometasone-neusberading sluit dikwels neusbloedingwaak in en verwag nie oombliklike verligting nie. Materia versin nie ’n dosis, spuitklok of allergiestelling nie.",
      "Sê vir jou apteker van onlangse neuschirurgie, neusulkusse, onbehandelde infeksies, en ALLE ander steroïedprodukte op jou lys.",
      "Rapporteer aanhoudende neusbloedings, wit kolle in die neus, sigverandering, of gesigspyn vroeg.",
      "Vra hoe gemiste spuite by die geëtiketteerde plan pas — moenie ’n verdubbelingskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa intranasal corticosteroid ena hantle kamoo e hlalositsoeng holabel — mokhoa le ho qala li holabel.",
      "Keletso ea mometasone nasal hangata e kenyelletsa ho hlokomela ho tsoa mali ha nko le ho se lebelle thuso ea potlako. Materia ha e iqape tekanyo, nako ea spray, kapa lintlha tsa allergy.",
      "Bolella rakhemisi ka opereishene ea nko ea morao tjena, liso tsa nko, tšoaetso e sa phekoloang, le LIHLAHISWA TSOHLE tsa steroid.",
      "Tlaleha ho tsoa mali ha nko ho tsoelang pele, matheba a sootho ka nko, phetoho ea pono, kapa bohloko ba sefahleho kapele.",
      "Botsa hore li-spray tse lahlehileng li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea ho pheta habeli.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le intranasal corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ubuchule nokuqalisa kubhalwe kwileyibhile.",
      "Iingcebiso ze-mometasone nasal zihlala zibandakanya ukuqapha ukopha kwempumlo nokungalindeli uncedo olukhawulezayo. I-Materia ayiyiqiqi idosi, iwotshi yespray, okanye amanqaku e-allergy.",
      "Xelela usokhemisti ngotyando lwempumlo lwakutsha nje, izilonda zempumlo, usulelo olunganyangekanga, NAZO ZONKE ezinye iimveliso ze-steroid.",
      "Xela ukopha kwempumlo okuqhubekayo, amabala amhlophe empumlweni, utshintsho lokubona, okanye iintlungu zobuso kwangoko.",
      "Buza indlela iispray ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yokuphinda kabini.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-diphenhydramine": five(
    [
      "Take this sedating antihistamine exactly as directed on your labelled product — drowsiness is common counselling; avoid driving if affected.",
      "Diphenhydramine counselling commonly includes alcohol and other sedative interaction checks. Materia does not invent a dose, spacing hours, or allergy score.",
      "Tell your pharmacist about glaucoma, prostate problems, asthma history, and ALL other sedating medicines on your list.",
      "Report confusion, trouble urinating, fast heartbeat, or paradoxical restlessness early.",
      "Ask how this fits with cough–cold multi-ingredient packs — do not invent a personal combination plan.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le sedating antihistamine njengoba kubhalwe kumkhiqizo onelebula — ukozela kuvame ukufundiswa; gwema ukushayela uma kuthinta.",
      "Ukwelulekwa kwe-diphenhydramine kuvame ukufaka ukuhlola ukuxhumana notshwala namanye amaphilisi azolisa. I-Materia ayiqambi umthamo, amahora okuhlukanisa, noma isikali se-allergy.",
      "Tshela umkhiqizi nge-glaucoma, izinkinga ze-prostate, umlando we-asthma, NAWO WONKE amanye amaphilisi azolisa.",
      "Bika ukudideka, ukunzima ukuchama, ukushaya kwenhliziyo okusheshayo, noma ukungaphumuli okungajwayelekile ngokushesha.",
      "Buza ukuthi lokhu kuhambisana kanjani namaphakethe amaningi e-cough–cold — ungayiqiqi uhlelo lwakho lokuhlanganisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie sederende antihistamien soos op die geëtiketteerde produk aangedui — slaperigheid is algemene berading; vermy bestuur as jy geraak word.",
      "Diphenhidramien-berading sluit dikwels alkohol- en ander sederende interaksiekontroles in. Materia versin nie ’n dosis, spasiëringsure of allergiestelling nie.",
      "Sê vir jou apteker van gloukoom, prostaatprobleme, asmageskiedenis, en ALLE ander sederende medisyne op jou lys.",
      "Rapporteer verwarring, moeilikheid om te urineer, vinnige hartklop, of paradoksale rusteloosheid vroeg.",
      "Vra hoe dit by hoes-verkoue multi-bestanddeelpakkies pas — moenie ’n persoonlike kombinasieplan versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa sedating antihistamine ena hantle kamoo e hlalositsoeng holabel — ho otsela ke keletso e tloaelehileng; qoba ho khanna haeba u amehile.",
      "Keletso ea diphenhydramine hangata e kenyelletsa litlhahlobo tsa ho sebelisana le joala le meriana e meng e otlolang. Materia ha e iqape tekanyo, lihora tsa ho arola, kapa lintlha tsa allergy.",
      "Bolella rakhemisi ka glaucoma, mathata a prostate, histori ea asthma, le MERIANA EOHLE e otlolang.",
      "Tlaleha ho ferekana, bothata ba ho ntša moroto, ho otla ha pelo ka potlako, kapa ho se phomole ho sa tloaelehang kapele.",
      "Botsa hore sena se tšoana joang le lipaka tse ngata tsa cough–cold — se ke oa iqapa moralo oa hau oa ho kopanya.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le sedating antihistamine ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukozela kuhlala kufundiswa; phepha ukuqhuba ukuba kuchaphazelekile.",
      "Iingcebiso ze-diphenhydramine zihlala zibandakanya ukujonga ukusebenzelana notywala namanye amayeza azolisa. I-Materia ayiyiqiqi idosi, iiyure zokwahlula, okanye amanqaku e-allergy.",
      "Xelela usokhemisti nge-glaucoma, iingxaki ze-prostate, imbali ye-asthma, NAWO ONKE amanye amayeza azolisa.",
      "Xela ukudideka, ubunzima bokuchama, ukubetha kwentliziyo okukhawulezayo, okanye ukungaphumli okungaqhelekanga kwangoko.",
      "Buza indlela oku kuhambelana ngayo neepakethi ezininzi ze-cough–cold — sukuyiqqa isicwangciso sakho sokudibanisa.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
