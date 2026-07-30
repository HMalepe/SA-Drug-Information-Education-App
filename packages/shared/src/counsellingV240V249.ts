/**
 * v240–v249 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V240_TO_V249: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-desogestrel": five(
    [
      "Take this progestogen-only pill exactly as directed on your labelled product — same-time habit is common counselling; confirm the label.",
      "Desogestrel counselling commonly includes spotting and asking how late pills should be handled on the labelled pack. Materia does not invent a dose, late-pill clock, or fertility score.",
      "Tell your pharmacist about unexplained vaginal bleeding, liver disease, and ALL other hormones on your list.",
      "Report severe abdominal pain, calf swelling, chest pain, or sudden vision change early.",
      "Ask how vomiting or diarrhoea affects your labelled pack — do not invent a catch-up plan.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le progestogen-only pill njengoba kubhalwe kumkhiqizo onelebula — umkhuba wesikhathi esifanayo uvame ukufundiswa; qinisekisa ilebula.",
      "Ukwelulekwa kwe-desogestrel kuvame ukufaka ukopha okuncane nokubuza ukuthi amaphilisi aseduze kakhulu aphathwa kanjani kuphakethe onelebula. I-Materia ayiqambi umthamo, iwashi lephilisi elidephile, noma isikali sokuzala.",
      "Tshela umkhiqizi ngokopha kwesibeletho okungachazeki, isifo sesibindi, NAWO WONKE amanye ama-hormone.",
      "Bika ubuhlungu besisu obukhulu, ukuvuvuka kweqakala, ubuhlungu besifuba, noma ukushintsha kokubona okuzumayo ngokushesha.",
      "Buza ukuthi ukuhlanza noma ukuhuda kuthinta kanjani iphakethe onelebula — ungayiqiqi uhlelo lokubuyisela.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie progestogeen-alleen pil soos op die geëtiketteerde produk aangedui — dieselfde-tyd gewoonte is algemene berading; bevestig die etiket.",
      "Desogestrel-berading sluit dikwels spotting in en vra hoe laat pille op die geëtiketteerde pak hanteer moet word. Materia versin nie ’n dosis, laat-pilklok of vrugbaarheidstelling nie.",
      "Sê vir jou apteker van onverklaarde vaginale bloeding, lewersiekte, en ALLE ander hormone op jou lys.",
      "Rapporteer ernstige buikpyn, kuitswelling, borspyn, of skielike sigverandering vroeg.",
      "Vra hoe braking of diarree jou geëtiketteerde pak beïnvloed — moenie ’n inhaalplan versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa progestogen-only pill ena hantle kamoo e hlalositsoeng holabel — tloaelo ea nako e tšoanang ke keletso e tloaelehileng; netefatsa leibole.",
      "Keletso ea desogestrel hangata e kenyelletsa ho tsoa mali ho fokolang le ho botsa hore lipilisi tse liehang li lokela ho tšoaroa joang pakeng ea leibole. Materia ha e iqape tekanyo, nako ea pilisi e liehang, kapa lintlha tsa ho ema.",
      "Bolella rakhemisi ka ho tsoa mali ha botona bo sa hlaloseng, lefu la sebete, le LIHOMONE TSOHLE tse ling.",
      "Tlaleha bohloko ba mpeng bo matla, ho ruruha ha leoto, bohloko ba sefuba, kapa phetoho ea pono ka tšohanyetso kapele.",
      "Botsa hore ho hlatsa kapa letšollo li ama joang paka ea hau e nang le leibole — se ke oa iqapa moralo oa ho tsosolosa.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le progestogen-only pill ngokuchanekileyo njengoko kubhaliwe kwileyibhile — umkhwa wexesha elifanayo uhlala ufundiswa; qinisekisa ileyibhile.",
      "Iingcebiso ze-desogestrel zihlala zibandakanya ukopha okuncinci nokubuza indlela iipilisi ezilibazisekileyo ezifanele ziphathwe ngayo kwipakethi eneleyibhile. I-Materia ayiyiqiqi idosi, iwotshi yepilisi elibazisekileyo, okanye amanqaku okuzala.",
      "Xelela usokhemisti ngokopha kwesibeleko okungachazekiyo, isifo sesibindi, NAZO ZONKE ezinye ii-hormone.",
      "Xela iintlungu zesisu ezinzima, ukudumba kweqakala, iintlungu zesifuba, okanye utshintsho lokubona ngequbuliso kwangoko.",
      "Buza indlela ukuhlanza okanye urhudo oluchaphazela ngayo ipakethi yakho eneleyibhile — sukuyiqqa isicwangciso sokubuyisela.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-drospirenone": five(
    [
      "Use this progestogen exactly as directed on your labelled combined product — it is usually part of a COC pack, not a freestyle solo plan.",
      "Drospirenone counselling commonly includes potassium and clot-risk discussions for combined products. Materia does not invent a dose, pill clock, potassium target, or clot score.",
      "Tell your pharmacist about kidney disease, high potassium history, clot history, and ALL other hormones or potassium-sparing medicines.",
      "Report calf pain with swelling, chest pain, sudden shortness of breath, or unusual weakness early.",
      "Ask how missed combined pills should be handled on your labelled pack — do not invent a catch-up plan.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le progestogen njengoba kubhalwe kumkhiqizo wakho ohlanganisiwe onelebula — kuvame ukuba yingxenye yephakethe ye-COC, hhayi uhlelo wedwa.",
      "Ukwelulekwa kwe-drospirenone kuvame ukufaka izingxoxo ze-potassium neqhwa kwimikhiqizo ehlanganisiwe. I-Materia ayiqambi umthamo, iwashi lephilisi, umgomo we-potassium, noma isikali seqhwa.",
      "Tshela umkhiqizi ngesifo sezinso, umlando we-potassium ephezulu, umlando weqhwa, NAWO WONKE amanye ama-hormone noma amaphilisi agcina i-potassium.",
      "Bika ubuhlungu beqakala nokuvuvuka, ubuhlungu besifuba, ukuphefumula kanzima okuzumayo, noma ubuthakathaka obungajwayelekile ngokushesha.",
      "Buza ukuthi amaphilisi ahlanganisiwe alahlekile kufanele aphathwe kanjani kuphakethe onelebula — ungayiqiqi uhlelo lokubuyisela.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie progestogeen soos op jou geëtiketteerde gekombineerde produk aangedui — dit is gewoonlik deel van ’n KOK-pak, nie ’n solo-vryestylplan nie.",
      "Drospirenoon-berading sluit dikwels kalium- en klont-risiko-besprekings vir gekombineerde produkte in. Materia versin nie ’n dosis, pilklok, kaliumteiken of klonttelling nie.",
      "Sê vir jou apteker van niersiekte, hoë-kaliumgeskiedenis, klontgeskiedenis, en ALLE ander hormone of kaliumsparende medisyne.",
      "Rapporteer kuitpyn met swelling, borspyn, skielike kortasem, of ongewone swakheid vroeg.",
      "Vra hoe gemiste gekombineerde pille op jou geëtiketteerde pak hanteer moet word — moenie ’n inhaalplan versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa progestogen ena hantle kamoo e hlalositsoeng sehlahiswa sa hau se kopantsoeng — hangata ke karolo ea paka ea COC, eseng moralo o le mong.",
      "Keletso ea drospirenone hangata e kenyelletsa lipuisano tsa potassium le kotsi ea tlala ea mali bakeng sa lihlahiswa tse kopantsoeng. Materia ha e iqape tekanyo, nako ea pilisi, sepheo sa potassium, kapa lintlha tsa tlala.",
      "Bolella rakhemisi ka lefu la liphio, histori ea potassium e phahameng, histori ea tlala ea mali, le LIHOMONE KAPA MERIANA EOHLE e bolokang potassium.",
      "Tlaleha bohloko ba leoto ka ho ruruha, bohloko ba sefuba, ho hema thata ka tšohanyetso, kapa bofokoli bo sa tloaelehang kapele.",
      "Botsa hore lipilisi tse kopantsoeng tse lahlehileng li lokela ho tšoaroa joang pakeng ea hau e nang le leibole — se ke oa iqapa moralo oa ho tsosolosa.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le progestogen ngokuchanekileyo njengoko kubhaliwe kwimveliso yakho edibeneyo eneleyibhile — ihlala iyinxalenye yepakethi ye-COC, hayi isicwangciso sodwa.",
      "Iingcebiso ze-drospirenone zihlala zibandakanya iingxoxo ze-potassium nomngcipheko weqhwa kwiimveliso ezidibeneyo. I-Materia ayiyiqiqi idosi, iwotshi yepilisi, usukelo lwe-potassium, okanye amanqaku eqhwa.",
      "Xelela usokhemisti ngesifo sezintso, imbali ye-potassium ephezulu, imbali yeqhwa, NAZO ZONKE ezinye ii-hormone okanye amayeza agcina i-potassium.",
      "Xela iintlungu zeqakala nokudumba, iintlungu zesifuba, uxinzelelo lokuphefumla ngequbuliso, okanye ubuthathaka obungaqhelekanga kwangoko.",
      "Buza indlela iipilisi ezidibeneyo ezilahlekileyo ezifanele ziphathwe ngayo kwipakethi yakho eneleyibhile — sukuyiqqa isicwangciso sokubuyisela.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-cabergoline": five(
    [
      "Take this dopamine agonist exactly as directed on your labelled product — prolactin and Parkinson’s uses differ; confirm why you were given it.",
      "Cabergoline counselling commonly includes nausea, dizziness on standing, and impulse-control discussions. Materia does not invent a dose or prolactin target.",
      "Tell your pharmacist about heart-valve history, psychiatric history, and ALL other dopamine medicines on your list.",
      "Report fainting, chest pain, unexplained breathlessness, or new gambling / spending urges early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you collapse, seize, get severe chest pain, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le dopamine agonist njengoba kubhalwe kumkhiqizo onelebula — i-prolactin ne-Parkinson kuyahluka; qinisekisa ukuthi unikewe ngani.",
      "Ukwelulekwa kwe-cabergoline kuvame ukufaka isicanucanu, isiyezi uma umile, nokuxoxa ngokulawula izinkanuko. I-Materia ayiqambi umthamo noma umgomo we-prolactin.",
      "Tshela umkhiqizi ngomlando we-valve yenhliziyo, umlando wengqondo, NAWO WONKE amanye amaphilisi e-dopamine.",
      "Bika ukuwa, ubuhlungu besifuba, ukuphefumula kanzima okungachazeki, noma izinkanuko ezisha zokugembula / ukuchitha ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uwa, uxhuzula, uthola ubuhlungu besifuba obukhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie dopamienagonis soos op die geëtiketteerde produk aangedui — prolaktien- en Parkinson-gebruike verskil; bevestig waarom jy dit ontvang het.",
      "Cabergolien-berading sluit dikwels naarheid, duiseligheid by staan, en impulsbeheer-besprekings in. Materia versin nie ’n dosis of prolaktienteiken nie.",
      "Sê vir jou apteker van hartklepgeskiedenis, psigiatriese geskiedenis, en ALLE ander dopamienmedisyne op jou lys.",
      "Rapporteer floute, borspyn, onverklaarde kortasem, of nuwe dobbel- / bestedingsdrange vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ineenstort, stuiptrek, ernstige borspyn of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa dopamine agonist ena hantle kamoo e hlalositsoeng holabel — tšebeliso ea prolactin le Parkinson ea fapana; netefatsa hore na u e filoe hobaneng.",
      "Keletso ea cabergoline hangata e kenyelletsa ho nyatsa, ho tsekela ha u ema, le lipuisano tsa taolo ea litakatso. Materia ha e iqape tekanyo kapa sepheo sa prolactin.",
      "Bolella rakhemisi ka histori ea valve ea pelo, histori ea kelello, le MERIANA EOHLE ea dopamine.",
      "Tlaleha ho akheha, bohloko ba sefuba, ho hema thata ho sa hlaloseng, kapa litakatso tse ncha tsa ho bapala chelete / ho sebelisa chelete kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u oa, u thothomela, u fumana bohloko ba sefuba bo matla, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le dopamine agonist ngokuchanekileyo njengoko kubhaliwe kwileyibhile — i-prolactin ne-Parkinson kuyahluka; qinisekisa ukuba unikwe ntoni.",
      "Iingcebiso ze-cabergoline zihlala zibandakanya isicanucanu, isiyezi xa umile, neengxoxo zokulawula izinkanuko. I-Materia ayiyiqiqi idosi okanye usukelo lwe-prolactin.",
      "Xelela usokhemisti ngembali ye-valve yentliziyo, imbali yengqondo, NAWO ONKE amanye amayeza e-dopamine.",
      "Xela ukuwa, iintlungu zesifuba, uxinzelelo lokuphefumla olungachazekiyo, okanye izinkanuko ezintsha zokungcakaza / ukuchitha kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba uwa, uyaxhuzula, ufumana iintlungu zesifuba ezinzima, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-anastrozole": five(
    [
      "Take this aromatase inhibitor exactly as directed on your labelled product — do not stop suddenly without your oncology clinician.",
      "Anastrozole counselling commonly includes joint aches, hot flushes, and bone-health discussions. Materia does not invent a dose or oestradiol / bone target.",
      "Tell your pharmacist about osteoporosis history, hormone therapies, and ALL other medicines on your list.",
      "Report new chest pain, unexplained shortness of breath, severe bone pain, or vaginal bleeding early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get sudden chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le aromatase inhibitor njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela we-oncology.",
      "Ukwelulekwa kwe-anastrozole kuvame ukufaka ubuhlungu bamajoyinti, ukushisa, nokuxoxa ngamathambo. I-Materia ayiqambi umthamo noma umgomo we-oestradiol / amathambo.",
      "Tshela umkhiqizi ngomlando we-osteoporosis, ama-hormone, NAWO WONKE amanye amaphilisi.",
      "Bika ubuhlungu besifuba obusha, ukuphefumula kanzima okungachazeki, ubuhlungu bamathambo obukhulu, noma ukopha kwesibeletho ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie aromatase-inhibeerder soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou onkologie-klinikus nie.",
      "Anastrosol-berading sluit dikwels gewrigspyn, warm flushes, en been-gesondheidbesprekings in. Materia versin nie ’n dosis of estradiol / beenteiken nie.",
      "Sê vir jou apteker van osteoporose-geskiedenis, hormoonterapieë, en ALLE ander medisyne op jou lys.",
      "Rapporteer nuwe borspyn, onverklaarde kortasem, ernstige beenpyn, of vaginale bloeding vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy skielike borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa aromatase inhibitor ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka ea oncology.",
      "Keletso ea anastrozole hangata e kenyelletsa bohloko ba manonyeletso, ho fubela, le lipuisano tsa bophelo ba masapo. Materia ha e iqape tekanyo kapa sepheo sa oestradiol / masapo.",
      "Bolella rakhemisi ka histori ea osteoporosis, liphekolo tsa lihomone, le MERIANA EOHLE e meng.",
      "Tlaleha bohloko ba sefuba bo hoha, ho hema thata ho sa hlaloseng, bohloko ba masapo bo matla, kapa ho tsoa mali ha botona kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le aromatase inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha we-oncology.",
      "Iingcebiso ze-anastrozole zihlala zibandakanya iintlungu zamajoyinti, ukubila, neengxoxo zempilo yamathambo. I-Materia ayiyiqiqi idosi okanye usukelo lwe-oestradiol / amathambo.",
      "Xelela usokhemisti ngembali ye-osteoporosis, unyango lwee-hormone, NAWO ONKE amanye amayeza.",
      "Xela iintlungu zesifuba ezintsha, uxinzelelo lokuphefumla olungachazekiyo, iintlungu zamathambo ezinzima, okanye ukopha kwesibeleko kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tamoxifen": five(
    [
      "Take this SERM exactly as directed on your labelled product — do not stop suddenly without your oncology clinician.",
      "Tamoxifen counselling commonly includes hot flushes, clot-risk teaching, and endometrial-bleeding watch. Materia does not invent a dose or clot score.",
      "Tell your pharmacist about clot history, unexplained vaginal bleeding, and ALL other hormones or antidepressants on your list.",
      "Report calf swelling, chest pain, sudden shortness of breath, or new vaginal bleeding early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le SERM njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela we-oncology.",
      "Ukwelulekwa kwe-tamoxifen kuvame ukufaka ukushisa, ukufundisa ngeqhwa, nokuqapha ukopha kwe-endometrium. I-Materia ayiqambi umthamo noma isikali seqhwa.",
      "Tshela umkhiqizi ngomlando weqhwa, ukopha kwesibeletho okungachazeki, NAWO WONKE amanye ama-hormone noma ama-antidepressant.",
      "Bika ukuvuvuka kweqakala, ubuhlungu besifuba, ukuphefumula kanzima okuzumayo, noma ukopha kwesibeletho okusha ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie SERM soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou onkologie-klinikus nie.",
      "Tamoksifen-berading sluit dikwels warm flushes, klont-risiko-onderrig, en endometrium-bloedingwaak in. Materia versin nie ’n dosis of klonttelling nie.",
      "Sê vir jou apteker van klontgeskiedenis, onverklaarde vaginale bloeding, en ALLE ander hormone of antidepressante op jou lys.",
      "Rapporteer kuitswelling, borspyn, skielike kortasem, of nuwe vaginale bloeding vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa SERM ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka ea oncology.",
      "Keletso ea tamoxifen hangata e kenyelletsa ho fubela, thuto ea kotsi ea tlala ea mali, le ho hlokomela ho tsoa mali ha endometrium. Materia ha e iqape tekanyo kapa lintlha tsa tlala.",
      "Bolella rakhemisi ka histori ea tlala ea mali, ho tsoa mali ha botona bo sa hlaloseng, le LIHOMONE KAPA LI-ANTIDEPRESSANT TSOHLE.",
      "Tlaleha ho ruruha ha leoto, bohloko ba sefuba, ho hema thata ka tšohanyetso, kapa ho tsoa mali ha botona ho hoha kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le SERM ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha we-oncology.",
      "Iingcebiso ze-tamoxifen zihlala zibandakanya ukubila, ukufundisa ngomngcipheko weqhwa, nokuqapha ukopha kwe-endometrium. I-Materia ayiyiqiqi idosi okanye amanqaku eqhwa.",
      "Xelela usokhemisti ngembali yeqhwa, ukopha kwesibeleko okungachazekiyo, NAZO ZONKE ezinye ii-hormone okanye ama-antidepressant.",
      "Xela ukudumba kweqakala, iintlungu zesifuba, uxinzelelo lokuphefumla ngequbuliso, okanye ukopha kwesibeleko okutsha kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-letrozole": five(
    [
      "Take this aromatase inhibitor exactly as directed on your labelled product — do not stop suddenly without your oncology clinician.",
      "Letrozole counselling commonly includes joint aches, hot flushes, and bone-health discussions. Materia does not invent a dose or oestradiol / bone target.",
      "Tell your pharmacist about osteoporosis history, hormone therapies, and ALL other medicines on your list.",
      "Report new chest pain, unexplained shortness of breath, severe bone pain, or vaginal bleeding early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get sudden chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le aromatase inhibitor njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela we-oncology.",
      "Ukwelulekwa kwe-letrozole kuvame ukufaka ubuhlungu bamajoyinti, ukushisa, nokuxoxa ngamathambo. I-Materia ayiqambi umthamo noma umgomo we-oestradiol / amathambo.",
      "Tshela umkhiqizi ngomlando we-osteoporosis, ama-hormone, NAWO WONKE amanye amaphilisi.",
      "Bika ubuhlungu besifuba obusha, ukuphefumula kanzima okungachazeki, ubuhlungu bamathambo obukhulu, noma ukopha kwesibeletho ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie aromatase-inhibeerder soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou onkologie-klinikus nie.",
      "Letrosol-berading sluit dikwels gewrigspyn, warm flushes, en been-gesondheidbesprekings in. Materia versin nie ’n dosis of estradiol / beenteiken nie.",
      "Sê vir jou apteker van osteoporose-geskiedenis, hormoonterapieë, en ALLE ander medisyne op jou lys.",
      "Rapporteer nuwe borspyn, onverklaarde kortasem, ernstige beenpyn, of vaginale bloeding vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy skielike borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa aromatase inhibitor ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka ea oncology.",
      "Keletso ea letrozole hangata e kenyelletsa bohloko ba manonyeletso, ho fubela, le lipuisano tsa bophelo ba masapo. Materia ha e iqape tekanyo kapa sepheo sa oestradiol / masapo.",
      "Bolella rakhemisi ka histori ea osteoporosis, liphekolo tsa lihomone, le MERIANA EOHLE e meng.",
      "Tlaleha bohloko ba sefuba bo hoha, ho hema thata ho sa hlaloseng, bohloko ba masapo bo matla, kapa ho tsoa mali ha botona kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le aromatase inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha we-oncology.",
      "Iingcebiso ze-letrozole zihlala zibandakanya iintlungu zamajoyinti, ukubila, neengxoxo zempilo yamathambo. I-Materia ayiyiqiqi idosi okanye usukelo lwe-oestradiol / amathambo.",
      "Xelela usokhemisti ngembali ye-osteoporosis, unyango lwee-hormone, NAWO ONKE amanye amayeza.",
      "Xela iintlungu zesifuba ezintsha, uxinzelelo lokuphefumla olungachazekiyo, iintlungu zamathambo ezinzima, okanye ukopha kwesibeleko kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-filgrastim": five(
    [
      "Use this G-CSF exactly as directed on your labelled product — injection technique belongs with your care team.",
      "Filgrastim counselling commonly includes bone pain and fever watch after chemotherapy. Materia does not invent a dose, injection schedule, or neutrophil target.",
      "Tell your pharmacist about sickle-cell history, spleen problems, and ALL other growth-factor products on your list.",
      "Report left-upper abdominal pain, shoulder-tip pain, or unexplained shortness of breath early.",
      "Ask how storage and missed doses fit your care plan — do not invent fridge temperatures or a catch-up plan.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le G-CSF njengoba kubhalwe kumkhiqizo onelebula — indlela yokujova ihambisana nethimba lakho lokunakekelwa.",
      "Ukwelulekwa kwe-filgrastim kuvame ukufaka ubuhlungu bamathambo nokuqapha umkhuhlane ngemva kwe-chemotherapy. I-Materia ayiqambi umthamo, uhlelo lokujova, noma umgomo we-neutrophil.",
      "Tshela umkhiqizi ngomlando we-sickle cell, izinkinga zespleen, NAWO WONKE amanye amakhiqizo e-growth factor.",
      "Bika ubuhlungu besisu esihlangothini esingenhla kwesokunxele, ubuhlungu be-shoulder tip, noma ukuphefumula kanzima okungachazeki ngokushesha.",
      "Buza ukuthi ukugcinwa nemithamo elahlekile kuhambisana kanjani nohlelo lwakho — ungayiqiqi amazinga efriji noma uhlelo lokubuyisela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie G-CSF soos op die geëtiketteerde produk aangedui — inspuitingstegniek behoort by jou sorgspan.",
      "Filgrastim-berading sluit dikwels beenpyn en koorswaak ná chemoterapie in. Materia versin nie ’n dosis, inspuitingskedule of neutrofielteiken nie.",
      "Sê vir jou apteker van sikkelsselgeskiedenis, miltprobleme, en ALLE ander groeifaktorprodukte op jou lys.",
      "Rapporteer linker-boonste buikpyn, skouerpuntpyn, of onverklaarde kortasem vroeg.",
      "Vra hoe berging en gemiste dosisse by jou sorgplan pas — moenie yskastemperature of ’n inhaalplan versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa G-CSF ena hantle kamoo e hlalositsoeng holabel — mokhoa oa ho enteoa ke oa sehlopha sa hau sa tlhokomelo.",
      "Keletso ea filgrastim hangata e kenyelletsa bohloko ba masapo le ho hlokomela feberu ka mor'a chemotherapy. Materia ha e iqape tekanyo, kemiso ea ho enteoa, kapa sepheo sa neutrophil.",
      "Bolella rakhemisi ka histori ea sickle cell, mathata a spleen, le LIHLAHISWA TSOHLE tsa growth factor.",
      "Tlaleha bohloko ba mpeng ka holimo ka letsohong le letšehali, bohloko ba ntlha ea lehetla, kapa ho hema thata ho sa hlaloseng kapele.",
      "Botsa hore polokelo le litekanyo tse lahlehileng li tšoana joang le moralo oa hau — se ke oa iqapa mocheso oa sehatsetsi kapa moralo oa ho tsosolosa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le G-CSF ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ubuchule bokutofa buhamba neqela lakho lokhathalelo.",
      "Iingcebiso ze-filgrastim zihlala zibandakanya iintlungu zamathambo nokuqapha umkhuhlane emva kwe-chemotherapy. I-Materia ayiyiqiqi idosi, ishedyuli yokutofa, okanye usukelo lwe-neutrophil.",
      "Xelela usokhemisti ngembali ye-sickle cell, iingxaki zespleen, NAZO ZONKE ezinye iimveliso ze-growth factor.",
      "Xela iintlungu zesisu ezingasentla ekhohlo, iintlungu zetip yegxalaba, okanye uxinzelelo lokuphefumla olungachazekiyo kwangoko.",
      "Buza indlela ugcino needosi ezilahlekileyo ezihambelana ngayo nesicwangciso sakho — sukuyiqqa amaqondo efriji okanye isicwangciso sokubuyisela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-aprepitant": five(
    [
      "Take this NK1 antagonist antiemetic exactly as directed on your labelled product — often timed with chemotherapy plans; confirm the labelled course.",
      "Aprepitant counselling commonly includes interaction checks with many medicines and contraceptives. Materia does not invent a dose, schedule hours, or nausea score.",
      "Tell your pharmacist about ALL other medicines, including warfarin, antifungals, and hormonal contraception on your list.",
      "Report severe dizziness, allergic rash, or persistent vomiting early for clinician review.",
      "Ask how this fits with your other antiemetics — do not invent a personal rescue schedule.",
      "If you get severe allergic swelling, fainting, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le NK1 antagonist antiemetic njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuhambisana nezinhlelo ze-chemotherapy; qinisekisa inkambo yelebula.",
      "Ukwelulekwa kwe-aprepitant kuvame ukufaka ukuhlola ukuxhumana namaphilisi amaningi nama-contraceptive. I-Materia ayiqambi umthamo, amahora ohlelo, noma isikali sesicanucanu.",
      "Tshela umkhiqizi NGOWO WONKE amanye amaphilisi, kuhlanganise i-warfarin, ama-antifungal, ne-hormonal contraception.",
      "Bika isiyezi esikhulu, ukuqubuka kwe-allergy, noma ukuhlanza okuqhubekayo ngokushesha.",
      "Buza ukuthi lokhu kuhambisana kanjani namanye ama-antiemetic — ungayiqiqi uhlelo lakho lokuzisindisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie NK1-antagonis-antiëmetikum soos op die geëtiketteerde produk aangedui — dikwels getimed met chemoterapieplanne; bevestig die geëtiketteerde kuur.",
      "Aprepitant-berading sluit dikwels interaksiekontroles met baie medisyne en voorbehoedmiddels in. Materia versin nie ’n dosis, skedule-ure of naarheidstelling nie.",
      "Sê vir jou apteker van ALLE ander medisyne, insluitend warfarin, antimikotika, en hormonale voorbehoeding op jou lys.",
      "Rapporteer ernstige duiseligheid, allergiese uitslag, of aanhoudende braking vroeg vir klinikus-hersiening.",
      "Vra hoe dit by jou ander antiëmetika pas — moenie ’n persoonlike reddingskedule versin nie.",
      "As jy ernstige allergiese swelling, floute, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa NK1 antagonist antiemetic ena hantle kamoo e hlalositsoeng holabel — hangata e lekantsoe le merero ea chemotherapy; netefatsa thuto ea leibole.",
      "Keletso ea aprepitant hangata e kenyelletsa litlhahlobo tsa ho sebelisana le meriana e mengata le li-contraceptive. Materia ha e iqape tekanyo, lihora tsa kemiso, kapa lintlha tsa ho nyatsa.",
      "Bolella rakhemisi ka MERIANA EOHLE e meng, ho kenyeletsoa warfarin, li-antifungal, le hormonal contraception.",
      "Tlaleha ho tsekela ho matla, lekhopho la allergy, kapa ho hlatsa ho tsoelang pele kapele.",
      "Botsa hore sena se tšoana joang le li-antiemetic tse ling — se ke oa iqapa kemiso ea hau ea ho iphelisa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho akheha, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le NK1 antagonist antiemetic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala ilungelelaniswa nezicwangciso ze-chemotherapy; qinisekisa ikhosi yeleyibhile.",
      "Iingcebiso ze-aprepitant zihlala zibandakanya ukujonga ukusebenzelana namayeza amaninzi nee-contraceptive. I-Materia ayiyiqiqi idosi, iiyure zeshedyuli, okanye amanqaku esicanucanu.",
      "Xelela usokhemisti NGAWO ONKE amanye amayeza, kuquka i-warfarin, ii-antifungal, ne-hormonal contraception.",
      "Xela isiyezi esinzima, irhashalala ye-allergy, okanye ukuhlanza okuqhubekayo kwangoko.",
      "Buza indlela oku kuhambelana ngayo nezinye ii-antiemetic — sukuyiqqa ishedyuli yakho yokuzisindisa.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-olopatadine": five(
    [
      "Use these ocular antihistamine / mast-cell stabiliser drops exactly as directed on your labelled product — usually one drop in the affected eye(s); confirm the label.",
      "Olopatadine counselling commonly includes temporary stinging and removing contact lenses before drops if the label advises. Materia does not invent a drop count or allergy score.",
      "Tell your pharmacist about other eye drops and contact-lens use on your list.",
      "Wait between different eye drops as the labelled product advises — do not invent spacing minutes.",
      "Report worsening redness, vision change, or swelling around the eyes early for clinician review.",
      "If you get severe allergic swelling around the eyes with trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa la ma-ocular antihistamine / mast-cell stabiliser drops njengoba kubhalwe kumkhiqizo onelebula — kuvame ithonsi eyodwa esweni elithintekile; qinisekisa ilebula.",
      "Ukwelulekwa kwe-olopatadine kuvame ukufaka ukushisa okwesikhashana nokususa ama-contact lens ngaphambi kwamathonsi uma ilebula icebisa. I-Materia ayiqambi inani lamathonsi noma isikali se-allergy.",
      "Tshela umkhiqizi ngamanye ama-eye drops nokusebenzisa ama-contact lens.",
      "Linda phakathi kwama-eye drops ahlukene njengoba umkhiqizo onelebula ucebisa — ungayiqiqi amaminithi okuhlukanisa.",
      "Bika ukubomvu okuya ngokuba kubi, ukushintsha kokubona, noma ukuvuvuka eduze kwamehlo ngokushesha.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo nokuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie okulêre antihistamien / maselsel-stabiliseerder-druppels soos op die geëtiketteerde produk aangedui — gewoonlik een druppel in die aangetaste oog/oë; bevestig die etiket.",
      "Olopatadien-berading sluit dikwels tydelike steek in en om kontaklense vóór druppels te verwyder as die etiket adviseer. Materia versin nie ’n druppeltelling of allergietelling nie.",
      "Sê vir jou apteker van ander oogdruppels en kontaklensgebruik op jou lys.",
      "Wag tussen verskillende oogdruppels soos die geëtiketteerde produk adviseer — moenie skeidingsminute versin nie.",
      "Rapporteer erger wordende rooiheid, sigverandering, of swelling rondom die oë vroeg vir klinikus-hersiening.",
      "As jy ernstige allergiese swelling rondom die oë met asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa li-ocular antihistamine / mast-cell stabiliser drops tsena hantle kamoo e hlalositsoeng holabel — hangata thopa e le 'ngoe leihlong le amehileng; netefatsa leibole.",
      "Keletso ea olopatadine hangata e kenyelletsa ho hlaba ha nakoana le ho tlosa li-contact lens pele ho mathopa haeba leibole e eletsa. Materia ha e iqape palo ea mathopa kapa lintlha tsa allergy.",
      "Bolella rakhemisi ka li-eye drops tse ling le tšebeliso ea li-contact lens.",
      "Ema pakeng tsa li-eye drops tse fapaneng kamoo sehlahiswa se nang le leibole e eletsang — se ke oa iqapa metsotso ea ho arola.",
      "Tlaleha bofubelu bo mpefalang, phetoho ea pono, kapa ho ruruha haufi le mahlo kapele.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo ka ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa la ma-ocular antihistamine / mast-cell stabiliser drops ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala ithontsi enye kwiliso elichaphazelekileyo; qinisekisa ileyibhile.",
      "Iingcebiso ze-olopatadine zihlala zibandakanya ukuhlaba okwethutyana nokususa ii-contact lens phambi kweethontsi ukuba ileyibhile icebisa. I-Materia ayiyiqiqi inani leethontsi okanye amanqaku e-allergy.",
      "Xelela usokhemisti ngezinye ii-eye drops nokusebenzisa ii-contact lens.",
      "Linda phakathi kwee-eye drops ezahlukeneyo njengoko imveliso eneleyibhile icebisa — sukuyiqqa imizuzu yokwahlula.",
      "Xela ukubomvu okubiayo, utshintsho lokubona, okanye ukudumba kufuphi namehlo kwangoko.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo noxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-chloramphenicol-eye": five(
    [
      "Use this topical ophthalmic antibiotic exactly as directed on your labelled product — drops and ointment differ; confirm the form you were given.",
      "Chloramphenicol eye counselling commonly includes completing the labelled course and not sharing eye products. Materia does not invent a dose, drop clock, or course length.",
      "Tell your pharmacist about eye injury, contact-lens use, and ALL other eye drops on your list.",
      "Wash hands before and after use — report worsening redness, vision loss, or swelling early.",
      "Ask how long the labelled course should run — do not invent a stop date.",
      "If you get severe allergic swelling around the eyes with trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical ophthalmic antibiotic njengoba kubhalwe kumkhiqizo onelebula — amathonsi ne-ointment ayahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-chloramphenicol eye kuvame ukufaka ukuqedela inkambo yelebula nokungabelani ngamakhiqizo amehlo. I-Materia ayiqambi umthamo, iwashi lethonsi, noma ubude benkambo.",
      "Tshela umkhiqizi ngokulimala kweso, ukusebenzisa ama-contact lens, NAWO WONKE amanye ama-eye drops.",
      "Geza izandla ngaphambi nangemva kokusebenzisa — bika ukubomvu okuya ngokuba kubi, ukulahlekelwa ukubona, noma ukuvuvuka ngokushesha.",
      "Buza ukuthi inkambo yelebula kufanele iqhubeke isikhathi esingakanani — ungayiqiqi usuku lokuyeka.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo nokuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese oftalmiese antibiotikum soos op die geëtiketteerde produk aangedui — druppels en salf verskil; bevestig die vorm wat jy ontvang het.",
      "Chloramfenikol-oogberading sluit dikwels in om die geëtiketteerde kuur te voltooi en nie oogprodukte te deel nie. Materia versin nie ’n dosis, druppelklok of kuurduur nie.",
      "Sê vir jou apteker van oogletsel, kontaklensgebruik, en ALLE ander oogdruppels op jou lys.",
      "Was hande voor en ná gebruik — rapporteer erger wordende rooiheid, sigverlies, of swelling vroeg.",
      "Vra hoe lank die geëtiketteerde kuur moet loop — moenie ’n stopdatum versin nie.",
      "As jy ernstige allergiese swelling rondom die oë met asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical ophthalmic antibiotic ena hantle kamoo e hlalositsoeng holabel — mathopa le ointment lia fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea chloramphenicol eye hangata e kenyelletsa ho qeta thuto ea leibole le ho se arolelane lihlahiswa tsa mahlo. Materia ha e iqape tekanyo, nako ea thopa, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka kotsi ea leihlo, tšebeliso ea li-contact lens, le LI-EYE DROPS TSOHLE.",
      "Hlatsoa matsoho pele le ka mor'a ho sebelisa — tlaleha bofubelu bo mpefalang, tahlehelo ea pono, kapa ho ruruha kapele.",
      "Botsa hore thuto ea leibole e lokela ho tsoela pele nako e kae — se ke oa iqapa letsatsi la ho emisa.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo ka ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical ophthalmic antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — amathontsi ne-ointment iyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-chloramphenicol eye zihlala zibandakanya ukugqiba ikhosi yeleyibhile nokungabelani ngeemveliso zamehlo. I-Materia ayiyiqiqi idosi, iwotshi yethontsi, okanye ubude bekhosi.",
      "Xelela usokhemisti ngokulimala kweliso, ukusetyenziswa kwee-contact lens, NAZO ZONKE ezinye ii-eye drops.",
      "Hlamba izandla phambi nasemva kokusebenzisa — xela ukubomvu okubiayo, ukulahlekelwa kukubona, okanye ukudumba kwangoko.",
      "Buza indlela ikhosi yeleyibhile ekufanele iqhubeke ngayo — sukuyiqqa umhla wokuyeka.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo noxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
