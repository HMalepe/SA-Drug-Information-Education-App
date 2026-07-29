/**
 * v140–v149 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V140_TO_V149: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-ramipril": five(
    [
      "Take this ACE inhibitor exactly as directed on your labelled product.",
      "ACE-inhibitor counselling commonly includes a dry cough and dizziness on standing — report persistent cough rather than stopping suddenly on your own.",
      "Pregnancy plans matter: tell your clinician early if you are pregnant, planning pregnancy, or breastfeeding — Materia does not invent a dose or blood-pressure target.",
      "Tell your pharmacist about kidney history, potassium supplements, salt substitutes, and other blood-pressure medicines on your list.",
      "Ask how this medicine fits with diuretics or NSAIDs you already use — confirm against the labelled product and your care plan.",
      "If you get swelling of the face/lips/tongue, severe dizziness with fainting, chest pain, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le ACE inhibitor njengoba kubhalwe kumkhiqizo onelebula.",
      "Ukwelulekwa kwe-ACE inhibitor kuvame ukufaka ukukhwehlela okomile nesiyezi uma umile — bika ukukhwehlela okuqhubekayo kunokuyeka ngokuzumayo wedwa.",
      "Izinhlelo zokukhulelwa zibalulekile: tshela udokotela ngokushesha uma ukhulelwe, uhlela ukukhulelwa, noma uncelisa — i-Materia ayiqambi umthamo noma umgomo womfutho wegazi.",
      "Tshela umkhiqizi ngomlando wezintso, izithako ze-potassium, okungenye usawoti, namanye amaphilisi omfutho wegazi ohlwini lwakho.",
      "Buza ukuthi leli philisi lihambisana kanjani nama-diuretic noma ama-NSAID osevele uwasebenzisa — qinisekisa kumkhiqizo onelebula nohlelo lokunakekelwa.",
      "Uma uthola ukuvuvuka kobuso/izindebe/ulimi, isiyezi esikhulu nokuwela, ubuhlungu besifuba, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie ACE-inhibeerder soos op die geëtiketteerde produk aangedui.",
      "ACE-inhibeerder-berading sluit dikwels ’n droë hoes en duiseligheid by staan in — rapporteer aanhoudende hoes eerder as om skielik self te stop.",
      "Swangerskapplanne saak: sê vroeg vir jou klinikus as jy swanger is, swangerskap beplan, of borsvoed — Materia versin nie ’n dosis of bloeddrukteiken nie.",
      "Sê vir jou apteker van niergeskiedenis, kaliumaanvullings, soutvervangers, en ander bloeddrukmedisyne op jou lys.",
      "Vra hoe hierdie middel by diuretika of NSAIDs pas wat jy reeds gebruik — bevestig teen die geëtiketteerde produk en jou sorgplan.",
      "As jy swelling van die gesig/lippe/tong, ernstige duiseligheid met floute, borspyn of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa ACE inhibitor ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
      "Keletso ea ACE inhibitor hangata e kenyelletsa ho khohlela ho omeletseng le ho tsekela ha u ema — tlaleha ho khohlela ho tsoelang pele ho e-na le ho emisa ka potlako u le mong.",
      "Merero ea ho ima e bohlokoa: bolella ngaka kapele haeba u imme, u rera ho ima, kapa u anyesa — Materia ha e iqape tekanyo kapa sepheo sa khatello ea mali.",
      "Bolella rakhemisi ka histori ea liphio, litlatsetso tsa potassium, li-salt substitute, le meriana e meng ea khatello ea mali lenaneng la hau.",
      "Botsa hore moriana ona o tšoana joang le li-diuretic kapa li-NSAID tseo u se u ntse u li sebelisa — netefatsa holabel le moralo oa tlhokomelo.",
      "Haeba u fumana ho ruruha ha sefahleho/melomo/leleme, ho tsekela ho matla le ho akheha, bohloko ba sefuba, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le ACE inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
      "Iingcebiso ze-ACE inhibitor zihlala zibandakanya ukukhohlela okomileyo nesiyezi xa umi — xela ukukhohlela okuqhubekayo kunokuyeka ngequbuliso wedwa.",
      "Izicwangciso zokukhulelwa zibalulekile: xelela ugqirha kwangoko ukuba ukhulelwe, uceba ukukhulelwa, okanye uncelisa — i-Materia ayiyiqiqi idosi okanye usukelo loxinzeleko lwegazi.",
      "Xelela usokhemisti ngembali yezintso, izongezelelo ze-potassium, ezithatha indawo yetyuwa, namanye amayeza oxinzeleko lwegazi kuluhlu lwakho.",
      "Buza indlela eli yeza lihambelana ngayo nama-diuretic okanye ama-NSAID osele uwasebenzisa — qinisekisa kwileyibhile nakwicandelo lakho lokhathalelo.",
      "Ukuba ufumana ukudumba kobuso/imilebe/ulwimi, isiyezi esinzima nokuwawa, iintlungu zesifuba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-penv": five(
    [
      "Take this penicillin antibiotic exactly as directed on your labelled product — complete the prescribed course even if you feel better.",
      "Phenoxymethylpenicillin counselling commonly includes empty-stomach timing on some products — confirm against the labelled product. Materia does not invent a dose, clock time, or course length.",
      "Tell your pharmacist about penicillin allergy history and all other antibiotics you use.",
      "Report severe diarrhoea, persistent vomiting, or new rash early rather than waiting for the course to finish.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get severe rash with blistering, facial swelling, wheeze, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le penicillin antibiotic njengoba kubhalwe kumkhiqizo onelebula — qedela inkambo enikeziwe noma uzizwa ungcono.",
      "Ukwelulekwa kwe-phenoxymethylpenicillin kuvame ukufaka isikhathi sesisu esingenalutho kweminye imikhiqizo — qinisekisa kumkhiqizo onelebula. I-Materia ayiqambi umthamo, isikhathi, noma ubude benkambo.",
      "Tshela umkhiqizi ngomlando we-allergy ye-penicillin nawo wonke amanye ama-antibiotic.",
      "Bika ukuhuda okukhulu, ukuhlanza okuqhubekayo, noma ukuqubuka okusha ngokushesha kunokulinda inkambo iqede.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ukuqubuka okukhulu namaqhubu, ukuvuvuka kobuso, ukubhobha, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie penisillien-antibiotikum soos op die geëtiketteerde produk aangedui — voltooi die voorgeskryfde kuur selfs as jy beter voel.",
      "Fenoksimetielpenisillien-berading sluit dikwels leë-maag-tydsberekening op sommige produkte in — bevestig teen die geëtiketteerde produk. Materia versin nie ’n dosis, kloktyd of kuurduur nie.",
      "Sê vir jou apteker van penisillien-allergiegeskiedenis en alle ander antibiotika wat jy gebruik.",
      "Rapporteer ernstige diarree, aanhoudende braking, of nuwe uitslag vroeg eerder as om te wag tot die kuur klaar is.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ernstige uitslag met blase, gesigswelling, piep of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa penicillin antibiotic ena hantle kamoo e hlalositsoeng holabel — qeta thuto e ngotsoeng leha u ikutloa u ntse u le betere.",
      "Keletso ea phenoxymethylpenicillin hangata e kenyelletsa nako ea mpeng e se nang letho lihlahisweng tse ling — netefatsa holabel. Materia ha e iqape tekanyo, nako, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka histori ea allergy ea penicillin le li-antibiotic tse ling.",
      "Tlaleha letšollo le matla, ho hlatsa ho tsoelang pele, kapa lekhopho le lecha kapele ho e-na le ho emela thuto e qete.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana lekhopho le matla le lihlabana, ho ruruha ha sefahleho, ho honotha, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le penicillin antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gqiba ikhosi enikiweyo nokuba uziva ungcono.",
      "Iingcebiso ze-phenoxymethylpenicillin zihlala zibandakanya ixesha lesisu esingenanto kwezinye iimveliso — qinisekisa kwileyibhile. I-Materia ayiyiqiqi idosi, ixesha, okanye ubude bekhosi.",
      "Xelela usokhemisti ngembali ye-allergy ye-penicillin nawo onke amanye ama-antibiotic.",
      "Xela urhudo olunzima, ukuhlanza okuqhubekayo, okanye irhashalala entsha kwangoko kunokulinda ikhosi igqitywe.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana irhashalala enzima namaqhuma, ukudumba kobuso, ukubhobha, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-citalopram": five(
    [
      "Take this SSRI antidepressant exactly as directed on your labelled product — benefit is often gradual; do not stop suddenly.",
      "Report worsening mood or suicidal thoughts early, including after clinician dose changes — Materia does not invent a dose or taper schedule.",
      "Tell your pharmacist about other serotonergic medicines, heart rhythm history, and alcohol use.",
      "Citalopram counselling commonly includes interaction and heart-rhythm checks that belong with the labelled product and clinician — do not invent an interaction list.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you have self-harm thoughts, severe agitation, fever with muscle rigidity, fainting, or trouble breathing — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le SSRI antidepressant njengoba kubhalwe kumkhiqizo onelebula — inzuzo ivame ukuba kancane; ungayeki ngokuzumayo.",
      "Bika ukwehla kwemizwa noma imicabango yokuzibulala ngokushesha, kuhlanganise ngemva kokushintsha umthamo kudokotela — i-Materia ayiqambi umthamo noma uhlelo lokwehlisa.",
      "Tshela umkhiqizi ngamanye amaphilisi e-serotonin, umlando wesivinini senhliziyo, nokusebenzisa utshwala.",
      "Ukwelulekwa kwe-citalopram kuvame ukufaka ukuhlola ukuxhumana nesivinini senhliziyo okungokomkhiqizo onelebula nodokotela — ungayiqiqi uhlu lokuxhumana.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma unemicabango yokuzilimaza, ukuphaphazeka okukhulu, umkhuhlane nokuginya kwemisipha, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Neem hierdie SSRI-antidepressant soos op die geëtiketteerde produk aangedui — voordeel is dikwels geleidelik; moenie skielik stop nie.",
      "Rapporteer verergerende bui of selfmoordgedagtes vroeg, insluitend ná klinikus-dosisveranderinge — Materia versin nie ’n dosis of afbouskedule nie.",
      "Sê vir jou apteker van ander serotonergiese medisyne, hartritmegeskiedenis, en alkoholgebruik.",
      "Citalopram-berading sluit dikwels interaksie- en hartritmekontroles in wat by die geëtiketteerde produk en klinikus hoort — moenie ’n interaksielys versin nie.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy selfskade-gedagtes, ernstige agitasie, koors met spierstijfheid, floute of asemhalingsprobleme het — soek dadelik noodhulp.",
    ],
    [
      "Sebelisa SSRI antidepressant ena hantle kamoo e hlalositsoeng holabel — molemo hangata o tla butle; se ke oa emisa ka potlako.",
      "Tlaleha maikutlo a mabe kapa menahano ea ho ipolaea kapele, ho kenyeletsoa ka mor'a liphetoho tsa tekanyo tsa ngaka — Materia ha e iqape tekanyo kapa moralo oa ho fokotsa.",
      "Bolella rakhemisi ka meriana e meng ea serotonin, histori ea morethetho oa pelo, le tšebeliso ea joala.",
      "Keletso ea citalopram hangata e kenyelletsa litlhahlobo tsa ho sebelisana le morethetho oa pelo tsa holabel le ngaka — se ke oa iqapa lenane la ho sebelisana.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u na le menahano ea ho intša kotsi, ho ferekana ho matla, feberu le ho thatafala ha mesifa, ho akheha, kapa ho hema thata — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "Sebenzisa le SSRI antidepressant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — inzuzo ihlala ibonakala kancinci; sukuyeki ngokungxamisekileyo.",
      "Xela ukwehla kwemvakalelo okanye iingcinga zokuzibulala kwangoko, kuquka emva kotshintsho lwedosi lugqirha — i-Materia ayiyiqiqi idosi okanye ishedyuli yokunciphisa.",
      "Xelela usokhemisti ngamanye amayeza e-serotonin, imbali yesingqisho sentliziyo, nokusebenzisa utywala.",
      "Iingcebiso ze-citalopram zihlala zibandakanya ukujonga ukusebenzelana nesingqisho sentliziyo okukuleyibhile nogqirha — sukuyiqqa uluhlu lokusebenzelana.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba uneengcinga zokuzilimaza, ukuphaphazeka okunzima, umkhuhlane nokuginya kwemisipha, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-venlafaxine": five(
    [
      "Take this SNRI antidepressant exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Venlafaxine counselling commonly includes blood-pressure monitoring discussions and withdrawal symptoms if stopped abruptly. Materia does not invent a dose, BP target, or taper schedule.",
      "Report worsening mood or suicidal thoughts early, including after clinician dose changes.",
      "Tell your pharmacist about other serotonergic medicines, blood-pressure medicines, and alcohol use.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you have self-harm thoughts, severe agitation, fever with muscle rigidity, chest pain, or trouble breathing — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le SNRI antidepressant njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-venlafaxine kuvame ukufaka izingxoxo zokuqapha umfutho wegazi nezimpawu zokuyeka uma kuyekwa ngokuzumayo. I-Materia ayiqambi umthamo, umgomo womfutho wegazi, noma uhlelo lokwehlisa.",
      "Bika ukwehla kwemizwa noma imicabango yokuzibulala ngokushesha, kuhlanganise ngemva kokushintsha umthamo kudokotela.",
      "Tshela umkhiqizi ngamanye amaphilisi e-serotonin, amaphilisi omfutho wegazi, nokusebenzisa utshwala.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma unemicabango yokuzilimaza, ukuphaphazeka okukhulu, umkhuhlane nokuginya kwemisipha, ubuhlungu besifuba, noma ukuphefumula kanzima — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Neem hierdie SNRI-antidepressant soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Venlafaksien-berading sluit dikwels bloeddrukmonitering-besprekings en onttrekkingsimptome as skielik gestop word in. Materia versin nie ’n dosis, BP-teiken of afbouskedule nie.",
      "Rapporteer verergerende bui of selfmoordgedagtes vroeg, insluitend ná klinikus-dosisveranderinge.",
      "Sê vir jou apteker van ander serotonergiese medisyne, bloeddrukmedisyne, en alkoholgebruik.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy selfskade-gedagtes, ernstige agitasie, koors met spierstijfheid, borspyn of asemhalingsprobleme het — soek dadelik noodhulp.",
    ],
    [
      "Sebelisa SNRI antidepressant ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea venlafaxine hangata e kenyelletsa lipuisano tsa ho hlokomela khatello ea mali le matšoao a ho tlohela haeba ho emiswa ka potlako. Materia ha e iqape tekanyo, sepheo sa BP, kapa moralo oa ho fokotsa.",
      "Tlaleha maikutlo a mabe kapa menahano ea ho ipolaea kapele, ho kenyeletsoa ka mor'a liphetoho tsa tekanyo tsa ngaka.",
      "Bolella rakhemisi ka meriana e meng ea serotonin, meriana ea khatello ea mali, le tšebeliso ea joala.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u na le menahano ea ho intša kotsi, ho ferekana ho matla, feberu le ho thatafala ha mesifa, bohloko ba sefuba, kapa ho hema thata — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "Sebenzisa le SNRI antidepressant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-venlafaxine zihlala zibandakanya iingxoxo zokuqapha uxinzeleko lwegazi neempawu zokuyeka ukuba kuyekwa ngequbuliso. I-Materia ayiyiqiqi idosi, usukelo lwe-BP, okanye ishedyuli yokunciphisa.",
      "Xela ukwehla kwemvakalelo okanye iingcinga zokuzibulala kwangoko, kuquka emva kotshintsho lwedosi lugqirha.",
      "Xelela usokhemisti ngamanye amayeza e-serotonin, amayeza oxinzeleko lwegazi, nokusebenzisa utywala.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba uneengcinga zokuzilimaza, ukuphaphazeka okunzima, umkhuhlane nokuginya kwemisipha, iintlungu zesifuba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-diazepam": five(
    [
      "Take this benzodiazepine exactly as directed on your labelled product — short courses are common counselling; do not increase on your own.",
      "Diazepam counselling commonly includes drowsiness, falls risk, and not combining with alcohol or other sedatives unless your clinician agrees. Materia does not invent a dose or duration.",
      "Tell your pharmacist about breathing problems, sleep apnoea, other opioids or sedatives, and pregnancy plans.",
      "Do not stop suddenly after regular use without your clinician — withdrawal discussions belong with them.",
      "Avoid driving or machinery until you know how you respond — confirm against the labelled product.",
      "If breathing becomes slow or shallow, you cannot be woken easily, or lips turn blue — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le benzodiazepine njengoba kubhalwe kumkhiqizo onelebula — izinkambo ezimfushane zivame ukufundiswa; ungakhuphuli wedwa.",
      "Ukwelulekwa kwe-diazepam kuvame ukufaka ukozela, ingozi yokuwela, nokungahlanganisi notshwala noma amanye ama-sedative ngaphandle kokuvuma kukadokotela. I-Materia ayiqambi umthamo noma ubude.",
      "Tshela umkhiqizi ngezinkinga zokuphefumula, i-sleep apnoea, amanye ama-opioid noma ama-sedative, nezinhlelo zokukhulelwa.",
      "Ungayeki ngokuzumayo ngemva kokusebenzisa njalo ngaphandle kwedokotela — izingxoxo zokuyeka zingabo.",
      "Gwema ukushayela noma imishini uze wazi ukuthi usabela kanjani — qinisekisa kumkhiqizo onelebula.",
      "Uma ukuphefumula kuba kancane noma kungenzi kahle, ungavuswa kalula, noma izindebe ziba hlaza — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Neem hierdie bensodiasepien soos op die geëtiketteerde produk aangedui — kort kuursoorsigte is algemene berading; moenie self verhoog nie.",
      "Diazepam-berading sluit dikwels slaperigheid, valrisiko, en nie kombineer met alkohol of ander sederende middels in tensy jou klinikus saamstem. Materia versin nie ’n dosis of duur nie.",
      "Sê vir jou apteker van asemhalingsprobleme, slaapapnee, ander opioïede of sederende middels, en swangerskapplanne.",
      "Moenie skielik stop ná gereelde gebruik sonder jou klinikus nie — onttrekkingsbesprekings hoort by hulle.",
      "Vermy bestuur of masjinerie totdat jy weet hoe jy reageer — bevestig teen die geëtiketteerde produk.",
      "As asemhaling stadig of vlak word, jy nie maklik wakker gemaak kan word nie, of lippe blou word — soek dadelik noodhulp.",
    ],
    [
      "Sebelisa benzodiazepine ena hantle kamoo e hlalositsoeng holabel — lithuto tse khutšoane ke keletso e tloaelehileng; se ke oa e nyolla u le mong.",
      "Keletso ea diazepam hangata e kenyelletsa ho otsela, kotsi ea ho oa, le ho se e kopanye le joala kapa li-sedative tse ling ntle le tumellano ea ngaka. Materia ha e iqape tekanyo kapa bolelele.",
      "Bolella rakhemisi ka mathata a ho hema, sleep apnoea, li-opioid kapa li-sedative tse ling, le merero ea ho ima.",
      "Se ke oa emisa ka potlako ka mor'a tšebeliso e tloaelehileng ntle le ngaka — lipuisano tsa ho tlohela ke tsa bona.",
      "Qoba ho khanna kapa mechini ho fihlela u tseba karabelo ea hau — netefatsa holabel.",
      "Haeba ho hema ho ba butle kapa ho sa tebe, u sitoa ho tsohoa habonolo, kapa melomo e fetoha boputsoa — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "Sebenzisa le benzodiazepine ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iikhosi ezimfutshane zihlala zifundiswa; sukunyusa wedwa.",
      "Iingcebiso ze-diazepam zihlala zibandakanya ukozela, umngcipheko wokuwawa, nokungadibanisi notywala okanye ezinye ii-sedative ngaphandle kokuvuma kugqirha. I-Materia ayiyiqiqi idosi okanye ubude.",
      "Xelela usokhemisti ngeengxaki zokuphefumla, i-sleep apnoea, ezinye ii-opioid okanye ii-sedative, nezicwangciso zokukhulelwa.",
      "Sukuyeki ngokungxamisekileyo emva kokusebenzisa rhoqo ngaphandle kogqirha — iingxoxo zokuyeka zezabo.",
      "Pepa ukuqhuba okanye umatshini de wazi indlela osabela ngayo — qinisekisa kwileyibhile.",
      "Ukuba ukuphefumla kuba kancinci okanye kunganzulu, awukwazi ukuvuswa lula, okanye imilebe iba luhlaza — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-lithium": five(
    [
      "Take this mood stabiliser exactly as directed on your labelled product — keep fluid intake reasonably consistent as your clinician advises.",
      "Lithium counselling commonly includes level monitoring and salt/fluid change watch — report diarrhoea, vomiting, heavy sweating, or new tremor early. Materia does not invent a dose or lithium level target.",
      "Tell your pharmacist about kidney or thyroid history, NSAIDs, diuretics, and ALL other medicines — interaction checks are product-specific.",
      "Do not stop suddenly without your clinician — mood-relapse discussions belong with them.",
      "Ask how illness with dehydration should be handled on your care plan — do not invent a fluid schedule.",
      "If you get severe tremor, confusion, seizures, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le mood stabiliser njengoba kubhalwe kumkhiqizo onelebula — gcina ukuphuza uketshezi kulingene njengoba udokotela ecebisa.",
      "Ukwelulekwa kwe-lithium kuvame ukufaka ukuqapha ama-level nokugada usawoti/uketshezi — bika ukuhuda, ukuhlanza, ukujuluka kakhulu, noma ukuthuthumela okusha ngokushesha. I-Materia ayiqambi umthamo noma umgomo weleveli ye-lithium.",
      "Tshela umkhiqizi ngomlando wezintso noma i-thyroid, ama-NSAID, ama-diuretic, NAWO WONKE amanye amaphilisi — ukuhlola ukuxhumana kuncike kumkhiqizo.",
      "Ungayeki ngokuzumayo ngaphandle kwedokotela — izingxoxo zokubuyela kwemizwa zingabo.",
      "Buza ukuthi ukugula nokoma kufanele kuphathwe kanjani ohlelweni lwakho — ungayiqiqi uhlelo loketshezi.",
      "Uma uthola ukuthuthumela okukhulu, ukudideka, ukuxhuzula, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie bui-stabiliseerder soos op die geëtiketteerde produk aangedui — hou vloeistofinname redelik konsekwent soos jou klinikus adviseer.",
      "Litium-berading sluit dikwels vlakmonitering en sout/vloeistof-veranderingwaaksaamheid in — rapporteer diarree, braking, swaar sweet, of nuwe bewing vroeg. Materia versin nie ’n dosis of litiumvlakteiken nie.",
      "Sê vir jou apteker van nier- of skildkliergeskiedenis, NSAIDs, diuretika, en ALLE ander medisyne — interaksiekontroles is produkspesifiek.",
      "Moenie skielik stop sonder jou klinikus nie — terugvalbesprekings hoort by hulle.",
      "Vra hoe siekte met dehidrasie op jou sorgplan hanteer moet word — moenie ’n vloeistofskedule versin nie.",
      "As jy ernstige bewing, verwarring, stuiptrekkings, ineenstorting of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa mood stabiliser ena hantle kamoo e hlalositsoeng holabel — boloka ho noa mokelikeli ho tsitsitse kamoo ngaka e eletsang.",
      "Keletso ea lithium hangata e kenyelletsa ho hlokomela maemo le ho hlokomela liphetoho tsa letsoai/mokelikeli — tlaleha letšollo, ho hlatsa, ho fufuleloa ho matla, kapa ho thothomela ho hocha kapele. Materia ha e iqape tekanyo kapa sepheo sa level ea lithium.",
      "Bolella rakhemisi ka histori ea liphio kapa thyroid, li-NSAID, li-diuretic, le MERIANA EOHLE e meng — litlhahlobo tsa ho sebelisana li ipapisitse le sehlahiswa.",
      "Se ke oa emisa ka potlako ntle le ngaka — lipuisano tsa ho khutlela ha maikutlo ke tsa bona.",
      "Botsa hore ho kula ka ho oma ho lokela ho tšoaroa joang moralong oa hau — se ke oa iqapa kemiso ea mokelikeli.",
      "Haeba u fumana ho thothomela ho matla, ho ferekana, ho thothomela ha 'mele, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le mood stabiliser ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gcina ukusela ulwelo kungaguquguquki njengoko ugqirha ecebisa.",
      "Iingcebiso ze-lithium zihlala zibandakanya ukuqapha iilevel nokugada utshintsho lwetyuwa/ulwelo — xela urhudo, ukuhlanza, ukubila kakhulu, okanye ukungcangcazela okutsha kwangoko. I-Materia ayiyiqiqi idosi okanye usukelo lweleveli ye-lithium.",
      "Xelela usokhemisti ngembali yezintso okanye i-thyroid, ama-NSAID, ama-diuretic, NAWO ONKE amanye amayeza — ukujonga ukusebenzelana kuxhomekeke kwimveliso.",
      "Sukuyeki ngokungxamisekileyo ngaphandle kogqirha — iingxoxo zokubuyela kwemvakalelo zezabo.",
      "Buza indlela ukugula nokoma ekufanele kuphathwe ngayo kwisicwangciso sakho — sukuyiqqa ishedyuli yolwelo.",
      "Ukuba ufumana ukungcangcazela okunzima, ukudideka, ukuxhuzula, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-lamotrigine": five(
    [
      "Take this antiepileptic / mood-stabiliser exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Lamotrigine counselling commonly includes rash watch: seek urgent review for any new widespread rash, blistering, or mouth sores. Materia does not invent a dose or titration schedule.",
      "Tell your pharmacist about pregnancy plans, hormonal contraceptives, and ALL other medicines — interaction checks are product-specific.",
      "Report fever with rash, swollen glands, or unexplained bruising early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours or a catch-up plan.",
      "If you get blistering rash with fever, peeling skin, yellow eyes, or prolonged seizures — seek emergency care.",
    ],
    [
      "Sebenzisa le antiepileptic / mood-stabiliser njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-lamotrigine kuvame ukufaka ukugada ukuqubuka: funa ukubuyekezwa okuphuthumayo kunoma yikuphi ukuqubuka okusha okusabalele, amaqhubu, noma izilonda zomlomo. I-Materia ayiqambi umthamo noma uhlelo lokukhuphula.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, ama-contraceptive e-hormone, NAWO WONKE amanye amaphilisi — ukuhlola ukuxhumana kuncike kumkhiqizo.",
      "Bika umkhuhlane nokuqubuka, izindlala ezivuvukile, noma amabala aluhlaza angachaziwe ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa noma uhlelo lokubuyisela.",
      "Uma uthola ukuqubuka kwamaqhubu nomkhuhlane, isikhumba esihluba, amehlo aphuzi, noma ukuxhuzula okude — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antiepileptikum / bui-stabiliseerder soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Lamotrigien-berading sluit dikwels uitslagwaaksaamheid in: soek dringende hersiening vir enige nuwe wydverspreide uitslag, blase of mondsere. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Sê vir jou apteker van swangerskapplanne, hormonale voorbehoedmiddels, en ALLE ander medisyne — interaksiekontroles is produkspesifiek.",
      "Rapporteer koors met uitslag, geswelde kliere, of onverklaarde kneusings vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure of ’n inhaalplan versin nie.",
      "As jy blaasuitslag met koors, skilferende vel, geel oë of langdurige stuiptrekkings kry — soek noodhulp.",
    ],
    [
      "Sebelisa antiepileptic / mood-stabiliser ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea lamotrigine hangata e kenyelletsa ho hlokomela lekhopho: batla tlhahlobo e potlakileng bakeng sa lekhopho lefe kapa lefe le lecha le atileng, lihlabana, kapa liso tsa molomo. Materia ha e iqape tekanyo kapa moralo oa ho nyolla.",
      "Bolella rakhemisi ka merero ea ho ima, li-contraceptive tsa hormone, le MERIANA EOHLE e meng — litlhahlobo tsa ho sebelisana li ipapisitse le sehlahiswa.",
      "Tlaleha feberu le lekhopho, litšoelesa tse ruruhileng, kapa matheba a sootho a sa hlaloseng kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola kapa moralo oa ho tsosolosa.",
      "Haeba u fumana lekhopho la lihlabana le feberu, letlalo le hlobohang, mahlo a mosehla, kapa ho thothomela ho telele — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antiepileptic / mood-stabiliser ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-lamotrigine zihlala zibandakanya ukugada irhashalala: funa ukujongwa okungxamisekileyo kuyo nayiphi irhashalala entsha esasazekileyo, amaqhuma, okanye izilonda zomlomo. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyusa.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, ama-contraceptive e-hormone, NAWO ONKE amanye amayeza — ukujonga ukusebenzelana kuxhomekeke kwimveliso.",
      "Xela umkhuhlane nerhashalala, iindlala ezidumbileyo, okanye amabala aluhlaza angachazwanga kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula okanye isicwangciso sokubuyisela.",
      "Ukuba ufumana irhashalala yamaqhuma nomkhuhlane, ulusu olutyhutyha, amehlo atyheli, okanye ukuxhuzula okude — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-isotretinoin": five(
    [
      "Take this oral retinoid exactly as directed on your labelled product — pregnancy prevention is non-negotiable counselling while on therapy and as the label directs afterward.",
      "Isotretinoin counselling commonly includes dryness of lips/skin/eyes and mood change watch — report low mood or self-harm thoughts early. Materia does not invent a dose or pregnancy-test schedule.",
      "Tell your pharmacist about pregnancy plans, all other medicines (including vitamin A products), and planned cosmetic procedures.",
      "Do not share this medicine — confirm storage and return advice against the labelled product.",
      "Ask about sun sensitivity and lip-care teaching on the labelled product — do not invent a personal regimen.",
      "If you get severe headache with vision changes, severe abdominal pain, yellow eyes, or thoughts of self-harm — seek emergency or urgent care.",
    ],
    [
      "Sebenzisa le oral retinoid njengoba kubhalwe kumkhiqizo onelebula — ukuvimbela ukukhulelwa akuphikiswa ngenkathi unelapho nanjengoba ilebula iqondisa ngemva kwalokho.",
      "Ukwelulekwa kwe-isotretinoin kuvame ukufaka ukoma kwezindebe/isikhumba/amehlo nokugada ukushintsha kwemizwa — bika imizwa ephansi noma imicabango yokuzilimaza ngokushesha. I-Materia ayiqambi umthamo noma uhlelo lokuhlolwa kokukhulelwa.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, wonke amanye amaphilisi (kuhlanganise imikhiqizo ye-vitamin A), nezinqubo zokuhlobisa ezihleliwe.",
      "Ungabelani ngaleli philisi — qinisekisa ukugcina nokubuyisa kumkhiqizo onelebula.",
      "Buza ngokuzwela ilanga nokunakekela izindebe kumkhiqizo onelebula — ungayiqiqi uhlelo lomuntu siqu.",
      "Uma uthola ikhanda elibuhlungu kakhulu nokushintsha kokubona, ubuhlungu besisu obukhulu, amehlo aphuzi, noma imicabango yokuzilimaza — funa usizo oluphuthumayo noma olusheshayo.",
    ],
    [
      "Neem hierdie orale retinoïed soos op die geëtiketteerde produk aangedui — swangerskapvoorkoming is nie-onderhandelbare berading terwyl jy op terapie is en soos die etiket daarna rig.",
      "Isotretinoïen-berading sluit dikwels droogheid van lippe/vel/oë en bui-veranderingwaaksaamheid in — rapporteer lae bui of selfskade-gedagtes vroeg. Materia versin nie ’n dosis of swangerskaptoets-skedule nie.",
      "Sê vir jou apteker van swangerskapplanne, alle ander medisyne (insluitend vitamien A-produkte), en beplande kosmetiese prosedures.",
      "Moenie hierdie medisyne deel nie — bevestig berging en terugbesorgingsadvies teen die geëtiketteerde produk.",
      "Vra oor sonsensitiwiteit en lipversorgingsonderrig op die geëtiketteerde produk — moenie ’n persoonlike regime versin nie.",
      "As jy ernstige hoofpyn met sigveranderinge, ernstige buikpyn, geel oë of selfskade-gedagtes kry — soek nood- of dringende sorg.",
    ],
    [
      "Sebelisa oral retinoid ena hantle kamoo e hlalositsoeng holabel — thibelo ea ho ima ha e buisanoe ha u le kalafo le kamoo leibole e laelang ka mor'a moo.",
      "Keletso ea isotretinoin hangata e kenyelletsa ho oma ha melomo/letlalo/mahlo le ho hlokomela liphetoho tsa maikutlo — tlaleha maikutlo a tlase kapa menahano ea ho intša kotsi kapele. Materia ha e iqape tekanyo kapa kemiso ea tlhahlobo ea boimana.",
      "Bolella rakhemisi ka merero ea ho ima, meriana eohle e meng (ho kenyeletsoa lihlahiswa tsa vitamin A), le mekhoa ea botle e reriloeng.",
      "Se ke oa arolelana moriana ona — netefatsa keletso ea ho boloka le ho khutlisa holabel.",
      "Botsa ka ho utloa letsatsi le tlhokomelo ea melomo holabel — se ke oa iqapa moralo oa motho ka mong.",
      "Haeba u fumana hlooho e bohloko haholo le liphetoho tsa pono, bohloko ba mpeng bo matla, mahlo a mosehla, kapa menahano ea ho intša kotsi — batla thuso ea tšohanyetso kapa e potlakileng.",
    ],
    [
      "Sebenzisa le oral retinoid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukuthintela ukukhulelwa akuxoxwa ngelixa ukunyango nanjengoko ileyibhile ikhokela emva koko.",
      "Iingcebiso ze-isotretinoin zihlala zibandakanya ukoma kwemilebe/ulusu/amehlo nokugada utshintsho lwemvakalelo — xela imvakalelo ephantsi okanye iingcinga zokuzilimaza kwangoko. I-Materia ayiyiqiqi idosi okanye ishedyuli yokuhlolwa kokukhulelwa.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, onke amanye amayeza (kuquka iimveliso ze-vitamin A), neenkqubo zobuhle ezicetyiweyo.",
      "Sukwabelana ngeli yeza — qinisekisa icebiso yokugcina nokubuyisela kwileyibhile.",
      "Buza ngokuziva ilanga nokunakekela imilebe kwileyibhile — sukuyiqqa irejimeni yakho.",
      "Ukuba ufumana intloko ebuhlungu kakhulu notshintsho lombono, iintlungu zesisu ezinzima, amehlo atyheli, okanye iingcinga zokuzilimaza — funa uncedo olungxamisekileyo okanye olukhawulezayo.",
    ],
  ),

  "mol-fluticasone": five(
    [
      "Use this inhaled corticosteroid (ICS) exactly as directed on your labelled product — it is a controller, not a sudden-relief reliever.",
      "Fluticasone counselling commonly includes rinsing the mouth after inhalation and correct inhaler technique with your pharmacist. Materia does not invent a puff count or dose.",
      "Tell your pharmacist about oral thrush symptoms, hoarseness, and all other inhalers you use.",
      "Keep your reliever inhaler plan as your clinician directed — do not substitute this ICS for sudden shortness of breath.",
      "Report worsening breathlessness, fever with productive cough, or white patches in the mouth early.",
      "If you get sudden severe breathing difficulty, facial swelling, or chest pain — seek emergency care.",
    ],
    [
      "Sebenzisa le inhaled corticosteroid (ICS) njengoba kubhalwe kumkhiqizo onelebula — iyilawuli, hhayi i-reliever yesikhathi esizumayo.",
      "Ukwelulekwa kwe-fluticasone kuvame ukufaka ukugeza umlomo ngemva kokuhogela nendlela efanele ye-inhaler nomkhiqizi. I-Materia ayiqambi inani lama-puff noma umthamo.",
      "Tshela umkhiqizi ngezimpawu ze-thrush yomlomo, ukuhohlela, nawo wonke amanye ama-inhaler.",
      "Gcina uhlelo lwe-reliever inhaler njengoba udokotela ekuqondile — ungayikhululi le ICS ngenxa yokuphefumula kancane okuzumayo.",
      "Bika ukuphefumula kabi okuya ngokuba kubi, umkhuhlane nokukhwehlela okunephlegm, noma amabala amhlophe emlonyeni ngokushesha.",
      "Uma uthola ukuphefumula kanzima kakhulu ngokuzumayo, ukuvuvuka kobuso, noma ubuhlungu besifuba — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie geïnhaleerde kortikosteroïed (ICS) soos op die geëtiketteerde produk aangedui — dit is ’n beheerder, nie ’n skielike-verligtingsmiddel nie.",
      "Flutikasoon-berading sluit dikwels mondspoel ná inhalasie en korrekte inhalertegniek met jou apteker in. Materia versin nie ’n puf-telling of dosis nie.",
      "Sê vir jou apteker van mondsproei-simptome, heesheid, en alle ander inhalers wat jy gebruik.",
      "Hou jou verligter-inhalerplan soos jou klinikus gerig het — moenie hierdie ICS vir skielike kortasem vervang nie.",
      "Rapporteer verergerende asemnood, koors met produktiewe hoes, of wit kolle in die mond vroeg.",
      "As jy skielike ernstige asemhalingsmoeilikheid, gesigswelling of borspyn kry — soek noodhulp.",
    ],
    [
      "Sebelisa inhaled corticosteroid (ICS) ena hantle kamoo e hlalositsoeng holabel — ke controller, eseng reliever ea tšohanyetso.",
      "Keletso ea fluticasone hangata e kenyelletsa ho hlatsa molomo ka mor'a ho hema le mokhoa o nepahetseng oa inhaler le rakhemisi. Materia ha e iqape palo ea puff kapa tekanyo.",
      "Bolella rakhemisi ka matšoao a thrush ea molomo, ho hoesetsa, le li-inhaler tsohle tse ling.",
      "Boloka moralo oa reliever inhaler kamoo ngaka e u laetseng — se ke oa nkela ICS ena sebaka sa ho hema butle ka tšohanyetso.",
      "Tlaleha ho hema thata ho mpefalang, feberu le ho khohlela ka phlegm, kapa matheba a sootho a tšoeu ka hanong kapele.",
      "Haeba u fumana bothata bo matla ba ho hema ka tšohanyetso, ho ruruha ha sefahleho, kapa bohloko ba sefuba — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le inhaled corticosteroid (ICS) ngokuchanekileyo njengoko kubhaliwe kwileyibhile — yilawuli, hayi i-reliever yexesha elingxamisekileyo.",
      "Iingcebiso ze-fluticasone zihlala zibandakanya ukuhlambela umlomo emva kokufutha nendlela efanelekileyo ye-inhaler nosokhemisti. I-Materia ayiyiqiqi inani lama-puff okanye idosi.",
      "Xelela usokhemisti ngeempawu ze-thrush yomlomo, ukuhohlela, nazo zonke ezinye ii-inhaler.",
      "Gcina isicwangciso se-reliever inhaler njengoko ugqirha ekulathile — sukutshintsha le ICS ngokuphefumla kancinci ngequbuliso.",
      "Xela ukuphefumla nzima okuya ngokuba mbi, umkhuhlane nokukhohlela okunephlegm, okanye amabala amhlophe emlonyeni kwangoko.",
      "Ukuba ufumana uxinzelelo lokuphefumla olunzima ngequbuliso, ukudumba kobuso, okanye iintlungu zesifuba — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-metoclopramide": five(
    [
      "Take this antiemetic / prokinetic exactly as directed on your labelled product — short courses are common counselling.",
      "Metoclopramide counselling commonly includes movement side-effect watch (restlessness, tremor, muscle stiffness) — report these early. Materia does not invent a dose or maximum duration.",
      "Tell your pharmacist about Parkinson’s disease history, other antipsychotics or antiemetics, and all medicines you use.",
      "Avoid alcohol and other sedatives unless your clinician agrees — confirm against the labelled product.",
      "Ask how this fits with migraine or chemotherapy plans on your care list — do not invent a personal schedule.",
      "If you get severe muscle spasms of the face/neck, high fever with rigidity, fainting, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antiemetic / prokinetic njengoba kubhalwe kumkhiqizo onelebula — izinkambo ezimfushane zivame ukufundiswa.",
      "Ukwelulekwa kwe-metoclopramide kuvame ukufaka ukugada izimpawu zokunyakaza (ukungeneliseki, ukuthuthumela, ukuginya kwemisipha) — bika lezi ngokushesha. I-Materia ayiqambi umthamo noma ubude obuphezulu.",
      "Tshela umkhiqizi ngomlando we-Parkinson, amanye ama-antipsychotic noma ama-antiemetic, nawo wonke amaphilisi owasebenzisayo.",
      "Gwema utshwala namanye ama-sedative ngaphandle kokuvuma kukadokotela — qinisekisa kumkhiqizo onelebula.",
      "Buza ukuthi lokhu kuhambisana kanjani nezinhlelo ze-migraine noma i-chemotherapy ohlwini lwakho — ungayiqiqi uhlelo lomuntu siqu.",
      "Uma uthola ukuqaqamba kwemisipha kobuso/intamo okukhulu, umkhuhlane ophakeme nokuginya, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie anti-emetikum / prokinetikum soos op die geëtiketteerde produk aangedui — kort kuursoorsigte is algemene berading.",
      "Metoklopramied-berading sluit dikwels bewegingsneweeffek-waaksaamheid in (rusteloosheid, bewing, spierstijfheid) — rapporteer dit vroeg. Materia versin nie ’n dosis of maksimum duur nie.",
      "Sê vir jou apteker van Parkinson-siektegeskiedenis, ander antipsigotika of anti-emetika, en alle medisyne wat jy gebruik.",
      "Vermy alkohol en ander sederende middels tensy jou klinikus saamstem — bevestig teen die geëtiketteerde produk.",
      "Vra hoe dit by migraine- of chemoterapiesplanne op jou sorglys pas — moenie ’n persoonlike skedule versin nie.",
      "As jy ernstige spierspasmas van die gesig/nek, hoë koors met stijfheid, floute of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antiemetic / prokinetic ena hantle kamoo e hlalositsoeng holabel — lithuto tse khutšoane ke keletso e tloaelehileng.",
      "Keletso ea metoclopramide hangata e kenyelletsa ho hlokomela litla-morao tsa motsamao (ho hloka khutso, ho thothomela, ho thatafala ha mesifa) — tlaleha tsena kapele. Materia ha e iqape tekanyo kapa bolelele bo phahameng.",
      "Bolella rakhemisi ka histori ea Parkinson, li-antipsychotic kapa li-antiemetic tse ling, le meriana eohle eo u e sebelisang.",
      "Qoba joala le li-sedative tse ling ntle le tumellano ea ngaka — netefatsa holabel.",
      "Botsa hore sena se tšoana joang le merero ea migraine kapa chemotherapy lenaneng la hau — se ke oa iqapa kemiso ea motho ka mong.",
      "Haeba u fumana ho tsitsipa ha mesifa ha sefahleho/molala ho matla, feberu e phahameng le ho thatafala, ho akheha, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antiemetic / prokinetic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iikhosi ezimfutshane zihlala zifundiswa.",
      "Iingcebiso ze-metoclopramide zihlala zibandakanya ukugada iimpawu zentshukumo (ukungaphumli, ukungcangcazela, ukuginya kwemisipha) — xela ezi kwangoko. I-Materia ayiyiqiqi idosi okanye ubude obuphezulu.",
      "Xelela usokhemisti ngembali ye-Parkinson, amanye ama-antipsychotic okanye ama-antiemetic, nawo onke amayeza owasebenzisayo.",
      "Pepa utywala nezinye ii-sedative ngaphandle kokuvuma kugqirha — qinisekisa kwileyibhile.",
      "Buza indlela oku kuhambelana ngayo nezicwangciso ze-migraine okanye i-chemotherapy kuluhlu lwakho — sukuyiqqa ishedyuli yakho.",
      "Ukuba ufumana ukuqaqamba kwemisipha kobuso/intamo okunzima, umkhuhlane ophezulu nokuginya, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
