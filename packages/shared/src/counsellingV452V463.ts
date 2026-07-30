/**
 * v452–v463 deepened SA counselling batch (6 lines × 5 langs) — final thin-core deepen slice.
 * Clears the remaining 4-line published counselling backlog. Original Materia educational scripts only —
 * no invented mg doses, INR/glucose/lab targets, units, clock hours, or course lengths.
 * Overrides thinner base/v100/v110 entries via spread order.
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

export const COUNSELLING_V452_TO_V463: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-amitriptyline": five(
    [
      "Amitriptyline is a tricyclic antidepressant (TCA) used in selected mood and neuropathic pain pathways — take it exactly as the labelled product directs, often at night if drowsiness occurs.",
      "Materia does not invent a dose or titration schedule — confirm against current SA guidance and the labelled product.",
      "TCA counselling commonly includes dry mouth, constipation, and caution with other sedating medicines.",
      "Tell your pharmacist about heart history, glaucoma, urinary retention, and all other antidepressants or pain medicines.",
      "Ask what early restlessness, mood worsening, or sleep change should trigger review rather than stopping alone.",
      "If self-harm thoughts, severe agitation, chest pain, seizures, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-amitriptyline i-tricyclic antidepressant (TCA) esetshenziswa ezindleleni ezikhethiwe zemizwa nobuhlungu be-neuropathic — thatha njengoba umkhiqizo onelebula uyala, ngokuvamile ebusuku uma ukozela kwenzeka.",
      "I-Materia ayiqambi umthamo noma uhlelo lokukhuphula — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-TCA kuvame ukufaka umlomo owomile, ukubindi, nokuqapha amanye amaphilisi akozisa.",
      "Tshela umkhiqizi ngomlando wenhliziyo, i-glaucoma, ukugcina umchamo, nawo wonke amanye ama-antidepressant noma amaphilisi obuhlungu.",
      "Buza ukuthi yikuphi ukungaphumuli kwasekuqaleni, ukuba bi kwemizwa, noma inguquko yokulala kufanele kuqale ukubuyekezwa kunokuyeka wedwa.",
      "Uma imicabango yokuzilimaza, ukukhathazeka okukhulu, ubuhlungu besifuba, ukuqubuka, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Amitriptilien is 'n trisikliese antidepressant (TCA) in geselekteerde gemoeds- en neuropatiese pynpaaie — neem dit presies soos die geëtiketteerde produk aandui, dikwels snags as slaperigheid voorkom.",
      "Materia versin nie 'n dosis of titrasieskedule nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "TCA-berading sluit algemeen droë mond, hardlywigheid en versigtigheid met ander kalmerende medisyne in.",
      "Sê vir jou apteker van hartgeskiedenis, gloukoom, urienretensie, en alle ander antidepressante of pynmedisyne.",
      "Vra watter vroeë rusteloosheid, gemoedsverergering of slaapverandering hersiening moet sneller eerder as alleen te stop.",
      "As selfskade-gedagtes, ernstige agitasie, borspyn, aanvalle of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Amitriptyline ke tricyclic antidepressant (TCA) e sebelisoang litseleng tse khethiloeng tsa maikutlo le bohloko ba neuropathic — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela, hangata bosiu haeba boroko bo hlaha.",
      "Materia ha e iqape tekanyo kapa kemiso ea ho khupisa — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea TCA hangata e kenyelletsa molomo o omileng, ho thatafala, le tlhokomelo ka meriana e meng e borobalisang.",
      "Bolella rakhemisi ka histori ea pelo, glaucoma, ho boloka moroto, le li-antidepressant tsohle tse ling kapa meriana ea bohloko.",
      "Botsa hore na ke ho hloka phomolo life ha pele, ho mpefala ha maikutlo, kapa phetoho ea boroko e lokelang ho qala tlhahlobo ho e-na le ho emisa u le mong.",
      "Haeba mehopolo ea ho intša kotsi, ho ferekana ho matla, bohloko ba sefuba, sekhahla, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-amitriptyline yi-tricyclic antidepressant (TCA) esetyenziswa kwiindlela ezikhethiweyo zemizwa neentlungu ze-neuropathic — yithathe kanye njengoko imveliso enelebula ikhokela, rhoqo ebusuku ukuba ukozela kwenzeka.",
      "I-Materia ayiyiqiqi idosi okanye ishedyuli yokukhuphula — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-TCA kuhlala kubandakanya umlomo owomileyo, ukubindi, nokulumkela amanye amayeza akozisayo.",
      "Xelela usokhemisti ngembali yentliziyo, i-glaucoma, ukugcina umchamo, kunye nawo onke amanye ama-antidepressant okanye amayeza eentlungu.",
      "Buza ukuba kukuphi ukungaphumli kokuqala, ukuba bi kwemizwa, okanye utshintsho lokulala okufuneka kuqalise ukujongwa kunokuyeka wedwa.",
      "Ukuba iingcinga zokuzilimaza, ukuphazamiseka okukhulu, iintlungu zesifuba, ukuqubuka, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-apixaban": five(
    [
      "Apixaban is a DOAC anticoagulant used under clinician-directed care — take it exactly as the labelled product directs; do not stop before procedures without your clinician.",
      "Materia does not invent a dose, INR, or clotting target — confirm against your anticoagulation plan and the labelled product.",
      "Apixaban counselling commonly includes bleeding watch — report prolonged nosebleeds, black stools, or blood in urine.",
      "Tell your pharmacist about other blood thinners, NSAIDs, planned surgery, and kidney or liver history.",
      "Ask what missed-dose rules and procedure hold plans mean in your written care plan.",
      "If uncontrolled bleeding, stroke symptoms, severe headache, or black stools with dizziness develops — seek emergency care.",
    ],
    [
      "I-apixaban i-DOAC anticoagulant esetshenziswa ngaphansi kokunakekelwa okulawulwa udokotela — thatha njengoba umkhiqizo onelebula uyala; ungayeki ngaphambi kwezinqubo ngaphandle kukadokotela wakho.",
      "I-Materia ayiqambi umthamo, i-INR, noma umgomo wokugodla igazi — qinisekisa nohlelo lwakho lwe-anticoagulation nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-apixaban kuvame ukufaka ukuqaphela ukopha — bika ukopha kwamakhala okude, okubomvu kwamathumbu, noma igazi emchameni.",
      "Tshela umkhiqizi ngamanye ama-blood thinner, ama-NSAID, ukuhlinzwa okuhleliwe, nomlando wezinso noma wesibindi.",
      "Buza ukuthi imithetho yomthamo ophuthelwe nezinhlelo zokumisa inqubo kusho ukuthini ohlelweni lwakho olubhaliwe.",
      "Uma ukopha okungalawuleki, izimpawu ze-stroke, ubuhlungu bekhanda obukhulu, noma okubomvu kwamathumbu nesiyezi kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Apiksaban is 'n DOAC-antikoagulant onder klinikus-gerigte sorg — neem dit presies soos die geëtiketteerde produk aandui; moenie voor prosedures stop sonder jou klinikus nie.",
      "Materia versin nie 'n dosis, INR of stolteiken nie — bevestig teen jou antikoagulasieplan en die geëtiketteerde produk.",
      "Apiksaban-berading sluit algemeen bloedingwag in — rapporteer verlengde neusbloedings, swart stoelgang of bloed in urine.",
      "Sê vir jou apteker van ander bloedverdunners, NSAIDs, beplande chirurgie, en nier- of lewergeskiedenis.",
      "Vra wat gemiste-dosisreëls en prosedure-houplanne in jou geskrewe sorgplan beteken.",
      "As onbeheerde bloeding, beroerte-simptome, ernstige hoofpyn of swart stoelgang met duiseligheid ontwikkel — soek noodhulp.",
    ],
    [
      "Apixaban ke DOAC anticoagulant e sebelisoang tlas'a tlhokomelo e tataisoang ke ngaka — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela; u se ke ua emisa pele ho mekhoa ntle le ngaka ea hau.",
      "Materia ha e iqape tekanyo, INR, kapa sepheo sa ho omella mali — netefatsa khahlanong le moralo oa hau oa anticoagulation le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea apixaban hangata e kenyelletsa ho hlokomela ho tsoa mali — tlaleha ho tsoa mali ka nko ho telele, litšila tse ntšo, kapa mali ka har'a moroto.",
      "Bolella rakhemisi ka li-blood thinner tse ling, li-NSAID, opereishene e reriloeng, le histori ea liphio kapa sebete.",
      "Botsa hore na melao ea tekanyo e fosumetsoeng le meralo ea ho emisa mokhoa e bolela eng moralong oa hau o ngotsoeng oa tlhokomelo.",
      "Haeba ho tsoa mali ho sa laoleheng, matšoao a stroke, hlooho e bohloko haholo, kapa litšila tse ntšo le ho tsekama ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-apixaban yi-DOAC anticoagulant esetyenziswa phantsi kokhathalelo olukhokelwa ngugqirha — yithathe kanye njengoko imveliso enelebula ikhokela; ungayeki phambi kweenkqubo ngaphandle kogqirha wakho.",
      "I-Materia ayiyiqiqi idosi, i-INR, okanye usukelo lokuqina kwegazi — Qinisekisa nesicwangciso sakho se-anticoagulation kunye nemveliso enelebula.",
      "Ukucebisa nge-apixaban kuhlala kubandakanya ukujonga ukopha — bika ukopha kwamakhala okude, okumnyama kwamathumbu, okanye igazi emchameni.",
      "Xelela usokhemisti ngamanye ama-blood thinner, ii-NSAID, utyando olucwangcisiweyo, nembali yezintso okanye yesibindi.",
      "Buza ukuba imithetho yedosi ephosakeleyo nezicwangciso zokumisa inkqubo zithetha ntoni kwisicwangciso sakho esibhaliweyo sokhathalelo.",
      "Ukuba ukopha okungalawulekiyo, iimpawu ze-stroke, iintloko ezibuhlungu kakhulu, okanye okumnyama kwamathumbu nesiyezi kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-carvedilol": five(
    [
      "Carvedilol is a beta-blocker used for selected blood-pressure and heart-failure pathways — take it exactly as the labelled product directs, often with food.",
      "Materia does not invent a dose or heart-rate target — confirm against current SA guidance and the labelled product.",
      "Do not stop suddenly without your clinician — beta-blocker counselling commonly includes gradual withdrawal plans.",
      "Tell your pharmacist if you have asthma, COPD, a slow pulse, diabetes, or dizziness.",
      "Ask what dizziness on standing or breathing change should trigger review rather than stopping alone.",
      "If you faint, get shortness of breath, chest pain, or swelling of the face/lips/tongue — seek emergency care.",
    ],
    [
      "I-carvedilol i-beta-blocker esetshenziswa ezindleleni ezikhethiwe zomfutho wegazi nokwehluleka kwenhliziyo — thatha njengoba umkhiqizo onelebula uyala, ngokuvamile nokudla.",
      "I-Materia ayiqambi umthamo noma umgomo wesigqi senhliziyo — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ungayeki ngokuzumayo ngaphandle kukadokotela wakho — ukuelulekwa kwe-beta-blocker kuvame ukufaka izinhlelo zokuhoxisa kancane.",
      "Tshela umkhiqizi uma une-asthma, i-COPD, isigqi esiphansi, isifo sikashukela, noma isiyezi.",
      "Buza ukuthi yisiphi isiyezi sokuma noma uguquko lokuphefumula okufanele kuqale ukubuyekezwa kunokuyeka wedwa.",
      "Uma uwela, uthola ukuphefumula okufushane, ubuhlungu besifuba, noma ukuvuvuka kobuso/izindebe/ulimi — funa usizo oluphuthumayo.",
    ],
    [
      "Karvedilol is 'n beta-blokkeerder vir geselekteerde bloeddruk- en hartversakingspaaie — neem dit presies soos die geëtiketteerde produk aandui, dikwels met kos.",
      "Materia versin nie 'n dosis of hartklopteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Moenie skielik stop sonder jou klinikus nie — beta-blokkeerder-berading sluit algemeen geleidelike onttrekkingsplanne in.",
      "Sê vir jou apteker as jy asma, KOLS, 'n stadige pols, diabetes of duiseligheid het.",
      "Vra watter duiseligheid by staan of asemverandering hersiening moet sneller eerder as alleen te stop.",
      "As jy flou word, kortasem, borspyn of swelling van die gesig/lippe/tong kry — soek noodhulp.",
    ],
    [
      "Carvedilol ke beta-blocker e sebelisoang litseleng tse khethiloeng tsa khatello ea mali le ho hlōleha ha pelo — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela, hangata le lijo.",
      "Materia ha e iqape tekanyo kapa sepheo sa morethetho oa pelo — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "U se ke ua emisa ka tšohanyetso ntle le ngaka ea hau — tlhabollo ea beta-blocker hangata e kenyelletsa meralo ea ho hula butle-butle.",
      "Bolella rakhemisi haeba u na le asthma, COPD, pulse e liehang, lefu la tsoekere, kapa ho tsekama.",
      "Botsa hore na ke ho tsekama life ha u ema kapa phetoho ea ho hema e lokelang ho qala tlhahlobo ho e-na le ho emisa u le mong.",
      "Haeba u akheha, u fumana ho hema ha khutšoanyane, bohloko ba sefuba, kapa ho ruruha ha sefahleho/melomo/leme — batla thuso ea tšohanyetso.",
    ],
    [
      "I-carvedilol yi-beta-blocker esetyenziswa kwiindlela ezikhethiweyo zoxinzelelo lwegazi nokungaphumeleli kwentliziyo — yithathe kanye njengoko imveliso enelebula ikhokela, rhoqo nokutya.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lwesingqisho sentliziyo — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ungayeki ngequbuliso ngaphandle kogqirha wakho — ukucebisa nge-beta-blocker kuhlala kubandakanya izicwangciso zokurhoxisa ngokuthe ngcembe.",
      "Xelela usokhemisti ukuba une-asthma, i-COPD, isingqisho esiphantsi, isifo seswekile, okanye isiyezi.",
      "Buza ukuba kukuphi isiyezi sokuma okanye utshintsho lokuphefumla okufuneka kuqalise ukujongwa kunokuyeka wedwa.",
      "Ukuba uyawa, ufumana ukuphefumla okufutshane, iintlungu zesifuba, okanye ukudumba kobuso/imilebe/ulwimi — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-empagliflozin": five(
    [
      "Empagliflozin is an SGLT2 inhibitor used in selected diabetes and heart/kidney pathways — take it exactly as the labelled product directs.",
      "Materia does not invent a dose or glucose target — confirm against current SA guidance and the labelled product.",
      "SGLT2 counselling commonly includes genital hygiene, dehydration watch, and reporting urinary symptoms.",
      "Tell your pharmacist about kidney history, diuretics, and illness with reduced eating or drinking.",
      "Ask what illness-day fluid advice and when to pause for surgery mean in your care plan.",
      "If severe abdominal pain with vomiting, trouble breathing, sudden dizziness, or signs of severe infection develops — seek emergency care.",
    ],
    [
      "I-empagliflozin i-SGLT2 inhibitor esetshenziswa ezindleleni ezikhethiwe zesifo sikashukela nezenhliziyo/ezinso — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo noma umgomo woshukela — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-SGLT2 kuvame ukufaka ukuhlanzeka kwezitho zangasese, ukuqaphela ukoma, nokubika izimpawu zomchamo.",
      "Tshela umkhiqizi ngomlando wezinso, ama-diuretic, nokugula nokudla noma ukuphuza okuncishisiwe.",
      "Buza ukuthi iseluleko samanzi ngezinsuku zokugula nokuthi kuyekwa nini ngaphambi kokuhlinzwa kusho ukuthini ohlelweni lwakho.",
      "Uma ubuhlungu besisu obukhulu nokuhlanza, ubunzima bokuphefumula, isiyezi esizumayo, noma izimpawu zokutheleleka okukhulu kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Empagliflosien is 'n SGLT2-inhibeerder in geselekteerde diabetes- en hart-/nierpaaie — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis of glukoseteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "SGLT2-berading sluit algemeen genitale higiëne, dehidrasiewag en rapportering van uriensimptome in.",
      "Sê vir jou apteker van niergeskiedenis, diuretika, en siekte met verminderde eet of drink.",
      "Vra wat siektedag-vloeistofadvies en wanneer om vir chirurgie te pouseer in jou sorgplan beteken.",
      "As ernstige buikpyn met braking, asemnood, skielike duiseligheid of tekens van ernstige infeksie ontwikkel — soek noodhulp.",
    ],
    [
      "Empagliflozin ke SGLT2 inhibitor e sebelisoang litseleng tse khethiloeng tsa lefu la tsoekere le tsa pelo/liphio — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo kapa sepheo sa glucose — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea SGLT2 hangata e kenyelletsa bohloeki ba litho tsa botona/botšehali, ho hlokomela ho oma, le ho tlaleha matšoao a moroto.",
      "Bolella rakhemisi ka histori ea liphio, li-diuretic, le ho kula ka ho ja kapa ho noa ho fokotsehileng.",
      "Botsa hore na keletso ea metsi matsatsing a ho kula le hore na u emisa neng bakeng sa opereishene e bolela eng moralong oa hau.",
      "Haeba bohloko ba mpa bo matla le ho hlatsa, ho hema thata, ho tsekama ka tšohanyetso, kapa matšoao a tšoaetso e matla a hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-empagliflozin yi-SGLT2 inhibitor esetyenziswa kwiindlela ezikhethiweyo zesifo seswekile nezentliziyo/ezintso — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lweswekile — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-SGLT2 kuhlala kubandakanya ucoceko lwezitho zangasese, ukujonga ukoma, nokubika iimpawu zomchamo.",
      "Xelela usokhemisti ngembali yezintso, ii-diuretic, nokugula nokutya okanye ukusela okuncitshisiweyo.",
      "Buza ukuba ingcebiso yamanzi ngeentsuku zokugula nokuba kuyekwa nini phambi kotyando kuthetha ntoni kwisicwangciso sakho.",
      "Ukuba iintlungu zesisu ezinkulu nokugabha, ubunzima bokuphefumla, isiyezi esizumayo, okanye iimpawu zosulelo olukhulu kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-ethambutol": five(
    [
      "Ethambutol is an antimycobacterial used in clinician-directed TB regimens — take it exactly as the labelled product and TB care plan direct.",
      "Materia does not invent a dose or visual-acuity target — confirm against current SA TB guidance and the labelled product.",
      "Ethambutol counselling commonly includes vision changes (blur, colour vision) — report eye symptoms early.",
      "Tell your pharmacist about kidney history and all other TB medicines in your regimen.",
      "Ask what eye checks and missed-dose rules mean before you change the schedule yourself.",
      "If you suddenly lose vision, get severe eye pain, yellow eyes, or trouble breathing — seek emergency care.",
    ],
    [
      "I-ethambutol i-antimycobacterial esetshenziswa ezinhlelweni ze-TB ezilawulwa udokotela — thatha njengoba umkhiqizo onelebula nohlelo lokunakekelwa kwe-TB kuyala.",
      "I-Materia ayiqambi umthamo noma umgomo wokubona — qinisekisa nesiqondiso se-TB saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-ethambutol kuvame ukufaka izinguquko zokubona (ukufiphala, ukubona imibala) — bika izimpawu zamehlo kusenesikhathi.",
      "Tshela umkhiqizi ngomlando wezinso nawo wonke amanye amaphilisi e-TB ohlelweni lwakho.",
      "Buza ukuthi ukuhlolwa kwamehlo nemithetho yomthamo ophuthelwe kusho ukuthini ngaphambi kokushintsha uhlelo wedwa.",
      "Uma ulahlekelwa ukubona ngokuzumayo, uthola ubuhlungu bamehlo obukhulu, amehlo aphuzi, noma ubunzima bokuphefumula — funa usizo oluphuthumayo.",
    ],
    [
      "Etambutol is 'n antimikobakteriële middel in klinikus-gerigte TB-regimens — neem dit presies soos die geëtiketteerde produk en TB-sorgplan aandui.",
      "Materia versin nie 'n dosis of gesigskerpte-teiken nie — bevestig teen huidige SA TB-riglyne en die geëtiketteerde produk.",
      "Etambutol-berading sluit algemeen sigveranderinge in (waas, kleursig) — rapporteer oësimptome vroeg.",
      "Sê vir jou apteker van niergeskiedenis en alle ander TB-medisyne in jou regimen.",
      "Vra wat oëkontroles en gemiste-dosisreëls beteken voordat jy self die skedule verander.",
      "As jy skielik sig verloor, ernstige oëpyn, geel oë of asemnood kry — soek noodhulp.",
    ],
    [
      "Ethambutol ke antimycobacterial e sebelisoang mererong ea TB e tataisoang ke ngaka — e nke hantle joalo ka ha sehlahisoa se nang le ileibole le moralo oa tlhokomelo ea TB li laela.",
      "Materia ha e iqape tekanyo kapa sepheo sa pono — netefatsa khahlanong le tataiso ea TB ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea ethambutol hangata e kenyelletsa liphetoho tsa pono (ho fifala, pono ea mebala) — tlaleha matšoao a mahlo kapele.",
      "Bolella rakhemisi ka histori ea liphio le meriana eohle e meng ea TB moralong oa hau.",
      "Botsa hore na litlhahlobo tsa mahlo le melao ea tekanyo e fosumetsoeng e bolela eng pele u fetola kemiso u le mong.",
      "Haeba u lahleheloa ke pono ka tšohanyetso, u fumana bohloko ba mahlo bo matla, mahlo a mosehla, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "I-ethambutol yi-antimycobacterial esetyenziswa kwiinkqubo ze-TB ezikhokelwa ngugqirha — yithathe kanye njengoko imveliso enelebula kunye nesicwangciso sokhathalelo lwe-TB zikhokela.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lokubona — Qinisekisa nesikhokelo se-TB saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-ethambutol kuhlala kubandakanya utshintsho lokubona (ukufiphala, ukubona imibala) — bika iimpawu zamehlo kwangethuba.",
      "Xelela usokhemisti ngembali yezintso kunye nawo onke amanye amayeza e-TB kwinkqubo yakho.",
      "Buza ukuba ukujongwa kwamehlo nemithetho yedosi ephosakeleyo kuthetha ntoni phambi kokutshintsha ishedyuli wedwa.",
      "Ukuba uphulukana nokubona ngequbuliso, ufumana iintlungu zamehlo ezinkulu, amehlo atyheli, okanye ubunzima bokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-fluconazole": five(
    [
      "Fluconazole is an azole antifungal used for selected yeast and fungal pathways — single-dose and multi-day courses both need the labelled plan.",
      "Materia does not invent a dose or course length — confirm against current SA guidance and the labelled product.",
      "Fluconazole counselling commonly includes interaction checks with many medicines and reporting yellow eyes or unusual bruising.",
      "Tell your pharmacist about pregnancy plans, heart rhythm medicines, and all other medicines you use.",
      "Ask what incomplete improvement or recurrent symptoms should trigger review rather than repeating alone.",
      "If severe rash with blistering, yellow eyes, fainting, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-fluconazole i-azole antifungal esetshenziswa ezindleleni ezikhethiwe ze-yeast neze-fungal — inkambu yomthamo owodwa neyezinsuku eziningi zombili zidinga uhlelo olulebula.",
      "I-Materia ayiqambi umthamo noma ubude benkambu — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-fluconazole kuvame ukufaka ukuhlola ukusebenzisana namaphilisi amaningi nokubika amehlo aphuzi noma ukulimala okungajwayelekile.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, amaphilisi esigqi senhliziyo, nawo wonke amanye amaphilisi owasebenzisayo.",
      "Buza ukuthi yikuphi ukungathuthuki okuphelele noma izimpawu ezibuyayo okufanele kuqale ukubuyekezwa kunokuphinda wedwa.",
      "Uma ukuqubuka okukhulu okunamaqhuma, amehlo aphuzi, ukuwa, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Flukonasool is 'n asool-antifungale middel vir geselekteerde gis- en swampaaie — enkel-dosis- en meerdae-kuurse benodig albei die geëtiketteerde plan.",
      "Materia versin nie 'n dosis of kuurduur nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Flukonasool-berading sluit algemeen wisselwerkingskontroles met baie medisyne in en rapportering van geel oë of ongewone kneusing.",
      "Sê vir jou apteker van swangerskapplanne, hartritme-medisyne, en alle ander medisyne wat jy gebruik.",
      "Vra watter onvolledige verbetering of herhalende simptome hersiening moet sneller eerder as alleen te herhaal.",
      "As ernstige uitslag met blase, geel oë, floute of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Fluconazole ke azole antifungal e sebelisoang litseleng tse khethiloeng tsa yeast le fungal — lithuto tsa tekanyo e le 'ngoe le tsa matsatsi a mangata ka bobeli li hloka moralo o nang le ileibole.",
      "Materia ha e iqape tekanyo kapa bolelele ba thuto — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea fluconazole hangata e kenyelletsa litlhahlobo tsa tšebelisano le meriana e mengata le ho tlaleha mahlo a mosehla kapa ho otlaha ho sa tloaelehang.",
      "Bolella rakhemisi ka merero ea boimana, meriana ea morethetho oa pelo, le meriana eohle e meng eo u e sebelisang.",
      "Botsa hore na ke ntlafatso life e sa feleng kapa matšoao a khutlang a lokelang ho qala tlhahlobo ho e-na le ho pheta u le mong.",
      "Haeba lekhopho le matla le li-blister, mahlo a mosehla, ho akheha, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-fluconazole yi-azole antifungal esetyenziswa kwiindlela ezikhethiweyo ze-yeast neze-fungal — iikhosi zedosi enye nezeentsuku ezininzi zombini zifuna isicwangciso esinelebula.",
      "I-Materia ayiyiqiqi idosi okanye ubude bekhosi — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-fluconazole kuhlala kubandakanya ukujonga ukusebenzisana namayeza amaninzi nokubika amehlo atyheli okanye ukulimala okungaqhelekanga.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, amayeza esingqisho sentliziyo, kunye nawo onke amanye amayeza owawasebenzisayo.",
      "Buza ukuba kukuphi ukungaphucuki okupheleleyo okanye iimpawu ezibuyayo ezifuneka ziqalise ukujongwa kunokuphinda wedwa.",
      "Ukuba irhashalala enzima enamqhuma, amehlo atyheli, ukuwa, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-insulin-glargine": five(
    [
      "Insulin glargine is a long-acting basal insulin used in selected diabetes pathways — use it exactly as the labelled product and clinician teaching direct.",
      "Materia does not invent a dose, units, or glucose target — confirm against your written diabetes plan and the labelled product.",
      "Insulin counselling commonly includes hypoglycaemia recognition and never sharing pens or needles.",
      "Injection technique and site rotation follow product teaching — ask your pharmacist to check your device technique.",
      "Tell your pharmacist about meal pattern changes, illness, other diabetes medicines, and how you store the pen or vial.",
      "If you cannot swallow, seize, lose consciousness, or remain confused after hypo treatment — seek emergency care.",
    ],
    [
      "I-insulin glargine i-insulin ye-basal ehlala isikhathi eside esetshenziswa ezindleleni ezikhethiwe zesifo sikashukela — yisebenzise njengoba umkhiqizo onelebula nokufundiswa kukadokotela kuyala.",
      "I-Materia ayiqambi umthamo, amayunithi, noma umgomo woshukela — qinisekisa nohlelo lwakho lwesifo sikashukela olubhaliwe nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-insulin kuvame ukufaka ukuqaphela i-hypoglycaemia nokungabi nakwabelana ngamapeni noma izinhlabathi.",
      "Indlela yokujova nokushintsha indawo kulandela ukufundiswa komkhiqizo — buza umkhiqizi ukuhlola indlela yedivayisi yakho.",
      "Tshela umkhiqizi ngezinguquko zendlela yokudla, ukugula, amanye amaphilisi esifo sikashukela, nokuthi ugcina kanjani ipeni noma ivayili.",
      "Uma ungakwazi ukugwinya, uthola ukuqubuka, ulahlekelwa ukwazi, noma uhlala udidekile ngemva kokwelashwa kwe-hypo — funa usizo oluphuthumayo.",
    ],
    [
      "Insulien-glargien is 'n lankwerkende basale insulien in geselekteerde diabetespaaie — gebruik dit presies soos die geëtiketteerde produk en klinikusonderrig aandui.",
      "Materia versin nie 'n dosis, eenhede of glukoseteiken nie — bevestig teen jou geskrewe diabetesplan en die geëtiketteerde produk.",
      "Insulienberading sluit algemeen hipoglisemie-herkenning in en om nooit penne of naalde te deel nie.",
      "Inspuitingstegniek en werfrotering volg produkonderrig — vra jou apteker om jou toesteltegniek te kontroleer.",
      "Sê vir jou apteker van maaltydpatroonveranderinge, siekte, ander diabetesmedisyne, en hoe jy die pen of flessie berg.",
      "As jy nie kan sluk nie, aanvalle kry, bewusteloos raak, of verward bly na hipo-behandeling — soek noodhulp.",
    ],
    [
      "Insulin glargine ke insulin ea basal e sebetsang nako e telele e sebelisoang litseleng tse khethiloeng tsa lefu la tsoekere — e sebelise hantle joalo ka ha sehlahisoa se nang le ileibole le thuto ea ngaka li laela.",
      "Materia ha e iqape tekanyo, li-unit, kapa sepheo sa glucose — netefatsa khahlanong le moralo oa hau o ngotsoeng oa lefu la tsoekere le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea insulin hangata e kenyelletsa ho lemoha hypoglycaemia le ho se arolelane lipene kapa linalete.",
      "Mokhoa oa ho enta le ho potoloha ha sebaka o latela thuto ea sehlahisoa — botsa rakhemisi ho hlahloba mokhoa oa sesebelisoa sa hau.",
      "Bolella rakhemisi ka liphetoho tsa mokhoa oa lijo, ho kula, meriana e meng ea lefu la tsoekere, le hore u boloka joang pene kapa vial.",
      "Haeba u sitoa ho koenya, u tšoaroa ke sekhahla, u lahleheloa ke kelello, kapa u lula u ferekane ka mor'a kalafo ea hypo — batla thuso ea tšohanyetso.",
    ],
    [
      "I-insulin glargine yi-insulin ye-basal ehlala ixesha elide esetyenziswa kwiindlela ezikhethiweyo zesifo seswekile — yisebenzise kanye njengoko imveliso enelebula kunye nokufundiswa kugqirha zikhokela.",
      "I-Materia ayiyiqiqi idosi, ii-unit, okanye usukelo lweswekile — Qinisekisa nesicwangciso sakho sesifo seswekile esibhaliweyo kunye nemveliso enelebula.",
      "Ukucebisa nge-insulin kuhlala kubandakanya ukuqaphela i-hypoglycaemia kunye nokungabelani ngeepeni okanye iinaliti.",
      "Indlela yokujova nokutshintsha indawo kulandela ukufundiswa kwemveliso — buza usokhemisti ukujonga indlela yesixhobo sakho.",
      "Xelela usokhemisti ngotshintsho lwendlela yokutya, ukugula, amanye amayeza esifo seswekile, nokuba ugcina njani ipeni okanye ivial.",
      "Ukuba awukwazi ukuginya, uthola ukuqubuka, uphulukana nengqondo, okanye uhlala udidekile emva konyango lwe-hypo — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-loperamide": five(
    [
      "Loperamide is an antimotility medicine used for selected diarrhoea pathways — take it exactly as the labelled product directs; do not exceed the labelled maximum.",
      "Materia does not invent a dose or daily maximum — confirm against the labelled product and pharmacist advice.",
      "Loperamide counselling commonly includes stopping if constipation, bloating, or blood in stool develops, and seeking care for fever with severe diarrhoea.",
      "Tell your pharmacist about other opioids, heart medicines, and how long diarrhoea has lasted.",
      "Ask what dehydration signs or bloody diarrhoea should trigger urgent review rather than continuing alone.",
      "If severe abdominal swelling, black stools, fainting, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-loperamide iwumuthi we-antimotility osetshenziswa ezindleleni ezikhethiwe zohudo — thatha njengoba umkhiqizo onelebula uyala; ungadluli umkhawulo olebula.",
      "I-Materia ayiqambi umthamo noma umkhawulo wansuku zonke — qinisekisa nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Ukuelulekwa kwe-loperamide kuvame ukufaka ukuyeka uma ukubindi, ukuvuvuka, noma igazi endleleni kuvela, nokufuna usizo uma umkhuhlane nohudo olukhulu.",
      "Tshela umkhiqizi ngamanye ama-opioid, amaphilisi enhliziyo, nokuthi uhudo luthathe isikhathi esingakanani.",
      "Buza ukuthi yiziphi izimpawu zokoma noma uhudo olunegazi okufanele kuqale ukubuyekezwa okuphuthumayo kunokuqhubeka wedwa.",
      "Uma ukuvuvuka kwesisu okukhulu, okubomvu kwamathumbu, ukuwa, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Loperamied is 'n antimotiliteitsmedisyne vir geselekteerde diarree-paaie — neem dit presies soos die geëtiketteerde produk aandui; moenie die geëtiketteerde maksimum oorskry nie.",
      "Materia versin nie 'n dosis of daaglikse maksimum nie — bevestig teen die geëtiketteerde produk en aptekeradvies.",
      "Loperamied-berading sluit algemeen in om te stop as hardlywigheid, opgeblasenheid of bloed in stoelgang ontwikkel, en sorg te soek vir koors met ernstige diarree.",
      "Sê vir jou apteker van ander opioïede, hartmedisyne, en hoe lank diarree reeds duur.",
      "Vra watter dehidrasietekens of bloederige diarree dringende hersiening moet sneller eerder as alleen voort te gaan.",
      "As ernstige buikswelling, swart stoelgang, floute of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Loperamide ke meriana ea antimotility e sebelisoang litseleng tse khethiloeng tsa letšollo — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela; u se ke ua feta bophahamo bo nang le ileibole.",
      "Materia ha e iqape tekanyo kapa bophahamo ba letsatsi le letsatsi — netefatsa khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Tlhabollo ea loperamide hangata e kenyelletsa ho emisa haeba ho thatafala, ho ruruha, kapa mali ka har'a litšila li hlaha, le ho batla tlhokomelo bakeng sa feberu le letšollo le matla.",
      "Bolella rakhemisi ka li-opioid tse ling, meriana ea pelo, le hore na letšollo le nkile nako e kae.",
      "Botsa hore na ke matšoao afe a ho oma kapa letšollo le mali a lokelang ho qala tlhahlobo e potlakileng ho e-na le ho tsoela pele u le mong.",
      "Haeba ho ruruha ha mpa ho matla, litšila tse ntšo, ho akheha, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-loperamide liyeza le-antimotility elisetyenziswa kwiindlela ezikhethiweyo zorhudo — yithathe kanye njengoko imveliso enelebula ikhokela; ungadluli umda onelebula.",
      "I-Materia ayiyiqiqi idosi okanye ubuninzi bemihla ngemihla — Qinisekisa nemveliso enelebula nengcebiso yosokhemisti.",
      "Ukucebisa nge-loperamide kuhlala kubandakanya ukuyeka ukuba ukubindi, ukudumba, okanye igazi endleleni kuvela, nokufuna uncedo kumkhuhlane norhudo olunzima.",
      "Xelela usokhemisti ngamanye ama-opioid, amayeza entliziyo, nokuba urhudo luthathe ixesha elingakanani.",
      "Buza ukuba zeziphi iimpawu zokoma okanye urhudo olunegazi ezifuneka ziqalise ukujongwa okungxamisekileyo kunokuqhubeka wedwa.",
      "Ukuba ukudumba kwesisu okukhulu, okumnyama kwamathumbu, ukuwa, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-montelukast": five(
    [
      "Montelukast is a leukotriene-receptor antagonist used as an asthma/allergy controller — it is a controller, not a sudden-relief reliever.",
      "Materia does not invent a dose or asthma-control score — confirm against current SA guidance and the labelled product.",
      "Montelukast counselling commonly includes mood and behaviour change watch — report agitation, sleep disturbance, or suicidal thoughts early.",
      "Tell your pharmacist about other asthma or allergy medicines you use and keep your reliever inhaler plan as your clinician directed.",
      "Ask what worsening wheeze or night symptoms should trigger review rather than adding doses alone.",
      "If severe breathing difficulty, facial swelling, or thoughts of self-harm develops — seek emergency care.",
    ],
    [
      "I-montelukast i-leukotriene-receptor antagonist esetshenziswa njenge-controller ye-asthma/allergy — i-controller, hhayi i-reliever yesikhathi esiphuthumayo.",
      "I-Materia ayiqambi umthamo noma amaphuzu okulawula i-asthma — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-montelukast kuvame ukufaka ukuqaphela izinguquko zemizwa nokuziphatha — bika ukukhathazeka, ukuphazamiseka kokulala, noma imicabango yokuzibulala kusenesikhathi.",
      "Tshela umkhiqizi ngamanye amaphilisi e-asthma noma e-allergy owasebenzisayo futhi gcina uhlelo lwe-reliever inhaler njengoba udokotela eyala.",
      "Buza ukuthi yikuphi ukubila okuya kuba bi noma izimpawu zasebusuku okufanele kuqale ukubuyekezwa kunokungeza imithamo wedwa.",
      "Uma ubunzima bokuphefumula obukhulu, ukuvuvuka kobuso, noma imicabango yokuzilimaza kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Monteloekast is 'n leukotrieen-reseptor-antagonis as asma-/allergie-beheerder — dit is 'n beheerder, nie 'n skielike-verligting-verligter nie.",
      "Materia versin nie 'n dosis of asma-beheer-telling nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Monteloekast-berading sluit algemeen gemoeds- en gedragsveranderingswag in — rapporteer agitasie, slaapsteuring of selfmoordgedagtes vroeg.",
      "Sê vir jou apteker van ander asma- of allergiemedisyne wat jy gebruik en hou jou verligter-inhaalerplan soos jou klinikus gerig het.",
      "Vra watter verergerende piep of nagsimptome hersiening moet sneller eerder as alleen dosisse by te voeg.",
      "As ernstige asemnood, gesigswelling of gedagtes van selfskade ontwikkel — soek noodhulp.",
    ],
    [
      "Montelukast ke leukotriene-receptor antagonist e sebelisoang e le controller ea asthma/allergy — ke controller, eseng reliever ea thuso ea tšohanyetso.",
      "Materia ha e iqape tekanyo kapa lintlha tsa taolo ea asthma — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea montelukast hangata e kenyelletsa ho hlokomela liphetoho tsa maikutlo le boitšoaro — tlaleha ho ferekana, ho senyeha ha boroko, kapa mehopolo ea ho ipolaea kapele.",
      "Bolella rakhemisi ka meriana e meng ea asthma kapa allergy eo u e sebelisang 'me boloka moralo oa hau oa reliever inhaler joalo ka ha ngaka e laetse.",
      "Botsa hore na ke ho fofa life ho mpefalang kapa matšoao a bosiu a lokelang ho qala tlhahlobo ho e-na le ho eketsa litekanyo u le mong.",
      "Haeba bothata ba ho hema bo matla, ho ruruha ha sefahleho, kapa mehopolo ea ho intša kotsi e hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-montelukast yi-leukotriene-receptor antagonist esetyenziswa njenge-controller ye-asthma/allergy — yi-controller, hayi i-reliever yoncedo olungxamisekileyo.",
      "I-Materia ayiyiqiqi idosi okanye amanqaku okulawula i-asthma — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-montelukast kuhlala kubandakanya ukujonga utshintsho lwemizwa nokuziphatha — bika ukuphazamiseka, ukuphazamiseka kokulala, okanye iingcinga zokuzibulala kwangethuba.",
      "Xelela usokhemisti ngamanye amayeza e-asthma okanye e-allergy owawasebenzisayo kwaye gcina isicwangciso se-reliever inhaler njengoko ugqirha eyikhokela.",
      "Buza ukuba kukuphi ukubila okuya kuba bi okanye iimpawu zasebusuku ezifuneka ziqalise ukujongwa kunokongezela iidosi wedwa.",
      "Ukuba ubunzima bokuphefumla obukhulu, ukudumba kobuso, okanye iingcinga zokuzilimaza kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-nitro": five(
    [
      "Nitrofurantoin is a nitrofuran antibacterial used for selected UTI pathways — take it exactly as the labelled product directs, often with food if stomach upset occurs.",
      "Materia does not invent a dose or course length — confirm against current SA STG/EML and the labelled product.",
      "Nitrofurantoin counselling commonly includes urine colour change and completing the UTI course as prescribed.",
      "Tell your pharmacist about kidney history, lung problems, and all other medicines you use.",
      "Ask what incomplete improvement or new breathing symptoms should trigger review rather than extending alone.",
      "If sudden shortness of breath, chest pain, severe rash, yellow eyes, or tingling numbness develops — seek emergency or urgent care.",
    ],
    [
      "I-nitrofurantoin i-nitrofuran antibacterial esetshenziswa ezindleleni ezikhethiwe ze-UTI — thatha njengoba umkhiqizo onelebula uyala, ngokuvamile nokudla uma isisu siphazamiseka.",
      "I-Materia ayiqambi umthamo noma ubude benkambu — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-nitrofurantoin kuvame ukufaka uguquko lombala womchamo nokuqeda inkambu ye-UTI njengoba kubhaliwe.",
      "Tshela umkhiqizi ngomlando wezinso, izinkinga zamaphaphu, nawo wonke amanye amaphilisi owasebenzisayo.",
      "Buza ukuthi yikuphi ukungathuthuki okuphelele noma izimpawu ezisha zokuphefumula okufanele kuqale ukubuyekezwa kunokwelula wedwa.",
      "Uma ukuphefumula okufushane okuzumayo, ubuhlungu besifuba, ukuqubuka okukhulu, amehlo aphuzi, noma ukuba buthuntu okucwilayo kuvela — funa usizo oluphuthumayo noma olusheshayo.",
    ],
    [
      "Nitrofurantoïen is 'n nitrofuraan-antibakteriële middel vir geselekteerde UTI-paaie — neem dit presies soos die geëtiketteerde produk aandui, dikwels met kos as maagongemak voorkom.",
      "Materia versin nie 'n dosis of kuurduur nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Nitrofurantoïen-berading sluit algemeen urienkleurverandering in en om die UTI-kuur soos voorgeskryf te voltooi.",
      "Sê vir jou apteker van niergeskiedenis, longprobleme, en alle ander medisyne wat jy gebruik.",
      "Vra watter onvolledige verbetering of nuwe asemsimptome hersiening moet sneller eerder as alleen te verleng.",
      "As skielike kortasem, borspyn, ernstige uitslag, geel oë of tinteling-gevoelloosheid ontwikkel — soek nood- of dringende sorg.",
    ],
    [
      "Nitrofurantoin ke nitrofuran antibacterial e sebelisoang litseleng tse khethiloeng tsa UTI — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela, hangata le lijo haeba mpa e tšoenya.",
      "Materia ha e iqape tekanyo kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea nitrofurantoin hangata e kenyelletsa phetoho ea 'mala oa moroto le ho qeta thuto ea UTI joalo ka ha e ngotsoe.",
      "Bolella rakhemisi ka histori ea liphio, mathata a matšoafo, le meriana eohle e meng eo u e sebelisang.",
      "Botsa hore na ke ntlafatso life e sa feleng kapa matšoao a macha a ho hema a lokelang ho qala tlhahlobo ho e-na le ho atolosa u le mong.",
      "Haeba ho hema ha khutšoanyane ka tšohanyetso, bohloko ba sefuba, lekhopho le matla, mahlo a mosehla, kapa ho hloka kutlo ho hlaha — batla thuso ea tšohanyetso kapa e potlakileng.",
    ],
    [
      "I-nitrofurantoin yi-nitrofuran antibacterial esetyenziswa kwiindlela ezikhethiweyo ze-UTI — yithathe kanye njengoko imveliso enelebula ikhokela, rhoqo nokutya ukuba isisu siyaphazamiseka.",
      "I-Materia ayiyiqiqi idosi okanye ubude bekhosi — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-nitrofurantoin kuhlala kubandakanya utshintsho lombala womchamo nokugqiba ikhosi ye-UTI njengoko kubhaliwe.",
      "Xelela usokhemisti ngembali yezintso, iingxaki zemiphunga, kunye nawo onke amanye amayeza owawasebenzisayo.",
      "Buza ukuba kukuphi ukungaphucuki okupheleleyo okanye iimpawu ezintsha zokuphefumla ezifuneka ziqalise ukujongwa kunokwandisa wedwa.",
      "Ukuba ukuphefumla okufutshane ngequbuliso, iintlungu zesifuba, irhashalala enzima, amehlo atyheli, okanye ukuba buthuntu okucwilayo kuvela — funa uncedo olungxamisekileyo okanye olukhawulezayo.",
    ],
  ),

  "mol-pyrazinamide": five(
    [
      "Pyrazinamide is an antimycobacterial used in clinician-directed TB regimens — take it exactly as the labelled product and TB care plan direct.",
      "Materia does not invent a dose or liver-enzyme target — confirm against current SA TB guidance and the labelled product.",
      "Pyrazinamide counselling commonly includes liver and joint-pain watch — report yellow eyes, dark urine, severe nausea, or new joint pain.",
      "Tell your pharmacist about alcohol use, other TB medicines, and known liver problems.",
      "Ask what blood-test timing and illness days mean before you change the schedule yourself.",
      "If yellow eyes with severe abdominal pain, vomiting blood, or extreme confusion develops — seek emergency care.",
    ],
    [
      "I-pyrazinamide i-antimycobacterial esetshenziswa ezinhlelweni ze-TB ezilawulwa udokotela — thatha njengoba umkhiqizo onelebula nohlelo lokunakekelwa kwe-TB kuyala.",
      "I-Materia ayiqambi umthamo noma umgomo we-enzyme yesibindi — qinisekisa nesiqondiso se-TB saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-pyrazinamide kuvame ukufaka ukuqaphela isibindi nobuhlungu bamajoint — bika amehlo aphuzi, umchamo omnyama, ukungananzi okukhulu, noma ubuhlungu bamajoint obusha.",
      "Tshela umkhiqizi ngokusebenzisa utshwala, amanye amaphilisi e-TB, nezinkinga zesibindi ezaziwayo.",
      "Buza ukuthi isikhathi sokuhlolwa kwegazi nezinsuku zokugula kusho ukuthini ngaphambi kokushintsha uhlelo wedwa.",
      "Uma amehlo aphuzi nobuhlungu besisu obukhulu, ukuhlanza igazi, noma ukudideka okwedlulele kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Pirasinamied is 'n antimikobakteriële middel in klinikus-gerigte TB-regimens — neem dit presies soos die geëtiketteerde produk en TB-sorgplan aandui.",
      "Materia versin nie 'n dosis of lewerenmien-teiken nie — bevestig teen huidige SA TB-riglyne en die geëtiketteerde produk.",
      "Pirasinamied-berading sluit algemeen lewer- en gewrigspynwag in — rapporteer geel oë, donker urine, ernstige naarheid of nuwe gewrigspyn.",
      "Sê vir jou apteker van alkoholgebruik, ander TB-medisyne, en bekende lewerprobleme.",
      "Vra wat bloettoetstydsberekening en siektedae beteken voordat jy self die skedule verander.",
      "As geel oë met ernstige buikpyn, bloeding braking of uiterste verwarring ontwikkel — soek noodhulp.",
    ],
    [
      "Pyrazinamide ke antimycobacterial e sebelisoang mererong ea TB e tataisoang ke ngaka — e nke hantle joalo ka ha sehlahisoa se nang le ileibole le moralo oa tlhokomelo ea TB li laela.",
      "Materia ha e iqape tekanyo kapa sepheo sa enzyme ea sebete — netefatsa khahlanong le tataiso ea TB ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea pyrazinamide hangata e kenyelletsa ho hlokomela sebete le bohloko ba manonyeletso — tlaleha mahlo a mosehla, moroto o lefifi, ho nyaroha ho matla, kapa bohloko ba manonyeletso bo bocha.",
      "Bolella rakhemisi ka tšebeliso ea joala, meriana e meng ea TB, le mathata a sebete a tsejoang.",
      "Botsa hore na nako ea liteko tsa mali le matsatsi a ho kula a bolela eng pele u fetola kemiso u le mong.",
      "Haeba mahlo a mosehla le bohloko ba mpa bo matla, ho hlatsa mali, kapa ho ferekana ho feteletseng ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-pyrazinamide yi-antimycobacterial esetyenziswa kwiinkqubo ze-TB ezikhokelwa ngugqirha — yithathe kanye njengoko imveliso enelebula kunye nesicwangciso sokhathalelo lwe-TB zikhokela.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lwe-enzyme yesibindi — Qinisekisa nesikhokelo se-TB saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-pyrazinamide kuhlala kubandakanya ukujonga isibindi neentlungu zamajoint — bika amehlo atyheli, umchamo omnyama, ukungananzi okukhulu, okanye iintlungu zamajoint ezintsha.",
      "Xelela usokhemisti ngokusebenzisa utywala, amanye amayeza e-TB, neengxaki zesibindi ezaziwayo.",
      "Buza ukuba ixesha lokuhlolwa kwegazi neentsuku zokugula zithetha ntoni phambi kokutshintsha ishedyuli wedwa.",
      "Ukuba amehlo atyheli neentlungu zesisu ezinkulu, ukugabha igazi, okanye ukudideka okugqithisileyo kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-rivaroxaban": five(
    [
      "Rivaroxaban is a DOAC anticoagulant used under clinician-directed care — take it exactly as the labelled product directs; some strengths are taken with food.",
      "Materia does not invent a dose, INR, or clotting target — confirm against your anticoagulation plan and the labelled product.",
      "Rivaroxaban counselling commonly includes bleeding watch and not stopping without your clinician before procedures.",
      "Tell your pharmacist about other blood thinners, NSAIDs, planned surgery, and kidney or liver history.",
      "Ask what missed-dose rules and food requirements mean for your labelled strength.",
      "If uncontrolled bleeding, stroke symptoms, severe headache, or black stools with dizziness develops — seek emergency care.",
    ],
    [
      "I-rivaroxaban i-DOAC anticoagulant esetshenziswa ngaphansi kokunakekelwa okulawulwa udokotela — thatha njengoba umkhiqizo onelebula uyala; amanye amandla athathwa nokudla.",
      "I-Materia ayiqambi umthamo, i-INR, noma umgomo wokugodla igazi — qinisekisa nohlelo lwakho lwe-anticoagulation nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-rivaroxaban kuvame ukufaka ukuqaphela ukopha nokungayeki ngaphandle kukadokotela ngaphambi kwezinqubo.",
      "Tshela umkhiqizi ngamanye ama-blood thinner, ama-NSAID, ukuhlinzwa okuhleliwe, nomlando wezinso noma wesibindi.",
      "Buza ukuthi imithetho yomthamo ophuthelwe nezidingo zokudla kusho ukuthini emandleni akho alebula.",
      "Uma ukopha okungalawuleki, izimpawu ze-stroke, ubuhlungu bekhanda obukhulu, noma okubomvu kwamathumbu nesiyezi kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Rivaroksaban is 'n DOAC-antikoagulant onder klinikus-gerigte sorg — neem dit presies soos die geëtiketteerde produk aandui; sommige sterktes word met kos geneem.",
      "Materia versin nie 'n dosis, INR of stolteiken nie — bevestig teen jou antikoagulasieplan en die geëtiketteerde produk.",
      "Rivaroksaban-berading sluit algemeen bloedingwag in en om nie sonder jou klinikus voor prosedures te stop nie.",
      "Sê vir jou apteker van ander bloedverdunners, NSAIDs, beplande chirurgie, en nier- of lewergeskiedenis.",
      "Vra wat gemiste-dosisreëls en kosvereistes vir jou geëtiketteerde sterkte beteken.",
      "As onbeheerde bloeding, beroerte-simptome, ernstige hoofpyn of swart stoelgang met duiseligheid ontwikkel — soek noodhulp.",
    ],
    [
      "Rivaroxaban ke DOAC anticoagulant e sebelisoang tlas'a tlhokomelo e tataisoang ke ngaka — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela; matla a mang a nkoa le lijo.",
      "Materia ha e iqape tekanyo, INR, kapa sepheo sa ho omella mali — netefatsa khahlanong le moralo oa hau oa anticoagulation le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea rivaroxaban hangata e kenyelletsa ho hlokomela ho tsoa mali le ho se emise ntle le ngaka pele ho mekhoa.",
      "Bolella rakhemisi ka li-blood thinner tse ling, li-NSAID, opereishene e reriloeng, le histori ea liphio kapa sebete.",
      "Botsa hore na melao ea tekanyo e fosumetsoeng le litlhoko tsa lijo li bolela eng bakeng sa matla a hau a nang le ileibole.",
      "Haeba ho tsoa mali ho sa laoleheng, matšoao a stroke, hlooho e bohloko haholo, kapa litšila tse ntšo le ho tsekama ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-rivaroxaban yi-DOAC anticoagulant esetyenziswa phantsi kokhathalelo olukhokelwa ngugqirha — yithathe kanye njengoko imveliso enelebula ikhokela; amanye amandla athathwa nokutya.",
      "I-Materia ayiyiqiqi idosi, i-INR, okanye usukelo lokuqina kwegazi — Qinisekisa nesicwangciso sakho se-anticoagulation kunye nemveliso enelebula.",
      "Ukucebisa nge-rivaroxaban kuhlala kubandakanya ukujonga ukopha nokungayeki ngaphandle kogqirha phambi kweenkqubo.",
      "Xelela usokhemisti ngamanye ama-blood thinner, ii-NSAID, utyando olucwangcisiweyo, nembali yezintso okanye yesibindi.",
      "Buza ukuba imithetho yedosi ephosakeleyo neemfuno zokutya zithetha ntoni kumandla akho anelebula.",
      "Ukuba ukopha okungalawulekiyo, iimpawu ze-stroke, iintloko ezibuhlungu kakhulu, okanye okumnyama kwamathumbu nesiyezi kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),
};
