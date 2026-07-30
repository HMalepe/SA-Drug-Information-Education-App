/**
 * v250–v259 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V250_TO_V259: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-exemestane": five(
    [
      "Take this steroidal aromatase inhibitor exactly as directed on your labelled product — do not stop suddenly without your oncology clinician.",
      "Exemestane counselling commonly includes joint aches, hot flushes, and bone-health discussions. Materia does not invent a dose or oestradiol / bone target.",
      "Tell your pharmacist about osteoporosis history, hormone therapy, and ALL other medicines on your list.",
      "Report new chest pain, unexplained shortness of breath, severe bone pain, or vaginal bleeding early.",
      "Ask how missed doses should be handled on the labelled product — do not invent a catch-up clock.",
      "If you get sudden chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le steroidal aromatase inhibitor njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela we-oncology.",
      "Ukwelulekwa kwe-exemestane kuvame ukufaka ubuhlungu bamalunga, ukushisa, nokuxoxa ngempilo yamathambo. I-Materia ayiqambi umthamo noma umgomo we-oestradiol / amathambo.",
      "Tshela umkhiqizi ngomlando we-osteoporosis, i-hormone therapy, NAWO WONKE amanye amaphilisi.",
      "Bika ubuhlungu besifuba obusha, ukuphefumula kanzima okungachazeki, ubuhlungu bamathambo obukhulu, noma ukopha kwesibeletho ngokushesha.",
      "Buza ukuthi imithamo elahlekile iphathwa kanjani kumkhiqizo onelebula — ungayiqiqi iwashi lokubuyisela.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie steroïdale aromatase-inhibeerder soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou onkologie-klinikus nie.",
      "Exemestane-berading sluit dikwels gewrigspyn, warm flushes, en been-gesondheidsgesprekke in. Materia versin nie ’n dosis of oestradiol- / beenteiken nie.",
      "Sê vir jou apteker van osteoporosis-geskiedenis, hormoonterapie, en ALLE ander medisyne op jou lys.",
      "Rapporteer nuwe borspyn, onverklaarde kortasem, ernstige beenpyn, of vaginale bloeding vroeg.",
      "Vra hoe gemiste dosisse op die geëtiketteerde produk hanteer moet word — moenie ’n inhaalklok versin nie.",
      "As jy skielike borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa steroidal aromatase inhibitor ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka ea oncology.",
      "Keletso ea exemestane hangata e kenyelletsa bohloko ba manonyeletso, ho futhumala, le lipuisano tsa bophelo ba masapo. Materia ha e iqape tekanyo kapa sepheo sa oestradiol / masapo.",
      "Bolella rakhemisi ka histori ea osteoporosis, hormone therapy, le MERIANA EOHLE e meng.",
      "Tlaleha bohloko ba sefuba bo bocha, ho hema thata ho sa hlaloseng, bohloko ba masapo bo matla, kapa ho tsoa mali ha botona kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa nako ea ho tsosolosa.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le steroidal aromatase inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha we-oncology.",
      "Iingcebiso ze-exemestane zihlala zibandakanya iintlungu zamalungu, ukushisa, neengxoxo zempilo yamathambo. I-Materia ayiyiqiqi idosi okanye usukelo lwe-oestradiol / amathambo.",
      "Xelela usokhemisti ngembali ye-osteoporosis, unyango lwee-hormone, NAWO ONKE amanye amayeza.",
      "Xela iintlungu zesifuba ezintsha, uxinzelelo lokuphefumla olungachazekiyo, iintlungu zamathambo ezinzima, okanye ukopha kwesibeleko kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iwotshi yokubuyisela.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-pegfilgrastim": five(
    [
      "Use this pegylated G-CSF exactly as directed on your labelled product — injection timing usually follows chemotherapy plans; confirm with your care team.",
      "Pegfilgrastim counselling commonly includes bone pain and fever watch after chemotherapy. Materia does not invent a dose, injection schedule, or neutrophil target.",
      "Tell your pharmacist about sickle-cell history, spleen problems, and ALL other growth-factor products on your list.",
      "Report left-upper abdominal pain, shoulder-tip pain, or unexplained shortness of breath early.",
      "Ask how storage and missed doses fit your care plan — do not invent fridge temperatures or a catch-up plan.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le pegylated G-CSF njengoba kubhalwe kumkhiqizo onelebula — isikhathi sokujova sivame ukulandela izinhlelo ze-chemotherapy; qinisekisa nethimba lakho.",
      "Ukwelulekwa kwe-pegfilgrastim kuvame ukufaka ubuhlungu bamathambo nokuqapha umkhuhlane ngemva kwe-chemotherapy. I-Materia ayiqambi umthamo, uhlelo lokujova, noma umgomo we-neutrophil.",
      "Tshela umkhiqizi ngomlando we-sickle cell, izinkinga zespleen, NAWO WONKE amanye amakhiqizo e-growth factor.",
      "Bika ubuhlungu besisu esihlangothini esingenhla kwesokunxele, ubuhlungu be-shoulder tip, noma ukuphefumula kanzima okungachazeki ngokushesha.",
      "Buza ukuthi ukugcinwa nemithamo elahlekile kuhambisana kanjani nohlelo lwakho — ungayiqiqi amazinga efriji noma uhlelo lokubuyisela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie gepegileerde G-CSF soos op die geëtiketteerde produk aangedui — inspuitingstiming volg gewoonlik chemoterapieplanne; bevestig met jou sorgspan.",
      "Pegfilgrastim-berading sluit dikwels beenpyn en koorswaak ná chemoterapie in. Materia versin nie ’n dosis, inspuitingskedule of neutrofielteiken nie.",
      "Sê vir jou apteker van sikkelsselgeskiedenis, miltprobleme, en ALLE ander groeifaktorprodukte op jou lys.",
      "Rapporteer linker-boonste buikpyn, skouerpuntpyn, of onverklaarde kortasem vroeg.",
      "Vra hoe berging en gemiste dosisse by jou sorgplan pas — moenie yskastemperature of ’n inhaalplan versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa pegylated G-CSF ena hantle kamoo e hlalositsoeng holabel — nako ea ho enteoa hangata e latela merero ea chemotherapy; netefatsa le sehlopha sa hau.",
      "Keletso ea pegfilgrastim hangata e kenyelletsa bohloko ba masapo le ho hlokomela feberu ka mor'a chemotherapy. Materia ha e iqape tekanyo, kemiso ea ho enteoa, kapa sepheo sa neutrophil.",
      "Bolella rakhemisi ka histori ea sickle cell, mathata a spleen, le LIHLAHISWA TSOHLE tsa growth factor.",
      "Tlaleha bohloko ba mpeng ka holimo ka letsohong le letšehali, bohloko ba ntlha ea lehetla, kapa ho hema thata ho sa hlaloseng kapele.",
      "Botsa hore polokelo le litekanyo tse lahlehileng li tšoana joang le moralo oa hau — se ke oa iqapa mocheso oa sehatsetsi kapa moralo oa ho tsosolosa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le pegylated G-CSF ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ixesha lokutofa lihlala lilandela izicwangciso ze-chemotherapy; qinisekisa neqela lakho.",
      "Iingcebiso ze-pegfilgrastim zihlala zibandakanya iintlungu zamathambo nokuqapha umkhuhlane emva kwe-chemotherapy. I-Materia ayiyiqiqi idosi, ishedyuli yokutofa, okanye usukelo lwe-neutrophil.",
      "Xelela usokhemisti ngembali ye-sickle cell, iingxaki zespleen, NAZO ZONKE ezinye iimveliso ze-growth factor.",
      "Xela iintlungu zesisu ezingasentla ekhohlo, iintlungu zetip yegxalaba, okanye uxinzelelo lokuphefumla olungachazekiyo kwangoko.",
      "Buza indlela ugcino needosi ezilahlekileyo ezihambelana ngayo nesicwangciso sakho — sukuyiqqa amaqondo efriji okanye isicwangciso sokubuyisela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-denosumab": five(
    [
      "Use this RANKL inhibitor exactly as directed on your labelled product — oncology and osteoporosis uses differ; confirm why you were given it.",
      "Denosumab counselling commonly includes calcium and dental-health discussions before and during treatment. Materia does not invent a dose, injection interval, or calcium / bone target.",
      "Tell your pharmacist about low calcium history, kidney disease, dental surgery plans, and ALL other bone medicines on your list.",
      "Report jaw pain, loose teeth, new thigh or hip pain, or muscle spasms early.",
      "Ask how missed injections and calcium / vitamin D plans fit the labelled product — do not invent a personal schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le RANKL inhibitor njengoba kubhalwe kumkhiqizo onelebula — i-oncology ne-osteoporosis kuyahluka; qinisekisa ukuthi unikewe ngani.",
      "Ukwelulekwa kwe-denosumab kuvame ukufaka izingxoxo ze-calcium nempilo yamazinyo ngaphambi nangaphakathi kokwelashwa. I-Materia ayiqambi umthamo, isikhathi sokujova, noma umgomo we-calcium / amathambo.",
      "Tshela umkhiqizi ngomlando we-calcium ephansi, isifo sezinso, izinhlelo zokuhlinzwa kwamazinyo, NAWO WONKE amanye amaphilisi amathambo.",
      "Bika ubuhlungu bomhlathi, amazinyo axegayo, ubuhlungu bethanga noma i-hip obusha, noma ukuqhaqhazela kwemisipha ngokushesha.",
      "Buza ukuthi ukujova okulahlekile nezinhlelo ze-calcium / vitamin D kuhambisana kanjani nomkhiqizo onelebula — ungayiqiqi uhlelo lakho.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie RANKL-inhibeerder soos op die geëtiketteerde produk aangedui — onkologie- en osteoporosis-gebruike verskil; bevestig waarom jy dit gekry het.",
      "Denosumab-berading sluit dikwels kalsium- en tandgesondheidsgesprekke voor en tydens behandeling in. Materia versin nie ’n dosis, inspuitingsinterval of kalsium- / beenteiken nie.",
      "Sê vir jou apteker van lae-kalsiumgeskiedenis, niersiekte, tandheelkundige chirurgieplanne, en ALLE ander beenmedisyne op jou lys.",
      "Rapporteer kaakpyn, los tande, nuwe dy- of heuppyn, of spierkrampe vroeg.",
      "Vra hoe gemiste inspuitings en kalsium- / vitamien D-planne by die geëtiketteerde produk pas — moenie ’n persoonlike skedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa RANKL inhibitor ena hantle kamoo e hlalositsoeng holabel — tšebeliso ea oncology le osteoporosis ea fapana; netefatsa hore na u e filoe hobaneng.",
      "Keletso ea denosumab hangata e kenyelletsa lipuisano tsa calcium le bophelo ba meno pele le nakong ea kalafo. Materia ha e iqape tekanyo, nako ea ho enteoa, kapa sepheo sa calcium / masapo.",
      "Bolella rakhemisi ka histori ea calcium e tlase, lefu la liphio, merero ea opereishene ea meno, le MERIANA EOHLE ea masapo.",
      "Tlaleha bohloko ba mohlahare, meno a hlephileng, bohloko ba leoto kapa letheka bo bocha, kapa ho thothomela ha mesifa kapele.",
      "Botsa hore lienteo tse lahlehileng le merero ea calcium / vitamin D li tšoana joang le sehlahiswa se nang le leibole — se ke oa iqapa kemiso ea hau.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le RANKL inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — i-oncology ne-osteoporosis kuyahluka; qinisekisa ukuba unikwe ntoni.",
      "Iingcebiso ze-denosumab zihlala zibandakanya iingxoxo ze-calcium nempilo yamazinyo phambi nangexesha lonyango. I-Materia ayiyiqiqi idosi, ixesha lokutofa, okanye usukelo lwe-calcium / amathambo.",
      "Xelela usokhemisti ngembali ye-calcium ephantsi, isifo sezintso, izicwangciso zotyando lwamazinyo, NAWO ONKE amanye amayeza amathambo.",
      "Xela iintlungu zomhlathi, amazinyo axengileyo, iintlungu zethanga okanye i-hip ezintsha, okanye ukuqhaqhazela kwemisipha kwangoko.",
      "Buza indlela ukutofa okulahlekileyo nezicwangciso ze-calcium / vitamin D ezihambelana ngayo nemveliso eneleyibhile — sukuyiqqa ishedyuli yakho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-zoledronic-acid": five(
    [
      "Receive this bisphosphonate infusion exactly as directed by your labelled product and care team — hydration and lab checks belong with the clinician.",
      "Zoledronic acid counselling commonly includes flu-like feelings after infusion and dental-health discussions. Materia does not invent a dose, infusion clock, or calcium / creatinine target.",
      "Tell your pharmacist about kidney disease, low calcium history, dental surgery plans, and ALL other bone medicines on your list.",
      "Report jaw pain, loose teeth, new thigh pain, eye inflammation, or muscle spasms early.",
      "Ask how pre-infusion blood tests and missed appointments fit your plan — do not invent lab targets or a catch-up schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Yamukela le bisphosphonate infusion njengoba kubhalwe kumkhiqizo onelebula nethimba lakho — ukuphuza amanzi nokuhlolwa kwelabhorethri kuhambisana nodokotela.",
      "Ukwelulekwa kwe-zoledronic acid kuvame ukufaka ukuzwa okufana nomkhuhlane ngemva kwe-infusion nokuxoxa ngempilo yamazinyo. I-Materia ayiqambi umthamo, iwashi le-infusion, noma umgomo we-calcium / creatinine.",
      "Tshela umkhiqizi ngesifo sezinso, umlando we-calcium ephansi, izinhlelo zokuhlinzwa kwamazinyo, NAWO WONKE amanye amaphilisi amathambo.",
      "Bika ubuhlungu bomhlathi, amazinyo axegayo, ubuhlungu bethanga obusha, ukuvuvuka kwamehlo, noma ukuqhaqhazela kwemisipha ngokushesha.",
      "Buza ukuthi ukuhlolwa kwegazi ngaphambi kwe-infusion nemihlangano elahlekile kuhambisana kanjani nohlelo lwakho — ungayiqiqi imigomo yelabhorethri noma uhlelo lokubuyisela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Ontvang hierdie bisfosfonaat-infusie soos deur jou geëtiketteerde produk en sorgspan aangedui — hidrasie en labkontroles behoort by die klinikus.",
      "Zoledronic acid-berading sluit dikwels griepagtige gevoelens ná infusie en tandgesondheidsgesprekke in. Materia versin nie ’n dosis, infusieklok of kalsium- / kreatinienteiken nie.",
      "Sê vir jou apteker van niersiekte, lae-kalsiumgeskiedenis, tandheelkundige chirurgieplanne, en ALLE ander beenmedisyne op jou lys.",
      "Rapporteer kaakpyn, los tande, nuwe dypyn, oogontsteking, of spierkrampe vroeg.",
      "Vra hoe pre-infusie bloedtoetse en gemiste afsprake by jou plan pas — moenie labteikens of ’n inhaalskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Amohela bisphosphonate infusion ena hantle kamoo e hlalositsoeng holabel le sehlopha sa hau — ho noa metsi le litlhahlobo tsa lab ke tsa ngaka.",
      "Keletso ea zoledronic acid hangata e kenyelletsa maikutlo a kang a feberu ka mor'a infusion le lipuisano tsa bophelo ba meno. Materia ha e iqape tekanyo, nako ea infusion, kapa sepheo sa calcium / creatinine.",
      "Bolella rakhemisi ka lefu la liphio, histori ea calcium e tlase, merero ea opereishene ea meno, le MERIANA EOHLE ea masapo.",
      "Tlaleha bohloko ba mohlahare, meno a hlephileng, bohloko ba leoto bo bocha, ho ruruha ha mahlo, kapa ho thothomela ha mesifa kapele.",
      "Botsa hore liteko tsa mali pele ho infusion le likopano tse lahlehileng li tšoana joang le moralo oa hau — se ke oa iqapa lipheo tsa lab kapa kemiso ea ho tsosolosa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Yamkela le bisphosphonate infusion ngokuchanekileyo njengoko kubhaliwe kwileyibhile neqela lakho — ukusela amanzi nokuhlolwa kwelabhorethri kuhamba nogqirha.",
      "Iingcebiso ze-zoledronic acid zihlala zibandakanya ukuziva okufana nomkhuhlane emva kwe-infusion neengxoxo zempilo yamazinyo. I-Materia ayiyiqiqi idosi, iwotshi ye-infusion, okanye usukelo lwe-calcium / creatinine.",
      "Xelela usokhemisti ngesifo sezintso, imbali ye-calcium ephantsi, izicwangciso zotyando lwamazinyo, NAWO ONKE amanye amayeza amathambo.",
      "Xela iintlungu zomhlathi, amazinyo axengileyo, iintlungu zethanga ezintsha, ukudumba kwamehlo, okanye ukuqhaqhazela kwemisipha kwangoko.",
      "Buza indlela iimvavanyo zegazi phambi kwe-infusion needibano ezilahlekileyo ezihambelana ngayo nesicwangciso sakho — sukuyiqqa iitarget zelabhorethri okanye ishedyuli yokubuyisela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-capecitabine": five(
    [
      "Take this oral fluoropyrimidine exactly as directed on your labelled product — oncology courses are clinician-timed; confirm the labelled plan.",
      "Capecitabine counselling commonly includes hand-foot skin care and diarrhoea watch. Materia does not invent a dose, cycle clock, or DPD / lab target.",
      "Tell your pharmacist about prior fluorouracil reactions, kidney or liver disease, and ALL other medicines on your list.",
      "Report severe diarrhoea, peeling palms or soles, mouth ulcers, chest pain, or unusual bruising early.",
      "Ask how missed doses and food timing fit the labelled product — do not invent a personal cycle schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le oral fluoropyrimidine njengoba kubhalwe kumkhiqizo onelebula — izinkambo ze-oncology zihlelwa udokotela; qinisekisa uhlelo lwelebula.",
      "Ukwelulekwa kwe-capecitabine kuvame ukufaka ukunakekelwa kwesikhumba sezandla nezinyawo nokuqapha uhudo. I-Materia ayiqambi umthamo, iwashi lomjikelezo, noma umgomo we-DPD / labhorethri.",
      "Tshela umkhiqizi ngokusabela kwe-fluorouracil kwangaphambili, isifo sezinso noma sesibindi, NAWO WONKE amanye amaphilisi.",
      "Bika uhudo olukhulu, ukuhlubuka kwesandla noma soles, izilonda zomlomo, ubuhlungu besifuba, noma ukulimala okungajwayelekile ngokushesha.",
      "Buza ukuthi imithamo elahlekile nesikhathi sokudla kuhambisana kanjani nomkhiqizo onelebula — ungayiqiqi uhlelo lwakho lomjikelezo.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie orale fluoropirimidine soos op die geëtiketteerde produk aangedui — onkologie-kure word deur die klinikus getimed; bevestig die geëtiketteerde plan.",
      "Capecitabine-berading sluit dikwels hand-voet-velsorg en diarree-waak in. Materia versin nie ’n dosis, siklusklok of DPD- / labteiken nie.",
      "Sê vir jou apteker van vorige fluorouracil-reaksies, nier- of lewersiekte, en ALLE ander medisyne op jou lys.",
      "Rapporteer ernstige diarree, skilferende palms of soles, mondsere, borspyn, of ongewone kneusings vroeg.",
      "Vra hoe gemiste dosisse en voedingstiming by die geëtiketteerde produk pas — moenie ’n persoonlike siklusskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa oral fluoropyrimidine ena hantle kamoo e hlalositsoeng holabel — lithuto tsa oncology li lekantsoe ke ngaka; netefatsa moralo oa leibole.",
      "Keletso ea capecitabine hangata e kenyelletsa tlhokomelo ea letlalo la matsoho le maoto le ho hlokomela letšollo. Materia ha e iqape tekanyo, nako ea potoloho, kapa sepheo sa DPD / lab.",
      "Bolella rakhemisi ka karabelo ea fluorouracil ea pejana, lefu la liphio kapa sebete, le MERIANA EOHLE e meng.",
      "Tlaleha letšollo le matla, ho hloboha ha matsoho kapa maoto, liso tsa molomo, bohloko ba sefuba, kapa ho otloloa ho sa tloaelehang kapele.",
      "Botsa hore litekanyo tse lahlehileng le nako ea lijo li tšoana joang le sehlahiswa se nang le leibole — se ke oa iqapa kemiso ea hau ea potoloho.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le oral fluoropyrimidine ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iikhosi ze-oncology zilungelelaniswa gugqirha; qinisekisa isicwangciso seleyibhile.",
      "Iingcebiso ze-capecitabine zihlala zibandakanya ukhathalelo lwesikhumba sezandla neenyawo nokuqapha urhudo. I-Materia ayiyiqiqi idosi, iwotshi yomjikelo, okanye usukelo lwe-DPD / labhorethri.",
      "Xelela usokhemisti ngokusabela kwe-fluorouracil kwangaphambili, isifo sezintso okanye sesibindi, NAWO ONKE amanye amayeza.",
      "Xela urhudo olunzima, ukuhlubuka kwezandla okanye iinyawo, izilonda zomlomo, iintlungu zesifuba, okanye ukulimala okungaqhelekanga kwangoko.",
      "Buza indlela iidosi ezilahlekileyo nexesha lokutya ezihambelana ngayo nemveliso eneleyibhile — sukuyiqqa ishedyuli yakho yomjikelo.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-mesna": five(
    [
      "Use this uroprotectant exactly as directed on your labelled product — timing usually follows ifosfamide or cyclophosphamide plans; confirm with your care team.",
      "Mesna counselling commonly includes drinking as advised and watching urine colour or irritation. Materia does not invent a dose, schedule hours, or bladder score.",
      "Tell your pharmacist about sulfa allergy history if relevant, kidney disease, and ALL other chemotherapy-support medicines on your list.",
      "Report painful urination, blood in urine, severe abdominal pain, or allergic rash early.",
      "Ask how missed doses fit your chemo-support plan — do not invent a personal rescue schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le uroprotectant njengoba kubhalwe kumkhiqizo onelebula — isikhathi sivame ukulandela izinhlelo ze-ifosfamide noma cyclophosphamide; qinisekisa nethimba lakho.",
      "Ukwelulekwa kwe-mesna kuvame ukufaka ukuphuza njengoba kushiwo nokuqapha umbala womchamo noma ukucasuka. I-Materia ayiqambi umthamo, amahora ohlelo, noma isikali sesinye.",
      "Tshela umkhiqizi ngomlando we-sulfa allergy uma kufanele, isifo sezinso, NAWO WONKE amanye amaphilisi asekelayo e-chemotherapy.",
      "Bika ukuchama okubuhlungu, igazi emchamweni, ubuhlungu besisu obukhulu, noma ukuqubuka kwe-allergy ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwakho lwe-chemo-support — ungayiqiqi uhlelo lakho lokuzisindisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie urobeskermer soos op die geëtiketteerde produk aangedui — timing volg gewoonlik ifosfamied- of siklofosfamiedplanne; bevestig met jou sorgspan.",
      "Mesna-berading sluit dikwels drink soos raad gegee en urinekleur of irritasie dophou in. Materia versin nie ’n dosis, skedule-ure of blaasstelling nie.",
      "Sê vir jou apteker van sulfa-allergiegeskiedenis indien relevant, niersiekte, en ALLE ander chemoterapie-ondersteuningsmedisyne op jou lys.",
      "Rapporteer pynlike urinering, bloed in urine, ernstige buikpyn, of allergiese uitslag vroeg.",
      "Vra hoe gemiste dosisse by jou chemo-ondersteuningsplan pas — moenie ’n persoonlike reddingskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa uroprotectant ena hantle kamoo e hlalositsoeng holabel — nako hangata e latela merero ea ifosfamide kapa cyclophosphamide; netefatsa le sehlopha sa hau.",
      "Keletso ea mesna hangata e kenyelletsa ho noa kamoo ho elelitsoeng le ho hlokomela 'mala oa moroto kapa ho hlaba. Materia ha e iqape tekanyo, lihora tsa kemiso, kapa lintlha tsa senya.",
      "Bolella rakhemisi ka histori ea sulfa allergy haeba e ameha, lefu la liphio, le MERIANA EOHLE ea tšehetso ea chemotherapy.",
      "Tlaleha ho ntša moroto ho bohloko, mali ka har'a moroto, bohloko ba mpeng bo matla, kapa lekhopho la allergy kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa hau oa chemo-support — se ke oa iqapa kemiso ea hau ea ho iphelisa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le uroprotectant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ixesha lihlala lilandela izicwangciso ze-ifosfamide okanye cyclophosphamide; qinisekisa neqela lakho.",
      "Iingcebiso ze-mesna zihlala zibandakanya ukusela njengoko kucebiswa nokuqapha umbala womchamo okanye ukucaphuka. I-Materia ayiyiqiqi idosi, iiyure zeshedyuli, okanye amanqaku esinyo.",
      "Xelela usokhemisti ngembali ye-sulfa allergy ukuba ifanelekile, isifo sezintso, NAWO ONKE amanye amayeza axhasa i-chemotherapy.",
      "Xela ukuchama okubuhlungu, igazi emchamweni, iintlungu zesisu ezinzima, okanye irhashalala ye-allergy kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso sakho se-chemo-support — sukuyiqqa ishedyuli yakho yokuzisindisa.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-epoetin-alfa": five(
    [
      "Use this erythropoiesis-stimulating agent exactly as directed on your labelled product — injection technique belongs with your care team.",
      "Epoetin alfa counselling commonly includes blood-pressure watch and clot-risk teaching. Materia does not invent a dose, injection schedule, or haemoglobin target.",
      "Tell your pharmacist about uncontrolled high blood pressure, clot history, cancer treatment plans, and ALL other ESA products on your list.",
      "Report severe headache, chest pain, calf swelling, sudden vision change, or seizure early.",
      "Ask how missed doses and monitoring visits fit your plan — do not invent a personal haemoglobin schedule.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le erythropoiesis-stimulating agent njengoba kubhalwe kumkhiqizo onelebula — indlela yokujova ihambisana nethimba lakho lokunakekelwa.",
      "Ukwelulekwa kwe-epoetin alfa kuvame ukufaka ukuqapha umfutho wegazi nokufundisa ngeqhwa. I-Materia ayiqambi umthamo, uhlelo lokujova, noma umgomo we-haemoglobin.",
      "Tshela umkhiqizi ngomfutho wegazi ophezulu ongalawuleki, umlando weqhwa, izinhlelo zokwelapha umdlavuza, NAWO WONKE amanye ama-ESA.",
      "Bika ikhanda elibuhlungu kakhulu, ubuhlungu besifuba, ukuvuvuka kweqakala, ukushintsha kokubona okuzumayo, noma ukuwa ngokushesha.",
      "Buza ukuthi imithamo elahlekile nokuvakashelwa kokuhlola kuhambisana kanjani nohlelo lwakho — ungayiqiqi uhlelo lwakho lwe-haemoglobin.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie eritropoëse-stimulerende middel soos op die geëtiketteerde produk aangedui — inspuitingstegniek behoort by jou sorgspan.",
      "Epoetin alfa-berading sluit dikwels bloeddrukwaak en klont-risiko-onderrig in. Materia versin nie ’n dosis, inspuitingskedule of hemoglobienteiken nie.",
      "Sê vir jou apteker van onbeheerde hoë bloeddruk, klontgeskiedenis, kankerbehandelingsplanne, en ALLE ander ESA-produkte op jou lys.",
      "Rapporteer ernstige hoofpyn, borspyn, kuitswelling, skielike sigverandering, of stuipe vroeg.",
      "Vra hoe gemiste dosisse en moniteringsbesoeke by jou plan pas — moenie ’n persoonlike hemoglobinskedule versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa erythropoiesis-stimulating agent ena hantle kamoo e hlalositsoeng holabel — mokhoa oa ho enteoa ke oa sehlopha sa hau sa tlhokomelo.",
      "Keletso ea epoetin alfa hangata e kenyelletsa ho hlokomela khatello ea mali le thuto ea kotsi ea tlala ea mali. Materia ha e iqape tekanyo, kemiso ea ho enteoa, kapa sepheo sa haemoglobin.",
      "Bolella rakhemisi ka khatello ea mali e phahameng e sa laoleheng, histori ea tlala ea mali, merero ea kalafo ea mofetše, le LIHLAHISWA TSOHLE tsa ESA.",
      "Tlaleha hlooho e bohloko haholo, bohloko ba sefuba, ho ruruha ha leoto, phetoho ea pono ka tšohanyetso, kapa ho tšoha kapele.",
      "Botsa hore litekanyo tse lahlehileng le maeto a ho hlokomela li tšoana joang le moralo oa hau — se ke oa iqapa kemiso ea hau ea haemoglobin.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le erythropoiesis-stimulating agent ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ubuchule bokutofa buhamba neqela lakho lokhathalelo.",
      "Iingcebiso ze-epoetin alfa zihlala zibandakanya ukuqapha uxinzelelo lwegazi nokufundisa ngomngcipheko weqhwa. I-Materia ayiyiqiqi idosi, ishedyuli yokutofa, okanye usukelo lwe-haemoglobin.",
      "Xelela usokhemisti ngoxinzelelo lwegazi oluphezulu olungalawulekiyo, imbali yeqhwa, izicwangciso zonyango lomhlaza, NAZO ZONKE ezinye ii-ESA.",
      "Xela intloko ebuhlungu kakhulu, iintlungu zesifuba, ukudumba kweqakala, utshintsho lokubona ngequbuliso, okanye ukuwa kwangoko.",
      "Buza indlela iidosi ezilahlekileyo neendwendwe zokuqapha ezihambelana ngayo nesicwangciso sakho — sukuyiqqa ishedyuli yakho ye-haemoglobin.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-hydroxycarbamide": five(
    [
      "Take this antimetabolite exactly as directed on your labelled product — sickle-cell and myeloproliferative uses differ; confirm why you were given it.",
      "Hydroxycarbamide counselling commonly includes blood-count monitoring and contraception discussions. Materia does not invent a dose, lab interval, or blood-count target.",
      "Tell your pharmacist about pregnancy plans, infection history, and ALL other bone-marrow-suppressing medicines on your list.",
      "Report fever, unusual bruising, severe mouth ulcers, or unexplained shortness of breath early.",
      "Ask how missed doses and blood-test visits fit the labelled plan — do not invent a personal catch-up schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antimetabolite njengoba kubhalwe kumkhiqizo onelebula — i-sickle cell ne-myeloproliferative kuyahluka; qinisekisa ukuthi unikewe ngani.",
      "Ukwelulekwa kwe-hydroxycarbamide kuvame ukufaka ukuhlolwa kwezinombolo zegazi nokuxoxa nge-contraception. I-Materia ayiqambi umthamo, isikhathi selabhorethri, noma umgomo wezinombolo zegazi.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, umlando wokutheleleka, NAWO WONKE amanye amaphilisi acindezela umnkantsha wamathambo.",
      "Bika umkhuhlane, ukulimala okungajwayelekile, izilonda zomlomo ezinkulu, noma ukuphefumula kanzima okungachazeki ngokushesha.",
      "Buza ukuthi imithamo elahlekile nokuvakashelwa kokuhlolwa kwegazi kuhambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lakho lokubuyisela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antimetaboliet soos op die geëtiketteerde produk aangedui — sikkelssel- en mieloproliferatiewe gebruike verskil; bevestig waarom jy dit gekry het.",
      "Hydroxycarbamide-berading sluit dikwels bloedtellingmonitering en voorbehoedingsgesprekke in. Materia versin nie ’n dosis, labinterval of bloedtellingteiken nie.",
      "Sê vir jou apteker van swangerskapsplanne, infeksiegeskiedenis, en ALLE ander beenmurg-onderdrukkende medisyne op jou lys.",
      "Rapporteer koors, ongewone kneusings, ernstige mondsere, of onverklaarde kortasem vroeg.",
      "Vra hoe gemiste dosisse en bloedtoetsbesoeke by die geëtiketteerde plan pas — moenie ’n persoonlike inhaalskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antimetabolite ena hantle kamoo e hlalositsoeng holabel — tšebeliso ea sickle cell le myeloproliferative ea fapana; netefatsa hore na u e filoe hobaneng.",
      "Keletso ea hydroxycarbamide hangata e kenyelletsa ho hlokomela palo ea mali le lipuisano tsa contraception. Materia ha e iqape tekanyo, nako ea lab, kapa sepheo sa palo ea mali.",
      "Bolella rakhemisi ka merero ea boimana, histori ea tšoaetso, le MERIANA EOHLE e hatellang moko oa masapo.",
      "Tlaleha feberu, ho otloloa ho sa tloaelehang, liso tsa molomo tse matla, kapa ho hema thata ho sa hlaloseng kapele.",
      "Botsa hore litekanyo tse lahlehileng le maeto a liteko tsa mali li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea hau ea ho tsosolosa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antimetabolite ngokuchanekileyo njengoko kubhaliwe kwileyibhile — i-sickle cell ne-myeloproliferative kuyahluka; qinisekisa ukuba unikwe ntoni.",
      "Iingcebiso ze-hydroxycarbamide zihlala zibandakanya ukuqapha amanani egazi neengxoxo ze-contraception. I-Materia ayiyiqiqi idosi, ixesha lelabhorethri, okanye usukelo lamanani egazi.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, imbali yosulelo, NAWO ONKE amanye amayeza acinezela umnkantsha wamathambo.",
      "Xela umkhuhlane, ukulimala okungaqhelekanga, izilonda zomlomo ezinzima, okanye uxinzelelo lokuphefumla olungachazekiyo kwangoko.",
      "Buza indlela iidosi ezilahlekileyo neendwendwe zokuhlolwa kwegazi ezihambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yakho yokubuyisela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-ketotifen-eye": five(
    [
      "Use these ocular antihistamine / mast-cell stabiliser drops exactly as directed on your labelled product — confirm the labelled eye(s) and spacing.",
      "Ketotifen eye counselling commonly includes temporary stinging and removing contact lenses before drops if the label advises. Materia does not invent a drop count, spacing minutes, or allergy score.",
      "Tell your pharmacist about other eye drops, eye infections, and ALL other allergy medicines on your list.",
      "Report worsening redness, severe eye pain, or vision change early.",
      "Ask how to space other eye products on the labelled pack — do not invent a personal drop schedule.",
      "If you get severe allergic swelling around the eyes or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa la ma-ocular antihistamine / mast-cell stabiliser drops njengoba kubhalwe kumkhiqizo onelebula — qinisekisa iso(amehlo) nesikhathi esibhalwe.",
      "Ukwelulekwa kwe-ketotifen eye kuvame ukufaka ukushisa okwesikhashana nokususa ama-contact lenses ngaphambi kwamathonsi uma ilebula ivuma. I-Materia ayiqambi inani lathonsi, amaminithi okuhlukanisa, noma isikali se-allergy.",
      "Tshela umkhiqizi ngamanye amathonsi amehlo, izifo zamehlo, NAWO WONKE amanye amaphilisi e-allergy.",
      "Bika ukubomvu okuya ngokuba kubi, ubuhlungu beso obukhulu, noma ukushintsha kokubona ngokushesha.",
      "Buza ukuthi amanye amakhiqizo amehlo ahlukaniswa kanjani kuphakethe onelebula — ungayiqiqi uhlelo lwakho lwamathonsi.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie okulêre antihistamien- / mas-sel-stabiliseerderdruppels soos op die geëtiketteerde produk aangedui — bevestig die geëtiketteerde oog(e) en spasiëring.",
      "Ketotifen-oogberading sluit dikwels tydelike steek en verwydering van kontaklense voor druppels in as die etiket dit raad. Materia versin nie ’n druppeltelling, spasiëringsminute of allergiestelling nie.",
      "Sê vir jou apteker van ander oogdruppels, ooginfeksies, en ALLE ander allergiemedisyne op jou lys.",
      "Rapporteer verergerende rooiheid, ernstige oogpyn, of sigverandering vroeg.",
      "Vra hoe om ander oogprodukte op die geëtiketteerde pak te spasieer — moenie ’n persoonlike druppelskedule versin nie.",
      "As jy ernstige allergiese swelling rondom die oë of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa li-ocular antihistamine / mast-cell stabiliser drops tsena hantle kamoo e hlalositsoeng holabel — netefatsa leihlo(mahlo) le nako e hlalositseng.",
      "Keletso ea ketotifen eye hangata e kenyelletsa ho hlaba ha nakoana le ho tlosa li-contact lenses pele ho mathopa haeba leibole e eletsa. Materia ha e iqape palo ea thopa, metsotso ea ho arola, kapa lintlha tsa allergy.",
      "Bolella rakhemisi ka mathopa a mang a mahlo, tšoaetso ea mahlo, le MERIANA EOHLE ea allergy.",
      "Tlaleha bofubelu bo mpefala, bohloko ba leihlo bo matla, kapa phetoho ea pono kapele.",
      "Botsa hore lihlahiswa tse ling tsa mahlo li lokela ho arola joang pakeng ea leibole — se ke oa iqapa kemiso ea hau ea mathopa.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa la ma-ocular antihistamine / mast-cell stabiliser drops ngokuchanekileyo njengoko kubhaliwe kwileyibhile — qinisekisa iliso(amehlo) nexesha elibhaliweyo.",
      "Iingcebiso ze-ketotifen eye zihlala zibandakanya ukurhawuzelela okwethutyana nokususa ii-contact lenses phambi kwamathontsi ukuba ileyibhile iyacebisa. I-Materia ayiyiqiqi inani lethontsi, imizuzu yokwahlula, okanye amanqaku e-allergy.",
      "Xelela usokhemisti ngamanye amathontsi amehlo, usulelo lwamehlo, NAWO ONKE amanye amayeza e-allergy.",
      "Xela ububomvu obuya kuba mbi, iintlungu zeliso ezinzima, okanye utshintsho lokubona kwangoko.",
      "Buza indlela ezinye iimveliso zamehlo ezifanele zahlulwe ngayo kwipakethi eneleyibhile — sukuyiqqa ishedyuli yakho yamathontsi.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tobramycin-eye": five(
    [
      "Use this topical ophthalmic aminoglycoside exactly as directed on your labelled product — drops and ointment differ; confirm the form you were given.",
      "Tobramycin eye counselling commonly includes completing the labelled course and not sharing eye products. Materia does not invent a dose, drop clock, or course length.",
      "Tell your pharmacist about aminoglycoside allergy history, contact lens use, and ALL other eye medicines on your list.",
      "Report worsening redness, severe eye pain, swelling of the lids, or vision change early.",
      "Ask how to space other eye drops on the labelled pack — do not invent a personal schedule.",
      "If you get severe allergic swelling around the eyes or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical ophthalmic aminoglycoside njengoba kubhalwe kumkhiqizo onelebula — amathonsi ne-ointment ayahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-tobramycin eye kuvame ukufaka ukuqeda inkambo yelebula nokungabelani ngamakhiqizo amehlo. I-Materia ayiqambi umthamo, iwashi lathonsi, noma ubude benkambo.",
      "Tshela umkhiqizi ngomlando we-aminoglycoside allergy, ukusetshenziswa kwama-contact lens, NAWO WONKE amanye amaphilisi amehlo.",
      "Bika ukubomvu okuya ngokuba kubi, ubuhlungu beso obukhulu, ukuvuvuka kwezicabucabu, noma ukushintsha kokubona ngokushesha.",
      "Buza ukuthi amanye amathonsi amehlo ahlukaniswa kanjani kuphakethe onelebula — ungayiqiqi uhlelo lakho.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese oftalmiese aminoglikosied soos op die geëtiketteerde produk aangedui — druppels en salf verskil; bevestig die vorm wat jy gekry het.",
      "Tobramycin-oogberading sluit dikwels voltooiing van die geëtiketteerde kuur en nie deel van oogprodukte in. Materia versin nie ’n dosis, druppelklok of kuurduur nie.",
      "Sê vir jou apteker van aminoglikosied-allergiegeskiedenis, kontaklensgebruik, en ALLE ander oogmedisyne op jou lys.",
      "Rapporteer verergerende rooiheid, ernstige oogpyn, ooglidswelling, of sigverandering vroeg.",
      "Vra hoe om ander oogdruppels op die geëtiketteerde pak te spasieer — moenie ’n persoonlike skedule versin nie.",
      "As jy ernstige allergiese swelling rondom die oë of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical ophthalmic aminoglycoside ena hantle kamoo e hlalositsoeng holabel — mathopa le ointment lia fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea tobramycin eye hangata e kenyelletsa ho qeta thuto ea leibole le ho se arolelane lihlahiswa tsa mahlo. Materia ha e iqape tekanyo, nako ea thopa, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka histori ea aminoglycoside allergy, tšebeliso ea contact lens, le MERIANA EOHLE ea mahlo.",
      "Tlaleha bofubelu bo mpefala, bohloko ba leihlo bo matla, ho ruruha ha likoalo, kapa phetoho ea pono kapele.",
      "Botsa hore mathopa a mang a mahlo a lokela ho arola joang pakeng ea leibole — se ke oa iqapa kemiso ea hau.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical ophthalmic aminoglycoside ngokuchanekileyo njengoko kubhaliwe kwileyibhile — amathontsi ne-ointment iyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-tobramycin eye zihlala zibandakanya ukugqiba ikhosi yeleyibhile nokungabelani ngeemveliso zamehlo. I-Materia ayiyiqiqi idosi, iwotshi yethontsi, okanye ubude bekhosi.",
      "Xelela usokhemisti ngembali ye-aminoglycoside allergy, ukusetyenziswa kwe-contact lens, NAWO ONKE amanye amayeza amehlo.",
      "Xela ububomvu obuya kuba mbi, iintlungu zeliso ezinzima, ukudumba kwezicabucabu, okanye utshintsho lokubona kwangoko.",
      "Buza indlela amanye amathontsi amehlo afanele ahlulwe ngayo kwipakethi eneleyibhile — sukuyiqqa ishedyuli yakho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
