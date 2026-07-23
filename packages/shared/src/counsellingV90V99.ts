import type { CounsellingLang, CounsellingScript } from "./counselling.js";

export const COUNSELLING_V90_TO_V99: Record<
  string,
  Partial<Record<CounsellingLang, CounsellingScript>>
> = {
  "mol-prednisone": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this corticosteroid exactly as directed on your labelled product — often with food if stomach upset occurs.",
        "Do not stop suddenly without your clinician — steroid counselling commonly includes a taper plan. Materia does not invent a dose or taper schedule.",
        "Tell your pharmacist about infection signs, unusual mood changes, swelling, or high blood-sugar readings your clinician is tracking.",
        "If you get severe abdominal pain, black stools, trouble breathing, or sudden severe illness — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le corticosteroid njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla uma isisu siphazamiseka.",
        "Ungayeki ngokuzumayo ngaphandle kwedokotela — ukwelulekwa kwe-steroid kuvame ukufaka uhlelo lokwehlisa kancane. I-Materia ayiqambi umthamo noma uhlelo lokwehlisa.",
        "Tshela umkhiqizi ngezimpawu zokutheleleka, ukushintsha kwemizwa, ukuvuvuka, noma ukufunda koshukela egazini okuphakeme udokotela alandelelayo.",
        "Uma uthola ubuhlungu besisu obukhulu, indle emnyama, ukuphefumula kanzima, noma ukugula okunzima ngokuzumayo — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie kortikosteroïed soos op die geëtiketteerde produk aangedui — dikwels met kos as maagonstel voorkom.",
        "Moenie skielik stop sonder jou klinikus nie — steroïedberading sluit dikwels ’n afbouplan in. Materia versin nie ’n dosis of afbouskedule nie.",
        "Sê vir jou apteker van infeksietekens, ongewone bui-veranderinge, swelling, of hoë bloedsuikerlesings wat jou klinikus volg.",
        "As jy ernstige buikpyn, swart stoelgang, asemhalingsprobleme of skielike ernstige siekte kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa corticosteroid ena hantle kamoo e hlalositsoeng holabel — hangata le lijo haeba mpeng e tšoenyeha.",
        "Se ke oa emisa ka potlako ntle le ngaka — keletso ea steroid hangata e kenyelletsa moralo oa ho fokotsa butle. Materia ha e iqape tekanyo kapa moralo oa ho fokotsa.",
        "Bolella rakhemisi ka matšoao a tšoaetso, liphetoho tse sa tloaelehang tsa maikutlo, ho ruruha, kapa litekanyo tse phahameng tsa tsoekere maling tseo ngaka e li latelang.",
        "Haeba u fumana bohloko bo matla ba mpeng, mantle a sootho, ho hema thata, kapa ho kula ho matla ka tšohanyetso — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya ukuba isisu siyaphazamiseka.",
        "Sukuyeki ngokungxamisekileyo ngaphandle kogqirha — iingcebiso ze-steroid zihlala zibandakanya isicwangciso sokunciphisa kancinci. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunciphisa.",
        "Xelela usokhemisti ngeempawu zosulelo, utshintsho lwemvakalelo olungaqhelekanga, ukudumba, okanye ukufundeka kweswekile egazini okuphezulu ugqirha alandelayo.",
        "Ukuba ufumana iintlungu zesisu ezinzima, indle emnyama, uxinzelelo lokuphefumla, okanye ukugula okunzima ngequbuliso — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-diclofenac": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this NSAID exactly as directed on your labelled product — often with food if stomach upset occurs.",
        "NSAID counselling commonly includes stomach irritation and fluid retention — report black stools, severe indigestion, swelling, or reduced urine. Materia does not invent a dose or pain target.",
        "Tell your pharmacist about heart, kidney, or ulcer history, and all other painkillers you use.",
        "If you vomit blood, pass black stools, get chest pain, or sudden shortness of breath — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le NSAID njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla uma isisu siphazamiseka.",
        "Ukwelulekwa kwe-NSAID kuvame ukufaka ukucasuka kwesisu nokugcina uketshezi — bika indle emnyama, ukugula kwesisu okukhulu, ukuvuvuka, noma umchamo omncane. I-Materia ayiqambi umthamo noma umgomo wobuhlungu.",
        "Tshela umkhiqizi ngomlando wenhliziyo, izintso, noma izilonda, kanye nawo wonke amaphilisi obuhlungu owasebenzisayo.",
        "Uma uhlanza igazi, ukhipha indle emnyama, uthola ubuhlungu besifuba, noma ukuphefumula kancane ngokuzumayo — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie NSAID soos op die geëtiketteerde produk aangedui — dikwels met kos as maagonstel voorkom.",
        "NSAID-berading sluit dikwels maagirritasie en vogretensie in — rapporteer swart stoelgang, ernstige indigestion, swelling of minder urine. Materia versin nie ’n dosis of pynteiken nie.",
        "Sê vir jou apteker van hart-, nier- of ulkusgeskiedenis, en alle ander pynstillers wat jy gebruik.",
        "As jy bloed braak, swart stoelgang het, borspyn of skielike kortasem kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa NSAID ena hantle kamoo e hlalositsoeng holabel — hangata le lijo haeba mpeng e tšoenyeha.",
        "Keletso ea NSAID hangata e kenyelletsa ho hlaba ha mpeng le ho boloka mokelikeli — tlaleha mantle a sootho, ho opeloa ha mpeng ho matla, ho ruruha, kapa moroto o fokolang. Materia ha e iqape tekanyo kapa sepheo sa bohloko.",
        "Bolella rakhemisi ka histori ea pelo, liphio, kapa liso, le lipilisi tsohle tsa bohloko tseo u li sebelisang.",
        "Haeba u hlatsa mali, u ntša mantle a sootho, u fumana bohloko ba sefuba, kapa ho hema butle ka tšohanyetso — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le NSAID ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya ukuba isisu siyaphazamiseka.",
        "Iingcebiso ze-NSAID zihlala zibandakanya ukucaphuka kwesisu nokugcina ulwelo — xela indle emnyama, ukugula kwesisu okunzima, ukudumba, okanye umchamo omncinci. I-Materia ayiyiqiqi idosi okanye usukelo lweentlungu.",
        "Xelela usokhemisti ngembali yentliziyo, izintso, okanye izilonda, kunye nawo onke amayeza eentlungu owasebenzisayo.",
        "Ukuba uyahlanza igazi, ukhupha indle emnyama, ufumana iintlungu zesifuba, okanye ukuphefumla kancinci ngequbuliso — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-cetirizine": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antihistamine exactly as directed on your labelled product.",
        "Antihistamine counselling commonly includes possible drowsiness — avoid driving or machinery until you know how you respond. Materia does not invent a dose or sedation score.",
        "Tell your pharmacist about other sedating medicines and alcohol use — confirm against the labelled product.",
        "If you get swelling of the face/lips/tongue, severe wheeze, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antihistamine njengoba kubhalwe kumkhiqizo onelebula.",
        "Ukwelulekwa kwe-antihistamine kuvame ukufaka ukozela okungenzeka — gwema ukushayela noma imishini uze wazi ukuthi usabela kanjani. I-Materia ayiqambi umthamo noma isikolo sokozela.",
        "Tshela umkhiqizi ngamanye amaphilisi akozisa nokusebenzisa utshwala — qinisekisa kumkhiqizo onelebula.",
        "Uma uthola ukuvuvuka kobuso/izindebe/ulimi, ukubhobha okukhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antihistamien soos op die geëtiketteerde produk aangedui.",
        "Antihistamien-berading sluit dikwels moontlike slaperigheid in — vermy bestuur of masjinerie totdat jy weet hoe jy reageer. Materia versin nie ’n dosis of sedasietelling nie.",
        "Sê vir jou apteker van ander sederende medisyne en alkoholgebruik — bevestig teen die geëtiketteerde produk.",
        "As jy swelling van die gesig/lippe/tong, ernstige piep of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antihistamine ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Keletso ea antihistamine hangata e kenyelletsa ho otsela ho ka bang teng — qoba ho khanna kapa mechini ho fihlela u tseba hore u arabela joang. Materia ha e iqape tekanyo kapa lintlha tsa ho otsela.",
        "Bolella rakhemisi ka meriana e meng e otselang le tšebeliso ea joala — netefatsa holabel.",
        "Haeba u fumana ho ruruha ha sefahleho/melomo/leleme, ho honotha ho matla, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antihistamine ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Iingcebiso ze-antihistamine zihlala zibandakanya ukozela okunokwenzeka — pepa ukuqhuba okanye umatshini de wazi indlela osabela ngayo. I-Materia ayiyiqiqi idosi okanye inqanaba lokozela.",
        "Xelela usokhemisti ngamanye amayeza akozisayo nokusebenzisa utywala — qinisekisa kwileyibhile.",
        "Ukuba ufumana ukudumba kobuso/imilebe/ulwimi, ukubhobha okunzima, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-gliclazide": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this sulfonylurea exactly as directed on your labelled product — usually with meals as the label advises.",
        "Sulfonylurea counselling commonly includes hypoglycaemia recognition (sweating, tremor, confusion) — carry your clinician’s hypo plan. Materia does not invent a dose or glucose target.",
        "Tell your pharmacist if you skip meals, drink alcohol, or start new medicines that can affect sugar control.",
        "If you cannot swallow, seize, lose consciousness, or remain confused after hypo treatment — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le sulfonylurea njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla njengoba ilebula isho.",
        "Ukwelulekwa kwe-sulfonylurea kuvame ukufaka ukwazi i-hypoglycaemia (ukujuluka, ukuthuthumela, ukudideka) — phatha uhlelo lwedokotela lwe-hypo. I-Materia ayiqambi umthamo noma umgomo kashukela.",
        "Tshela umkhiqizi uma ulahlwa ukudla, uphuza utshwala, noma uqala amaphilisi amasha angaphazamisa ukulawula ushukela.",
        "Uma ungakwazi ukugwinya, uthola ukuxhuzula, ulahlekelwa ukwazi, noma uhlala udidekile ngemva kokwelapha i-hypo — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie sulfonielureum soos op die geëtiketteerde produk aangedui — gewoonlik met maaltye soos die etiket adviseer.",
        "Sulfonielureum-berading sluit dikwels hipoglisemie-herkenning in (sweet, bewing, verwarring) — dra jou klinikus se hipo-plan. Materia versin nie ’n dosis of glukoseteiken nie.",
        "Sê vir jou apteker as jy maaltye oorslaan, alkohol drink, of nuwe medisyne begin wat suikerkontrole kan beïnvloed.",
        "As jy nie kan sluk nie, stuiptrekkings kry, bewusteloos raak, of verward bly ná hipo-behandeling — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa sulfonylurea ena hantle kamoo e hlalositsoeng holabel — hangata le lijo kamoo leibole e eletsang.",
        "Keletso ea sulfonylurea hangata e kenyelletsa ho tseba hypoglycaemia (ho fufuleloa, ho thothomela, ho ferekana) — jara moralo oa ngaka oa hypo. Materia ha e iqape tekanyo kapa sepheo sa tsoekere.",
        "Bolella rakhemisi haeba u tlola lijo, u noa joala, kapa u qala meriana e mecha e ka amang taolo ea tsoekere.",
        "Haeba u sitoa ho koenya, u ts'oaroa ke ho thothomela, u lahleheloa ke kelello, kapa u lula u ferekane ka mor'a kalafo ea hypo — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le sulfonylurea ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya njengoko ileyibhile icebisa.",
        "Iingcebiso ze-sulfonylurea zihlala zibandakanya ukwazi i-hypoglycaemia (ukubila, ukungcangcazela, ukudideka) — phatha isicwangciso sogqirha se-hypo. I-Materia ayiyiqiqi idosi okanye usukelo lweswekile.",
        "Xelela usokhemisti ukuba uyazitshiya izidlo, usela utywala, okanye uqala amayeza amatsha anokuphazamisa ulawulo lweswekile.",
        "Ukuba awukwazi ukuginya, ufumana ukuxhuzula, uphulukana nokuqonda, okanye uhlala udidekile emva konyango lwe-hypo — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-dolutegravir": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this INSTI antiretroviral exactly as directed on your labelled product — daily adherence matters for viral control discussions with your clinician.",
        "Dolutegravir counselling commonly includes separating some calcium, iron, or antacid products as the label describes. Materia does not invent hours, a dose, or a viral-load target.",
        "Tell your pharmacist about all other medicines and supplements — interaction checks belong with the labelled product and clinician.",
        "If you get a severe rash with fever, yellow eyes, extreme fatigue, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le INSTI antiretroviral njengoba kubhalwe kumkhiqizo onelebula — ukuthatha nsuku zonke kubalulekile ezingxoxweni zokulawula igciwane nodokotela.",
        "Ukwelulekwa kwe-dolutegravir kuvame ukufaka ukuhlukanisa eminye imikhiqizo ye-calcium, i-iron, noma ama-antacid njengoba ilebula ichaza. I-Materia ayiqambi amahora, umthamo, noma umgomo we-viral load.",
        "Tshela umkhiqizi ngawo wonke amanye amaphilisi nezithasiselo — ukuhlola ukuxhumana kungomkhiqizo onelebula nodokotela.",
        "Uma uthola ukuqubuka okukhulu nomkhuhlane, amehlo aphuzi, ukukhathala okukhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie INSTI-antiretrovirale middel soos op die geëtiketteerde produk aangedui — daaglikse nakoming saak vir virale-beheerbesprekings met jou klinikus.",
        "Dolutegravir-berading sluit dikwels in om sommige kalsium-, yster- of antisuurprodukte te skei soos die etiket beskryf. Materia versin nie ure, ’n dosis of ’n virale-ladingteiken nie.",
        "Sê vir jou apteker van alle ander medisyne en aanvullings — interaksiekontroles hoort by die geëtiketteerde produk en klinikus.",
        "As jy ’n ernstige uitslag met koors, geel oë, uiterste moegheid of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa INSTI antiretroviral ena hantle kamoo e hlalositsoeng holabel — ho e nka letsatsi le letsatsi ho bohlokoa lipuisanong tsa taolo ea vaerase le ngaka.",
        "Keletso ea dolutegravir hangata e kenyelletsa ho arola lihlahiswa tse ling tsa calcium, iron, kapa antacid kamoo leibole e hlalosang. Materia ha e iqape lihora, tekanyo, kapa sepheo sa viral load.",
        "Bolella rakhemisi ka meriana eohle e meng le litlatsetso — tlhahlobo ea ho sebelisana e ea holabel le ngaka.",
        "Haeba u fumana lekhopho le matla le feberu, mahlo a mosehla, mokhathala o feteletseng, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le INSTI antiretroviral ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukuthatha yonke imihla kubalulekile kwiingxoxo zolawulo lwentsholongwane nogqirha.",
        "Iingcebiso ze-dolutegravir zihlala zibandakanya ukwahlula ezinye iimveliso ze-calcium, i-iron, okanye i-antacid njengoko ileyibhile ichaza. I-Materia ayiyiqiqi iiyure, idosi, okanye usukelo lwe-viral load.",
        "Xelela usokhemisti ngawo onke amanye amayeza kunye nezongezelelo — ukujonga ukusebenzelana kuleyibhile nogqirha.",
        "Ukuba ufumana irhashalala enzima nomkhuhlane, amehlo atyheli, ukudinwa okugqithisileyo, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-efavirenz": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this NNRTI antiretroviral exactly as directed on your labelled product — bedtime dosing is often discussed on the label; confirm product advice.",
        "Efavirenz counselling commonly includes vivid dreams, dizziness, or mood changes early on — report persistent psychiatric symptoms. Materia does not invent a dose or viral-load target.",
        "Tell your pharmacist about pregnancy plans, other medicines, and alcohol or recreational drug use.",
        "If you get severe rash with blistering, suicidal thoughts, seizures, or yellow eyes — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le NNRTI antiretroviral njengoba kubhalwe kumkhiqizo onelebula — ukuthatha ngaphambi kokulala kuvame ukuxoxwa kulebula; qinisekisa iseluleko somkhiqizo.",
        "Ukwelulekwa kwe-efavirenz kuvame ukufaka amaphupho acacile, isiyezi, noma ukushintsha kwemizwa ekuqaleni — bika izimpawu zengqondo eziqhubekayo. I-Materia ayiqambi umthamo noma umgomo we-viral load.",
        "Tshela umkhiqizi ngezinhlelo zokukhulelwa, amanye amaphilisi, nokusebenzisa utshwala noma izidakamizwa zokuzijabulisa.",
        "Uma uthola ukuqubuka okukhulu namaqhubu, imicabango yokuzibulala, ukuxhuzula, noma amehlo aphuzi — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie NNRTI-antiretrovirale middel soos op die geëtiketteerde produk aangedui — slapenstyd-dosering word dikwels op die etiket bespreek; bevestig produkadvies.",
        "Efavirenz-berading sluit dikwels lewendige drome, duiseligheid of bui-veranderinge vroeg in — rapporteer aanhoudende psigiatriese simptome. Materia versin nie ’n dosis of virale-ladingteiken nie.",
        "Sê vir jou apteker van swangerskapplanne, ander medisyne, en alkohol- of ontspanningsmiddelgebruik.",
        "As jy ernstige uitslag met blase, selfmoordgedagtes, stuiptrekkings of geel oë kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa NNRTI antiretroviral ena hantle kamoo e hlalositsoeng holabel — ho e nka pele ho robala hangata ho buisanoa holabel; netefatsa keletso ea sehlahiswa.",
        "Keletso ea efavirenz hangata e kenyelletsa litoro tse hlakileng, ho tsekela, kapa liphetoho tsa maikutlo qalong — tlaleha matšoao a kelello a tsoelang pele. Materia ha e iqape tekanyo kapa sepheo sa viral load.",
        "Bolella rakhemisi ka merero ea ho ima, meriana e meng, le tšebeliso ea joala kapa lithethefatsi tsa boithabiso.",
        "Haeba u fumana lekhopho le matla le lihlabana, menahano ea ho ipolaea, ho thothomela, kapa mahlo a mosehla — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le NNRTI antiretroviral ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukuthatha ngaphambi kokulala kuhlala kuxoxwa kwileyibhile; qinisekisa icebiso lemveliso.",
        "Iingcebiso ze-efavirenz zihlala zibandakanya amaphupha acacileyo, isiyezi, okanye utshintsho lwemvakalelo ekuqaleni — xela iimpawu zengqondo eziqhubekayo. I-Materia ayiyiqiqi idosi okanye usukelo lwe-viral load.",
        "Xelela usokhemisti ngezicwangciso zokukhulelwa, amanye amayeza, nokusebenzisa utywala okanye iziyobisi zokuzonwabisa.",
        "Ukuba ufumana irhashalala enzima namaqhuma, iingcinga zokuzibulala, ukuxhuzula, okanye amehlo atyheli — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-allopurinol": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this xanthine-oxidase inhibitor exactly as directed on your labelled product — often with food and water as the label advises.",
        "Allopurinol counselling commonly includes rash watch: stop and seek urgent review for widespread rash, blistering, or mouth sores. Materia does not invent a dose or uric-acid target.",
        "Tell your pharmacist about kidney history and other medicines (including azathioprine/mercaptopurine if prescribed).",
        "If you get blistering rash with fever, swelling of the face, or peeling skin — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le xanthine-oxidase inhibitor njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla namanzi njengoba ilebula isho.",
        "Ukwelulekwa kwe-allopurinol kuvame ukufaka ukugada ukuqubuka: yeka futhi funa ukubuyekezwa okuphuthumayo uma ukuqubuka kusabalele, amaqhubu, noma izilonda zomlomo. I-Materia ayiqambi umthamo noma umgomo we-uric acid.",
        "Tshela umkhiqizi ngomlando wezintso namanye amaphilisi (kuhlanganise i-azathioprine/mercaptopurine uma inikeziwe).",
        "Uma uthola ukuqubuka kwamaqhubu nomkhuhlane, ukuvuvuka kobuso, noma isikhumba esihluba — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie xantienoksidase-inhibeerder soos op die geëtiketteerde produk aangedui — dikwels met kos en water soos die etiket adviseer.",
        "Allopurinol-berading sluit dikwels uitslagwaaksaamheid in: stop en soek dringende hersiening vir wydverspreide uitslag, blase of mondsere. Materia versin nie ’n dosis of uriensuurteiken nie.",
        "Sê vir jou apteker van niergeskiedenis en ander medisyne (insluitend azatioprien/mercaptopurien as voorgeskryf).",
        "As jy blaasuitslag met koors, swelling van die gesig of skilferende vel kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa xanthine-oxidase inhibitor ena hantle kamoo e hlalositsoeng holabel — hangata le lijo le metsi kamoo leibole e eletsang.",
        "Keletso ea allopurinol hangata e kenyelletsa ho hlokomela lekhopho: emisa ’me batla tlhahlobo e potlakileng bakeng sa lekhopho le atileng, lihlabana, kapa liso tsa molomo. Materia ha e iqape tekanyo kapa sepheo sa uric acid.",
        "Bolella rakhemisi ka histori ea liphio le meriana e meng (ho kenyeletsoa azathioprine/mercaptopurine haeba e ngotsoe).",
        "Haeba u fumana lekhopho la lihlabana le feberu, ho ruruha ha sefahleho, kapa letlalo le hlobohang — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le xanthine-oxidase inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya namanzi njengoko ileyibhile icebisa.",
        "Iingcebiso ze-allopurinol zihlala zibandakanya ukugada irhashalala: yeka kwaye funa ukujongwa okungxamisekileyo kwiirhashalala ezisasazekileyo, amaqhuma, okanye izilonda zomlomo. I-Materia ayiyiqiqi idosi okanye usukelo lwe-uric acid.",
        "Xelela usokhemisti ngembali yezintso namanye amayeza (kuquka i-azathioprine/mercaptopurine ukuba inyukiwe).",
        "Ukuba ufumana irhashalala yamaqhuma nomkhuhlane, ukudumba kobuso, okanye ulusu olutyhutyha — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-pantoprazole": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this PPI exactly as directed on your labelled product — often before food; confirm against the product advice.",
        "PPI counselling commonly includes completing the planned course and reporting ongoing heartburn, black stools, or unexplained weight loss. Materia does not invent a dose or treatment length.",
        "Tell your pharmacist about all other medicines — some need timing or interaction checks against the labelled product.",
        "If you vomit blood, pass black stools, get severe chest pain, or sudden shortness of breath — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le PPI njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba ngaphambi kokudla; qinisekisa iseluleko somkhiqizo.",
        "Ukwelulekwa kwe-PPI kuvame ukufaka ukuqeda inkambo ehleliwe nokubika isisa esiqhubekayo, indle emnyama, noma ukulahlekelwa isisindo okungachaziwe. I-Materia ayiqambi umthamo noma ubude bokwelapha.",
        "Tshela umkhiqizi ngawo wonke amanye amaphilisi — amanye adinga isikhathi noma ukuhlola ukuxhumana kumkhiqizo onelebula.",
        "Uma uhlanza igazi, ukhipha indle emnyama, uthola ubuhlungu besifuba obukhulu, noma ukuphefumula kancane ngokuzumayo — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie PPI soos op die geëtiketteerde produk aangedui — dikwels voor kos; bevestig teen die produkadvies.",
        "PPI-berading sluit dikwels in om die beplande kuur te voltooi en aanhoudende sooibrand, swart stoelgang of onverklaarde gewigsverlies te rapporteer. Materia versin nie ’n dosis of behandelingsduur nie.",
        "Sê vir jou apteker van alle ander medisyne — sommige benodig tydsberekening of interaksiekontroles teen die geëtiketteerde produk.",
        "As jy bloed braak, swart stoelgang het, ernstige borspyn of skielike kortasem kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa PPI ena hantle kamoo e hlalositsoeng holabel — hangata pele ho lijo; netefatsa keletso ea sehlahiswa.",
        "Keletso ea PPI hangata e kenyelletsa ho qeta thuto e reriloeng le ho tlaleha heartburn e tsoelang pele, mantle a sootho, kapa ho lahleheloa ke boima bo sa hlaloseng. Materia ha e iqape tekanyo kapa bolelele ba kalafo.",
        "Bolella rakhemisi ka meriana eohle e meng — e meng e hloka nako kapa tlhahlobo ea ho sebelisana holabel.",
        "Haeba u hlatsa mali, u ntša mantle a sootho, u fumana bohloko ba sefuba bo matla, kapa ho hema butle ka tšohanyetso — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le PPI ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala ithathwa phambi kokutya; qinisekisa icebiso lemveliso.",
        "Iingcebiso ze-PPI zihlala zibandakanya ukugqiba ikhosi ecetyiweyo nokuxela isisa esiqhubekayo, indle emnyama, okanye ukulahlekelwa bubunzima obungachazwanga. I-Materia ayiyiqiqi idosi okanye ubude bonyango.",
        "Xelela usokhemisti ngawo onke amanye amayeza — amanye afuna ixesha okanye ukujonga ukusebenzelana kwileyibhile.",
        "Ukuba uyahlanza igazi, ukhupha indle emnyama, ufumana iintlungu zesifuba ezinzima, okanye ukuphefumla kancinci ngequbuliso — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-clopidogrel": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antiplatelet exactly as directed on your labelled product — do not stop before procedures without your clinician.",
        "Clopidogrel counselling commonly includes bleeding and bruise watch — report prolonged nosebleeds, black stools, or blood in urine. Materia does not invent a dose or platelet target.",
        "Tell your pharmacist about other blood thinners, NSAIDs, and planned surgery or dental work.",
        "If you have uncontrolled bleeding, stroke symptoms, severe headache, or black stools with dizziness — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antiplatelet njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngaphambi kwezinqubo ngaphandle kwedokotela.",
        "Ukwelulekwa kwe-clopidogrel kuvame ukufaka ukugada ukopha namabala aluhlaza — bika ukopha kwamakhala okude, indle emnyama, noma igazi emchimini. I-Materia ayiqambi umthamo noma umgomo wama-platelet.",
        "Tshela umkhiqizi ngamanye ama-blood thinner, ama-NSAID, nokuhlinzwa noma umsebenzi wamazinyo ohleliwe.",
        "Uma unokopha okungalawuleki, izimpawu ze-stroke, ikhanda elibuhlungu kakhulu, noma indle emnyama nesiyezi — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antiplaatjie soos op die geëtiketteerde produk aangedui — moenie voor prosedures stop sonder jou klinikus nie.",
        "Clopidogrel-berading sluit dikwels bloeding- en kneusingswaaksaamheid in — rapporteer langdurige neusbloeding, swart stoelgang of bloed in urine. Materia versin nie ’n dosis of plaatjieteiken nie.",
        "Sê vir jou apteker van ander bloedverdunners, NSAIDs, en beplande chirurgie of tandwerk.",
        "As jy onbeheerde bloeding, beroerte-simptome, ernstige hoofpyn of swart stoelgang met duiseligheid het — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antiplatelet ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa pele ho mekhoa ntle le ngaka.",
        "Keletso ea clopidogrel hangata e kenyelletsa ho hlokomela ho tsoa mali le matheba a sootho — tlaleha ho tsoa mali nkong ho telele, mantle a sootho, kapa mali ka har'a moroto. Materia ha e iqape tekanyo kapa sepheo sa platelet.",
        "Bolella rakhemisi ka li-blood thinner tse ling, li-NSAID, le opereishene kapa mosebetsi oa meno o reriloeng.",
        "Haeba u na le ho tsoa mali ho sa laoleheng, matšoao a stroke, hlooho e bohloko haholo, kapa mantle a sootho le ho tsekela — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antiplatelet ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki phambi kweenkqubo ngaphandle kogqirha.",
        "Iingcebiso ze-clopidogrel zihlala zibandakanya ukugada ukopha kunye namabala aluhlaza — xela ukopha kwempumlo okude, indle emnyama, okanye igazi kumchamo. I-Materia ayiyiqiqi idosi okanye usukelo lwe-platelet.",
        "Xelela usokhemisti ngamanye ama-blood thinner, ama-NSAID, kunye notyando olucetyiweyo okanye umsebenzi wamazinyo.",
        "Ukuba unokopha okungalawulekiyo, iimpawu ze-stroke, intloko ebuhlungu kakhulu, okanye indle emnyama nesiyezi — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-codeine": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this opioid analgesic exactly as directed on your labelled product — constipation and drowsiness are common counselling points.",
        "Do not combine with alcohol or other sedatives unless your clinician agrees — opioid counselling includes breathing-risk discussions. Materia does not invent a dose or maximum daily amount.",
        "Tell your pharmacist about asthma, sleep apnoea, other opioids, and all cough or pain products you already use.",
        "If breathing becomes slow or shallow, you cannot be woken easily, or lips turn blue — seek emergency care immediately.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le opioid analgesic njengoba kubhalwe kumkhiqizo onelebula — ukuqunjelwa nokozela kuvame ukufundiswa.",
        "Ungahlanganisi notshwala noma amanye ama-sedative ngaphandle kokuvuma kukadokotela — ukwelulekwa kwe-opioid kufaka izingxoxo zengozi yokuphefumula. I-Materia ayiqambi umthamo noma inani eliphezulu losuku.",
        "Tshela umkhiqizi nge-asthma, i-sleep apnoea, amanye ama-opioid, nawo wonke amakhofi noma amaphilisi obuhlungu osevele uwasebenzisa.",
        "Uma ukuphefumula kuba kancane noma kungenzi kahle, ungavuswa kalula, noma izindebe ziba hlaza — funa usizo oluphuthumayo ngokushesha.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie opioïed-pynstiller soos op die geëtiketteerde produk aangedui — hardlywigheid en slaperigheid is algemene beradingspunte.",
        "Moenie met alkohol of ander sederende middels kombineer nie tensy jou klinikus saamstem — opioïedberading sluit asemhalingsrisiko-besprekings in. Materia versin nie ’n dosis of maksimum daaglikse hoeveelheid nie.",
        "Sê vir jou apteker van asma, slaapapnee, ander opioïede, en alle hoes- of pynprodukte wat jy reeds gebruik.",
        "As asemhaling stadig of vlak word, jy nie maklik wakker gemaak kan word nie, of lippe blou word — soek dadelik noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa opioid analgesic ena hantle kamoo e hlalositsoeng holabel — ho thatafala ha mala le ho otsela ke lintlha tse tloaelehileng tsa keletso.",
        "Se ke oa e kopanya le joala kapa li-sedative tse ling ntle le tumellano ea ngaka — keletso ea opioid e kenyelletsa lipuisano tsa kotsi ea ho hema. Materia ha e iqape tekanyo kapa palo e phahameng ea letsatsi.",
        "Bolella rakhemisi ka asthma, sleep apnoea, li-opioid tse ling, le lihlahiswa tsohle tsa ho khohlela kapa bohloko tseo u se u ntse u li sebelisa.",
        "Haeba ho hema ho ba butle kapa ho sa tebe, u sitoa ho tsohoa habonolo, kapa melomo e fetoha boputsoa — batla thuso ea tšohanyetso hang-hang.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le opioid analgesic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukuqunjelwa nokozela ziingcebiso eziqhelekileyo.",
        "Sukudibanisa notywala okanye ezinye ii-sedative ngaphandle kokuvuma kugqirha — iingcebiso ze-opioid zibandakanya iingxoxo zomngcipheko wokuphefumla. I-Materia ayiyiqiqi idosi okanye inani eliphezulu losuku.",
        "Xelela usokhemisti nge-asthma, i-sleep apnoea, ezinye ii-opioid, kunye nazo zonke iimveliso zokukhohlela okanye iintlungu osele uzisebenzisa.",
        "Ukuba ukuphefumla kuba kancinci okanye kunganzulu, awukwazi ukuvuswa lula, okanye imilebe iba luhlaza — funa uncedo olungxamisekileyo ngokukhawuleza.",
      ],
    },
  },
};
