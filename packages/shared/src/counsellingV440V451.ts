/**
 * v440–v451 deepened SA counselling batch (6 lines × 5 langs) — deepen remaining thin scripts.
 * Covers full v120 batch plus pantoprazole/codeine from v90. Original Materia educational scripts only —
 * no invented mg doses, glucose/lipid/lab targets, units, clock hours, or course lengths.
 * Overrides thinner base/v90/v120 entries via spread order.
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

export const COUNSELLING_V440_TO_V451: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-naproxen": five(
    [
      "Naproxen is an NSAID used for pain and inflammation — take it exactly as the labelled product directs, often with food if stomach upset occurs.",
      "Materia does not invent a dose or pain target — confirm against the labelled product and pharmacist advice.",
      "NSAID counselling commonly includes stomach irritation and fluid retention — report black stools, severe indigestion, swelling, or reduced urine.",
      "Tell your pharmacist about heart, kidney, or ulcer history, and all other painkillers you use.",
      "Ask what ankle swelling or breathing change should trigger urgent review.",
      "If you vomit blood, pass black stools, get chest pain, or sudden shortness of breath — seek emergency care.",
    ],
    [
      "I-naproxen i-NSAID esetshenziselwa ubuhlungu nokuvuvuka — thatha njengoba umkhiqizo onelebula uyala, ngokuvamile nokudla uma isisu siphazamiseka.",
      "I-Materia ayiqambi umthamo noma umgomo wobuhlungu — qinisekisa nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Ukuelulekwa kwe-NSAID kuvame ukufaka ukucasuka kwesisu nokugcina amanzi — bika okubomvu kwamathumbu, ukungena kakuhle okukhulu, ukuvuvuka, noma umchamo omncane.",
      "Tshela umkhiqizi ngomlando wenhliziyo, wezinso, noma wesilonda, nawo wonke amanye amaphilisi obuhlungu owasebenzisayo.",
      "Buza ukuthi yikuphi ukuvuvuka kwezindlebe zezinyawo noma uguquko lokuphefumula okufanele kuqale ukubuyekezwa okuphuthumayo.",
      "Uma uhlanza igazi, udlulisa okubomvu kwamathumbu, uthola ubuhlungu besifuba, noma ukuphefumula okufushane okuzumayo — funa usizo oluphuthumayo.",
    ],
    [
      "Naproksen is 'n NSAID vir pyn en inflammasie — neem dit presies soos die geëtiketteerde produk aandui, dikwels met kos as maagongemak voorkom.",
      "Materia versin nie 'n dosis of pynteiken nie — bevestig teen die geëtiketteerde produk en aptekeradvies.",
      "NSAID-berading sluit algemeen maagirritasie en vloeistofretensie in — rapporteer swart stoelgang, ernstige indigestie, swelling of verminderde urine.",
      "Sê vir jou apteker van hart-, nier- of ulkusgeskiedenis, en alle ander pynstillers wat jy gebruik.",
      "Vra watter enkelswelling of asemverandering dringende hersiening moet sneller.",
      "As jy bloed braak, swart stoelgang deurgee, borspyn kry, of skielike kortasem — soek noodhulp.",
    ],
    [
      "Naproxen ke NSAID e sebelisoang bakeng sa bohloko le ho ruruha — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela, hangata le lijo haeba mpa e tšoenya.",
      "Materia ha e iqape tekanyo kapa sepheo sa bohloko — netefatsa khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Tlhabollo ea NSAID hangata e kenyelletsa ho hlaba ha mpa le ho boloka metsi — tlaleha litšila tse ntšo, ho se je hantle ho matla, ho ruruha, kapa moroto o fokotsehileng.",
      "Bolella rakhemisi ka histori ea pelo, liphio, kapa leqeba, le meriana eohle e meng ea bohloko eo u e sebelisang.",
      "Botsa hore na ke ho ruruha life ha maqaqailana kapa phetoho ea ho hema e lokelang ho qala tlhahlobo e potlakileng.",
      "Haeba u hlatsa mali, u fetisa litšila tse ntšo, u fumana bohloko ba sefuba, kapa ho hema ha khutšoanyane ka tšohanyetso — batla thuso ea tšohanyetso.",
    ],
    [
      "I-naproxen yi-NSAID esetyenziselwa iintlungu kunye nokudumba — yithathe kanye njengoko imveliso enelebula ikhokela, rhoqo nokutya ukuba isisu siyaphazamiseka.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lweentlungu — Qinisekisa nemveliso enelebula nengcebiso yosokhemisti.",
      "Ukucebisa nge-NSAID kuhlala kubandakanya ukucaphuka kwesisu nokugcina amanzi — bika okumnyama kwamathumbu, ukungena kakuhle okukhulu, ukudumba, okanye umchamo omncinci.",
      "Xelela usokhemisti ngembali yentliziyo, yezintso, okanye yesilonda, kunye nawo onke amanye amayeza eentlungu owawasebenzisayo.",
      "Buza ukuba kukuphi ukudumba kwamaqatha okanye utshintsho lokuphefumla okufuneka kuqalise ukujongwa okungxamisekileyo.",
      "Ukuba ugabha igazi, ugqitha okumnyama kwamathumbu, ufumana iintlungu zesifuba, okanye ukuphefumla okufutshane ngequbuliso — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-rosuvastatin": five(
    [
      "Rosuvastatin is a statin used to lower cholesterol risk under clinician-directed care — take it exactly as the labelled product directs.",
      "Materia does not invent a dose or cholesterol target — confirm against current SA guidance and the labelled product.",
      "Statin counselling commonly includes muscle pain or weakness watch and interaction checks with other medicines.",
      "Tell your pharmacist about unexplained muscle symptoms, liver history, and all other medicines or grapefruit products if the label advises.",
      "Ask what dark urine, yellow eyes, or persistent muscle symptoms should trigger urgent review.",
      "If severe muscle pain with dark urine, yellow eyes, or trouble breathing develops — seek emergency or urgent care.",
    ],
    [
      "I-rosuvastatin i-statin esetshenziselwa ukwehlisa ingozi ye-cholesterol ngaphansi kokunakekelwa okulawulwa udokotela — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo noma umgomo we-cholesterol — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-statin kuvame ukufaka ukuqaphela ubuhlungu bemisipha noma ubuthakathaka nokuhlola ukusebenzisana namanye amaphilisi.",
      "Tshela umkhiqizi ngezimpawu zemisipha ezingachazeki, umlando wesibindi, nawo wonke amanye amaphilisi noma imikhiqizo yegrepefruit uma ilebula icebisa.",
      "Buza ukuthi yimuphi umchamo omnyama, amehlo aphuzi, noma izimpawu zemisipha eziqhubekayo okufanele kuqale ukubuyekezwa okuphuthumayo.",
      "Uma ubuhlungu bemisipha obukhulu nomchamo omnyama, amehlo aphuzi, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo noma olusheshayo.",
    ],
    [
      "Rosuvastatien is 'n statien om cholesterolrisiko onder klinikus-gerigte sorg te verlaag — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis of cholesterolteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Statien-berading sluit algemeen spierpyn- of swakheidwag en wisselwerkingskontroles met ander medisyne in.",
      "Sê vir jou apteker van onverklaarde spiersimptome, lewergeskiedenis, en alle ander medisyne of pomelo-produkte as die etiket adviseer.",
      "Vra watter donker urine, geel oë of aanhoudende spiersimptome dringende hersiening moet sneller.",
      "As ernstige spierpyn met donker urine, geel oë of asemnood ontwikkel — soek nood- of dringende sorg.",
    ],
    [
      "Rosuvastatin ke statin e sebelisoang ho fokotsa kotsi ea cholesterol tlas'a tlhokomelo e tataisoang ke ngaka — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo kapa sepheo sa cholesterol — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea statin hangata e kenyelletsa ho hlokomela bohloko ba mesifa kapa bofokoli le litlhahlobo tsa tšebelisano le meriana e meng.",
      "Bolella rakhemisi ka matšoao a mesifa a sa hlaloseng, histori ea sebete, le meriana eohle e meng kapa lihlahisoa tsa grapefruit haeba ileibole e eletsa.",
      "Botsa hore na ke moroto ofe o lefifi, mahlo a mosehla, kapa matšoao a mesifa a tsoelang pele a lokelang ho qala tlhahlobo e potlakileng.",
      "Haeba bohloko ba mesifa bo matla le moroto o lefifi, mahlo a mosehla, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso kapa e potlakileng.",
    ],
    [
      "I-rosuvastatin yi-statin esetyenziselwa ukwehlisa umngcipheko we-cholesterol phantsi kokhathalelo olukhokelwa ngugqirha — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lwe-cholesterol — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-statin kuhlala kubandakanya ukujonga iintlungu zemisipha okanye ubuthathaka kunye nokujonga ukusebenzisana namanye amayeza.",
      "Xelela usokhemisti ngeempawu zemisipha ezingachazekiyo, imbali yesibindi, kunye nawo onke amanye amayeza okanye iimveliso zegrepefruit ukuba ilebula icebisa.",
      "Buza ukuba ngowuphi umchamo omnyama, amehlo atyheli, okanye iimpawu zemisipha eziqhubekayo ezifuneka ziqalise ukujongwa okungxamisekileyo.",
      "Ukuba iintlungu zemisipha ezinkulu nomchamo omnyama, amehlo atyheli, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo okanye olukhawulezayo.",
    ],
  ),

  "mol-escitalopram": five(
    [
      "Escitalopram is an SSRI antidepressant used in selected mood and anxiety pathways — benefit is often gradual under clinical follow-up.",
      "Materia does not invent a dose or taper schedule — confirm against current SA guidance and the labelled product.",
      "Report worsening mood or suicidal thoughts early, including after clinician dose changes — do not stop suddenly without the prescribing team.",
      "Tell your pharmacist about other serotonergic medicines and alcohol use.",
      "Ask what early restlessness, sleep change, or mood worsening should trigger review rather than stopping alone.",
      "If self-harm thoughts, severe agitation, fever with muscle rigidity, or trouble breathing develops — seek emergency care immediately.",
    ],
    [
      "I-escitalopram i-SSRI antidepressant esetshenziswa ezindleleni ezikhethiwe zemizwa nokukhathazeka — inzuzo ivame ukwakha kancane ngaphansi kokulandelwa komtholampilo.",
      "I-Materia ayiqambi umthamo noma uhlelo lokwehlisa — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Bika ukuba bi kwemizwa noma imicabango yokuzibulala kusenesikhathi, kuhlanganise ngemva kwezinguquko zomthamo zikadokotela — ungayeki ngokuzumayo ngaphandle kwethimba elibhalisile.",
      "Tshela umkhiqizi ngamanye amaphilisi e-serotonergic nokusebenzisa utshwala.",
      "Buza ukuthi yikuphi ukungaphumuli kwasekuqaleni, inguquko yokulala, noma ukuba bi kwemizwa kufanele kuqale ukubuyekezwa kunokuyeka wedwa.",
      "Uma imicabango yokuzilimaza, ukukhathazeka okukhulu, umkhuhlane nokuginywa kwemisipha, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Esitalopram is 'n SSRI-antidepressant in geselekteerde gemoeds- en angspaaie — voordeel is dikwels geleidelik onder kliniese opvolg.",
      "Materia versin nie 'n dosis of afbouskedule nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Rapporteer verergerende gemoed of selfmoordgedagtes vroeg, insluitend na klinikus-dosisveranderinge — moenie skielik stop sonder die voorskriwende span nie.",
      "Sê vir jou apteker van ander serotonergiese medisyne en alkoholgebruik.",
      "Vra watter vroeë rusteloosheid, slaapverandering of gemoedsverergering hersiening moet sneller eerder as alleen te stop.",
      "As selfskade-gedagtes, ernstige agitasie, koors met spierstyfheid of asemnood ontwikkel — soek onmiddellik noodhulp.",
    ],
    [
      "Escitalopram ke SSRI antidepressant e sebelisoang litseleng tse khethiloeng tsa maikutlo le ho tšoenyeha — molemo hangata o ahoa butle-butle tlas'a tlhahlobo ea bongaka.",
      "Materia ha e iqape tekanyo kapa kemiso ea ho theola — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlaleha ho mpefala ha maikutlo kapa mehopolo ea ho ipolaea kapele, ho kenyeletsoa ka mor'a liphetoho tsa tekanyo tsa ngaka — u se ke ua emisa ka tšohanyetso ntle le sehlopha se ngolisitseng.",
      "Bolella rakhemisi ka meriana e meng ea serotonergic le tšebeliso ea joala.",
      "Botsa hore na ke ho hloka phomolo life ha pele, phetoho ea boroko, kapa ho mpefala ha maikutlo ho lokelang ho qala tlhahlobo ho e-na le ho emisa u le mong.",
      "Haeba mehopolo ea ho intša kotsi, ho ferekana ho matla, feberu le ho thatafala ha mesifa, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-escitalopram yi-SSRI antidepressant esetyenziswa kwiindlela ezikhethiweyo zemizwa kunye nexhala — inzuzo ihlala yakha ngokuthe ngcembe phantsi kokulandelwa kwekliniki.",
      "I-Materia ayiyiqiqi idosi okanye ishedyuli yokwehlisa — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Bika ukuba bi kwemizwa okanye iingcinga zokuzibulala kwangethuba, kuquka emva kotshintsho lwedosi yogqirha — ungayeki ngequbuliso ngaphandle kweqela elibhalisileyo.",
      "Xelela usokhemisti ngamanye amayeza e-serotonergic nokusebenzisa utywala.",
      "Buza ukuba kukuphi ukungaphumli kokuqala, utshintsho lokulala, okanye ukuba bi kwemizwa okufuneka kuqalise ukujongwa kunokuyeka wedwa.",
      "Ukuba iingcinga zokuzilimaza, ukuphazamiseka okukhulu, umkhuhlane nokuginywa kwemisipha, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-insulin-aspart": five(
    [
      "Insulin aspart is a rapid-acting insulin used around meals in selected diabetes pathways — use it exactly as the labelled product and clinician teaching direct.",
      "Materia does not invent a dose, units, or glucose target — confirm against your written diabetes plan and the labelled product.",
      "Insulin counselling commonly includes hypoglycaemia recognition and never sharing pens or needles.",
      "Tell your pharmacist about meal pattern changes, illness, other diabetes medicines, and how you store the pen or vial.",
      "Ask what illness-day rules and driving/safety advice mean while you use rapid-acting insulin.",
      "If you cannot swallow, seize, lose consciousness, or remain confused after hypo treatment — seek emergency care.",
    ],
    [
      "I-insulin aspart i-insulin esebenza ngokushesha esetshenziswa ngokudla ezindleleni ezikhethiwe zesifo sikashukela — yisebenzise njengoba umkhiqizo onelebula nokufundiswa kukadokotela kuyala.",
      "I-Materia ayiqambi umthamo, amayunithi, noma umgomo woshukela — qinisekisa nohlelo lwakho lwesifo sikashukela olubhaliwe nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-insulin kuvame ukufaka ukuqaphela i-hypoglycaemia nokungabi nakwabelana ngamapeni noma izinhlabathi.",
      "Tshela umkhiqizi ngezinguquko zendlela yokudla, ukugula, amanye amaphilisi esifo sikashukela, nokuthi ugcina kanjani ipeni noma ivayili.",
      "Buza ukuthi imithetho yezinsuku zokugula neseluleko sokushayela/sokuphepha kusho ukuthini ngenkathi usebenzisa i-insulin esheshayo.",
      "Uma ungakwazi ukugwinya, uthola ukuqubuka, ulahlekelwa ukwazi, noma uhlala udidekile ngemva kokwelashwa kwe-hypo — funa usizo oluphuthumayo.",
    ],
    [
      "Insulien-aspart is 'n vinnigwerkende insulien rondom maaltye in geselekteerde diabetespaaie — gebruik dit presies soos die geëtiketteerde produk en klinikusonderrig aandui.",
      "Materia versin nie 'n dosis, eenhede of glukoseteiken nie — bevestig teen jou geskrewe diabetesplan en die geëtiketteerde produk.",
      "Insulienberading sluit algemeen hipoglisemie-herkenning in en om nooit penne of naalde te deel nie.",
      "Sê vir jou apteker van maaltydpatroonveranderinge, siekte, ander diabetesmedisyne, en hoe jy die pen of flessie berg.",
      "Vra wat siektedag-reëls en bestuurs-/veiligheidsadvies beteken terwyl jy vinnigwerkende insulien gebruik.",
      "As jy nie kan sluk nie, aanvalle kry, bewusteloos raak, of verward bly na hipo-behandeling — soek noodhulp.",
    ],
    [
      "Insulin aspart ke insulin e sebetsang kapele e sebelisoang haufi le lijo litseleng tse khethiloeng tsa lefu la tsoekere — e sebelise hantle joalo ka ha sehlahisoa se nang le ileibole le thuto ea ngaka li laela.",
      "Materia ha e iqape tekanyo, li-unit, kapa sepheo sa glucose — netefatsa khahlanong le moralo oa hau o ngotsoeng oa lefu la tsoekere le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea insulin hangata e kenyelletsa ho lemoha hypoglycaemia le ho se arolelane lipene kapa linalete.",
      "Bolella rakhemisi ka liphetoho tsa mokhoa oa lijo, ho kula, meriana e meng ea lefu la tsoekere, le hore u boloka joang pene kapa vial.",
      "Botsa hore na melao ea matsatsi a ho kula le keletso ea ho khanna/tšireletso li bolela eng ha u sebelisa insulin e potlakileng.",
      "Haeba u sitoa ho koenya, u tšoaroa ke sekhahla, u lahleheloa ke kelello, kapa u lula u ferekane ka mor'a kalafo ea hypo — batla thuso ea tšohanyetso.",
    ],
    [
      "I-insulin aspart yi-insulin esebenza ngokukhawuleza esetyenziswa ngokutya kwiindlela ezikhethiweyo zesifo seswekile — yisebenzise kanye njengoko imveliso enelebula kunye nokufundiswa kugqirha zikhokela.",
      "I-Materia ayiyiqiqi idosi, ii-unit, okanye usukelo lweswekile — Qinisekisa nesicwangciso sakho sesifo seswekile esibhaliweyo kunye nemveliso enelebula.",
      "Ukucebisa nge-insulin kuhlala kubandakanya ukuqaphela i-hypoglycaemia kunye nokungabelani ngeepeni okanye iinaliti.",
      "Xelela usokhemisti ngotshintsho lwendlela yokutya, ukugula, amanye amayeza esifo seswekile, nokuba ugcina njani ipeni okanye ivial.",
      "Buza ukuba imithetho yeentsuku zokugula nengcebiso yokuqhuba/yokhuseleko zithetha ntoni ngelixa usebenzisa i-insulin ekhawulezayo.",
      "Ukuba awukwazi ukuginya, uthola ukuqubuka, uphulukana nengqondo, okanye uhlala udidekile emva konyango lwe-hypo — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-methotrexate": five(
    [
      "Methotrexate is a DMARD used in selected rheumatology and other specialist pathways — many plans are weekly, not daily; confirm the labelled schedule with your clinician.",
      "Materia does not invent a dose, day-of-week, or lab target — confirm against your specialist plan and the labelled product.",
      "Methotrexate counselling commonly includes folic-acid co-therapy as the clinician directed, alcohol caution, and infection watch.",
      "Tell your pharmacist about pregnancy plans, all other medicines, and new mouth ulcers, fever, or unexplained bruising.",
      "Ask what blood-test timing and illness days mean before you change the schedule yourself.",
      "If severe shortness of breath, blistering rash, yellow eyes, or high fever with extreme fatigue develops — seek emergency care.",
    ],
    [
      "I-methotrexate i-DMARD esetshenziswa ezindleleni ezikhethiwe ze-rheumatology nezinye izindlela zochwepheshe — izinhlelo eziningi zivamise ukuba ngeviki, hhayi nsuku zonke; qinisekisa uhlelo olulebula nodokotela wakho.",
      "I-Materia ayiqambi umthamo, usuku lwesonto, noma umgomo welabhorethri — qinisekisa nohlelo lwakho lochwepheshe nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-methotrexate kuvame ukufaka i-folic-acid co-therapy njengoba udokotela eyala, ukuqapha utshwala, nokuqaphela ukutheleleka.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, wonke amanye amaphilisi, nezilonda ezisha zomlomo, umkhuhlane, noma ukulimala okungachazeki.",
      "Buza ukuthi isikhathi sokuhlolwa kwegazi nezinsuku zokugula kusho ukuthini ngaphambi kokushintsha uhlelo wedwa.",
      "Uma ukuphefumula okufushane okukhulu, ukuqubuka okunamaqhuma, amehlo aphuzi, noma umkhuhlane ophezulu nokukhathala okwedlulele kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Metotreksaat is 'n DMARD in geselekteerde reumatologie- en ander spesialispaaie — baie planne is weekliks, nie daagliks nie; bevestig die geëtiketteerde skedule met jou klinikus.",
      "Materia versin nie 'n dosis, weeksdag of labteiken nie — bevestig teen jou spesialisplan en die geëtiketteerde produk.",
      "Metotreksaat-berading sluit algemeen foliensuur-medeterapie soos die klinikus gerig het, alkoholkautheid en infeksiewag in.",
      "Sê vir jou apteker van swangerskapplanne, alle ander medisyne, en nuwe mondsere, koors of onverklaarde kneusing.",
      "Vra wat bloettoetstydsberekening en siektedae beteken voordat jy self die skedule verander.",
      "As ernstige kortasem, blaserige uitslag, geel oë of hoë koors met uiterste moegheid ontwikkel — soek noodhulp.",
    ],
    [
      "Methotrexate ke DMARD e sebelisoang litseleng tse khethiloeng tsa rheumatology le tse ling tsa litsebi — merero e mengata ke ea beke le beke, eseng ea letsatsi le letsatsi; netefatsa kemiso e nang le ileibole le ngaka ea hau.",
      "Materia ha e iqape tekanyo, letsatsi la beke, kapa sepheo sa lab — netefatsa khahlanong le moralo oa hau oa setsebi le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea methotrexate hangata e kenyelletsa folic-acid co-therapy joalo ka ha ngaka e laetse, tlhokomelo ea joala, le ho hlokomela tšoaetso.",
      "Bolella rakhemisi ka merero ea boimana, meriana eohle e meng, le lisoa tse ncha tsa molomo, feberu, kapa ho otlaha ho sa hlaloseng.",
      "Botsa hore na nako ea liteko tsa mali le matsatsi a ho kula a bolela eng pele u fetola kemiso u le mong.",
      "Haeba ho hema ha khutšoanyane ho matla, lekhopho le nang le li-blister, mahlo a mosehla, kapa feberu e phahameng le mokhathala o feteletseng o hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-methotrexate yi-DMARD esetyenziswa kwiindlela ezikhethiweyo ze-rheumatology nezinye iindlela zoongcali — izicwangciso ezininzi zihlala zibe ngeveki, hayi yonke imihla; Qinisekisa ishedyuli enelebula nogqirha wakho.",
      "I-Materia ayiyiqiqi idosi, usuku lweveki, okanye usukelo lwelabhorethri — Qinisekisa nesicwangciso sakho songcali kunye nemveliso enelebula.",
      "Ukucebisa nge-methotrexate kuhlala kubandakanya i-folic-acid co-therapy njengoko ugqirha eyikhokela, ukulumkela utywala, nokujonga usulelo.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, onke amanye amayeza, kunye nezilonda ezintsha zomlomo, umkhuhlane, okanye ukulimala okungachazekiyo.",
      "Buza ukuba ixesha lokuhlolwa kwegazi neentsuku zokugula zithetha ntoni phambi kokutshintsha ishedyuli wedwa.",
      "Ukuba ukuphefumla okufutshane okukhulu, irhashalala enamqhuma, amehlo atyheli, okanye umkhuhlane ophezulu nokudinwa okugqithisileyo kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-alendronate": five(
    [
      "Alendronate is a bisphosphonate used for selected bone pathways — take it exactly as the labelled product directs, often first thing with plain water, remaining upright as the label describes.",
      "Materia does not invent a clock time, dose, or spacing hours — confirm against the labelled product and pharmacist advice.",
      "Alendronate counselling commonly includes separating calcium, iron, or antacids as the product advises.",
      "Tell your pharmacist about swallowing difficulty, dental procedures, and all other medicines you use.",
      "Ask what upright time and missed-dose rules mean for your labelled product.",
      "If chest pain on swallowing, new severe thigh or jaw pain, or trouble breathing develops — seek urgent or emergency care.",
    ],
    [
      "I-alendronate i-bisphosphonate esetshenziswa ezindleleni ezikhethiwe zamathambo — thatha njengoba umkhiqizo onelebula uyala, ngokuvamile ekuqaleni namanzi alula, uhlale umile njengoba ilebula ichaza.",
      "I-Materia ayiqambi isikhathi sewashi, umthamo, noma amahora okuhlukanisa — qinisekisa nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Ukuelulekwa kwe-alendronate kuvame ukufaka ukuhlukanisa i-calcium, i-iron, noma ama-antacid njengoba umkhiqizo ucebisa.",
      "Tshela umkhiqizi ngobunzima bokugwinya, izinqubo zokudokota amazinyo, nawo wonke amanye amaphilisi owasebenzisayo.",
      "Buza ukuthi isikhathi sokuma nemithetho yomthamo ophuthelwe kusho ukuthini kumkhiqizo wakho onelebula.",
      "Uma ubuhlungu besifuba uma ugwinya, ubuhlungu obusha obukhulu bethanga noma bomhlathi, noma ubunzima bokuphefumula kuvela — funa usizo olusheshayo noma oluphuthumayo.",
    ],
    [
      "Alendronaat is 'n bisfosfonaat vir geselekteerde beenpaaie — neem dit presies soos die geëtiketteerde produk aandui, dikwels eerste met gewone water, en bly regop soos die etiket beskryf.",
      "Materia versin nie 'n horlosietyd, dosis of spasie-ure nie — bevestig teen die geëtiketteerde produk en aptekeradvies.",
      "Alendronaat-berading sluit algemeen in om kalsium, yster of antasuurs te skei soos die produk adviseer.",
      "Sê vir jou apteker van slukmoeilikheid, tandheelkundige prosedures, en alle ander medisyne wat jy gebruik.",
      "Vra wat regoptyd en gemiste-dosisreëls vir jou geëtiketteerde produk beteken.",
      "As borspyn by sluk, nuwe ernstige dy- of kaakpyn, of asemnood ontwikkel — soek dringende of noodsorg.",
    ],
    [
      "Alendronate ke bisphosphonate e sebelisoang litseleng tse khethiloeng tsa masapo — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela, hangata qalong ka metsi a hlakileng, u ntse u otlolohile joalo ka ha ileibole e hlalosa.",
      "Materia ha e iqape nako ea oache, tekanyo, kapa lihora tsa ho arola — netefatsa khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Tlhabollo ea alendronate hangata e kenyelletsa ho arola calcium, tšepe, kapa li-antacid joalo ka ha sehlahisoa se eletsa.",
      "Bolella rakhemisi ka bothata ba ho koenya, mekhoa ea meno, le meriana eohle e meng eo u e sebelisang.",
      "Botsa hore na nako ea ho otloloha le melao ea tekanyo e fosumetsoeng e bolela eng bakeng sa sehlahisoa sa hau se nang le ileibole.",
      "Haeba bohloko ba sefuba ha u koenya, bohloko bo bocha bo matla ba setho kapa mohlahare, kapa ho hema thata ho hlaha — batla thuso e potlakileng kapa ea tšohanyetso.",
    ],
    [
      "I-alendronate yi-bisphosphonate esetyenziswa kwiindlela ezikhethiweyo zamathambo — yithathe kanye njengoko imveliso enelebula ikhokela, rhoqo ekuqaleni ngamanzi acocekileyo, uhlale umile njengoko ilebula ichaza.",
      "I-Materia ayiyiqiqi ixesha lewotshi, idosi, okanye iiyure zokwahlula — Qinisekisa nemveliso enelebula nengcebiso yosokhemisti.",
      "Ukucebisa nge-alendronate kuhlala kubandakanya ukwahlula i-calcium, i-iron, okanye ii-antacid njengoko imveliso icebisa.",
      "Xelela usokhemisti ngobunzima bokuginya, iinkqubo zamanzi, kunye nawo onke amanye amayeza owawasebenzisayo.",
      "Buza ukuba ixesha lokuma kunye nemithetho yedosi ephosakeleyo kuthetha ntoni kwimveliso yakho enelebula.",
      "Ukuba iintlungu zesifuba xa uginya, iintlungu ezintsha ezinkulu zethanga okanye zomhlathi, okanye ubunzima bokuphefumla kuvela — funa uncedo olukhawulezayo okanye olungxamisekileyo.",
    ],
  ),

  "mol-ferrous-sulfate": five(
    [
      "Ferrous sulfate is an iron supplement used for selected iron-deficiency pathways — take it exactly as the labelled product directs.",
      "Materia does not invent a dose or haemoglobin target — confirm against current SA guidance and the labelled product.",
      "Iron counselling commonly includes dark stools and constipation — keep tablets away from children.",
      "Food and tea/coffee timing may affect absorption — confirm against the label and ask your pharmacist.",
      "Tell your pharmacist about other vitamins, antacids, and all medicines you take.",
      "If a child swallows iron tablets, or you get severe abdominal pain with vomiting — seek emergency care.",
    ],
    [
      "I-ferrous sulfate isithasiselo se-iron esisetshenziswa ezindleleni ezikhethiwe zokushoda kwe-iron — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo noma umgomo we-haemoglobin — qinisekisa nesiqondiso saseNingizimu Afrika samanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-iron kuvame ukufaka amathumbu amnyama nokubindi — gcina amaphilisi kude nezingane.",
      "Ukudla nesikhathi setiye/ikhofi kungathinta ukumunca — qinisekisa nelebula futhi buza umkhiqizi.",
      "Tshela umkhiqizi ngamanye amavitamin, ama-antacid, nawo wonke amaphilisi owathathayo.",
      "Uma ingane igwinya amaphilisi e-iron, noma uthola ubuhlungu besisu obukhulu nokuhlanza — funa usizo oluphuthumayo.",
    ],
    [
      "Ferrosulfaat is 'n ysteraanvulling vir geselekteerde ystertekortpaaie — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis of hemoglobienteiken nie — bevestig teen huidige SA-riglyne en die geëtiketteerde produk.",
      "Ysterberading sluit algemeen donker stoelgang en hardlywigheid in — hou tablette weg van kinders.",
      "Kos- en tee/koffie-tydsberekening mag absorpsie beïnvloed — bevestig teen die etiket en vra jou apteker.",
      "Sê vir jou apteker van ander vitamiene, antasuurs, en alle medisyne wat jy neem.",
      "As 'n kind ystertablette insluk, of jy ernstige buikpyn met braking kry — soek noodhulp.",
    ],
    [
      "Ferrous sulfate ke tlatsetso ea tšepe e sebelisoang litseleng tse khethiloeng tsa khaello ea tšepe — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo kapa sepheo sa haemoglobin — netefatsa khahlanong le tataiso ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea tšepe hangata e kenyelletsa litšila tse lefifi le ho thatafala — boloka litlhare hole le bana.",
      "Nako ea lijo le tee/kofi e ka ama ho monya — netefatsa khahlanong le ileibole 'me botsa rakhemisi.",
      "Bolella rakhemisi ka livithamini tse ling, li-antacid, le meriana eohle eo u e nkang.",
      "Haeba ngoana a koenya litlhare tsa tšepe, kapa u fumana bohloko ba mpa bo matla le ho hlatsa — batla thuso ea tšohanyetso.",
    ],
    [
      "I-ferrous sulfate sisongezo se-iron esisetyenziswa kwiindlela ezikhethiweyo zokungabikho kwe-iron — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lwe-haemoglobin — Qinisekisa nesikhokelo saseMzantsi Afrika sangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-iron kuhlala kubandakanya amathumbu amnyama kunye nokubindi — gcina iipilisi kude nabantwana.",
      "Ukutya nexesha leti/ikofu kunokuchaphazela ukufunxa — Qinisekisa nelebula kwaye buza usokhemisti.",
      "Xelela usokhemisti ngezinye iivitamin, ii-antacid, kunye nawo onke amayeza owawathathayo.",
      "Ukuba umntwana uginya iipilisi ze-iron, okanye ufumana iintlungu zesisu ezinkulu nokugabha — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-clotrimazole": five(
    [
      "Clotrimazole is an azole antifungal used for selected skin and mucosal pathways — complete the course even if symptoms improve early.",
      "Materia does not invent a dose or course length — confirm against the labelled product and pharmacist advice.",
      "Clotrimazole counselling commonly includes continuing for the labelled duration and reporting worsening redness, swelling, or discharge.",
      "Tell your pharmacist about pregnancy, other vaginal or skin products, and allergy to azoles.",
      "Ask what incomplete improvement or recurrent symptoms should trigger review rather than repeating alone.",
      "If severe rash with blistering, facial swelling, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-clotrimazole i-azole antifungal esetshenziswa ezindleleni ezikhethiwe zesikhumba nezomlomo — qeda inkambu ngisho noma izimpawu zithuthuka kusenesikhathi.",
      "I-Materia ayiqambi umthamo noma ubude benkambu — qinisekisa nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Ukuelulekwa kwe-clotrimazole kuvame ukufaka ukuqhubeka isikhathi esulebula nokubika ukubomvu okuya kuba bi, ukuvuvuka, noma ukuphuma.",
      "Tshela umkhiqizi ngokukhulelwa, eminye imikhiqizo yomlomo noma yesikhumba, ne-allergy kuma-azole.",
      "Buza ukuthi yikuphi ukungathuthuki okuphelele noma izimpawu ezibuyayo okufanele kuqale ukubuyekezwa kunokuphinda wedwa.",
      "Uma ukuqubuka okukhulu okunamaqhuma, ukuvuvuka kobuso, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Klotrimasool is 'n asool-antifungale middel vir geselekteerde vel- en slymvliespaaie — voltooi die kuur selfs as simptome vroeg verbeter.",
      "Materia versin nie 'n dosis of kuurduur nie — bevestig teen die geëtiketteerde produk en aptekeradvies.",
      "Klotrimasool-berading sluit algemeen in om vir die geëtiketteerde duur voort te gaan en verergerende rooiheid, swelling of afskeiding te rapporteer.",
      "Sê vir jou apteker van swangerskap, ander vaginale of velprodukte, en allergie vir asole.",
      "Vra watter onvolledige verbetering of herhalende simptome hersiening moet sneller eerder as alleen te herhaal.",
      "As ernstige uitslag met blase, gesigswelling of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Clotrimazole ke azole antifungal e sebelisoang litseleng tse khethiloeng tsa letlalo le mucosal — qeta thuto esita le haeba matšoao a ntlafala kapele.",
      "Materia ha e iqape tekanyo kapa bolelele ba thuto — netefatsa khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Tlhabollo ea clotrimazole hangata e kenyelletsa ho tsoela pele bakeng sa nako e nang le ileibole le ho tlaleha ho khubasela ho mpefalang, ho ruruha, kapa ho tsoa.",
      "Bolella rakhemisi ka boimana, lihlahisoa tse ling tsa botšehali kapa tsa letlalo, le allergy ho li-azole.",
      "Botsa hore na ke ntlafatso life e sa feleng kapa matšoao a khutlang a lokelang ho qala tlhahlobo ho e-na le ho pheta u le mong.",
      "Haeba lekhopho le matla le li-blister, ho ruruha ha sefahleho, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-clotrimazole yi-azole antifungal esetyenziswa kwiindlela ezikhethiweyo zesikhumba nezemucosal — gqiba ikhosi naxa iimpawu ziphucuka kwangethuba.",
      "I-Materia ayiyiqiqi idosi okanye ubude bekhosi — Qinisekisa nemveliso enelebula nengcebiso yosokhemisti.",
      "Ukucebisa nge-clotrimazole kuhlala kubandakanya ukuqhubeka ixesha elinelebula nokubika ubomvu obuya kuba bi, ukudumba, okanye ukuphuma.",
      "Xelela usokhemisti ngokukhulelwa, ezinye iimveliso zomlomo okanye zesikhumba, kunye ne-allergy kwii-azole.",
      "Buza ukuba kukuphi ukungaphucuki okupheleleyo okanye iimpawu ezibuyayo ezifuneka ziqalise ukujongwa kunokuphinda wedwa.",
      "Ukuba irhashalala enzima enamqhuma, ukudumba kobuso, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-ondansetron": five(
    [
      "Ondansetron is an antiemetic used for selected nausea and vomiting pathways — take it exactly as the labelled product directs.",
      "Materia does not invent a dose or maximum daily amount — confirm against the labelled product and pharmacist advice.",
      "Ondansetron counselling commonly includes constipation watch and reporting palpitations or fainting.",
      "Tell your pharmacist about heart rhythm history and all other medicines you use.",
      "Ask what ongoing vomiting or inability to keep fluids down should trigger urgent review.",
      "If you faint, get severe chest pain, seizures, or trouble breathing — seek emergency care.",
    ],
    [
      "I-ondansetron i-antiemetic esetshenziswa ezindleleni ezikhethiwe zokungananzi nokuhlanza — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo noma inani eliphezulu lansuku zonke — qinisekisa nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Ukuelulekwa kwe-ondansetron kuvame ukufaka ukuqaphela ukubindi nokubika ukushaya kwenhliziyo noma ukuwa.",
      "Tshela umkhiqizi ngomlando wesigqi senhliziyo nawo wonke amanye amaphilisi owasebenzisayo.",
      "Buza ukuthi yikuphi ukuhlanza okuqhubekayo noma ukungakwazi ukugcina uketshezi okufanele kuqale ukubuyekezwa okuphuthumayo.",
      "Uma uwela, uthola ubuhlungu besifuba obukhulu, ukuqubuka, noma ubunzima bokuphefumula — funa usizo oluphuthumayo.",
    ],
    [
      "Ondansetron is 'n antiëmetikum vir geselekteerde naarheid- en brakingpaaie — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis of maksimum daaglikse hoeveelheid nie — bevestig teen die geëtiketteerde produk en aptekeradvies.",
      "Ondansetron-berading sluit algemeen hardlywigheidswag in en rapportering van hartklop of floute.",
      "Sê vir jou apteker van hartritme-geskiedenis en alle ander medisyne wat jy gebruik.",
      "Vra watter aanhoudende braking of onvermoë om vloeistowwe in te hou dringende hersiening moet sneller.",
      "As jy flou word, ernstige borspyn, aanvalle of asemnood kry — soek noodhulp.",
    ],
    [
      "Ondansetron ke antiemetic e sebelisoang litseleng tse khethiloeng tsa ho nyaroha le ho hlatsa — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo kapa palo e phahameng ea letsatsi le letsatsi — netefatsa khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Tlhabollo ea ondansetron hangata e kenyelletsa ho hlokomela ho thatafala le ho tlaleha ho otla ha pelo kapa ho akheha.",
      "Bolella rakhemisi ka histori ea morethetho oa pelo le meriana eohle e meng eo u e sebelisang.",
      "Botsa hore na ke ho hlatsa life ho tsoelang pele kapa ho se khone ho boloka metsi a lokelang ho qala tlhahlobo e potlakileng.",
      "Haeba u akheha, u fumana bohloko ba sefuba bo matla, sekhahla, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "I-ondansetron yi-antiemetic esetyenziswa kwiindlela ezikhethiweyo zokungananzi nokugabha — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi okanye inani eliphezulu lemiala yonke — Qinisekisa nemveliso enelebula nengcebiso yosokhemisti.",
      "Ukucebisa nge-ondansetron kuhlala kubandakanya ukujonga ukubindi nokubika ukubetha kwentliziyo okanye ukuwa.",
      "Xelela usokhemisti ngembali yesingqisho sentliziyo kunye nawo onke amanye amayeza owawasebenzisayo.",
      "Buza ukuba kukuphi ukugabha okuqhubekayo okanye ukungakwazi ukugcina ulwelo okufuneka kuqalise ukujongwa okungxamisekileyo.",
      "Ukuba uyawa, ufumana iintlungu zesifuba ezinkulu, ukuqubuka, okanye ubunzima bokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-clarithro": five(
    [
      "Clarithromycin is a macrolide antibiotic used for selected bacterial infections — complete the prescribed course unless your clinician says stop.",
      "Materia does not invent a dose or course length — confirm against current SA STG/EML and the labelled product.",
      "Clarithromycin counselling commonly includes interaction checks with many medicines and reporting severe diarrhoea or unusual heartbeats.",
      "Tell your pharmacist about all other medicines, including heart rhythm and cholesterol products.",
      "Ask what incomplete improvement or yellow eyes should trigger review rather than extending alone.",
      "If severe rash with blistering, yellow eyes, fainting, or trouble breathing develops — seek emergency care.",
    ],
    [
      "I-clarithromycin i-antibiotic ye-macrolide esetshenziselwa izifo ezikhethiwe zamagciwane — qeda inkambu ebiyaliwe ngaphandle uma udokotela ethi uyeke.",
      "I-Materia ayiqambi umthamo noma ubude benkambu — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Ukuelulekwa kwe-clarithromycin kuvame ukufaka ukuhlola ukusebenzisana namaphilisi amaningi nokubika uhudo olukhulu noma ukushaya kwenhliziyo okungajwayelekile.",
      "Tshela umkhiqizi ngawo wonke amanye amaphilisi, kuhlanganise imikhiqizo yesigqi senhliziyo neye-cholesterol.",
      "Buza ukuthi yikuphi ukungathuthuki okuphelele noma amehlo aphuzi okufanele kuqale ukubuyekezwa kunokwelula wedwa.",
      "Uma ukuqubuka okukhulu okunamaqhuma, amehlo aphuzi, ukuwa, noma ubunzima bokuphefumula kuvela — funa usizo oluphuthumayo.",
    ],
    [
      "Klaritromisien is 'n makrolied-antibiotikum vir geselekteerde bakteriële infeksies — voltooi die voorgeskrewe kuur tensy jou klinikus sê stop.",
      "Materia versin nie 'n dosis of kuurduur nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Klaritromisien-berading sluit algemeen wisselwerkingskontroles met baie medisyne in en rapportering van ernstige diarree of ongewone hartklop.",
      "Sê vir jou apteker van alle ander medisyne, insluitend hartritme- en cholesterolprodukte.",
      "Vra watter onvolledige verbetering of geel oë hersiening moet sneller eerder as alleen te verleng.",
      "As ernstige uitslag met blase, geel oë, floute of asemnood ontwikkel — soek noodhulp.",
    ],
    [
      "Clarithromycin ke antibiotic ea macrolide e sebelisoang bakeng sa tšoaetso tse khethiloeng tsa baktheria — qeta thuto e ngotsoeng ntle le haeba ngaka e re emisa.",
      "Materia ha e iqape tekanyo kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Tlhabollo ea clarithromycin hangata e kenyelletsa litlhahlobo tsa tšebelisano le meriana e mengata le ho tlaleha letšollo le matla kapa ho otla ha pelo ho sa tloaelehang.",
      "Bolella rakhemisi ka meriana eohle e meng, ho kenyeletsoa lihlahisoa tsa morethetho oa pelo le tsa cholesterol.",
      "Botsa hore na ke ntlafatso life e sa feleng kapa mahlo a mosehla a lokelang ho qala tlhahlobo ho e-na le ho atolosa u le mong.",
      "Haeba lekhopho le matla le li-blister, mahlo a mosehla, ho akheha, kapa ho hema thata ho hlaha — batla thuso ea tšohanyetso.",
    ],
    [
      "I-clarithromycin yi-antibiotic ye-macrolide esetyenziselwa izifo ezikhethiweyo zebhaktheria — gqiba ikhosi ebalisiweyo ngaphandle kokuba ugqirha athi yeka.",
      "I-Materia ayiyiqiqi idosi okanye ubude bekhosi — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Ukucebisa nge-clarithromycin kuhlala kubandakanya ukujonga ukusebenzisana namayeza amaninzi nokubika urhudo olunzima okanye ukubetha kwentliziyo okungaqhelekanga.",
      "Xelela usokhemisti ngawo onke amanye amayeza, kuquka iimveliso zesingqisho sentliziyo neze-cholesterol.",
      "Buza ukuba kukuphi ukungaphucuki okupheleleyo okanye amehlo atyheli okufuneka kuqalise ukujongwa kunokwandisa wedwa.",
      "Ukuba irhashalala enzima enamqhuma, amehlo atyheli, ukuwa, okanye ubunzima bokuphefumla kuvela — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-pantoprazole": five(
    [
      "Pantoprazole is a PPI used to reduce stomach acid in selected reflux and ulcer pathways — take it exactly as the labelled product directs, often before food.",
      "Materia does not invent a dose or treatment length — confirm timing against the labelled product and pharmacist advice.",
      "PPI counselling commonly includes completing the planned course and reporting ongoing heartburn, black stools, or unexplained weight loss.",
      "Tell your pharmacist about all other medicines — some need timing or interaction checks against the labelled product.",
      "Ask what persistent symptoms should trigger review rather than prolonging alone.",
      "If you vomit blood, pass black stools, get severe chest pain, or sudden shortness of breath — seek emergency care.",
    ],
    [
      "I-pantoprazole i-PPI esetshenziselwa ukunciphisa i-asidi yesisu ezindleleni ezikhethiwe ze-reflux nezesilonda — thatha njengoba umkhiqizo onelebula uyala, ngokuvamile ngaphambi kokudla.",
      "I-Materia ayiqambi umthamo noma ubude bokwelashwa — qinisekisa isikhathi nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Ukuelulekwa kwe-PPI kuvame ukufaka ukuqeda inkambu ehleliwe nokubika ukusha kwesifuba okuqhubekayo, okubomvu kwamathumbu, noma ukulahlekelwa yisisindo okungachazeki.",
      "Tshela umkhiqizi ngawo wonke amanye amaphilisi — amanye adinga ukuhlolwa kwesikhathi nokusebenzisana nomkhiqizo onelebula.",
      "Buza ukuthi yiziphi izimpawu eziqhubekayo okufanele kuqale ukubuyekezwa kunokwelula wedwa.",
      "Uma uhlanza igazi, udlulisa okubomvu kwamathumbu, uthola ubuhlungu besifuba obukhulu, noma ukuphefumula okufushane okuzumayo — funa usizo oluphuthumayo.",
    ],
    [
      "Pantoprasool is 'n PPI om maagsuur in geselekteerde refluks- en ulkuspaaie te verminder — neem dit presies soos die geëtiketteerde produk aandui, dikwels voor kos.",
      "Materia versin nie 'n dosis of behandelingsduur nie — bevestig tydsberekening teen die geëtiketteerde produk en aptekeradvies.",
      "PPI-berading sluit algemeen in om die beplande kuur te voltooi en aanhoudende sooibrand, swart stoelgang of onverklaarde gewigsverlies te rapporteer.",
      "Sê vir jou apteker van alle ander medisyne — sommige benodig tyds- of wisselwerkingskontroles teen die geëtiketteerde produk.",
      "Vra watter aanhoudende simptome hersiening moet sneller eerder as alleen te verleng.",
      "As jy bloed braak, swart stoelgang deurgee, ernstige borspyn kry, of skielike kortasem — soek noodhulp.",
    ],
    [
      "Pantoprazole ke PPI e sebelisoang ho fokotsa asiti ea mpa litseleng tse khethiloeng tsa reflux le leqeba — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela, hangata pele ho lijo.",
      "Materia ha e iqape tekanyo kapa bolelele ba kalafo — netefatsa nako khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Tlhabollo ea PPI hangata e kenyelletsa ho qeta thuto e reriloeng le ho tlaleha ho tjhesa ha sefuba ho tsoelang pele, litšila tse ntšo, kapa tahlehelo ea boima e sa hlaloseng.",
      "Bolella rakhemisi ka meriana eohle e meng — tse ling li hloka litlhahlobo tsa nako kapa tšebelisano khahlanong le sehlahisoa se nang le ileibole.",
      "Botsa hore na ke matšoao afe a tsoelang pele a lokelang ho qala tlhahlobo ho e-na le ho atolosa u le mong.",
      "Haeba u hlatsa mali, u fetisa litšila tse ntšo, u fumana bohloko ba sefuba bo matla, kapa ho hema ha khutšoanyane ka tšohanyetso — batla thuso ea tšohanyetso.",
    ],
    [
      "I-pantoprazole yi-PPI esetyenziselwa ukunciphisa iasidi yesisu kwiindlela ezikhethiweyo ze-reflux nezesilonda — yithathe kanye njengoko imveliso enelebula ikhokela, rhoqo phambi kokutya.",
      "I-Materia ayiyiqiqi idosi okanye ubude bonyango — Qinisekisa ixesha nemveliso enelebula nengcebiso yosokhemisti.",
      "Ukucebisa nge-PPI kuhlala kubandakanya ukugqiba ikhosi ecwangcisiweyo nokubika ukutshisa kwesifuba okuqhubekayo, okumnyama kwamathumbu, okanye ukulahlekelwa bubunzima obungachazekiyo.",
      "Xelela usokhemisti ngawo onke amanye amayeza — ezinye zifuna ukujongwa kwexesha okanye ukusebenzisana nemveliso enelebula.",
      "Buza ukuba zeziphi iimpawu eziqhubekayo ezifuneka ziqalise ukujongwa kunokwandisa wedwa.",
      "Ukuba ugabha igazi, ugqitha okumnyama kwamathumbu, ufumana iintlungu zesifuba ezinkulu, okanye ukuphefumla okufutshane ngequbuliso — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-codeine": five(
    [
      "Codeine is an opioid analgesic used for selected pain and cough pathways — take it exactly as the labelled product directs.",
      "Materia does not invent a dose or maximum daily amount — confirm against the labelled product and pharmacist advice.",
      "Constipation and drowsiness are common counselling points — do not combine with alcohol or other sedatives unless your clinician agrees.",
      "Opioid counselling includes breathing-risk discussions — tell your pharmacist about asthma, sleep apnoea, other opioids, and all cough or pain products you already use.",
      "Ask what constipation plans and driving/safety advice mean while you take this medicine.",
      "If breathing becomes slow or shallow, you cannot be woken easily, or lips turn blue — seek emergency care immediately.",
    ],
    [
      "I-codeine i-opioid analgesic esetshenziswa ezindleleni ezikhethiwe zobuhlungu nokukhwehlela — thatha njengoba umkhiqizo onelebula uyala.",
      "I-Materia ayiqambi umthamo noma inani eliphezulu lansuku zonke — qinisekisa nomkhiqizo onelebula neseluleko somkhiqizi.",
      "Ukubindi nokozela kungamaphuzu ajwayelekile okuelulekwa — ungahlanganisi notshwala noma amanye ama-sedative ngaphandle uma udokotela evuma.",
      "Ukuelulekwa kwe-opioid kufaka izingxoxo zengozi yokuphefumula — tshela umkhiqizi nge-asthma, i-sleep apnoea, amanye ama-opioid, nawo wonke amaphilisi okukhwehlela noma obuhlungu osebenzisayo.",
      "Buza ukuthi izinhlelo zokubindi neseluleko sokushayela/sokuphepha kusho ukuthini ngenkathi uthatha lo muthi.",
      "Uma ukuphefumula kuba kancane noma kufushane, ungavuseki kalula, noma izindebe ziba luhlaza — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Kodeïen is 'n opioïed-analgetikum vir geselekteerde pyn- en hoespaaie — neem dit presies soos die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis of maksimum daaglikse hoeveelheid nie — bevestig teen die geëtiketteerde produk en aptekeradvies.",
      "Hardlywigheid en slaperigheid is algemene beradingspunte — moenie met alkohol of ander kalmeermiddels kombineer nie tensy jou klinikus saamstem.",
      "Opioïedberading sluit asemrisiko-besprekings in — sê vir jou apteker van asma, slaapapnee, ander opioïede, en alle hoes- of pynprodukte wat jy reeds gebruik.",
      "Vra wat hardlywigheidsplanne en bestuurs-/veiligheidsadvies beteken terwyl jy hierdie medisyne neem.",
      "As asemhaling stadig of vlak word, jy nie maklik wakker gemaak kan word nie, of lippe blou word — soek onmiddellik noodhulp.",
    ],
    [
      "Codeine ke opioid analgesic e sebelisoang litseleng tse khethiloeng tsa bohloko le ho khohlela — e nke hantle joalo ka ha sehlahisoa se nang le ileibole se laela.",
      "Materia ha e iqape tekanyo kapa palo e phahameng ea letsatsi le letsatsi — netefatsa khahlanong le sehlahisoa se nang le ileibole le keletso ea rakhemisi.",
      "Ho thatafala le boroko ke lintlha tse tloaelehileng tsa tlhabollo — u se ke ua e kopanya le joala kapa li-sedative tse ling ntle le haeba ngaka e lumela.",
      "Tlhabollo ea opioid e kenyelletsa lipuisano tsa kotsi ea ho hema — bolella rakhemisi ka asthma, sleep apnoea, li-opioid tse ling, le lihlahisoa tsohle tsa ho khohlela kapa tsa bohloko tseo u se u ntse u li sebelisa.",
      "Botsa hore na meralo ea ho thatafala le keletso ea ho khanna/tšireletso li bolela eng ha u nka meriana ena.",
      "Haeba ho hema ho ba butle kapa ho sa tebe, u sitoa ho tsosoa habonolo, kapa melomo e fetoha boputsoa — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-codeine yi-opioid analgesic esetyenziswa kwiindlela ezikhethiweyo zeentlungu nokukhohlela — yithathe kanye njengoko imveliso enelebula ikhokela.",
      "I-Materia ayiyiqiqi idosi okanye inani eliphezulu lemiala yonke — Qinisekisa nemveliso enelebula nengcebiso yosokhemisti.",
      "Ukubindi nokozela ngamanqaku aqhelekileyo okucebisa — ungadibanisi notywala okanye ezinye ii-sedative ngaphandle kokuba ugqirha evuma.",
      "Ukucebisa nge-opioid kubandakanya iingxoxo zomngcipheko wokuphefumla — xelela usokhemisti nge-asthma, i-sleep apnoea, amanye ama-opioid, kunye nazo zonke iimveliso zokukhohlela okanye zeentlungu osebenzisayo.",
      "Buza ukuba izicwangciso zokubindi nengcebiso yokuqhuba/yokhuseleko zithetha ntoni ngelixa uthatha eli yeza.",
      "Ukuba ukuphefumla kuba kancinci okanye kufutshane, awuvuki lula, okanye imilebe iba luhlaza — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),
};
