/**
 * v170–v179 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V170_TO_V179: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-esomeprazole": five(
    [
      "Take this proton-pump inhibitor exactly as directed on your labelled product — many products are best before food; confirm the label.",
      "Esomeprazole counselling commonly includes not crushing delayed-release pellets unless the labelled product allows. Materia does not invent a dose or meal clock.",
      "Tell your pharmacist about all antifungals, HIV medicines, clopidogrel plans, and long-term use questions on your care plan.",
      "Report black stools, coffee-ground vomit, severe diarrhoea, or new unexplained fractures early for clinician review.",
      "Ask how long the course should run on your care plan — do not invent a stop date or a rebound plan.",
      "If you get severe allergic swelling, trouble breathing, or vomiting blood — seek emergency care.",
    ],
    [
      "Sebenzisa le proton-pump inhibitor njengoba kubhalwe kumkhiqizo onelebula — imikhiqizo eminingi ilungile ngaphambi kokudla; qinisekisa ilebula.",
      "Ukwelulekwa kwe-esomeprazole kuvame ukufaka ukungachobozi ama-pellet e-delayed-release ngaphandle kokuvuma kwelebula. I-Materia ayiqambi umthamo noma iwashi lokudla.",
      "Tshela umkhiqizi ngawo wonke ama-antifungal, amaphilisi e-HIV, izinhlelo ze-clopidogrel, nemibuzo yokusebenzisa isikhathi eside ohlelweni lwakho.",
      "Bika izindlebe ezimnyama, ukuhlanza okufana nekofi, ukuhuda okukhulu, noma ukuphuka okungachazeki ngokushesha ukuze kubuyekezwe kudokotela.",
      "Buza ukuthi inkambo kufanele iqhubeke isikhathi esingakanani ohlelweni lwakho — ungayiqiqi usuku lokuyeka noma uhlelo lokubuyela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuphefumula kanzima, noma ukuhlanza igazi — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie protonpompinhibitor soos op die geëtiketteerde produk aangedui — baie produkte werk die beste voor kos; bevestig die etiket.",
      "Esomeprazole-berading sluit dikwels in om vertraagde-vrystelling-korrels nie te vergruis nie tensy die geëtiketteerde produk dit toelaat. Materia versin nie ’n dosis of maaltydklok nie.",
      "Sê vir jou apteker van alle antimikotika, MIV-medisyne, clopidogrel-planne, en langtermyn-gebruikvrae op jou sorgplan.",
      "Rapporteer swart stoelgang, koffiegrond-braking, ernstige diarree, of nuwe onverklaarde frakture vroeg vir klinikus-hersiening.",
      "Vra hoe lank die kuur op jou sorgplan moet loop — moenie ’n stopdatum of terugslagplan versin nie.",
      "As jy ernstige allergiese swelling, asemhalingsprobleme, of bloed braking kry — soek noodhulp.",
    ],
    [
      "Sebelisa proton-pump inhibitor ena hantle kamoo e hlalositsoeng holabel — lihlahiswa tse ngata li sebetsa hantle pele ho lijo; netefatsa leibole.",
      "Keletso ea esomeprazole hangata e kenyelletsa ho se silafatse li-pellet tsa delayed-release ntle le tumello ea leibole. Materia ha e iqape tekanyo kapa nako ea lijo.",
      "Bolella rakhemisi ka li-antifungal tsohle, meriana ea HIV, merero ea clopidogrel, le lipotso tsa tšebeliso ea nako e telele moralong oa hau.",
      "Tlaleha litšila tse ntšo, ho hlatsa ho kang kofi, letšollo le matla, kapa ho robeha ho sa hlaloseng ho hoha kapele bakeng sa tlhahlobo ea ngaka.",
      "Botsa hore thuto e lokela ho tsoela pele nako e kae moralong oa hau — se ke oa iqapa letsatsi la ho emisa kapa moralo oa ho khutla.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho hema thata, kapa ho hlatsa mali — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le proton-pump inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iimveliso ezininzi zisebenza ngcono phambi kokutya; qinisekisa ileyibhile.",
      "Iingcebiso ze-esomeprazole zihlala zibandakanya ukungatyumzi iipellet ze-delayed-release ngaphandle kokuvuma kweleyibhile. I-Materia ayiyiqiqi idosi okanye iwotshi yokutya.",
      "Xelela usokhemisti ngazo zonke ii-antifungal, amayeza e-HIV, izicwangciso ze-clopidogrel, nemibuzo yokusetyenziswa ixesha elide kwisicwangciso sakho.",
      "Xela izindlebe ezimnyama, ukuhlanza okufana nekofu, urhudo olunzima, okanye ukwaphuka okungachazekiyo kwangoko ukuze kujongwe kugqirha.",
      "Buza indlela ikhosi ekufanele iqhubeke ngayo kwisicwangciso sakho — sukuyiqqa umhla wokuyeka okanye isicwangciso sokubuyela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, uxinzelelo lokuphefumla, okanye ukuhlanza igazi — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-bisacodyl": five(
    [
      "Take this stimulant laxative exactly as directed on your labelled product — tablets and enemas differ; confirm the form you were given.",
      "Bisacodyl counselling commonly includes cramps and urgency — do not exceed the labelled course without clinician advice. Materia does not invent a dose or bowel target.",
      "Tell your pharmacist about bowel obstruction concerns, severe abdominal pain, and all other laxatives you use.",
      "Drink fluids as your clinician or labelled product advises — do not invent a fluid schedule.",
      "Report blood in stool, severe dehydration, or no bowel movement with worsening pain early.",
      "If you get fainting, severe vomiting with inability to keep fluids, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le stimulant laxative njengoba kubhalwe kumkhiqizo onelebula — amaphilisi nama-enema ayahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-bisacodyl kuvame ukufaka izinjiva nokuphuthuma — ungadluli inkambo yelebula ngaphandle kwezeluleko zedokotela. I-Materia ayiqambi umthamo noma umgomo wamathumbu.",
      "Tshela umkhiqizi ngezinkinga zokuvinjwa kwamathumbu, ubuhlungu besisu obukhulu, nawo wonke amanye ama-laxative.",
      "Phuza uketshezi njengoba udokotela noma umkhiqizo onelebula ecelile — ungayiqiqi uhlelo loketshezi.",
      "Bika igazi endlebeni, ukoma okukhulu, noma ukungayi endleleni nobuhlungu obuya ngokushesha.",
      "Uma uthola ukuwa, ukuhlanza okukhulu nokungakwazi ukugcina uketshezi, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie stimulerende lakseermiddel soos op die geëtiketteerde produk aangedui — tablette en enemas verskil; bevestig die vorm wat jy ontvang het.",
      "Bisacodyl-berading sluit dikwels krampe en dringendheid in — moenie die geëtiketteerde kuur oorskry sonder klinikus-advies nie. Materia versin nie ’n dosis of dermteiken nie.",
      "Sê vir jou apteker van dermobstruksie-kommer, ernstige buikpyn, en alle ander lakseermiddels wat jy gebruik.",
      "Drink vloeistowwe soos jou klinikus of geëtiketteerde produk adviseer — moenie ’n vloeistofskedule versin nie.",
      "Rapporteer bloed in stoelgang, ernstige dehidrasie, of geen stoelgang met erger wordende pyn vroeg.",
      "As jy floute, ernstige braking met onvermoë om vloeistowwe te hou, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa stimulant laxative ena hantle kamoo e hlalositsoeng holabel — litafole le li-enema lia fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea bisacodyl hangata e kenyelletsa ho opeloa le potlako — se ke oa feta thuto ea leibole ntle le keletso ea ngaka. Materia ha e iqape tekanyo kapa sepheo sa mala.",
      "Bolella rakhemisi ka mathata a ho thibeloa ha mala, bohloko ba mpeng bo matla, le li-laxative tsohle tse ling.",
      "Noa maro kamoo ngaka kapa sehlahiswa se nang le leibole e eletsang — se ke oa iqapa kemiso ea maro.",
      "Tlaleha mali litšileng, ho oma ho matla, kapa ho se ee ntloaneng ka bohloko bo mpefalang kapele.",
      "Haeba u akheha, u hlatsa haholo 'me u sitoa ho boloka maro, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le stimulant laxative ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iipilisi nee-enema ziyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-bisacodyl zihlala zibandakanya iziqaqambo nokungxama — sukugqitha ikhosi yeleyibhile ngaphandle kweengcebiso zogqirha. I-Materia ayiyiqiqi idosi okanye usukelo lwamathumbu.",
      "Xelela usokhemisti ngeenkxalabo zokuthintelwa kwamathumbu, iintlungu zesisu ezinzima, nazo zonke ezinye ii-laxative.",
      "Sela ulwelo njengoko ugqirha okanye imveliso eneleyibhile icebisa — sukuyiqqa ishedyuli yolwelo.",
      "Xela igazi kwizindlebe, ukoma okunzima, okanye ukungayi endlwini yangasese neentlungu ezimbiayo kwangoko.",
      "Ukuba uya, uhlanza kakhulu ungakwazi ukugcina ulwelo, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-hyoscine-butylbromide": five(
    [
      "Take this antispasmodic exactly as directed on your labelled product — it eases cramp-type gut pain; it is not an antibiotic.",
      "Hyoscine butylbromide counselling commonly includes dry mouth, blurred vision, and constipation discussions. Materia does not invent a dose or pain score.",
      "Tell your pharmacist about glaucoma, prostate trouble, bowel obstruction concerns, and all other anticholinergic medicines.",
      "Avoid driving if vision blurs or you feel drowsy until you know your response.",
      "Report inability to pass urine, severe constipation, or worsening unexplained abdominal pain early.",
      "If you get eye pain with vision loss, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antispasmodic njengoba kubhalwe kumkhiqizo onelebula — ithulisa ubuhlungu bezinjiva zesu; akuyona i-antibiotic.",
      "Ukwelulekwa kwe-hyoscine butylbromide kuvame ukufaka umlomo owomile, ukubona okufiphele, nokuxoxa ngokuqina kwamathumbu. I-Materia ayiqambi umthamo noma isikali sobuhlungu.",
      "Tshela umkhiqizi nge-glaucoma, izinkinga ze-prostate, ukuvinjwa kwamathumbu, nawo wonke amanye ama-anticholinergic.",
      "Gwema ukushayela uma ukubona kufiphele noma uozela kuze wazi impendulo yakho.",
      "Bika ukungakwazi ukuchama, ukuqina kwamathumbu okukhulu, noma ubuhlungu besisu obungachazeki ngokushesha.",
      "Uma uthola ubuhlungu beso nokulahlekelwa ukubona, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antispasmodikum soos op die geëtiketteerde produk aangedui — dit verlig kramptipe dermpyn; dit is nie ’n antibiotikum nie.",
      "Hiosienbutylbromied-berading sluit dikwels droë mond, dowwe sig, en hardlywigheidbesprekings in. Materia versin nie ’n dosis of pyntelling nie.",
      "Sê vir jou apteker van gloukoom, prostaatprobleme, dermobstruksie-kommer, en alle ander anticholinergiese medisyne.",
      "Vermy bestuur as sig dowwe word of jy slaperig voel totdat jy jou reaksie ken.",
      "Rapporteer onvermoë om urine te passeer, ernstige hardlywigheid, of erger wordende onverklaarde buikpyn vroeg.",
      "As jy oorpyn met sigverlies, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antispasmodic ena hantle kamoo e hlalositsoeng holabel — e kokobetsa bohloko ba ho opeloa ha mala; ha se antibiotic.",
      "Keletso ea hyoscine butylbromide hangata e kenyelletsa molomo o omeletseng, pono e lerootho, le lipuisano tsa ho thatafala ha mala. Materia ha e iqape tekanyo kapa lintlha tsa bohloko.",
      "Bolella rakhemisi ka glaucoma, mathata a prostate, ho thibeloa ha mala, le meriana e meng ea anticholinergic.",
      "Qoba ho khanna haeba pono e lerootho kapa u otsela ho fihlela u tseba karabelo ea hau.",
      "Tlaleha ho sitoa ho ntša moroto, ho thatafala ha mala ho matla, kapa bohloko ba mpeng bo sa hlaloseng bo mpefalang kapele.",
      "Haeba u fumana bohloko ba leihlo ka tahlehelo ea pono, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antispasmodic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ithomalalisa iintlungu zeziqaqambo zamathumbu; ayiyonto i-antibiotic.",
      "Iingcebiso ze-hyoscine butylbromide zihlala zibandakanya umlomo owomileyo, ukubona okufipheleyo, neengxoxo zokuqina kwamathumbu. I-Materia ayiyiqiqi idosi okanye amanqaku eentlungu.",
      "Xelela usokhemisti nge-glaucoma, iingxaki ze-prostate, ukuthintelwa kwamathumbu, nazo zonke ezinye ii-anticholinergic.",
      "Pepa ukuqhuba ukuba ukubona kuyafiphala okanye uyalala de uyazi impendulo yakho.",
      "Xela ukungakwazi ukuchama, ukuqina kwamathumbu okunzima, okanye iintlungu zesisu ezingachazekiyo ezimbiayo kwangoko.",
      "Ukuba ufumana iintlungu zeliso kunye nokulahlekelwa kukubona, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-mesalazine": five(
    [
      "Take this 5-ASA bowel medicine exactly as directed on your labelled product — tablets, granules, and enemas are not interchangeable without advice.",
      "Mesalazine counselling commonly includes completing the labelled regimen even when flares settle, and reporting unexplained fever. Materia does not invent a dose or flare schedule.",
      "Tell your pharmacist about sulfa allergy history, kidney disease, and all other IBD medicines on your list.",
      "Report worsening bloody diarrhoea, severe abdominal pain, rash, or yellow eyes early.",
      "Ask how delayed-release or pH-dependent products should be swallowed — do not crush unless the labelled product allows.",
      "If you get severe allergic swelling, trouble breathing, or collapse with fever — seek emergency care.",
    ],
    [
      "Sebenzisa le 5-ASA yamathumbu njengoba kubhalwe kumkhiqizo onelebula — amaphilisi, ama-granule, nama-enema awashintshani ngaphandle kwezeluleko.",
      "Ukwelulekwa kwe-mesalazine kuvame ukufaka ukuqedela uhlelo lwelebula noma ukuvutha kuyathamba, nokubika umkhuhlane ongachazeki. I-Materia ayiqambi umthamo noma uhlelo lokuvutha.",
      "Tshela umkhiqizi ngomlando we-allergy ye-sulfa, isifo sezinso, nawo wonke amanye amaphilisi e-IBD.",
      "Bika ukuhuda kwegazi okuya ngokuba kubi, ubuhlungu besisu obukhulu, ukuqubuka, noma amehlo aphuzi ngokushesha.",
      "Buza ukuthi imikhiqizo ye-delayed-release noma e-pH-dependent kufanele igwinywe kanjani — ungachobozi ngaphandle kokuvuma kwelebula.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuphefumula kanzima, noma ukuwa nomkhuhlane — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie 5-ASA-dermmedisyne soos op die geëtiketteerde produk aangedui — tablette, korrels en enemas is nie uitruilbaar sonder advies nie.",
      "Mesalazine-berading sluit dikwels in om die geëtiketteerde regimen te voltooi selfs wanneer opvlammings bedaar, en onverklaarde koors te rapporteer. Materia versin nie ’n dosis of opvlammingskedule nie.",
      "Sê vir jou apteker van sulfa-allergiegeskiedenis, niersiekte, en alle ander IBD-medisyne op jou lys.",
      "Rapporteer erger wordende bloedige diarree, ernstige buikpyn, uitslag, of geel oë vroeg.",
      "Vra hoe vertraagde-vrystelling of pH-afhanklike produkte ingesluk moet word — moenie vergruis tensy die geëtiketteerde produk dit toelaat nie.",
      "As jy ernstige allergiese swelling, asemhalingsprobleme, of ineenstorting met koors kry — soek noodhulp.",
    ],
    [
      "Sebelisa 5-ASA ea mala hantle kamoo e hlalositsoeng holabel — litafole, li-granule, le li-enema ha li fapanyetsanoe ntle le keletso.",
      "Keletso ea mesalazine hangata e kenyelletsa ho qeta regimen ea leibole leha ho bela ho kokobela, le ho tlaleha feberu e sa hlaloseng. Materia ha e iqape tekanyo kapa kemiso ea ho bela.",
      "Bolella rakhemisi ka histori ea allergy ea sulfa, lefu la liphio, le meriana e meng ea IBD lenaneng la hau.",
      "Tlaleha letšollo la mali le mpefalang, bohloko ba mpeng bo matla, lekhopho, kapa mahlo a mosehla kapele.",
      "Botsa hore lihlahiswa tsa delayed-release kapa tse itšetlehileng ho pH li lokela ho kenngoa joang — se ke oa silafatsa ntle le tumello ea leibole.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho hema thata, kapa ho oa ka feberu — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le 5-ASA yamathumbu ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iipilisi, iigranule, nee-enema azitshintshani ngaphandle kweengcebiso.",
      "Iingcebiso ze-mesalazine zihlala zibandakanya ukugqiba irejimeni yeleyibhile nokuba ukuvutha kuyathomalala, nokuxela umkhuhlane ongachazekiyo. I-Materia ayiyiqiqi idosi okanye ishedyuli yokuvutha.",
      "Xelela usokhemisti ngembali ye-allergy ye-sulfa, isifo sezintso, nazo zonke ezinye ii-IBD kuluhlu lwakho.",
      "Xela urhudo lwegazi olubiayo, iintlungu zesisu ezinzima, irhashalala, okanye amehlo atyheli kwangoko.",
      "Buza indlela iimveliso ze-delayed-release okanye ezixhomekeke kwi-pH ezifanele ziginye ngayo — sukutyumza ngaphandle kokuvuma kweleyibhile.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, uxinzelelo lokuphefumla, okanye ukuwa nomkhuhlane — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-beclometasone": five(
    [
      "Use this inhaled corticosteroid exactly as directed on your labelled product — rinse mouth after inhaled doses if the product advises.",
      "Beclometasone counselling commonly includes preventer versus reliever roles — it is not a sudden-relief rescue inhaler unless your clinician says otherwise. Materia does not invent a puff count or step-up plan.",
      "Tell your pharmacist about oral thrush symptoms, voice changes, and whether a spacer is part of your technique plan.",
      "Report worsening wheeze, night waking, or needing your reliever more often early for clinician review.",
      "Ask how to prime and clean your device on the labelled product — do not invent a cleaning schedule.",
      "If lips turn blue, speaking becomes hard, or breathing collapses suddenly — seek emergency care and use your written action plan.",
    ],
    [
      "Sebenzisa le inhaled corticosteroid njengoba kubhalwe kumkhiqizo onelebula — xubha umlomo ngemva kwemithamo yokuphefumula uma umkhiqizo ucebisa.",
      "Ukwelulekwa kwe-beclometasone kuvame ukufaka indima ye-preventer ne-reliever — akuyona i-rescue inhaler ephuthumayo ngaphandle kokusho kukadokotela. I-Materia ayiqambi inani lamaphafu noma uhlelo lokunyuka.",
      "Tshela umkhiqizi ngezimpawu ze-thrush yomlomo, ukushintsha kwezwi, nokuthi i-spacer iyingxenye yohlelo lwakho lokusebenzisa.",
      "Bika ukubhobha okuya ngokuba kubi, ukuvuka ebusuku, noma ukudinga i-reliever kaningi ngokushesha ukuze kubuyekezwe kudokotela.",
      "Buza ukuthi ungayi-prime futhi uhlanze kanjani idivayisi kumkhiqizo onelebula — ungayiqiqi uhlelo lokuhlanzwa.",
      "Uma izindebe ziba luhlaza, ukukhuluma kuba nzima, noma ukuphefumula kuba nzima ngokuzumayo — funa usizo oluphuthumayo usebenzise uhlelo lwakho olubhaliwe.",
    ],
    [
      "Gebruik hierdie geïnhaleerde kortikosteroïed soos op die geëtiketteerde produk aangedui — spoel die mond ná geïnhaleerde dosisse as die produk dit adviseer.",
      "Beclometasoon-berading sluit dikwels voorkomer- versus verligterrolle in — dit is nie ’n skielike-verligting-reddingsinhaler nie tensy jou klinikus anders sê. Materia versin nie ’n puf-telling of opgraderingsplan nie.",
      "Sê vir jou apteker van mondsproei-simptome, stemveranderinge, en of ’n spacer deel van jou tegniekplan is.",
      "Rapporteer erger wordende piep, nagwakker word, of meer gereelde verligtergebruik vroeg vir klinikus-hersiening.",
      "Vra hoe om jou toestel op die geëtiketteerde produk te prime en skoon te maak — moenie ’n skoonmaakskedule versin nie.",
      "As lippe blou word, praat moeilik word, of asemhaling skielik ineenstort — soek noodhulp en gebruik jou geskrewe aksieplan.",
    ],
    [
      "Sebelisa inhaled corticosteroid ena hantle kamoo e hlalositsoeng holabel — hlatsoa molomo ka mor'a litekanyo tsa ho hema haeba sehlahiswa se eletsa.",
      "Keletso ea beclometasone hangata e kenyelletsa karolo ea preventer le reliever — ha se rescue inhaler ea tšohanyetso ntle le ha ngaka e re joalo. Materia ha e iqape palo ea liphofu kapa moralo oa ho nyolohela.",
      "Bolella rakhemisi ka matšoao a thrush ea molomo, liphetoho tsa lentsoe, le hore na spacer ke karolo ea moralo oa hau oa mokhoa.",
      "Tlaleha ho lla ha matšoa a mpefalang, ho tsoha bosiu, kapa ho hloka reliever hangata kapele bakeng sa tlhahlobo ea ngaka.",
      "Botsa hore u ka prime le ho hloekisa sesebelisoa joang holabel — se ke oa iqapa kemiso ea ho hloekisa.",
      "Haeba melomo e fetoha boputsoa, ho bua ho thatafala, kapa ho hema ho oa ka tšohanyetso — batla thuso ea tšohanyetso 'me u sebelise moralo oa hau o ngotsoeng.",
    ],
    [
      "Sebenzisa le inhaled corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — hlamba umlomo emva kweedosi zokuphefumla ukuba imveliso icebisa.",
      "Iingcebiso ze-beclometasone zihlala zibandakanya iindima ze-preventer ne-reliever — ayiyonto i-rescue inhaler ekhawulezayo ngaphandle kokuba ugqirha athi kunjalo. I-Materia ayiyiqiqi inani leepafu okanye isicwangciso sokunyuka.",
      "Xelela usokhemisti ngeempawu ze-thrush yomlomo, utshintsho lwelizwi, nokuba i-spacer iyinxalenye yesicwangciso sakho sobuchule.",
      "Xela ukurhotyo olubiayo, ukuvuka ebusuku, okanye ukufuna i-reliever rhoqo kwangoko ukuze kujongwe kugqirha.",
      "Buza indlela yokuprime nokucoca isixhobo sakho kwileyibhile — sukuyiqqa ishedyuli yokucoca.",
      "Ukuba imilebe iba luhlaza, ukuthetha kuba nzima, okanye ukuphefumla kuwa ngequbuliso — funa uncedo olungxamisekileyo usebenzise isicwangciso sakho esibhaliweyo.",
    ],
  ),

  "mol-formoterol": five(
    [
      "Use this long-acting beta-agonist exactly as directed on your labelled product — alone or in a combination inhaler as prescribed.",
      "Formoterol counselling commonly includes not using it as the only asthma controller unless your clinician’s plan says so. Materia does not invent a puff count or step-up plan.",
      "Tell your pharmacist about heart rhythm history, tremor, and ALL other inhalers or nebuliser medicines on your list.",
      "Report chest pain, palpitations, worsening wheeze, or needing rescue more often early.",
      "Ask how this fits with your inhaled steroid preventer — do not invent a solo controller regimen.",
      "If breathing collapses, lips turn blue, or you cannot speak full sentences — seek emergency care and follow your written action plan.",
    ],
    [
      "Sebenzisa le long-acting beta-agonist njengoba kubhalwe kumkhiqizo onelebula — wedwa noma kuhlanganiswe ne-inhaler njengoba kunikiwe.",
      "Ukwelulekwa kwe-formoterol kuvame ukufaka ukungayisebenzisi iyodwa njenge-controller ye-asthma ngaphandle kohlelo lukadokotela. I-Materia ayiqambi inani lamaphafu noma uhlelo lokunyuka.",
      "Tshela umkhiqizi ngomlando wesivinini senhliziyo, ukuthuthumela, NAWO WONKE amanye ama-inhaler noma amaphilisi e-nebuliser.",
      "Bika ubuhlungu besifuba, ukushaya kwenhliziyo, ukubhobha okuya ngokuba kubi, noma ukudinga i-rescue kaningi ngokushesha.",
      "Buza ukuthi lokhu kuhambisana kanjani ne-inhaled steroid preventer yakho — ungayiqiqi uhlelo lwe-controller eyedwa.",
      "Uma ukuphefumula kuba nzima, izindebe ziba luhlaza, noma ungakwazi ukukhuluma imisho ephelele — funa usizo oluphuthumayo ulandele uhlelo lwakho olubhaliwe.",
    ],
    [
      "Gebruik hierdie lankwerkende beta-agonis soos op die geëtiketteerde produk aangedui — alleen of in ’n kombinasie-inhaler soos voorgeskryf.",
      "Formoterol-berading sluit dikwels in om dit nie as die enigste asma-beheerder te gebruik nie tensy jou klinikus se plan so sê. Materia versin nie ’n puf-telling of opgraderingsplan nie.",
      "Sê vir jou apteker van hartritmegeskiedenis, bewing, en ALLE ander inhalers of vernevelaar-medisyne op jou lys.",
      "Rapporteer borspyn, hartklopgings, erger wordende piep, of meer gereelde reddingsgebruik vroeg.",
      "Vra hoe dit by jou geïnhaleerde steroïed-voorkomer pas — moenie ’n solo-beheerder-regimen versin nie.",
      "As asemhaling ineenstort, lippe blou word, of jy nie vol sinne kan praat nie — soek noodhulp en volg jou geskrewe aksieplan.",
    ],
    [
      "Sebelisa long-acting beta-agonist ena hantle kamoo e hlalositsoeng holabel — u le mong kapa ka combination inhaler kamoo e ngotsoeng.",
      "Keletso ea formoterol hangata e kenyelletsa ho se e sebelise e le eona feela e laolang asthma ntle le moralo oa ngaka. Materia ha e iqape palo ea liphofu kapa moralo oa ho nyolohela.",
      "Bolella rakhemisi ka histori ea morethetho oa pelo, ho thothomela, le LI-INHALER KAPA MERIANA EA NEBULISER EOHLE lenaneng la hau.",
      "Tlaleha bohloko ba sefuba, ho otla ha pelo, ho lla ha matšoa a mpefalang, kapa ho hloka rescue hangata kapele.",
      "Botsa hore sena se tšoana joang le inhaled steroid preventer ea hau — se ke oa iqapa regimen ea controller e le 'ngoe.",
      "Haeba ho hema ho oa, melomo e fetoha boputsoa, kapa u sitoa ho bua lipolelo tse felletseng — batla thuso ea tšohanyetso 'me u latele moralo oa hau o ngotsoeng.",
    ],
    [
      "Sebenzisa le long-acting beta-agonist ngokuchanekileyo njengoko kubhaliwe kwileyibhile — wedwa okanye kwikombination inhaler njengoko kunikiwe.",
      "Iingcebiso ze-formoterol zihlala zibandakanya ukungayisebenzisi iyodwa njenge-controller ye-asthma ngaphandle kwesicwangciso sogqirha. I-Materia ayiyiqiqi inani leepafu okanye isicwangciso sokunyuka.",
      "Xelela usokhemisti ngembali yesingqisho sentliziyo, ukungcangcazela, NAZO ZONKE ezinye ii-inhaler okanye amayeza e-nebuliser kuluhlu lwakho.",
      "Xela iintlungu zesifuba, ukubetha kwentliziyo, ukurhotyo olubiayo, okanye ukufuna i-rescue rhoqo kwangoko.",
      "Buza indlela oku kuhambelana ngayo ne-inhaled steroid preventer yakho — sukuyiqqa irejimeni ye-controller eyedwa.",
      "Ukuba ukuphefumla kuwa, imilebe iba luhlaza, okanye awukwazi ukuthetha izivakalisi ezigcweleyo — funa uncedo olungxamisekileyo ulandele isicwangciso sakho esibhaliweyo.",
    ],
  ),

  "mol-meloxicam": five(
    [
      "Take this NSAID exactly as directed on your labelled product — often with food for stomach comfort; confirm the label.",
      "Meloxicam counselling commonly includes stomach bleed and kidney caution, especially with other NSAIDs or blood thinners. Materia does not invent a dose or pain score.",
      "Tell your pharmacist about ulcer history, heart or kidney disease, pregnancy plans, and ALL other pain or anti-inflammatory medicines.",
      "Avoid combining with other over-the-counter NSAIDs unless your clinician agrees — check the labelled product.",
      "Report black stools, coffee-ground vomit, swelling of ankles, or reduced urine early.",
      "If you vomit blood, get sudden severe chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le NSAID njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla ukuze isisu sithule; qinisekisa ilebula.",
      "Ukwelulekwa kwe-meloxicam kuvame ukufaka ukopha kwesisu nokuqapha izinto, ikakhulukazi namanye ama-NSAID noma ama-blood thinner. I-Materia ayiqambi umthamo noma isikali sobuhlungu.",
      "Tshela umkhiqizi ngomlando wesilonda, isifo senhliziyo noma sezinso, izinhlelo zokukhulelwa, NAWO WONKE amanye amaphilisi obuhlungu noma okulwa nokuvuvuka.",
      "Gwema ukuhlanganisa namanye ama-NSAID athengwa ngaphandle kophawu ngaphandle kokuvuma kukadokotela — hlola umkhiqizo onelebula.",
      "Bika izindlebe ezimnyama, ukuhlanza okufana nekofi, ukuvuvuka kwamaqakala, noma umchamo omncane ngokushesha.",
      "Uma uhlanza igazi, uthola ubuhlungu besifuba obuzumayo, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie NSAID soos op die geëtiketteerde produk aangedui — dikwels met kos vir maaggemak; bevestig die etiket.",
      "Meloksikam-berading sluit dikwels maagbloeding- en nierversigtigheid in, veral met ander NSAIDs of bloedverdunners. Materia versin nie ’n dosis of pyntelling nie.",
      "Sê vir jou apteker van ulkusgeskiedenis, hart- of niersiekte, swangerskapsplanne, en ALLE ander pyn- of anti-inflammatoriese medisyne.",
      "Vermy kombinasie met ander oor-die-toonbank NSAIDs tensy jou klinikus saamstem — kontroleer die geëtiketteerde produk.",
      "Rapporteer swart stoelgang, koffiegrond-braking, enkelswelling, of verminderde urine vroeg.",
      "As jy bloed braak, skielike ernstige borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa NSAID ena hantle kamoo e hlalositsoeng holabel — hangata le lijo bakeng sa boiketlo ba mpeng; netefatsa leibole.",
      "Keletso ea meloxicam hangata e kenyelletsa tlhokomelo ea ho tsoa mali ka mpeng le liphio, haholo-holo le li-NSAID tse ling kapa li-blood thinner. Materia ha e iqape tekanyo kapa lintlha tsa bohloko.",
      "Bolella rakhemisi ka histori ea leqeba, lefu la pelo kapa liphio, merero ea ho ima, le MERIANA EOHLE ea bohloko kapa e khahlanong le ho ruruha.",
      "Qoba ho kopanya le li-NSAID tse ling tsa over-the-counter ntle le tumellano ea ngaka — hlahloba sehlahiswa se nang le leibole.",
      "Tlaleha litšila tse ntšo, ho hlatsa ho kang kofi, ho ruruha ha maqaqailana, kapa moroto o fokotsehileng kapele.",
      "Haeba u hlatsa mali, u fumana bohloko ba sefuba bo matla ka tšohanyetso, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le NSAID ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya ukuze isisu sithule; qinisekisa ileyibhile.",
      "Iingcebiso ze-meloxicam zihlala zibandakanya ukulumka ngokopha kwesisu neentso, ngakumbi nezinye ii-NSAID okanye ii-blood thinner. I-Materia ayiyiqiqi idosi okanye amanqaku eentlungu.",
      "Xelela usokhemisti ngembali yesilonda, isifo sentliziyo okanye sezintso, izicwangciso zokukhulelwa, NAWO ONKE amanye amayeza eentlungu okanye okulwa nokudumba.",
      "Pepa ukudibanisa nezinye ii-NSAID ezithengwa ngaphandle kophawu ngaphandle kokuvuma kugqirha — jonga imveliso eneleyibhile.",
      "Xela izindlebe ezimnyama, ukuhlanza okufana nekofu, ukudumba kwamaqakala, okanye umchamo omncinci kwangoko.",
      "Ukuba uhlanza igazi, ufumana iintlungu zesifuba ezingxamisekileyo, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-baclofen": five(
    [
      "Take this muscle relaxant exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Baclofen counselling commonly includes drowsiness, dizziness, and falls risk — avoid alcohol unless your clinician agrees. Materia does not invent a dose or titration schedule.",
      "Tell your pharmacist about kidney history, seizure history, and ALL other sedating medicines on your list.",
      "Avoid driving until you know how drowsy you become on this medicine.",
      "Report new confusion, hallucinations, severe weakness, or withdrawal-like symptoms if doses are missed early.",
      "If you seize, cannot be woken, or get trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le muscle relaxant njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-baclofen kuvame ukufaka ukozela, isiyezi, nengozi yokuwela — gwema utshwala ngaphandle kokuvuma kukadokotela. I-Materia ayiqambi umthamo noma uhlelo lokunyuka.",
      "Tshela umkhiqizi ngomlando wezinso, umlando wokuxhuzula, NAWO WONKE amanye amaphilisi aozelisayo.",
      "Gwema ukushayela kuze wazi ukuthi uozela kangakanani kulo mkhiqizo.",
      "Bika ukudideka okusha, ukubona izinto ezingekho, ubuthakathaka obukhulu, noma izimpawu ezifana nokuyeka uma imithamo ilahlekile ngokushesha.",
      "Uma uxhuzula, ungavuswa kalula, noma uphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie spierverslapper soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Baclofen-berading sluit dikwels slaperigheid, duiseligheid en valrisiko in — vermy alkohol tensy jou klinikus saamstem. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Sê vir jou apteker van niergeskiedenis, aanvalsgeskiedenis, en ALLE ander sederende medisyne op jou lys.",
      "Vermy bestuur totdat jy weet hoe slaperig jy op hierdie medisyne word.",
      "Rapporteer nuwe verwarring, hallusinasies, ernstige swakheid, of onttrekkingagtige simptome as dosisse vroeg gemis word.",
      "As jy stuiptrek, nie maklik wakker gemaak kan word nie, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa muscle relaxant ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea baclofen hangata e kenyelletsa ho otsela, ho tsekela, le kotsi ea ho oa — qoba joala ntle le tumellano ea ngaka. Materia ha e iqape tekanyo kapa kemiso ea ho nyolohela.",
      "Bolella rakhemisi ka histori ea liphio, histori ea ho thothomela, le MERIANA EOHLE e otselang lenaneng la hau.",
      "Qoba ho khanna ho fihlela u tseba hore u otsela hakae ka moriana ona.",
      "Tlaleha ho ferekana ho hoha, ho bona lintho tse sieo, bofokoli bo matla, kapa matšoao a kang ho tlohela haeba litekanyo li lahlehile kapele.",
      "Haeba u thothomela, u sitoa ho tsosoa habonolo, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le muscle relaxant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-baclofen zihlala zibandakanya ukozela, isiyezi, nomngcipheko wokuwawa — pepa utywala ngaphandle kokuvuma kugqirha. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyuka.",
      "Xelela usokhemisti ngembali yezintso, imbali yokuxhuzula, NAWO ONKE amanye amayeza aozelisayo kuluhlu lwakho.",
      "Pepa ukuqhuba de uyazi ukuba uyalala kangakanani kweli yeza.",
      "Xela ukudideka okutsha, ukubona izinto ezingekhoyo, ubuthathaka obunzima, okanye iimpawu ezifana nokuyeka ukuba iidosi zilahlekile kwangoko.",
      "Ukuba uyaxhuzula, awuvuswa lula, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-levodopa-carbidopa": five(
    [
      "Take this Parkinson’s combination exactly as directed on your labelled product — timing consistency matters; confirm against the label.",
      "Levodopa–carbidopa counselling commonly includes wearing-off discussions and protein-timing questions with your clinician. Materia does not invent a dose, meal clock, or ON/OFF schedule.",
      "Tell your pharmacist about sudden sleepiness, impulse-control concerns, and ALL other Parkinson’s or antidepressant medicines.",
      "Report uncontrolled movements, fainting on standing, dark urine with severe nausea, or new confusion early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours or a catch-up plan.",
      "If you collapse, seize, get chest pain with trouble breathing, or cannot swallow safely — seek emergency care.",
    ],
    [
      "Sebenzisa le nhlanganisela ye-Parkinson njengoba kubhalwe kumkhiqizo onelebula — ukulingana kwesikhathi kubalulekile; qinisekisa kulebula.",
      "Ukwelulekwa kwe-levodopa–carbidopa kuvame ukufaka izingxoxo zokuphela komphumela nemibuzo yesikhathi samaprotheni kudokotela. I-Materia ayiqambi umthamo, iwashi lokudla, noma uhlelo lwe-ON/OFF.",
      "Tshela umkhiqizi ngokulala okuzumayo, izinkinga zokulawula izinkanuko, NAWO WONKE amanye amaphilisi e-Parkinson noma ama-antidepressant.",
      "Bika ukunyakaza okungalawuleki, ukuwa uma umile, umchamo omnyama nesicanucanu esikhulu, noma ukudideka okusha ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa noma uhlelo lokubuyisela.",
      "Uma uwa, uxhuzula, uthola ubuhlungu besifuba nokuphefumula kanzima, noma ungakwazi ukugwinya ngokuphephile — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie Parkinson-kombinasie soos op die geëtiketteerde produk aangedui — konsekwente tydsberekening is belangrik; bevestig teen die etiket.",
      "Levodopa–carbidopa-berading sluit dikwels uitwerk-besprekings en proteïen-tydsberekeningvrae met jou klinikus in. Materia versin nie ’n dosis, maaltydklok of AAN/AF-skedule nie.",
      "Sê vir jou apteker van skielike slaperigheid, impulsbeheer-kommer, en ALLE ander Parkinson- of antidepressante medisyne.",
      "Rapporteer onbeheerde bewegings, floute by staan, donker urine met ernstige naarheid, of nuwe verwarring vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure of ’n inhaalplan versin nie.",
      "As jy ineenstort, stuiptrek, borspyn met asemhalingsprobleme kry, of nie veilig kan sluk nie — soek noodhulp.",
    ],
    [
      "Sebelisa motsoako ona oa Parkinson hantle kamoo e hlalositsoeng holabel — ho tsitsa ha nako ho bohlokoa; netefatsa holabel.",
      "Keletso ea levodopa–carbidopa hangata e kenyelletsa lipuisano tsa ho felisoa ha phello le lipotso tsa nako ea protheine le ngaka. Materia ha e iqape tekanyo, nako ea lijo, kapa kemiso ea ON/OFF.",
      "Bolella rakhemisi ka ho otsela ka tšohanyetso, mathata a taolo ea litakatso, le MERIANA EOHLE ea Parkinson kapa ea antidepressant.",
      "Tlaleha motsamao o sa laoleheng, ho akheha ha u ema, moroto o lefifi ka ho nyatsa ho matla, kapa ho ferekana ho hoha kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola kapa moralo oa ho tsosolosa.",
      "Haeba u oa, u thothomela, u fumana bohloko ba sefuba ka ho hema thata, kapa u sitoa ho koenya ka polokeho — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le ndibaniselwano ye-Parkinson ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukungaguquguquki kwexesha kubalulekile; qinisekisa kwileyibhile.",
      "Iingcebiso ze-levodopa–carbidopa zihlala zibandakanya iingxoxo zokuphela kwesiphumo nemibuzo yexesha leprotheyini nogqirha. I-Materia ayiyiqiqi idosi, iwotshi yokutya, okanye ishedyuli ye-ON/OFF.",
      "Xelela usokhemisti ngokulala okukhawulezayo, iinkxalabo zokulawula izinkanuko, NAWO ONKE amanye amayeza e-Parkinson okanye ama-antidepressant.",
      "Xela ukunyakaza okungalawulekiyo, ukuwa xa umile, umchamo omnyama nesicanucanu esinzima, okanye ukudideka okutsha kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula okanye isicwangciso sokubuyisela.",
      "Ukuba uwa, uyaxhuzula, ufumana iintlungu zesifuba noxinzelelo lokuphefumla, okanye awukwazi ukuginya ngokukhuselekileyo — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-topiramate": five(
    [
      "Take this antiepileptic / migraine preventer exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Topiramate counselling commonly includes tingling, slowed thinking, and kidney-stone hydration discussions. Materia does not invent a dose, fluid target, or blood-level target.",
      "Tell your pharmacist about pregnancy plans, glaucoma history, kidney stones, and ALL other medicines on your list.",
      "Drink fluids as your clinician advises — do not invent a litre target; report eye pain with vision change early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get sudden vision loss, prolonged seizures, severe confusion, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antiepileptic / migraine preventer njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-topiramate kuvame ukufaka ukuzwela okufana nezilonda, ukucabanga okuhamba kancane, nokuxoxa ngamanzi ezinkangala zezinso. I-Materia ayiqambi umthamo, umgomo woketshezi, noma umgomo weleveli egazini.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, umlando we-glaucoma, amatshe ezinso, NAWO WONKE amanye amaphilisi.",
      "Phuza uketshezi njengoba udokotela ecebisa — ungayiqiqi umgomo wamalitha; bika ubuhlungu beso nokushintsha kokubona ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ukulahlekelwa ukubona okuzumayo, ukuxhuzula okude, ukudideka okukhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antiepileptikum / migraine-voorkomer soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Topiramaat-berading sluit dikwels tinteling, stadiger denke, en niersteen-hidrasiebesprekings in. Materia versin nie ’n dosis, vloeistoefteiken of bloedvlakteiken nie.",
      "Sê vir jou apteker van swangerskapsplanne, gloukoomgeskiedenis, nierstene, en ALLE ander medisyne op jou lys.",
      "Drink vloeistowwe soos jou klinikus adviseer — moenie ’n literteiken versin nie; rapporteer oorpyn met sigverandering vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy skielike sigverlies, langdurige stuiptrekkings, ernstige verwarring, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antiepileptic / migraine preventer ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea topiramate hangata e kenyelletsa ho hlaba, ho nahana butle, le lipuisano tsa ho noa bakeng sa majoe a liphio. Materia ha e iqape tekanyo, sepheo sa maro, kapa sepheo sa level ea mali.",
      "Bolella rakhemisi ka merero ea ho ima, histori ea glaucoma, majoe a liphio, le MERIANA EOHLE e meng.",
      "Noa maro kamoo ngaka e eletsang — se ke oa iqapa sepheo sa lilithara; tlaleha bohloko ba leihlo ka phetoho ea pono kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana tahlehelo ea pono ka tšohanyetso, ho thothomela ho telele, ho ferekana ho matla, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antiepileptic / migraine preventer ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-topiramate zihlala zibandakanya ukuzola, ukucinga okucothayo, neengxoxo zokusela ulwelo ngenxa yamatye ezintso. I-Materia ayiyiqiqi idosi, usukelo lolwelo, okanye usukelo lweleveli yegazi.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, imbali ye-glaucoma, amatye ezintso, NAWO ONKE amanye amayeza kuluhlu lwakho.",
      "Sela ulwelo njengoko ugqirha ecebisa — sukuyiqqa usukelo lweelitha; xela iintlungu zeliso notshintsho lokubona kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana ukulahlekelwa kukubona ngequbuliso, ukuxhuzula okude, ukudideka okunzima, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
