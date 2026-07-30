/**
 * v404–v415 deepened SA counselling batch (6 lines × 5 langs) — deepen thin core/high-volume scripts.
 * Original Materia educational scripts only — no invented mg doses, viral-load targets,
 * INR targets, eGFR cut-offs, or hour schedules. Overrides thinner v90–v120 entries via spread order.
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

export const COUNSELLING_V404_TO_V415: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-tdf": five(
    [
      "Tenofovir disoproxil (TDF) is an NRTI used in South African HIV ART and selected hepatitis B pathways — daily adherence supports clinician-directed care.",
      "Materia does not invent a dose, eGFR cut-off, bone-monitoring interval, or viral-load target — confirm against current SA HIV/STG guidance and the labelled product.",
      "Tell your pharmacist about kidney history, NSAIDs, other antivirals, and ALL medicines or herbals you take.",
      "Ask what kidney and bone checks are planned and what reduced urine, bone pain, or new swelling should trigger review.",
      "This informs professional judgement — do not stop or share ART without the prescribing team.",
      "If severe rash with fever, yellow eyes, sudden facial swelling, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-tenofovir disoproxil (TDF) i-NRTI esetshenziswa ezinhlelweni ze-HIV ART zaseNingizimu Afrika nasezindleleni ezikhethiwe ze-hepatitis B — ukuthatha nsuku zonke kusekela ukunakekelwa okulawulwa udokotela.",
      "I-Materia ayiqambi umthamo, umkhawulo we-eGFR, isikhathi sokuqapha amathambo, noma umgomo we-viral load — qinisekisa nesiqondiso se-HIV/STG saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngomlando wezinso, ama-NSAIDs, amanye ama-antiviral, nawo WONKE amaphilisi noma ama-herbal owathathayo.",
      "Buza ukuthi yimaphi ukuhlolwa kwezinso namathambo okucwangisiwe nokuthi umchamo omncane, ubuhlungu bamathambo, noma ukuvuvuka okusha kufanele kuqale ukubuyekezwa.",
      "Lokhu kuchaza isigqi — ungayeki noma wabelane nge-ART ngaphandle kwethimba elibhalisile.",
      "Uma ukuqubuka okukhulu nomkhuhlane, amehlo aphuzi, ukuvuvuka kobuso okuzumayo, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Tenofovir-disoproksiel (TDF) is 'n NRTI in Suid-Afrikaanse MIV-ART en geselekteerde hepatitis B-paaie — daaglikse nakoming ondersteun klinikus-gerigte sorg.",
      "Materia versin nie 'n dosis, eGFR-afsnit, beenmoniteringsinterval of virale-ladingteiken nie — bevestig teen huidige SA MIV/STG-riglyne en die geëtiketteerde produk.",
      "Sê vir jou apteker van niergeskiedenis, NSAIDs, ander antivirale middels, en ALLE medisyne of kruie wat jy neem.",
      "Vra watter nier- en beentoetse beplan is en watter verminderde urine, beenpyn of nuwe swelling hersiening moet sneller.",
      "Dit informeer professionele oordeel — moenie ART stop of deel sonder die voorskriwende span nie.",
      "As ernstige uitslag met koors, geel oë, skielike gesigswelling of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Tenofovir disoproxil (TDF) ke NRTI e sebelisoang mererong ea HIV ART ea Afrika Boroa le litseleng tse khethiloeng tsa hepatitis B — ho e nka letsatsi le letsatsi ho tšehetsa tlhokomelo e tataisoang ke ngaka.",
      "Materia ha e iqape tekanyo, moeli oa eGFR, nako ea tlhahlobo ea masapo, kapa sepheo sa viral load — netefatsa khahlanong le tataiso ea HIV/STG ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka histori ea liphio, NSAIDs, li-antiviral tse ling, le MERIANA EOHLE kapa litlama tseo u li nkang.",
      "Botsa hore na ke liteko life tsa liphio le masapo tse reriloeng le hore na moroto o fokotsehileng, bohloko ba masapo, kapa ho ruruha ho hoha ho lokela ho qala tlhahlobo.",
      "Sena se tsebisa tsebo ea bongaka — u se ke ua emisa kapa ua arolelana ART ntle le sehlopha se ngolisitseng.",
      "Haeba lekhopho le matla le feberu, mahlo a mosehla, ho ruruha ha sefahleho ka tšohanyetso, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-tenofovir disoproxil (TDF) yi-NRTI esetyenziswa kwiinkqubo ze-HIV ART zaseMzantsi Afrika nakwiindlela ezikhethiweyo ze-hepatitis B — ukuthatha yonke imihla kuxhasa ukhathalelo olukhokelwa ngugqirha.",
      "I-Materia ayiyiqiqi idosi, umda we-eGFR, ixesha lokujonga amathambo, okanye usukelo lwe-viral load — Qinisekisa nesikhokelo se-HIV/STG saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti ngembali yezintso, ii-NSAIDs, amanye ama-antiviral, kunye NAWO ONKE amayeza okanye ama-herbal owawathathayo.",
      "Buza ukuba zeziphi iimvavanyo zezintso namathambo ezicwangcisiweyo nokuba umchamo omncinci, iintlungu zamathambo, okanye ukudumba okutsha kufuneka kuqalise ukujongwa.",
      "Oku kuchaza ingqiqo yobungcali — ungayeki okanye wabelane nge-ART ngaphandle kweqela elibhalisileyo.",
      "Ukuba irhashalala enzima nomkhuhlane, amehlo atyheli, ukudumba kobuso ngequbuliso, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-lamivudine": five(
    [
      "Lamivudine (3TC) is an NRTI used in South African HIV ART and selected hepatitis B pathways — adherence keeps clinician-directed regimens working.",
      "Materia does not invent a dose, combination rule, or viral-load target — confirm against current SA HIV/STG guidance and the labelled product.",
      "Tell your pharmacist about kidney history, other antivirals, and ALL medicines or herbals you take.",
      "Ask how missed doses should be handled and what new rash, yellow eyes, or extreme fatigue should trigger review.",
      "Do not stop one antiretroviral alone without the prescribing team — incomplete courses risk resistance.",
      "If severe rash with fever, yellow eyes, extreme fatigue, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-lamivudine (3TC) i-NRTI esetshenziswa ezinhlelweni ze-HIV ART zaseNingizimu Afrika nasezindleleni ezikhethiwe ze-hepatitis B — ukuthatha kahle kugcina izinhlelo ezilawulwa udokotela zisebenza.",
      "I-Materia ayiqambi umthamo, umthetho wokuhlanganisa, noma umgomo we-viral load — qinisekisa nesiqondiso se-HIV/STG saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngomlando wezinso, amanye ama-antiviral, nawo WONKE amaphilisi noma ama-herbal owathathayo.",
      "Buza ukuthi imithamo elahlekile ifanele iphathwe kanjani nokuthi ukuqubuka okusha, amehlo aphuzi, noma ukukhathala okukhulu kufanele kuqale ukubuyekezwa.",
      "Ungayeki i-antiretroviral eyodwa wedwa ngaphandle kwethimba elibhalisile — izinhlelo ezingaphelele zibeka engcupheni yokumelana.",
      "Uma ukuqubuka okukhulu nomkhuhlane, amehlo aphuzi, ukukhathala okukhulu, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Lamivudine (3TC) is 'n NRTI in Suid-Afrikaanse MIV-ART en geselekteerde hepatitis B-paaie — nakoming hou klinikus-gerigte regimes werkend.",
      "Materia versin nie 'n dosis, kombinasie-reël of virale-ladingteiken nie — bevestig teen huidige SA MIV/STG-riglyne en die geëtiketteerde produk.",
      "Sê vir jou apteker van niergeskiedenis, ander antivirale middels, en ALLE medisyne of kruie wat jy neem.",
      "Vra hoe gemiste dosisse hanteer moet word en watter nuwe uitslag, geel oë of uiterste moegheid hersiening moet sneller.",
      "Moenie een antiretrovirale middel alleen stop sonder die voorskriwende span nie — onvolledige kursusse verhoog weerstandsrisiko.",
      "As ernstige uitslag met koors, geel oë, uiterste moegheid of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Lamivudine (3TC) ke NRTI e sebelisoang mererong ea HIV ART ea Afrika Boroa le litseleng tse khethiloeng tsa hepatitis B — ho e nka hantle ho boloka merero e tataisoang ke ngaka e sebetsa.",
      "Materia ha e iqape tekanyo, molao oa ho kopanya, kapa sepheo sa viral load — netefatsa khahlanong le tataiso ea HIV/STG ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka histori ea liphio, li-antiviral tse ling, le MERIANA EOHLE kapa litlama tseo u li nkang.",
      "Botsa hore na litekanyo tse lahlehileng li lokela ho tšoaroa joang le hore na lekhopho le lecha, mahlo a mosehla, kapa mokhathala o feteletseng o lokela ho qala tlhahlobo.",
      "U se ke ua emisa antiretroviral e le 'ngoe u le mong ntle le sehlopha se ngolisitseng — merero e sa feleng e behela kotsing ea ho hanyetsa.",
      "Haeba lekhopho le matla le feberu, mahlo a mosehla, mokhathala o feteletseng, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-lamivudine (3TC) yi-NRTI esetyenziswa kwiinkqubo ze-HIV ART zaseMzantsi Afrika nakwiindlela ezikhethiweyo ze-hepatitis B — ukuthatha kakuhle kugcina iirejimeni ezikhokelwa ngugqirha zisebenza.",
      "I-Materia ayiyiqiqi idosi, umthetho wokudibanisa, okanye usukelo lwe-viral load — Qinisekisa nesikhokelo se-HIV/STG saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti ngembali yezintso, amanye ama-antiviral, kunye NAWO ONKE amayeza okanye ama-herbal owawathathayo.",
      "Buza ukuba iidosi ezilahlekileyo kufuneka ziphathwe njani nokuba irhashalala entsha, amehlo atyheli, okanye ukudinwa okugqithisileyo kufuneka kuqalise ukujongwa.",
      "Ungayeki i-antiretroviral enye wedwa ngaphandle kweqela elibhalisileyo — iinkqubo ezingaphelelanga zibeka umngcipheko wokumelana.",
      "Ukuba irhashalala enzima nomkhuhlane, amehlo atyheli, ukudinwa okugqithisileyo, okanye ubunzima bokuphefumula kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-dolutegravir": five(
    [
      "Dolutegravir is an integrase inhibitor used in South African first-line HIV ART pathways — take exactly as the labelled product and clinic team direct.",
      "Materia does not invent a dose, food-timing hour, or viral-load target — confirm against current SA HIV STG/EML and the labelled product.",
      "Tell your pharmacist about pregnancy plans, antacids or iron/calcium products, and ALL other medicines you take.",
      "Ask how to space mineral supplements if advised, and what new rash, yellow eyes, or persistent headache should trigger review.",
      "This informs professional judgement — do not stop ART or change timing without the prescribing team.",
      "If severe rash with fever, yellow eyes, marked abdominal pain, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-dolutegravir i-integrase inhibitor esetshenziswa ezinhlelweni zokuqala ze-HIV ART zaseNingizimu Afrika — thatha njengoba umkhiqizo onelebula nethimba lomtholampilo ekhombisa.",
      "I-Materia ayiqambi umthamo, ihora lokudla, noma umgomo we-viral load — qinisekisa ne-HIV STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, ama-antacid noma imikhiqizo ye-iron/calcium, nawo WONKE amanye amaphilisi owathathayo.",
      "Buza ukuthi ungahlukanisa kanjani izengezo zamaminerali uma kutshiwo, nokuthi ukuqubuka okusha, amehlo aphuzi, noma ikhanda eliqhubekayo kufanele kuqale ukubuyekezwa.",
      "Lokhu kuchaza isigqi — ungayeki i-ART noma ushintshe isikhathi ngaphandle kwethimba elibhalisile.",
      "Uma ukuqubuka okukhulu nomkhuhlane, amehlo aphuzi, ubuhlungu besisu obukhulu, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Dolutegravir is 'n integrase-inhibeerder in Suid-Afrikaanse eerstelyn MIV-ART-paaie — neem presies soos die geëtiketteerde produk en kliniekspan aandui.",
      "Materia versin nie 'n dosis, kos-tydsuur of virale-ladingteiken nie — bevestig teen huidige SA MIV STG/EML en die geëtiketteerde produk.",
      "Sê vir jou apteker van swangerskapplanne, antasuurs of yster/kalsiumprodukte, en ALLE ander medisyne wat jy neem.",
      "Vra hoe om mineraalaanvullings te spaas as aangerade, en watter nuwe uitslag, geel oë of aanhoudende hoofpyn hersiening moet sneller.",
      "Dit informeer professionele oordeel — moenie ART stop of tydsberekening verander sonder die voorskriwende span nie.",
      "As ernstige uitslag met koors, geel oë, merkbare buikpyn of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Dolutegravir ke integrase inhibitor e sebelisoang litseleng tsa pele tsa HIV ART tsa Afrika Boroa — e nke hantle kamoo sehlahisoa se nang le ileibole le sehlopha sa tleliniki se laelang.",
      "Materia ha e iqape tekanyo, hora ea lijo, kapa sepheo sa viral load — netefatsa khahlanong le HIV STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka merero ea boimana, li-antacid kapa lihlahisoa tsa tšepe/calcium, le MERIANA EOHLE e meng eo u e nkang.",
      "Botsa hore na u ka arola joang litlatsetso tsa liminerale haeba u eletsoa, le hore na lekhopho le lecha, mahlo a mosehla, kapa hlooho e sa feleng e lokela ho qala tlhahlobo.",
      "Sena se tsebisa tsebo ea bongaka — u se ke ua emisa ART kapa ua fetola nako ntle le sehlopha se ngolisitseng.",
      "Haeba lekhopho le matla le feberu, mahlo a mosehla, bohloko ba mpeng bo hlakileng, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-dolutegravir yi-integrase inhibitor esetyenziswa kwiindlela zokuqala ze-HIV ART zaseMzantsi Afrika — thatha ngokuchanekileyo njengoko imveliso enelebula neqela lekliniki ekhombisa.",
      "I-Materia ayiyiqiqi idosi, iyure yokutya, okanye usukelo lwe-viral load — Qinisekisa ne-HIV STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, ii-antacid okanye iimveliso ze-iron/calcium, kunye NAWO ONKE amanye amayeza owawathathayo.",
      "Buza ukuba ungahlula njani izongezo zamaminerali ukuba ucebiswa, nokuba irhashalala entsha, amehlo atyheli, okanye intloko eqhubekayo kufuneka kuqalise ukujongwa.",
      "Oku kuchaza ingqiqo yobungcali — ungayeki i-ART okanye utshintshe ixesha ngaphandle kweqela elibhalisileyo.",
      "Ukuba irhashalala enzima nomkhuhlane, amehlo atyheli, iintlungu zesisu ezibonakalayo, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-efavirenz": five(
    [
      "Efavirenz is an NNRTI used in selected South African HIV ART pathways — CNS effects and interaction checks are common counselling topics.",
      "Materia does not invent a dose, bedtime hour, or viral-load target — confirm against current SA HIV STG/EML and the labelled product.",
      "Tell your pharmacist about mental-health history, pregnancy plans, and ALL other medicines including TB therapy and herbals.",
      "Ask what vivid dreams, dizziness, or mood changes to expect early on and when to seek review rather than stop alone.",
      "This informs professional judgement — do not stop ART without the prescribing team.",
      "If severe rash with fever, yellow eyes, suicidal thoughts, seizures, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-efavirenz i-NNRTI esetshenziswa ezindleleni ezikhethiwe ze-HIV ART zaseNingizimu Afrika — imiphumela ye-CNS nokuhlolwa kokuxhumana kuyizihloko ezivamile zokwelulekwa.",
      "I-Materia ayiqambi umthamo, ihora lokulala, noma umgomo we-viral load — qinisekisa ne-HIV STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngomlando wezengqondo, izinhlelo zokukhulelwa, nawo WONKE amanye amaphilisi kufaka nokwelashwa kwe-TB nama-herbal.",
      "Buza ukuthi yimaphi amaphupho acacile, isiyezi, noma izinguquko zemizwa ongazilindela ekuqaleni nokuthi kufanele ufunwe kanini ukubuyekezwa kunokuyeka wedwa.",
      "Lokhu kuchaza isigqi — ungayeki i-ART ngaphandle kwethimba elibhalisile.",
      "Uma ukuqubuka okukhulu nomkhuhlane, amehlo aphuzi, imicabango yokuzibulala, ukudlidliza, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Efavirenz is 'n NNRTI in geselekteerde Suid-Afrikaanse MIV-ART-paaie — SNC-effekte en interaksiekontroles is algemene beradingsonderwerpe.",
      "Materia versin nie 'n dosis, slaaptyduur of virale-ladingteiken nie — bevestig teen huidige SA MIV STG/EML en die geëtiketteerde produk.",
      "Sê vir jou apteker van geestesgeskiedenis, swangerskapplanne, en ALLE ander medisyne insluitend TB-terapie en kruie.",
      "Vra watter lewendige drome, duiseligheid of bui veranderinge vroeg te verwag is en wanneer om hersiening te soek eerder as alleen te stop.",
      "Dit informeer professionele oordeel — moenie ART stop sonder die voorskriwende span nie.",
      "As ernstige uitslag met koors, geel oë, selfmoordgedagtes, aanvalle of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Efavirenz ke NNRTI e sebelisoang litseleng tse khethiloeng tsa HIV ART tsa Afrika Boroa — litlamorao tsa CNS le liteko tsa ho sebelisana ke lihlooho tse tloaelehileng tsa keletso.",
      "Materia ha e iqape tekanyo, hora ea ho robala, kapa sepheo sa viral load — netefatsa khahlanong le HIV STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka histori ea kelello, merero ea boimana, le MERIANA EOHLE e meng ho kenyeletsa kalafo ea TB le litlama.",
      "Botsa hore na ke litoro life tse hlakileng, ho tottoba, kapa liphetoho tsa maikutlo tseo u ka li lebelletseng qalong le hore na u lokela ho batla tlhahlobo neng ho e-na le ho emisa u le mong.",
      "Sena se tsebisa tsebo ea bongaka — u se ke ua emisa ART ntle le sehlopha se ngolisitseng.",
      "Haeba lekhopho le matla le feberu, mahlo a mosehla, mehopolo ea ho ipolaea, ho thothomela, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-efavirenz yi-NNRTI esetyenziswa kwiindlela ezikhethiweyo ze-HIV ART zaseMzantsi Afrika — iziphumo ze-CNS kunye nokujonga ukusebenzelana zizihloko eziqhelekileyo zeengcebiso.",
      "I-Materia ayiyiqiqi idosi, iyure yokulala, okanye usukelo lwe-viral load — Qinisekisa ne-HIV STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti ngembali yengqondo, izicwangciso zokukhulelwa, kunye NAWO ONKE amanye amayeza kuquka unyango lwe-TB nama-herbal.",
      "Buza ukuba ngawaphi amaphupha acacileyo, isiyezi, okanye utshintsho lwemizwa onokululindela ekuqaleni nokuba kufuneka ufunwe nini ukujongwa kunokuyeka wedwa.",
      "Oku kuchaza ingqiqo yobungcali — ungayeki i-ART ngaphandle kweqela elibhalisileyo.",
      "Ukuba irhashalala enzima nomkhuhlane, amehlo atyheli, iingcinga zokuzibulala, ukudlikizela, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-clopidogrel": five(
    [
      "Clopidogrel is an antiplatelet medicine used after selected heart or vessel events — bleeding-risk counselling matters.",
      "Materia does not invent a dose, dual-therapy duration, or procedure hold rule — confirm against current SA guidance and the labelled product.",
      "Tell your pharmacist about ulcers, prior bleeding, planned surgery or dental work, and ALL other medicines including NSAIDs and anticoagulants.",
      "Ask what unusual bruising, black stools, or prolonged bleeding should trigger urgent review.",
      "Do not stop antiplatelet therapy alone without the prescribing team — sudden stops can be dangerous after stents or recent events.",
      "If vomiting blood, black stools, severe headache, chest pain, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-clopidogrel umuthi we-antiplatelet osetshenziswa ngemva kwezehlakalo ezikhethiwe zenhliziyo noma zemithambo — ukwelulekwa ngengozi yokopha kubalulekile.",
      "I-Materia ayiqambi umthamo, ubude bokwelashwa okubili, noma umthetho wokumisa ngaphambi kwenqubo — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngezilonda, ukopha kwangaphambilini, ukuhlinzwa noma umsebenzi wamazinyo ocwangisiwe, nawo WONKE amanye amaphilisi kufaka ama-NSAIDs nama-anticoagulant.",
      "Buza ukuthi yikuphi ukulimala okungajwayelekile, indle emnyama, noma ukopha okude kufanele kuqale ukubuyekezwa okuphuthumayo.",
      "Ungayeki ukwelashwa kwe-antiplatelet wedwa ngaphandle kwethimba elibhalisile — ukuyeka kungazumayo kungaba yingozi ngemva kwama-stent noma izehlakalo zakamuva.",
      "Uma uhlanza igazi, indle emnyama, ikhanda elikhulu, ubuhlungu besifuba, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Clopidogrel is 'n antiplaatjiemiddel ná geselekteerde hart- of vaatgebeurtenisse — bloedingrisiko-berading is belangrik.",
      "Materia versin nie 'n dosis, dubbelterapie-duur of prosedure-houreël nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Sê vir jou apteker van ulkus, vorige bloeding, beplande chirurgie of tandwerk, en ALLE ander medisyne insluitend NSAIDs en antikoagulante.",
      "Vra watter ongewone kneusings, swart stoelgang of langdurige bloeding dringende hersiening moet sneller.",
      "Moenie antiplaatjieterapie alleen stop sonder die voorskriwende span nie — skielike stoppe kan gevaarlik wees ná stents of onlangse gebeurtenisse.",
      "As jy bloed braak, swart stoelgang, ernstige hoofpyn, borspyn of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Clopidogrel ke meriana ea antiplatelet e sebelisoang ka mor'a liketsahalo tse khethiloeng tsa pelo kapa methapo — keletso ea kotsi ea ho tsoa mali e bohlokoa.",
      "Materia ha e iqape tekanyo, nako ea kalafo e habeli, kapa molao oa ho emisa pele ho ts'ebetso — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka liso, ho tsoa mali pejana, opereishene e reriloeng kapa mosebetsi oa meno, le MERIANA EOHLE e meng ho kenyeletsa NSAIDs le li-anticoagulant.",
      "Botsa hore na ke ho otlaka life ho sa tloaelehang, mantle a batsho, kapa ho tsoa mali ho telele ho lokelang ho qala tlhahlobo e potlakileng.",
      "U se ke ua emisa kalafo ea antiplatelet u le mong ntle le sehlopha se ngolisitseng — ho emisa ka tšohanyetso ho ka ba kotsi ka mor'a li-stent kapa liketsahalo tsa morao tjena.",
      "Haeba u hlatsa mali, mantle a batsho, hlooho e matla, bohloko ba sefuba, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-clopidogrel liyeza le-antiplatelet elisetyenziswa emva kweziganeko ezikhethiweyo zentliziyo okanye zemithambo — iingcebiso zomngcipheko wokopha zibalulekile.",
      "I-Materia ayiyiqiqi idosi, ubude bonyango oluphindwe kabini, okanye umthetho wokumisa phambi kwenkqubo — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti ngezilonda, ukopha kwangaphambili, utyando olucwangcisiweyo okanye umsebenzi wamazinyo, kunye NAWO ONKE amanye amayeza kuquka ii-NSAIDs nama-anticoagulant.",
      "Buza ukuba kukuphi ukulimala okungaqhelekanga, indle emnyama, okanye ukopha okude okufuneka kuqalise ukujongwa ngokukhawuleza.",
      "Ungayeki unyango lwe-antiplatelet wedwa ngaphandle kweqela elibhalisileyo — ukuyeka ngequbuliso kunokuba yingozi emva kwee-stent okanye iziganeko zakutshanje.",
      "Ukuba ugabha igazi, indle emnyama, intloko enzima, iintlungu zesifuba, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-valproate": five(
    [
      "Valproate is an antiepileptic used in selected seizure and mood pathways — pregnancy-prevention counselling is essential for people who can become pregnant.",
      "Materia does not invent a dose, blood-level target, or contraception rule — confirm against current SA guidance, the labelled product, and the specialist plan.",
      "Tell your pharmacist about pregnancy plans, liver disease, and ALL other medicines including hormonal contraceptives where relevant.",
      "Ask what liver checks are planned and what unusual bruising, severe abdominal pain, or marked drowsiness should trigger review.",
      "Do not stop suddenly without the prescribing team — abrupt stops can worsen seizures.",
      "If yellow eyes, severe abdominal pain, unusual bleeding, prolonged seizures, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-valproate i-antiepileptic esetshenziswa ezindleleni ezikhethiwe zokuwa kanye nemizwa — ukwelulekwa kokuvimbela ukukhulelwa kubalulekile kubantu abangakhulelwa.",
      "I-Materia ayiqambi umthamo, umgomo wezinga legazi, noma umthetho wokuzivikela — qinisekisa nesiqondiso saseNingizimu Afrika samanje, umkhiqizo onelebula, nohlelo lochwepheshe.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, isifo sesibindi, nawo WONKE amanye amaphilisi kufaka izivikeli zokukhulelwa ezinamahormones lapho kufanele.",
      "Buza ukuthi yimaphi ukuhlolwa kwesibindi okucwangisiwe nokuthi ukulimala okungajwayelekile, ubuhlungu besisu obukhulu, noma ukozela okukhulu kufanele kuqale ukubuyekezwa.",
      "Ungayeki ngokuzumayo ngaphandle kwethimba elibhalisile — ukuyeka kungazumayo kungenza ukuwa kube kubi kakhulu.",
      "Uma amehlo aphuzi, ubuhlungu besisu obukhulu, ukopha okungajwayelekile, ukuwa okude, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Valproaat is 'n antiepileptikum in geselekteerde aanval- en gemoedspaaie — swangerskapvoorkoming-berading is noodsaaklik vir mense wat swanger kan word.",
      "Materia versin nie 'n dosis, bloedvlakteiken of voorbehoedingreël nie — bevestig teen huidige SA-riglyne, die geëtiketteerde produk en die spesialisplan.",
      "Sê vir jou apteker van swangerskapplanne, lewersiekte, en ALLE ander medisyne insluitend hormonale voorbehoedmiddels waar relevant.",
      "Vra watter lewertoetse beplan is en watter ongewone kneusings, ernstige buikpyn of merkbare slaperigheid hersiening moet sneller.",
      "Moenie skielik stop sonder die voorskriwende span nie — skielike stoppe kan aanvalle vererger.",
      "As geel oë, ernstige buikpyn, ongewone bloeding, langdurige aanvalle of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Valproate ke antiepileptic e sebelisoang litseleng tse khethiloeng tsa ho oa le maikutlo — keletso ea thibelo ea boimana e bohlokoa ho batho ba ka imang.",
      "Materia ha e iqape tekanyo, sepheo sa boemo ba mali, kapa molao oa thibelo ea boimana — netefatsa khahlanong le tataiso ea SA, sehlahisoa se nang le ileibole, le morero oa setsebi.",
      "Bolella rakhemisi ka merero ea boimana, lefu la sebete, le MERIANA EOHLE e meng ho kenyeletsa lithibeli tsa boimana tsa hormone moo ho hlokahalang.",
      "Botsa hore na ke liteko life tsa sebete tse reriloeng le hore na ho otlaka ho sa tloaelehang, bohloko ba mpeng bo matla, kapa boroko bo hlakileng bo lokela ho qala tlhahlobo.",
      "U se ke ua emisa ka tšohanyetso ntle le sehlopha se ngolisitseng — ho emisa ka tšohanyetso ho ka mpefatsa ho oa.",
      "Haeba mahlo a mosehla, bohloko ba mpeng bo matla, ho tsoa mali ho sa tloaelehang, ho oa ho telele, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-valproate yi-antiepileptic esetyenziswa kwiindlela ezikhethiweyo zokuwa kunye nemizwa — iingcebiso zokuthintela ukukhulelwa zibalulekile kubantu abanokukhulelwa.",
      "I-Materia ayiyiqiqi idosi, usukelo lwenqanaba legazi, okanye umthetho wokuthintela ukukhulelwa — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku, imveliso enelebula, kunye nesicwangciso sogcisa.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, isifo sesibindi, kunye NAWO ONKE amanye amayeza kuquka izithinteli zokukhulelwa ezinamahormones apho kufanelekileyo.",
      "Buza ukuba zeziphi iimvavanyo zesibindi ezicwangcisiweyo nokuba ukulimala okungaqhelekanga, iintlungu zesisu ezinzima, okanye ukozela okubonakalayo kufuneka kuqalise ukujongwa.",
      "Ungayeki ngequbuliso ngaphandle kweqela elibhalisileyo — ukuyeka ngequbuliso kunokwenza ukuwa kube kubi.",
      "Ukuba amehlo atyheli, iintlungu zesisu ezinzima, ukopha okungaqhelekanga, ukuwa okude, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-carbamazepine": five(
    [
      "Carbamazepine is an antiepileptic used in selected seizure and nerve-pain pathways — interaction and rash counselling are key.",
      "Materia does not invent a dose, blood-level target, or titration schedule — confirm against current SA guidance and the labelled product.",
      "Tell your pharmacist about other antiepileptics, hormonal contraceptives, and ALL medicines or herbals you take.",
      "Ask what early rash, fever, mouth ulcers, or marked drowsiness should trigger urgent review.",
      "Do not stop suddenly without the prescribing team — abrupt stops can worsen seizures.",
      "If severe rash with blistering, yellow eyes, prolonged seizures, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-carbamazepine i-antiepileptic esetshenziswa ezindleleni ezikhethiwe zokuwa nobuhlungu bezinzwa — ukwelulekwa ngokuxhumana nokuqubuka kubalulekile.",
      "I-Materia ayiqambi umthamo, umgomo wezinga legazi, noma uhlelo lokukhuphula — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngamanye ama-antiepileptic, izivikeli zokukhulelwa ezinamahormones, nawo WONKE amaphilisi noma ama-herbal owathathayo.",
      "Buza ukuthi yikuphi ukuqubuka kwasekuqaleni, umkhuhlane, izilonda zomlomo, noma ukozela okukhulu kufanele kuqale ukubuyekezwa okuphuthumayo.",
      "Ungayeki ngokuzumayo ngaphandle kwethimba elibhalisile — ukuyeka kungazumayo kungenza ukuwa kube kubi kakhulu.",
      "Uma ukuqubuka okukhulu nokudabuka kwesikhumba, amehlo aphuzi, ukuwa okude, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Carbamazepien is 'n antiepileptikum in geselekteerde aanval- en senuweepynpaaie — interaksie- en uitslagberading is sleutel.",
      "Materia versin nie 'n dosis, bloedvlakteiken of titrasieskedule nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Sê vir jou apteker van ander antiepileptika, hormonale voorbehoedmiddels, en ALLE medisyne of kruie wat jy neem.",
      "Vra watter vroeë uitslag, koors, mondulkus of merkbare slaperigheid dringende hersiening moet sneller.",
      "Moenie skielik stop sonder die voorskriwende span nie — skielike stoppe kan aanvalle vererger.",
      "As ernstige uitslag met blase, geel oë, langdurige aanvalle of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Carbamazepine ke antiepileptic e sebelisoang litseleng tse khethiloeng tsa ho oa le bohloko ba methapo — keletso ea ho sebelisana le lekhopho e bohlokoa.",
      "Materia ha e iqape tekanyo, sepheo sa boemo ba mali, kapa kemiso ea ho khupisa — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka li-antiepileptic tse ling, lithibeli tsa boimana tsa hormone, le MERIANA EOHLE kapa litlama tseo u li nkang.",
      "Botsa hore na ke lekhopho life la pele, feberu, liso tsa molomo, kapa boroko bo hlakileng bo lokelang ho qala tlhahlobo e potlakileng.",
      "U se ke ua emisa ka tšohanyetso ntle le sehlopha se ngolisitseng — ho emisa ka tšohanyetso ho ka mpefatsa ho oa.",
      "Haeba lekhopho le matla le li-blister, mahlo a mosehla, ho oa ho telele, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-carbamazepine yi-antiepileptic esetyenziswa kwiindlela ezikhethiweyo zokuwa kunye neentlungu zemithambo — iingcebiso zokusebenzelana nerhashalala zibalulekile.",
      "I-Materia ayiyiqiqi idosi, usukelo lwenqanaba legazi, okanye ishedyuli yokukhuphula — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti ngamanye ama-antiepileptic, izithinteli zokukhulelwa ezinamahormones, kunye NAWO ONKE amayeza okanye ama-herbal owawathathayo.",
      "Buza ukuba yeyiphi irhashalala yokuqala, umkhuhlane, izilonda zomlomo, okanye ukozela okubonakalayo okufuneka kuqalise ukujongwa ngokukhawuleza.",
      "Ungayeki ngequbuliso ngaphandle kweqela elibhalisileyo — ukuyeka ngequbuliso kunokwenza ukuwa kube kubi.",
      "Ukuba irhashalala enzima eneebhokisi, amehlo atyheli, ukuwa okude, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-cetirizine": five(
    [
      "Cetirizine is a non-sedating antihistamine used for selected allergy symptoms — it is not a rescue medicine for anaphylaxis.",
      "Materia does not invent a dose or age-band rule — confirm against the labelled product and current SA guidance.",
      "Tell your pharmacist about kidney disease, other sedating medicines, and ALL products you take including cold mixtures.",
      "Ask what drowsiness, dry mouth, or incomplete symptom relief should trigger review rather than stacking doses.",
      "This informs professional judgement — seek urgent care for breathing difficulty or facial swelling rather than waiting on an antihistamine alone.",
      "If facial or lip swelling, wheeze, faintness, or trouble breathing develops — seek emergency care immediately.",
    ],
    [
      "I-cetirizine i-antihistamine engalalisi esetshenziselwa izimpawu ezikhethiwe ze-allergy — akuyona umuthi wokusiza we-anaphylaxis.",
      "I-Materia ayiqambi umthamo noma umthetho wobudala — qinisekisa nomkhiqizo onelebula nesiqondiso saseNingizimu Afrika samanje.",
      "Tshela umkhiqizi ngesifo sezinso, amanye amaphilisi alalisayo, nawo WONKE imikhiqizo owathathayo kufaka izixube zomkhuhlane.",
      "Buza ukuthi yikuphi ukozela, umlomo owomile, noma ukungalulami kwezimpawu kufanele kuqale ukubuyekezwa kunokunqwabelanisa imithamo.",
      "Lokhu kuchaza isigqi — funa usizo oluphuthumayo ngenxa yobunzima bokuphefumula noma ukuvuvuka kobuso kunokulinda i-antihistamine iyodwa.",
      "Uma ukuvuvuka kobuso noma izindebe, ukuhema, ukuwa, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Cetirizine is 'n nie-sedatiewe antihistamien vir geselekteerde allergie-simptome — dit is nie 'n reddingsmiddel vir anafilakse nie.",
      "Materia versin nie 'n dosis of ouderdomsbandreël nie — bevestig teen die geëtiketteerde produk en huidige SA-riglyne.",
      "Sê vir jou apteker van niersiekte, ander sedatiewe medisyne, en ALLE produkte wat jy neem insluitend verkouemengsels.",
      "Vra watter slaperigheid, droë mond of onvolledige simptoomverligting hersiening moet sneller eerder as dosisse te stapel.",
      "Dit informeer professionele oordeel — soek dringende sorg vir asemnood of gesigswelling eerder as om op 'n antihistamien alleen te wag.",
      "As gesig- of lipswelling, piepende asem, floute of asemnood ontwikkel — soek onmiddellik noodhulp.",
    ],
    [
      "Cetirizine ke antihistamine e sa robatseng e sebelisoang bakeng sa matšoao a khethiloeng a allergy — ha se meriana ea pholoso bakeng sa anaphylaxis.",
      "Materia ha e iqape tekanyo kapa molao oa lilemo — netefatsa khahlanong le sehlahisoa se nang le ileibole le tataiso ea SA.",
      "Bolella rakhemisi ka lefu la liphio, meriana e meng e robatsang, le LIHLAHISOA TSOHLE tseo u li nkang ho kenyeletsa metsoako ea sefuba.",
      "Botsa hore na ke boroko bofe, molomo o omileng, kapa phomolo e sa feleng ea matšoao e lokelang ho qala tlhahlobo ho e-na le ho bokella litekanyo.",
      "Sena se tsebisa tsebo ea bongaka — batla thuso e potlakileng bakeng sa ho hema thata kapa ho ruruha ha sefahleho ho e-na le ho emela antihistamine e le 'ngoe.",
      "Haeba ho ruruha ha sefahleho kapa melomo, ho hema ka thata, ho wa, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-cetirizine yi-antihistamine engalalisi esetyenziselwa iimpawu ezikhethiweyo ze-allergy — ayilosiyeza lokuhlangula le-anaphylaxis.",
      "I-Materia ayiyiqiqi idosi okanye umthetho wobudala — Qinisekisa nemveliso enelebula nesikhokelo saseMzantsi Afrika sangoku.",
      "Xelela usokhemisti ngesifo sezintso, amanye amayeza alalisayo, kunye NAZO ZONKE iimveliso owazithathayo kuquka izixube zomkhuhlane.",
      "Buza ukuba kukuphi ukozela, umlomo owomileyo, okanye ukungaphumli kweempawu okufuneka kuqalise ukujongwa kunokufaka iidosi ngaphezulu.",
      "Oku kuchaza ingqiqo yobungcali — funa uncedo olukhawulezayo ngenxa yobunzima bokuphefumla okanye ukudumba kobuso kunokulinda i-antihistamine iyodwa.",
      "Ukuba ukudumba kobuso okanye imilebe, ukuphefumla nzima, ukuwa, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-loratadine": five(
    [
      "Loratadine is a non-sedating antihistamine used for selected allergy symptoms — it does not treat anaphylaxis.",
      "Materia does not invent a dose or age-band rule — confirm against the labelled product and current SA guidance.",
      "Tell your pharmacist about liver disease, other antihistamines, and ALL cold or allergy products you already use.",
      "Ask what incomplete relief or unexpected drowsiness should trigger review rather than combining products.",
      "This informs professional judgement — breathing difficulty or facial swelling needs urgent care, not another antihistamine alone.",
      "If facial or lip swelling, wheeze, faintness, or trouble breathing develops — seek emergency care immediately.",
    ],
    [
      "I-loratadine i-antihistamine engalalisi esetshenziselwa izimpawu ezikhethiwe ze-allergy — ayilaphi i-anaphylaxis.",
      "I-Materia ayiqambi umthamo noma umthetho wobudala — qinisekisa nomkhiqizo onelebula nesiqondiso saseNingizimu Afrika samanje.",
      "Tshela umkhiqizi ngesifo sesibindi, ezinye ama-antihistamine, nawo WONKE imikhiqizo yomkhuhlane noma ye-allergy osebenzisayo.",
      "Buza ukuthi yikuphi ukungalulami okuphelele noma ukozela okungalindelekile kufanele kuqale ukubuyekezwa kunokuhlanganisa imikhiqizo.",
      "Lokhu kuchaza isigqi — ubunzima bokuphefumula noma ukuvuvuka kobuso kudinga usizo oluphuthumayo, hhayi enye i-antihistamine iyodwa.",
      "Uma ukuvuvuka kobuso noma izindebe, ukuhema, ukuwa, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Loratadine is 'n nie-sedatiewe antihistamien vir geselekteerde allergie-simptome — dit behandel nie anafilakse nie.",
      "Materia versin nie 'n dosis of ouderdomsbandreël nie — bevestig teen die geëtiketteerde produk en huidige SA-riglyne.",
      "Sê vir jou apteker van lewersiekte, ander antihistamiene, en ALLE verkoue- of allergieprodukte wat jy al gebruik.",
      "Vra watter onvolledige verligting of onverwagte slaperigheid hersiening moet sneller eerder as produkte te kombineer.",
      "Dit informeer professionele oordeel — asemnood of gesigswelling benodig dringende sorg, nie nog 'n antihistamien alleen nie.",
      "As gesig- of lipswelling, piepende asem, floute of asemnood ontwikkel — soek onmiddellik noodhulp.",
    ],
    [
      "Loratadine ke antihistamine e sa robatseng e sebelisoang bakeng sa matšoao a khethiloeng a allergy — ha e phekola anaphylaxis.",
      "Materia ha e iqape tekanyo kapa molao oa lilemo — netefatsa khahlanong le sehlahisoa se nang le ileibole le tataiso ea SA.",
      "Bolella rakhemisi ka lefu la sebete, li-antihistamine tse ling, le LIHLAHISOA TSOHLE tsa sefuba kapa allergy tseo u li sebelisang.",
      "Botsa hore na ke phomolo efe e sa feleng kapa boroko bo sa lebelloang bo lokelang ho qala tlhahlobo ho e-na le ho kopanya lihlahisoa.",
      "Sena se tsebisa tsebo ea bongaka — ho hema thata kapa ho ruruha ha sefahleho ho hloka thuso e potlakileng, eseng antihistamine e 'ngoe e le 'ngoe.",
      "Haeba ho ruruha ha sefahleho kapa melomo, ho hema ka thata, ho wa, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-loratadine yi-antihistamine engalalisi esetyenziselwa iimpawu ezikhethiweyo ze-allergy — ayinyangi i-anaphylaxis.",
      "I-Materia ayiyiqiqi idosi okanye umthetho wobudala — Qinisekisa nemveliso enelebula nesikhokelo saseMzantsi Afrika sangoku.",
      "Xelela usokhemisti ngesifo sesibindi, ezinye ii-antihistamine, kunye NAZO ZONKE iimveliso zomkhuhlane okanye ze-allergy osazisebenzisayo.",
      "Buza ukuba kukuphi ukungaphumli okupheleleyo okanye ukozela okungalindelekanga okufuneka kuqalise ukujongwa kunokudibanisa iimveliso.",
      "Oku kuchaza ingqiqo yobungcali — ubunzima bokuphefumla okanye ukudumba kobuso kufuna uncedo olukhawulezayo, hayi enye i-antihistamine iyodwa.",
      "Ukuba ukudumba kobuso okanye imilebe, ukuphefumla nzima, ukuwa, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-fluclox": five(
    [
      "Flucloxacillin is a penicillin antibiotic used for selected skin and soft-tissue infections — finish the course unless your clinician says stop.",
      "Materia does not invent a dose, interval, or course length — confirm against current SA STG/EML and the labelled product.",
      "Tell your pharmacist about penicillin allergy, liver disease, and ALL other medicines you take.",
      "Ask whether food timing matters for your labelled product and what new rash or yellow eyes should trigger review.",
      "This informs professional judgement — do not share leftover antibiotics or stop early without advice.",
      "If severe rash, facial swelling, yellow eyes, bloody diarrhoea, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-flucloxacillin i-antibiotic ye-penicillin esetshenziselwa izifo ezikhethiwe zesikhumba nezitho ezithambile — qeda inkambu ngaphandle uma udokotela ethi uyeke.",
      "I-Materia ayiqambi umthamo, isikhathi phakathi, noma ubude benkambu — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi nge-allergy ye-penicillin, isifo sesibindi, nawo WONKE amanye amaphilisi owathathayo.",
      "Buza ukuthi isikhathi sokudla sibalulekile yini kumkhiqizo wakho onelebula nokuthi ukuqubuka okusha noma amehlo aphuzi kufanele kuqale ukubuyekezwa.",
      "Lokhu kuchaza isigqi — ungabelani ngama-antibiotic asele noma uyeke kusenesikhathi ngaphandle kweseluleko.",
      "Uma ukuqubuka okukhulu, ukuvuvuka kobuso, amehlo aphuzi, uhudo olunegazi, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Flukloksasillien is 'n penisillien-antibiotikum vir geselekteerde vel- en sagteweefselinfeksies — voltooi die kuur tensy jou klinikus sê stop.",
      "Materia versin nie 'n dosis, interval of kuurduur nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir jou apteker van penisillienallergie, lewersiekte, en ALLE ander medisyne wat jy neem.",
      "Vra of kostydsberekening saak maak vir jou geëtiketteerde produk en watter nuwe uitslag of geel oë hersiening moet sneller.",
      "Dit informeer professionele oordeel — moenie oorblywende antibiotika deel of vroeg stop sonder advies nie.",
      "As ernstige uitslag, gesigswelling, geel oë, bloederige diarree of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Flucloxacillin ke antibiotic ea penicillin e sebelisoang bakeng sa tšoaetso tse khethiloeng tsa letlalo le lisele tse bonolo — qeta thuto ntle le haeba ngaka e re emisa.",
      "Materia ha e iqape tekanyo, nako pakeng tsa, kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka allergy ea penicillin, lefu la sebete, le MERIANA EOHLE e meng eo u e nkang.",
      "Botsa hore na nako ea lijo e bohlokoa bakeng sa sehlahisoa sa hau se nang le ileibole le hore na lekhopho le lecha kapa mahlo a mosehla a lokela ho qala tlhahlobo.",
      "Sena se tsebisa tsebo ea bongaka — u se ke ua arolelana li-antibiotic tse setseng kapa ua emisa pele ntle le keletso.",
      "Haeba lekhopho le matla, ho ruruha ha sefahleho, mahlo a mosehla, letšollo le mali, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-flucloxacillin yi-antibiotic ye-penicillin esetyenziselwa izifo ezikhethiweyo zesikhumba nezitho ezithambileyo — gqiba ikhosi ngaphandle kokuba ugqirha athi yeka.",
      "I-Materia ayiyiqiqi idosi, ixesha phakathi, okanye ubude bekhosi — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti nge-allergy ye-penicillin, isifo sesibindi, kunye NAWO ONKE amanye amayeza owawathathayo.",
      "Buza ukuba ixesha lokutya libalulekile na kwimveliso yakho enelebula nokuba irhashalala entsha okanye amehlo atyheli kufuneka kuqalise ukujongwa.",
      "Oku kuchaza ingqiqo yobungcali — ungabelani ngee-antibiotic ezishiyekileyo okanye uyeke kwangethuba ngaphandle kwengcebiso.",
      "Ukuba irhashalala enzima, ukudumba kobuso, amehlo atyheli, urhudo olunegazi, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-cephalexin": five(
    [
      "Cephalexin is a cephalosporin antibiotic used for selected bacterial infections — finish the course unless your clinician says stop.",
      "Materia does not invent a dose, interval, or course length — confirm against current SA STG/EML and the labelled product.",
      "Tell your pharmacist about penicillin or cephalosporin allergy, kidney disease, and ALL other medicines you take.",
      "Ask what diarrhoea, new rash, or incomplete improvement should trigger review rather than extending the course alone.",
      "This informs professional judgement — unused antibiotics are not for sharing or future self-treatment.",
      "If severe rash, facial swelling, bloody diarrhoea, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-cephalexin i-antibiotic ye-cephalosporin esetshenziselwa izifo ezikhethiwe zamagciwane — qeda inkambu ngaphandle uma udokotela ethi uyeke.",
      "I-Materia ayiqambi umthamo, isikhathi phakathi, noma ubude benkambu — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi nge-allergy ye-penicillin noma ye-cephalosporin, isifo sezinso, nawo WONKE amanye amaphilisi owathathayo.",
      "Buza ukuthi yikuphi uhudo, ukuqubuka okusha, noma ukungathuthuki okuphelele kufanele kuqale ukubuyekezwa kunokwelula inkambu wedwa.",
      "Lokhu kuchaza isigqi — ama-antibiotic angasetshenzisiwe awenzelwe ukwabelana noma ukuzelapha okuzayo.",
      "Uma ukuqubuka okukhulu, ukuvuvuka kobuso, uhudo olunegazi, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Sefaleksien is 'n sefalosporien-antibiotikum vir geselekteerde bakteriële infeksies — voltooi die kuur tensy jou klinikus sê stop.",
      "Materia versin nie 'n dosis, interval of kuurduur nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir jou apteker van penisillien- of sefalosporienallergie, niersiekte, en ALLE ander medisyne wat jy neem.",
      "Vra watter diarree, nuwe uitslag of onvolledige verbetering hersiening moet sneller eerder as om die kuur alleen te verleng.",
      "Dit informeer professionele oordeel — ongebruikte antibiotika is nie vir deel of toekomstige selfbehandeling nie.",
      "As ernstige uitslag, gesigswelling, bloederige diarree of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Cephalexin ke antibiotic ea cephalosporin e sebelisoang bakeng sa tšoaetso tse khethiloeng tsa baktheria — qeta thuto ntle le haeba ngaka e re emisa.",
      "Materia ha e iqape tekanyo, nako pakeng tsa, kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka allergy ea penicillin kapa cephalosporin, lefu la liphio, le MERIANA EOHLE e meng eo u e nkang.",
      "Botsa hore na ke letšollo life, lekhopho le lecha, kapa ntlafatso e sa feleng e lokelang ho qala tlhahlobo ho e-na le ho atolosa thuto u le mong.",
      "Sena se tsebisa tsebo ea bongaka — li-antibiotic tse sa sebelisoang ha li etsetsoa ho arolelana kapa kalafo ea ka boithatelo ea kamoso.",
      "Haeba lekhopho le matla, ho ruruha ha sefahleho, letšollo le mali, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-cephalexin yi-antibiotic ye-cephalosporin esetyenziselwa izifo ezikhethiweyo zebhaktheria — gqiba ikhosi ngaphandle kokuba ugqirha athi yeka.",
      "I-Materia ayiyiqiqi idosi, ixesha phakathi, okanye ubude bekhosi — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti nge-allergy ye-penicillin okanye ye-cephalosporin, isifo sezintso, kunye NAWO ONKE amanye amayeza owawathathayo.",
      "Buza ukuba kukuphi urhudo, irhashalala entsha, okanye ukungaphucuki okupheleleyo okufuneka kuqalise ukujongwa kunokwandisa ikhosi wedwa.",
      "Oku kuchaza ingqiqo yobungcali — ii-antibiotic ezingasetyenziswanga azenzelwanga ukwabelana okanye ukunyanga ngokwakho kwixesha elizayo.",
      "Ukuba irhashalala enzima, ukudumba kobuso, urhudo olunegazi, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-sertraline": five(
    [
      "Sertraline is an SSRI antidepressant used in selected mood and anxiety pathways — benefits often build gradually under clinical follow-up.",
      "Materia does not invent a dose, titration schedule, or washout rule — confirm against current SA guidance and the labelled product.",
      "Tell your pharmacist about other antidepressants, bleeding risk, pregnancy plans, and ALL medicines or herbals you take.",
      "Ask what early restlessness, sleep change, or mood worsening should trigger review rather than stopping alone.",
      "Do not stop suddenly without the prescribing team — taper plans are clinician-led.",
      "If suicidal thoughts, severe agitation, serotonin-storm concern (fever, rigidity, confusion), or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-sertraline i-SSRI antidepressant esetshenziswa ezindleleni ezikhethiwe zemizwa nokukhathazeka — izinzuzo zivame ukwakha kancane ngaphansi kokulandelwa komtholampilo.",
      "I-Materia ayiqambi umthamo, uhlelo lokukhuphula, noma umthetho wokugeza — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngamanye ama-antidepressant, ingozi yokopha, izinhlelo zokukhulelwa, nawo WONKE amaphilisi noma ama-herbal owathathayo.",
      "Buza ukuthi yikuphi ukungaphumuli kwasekuqaleni, inguquko yokulala, noma ukuba bi kwemizwa kufanele kuqale ukubuyekezwa kunokuyeka wedwa.",
      "Ungayeki ngokuzumayo ngaphandle kwethimba elibhalisile — izinhlelo zokwehlisa zilawulwa udokotela.",
      "Uma imicabango yokuzibulala, ukukhathazeka okukhulu, ukukhathazeka kwe-serotonin (umkhuhlane, ukuqina, ukudideka), noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Sertraline is 'n SSRI-antidepressant in geselekteerde gemoeds- en angspaaie — voordele bou dikwels geleidelik onder kliniese opvolg.",
      "Materia versin nie 'n dosis, titrasieskedule of uitwasreël nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Sê vir jou apteker van ander antidepressante, bloedingrisiko, swangerskapplanne, en ALLE medisyne of kruie wat jy neem.",
      "Vra watter vroeë rusteloosheid, slaapverandering of gemoedsverergering hersiening moet sneller eerder as alleen te stop.",
      "Moenie skielik stop sonder die voorskriwende span nie — afbouplanne is klinikus-gelei.",
      "As selfmoordgedagtes, ernstige agitasie, serotonien-storm kommer (koors, styfheid, verwarring) of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Sertraline ke SSRI antidepressant e sebelisoang litseleng tse khethiloeng tsa maikutlo le ho tšoenyeha — melemo hangata e ahoa butle-butle tlas'a tlhahlobo ea bongaka.",
      "Materia ha e iqape tekanyo, kemiso ea ho khupisa, kapa molao oa ho hlatsoa — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka li-antidepressant tse ling, kotsi ea ho tsoa mali, merero ea boimana, le MERIANA EOHLE kapa litlama tseo u li nkang.",
      "Botsa hore na ke ho hloka phomolo life ha pele, phetoho ea boroko, kapa ho mpefala ha maikutlo ho lokelang ho qala tlhahlobo ho e-na le ho emisa u le mong.",
      "U se ke ua emisa ka tšohanyetso ntle le sehlopha se ngolisitseng — merero ea ho theola e tataisoa ke ngaka.",
      "Haeba mehopolo ea ho ipolaea, ho ferekana ho matla, ho tšoenyeha ha serotonin (feberu, ho thatafala, ho ferekana), kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-sertraline yi-SSRI antidepressant esetyenziswa kwiindlela ezikhethiweyo zemizwa kunye nexhala — izibonelelo zihlala zakha ngokuthe ngcembe phantsi kokulandelwa kwekliniki.",
      "I-Materia ayiyiqiqi idosi, ishedyuli yokukhuphula, okanye umthetho wokuhlamba — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti ngamanye ama-antidepressant, umngcipheko wokopha, izicwangciso zokukhulelwa, kunye NAWO ONKE amayeza okanye ama-herbal owawathathayo.",
      "Buza ukuba kukuphi ukungaphumli kokuqala, utshintsho lokulala, okanye ukuba bi kwemizwa okufuneka kuqalise ukujongwa kunokuyeka wedwa.",
      "Ungayeki ngequbuliso ngaphandle kweqela elibhalisileyo — izicwangciso zokwehlisa zikhokelwa ngugqirha.",
      "Ukuba iingcinga zokuzibulala, ukuphazamiseka okukhulu, inkxalabo ye-serotonin (umkhuhlane, ukuqina, ukudideka), okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),
};
