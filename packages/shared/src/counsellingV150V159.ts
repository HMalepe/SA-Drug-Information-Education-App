/**
 * v150–v159 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V150_TO_V159: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-levetiracetam": five(
    [
      "Take this antiepileptic exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Levetiracetam counselling commonly includes mood or behaviour change watch — report irritability, aggression, or depression early. Materia does not invent a dose or blood-level target.",
      "Tell your pharmacist about pregnancy plans, kidney history, and ALL other medicines on your list.",
      "Drowsiness and dizziness are commonly discussed — avoid driving until you know your response.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you have self-harm thoughts, prolonged seizures, severe confusion, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antiepileptic njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-levetiracetam kuvame ukufaka ukugada ukushintsha kwemizwa noma ukuziphatha — bika ukucasuka, ulaka, noma ukucindezeleka ngokushesha. I-Materia ayiqambi umthamo noma umgomo weleveli egazini.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, umlando wezintso, NAWO WONKE amanye amaphilisi ohlwini lwakho.",
      "Ukozela nesiyezi kuvame ukuxoxwa — gwema ukushayela uze wazi ukuthi usabela kanjani.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma unemicabango yokuzilimaza, ukuxhuzula okude, ukudideka okukhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antiepileptikum soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Levetirasetaam-berading sluit dikwels bui- of gedragsveranderingwaaksaamheid in — rapporteer prikkelbaarheid, aggressie of depressie vroeg. Materia versin nie ’n dosis of bloedvlakteiken nie.",
      "Sê vir jou apteker van swangerskapplanne, niergeskiedenis, en ALLE ander medisyne op jou lys.",
      "Slaperigheid en duiseligheid word dikwels bespreek — vermy bestuur totdat jy jou reaksie ken.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy selfskade-gedagtes, langdurige stuiptrekkings, ernstige verwarring of asemhalingsprobleme het — soek noodhulp.",
    ],
    [
      "Sebelisa antiepileptic ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea levetiracetam hangata e kenyelletsa ho hlokomela liphetoho tsa maikutlo kapa boitšoaro — tlaleha ho hloka mamello, bohale, kapa ho tepella kapele. Materia ha e iqape tekanyo kapa sepheo sa level ea mali.",
      "Bolella rakhemisi ka merero ea ho ima, histori ea liphio, le MERIANA EOHLE e meng lenaneng la hau.",
      "Ho otsela le ho tsekela hangata ho buisanoa — qoba ho khanna ho fihlela u tseba karabelo ea hau.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u na le menahano ea ho intša kotsi, ho thothomela ho telele, ho ferekana ho matla, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antiepileptic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-levetiracetam zihlala zibandakanya ukugada utshintsho lwemvakalelo okanye ukuziphatha — xela ukucaphuka, ubundlobongela, okanye ukudakumba kwangoko. I-Materia ayiyiqiqi idosi okanye usukelo lweleveli yegazi.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, imbali yezintso, NAWO ONKE amanye amayeza kuluhlu lwakho.",
      "Ukozela nesiyezi kuhlala kuxoxwa — pepa ukuqhuba de wazi indlela osabela ngayo.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba uneengcinga zokuzilimaza, ukuxhuzula okude, ukudideka okunzima, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-phenytoin": five(
    [
      "Take this antiepileptic exactly as directed on your labelled product — keep brand and timing reasonably consistent; do not stop suddenly without your clinician.",
      "Phenytoin counselling commonly includes level monitoring, gum-care teaching, and interaction checks with many medicines. Materia does not invent a dose or blood-level target.",
      "Tell your pharmacist about pregnancy plans, ALL other medicines, and alcohol use.",
      "Report rash, fever, swollen glands, unusual bruising, or severe dizziness early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours or a catch-up plan.",
      "If you get blistering rash with fever, yellow eyes, prolonged seizures, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antiepileptic njengoba kubhalwe kumkhiqizo onelebula — gcina uhlobo nesikhathi kulingene; ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-phenytoin kuvame ukufaka ukuqapha ama-level, ukunakekela izinsini, nokuhlola ukuxhumana namaphilisi amaningi. I-Materia ayiqambi umthamo noma umgomo weleveli egazini.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, NAWO WONKE amanye amaphilisi, nokusebenzisa utshwala.",
      "Bika ukuqubuka, umkhuhlane, izindlala ezivuvukile, amabala aluhlaza angajwayelekile, noma isiyezi esikhulu ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa noma uhlelo lokubuyisela.",
      "Uma uthola ukuqubuka kwamaqhubu nomkhuhlane, amehlo aphuzi, ukuxhuzula okude, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antiepileptikum soos op die geëtiketteerde produk aangedui — hou handelsmerk en tydsberekening redelik konsekwent; moenie skielik stop sonder jou klinikus nie.",
      "Fenitoïen-berading sluit dikwels vlakmonitering, tandvleissorg-onderrig, en interaksiekontroles met baie medisyne in. Materia versin nie ’n dosis of bloedvlakteiken nie.",
      "Sê vir jou apteker van swangerskapplanne, ALLE ander medisyne, en alkoholgebruik.",
      "Rapporteer uitslag, koors, geswelde kliere, ongewone kneusings, of ernstige duiseligheid vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure of ’n inhaalplan versin nie.",
      "As jy blaasuitslag met koors, geel oë, langdurige stuiptrekkings of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antiepileptic ena hantle kamoo e hlalositsoeng holabel — boloka brand le nako ho tsitsitse; se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea phenytoin hangata e kenyelletsa ho hlokomela maemo, thuto ea tlhokomelo ea mero, le litlhahlobo tsa ho sebelisana le meriana e mengata. Materia ha e iqape tekanyo kapa sepheo sa level ea mali.",
      "Bolella rakhemisi ka merero ea ho ima, MERIANA EOHLE e meng, le tšebeliso ea joala.",
      "Tlaleha lekhopho, feberu, litšoelesa tse ruruhileng, matheba a sootho a sa tloaelehang, kapa ho tsekela ho matla kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola kapa moralo oa ho tsosolosa.",
      "Haeba u fumana lekhopho la lihlabana le feberu, mahlo a mosehla, ho thothomela ho telele, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antiepileptic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gcina uphawu nexesha kungaguquguquki; sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-phenytoin zihlala zibandakanya ukuqapha iilevel, ukufundiswa ngokhathalelo lweentsini, nokujonga ukusebenzelana namayeza amaninzi. I-Materia ayiyiqiqi idosi okanye usukelo lweleveli yegazi.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, NAWO ONKE amanye amayeza, nokusebenzisa utywala.",
      "Xela irhashalala, umkhuhlane, iindlala ezidumbileyo, amabala aluhlaza angaqhelekanga, okanye isiyezi esinzima kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula okanye isicwangciso sokubuyisela.",
      "Ukuba ufumana irhashalala yamaqhuma nomkhuhlane, amehlo atyheli, ukuxhuzula okude, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-celecoxib": five(
    [
      "Take this COX-2 selective NSAID exactly as directed on your labelled product — often with food if stomach upset occurs.",
      "Celecoxib counselling commonly includes heart, kidney, and stomach risk discussions — report black stools, chest pain, swelling, or reduced urine. Materia does not invent a dose or pain target.",
      "Tell your pharmacist about sulfa allergy history, heart disease, ulcer history, and all other painkillers you use.",
      "Ask how this fits with aspirin or blood thinners on your list — confirm against the labelled product and care plan.",
      "Do not combine with other NSAIDs unless your clinician agrees — do not invent a personal pain schedule.",
      "If you vomit blood, pass black stools, get sudden shortness of breath, or facial swelling — seek emergency care.",
    ],
    [
      "Sebenzisa le COX-2 selective NSAID njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla uma isisu siphazamiseka.",
      "Ukwelulekwa kwe-celecoxib kuvame ukufaka izingxoxo zenhliziyo, izintso, nesisu — bika indle emnyama, ubuhlungu besifuba, ukuvuvuka, noma umchamo omncane. I-Materia ayiqambi umthamo noma umgomo wobuhlungu.",
      "Tshela umkhiqizi ngomlando we-allergy ye-sulfa, isifo senhliziyo, umlando wezilonda, nawo wonke amanye amaphilisi obuhlungu.",
      "Buza ukuthi lokhu kuhambisana kanjani ne-aspirin noma ama-blood thinner ohlwini lwakho — qinisekisa kumkhiqizo onelebula nohlelo lokunakekelwa.",
      "Ungahlanganisi namanye ama-NSAID ngaphandle kokuvuma kukadokotela — ungayiqiqi uhlelo lobuhlungu lomuntu siqu.",
      "Uma uhlanza igazi, ukhipha indle emnyama, uthola ukuphefumula kancane ngokuzumayo, noma ukuvuvuka kobuso — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie COX-2-selektiewe NSAID soos op die geëtiketteerde produk aangedui — dikwels met kos as maagonstel voorkom.",
      "Selecoxib-berading sluit dikwels hart-, nier- en maagrisiko-besprekings in — rapporteer swart stoelgang, borspyn, swelling of minder urine. Materia versin nie ’n dosis of pynteiken nie.",
      "Sê vir jou apteker van sulfa-allergiegeskiedenis, hartsiektes, ulkusgeskiedenis, en alle ander pynstillers wat jy gebruik.",
      "Vra hoe dit by aspirien of bloedverdunners op jou lys pas — bevestig teen die geëtiketteerde produk en sorgplan.",
      "Moenie met ander NSAIDs kombineer nie tensy jou klinikus saamstem — moenie ’n persoonlike pynskedule versin nie.",
      "As jy bloed braak, swart stoelgang het, skielike kortasem of gesigswelling kry — soek noodhulp.",
    ],
    [
      "Sebelisa COX-2 selective NSAID ena hantle kamoo e hlalositsoeng holabel — hangata le lijo haeba mpeng e tšoenyeha.",
      "Keletso ea celecoxib hangata e kenyelletsa lipuisano tsa kotsi ea pelo, liphio, le mpeng — tlaleha mantle a sootho, bohloko ba sefuba, ho ruruha, kapa moroto o fokolang. Materia ha e iqape tekanyo kapa sepheo sa bohloko.",
      "Bolella rakhemisi ka histori ea allergy ea sulfa, boloetse ba pelo, histori ea liso, le lipilisi tsohle tsa bohloko.",
      "Botsa hore sena se tšoana joang le aspirin kapa li-blood thinner lenaneng la hau — netefatsa holabel le moralo oa tlhokomelo.",
      "Se ke oa e kopanya le li-NSAID tse ling ntle le tumellano ea ngaka — se ke oa iqapa kemiso ea bohloko ea motho ka mong.",
      "Haeba u hlatsa mali, u ntša mantle a sootho, u fumana ho hema butle ka tšohanyetso, kapa ho ruruha ha sefahleho — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le COX-2 selective NSAID ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya ukuba isisu siyaphazamiseka.",
      "Iingcebiso ze-celecoxib zihlala zibandakanya iingxoxo zomngcipheko wentliziyo, izintso, nesisu — xela indle emnyama, iintlungu zesifuba, ukudumba, okanye umchamo omncinci. I-Materia ayiyiqiqi idosi okanye usukelo lweentlungu.",
      "Xelela usokhemisti ngembali ye-allergy ye-sulfa, isifo sentliziyo, imbali yezilonda, nawo onke amanye amayeza eentlungu.",
      "Buza indlela oku kuhambelana ngayo ne-aspirin okanye ama-blood thinner kuluhlu lwakho — qinisekisa kwileyibhile nakwicandelo lokhathalelo.",
      "Sukudibanisa namanye ama-NSAID ngaphandle kokuvuma kugqirha — sukuyiqqa ishedyuli yeentlungu yakho.",
      "Ukuba uyahlanza igazi, ukhupha indle emnyama, ufumana ukuphefumla kancinci ngequbuliso, okanye ukudumba kobuso — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-enoxaparin": five(
    [
      "Use this low-molecular-weight heparin exactly as directed on your labelled product — injection technique and site rotation follow product teaching.",
      "Enoxaparin counselling commonly includes bleeding and bruise watch — report prolonged nosebleeds, black stools, or blood in urine. Materia does not invent a dose, units, or clotting target.",
      "Tell your pharmacist about kidney history, other blood thinners, NSAIDs, planned surgery, and spinal or epidural procedures.",
      "Do not stop before procedures without your clinician — confirm against the labelled product and care plan.",
      "Ask how to store and dispose of needles safely — do not invent a personal injection schedule.",
      "If you have uncontrolled bleeding, sudden severe back pain with weakness, stroke symptoms, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le low-molecular-weight heparin njengoba kubhalwe kumkhiqizo onelebula — indlela yokujova nokushintsha indawo kulandela ukufundiswa komkhiqizo.",
      "Ukwelulekwa kwe-enoxaparin kuvame ukufaka ukugada ukopha namabala aluhlaza — bika ukopha kwamakhala okude, indle emnyama, noma igazi emchimini. I-Materia ayiqambi umthamo, amayunithi, noma umgomo wokuvuvuka.",
      "Tshela umkhiqizi ngomlando wezintso, amanye ama-blood thinner, ama-NSAID, ukuhlinzwa okuhleliwe, nezinqubo zomgogodla noma i-epidural.",
      "Ungayeki ngaphambi kwezinqubo ngaphandle kwedokotela — qinisekisa kumkhiqizo onelebula nohlelo lokunakekelwa.",
      "Buza ukuthi ugcina futhi ulahla kanjani izinaliti ngokuphepha — ungayiqiqi uhlelo lokujova lomuntu siqu.",
      "Uma unokopha okungalawuleki, ubuhlungu bomhlane obukhulu ngokuzumayo nobuthakathaka, izimpawu ze-stroke, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie lae-molekulêre-gewig heparien soos op die geëtiketteerde produk aangedui — inspuitingstegniek en plekrotasie volg produkonderrig.",
      "Enoksaparien-berading sluit dikwels bloeding- en kneusingswaaksaamheid in — rapporteer langdurige neusbloeding, swart stoelgang of bloed in urine. Materia versin nie ’n dosis, eenhede of stollingsteiken nie.",
      "Sê vir jou apteker van niergeskiedenis, ander bloedverdunners, NSAIDs, beplande chirurgie, en spinale of epidurale prosedures.",
      "Moenie voor prosedures stop sonder jou klinikus nie — bevestig teen die geëtiketteerde produk en sorgplan.",
      "Vra hoe om naalde veilig te berg en weg te gooi — moenie ’n persoonlike inspuitingskedule versin nie.",
      "As jy onbeheerde bloeding, skielike ernstige rugpyn met swakheid, beroerte-simptome of asemhalingsprobleme het — soek noodhulp.",
    ],
    [
      "Sebelisa low-molecular-weight heparin ena hantle kamoo e hlalositsoeng holabel — mokhoa oa ho enta le ho potoloha ha sebaka o latela thuto ea sehlahiswa.",
      "Keletso ea enoxaparin hangata e kenyelletsa ho hlokomela ho tsoa mali le matheba a sootho — tlaleha ho tsoa mali nkong ho telele, mantle a sootho, kapa mali ka har'a moroto. Materia ha e iqape tekanyo, liyunithi, kapa sepheo sa ho oma ha mali.",
      "Bolella rakhemisi ka histori ea liphio, li-blood thinner tse ling, li-NSAID, opereishene e reriloeng, le mekhoa ea mokokotlo kapa epidural.",
      "Se ke oa emisa pele ho mekhoa ntle le ngaka — netefatsa holabel le moralo oa tlhokomelo.",
      "Botsa hore u boloka le ho lahla dinalete ka mokhoa o sireletsehileng joang — se ke oa iqapa kemiso ea motho ka mong ea ho enta.",
      "Haeba u na le ho tsoa mali ho sa laoleheng, bohloko ba mokokotlo bo matla ka tšohanyetso le bofokoli, matšoao a stroke, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le low-molecular-weight heparin ngokuchanekileyo njengoko kubhaliwe kwileyibhile — indlela yokutofa nokutshintsha indawo ilandela ukufundiswa kwemveliso.",
      "Iingcebiso ze-enoxaparin zihlala zibandakanya ukugada ukopha kunye namabala aluhlaza — xela ukopha kwempumlo okude, indle emnyama, okanye igazi kumchamo. I-Materia ayiyiqiqi idosi, iiyunithi, okanye usukelo lokubola kwegazi.",
      "Xelela usokhemisti ngembali yezintso, amanye ama-blood thinner, ama-NSAID, utyando olucetyiweyo, neenkqubo zomqolo okanye i-epidural.",
      "Sukuyeki phambi kweenkqubo ngaphandle kogqirha — qinisekisa kwileyibhile nakwicandelo lokhathalelo.",
      "Buza indlela ogcina nokulahla ngayo iinaliti ngokukhuselekileyo — sukuyiqqa ishedyuli yakho yokutofa.",
      "Ukuba unokopha okungalawulekiyo, iintlungu zomqolo ezinzima ngequbuliso nobuthathaka, iimpawu ze-stroke, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-quetiapine": five(
    [
      "Take this atypical antipsychotic exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Quetiapine counselling commonly includes sedation, metabolic change watch, and orthostatic dizziness. Materia does not invent a dose or titration schedule.",
      "Report worsening mood or suicidal thoughts early, including after clinician dose changes.",
      "Tell your pharmacist about diabetes or heart history, other sedating medicines, and alcohol use.",
      "Avoid driving until you know your response — confirm against the labelled product.",
      "If you get high fever with muscle rigidity, fainting, seizures, or trouble breathing — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le atypical antipsychotic njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-quetiapine kuvame ukufaka ukozela, ukugada ukushintsha kwemetabolism, nesiyezi uma umile. I-Materia ayiqambi umthamo noma uhlelo lokukhuphula.",
      "Bika ukwehla kwemizwa noma imicabango yokuzibulala ngokushesha, kuhlanganise ngemva kokushintsha umthamo kudokotela.",
      "Tshela umkhiqizi ngesifo sikashukela noma umlando wenhliziyo, amanye amaphilisi akozisayo, nokusebenzisa utshwala.",
      "Gwema ukushayela uze wazi ukuthi usabela kanjani — qinisekisa kumkhiqizo onelebula.",
      "Uma uthola umkhuhlane ophakeme nokuginya kwemisipha, ukuwa, ukuxhuzula, noma ukuphefumula kanzima — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Neem hierdie atipiese antipsigotikum soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Quetiapien-berading sluit dikwels sedasie, metaboliese-veranderingwaaksaamheid, en ortostatiese duiseligheid in. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Rapporteer verergerende bui of selfmoordgedagtes vroeg, insluitend ná klinikus-dosisveranderinge.",
      "Sê vir jou apteker van diabetes- of hartgeskiedenis, ander sederende medisyne, en alkoholgebruik.",
      "Vermy bestuur totdat jy jou reaksie ken — bevestig teen die geëtiketteerde produk.",
      "As jy hoë koors met spierstijfheid, floute, stuiptrekkings of asemhalingsprobleme kry — soek dadelik noodhulp.",
    ],
    [
      "Sebelisa atypical antipsychotic ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea quetiapine hangata e kenyelletsa ho otsela, ho hlokomela liphetoho tsa metabolism, le ho tsekela ha u ema. Materia ha e iqape tekanyo kapa moralo oa ho nyolla.",
      "Tlaleha maikutlo a mabe kapa menahano ea ho ipolaea kapele, ho kenyeletsoa ka mor'a liphetoho tsa tekanyo tsa ngaka.",
      "Bolella rakhemisi ka diabetes kapa histori ea pelo, meriana e meng e otselang, le tšebeliso ea joala.",
      "Qoba ho khanna ho fihlela u tseba karabelo ea hau — netefatsa holabel.",
      "Haeba u fumana feberu e phahameng le ho thatafala ha mesifa, ho akheha, ho thothomela, kapa ho hema thata — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "Sebenzisa le atypical antipsychotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-quetiapine zihlala zibandakanya ukozela, ukugada utshintsho lwemetabolism, nesiyezi xa umi. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyusa.",
      "Xela ukwehla kwemvakalelo okanye iingcinga zokuzibulala kwangoko, kuquka emva kotshintsho lwedosi lugqirha.",
      "Xelela usokhemisti ngesifo seswekile okanye imbali yentliziyo, amanye amayeza akozisayo, nokusebenzisa utywala.",
      "Pepa ukuqhuba de wazi indlela osabela ngayo — qinisekisa kwileyibhile.",
      "Ukuba ufumana umkhuhlane ophezulu nokuginya kwemisipha, ukuwa, ukuxhuzula, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-carbimazole": five(
    [
      "Take this antithyroid medicine exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Carbimazole counselling commonly includes infection watch: report fever, sore throat, mouth ulcers, or unusual bruising urgently. Materia does not invent a dose or thyroid-level target.",
      "Tell your pharmacist about pregnancy plans, liver history, and ALL other medicines you use.",
      "Report yellow eyes, severe itching, or unexplained rash early.",
      "Ask how monitoring blood tests fit your care plan — do not invent a lab schedule.",
      "If you get high fever with severe sore throat, blistering rash, yellow eyes, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antithyroid medicine njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-carbimazole kuvame ukufaka ukugada ukutheleleka: bika umkhuhlane, umphimbo obuhlungu, izilonda zomlomo, noma amabala aluhlaza angajwayelekile ngokushesha. I-Materia ayiqambi umthamo noma umgomo weleveli ye-thyroid.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, umlando wesibindi, NAWO WONKE amanye amaphilisi.",
      "Bika amehlo aphuzi, ukulunywa okukhulu, noma ukuqubuka okungachaziwe ngokushesha.",
      "Buza ukuthi ukuhlolwa kwegazi kuhambisana kanjani nohlelo lwakho — ungayiqiqi uhlelo lwelabhorethri.",
      "Uma uthola umkhuhlane ophakeme nomphimbo obuhlungu kakhulu, ukuqubuka kwamaqhubu, amehlo aphuzi, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antiskildkliermiddel soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Karbimasool-berading sluit dikwels infeksiewaaksaamheid in: rapporteer koors, seer keel, mondsere of ongewone kneusings dringend. Materia versin nie ’n dosis of skildkliervlakteiken nie.",
      "Sê vir jou apteker van swangerskapplanne, lewergeskiedenis, en ALLE ander medisyne wat jy gebruik.",
      "Rapporteer geel oë, ernstige jeuk, of onverklaarde uitslag vroeg.",
      "Vra hoe moniteringsbloedtoetse by jou sorgplan pas — moenie ’n labskedule versin nie.",
      "As jy hoë koors met ernstige seer keel, blaasuitslag, geel oë of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antithyroid medicine ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea carbimazole hangata e kenyelletsa ho hlokomela tšoaetso: tlaleha feberu, 'metso o bohloko, liso tsa molomo, kapa matheba a sootho a sa tloaelehang ka potlako. Materia ha e iqape tekanyo kapa sepheo sa level ea thyroid.",
      "Bolella rakhemisi ka merero ea ho ima, histori ea sebete, le MERIANA EOHLE e meng.",
      "Tlaleha mahlo a mosehla, ho hlohlona ho matla, kapa lekhopho le sa hlaloseng kapele.",
      "Botsa hore liteko tsa mali tsa tlhokomelo li tšoana joang le moralo oa hau — se ke oa iqapa kemiso ea lab.",
      "Haeba u fumana feberu e phahameng le 'metso o bohloko haholo, lekhopho la lihlabana, mahlo a mosehla, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antithyroid medicine ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-carbimazole zihlala zibandakanya ukugada usulelo: xela umkhuhlane, umqala obuhlungu, izilonda zomlomo, okanye amabala aluhlaza angaqhelekanga ngokukhawuleza. I-Materia ayiyiqiqi idosi okanye usukelo lweleveli ye-thyroid.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, imbali yesibindi, NAWO ONKE amanye amayeza.",
      "Xela amehlo atyheli, ukurhawuzelela okunzima, okanye irhashalala engachazwanga kwangoko.",
      "Buza indlela iimvavanyo zegazi zokuqapha ezihambelana ngayo nesicwangciso sakho — sukuyiqqa ishedyuli yelabhorethri.",
      "Ukuba ufumana umkhuhlane ophezulu nomqala obuhlungu kakhulu, irhashalala yamaqhuma, amehlo atyheli, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-semaglutide": five(
    [
      "Use this GLP-1 receptor agonist exactly as directed on your labelled product — injection or oral products follow their own labelled plans.",
      "Semaglutide counselling commonly includes nausea, reduced appetite, and hydration discussions — report severe persistent vomiting or abdominal pain. Materia does not invent a dose, units, or weight target.",
      "Tell your pharmacist about pancreatitis or gallbladder history, other diabetes medicines, and pregnancy plans.",
      "Ask how illness with reduced eating should be handled on your care plan — do not invent a sick-day schedule.",
      "Keep hypo recognition teaching if you also use insulin or a sulfonylurea — confirm against the labelled product.",
      "If you get severe abdominal pain with vomiting, yellow eyes, sudden vision changes, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le GLP-1 receptor agonist njengoba kubhalwe kumkhiqizo onelebula — imikhiqizo yokujova noma yomlomo ilandela izinhlelo zayo zolebula.",
      "Ukwelulekwa kwe-semaglutide kuvame ukufaka isicanucanu, ukudla okuncane, nezingxoxo zoketshezi — bika ukuhlanza okuqhubekayo okukhulu noma ubuhlungu besisu. I-Materia ayiqambi umthamo, amayunithi, noma umgomo wesisindo.",
      "Tshela umkhiqizi ngomlando we-pancreatitis noma i-gallbladder, amanye amaphilisi esifo sikashukela, nezinhlelo zokukhulelwa.",
      "Buza ukuthi ukugula nokudla okuncane kufanele kuphathwe kanjani ohlelweni lwakho — ungayiqiqi uhlelo lwezinsuku zokugula.",
      "Gcina ukwazi i-hypo uma usebenzisa ne-insulin noma i-sulfonylurea — qinisekisa kumkhiqizo onelebula.",
      "Uma uthola ubuhlungu besisu obukhulu nokuhlanza, amehlo aphuzi, ukushintsha kokubona okuzumayo, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie GLP-1-reseptoragonis soos op die geëtiketteerde produk aangedui — inspuiting- of orale produkte volg hul eie geëtiketteerde planne.",
      "Semaglutied-berading sluit dikwels naarheid, verminderde eetlus en hidrasiebesprekings in — rapporteer ernstige aanhoudende braking of buikpyn. Materia versin nie ’n dosis, eenhede of gewigteiken nie.",
      "Sê vir jou apteker van pankreatitis- of galblaasgeskiedenis, ander diabetesmedisyne, en swangerskapplanne.",
      "Vra hoe siekte met minder eet op jou sorgplan hanteer moet word — moenie ’n siektedagskedule versin nie.",
      "Hou hipo-herkenningsonderrig as jy ook insulien of ’n sulfonielureum gebruik — bevestig teen die geëtiketteerde produk.",
      "As jy ernstige buikpyn met braking, geel oë, skielike sigveranderinge of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa GLP-1 receptor agonist ena hantle kamoo e hlalositsoeng holabel — lihlahiswa tsa ho enta kapa tsa molomo li latela merero ea tsona ea leibole.",
      "Keletso ea semaglutide hangata e kenyelletsa ho nyatsa, takatso e fokotsehileng ea lijo, le lipuisano tsa mokelikeli — tlaleha ho hlatsa ho tsoelang pele ho matla kapa bohloko ba mpeng. Materia ha e iqape tekanyo, liyunithi, kapa sepheo sa boima.",
      "Bolella rakhemisi ka histori ea pancreatitis kapa gallbladder, meriana e meng ea diabetes, le merero ea ho ima.",
      "Botsa hore ho kula ka ho ja ho fokolang ho lokela ho tšoaroa joang moralong oa hau — se ke oa iqapa kemiso ea matsatsi a ho kula.",
      "Boloka thuto ea ho tseba hypo haeba u sebelisa le insulin kapa sulfonylurea — netefatsa holabel.",
      "Haeba u fumana bohloko ba mpeng bo matla le ho hlatsa, mahlo a mosehla, liphetoho tsa pono ka tšohanyetso, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le GLP-1 receptor agonist ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iimveliso zokutofa okanye zomlomo zilandela izicwangciso zazo zeleyibhile.",
      "Iingcebiso ze-semaglutide zihlala zibandakanya isicanucanu, ukutya okuncinci, neengxoxo zolwelo — xela ukuhlanza okuqhubekayo okunzima okanye iintlungu zesisu. I-Materia ayiyiqiqi idosi, iiyunithi, okanye usukelo lobunzima.",
      "Xelela usokhemisti ngembali ye-pancreatitis okanye i-gallbladder, amanye amayeza esifo seswekile, nezicwangciso zokukhulelwa.",
      "Buza indlela ukugula ngokutya okuncinci ekufanele kuphathwe ngayo kwisicwangciso sakho — sukuyiqqa ishedyuli yeentsuku zokugula.",
      "Gcina ukufundiswa kokwazi i-hypo ukuba usebenzisa ne-insulin okanye i-sulfonylurea — qinisekisa kwileyibhile.",
      "Ukuba ufumana iintlungu zesisu ezinzima nokuhlanza, amehlo atyheli, utshintsho lombono ngequbuliso, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-azathioprine": five(
    [
      "Take this immunosuppressant exactly as directed on your labelled product — often with food if stomach upset occurs.",
      "Azathioprine counselling commonly includes infection watch and blood-count monitoring discussions with your clinician. Materia does not invent a dose or lab target.",
      "Tell your pharmacist about allopurinol or mercaptopurine on your list, pregnancy plans, and ALL other medicines — interaction checks are product-specific.",
      "Report fever, sore throat, unusual bruising, severe nausea, or yellow eyes early.",
      "Ask about sun-care and vaccine timing on your care plan — do not invent a personal schedule.",
      "If you get high fever with extreme fatigue, blistering rash, yellow eyes, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le immunosuppressant njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla uma isisu siphazamiseka.",
      "Ukwelulekwa kwe-azathioprine kuvame ukufaka ukugada ukutheleleka nezingxoxo zokuqapha igazi nodokotela. I-Materia ayiqambi umthamo noma umgomo welabhorethri.",
      "Tshela umkhiqizi nge-allopurinol noma i-mercaptopurine ohlwini lwakho, izinhlelo zokukhulelwa, NAWO WONKE amanye amaphilisi — ukuhlola ukuxhumana kuncike kumkhiqizo.",
      "Bika umkhuhlane, umphimbo obuhlungu, amabala aluhlaza angajwayelekile, isicanucanu esikhulu, noma amehlo aphuzi ngokushesha.",
      "Buza ngokuzivikela elangeni nesikhathi se-vaccine ohlelweni lwakho — ungayiqiqi uhlelo lomuntu siqu.",
      "Uma uthola umkhuhlane ophakeme nokukhathala okukhulu, ukuqubuka kwamaqhubu, amehlo aphuzi, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie immuunonderdrukker soos op die geëtiketteerde produk aangedui — dikwels met kos as maagonstel voorkom.",
      "Azatioprien-berading sluit dikwels infeksiewaaksaamheid en bloedtelling-moniteringbesprekings met jou klinikus in. Materia versin nie ’n dosis of labteiken nie.",
      "Sê vir jou apteker van allopurinol of mercaptopurien op jou lys, swangerskapplanne, en ALLE ander medisyne — interaksiekontroles is produkspesifiek.",
      "Rapporteer koors, seer keel, ongewone kneusings, ernstige naarheid, of geel oë vroeg.",
      "Vra oor sonbeskerming en entstof-tydsberekening op jou sorgplan — moenie ’n persoonlike skedule versin nie.",
      "As jy hoë koors met uiterste moegheid, blaasuitslag, geel oë of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa immunosuppressant ena hantle kamoo e hlalositsoeng holabel — hangata le lijo haeba mpeng e tšoenyeha.",
      "Keletso ea azathioprine hangata e kenyelletsa ho hlokomela tšoaetso le lipuisano tsa ho hlokomela palo ea mali le ngaka. Materia ha e iqape tekanyo kapa sepheo sa lab.",
      "Bolella rakhemisi ka allopurinol kapa mercaptopurine lenaneng la hau, merero ea ho ima, le MERIANA EOHLE e meng — litlhahlobo tsa ho sebelisana li ipapisitse le sehlahiswa.",
      "Tlaleha feberu, 'metso o bohloko, matheba a sootho a sa tloaelehang, ho nyatsa ho matla, kapa mahlo a mosehla kapele.",
      "Botsa ka tlhokomelo ea letsatsi le nako ea vaccine moralong oa hau — se ke oa iqapa kemiso ea motho ka mong.",
      "Haeba u fumana feberu e phahameng le mokhathala o feteletseng, lekhopho la lihlabana, mahlo a mosehla, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le immunosuppressant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya ukuba isisu siyaphazamiseka.",
      "Iingcebiso ze-azathioprine zihlala zibandakanya ukugada usulelo neengxoxo zokuqapha igazi nogqirha. I-Materia ayiyiqiqi idosi okanye usukelo lwelabhorethri.",
      "Xelela usokhemisti nge-allopurinol okanye i-mercaptopurine kuluhlu lwakho, izicwangciso zokukhulelwa, NAWO ONKE amanye amayeza — ukujonga ukusebenzelana kuxhomekeke kwimveliso.",
      "Xela umkhuhlane, umqala obuhlungu, amabala aluhlaza angaqhelekanga, isicanucanu esinzima, okanye amehlo atyheli kwangoko.",
      "Buza ngokukhusela ilanga nexesha le-vaccine kwisicwangciso sakho — sukuyiqqa ishedyuli yakho.",
      "Ukuba ufumana umkhuhlane ophezulu nokudinwa okugqithisileyo, irhashalala yamaqhuma, amehlo atyheli, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-sumatriptan": five(
    [
      "Take this triptan for migraine exactly as directed on your labelled product — it is not for every headache type.",
      "Sumatriptan counselling commonly includes chest tightness and tingling discussions — report severe chest pain or shortness of breath urgently. Materia does not invent a dose or maximum daily amount.",
      "Tell your pharmacist about heart disease, uncontrolled blood pressure, other triptans or ergot medicines, and SSRIs/SNRIs on your list.",
      "Ask when a second dose may be considered on the labelled product — do not invent spacing hours.",
      "Do not use for hemiplegic or basilar migraine patterns unless your clinician has confirmed suitability.",
      "If you get severe chest pain, sudden weakness on one side, severe headache unlike your usual migraine, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le triptan ye-migraine njengoba kubhalwe kumkhiqizo onelebula — ayenzelwanga zonke izinhlobo zekhanda.",
      "Ukwelulekwa kwe-sumatriptan kuvame ukufaka ukucinana kwesifuba nokubinza — bika ubuhlungu besifuba obukhulu noma ukuphefumula kancane ngokushesha. I-Materia ayiqambi umthamo noma inani eliphezulu losuku.",
      "Tshela umkhiqizi ngesifo senhliziyo, umfutho wegazi ongalawuleki, amanye ama-triptan noma ama-ergot, nama-SSRI/SNRI ohlwini lwakho.",
      "Buza ukuthi umthamo wesibili ungacatshangelwa nini kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Ungayisebenzisi ezinhlotsheni ze-migraine ye-hemiplegic noma i-basilar ngaphandle kokuthi udokotela eqinisekise ukufaneleka.",
      "Uma uthola ubuhlungu besifuba obukhulu, ubuthakathaka obuzumayo ohlangothini olulodwa, ikhanda elibuhlungu elihluke kwi-migraine yakho, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie triptaan vir migraine soos op die geëtiketteerde produk aangedui — dit is nie vir elke hoofpyntipe nie.",
      "Sumatriptaan-berading sluit dikwels borsstyfheid- en tintelingbesprekings in — rapporteer ernstige borspyn of kortasem dringend. Materia versin nie ’n dosis of maksimum daaglikse hoeveelheid nie.",
      "Sê vir jou apteker van hartsiektes, onbeheerde bloeddruk, ander triptane of ergotmiddels, en SSRI’s/SNRI’s op jou lys.",
      "Vra wanneer ’n tweede dosis op die geëtiketteerde produk oorweeg mag word — moenie skeidingsure versin nie.",
      "Moenie vir hemiplegiese of basilêre migraine-patrone gebruik nie tensy jou klinikus geskiktheid bevestig het.",
      "As jy ernstige borspyn, skielike swakheid aan een kant, ernstige hoofpyn anders as jou gewone migraine, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa triptan ena ea migraine hantle kamoo e hlalositsoeng holabel — ha se bakeng sa mofuta o mong le o mong oa hlooho.",
      "Keletso ea sumatriptan hangata e kenyelletsa lipuisano tsa ho tsitsipana ha sefuba le ho hlaba — tlaleha bohloko ba sefuba bo matla kapa ho hema butle ka potlako. Materia ha e iqape tekanyo kapa palo e phahameng ea letsatsi.",
      "Bolella rakhemisi ka boloetse ba pelo, khatello ea mali e sa laoleheng, li-triptan kapa li-ergot tse ling, le li-SSRI/SNRI lenaneng la hau.",
      "Botsa hore tekanyo ea bobeli e ka nahaneloa neng holabel — se ke oa iqapa lihora tsa ho arola.",
      "Se ke oa e sebelisa bakeng sa mekhoa ea migraine ea hemiplegic kapa basilar ntle le haeba ngaka e netefalitse ho lokela.",
      "Haeba u fumana bohloko ba sefuba bo matla, bofokoli ba tšohanyetso ka lehlakoreng le le leng, hlooho e bohloko e fapaneng le migraine ea hau, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le triptan ye-migraine ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ayenzelwanga zonke iintlobo zentloko.",
      "Iingcebiso ze-sumatriptan zihlala zibandakanya iingxoxo zokuqina kwesifuba nokubinza — xela iintlungu zesifuba ezinzima okanye ukuphefumla kancinci ngokukhawuleza. I-Materia ayiyiqiqi idosi okanye inani eliphezulu losuku.",
      "Xelela usokhemisti ngesifo sentliziyo, uxinzeleko lwegazi olungalawulekiyo, ezinye ii-triptan okanye ii-ergot, nama-SSRI/SNRI kuluhlu lwakho.",
      "Buza ukuba idosi yesibini inokuthathelwa ingqalelo nini kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Sukuyisebenzisa kwiipateni ze-migraine ye-hemiplegic okanye i-basilar ngaphandle kokuba ugqirha eqinisekise ukufaneleka.",
      "Ukuba ufumana iintlungu zesifuba ezinzima, ubuthathaka ngequbuliso kwicala elinye, intloko ebuhlungu eyahlukileyo kwi-migraine yakho, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-chlorphenamine": five(
    [
      "Take this first-generation antihistamine exactly as directed on your labelled product.",
      "Chlorphenamine counselling commonly includes marked drowsiness — avoid driving or machinery until you know your response. Materia does not invent a dose or sedation score.",
      "Tell your pharmacist about other sedating medicines, alcohol use, glaucoma, and prostate or urinary retention history.",
      "Dry mouth and constipation are commonly discussed — confirm against the labelled product.",
      "Ask how this fits with cough-cold combination products already in use — do not invent a personal cold schedule.",
      "If you get swelling of the face/lips/tongue, severe wheeze, confusion, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le first-generation antihistamine njengoba kubhalwe kumkhiqizo onelebula.",
      "Ukwelulekwa kwe-chlorphenamine kuvame ukufaka ukozela okukhulu — gwema ukushayela noma imishini uze wazi ukuthi usabela kanjani. I-Materia ayiqambi umthamo noma isikolo sokozela.",
      "Tshela umkhiqizi ngamanye amaphilisi akozisayo, ukusebenzisa utshwala, i-glaucoma, nomlando we-prostate noma ukugcina umchamo.",
      "Umlomo owomile nokuqunjelwa kuvame ukuxoxwa — qinisekisa kumkhiqizo onelebula.",
      "Buza ukuthi lokhu kuhambisana kanjani nemikhiqizo yekhohlokhohleka osevele uyisebenzisa — ungayiqiqi uhlelo lomkhuhlane lomuntu siqu.",
      "Uma uthola ukuvuvuka kobuso/izindebe/ulimi, ukubhobha okukhulu, ukudideka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie eerste-generasie-antihistamien soos op die geëtiketteerde produk aangedui.",
      "Chlorfenamien-berading sluit dikwels duidelike slaperigheid in — vermy bestuur of masjinerie totdat jy jou reaksie ken. Materia versin nie ’n dosis of sedasietelling nie.",
      "Sê vir jou apteker van ander sederende medisyne, alkoholgebruik, gloukoom, en prostaat- of urinêre retensie-geskiedenis.",
      "Droë mond en hardlywigheid word dikwels bespreek — bevestig teen die geëtiketteerde produk.",
      "Vra hoe dit by hoes-verkoudheid kombinasieprodukte pas wat jy reeds gebruik — moenie ’n persoonlike verkoudheidskedule versin nie.",
      "As jy swelling van die gesig/lippe/tong, ernstige piep, verwarring of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa first-generation antihistamine ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
      "Keletso ea chlorphenamine hangata e kenyelletsa ho otsela ho hlakileng — qoba ho khanna kapa mechini ho fihlela u tseba karabelo ea hau. Materia ha e iqape tekanyo kapa lintlha tsa ho otsela.",
      "Bolella rakhemisi ka meriana e meng e otselang, tšebeliso ea joala, glaucoma, le histori ea prostate kapa ho boloka moroto.",
      "Molomo o omileng le ho thatafala ha mala hangata ho buisanoa — netefatsa holabel.",
      "Botsa hore sena se tšoana joang le lihlahiswa tsa ho khohlela-sefuba tseo u se u ntse u li sebelisa — se ke oa iqapa kemiso ea motho ka mong ea sefuba.",
      "Haeba u fumana ho ruruha ha sefahleho/melomo/leleme, ho honotha ho matla, ho ferekana, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le first-generation antihistamine ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
      "Iingcebiso ze-chlorphenamine zihlala zibandakanya ukozela okucacileyo — pepa ukuqhuba okanye umatshini de wazi indlela osabela ngayo. I-Materia ayiyiqiqi idosi okanye inqanaba lokozela.",
      "Xelela usokhemisti ngamanye amayeza akozisayo, ukusebenzisa utywala, i-glaucoma, nembali ye-prostate okanye ukugcina umchamo.",
      "Umlomo owomileyo nokuqunjelwa kuhlala kuxoxwa — qinisekisa kwileyibhile.",
      "Buza indlela oku kuhambelana ngayo neemveliso zokukhohlela-umbethe osele uzisebenzisa — sukuyiqqa ishedyuli yakho yombethe.",
      "Ukuba ufumana ukudumba kobuso/imilebe/ulwimi, ukubhobha okunzima, ukudideka, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
