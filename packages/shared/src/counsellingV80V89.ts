/**
 * v80–v89 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V80_TO_V89: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-furosemide": five(
    [
      "Take this loop diuretic exactly as directed on your labelled product.",
      "Loop-diuretic counselling commonly includes stronger or more frequent urination and planning bathroom access — confirm timing against the labelled product.",
      "Electrolyte and dehydration teaching belongs with your pharmacist or clinician — Materia does not invent a dose, clock time, or potassium/sodium target.",
      "Tell your pharmacist about dizziness, muscle cramps, hearing changes, gout flares, or if you become very thirsty or unwell.",
      "Ask before combining with other water tablets or supplements that affect salts — confirm against the labelled product and your care plan.",
      "If you faint, get chest pain, severe weakness, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le loop diuretic njengoba kubhalwe kumkhiqizo onelebula.",
      "Ukwelulekwa kwe-loop diuretic kuvame ukufaka ukuchama okunamandla noma kaningi kanye nokuhlela ukufinyelela endlini yangasese — qinisekisa isikhathi kumkhiqizo onelebula.",
      "Ukufundiswa nge-electrolyte nokoma kungokomkhiqizi noma udokotela — i-Materia ayiqambi umthamo, isikhathi, noma umgomo we-potassium/sodium.",
      "Tshela umkhiqizi ngesiyezi, ukuqaqamba kwemisipha, ukushintsha kokuzwa, ukuvuvuka kwe-gout, noma uma oma kakhulu noma ugula.",
      "Buza ngaphambi kokuhlanganisa namanye amaphilisi amanzi noma izithako ezithinta usawoti — qinisekisa kumkhiqizo onelebula nohlelo lokunakekelwa.",
      "Uma uwela, uthola ubuhlungu besifuba, ubuthakathaka obukhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie lus-diuretikum soos op die geëtiketteerde produk aangedui.",
      "Lus-diuretikum-berading sluit dikwels sterker of meer gereelde urinering en beplanning van badkamartoegang in — bevestig tydsberekening teen die geëtiketteerde produk.",
      "Elektroliet- en dehidrasie-onderrig hoort by jou apteker of klinikus — Materia versin nie ’n dosis, kloktyd of kalium/natriumteiken nie.",
      "Sê vir jou apteker van duiseligheid, spierkrampe, gehoorveranderinge, jig-opvlamsels, of as jy baie dors of siek word.",
      "Vra eers voor jy met ander waterpille of aanvullings wat soute beïnvloed kombineer — bevestig teen die geëtiketteerde produk en jou sorgplan.",
      "As jy flou word, borspyn, erge swakheid of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa diuretic ena ea loop hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
      "Keletso ea loop diuretic hangata e kenyelletsa ho ntša moroto ka matla kapa hangata le ho hlophisa phihlello ea ntloana — netefatsa nako holabel.",
      "Thuto ea electrolyte le ho oma ke ea rakhemisi kapa ngaka — Materia ha e iqape tekanyo, nako, kapa sepheo sa potassium/sodium.",
      "Bolella rakhemisi ka ho tsekela, ho tsitsipa ha mesifa, ho fetoha ha ho utloa, gout, kapa haeba u nyoruoa haholo kapa u kula.",
      "Botsa pele u kopanya le lipilisi tse ling tsa metsi kapa lihlahisoa tse amang letsoai — netefatsa holabel le moralo oa tlhokomelo.",
      "Haeba u akheha, u fumana bohloko ba sefuba, bofokoli bo tebileng, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa eli diuretic ye-loop ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
      "Iingcebiso ze-loop diuretic zihlala zibandakanya ukuchama okunamandla okanye rhoqo kunye nokucwangcisa ukufikelela kwindlu yangasese — qinisekisa ixesha kwileyibhile.",
      "Ukufundiswa nge-electrolyte nokoma kukuka usokhemisti okanye ugqirha — i-Materia ayiyiqiqi idosi, ixesha, okanye usukelo lwe-potassium/sodium.",
      "Xelela usokhemisti ngesiyezi, ukuqaqamba kwemisipha, utshintsho lokuva, i-gout, okanye ukuba woma kakhulu okanye uyagula.",
      "Buza phambi kokudibanisa namanye amaphilisi amanzi okanye izongezelelo ezichaphazela ityuwa — qinisekisa kwileyibhile nakwicandelo lakho lokhathalelo.",
      "Ukuba uyawa, ufumana iintlungu zesifuba, ubuthathaka obukhulu, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-atenolol": five(
    [
      "Take this beta-blocker exactly as directed on your labelled product.",
      "Do not stop suddenly without your clinician — beta-blocker counselling commonly includes a planned withdrawal. Materia does not invent a dose or heart-rate target.",
      "Tell your pharmacist if you have asthma, COPD, diabetes, a very slow pulse, cold extremities, or dizziness on standing — confirm against the labelled product.",
      "Tiredness and exercise-tolerance changes are commonly discussed — report new or worsening symptoms rather than adjusting on your own.",
      "Ask how this medicine fits with other heart or blood-pressure medicines on your list.",
      "If you faint, get chest pain, severe shortness of breath, or swelling of the face/lips/tongue — seek emergency care.",
    ],
    [
      "Sebenzisa le beta-blocker njengoba kubhalwe kumkhiqizo onelebula.",
      "Ungayeki ngokuzumayo ngaphandle kwedokotela — ukwelulekwa kwe-beta-blocker kuvame ukufaka uhlelo lokuyeka kancane. I-Materia ayiqambi umthamo noma umgomo wesivinini senhliziyo.",
      "Tshela umkhiqizi uma une-asthma, i-COPD, isifo sikashukela, isivinini senhliziyo esiphansi kakhulu, izitho ezibandayo, noma isiyezi uma umi — qinisekisa kumkhiqizo onelebula.",
      "Ukukhathala nokushintsha kokubekezelela ukuzivocavoca kuvame ukuxoxwa — bika izimpawu ezintsha noma eziba zimbi kunokuzishintsha uqobo.",
      "Buza ukuthi lo muthi uhambisana kanjani namanye amithi enhliziyo noma omfutho wegazi ohlwini lwakho.",
      "Uma uwela, uthola ubuhlungu besifuba, ukuphefumula kancane kakhulu, noma ukuvuvuka kobuso/izindebe/ulimi — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie beta-blokkeerder soos op die geëtiketteerde produk aangedui.",
      "Moenie skielik stop sonder jou klinikus nie — beta-blokkeerder-berading sluit dikwels ’n beplande onttrekking in. Materia versin nie ’n dosis of hartklopteiken nie.",
      "Sê vir jou apteker as jy asma, COPD, diabetes, ’n baie stadige pols, koue ledemate of duiseligheid as jy staan het — bevestig teen die geëtiketteerde produk.",
      "Moegheid en oefeningverdraagsaamheid word dikwels bespreek — rapporteer nuwe of verergerende simptome eerder as om self aan te pas.",
      "Vra hoe hierdie middel by ander hart- of bloeddrukmedisyne op jou lys pas.",
      "As jy flou word, borspyn, erge kortasem of swelling van die gesig/lippe/tong kry — soek noodhulp.",
    ],
    [
      "Sebelisa beta-blocker ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
      "Se ke kha hang-hang ntle le ngaka — keletso ea beta-blocker hangata e kenyelletsa moralo oa ho emisa butle. Materia ha e iqape tekanyo kapa sepheo sa lebelo la pelo.",
      "Bolella rakhemisi haeba u na le asthma, COPD, diabetes, lebelo la pelo le tlase haholo, litho tse batang, kapa ho tsekela ha u ema — netefatsa holabel.",
      "Mokhathala le liphetoho tsa ho mamella boikoetliso hangata li buuoa — tlaleha matšoao a macha kapa a mpefala ho e-na le ho ikhethela.",
      "Botsa hore na moriana ona o tsamaisana joang le meriana e meng ea pelo kapa khatello ea mali lethathamong la hau.",
      "Haeba u akheha, u fumana bohloko ba sefuba, ho hema thata, kapa ho ruruha ha sefahleho/melomo/leleme — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa eli beta-blocker ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
      "Sukuyeka ngequbuliso ngaphandle kogqirha — iingcebiso ze-beta-blocker zihlala zibandakanya isicwangciso sokuyeka kancinci. I-Materia ayiyiqiqi idosi okanye usukelo lwentshukumo yentliziyo.",
      "Xelela usokhemisti ukuba une-asthma, i-COPD, isifo seswekile, intshukumo yentliziyo ecothayo kakhulu, amalungu abandayo, okanye isiyezi xa umi — qinisekisa kwileyibhile.",
      "Ukudinwa kunye notshintsho lokunyamezela ukuzilolonga kudla ngokuxoxwa — xela iimpawu ezintsha okanye ezimbi kunokutshintsha ngokwakho.",
      "Buza ukuba eli yeza lihambelana njani namanye amayeza entliziyo okanye oxinzelelo lwegazi kuluhlu lwakho.",
      "Ukuba uyawa, ufumana iintlungu zesifuba, ukuphefumula nzima kakhulu, okanye ukudumba kobuso/imilomo/ulwimi — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-spironolactone": five(
    [
      "Take this potassium-sparing diuretic exactly as directed on your labelled product.",
      "Potassium and salt teaching belongs with your pharmacist — Materia does not invent a potassium target, diet gram amount, or dose.",
      "Tell your pharmacist if you are pregnant, planning pregnancy, or breastfeeding — confirm against the labelled product.",
      "Report muscle weakness, irregular heartbeat feeling, breast tenderness in any sex, or unusual thirst.",
      "Ask before using salt substitutes or potassium supplements — confirm against your care plan and labelled product.",
      "If you faint, get severe weakness, chest pain, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le diuretic egcina i-potassium njengoba kubhalwe kumkhiqizo onelebula.",
      "Ukufundiswa nge-potassium nosawoti kungokomkhiqizi — i-Materia ayiqambi umgomo we-potassium, amagremu okudla, noma umthamo.",
      "Tshela umkhiqizi uma ukhulelwe, uhlela ukukhulelwa, noma uncelisa — qinisekisa kumkhiqizo onelebula.",
      "Bika ubuthakathaka bemisipha, ukuzwa inhliziyo engajwayelekile, ubuhlungu besebele kubo bobabili ubulili, noma ukoma okungajwayelekile.",
      "Buza ngaphambi kokusebenzisa izithako ezifana nosawoti noma izongezelelo ze-potassium — qinisekisa nohlelo lokunakekelwa nomkhiqizo onelebula.",
      "Uma uwela, uthola ubuthakathaka obukhulu, ubuhlungu besifuba, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie kaliumsparende diuretikum soos op die geëtiketteerde produk aangedui.",
      "Kalium- en soutonderrig hoort by jou apteker — Materia versin nie ’n kaliumteiken, dieetgramhoeveelheid of dosis nie.",
      "Sê vir jou apteker as jy swanger is, beplan om swanger te raak, of borsvoed — bevestig teen die geëtiketteerde produk.",
      "Rapporteer spierswakheid, onreëlmatige hartklop-gevoel, borssensitiwiteit in enige geslag, of ongewone dors.",
      "Vra eers voor jy soutervangers of kaliumaanvullings gebruik — bevestig teen jou sorgplan en geëtiketteerde produk.",
      "As jy flou word, erge swakheid, borspyn of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa diuretic ena e bolokang potassium hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
      "Thuto ea potassium le letsoai ke ea rakhemisi — Materia ha e iqape sepheo sa potassium, li-gram tsa dijo, kapa tekanyo.",
      "Bolella rakhemisi haeba u imme, u rera ho ima, kapa u anyesa — netefatsa holabel.",
      "Tlaleha bofokoli ba mesifa, ho utloa pelo e sa tloaelehang, bohloko ba matsoele ho mofuta ofe kapa ofe, kapa lenyora le sa tloaelehang.",
      "Botsa pele u sebelisa lihlahisoa tse nkang sebaka sa letsoai kapa lihlahisoa tsa potassium — netefatsa le moralo oa tlhokomelo le holabel.",
      "Haeba u akheha, u fumana bofokoli bo tebileng, bohloko ba sefuba, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa eli diuretic egcina i-potassium ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
      "Ukufundiswa nge-potassium netyuwa kukuka usokhemisti — i-Materia ayiyiqiqi usukelo lwe-potassium, iigram zokutya, okanye idosi.",
      "Xelela usokhemisti ukuba ukhulelwe, uceba ukukhulelwa, okanye uncelisa — qinisekisa kwileyibhile.",
      "Xela ubuthathaka bemisipha, ukuziva intliziyo engaqhelekanga, ubuhlungu bamabele kuwo nawuphi ubuni, okanye ukoma okungaqhelekanga.",
      "Buza phambi kokusebenzisa izithethe zetyuwa okanye izongezelelo ze-potassium — qinisekisa kwicandelo lokhathalelo nakwileyibhile.",
      "Ukuba uyawa, ufumana ubuthathaka obukhulu, iintlungu zesifuba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-digoxin": five(
    [
      "Take this heart medicine exactly as directed on your labelled product — do not invent an extra dose if you miss one; follow the labelled missed-dose advice.",
      "Digoxin has a narrow therapeutic window — blood-level and pulse teaching belongs with your clinician. Materia does not invent a digoxin level, pulse cut-off, or dose.",
      "Tell your pharmacist about nausea, vomiting, appetite loss, visual changes (including colour vision), confusion, or a very slow pulse.",
      "Ask how this fits with other heart medicines, diuretics, and antibiotics on your list — confirm interactions with a professional; Materia does not invent an interaction list.",
      "Keep follow-up and monitoring appointments as your care plan requires.",
      "If you faint, get severe palpitations, chest pain, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa lo muthi wenhliziyo njengoba kubhalwe kumkhiqizo onelebula — ungaziqambeli umthamo owengeziwe uma ukhohlwa; landela iseluleko somthamo olahlekile kulebula.",
      "I-digoxin ine-window yokwelapha emincane — ukufundiswa ngezinga legazi nesivinini senhliziyo kungodokotela. I-Materia ayiqambi izinga le-digoxin, umkhawulo wesivinini, noma umthamo.",
      "Tshela umkhiqizi ngesicanucanu, ukuhlanza, ukulahlekelwa ukudla, ukushintsha kokubona (kuhlanganise imibala), ukudideka, noma isivinini senhliziyo esiphansi kakhulu.",
      "Buza ukuthi lo muhambisana kanjani namanye amithi enhliziyo, ama-diuretic, nama-antibiotic ohlwini lwakho — qinisekisa ukuxhumana nochwepheshe; i-Materia ayiqambi uhlu lokuxhumana.",
      "Gcina izikhathi zokulandelela nokuhlola njengoba uhlelo lokunakekelwa ludinga.",
      "Uma uwela, uthola ukushaya kwenhliziyo okukhulu, ubuhlungu besifuba, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie hartmedisyne soos op die geëtiketteerde produk aangedui — versin nie ’n ekstra dosis as jy een mis nie; volg die gemerkte advies vir gemiste dosisse.",
      "Digoksien het ’n nou terapeutiese venster — bloedvlak- en polsonderrig hoort by jou klinikus. Materia versin nie ’n digoksienvlak, polsafsnit of dosis nie.",
      "Sê vir jou apteker van naarheid, braking, eetlusverlies, visuele veranderinge (insluitend kleursig), verwarring of ’n baie stadige pols.",
      "Vra hoe dit by ander hartmedisyne, diuretika en antibiotika op jou lys pas — bevestig interaksies by ’n professionele; Materia versin nie ’n interaksielys nie.",
      "Hou opvolg- en moniteringafsprake soos jou sorgplan vereis.",
      "As jy flou word, erge hartklop, borspyn of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa moriana ona oa pelo hantle kamoo e hlalositsoeng holabel — se iqape tekanyo e eketsehileng haeba u e lebala; latela keletso ea tekanyo e lahlehileng holabel.",
      "Digoxin e na le window e nyenyane ea kalafo — thuto ea boemo ba mali le lebelo la pelo ke ea ngaka. Materia ha e iqape boemo ba digoxin, moeli oa lebelo, kapa tekanyo.",
      "Bolella rakhemisi ka ho nyaroha, ho hlatsa, ho lahleheloa ke takatso ea lijo, liphetoho tsa pono (ho kenyeletsa mebala), ho ferekana, kapa lebelo la pelo le tlase haholo.",
      "Botsa hore na o tsamaisana joang le meriana e meng ea pelo, diuretics, le li-antibiotic lethathamong la hau — netefatsa litšebelisano le setsebi; Materia ha e iqape lethathamo la litšebelisano.",
      "Boloka likopano tsa ho latela le ho hlahloba kamoo moralo oa tlhokomelo o hlokang.",
      "Haeba u akheha, u fumana ho otla ha pelo ho matla, bohloko ba sefuba, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa eli yeza lentliziyo ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyiqamba idosi eyongezelelweyo ukuba uyilibala; landela ingcebiso yedosi elahlekileyo kwileyibhile.",
      "I-digoxin ine-window yokunyanga emincinci — ukufundiswa ngenqanaba legazi nentshukumo yentliziyo kukugqirha. I-Materia ayiyiqiqi inqanaba le-digoxin, umda wentshukumo, okanye idosi.",
      "Xelela usokhemisti ngesicanuko, ukugabha, ukulahlekelwa ngumnqweno wokutya, utshintsho lokubona (kuquka imibala), ukudideka, okanye intshukumo yentliziyo ecothayo kakhulu.",
      "Buza ukuba oku kuhambelana njani namanye amayeza entliziyo, ii-diuretic, kunye nee-antibiotic kuluhlu lwakho — qinisekisa unxibelelwano nengcali; i-Materia ayiyiqiqi uluhlu lonxibelelwano.",
      "Gcina iintlanganiso zokulandelela nokuhlola njengoko icandelo lakho lokhathalelo lifuna.",
      "Ukuba uyawa, ufumana ukubetha kwentliziyo okukhulu, iintlungu zesifuba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-rifampicin": five(
    [
      "Take this TB medicine exactly as directed on your labelled product — adherence and finishing the course are critical unless your clinician stops it.",
      "Orange-red urine, tears, or sweat is commonly counselled and can stain soft contact lenses — confirm against the labelled product. Materia does not invent a dose or treatment duration.",
      "Enzyme-induction counselling: tell your pharmacist about ALL other medicines, including hormonal contraception — confirm against the labelled product; Materia does not invent an interaction list.",
      "Report yellowing of skin or eyes, dark urine, severe fatigue, or unexplained bruising.",
      "Do not share doses or stop early because you feel better — TB counselling emphasises planned completion with your care team.",
      "If you get a severe rash, jaundice, swelling, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa lo muthi we-TB njengoba kubhalwe kumkhiqizo onelebula — ukulandela nokugcina inkambo kubalulekile ngaphandle kokuba udokotela uyayeka.",
      "Umchamo, izinyembezi, noma umjuluko o-orange-bomvu kuvame ukwelulekwa futhi kungcolisa ama-contact lens athambile — qinisekisa kumkhiqizo onelebula. I-Materia ayiqambi umthamo noma ubude bokwelashwa.",
      "Ukwelulekwa kwe-enzyme induction: tshela umkhiqizi NGAYO YONKE eminye imithi, kuhlanganise ukuvimbela ukukhulelwa kwe-hormone — qinisekisa kumkhiqizo onelebula; i-Materia ayiqambi uhlu lokuxhumana.",
      "Bika ukuphaphatheka kwesikhumba noma amehlo, umchamo omnyama, ukukhathala kakhulu, noma ukulimala okungachazeki.",
      "Ungabelani ngemithamo noma uyeke ngaphambi kwesikhathi ngoba uzizwa ungcono — ukwelulekwa kwe-TB kugcizelela ukuqeda ngokuhleliwe nethimba lakho.",
      "Uma uthola isikhumba esibi, ukuphaphatheka, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie TB-medisyne soos op die geëtiketteerde produk aangedui — nakoming en die kursus voltooi is krities tensy jou klinikus dit stop.",
      "Oranje-rooi urine, trane of sweet word dikwels berade en kan sagte kontaklense vlek — bevestig teen die geëtiketteerde produk. Materia versin nie ’n dosis of behandelingsduur nie.",
      "Ensieminduksie-berading: sê vir jou apteker van ALLE ander medisyne, insluitend hormonale voorbehoeding — bevestig teen die geëtiketteerde produk; Materia versin nie ’n interaksielys nie.",
      "Rapporteer vergeling van vel of oë, donker urine, erge moegheid of onverklaarde kneusings.",
      "Moenie dosisse deel of vroeg stop omdat jy beter voel nie — TB-berading beklemtoon beplande voltooiing met jou sorgspan.",
      "As jy ’n ernstige uitslag, geelsug, swelling of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa moriana ona oa TB hantle kamoo e hlalositsoeng holabel — ho latela le ho qetella thuto ho bohlokoa ntle le haeba ngaka e e emisa.",
      "Moroto, meokho, kapa mofufutso o sootho-khubelu hangata o elelloa ’me o ka silafatsa li-contact lens tse bonolo — netefatsa holabel. Materia ha e iqape tekanyo kapa nako ea kalafo.",
      "Keletso ea enzyme induction: bolella rakhemisi ka MERIANA EOHLE e meng, ho kenyeletsa thibelo ea kimolo ea hormone — netefatsa holabel; Materia ha e iqape lethathamo la litšebelisano.",
      "Tlaleha ho mosehla ha letlalo kapa mahlo, moroto o lefifi, mokhathala o tebileng, kapa maqeba a sa hlaloseng.",
      "Se arolelane litekanyo kapa u emise pele hobane u ikutloa u le betere — keletso ea TB e hatisa ho qetella ka moralo le sehlopha sa hau.",
      "Haeba u fumana lekhopho le tebileng, ho mosehla, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa eli yeza le-TB ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukuthobela nokugqiba ikhosi kubalulekile ngaphandle kokuba ugqirha ayeka.",
      "Umchamo, iinyembezi, okanye umjuluko o-orenji-bomvu udla ngokucebiswa kwaye ungcola ii-contact lens ezithambileyo — qinisekisa kwileyibhile. I-Materia ayiyiqiqi idosi okanye ubude bonyango.",
      "Iingcebiso ze-enzyme induction: xelela usokhemisti NGAYO YONKE amanye amayeza, kuquka ukuthintela ukukhulelwa kwe-hormone — qinisekisa kwileyibhile; i-Materia ayiyiqiqi uluhlu lonxibelelwano.",
      "Xela ukutyheliwa kwesikhumba okanye amehlo, umchamo omnyama, ukudinwa okukhulu, okanye ukulimala okungachazekiyo.",
      "Sukwabelana ngeedosi okanye uyeke kwangethuba ngenxa yokuba uziva ungcono — iingcebiso ze-TB zigxininisa ukugqiba ngokucwangcisiweyo neqela lakho lokhathalelo.",
      "Ukuba ufumana irashi eqatha, ukutyheliwa, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-isoniazid": five(
    [
      "Take this TB medicine exactly as directed on your labelled product — finish the course unless your clinician tells you to stop.",
      "Alcohol caution and liver teaching are commonly counselled with isoniazid — confirm against the labelled product.",
      "Tingling in hands or feet (neuropathy) and vitamin B6 discussions belong with your pharmacist — Materia does not invent a B6 dose, food clock, or course length.",
      "Tell your pharmacist about other medicines, yellowing, unusual tiredness, or mood changes.",
      "Keep clinic follow-up as your TB care plan requires — do not invent your own monitoring schedule.",
      "If you get a severe rash, jaundice, confusion, seizures, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa lo muthi we-TB njengoba kubhalwe kumkhiqizo onelebula — qeda inkambo ngaphandle kokuba udokotela uthi uyeke.",
      "Isixwayiso sotshwala nokufundiswa ngesibindi kuvame ukwelulekwa ne-isoniazid — qinisekisa kumkhiqizo onelebula.",
      "Ukucwila ezandleni noma ezinyaweni (neuropathy) nezingxoxo ze-vitamin B6 kungokomkhiqizi — i-Materia ayiqambi umthamo we-B6, isikhathi sokudla, noma ubude benkambo.",
      "Tshela umkhiqizi ngeminye imithi, ukuphaphatheka, ukukhathala okungajwayelekile, noma ukushintsha kwemizwa.",
      "Gcina ukulandelela ekliniki njengoba uhlelo lwe-TB ludinga — ungaziqambeli uhlelo lokuhlola.",
      "Uma uthola isikhumba esibi, ukuphaphatheka, ukudideka, ukuxhuzula, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie TB-medisyne soos op die geëtiketteerde produk aangedui — voltooi die kursus tensy jou klinikus sê stop.",
      "Alkoholversigtigheid en leweronderrig word dikwels saam met isoniazied berade — bevestig teen die geëtiketteerde produk.",
      "Tinteling in hande of voete (neuropatie) en vitamien B6-gesprekke hoort by jou apteker — Materia versin nie ’n B6-dosis, voedselklok of kursuslengte nie.",
      "Sê vir jou apteker van ander medisyne, vergeling, ongewone moegheid of buiestemmingsveranderinge.",
      "Hou kliniekopvolg soos jou TB-sorgplan vereis — versin nie jou eie moniteringsskedule nie.",
      "As jy ’n ernstige uitslag, geelsug, verwarring, stuipe of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa moriana ona oa TB hantle kamoo e hlalositsoeng holabel — qetella thuto ntle le haeba ngaka e re u emise.",
      "Tlhatlhobo ea joala le thuto ea sebete hangata li elelloa le isoniazid — netefatsa holabel.",
      "Ho hlaba matsohong kapa maotong (neuropathy) le lipuisano tsa vitamin B6 ke tsa rakhemisi — Materia ha e iqape tekanyo ea B6, nako ea lijo, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka meriana e meng, ho mosehla, mokhathala o sa tloaelehang, kapa liphetoho tsa maikutlo.",
      "Boloka ho latela kliniki kamoo moralo oa TB o hlokang — se iqape kemiso ea hau ea ho hlahloba.",
      "Haeba u fumana lekhopho le tebileng, ho mosehla, ho ferekana, ho thothomela, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa eli yeza le-TB ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gqiba ikhosi ngaphandle kokuba ugqirha athi uyeke.",
      "Isilumkiso sotywala nokufundiswa ngesibindi kudla ngokucebiswa kunye ne-isoniazid — qinisekisa kwileyibhile.",
      "Ukuziva okudabukisayo ezandleni okanye ezinyaweni (neuropathy) neengxoxo ze-vitamin B6 kukuka usokhemisti — i-Materia ayiyiqiqi idosi ye-B6, ixesha lokutya, okanye ubude bekhosi.",
      "Xelela usokhemisti ngamanye amayeza, ukutyheliwa, ukudinwa okungaqhelekanga, okanye utshintsho lwemvakalelo.",
      "Gcina ukulandelela eklinikhi njengoko icandelo le-TB lifuna — sukuyiqamba ishedyuli yakho yokuhlola.",
      "Ukuba ufumana irashi eqatha, ukutyheliwa, ukudideka, ukuxhuzula, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-cotrimoxazole": five(
    [
      "Take this combination antibiotic (sulfamethoxazole/trimethoprim) exactly as directed on your labelled product.",
      "Tell your pharmacist if you have ever had a sulfa allergy, severe skin reaction, or blood disorder — confirm against the labelled product.",
      "Sun sensitivity and adequate fluids are commonly counselled — confirm sun and fluid advice against the labelled product. Materia does not invent a fluid schedule or dose.",
      "Finish the course unless your clinician tells you to stop — especially important when labelled for prevention or opportunistic-infection contexts.",
      "Report severe sore throat, unusual bruising, mouth ulcers, or yellowing promptly.",
      "If you get a severe blistering rash, swelling, jaundice, or trouble breathing — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le antibiotic ehlanganisiwe (sulfamethoxazole/trimethoprim) njengoba kubhalwe kumkhiqizo onelebula.",
      "Tshela umkhiqizi uma wake waba ne-allergy ye-sulfa, ukusabela kwesikhumba okubi, noma isifo segazi — qinisekisa kumkhiqizo onelebula.",
      "Ukuzwa ilanga namanzi anele kuvame ukwelulekwa — qinisekisa iseluleko selanga namanzi kumkhiqizo onelebula. I-Materia ayiqambi ishedyuli yamanzi noma umthamo.",
      "Qeda inkambo ngaphandle kokuba udokotela uthi uyeke — kubaluleke kakhulu uma kulebula yokuvimbela noma ukuvikela izifo ezithola ithuba.",
      "Bika umqala obuhlungu kakhulu, ukulimala okungajwayelekile, izilonda emlonyeni, noma ukuphaphatheka ngokushesha.",
      "Uma uthola isikhumba esibi esine-blister, ukuvuvuka, ukuphaphatheka, noma ukuphefumula kanzima — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Neem hierdie kombinasie-antibiotika (sulfamethoxazole/trimethoprim) soos op die geëtiketteerde produk aangedui.",
      "Sê vir jou apteker as jy al ooit ’n sulfa-allergie, ernstige velreaksie of bloedstoornis gehad het — bevestig teen die geëtiketteerde produk.",
      "Sonsensitiwiteit en genoegsame vloeistowwe word dikwels berade — bevestig son- en vloeistofadvies teen die geëtiketteerde produk. Materia versin nie ’n vloeistofskedule of dosis nie.",
      "Voltooi die kursus tensy jou klinikus sê stop — veral belangrik wanneer dit gemerk is vir voorkoming of opportunistiese-infeksie-kontekste.",
      "Rapporteer erge seer keel, ongewone kneusings, mondsere of vergeling dadelik.",
      "As jy ’n ernstige blaasuitslag, swelling, geelsug of asemhalingsprobleme kry — soek dadelik noodhulp.",
    ],
    [
      "Sebelisa antibiotic ena e kopantseng (sulfamethoxazole/trimethoprim) hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
      "Bolella rakhemisi haeba u kile ua ba le allergy ea sulfa, karabelo e tebileng ea letlalo, kapa bothata ba mali — netefatsa holabel.",
      "Ho utloa letsatsi le metsi a lekaneng hangata ho elelloa — netefatsa keletso ea letsatsi le metsi holabel. Materia ha e iqape kemiso ea metsi kapa tekanyo.",
      "Qetella thuto ntle le haeba ngaka e re u emise — haholo-holo ha e ngotsoe bakeng sa thibelo kapa maemo a tšoaetso e fumana monyetla.",
      "Tlaleha ’metso o bohloko haholo, maqeba a sa tloaelehang, liso la molomo, kapa ho mosehla kapele.",
      "Haeba u fumana lekhopho le tebileng le na le li-blister, ho ruruha, ho mosehla, kapa ho hema thata — batla thuso ea tšohanyetso hanghang.",
    ],
    [
      "Sebenzisa le antibiotic edibanisiweyo (sulfamethoxazole/trimethoprim) ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
      "Xelela usokhemisti ukuba wakhe waba ne-allergy ye-sulfa, ukusabela kwesikhumba okubi, okanye isifo segazi — qinisekisa kwileyibhile.",
      "Ukuziva ilanga kunye neefluids ezaneleyo zidla ngokucebiswa — qinisekisa ingcebiso yelanga neefluids kwileyibhile. I-Materia ayiyiqiqi ishedyuli yamanzi okanye idosi.",
      "Gqiba ikhosi ngaphandle kokuba ugqirha athi uyeke — kubaluleke kakhulu xa kubhalwe ukuthintela okanye iimeko zosulelo olufumana ithuba.",
      "Xela umqala obuhlungu kakhulu, ukulimala okungaqhelekanga, izilonda emlonyeni, okanye ukutyheliwa ngokukhawuleza.",
      "Ukuba ufumana irashi eqatha ene-blister, ukudumba, ukutyheliwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-budesonide": five(
    [
      "Use this inhaled corticosteroid (ICS) exactly as directed on your labelled product — technique matters as much as the device steps on the label.",
      "Rinse mouth and spit after inhaler use is commonly counselled to reduce thrush risk — confirm against the labelled product. Materia does not invent a puff count or spacer schedule.",
      "This is often controller/preventer teaching — do not stop suddenly without clinician advice when it is part of a long-term plan.",
      "Tell your pharmacist about voice changes, white patches in the mouth, or worsening wheeze.",
      "Ask how rescue inhalers fit with this controller — confirm against your written asthma/COPD plan; Materia does not invent step-up doses.",
      "If you get severe breathing difficulty, blue lips, or swelling of the face/lips/tongue — seek emergency care.",
    ],
    [
      "Sebenzisa le inhaled corticosteroid (ICS) njengoba kubhalwe kumkhiqizo onelebula — indlela yokusebenzisa ibaluleke njengezinyathelo zedivayisi kulebula.",
      "Ukuxubha umlomo nokukhafula ngemva kwe-inhaler kuvame ukwelulekwa ukunciphisa i-thrush — qinisekisa kumkhiqizo onelebula. I-Materia ayiqambi inani le-puff noma ishedyuli ye-spacer.",
      "Lokhu kuvame ukufundiswa njenge-controller/preventer — ungayeki ngokuzumayo ngaphandle kwedokotela uma kuyingxenye yohlelo olude.",
      "Tshela umkhiqizi ngokushintsha kwezwi, amabala amhlophe emlonyeni, noma ukukhefuzela okuba kubi.",
      "Buza ukuthi ama-rescue inhaler ahambisana kanjani nale controller — qinisekisa nohlelo olubhaliwe lwe-asthma/COPD; i-Materia ayiqambi imithamo yokunyuka.",
      "Uma uthola ukuphefumula kanzima kakhulu, izindebe eziluhlaza, noma ukuvuvuka kobuso/izindebe/ulimi — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie geïnhaleerde kortikosteroïed (ICS) soos op die geëtiketteerde produk aangedui — tegniek tel so veel soos die toestelstappe op die etiket.",
      "Mond spoel en uitspoeg na inhalergebruik word dikwels berade om sproei-risiko te verminder — bevestig teen die geëtiketteerde produk. Materia versin nie ’n puff-telling of spasieerder-skedule nie.",
      "Dit is dikwels kontroleerder/voorkomer-onderrig — moenie skielik stop sonder klinikusadvies nie wanneer dit deel van ’n langtermynplan is.",
      "Sê vir jou apteker van stemveranderinge, wit kolle in die mond, of verergerende piep.",
      "Vra hoe reddingsinhalers by hierdie kontroleerder pas — bevestig teen jou geskrewe asma/COPD-plan; Materia versin nie opstap-dosisse nie.",
      "As jy erge asemhalingsmoeilikheid, blou lippe of swelling van die gesig/lippe/tong kry — soek noodhulp.",
    ],
    [
      "Sebelisa corticosteroid ena e hemoang (ICS) hantle kamoo e hlalositsoeng holabel — mokhoa o bohlokoa joalo ka mehato ea sesebelisoa holabel.",
      "Ho hlatsa molomo le ho tšoela ka mor’a inhaler hangata ho elelloa ho fokotsa kotsi ea thrush — netefatsa holabel. Materia ha e iqape palo ea puff kapa kemiso ea spacer.",
      "Sena hangata ke thuto ea controller/preventer — se emise hang-hang ntle le keletso ea ngaka ha e le karolo ea moralo oa nako e telele.",
      "Bolella rakhemisi ka liphetoho tsa lentsoe, matšoao a sootho ka hanong, kapa ho hema ka molumo o mpefala.",
      "Botsa hore na li-rescue inhaler li tsamaisana joang le controller ena — netefatsa le moralo o ngotsoeng oa asthma/COPD; Materia ha e iqape litekanyo tsa ho nyolosa.",
      "Haeba u fumana bothata bo tebileng ba ho hema, melomo e putsoa, kapa ho ruruha ha sefahleho/melomo/leleme — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le inhaled corticosteroid (ICS) ngokuchanekileyo njengoko kubhaliwe kwileyibhile — indlela yokusebenzisa ibaluleke njengamanyathelo esixhobo kwileyibhile.",
      "Ukukhuhlaza umlomo nokutshiza emva kwe-inhaler kudla ngokucebiswa ukunciphisa i-thrush — qinisekisa kwileyibhile. I-Materia ayiyiqiqi inani le-puff okanye ishedyuli ye-spacer.",
      "Oku kudla ngokufundiswa njenge-controller/preventer — sukuyeka ngequbuliso ngaphandle kwengcebiso yogqirha xa kuyinxalenye yesicwangciso eside.",
      "Xelela usokhemisti ngotshintsho lwelizwi, amabala amhlophe emlonyeni, okanye ukukhefuzela okuya kuba mbi.",
      "Buza ukuba ii-rescue inhaler zihambelana njani nale controller — qinisekisa nesicwangciso esibhaliweyo se-asthma/COPD; i-Materia ayiyiqiqi iidosi zokunyuka.",
      "Ukuba ufumana ubunzima bokuphefumla obukhulu, imilomo eluhlaza, okanye ukudumba kobuso/imilomo/ulwimi — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tramadol": five(
    [
      "Take this opioid analgesic exactly as directed on your labelled product — do not take extra for breakthrough pain unless the label or care plan allows it.",
      "Alcohol and sedating medicines increase drowsiness and breathing-risk discussions — confirm against the labelled product. Materia does not invent a dose or spacing hours.",
      "Tell your pharmacist about seizures, serotonin medicines (including some antidepressants), or a history of substance use — confirm against the labelled product.",
      "Constipation, nausea, and dizziness are commonly counselled — report severe or worsening symptoms rather than inventing your own dose change.",
      "Do not drive or operate machinery if you feel sedated — follow labelled cautions.",
      "If you get slow or shallow breathing, extreme sleepiness, seizures, or cannot be woken — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le opioid analgesic njengoba kubhalwe kumkhiqizo onelebula — ungathathi okwengeziwe ngenxa yobuhlungu ngaphandle kokuba ilebula noma uhlelo lokunakekelwa kuvumela.",
      "Utshwala nemithi yokuzamazisa kukhulisa izingxoxo zokozela nengcuphe yokuphefumula — qinisekisa kumkhiqizo onelebula. I-Materia ayiqambi umthamo noma amahora okuhlukanisa.",
      "Tshela umkhiqizi ngokuxhuzula, imithi ye-serotonin (kuhlanganise amanye ama-antidepressant), noma umlando wokusebenzisa izidakamizwa — qinisekisa kumkhiqizo onelebula.",
      "Ukuqunjelwa, isicanucanu, nesiyezi kuvame ukwelulekwa — bika izimpawu ezibi noma eziba zimbi kunokuziqambela ushintsho lomthamo.",
      "Ungashayeli noma usebenzise imishini uma uzizwa uzamaziswa — landela izixwayiso eziselebula.",
      "Uma uthola ukuphefumula okuphansi noma okungajulile, ukozela okukhulu, ukuxhuzula, noma ungavuki — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Neem hierdie opioïed-pynstiller soos op die geëtiketteerde produk aangedui — moenie ekstra neem vir deurbraakpyn tensy die etiket of sorgplan dit toelaat nie.",
      "Alkohol en verdowende medisyne verhoog lomerigheid- en asemhalingsrisiko-gesprekke — bevestig teen die geëtiketteerde produk. Materia versin nie ’n dosis of spasieer-ure nie.",
      "Sê vir jou apteker van stuipe, serotonienmedisyne (insluitend sommige antidepressante), of ’n geskiedenis van middelgebruik — bevestig teen die geëtiketteerde produk.",
      "Hardlywigheid, naarheid en duiseligheid word dikwels berade — rapporteer ernstige of verergerende simptome eerder as om jou eie dosisverandering te versin.",
      "Moenie bestuur of masjinerie bedryf as jy verdof voel nie — volg gemerkte waarskuwings.",
      "As jy stadige of vlak asemhaling, ekstrem slaperigheid, stuipe kry, of nie wakker gemaak kan word nie — soek dadelik noodhulp.",
    ],
    [
      "Sebelisa opioid analgesic ena hantle kamoo e hlalositsoeng holabel — se nke e eketsehileng bakeng sa bohloko ntle le haeba holabel kapa moralo oa tlhokomelo o lumella.",
      "Joala le meriana e otlolang e eketsa lipuisano tsa ho otsela le kotsi ea ho hema — netefatsa holabel. Materia ha e iqape tekanyo kapa lihora tsa ho arohanya.",
      "Bolella rakhemisi ka ho thothomela, meriana ea serotonin (ho kenyeletsa li-antidepressant tse ling), kapa nalane ea tšebeliso ea lintho — netefatsa holabel.",
      "Ho thatafala ha mala, ho nyaroha, le ho tsekela hangata ho elelloa — tlaleha matšoao a tebileng kapa a mpefala ho e-na le ho iqapela phetoho ea tekanyo.",
      "Se khanne kapa u sebetse mechini haeba u ikutloa u otlolohile — latela litlhokomeliso tsa holabel.",
      "Haeba u fumana ho hema butle kapa ka holimo, ho otsela ho feteletseng, ho thothomela, kapa u sa tsosehe — batla thuso ea tšohanyetso hanghang.",
    ],
    [
      "Sebenzisa le opioid analgesic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuthatha eyongezelelweyo ngenxa yeentlungu ngaphandle kokuba ileyibhile okanye icandelo lokhathalelo livumela.",
      "Utywala namayeza okuzolisa akhuphula iingxoxo zokozela nomngcipheko wokuphefumla — qinisekisa kwileyibhile. I-Materia ayiyiqiqi idosi okanye iiyure zokwahlula.",
      "Xelela usokhemisti ngokuxhuzula, amayeza e-serotonin (kuquka ezinye ii-antidepressant), okanye imbali yokusebenzisa iziyobisi — qinisekisa kwileyibhile.",
      "Ukuqunjelwa, isicanuko, nesiyezi kudla ngokucebiswa — xela iimpawu ezibi okanye ezimbi kunokuyiqamba utshintsho lwedosi.",
      "Sukuqhuba okanye usebenzise oomatshini ukuba uziva uzolisiwe — landela izilumkiso ezikwileyibhile.",
      "Ukuba ufumana ukuphefumula okucothayo okanye okungajulanga, ukozela okukhulu, ukuxhuzula, okanye ungavuki — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-fluoxetine": five(
    [
      "Take this SSRI antidepressant exactly as directed on your labelled product — benefit may build over time; do not stop suddenly without clinician advice.",
      "Suicidality and mood-worsening counselling is especially important early in treatment and in younger people — seek urgent help for new suicidal thoughts. Materia does not invent a dose or titration schedule.",
      "Tell your pharmacist about other serotonergic medicines, bleeding risk with NSAIDs or anticoagulants, and sexual side effects — confirm against the labelled product.",
      "Report agitation, severe restlessness, high fever with muscle stiffness, or unusual bruising.",
      "Alcohol and driving caution may apply until you know how you respond — confirm against the labelled product.",
      "If you get severe allergic swelling, seizures, or cannot stop thinking about harming yourself — seek emergency care or crisis support immediately.",
    ],
    [
      "Sebenzisa le SSRI antidepressant njengoba kubhalwe kumkhiqizo onelebula — inzuzo ingakhula ngokuhamba kwesikhathi; ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa ngezingcinga zokuzibulala nokuba zimbi kwemizwa kubaluleke kakhulu ekuqaleni kokwelashwa nakubantu abancane — funa usizo oluphuthumayo ngezingcinga ezintsha zokuzibulala. I-Materia ayiqambi umthamo noma uhlelo lokunyusa.",
      "Tshela umkhiqizi ngeminye imithi ye-serotonin, ingcuphe yokopha nama-NSAID noma ama-anticoagulant, nemiphumela yocansi — qinisekisa kumkhiqizo onelebula.",
      "Bika ukukhathazeka, ukungahlali kahle kakhulu, umkhuhlane ophakeme nobuthakathaka bemisipha, noma ukulimala okungajwayelekile.",
      "Isixwayiso sotshwala nokushayela singasebenza uze wazi ukuthi usabela kanjani — qinisekisa kumkhiqizo onelebula.",
      "Uma uthola ukuvuvuka kwe-allergy okubi, ukuxhuzula, noma ungayeki ukucabanga ngokuzilimaza — funa usizo oluphuthumayo noma usizo lwenhlekelele ngokushesha.",
    ],
    [
      "Neem hierdie SSRI-antidepressant soos op die geëtiketteerde produk aangedui — voordeel mag met tyd opbou; moenie skielik stop sonder klinikusadvies nie.",
      "Selfmoordneiging- en stemmingsverergering-berading is veral belangrik vroeg in behandeling en by jonger mense — soek dringende hulp vir nuwe selfmoordgedagtes. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Sê vir jou apteker van ander serotonergiese medisyne, bloedingrisiko met NSAIDs of antikoagulante, en seksuele newe-effekte — bevestig teen die geëtiketteerde produk.",
      "Rapporteer onrus, erge rusteloosheid, hoë koors met spierstewigheid, of ongewone kneusings.",
      "Alkohol- en bestuursversigtigheid mag geld totdat jy weet hoe jy reageer — bevestig teen die geëtiketteerde produk.",
      "As jy ernstige allergiese swelling, stuipe kry, of nie kan ophou dink om jouself seer te maak nie — soek dadelik noodhulp of krisondersteuning.",
    ],
    [
      "Sebelisa SSRI antidepressant ena hantle kamoo e hlalositsoeng holabel — molemo o ka haha ha nako e ntse e ea; se emise hang-hang ntle le keletso ea ngaka.",
      "Keletso ea ho ipolaea le ho mpefala ha maikutlo e bohlokoa haholo qalong ea kalafo le bathong ba banyenyane — batla thuso ea potlako bakeng sa mehopolo e mecha ea ho ipolaea. Materia ha e iqape tekanyo kapa kemiso ea ho nyolosa.",
      "Bolella rakhemisi ka meriana e meng ea serotonin, kotsi ea ho tsoa mali le NSAIDs kapa anticoagulants, le litlamorao tsa thobalano — netefatsa holabel.",
      "Tlaleha ho ferekana, ho se phomole haholo, feberu e phahameng le ho thatafala ha mesifa, kapa maqeba a sa tloaelehang.",
      "Tlhatlhobo ea joala le ho khanna e ka sebetsa u fihlela u tseba hore na u arabela joang — netefatsa holabel.",
      "Haeba u fumana ho ruruha ha allergy ho tebileng, ho thothomela, kapa u sa khone ho emisa ho nahana ka ho intša kotsi — batla thuso ea tšohanyetso kapa tšehetso ea koluoa hanghang.",
    ],
    [
      "Sebenzisa le SSRI antidepressant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — inzuzo inokwakha ngexesha; sukuyeka ngequbuliso ngaphandle kwengcebiso yogqirha.",
      "Iingcebiso zokuzibulala nokuba mbi kwemvakalelo zibaluleke kakhulu ekuqaleni konyango nakubantu abancinci — funa uncedo olungxamisekileyo ngeengcinga ezintsha zokuzibulala. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyusa.",
      "Xelela usokhemisti ngamanye amayeza e-serotonin, umngcipheko wokopha kunye nee-NSAID okanye ii-anticoagulant, kunye neziphumo zocansi — qinisekisa kwileyibhile.",
      "Xela ukukhathazeka, ukungahlali kakuhle kakhulu, umkhuhlane ophezulu nobuthathaka bemisipha, okanye ukulimala okungaqhelekanga.",
      "Isilumkiso sotywala nokuqhuba sinokusebenza ude wazi ukuba usabela njani — qinisekisa kwileyibhile.",
      "Ukuba ufumana ukudumba kwe-allergy okukhulu, ukuxhuzula, okanye ungayeki ukucinga ngokuzilimaza — funa uncedo olungxamisekileyo okanye inkxaso yengxaki ngokukhawuleza.",
    ],
  ),
};
