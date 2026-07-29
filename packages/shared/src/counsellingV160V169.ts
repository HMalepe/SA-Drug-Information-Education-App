/**
 * v160–v169 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V160_TO_V169: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-glimepiride": five(
    [
      "Take this sulfonylurea exactly as directed on your labelled product — usually with meals as the label advises.",
      "Sulfonylurea counselling commonly includes hypoglycaemia recognition (sweating, tremor, confusion) — carry your clinician’s hypo plan. Materia does not invent a dose or glucose target.",
      "Tell your pharmacist if you skip meals, drink alcohol, or start new medicines that can affect sugar control.",
      "Ask how illness with reduced eating should be handled on your care plan — do not invent a sick-day schedule.",
      "Report unusual bruising, yellow eyes, or severe prolonged hypoglycaemia early.",
      "If you cannot swallow, seize, lose consciousness, or remain confused after hypo treatment — seek emergency care.",
    ],
    [
      "Sebenzisa le sulfonylurea njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla njengoba ilebula isho.",
      "Ukwelulekwa kwe-sulfonylurea kuvame ukufaka ukwazi i-hypoglycaemia (ukujuluka, ukuthuthumela, ukudideka) — phatha uhlelo lwedokotela lwe-hypo. I-Materia ayiqambi umthamo noma umgomo kashukela.",
      "Tshela umkhiqizi uma ulahlwa ukudla, uphuza utshwala, noma uqala amaphilisi amasha angaphazamisa ukulawula ushukela.",
      "Buza ukuthi ukugula nokudla okuncane kufanele kuphathwe kanjani ohlelweni lwakho — ungayiqiqi uhlelo lwezinsuku zokugula.",
      "Bika amabala aluhlaza angajwayelekile, amehlo aphuzi, noma i-hypoglycaemia eqhubekayo ngokushesha.",
      "Uma ungakwazi ukugwinya, uthola ukuxhuzula, ulahlekelwa ukwazi, noma uhlala udidekile ngemva kokwelapha i-hypo — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie sulfonielureum soos op die geëtiketteerde produk aangedui — gewoonlik met maaltye soos die etiket adviseer.",
      "Sulfonielureum-berading sluit dikwels hipoglisemie-herkenning in (sweet, bewing, verwarring) — dra jou klinikus se hipo-plan. Materia versin nie ’n dosis of glukoseteiken nie.",
      "Sê vir jou apteker as jy maaltye oorslaan, alkohol drink, of nuwe medisyne begin wat suikerkontrole kan beïnvloed.",
      "Vra hoe siekte met minder eet op jou sorgplan hanteer moet word — moenie ’n siektedagskedule versin nie.",
      "Rapporteer ongewone kneusings, geel oë, of ernstige aanhoudende hipoglisemie vroeg.",
      "As jy nie kan sluk nie, stuiptrekkings kry, bewusteloos raak, of verward bly ná hipo-behandeling — soek noodhulp.",
    ],
    [
      "Sebelisa sulfonylurea ena hantle kamoo e hlalositsoeng holabel — hangata le lijo kamoo leibole e eletsang.",
      "Keletso ea sulfonylurea hangata e kenyelletsa ho tseba hypoglycaemia (ho fufuleloa, ho thothomela, ho ferekana) — jara moralo oa ngaka oa hypo. Materia ha e iqape tekanyo kapa sepheo sa tsoekere.",
      "Bolella rakhemisi haeba u tlola lijo, u noa joala, kapa u qala meriana e mecha e ka amang taolo ea tsoekere.",
      "Botsa hore ho kula ka ho ja ho fokolang ho lokela ho tšoaroa joang moralong oa hau — se ke oa iqapa kemiso ea matsatsi a ho kula.",
      "Tlaleha matheba a sootho a sa tloaelehang, mahlo a mosehla, kapa hypoglycaemia e tsoelang pele e matla kapele.",
      "Haeba u sitoa ho koenya, u ts'oaroa ke ho thothomela, u lahleheloa ke kelello, kapa u lula u ferekane ka mor'a kalafo ea hypo — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le sulfonylurea ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya njengoko ileyibhile icebisa.",
      "Iingcebiso ze-sulfonylurea zihlala zibandakanya ukwazi i-hypoglycaemia (ukubila, ukungcangcazela, ukudideka) — phatha isicwangciso sogqirha se-hypo. I-Materia ayiyiqiqi idosi okanye usukelo lweswekile.",
      "Xelela usokhemisti ukuba uyazitshiya izidlo, usela utywala, okanye uqala amayeza amatsha anokuphazamisa ulawulo lweswekile.",
      "Buza indlela ukugula ngokutya okuncinci ekufanele kuphathwe ngayo kwisicwangciso sakho — sukuyiqqa ishedyuli yeentsuku zokugula.",
      "Xela amabala aluhlaza angaqhelekanga, amehlo atyheli, okanye i-hypoglycaemia eqhubekayo enzima kwangoko.",
      "Ukuba awukwazi ukuginya, ufumana ukuxhuzula, uphulukana nokuqonda, okanye uhlala udidekile emva konyango lwe-hypo — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-haloperidol": five(
    [
      "Take this typical antipsychotic exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Haloperidol counselling commonly includes movement side-effect watch (stiffness, tremor, restlessness) and sedation. Materia does not invent a dose or titration schedule.",
      "Tell your pharmacist about Parkinson’s disease history, heart rhythm medicines, and other antipsychotics or sedatives on your list.",
      "Report high fever with muscle rigidity, confusion, or uncontrolled muscle spasms urgently.",
      "Avoid alcohol and other sedatives unless your clinician agrees — confirm against the labelled product.",
      "If you get severe muscle spasms of the face/neck, collapse, seizures, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le typical antipsychotic njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-haloperidol kuvame ukufaka ukugada izimpawu zokunyakaza (ukuginya, ukuthuthumela, ukungeneliseki) nokozela. I-Materia ayiqambi umthamo noma uhlelo lokukhuphula.",
      "Tshela umkhiqizi ngomlando we-Parkinson, amaphilisi esivinini senhliziyo, namanye ama-antipsychotic noma ama-sedative ohlwini lwakho.",
      "Bika umkhuhlane ophakeme nokuginya kwemisipha, ukudideka, noma ukuqaqamba kwemisipha okungalawuleki ngokushesha.",
      "Gwema utshwala namanye ama-sedative ngaphandle kokuvuma kukadokotela — qinisekisa kumkhiqizo onelebula.",
      "Uma uthola ukuqaqamba kwemisipha kobuso/intamo okukhulu, ukuwa, ukuxhuzula, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie tipiese antipsigotikum soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Haloperidol-berading sluit dikwels bewegingsneweeffek-waaksaamheid in (stijfheid, bewing, rusteloosheid) en sedasie. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Sê vir jou apteker van Parkinson-siektegeskiedenis, hartritmemedisyne, en ander antipsigotika of sederende middels op jou lys.",
      "Rapporteer hoë koors met spierstijfheid, verwarring, of onbeheerde spierspasmas dringend.",
      "Vermy alkohol en ander sederende middels tensy jou klinikus saamstem — bevestig teen die geëtiketteerde produk.",
      "As jy ernstige spierspasmas van die gesig/nek, ineenstorting, stuiptrekkings of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa typical antipsychotic ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea haloperidol hangata e kenyelletsa ho hlokomela litla-morao tsa motsamao (ho thatafala, ho thothomela, ho hloka khutso) le ho otsela. Materia ha e iqape tekanyo kapa moralo oa ho nyolla.",
      "Bolella rakhemisi ka histori ea Parkinson, meriana ea morethetho oa pelo, le li-antipsychotic kapa li-sedative tse ling lenaneng la hau.",
      "Tlaleha feberu e phahameng le ho thatafala ha mesifa, ho ferekana, kapa ho tsitsipa ha mesifa ho sa laoleheng ka potlako.",
      "Qoba joala le li-sedative tse ling ntle le tumellano ea ngaka — netefatsa holabel.",
      "Haeba u fumana ho tsitsipa ha mesifa ha sefahleho/molala ho matla, ho oa, ho thothomela, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le typical antipsychotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-haloperidol zihlala zibandakanya ukugada iimpawu zentshukumo (ukuginya, ukungcangcazela, ukungaphumli) nokozela. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyusa.",
      "Xelela usokhemisti ngembali ye-Parkinson, amayeza esingqisho sentliziyo, namanye ama-antipsychotic okanye ii-sedative kuluhlu lwakho.",
      "Xela umkhuhlane ophezulu nokuginya kwemisipha, ukudideka, okanye ukuqaqamba kwemisipha okungalawulekiyo ngokukhawuleza.",
      "Pepa utywala nezinye ii-sedative ngaphandle kokuvuma kugqirha — qinisekisa kwileyibhile.",
      "Ukuba ufumana ukuqaqamba kwemisipha kobuso/intamo okunzima, ukuwa, ukuxhuzula, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-lorazepam": five(
    [
      "Take this benzodiazepine exactly as directed on your labelled product — short courses are common counselling; do not increase on your own.",
      "Lorazepam counselling commonly includes drowsiness, falls risk, and not combining with alcohol or other sedatives unless your clinician agrees. Materia does not invent a dose or duration.",
      "Tell your pharmacist about breathing problems, sleep apnoea, other opioids or sedatives, and pregnancy plans.",
      "Do not stop suddenly after regular use without your clinician — withdrawal discussions belong with them.",
      "Avoid driving or machinery until you know how you respond — confirm against the labelled product.",
      "If breathing becomes slow or shallow, you cannot be woken easily, or lips turn blue — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le benzodiazepine njengoba kubhalwe kumkhiqizo onelebula — izinkambo ezimfushane zivame ukufundiswa; ungakhuphuli wedwa.",
      "Ukwelulekwa kwe-lorazepam kuvame ukufaka ukozela, ingozi yokuwela, nokungahlanganisi notshwala noma amanye ama-sedative ngaphandle kokuvuma kukadokotela. I-Materia ayiqambi umthamo noma ubude.",
      "Tshela umkhiqizi ngezinkinga zokuphefumula, i-sleep apnoea, amanye ama-opioid noma ama-sedative, nezinhlelo zokukhulelwa.",
      "Ungayeki ngokuzumayo ngemva kokusebenzisa njalo ngaphandle kwedokotela — izingxoxo zokuyeka zingabo.",
      "Gwema ukushayela noma imishini uze wazi ukuthi usabela kanjani — qinisekisa kumkhiqizo onelebula.",
      "Uma ukuphefumula kuba kancane noma kungenzi kahle, ungavuswa kalula, noma izindebe ziba hlaza — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Neem hierdie bensodiasepien soos op die geëtiketteerde produk aangedui — kort kuursoorsigte is algemene berading; moenie self verhoog nie.",
      "Lorasepam-berading sluit dikwels slaperigheid, valrisiko, en nie kombineer met alkohol of ander sederende middels in tensy jou klinikus saamstem. Materia versin nie ’n dosis of duur nie.",
      "Sê vir jou apteker van asemhalingsprobleme, slaapapnee, ander opioïede of sederende middels, en swangerskapplanne.",
      "Moenie skielik stop ná gereelde gebruik sonder jou klinikus nie — onttrekkingsbesprekings hoort by hulle.",
      "Vermy bestuur of masjinerie totdat jy weet hoe jy reageer — bevestig teen die geëtiketteerde produk.",
      "As asemhaling stadig of vlak word, jy nie maklik wakker gemaak kan word nie, of lippe blou word — soek dadelik noodhulp.",
    ],
    [
      "Sebelisa benzodiazepine ena hantle kamoo e hlalositsoeng holabel — lithuto tse khutšoane ke keletso e tloaelehileng; se ke oa e nyolla u le mong.",
      "Keletso ea lorazepam hangata e kenyelletsa ho otsela, kotsi ea ho oa, le ho se e kopanye le joala kapa li-sedative tse ling ntle le tumellano ea ngaka. Materia ha e iqape tekanyo kapa bolelele.",
      "Bolella rakhemisi ka mathata a ho hema, sleep apnoea, li-opioid kapa li-sedative tse ling, le merero ea ho ima.",
      "Se ke oa emisa ka potlako ka mor'a tšebeliso e tloaelehileng ntle le ngaka — lipuisano tsa ho tlohela ke tsa bona.",
      "Qoba ho khanna kapa mechini ho fihlela u tseba karabelo ea hau — netefatsa holabel.",
      "Haeba ho hema ho ba butle kapa ho sa tebe, u sitoa ho tsohoa habonolo, kapa melomo e fetoha boputsoa — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "Sebenzisa le benzodiazepine ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iikhosi ezimfutshane zihlala zifundiswa; sukunyusa wedwa.",
      "Iingcebiso ze-lorazepam zihlala zibandakanya ukozela, umngcipheko wokuwawa, nokungadibanisi notywala okanye ezinye ii-sedative ngaphandle kokuvuma kugqirha. I-Materia ayiyiqiqi idosi okanye ubude.",
      "Xelela usokhemisti ngeengxaki zokuphefumla, i-sleep apnoea, ezinye ii-opioid okanye ii-sedative, nezicwangciso zokukhulelwa.",
      "Sukuyeki ngokungxamisekileyo emva kokusebenzisa rhoqo ngaphandle kogqirha — iingxoxo zokuyeka zezabo.",
      "Pepa ukuqhuba okanye umatshini de wazi indlela osabela ngayo — qinisekisa kwileyibhile.",
      "Ukuba ukuphefumla kuba kancinci okanye kunganzulu, awukwazi ukuvuswa lula, okanye imilebe iba luhlaza — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-risperidone": five(
    [
      "Take this atypical antipsychotic exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Risperidone counselling commonly includes sedation, metabolic change watch, and movement side-effect discussions. Materia does not invent a dose or titration schedule.",
      "Report worsening mood or suicidal thoughts early, including after clinician dose changes.",
      "Tell your pharmacist about diabetes or heart history, other sedating medicines, and alcohol use.",
      "Ask about prolactin-related symptoms (breast changes, menstrual changes) that belong with clinician review.",
      "If you get high fever with muscle rigidity, fainting, seizures, or trouble breathing — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le atypical antipsychotic njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-risperidone kuvame ukufaka ukozela, ukugada ukushintsha kwemetabolism, nezingxoxo zezimpawu zokunyakaza. I-Materia ayiqambi umthamo noma uhlelo lokukhuphula.",
      "Bika ukwehla kwemizwa noma imicabango yokuzibulala ngokushesha, kuhlanganise ngemva kokushintsha umthamo kudokotela.",
      "Tshela umkhiqizi ngesifo sikashukela noma umlando wenhliziyo, amanye amaphilisi akozisayo, nokusebenzisa utshwala.",
      "Buza ngezimpawu ezihlobene ne-prolactin (ukushintsha kwebele, ukushintsha kwenyanga) okufanele kubuyekezwe kudokotela.",
      "Uma uthola umkhuhlane ophakeme nokuginya kwemisipha, ukuwa, ukuxhuzula, noma ukuphefumula kanzima — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Neem hierdie atipiese antipsigotikum soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Risperidoon-berading sluit dikwels sedasie, metaboliese-veranderingwaaksaamheid, en bewegingsneweeffek-besprekings in. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Rapporteer verergerende bui of selfmoordgedagtes vroeg, insluitend ná klinikus-dosisveranderinge.",
      "Sê vir jou apteker van diabetes- of hartgeskiedenis, ander sederende medisyne, en alkoholgebruik.",
      "Vra oor prolaktien-verwante simptome (borsveranderinge, menstruele veranderinge) wat by klinikus-hersiening hoort.",
      "As jy hoë koors met spierstijfheid, floute, stuiptrekkings of asemhalingsprobleme kry — soek dadelik noodhulp.",
    ],
    [
      "Sebelisa atypical antipsychotic ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea risperidone hangata e kenyelletsa ho otsela, ho hlokomela liphetoho tsa metabolism, le lipuisano tsa litla-morao tsa motsamao. Materia ha e iqape tekanyo kapa moralo oa ho nyolla.",
      "Tlaleha maikutlo a mabe kapa menahano ea ho ipolaea kapele, ho kenyeletsoa ka mor'a liphetoho tsa tekanyo tsa ngaka.",
      "Bolella rakhemisi ka diabetes kapa histori ea pelo, meriana e meng e otselang, le tšebeliso ea joala.",
      "Botsa ka matšoao a amanang le prolactin (liphetoho tsa matsoele, liphetoho tsa khoeli) tse lokelang tlhahlobo ea ngaka.",
      "Haeba u fumana feberu e phahameng le ho thatafala ha mesifa, ho akheha, ho thothomela, kapa ho hema thata — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "Sebenzisa le atypical antipsychotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-risperidone zihlala zibandakanya ukozela, ukugada utshintsho lwemetabolism, neengxoxo zeempawu zentshukumo. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyusa.",
      "Xela ukwehla kwemvakalelo okanye iingcinga zokuzibulala kwangoko, kuquka emva kotshintsho lwedosi lugqirha.",
      "Xelela usokhemisti ngesifo seswekile okanye imbali yentliziyo, amanye amayeza akozisayo, nokusebenzisa utywala.",
      "Buza ngeempawu ezinxulumene ne-prolactin (utshintsho lwamabele, utshintsho lwenyanga) ezifanele kujongwe kugqirha.",
      "Ukuba ufumana umkhuhlane ophezulu nokuginya kwemisipha, ukuwa, ukuxhuzula, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo ngokukhawuleza.",
    ],
  ),

  "mol-terbinafine": five(
    [
      "Take this allylamine antifungal exactly as directed on your labelled product — complete the labelled course even if nails or skin look better early.",
      "Terbinafine counselling commonly includes liver watch — report yellow eyes, dark urine, severe nausea, or unexplained itching. Materia does not invent a dose or course length.",
      "Tell your pharmacist about liver history, pregnancy plans, and ALL other medicines — interaction checks are product-specific.",
      "Taste disturbance and skin rash are commonly discussed — report new widespread rash early.",
      "Ask how topical and oral products differ on your labelled plan — do not invent a personal regimen.",
      "If you get blistering rash with fever, yellow eyes, severe abdominal pain, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le allylamine antifungal njengoba kubhalwe kumkhiqizo onelebula — qedela inkambo yelebula noma uziphawu noma isikhumba kubukeka kungcono kusenesikhathi.",
      "Ukwelulekwa kwe-terbinafine kuvame ukufaka ukugada isibindi — bika amehlo aphuzi, umchamo omnyama, isicanucanu esikhulu, noma ukulunywa okungachaziwe. I-Materia ayiqambi umthamo noma ubude benkambo.",
      "Tshela umkhiqizi ngomlando wesibindi, izinhlelo zokukhulelwa, NAWO WONKE amanye amaphilisi — ukuhlola ukuxhumana kuncike kumkhiqizo.",
      "Ukuphazamiseka kokunambitha nokuqubuka kwesikhumba kuvame ukuxoxwa — bika ukuqubuka okusha okusabalele ngokushesha.",
      "Buza ukuthi imikhiqizo ye-topical neyomlomo ihlukile kanjani ohlelweni lwakho — ungayiqiqi uhlelo lomuntu siqu.",
      "Uma uthola ukuqubuka kwamaqhubu nomkhuhlane, amehlo aphuzi, ubuhlungu besisu obukhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie allielamien-swamdoder soos op die geëtiketteerde produk aangedui — voltooi die geëtiketteerde kuur selfs as naels of vel vroeg beter lyk.",
      "Terbinajien-berading sluit dikwels lewerwaaksaamheid in — rapporteer geel oë, donker urine, ernstige naarheid of onverklaarde jeuk. Materia versin nie ’n dosis of kuurduur nie.",
      "Sê vir jou apteker van lewergeskiedenis, swangerskapplanne, en ALLE ander medisyne — interaksiekontroles is produkspesifiek.",
      "Smaakversteuring en veluitslag word dikwels bespreek — rapporteer nuwe wydverspreide uitslag vroeg.",
      "Vra hoe topikale en orale produkte op jou geëtiketteerde plan verskil — moenie ’n persoonlike regime versin nie.",
      "As jy blaasuitslag met koors, geel oë, ernstige buikpyn of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa allylamine antifungal ena hantle kamoo e hlalositsoeng holabel — qeta thuto ea leibole leha manala kapa letlalo li shebahala a betere kapele.",
      "Keletso ea terbinafine hangata e kenyelletsa ho hlokomela sebete — tlaleha mahlo a mosehla, moroto o lefifi, ho nyatsa ho matla, kapa ho hlohlona ho sa hlaloseng. Materia ha e iqape tekanyo kapa bolelele ba thuto.",
      "Bolella rakhemisi ka histori ea sebete, merero ea ho ima, le MERIANA EOHLE e meng — litlhahlobo tsa ho sebelisana li ipapisitse le sehlahiswa.",
      "Tšitiso ea tatso le lekhopho la letlalo hangata li buisanoa — tlaleha lekhopho le lecha le atileng kapele.",
      "Botsa hore lihlahiswa tsa topical le tsa molomo li fapana joang moralong oa hau oa leibole — se ke oa iqapa moralo oa motho ka mong.",
      "Haeba u fumana lekhopho la lihlabana le feberu, mahlo a mosehla, bohloko ba mpeng bo matla, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le allylamine antifungal ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gqiba ikhosi yeleyibhile nokuba iinzipho okanye ulusu lubonakala lungcono kwangoko.",
      "Iingcebiso ze-terbinafine zihlala zibandakanya ukugada isibindi — xela amehlo atyheli, umchamo omnyama, isicanucanu esinzima, okanye ukurhawuzelela okungachazwanga. I-Materia ayiyiqiqi idosi okanye ubude bekhosi.",
      "Xelela usokhemisti ngembali yesibindi, izicwangciso zokukhulelwa, NAWO ONKE amanye amayeza — ukujonga ukusebenzelana kuxhomekeke kwimveliso.",
      "Ukuphazamiseka kwencasa nerhashalala yesikhumba kuhlala kuxoxwa — xela irhashalala entsha esasazekileyo kwangoko.",
      "Buza indlela iimveliso ze-topical nezomlomo ezahluka ngayo kwisicwangciso sakho seleyibhile — sukuyiqqa irejimeni yakho.",
      "Ukuba ufumana irhashalala yamaqhuma nomkhuhlane, amehlo atyheli, iintlungu zesisu ezinzima, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-lactulose": five(
    [
      "Take this osmotic laxative exactly as directed on your labelled product — effect timing varies; confirm against the label.",
      "Lactulose counselling commonly includes bloating, gas, and diarrhoea if more than labelled is taken. Materia does not invent a dose or bowel target.",
      "Tell your pharmacist about diabetes plans if the product contains sugars, and all other laxatives you use.",
      "Drink fluids as your clinician or labelled product advises — do not invent a fluid schedule.",
      "Report severe abdominal pain, vomiting, or no bowel movement with increasing bloating early.",
      "If you get severe dehydration, fainting, black stools, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le osmotic laxative njengoba kubhalwe kumkhiqizo onelebula — isikhathi somphumela siyahluka; qinisekisa kulebula.",
      "Ukwelulekwa kwe-lactulose kuvame ukufaka ukuvuvuka, igesi, nokuhuda uma uthatha okungaphezu kwelebula. I-Materia ayiqambi umthamo noma umgomo wamathumbu.",
      "Tshela umkhiqizi ngezinhlelo zesifo sikashukela uma umkhiqizo unezinhlwa, nawo wonke amanye ama-laxative.",
      "Phuza uketshezi njengoba udokotela noma umkhiqizo onelebula ucebisa — ungayiqiqi uhlelo loketshezi.",
      "Bika ubuhlungu besisu obukhulu, ukuhlanza, noma ukungayi endlini yangasese nokuvuvuka okukhulayo ngokushesha.",
      "Uma uthola ukoma okukhulu, ukuwa, indle emnyama, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie osmotiese lakseermiddel soos op die geëtiketteerde produk aangedui — effektydsberekening wissel; bevestig teen die etiket.",
      "Laktulose-berading sluit dikwels opgeblasenheid, gas, en diarree in as meer as geëtiketteer geneem word. Materia versin nie ’n dosis of dermteiken nie.",
      "Sê vir jou apteker van diabetesplanne as die produk suikers bevat, en alle ander lakseermiddels wat jy gebruik.",
      "Drink vloeistowwe soos jou klinikus of geëtiketteerde produk adviseer — moenie ’n vloeistofskedule versin nie.",
      "Rapporteer ernstige buikpyn, braking, of geen stoelgang met toenemende opgeblasenheid vroeg.",
      "As jy ernstige dehidrasie, floute, swart stoelgang of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa osmotic laxative ena hantle kamoo e hlalositsoeng holabel — nako ea phello ea fapana; netefatsa holabel.",
      "Keletso ea lactulose hangata e kenyelletsa ho ruruha, khase, le letšollo haeba ho nkoa ho feta kamoo leibole e bolelang. Materia ha e iqape tekanyo kapa sepheo sa mala.",
      "Bolella rakhemisi ka merero ea diabetes haeba sehlahiswa se na le tsoekere, le li-laxative tsohle tse ling.",
      "Noa mekelikeli kamoo ngaka kapa sehlahiswa se nang le leibole se eletsang — se ke oa iqapa kemiso ea mokelikeli.",
      "Tlaleha bohloko ba mpeng bo matla, ho hlatsa, kapa ho se ee ntloaneng le ho ruruha ho ntseng ho eketseha kapele.",
      "Haeba u fumana ho oma ho matla, ho akheha, mantle a sootho, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le osmotic laxative ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ixesha lesiphumo liyahluka; qinisekisa kwileyibhile.",
      "Iingcebiso ze-lactulose zihlala zibandakanya ukudumba, irhasi, norhudo ukuba uthatha ngaphezu kweleyibhile. I-Materia ayiyiqiqi idosi okanye usukelo lwamathumbu.",
      "Xelela usokhemisti ngezicwangciso zesifo seswekile ukuba imveliso ineswekile, nazo zonke ezinye ii-laxative.",
      "Sela ulwelo njengoko ugqirha okanye imveliso eneleyibhile icebisa — sukuyiqqa ishedyuli yolwelo.",
      "Xela iintlungu zesisu ezinzima, ukuhlanza, okanye ukungayi endlwini yangasese nokudumba okukhulayo kwangoko.",
      "Ukuba ufumana ukoma okunzima, ukuwa, indle emnyama, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-sulfasalazine": five(
    [
      "Take this DMARD / aminosalicylate exactly as directed on your labelled product — often with food and water as the label advises.",
      "Sulfasalazine counselling commonly includes orange-yellow urine or tears, sun sensitivity, and rash/infection watch. Materia does not invent a dose or lab target.",
      "Tell your pharmacist about sulfa allergy history, pregnancy plans, and ALL other medicines you use.",
      "Report fever, sore throat, unusual bruising, severe rash, or yellow eyes early.",
      "Ask how folic-acid co-therapy fits your clinician’s plan — do not invent a personal vitamin schedule.",
      "If you get blistering rash with fever, severe shortness of breath, or yellow eyes with abdominal pain — seek emergency care.",
    ],
    [
      "Sebenzisa le DMARD / aminosalicylate njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla namanzi njengoba ilebula isho.",
      "Ukwelulekwa kwe-sulfasalazine kuvame ukufaka umchamo noma izinyembezi eziorange-yellow, ukuzwela ilanga, nokugada ukuqubuka/ukutheleleka. I-Materia ayiqambi umthamo noma umgomo welabhorethri.",
      "Tshela umkhiqizi ngomlando we-allergy ye-sulfa, izinhlelo zokukhulelwa, NAWO WONKE amanye amaphilisi.",
      "Bika umkhuhlane, umphimbo obuhlungu, amabala aluhlaza angajwayelekile, ukuqubuka okukhulu, noma amehlo aphuzi ngokushesha.",
      "Buza ukuthi i-folic acid ihambisana kanjani nohlelo lukadokotela — ungayiqiqi uhlelo lomuntu siqu lwamavithamini.",
      "Uma uthola ukuqubuka kwamaqhubu nomkhuhlane, ukuphefumula kancane kakhulu, noma amehlo aphuzi nobuhlungu besisu — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie DMARD / aminosalisilaat soos op die geëtiketteerde produk aangedui — dikwels met kos en water soos die etiket adviseer.",
      "Sulfasalasien-berading sluit dikwels oranje-geel urine of trane, sonsensitiwiteit, en uitslag/infeksiewaaksaamheid in. Materia versin nie ’n dosis of labteiken nie.",
      "Sê vir jou apteker van sulfa-allergiegeskiedenis, swangerskapplanne, en ALLE ander medisyne wat jy gebruik.",
      "Rapporteer koors, seer keel, ongewone kneusings, ernstige uitslag, of geel oë vroeg.",
      "Vra hoe foliensuur-koterapie by jou klinikus se plan pas — moenie ’n persoonlike vitamienskedule versin nie.",
      "As jy blaasuitslag met koors, ernstige kortasem, of geel oë met buikpyn kry — soek noodhulp.",
    ],
    [
      "Sebelisa DMARD / aminosalicylate ena hantle kamoo e hlalositsoeng holabel — hangata le lijo le metsi kamoo leibole e eletsang.",
      "Keletso ea sulfasalazine hangata e kenyelletsa moroto kapa meokho e orange-yellow, ho utloa letsatsi, le ho hlokomela lekhopho/tšoaetso. Materia ha e iqape tekanyo kapa sepheo sa lab.",
      "Bolella rakhemisi ka histori ea allergy ea sulfa, merero ea ho ima, le MERIANA EOHLE e meng.",
      "Tlaleha feberu, 'metso o bohloko, matheba a sootho a sa tloaelehang, lekhopho le matla, kapa mahlo a mosehla kapele.",
      "Botsa hore folic acid e tšoana joang le moralo oa ngaka — se ke oa iqapa kemiso ea motho ka mong ea livithamini.",
      "Haeba u fumana lekhopho la lihlabana le feberu, ho hema butle haholo, kapa mahlo a mosehla le bohloko ba mpeng — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le DMARD / aminosalicylate ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya namanzi njengoko ileyibhile icebisa.",
      "Iingcebiso ze-sulfasalazine zihlala zibandakanya umchamo okanye iinyembezi eziorange-yellow, ukuziva ilanga, nokugada irhashalala/usulelo. I-Materia ayiyiqiqi idosi okanye usukelo lwelabhorethri.",
      "Xelela usokhemisti ngembali ye-allergy ye-sulfa, izicwangciso zokukhulelwa, NAWO ONKE amanye amayeza.",
      "Xela umkhuhlane, umqala obuhlungu, amabala aluhlaza angaqhelekanga, irhashalala enzima, okanye amehlo atyheli kwangoko.",
      "Buza indlela i-folic acid ehambelana ngayo nesicwangciso sogqirha — sukuyiqqa ishedyuli yakho yeevithamini.",
      "Ukuba ufumana irhashalala yamaqhuma nomkhuhlane, ukuphefumla kancinci kakhulu, okanye amehlo atyheli neentlungu zesisu — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-domperidone": five(
    [
      "Take this antiemetic / prokinetic exactly as directed on your labelled product — short courses are common counselling.",
      "Domperidone counselling commonly includes heart-rhythm caution and not combining with certain interacting medicines. Materia does not invent a dose, maximum duration, or interaction list.",
      "Tell your pharmacist about heart history, low potassium or magnesium discussions, and ALL other medicines you use.",
      "Report palpitations, fainting, or severe dizziness early.",
      "Ask how this fits with other antiemetics on your list — confirm against the labelled product and care plan.",
      "If you faint, get severe chest pain, seizures, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antiemetic / prokinetic njengoba kubhalwe kumkhiqizo onelebula — izinkambo ezimfushane zivame ukufundiswa.",
      "Ukwelulekwa kwe-domperidone kuvame ukufaka ukuqaphela isivinini senhliziyo nokungahlanganisi namaphilisi athile axhumana. I-Materia ayiqambi umthamo, ubude obuphezulu, noma uhlu lokuxhumana.",
      "Tshela umkhiqizi ngomlando wenhliziyo, izingxoxo ze-potassium noma i-magnesium ephansi, NAWO WONKE amanye amaphilisi.",
      "Bika ukushaya kwenhliziyo, ukuwa, noma isiyezi esikhulu ngokushesha.",
      "Buza ukuthi lokhu kuhambisana kanjani namanye ama-antiemetic ohlwini lwakho — qinisekisa kumkhiqizo onelebula nohlelo lokunakekelwa.",
      "Uma uwela, uthola ubuhlungu besifuba obukhulu, ukuxhuzula, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie anti-emetikum / prokinetikum soos op die geëtiketteerde produk aangedui — kort kuursoorsigte is algemene berading.",
      "Domperidoon-berading sluit dikwels hartritme-kautel in en nie kombineer met sekere interaksie-medisyne nie. Materia versin nie ’n dosis, maksimum duur of interaksielys nie.",
      "Sê vir jou apteker van hartgeskiedenis, lae kalium- of magnesiumbesprekings, en ALLE ander medisyne wat jy gebruik.",
      "Rapporteer hartklopgings, floute, of ernstige duiseligheid vroeg.",
      "Vra hoe dit by ander anti-emetika op jou lys pas — bevestig teen die geëtiketteerde produk en sorgplan.",
      "As jy flou word, ernstige borspyn, stuiptrekkings of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antiemetic / prokinetic ena hantle kamoo e hlalositsoeng holabel — lithuto tse khutšoane ke keletso e tloaelehileng.",
      "Keletso ea domperidone hangata e kenyelletsa tlhokomelo ea morethetho oa pelo le ho se e kopanye le meriana e meng e sebelisanang. Materia ha e iqape tekanyo, bolelele bo phahameng, kapa lenane la ho sebelisana.",
      "Bolella rakhemisi ka histori ea pelo, lipuisano tsa potassium kapa magnesium e tlase, le MERIANA EOHLE e meng.",
      "Tlaleha ho otla ha pelo, ho akheha, kapa ho tsekela ho matla kapele.",
      "Botsa hore sena se tšoana joang le li-antiemetic tse ling lenaneng la hau — netefatsa holabel le moralo oa tlhokomelo.",
      "Haeba u akheha, u fumana bohloko ba sefuba bo matla, ho thothomela, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antiemetic / prokinetic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iikhosi ezimfutshane zihlala zifundiswa.",
      "Iingcebiso ze-domperidone zihlala zibandakanya ukulumkela isingqisho sentliziyo nokungadibanisi namayeza athile asebenzisanayo. I-Materia ayiyiqiqi idosi, ubude obuphezulu, okanye uluhlu lokusebenzelana.",
      "Xelela usokhemisti ngembali yentliziyo, iingxoxo ze-potassium okanye i-magnesium ephantsi, NAWO ONKE amanye amayeza.",
      "Xela ukubetha kwentliziyo, ukuwa, okanye isiyezi esinzima kwangoko.",
      "Buza indlela oku kuhambelana ngayo namanye ama-antiemetic kuluhlu lwakho — qinisekisa kwileyibhile nakwicandelo lokhathalelo.",
      "Ukuba uyawa, ufumana iintlungu zesifuba ezinzima, ukuxhuzula, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-theophylline": five(
    [
      "Take this methylxanthine exactly as directed on your labelled product — keep brand and timing reasonably consistent.",
      "Theophylline counselling commonly includes level monitoring and interaction checks with many medicines and smoking changes. Materia does not invent a dose or blood-level target.",
      "Tell your pharmacist about heart rhythm history, seizure history, ALL other medicines, and changes in smoking or caffeine intake.",
      "Report nausea, vomiting, tremor, palpitations, or insomnia early — these may need clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours or a catch-up plan.",
      "If you get seizures, severe chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le methylxanthine njengoba kubhalwe kumkhiqizo onelebula — gcina uhlobo nesikhathi kulingene.",
      "Ukwelulekwa kwe-theophylline kuvame ukufaka ukuqapha ama-level nokuhlola ukuxhumana namaphilisi amaningi nokushintsha kokubhema. I-Materia ayiqambi umthamo noma umgomo weleveli egazini.",
      "Tshela umkhiqizi ngomlando wesivinini senhliziyo, umlando wokuxhuzula, NAWO WONKE amanye amaphilisi, nokushintsha kokubhema noma i-caffeine.",
      "Bika isicanucanu, ukuhlanza, ukuthuthumela, ukushaya kwenhliziyo, noma ukungalali ngokushesha — lokhu kungadinga ukubuyekezwa kudokotela.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa noma uhlelo lokubuyisela.",
      "Uma uthola ukuxhuzula, ubuhlungu besifuba obukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie metielxantien soos op die geëtiketteerde produk aangedui — hou handelsmerk en tydsberekening redelik konsekwent.",
      "Teofillien-berading sluit dikwels vlakmonitering en interaksiekontroles met baie medisyne en rookveranderinge in. Materia versin nie ’n dosis of bloedvlakteiken nie.",
      "Sê vir jou apteker van hartritmegeskiedenis, aanvalsgeskiedenis, ALLE ander medisyne, en veranderinge in rook of kafeïeninname.",
      "Rapporteer naarheid, braking, bewing, hartklopgings of slapeloosheid vroeg — dit mag klinikus-hersiening nodig hê.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure of ’n inhaalplan versin nie.",
      "As jy stuiptrekkings, ernstige borspyn, ineenstorting of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa methylxanthine ena hantle kamoo e hlalositsoeng holabel — boloka brand le nako ho tsitsitse.",
      "Keletso ea theophylline hangata e kenyelletsa ho hlokomela maemo le litlhahlobo tsa ho sebelisana le meriana e mengata le liphetoho tsa ho tsuba. Materia ha e iqape tekanyo kapa sepheo sa level ea mali.",
      "Bolella rakhemisi ka histori ea morethetho oa pelo, histori ea ho thothomela, MERIANA EOHLE e meng, le liphetoho tsa ho tsuba kapa caffeine.",
      "Tlaleha ho nyatsa, ho hlatsa, ho thothomela, ho otla ha pelo, kapa ho hloka boroko kapele — sena se ka hloka tlhahlobo ea ngaka.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola kapa moralo oa ho tsosolosa.",
      "Haeba u fumana ho thothomela, bohloko ba sefuba bo matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le methylxanthine ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gcina uphawu nexesha kungaguquguquki.",
      "Iingcebiso ze-theophylline zihlala zibandakanya ukuqapha iilevel nokujonga ukusebenzelana namayeza amaninzi notshintsho lokutshaya. I-Materia ayiyiqiqi idosi okanye usukelo lweleveli yegazi.",
      "Xelela usokhemisti ngembali yesingqisho sentliziyo, imbali yokuxhuzula, NAWO ONKE amanye amayeza, notshintsho lokutshaya okanye i-caffeine.",
      "Xela isicanucanu, ukuhlanza, ukungcangcazela, ukubetha kwentliziyo, okanye ukungalali kwangoko — oku kunokufuna ukujongwa kugqirha.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula okanye isicwangciso sokubuyisela.",
      "Ukuba ufumana ukuxhuzula, iintlungu zesifuba ezinzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-erythro": five(
    [
      "Take this macrolide antibiotic exactly as directed on your labelled product — complete the prescribed course.",
      "Erythromycin counselling commonly includes stomach upset and interaction checks with many medicines. Materia does not invent a dose, course length, or interaction list.",
      "Tell your pharmacist about heart rhythm history and ALL other medicines, including cholesterol and heart products.",
      "Report severe diarrhoea, yellow eyes, palpitations, or widespread rash early.",
      "Ask whether food timing on your labelled product differs from other macrolides — do not invent a meal clock.",
      "If you get severe rash with blistering, fainting, yellow eyes, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le macrolide antibiotic njengoba kubhalwe kumkhiqizo onelebula — qedela inkambo enikeziwe.",
      "Ukwelulekwa kwe-erythromycin kuvame ukufaka ukucasuka kwesisu nokuhlola ukuxhumana namaphilisi amaningi. I-Materia ayiqambi umthamo, ubude benkambo, noma uhlu lokuxhumana.",
      "Tshela umkhiqizi ngomlando wesivinini senhliziyo NAWO WONKE amanye amaphilisi, kuhlanganise imikhiqizo ye-cholesterol nenhliziyo.",
      "Bika ukuhuda okukhulu, amehlo aphuzi, ukushaya kwenhliziyo, noma ukuqubuka okusabalele ngokushesha.",
      "Buza ukuthi isikhathi sokudla kumkhiqizo onelebula sihlukile yini kwamanye ama-macrolide — ungayiqiqi iwashi lokudla.",
      "Uma uthola ukuqubuka okukhulu namaqhubu, ukuwa, amehlo aphuzi, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie makrolied-antibiotikum soos op die geëtiketteerde produk aangedui — voltooi die voorgeskryfde kuur.",
      "Eritromisien-berading sluit dikwels maagonstel en interaksiekontroles met baie medisyne in. Materia versin nie ’n dosis, kuurduur of interaksielys nie.",
      "Sê vir jou apteker van hartritmegeskiedenis en ALLE ander medisyne, insluitend cholesterol- en hartprodukte.",
      "Rapporteer ernstige diarree, geel oë, hartklopgings, of wydverspreide uitslag vroeg.",
      "Vra of kos-tydsberekening op jou geëtiketteerde produk van ander makroliede verskil — moenie ’n maaltydklok versin nie.",
      "As jy ernstige uitslag met blase, floute, geel oë of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa macrolide antibiotic ena hantle kamoo e hlalositsoeng holabel — qeta thuto e ngotsoeng.",
      "Keletso ea erythromycin hangata e kenyelletsa ho tšoenyeha ha mpeng le litlhahlobo tsa ho sebelisana le meriana e mengata. Materia ha e iqape tekanyo, bolelele ba thuto, kapa lenane la ho sebelisana.",
      "Bolella rakhemisi ka histori ea morethetho oa pelo le MERIANA EOHLE e meng, ho kenyeletsoa lihlahiswa tsa cholesterol le pelo.",
      "Tlaleha letšollo le matla, mahlo a mosehla, ho otla ha pelo, kapa lekhopho le atileng kapele.",
      "Botsa hore na nako ea lijo holabel e fapane le li-macrolide tse ling — se ke oa iqapa nako ea lijo.",
      "Haeba u fumana lekhopho le matla le lihlabana, ho akheha, mahlo a mosehla, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le macrolide antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — gqiba ikhosi enikiweyo.",
      "Iingcebiso ze-erythromycin zihlala zibandakanya ukucaphuka kwesisu nokujonga ukusebenzelana namayeza amaninzi. I-Materia ayiyiqiqi idosi, ubude bekhosi, okanye uluhlu lokusebenzelana.",
      "Xelela usokhemisti ngembali yesingqisho sentliziyo NAWO ONKE amanye amayeza, kuquka iimveliso ze-cholesterol nentliziyo.",
      "Xela urhudo olunzima, amehlo atyheli, ukubetha kwentliziyo, okanye irhashalala esasazekileyo kwangoko.",
      "Buza ukuba ixesha lokutya kwileyibhile lihluke na kwezinye ii-macrolide — sukuyiqqa iwotshi yokutya.",
      "Ukuba ufumana irhashalala enzima namaqhuma, ukuwa, amehlo atyheli, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
