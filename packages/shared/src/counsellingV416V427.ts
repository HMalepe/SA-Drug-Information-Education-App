/**
 * v416–v427 deepened SA counselling batch (6 lines × 5 langs) — deepen thin high-volume core scripts.
 * Original Materia educational scripts only — no invented mg doses, eGFR cut-offs, lipid/BP targets,
 * daily maxima, puff counts, or clock schedules. Overrides thinner base counselling.ts entries via spread order.
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

export const COUNSELLING_V416_TO_V427: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-metformin": five(
    [
      "Metformin is a first-line oral diabetes medicine used widely in South African care — take it exactly as the labelled product and care plan direct.",
      "Materia does not invent a dose, meal schedule, or kidney cut-off — confirm against current SA guidance and the labelled product.",
      "Metformin counselling often includes taking with food if stomach upset occurs — still confirm against the labelled product.",
      "Tell your pharmacist or clinician about kidney problems, heavy alcohol use, or severe dehydration/illness before and during use.",
      "Ask what nausea, diarrhoea, or illness days should trigger review rather than stopping alone.",
      "If unusual muscle pain, severe vomiting, trouble breathing, or extreme tiredness develops — seek emergency care.",
    ],
    [
      "I-metformin iwumuthi womlomo wokuqala wesifo sikashukela osetshenziswa kakhulu eNingizimu Afrika — thatha njengoba umkhiqizo onelebula nohlelo lokunakekelwa kuyala.",
      "I-Materia ayiqambi umthamo, uhlelo lokudla, noma umkhawulo wezinso — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukwelulekwa kwe-metformin kuvame ukufaka ukuthatha nokudla uma isisu siphazamiseka — noma kunjalo qinisekisa nomkhiqizo onelebula.",
      "Tshela umkhiqizi noma udokotela ngezinkinga zezinso, ukuphuza kakhulu utshwala, noma ukoma/ukugula okukhulu ngaphambi nangesikhathi sokusetshenziswa.",
      "Buza ukuthi yikuphi ukungananzi, uhudo, noma izinsuku zokugula okufanele kuqale ukubuyekezwa kunokuyeka wedwa.",
      "Uma ubuhlungu bemisipha obungajwayelekile, ukuhlanza okukhulu, ubunzima bokuphefumula, noma ukukhathala okwedlulele kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Metformien is 'n eerstelyn mondelinge diabetesmedisyne wat wyd in Suid-Afrikaanse sorg gebruik word — neem dit presies soos die geëtiketteerde produk en sorgplan aandui.",
      "Materia versin nie 'n dosis, maaltydskedule of nier-afsnit nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Metformien-berading sluit dikwels in om met kos te neem as maagongemak voorkom — bevestig steeds teen die geëtiketteerde produk.",
      "Sê vir jou apteker of klinikus van nierprobleme, swaar alkoholgebruik, of ernstige dehidrasie/siekte voor en tydens gebruik.",
      "Vra watter naarheid, diarree of siektedae hersiening moet sneller eerder as alleen te stop.",
      "As ongewone spierpyn, ernstige braking, asemnood of uiterste moegheid ontwikkel — soek noodhulp.",
    ],
    [
      "Metformin ke meriana ea pele ea molomo ea lefu la tsoekere e sebelisoang haholo tlhokomelong ea Afrika Boroa — e nke hantle joalo ka ha sehlahisoa se nang le ileibole le moralo oa tlhokomelo li laela.",
      "Materia ha e iqape tekanyo, kemiso ea lijo, kapa moeli oa liphio — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea metformin hangata e kenyelletsa ho e nka le lijo haeba mpa e tšoenya — ntse o netefatsa khahlanong le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi kapa ngaka ka mathata a liphio, tšebeliso e matla ea joala, kapa ho oma/ho kula ho matla pele le nakong ea tšebeliso.",
      "Botsa hore na ke ho nyaroha life, letšollo, kapa matsatsi a ho kula a lokelang ho qala tlhahlobo ho e-na le ho emisa u le mong.",
      "Haeba bohloko ba mesifa bo sa tloaelehang, ho hlatsa ho matla, ho hema thata, kapa mokhathala o feteletseng o hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-metformin liyeza lomlomo lokuqala lesifo seswekile elisetyenziswa kakhulu kukhathalelo lwaseMzantsi Afrika — yithathe kanye njengoko imveliso enelebula kunye nesicwangciso sokhathalelo zikhokela.",
      "I-Materia ayiyiqiqi idosi, ishedyuli yokutya, okanye umda wezintso — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-metformin kuhlala kubandakanya ukuthatha nokutya ukuba isisu siyaphazamiseka — noko Qinisekisa nemveliso enelebula.",
      "Xelela usokhemisti okanye ugqirha ngeengxaki zezintso, ukusela utywala kakhulu, okanye ukoma/ukugula okukhulu phambi nangexesha lokusetyenziswa.",
      "Buza ukuba kukuphi ukungananzi, urhudo, okanye iintsuku zokugula ezifuneka ziqalise ukujongwa kunokuyeka wedwa.",
      "Ukuba iintlungu zemisipha ezingaqhelekanga, ukugabha okukhulu, ubunzima bokuphefumla, okanye ukudinwa okugqithisileyo kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-amox": five(
    [
      "Amoxicillin is a penicillin antibiotic used for selected bacterial infections — finish the course unless your clinician says stop.",
      "Materia does not invent a dose, interval, or course length — confirm against current SA STG/EML and the labelled product.",
      "Tell your pharmacist if you have ever had a penicillin or beta-lactam allergy.",
      "Ask what new rash, diarrhoea, or incomplete improvement should trigger review rather than extending the course alone.",
      "This informs professional judgement — unused antibiotics are not for sharing or future self-treatment.",
      "If rash, swelling, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-amoxicillin i-antibiotic ye-penicillin esetshenziselwa izifo ezikhethiwe zamagciwane — qeda inkambu ngaphandle uma udokotela ethi uyeke.",
      "I-Materia ayiqambi umthamo, isikhathi phakathi, noma ubude benkambu — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi uma wake waba ne-allergy ye-penicillin noma ye-beta-lactam.",
      "Buza ukuthi yikuphi ukuqubuka okusha, uhudo, noma ukungathuthuki okuphelele kufanele kuqale ukubuyekezwa kunokwelula inkambu wedwa.",
      "Lokhu kuchaza isigqi — ama-antibiotic angasetshenzisiwe awenzelwe ukwabelana noma ukuzelapha okuzayo.",
      "Uma ukuqubuka, ukuvuvuka, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Amoksisillien is 'n penisillien-antibiotikum vir geselekteerde bakteriële infeksies — voltooi die kuur tensy jou klinikus sê stop.",
      "Materia versin nie 'n dosis, interval of kuurduur nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir jou apteker as jy ooit 'n penisillien- of beta-laktamallergie gehad het.",
      "Vra watter nuwe uitslag, diarree of onvolledige verbetering hersiening moet sneller eerder as om die kuur alleen te verleng.",
      "Dit informeer professionele oordeel — ongebruikte antibiotika is nie vir deel of toekomstige selfbehandeling nie.",
      "As uitslag, swelling of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Amoxicillin ke antibiotic ea penicillin e sebelisoang bakeng sa tšoaetso tse khethiloeng tsa baktheria — qeta thuto ntle le haeba ngaka e re emisa.",
      "Materia ha e iqape tekanyo, nako pakeng tsa, kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi haeba o kile oa ba le allergy ea penicillin kapa beta-lactam.",
      "Botsa hore na ke lekhopho life le lecha, letšollo, kapa ntlafatso e sa feleng e lokelang ho qala tlhahlobo ho e-na le ho atolosa thuto u le mong.",
      "Sena se tsebisa tsebo ea bongaka — li-antibiotic tse sa sebelisoang ha li etsetsoa ho arolelana kapa kalafo ea ka boithatelo ea kamoso.",
      "Haeba lekhopho, ho ruruha, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-amoxicillin yi-antibiotic ye-penicillin esetyenziselwa izifo ezikhethiweyo zebhaktheria — gqiba ikhosi ngaphandle kokuba ugqirha athi yeka.",
      "I-Materia ayiyiqiqi idosi, ixesha phakathi, okanye ubude bekhosi — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti ukuba wakhe waba ne-allergy ye-penicillin okanye ye-beta-lactam.",
      "Buza ukuba kukuphi irhashalala entsha, urhudo, okanye ukungaphucuki okupheleleyo okufuneka kuqalise ukujongwa kunokwandisa ikhosi wedwa.",
      "Oku kuchaza ingqiqo yobungcali — ii-antibiotic ezingasetyenziswanga azenzelwanga ukwabelana okanye ukunyanga ngokwakho kwixesha elizayo.",
      "Ukuba irhashalala, ukudumba, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-amoxclav": five(
    [
      "Amoxicillin–clavulanate is a penicillin combination antibiotic used for selected bacterial infections — finish the course unless your clinician says stop.",
      "Materia does not invent a dose, interval, or course length — confirm against current SA STG/EML and the labelled product.",
      "Tell your pharmacist if you have ever had a penicillin or beta-lactam allergy.",
      "Food may help if stomach upset occurs — still follow the labelled product; Materia does not invent a meal schedule.",
      "Ask what diarrhoea, new rash, or incomplete improvement should trigger review rather than extending the course alone.",
      "If rash, swelling, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-amoxicillin–clavulanate i-antibiotic ye-penicillin ehlanganisiwe esetshenziselwa izifo ezikhethiwe zamagciwane — qeda inkambu ngaphandle uma udokotela ethi uyeke.",
      "I-Materia ayiqambi umthamo, isikhathi phakathi, noma ubude benkambu — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi uma wake waba ne-allergy ye-penicillin noma ye-beta-lactam.",
      "Ukudla kungasiza uma isisu siphazamiseka — noma kunjalo landela umkhiqizo onelebula; i-Materia ayiqambi uhlelo lokudla.",
      "Buza ukuthi yikuphi uhudo, ukuqubuka okusha, noma ukungathuthuki okuphelele kufanele kuqale ukubuyekezwa kunokwelula inkambu wedwa.",
      "Uma ukuqubuka, ukuvuvuka, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Amoksisillien–klavulanaat is 'n penisillien-kombinasie-antibiotikum vir geselekteerde bakteriële infeksies — voltooi die kuur tensy jou klinikus sê stop.",
      "Materia versin nie 'n dosis, interval of kuurduur nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir jou apteker as jy ooit 'n penisillien- of beta-laktamallergie gehad het.",
      "Kos mag help as maagongemak voorkom — volg steeds die geëtiketteerde produk; Materia versin nie 'n maaltydskedule nie.",
      "Vra watter diarree, nuwe uitslag of onvolledige verbetering hersiening moet sneller eerder as om die kuur alleen te verleng.",
      "As uitslag, swelling of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Amoxicillin–clavulanate ke antibiotic ea penicillin e kopantsoeng e sebelisoang bakeng sa tšoaetso tse khethiloeng tsa baktheria — qeta thuto ntle le haeba ngaka e re emisa.",
      "Materia ha e iqape tekanyo, nako pakeng tsa, kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi haeba o kile oa ba le allergy ea penicillin kapa beta-lactam.",
      "Lijo li ka thusa haeba mpa e tšoenya — ntse o latele sehlahisoa se nang le ileibole; Materia ha e iqape kemiso ea lijo.",
      "Botsa hore na ke letšollo life, lekhopho le lecha, kapa ntlafatso e sa feleng e lokelang ho qala tlhahlobo ho e-na le ho atolosa thuto u le mong.",
      "Haeba lekhopho, ho ruruha, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-amoxicillin–clavulanate yi-antibiotic ye-penicillin edityanisiweyo esetyenziselwa izifo ezikhethiweyo zebhaktheria — gqiba ikhosi ngaphandle kokuba ugqirha athi yeka.",
      "I-Materia ayiyiqiqi idosi, ixesha phakathi, okanye ubude bekhosi — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti ukuba wakhe waba ne-allergy ye-penicillin okanye ye-beta-lactam.",
      "Ukutya kunganceda ukuba isisu siyaphazamiseka — noko landela imveliso enelebula; i-Materia ayiyiqiqi ishedyuli yokutya.",
      "Buza ukuba kukuphi urhudo, irhashalala entsha, okanye ukungaphucuki okupheleleyo okufuneka kuqalise ukujongwa kunokwandisa ikhosi wedwa.",
      "Ukuba irhashalala, ukudumba, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-paracetamol": five(
    [
      "Paracetamol (acetaminophen) is a common pain and fever medicine — take it exactly as the labelled product directs.",
      "Materia does not invent a daily maximum, age-band dose, or interval — confirm against the labelled product and pharmacist advice.",
      "Check other cold, flu, and pain products for paracetamol so you do not double up.",
      "Tell your pharmacist about liver disease or heavy alcohol use before using this medicine.",
      "This informs professional judgement — do not use leftover bottles as a standing household plan without checking the label each time.",
      "If too much may have been taken, or severe abdominal pain, vomiting, or yellowing of the skin/eyes develops — seek emergency care immediately (do not wait for symptoms).",
    ],
    [
      "I-paracetamol (acetaminophen) iwumuthi ojwayelekile wobuhlungu nomkhuhlane — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umkhawulo wansuku zonke, umthamo wesigaba seminyaka, noma isikhathi phakathi — qinisekisa nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Hlola eminye imikhiqizo yomkhuhlane, iflu, nobuhlungu nge-paracetamol ukuze ungaphindi kabili.",
      "Tshela umkhiqizi ngesifo sesibindi noma ukuphuza kakhulu utshwala ngaphambi kokusebenzisa lo muthi.",
      "Lokhu kuchaza isigqi — ungasebenzisi amabhodlela asele njengohlelo lwasekhaya oluhlala njalo ngaphandle kokuhlola ilebula njalo.",
      "Uma kungenzeka uthathe kakhulu, noma ubuhlungu besisu obukhulu, ukuhlanza, noma ukuphuzi kwesikhumba/amehlo kuvela — funa usizo oluphuthumayo ngokushesha (ungalindi izimpawu).",
    ],
    [
      "Parasetamol (asetaminofeen) is 'n algemene pyn- en koorsmedisyne — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n daaglikse maksimum, ouderdomsgroepdosis of interval nie — bevestig teen die geëtiketteerde produk en aptekeradvies.",
      "Kontroleer ander verkoue-, griep- en pynprodukte vir parasetamol sodat jy nie verdubbel nie.",
      "Sê vir jou apteker van lewersiekte of swaar alkoholgebruik voordat jy hierdie medisyne gebruik.",
      "Dit informeer professionele oordeel — moenie oorblywende bottels as 'n vaste huishoudelike plan gebruik sonder om elke keer die etiket te kontroleer nie.",
      "As te veel dalk geneem is, of ernstige buikpyn, braking of vergeling van die vel/oë ontwikkel — soek onmiddellik noodhulp (moenie vir simptome wag nie).",
    ],
    [
      "Paracetamol (acetaminophen) ke meriana e tloaelehileng ea bohloko le feberu — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape bophahamo ba letsatsi le letsatsi, tekanyo ea sehlopha sa lilemo, kapa nako pakeng tsa — netefatsa khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Hlahloba lihlahisoa tse ling tsa sefuba, flu le bohloko bakeng sa paracetamol e le hore u se ke ua e nka habeli.",
      "Bolella rakhemisi ka lefu la sebete kapa tšebeliso e matla ea joala pele u sebelisa meriana ena.",
      "Sena se tsebisa tsebo ea bongaka — u se ke ua sebelisa libotlolo tse setseng e le moralo o sa feleng oa lelapa ntle le ho hlahloba ileibole nako le nako.",
      "Haeba ho ka etsahala hore u nkile haholo, kapa bohloko ba mpa bo matla, ho hlatsa, kapa ho mosehla ha letlalo/mahlo ho hlaha — batla thuso ea tšohanyetso hang-hang (u se ke ua ema matšoao).",
    ],
    [
      "I-paracetamol (acetaminophen) liyeza eliqhelekileyo leentlungu nomkhuhlane — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi ubuninzi bemihla ngemihla, idosi yebanga leminyaka, okanye ixesha phakathi — Qinisekisa nemveliso enelebula nengcebiso yosokhemisti.",
      "Jonga ezinye iimveliso zomkhuhlane, iflu, neentlungu nge-paracetamol ukuze ungaphindi kabini.",
      "Xelela usokhemisti ngesifo sesibindi okanye ukusela utywala kakhulu phambi kokusebenzisa eli yeza.",
      "Oku kuchaza ingqiqo yobungcali — ungasebenzisi iibhotile ezishiyekileyo njengesicwangciso sendlu esihlala njalo ngaphandle kokujonga ilebula rhoqo.",
      "Ukuba kusenokwenzeka uthathe kakhulu, okanye iintlungu zesisu ezinkulu, ukugabha, okanye ukutyheli kwesikhumba/amehlo kuvela — funa uncedo olungxamisekileyo ngokukhawuleza (ungalindi iimpawu).",
    ],
  ),

  "mol-ibuprofen": five(
    [
      "Ibuprofen is an NSAID used for pain and inflammation — take it exactly as the labelled product directs.",
      "Materia does not invent a dose or combination rule — confirm against the labelled product and pharmacist advice.",
      "NSAID counselling often includes taking with food if stomach upset occurs — still confirm against the labelled product.",
      "Tell your pharmacist about ulcer, asthma, bleeding history, kidney concerns, or other pain medicines you use.",
      "Ask what black stools, swelling, or breathing change should trigger urgent review.",
      "If severe rash, swelling, black stools, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-ibuprofen i-NSAID esetshenziselwa ubuhlungu nokuvuvuka — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo noma umthetho wokuhlanganisa — qinisekisa nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Ukuelulekwa kwe-NSAID kuvame ukufaka ukuthatha nokudla uma isisu siphazamiseka — noma kunjalo qinisekisa nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngesilonda, i-asthma, umlando wokopha, izinkinga zezinso, noma eminye imithi yobuhlungu oyisebenzisayo.",
      "Buza ukuthi yikuphi okubomvu kwamathumbu, ukuvuvuka, noma uguquko lokuphefumula okufanele kuqale ukubuyekezwa okuphuthumayo.",
      "Uma ukuqubuka okukhulu, ukuvuvuka, okubomvu kwamathumbu, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Ibuprofen is 'n NSAID vir pyn en inflammasie — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis of kombinasie-reël nie — bevestig teen die geëtiketteerde produk en aptekeradvies.",
      "NSAID-berading sluit dikwels in om met kos te neem as maagongemak voorkom — bevestig steeds teen die geëtiketteerde produk.",
      "Sê vir jou apteker van ulkus, asma, bloedinggeskiedenis, nierkommer, of ander pynmedisyne wat jy gebruik.",
      "Vra watter swart stoelgang, swelling of asemverandering dringende hersiening moet sneller.",
      "As ernstige uitslag, swelling, swart stoelgang of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Ibuprofen ke NSAID e sebelisoang bakeng sa bohloko le ho ruruha — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo kapa molao oa ho kopanya — netefatsa khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Tlhabollo ea NSAID hangata e kenyelletsa ho e nka le lijo haeba mpa e tšoenya — ntse o netefatsa khahlanong le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka leqeba, asthma, histori ea ho tsoa mali, mathata a liphio, kapa meriana e meng ea bohloko eo u e sebelisang.",
      "Botsa hore na ke litšila life tse ntšo, ho ruruha, kapa phetoho ea ho hema e lokelang ho qala tlhahlobo e potlakileng.",
      "Haeba lekhopho le matla, ho ruruha, litšila tse ntšo, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-ibuprofen yi-NSAID esetyenziselwa iintlungu kunye nokudumba — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi okanye umthetho wokudibanisa — Qinisekisa nemveliso enelebula nengcebiso yosokhemisti.",
      "Ukucebisa nge-NSAID kuhlala kubandakanya ukuthatha nokutya ukuba isisu siyaphazamiseka — noko Qinisekisa nemveliso enelebula.",
      "Xelela usokhemisti ngesilonda, i-asthma, imbali yokopha, iinkxalabo zezintso, okanye amanye amayeza eentlungu owawasebenzisayo.",
      "Buza ukuba kukuphi okumnyama kwamathumbu, ukudumba, okanye utshintsho lokuphefumla okufuneka kuqalise ukujongwa okungxamisekileyo.",
      "Ukuba irhashalala enzima, ukudumba, okumnyama kwamathumbu, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-atorvastatin": five(
    [
      "Atorvastatin is a statin used to lower cholesterol risk under clinician-directed care — take it exactly as the labelled product directs.",
      "Materia does not invent a dose or lipid target — confirm against current SA guidance and the labelled product.",
      "Statin counselling commonly includes reporting unexplained muscle pain, tenderness, or weakness to your pharmacist or clinician.",
      "Tell your pharmacist about other medicines you take and about grapefruit products — some combinations matter; confirm against the labelled product.",
      "Ask what dark urine, yellow eyes, or persistent muscle symptoms should trigger urgent review.",
      "If severe muscle pain with dark urine, yellowing of the skin/eyes, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-atorvastatin i-statin esetshenziselwa ukwehlisa ingozi ye-cholesterol ngaphansi kokunakekelwa okulawulwa udokotela — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo noma umgomo we-lipid — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-statin kuvame ukufaka ukubika ubuhlungu bemisipha obungachazeki, ubuhlungu bokuthinta, noma ubuthakathaka kumkhiqizi noma kudokotela.",
      "Tshela umkhiqizi ngamanye amaphilisi owathathayo nangezikhiqizo zegrepefruit — ezinye izinhlanganisela zibalulekile; qinisekisa nomkhiqizo onelebula.",
      "Buza ukuthi yimuphi umchamo omnyama, amehlo aphuzi, noma izimpawu zemisipha eziqhubekayo okufanele kuqale ukubuyekezwa okuphuthumayo.",
      "Uma ubuhlungu bemisipha obukhulu nomchamo omnyama, ukuphuzi kwesikhumba/amehlo, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Atorvastatien is 'n statien om cholesterolrisiko onder klinikus-gerigte sorg te verlaag — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis of lipiedteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Statien-berading sluit algemeen in om onverklaarde spierpyn, teerheid of swakheid aan jou apteker of klinikus te rapporteer.",
      "Sê vir jou apteker van ander medisyne wat jy neem en van pomelo-produkte — sommige kombinasies maak saak; bevestig teen die geëtiketteerde produk.",
      "Vra watter donker urine, geel oë of aanhoudende spiersimptome dringende hersiening moet sneller.",
      "As ernstige spierpyn met donker urine, vergeling van die vel/oë of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Atorvastatin ke statin e sebelisoang ho fokotsa kotsi ea cholesterol tlas'a tlhokomelo e tataisoang ke ngaka — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo kapa sepheo sa lipid — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea statin hangata e kenyelletsa ho tlaleha bohloko ba mesifa bo sa hlaloseng, bohloko ba ho ama, kapa bofokoli ho rakhemisi kapa ngaka.",
      "Bolella rakhemisi ka meriana e meng eo u e nkang le ka lihlahisoa tsa grapefruit — lipopanyo tse ling lia bohlokoa; netefatsa khahlanong le sehlahisoa se nang le ileibole.",
      "Botsa hore na ke moroto ofe o lefifi, mahlo a mosehla, kapa matšoao a mesifa a tsoelang pele a lokelang ho qala tlhahlobo e potlakileng.",
      "Haeba bohloko ba mesifa bo matla le moroto o lefifi, ho mosehla ha letlalo/mahlo, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-atorvastatin yi-statin esetyenziselwa ukwehlisa umngcipheko we-cholesterol phantsi kokhathalelo olukhokelwa ngugqirha — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lwe-lipid — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-statin kuhlala kubandakanya ukubika iintlungu zemisipha ezingachazekiyo, ubuhlungu bokuchukumisa, okanye ubuthathaka kusokhemisti okanye kugqirha.",
      "Xelela usokhemisti ngamanye amayeza owawathathayo nangeemveliso zegrepefruit — ezinye iindibaniselwano zibalulekile; Qinisekisa nemveliso enelebula.",
      "Buza ukuba ngowuphi umchamo omnyama, amehlo atyheli, okanye iimpawu zemisipha eziqhubekayo ezifuneka ziqalise ukujongwa okungxamisekileyo.",
      "Ukuba iintlungu zemisipha ezinkulu nomchamo omnyama, ukutyheli kwesikhumba/amehlo, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-amlodipine": five(
    [
      "Amlodipine is a calcium-channel blocker used for blood pressure and selected heart pathways — take it exactly as the labelled product directs.",
      "Materia does not invent a dose or blood-pressure target — confirm against current SA guidance and the labelled product.",
      "Calcium-channel blocker counselling commonly includes ankle swelling and dizziness — tell your pharmacist if these bother you.",
      "Grapefruit products may affect some calcium-channel blockers — confirm against the labelled product; Materia does not invent a food list.",
      "Ask what dizziness on standing or new chest symptoms should trigger review rather than stopping alone.",
      "If severe dizziness, chest pain that is new or worse, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-amlodipine i-calcium-channel blocker esetshenziselwa umfutho wegazi nezindlela ezikhethiwe zenhliziyo — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo noma umgomo womfutho wegazi — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-calcium-channel blocker kuvame ukufaka ukuvuvuka kwezindlebe zezinyawo nesiyezi — tshela umkhiqizi uma lokhu kukuhlupha.",
      "Imikhiqizo yegrepefruit ingathinta amanye ama-calcium-channel blockers — qinisekisa nomkhiqizo onelebula; i-Materia ayiqambi uhlu lokudla.",
      "Buza ukuthi yisiphi isiyezi sokuma noma izimpawu zesifuba ezisha okufanele kuqale ukubuyekezwa kunokuyeka wedwa.",
      "Uma isiyezi esikhulu, ubuhlungu besifuba obusha noma obubi kakhulu, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Amlodipien is 'n kalsiumkanaalblokkeerder vir bloeddruk en geselekteerde hartpaaie — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis of bloeddrukteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Kalsiumkanaalblokkeerder-berading sluit algemeen enkelswelling en duiseligheid in — sê vir jou apteker as dit jou pla.",
      "Pomelo-produkte kan sommige kalsiumkanaalblokkeerders beïnvloed — bevestig teen die geëtiketteerde produk; Materia versin nie 'n koslys nie.",
      "Vra watter duiseligheid by staan of nuwe borssimptome hersiening moet sneller eerder as alleen te stop.",
      "As ernstige duiseligheid, borspyn wat nuut of erger is, of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Amlodipine ke calcium-channel blocker e sebelisoang bakeng sa khatello ea mali le litsela tse khethiloeng tsa pelo — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo kapa sepheo sa khatello ea mali — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea calcium-channel blocker hangata e kenyelletsa ho ruruha ha maqaqailana le ho tsekama — bolella rakhemisi haeba sena se u tšoenya.",
      "Lihlahisoa tsa grapefruit li ka ama li-calcium-channel blockers tse ling — netefatsa khahlanong le sehlahisoa se nang le ileibole; Materia ha e iqape lethathamo la lijo.",
      "Botsa hore na ke ho tsekama life ha u ema kapa matšoao a sefuba a macha a lokelang ho qala tlhahlobo ho e-na le ho emisa u le mong.",
      "Haeba ho tsekama ho matla, bohloko ba sefuba bo bocha kapa bo mpefalang, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-amlodipine yi-calcium-channel blocker esetyenziselwa uxinzelelo lwegazi kunye neendlela ezikhethiweyo zentliziyo — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi okanye usukelo loxinzelelo lwegazi — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-calcium-channel blocker kuhlala kubandakanya ukudumba kwamaqatha kunye nesiyezi — xelela usokhemisti ukuba oku kuyakukhathaza.",
      "Iimveliso zegrepefruit zinokuchaphazela ezinye ii-calcium-channel blockers — Qinisekisa nemveliso enelebula; i-Materia ayiyiqiqi uluhlu lokutya.",
      "Buza ukuba kukuphi isiyezi sokuma okanye iimpawu zesifuba ezintsha ezifuneka ziqalise ukujongwa kunokuyeka wedwa.",
      "Ukuba isiyezi esikhulu, iintlungu zesifuba ezintsha okanye ezimbi ngakumbi, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-omeprazole": five(
    [
      "Omeprazole is a PPI used to reduce stomach acid in selected reflux and ulcer pathways — take it exactly as the labelled product directs.",
      "Materia does not invent a clock schedule or dose — confirm timing against the labelled product and pharmacist advice.",
      "PPI counselling often includes taking before food — still confirm against the labelled product.",
      "Tell your pharmacist about other medicines you take — some products interact with PPIs.",
      "Ask what persistent heartburn, black stools, or diarrhoea should trigger review rather than prolonging alone.",
      "If severe diarrhoea, black stools, a severe rash, swelling, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-omeprazole i-PPI esetshenziselwa ukunciphisa i-asidi yesisu ezindleleni ezikhethiwe ze-reflux nezesilonda — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi uhlelo lwewashi noma umthamo — qinisekisa isikhathi nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Ukuelulekwa kwe-PPI kuvame ukufaka ukuthatha ngaphambi kokudla — noma kunjalo qinisekisa nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngamanye amaphilisi owathathayo — eminye imikhiqizo iyasebenzisana nama-PPI.",
      "Buza ukuthi yikuphi ukusha kwesifuba okuqhubekayo, okubomvu kwamathumbu, noma uhudo okufanele kuqale ukubuyekezwa kunokwelula wedwa.",
      "Uma uhudo olukhulu, okubomvu kwamathumbu, ukuqubuka okukhulu, ukuvuvuka, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Omeprazol is 'n PPI om maagsuur in geselekteerde refluks- en ulkuspaaie te verminder — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n horlosieskedule of dosis nie — bevestig tydsberekening teen die geëtiketteerde produk en aptekeradvies.",
      "PPI-berading sluit dikwels in om voor kos te neem — bevestig steeds teen die geëtiketteerde produk.",
      "Sê vir jou apteker van ander medisyne wat jy neem — sommige produkte wissel met PPI's.",
      "Vra watter aanhoudende sooibrand, swart stoelgang of diarree hersiening moet sneller eerder as alleen te verleng.",
      "As ernstige diarree, swart stoelgang, ernstige uitslag, swelling of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Omeprazole ke PPI e sebelisoang ho fokotsa asiti ea mpa litseleng tse khethiloeng tsa reflux le leqeba — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape kemiso ea oache kapa tekanyo — netefatsa nako khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Tlhabollo ea PPI hangata e kenyelletsa ho e nka pele ho lijo — ntse o netefatsa khahlanong le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka meriana e meng eo u e nkang — lihlahisoa tse ling lia sebelisana le li-PPI.",
      "Botsa hore na ke ho tjhesa life ha sefuba ho tsoelang pele, litšila tse ntšo, kapa letšollo le lokelang ho qala tlhahlobo ho e-na le ho atolosa u le mong.",
      "Haeba letšollo le matla, litšila tse ntšo, lekhopho le matla, ho ruruha, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-omeprazole yi-PPI esetyenziselwa ukunciphisa iasidi yesisu kwiindlela ezikhethiweyo ze-reflux nezesilonda — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi ishedyuli yewotshi okanye idosi — Qinisekisa ixesha nemveliso enelebula nengcebiso yosokhemisti.",
      "Ukucebisa nge-PPI kuhlala kubandakanya ukuthatha phambi kokutya — noko Qinisekisa nemveliso enelebula.",
      "Xelela usokhemisti ngamanye amayeza owawathathayo — ezinye iimveliso ziyasebenzisana nee-PPI.",
      "Buza ukuba kukuphi ukutshisa kwesifuba okuqhubekayo, okumnyama kwamathumbu, okanye urhudo okufuneka kuqalise ukujongwa kunokwandisa wedwa.",
      "Ukuba urhudo olunzima, okumnyama kwamathumbu, irhashalala enzima, ukudumba, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-aspirin": five(
    [
      "Aspirin is used for pain and, in selected care plans, heart protection — those uses differ; follow the labelled product and care plan you were given.",
      "Materia does not invent a dose or combination rule — confirm against the labelled product and pharmacist advice.",
      "Tell your pharmacist about ulcer, bleeding history, asthma, or other pain/blood-thinning medicines.",
      "Aspirin is generally not for children or teens with viral illness unless a clinician directs it — confirm against the labelled product.",
      "Ask what unusual bleeding or black stools should trigger urgent review rather than continuing alone.",
      "If unusual bleeding, black stools, severe rash, swelling, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-aspirin isetshenziselwa ubuhlungu futhi, ezinhlelweni ezikhethiwe zokunakekelwa, ukuvikela inhliziyo — leyo misebenzi iyahluka; landela umkhiqizo onelebula nohlelo lokunakekelwa owenziwe.",
      "I-Materia ayiqambi umthamo noma umthetho wokuhlanganisa — qinisekisa nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Tshela umkhiqizi ngesilonda, umlando wokopha, i-asthma, noma eminye imithi yobuhlungu/yokunciphisa igazi.",
      "I-aspirin ngokuvamile ayenzelwe izingane noma intsha ene-viral illness ngaphandle uma udokotela eyala — qinisekisa nomkhiqizo onelebula.",
      "Buza ukuthi yikuphi ukopha okungajwayelekile noma okubomvu kwamathumbu okufanele kuqale ukubuyekezwa okuphuthumayo kunokuqhubeka wedwa.",
      "Uma ukopha okungajwayelekile, okubomvu kwamathumbu, ukuqubuka okukhulu, ukuvuvuka, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Aspirien word vir pyn en, in geselekteerde sorgplanne, hartbeskerming gebruik — daardie gebruike verskil; volg die geëtiketteerde produk en sorgplan wat jy gekry het.",
      "Materia versin nie 'n dosis of kombinasie-reël nie — bevestig teen die geëtiketteerde produk en aptekeradvies.",
      "Sê vir jou apteker van ulkus, bloedinggeskiedenis, asma, of ander pyn-/bloedverdunningsmedisyne.",
      "Aspirien is oor die algemeen nie vir kinders of tieners met virussiekte nie tensy 'n klinikus dit rig — bevestig teen die geëtiketteerde produk.",
      "Vra watter ongewone bloeding of swart stoelgang dringende hersiening moet sneller eerder as alleen voort te gaan.",
      "As ongewone bloeding, swart stoelgang, ernstige uitslag, swelling of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Aspirin e sebelisoa bakeng sa bohloko 'me, mererong e khethiloeng ea tlhokomelo, tšireletso ea pelo — litšebeliso tseo lia fapana; latele sehlahisoa se nang le ileibole le moralo oa tlhokomelo oo u o filoeng.",
      "Materia ha e iqape tekanyo kapa molao oa ho kopanya — netefatsa khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Bolella rakhemisi ka leqeba, histori ea ho tsoa mali, asthma, kapa meriana e meng ea bohloko/e fokotsang mali.",
      "Aspirin ka kakaretso ha e etsetsoe bana kapa bacha ba nang le lefu la vaerase ntle le haeba ngaka e e laela — netefatsa khahlanong le sehlahisoa se nang le ileibole.",
      "Botsa hore na ke ho tsoa mali life ho sa tloaelehang kapa litšila tse ntšo tse lokelang ho qala tlhahlobo e potlakileng ho e-na le ho tsoela pele u le mong.",
      "Haeba ho tsoa mali ho sa tloaelehang, litšila tse ntšo, lekhopho le matla, ho ruruha, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-aspirin isetyenziselwa iintlungu kwaye, kwizicwangciso zokhathalelo ezikhethiweyo, ukukhusela intliziyo — ezo ndlela zokusetyenziswa ziyahluka; landela imveliso enelebula kunye nesicwangciso sokhathalelo owasiwe.",
      "I-Materia ayiyiqiqi idosi okanye umthetho wokudibanisa — Qinisekisa nemveliso enelebula nengcebiso yosokhemisti.",
      "Xelela usokhemisti ngesilonda, imbali yokopha, i-asthma, okanye amanye amayeza eentlungu/okunciphisa igazi.",
      "I-aspirin ngokuqhelekileyo ayenzelwanga abantwana okanye abakwishumi elivisayo abanesifo se-viral ngaphandle kokuba ugqirha eyikhokela — Qinisekisa nemveliso enelebula.",
      "Buza ukuba kukuphi ukopha okungaqhelekanga okanye okumnyama kwamathumbu okufuneka kuqalise ukujongwa okungxamisekileyo kunokuqhubeka wedwa.",
      "Ukuba ukopha okungaqhelekanga, okumnyama kwamathumbu, irhashalala enzima, ukudumba, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-enalapril": five(
    [
      "Enalapril is an ACE inhibitor used for blood pressure and selected heart/kidney pathways — take it exactly as the labelled product directs.",
      "Materia does not invent a dose or blood-pressure target — confirm against current SA guidance and the labelled product.",
      "ACE-inhibitor counselling commonly includes telling your pharmacist if you are pregnant, planning pregnancy, or breastfeeding — confirm against the labelled product.",
      "Report a new persistent dry cough, dizziness on standing, or kidney concerns to your pharmacist or clinician.",
      "Ask what potassium checks or dehydration illness days mean in your care plan.",
      "If swelling of the face, lips, tongue, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-enalapril i-ACE inhibitor esetshenziselwa umfutho wegazi nezindlela ezikhethiwe zenhliziyo/ezinso — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo noma umgomo womfutho wegazi — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-ACE-inhibitor kuvame ukufaka ukutshela umkhiqizi uma ukhulelwe, uhlela ukukhulelwa, noma uncelisa — qinisekisa nomkhiqizo onelebula.",
      "Bika ukukhwehlela okomile okuqhubekayo okusha, isiyezi sokuma, noma izinkinga zezinso kumkhiqizi noma kudokotela.",
      "Buza ukuthi ukuhlolwa kwe-potassium noma izinsuku zokugula zokoma kusho ukuthini ohlelweni lwakho lokunakekelwa.",
      "Uma ukuvuvuka kobuso, izindebe, ulimi, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Enalapril is 'n ACE-inhibeerder vir bloeddruk en geselekteerde hart-/nierpaaie — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis of bloeddrukteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "ACE-inhibeerder-berading sluit algemeen in om jou apteker te sê as jy swanger is, beplan om swanger te word, of borsvoed — bevestig teen die geëtiketteerde produk.",
      "Rapporteer 'n nuwe aanhoudende droë hoes, duiseligheid by staan, of nierkommer aan jou apteker of klinikus.",
      "Vra wat kaliumtoetse of dehidrasie-siektedae in jou sorgplan beteken.",
      "As swelling van die gesig, lippe, tong of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Enalapril ke ACE inhibitor e sebelisoang bakeng sa khatello ea mali le litsela tse khethiloeng tsa pelo/liphio — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo kapa sepheo sa khatello ea mali — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea ACE-inhibitor hangata e kenyelletsa ho bolella rakhemisi haeba u imoli, u rera ho ima, kapa u anyesa — netefatsa khahlanong le sehlahisoa se nang le ileibole.",
      "Tlaleha ho khohlela ho omileng ho tsoelang pele ho hocha, ho tsekama ha u ema, kapa mathata a liphio ho rakhemisi kapa ngaka.",
      "Botsa hore na liteko tsa potassium kapa matsatsi a ho kula a ho oma a bolela eng moralong oa hau oa tlhokomelo.",
      "Haeba ho ruruha ha sefahleho, melomo, leleme, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-enalapril yi-ACE inhibitor esetyenziselwa uxinzelelo lwegazi kunye neendlela ezikhethiweyo zentliziyo/ezintso — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi okanye usukelo loxinzelelo lwegazi — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-ACE-inhibitor kuhlala kubandakanya ukuxelela usokhemisti ukuba ukhulelwe, uceba ukukhulelwa, okanye uncelisa — Qinisekisa nemveliso enelebula.",
      "Bika ukukhohlela okomileyo okuqhubekayo okutsha, isiyezi sokuma, okanye iinkxalabo zezintso kusokhemisti okanye kugqirha.",
      "Buza ukuba iimvavanyo ze-potassium okanye iintsuku zokugula zokoma zithetha ntoni kwisicwangciso sakho sokhathalelo.",
      "Ukuba ukudumba kobuso, imilebe, ulwimi, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-levothyroxine": five(
    [
      "Levothyroxine replaces thyroid hormone under clinician-directed care — take it exactly as the labelled product directs.",
      "Materia does not invent a spacing schedule or mcg dose — confirm against current SA guidance and the labelled product.",
      "Common teaching: take consistently on an empty stomach; iron, calcium, and some foods reduce absorption — ask your pharmacist how to separate them.",
      "Keep the same brand/generic where possible and tell your clinician before switching products.",
      "Ask what TSH checks and symptom changes mean in your follow-up plan.",
      "If chest pain, severe palpitations, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-levothyroxine ithatha indawo ye-hormone ye-thyroid ngaphansi kokunakekelwa okulawulwa udokotela — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi uhlelo lokuhlukanisa noma umthamo we-mcg — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukufundisa okujwayelekile: thatha ngokufanayo esiswini esingenalutho; i-iron, i-calcium, nokunye ukudla kunciphisa ukumunca — buza umkhiqizi ukuthi ungahlukanisa kanjani.",
      "Gcina uhlobo olufanayo brand/generic lapho kungenzeka khona futhi tshela udokotela ngaphambi kokushintsha imikhiqizo.",
      "Buza ukuthi ukuhlolwa kwe-TSH nezinguquko zezimpawu kusho ukuthini ohlelweni lwakho lokulandela.",
      "Uma ubuhlungu besifuba, ukushaya kwenhliziyo okukhulu, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Levotyroksien vervang skildklierhormoon onder klinikus-gerigte sorg — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n spasieskedule of mcg-dosis nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Algemene onderrig: neem konsekwent op 'n leë maag; yster, kalsium en sommige kosse verminder absorpsie — vra jou apteker hoe om dit te skei.",
      "Hou dieselfde handelsmerk/generiese waar moontlik en sê vir jou klinikus voordat jy produkte wissel.",
      "Vra wat TSH-toetse en simptoomveranderinge in jou opvolgplan beteken.",
      "As borspyn, ernstige hartklop of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Levothyroxine e nkela sebaka sa hormone ea thyroid tlas'a tlhokomelo e tataisoang ke ngaka — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape kemiso ea ho arola kapa tekanyo ea mcg — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Thuto e tloaelehileng: e nke ka mokhoa o tsitsitseng ka mpeng e se nang letho; tšepe, calcium le lijo tse ling li fokotsa ho monya — botsa rakhemisi hore u ka arola joang.",
      "Boloka mofuta o tšoanang brand/generic moo ho khonehang 'me bolelle ngaka pele u fetoa lihlahisoa.",
      "Botsa hore na liteko tsa TSH le liphetoho tsa matšoao li bolela eng moralong oa hau oa tlhahlobo.",
      "Haeba bohloko ba sefuba, ho otla ha pelo ho matla, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-levothyroxine ithatha indawo ye-hormone ye-thyroid phantsi kokhathalelo olukhokelwa ngugqirha — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi ishedyuli yokwahlula okanye idosi ye-mcg — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukufundisa okuqhelekileyo: thatha ngokungaguquguquki kwisisu esingenanto; i-iron, i-calcium, nokunye ukutya kunciphisa ukufunxa — buza usokhemisti ukuba ungahlula njani.",
      "Gcina uhlobo olufanayo brand/generic apho kunokwenzeka kwaye xelela ugqirha phambi kokutshintsha iimveliso.",
      "Buza ukuba iimvavanyo ze-TSH kunye notshintsho lweempawu zithetha ntoni kwisicwangciso sakho sokulandela.",
      "Ukuba iintlungu zesifuba, ukubetha kwentliziyo okukhulu, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-salbutamol": five(
    [
      "Salbutamol is a SABA reliever inhaler for asthma and selected wheeze pathways — use it exactly as the labelled product and pharmacist technique teaching direct.",
      "Materia does not invent a puff count or dose — confirm against the labelled product and your written asthma action plan.",
      "SABA counselling commonly includes technique checks (shake, breathe out, seal lips, slow inhale) — confirm every step against the labelled product.",
      "Tell your pharmacist if you need the reliever more often than usual — that may need clinical review, not a Materia schedule.",
      "Ask what spacer use, priming, and expiry checks mean for your device.",
      "If breathing is getting worse, the inhaler is not helping, or you cannot speak in full sentences — seek emergency care.",
    ],
    [
      "I-salbutamol i-SABA reliever inhaler ye-asthma nezindlela ezikhethiwe zokubila — yisebenzise njengoba umkhiqizo onelebula nokufundiswa kwendlela yomkhiqizi kuyala.",
      "I-Materia ayiqambi isibalo se-puff noma umthamo — qinisekisa nomkhiqizo onelebula nohlelo lwakho lwe-asthma olubhaliwe.",
      "Ukuelulekwa kwe-SABA kuvame ukufaka ukuhlola indlela (shaya, phefumula, vala izindebe, donsa kancane) — qinisekisa isinyathelo ngasinye nomkhiqizo onelebula.",
      "Tshela umkhiqizi uma udinga i-reliever kaningi kunokujwayelekile — lokho kungadinga ukubuyekezwa komtholampilo, hhayi uhlelo lwe-Materia.",
      "Buza ukuthi ukusetshenziswa kwespaça, ukuqala, nokuhlola ukuphelelwa kusho ukuthini kudivayisi yakho.",
      "Uma ukuphefumula kuya kuba bi, i-inhaler ayisizi, noma ungakwazi ukukhuluma ngemisho ephelele — funa usizo oluphuthumayo.",
    ],
    [
      "Salbutamol is 'n SABA-verligter-inhaaler vir asma en geselekteerde pieppaaie — gebruik dit presies soos die geëtiketteerde produk en apteker-tegniekonderrig aandui.",
      "Materia versin nie 'n puf-telling of dosis nie — bevestig teen die geëtiketteerde produk en jou geskrewe asma-aksieplan.",
      "SABA-berading sluit algemeen tegniekkontroles in (skud, asem uit, verseël lippe, stadig inasem) — bevestig elke stap teen die geëtiketteerde produk.",
      "Sê vir jou apteker as jy die verligter meer dikwels as gewoonlik nodig het — dit mag kliniese hersiening nodig hê, nie 'n Materia-skedule nie.",
      "Vra wat spacer-gebruik, voorafvulling en vervaldatumkontroles vir jou toestel beteken.",
      "As asemhaling erger word, die inhaaler nie help nie, of jy nie in volsinne kan praat nie — soek noodhulp.",
    ],
    [
      "Salbutamol ke SABA reliever inhaler bakeng sa asthma le litsela tse khethiloeng tsa ho fofa — e sebelise hantle joalo ka ha sehlahisoa se nang le ileibole le thuto ea mokhoa oa rakhemisi li laela.",
      "Materia ha e iqape palo ea puff kapa tekanyo — netefatsa khahlanong le sehlahisoa se nang le ileibole le moralo oa hau o ngotsoeng oa asthma.",
      "Tlhabollo ea SABA hangata e kenyelletsa litlhahlobo tsa mokhoa (sisanya, hema, koala melomo, monya butle) — netefatsa mohato o mong le o mong khahlanong le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi haeba u hloka reliever hangata ho feta tloaelo — seo se ka hloka tlhahlobo ea bongaka, eseng kemiso ea Materia.",
      "Botsa hore na tšebeliso ea spacer, ho qala, le litlhahlobo tsa ho felloa ke nako li bolela eng bakeng sa sesebelisoa sa hau.",
      "Haeba ho hema ho ntse ho mpefala, inhaler ha e thusi, kapa u sitoa ho bua ka lipolelo tse feletseng — batla thuso ea tšohanyetso.",
    ],
    [
      "I-salbutamol yi-SABA reliever inhaler ye-asthma kunye neendlela ezikhethiweyo zokubila — yisebenzise kanye njengoko imveliso enelebula kunye nokufundiswa kwendlela yosokhemisti zikhokela.",
      "I-Materia ayiyiqiqi inani le-puff okanye idosi — Qinisekisa nemveliso enelebula kunye nesicwangciso sakho se-asthma esibhaliweyo.",
      "Ukucebisa nge-SABA kuhlala kubandakanya ukujonga indlela (shukumisa, phefumla, vala imilebe, tsala kancinci) — Qinisekisa inyathelo ngalinye nemveliso enelebula.",
      "Xelela usokhemisti ukuba ufuna i-reliever rhoqo kunesiqhelo — oko kungafuna ukujongwa kwekliniki, hayi ishedyuli ye-Materia.",
      "Buza ukuba ukusetyenziswa kwespaça, ukuqala, kunye nokujonga ukuphela kuthetha ntoni kwisixhobo sakho.",
      "Ukuba ukuphefumla kuya kuba bi, i-inhaler ayincedisi, okanye awukwazi ukuthetha ngezivakalisi ezipheleleyo — funa uncedo olungxamisekileyo.",
    ],
  ),
};
