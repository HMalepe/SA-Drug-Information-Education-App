/**
 * v280–v289 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V280_TO_V289: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-mefenamic": five(
    [
      "Take this NSAID exactly as directed on your labelled product — usually with food if the label advises; confirm your pack.",
      "Mefenamic acid counselling commonly includes stomach, kidney, and bleeding-risk discussions. Materia does not invent a dose, spacing hours, or pain score.",
      "Tell your pharmacist about stomach ulcers, kidney disease, asthma, blood thinners, and ALL other pain medicines on your list.",
      "Report black stools, severe stomach pain, swelling of ankles, or unexplained bruising early.",
      "Ask how missed doses fit the labelled plan — do not invent a double-up schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le NSAID njengoba kubhalwe kumkhiqizo onelebula — kuvame nokudla uma ilebula ivuma; qinisekisa iphakethe lakho.",
      "Ukwelulekwa kwe-mefenamic acid kuvame ukufaka izingxoxo zesisu, izinto, nokopha. I-Materia ayiqambi umthamo, amahora okuhlukanisa, noma isikali sobuhlungu.",
      "Tshela umkhiqizi ngezilonda zesisu, isifo sezinso, i-asthma, amaphilisi athambisa igazi, NAWO WONKE amanye amaphilisi ezinhlungu.",
      "Bika indle emnyama, ubuhlungu besisu obukhulu, ukuvuvuka kamaqakala, noma ukulimala okungachazeki ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lokuphinda kabili.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie NSAID soos op die geëtiketteerde produk aangedui — gewoonlik met kos as die etiket dit raad; bevestig jou pak.",
      "Mefenamien-suur-berading sluit dikwels maag-, nier-, en bloedingrisiko-gesprekke in. Materia versin nie ’n dosis, spasiëringsure of pynstelling nie.",
      "Sê vir jou apteker van maagsere, niersiekte, asma, bloedverdunners, en ALLE ander pynmedisyne op jou lys.",
      "Rapporteer swart stoelgang, ernstige maagpyn, enkelswelling, of onverklaarde kneusings vroeg.",
      "Vra hoe gemiste dosisse by die geëtiketteerde plan pas — moenie ’n verdubbelingskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa NSAID ena hantle kamoo e hlalositsoeng holabel — hangata le lijo haeba leibole e eletsa; netefatsa paka ea hau.",
      "Keletso ea mefenamic acid hangata e kenyelletsa lipuisano tsa mpeng, liphio, le kotsi ea ho tsoa mali. Materia ha e iqape tekanyo, lihora tsa ho arola, kapa lintlha tsa bohloko.",
      "Bolella rakhemisi ka liso tsa mpeng, lefu la liphio, asthma, meriana e fokotsang mali, le MERIANA EOHLE ea bohloko.",
      "Tlaleha mantle a lefifi, bohloko ba mpeng bo matla, ho ruruha ha maoto, kapa ho otloloa ho sa hlaloseng kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea ho pheta habeli.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le NSAID ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala nokutya ukuba ileyibhile iyacebisa; qinisekisa ipakethi yakho.",
      "Iingcebiso ze-mefenamic acid zihlala zibandakanya iingxoxo zesisu, izintso, nomngcipheko wokopha. I-Materia ayiyiqiqi idosi, iiyure zokwahlula, okanye amanqaku entlungu.",
      "Xelela usokhemisti ngezilonda zesisu, isifo sezintso, i-asthma, amayeza athambisa igazi, NAWO ONKE amanye amayeza entlungu.",
      "Xela indle emnyama, iintlungu zesisu ezinzima, ukudumba kwamaqakala, okanye ukulimala okungachazekiyo kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yokuphinda kabini.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-hydrocortisone-systemic": five(
    [
      "Take this systemic corticosteroid exactly as directed on your labelled product — replacement and anti-inflammatory uses differ; confirm why you were given it.",
      "Hydrocortisone systemic counselling commonly includes sick-day rules and not stopping suddenly without a clinician plan. Materia does not invent a dose, sick-day clock, or cortisol target.",
      "Tell your pharmacist about diabetes, infection history, stomach ulcers, and ALL other steroid products on your list.",
      "Report fever, vomiting that stops you taking tablets, black stools, or unusual swelling early.",
      "Ask how missed doses and stress-dose plans fit the labelled product — do not invent a personal sick-day schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le systemic corticosteroid njengoba kubhalwe kumkhiqizo onelebula — ukubuyisela nokulwa nokuvuvuka kuyahluka; qinisekisa ukuthi unikewe ngani.",
      "Ukwelulekwa kwe-hydrocortisone systemic kuvame ukufaka imithetho yezinsuku zokugula nokungayeki ngokuzumayo ngaphandle kohlelo lukadokotela. I-Materia ayiqambi umthamo, iwashi losuku lokugula, noma umgomo we-cortisol.",
      "Tshela umkhiqizi nge-diabetes, umlando wezifo, izilonda zesisu, NAWO WONKE amanye amakhiqizo e-steroid.",
      "Bika umkhuhlane, ukuhlanza okuvimbela ukuthatha amaphilisi, indle emnyama, noma ukuvuvuka okungajwayelekile ngokushesha.",
      "Buza ukuthi imithamo elahlekile nezinhlelo ze-stress-dose zihambisana kanjani nomkhiqizo onelebula — ungayiqiqi uhlelo lwakho losuku lokugula.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie sistemiese kortikosteroïed soos op die geëtiketteerde produk aangedui — vervangings- en anti-inflammatoriese gebruike verskil; bevestig waarom jy dit gekry het.",
      "Hidrokortisoon-sistemiese berading sluit dikwels siektedag-reëls in en moenie skielik stop sonder ’n klinikusplan nie. Materia versin nie ’n dosis, siektedagklok of cortisolteiken nie.",
      "Sê vir jou apteker van diabetes, infeksiegeskiedenis, maagsere, en ALLE ander steroïedprodukte op jou lys.",
      "Rapporteer koors, braking wat jou keer om tablette te neem, swart stoelgang, of ongewone swelling vroeg.",
      "Vra hoe gemiste dosisse en stresdosisplanne by die geëtiketteerde produk pas — moenie ’n persoonlike siektedagskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa systemic corticosteroid ena hantle kamoo e hlalositsoeng holabel — tšebeliso ea ho nkela sebaka le anti-inflammatory ea fapana; netefatsa hore na u e filoe hobaneng.",
      "Keletso ea hydrocortisone systemic hangata e kenyelletsa melao ea matsatsi a ho kula le ho se emise ka potlako ntle le moralo oa ngaka. Materia ha e iqape tekanyo, nako ea letsatsi la ho kula, kapa sepheo sa cortisol.",
      "Bolella rakhemisi ka diabetes, histori ea tšoaetso, liso tsa mpeng, le LIHLAHISWA TSOHLE tsa steroid.",
      "Tlaleha feberu, ho hlatsa ho thibelang ho nka lipilisi, mantle a lefifi, kapa ho ruruha ho sa tloaelehang kapele.",
      "Botsa hore litekanyo tse lahlehileng le merero ea stress-dose li tšoana joang le sehlahiswa se nang le leibole — se ke oa iqapa kemiso ea hau ea letsatsi la ho kula.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le systemic corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukubuyisela nokulwa nokudumba kuyahluka; qinisekisa ukuba unikwe ntoni.",
      "Iingcebiso ze-hydrocortisone systemic zihlala zibandakanya imithetho yeentsuku zokugula nokungayeki ngokungxamisekileyo ngaphandle kwesicwangciso sikagqirha. I-Materia ayiyiqiqi idosi, iwotshi yosuku lokugula, okanye usukelo lwe-cortisol.",
      "Xelela usokhemisti nge-diabetes, imbali yosulelo, izilonda zesisu, NAZO ZONKE ezinye iimveliso ze-steroid.",
      "Xela umkhuhlane, ukuhlanza okuthintela ukuthatha iipilisi, indle emnyama, okanye ukudumba okungaqhelekanga kwangoko.",
      "Buza indlela iidosi ezilahlekileyo nezicwangciso ze-stress-dose ezihambelana ngayo nemveliso eneleyibhile — sukuyiqqa ishedyuli yakho yosuku lokugula.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-folic-acid-rheum": five(
    [
      "Take this folate exactly as directed on your labelled product — methotrexate-support timing belongs with your rheumatology plan.",
      "Folic acid (MTX support) counselling commonly includes clarifying which day fits methotrexate, not inventing a personal calendar. Materia does not invent a dose, MTX clock, or folate target.",
      "Tell your pharmacist about pregnancy plans, other folate products, and ALL methotrexate or immunosuppressant medicines on your list.",
      "Report mouth ulcers, unusual bruising, unexplained fever, or severe tiredness early for clinician review.",
      "Ask how missed folate doses fit the labelled rheumatology plan — do not invent a catch-up schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le folate njengoba kubhalwe kumkhiqizo onelebula — isikhathi sokusekela i-methotrexate sihambisana nohlelo lwe-rheumatology.",
      "Ukwelulekwa kwe-folic acid (MTX support) kuvame ukufaka ukucacisa ukuthi usuku oluhambisana ne-methotrexate yiluphi, hhayi ukuqamba ikhalenda yakho. I-Materia ayiqambi umthamo, iwashi le-MTX, noma umgomo we-folate.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, amanye amakhiqizo e-folate, NAWO WONKE amaphilisi e-methotrexate noma e-immunosuppressant.",
      "Bika izilonda zomlomo, ukulimala okungajwayelekile, umkhuhlane ongachazeki, noma ukukhathala okukhulu ngokushesha.",
      "Buza ukuthi imithamo ye-folate elahlekile ihambisana kanjani nohlelo lwelebula lwe-rheumatology — ungayiqiqi uhlelo lokubuyisela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie folaat soos op die geëtiketteerde produk aangedui — metotreksaat-ondersteuningstiming behoort by jou reumatologieplan.",
      "Folienzuur (MTX-ondersteuning)-berading sluit dikwels in om duidelik te maak watter dag by metotreksaat pas, nie ’n persoonlike kalender versin nie. Materia versin nie ’n dosis, MTX-klok of folaatteiken nie.",
      "Sê vir jou apteker van swangerskapsplanne, ander folaatprodukte, en ALLE metotreksaat- of immuunonderdrukkende medisyne op jou lys.",
      "Rapporteer mondsere, ongewone kneusings, onverklaarde koors, of ernstige moegheid vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste folaatdosisse by die geëtiketteerde reumatologieplan pas — moenie ’n inhaalskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa folate ena hantle kamoo e hlalositsoeng holabel — nako ea tšehetso ea methotrexate ke ea moralo oa hau oa rheumatology.",
      "Keletso ea folic acid (MTX support) hangata e kenyelletsa ho hlakisa hore letsatsi lefe le tšoana le methotrexate, eseng ho iqapa Khalendara ea hau. Materia ha e iqape tekanyo, nako ea MTX, kapa sepheo sa folate.",
      "Bolella rakhemisi ka merero ea boimana, lihlahiswa tse ling tsa folate, le MERIANA EOHLE ea methotrexate kapa immunosuppressant.",
      "Tlaleha liso tsa molomo, ho otloloa ho sa tloaelehang, feberu e sa hlaloseng, kapa mokhathala o matla kapele.",
      "Botsa hore litekanyo tsa folate tse lahlehileng li tšoana joang le moralo oa leibole oa rheumatology — se ke oa iqapa kemiso ea ho tsosolosa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le folate ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ixesha lokuxhasa i-methotrexate lihamba nesicwangciso sakho se-rheumatology.",
      "Iingcebiso ze-folic acid (MTX support) zihlala zibandakanya ukucacisa ukuba lusuku olu lhambelana ne-methotrexate, hayi ukuyiqqa ikhalenda yakho. I-Materia ayiyiqiqi idosi, iwotshi ye-MTX, okanye usukelo lwe-folate.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, ezinye iimveliso ze-folate, NAWO ONKE amayeza e-methotrexate okanye e-immunosuppressant.",
      "Xela izilonda zomlomo, ukulimala okungaqhelekanga, umkhuhlane ongachazekiyo, okanye ukudinwa okunzima kwangoko.",
      "Buza indlela iidosi ze-folate ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile se-rheumatology — sukuyiqqa ishedyuli yokubuyisela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-phytomenadione": five(
    [
      "Use this vitamin K exactly as directed on your labelled product — oral and injection forms differ; confirm the form and reason you were given it.",
      "Phytomenadione counselling commonly includes bleeding watch and clarifying warfarin or clotting-plan context with the clinician. Materia does not invent a dose, INR target, or clotting score.",
      "Tell your pharmacist about warfarin or other anticoagulants, liver disease, and ALL other vitamin K products on your list.",
      "Report unusual bruising, black stools, coughing blood, or severe headache early.",
      "Ask how missed doses fit the labelled clotting plan — do not invent a personal catch-up schedule.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le vitamin K njengoba kubhalwe kumkhiqizo onelebula — amafomu omlomo nawokujova ayahluka; qinisekisa ifomu nesizathu sokunikezwa.",
      "Ukwelulekwa kwe-phytomenadione kuvame ukufaka ukuqapha ukopha nokucacisa umongo we-warfarin noma wohlelo lokugaya igazi nodokotela. I-Materia ayiqambi umthamo, umgomo we-INR, noma isikali sokugaya.",
      "Tshela umkhiqizi nge-warfarin noma amanye ama-anticoagulant, isifo sesibindi, NAWO WONKE amanye amakhiqizo e-vitamin K.",
      "Bika ukulimala okungajwayelekile, indle emnyama, ukukhwehlela igazi, noma ikhanda elibuhlungu kakhulu ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwelebula lokugaya — ungayiqiqi uhlelo lwakho lokubuyisela.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie vitamien K soos op die geëtiketteerde produk aangedui — orale en inspuitingsvorms verskil; bevestig die vorm en rede waarom jy dit gekry het.",
      "Fitomenadioon-berading sluit dikwels bloedingwaak in en om warfarien- of stolplan-konteks met die klinikus duidelik te maak. Materia versin nie ’n dosis, INR-teiken of stolstelling nie.",
      "Sê vir jou apteker van warfarien of ander antikoagulante, lewersiekte, en ALLE ander vitamien K-produkte op jou lys.",
      "Rapporteer ongewone kneusings, swart stoelgang, bloed hoes, of ernstige hoofpyn vroeg.",
      "Vra hoe gemiste dosisse by die geëtiketteerde stolplan pas — moenie ’n persoonlike inhaalskedule versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa vitamin K ena hantle kamoo e hlalositsoeng holabel — mefuta ea molomo le ho enteoa ea fapana; netefatsa mofuta le lebaka leo u e fileng.",
      "Keletso ea phytomenadione hangata e kenyelletsa ho hlokomela ho tsoa mali le ho hlakisa moelelo oa warfarin kapa moralo oa ho hlakola mali le ngaka. Materia ha e iqape tekanyo, sepheo sa INR, kapa lintlha tsa ho hlakola.",
      "Bolella rakhemisi ka warfarin kapa li-anticoagulant tse ling, lefu la sebete, le LIHLAHISWA TSOHLE tsa vitamin K.",
      "Tlaleha ho otloloa ho sa tloaelehang, mantle a lefifi, ho khohlela mali, kapa hlooho e bohloko haholo kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa leibole oa ho hlakola — se ke oa iqapa kemiso ea hau ea ho tsosolosa.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le vitamin K ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iifomu zomlomo nezokutofa ziyahluka; qinisekisa ifomu nesizathu sokunikwa.",
      "Iingcebiso ze-phytomenadione zihlala zibandakanya ukuqapha ukopha nokucacisa umxholo we-warfarin okanye wesicwangciso sokujika igazi nogqirha. I-Materia ayiyiqiqi idosi, usukelo lwe-INR, okanye amanqaku okujika.",
      "Xelela usokhemisti nge-warfarin okanye ezinye ii-anticoagulant, isifo sesibindi, NAZO ZONKE ezinye iimveliso ze-vitamin K.",
      "Xela ukulimala okungaqhelekanga, indle emnyama, ukukhohlela igazi, okanye intloko ebuhlungu kakhulu kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile sokujika — sukuyiqqa ishedyuli yakho yokubuyisela.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-potassium-citrate": five(
    [
      "Take this urinary alkaliniser exactly as directed on your labelled product — diluted liquid forms often need mixing as labelled.",
      "Potassium citrate counselling commonly includes potassium and kidney-function discussions. Materia does not invent a dose, urine pH target, or potassium target.",
      "Tell your pharmacist about kidney disease, high potassium history, potassium-sparing medicines, and ALL other supplements on your list.",
      "Report muscle weakness, irregular heartbeat, severe stomach pain, or reduced urine early.",
      "Ask how food and missed doses fit the labelled plan — do not invent a personal alkaliniser schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le urinary alkaliniser njengoba kubhalwe kumkhiqizo onelebula — amafomu awuketshezi avame ukudinga ukuxutshwa njengoba kubhalwe.",
      "Ukwelulekwa kwe-potassium citrate kuvame ukufaka izingxoxo ze-potassium nokusebenza kwezinso. I-Materia ayiqambi umthamo, umgomo we-pH yomchamo, noma umgomo we-potassium.",
      "Tshela umkhiqizi ngesifo sezinso, umlando we-potassium ephezulu, amaphilisi agcina i-potassium, NAWO WONKE amanye ama-supplement.",
      "Bika ubuthakathaka bemisipha, ukushaya kwenhliziyo okungajwayelekile, ubuhlungu besisu obukhulu, noma umchamo omncane ngokushesha.",
      "Buza ukuthi ukudla nemithamo elahlekile kuhambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lwakho lwe-alkaliniser.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie uriene-alkaliniseerder soos op die geëtiketteerde produk aangedui — verdunde vloeistofvorms moet dikwels gemeng word soos geëtiketteer.",
      "Kaliumsitraat-berading sluit dikwels kalium- en nierfunksiegesprekke in. Materia versin nie ’n dosis, urine-pH-teiken of kaliumteiken nie.",
      "Sê vir jou apteker van niersiekte, hoë-kaliumgeskiedenis, kaliumbesparende medisyne, en ALLE ander aanvullings op jou lys.",
      "Rapporteer spierswakheid, onreëlmatige hartklop, ernstige maagpyn, of verminderde urine vroeg.",
      "Vra hoe kos en gemiste dosisse by die geëtiketteerde plan pas — moenie ’n persoonlike alkaliniseerderskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa urinary alkaliniser ena hantle kamoo e hlalositsoeng holabel — mefuta ea motsoako hangata e hloka ho kopanya kamoo e hlalositsoeng.",
      "Keletso ea potassium citrate hangata e kenyelletsa lipuisano tsa potassium le tšebetso ea liphio. Materia ha e iqape tekanyo, sepheo sa pH ea moroto, kapa sepheo sa potassium.",
      "Bolella rakhemisi ka lefu la liphio, histori ea potassium e phahameng, meriana e bolokang potassium, le LI-SUPPLEMENT TSOHLE.",
      "Tlaleha bofokoli ba mesifa, ho otla ha pelo ho sa tloaelehang, bohloko ba mpeng bo matla, kapa moroto o fokotsehileng kapele.",
      "Botsa hore lijo le litekanyo tse lahlehileng li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea hau ea alkaliniser.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le urinary alkaliniser ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iifomu ezilulileyo zihlala zifuna ukuxutywa njengoko kubhaliwe.",
      "Iingcebiso ze-potassium citrate zihlala zibandakanya iingxoxo ze-potassium nokusebenza kwezintso. I-Materia ayiyiqiqi idosi, usukelo lwe-pH yomchamo, okanye usukelo lwe-potassium.",
      "Xelela usokhemisti ngesifo sezintso, imbali ye-potassium ephezulu, amayeza agcina i-potassium, NAZO ZONKE ezinye izongezo.",
      "Xela ubuthathaka bemisipha, ukubetha kwentliziyo okungaqhelekanga, iintlungu zesisu ezinzima, okanye umchamo omncinci kwangoko.",
      "Buza indlela ukutya needosi ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yakho ye-alkaliniser.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tranexamic-haem": five(
    [
      "Take this antifibrinolytic exactly as directed on your labelled product — haematology and heavy-bleeding contexts differ; confirm why you were given it.",
      "Tranexamic acid (haematology) counselling commonly includes clot-risk teaching and not inventing a personal bleeding plan. Materia does not invent a dose, bleed clock, or clot score.",
      "Tell your pharmacist about clot history, kidney disease, and ALL other antifibrinolytic or anticoagulant medicines on your list.",
      "Report calf swelling, chest pain, sudden vision change, or unusual weakness early.",
      "Ask how missed doses fit the labelled bleeding plan — do not invent a double-up schedule.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antifibrinolytic njengoba kubhalwe kumkhiqizo onelebula — i-haematology nokopha okukhulu kuyahluka; qinisekisa ukuthi unikewe ngani.",
      "Ukwelulekwa kwe-tranexamic acid (haematology) kuvame ukufaka ukufundisa ngeqhwa nokungaqambi uhlelo lwakho lokopha. I-Materia ayiqambi umthamo, iwashi lokopha, noma isikali seqhwa.",
      "Tshela umkhiqizi ngomlando weqhwa, isifo sezinso, NAWO WONKE amanye amaphilisi e-antifibrinolytic noma e-anticoagulant.",
      "Bika ukuvuvuka kweqakala, ubuhlungu besifuba, ukushintsha kokubona okuzumayo, noma ubuthakathaka obungajwayelekile ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwelebula lokopha — ungayiqiqi uhlelo lokuphinda kabili.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antifibrinolitiese middel soos op die geëtiketteerde produk aangedui — hematologie- en swaar-bloedingkontekste verskil; bevestig waarom jy dit gekry het.",
      "Traneksaamsuur (hematologie)-berading sluit dikwels klont-risiko-onderrig in en moenie ’n persoonlike bloedingplan versin nie. Materia versin nie ’n dosis, bloedingklok of klontstelling nie.",
      "Sê vir jou apteker van klontgeskiedenis, niersiekte, en ALLE ander antifibrinolitiese of antikoagulantmedisyne op jou lys.",
      "Rapporteer kuitswelling, borspyn, skielike sigverandering, of ongewone swakheid vroeg.",
      "Vra hoe gemiste dosisse by die geëtiketteerde bloedingplan pas — moenie ’n verdubbelingskedule versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antifibrinolytic ena hantle kamoo e hlalositsoeng holabel — haematology le maemo a ho tsoa mali haholo a fapana; netefatsa hore na u e filoe hobaneng.",
      "Keletso ea tranexamic acid (haematology) hangata e kenyelletsa thuto ea kotsi ea tlala ea mali le ho se iqape moralo oa hau oa ho tsoa mali. Materia ha e iqape tekanyo, nako ea ho tsoa mali, kapa lintlha tsa tlala.",
      "Bolella rakhemisi ka histori ea tlala ea mali, lefu la liphio, le MERIANA EOHLE ea antifibrinolytic kapa anticoagulant.",
      "Tlaleha ho ruruha ha leoto, bohloko ba sefuba, phetoho ea pono ka tšohanyetso, kapa bofokoli bo sa tloaelehang kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa leibole oa ho tsoa mali — se ke oa iqapa kemiso ea ho pheta habeli.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antifibrinolytic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — i-haematology nokopha okukhulu kuyahluka; qinisekisa ukuba unikwe ntoni.",
      "Iingcebiso ze-tranexamic acid (haematology) zihlala zibandakanya ukufundisa ngomngcipheko weqhwa nokungayiqqi isicwangciso sakho sokopha. I-Materia ayiyiqiqi idosi, iwotshi yokopha, okanye amanqaku eqhwa.",
      "Xelela usokhemisti ngembali yeqhwa, isifo sezintso, NAWO ONKE amanye amayeza e-antifibrinolytic okanye e-anticoagulant.",
      "Xela ukudumba kweqakala, iintlungu zesifuba, utshintsho lokubona ngequbuliso, okanye ubuthathaka obungaqhelekanga kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile sokopha — sukuyiqqa ishedyuli yokuphinda kabini.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-cotrim": five(
    [
      "Take this co-trimoxazole antibiotic exactly as directed on your labelled product — finish the labelled course unless your clinician says otherwise.",
      "Co-trimoxazole counselling commonly includes sulfa-allergy checks and sun-sensitivity teaching. Materia does not invent a dose, course length, or infection score.",
      "Tell your pharmacist about sulfa allergy history, kidney disease, folate deficiency concerns, and ALL other antibiotics on your list.",
      "Report rash, severe diarrhoea, unusual bruising, or yellowing of the eyes early.",
      "Ask how missed doses fit the labelled course — do not invent a catch-up plan.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le co-trimoxazole antibiotic njengoba kubhalwe kumkhiqizo onelebula — qeda inkambo yelebula ngaphandle kokuthi udokotela asho okunye.",
      "Ukwelulekwa kwe-co-trimoxazole kuvame ukufaka ukuhlola i-sulfa allergy nokufundisa ngokuzwela ilanga. I-Materia ayiqambi umthamo, ubude benkambo, noma isikali sesifo.",
      "Tshela umkhiqizi ngomlando we-sulfa allergy, isifo sezinso, ukukhathazeka nge-folate, NAWO WONKE amanye ama-antibiotic.",
      "Bika ukuqubuka, uhudo olukhulu, ukulimala okungajwayelekile, noma ukuphuzi kwamehlo ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nenkambo yelebula — ungayiqiqi uhlelo lokubuyisela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie ko-trimoksasool-antibiotikum soos op die geëtiketteerde produk aangedui — voltooi die geëtiketteerde kuur tensy jou klinikus anders sê.",
      "Ko-trimoksasool-berading sluit dikwels sulfa-allergiekontroles en sonsensitiwiteitsonderrig in. Materia versin nie ’n dosis, kuurduur of infeksietelling nie.",
      "Sê vir jou apteker van sulfa-allergiegeskiedenis, niersiekte, folaatgebrekkommer, en ALLE ander antibiotika op jou lys.",
      "Rapporteer uitslag, ernstige diarree, ongewone kneusings, of vergeling van die oë vroeg.",
      "Vra hoe gemiste dosisse by die geëtiketteerde kuur pas — moenie ’n inhaalplan versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa co-trimoxazole antibiotic ena hantle kamoo e hlalositsoeng holabel — qeta thuto ea leibole ntle le ha ngaka e bua ka tsela e 'ngoe.",
      "Keletso ea co-trimoxazole hangata e kenyelletsa litlhahlobo tsa sulfa allergy le thuto ea ho utloa bohloko ha letsatsi. Materia ha e iqape tekanyo, bolelele ba thuto, kapa lintlha tsa tšoaetso.",
      "Bolella rakhemisi ka histori ea sulfa allergy, lefu la liphio, mathata a folate, le LI-ANTIBIOTIC TSOHLE.",
      "Tlaleha lekhopho, letšollo le matla, ho otloloa ho sa tloaelehang, kapa ho tšehla ha mahlo kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le thuto ea leibole — se ke oa iqapa moralo oa ho tsosolosa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le co-trimoxazole antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gqiba ikhosi yeleyibhile ngaphandle kokuba ugqirha atsho okunye.",
      "Iingcebiso ze-co-trimoxazole zihlala zibandakanya ukujonga i-sulfa allergy nokufundisa ngokuzwia ilanga. I-Materia ayiyiqiqi idosi, ubude bekhosi, okanye amanqaku osulelo.",
      "Xelela usokhemisti ngembali ye-sulfa allergy, isifo sezintso, inkxalabo ye-folate, NAWO ONKE amanye ama-antibiotic.",
      "Xela irhashalala, urhudo olunzima, ukulimala okungaqhelekanga, okanye ukuphuzi kwamehlo kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nekhosi yeleyibhile — sukuyiqqa isicwangciso sokubuyisela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tmp": five(
    [
      "Take this trimethoprim antibiotic exactly as directed on your labelled product — finish the labelled course unless your clinician says otherwise.",
      "Trimethoprim counselling commonly includes rash watch and folate-related discussions when relevant. Materia does not invent a dose, course length, or infection score.",
      "Tell your pharmacist about folate deficiency concerns, kidney disease, pregnancy plans, and ALL other antibiotics on your list.",
      "Report rash, severe diarrhoea, unusual bruising, or persistent fever early.",
      "Ask how missed doses fit the labelled course — do not invent a catch-up plan.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le trimethoprim antibiotic njengoba kubhalwe kumkhiqizo onelebula — qeda inkambo yelebula ngaphandle kokuthi udokotela asho okunye.",
      "Ukwelulekwa kwe-trimethoprim kuvame ukufaka ukuqapha ukuqubuka nokuxoxa nge-folate uma kufanele. I-Materia ayiqambi umthamo, ubude benkambo, noma isikali sesifo.",
      "Tshela umkhiqizi ngokukhathazeka nge-folate, isifo sezinso, izinhlelo zokukhulelwa, NAWO WONKE amanye ama-antibiotic.",
      "Bika ukuqubuka, uhudo olukhulu, ukulimala okungajwayelekile, noma umkhuhlane oqhubekayo ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nenkambo yelebula — ungayiqiqi uhlelo lokubuyisela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie trimetoprim-antibiotikum soos op die geëtiketteerde produk aangedui — voltooi die geëtiketteerde kuur tensy jou klinikus anders sê.",
      "Trimetoprim-berading sluit dikwels uitslagwaak en folaatverwante gesprekke in wanneer relevant. Materia versin nie ’n dosis, kuurduur of infeksietelling nie.",
      "Sê vir jou apteker van folaatgebrekkommer, niersiekte, swangerskapsplanne, en ALLE ander antibiotika op jou lys.",
      "Rapporteer uitslag, ernstige diarree, ongewone kneusings, of aanhoudende koors vroeg.",
      "Vra hoe gemiste dosisse by die geëtiketteerde kuur pas — moenie ’n inhaalplan versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa trimethoprim antibiotic ena hantle kamoo e hlalositsoeng holabel — qeta thuto ea leibole ntle le ha ngaka e bua ka tsela e 'ngoe.",
      "Keletso ea trimethoprim hangata e kenyelletsa ho hlokomela lekhopho le lipuisano tsa folate haeba e ameha. Materia ha e iqape tekanyo, bolelele ba thuto, kapa lintlha tsa tšoaetso.",
      "Bolella rakhemisi ka mathata a folate, lefu la liphio, merero ea boimana, le LI-ANTIBIOTIC TSOHLE.",
      "Tlaleha lekhopho, letšollo le matla, ho otloloa ho sa tloaelehang, kapa feberu e tsoelang pele kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le thuto ea leibole — se ke oa iqapa moralo oa ho tsosolosa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le trimethoprim antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gqiba ikhosi yeleyibhile ngaphandle kokuba ugqirha atsho okunye.",
      "Iingcebiso ze-trimethoprim zihlala zibandakanya ukuqapha irhashalala neengxoxo ze-folate xa kufanelekile. I-Materia ayiyiqiqi idosi, ubude bekhosi, okanye amanqaku osulelo.",
      "Xelela usokhemisti ngenkxalabo ye-folate, isifo sezintso, izicwangciso zokukhulelwa, NAWO ONKE amanye ama-antibiotic.",
      "Xela irhashalala, urhudo olunzima, ukulimala okungaqhelekanga, okanye umkhuhlane oqhubekayo kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nekhosi yeleyibhile — sukuyiqqa isicwangciso sokubuyisela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tropicamide": five(
    [
      "Use these mydriatic drops exactly as directed on your labelled product — usually for eye examination; confirm the labelled plan.",
      "Tropicamide counselling commonly includes temporary blurred vision and light sensitivity. Materia does not invent a drop count, dilation clock, or vision score.",
      "Tell your pharmacist about glaucoma history, other eye drops, and ALL other anticholinergic medicines on your list.",
      "Report severe eye pain, sudden vision loss, or nausea with eye pain early.",
      "Ask how long blurred vision may affect driving on the labelled advice — do not invent a personal return-to-drive clock.",
      "If you get severe allergic swelling around the eyes or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa la ma-mydriatic drops njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuhlolwa kwamehlo; qinisekisa uhlelo lwelebula.",
      "Ukwelulekwa kwe-tropicamide kuvame ukufaka ukufiphala kokubona okwesikhashana nokuzwela ukukhanya. I-Materia ayiqambi inani lathonsi, iwashi lokuvula, noma isikali sokubona.",
      "Tshela umkhiqizi ngomlando we-glaucoma, amanye amathonsi amehlo, NAWO WONKE amanye amaphilisi e-anticholinergic.",
      "Bika ubuhlungu beso obukhulu, ukulahlekelwa ukubona okuzumayo, noma isicanucanu nobuhlungu beso ngokushesha.",
      "Buza ukuthi ukufiphala kungathinta isikhathi esingakanani ukushayela ngokweseluleko selebula — ungayiqiqi iwashi lakho lokubuyela ekushayeleni.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie midriatiese druppels soos op die geëtiketteerde produk aangedui — gewoonlik vir oogondersoek; bevestig die geëtiketteerde plan.",
      "Tropikamied-berading sluit dikwels tydelike waas-sig en ligsensitiwiteit in. Materia versin nie ’n druppeltelling, dilatasieklok of sigstelling nie.",
      "Sê vir jou apteker van gloukoomgeskiedenis, ander oogdruppels, en ALLE ander anticholinergiese medisyne op jou lys.",
      "Rapporteer ernstige oogpyn, skielike sigverlies, of naarheid met oogpyn vroeg.",
      "Vra hoe lank waas-sig bestuur mag beïnvloed volgens geëtiketteerde raad — moenie ’n persoonlike terugkeer-na-bestuur-klok versin nie.",
      "As jy ernstige allergiese swelling rondom die oë of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa li-mydriatic drops tsena hantle kamoo e hlalositsoeng holabel — hangata bakeng sa tlhahlobo ea mahlo; netefatsa moralo oa leibole.",
      "Keletso ea tropicamide hangata e kenyelletsa ho fifala ha pono ha nakoana le ho utloa bohloko ha leseli. Materia ha e iqape palo ea thopa, nako ea ho bula, kapa lintlha tsa pono.",
      "Bolella rakhemisi ka histori ea glaucoma, mathopa a mang a mahlo, le MERIANA EOHLE ea anticholinergic.",
      "Tlaleha bohloko ba leihlo bo matla, tahlehelo ea pono ka tšohanyetso, kapa ho nyatsa le bohloko ba leihlo kapele.",
      "Botsa hore ho fifala ho ka ama nako e kae ho khanna ka keletso ea leibole — se ke oa iqapa nako ea hau ea ho khutlela ho khanna.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa la ma-mydriatic drops ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala kuvavanyo lwamehlo; qinisekisa isicwangciso seleyibhile.",
      "Iingcebiso ze-tropicamide zihlala zibandakanya ukufiphala kokubona okwethutyana nokuzwia ukukhanya. I-Materia ayiyiqiqi inani lethontsi, iwotshi yokuvula, okanye amanqaku okubona.",
      "Xelela usokhemisti ngembali ye-glaucoma, amanye amathontsi amehlo, NAWO ONKE amanye amayeza e-anticholinergic.",
      "Xela iintlungu zeliso ezinzima, ukulahlekelwa ukubona ngequbuliso, okanye isicanucanu neentlungu zeliso kwangoko.",
      "Buza indlela ukufiphala okunokuchaphazela ngayo ukuqhuba ixesha elingakanani ngengcebiso yeleyibhile — sukuyiqqa iwotshi yakho yokubuyela ekuqhubeni.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-lidocaine": five(
    [
      "Use this local anaesthetic exactly as directed on your labelled product — gels, sprays, injections, and patches differ; confirm the form you were given.",
      "Lidocaine counselling commonly includes not applying more than labelled and watching for numbness beyond the intended area. Materia does not invent a dose, application clock, or numbness score.",
      "Tell your pharmacist about heart rhythm problems, liver disease, and ALL other local anaesthetic products on your list.",
      "Report ringing in the ears, metallic taste, shaking, confusion, or chest discomfort early.",
      "Ask how to space reapplications on the labelled product — do not invent a personal top-up schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le local anaesthetic njengoba kubhalwe kumkhiqizo onelebula — ama-gel, amaspray, ukujova, nama-patch ayahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-lidocaine kuvame ukufaka ukungafaki okungaphezu kokubhalwe nokuqapha ukuba buthuntu ngaphandle kwendawo ehlosiwe. I-Materia ayiqambi umthamo, iwashi lokufaka, noma isikali sokuba buthuntu.",
      "Tshela umkhiqizi ngezinkinga zesigqi senhliziyo, isifo sesibindi, NAWO WONKE amanye amakhiqizo e-local anaesthetic.",
      "Bika ukukhala ezindlebeni, ukunambitha okufana nensimbi, ukuthuthumela, ukudideka, noma ukungakhululeki esifubeni ngokushesha.",
      "Buza ukuthi ukuphinda kufakwa kuhlukaniswa kanjani kumkhiqizo onelebula — ungayiqiqi uhlelo lwakho lokungeza.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie plaaslike verdowing soos op die geëtiketteerde produk aangedui — gels, spuite, inspuitings, en pleisters verskil; bevestig die vorm wat jy gekry het.",
      "Lidokaïen-berading sluit dikwels in om nie meer as geëtiketteer aan te wend nie en te dophou vir verdowing buite die bedoelde area. Materia versin nie ’n dosis, toedieningsklok of verdowingstelling nie.",
      "Sê vir jou apteker van hartritmeprobleme, lewersiekte, en ALLE ander plaaslike verdowingsprodukte op jou lys.",
      "Rapporteer oorsuising, metaalsmaak, bewing, verwarring, of borsongemak vroeg.",
      "Vra hoe om hertoedienings op die geëtiketteerde produk te spasieer — moenie ’n persoonlike byvoegskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa local anaesthetic ena hantle kamoo e hlalositsoeng holabel — li-gel, li-spray, lienteo, le li-patch lia fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea lidocaine hangata e kenyelletsa ho se kenya ho feta leibole le ho hlokomela ho hloka kutlo ka ntle ho sebaka se reriloeng. Materia ha e iqape tekanyo, nako ea ho kenya, kapa lintlha tsa ho hloka kutlo.",
      "Bolella rakhemisi ka mathata a morethetho oa pelo, lefu la sebete, le LIHLAHISWA TSOHLE tsa local anaesthetic.",
      "Tlaleha ho lla ha litsebe, tatso ea tšepe, ho thothomela, ho ferekana, kapa ho se phutholohe sefubeng kapele.",
      "Botsa hore ho kenya hape ho lokela ho arola joang holabel — se ke oa iqapa kemiso ea hau ea ho eketsa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le local anaesthetic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ii-gel, iispray, ukutofa, nee-patch ziyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-lidocaine zihlala zibandakanya ukungafaki ngaphezu kokubhaliweyo nokuqapha ukuba buthuntu ngaphandle kwendawo ecetyiweyo. I-Materia ayiyiqiqi idosi, iwotshi yokufaka, okanye amanqaku okuba buthuntu.",
      "Xelela usokhemisti ngeengxaki zesingqisho sentliziyo, isifo sesibindi, NAZO ZONKE ezinye iimveliso ze-local anaesthetic.",
      "Xela ukukhala ezindlebeni, ukunambitha okufana nentsimbi, ukungcangcazela, ukudideka, okanye ukungakhululeki esifubeni kwangoko.",
      "Buza indlela ukuphinda kufakwa okufanele kwahlulwe ngayo kwileyibhile — sukuyiqqa ishedyuli yakho yokongeza.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
