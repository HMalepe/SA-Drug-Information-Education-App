/**
 * v210–v219 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V210_TO_V219: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-dutasteride": five(
    [
      "Take this 5-alpha-reductase inhibitor exactly as directed on your labelled product — benefits may take time; confirm the labelled course.",
      "Dutasteride counselling commonly includes sexual side-effect discussions and not handling crushed capsules if pregnant. Materia does not invent a dose or PSA target.",
      "Tell your pharmacist about pregnancy plans in the household, liver history, and ALL other prostate medicines on your list.",
      "Report breast changes, severe mood change, or allergic swelling early for clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le 5-alpha-reductase inhibitor njengoba kubhalwe kumkhiqizo onelebula — izinzuzo zingathatha isikhathi; qinisekisa inkambo yelebula.",
      "Ukwelulekwa kwe-dutasteride kuvame ukufaka izingxoxo zemiphumela eceleni yezocansi nokungaphathi ama-capsule achoboziwe uma ukhulelwe. I-Materia ayiqambi umthamo noma umgomo we-PSA.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa ekhaya, umlando wesibindi, NAWO WONKE amanye amaphilisi e-prostate.",
      "Bika ukushintsha kwebele, ukushintsha kwemizwa okukhulu, noma ukuvuvuka kwe-allergy ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie 5-alfa-reduktase-inhibeerder soos op die geëtiketteerde produk aangedui — voordele mag tyd neem; bevestig die geëtiketteerde kuur.",
      "Dutasteried-berading sluit dikwels seksuele newe-effekbesprekings in en om nie vergruisde kapsules te hanteer as jy swanger is nie. Materia versin nie ’n dosis of PSA-teiken nie.",
      "Sê vir jou apteker van swangerskapsplanne in die huishouding, lewergeskiedenis, en ALLE ander prostaatmedisyne op jou lys.",
      "Rapporteer borsveranderinge, ernstige buiieverandering, of allergiese swelling vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa 5-alpha-reductase inhibitor ena hantle kamoo e hlalositsoeng holabel — melemo e ka nka nako; netefatsa thuto ea leibole.",
      "Keletso ea dutasteride hangata e kenyelletsa lipuisano tsa liphello tse mpe tsa thobalano le ho se tšoare li-capsule tse silafalitsoeng haeba u imme. Materia ha e iqape tekanyo kapa sepheo sa PSA.",
      "Bolella rakhemisi ka merero ea ho ima lapeng, histori ea sebete, le MERIANA EOHLE ea prostate.",
      "Tlaleha liphetoho tsa matsoele, phetoho e matla ea maikutlo, kapa ho ruruha ha allergy kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le 5-alpha-reductase inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — izibonelelo zinokuthatha ixesha; qinisekisa ikhosi yeleyibhile.",
      "Iingcebiso ze-dutasteride zihlala zibandakanya iingxoxo zemiphumo ecaleni yezesondo nokungaphathi iicapsule ezityumziweyo ukuba ukhulelwe. I-Materia ayiyiqiqi idosi okanye usukelo lwe-PSA.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa ekhaya, imbali yesibindi, NAWO ONKE amanye amayeza e-prostate.",
      "Xela utshintsho lwamabele, utshintsho lwemeko olunzima, okanye ukudumba kwe-allergy kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-mirabegron": five(
    [
      "Take this beta-3 agonist exactly as directed on your labelled product — it treats overactive bladder urgency; confirm the label.",
      "Mirabegron counselling commonly includes blood-pressure watch and not crushing prolonged-release tablets unless the labelled product allows. Materia does not invent a dose or blood-pressure target.",
      "Tell your pharmacist about uncontrolled hypertension, heart rhythm history, and ALL other bladder medicines on your list.",
      "Report severe headache, chest pain, palpitations, or inability to pass urine early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get severe chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le beta-3 agonist njengoba kubhalwe kumkhiqizo onelebula — ilapha ukuphuthuma kwesinye; qinisekisa ilebula.",
      "Ukwelulekwa kwe-mirabegron kuvame ukufaka ukugada umfutho wegazi nokungachobozi amaphilisi e-prolonged-release ngaphandle kokuvuma kwelebula. I-Materia ayiqambi umthamo noma umgomo womfutho wegazi.",
      "Tshela umkhiqizi ngomfutho wegazi ongalaweleki, umlando wesivinini senhliziyo, NAWO WONKE amanye amaphilisi esinye.",
      "Bika ikhanda elibuhlungu kakhulu, ubuhlungu besifuba, ukushaya kwenhliziyo, noma ukungakwazi ukuchama ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ubuhlungu besifuba obukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie beta-3-agonis soos op die geëtiketteerde produk aangedui — dit behandel ooraktiewe-blaasdringendheid; bevestig die etiket.",
      "Mirabegron-berading sluit dikwels bloeddrukwaak in en om verlengde-vrystellingtablette nie te vergruis tensy die geëtiketteerde produk dit toelaat nie. Materia versin nie ’n dosis of bloeddrukteiken nie.",
      "Sê vir jou apteker van onbeheerde hipertensie, hartritmegeskiedenis, en ALLE ander blaarmedisyne op jou lys.",
      "Rapporteer ernstige hoofpyn, borspyn, hartklopgings, of onvermoë om urine te passeer vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ernstige borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa beta-3 agonist ena hantle kamoo e hlalositsoeng holabel — e alafa potlako ea senya se sebetsang haholo; netefatsa leibole.",
      "Keletso ea mirabegron hangata e kenyelletsa ho hlokomela khatello ea mali le ho se silafatse litafole tsa prolonged-release ntle le tumello ea leibole. Materia ha e iqape tekanyo kapa sepheo sa khatello ea mali.",
      "Bolella rakhemisi ka khatello ea mali e sa laoleheng, histori ea morethetho oa pelo, le MERIANA EOHLE ea senya.",
      "Tlaleha hlooho e bohloko haholo, bohloko ba sefuba, ho otla ha pelo, kapa ho sitoa ho ntša moroto kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana bohloko ba sefuba bo matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le beta-3 agonist ngokuchanekileyo njengoko kubhaliwe kwileyibhile — inyanga ukungxama kwesinyi; qinisekisa ileyibhile.",
      "Iingcebiso ze-mirabegron zihlala zibandakanya ukuqapha uxinzelelo lwegazi nokungatyumzi iipilisi ze-prolonged-release ngaphandle kokuvuma kweleyibhile. I-Materia ayiyiqiqi idosi okanye usukelo loxinzelelo lwegazi.",
      "Xelela usokhemisti ngoxinzelelo lwegazi olungalawulekiyo, imbali yesingqisho sentliziyo, NAWO ONKE amanye amayeza esinyi.",
      "Xela intloko ebuhlungu kakhulu, iintlungu zesifuba, ukubetha kwentliziyo, okanye ukungakwazi ukuchama kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana iintlungu zesifuba ezinzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-folic-acid": five(
    [
      "Take this vitamin B9 exactly as directed on your labelled product — pregnancy and anaemia plans differ; confirm the labelled course.",
      "Folic acid counselling commonly includes starting before conception when that is the clinician’s plan — do not invent a personal pregnancy schedule. Materia does not invent a dose or lab target.",
      "Tell your pharmacist about epilepsy medicines, methotrexate plans, and ALL other vitamin products on your list.",
      "Report unusual rash, swelling, or unexplained fever early for clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le vitamin B9 njengoba kubhalwe kumkhiqizo onelebula — izinhlelo zokukhulelwa neze-anaemia ziyahluka; qinisekisa inkambo yelebula.",
      "Ukwelulekwa kwe-folic acid kuvame ukufaka ukuqala ngaphambi kokukhulelwa uma kuyohlelo lukadokotela — ungayiqiqi uhlelo lakho lokukhulelwa. I-Materia ayiqambi umthamo noma umgomo welabhorethri.",
      "Tshela umkhiqizi ngamaphilisi e-epilepsy, izinhlelo ze-methotrexate, NAWO WONKE amanye amakhiqizo amavithamini.",
      "Bika ukuqubuka okungajwayelekile, ukuvuvuka, noma umkhuhlane ongachazeki ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie vitamien B9 soos op die geëtiketteerde produk aangedui — swangerskap- en anemieplanne verskil; bevestig die geëtiketteerde kuur.",
      "Folienzuur-berading sluit dikwels in om vóór konsepsie te begin wanneer dit die klinikus se plan is — moenie ’n persoonlike swangerskapskedule versin nie. Materia versin nie ’n dosis of labteiken nie.",
      "Sê vir jou apteker van epilepsiemedisyne, metotreksaat-planne, en ALLE ander vitamienprodukte op jou lys.",
      "Rapporteer ongewone uitslag, swelling, of onverklaarde koors vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa vitamin B9 ena hantle kamoo e hlalositsoeng holabel — merero ea ho ima le anaemia ea fapana; netefatsa thuto ea leibole.",
      "Keletso ea folic acid hangata e kenyelletsa ho qala pele ho ima haeba e le moralo oa ngaka — se ke oa iqapa kemiso ea hau ea ho ima. Materia ha e iqape tekanyo kapa sepheo sa lab.",
      "Bolella rakhemisi ka meriana ea epilepsy, merero ea methotrexate, le LIHLAHISWA TSOHLE tsa livithamini.",
      "Tlaleha lekhopho le sa tloaelehang, ho ruruha, kapa feberu e sa hlaloseng kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le vitamin B9 ngokuchanekileyo njengoko kubhaliwe kwileyibhile — izicwangciso zokukhulelwa neze-anaemia ziyahluka; qinisekisa ikhosi yeleyibhile.",
      "Iingcebiso ze-folic acid zihlala zibandakanya ukuqala phambi kokukhulelwa ukuba sisicwangciso sogqirha — sukuyiqqa ishedyuli yakho yokukhulelwa. I-Materia ayiyiqiqi idosi okanye usukelo lwelabhorethri.",
      "Xelela usokhemisti ngamayeza e-epilepsy, izicwangciso ze-methotrexate, NAZO ZONKE ezinye iimveliso zeevithamini.",
      "Xela irhashalala engaqhelekanga, ukudumba, okanye umkhuhlane ongachazekiyo kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-cyanocobalamin": five(
    [
      "Take this vitamin B12 exactly as directed on your labelled product — tablets and injections differ; confirm the form you were given.",
      "Cyanocobalamin counselling commonly includes completing the labelled course for deficiency plans. Materia does not invent a dose, injection interval, or blood-level target.",
      "Tell your pharmacist about cobalt allergy history, other anaemia medicines, and ALL vitamin products on your list.",
      "Report unusual rash, swelling, or persistent diarrhoea early for clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le vitamin B12 njengoba kubhalwe kumkhiqizo onelebula — amaphilisi nokujova kuyahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-cyanocobalamin kuvame ukufaka ukuqedela inkambo yelebula yezinhlelo zokuntuleka. I-Materia ayiqambi umthamo, isikhathi sokujova, noma umgomo weleveli egazini.",
      "Tshela umkhiqizi ngomlando we-allergy ye-cobalt, amanye amaphilisi e-anaemia, NAWO WONKE amakhiqizo amavithamini.",
      "Bika ukuqubuka okungajwayelekile, ukuvuvuka, noma ukuhuda okuqhubekayo ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie vitamien B12 soos op die geëtiketteerde produk aangedui — tablette en inspuitings verskil; bevestig die vorm wat jy ontvang het.",
      "Sianokobalamien-berading sluit dikwels in om die geëtiketteerde kuur vir tekortplanne te voltooi. Materia versin nie ’n dosis, inspuitingsinterval of bloedvlakteiken nie.",
      "Sê vir jou apteker van kobaltallergiegeskiedenis, ander anemie-medisyne, en ALLE vitamienprodukte op jou lys.",
      "Rapporteer ongewone uitslag, swelling, of aanhoudende diarree vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa vitamin B12 ena hantle kamoo e hlalositsoeng holabel — litafole le ho enteoa lia fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea cyanocobalamin hangata e kenyelletsa ho qeta thuto ea leibole bakeng sa merero ea khaello. Materia ha e iqape tekanyo, nako ea ho enteoa, kapa sepheo sa level ea mali.",
      "Bolella rakhemisi ka histori ea allergy ea cobalt, meriana e meng ea anaemia, le LIHLAHISWA TSOHLE tsa livithamini.",
      "Tlaleha lekhopho le sa tloaelehang, ho ruruha, kapa letšollo le tsoelang pele kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le vitamin B12 ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iipilisi nokutofa kuyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-cyanocobalamin zihlala zibandakanya ukugqiba ikhosi yeleyibhile yezicwangciso zokunqongophala. I-Materia ayiyiqiqi idosi, ixesha lokutofa, okanye usukelo lweleveli yegazi.",
      "Xelela usokhemisti ngembali ye-allergy ye-cobalt, amanye amayeza e-anaemia, NAZO ZONKE iimveliso zeevithamini.",
      "Xela irhashalala engaqhelekanga, ukudumba, okanye urhudo oluqhubekayo kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-betamethasone": five(
    [
      "Use this potent topical corticosteroid exactly as directed on your labelled product — thin layer to affected skin only; confirm the label.",
      "Betamethasone counselling commonly includes not using on the face, groin, or broken skin unless your clinician says so. Materia does not invent a finger-tip unit count or course length.",
      "Tell your pharmacist about infection in the treated area, other steroid creams, and pregnancy or breastfeeding plans.",
      "Wash hands after application unless hands are the treated area — report skin thinning or stretch marks early.",
      "Ask how long the labelled course should run — do not invent a stop date or a rebound plan.",
      "If you get spreading infection, severe blistering, or allergic swelling with trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le potent topical corticosteroid njengoba kubhalwe kumkhiqizo onelebula — ungqimba omncane esikhumbeni esithintekile kuphela; qinisekisa ilebula.",
      "Ukwelulekwa kwe-betamethasone kuvame ukufaka ukungasebenzisi ebusweni, ezinyeni, noma esikhumbeni esaphukile ngaphandle kokusho kukadokotela. I-Materia ayiqambi inani le-finger-tip unit noma ubude benkambo.",
      "Tshela umkhiqizi ngesifo endaweni elashwayo, amanye ama-cream e-steroid, nezinhlelo zokukhulelwa noma zokuncelisa.",
      "Geza izandla ngemva kokufaka ngaphandle uma izandla ziyindawo elashwayo — bika ukuncipha kwesikhumba noma imivimbo yokunwebeka ngokushesha.",
      "Buza ukuthi inkambo yelebula kufanele iqhubeke isikhathi esingakanani — ungayiqiqi usuku lokuyeka noma uhlelo lokubuyela.",
      "Uma uthola isifo esanda, amaqhubu amakhulu, noma ukuvuvuka kwe-allergy nokuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie potente topiese kortikosteroïed soos op die geëtiketteerde produk aangedui — dun laag slegs op aangetaste vel; bevestig die etiket.",
      "Betametasoon-berading sluit dikwels in om nie op die gesig, lies of gebreekte vel te gebruik tensy jou klinikus so sê nie. Materia versin nie ’n vingerpunt-eenheidtelling of kuurduur nie.",
      "Sê vir jou apteker van infeksie in die behandelde area, ander steroïedrome, en swangerskap- of borsvoedingplanne.",
      "Was hande ná aanwending tensy hande die behandelde area is — rapporteer velverdunning of strekmerke vroeg.",
      "Vra hoe lank die geëtiketteerde kuur moet loop — moenie ’n stopdatum of terugslagplan versin nie.",
      "As jy verspreidende infeksie, ernstige blistering, of allergiese swelling met asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa potent topical corticosteroid ena hantle kamoo e hlalositsoeng holabel — lera le tšesafe letlalong le amehileng feela; netefatsa leibole.",
      "Keletso ea betamethasone hangata e kenyelletsa ho se sebelise sefahlehong, lithoeng, kapa letlalo le robehileng ntle le ha ngaka e re joalo. Materia ha e iqape palo ea finger-tip unit kapa bolelele ba thuto.",
      "Bolella rakhemisi ka tšoaetso sebakeng se alafuoang, li-cream tse ling tsa steroid, le merero ea ho ima kapa ho anyesa.",
      "Hlatsoa matsoho ka mor'a ho sebelisa ntle le haeba matsoho e le sebaka se alafuoang — tlaleha ho ohla ha letlalo kapa matšoao a ho otlolla kapele.",
      "Botsa hore thuto ea leibole e lokela ho tsoela pele nako e kae — se ke oa iqapa letsatsi la ho emisa kapa moralo oa ho khutla.",
      "Haeba u fumana tšoaetso e atolohang, lihlabana tse matla, kapa ho ruruha ha allergy ka ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le potent topical corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — umaleko ocekeceke kulusu oluchaphazelekileyo kuphela; qinisekisa ileyibhile.",
      "Iingcebiso ze-betamethasone zihlala zibandakanya ukungasebenzisi ebusweni, ezinyeni, okanye eluswini olwaphukileyo ngaphandle kokuba ugqirha athi kunjalo. I-Materia ayiyiqiqi inani le-finger-tip unit okanye ubude bekhosi.",
      "Xelela usokhemisti ngosulelo kwindawo enyangwayo, ezinye ii-cream ze-steroid, nezicwangciso zokukhulelwa okanye zokuncancisa.",
      "Hlamba izandla emva kokufaka ngaphandle kokuba izandla ziyindawo enyangwayo — xela ukuncipha kolusu okanye imivimbo yokunwebeka kwangoko.",
      "Buza indlela ikhosi yeleyibhile ekufanele iqhubeke ngayo — sukuyiqqa umhla wokuyeka okanye isicwangciso sokubuyela.",
      "Ukuba ufumana usulelo olusasazekayo, amaqhuma anzima, okanye ukudumba kwe-allergy noxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-clobetasol": five(
    [
      "Use this very potent topical corticosteroid exactly as directed on your labelled product — short courses are common counselling; confirm the label.",
      "Clobetasol counselling commonly includes avoiding the face and groin unless your clinician says so, and not using under occlusion without advice. Materia does not invent a finger-tip unit count or course length.",
      "Tell your pharmacist about infection in the treated area, other steroid creams, and pregnancy or breastfeeding plans.",
      "Wash hands after application — report skin thinning, stretch marks, or rebound flare early.",
      "Ask how long the labelled course should run — do not invent a stop date or a rebound plan.",
      "If you get spreading infection, severe blistering, or allergic swelling with trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le very potent topical corticosteroid njengoba kubhalwe kumkhiqizo onelebula — izinkambo ezimfushane zivame ukufundiswa; qinisekisa ilebula.",
      "Ukwelulekwa kwe-clobetasol kuvame ukufaka ukugwema ubuso nezinyo ngaphandle kokusho kukadokotela, nokungasebenzisi ngaphansi kwe-occlusion ngaphandle kwezeluleko. I-Materia ayiqambi inani le-finger-tip unit noma ubude benkambo.",
      "Tshela umkhiqizi ngesifo endaweni elashwayo, amanye ama-cream e-steroid, nezinhlelo zokukhulelwa noma zokuncelisa.",
      "Geza izandla ngemva kokufaka — bika ukuncipha kwesikhumba, imivimbo yokunwebeka, noma ukuvutha okubuyayo ngokushesha.",
      "Buza ukuthi inkambo yelebula kufanele iqhubeke isikhathi esingakanani — ungayiqiqi usuku lokuyeka noma uhlelo lokubuyela.",
      "Uma uthola isifo esanda, amaqhubu amakhulu, noma ukuvuvuka kwe-allergy nokuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie baie potente topiese kortikosteroïed soos op die geëtiketteerde produk aangedui — kort kuurse is algemene berading; bevestig die etiket.",
      "Klobetasool-berading sluit dikwels in om die gesig en lies te vermy tensy jou klinikus so sê, en om nie onder okklusie sonder advies te gebruik nie. Materia versin nie ’n vingerpunt-eenheidtelling of kuurduur nie.",
      "Sê vir jou apteker van infeksie in die behandelde area, ander steroïedrome, en swangerskap- of borsvoedingplanne.",
      "Was hande ná aanwending — rapporteer velverdunning, strekmerke, of terugslag-opvlamming vroeg.",
      "Vra hoe lank die geëtiketteerde kuur moet loop — moenie ’n stopdatum of terugslagplan versin nie.",
      "As jy verspreidende infeksie, ernstige blistering, of allergiese swelling met asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa very potent topical corticosteroid ena hantle kamoo e hlalositsoeng holabel — lithuto tse khutšoane ke keletso e tloaelehileng; netefatsa leibole.",
      "Keletso ea clobetasol hangata e kenyelletsa ho qoba sefahleho le litho ntle le ha ngaka e re joalo, le ho se sebelise tlas'a occlusion ntle le keletso. Materia ha e iqape palo ea finger-tip unit kapa bolelele ba thuto.",
      "Bolella rakhemisi ka tšoaetso sebakeng se alafuoang, li-cream tse ling tsa steroid, le merero ea ho ima kapa ho anyesa.",
      "Hlatsoa matsoho ka mor'a ho sebelisa — tlaleha ho ohla ha letlalo, matšoao a ho otlolla, kapa ho bela ho khutlang kapele.",
      "Botsa hore thuto ea leibole e lokela ho tsoela pele nako e kae — se ke oa iqapa letsatsi la ho emisa kapa moralo oa ho khutla.",
      "Haeba u fumana tšoaetso e atolohang, lihlabana tse matla, kapa ho ruruha ha allergy ka ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le very potent topical corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iikhosi ezimfutshane zihlala zifundiswa; qinisekisa ileyibhile.",
      "Iingcebiso ze-clobetasol zihlala zibandakanya ukuphepha ubuso nezinyo ngaphandle kokuba ugqirha athi kunjalo, nokungasebenzisi phantsi kwe-occlusion ngaphandle kweengcebiso. I-Materia ayiyiqiqi inani le-finger-tip unit okanye ubude bekhosi.",
      "Xelela usokhemisti ngosulelo kwindawo enyangwayo, ezinye ii-cream ze-steroid, nezicwangciso zokukhulelwa okanye zokuncancisa.",
      "Hlamba izandla emva kokufaka — xela ukuncipha kolusu, imivimbo yokunwebeka, okanye ukuvutha okubuyayo kwangoko.",
      "Buza indlela ikhosi yeleyibhile ekufanele iqhubeke ngayo — sukuyiqqa umhla wokuyeka okanye isicwangciso sokubuyela.",
      "Ukuba ufumana usulelo olusasazekayo, amaqhuma anzima, okanye ukudumba kwe-allergy noxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-fusidic-acid": five(
    [
      "Use this topical antibiotic exactly as directed on your labelled product — thin layer to the affected area; confirm the label.",
      "Fusidic acid counselling commonly includes completing the labelled course and not using it in the eyes unless the product is for that use. Materia does not invent a dose, application clock, or course length.",
      "Tell your pharmacist about widespread infection, other topical antibiotics or steroids in the same area, and pregnancy plans.",
      "Wash hands before and after application — report worsening redness, swelling, or fever early.",
      "Ask how long the labelled course should run — do not invent a stop date.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical antibiotic njengoba kubhalwe kumkhiqizo onelebula — ungqimba omncane endaweni ethintekile; qinisekisa ilebula.",
      "Ukwelulekwa kwe-fusidic acid kuvame ukufaka ukuqedela inkambo yelebula nokungayifaki emehlweni ngaphandle uma umkhiqizo ungowalokho. I-Materia ayiqambi umthamo, iwashi lokufaka, noma ubude benkambo.",
      "Tshela umkhiqizi ngesifo esisabalele, amanye ama-antibiotic noma ama-steroid e-topical endaweni efanayo, nezinhlelo zokukhulelwa.",
      "Geza izandla ngaphambi nangemva kokufaka — bika ukubomvu okuya ngokuba kubi, ukuvuvuka, noma umkhuhlane ngokushesha.",
      "Buza ukuthi inkambo yelebula kufanele iqhubeke isikhathi esingakanani — ungayiqiqi usuku lokuyeka.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese antibiotikum soos op die geëtiketteerde produk aangedui — dun laag op die aangetaste area; bevestig die etiket.",
      "Fusidiensuur-berading sluit dikwels in om die geëtiketteerde kuur te voltooi en dit nie in die oë te gebruik tensy die produk daarvoor is nie. Materia versin nie ’n dosis, aanwendingsklok of kuurduur nie.",
      "Sê vir jou apteker van wydverspreide infeksie, ander topiese antibiotika of steroïede in dieselfde area, en swangerskapsplanne.",
      "Was hande voor en ná aanwending — rapporteer erger wordende rooiheid, swelling, of koors vroeg.",
      "Vra hoe lank die geëtiketteerde kuur moet loop — moenie ’n stopdatum versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical antibiotic ena hantle kamoo e hlalositsoeng holabel — lera le tšesafe sebakeng se amehileng; netefatsa leibole.",
      "Keletso ea fusidic acid hangata e kenyelletsa ho qeta thuto ea leibole le ho se e sebelise mahlong ntle le haeba sehlahiswa se etselitsoe seo. Materia ha e iqape tekanyo, nako ea ho sebelisa, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka tšoaetso e atileng, li-antibiotic kapa li-steroid tse ling tsa topical sebakeng se tšoanang, le merero ea ho ima.",
      "Hlatsoa matsoho pele le ka mor'a ho sebelisa — tlaleha bofubelu bo mpefalang, ho ruruha, kapa feberu kapele.",
      "Botsa hore thuto ea leibole e lokela ho tsoela pele nako e kae — se ke oa iqapa letsatsi la ho emisa.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — umaleko ocekeceke kwindawo echaphazelekileyo; qinisekisa ileyibhile.",
      "Iingcebiso ze-fusidic acid zihlala zibandakanya ukugqiba ikhosi yeleyibhile nokungayifaki emehlweni ngaphandle kokuba imveliso yeyaloo ndawo. I-Materia ayiyiqiqi idosi, iwotshi yokufaka, okanye ubude bekhosi.",
      "Xelela usokhemisti ngosulelo olusasazekileyo, ezinye ii-antibiotic okanye ii-steroid ze-topical kwindawo efanayo, nezicwangciso zokukhulelwa.",
      "Hlamba izandla phambi nasemva kokufaka — xela ukubomvu okubiayo, ukudumba, okanye umkhuhlane kwangoko.",
      "Buza indlela ikhosi yeleyibhile ekufanele iqhubeke ngayo — sukuyiqqa umhla wokuyeka.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-permethrin": five(
    [
      "Use this topical scabicide / pediculicide exactly as directed on your labelled product — cream and lotion instructions differ; confirm the label.",
      "Permethrin counselling commonly includes treating close contacts as the clinician advises and washing bedding per the labelled plan. Materia does not invent a dose, leave-on clock, or contact list.",
      "Tell your pharmacist about broken skin, asthma, and pregnancy or breastfeeding plans before use.",
      "Itching can continue for a while after successful treatment — ask when to seek review if it worsens.",
      "Ask how long the product should stay on before washing — do not invent minutes or a second-application schedule.",
      "If you get severe allergic swelling, widespread blistering, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical scabicide / pediculicide njengoba kubhalwe kumkhiqizo onelebula — imiyalelo ye-cream ne-lotion iyahluka; qinisekisa ilebula.",
      "Ukwelulekwa kwe-permethrin kuvame ukufaka ukwelapha abantu abaseduze njengoba udokotela ecebisa nokuwasha izingubo ngohlelo lwelebula. I-Materia ayiqambi umthamo, iwashi lokushiya, noma uhlu lwabantu.",
      "Tshela umkhiqizi ngesikhumba esaphukile, i-asthma, nezinhlelo zokukhulelwa noma zokuncelisa ngaphambi kokusebenzisa.",
      "Ukunyenyeza kungaqhubeka isikhashana ngemva kokwelashwa okuphumelelayo — buza ukuthi kufanele ubuyekeze nini uma kuba kubi.",
      "Buza ukuthi umkhiqizo kufanele uhlale isikhathi esingakanani ngaphambi kokuwasha — ungayiqiqi amaminithi noma uhlelo lokufaka okwesibili.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, amaqhubu asabalele, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese skabisied / pediculicide soos op die geëtiketteerde produk aangedui — room- en lotioninstruksies verskil; bevestig die etiket.",
      "Permetrien-berading sluit dikwels in om noue kontakte te behandel soos die klinikus adviseer en beddegoed per die geëtiketteerde plan te was. Materia versin nie ’n dosis, laat-aan-klok of kontaklys nie.",
      "Sê vir jou apteker van gebreekte vel, asma, en swangerskap- of borsvoedingplanne vóór gebruik.",
      "Jeuk kan ’n rukkie ná suksesvolle behandeling voortduur — vra wanneer om hersiening te soek as dit vererger.",
      "Vra hoe lank die produk moet aanbly vóór was — moenie minute of ’n tweede-aanwendingskedule versin nie.",
      "As jy ernstige allergiese swelling, wydverspreide blistering, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical scabicide / pediculicide ena hantle kamoo e hlalositsoeng holabel — litaelo tsa cream le lotion lia fapana; netefatsa leibole.",
      "Keletso ea permethrin hangata e kenyelletsa ho alafa batho ba haufi kamoo ngaka e eletsang le ho hlatsoa likobo kamoralo oa leibole. Materia ha e iqape tekanyo, nako ea ho siea, kapa lenane la batho.",
      "Bolella rakhemisi ka letlalo le robehileng, asthma, le merero ea ho ima kapa ho anyesa pele u sebelisa.",
      "Ho hlohlona ho ka tsoela pele nakoana ka mor'a kalafo e atlehileng — botsa hore u batle tlhahlobo neng haeba ho mpefala.",
      "Botsa hore sehlahiswa se lokela ho sala nako e kae pele u hlatsoa — se ke oa iqapa metsotso kapa kemiso ea ho sebelisa ka bobeli.",
      "Haeba u fumana ho ruruha ha allergy ho matla, lihlabana tse atileng, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical scabicide / pediculicide ngokuchanekileyo njengoko kubhaliwe kwileyibhile — imiyalelo ye-cream ne-lotion iyahluka; qinisekisa ileyibhile.",
      "Iingcebiso ze-permethrin zihlala zibandakanya ukunyanga abantu abakufutshane njengoko ugqirha ecebisa nokuhlamba iingubo ngokwesicwangciso seleyibhile. I-Materia ayiyiqiqi idosi, iwotshi yokushiya, okanye uluhlu lwabantu.",
      "Xelela usokhemisti ngolusu olwaphukileyo, i-asthma, nezicwangciso zokukhulelwa okanye zokuncancisa phambi kokusebenzisa.",
      "Ukurhawuzela kunokuqhubeka ixesha elithile emva konyango oluyimpumelelo — buza ukuba kufanele ujonge nini ukuba kuyabiya.",
      "Buza indlela imveliso ekufanele ihlale ngayo phambi kokuhlamba — sukuyiqqa imizuzu okanye ishedyuli yokufaka okwesibini.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, amaqhuma asasazekileyo, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-fluticasone-nasal": five(
    [
      "Use this intranasal corticosteroid exactly as directed on your labelled product — shake and prime as the label advises.",
      "Fluticasone nasal counselling commonly includes aiming away from the septum and rinsing the tip as labelled. Materia does not invent a spray count or step-up plan.",
      "Tell your pharmacist about recent nose surgery, nosebleeds, and ALL other nasal sprays on your list.",
      "Report persistent nosebleeds, vision change, or white patches in the nose/throat early.",
      "Ask how long the labelled course should run — do not invent a stop date or a rebound plan.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le intranasal corticosteroid njengoba kubhalwe kumkhiqizo onelebula — shukumisa futhi u-prime njengoba ilebula icebisa.",
      "Ukwelulekwa kwe-fluticasone nasal kuvame ukufaka ukukhomba kude ne-septum nokugeza isihloko njengoba kubhaliwe. I-Materia ayiqambi inani leziphungiso noma uhlelo lokunyuka.",
      "Tshela umkhiqizi ngokuhlinzwa kwekhala kwakamuva, ukopha kwekhala, NAWO WONKE amanye ama-spray ekhala.",
      "Bika ukopha kwekhala okuqhubekayo, ukushintsha kokubona, noma amabala amhlophe ekhala/emphinjeni ngokushesha.",
      "Buza ukuthi inkambo yelebula kufanele iqhubeke isikhathi esingakanani — ungayiqiqi usuku lokuyeka noma uhlelo lokubuyela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie intranasale kortikosteroïed soos op die geëtiketteerde produk aangedui — skud en prime soos die etiket adviseer.",
      "Flutikasoon-nasale berading sluit dikwels in om weg van die septum te mik en die punt soos geëtiketteer te spoel. Materia versin nie ’n spuittelling of opgraderingsplan nie.",
      "Sê vir jou apteker van onlangse neuschirurgie, neusbloedings, en ALLE ander neusspuite op jou lys.",
      "Rapporteer aanhoudende neusbloedings, sigverandering, of wit kolle in die neus/keel vroeg.",
      "Vra hoe lank die geëtiketteerde kuur moet loop — moenie ’n stopdatum of terugslagplan versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa intranasal corticosteroid ena hantle kamoo e hlalositsoeng holabel — sisanya 'me u prime kamoo leibole e eletsang.",
      "Keletso ea fluticasone nasal hangata e kenyelletsa ho tobetsa hole le septum le ho hlatsoa ntlha kamoo e ngotsoeng. Materia ha e iqape palo ea liphofu kapa moralo oa ho nyolohela.",
      "Bolella rakhemisi ka opereishene ea nko ea morao-rao, ho tsoa mali ka nko, le LI-SPRAY TSOHLE tsa nko.",
      "Tlaleha ho tsoa mali ka nko ho tsoelang pele, phetoho ea pono, kapa matheba a sootho ka nkong/'metsong kapele.",
      "Botsa hore thuto ea leibole e lokela ho tsoela pele nako e kae — se ke oa iqapa letsatsi la ho emisa kapa moralo oa ho khutla.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le intranasal corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — shukumisa uze u-prime njengoko ileyibhile icebisa.",
      "Iingcebiso ze-fluticasone nasal zihlala zibandakanya ukujolisa kude ne-septum nokuhlamba isihloko njengoko kubhaliwe. I-Materia ayiyiqiqi inani leziphungiso okanye isicwangciso sokunyuka.",
      "Xelela usokhemisti ngotyando lwempumlo lwakutshanje, ukopha kwempumlo, NAZO ZONKE ezinye ii-spray zempumlo.",
      "Xela ukopha kwempumlo okuqhubekayo, utshintsho lokubona, okanye amabala amhlophe empumlweni/emqaleni kwangoko.",
      "Buza indlela ikhosi yeleyibhile ekufanele iqhubeke ngayo — sukuyiqqa umhla wokuyeka okanye isicwangciso sokubuyela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-desmopressin": five(
    [
      "Take this vasopressin analogue exactly as directed on your labelled product — tablets, melts, and nasal forms differ; confirm the form you were given.",
      "Desmopressin counselling commonly includes fluid-restriction teaching for some indications — follow your clinician’s plan, not an invented litre target. Materia does not invent a dose or sodium target.",
      "Tell your pharmacist about heart failure, kidney disease, and ALL other medicines that affect fluid balance.",
      "Report severe headache, confusion, nausea, or sudden weight gain early — these may need urgent review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you seize, collapse, or get trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le vasopressin analogue njengoba kubhalwe kumkhiqizo onelebula — amaphilisi, ama-melt, nezindlela zekhala ziyahluka; qinisekisa uhlobo.",
      "Ukwelulekwa kwe-desmopressin kuvame ukufaka ukufundisa ukunciphisa uketshezi kwezinye izimo — landela uhlelo lukadokotela, hhayi umgomo wamalitha oqanjiwe. I-Materia ayiqambi umthamo noma umgomo we-sodium.",
      "Tshela umkhiqizi nge-heart failure, isifo sezinso, NAWO WONKE amanye amaphilisi athinta ibhalansi yoketshezi.",
      "Bika ikhanda elibuhlungu kakhulu, ukudideka, isicanucanu, noma ukukhuluphala okuzumayo ngokushesha — lokhu kungadinga ukubuyekezwa okuphuthumayo.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uxhuzula, uwa, noma uphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie vasopressienanaloog soos op die geëtiketteerde produk aangedui — tablette, smeltvorms en nasale vorms verskil; bevestig die vorm wat jy ontvang het.",
      "Desmopressien-berading sluit dikwels vloeistofbeperkingsonderrig vir sommige aanduidings in — volg jou klinikus se plan, nie ’n versinde literteiken nie. Materia versin nie ’n dosis of natriumteiken nie.",
      "Sê vir jou apteker van hartversaking, niersiekte, en ALLE ander medisyne wat vloeistofbalans beïnvloed.",
      "Rapporteer ernstige hoofpyn, verwarring, naarheid, of skielike gewigstoename vroeg — dit mag dringende hersiening nodig hê.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy stuiptrek, ineenstort, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa vasopressin analogue ena hantle kamoo e hlalositsoeng holabel — litafole, li-melt, le mefuta ea nko ea fapana; netefatsa mofuta.",
      "Keletso ea desmopressin hangata e kenyelletsa thuto ea ho fokotsa maro bakeng sa litšoantšo tse ling — latele moralo oa ngaka, eseng sepheo sa lilithara se iqapiloeng. Materia ha e iqape tekanyo kapa sepheo sa sodium.",
      "Bolella rakhemisi ka heart failure, lefu la liphio, le MERIANA EOHLE e amang tekanyo ea maro.",
      "Tlaleha hlooho e bohloko haholo, ho ferekana, ho nyatsa, kapa ho eketsa boima ka tšohanyetso kapele — sena se ka hloka tlhahlobo ea potlako.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u thothomela, u oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le vasopressin analogue ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iipilisi, ii-melt, neendlela zempumlo ziyahluka; qinisekisa uhlobo.",
      "Iingcebiso ze-desmopressin zihlala zibandakanya ukufundisa ukunciphisa ulwelo kwezinye iimeko — landela isicwangciso sogqirha, hayi usukelo lweelitha oluyiqiwe. I-Materia ayiyiqiqi idosi okanye usukelo lwe-sodium.",
      "Xelela usokhemisti nge-heart failure, isifo sezintso, NAWO ONKE amanye amayeza achaphazela ibhalansi yolwelo.",
      "Xela intloko ebuhlungu kakhulu, ukudideka, isicanucanu, okanye ukunyuka kobunzima ngequbuliso kwangoko — oku kunokufuna ukujongwa ngokukhawuleza.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba uyaxhuzula, uwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
