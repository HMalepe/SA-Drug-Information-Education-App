/**
 * v180–v189 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V180_TO_V189: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-cefuroxime": five(
    [
      "Take this cephalosporin antibiotic exactly as directed on your labelled product — complete the prescribed course.",
      "Cefuroxime counselling commonly includes stomach upset and diarrhoea watch — report bloody diarrhoea early. Materia does not invent a dose, meal clock, or course length.",
      "Tell your pharmacist about penicillin or cephalosporin allergy history and ALL other medicines on your list.",
      "Ask whether your labelled product should be taken with food — tablets and suspensions can differ.",
      "Report widespread rash, swelling of the face, or severe watery diarrhoea early for clinician review.",
      "If you get blistering rash with fever, trouble breathing, or collapse — seek emergency care.",
    ],
    [
      "Sebenzisa le cephalosporin antibiotic njengoba kubhalwe kumkhiqizo onelebula — qedela inkambo enikeziwe.",
      "Ukwelulekwa kwe-cefuroxime kuvame ukufaka ukucasuka kwesisu nokuqapha ukuhuda — bika ukuhuda kwegazi ngokushesha. I-Materia ayiqambi umthamo, iwashi lokudla, noma ubude benkambo.",
      "Tshela umkhiqizi ngomlando we-allergy ye-penicillin noma ye-cephalosporin NAWO WONKE amanye amaphilisi.",
      "Buza ukuthi umkhiqizo onelebula kufanele uthathwe nokudla yini — amaphilisi nama-suspension angahluka.",
      "Bika ukuqubuka okusabalele, ukuvuvuka kobuso, noma ukuhuda okumanzi okukhulu ngokushesha ukuze kubuyekezwe kudokotela.",
      "Uma uthola ukuqubuka okukhulu namaqhubu nomkhuhlane, ukuphefumula kanzima, noma ukuwa — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie cefalosporien-antibiotikum soos op die geëtiketteerde produk aangedui — voltooi die voorgeskryfde kuur.",
      "Sefuroksiem-berading sluit dikwels maagonstel en diarree-waak in — rapporteer bloedige diarree vroeg. Materia versin nie ’n dosis, maaltydklok of kuurduur nie.",
      "Sê vir jou apteker van penisillien- of cefalosporien-allergiegeskiedenis en ALLE ander medisyne op jou lys.",
      "Vra of jou geëtiketteerde produk met kos geneem moet word — tablette en suspensies kan verskil.",
      "Rapporteer wydverspreide uitslag, gesigswelling, of ernstige waterige diarree vroeg vir klinikus-hersiening.",
      "As jy blisteruitslag met koors, asemhalingsprobleme, of ineenstorting kry — soek noodhulp.",
    ],
    [
      "Sebelisa cephalosporin antibiotic ena hantle kamoo e hlalositsoeng holabel — qeta thuto e ngotsoeng.",
      "Keletso ea cefuroxime hangata e kenyelletsa ho tšoenyeha ha mpeng le ho hlokomela letšollo — tlaleha letšollo la mali kapele. Materia ha e iqape tekanyo, nako ea lijo, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka histori ea allergy ea penicillin kapa cephalosporin le MERIANA EOHLE e meng.",
      "Botsa hore na sehlahiswa sa hau se nang le leibole se lokela ho nkoa le lijo — litafole le li-suspension li ka fapana.",
      "Tlaleha lekhopho le atileng, ho ruruha ha sefahleho, kapa letšollo le metsi le matla kapele bakeng sa tlhahlobo ea ngaka.",
      "Haeba u fumana lekhopho le lihlabana ka feberu, ho hema thata, kapa ho oa — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le cephalosporin antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gqiba ikhosi enikiweyo.",
      "Iingcebiso ze-cefuroxime zihlala zibandakanya ukucaphuka kwesisu nokuqapha urhudo — xela urhudo lwegazi kwangoko. I-Materia ayiyiqiqi idosi, iwotshi yokutya, okanye ubude bekhosi.",
      "Xelela usokhemisti ngembali ye-allergy ye-penicillin okanye ye-cephalosporin NAWO ONKE amanye amayeza kuluhlu lwakho.",
      "Buza ukuba imveliso yakho eneleyibhile ifanele ithathwe nokutya na — iipilisi nee-suspension zinokuhluka.",
      "Xela irhashalala esasazekileyo, ukudumba kobuso, okanye urhudo olumanzi olunzima kwangoko ukuze kujongwe kugqirha.",
      "Ukuba ufumana irhashalala namaqhuma nomkhuhlane, uxinzelelo lokuphefumla, okanye ukuwa — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-lansoprazole": five(
    [
      "Take this proton-pump inhibitor exactly as directed on your labelled product — many products are best before food; confirm the label.",
      "Lansoprazole counselling commonly includes not crushing delayed-release capsules unless the labelled product allows. Materia does not invent a dose or meal clock.",
      "Tell your pharmacist about all antifungals, HIV medicines, clopidogrel plans, and long-term use questions on your care plan.",
      "Report black stools, coffee-ground vomit, severe diarrhoea, or new unexplained fractures early for clinician review.",
      "Ask how long the course should run on your care plan — do not invent a stop date or a rebound plan.",
      "If you get severe allergic swelling, trouble breathing, or vomiting blood — seek emergency care.",
    ],
    [
      "Sebenzisa le proton-pump inhibitor njengoba kubhalwe kumkhiqizo onelebula — imikhiqizo eminingi ilungile ngaphambi kokudla; qinisekisa ilebula.",
      "Ukwelulekwa kwe-lansoprazole kuvame ukufaka ukungachobozi ama-capsule e-delayed-release ngaphandle kokuvuma kwelebula. I-Materia ayiqambi umthamo noma iwashi lokudla.",
      "Tshela umkhiqizi ngawo wonke ama-antifungal, amaphilisi e-HIV, izinhlelo ze-clopidogrel, nemibuzo yokusebenzisa isikhathi eside ohlelweni lwakho.",
      "Bika izindlebe ezimnyama, ukuhlanza okufana nekofi, ukuhuda okukhulu, noma ukuphuka okungachazeki ngokushesha ukuze kubuyekezwe kudokotela.",
      "Buza ukuthi inkambo kufanele iqhubeke isikhathi esingakanani ohlelweni lwakho — ungayiqiqi usuku lokuyeka noma uhlelo lokubuyela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuphefumula kanzima, noma ukuhlanza igazi — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie protonpompinhibitor soos op die geëtiketteerde produk aangedui — baie produkte werk die beste voor kos; bevestig die etiket.",
      "Lansoprasool-berading sluit dikwels in om vertraagde-vrystelling-kapsules nie te vergruis nie tensy die geëtiketteerde produk dit toelaat. Materia versin nie ’n dosis of maaltydklok nie.",
      "Sê vir jou apteker van alle antimikotika, MIV-medisyne, clopidogrel-planne, en langtermyn-gebruikvrae op jou sorgplan.",
      "Rapporteer swart stoelgang, koffiegrond-braking, ernstige diarree, of nuwe onverklaarde frakture vroeg vir klinikus-hersiening.",
      "Vra hoe lank die kuur op jou sorgplan moet loop — moenie ’n stopdatum of terugslagplan versin nie.",
      "As jy ernstige allergiese swelling, asemhalingsprobleme, of bloed braking kry — soek noodhulp.",
    ],
    [
      "Sebelisa proton-pump inhibitor ena hantle kamoo e hlalositsoeng holabel — lihlahiswa tse ngata li sebetsa hantle pele ho lijo; netefatsa leibole.",
      "Keletso ea lansoprazole hangata e kenyelletsa ho se silafatse li-capsule tsa delayed-release ntle le tumello ea leibole. Materia ha e iqape tekanyo kapa nako ea lijo.",
      "Bolella rakhemisi ka li-antifungal tsohle, meriana ea HIV, merero ea clopidogrel, le lipotso tsa tšebeliso ea nako e telele moralong oa hau.",
      "Tlaleha litšila tse ntšo, ho hlatsa ho kang kofi, letšollo le matla, kapa ho robeha ho sa hlaloseng ho hoha kapele bakeng sa tlhahlobo ea ngaka.",
      "Botsa hore thuto e lokela ho tsoela pele nako e kae moralong oa hau — se ke oa iqapa letsatsi la ho emisa kapa moralo oa ho khutla.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho hema thata, kapa ho hlatsa mali — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le proton-pump inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iimveliso ezininzi zisebenza ngcono phambi kokutya; qinisekisa ileyibhile.",
      "Iingcebiso ze-lansoprazole zihlala zibandakanya ukungatyumzi iicapsule ze-delayed-release ngaphandle kokuvuma kweleyibhile. I-Materia ayiyiqiqi idosi okanye iwotshi yokutya.",
      "Xelela usokhemisti ngazo zonke ii-antifungal, amayeza e-HIV, izicwangciso ze-clopidogrel, nemibuzo yokusetyenziswa ixesha elide kwisicwangciso sakho.",
      "Xela izindlebe ezimnyama, ukuhlanza okufana nekofu, urhudo olunzima, okanye ukwaphuka okungachazekiyo kwangoko ukuze kujongwe kugqirha.",
      "Buza indlela ikhosi ekufanele iqhubeke ngayo kwisicwangciso sakho — sukuyiqqa umhla wokuyeka okanye isicwangciso sokubuyela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, uxinzelelo lokuphefumla, okanye ukuhlanza igazi — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-dexamethasone": five(
    [
      "Take this corticosteroid exactly as directed on your labelled product — do not stop suddenly after longer courses without your clinician.",
      "Dexamethasone counselling commonly includes blood-sugar rise, mood change, infection watch, and stomach irritation discussions. Materia does not invent a dose, taper schedule, or glucose target.",
      "Tell your pharmacist about diabetes, ulcer history, infections, vaccines planned soon, and ALL other steroids on your list.",
      "Take with food if the labelled product advises — report black stools or severe abdominal pain early.",
      "Ask how illness or missed doses should be handled on your care plan — do not invent a sick-day steroid schedule.",
      "If you get severe allergic swelling, trouble breathing, vomiting blood, or collapse with fever — seek emergency care.",
    ],
    [
      "Sebenzisa le corticosteroid njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngemva kwezinkambo ezinde ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-dexamethasone kuvame ukufaka ukukhuphuka koshukela, ukushintsha kwemizwa, ukugada izifo, nokuxoxa ngokucasuka kwesisu. I-Materia ayiqambi umthamo, uhlelo lokwehlisa, noma umgomo kashukela.",
      "Tshela umkhiqizi ngesifo sikashukela, umlando wesilonda, izifo, imigomo yokugoma ezayo, NAWO WONKE amanye ama-steroid.",
      "Thatha nokudla uma umkhiqizo onelebula ucebisa — bika izindlebe ezimnyama noma ubuhlungu besisu obukhulu ngokushesha.",
      "Buza ukuthi ukugula noma imithamo elahlekile kufanele iphathwe kanjani ohlelweni lwakho — ungayiqiqi uhlelo lwe-steroid lwezinsuku zokugula.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuphefumula kanzima, ukuhlanza igazi, noma ukuwa nomkhuhlane — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie kortikosteroïed soos op die geëtiketteerde produk aangedui — moenie skielik stop ná langer kuurse sonder jou klinikus nie.",
      "Deksametasoon-berading sluit dikwels bloedsuikerstyging, buiieverandering, infeksie-waak, en maagirritasie-besprekings in. Materia versin nie ’n dosis, afbou-skedule of glukoseteiken nie.",
      "Sê vir jou apteker van diabetes, ulkusgeskiedenis, infeksies, entstowwe wat binnekort beplan is, en ALLE ander steroïede op jou lys.",
      "Neem met kos as die geëtiketteerde produk dit adviseer — rapporteer swart stoelgang of ernstige buikpyn vroeg.",
      "Vra hoe siekte of gemiste dosisse op jou sorgplan hanteer moet word — moenie ’n siektedag-steroïedskedule versin nie.",
      "As jy ernstige allergiese swelling, asemhalingsprobleme, bloed braking, of ineenstorting met koors kry — soek noodhulp.",
    ],
    [
      "Sebelisa corticosteroid ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ka mor'a lithuto tse telele ntle le ngaka.",
      "Keletso ea dexamethasone hangata e kenyelletsa ho phahama ha tsoekere, phetoho ea maikutlo, ho hlokomela tšoaetso, le lipuisano tsa ho tšoenyeha ha mpeng. Materia ha e iqape tekanyo, kemiso ea ho theola, kapa sepheo sa tsoekere.",
      "Bolella rakhemisi ka diabetes, histori ea leqeba, tšoaetso, likenti tse reriloeng haufinyane, le LI-STEROID TSOHLE tse ling.",
      "Nka le lijo haeba sehlahiswa se nang le leibole se eletsa — tlaleha litšila tse ntšo kapa bohloko ba mpeng bo matla kapele.",
      "Botsa hore ho kula kapa litekanyo tse lahlehileng li lokela ho tšoaroa joang moralong oa hau — se ke oa iqapa kemiso ea steroid ea matsatsi a ho kula.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho hema thata, ho hlatsa mali, kapa ho oa ka feberu — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo emva kwekhosi ezinde ngaphandle kogqirha.",
      "Iingcebiso ze-dexamethasone zihlala zibandakanya ukunyuka kweswekile, utshintsho lwemeko, ukuqapha usulelo, neengxoxo zokucaphuka kwesisu. I-Materia ayiyiqiqi idosi, ishedyuli yokwehlisa, okanye usukelo lweswekile.",
      "Xelela usokhemisti ngesifo seswekile, imbali yesilonda, usulelo, iigofa ezicetyiweyo kungekudala, NAZO ZONKE ezinye ii-steroid kuluhlu lwakho.",
      "Thatha nokutya ukuba imveliso eneleyibhile icebisa — xela izindlebe ezimnyama okanye iintlungu zesisu ezinzima kwangoko.",
      "Buza indlela ukugula okanye iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwisicwangciso sakho — sukuyiqqa ishedyuli ye-steroid yeentsuku zokugula.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, uxinzelelo lokuphefumla, ukuhlanza igazi, okanye ukuwa nomkhuhlane — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-donepezil": five(
    [
      "Take this cholinesterase inhibitor exactly as directed on your labelled product — evening dosing is common counselling; confirm the label.",
      "Donepezil counselling commonly includes nausea, diarrhoea, vivid dreams, and heart-rate slowing discussions. Materia does not invent a dose or cognition score.",
      "Tell your pharmacist about heart rhythm history, ulcer or bleed risk, asthma/COPD, and ALL other medicines on your list.",
      "Report fainting, black stools, severe vomiting, or new wheeze early for clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours or a catch-up plan.",
      "If you collapse, seize, vomit blood, or get severe trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le cholinesterase inhibitor njengoba kubhalwe kumkhiqizo onelebula — ukuthatha kusihlwa kuvame ukufundiswa; qinisekisa ilebula.",
      "Ukwelulekwa kwe-donepezil kuvame ukufaka isicanucanu, ukuhuda, amaphupho acacile, nokuxoxa ngokwehla kwesivinini senhliziyo. I-Materia ayiqambi umthamo noma isikali sokuqonda.",
      "Tshela umkhiqizi ngomlando wesivinini senhliziyo, ingozi yesilonda noma yokopha, i-asthma/COPD, NAWO WONKE amanye amaphilisi.",
      "Bika ukuwa, izindlebe ezimnyama, ukuhlanza okukhulu, noma ukubhobha okusha ngokushesha ukuze kubuyekezwe kudokotela.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa noma uhlelo lokubuyisela.",
      "Uma uwa, uxhuzula, uhlanza igazi, noma uphefumula kanzima kakhulu — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie cholinesterase-inhibeerder soos op die geëtiketteerde produk aangedui — aanddosis is algemene berading; bevestig die etiket.",
      "Donepesil-berading sluit dikwels naarheid, diarree, lewendige drome, en hartklop-vertraging-besprekings in. Materia versin nie ’n dosis of kognisietelling nie.",
      "Sê vir jou apteker van hartritmegeskiedenis, ulkus- of bloedingrisiko, asma/COPD, en ALLE ander medisyne op jou lys.",
      "Rapporteer floute, swart stoelgang, ernstige braking, of nuwe piep vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure of ’n inhaalplan versin nie.",
      "As jy ineenstort, stuiptrek, bloed braak, of ernstige asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa cholinesterase inhibitor ena hantle kamoo e hlalositsoeng holabel — ho nka mantsiboea ke keletso e tloaelehileng; netefatsa leibole.",
      "Keletso ea donepezil hangata e kenyelletsa ho nyatsa, letšollo, litoro tse hlakileng, le lipuisano tsa ho fokotseha ha morethetho oa pelo. Materia ha e iqape tekanyo kapa lintlha tsa kelello.",
      "Bolella rakhemisi ka histori ea morethetho oa pelo, kotsi ea leqeba kapa ho tsoa mali, asthma/COPD, le MERIANA EOHLE e meng.",
      "Tlaleha ho akheha, litšila tse ntšo, ho hlatsa ho matla, kapa ho lla ha matšoa a hoha kapele bakeng sa tlhahlobo ea ngaka.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola kapa moralo oa ho tsosolosa.",
      "Haeba u oa, u thothomela, u hlatsa mali, kapa ho hema thata haholo — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le cholinesterase inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukuthatha ngokuhlwa kuhlala kufundiswa; qinisekisa ileyibhile.",
      "Iingcebiso ze-donepezil zihlala zibandakanya isicanucanu, urhudo, amaphupha acacileyo, neengxoxo zokucotha kwesingqisho sentliziyo. I-Materia ayiyiqiqi idosi okanye amanqaku okuqonda.",
      "Xelela usokhemisti ngembali yesingqisho sentliziyo, umngcipheko wesilonda okanye wokopha, i-asthma/COPD, NAWO ONKE amanye amayeza kuluhlu lwakho.",
      "Xela ukuwa, izindlebe ezimnyama, ukuhlanza okunzima, okanye ukurhotyo okutsha kwangoko ukuze kujongwe kugqirha.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula okanye isicwangciso sokubuyisela.",
      "Ukuba uwa, uyaxhuzula, uhlanza igazi, okanye uxinzelelo lokuphefumla olunzima — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tamsulosin": five(
    [
      "Take this alpha-blocker exactly as directed on your labelled product — often after the same meal each day; confirm the label.",
      "Tamsulosin counselling commonly includes dizziness on standing and ejaculation-change discussions. Materia does not invent a dose or blood-pressure target.",
      "Tell your pharmacist about cataract surgery plans, other blood-pressure medicines, and ALL alpha-blockers on your list.",
      "Rise slowly from sitting or lying — report fainting or severe light-headedness early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you collapse, get chest pain with trouble breathing, or a painful erection lasting far too long — seek emergency care.",
    ],
    [
      "Sebenzisa le alpha-blocker njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba ngemva kokudla okufanayo nsuku zonke; qinisekisa ilebula.",
      "Ukwelulekwa kwe-tamsulosin kuvame ukufaka isiyezi uma umile nokuxoxa ngokushintsha kwe-ejaculation. I-Materia ayiqambi umthamo noma umgomo womfutho wegazi.",
      "Tshela umkhiqizi ngezinhlelo zokuhlinzwa kwe-cataract, amanye amaphilisi omfutho wegazi, NAWO WONKE ama-alpha-blocker.",
      "Sukuma kancane uma uhleli noma ulele — bika ukuwa noma isiyezi esikhulu ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uwa, uthola ubuhlungu besifuba nokuphefumula kanzima, noma ukuqina kwenhliziyo yobulili okubuhlungu okuthatha isikhathi eside kakhulu — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie alfa-blokkeerder soos op die geëtiketteerde produk aangedui — dikwels ná dieselfde maaltyd elke dag; bevestig die etiket.",
      "Tamsulosien-berading sluit dikwels duiseligheid by staan en ejakulasieverandering-besprekings in. Materia versin nie ’n dosis of bloeddrukteiken nie.",
      "Sê vir jou apteker van katarakchirurgie-planne, ander bloeddrukmedisyne, en ALLE alfa-blokkeerders op jou lys.",
      "Staan stadig op vanaf sit of lê — rapporteer floute of ernstige lighoofdigheid vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ineenstort, borspyn met asemhalingsprobleme kry, of ’n pynlike ereksie wat veels te lank duur — soek noodhulp.",
    ],
    [
      "Sebelisa alpha-blocker ena hantle kamoo e hlalositsoeng holabel — hangata ka mor'a lijo tse tšoanang letsatsi le letsatsi; netefatsa leibole.",
      "Keletso ea tamsulosin hangata e kenyelletsa ho tsekela ha u ema le lipuisano tsa phetoho ea ejaculation. Materia ha e iqape tekanyo kapa sepheo sa khatello ea mali.",
      "Bolella rakhemisi ka merero ea opereishene ea cataract, meriana e meng ea khatello ea mali, le LI-ALPHA-BLOCKER TSOHLE.",
      "Ema butle ho tloha ho lula kapa ho robala — tlaleha ho akheha kapa ho tsekela ho matla kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u oa, u fumana bohloko ba sefuba ka ho hema thata, kapa ho otlolla ha botona bo bohloko bo nkang nako e telele haholo — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le alpha-blocker ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala ithathwa emva kwesidlo esifanayo yonke imihla; qinisekisa ileyibhile.",
      "Iingcebiso ze-tamsulosin zihlala zibandakanya isiyezi xa umile neengxoxo zotshintsho lwe-ejaculation. I-Materia ayiyiqiqi idosi okanye usukelo loxinzelelo lwegazi.",
      "Xelela usokhemisti ngezicwangciso zotyando lwe-cataract, amanye amayeza oxinzelelo lwegazi, NAZO ZONKE ii-alpha-blocker kuluhlu lwakho.",
      "Suka kancinci xa uhleli okanye ulele — xela ukuwa okanye isiyezi esinzima kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba uwa, ufumana iintlungu zesifuba noxinzelelo lokuphefumla, okanye ukuqina kobudoda obubuhlungu obuthatha ixesha elide kakhulu — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-finasteride": five(
    [
      "Take this 5-alpha-reductase inhibitor exactly as directed on your labelled product — benefits may take time; confirm the labelled course.",
      "Finasteride counselling commonly includes sexual side-effect discussions and not handling crushed tablets if pregnant. Materia does not invent a dose or PSA target.",
      "Tell your pharmacist about pregnancy plans in the household, liver history, and ALL other prostate medicines on your list.",
      "Report breast changes, severe mood change, or allergic swelling early for clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le 5-alpha-reductase inhibitor njengoba kubhalwe kumkhiqizo onelebula — izinzuzo zingathatha isikhathi; qinisekisa inkambo yelebula.",
      "Ukwelulekwa kwe-finasteride kuvame ukufaka izingxoxo zemiphumela eceleni yezocansi nokungaphathi amaphilisi achoboziwe uma ukhulelwe. I-Materia ayiqambi umthamo noma umgomo we-PSA.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa ekhaya, umlando wesibindi, NAWO WONKE amanye amaphilisi e-prostate.",
      "Bika ukushintsha kwebele, ukushintsha kwemizwa okukhulu, noma ukuvuvuka kwe-allergy ngokushesha ukuze kubuyekezwe kudokotela.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie 5-alfa-reduktase-inhibeerder soos op die geëtiketteerde produk aangedui — voordele mag tyd neem; bevestig die geëtiketteerde kuur.",
      "Finasteried-berading sluit dikwels seksuele newe-effekbesprekings in en om nie vergruisde tablette te hanteer as jy swanger is nie. Materia versin nie ’n dosis of PSA-teiken nie.",
      "Sê vir jou apteker van swangerskapsplanne in die huishouding, lewergeskiedenis, en ALLE ander prostaatmedisyne op jou lys.",
      "Rapporteer borsveranderinge, ernstige buiieverandering, of allergiese swelling vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa 5-alpha-reductase inhibitor ena hantle kamoo e hlalositsoeng holabel — melemo e ka nka nako; netefatsa thuto ea leibole.",
      "Keletso ea finasteride hangata e kenyelletsa lipuisano tsa liphello tse mpe tsa thobalano le ho se tšoare litafole tse silafalitsoeng haeba u imme. Materia ha e iqape tekanyo kapa sepheo sa PSA.",
      "Bolella rakhemisi ka merero ea ho ima lapeng, histori ea sebete, le MERIANA EOHLE ea prostate.",
      "Tlaleha liphetoho tsa matsoele, phetoho e matla ea maikutlo, kapa ho ruruha ha allergy kapele bakeng sa tlhahlobo ea ngaka.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le 5-alpha-reductase inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — izibonelelo zinokuthatha ixesha; qinisekisa ikhosi yeleyibhile.",
      "Iingcebiso ze-finasteride zihlala zibandakanya iingxoxo zemiphumo ecaleni yezesondo nokungaphathi iipilisi ezityumziweyo ukuba ukhulelwe. I-Materia ayiyiqiqi idosi okanye usukelo lwe-PSA.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa ekhaya, imbali yesibindi, NAWO ONKE amanye amayeza e-prostate kuluhlu lwakho.",
      "Xela utshintsho lwamabele, utshintsho lwemeko olunzima, okanye ukudumba kwe-allergy kwangoko ukuze kujongwe kugqirha.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-desloratadine": five(
    [
      "Take this non-sedating antihistamine exactly as directed on your labelled product — confirm timing against the label.",
      "Desloratadine counselling commonly includes less drowsiness than older antihistamines, but alcohol can still add sedation. Materia does not invent a dose or sedation score.",
      "Tell your pharmacist about kidney or liver history and ALL other antihistamines or cold medicines on your list.",
      "Report severe dizziness, palpitations, or widespread rash early for clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antihistamine engaozelisi kakhulu njengoba kubhalwe kumkhiqizo onelebula — qinisekisa isikhathi kulebula.",
      "Ukwelulekwa kwe-desloratadine kuvame ukufaka ukozela okuncane kunama-antihistamine amadala, kodwa utshwala lusengangeza ukozela. I-Materia ayiqambi umthamo noma isikali sokozela.",
      "Tshela umkhiqizi ngomlando wezinso noma wesibindi NAWO WONKE amanye ama-antihistamine noma amaphilisi engcongolo.",
      "Bika isiyezi esikhulu, ukushaya kwenhliziyo, noma ukuqubuka okusabalele ngokushesha ukuze kubuyekezwe kudokotela.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie nie-sederende antihistamien soos op die geëtiketteerde produk aangedui — bevestig tydsberekening teen die etiket.",
      "Desloratadien-berading sluit dikwels minder slaperigheid as ouer antihistamiene in, maar alkohol kan steeds sedasie byvoeg. Materia versin nie ’n dosis of sedasietelling nie.",
      "Sê vir jou apteker van nier- of lewergeskiedenis en ALLE ander antihistamiene of verkouemedisyne op jou lys.",
      "Rapporteer ernstige duiseligheid, hartklopgings, of wydverspreide uitslag vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antihistamine e sa otseleng haholo hantle kamoo e hlalositsoeng holabel — netefatsa nako holabel.",
      "Keletso ea desloratadine hangata e kenyelletsa ho otsela ho fokolang ho feta li-antihistamine tsa khale, empa joala le eona e ka eketsa ho otsela. Materia ha e iqape tekanyo kapa lintlha tsa ho otsela.",
      "Bolella rakhemisi ka histori ea liphio kapa sebete le LI-ANTIHISTAMINE KAPA MERIANA EA SEFUBA EOHLE.",
      "Tlaleha ho tsekela ho matla, ho otla ha pelo, kapa lekhopho le atileng kapele bakeng sa tlhahlobo ea ngaka.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antihistamine engaozelisiyo kakhulu ngokuchanekileyo njengoko kubhaliwe kwileyibhile — qinisekisa ixesha kwileyibhile.",
      "Iingcebiso ze-desloratadine zihlala zibandakanya ukozela okuncinci kunee-antihistamine ezindala, kodwa utywala lusangenisa ukozela. I-Materia ayiyiqiqi idosi okanye amanqaku okozela.",
      "Xelela usokhemisti ngembali yezintso okanye yesibindi NAZO ZONKE ezinye ii-antihistamine okanye amayeza engqele kuluhlu lwakho.",
      "Xela isiyezi esinzima, ukubetha kwentliziyo, okanye irhashalala esasazekileyo kwangoko ukuze kujongwe kugqirha.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-febuxostat": five(
    [
      "Take this xanthine-oxidase inhibitor exactly as directed on your labelled product — it is not a sudden gout-pain rescue unless your clinician says otherwise.",
      "Febuxostat counselling commonly includes flare risk when starting and liver-watch discussions. Materia does not invent a dose, uric-acid target, or flare schedule.",
      "Tell your pharmacist about heart disease history, allopurinol allergy history, liver disease, and ALL other gout medicines.",
      "Report chest pain, severe rash, yellow eyes, or unexplained fever early for clinician review.",
      "Ask how acute flare medicines fit your care plan — do not invent a personal rescue dose.",
      "If you get severe chest pain, blistering rash with fever, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le xanthine-oxidase inhibitor njengoba kubhalwe kumkhiqizo onelebula — akuyona i-rescue yobuhlungu be-gout obuzumayo ngaphandle kokusho kukadokotela.",
      "Ukwelulekwa kwe-febuxostat kuvame ukufaka ingozi yokuvutha uma uqala nokuxoxa ngokuqapha isibindi. I-Materia ayiqambi umthamo, umgomo we-uric acid, noma uhlelo lokuvutha.",
      "Tshela umkhiqizi ngomlando wesifo senhliziyo, umlando we-allergy ye-allopurinol, isifo sesibindi, NAWO WONKE amanye amaphilisi e-gout.",
      "Bika ubuhlungu besifuba, ukuqubuka okukhulu, amehlo aphuzi, noma umkhuhlane ongachazeki ngokushesha ukuze kubuyekezwe kudokotela.",
      "Buza ukuthi amaphilisi okuvutha okuzumayo ahambisana kanjani nohlelo lwakho — ungayiqiqi umthamo wokuzisindisa.",
      "Uma uthola ubuhlungu besifuba obukhulu, ukuqubuka okukhulu namaqhubu nomkhuhlane, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie xanthienoksidase-inhibeerder soos op die geëtiketteerde produk aangedui — dit is nie ’n skielike jiggrana-pynredding nie tensy jou klinikus anders sê.",
      "Febuksostat-berading sluit dikwels opvlammingsrisiko by begin en lewerwaak-besprekings in. Materia versin nie ’n dosis, uriensuurteiken of opvlammingskedule nie.",
      "Sê vir jou apteker van hartsiektegeskiedenis, allopurinol-allergiegeskiedenis, lewersiekte, en ALLE ander jiggrana-medisyne.",
      "Rapporteer borspyn, ernstige uitslag, geel oë, of onverklaarde koors vroeg vir klinikus-hersiening.",
      "Vra hoe akute opvlammingsmedisyne by jou sorgplan pas — moenie ’n persoonlike reddingsdosis versin nie.",
      "As jy ernstige borspyn, blisteruitslag met koors, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa xanthine-oxidase inhibitor ena hantle kamoo e hlalositsoeng holabel — ha se rescue ea bohloko ba gout ba tšohanyetso ntle le ha ngaka e re joalo.",
      "Keletso ea febuxostat hangata e kenyelletsa kotsi ea ho bela ha u qala le lipuisano tsa ho hlokomela sebete. Materia ha e iqape tekanyo, sepheo sa uric acid, kapa kemiso ea ho bela.",
      "Bolella rakhemisi ka histori ea lefu la pelo, histori ea allergy ea allopurinol, lefu la sebete, le MERIANA EOHLE ea gout.",
      "Tlaleha bohloko ba sefuba, lekhopho le matla, mahlo a mosehla, kapa feberu e sa hlaloseng kapele bakeng sa tlhahlobo ea ngaka.",
      "Botsa hore meriana ea ho bela ka tšohanyetso e tšoana joang le moralo oa hau — se ke oa iqapa tekanyo ea ho iphelisa.",
      "Haeba u fumana bohloko ba sefuba bo matla, lekhopho le lihlabana ka feberu, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le xanthine-oxidase inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ayiyonto i-rescue yeentlungu ze-gout ezingxamisekileyo ngaphandle kokuba ugqirha athi kunjalo.",
      "Iingcebiso ze-febuxostat zihlala zibandakanya umngcipheko wokuvutha xa uqala neengxoxo zokuqapha isibindi. I-Materia ayiyiqiqi idosi, usukelo lwe-uric acid, okanye ishedyuli yokuvutha.",
      "Xelela usokhemisti ngembali yesifo sentliziyo, imbali ye-allergy ye-allopurinol, isifo sesibindi, NAWO ONKE amanye amayeza e-gout.",
      "Xela iintlungu zesifuba, irhashalala enzima, amehlo atyheli, okanye umkhuhlane ongachazekiyo kwangoko ukuze kujongwe kugqirha.",
      "Buza indlela amayeza okuvutha okukhawulezayo ahambelana ngayo nesicwangciso sakho — sukuyiqqa idosi yokuzisindisa.",
      "Ukuba ufumana iintlungu zesifuba ezinzima, irhashalala namaqhuma nomkhuhlane, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-isosorbide-mn": five(
    [
      "Take this nitrate exactly as directed on your labelled product — timing gaps matter for some regimens; confirm the labelled schedule.",
      "Isosorbide mononitrate counselling commonly includes headache and dizziness on standing — do not combine with erectile-dysfunction nitrates/PDE5 inhibitors. Materia does not invent a dose, nitrate-free interval, or blood-pressure target.",
      "Tell your pharmacist about ALL blood-pressure and erectile-dysfunction medicines on your list before starting.",
      "Sit or lie down if dizzy — report fainting or severe chest pain that does not settle as your clinician advised.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours or a catch-up plan.",
      "If chest pain is crushing or lasts despite your written plan, or lips turn blue — seek emergency care.",
    ],
    [
      "Sebenzisa le nitrate njengoba kubhalwe kumkhiqizo onelebula — izikhala zesikhathi zibalulekile kwezinye izinhlelo; qinisekisa uhlelo lwelebula.",
      "Ukwelulekwa kwe-isosorbide mononitrate kuvame ukufaka ikhanda elibuhlungu nesiyezi uma umile — ungahlanganisi nama-nitrate/PDE5 e-erectile dysfunction. I-Materia ayiqambi umthamo, isikhathi esingenayo i-nitrate, noma umgomo womfutho wegazi.",
      "Tshela umkhiqizi NGOWO WONKE amaphilisi omfutho wegazi nawokungaqini kwenhliziyo yobulili ngaphambi kokuqala.",
      "Hlala noma ulale uma unesiyezi — bika ukuwa noma ubuhlungu besifuba obukhulu obungathambi njengoba udokotela ecebise.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa noma uhlelo lokubuyisela.",
      "Uma ubuhlungu besifuba bucindezela noma buqhubeka naphezu kohlelo lwakho olubhaliwe, noma izindebe ziba luhlaza — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie nitraat soos op die geëtiketteerde produk aangedui — tydsgapings is belangrik vir sommige regimens; bevestig die geëtiketteerde skedule.",
      "Isosorbiedmononitraat-berading sluit dikwels hoofpyn en duiseligheid by staan in — moenie met erektiele-disfunksie-nitrate/PDE5-inhibeerders kombineer nie. Materia versin nie ’n dosis, nitraatvrye interval of bloeddrukteiken nie.",
      "Sê vir jou apteker van ALLE bloeddruk- en erektiele-disfunksiemedisyne op jou lys vóór jy begin.",
      "Sit of lê as jy duiselig is — rapporteer floute of ernstige borspyn wat nie bedaar soos jou klinikus adviseer nie.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure of ’n inhaalplan versin nie.",
      "As borspyn verpletterend is of voortduur ten spyte van jou geskrewe plan, of lippe blou word — soek noodhulp.",
    ],
    [
      "Sebelisa nitrate ena hantle kamoo e hlalositsoeng holabel — likheo tsa nako li bohlokoa bakeng sa li-regimen tse ling; netefatsa kemiso ea leibole.",
      "Keletso ea isosorbide mononitrate hangata e kenyelletsa hlooho e bohloko le ho tsekela ha u ema — se ke oa e kopanya le li-nitrate/PDE5 tsa erectile dysfunction. Materia ha e iqape tekanyo, nako e se nang nitrate, kapa sepheo sa khatello ea mali.",
      "Bolella rakhemisi ka MERIANA EOHLE ea khatello ea mali le ea erectile dysfunction pele u qala.",
      "Lula kapa o robaleng haeba u tsekela — tlaleha ho akheha kapa bohloko ba sefuba bo matla bo sa kokobeleng kamoo ngaka e eletsang.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola kapa moralo oa ho tsosolosa.",
      "Haeba bohloko ba sefuba bo hatella kapa bo tsoela pele leha u na le moralo o ngotsoeng, kapa melomo e fetoha boputsoa — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le nitrate ngokuchanekileyo njengoko kubhaliwe kwileyibhile — izithuba zexesha zibalulekile kwezinye iirejimeni; qinisekisa ishedyuli yeleyibhile.",
      "Iingcebiso ze-isosorbide mononitrate zihlala zibandakanya intloko ebuhlungu nesiyezi xa umile — sukudibanisa nee-nitrate/PDE5 ze-erectile dysfunction. I-Materia ayiyiqiqi idosi, ixesha elingenayo i-nitrate, okanye usukelo loxinzelelo lwegazi.",
      "Xelela usokhemisti NGAWO ONKE amayeza oxinzelelo lwegazi nawokungaqini kobudoda kuluhlu lwakho phambi kokuqala.",
      "Hlala okanye ulale ukuba unesiyezi — xela ukuwa okanye iintlungu zesifuba ezinzima ezingathomalaliyo njengoko ugqirha ecebise.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula okanye isicwangciso sokubuyisela.",
      "Ukuba iintlungu zesifuba ziyacinezela okanye ziyaqhubeka naphezu kwesicwangciso sakho esibhaliweyo, okanye imilebe iba luhlaza — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-leflunomide": five(
    [
      "Take this DMARD exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Leflunomide counselling commonly includes infection watch, liver monitoring discussions, and pregnancy-avoidance teaching. Materia does not invent a dose or lab target.",
      "Tell your pharmacist about pregnancy or breastfeeding plans, liver disease, and ALL other immunosuppressants on your list.",
      "Report fever, sore throat, unexplained bruising, severe rash, or yellow eyes early.",
      "Ask how washout plans work if pregnancy is desired — do not invent a personal washout schedule.",
      "If you get blistering rash with fever, severe shortness of breath, or yellow eyes with abdominal pain — seek emergency care.",
    ],
    [
      "Sebenzisa le DMARD njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-leflunomide kuvame ukufaka ukugada izifo, ukuxoxa ngokuqapha isibindi, nokufundisa ukugwema ukukhulelwa. I-Materia ayiqambi umthamo noma umgomo welabhorethri.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa noma zokuncelisa, isifo sesibindi, NAWO WONKE amanye ama-immunosuppressant.",
      "Bika umkhuhlane, umphimbo obuhlungu, amabala aluhlaza angachazeki, ukuqubuka okukhulu, noma amehlo aphuzi ngokushesha.",
      "Buza ukuthi izinhlelo zokuhlanzwa zisebenza kanjani uma kufunwa ukukhulelwa — ungayiqiqi uhlelo lakho lokuhlanzwa.",
      "Uma uthola ukuqubuka okukhulu namaqhubu nomkhuhlane, ukuphefumula kanzima kakhulu, noma amehlo aphuzi nobuhlungu besisu — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie DMARD soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Leflunomied-berading sluit dikwels infeksie-waak, lewermonitering-besprekings, en swangerskap-vermydingsonderrig in. Materia versin nie ’n dosis of labteiken nie.",
      "Sê vir jou apteker van swangerskap- of borsvoedingplanne, lewersiekte, en ALLE ander immuunonderdrukkers op jou lys.",
      "Rapporteer koors, seer keel, onverklaarde kneusings, ernstige uitslag, of geel oë vroeg.",
      "Vra hoe uitspoelplanne werk as swangerskap verlang word — moenie ’n persoonlike uitspoelskedeule versin nie.",
      "As jy blisteruitslag met koors, ernstige kortasem, of geel oë met buikpyn kry — soek noodhulp.",
    ],
    [
      "Sebelisa DMARD ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea leflunomide hangata e kenyelletsa ho hlokomela tšoaetso, lipuisano tsa ho hlokomela sebete, le thuto ea ho qoba ho ima. Materia ha e iqape tekanyo kapa sepheo sa lab.",
      "Bolella rakhemisi ka merero ea ho ima kapa ho anyesa, lefu la sebete, le LI-IMMUNOSUPPRESSANT TSOHLE.",
      "Tlaleha feberu, 'metso o bohloko, matheba a sootho a sa hlaloseng, lekhopho le matla, kapa mahlo a mosehla kapele.",
      "Botsa hore meralo ea ho hlatsoa e sebetsa joang haeba ho ima ho batloa — se ke oa iqapa kemiso ea hau ea ho hlatsoa.",
      "Haeba u fumana lekhopho le lihlabana ka feberu, ho hema thata haholo, kapa mahlo a mosehla ka bohloko ba mpeng — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le DMARD ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-leflunomide zihlala zibandakanya ukuqapha usulelo, iingxoxo zokuqapha isibindi, nokufundisa ukuphepha ukukhulelwa. I-Materia ayiyiqiqi idosi okanye usukelo lwelabhorethri.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa okanye zokuncancisa, isifo sesibindi, NAZO ZONKE ezinye ii-immunosuppressant kuluhlu lwakho.",
      "Xela umkhuhlane, umqala obuhlungu, amabala aluhlaza angachazekiyo, irhashalala enzima, okanye amehlo atyheli kwangoko.",
      "Buza indlela izicwangciso zokuhlamba zisebenza ngayo ukuba kufunwa ukukhulelwa — sukuyiqqa ishedyuli yakho yokuhlamba.",
      "Ukuba ufumana irhashalala namaqhuma nomkhuhlane, uxinzelelo lokuphefumla olunzima, okanye amehlo atyheli neentlungu zesisu — funa uncedo olungxamisekileyo.",
    ],
  ),
};
