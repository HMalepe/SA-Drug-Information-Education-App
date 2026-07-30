/**
 * v428–v439 deepened SA counselling batch (6 lines × 5 langs) — deepen thin high-volume core scripts.
 * Original Materia educational scripts only — no invented mg doses, INR/lipid/BP/glucose targets,
 * taper schedules, or interaction lists. Overrides thinner base/v90 entries via spread order.
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

export const COUNSELLING_V428_TO_V439: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-warfarin": five(
    [
      "Warfarin is a vitamin K antagonist anticoagulant used under clinician-directed INR monitoring — take it exactly as the labelled product and care plan direct.",
      "Materia does not invent an INR target, dose, or bridging rule — confirm against your anticoagulation clinic plan and the labelled product.",
      "Keep vitamin K–rich foods reasonably consistent week to week; sudden diet swings can affect anticoagulation teaching discussions.",
      "Tell your pharmacist before starting new medicines, herbals, or painkillers — many products interact with warfarin.",
      "Ask what missed-dose rules and next INR booking mean in your written plan rather than guessing.",
      "If unusual bleeding, black stools, severe headache, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-warfarin i-anticoagulant ye-vitamin K antagonist esetshenziswa ngaphansi kokuqapha i-INR okulawulwa udokotela — thatha njengoba umkhiqizo onelebula nohlelo lokunakekelwa kuyala.",
      "I-Materia ayiqambi umgomo we-INR, umthamo, noma umthetho wokubridging — qinisekisa nohlelo lwekliniki ye-anticoagulation yakho nomkhiqizo onelebula.",
      "Gcina ukudla okunamandla e-vitamin K kufana ngesonto ngesonto; izinguquko ezizumayo zokudla zingathinta izingxoxo zokufundisa nge-anticoagulation.",
      "Tshela umkhiqizi ngaphambi kokuqala amaphilisi amasha, ama-herbal, noma amaphilisi obuhlungu — imikhiqizo eminingi iyasebenzisana ne-warfarin.",
      "Buza ukuthi imithetho yomthamo ophuthelwe nokubhukha i-INR elandelayo kusho ukuthini ohlelweni lwakho olubhaliwe kunokuqagela.",
      "Uma ukopha okungajwayelekile, okubomvu kwamathumbu, ubuhlungu bekhanda obukhulu, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Warfarin is 'n vitamien K-antagonis-antikoagulant onder klinikus-gerigte INR-monitering — neem dit presies soos die geëtiketteerde produk en sorgplan aandui.",
      "Materia versin nie 'n INR-teiken, dosis of oorbruggingsreël nie — bevestig teen jou antikoagulasiekliniekplan en die geëtiketteerde produk.",
      "Hou vitamien K-ryke kosse redelik konsekwent week tot week; skielike dieetskommelings kan antikoagulasie-onderrigbesprekings beïnvloed.",
      "Sê vir jou apteker voordat jy nuwe medisyne, kruie of pynstillers begin — baie produkte wissel met warfarin.",
      "Vra wat gemiste-dosisreëls en volgende INR-bespreking in jou geskrewe plan beteken eerder as om te raai.",
      "As ongewone bloeding, swart stoelgang, ernstige hoofpyn of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Warfarin ke anticoagulant ea vitamin K antagonist e sebelisoang tlas'a tlhahlobo ea INR e tataisoang ke ngaka — e nke hantle joalo ka ha sehlahisoa se nang le ileibole le moralo oa tlhokomelo li laela.",
      "Materia ha e iqape sepheo sa INR, tekanyo, kapa molao oa bridging — netefatsa khahlanong le moralo oa hau oa kliniki ea anticoagulation le sehlahisoa se nang le ileibole.",
      "Boloka lijo tse nang le vitamin K e ngata li tsitsitse beke le beke; liphetoho tsa tšohanyetso tsa lijo li ka ama lipuisano tsa thuto ea anticoagulation.",
      "Bolella rakhemisi pele u qala meriana e mecha, litlama, kapa meriana ea bohloko — lihlahisoa tse ngata lia sebelisana le warfarin.",
      "Botsa hore na melao ea tekanyo e fosumetsoeng le ho booka INR e latelang e bolela eng moralong oa hau o ngotsoeng ho e-na le ho hakanya.",
      "Haeba ho tsoa mali ho sa tloaelehang, litšila tse ntšo, hlooho e bohloko haholo, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-warfarin yi-anticoagulant ye-vitamin K antagonist esetyenziswa phantsi kokujongwa kwe-INR okukhokelwa ngugqirha — yithathe kanye njengoko imveliso enelebula kunye nesicwangciso sokhathalelo zikhokela.",
      "I-Materia ayiyiqiqi usukelo lwe-INR, idosi, okanye umthetho we-bridging — Qinisekisa nesicwangciso sakho seklinikhi ye-anticoagulation kunye nemveliso enelebula.",
      "Gcina ukutya okunamandla e-vitamin K kufana ngeveki ngeveki; utshintsho oluzumayo lokutya lunokuchaphazela iingxoxo zokufundisa nge-anticoagulation.",
      "Xelela usokhemisti phambi kokuqala amayeza amatsha, ama-herbal, okanye amayeza eentlungu — iimveliso ezininzi ziyasebenzisana ne-warfarin.",
      "Buza ukuba imithetho yedosi ephosakeleyo nokubhukisha i-INR elandelayo kuthetha ntoni kwisicwangciso sakho esibhaliweyo kunokuqagela.",
      "Ukuba ukopha okungaqhelekanga, okumnyama kwamathumbu, iintloko ezibuhlungu kakhulu, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-losartan": five(
    [
      "Losartan is an ARB used for blood pressure and selected heart/kidney pathways — take it exactly as the labelled product directs.",
      "Materia does not invent a dose or blood-pressure target — confirm against current SA guidance and the labelled product.",
      "ARB counselling commonly includes telling your pharmacist if you are pregnant, planning pregnancy, or breastfeeding — confirm against the labelled product.",
      "Report dizziness on standing or kidney concerns to your pharmacist or clinician.",
      "Ask what potassium checks or dehydration illness days mean in your care plan.",
      "If swelling of the face, lips, tongue, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-losartan i-ARB esetshenziselwa umfutho wegazi nezindlela ezikhethiwe zenhliziyo/ezinso — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo noma umgomo womfutho wegazi — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-ARB kuvame ukufaka ukutshela umkhiqizi uma ukhulelwe, uhlela ukukhulelwa, noma uncelisa — qinisekisa nomkhiqizo onelebula.",
      "Bika isiyezi sokuma noma izinkinga zezinso kumkhiqizi noma kudokotela.",
      "Buza ukuthi ukuhlolwa kwe-potassium noma izinsuku zokugula zokoma kusho ukuthini ohlelweni lwakho lokunakekelwa.",
      "Uma ukuvuvuka kobuso, izindebe, ulimi, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Losartan is 'n ARB vir bloeddruk en geselekteerde hart-/nierpaaie — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis of bloeddrukteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "ARB-berading sluit algemeen in om jou apteker te sê as jy swanger is, beplan om swanger te word, of borsvoed — bevestig teen die geëtiketteerde produk.",
      "Rapporteer duiseligheid by staan of nierkommer aan jou apteker of klinikus.",
      "Vra wat kaliumtoetse of dehidrasie-siektedae in jou sorgplan beteken.",
      "As swelling van die gesig, lippe, tong of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Losartan ke ARB e sebelisoang bakeng sa khatello ea mali le litsela tse khethiloeng tsa pelo/liphio — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo kapa sepheo sa khatello ea mali — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea ARB hangata e kenyelletsa ho bolella rakhemisi haeba u imoli, u rera ho ima, kapa u anyesa — netefatsa khahlanong le sehlahisoa se nang le ileibole.",
      "Tlaleha ho tsekama ha u ema kapa mathata a liphio ho rakhemisi kapa ngaka.",
      "Botsa hore na liteko tsa potassium kapa matsatsi a ho kula a ho oma a bolela eng moralong oa hau oa tlhokomelo.",
      "Haeba ho ruruha ha sefahleho, melomo, leleme, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-losartan yi-ARB esetyenziselwa uxinzelelo lwegazi kunye neendlela ezikhethiweyo zentliziyo/ezintso — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi okanye usukelo loxinzelelo lwegazi — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-ARB kuhlala kubandakanya ukuxelela usokhemisti ukuba ukhulelwe, uceba ukukhulelwa, okanye uncelisa — Qinisekisa nemveliso enelebula.",
      "Bika isiyezi sokuma okanye iinkxalabo zezintso kusokhemisti okanye kugqirha.",
      "Buza ukuba iimvavanyo ze-potassium okanye iintsuku zokugula zokoma zithetha ntoni kwisicwangciso sakho sokhathalelo.",
      "Ukuba ukudumba kobuso, imilebe, ulwimi, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-simvastatin": five(
    [
      "Simvastatin is a statin used to lower cholesterol risk under clinician-directed care — take it exactly as the labelled product directs.",
      "Materia does not invent a dose, lipid target, or interaction list — confirm against current SA guidance and the labelled product.",
      "Statin counselling commonly includes reporting unexplained muscle pain, tenderness, or weakness to your pharmacist or clinician.",
      "Tell your pharmacist before starting new medicines — simvastatin has notable interaction potential; confirm against the labelled product.",
      "Ask what dark urine, yellow eyes, or persistent muscle symptoms should trigger urgent review.",
      "If severe muscle pain with dark urine, yellowing of the skin/eyes, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-simvastatin i-statin esetshenziselwa ukwehlisa ingozi ye-cholesterol ngaphansi kokunakekelwa okulawulwa udokotela — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo, umgomo we-lipid, noma uhlu lokusebenzisana — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-statin kuvame ukufaka ukubika ubuhlungu bemisipha obungachazeki, ubuhlungu bokuthinta, noma ubuthakathaka kumkhiqizi noma kudokotela.",
      "Tshela umkhiqizi ngaphambi kokuqala amaphilisi amasha — i-simvastatin inamandla okusebenzisana abonakalayo; qinisekisa nomkhiqizo onelebula.",
      "Buza ukuthi yimuphi umchamo omnyama, amehlo aphuzi, noma izimpawu zemisipha eziqhubekayo okufanele kuqale ukubuyekezwa okuphuthumayo.",
      "Uma ubuhlungu bemisipha obukhulu nomchamo omnyama, ukuphuzi kwesikhumba/amehlo, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Simvastatien is 'n statien om cholesterolrisiko onder klinikus-gerigte sorg te verlaag — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis, lipiedteiken of wisselwerkinglys nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Statien-berading sluit algemeen in om onverklaarde spierpyn, teerheid of swakheid aan jou apteker of klinikus te rapporteer.",
      "Sê vir jou apteker voordat jy nuwe medisyne begin — simvastatien het noemenswaardige wisselwerkingspotensiaal; bevestig teen die geëtiketteerde produk.",
      "Vra watter donker urine, geel oë of aanhoudende spiersimptome dringende hersiening moet sneller.",
      "As ernstige spierpyn met donker urine, vergeling van die vel/oë of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Simvastatin ke statin e sebelisoang ho fokotsa kotsi ea cholesterol tlas'a tlhokomelo e tataisoang ke ngaka — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo, sepheo sa lipid, kapa lethathamo la tšebelisano — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea statin hangata e kenyelletsa ho tlaleha bohloko ba mesifa bo sa hlaloseng, bohloko ba ho ama, kapa bofokoli ho rakhemisi kapa ngaka.",
      "Bolella rakhemisi pele u qala meriana e mecha — simvastatin e na le bokhoni ba tšebelisano bo hlokomelehang; netefatsa khahlanong le sehlahisoa se nang le ileibole.",
      "Botsa hore na ke moroto ofe o lefifi, mahlo a mosehla, kapa matšoao a mesifa a tsoelang pele a lokelang ho qala tlhahlobo e potlakileng.",
      "Haeba bohloko ba mesifa bo matla le moroto o lefifi, ho mosehla ha letlalo/mahlo, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-simvastatin yi-statin esetyenziselwa ukwehlisa umngcipheko we-cholesterol phantsi kokhathalelo olukhokelwa ngugqirha — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi, usukelo lwe-lipid, okanye uluhlu lokusebenzisana — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-statin kuhlala kubandakanya ukubika iintlungu zemisipha ezingachazekiyo, ubuhlungu bokuchukumisa, okanye ubuthathaka kusokhemisti okanye kugqirha.",
      "Xelela usokhemisti phambi kokuqala amayeza amatsha — i-simvastatin inamandla okusebenzisana abonakalayo; Qinisekisa nemveliso enelebula.",
      "Buza ukuba ngowuphi umchamo omnyama, amehlo atyheli, okanye iimpawu zemisipha eziqhubekayo ezifuneka ziqalise ukujongwa okungxamisekileyo.",
      "Ukuba iintlungu zemisipha ezinkulu nomchamo omnyama, ukutyheli kwesikhumba/amehlo, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-hctz": five(
    [
      "Hydrochlorothiazide is a thiazide diuretic used for blood pressure and selected fluid pathways — take it exactly as the labelled product directs.",
      "Materia does not invent a dose, clock time, or potassium target — confirm against current SA guidance and the labelled product.",
      "Thiazide counselling commonly includes more frequent urination and sun sensitivity — confirm timing and sun advice against the labelled product.",
      "Tell your pharmacist about dizziness, muscle cramps, or if you become very dehydrated or unwell.",
      "Ask what electrolyte checks and illness-day fluid advice mean in your care plan.",
      "If you faint, get severe dizziness, chest pain, or trouble breathing — seek emergency care.",
    ],
    [
      "I-hydrochlorothiazide i-thiazide diuretic esetshenziselwa umfutho wegazi nezindlela ezikhethiwe zamanzi — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo, isikhathi sewashi, noma umgomo we-potassium — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-thiazide kuvame ukufaka ukuchama kaningi nokuzwela ilanga — qinisekisa isikhathi neseluleko selanga nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngesiyezi, izigwegwe zemisipha, noma uma woma kakhulu noma ugula kakhulu.",
      "Buza ukuthi ukuhlolwa kwe-electrolyte neseluleko samanzi ngezinsuku zokugula kusho ukuthini ohlelweni lwakho lokunakekelwa.",
      "Uma uwela, uthola isiyezi esikhulu, ubuhlungu besifuba, noma ubunzima bokuphefumula — funa usizo oluphuthumayo.",
    ],
    [
      "Hidrochlorotiasied is 'n tiasied-diuretikum vir bloeddruk en geselekteerde vloeistofpaaie — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis, horlosietyd of kaliumteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Tiasied-berading sluit algemeen meer gereelde urinering en songevoeligheid in — bevestig tydsberekening en sonadvies teen die geëtiketteerde produk.",
      "Sê vir jou apteker van duiseligheid, spierkrampe, of as jy baie gedehidreer of onwel word.",
      "Vra wat elektroliettoetse en siektedag-vloeistofadvies in jou sorgplan beteken.",
      "As jy flou word, ernstige duiseligheid, borspyn of asemnood kry — soek noodhulp.",
    ],
    [
      "Hydrochlorothiazide ke thiazide diuretic e sebelisoang bakeng sa khatello ea mali le litsela tse khethiloeng tsa metsi — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo, nako ea oache, kapa sepheo sa potassium — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea thiazide hangata e kenyelletsa ho ntša metsi hangata le ho utloa letsatsi — netefatsa nako le keletso ea letsatsi khahlanong le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka ho tsekama, ho tsitsipana ha mesifa, kapa haeba u oma haholo kapa u kula haholo.",
      "Botsa hore na liteko tsa electrolyte le keletso ea metsi matsatsing a ho kula li bolela eng moralong oa hau oa tlhokomelo.",
      "Haeba u akheha, u fumana ho tsekama ho matla, bohloko ba sefuba, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "I-hydrochlorothiazide yi-thiazide diuretic esetyenziselwa uxinzelelo lwegazi kunye neendlela ezikhethiweyo zamanzi — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi, ixesha lewotshi, okanye usukelo lwe-potassium — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-thiazide kuhlala kubandakanya ukuchama rhoqo kunye nokuziva ilanga — Qinisekisa ixesha nengcebiso yelanga nemveliso enelebula.",
      "Xelela usokhemisti ngesiyezi, ukuqina kwemisipha, okanye ukuba woma kakhulu okanye ugula kakhulu.",
      "Buza ukuba iimvavanyo ze-electrolyte nengcebiso yamanzi ngeentsuku zokugula zithetha ntoni kwisicwangciso sakho sokhathalelo.",
      "Ukuba uyawa, ufumana isiyezi esikhulu, iintlungu zesifuba, okanye ubunzima bokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-azithro": five(
    [
      "Azithromycin is a macrolide antibiotic used for selected bacterial infections — finish the course unless your clinician says stop.",
      "Materia does not invent a dose, interval, course length, or interaction list — confirm against current SA STG/EML and the labelled product.",
      "Tell your pharmacist about other medicines you take — macrolides can interact with some products.",
      "Ask what diarrhoea, new rash, or incomplete improvement should trigger review rather than extending the course alone.",
      "This informs professional judgement — unused antibiotics are not for sharing or future self-treatment.",
      "If severe rash, swelling, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-azithromycin i-antibiotic ye-macrolide esetshenziselwa izifo ezikhethiwe zamagciwane — qeda inkambu ngaphandle uma udokotela ethi uyeke.",
      "I-Materia ayiqambi umthamo, isikhathi phakathi, ubude benkambu, noma uhlu lokusebenzisana — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela umkhiqizi ngamanye amaphilisi owathathayo — ama-macrolide angasebenzisana neminye imikhiqizo.",
      "Buza ukuthi yikuphi uhudo, ukuqubuka okusha, noma ukungathuthuki okuphelele kufanele kuqale ukubuyekezwa kunokwelula inkambu wedwa.",
      "Lokhu kuchaza isigqi — ama-antibiotic angasetshenzisiwe awenzelwe ukwabelana noma ukuzelapha okuzayo.",
      "Uma ukuqubuka okukhulu, ukuvuvuka, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Asitromisien is 'n makrolied-antibiotikum vir geselekteerde bakteriële infeksies — voltooi die kuur tensy jou klinikus sê stop.",
      "Materia versin nie 'n dosis, interval, kuurduur of wisselwerkinglys nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir jou apteker van ander medisyne wat jy neem — makroliede kan met sommige produkte wissel.",
      "Vra watter diarree, nuwe uitslag of onvolledige verbetering hersiening moet sneller eerder as om die kuur alleen te verleng.",
      "Dit informeer professionele oordeel — ongebruikte antibiotika is nie vir deel of toekomstige selfbehandeling nie.",
      "As ernstige uitslag, swelling of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Azithromycin ke antibiotic ea macrolide e sebelisoang bakeng sa tšoaetso tse khethiloeng tsa baktheria — qeta thuto ntle le haeba ngaka e re emisa.",
      "Materia ha e iqape tekanyo, nako pakeng tsa, bolelele ba thuto, kapa lethathamo la tšebelisano — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella rakhemisi ka meriana e meng eo u e nkang — li-macrolide li ka sebelisana le lihlahisoa tse ling.",
      "Botsa hore na ke letšollo life, lekhopho le lecha, kapa ntlafatso e sa feleng e lokelang ho qala tlhahlobo ho e-na le ho atolosa thuto u le mong.",
      "Sena se tsebisa tsebo ea bongaka — li-antibiotic tse sa sebelisoang ha li etsetsoa ho arolelana kapa kalafo ea ka boithatelo ea kamoso.",
      "Haeba lekhopho le matla, ho ruruha, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-azithromycin yi-antibiotic ye-macrolide esetyenziselwa izifo ezikhethiweyo zebhaktheria — gqiba ikhosi ngaphandle kokuba ugqirha athi yeka.",
      "I-Materia ayiyiqiqi idosi, ixesha phakathi, ubude bekhosi, okanye uluhlu lokusebenzisana — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela usokhemisti ngamanye amayeza owawathathayo — ii-macrolide zinokusebenzisana nezinye iimveliso.",
      "Buza ukuba kukuphi urhudo, irhashalala entsha, okanye ukungaphucuki okupheleleyo okufuneka kuqalise ukujongwa kunokwandisa ikhosi wedwa.",
      "Oku kuchaza ingqiqo yobungcali — ii-antibiotic ezingasetyenziswanga azenzelwanga ukwabelana okanye ukunyanga ngokwakho kwixesha elizayo.",
      "Ukuba irhashalala enzima, ukudumba, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-cipro": five(
    [
      "Ciprofloxacin is a fluoroquinolone antibiotic used for selected bacterial infections — finish the course unless your clinician says stop.",
      "Materia does not invent a dose, spacing schedule, or course length — confirm against current SA STG/EML and the labelled product.",
      "Dairy, antacids, and mineral supplements may affect absorption — ask your pharmacist how to separate them.",
      "Fluoroquinolone counselling commonly includes sun protection and reporting unusual tendon pain — confirm against the labelled product.",
      "Ask what diarrhoea, tendon pain, or incomplete improvement should trigger review rather than extending the course alone.",
      "If severe rash, swelling, tendon rupture concern, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-ciprofloxacin i-antibiotic ye-fluoroquinolone esetshenziselwa izifo ezikhethiwe zamagciwane — qeda inkambu ngaphandle uma udokotela ethi uyeke.",
      "I-Materia ayiqambi umthamo, uhlelo lokuhlukanisa, noma ubude benkambu — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Ubisi, ama-antacid, nezithasiselo zamaminerali kungathinta ukumunca — buza umkhiqizi ukuthi ungahlukanisa kanjani.",
      "Ukuelulekwa kwe-fluoroquinolone kuvame ukufaka ukuvikela ilanga nokubika ubuhlungu bethendon obungajwayelekile — qinisekisa nomkhiqizo onelebula.",
      "Buza ukuthi yikuphi uhudo, ubuhlungu bethendon, noma ukungathuthuki okuphelele kufanele kuqale ukubuyekezwa kunokwelula inkambu wedwa.",
      "Uma ukuqubuka okukhulu, ukuvuvuka, ukukhathazeka kokudabuka kwethendon, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Siprofloksasien is 'n fluorokinoloon-antibiotikum vir geselekteerde bakteriële infeksies — voltooi die kuur tensy jou klinikus sê stop.",
      "Materia versin nie 'n dosis, spasieskedule of kuurduur nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Suiwel, antasuurs en mineraalaanvullings kan absorpsie beïnvloed — vra jou apteker hoe om dit te skei.",
      "Fluorokinoloon-berading sluit algemeen sonbeskerming en rapportering van ongewone peespyn in — bevestig teen die geëtiketteerde produk.",
      "Vra watter diarree, peespyn of onvolledige verbetering hersiening moet sneller eerder as om die kuur alleen te verleng.",
      "As ernstige uitslag, swelling, peesbreukkommer of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Ciprofloxacin ke antibiotic ea fluoroquinolone e sebelisoang bakeng sa tšoaetso tse khethiloeng tsa baktheria — qeta thuto ntle le haeba ngaka e re emisa.",
      "Materia ha e iqape tekanyo, kemiso ea ho arola, kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Lebese, li-antacid le litlatsetso tsa mineral li ka ama ho monya — botsa rakhemisi hore u ka arola joang.",
      "Tlhabollo ea fluoroquinolone hangata e kenyelletsa tšireletso ea letsatsi le ho tlaleha bohloko ba tendon bo sa tloaelehang — netefatsa khahlanong le sehlahisoa se nang le ileibole.",
      "Botsa hore na ke letšollo life, bohloko ba tendon, kapa ntlafatso e sa feleng e lokelang ho qala tlhahlobo ho e-na le ho atolosa thuto u le mong.",
      "Haeba lekhopho le matla, ho ruruha, ho tšoenyeha ka ho robeha ha tendon, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-ciprofloxacin yi-antibiotic ye-fluoroquinolone esetyenziselwa izifo ezikhethiweyo zebhaktheria — gqiba ikhosi ngaphandle kokuba ugqirha athi yeka.",
      "I-Materia ayiyiqiqi idosi, ishedyuli yokwahlula, okanye ubude bekhosi — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Ubisi, ii-antacid, kunye nezongezo zamaminerali zinokuchaphazela ukufunxa — buza usokhemisti ukuba ungahlula njani.",
      "Ukucebisa nge-fluoroquinolone kuhlala kubandakanya ukukhusela ilanga nokubika iintlungu zethendon ezingaqhelekanga — Qinisekisa nemveliso enelebula.",
      "Buza ukuba kukuphi urhudo, iintlungu zethendon, okanye ukungaphucuki okupheleleyo okufuneka kuqalise ukujongwa kunokwandisa ikhosi wedwa.",
      "Ukuba irhashalala enzima, ukudumba, inkxalabo yokuqhekeka kwethendon, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-doxy": five(
    [
      "Doxycycline is a tetracycline antibiotic used for selected bacterial infections — finish the course unless your clinician says stop.",
      "Materia does not invent a dose, spacing schedule, or course length — confirm against current SA STG/EML and the labelled product.",
      "Dairy, antacids, and mineral supplements can reduce absorption — ask your pharmacist how to separate them from this medicine.",
      "This class may increase sun sensitivity — use sun protection and check the label.",
      "Ask what oesophageal irritation, new rash, or incomplete improvement should trigger review.",
      "If severe rash, swelling, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-doxycycline i-antibiotic ye-tetracycline esetshenziselwa izifo ezikhethiwe zamagciwane — qeda inkambu ngaphandle uma udokotela ethi uyeke.",
      "I-Materia ayiqambi umthamo, uhlelo lokuhlukanisa, noma ubude benkambu — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Ubisi, ama-antacid, nezithasiselo zamaminerali kunganciphisa ukumunca — buza umkhiqizi ukuthi ungahlukanisa kanjani lo muthi.",
      "Leli class lingakhulisa ukuzwela ilanga — sebenzisa ukuvikela ilanga futhi hlola ilebula.",
      "Buza ukuthi yikuphi ukucasuka komphimbo, ukuqubuka okusha, noma ukungathuthuki okuphelele kufanele kuqale ukubuyekezwa.",
      "Uma ukuqubuka okukhulu, ukuvuvuka, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Doksisiilien is 'n tetrasikliene-antibiotikum vir geselekteerde bakteriële infeksies — voltooi die kuur tensy jou klinikus sê stop.",
      "Materia versin nie 'n dosis, spasieskedule of kuurduur nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Suiwel, antasuurs en mineraalaanvullings kan absorpsie verminder — vra jou apteker hoe om dit van hierdie medisyne te skei.",
      "Hierdie klas mag songevoeligheid verhoog — gebruik sonbeskerming en kontroleer die etiket.",
      "Vra watter slukdermirritasie, nuwe uitslag of onvolledige verbetering hersiening moet sneller.",
      "As ernstige uitslag, swelling of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Doxycycline ke antibiotic ea tetracycline e sebelisoang bakeng sa tšoaetso tse khethiloeng tsa baktheria — qeta thuto ntle le haeba ngaka e re emisa.",
      "Materia ha e iqape tekanyo, kemiso ea ho arola, kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Lebese, li-antacid le litlatsetso tsa mineral li ka fokotsa ho monya — botsa rakhemisi hore u ka arola joang meriana ena.",
      "Sehlopha sena se ka eketsa ho utloa letsatsi — sebelisa tšireletso ea letsatsi 'me hlahloba ileibole.",
      "Botsa hore na ke ho hlaba life ha 'metso, lekhopho le lecha, kapa ntlafatso e sa feleng e lokelang ho qala tlhahlobo.",
      "Haeba lekhopho le matla, ho ruruha, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-doxycycline yi-antibiotic ye-tetracycline esetyenziselwa izifo ezikhethiweyo zebhaktheria — gqiba ikhosi ngaphandle kokuba ugqirha athi yeka.",
      "I-Materia ayiyiqiqi idosi, ishedyuli yokwahlula, okanye ubude bekhosi — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Ubisi, ii-antacid, kunye nezongezo zamaminerali zinokunciphisa ukufunxa — buza usokhemisti ukuba ungahlula njani eli yeza.",
      "Eli class linokunyusa ukuziva ilanga — sebenzisa ukukhusela ilanga kwaye jonga ilebula.",
      "Buza ukuba kukuphi ukucaphuka komqala, irhashalala entsha, okanye ukungaphucuki okupheleleyo okufuneka kuqalise ukujongwa.",
      "Ukuba irhashalala enzima, ukudumba, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-metro": five(
    [
      "Metronidazole is an antimicrobial used for selected anaerobic and protozoal pathways — finish the course unless your clinician says stop.",
      "Materia does not invent a duration, dose, or course length — confirm against current SA STG/EML and the labelled product.",
      "Alcohol is commonly counselled against during and shortly after this course — confirm the labelled product and ask your pharmacist.",
      "Metallic taste or mild stomach upset can occur — check the label and speak to your pharmacist if it worries you.",
      "Ask what nausea, rash, or incomplete improvement should trigger review rather than extending alone.",
      "If severe rash, swelling, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-metronidazole i-antimicrobial esetshenziswa ezindleleni ezikhethiwe ze-anaerobic neze-protozoal — qeda inkambu ngaphandle uma udokotela ethi uyeke.",
      "I-Materia ayiqambi isikhathi, umthamo, noma ubude benkambu — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Utshwala kuvame ukungacelwa phakathi nangesikhathi esifushane ngemva kwale nkambu — qinisekisa umkhiqizo onelebula futhi buza umkhiqizi.",
      "Ukunambitha kwensimbi noma ukuphazamiseka kwesisu okuncane kungenzeka — hlola ilebula futhi khuluma nomkhiqizi uma kukuhlupha.",
      "Buza ukuthi yikuphi ukungananzi, ukuqubuka, noma ukungathuthuki okuphelele kufanele kuqale ukubuyekezwa kunokwelula wedwa.",
      "Uma ukuqubuka okukhulu, ukuvuvuka, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Metronidasool is 'n antimikrobiese middel vir geselekteerde anaërobiese en protozoale paaie — voltooi die kuur tensy jou klinikus sê stop.",
      "Materia versin nie 'n duur, dosis of kuurduur nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Alkohol word algemeen afgeraai tydens en kort na hierdie kuur — bevestig die geëtiketteerde produk en vra jou apteker.",
      "Metaalsmaak of ligte maagongemak kan voorkom — kontroleer die etiket en praat met jou apteker as dit jou pla.",
      "Vra watter naarheid, uitslag of onvolledige verbetering hersiening moet sneller eerder as alleen te verleng.",
      "As ernstige uitslag, swelling of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Metronidazole ke antimicrobial e sebelisoang litseleng tse khethiloeng tsa anaerobic le protozoal — qeta thuto ntle le haeba ngaka e re emisa.",
      "Materia ha e iqape nako, tekanyo, kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Joala hangata ha le khothaletsoe nakong le nako e khutšoanyane ka mor'a thuto ena — netefatsa sehlahisoa se nang le ileibole 'me botsa rakhemisi.",
      "Tatso ea tšepe kapa ho tšoenyeha ha mpa ho fokolang ho ka etsahala — hlahloba ileibole 'me bua le rakhemisi haeba se u tšoenya.",
      "Botsa hore na ke ho nyaroha life, lekhopho, kapa ntlafatso e sa feleng e lokelang ho qala tlhahlobo ho e-na le ho atolosa u le mong.",
      "Haeba lekhopho le matla, ho ruruha, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-metronidazole yi-antimicrobial esetyenziswa kwiindlela ezikhethiweyo ze-anaerobic neze-protozoal — gqiba ikhosi ngaphandle kokuba ugqirha athi yeka.",
      "I-Materia ayiyiqiqi ixesha, idosi, okanye ubude bekhosi — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Utywala kuhlala kucejiswa ngalo ngexesha nangexesha elifutshane emva kwale khosi — Qinisekisa imveliso enelebula kwaye buza usokhemisti.",
      "Ukunambitha kwentsimbi okanye ukuphazamiseka kwesisu okuncinci kunokwenzeka — jonga ilebula kwaye thetha nosokhemisti ukuba kuyakukhathaza.",
      "Buza ukuba kukuphi ukungananzi, irhashalala, okanye ukungaphucuki okupheleleyo okufuneka kuqalise ukujongwa kunokwandisa wedwa.",
      "Ukuba irhashalala enzima, ukudumba, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-prednisone": five(
    [
      "Prednisone is a corticosteroid used for selected inflammatory pathways — take it exactly as the labelled product directs, often with food if stomach upset occurs.",
      "Materia does not invent a dose or taper schedule — confirm against your clinician’s written plan and the labelled product.",
      "Do not stop suddenly without your clinician — steroid counselling commonly includes a taper plan.",
      "Tell your pharmacist about infection signs, unusual mood changes, swelling, or high blood-sugar readings your clinician is tracking.",
      "Ask what illness days, vaccines, and follow-up checks mean while you are on steroids.",
      "If severe abdominal pain, black stools, trouble breathing, or sudden severe illness develops — seek emergency care.",
    ],
    [
      "I-prednisone i-corticosteroid esetshenziswa ezindleleni ezikhethiwe zokuvuvuka — thatha njengoba umkhiqizo onelebula uyala, ngokuvamile nokudla uma isisu siphazamiseka.",
      "I-Materia ayiqambi umthamo noma uhlelo lokwehlisa — qinisekisa nohlelo olubhaliwe lukadokotela wakho nomkhiqizo onelebula.",
      "Ungayeki ngokuzumayo ngaphandle kukadokotela wakho — ukuelulekwa kwe-steroid kuvame ukufaka uhlelo lokwehlisa.",
      "Tshela umkhiqizi ngezimpawu zokutheleleka, izinguquko zemizwa ezingajwayelekile, ukuvuvuka, noma ukufundwa koshukela okuphezulu udokotela akulandelelayo.",
      "Buza ukuthi izinsuku zokugula, imigomo yokugoma, nokuhlolwa kokulandela kusho ukuthini ngenkathi usezintanjeni.",
      "Uma ubuhlungu besisu obukhulu, okubomvu kwamathumbu, ubunzima bokuphefumula, noma ukugula okukhulu okuzumayo kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Prednisoon is 'n kortikosteroïed vir geselekteerde inflammatoriese paaie — neem dit presies soos die geëtiketteerde produk aandui, dikwels met kos as maagongemak voorkom.",
      "Materia versin nie 'n dosis of afbouskedule nie — bevestig teen jou klinikus se geskrewe plan en die geëtiketteerde produk.",
      "Moenie skielik stop sonder jou klinikus nie — steroïedberading sluit algemeen 'n afbouplan in.",
      "Sê vir jou apteker van infeksietekens, ongewone gemoedsveranderinge, swelling, of hoë bloedsuikermetings wat jou klinikus naspoor.",
      "Vra wat siektedae, entstowwe en opvolgkontroles beteken terwyl jy op steroïede is.",
      "As ernstige buikpyn, swart stoelgang, asemnood of skielike ernstige siekte ontwikkel — soek noodhulp.",
    ],
    [
      "Prednisone ke corticosteroid e sebelisoang litseleng tse khethiloeng tsa ho ruruha — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela, hangata le lijo haeba mpa e tšoenya.",
      "Materia ha e iqape tekanyo kapa kemiso ea ho theola — netefatsa khahlanong le moralo o ngotsoeng oa ngaka ea hau le sehlahisoa se nang le ileibole.",
      "U se ke ua emisa ka tšohanyetso ntle le ngaka ea hau — tlhabollo ea steroid hangata e kenyelletsa moralo oa ho theola.",
      "Bolella rakhemisi ka matšoao a tšoaetso, liphetoho tsa maikutlo tse sa tloaelehang, ho ruruha, kapa litekanyo tse phahameng tsa tsoekere tseo ngaka e li latelang.",
      "Botsa hore na matsatsi a ho kula, liente le litlhahlobo tsa tlhahlobo li bolela eng ha u le holim'a li-steroid.",
      "Haeba bohloko ba mpa bo matla, litšila tse ntšo, ho hema thata, kapa ho kula ho matla ka tšohanyetso ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-prednisone yi-corticosteroid esetyenziswa kwiindlela ezikhethiweyo zokudumba — yithathe kanye njengoko imveliso enelebula ikhokela, rhoqo nokutya ukuba isisu siyaphazamiseka.",
      "I-Materia ayiyiqiqi idosi okanye ishedyuli yokwehlisa — Qinisekisa nesicwangciso esibhaliweyo sogqirha wakho kunye nemveliso enelebula.",
      "Ungayeki ngequbuliso ngaphandle kogqirha wakho — ukucebisa nge-steroid kuhlala kubandakanya isicwangciso sokwehlisa.",
      "Xelela usokhemisti ngeempawu zosulelo, utshintsho lwemizwa olungaqhelekanga, ukudumba, okanye ukufundwa kweswekile okuphezulu ugqirha akulandelelayo.",
      "Buza ukuba iintsuku zokugula, iintsholongwane zokugonywa, kunye nokujongwa kokulandela kuthetha ntoni ngelixa usezintanjeni.",
      "Ukuba iintlungu zesisu ezinkulu, okumnyama kwamathumbu, ubunzima bokuphefumla, okanye ukugula okukhulu ngequbuliso kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-diclofenac": five(
    [
      "Diclofenac is an NSAID used for pain and inflammation — take it exactly as the labelled product directs, often with food if stomach upset occurs.",
      "Materia does not invent a dose or pain target — confirm against the labelled product and pharmacist advice.",
      "NSAID counselling commonly includes stomach irritation and fluid retention — report black stools, severe indigestion, swelling, or reduced urine.",
      "Tell your pharmacist about heart, kidney, or ulcer history, and all other painkillers you use.",
      "Ask what ankle swelling or breathing change should trigger urgent review.",
      "If you vomit blood, pass black stools, get chest pain, or sudden shortness of breath — seek emergency care.",
    ],
    [
      "I-diclofenac i-NSAID esetshenziselwa ubuhlungu nokuvuvuka — thatha njengoba umkhiqizo onelebula uyala, ngokuvamile nokudla uma isisu siphazamiseka.",
      "I-Materia ayiqambi umthamo noma umgomo wobuhlungu — qinisekisa nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Ukuelulekwa kwe-NSAID kuvame ukufaka ukucasuka kwesisu nokugcina amanzi — bika okubomvu kwamathumbu, ukungena kakuhle okukhulu, ukuvuvuka, noma umchamo omncane.",
      "Tshela umkhiqizi ngomlando wenhliziyo, wezinso, noma wesilonda, nawo wonke amanye amaphilisi obuhlungu owasebenzisayo.",
      "Buza ukuthi yikuphi ukuvuvuka kwezindlebe zezinyawo noma uguquko lokuphefumula okufanele kuqale ukubuyekezwa okuphuthumayo.",
      "Uma uhlanza igazi, udlulisa okubomvu kwamathumbu, uthola ubuhlungu besifuba, noma ukuphefumula okufushane okuzumayo — funa usizo oluphuthumayo.",
    ],
    [
      "Diklofenak is 'n NSAID vir pyn en inflammasie — neem dit presies soos die geëtiketteerde produk aandui, dikwels met kos as maagongemak voorkom.",
      "Materia versin nie 'n dosis of pynteiken nie — bevestig teen die geëtiketteerde produk en aptekeradvies.",
      "NSAID-berading sluit algemeen maagirritasie en vloeistofretensie in — rapporteer swart stoelgang, ernstige indigestie, swelling of verminderde urine.",
      "Sê vir jou apteker van hart-, nier- of ulkusgeskiedenis, en alle ander pynstillers wat jy gebruik.",
      "Vra watter enkelswelling of asemverandering dringende hersiening moet sneller.",
      "As jy bloed braak, swart stoelgang deurgee, borspyn kry, of skielike kortasem — soek noodhulp.",
    ],
    [
      "Diclofenac ke NSAID e sebelisoang bakeng sa bohloko le ho ruruha — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela, hangata le lijo haeba mpa e tšoenya.",
      "Materia ha e iqape tekanyo kapa sepheo sa bohloko — netefatsa khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Tlhabollo ea NSAID hangata e kenyelletsa ho hlaba ha mpa le ho boloka metsi — tlaleha litšila tse ntšo, ho se je hantle ho matla, ho ruruha, kapa moroto o fokotsehileng.",
      "Bolella rakhemisi ka histori ea pelo, liphio, kapa leqeba, le meriana eohle e meng ea bohloko eo u e sebelisang.",
      "Botsa hore na ke ho ruruha life ha maqaqailana kapa phetoho ea ho hema e lokelang ho qala tlhahlobo e potlakileng.",
      "Haeba u hlatsa mali, u fetisa litšila tse ntšo, u fumana bohloko ba sefuba, kapa ho hema ha khutšoanyane ka tšohanyetso — batla thuso ea tšohanyetso.",
    ],
    [
      "I-diclofenac yi-NSAID esetyenziselwa iintlungu kunye nokudumba — yithathe kanye njengoko imveliso enelebula ikhokela, rhoqo nokutya ukuba isisu siyaphazamiseka.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lweentlungu — Qinisekisa nemveliso enelebula nengcebiso yosokhemisti.",
      "Ukucebisa nge-NSAID kuhlala kubandakanya ukucaphuka kwesisu nokugcina amanzi — bika okumnyama kwamathumbu, ukungena kakuhle okukhulu, ukudumba, okanye umchamo omncinci.",
      "Xelela usokhemisti ngembali yentliziyo, yezintso, okanye yesilonda, kunye nawo onke amanye amayeza eentlungu owawasebenzisayo.",
      "Buza ukuba kukuphi ukudumba kwamaqatha okanye utshintsho lokuphefumla okufuneka kuqalise ukujongwa okungxamisekileyo.",
      "Ukuba ugabha igazi, ugqitha okumnyama kwamathumbu, ufumana iintlungu zesifuba, okanye ukuphefumla okufutshane ngequbuliso — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-gliclazide": five(
    [
      "Gliclazide is a sulfonylurea used for selected type 2 diabetes pathways — take it exactly as the labelled product directs, usually with meals as the label advises.",
      "Materia does not invent a dose or glucose target — confirm against current SA guidance and the labelled product.",
      "Sulfonylurea counselling commonly includes hypoglycaemia recognition (sweating, tremor, confusion) — carry your clinician’s hypo plan.",
      "Tell your pharmacist if you skip meals, drink alcohol, or start new medicines that can affect sugar control.",
      "Ask what illness days and driving/safety advice mean while you are on this medicine.",
      "If you cannot swallow, seize, lose consciousness, or remain confused after hypo treatment — seek emergency care.",
    ],
    [
      "I-gliclazide i-sulfonylurea esetshenziswa ezindleleni ezikhethiwe zesifo sikashukela sohlobo 2 — thatha njengoba umkhiqizo onelebula uyala, ngokuvamile nokudla njengoba ilebula icebisa.",
      "I-Materia ayiqambi umthamo noma umgomo woshukela — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-sulfonylurea kuvame ukufaka ukuqaphela i-hypoglycaemia (ukujuluka, ukuthuthumela, ukudideka) — phatha uhlelo lwe-hypo lukadokotela wakho.",
      "Tshela umkhiqizi uma uyeqa ukudla, uphuza utshwala, noma uqala amaphilisi amasha angathinta ukulawula ushukela.",
      "Buza ukuthi izinsuku zokugula neseluleko sokushayela/sokuphepha kusho ukuthini ngenkathi usebenzisa lo muthi.",
      "Uma ungakwazi ukugwinya, uthola ukuqubuka, ulahlekelwa ukwazi, noma uhlala udidekile ngemva kokwelashwa kwe-hypo — funa usizo oluphuthumayo.",
    ],
    [
      "Gliklasiied is 'n sulfonielureum vir geselekteerde tipe 2-diabetespaaie — neem dit presies soos die geëtiketteerde produk aandui, gewoonlik met maaltye soos die etiket adviseer.",
      "Materia versin nie 'n dosis of glukoseteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Sulfonielureum-berading sluit algemeen hipoglisemie-herkenning in (sweet, bewing, verwarring) — dra jou klinikus se hipo-plan.",
      "Sê vir jou apteker as jy maaltye oorslaan, alkohol drink, of nuwe medisyne begin wat suikerbeheer kan beïnvloed.",
      "Vra wat siektedae en bestuurs-/veiligheidsadvies beteken terwyl jy hierdie medisyne gebruik.",
      "As jy nie kan sluk nie, aanvalle kry, bewusteloos raak, of verward bly na hipo-behandeling — soek noodhulp.",
    ],
    [
      "Gliclazide ke sulfonylurea e sebelisoang litseleng tse khethiloeng tsa lefu la tsoekere la mofuta oa 2 — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela, hangata le lijo joalo ka ha ileibole e eletsa.",
      "Materia ha e iqape tekanyo kapa sepheo sa glucose — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea sulfonylurea hangata e kenyelletsa ho lemoha hypoglycaemia (ho fufuleloa, ho thothomela, ho ferekana) — jara moralo oa hypo oa ngaka ea hau.",
      "Bolella rakhemisi haeba u tlola lijo, u noa joala, kapa u qala meriana e mecha e ka amang taolo ea tsoekere.",
      "Botsa hore na matsatsi a ho kula le keletso ea ho khanna/tšireletso li bolela eng ha u sebelisa meriana ena.",
      "Haeba u sitoa ho koenya, u tšoaroa ke sekhahla, u lahleheloa ke kelello, kapa u lula u ferekane ka mor'a kalafo ea hypo — batla thuso ea tšohanyetso.",
    ],
    [
      "I-gliclazide yi-sulfonylurea esetyenziswa kwiindlela ezikhethiweyo zesifo seswekile sohlobo 2 — yithathe kanye njengoko imveliso enelebula ikhokela, rhoqo nokutya njengoko ilebula icebisa.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lweswekile — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-sulfonylurea kuhlala kubandakanya ukuqaphela i-hypoglycaemia (ukubila, ukungcangcazela, ukudideka) — phatha isicwangciso se-hypo sogqirha wakho.",
      "Xelela usokhemisti ukuba uyeqa ukutya, usela utywala, okanye uqala amayeza amatsha anokuchaphazela ukulawula iswekile.",
      "Buza ukuba iintsuku zokugula nengcebiso yokuqhuba/yokhuseleko zithetha ntoni ngelixa usebenzisa eli yeza.",
      "Ukuba awukwazi ukuginya, uthola ukuqubuka, uphulukana nengqondo, okanye uhlala udidekile emva konyango lwe-hypo — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-allopurinol": five(
    [
      "Allopurinol is a xanthine-oxidase inhibitor used for selected gout and urate pathways — take it exactly as the labelled product directs, often with food and water as the label advises.",
      "Materia does not invent a dose or uric-acid target — confirm against current SA guidance and the labelled product.",
      "Allopurinol counselling commonly includes rash watch: stop and seek urgent review for widespread rash, blistering, or mouth sores.",
      "Tell your pharmacist about kidney history and other medicines (including azathioprine/mercaptopurine if prescribed).",
      "Ask what early gout flares versus allergy signs mean during the start of therapy.",
      "If blistering rash with fever, swelling of the face, or peeling skin develops — seek emergency care.",
    ],
    [
      "I-allopurinol i-xanthine-oxidase inhibitor esetshenziswa ezindleleni ezikhethiwe ze-gout neze-urate — thatha njengoba umkhiqizo onelebula uyala, ngokuvamile nokudla namanzi njengoba ilebula icebisa.",
      "I-Materia ayiqambi umthamo noma umgomo we-uric acid — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-allopurinol kuvame ukufaka ukuqaphela ukuqubuka: yeka futhi funa ukubuyekezwa okuphuthumayo uma ukuqubuka okusabalele, amaqhuma, noma izilonda zomlomo.",
      "Tshela umkhiqizi ngomlando wezinso namanye amaphilisi (kuhlanganise i-azathioprine/mercaptopurine uma ibhaliwe).",
      "Buza ukuthi yikuphi ukuvutha kwe-gout kwasekuqaleni kuqhathaniswa nezimpawu ze-allergy ngesikhathi sokuqala kokwelashwa.",
      "Uma ukuqubuka okunamaqhuma nomkhuhlane, ukuvuvuka kobuso, noma isikhumba esihlulayo kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Allopurinol is 'n xanthienoksidase-inhibeerder vir geselekteerde jig en uraatpaaie — neem dit presies soos die geëtiketteerde produk aandui, dikwels met kos en water soos die etiket adviseer.",
      "Materia versin nie 'n dosis of uriensuurteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Allopurinol-berading sluit algemeen uitslagwag in: stop en soek dringende hersiening vir wydverspreide uitslag, blase of mondsere.",
      "Sê vir jou apteker van niergeskiedenis en ander medisyne (insluitend azatioprien/mercaptopurien indien voorgeskryf).",
      "Vra wat vroeë jig-opvlams versus allergietekens beteken tydens die begin van terapie.",
      "As blaserige uitslag met koors, gesigswelling of skilferende vel ontwikkel — soek noodhulp.",
    ],
    [
      "Allopurinol ke xanthine-oxidase inhibitor e sebelisoang litseleng tse khethiloeng tsa gout le urate — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela, hangata le lijo le metsi joalo ka ha ileibole e eletsa.",
      "Materia ha e iqape tekanyo kapa sepheo sa uric acid — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea allopurinol hangata e kenyelletsa ho hlokomela lekhopho: emisa 'me batla tlhahlobo e potlakileng bakeng sa lekhopho le atileng, li-blister, kapa lisoa tsa molomo.",
      "Bolella rakhemisi ka histori ea liphio le meriana e meng (ho kenyeletsoa azathioprine/mercaptopurine haeba e ngotsoe).",
      "Botsa hore na ke ho tjhesa life ha gout ha pele ho bapisitsoe le matšoao a allergy nakong ea ho qala kalafo.",
      "Haeba lekhopho le nang le li-blister le feberu, ho ruruha ha sefahleho, kapa letlalo le hlobohang le hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-allopurinol yi-xanthine-oxidase inhibitor esetyenziswa kwiindlela ezikhethiweyo ze-gout neze-urate — yithathe kanye njengoko imveliso enelebula ikhokela, rhoqo nokutya namanzi njengoko ilebula icebisa.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lwe-uric acid — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-allopurinol kuhlala kubandakanya ukujonga irhashalala: yeka kwaye funa ukujongwa okungxamisekileyo kwirhashalala esasazekileyo, amaqhuma, okanye izilonda zomlomo.",
      "Xelela usokhemisti ngembali yezintso namanye amayeza (kuquka i-azathioprine/mercaptopurine ukuba ibhaliwe).",
      "Buza ukuba kukuphi ukuvutha kwe-gout kwasekuqaleni xa kuthelekiswa neempawu ze-allergy ngexesha lokuqala konyango.",
      "Ukuba irhashalala enamqhuma nomkhuhlane, ukudumba kobuso, okanye isikhumba esihlulayo kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),
};
