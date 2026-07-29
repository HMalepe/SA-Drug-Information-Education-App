/**
 * v130–v139 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V130_TO_V139: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-perindopril": five(
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

  "mol-sitagliptin": five(
    [
      "Take this DPP-4 inhibitor exactly as directed on your labelled product.",
      "Sitagliptin counselling commonly includes combining with your existing diabetes plan — do not invent a glucose target or meal clock. Materia does not invent a dose either.",
      "Tell your pharmacist about pancreatitis history, kidney history, and all other diabetes medicines you use.",
      "Report severe persistent abdominal pain radiating to the back, unexplained vomiting, or new blistering skin reactions early.",
      "Ask how illness, skipped meals, or new medicines may change your hypo risk discussions with your clinician.",
      "If you get severe abdominal pain with vomiting, yellow eyes, facial swelling, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le DPP-4 inhibitor njengoba kubhalwe kumkhiqizo onelebula.",
      "Ukwelulekwa kwe-sitagliptin kuvame ukufaka ukuhlanganiswa nohlelo lwakho lwesifo sikashukela — ungayiqiqi umgomo kashukela noma isikhathi sokudla. I-Materia ayiqambi nomthamo.",
      "Tshela umkhiqizi ngomlando we-pancreatitis, umlando wezintso, nawo wonke amanye amaphilisi esifo sikashukela.",
      "Bika ubuhlungu besisu obukhulu obuqhubekayo obuya emhlane, ukuhlanza okungachaziwe, noma ukuqubuka kwamaqhubu okusha ngokushesha.",
      "Buza ukuthi ukugula, ukulahlwa ukudla, noma amaphilisi amasha angashintsha kanjani izingxoxo zengozi ye-hypo nodokotela.",
      "Uma uthola ubuhlungu besisu obukhulu nokuhlanza, amehlo aphuzi, ukuvuvuka kobuso, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie DPP-4-inhibeerder soos op die geëtiketteerde produk aangedui.",
      "Sitagliptien-berading sluit dikwels in om by jou bestaande diabetesplan te pas — moenie ’n glukoseteiken of maaltydklok versin nie. Materia versin ook nie ’n dosis nie.",
      "Sê vir jou apteker van pankreatitis-geskiedenis, niergeskiedenis, en alle ander diabetesmedisyne wat jy gebruik.",
      "Rapporteer ernstige aanhoudende buikpyn wat na die rug uitstraal, onverklaarde braking, of nuwe blaaragtige velreaksies vroeg.",
      "Vra hoe siekte, oorgeslaande maaltye of nuwe medisyne jou hipo-risiko-besprekings met jou klinikus kan verander.",
      "As jy ernstige buikpyn met braking, geel oë, gesigswelling of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa DPP-4 inhibitor ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
      "Keletso ea sitagliptin hangata e kenyelletsa ho e kopanya le moralo oa hau oa diabetes — se ke oa iqapa sepheo sa tsoekere kapa nako ea lijo. Materia ha e iqape le tekanyo.",
      "Bolella rakhemisi ka histori ea pancreatitis, histori ea liphio, le meriana eohle e meng ea diabetes.",
      "Tlaleha bohloko ba mpeng bo matla bo tsoelang pele bo ea mokokotlong, ho hlatsa ho sa hlaloseng, kapa karabelo e ncha ea letlalo le lihlabana kapele.",
      "Botsa hore ho kula, ho tlola lijo, kapa meriana e mecha e ka fetola joang lipuisano tsa kotsi ea hypo le ngaka.",
      "Haeba u fumana bohloko ba mpeng bo matla le ho hlatsa, mahlo a mosehla, ho ruruha ha sefahleho, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le DPP-4 inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
      "Iingcebiso ze-sitagliptin zihlala zibandakanya ukudibanisa nesicwangciso sakho sesifo seswekile — sukuyiqqa usukelo lweswekile okanye ixesha lokutya. I-Materia ayiyiqiqi nedosi.",
      "Xelela usokhemisti ngembali ye-pancreatitis, imbali yezintso, nawo onke amanye amayeza esifo seswekile.",
      "Xela iintlungu zesisu ezinzima eziqhubekayo eziya emqolo, ukuhlanza okungachazwanga, okanye iimpawu ezintsha zesikhumba esineqhuma kwangoko.",
      "Buza indlela ukugula, ukuzitshiya izidlo, okanye amayeza amatsha anokutshintsha ngayo iingxoxo zomngcipheko we-hypo nogqirha.",
      "Ukuba ufumana iintlungu zesisu ezinzima nokuhlanza, amehlo atyheli, ukudumba kobuso, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-dapagliflozin": five(
    [
      "Take this SGLT2 inhibitor exactly as directed on your labelled product.",
      "SGLT2 counselling commonly includes genital hygiene, staying hydrated as your clinician advises, and reporting urinary burning or unusual thirst. Materia does not invent a dose or glucose target.",
      "Tell your pharmacist about kidney history, diuretics, low-carb illness plans, and all other diabetes medicines.",
      "Sick-day teaching belongs with your clinician — do not invent when to pause or restart; confirm against the labelled product and care plan.",
      "Watch for nausea, vomiting, abdominal pain, or unusual fatigue that could signal a metabolic emergency discussion.",
      "If you get severe abdominal pain with vomiting, trouble breathing, sudden dizziness, or signs of severe infection — seek emergency care.",
    ],
    [
      "Sebenzisa le SGLT2 inhibitor njengoba kubhalwe kumkhiqizo onelebula.",
      "Ukwelulekwa kwe-SGLT2 kuvame ukufaka ukuhlanzeka kwezitho zangasese, ukuhlala unamanzi njengoba udokotela ecebisa, nokubika ukusha komchamo noma ukoma okungajwayelekile. I-Materia ayiqambi umthamo noma umgomo kashukela.",
      "Tshela umkhiqizi ngomlando wezintso, ama-diuretic, izinhlelo zokugula ezine-carb ephansi, nawo wonke amanye amaphilisi esifo sikashukela.",
      "Ukufundiswa ngezinsuku zokugula kungodokotela — ungayiqiqi ukuthi uyeka noma uqala nini; qinisekisa kumkhiqizo onelebula nohlelo lokunakekelwa.",
      "Qaphela isicanucanu, ukuhlanza, ubuhlungu besisu, noma ukukhathala okungajwayelekile okungase kuhlose ingxoxo yesimo esiphuthumayo.",
      "Uma uthola ubuhlungu besisu obukhulu nokuhlanza, ukuphefumula kanzima, isiyezi esizumayo, noma izimpawu zokutheleleka okukhulu — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie SGLT2-inhibeerder soos op die geëtiketteerde produk aangedui.",
      "SGLT2-berading sluit dikwels genitale higiëne, hidrasie soos jou klinikus adviseer, en rapportering van brandende urine of ongewone dors in. Materia versin nie ’n dosis of glukoseteiken nie.",
      "Sê vir jou apteker van niergeskiedenis, diuretika, lae-koolhidraat siekteplanne, en alle ander diabetesmedisyne.",
      "Siektedag-onderrig hoort by jou klinikus — moenie versin wanneer om te pouseer of herbegin nie; bevestig teen die geëtiketteerde produk en sorgplan.",
      "Let op naarheid, braking, buikpyn of ongewone moegheid wat ’n metaboliese noodbespreking kan aandui.",
      "As jy ernstige buikpyn met braking, asemhalingsprobleme, skielike duiseligheid of tekens van ernstige infeksie kry — soek noodhulp.",
    ],
    [
      "Sebelisa SGLT2 inhibitor ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
      "Keletso ea SGLT2 hangata e kenyelletsa bohloeki ba litho tsa botona/bosali, ho lula u na le mokelikeli kamoo ngaka e eletsang, le ho tlaleha ho cha ha moroto kapa lenyora le sa tloaelehang. Materia ha e iqape tekanyo kapa sepheo sa tsoekere.",
      "Bolella rakhemisi ka histori ea liphio, li-diuretic, merero ea ho kula e nang le carb e tlase, le meriana eohle e meng ea diabetes.",
      "Thuto ea matsatsi a ho kula ke ea ngaka — se ke oa iqapa hore u emise kapa u qale neng; netefatsa holabel le moralo oa tlhokomelo.",
      "Hlokomela ho nyatsa, ho hlatsa, bohloko ba mpeng, kapa mokhathala o sa tloaelehang o ka bontšang puisano ea tšohanyetso ea metabolism.",
      "Haeba u fumana bohloko ba mpeng bo matla le ho hlatsa, ho hema thata, ho tsekela ka tšohanyetso, kapa matšoao a tšoaetso e matla — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le SGLT2 inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
      "Iingcebiso ze-SGLT2 zihlala zibandakanya ucoceko lwamalungu angasese, ukuhlala unamanzi njengoko ugqirha ecebisa, nokuxela ukutsha komchamo okanye ukoma okungaqhelekanga. I-Materia ayiyiqiqi idosi okanye usukelo lweswekile.",
      "Xelela usokhemisti ngembali yezintso, ama-diuretic, izicwangciso zokugula ezine-carb ephantsi, nawo onke amanye amayeza esifo seswekile.",
      "Ukufundiswa ngeentsuku zokugula kukugqirha — sukuyiqqa ukuba uyeka okanye uqala nini; qinisekisa kwileyibhile nakwicandelo lokhathalelo.",
      "Jonga isicanucanu, ukuhlanza, iintlungu zesisu, okanye ukudinwa okungaqhelekanga okunokubonisa ingxoxo yongxamiseko wemetabolism.",
      "Ukuba ufumana iintlungu zesisu ezinzima nokuhlanza, uxinzelelo lokuphefumla, isiyezi ngequbuliso, okanye iimpawu zosulelo olunzima — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-gabapentin": five(
    [
      "Take this neuropathic-pain / antiepileptic medicine exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Gabapentin counselling commonly includes drowsiness, dizziness, and caution with alcohol or other sedatives. Materia does not invent a dose or titration schedule.",
      "Tell your pharmacist about kidney history, all other pain or seizure medicines, and planned driving or machinery work until you know your response.",
      "Report new or worsening mood changes, confusion, swelling of the legs, or breathing that feels slower than usual.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you have self-harm thoughts, severe sedation that you cannot wake from easily, seizures that worsen, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le neuropathic-pain / antiepileptic medicine njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-gabapentin kuvame ukufaka ukozela, isiyezi, nokuqaphela utshwala noma amanye ama-sedative. I-Materia ayiqambi umthamo noma uhlelo lokukhuphula.",
      "Tshela umkhiqizi ngomlando wezintso, wonke amanye amaphilisi obuhlungu noma okuxhuzula, nokushayela noma imishini uze wazi ukuthi usabela kanjani.",
      "Bika ukushintsha kwemizwa okusha noma okubi, ukudideka, ukuvuvuka kwemilenze, noma ukuphefumula okuzwakala kuncane kunokujwayelekile.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma unemicabango yokuzilimaza, ukozela okukhulu ongavuswa kalula, ukuxhuzula okuba kubi, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie neuropatiese-pyn / antiepileptiese middel soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Gabapentien-berading sluit dikwels slaperigheid, duiseligheid en voorzichtigheid met alkohol of ander sederende middels in. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Sê vir jou apteker van niergeskiedenis, alle ander pyn- of aanvalsmedisyne, en beplande bestuur of masjineriewerk totdat jy jou reaksie ken.",
      "Rapporteer nuwe of verergerende bui-veranderinge, verwarring, been-swelling, of asemhaling wat stadiger as gewoonlik voel.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy selfskade-gedagtes, ernstige sedasie waaruit jy nie maklik wakker word nie, erger aanvalle, of asemhalingsprobleme het — soek noodhulp.",
    ],
    [
      "Sebelisa neuropathic-pain / antiepileptic medicine ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea gabapentin hangata e kenyelletsa ho otsela, ho tsekela, le tlhokomelo ka joala kapa li-sedative tse ling. Materia ha e iqape tekanyo kapa moralo oa ho nyolla.",
      "Bolella rakhemisi ka histori ea liphio, meriana eohle e meng ea bohloko kapa ho thothomela, le ho khanna kapa mechini ho fihlela u tseba karabelo ea hau.",
      "Tlaleha liphetoho tse ncha kapa tse mpe tsa maikutlo, ho ferekana, ho ruruha ha maoto, kapa ho hema ho utloahalang butle ho feta tloaelo.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u na le menahano ea ho intša kotsi, ho otsela ho matla hoo u ke keng ua tsohoa habonolo, ho thothomela ho mpefala, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le neuropathic-pain / antiepileptic medicine ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-gabapentin zihlala zibandakanya ukozela, isiyezi, nokulumkela utywala okanye ezinye ii-sedative. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyusa.",
      "Xelela usokhemisti ngembali yezintso, onke amanye amayeza eentlungu okanye ukuxhuzula, nokuqhuba okanye umatshini de wazi indlela osabela ngayo.",
      "Xela utshintsho lwemvakalelo olutsha okanye olubi, ukudideka, ukudumba kwemilenze, okanye ukuphefumla okuvakala kancinci kunesiqhelo.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba uneengcinga zokuzilimaza, ukozela okunzima ongenakuvuswa lula, ukuxhuzula okuba mbi, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-pregabalin": five(
    [
      "Take this neuropathic-pain / antiepileptic medicine exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Pregabalin counselling commonly includes drowsiness, dizziness, blurred vision, and weight or swelling changes. Materia does not invent a dose or titration schedule.",
      "Tell your pharmacist about other opioids, benzodiazepines, alcohol, and kidney history — sedative combinations raise breathing-risk discussions.",
      "Report new or worsening mood changes, confusion, severe constipation, or breathing that feels slower than usual.",
      "Ask how this medicine fits with your pain or seizure plan — do not invent spacing hours or a personal schedule.",
      "If you have self-harm thoughts, cannot be woken easily, have seizures that worsen, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le neuropathic-pain / antiepileptic medicine njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-pregabalin kuvame ukufaka ukozela, isiyezi, ukubona okufiphele, nokushintsha kwesisindo noma ukuvuvuka. I-Materia ayiqambi umthamo noma uhlelo lokukhuphula.",
      "Tshela umkhiqizi ngamanye ama-opioid, ama-benzodiazepine, utshwala, nomlando wezintso — ukuhlanganisa ama-sedative kukhulisa izingxoxo zengozi yokuphefumula.",
      "Bika ukushintsha kwemizwa okusha noma okubi, ukudideka, ukuqunjelwa okukhulu, noma ukuphefumula okuzwakala kuncane kunokujwayelekile.",
      "Buza ukuthi leli philisi lihambisana kanjani nohlelo lwakho lobuhlungu noma ukuxhuzula — ungayiqiqi amahora okuhlukanisa noma uhlelo lomuntu siqu.",
      "Uma unemicabango yokuzilimaza, ungavuswa kalula, uthola ukuxhuzula okuba kubi, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie neuropatiese-pyn / antiepileptiese middel soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Pregabalien-berading sluit dikwels slaperigheid, duiseligheid, dowwe sig, en gewig- of swellingveranderinge in. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Sê vir jou apteker van ander opioïede, bensodiasepiene, alkohol, en niergeskiedenis — sederende kombinasies verhoog asemhalingsrisiko-besprekings.",
      "Rapporteer nuwe of verergerende bui-veranderinge, verwarring, ernstige hardlywigheid, of asemhaling wat stadiger as gewoonlik voel.",
      "Vra hoe hierdie middel by jou pyn- of aanvalsplan pas — moenie skeidingsure of ’n persoonlike skedule versin nie.",
      "As jy selfskade-gedagtes het, nie maklik wakker gemaak kan word nie, erger aanvalle of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa neuropathic-pain / antiepileptic medicine ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea pregabalin hangata e kenyelletsa ho otsela, ho tsekela, pono e fifetseng, le liphetoho tsa boima kapa ho ruruha. Materia ha e iqape tekanyo kapa moralo oa ho nyolla.",
      "Bolella rakhemisi ka li-opioid tse ling, li-benzodiazepine, joala, le histori ea liphio — metsoako ea li-sedative e phahamisa lipuisano tsa kotsi ea ho hema.",
      "Tlaleha liphetoho tse ncha kapa tse mpe tsa maikutlo, ho ferekana, ho thatafala ha mala ho matla, kapa ho hema ho utloahalang butle ho feta tloaelo.",
      "Botsa hore moriana ona o tšoana joang le moralo oa hau oa bohloko kapa ho thothomela — se ke oa iqapa lihora tsa ho arola kapa kemiso ea motho ka mong.",
      "Haeba u na le menahano ea ho intša kotsi, u sitoa ho tsohoa habonolo, u fumana ho thothomela ho mpefala, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le neuropathic-pain / antiepileptic medicine ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-pregabalin zihlala zibandakanya ukozela, isiyezi, ukubona okufipheleyo, notshintsho lobunzima okanye ukudumba. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyusa.",
      "Xelela usokhemisti ngezinye ii-opioid, ii-benzodiazepine, utywala, nembali yezintso — ukudibanisa ii-sedative kuyanyusa iingxoxo zomngcipheko wokuphefumla.",
      "Xela utshintsho lwemvakalelo olutsha okanye olubi, ukudideka, ukuqunjelwa okunzima, okanye ukuphefumla okuvakala kancinci kunesiqhelo.",
      "Buza indlela eli yeza lihambelana ngayo nesicwangciso sakho seentlungu okanye ukuxhuzula — sukuyiqqa iiyure zokwahlula okanye ishedyuli yakho.",
      "Ukuba uneengcinga zokuzilimaza, awukwazi ukuvuswa lula, ufumana ukuxhuzula okuba mbi, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-colchicine": five(
    [
      "Take this gout anti-inflammatory exactly as directed on your labelled product — toxicity risk rises if more than labelled is taken.",
      "Colchicine counselling commonly includes diarrhoea, nausea, and stopping for severe gut symptoms until you speak to a clinician. Materia does not invent a dose or attack schedule.",
      "Tell your pharmacist about kidney or liver history and ALL other medicines — many interaction checks are product-specific.",
      "Report unusual muscle pain or weakness, severe vomiting, or black stools early.",
      "Ask how this fits with allopurinol or other gout medicines on your list — do not invent a personal combination plan.",
      "If you get severe diarrhoea with dehydration, muscle paralysis feelings, chest pain, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le gout anti-inflammatory njengoba kubhalwe kumkhiqizo onelebula — ingozi yokungeniswa kakhulu iyakhula uma uthatha okungaphezu kwelebula.",
      "Ukwelulekwa kwe-colchicine kuvame ukufaka ukuhuda, isicanucanu, nokuyeka uma izimpawu zesisu ziba zimbi uze ukhulume nodokotela. I-Materia ayiqambi umthamo noma uhlelo lokuhlasela.",
      "Tshela umkhiqizi ngomlando wezintso noma isibindi NAWO WONKE amanye amaphilisi — ukuhlola ukuxhumana okuningi kuncike kumkhiqizo.",
      "Bika ubuhlungu bemisipha noma ubuthakathaka obungajwayelekile, ukuhlanza okukhulu, noma indle emnyama ngokushesha.",
      "Buza ukuthi lokhu kuhambisana kanjani ne-allopurinol noma amanye amaphilisi e-gout ohlwini lwakho — ungayiqiqi uhlelo lomuntu siqu.",
      "Uma uthola ukuhuda okukhulu nokoma, ukuzwa sengathi imisipha ayisebenzi, ubuhlungu besifuba, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie jig-anti-inflammatoriese middel soos op die geëtiketteerde produk aangedui — toksisiteitsrisiko styg as meer as geëtiketteer geneem word.",
      "Kolchisien-berading sluit dikwels diarree, naarheid, en stop by ernstige maagsimptome in totdat jy met ’n klinikus praat. Materia versin nie ’n dosis of aanvalskedule nie.",
      "Sê vir jou apteker van nier- of lewergeskiedenis en ALLE ander medisyne — baie interaksiekontroles is produkspesifiek.",
      "Rapporteer ongewone spierpyn of swakheid, ernstige braking, of swart stoelgang vroeg.",
      "Vra hoe dit by allopurinol of ander jigmedisyne op jou lys pas — moenie ’n persoonlike kombinasieplan versin nie.",
      "As jy ernstige diarree met dehidrasie, spierverlammingsgevoelens, borspyn of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa gout anti-inflammatory ena hantle kamoo e hlalositsoeng holabel — kotsi ea toxicity e nyoloha haeba ho nkoa ho feta kamoo leibole e bolelang.",
      "Keletso ea colchicine hangata e kenyelletsa letšollo, ho nyatsa, le ho emisa bakeng sa matšoao a matla a mpeng ho fihlela u bua le ngaka. Materia ha e iqape tekanyo kapa kemiso ea tlhaselo.",
      "Bolella rakhemisi ka histori ea liphio kapa sebete le MERIANA EOHLE e meng — litlhahlobo tse ngata tsa ho sebelisana li ipapisitse le sehlahiswa.",
      "Tlaleha bohloko ba mesifa kapa bofokoli bo sa tloaelehang, ho hlatsa ho matla, kapa mantle a sootho kapele.",
      "Botsa hore sena se tšoana joang le allopurinol kapa meriana e meng ea gout lenaneng la hau — se ke oa iqapa moralo oa motho ka mong.",
      "Haeba u fumana letšollo le matla le ho oma, maikutlo a ho shoeleloa ke mesifa, bohloko ba sefuba, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le gout anti-inflammatory ngokuchanekileyo njengoko kubhaliwe kwileyibhile — umngcipheko wobutyhefu uyenyuka ukuba uthatha ngaphezu kweleyibhile.",
      "Iingcebiso ze-colchicine zihlala zibandakanya urhudo, isicanucanu, nokuyeka kwiimpawu zesisu ezinzima de uthethe nogqirha. I-Materia ayiyiqiqi idosi okanye ishedyuli yohlaselo.",
      "Xelela usokhemisti ngembali yezintso okanye isibindi NAWO ONKE amanye amayeza — uninzi lokujonga ukusebenzelana luxhomekeke kwimveliso.",
      "Xela iintlungu zemisipha okanye ubuthathaka obungaqhelekanga, ukuhlanza okunzima, okanye indle emnyama kwangoko.",
      "Buza indlela oku kuhambelana ngayo ne-allopurinol okanye amanye amayeza e-gout kuluhlu lwakho — sukuyiqqa isicwangciso sakho sodwa.",
      "Ukuba ufumana urhudo olunzima nokoma, iimvakalelo zokungasebenzi kwemisipha, iintlungu zesifuba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-hydroxychloroquine": five(
    [
      "Take this antimalarial / DMARD exactly as directed on your labelled product — often with food if stomach upset occurs.",
      "Hydroxychloroquine counselling commonly includes eye-monitoring discussions with your clinician — report new blurred vision or light sensitivity early. Materia does not invent a dose or eye-exam interval.",
      "Tell your pharmacist about heart rhythm history, psoriasis or eye disease, and all other medicines you use.",
      "Report unexplained muscle weakness, severe rash, mood changes, or ringing in the ears.",
      "Ask how this fits with other rheumatology medicines and sun-care advice on the labelled product.",
      "If you get sudden vision loss, severe chest pain, seizures, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antimalarial / DMARD njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla uma isisu siphazamiseka.",
      "Ukwelulekwa kwe-hydroxychloroquine kuvame ukufaka izingxoxo zokuqapha amehlo nodokotela — bika ukubona okufiphele okusha noma ukuzwela ukukhanya ngokushesha. I-Materia ayiqambi umthamo noma isikhathi sokuhlolwa kwamehlo.",
      "Tshela umkhiqizi ngomlando wesivinini senhliziyo, i-psoriasis noma isifo samehlo, nawo wonke amanye amaphilisi.",
      "Bika ubuthakathaka bemisipha obungachaziwe, ukuqubuka okukhulu, ukushintsha kwemizwa, noma ukukhala ezindlebeni.",
      "Buza ukuthi lokhu kuhambisana kanjani namanye amaphilisi e-rheumatology neseluleko sokuzivikela elangeni kumkhiqizo onelebula.",
      "Uma ulahlekelwa ukubona ngokuzumayo, uthola ubuhlungu besifuba obukhulu, ukuxhuzula, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antimalaria / DMARD soos op die geëtiketteerde produk aangedui — dikwels met kos as maagonstel voorkom.",
      "Hidroksichlorokien-berading sluit dikwels oogmonitering-besprekings met jou klinikus in — rapporteer nuwe dowwe sig of ligsensitiwiteit vroeg. Materia versin nie ’n dosis of oogondersoek-interval nie.",
      "Sê vir jou apteker van hartritmegeskiedenis, psoriasis of oogsiekte, en alle ander medisyne wat jy gebruik.",
      "Rapporteer onverklaarde spierswakheid, ernstige uitslag, bui-veranderinge, of gerinkel in die ore.",
      "Vra hoe dit by ander rumatologiemedisyne en sonbeskermingsadvies op die geëtiketteerde produk pas.",
      "As jy skielik sig verloor, ernstige borspyn, stuiptrekkings of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antimalarial / DMARD ena hantle kamoo e hlalositsoeng holabel — hangata le lijo haeba mpeng e tšoenyeha.",
      "Keletso ea hydroxychloroquine hangata e kenyelletsa lipuisano tsa ho hlokomela mahlo le ngaka — tlaleha pono e ncha e fifetseng kapa ho utloa leseli kapele. Materia ha e iqape tekanyo kapa nako ea tlhahlobo ea mahlo.",
      "Bolella rakhemisi ka histori ea morethetho oa pelo, psoriasis kapa boloetse ba mahlo, le meriana eohle e meng.",
      "Tlaleha bofokoli ba mesifa bo sa hlaloseng, lekhopho le matla, liphetoho tsa maikutlo, kapa ho lla litsebeng.",
      "Botsa hore sena se tšoana joang le meriana e meng ea rheumatology le keletso ea ho sireletsa letsatsi holabel.",
      "Haeba u lahleheloa ke pono ka tšohanyetso, u fumana bohloko ba sefuba bo matla, ho thothomela, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antimalarial / DMARD ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya ukuba isisu siyaphazamiseka.",
      "Iingcebiso ze-hydroxychloroquine zihlala zibandakanya iingxoxo zokuqapha amehlo nogqirha — xela ukubona okufipheleyo okutsha okanye ukuziva ukukhanya kwangoko. I-Materia ayiyiqiqi idosi okanye ixesha lokuhlolwa kwamehlo.",
      "Xelela usokhemisti ngembali yesingqisho sentliziyo, i-psoriasis okanye isifo samehlo, nawo onke amanye amayeza.",
      "Xela ubuthathaka bemisipha obungachazwanga, irhashalala enzima, utshintsho lwemvakalelo, okanye ukukhala ezindlebeni.",
      "Buza indlela oku kuhambelana ngayo namanye amayeza e-rheumatology necebiso yokukhusela ilanga kwileyibhile.",
      "Ukuba uphulukana nombono ngequbuliso, ufumana iintlungu zesifuba ezinzima, ukuxhuzula, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-clinda": five(
    [
      "Take this antibiotic exactly as directed on your labelled product — complete the prescribed course.",
      "Clindamycin counselling commonly includes diarrhoea watch — stop and seek urgent advice for severe watery stools, blood in stool, or fever with gut pain. Materia does not invent a dose or course length.",
      "Tell your pharmacist about penicillin or antibiotic allergy history and all other medicines you use.",
      "Report new rash, mouth sores, or unusual bruising early rather than waiting for the course to finish.",
      "Ask whether probiotics or diet changes are appropriate for your labelled product — do not invent a personal gut plan.",
      "If you get severe rash with blistering, facial swelling, wheeze, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antibiotic njengoba kubhalwe kumkhiqizo onelebula — qedela inkambo enikeziwe.",
      "Ukwelulekwa kwe-clindamycin kuvame ukufaka ukugada ukuhuda — yeka futhi funa iseluleko esiphuthumayo uma indle emanzi kakhulu, igazi endleleni, noma umkhuhlane nobuhlungu besisu. I-Materia ayiqambi umthamo noma ubude benkambo.",
      "Tshela umkhiqizi ngomlando we-allergy ye-penicillin noma antibiotic nawo wonke amanye amaphilisi.",
      "Bika ukuqubuka okusha, izilonda zomlomo, noma amabala aluhlaza angajwayelekile ngokushesha kunokulinda inkambo iqede.",
      "Buza ukuthi ama-probiotic noma ukushintsha ukudla kufanele yini kumkhiqizo onelebula — ungayiqiqi uhlelo lwesu lomuntu siqu.",
      "Uma uthola ukuqubuka okukhulu namaqhubu, ukuvuvuka kobuso, ukubhobha, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antibiotikum soos op die geëtiketteerde produk aangedui — voltooi die voorgeskryfde kuur.",
      "Klindamisien-berading sluit dikwels diarree-waaksaamheid in — stop en soek dringende advies vir ernstige waterige stoelgang, bloed in stoelgang, of koors met maagpyn. Materia versin nie ’n dosis of kuurduur nie.",
      "Sê vir jou apteker van penisillien- of antibiotika-allergiegeskiedenis en alle ander medisyne wat jy gebruik.",
      "Rapporteer nuwe uitslag, mondsere of ongewone kneusings vroeg eerder as om te wag tot die kuur klaar is.",
      "Vra of probiotika of dieetveranderinge gepas is vir jou geëtiketteerde produk — moenie ’n persoonlike maagplan versin nie.",
      "As jy ernstige uitslag met blase, gesigswelling, piep of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antibiotic ena hantle kamoo e hlalositsoeng holabel — qeta thuto e ngotsoeng.",
      "Keletso ea clindamycin hangata e kenyelletsa ho hlokomela letšollo — emisa ’me batla keletso e potlakileng bakeng sa mantle a metsi haholo, mali ka har'a mantle, kapa feberu le bohloko ba mpeng. Materia ha e iqape tekanyo kapa bolelele ba thuto.",
      "Bolella rakhemisi ka histori ea allergy ea penicillin kapa antibiotic le meriana eohle e meng.",
      "Tlaleha lekhopho le lecha, liso tsa molomo, kapa matheba a sootho a sa tloaelehang kapele ho e-na le ho emela thuto e qete.",
      "Botsa hore na li-probiotic kapa liphetoho tsa lijo li lokile bakeng sa sehlahiswa sa hau se nang le leibole — se ke oa iqapa moralo oa mpeng oa motho ka mong.",
      "Haeba u fumana lekhopho le matla le lihlabana, ho ruruha ha sefahleho, ho honotha, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gqiba ikhosi enikiweyo.",
      "Iingcebiso ze-clindamycin zihlala zibandakanya ukugada urhudo — yeka kwaye funa icebiso elingxamisekileyo kwindle emanzinzi kakhulu, igazi endleleni, okanye umkhuhlane neentlungu zesisu. I-Materia ayiyiqiqi idosi okanye ubude bekhosi.",
      "Xelela usokhemisti ngembali ye-allergy ye-penicillin okanye antibiotic nawo onke amanye amayeza.",
      "Xela irhashalala entsha, izilonda zomlomo, okanye amabala aluhlaza angaqhelekanga kwangoko kunokulinda ikhosi igqitywe.",
      "Buza ukuba ii-probiotic okanye utshintsho lokutya kufanelekile na kwimveliso yakho eneleyibhile — sukuyiqqa isicwangciso sesisu sakho.",
      "Ukuba ufumana irhashalala enzima namaqhuma, ukudumba kobuso, ukubhobha, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tiotropium": five(
    [
      "Use this long-acting muscarinic antagonist (LAMA) inhaler exactly as directed on your labelled product — it is a controller, not a sudden-relief reliever.",
      "Tiotropium counselling commonly includes dry mouth, constipation, and correct inhaler technique with your pharmacist. Materia does not invent a puff count or dose.",
      "Tell your pharmacist about glaucoma, prostate or urinary retention history, and all other inhalers you use.",
      "Keep your reliever inhaler plan as your clinician directed — do not substitute this LAMA for sudden shortness of breath.",
      "Report worsening breathlessness, chest tightness, or new eye pain with blurred vision early.",
      "If you get sudden severe breathing difficulty, facial swelling, or chest pain — seek emergency care.",
    ],
    [
      "Sebenzisa le long-acting muscarinic antagonist (LAMA) inhaler njengoba kubhalwe kumkhiqizo onelebula — iyilawuli, hhayi i-reliever yesikhathi esizumayo.",
      "Ukwelulekwa kwe-tiotropium kuvame ukufaka umlomo owomile, ukuqunjelwa, nendlela efanele ye-inhaler nomkhiqizi. I-Materia ayiqambi inani lama-puff noma umthamo.",
      "Tshela umkhiqizi nge-glaucoma, umlando we-prostate noma ukugcina umchamo, nawo wonke amanye ama-inhaler.",
      "Gcina uhlelo lwe-reliever inhaler njengoba udokotela ekuqondile — ungayikhululi le LAMA ngenxa yokuphefumula kancane okuzumayo.",
      "Bika ukuphefumula kabi okuya ngokuba kubi, ukucinana kwesifuba, noma ubuhlungu bamehlo obusha nokubona okufiphele ngokushesha.",
      "Uma uthola ukuphefumula kanzima kakhulu ngokuzumayo, ukuvuvuka kobuso, noma ubuhlungu besifuba — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie langwerkende muskariniese antagonis (LAMA) inhaler soos op die geëtiketteerde produk aangedui — dit is ’n beheerder, nie ’n skielike-verligtingsmiddel nie.",
      "Tiotropium-berading sluit dikwels droë mond, hardlywigheid en korrekte inhalertegniek met jou apteker in. Materia versin nie ’n puf-telling of dosis nie.",
      "Sê vir jou apteker van gloukoom, prostaat- of urinêre retensie-geskiedenis, en alle ander inhalers wat jy gebruik.",
      "Hou jou verligter-inhalerplan soos jou klinikus gerig het — moenie hierdie LAMA vir skielike kortasem vervang nie.",
      "Rapporteer verergerende asemnood, borsstyfheid, of nuwe oogpyn met dowwe sig vroeg.",
      "As jy skielike ernstige asemhalingsmoeilikheid, gesigswelling of borspyn kry — soek noodhulp.",
    ],
    [
      "Sebelisa long-acting muscarinic antagonist (LAMA) inhaler ena hantle kamoo e hlalositsoeng holabel — ke controller, eseng reliever ea tšohanyetso.",
      "Keletso ea tiotropium hangata e kenyelletsa molomo o omileng, ho thatafala ha mala, le mokhoa o nepahetseng oa inhaler le rakhemisi. Materia ha e iqape palo ea puff kapa tekanyo.",
      "Bolella rakhemisi ka glaucoma, histori ea prostate kapa ho boloka moroto, le li-inhaler tsohle tse ling.",
      "Boloka moralo oa reliever inhaler kamoo ngaka e u laetseng — se ke oa nkela LAMA ena sebaka sa ho hema butle ka tšohanyetso.",
      "Tlaleha ho hema thata ho mpefalang, ho tsitsipana ha sefuba, kapa bohloko ba mahlo bo bocha le pono e fifetseng kapele.",
      "Haeba u fumana bothata bo matla ba ho hema ka tšohanyetso, ho ruruha ha sefahleho, kapa bohloko ba sefuba — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le long-acting muscarinic antagonist (LAMA) inhaler ngokuchanekileyo njengoko kubhaliwe kwileyibhile — yilawuli, hayi i-reliever yexesha elingxamisekileyo.",
      "Iingcebiso ze-tiotropium zihlala zibandakanya umlomo owomileyo, ukuqunjelwa, nendlela efanelekileyo ye-inhaler nosokhemisti. I-Materia ayiyiqiqi inani lama-puff okanye idosi.",
      "Xelela usokhemisti nge-glaucoma, imbali ye-prostate okanye ukugcina umchamo, nazo zonke ezinye ii-inhaler.",
      "Gcina isicwangciso se-reliever inhaler njengoko ugqirha ekulathile — sukutshintsha le LAMA ngokuphefumla kancinci ngequbuliso.",
      "Xela ukuphefumla nzima okuya ngokuba mbi, ukuqina kwesifuba, okanye iintlungu zamehlo ezintsha nokubona okufipheleyo kwangoko.",
      "Ukuba ufumana uxinzelelo lokuphefumla olunzima ngequbuliso, ukudumba kobuso, okanye iintlungu zesifuba — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-mirtazapine": five(
    [
      "Take this NaSSA antidepressant exactly as directed on your labelled product — often at night if drowsiness occurs; confirm against the label.",
      "Mirtazapine counselling commonly includes increased appetite or weight change and sedation — do not stop suddenly without your clinician. Materia does not invent a dose or titration schedule.",
      "Report worsening mood or suicidal thoughts early, including after clinician dose changes.",
      "Tell your pharmacist about other sedating medicines, alcohol use, and all antidepressants on your list.",
      "Ask about infection or fever with sore throat discussions that belong with urgent clinical review.",
      "If you have self-harm thoughts, severe agitation, fever with muscle rigidity, or trouble breathing — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le NaSSA antidepressant njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba ebusuku uma ukozela kwenzeka; qinisekisa kulebula.",
      "Ukwelulekwa kwe-mirtazapine kuvame ukufaka ukudla okwengeziwe noma ukushintsha kwesisindo nokozela — ungayeki ngokuzumayo ngaphandle kwedokotela. I-Materia ayiqambi umthamo noma uhlelo lokukhuphula.",
      "Bika ukwehla kwemizwa noma imicabango yokuzibulala ngokushesha, kuhlanganise ngemva kokushintsha umthamo kudokotela.",
      "Tshela umkhiqizi ngamanye amaphilisi akozisayo, ukusebenzisa utshwala, nawo wonke ama-antidepressant ohlwini lwakho.",
      "Buza ngezimpawu zokutheleleka noma umkhuhlane nomphimbo obuhlungu okufanele kubuyekezwe ngokushesha kudokotela.",
      "Uma unemicabango yokuzilimaza, ukuphaphazeka okukhulu, umkhuhlane nokuginya kwemisipha, noma ukuphefumula kanzima — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Neem hierdie NaSSA-antidepressant soos op die geëtiketteerde produk aangedui — dikwels snags as slaperigheid voorkom; bevestig teen die etiket.",
      "Mirtazapien-berading sluit dikwels verhoogde eetlus of gewigsverandering en sedasie in — moenie skielik stop sonder jou klinikus nie. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Rapporteer verergerende bui of selfmoordgedagtes vroeg, insluitend ná klinikus-dosisveranderinge.",
      "Sê vir jou apteker van ander sederende medisyne, alkoholgebruik, en alle antidepressante op jou lys.",
      "Vra oor infeksie of koors met seer keel-besprekings wat by dringende kliniese hersiening hoort.",
      "As jy selfskade-gedagtes, ernstige agitasie, koors met spierstijfheid of asemhalingsprobleme het — soek dadelik noodhulp.",
    ],
    [
      "Sebelisa NaSSA antidepressant ena hantle kamoo e hlalositsoeng holabel — hangata bosiu haeba ho otsela ho hlaha; netefatsa holabel.",
      "Keletso ea mirtazapine hangata e kenyelletsa takatso e eketsehileng ea lijo kapa phetoho ea boima le ho otsela — se ke oa emisa ka potlako ntle le ngaka. Materia ha e iqape tekanyo kapa moralo oa ho nyolla.",
      "Tlaleha maikutlo a mabe kapa menahano ea ho ipolaea kapele, ho kenyeletsoa ka mor'a liphetoho tsa tekanyo tsa ngaka.",
      "Bolella rakhemisi ka meriana e meng e otselang, tšebeliso ea joala, le li-antidepressant tsohle lenaneng la hau.",
      "Botsa ka tšoaetso kapa feberu le ’metso o bohloko e lokelang tlhahlobo e potlakileng ea ngaka.",
      "Haeba u na le menahano ea ho intša kotsi, ho ferekana ho matla, feberu le ho thatafala ha mesifa, kapa ho hema thata — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "Sebenzisa le NaSSA antidepressant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala ithathwa ebusuku ukuba ukozela kwenzeka; qinisekisa kwileyibhile.",
      "Iingcebiso ze-mirtazapine zihlala zibandakanya ukutya okongezelelweyo okanye utshintsho lobunzima nokozela — sukuyeki ngokungxamisekileyo ngaphandle kogqirha. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyusa.",
      "Xela ukwehla kwemvakalelo okanye iingcinga zokuzibulala kwangoko, kuquka emva kotshintsho lwedosi lugqirha.",
      "Xelela usokhemisti ngamanye amayeza akozisayo, ukusebenzisa utywala, nawo onke ama-antidepressant kuluhlu lwakho.",
      "Buza ngosulelo okanye umkhuhlane nomqala obuhlungu ofanele kujongwe ngokukhawuleza kugqirha.",
      "Ukuba uneengcinga zokuzilimaza, ukuphaphazeka okunzima, umkhuhlane nokuginya kwemisipha, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),
};
