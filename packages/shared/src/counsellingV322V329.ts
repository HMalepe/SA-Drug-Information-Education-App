/**
 * v322–v329 deepened SA counselling batch (6 lines × 5 langs) — STG/EML Batch B ID gaps.
 * Malaria, parasites, hospital antibiotics. Original Materia educational scripts only —
 * no invented doses, weight bands, food-timing hours, infusion rates, or course lengths.
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

export const COUNSELLING_V322_TO_V329: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-artesunate": five(
    [
      "Artesunate is an artemisinin-class antimalarial used in severe malaria pathways — this is a medical emergency managed in hospital by clinicians.",
      "Materia does not invent a dose, route sequence, or oral step-down schedule — confirm against current SA STG/EML and the labelled product.",
      "Tell the team about pregnancy, kidney or liver disease, ALL other medicines, and recent travel or prior malaria treatment.",
      "Severe malaria can worsen quickly — stay in care until the clinical team says discharge is safe.",
      "Ask what follow-up blood tests and oral antimalarial plan come after the acute phase.",
      "If confusion, seizures, dark urine, or breathing difficulty develops — alert the care team immediately.",
    ],
    [
      "I-artesunate i-antimalarial yesigaba se-artemisinin esetshenziswa ezindleleni ezinzima ze-malaria — lesi yisimo esiphuthumayo sesibhedlela esiphethwe odokotela.",
      "I-Materia ayiqambi umthamo, ukulandelana kwendlela, noma uhlelo lokwehla ngomlomo — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba ngokukhulelwa, isifo sezinso noma sesibindi, WONKE amanye amaphilisi, nokuhamba kwakamuva noma ukwelashwa kwe-malaria kwangaphambilini.",
      "I-malaria enzima ingaba kubi ngokushesha — hlala kunakekelweni kuze ithimba lithi ukukhishwa kuphephile.",
      "Buza ukuthi yiziphi izivivinyo zegazi zokulandela nohlelo lwe-antimalarial yomlomo olulandela isigaba esibucayi.",
      "Uma ukudideka, ukuxega, umchamo omnyama, noma ubunzima bokuphefumula kuvela — xwayisa ithimba ngokushesha.",
    ],
    [
      "Artesunaat is 'n artemisinien-klas antimalaria middel in ernstige malaria-paaie — dit is 'n mediese noodgeval wat in hospitaal deur klinici bestuur word.",
      "Materia versin nie 'n dosis, roeteseekwens, of mondelinge aftrapskedule nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir die span van swangerskap, nier- of lewersiekte, ALLE ander medisyne, en onlangse reis of vorige malaria behandeling.",
      "Ernstige malaria kan vinnig versleg — bly in sorg totdat die kliniese span sê ontslag veilig is.",
      "Vra watter opvolg bloedtoetse en mondelinge antimalaria-plan na die akute fase kom.",
      "As verwarring, aanvalle, donker urine, of asemnood ontwikkel — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Artesunate ke antimalaria ea sehlopha sa artemisinin e sebelisoang litseleng tse matla tsa malaria — ke tšohanyetso ea bongaka e laoloang sepetlele ke lingaka.",
      "Materia ha e iqape tekanyo, tatellano ea tsela, kapa kemiso ea ho theoha ka molomo — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka bokhachane, lefu la liphio kapa la sebete, MERIANA EOHLE e meng, le maeto a morao tjena kapa kalafo ea malaria ea pejana.",
      "Malaria e matla e ka mpefala kapele — lula tlhokomelong ho fihlela sehlopha se re ho tsoa ho bolokehile.",
      "Botsoa hore na ke liteko life tsa mali tsa ho latela le moralo oa antimalaria oa molomo o tla ka mor'a nako e bohale.",
      "Haeba ho ferekana, ho thothomela, moroto o lefifi, kapa ho hema thata ho hlaha — tsebisa sehlopha hang-hang.",
    ],
    [
      "I-artesunate yi-antimalarial yodidi lwe-artemisinin esetyenziswa kwiindlela ezinzima ze-malaria — yimeko engxamisekileyo yezonyango elawulwa esibhedlele ngoogqirha.",
      "I-Materia ayiyiqiqi idosi, ulandelelwano lwendlela, okanye ishedyuli yokuhla ngomlomo — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela ngokukhulelwa, isifo sezintso okanye sesibindi, ONKE amanye amayeza, nokuhamba kwakutsha nje okanye unyango lwe-malaria lwangaphambili.",
      "I-malaria enzima inokuba mbi ngokukhawuleza — hlala kukhathalelo de iqela lithi ukukhululwa kukhuselekile.",
      "Buza ukuba zeziphi iimvavanyo zegazi zokulandela kunye nesicwangciso se-antimalarial yomlomo esiza emva kwesigaba esibucala.",
      "Ukuba ukudideka, ukuxhuzula, umchamo omnyama, okanye ubunzima bokuphefumla kuvela — xelela iqela ngoko nangoko.",
    ],
  ),

  "mol-artemether-lumefantrine": five(
    [
      "Artemether/lumefantrine is an artemisinin combination therapy (ACT) used for uncomplicated falciparum malaria when clinicians choose it.",
      "Materia does not invent weight-band doses, food-timing hours, or course length — take exactly as the labelled product and your clinician direct.",
      "Tell the pharmacist about pregnancy or breastfeeding plans, heart-rhythm problems, and ALL other medicines — interaction checks matter with this ACT.",
      "Finish the full course unless a clinician tells you to stop — incomplete treatment risks treatment failure.",
      "Ask whether doses should be taken with food or milk as on your specific labelled pack, and what to do if you vomit a dose.",
      "If fever returns after finishing, breathing worsens, or you become confused — seek care urgently; it may not be simple malaria.",
    ],
    [
      "I-artemether/lumefantrine i-artemisinin combination therapy (ACT) esetshenziselwa i-falciparum malaria engajwayelekile lapho odokotela beyikhetha.",
      "I-Materia ayiqambi imithamo yezinhlaka zesisindo, amahora okudla, noma ubude bekosi — thatha ngokwemikhiqizo eneebula nomyalelo kadokotela.",
      "Tshela usokhemisi ngokukhulelwa noma ukuncelisa, izinkinga zesigqi senhliziyo, nawo WONKE amanye amaphilisi — ukuhlolwa kokuxhumana kubalulekile nale-ACT.",
      "Qedela inkosi yonke ngaphandle uma udokotela ethi uyeke — ukwelashwa okungaphelele kuyingozi yokwehluleka.",
      "Buza ukuthi imithamo kufanele ithathwe nokudla noma ubisi njengokusho iphakethe lakho, nokuthi wenzani uma uhlanza umthamo.",
      "Uma umkhuhlane ubuya ngemva kokuqeda, ukuphefumula kuba kubi, noma udideka — funa usizo ngokushesha; kungenzeka akuyona i-malaria elula.",
    ],
    [
      "Artemeter/lumefantrien is 'n artemisinien-kombinasie terapie (ACT) vir ongekompliseerde falciparum-malaria wanneer klinici dit kies.",
      "Materia versin nie gewigsbanddosisse, voedingstydure, of kursuslengte nie — neem presies soos die geëtiketteerde produk en jou klinikus aandui.",
      "Sê vir die apteker van swangerskap- of borsvoedingplanne, hart-ritmeprobleme, en ALLE ander medisyne — interaksiekontroles saak met hierdie ACT.",
      "Voltooi die volle kursus tensy 'n klinikus sê stop — onvolledige behandeling riskeer mislukking.",
      "Vra of dosisse met kos of melk geneem moet word soos op jou spesifieke pak, en wat om te doen as jy 'n dosis braak.",
      "As koors ná voltooiing terugkeer, asemhaling versleg, of jy verward raak — soek dringend sorg; dit mag nie eenvoudige malaria wees nie.",
    ],
    [
      "Artemether/lumefantrine ke kalafo ea motsoako oa artemisinin (ACT) bakeng sa malaria ea falciparum e sa rarahanang ha lingaka li e khetha.",
      "Materia ha e iqape litekanyo tsa mehato ea boima, lihora tsa lijo, kapa bolelele ba thuto — nka hantle joalo ka sehlahisoa se nang le ileibole le tataiso ea ngaka.",
      "Bolella chemist ka merero ea bokhachane kapa ho anyesa, mathata a morethetho oa pelo, le MERIANA EOHLE e meng — tlhahlobo ea ho sebelisana e bohlokoa le ACT ena.",
      "Qetella thuto eohle ntle le haeba ngaka e re emisa — kalafo e sa feleng e beha kotsi ea ho hloleha.",
      "Botsoa hore na litekanyo li lokela ho nkoa ka lijo kapa lebese joalo ka pakete ea hau, le hore na u etsa eng haeba u hlatsa tekanyo.",
      "Haeba feberu e khutla ka mor'a ho qetella, ho hema ho mpefala, kapa u ferekana — batla thuso ka potlako; e kanna eaba ha se malaria e bonolo.",
    ],
    [
      "I-artemether/lumefantrine yi-artemisinin combination therapy (ACT) esetyenziselwa i-falciparum malaria engaqhelekanga xa oogqirha beyikhetha.",
      "I-Materia ayiyiqiqi iidosi zomgca wobunzima, iiyure zokutya, okanye ubude bekhosi — thatha ngokwenene njengemveliso enelebula kunye nomyalelo kagqirha.",
      "Xelela usokhemisi ngezicwangciso zokukhulelwa okanye ukuncancisa, iingxaki zesigqi sentliziyo, nawo WONKE amanye amayeza — ukuhlola ukudibana kubalulekile nale-ACT.",
      "Gqibezela ikhosi epheleleyo ngaphandle kokuba ugqirha athi uyeke — unyango olungaphelelanga lubeka umngcipheko wokusilela.",
      "Buza ukuba iidosi kufuneka zithathwe nokutya okanye ubisi njengakwipakethe yakho, nokuba wenza ntoni ukuba ugabha idosi.",
      "Ukuba umkhuhlane ubuya emva kokugqiba, ukuphefumla kuya kuba kubi, okanye uyadideka — funa uncedo ngokukhawuleza; kusenokwenzeka ayisiyo malaria elula.",
    ],
  ),

  "mol-albendazole": five(
    [
      "Albendazole is a benzimidazole anthelmintic used for selected worm infections when a clinician chooses it.",
      "Materia does not invent a dose, duration, or pregnancy rule — confirm against the labelled product and current SA STG/EML.",
      "Tell your pharmacist if you are pregnant, planning pregnancy, or breastfeeding, and about liver disease or ALL other medicines.",
      "Take exactly as directed for the full course unless a clinician says stop — do not share leftover tablets.",
      "Ask whether food timing matters for your specific pack and what side effects should trigger a call-back.",
      "If severe tummy pain, yellowing of the eyes, dark urine, or unusual bruising develops — seek clinical advice promptly.",
    ],
    [
      "I-albendazole i-benzimidazole anthelmintic esetshenziselwa izifo ezikhethiwe zezibungu lapho udokotela eyikhetha.",
      "I-Materia ayiqambi umthamo, ubude bekosi, noma umthetho wokukhulelwa — qinisekisa nomkhiqizo onelebula ne-STG/EML yaseNingizimu Afrika.",
      "Tshela usokhemisi uma ukhulelwe, uhlela ukukhulelwa, noma uncelisa, nangesifo sesibindi noma WONKE amanye amaphilisi.",
      "Thatha ngokomyalelo wenkosi yonke ngaphandle uma udokotela ethi uyeke — ungabelani amaphilisi asele.",
      "Buza ukuthi isikhathi sokudla sibalulekile yini kuphakethe lakho nokuthi yiziphi izimpawu ezidinga ukushayela.",
      "Uma ubuhlungu besisu obukhulu, ukuphuzi kwamehlo, umchamo omnyama, noma ukulinyazeka okungajwayelekile kuvela — funa iseluleko ngokushesha.",
    ],
    [
      "Albendasool is 'n bensimidasool-wurmmiddel vir geselekteerde wurminfeksies wanneer 'n klinikus dit kies.",
      "Materia versin nie 'n dosis, duur, of swangerskapsreël nie — bevestig teen die geëtiketteerde produk en huidige SA STG/EML.",
      "Sê vir jou apteker as jy swanger is, beplan om swanger te raak, of borsvoed, en oor lewersiekte of ALLE ander medisyne.",
      "Neem presies soos aangedui vir die volle kursus tensy 'n klinikus sê stop — moenie oorblywende tablette deel nie.",
      "Vra of voedingstydsberekening vir jou spesifieke pak saak maak en watter newe-effekte 'n terugbel moet sneller.",
      "As ernstige buikpyn, vergeling van die oë, donker urine, of ongewone kneusings ontwikkel — soek gou kliniese advies.",
    ],
    [
      "Albendazole ke benzimidazole anthelmintic e sebelisoang bakeng sa mafu a khethiloeng a liboko ha ngaka e e khetha.",
      "Materia ha e iqape tekanyo, bolelele, kapa molao oa bokhachane — netefatsa khahlanong le sehlahisoa se nang le ileibole le STG/EML ea SA.",
      "Bolella chemist haeba u mokhachane, u rera ho ima, kapa u anyesa, le ka lefu la sebete kapa MERIANA EOHLE e meng.",
      "Nka hantle joalo ka tataiso bakeng sa thuto eohle ntle le haeba ngaka e re emisa — u se ke ua arolelana lipilisi tse setseng.",
      "Botsoa hore na nako ea lijo e bohlokoa bakeng sa pakete ea hau le hore na ke liphello life tse tlamehang ho baka mohala.",
      "Haeba bohloko ba mpeng bo matla, ho mofubelu oa mahlo, moroto o lefifi, kapa ho otloa ho sa tloaelehang ho hlaha — batla keletso ka potlako.",
    ],
    [
      "I-albendazole yi-benzimidazole anthelmintic esetyenziselwa izifo ezikhethiweyo zeentshulube xa ugqirha eyikhetha.",
      "I-Materia ayiyiqiqi idosi, ubude, okanye umthetho wokukhulelwa — Qinisekisa nemveliso enelebula kunye ne-STG/EML yaseMzantsi Afrika.",
      "Xelela usokhemisi ukuba ukhulelwe, uceba ukukhulelwa, okanye uncancisa, nangesifo sesibindi okanye ONKE amanye amayeza.",
      "Thatha ngokomyalelo wekhosi epheleleyo ngaphandle kokuba ugqirha athi uyeke — ungabelani iipilisi ezisele.",
      "Buza ukuba ixesha lokutya libalulekile na kwipakethe yakho nokuba zeziphi iimpawu ezifuna umnxeba.",
      "Ukuba intlungu yesisu enzima, ukutyheliwa kwamehlo, umchamo omnyama, okanye ukulimala okungaqhelekanga kuvela — funa ingcebiso ngokukhawuleza.",
    ],
  ),

  "mol-praziquantel": five(
    [
      "Praziquantel is an anthelmintic used for schistosomiasis and selected tapeworm pathways when a clinician chooses it.",
      "Materia does not invent a mg/kg dose or food-timing rule — confirm against the labelled product and current SA STG/EML.",
      "Tell your pharmacist about liver disease, seizures or neurological disease, pregnancy plans, and ALL other medicines.",
      "Dizziness or tummy upset can occur; avoid risky activities like driving until you know how you respond, if advised.",
      "Ask whether the dose should be taken with food as on your pack and how to report ongoing symptoms.",
      "If seizures, severe headache with vomiting, yellowing of the eyes, or collapse occurs — seek urgent care.",
    ],
    [
      "I-praziquantel i-anthelmintic esetshenziselwa i-schistosomiasis nezindlela ezikhethiwe ze-tapeworm lapho udokotela eyikhetha.",
      "I-Materia ayiqambi umthamo we-mg/kg noma umthetho wesikhathi sokudla — qinisekisa nomkhiqizo onelebula ne-STG/EML yaseNingizimu Afrika.",
      "Tshela usokhemisi ngesifo sesibindi, ukuxega noma isifo sezinzwa, izinhlelo zokukhulelwa, nawo WONKE amanye amaphilisi.",
      "Isizungu noma ukuphazamiseka kwesisu kungavela; gwema imisebenzi eyingozi njengokushayela uze wazi ukuthi uphendula kanjani, uma uyalelwa.",
      "Buza ukuthi umthamo kufanele uthathwe nokudla njengokusho iphakethe lakho nokuthi ubika kanjani izimpawu eziqhubekayo.",
      "Uma ukuxega, ikhanda elibuhlungu kakhulu nokuhlanza, ukuphuzi kwamehlo, noma ukuwa — funa usizo oluphuthumayo.",
    ],
    [
      "Praziquantel is 'n wurmmiddel vir skistosomiase en geselekteerde lintwurmpaaie wanneer 'n klinikus dit kies.",
      "Materia versin nie 'n mg/kg-dosis of voedingstydreël nie — bevestig teen die geëtiketteerde produk en huidige SA STG/EML.",
      "Sê vir jou apteker van lewersiekte, aanvalle of neurologiese siekte, swangerskapsplanne, en ALLE ander medisyne.",
      "Duizeligheid of maagongemak kan voorkom; vermy riskante aktiwiteite soos bestuur totdat jy weet hoe jy reageer, indien aangeraai.",
      "Vra of die dosis met kos geneem moet word soos op jou pak en hoe om voortgesette simptome te rapporteer.",
      "As aanvalle, ernstige hoofpyn met braking, vergeling van die oë, of ineenstorting voorkom — soek dringende sorg.",
    ],
    [
      "Praziquantel ke anthelmintic e sebelisoang bakeng sa schistosomiasis le litsela tse khethiloeng tsa tapeworm ha ngaka e e khetha.",
      "Materia ha e iqape tekanyo ea mg/kg kapa molao oa nako ea lijo — netefatsa khahlanong le sehlahisoa se nang le ileibole le STG/EML ea SA.",
      "Bolella chemist ka lefu la sebete, ho thothomela kapa lefu la methapo, merero ea bokhachane, le MERIANA EOHLE e meng.",
      "Ho lehloeo kapa ho teneha ha mpeng ho ka hlaha; qoba mesebetsi e kotsi joalo ka ho khanna ho fihlela u tseba hore na u arabela joang, haeba u elelitsoe.",
      "Botsoa hore na tekanyo e lokela ho nkoa ka lijo joalo ka pakete ea hau le hore na u tlaleha matšoao a tsoelang pele joang.",
      "Haeba ho thothomela, hlooho e bohloko haholo le ho hlatsa, ho mofubelu oa mahlo, kapa ho oa — batla thuso ea potlako.",
    ],
    [
      "I-praziquantel yi-anthelmintic esetyenziselwa i-schistosomiasis kunye neendlela ezikhethiweyo ze-tapeworm xa ugqirha eyikhetha.",
      "I-Materia ayiyiqiqi idosi ye-mg/kg okanye umthetho wexesha lokutya — Qinisekisa nemveliso enelebula kunye ne-STG/EML yaseMzantsi Afrika.",
      "Xelela usokhemisi ngesifo sesibindi, ukuxhuzula okanye isifo sezinzwa, izicwangciso zokukhulelwa, nawo WONKE amanye amayeza.",
      "Isizungu okanye ukuphazamiseka kwesisu kunokuvela; pepa imisebenzi eyingozi njengokukhwela de wazi indlela ophendula ngayo, ukuba uyalelwa.",
      "Buza ukuba idosi kufuneka ithathwe nokutya njengakwipakethe yakho nokuba uxela njani iimpawu eziqhubekayo.",
      "Ukuba ukuxhuzula, intloko ebuhlungu kakhulu nokugabha, ukutyheliwa kwamehlo, okanye ukuwa — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-amphotericin-b": five(
    [
      "Amphotericin B is a polyene antifungal used for serious fungal and selected opportunistic infections — hospital/specialist pathways only.",
      "Materia does not invent a dose, premedication, or potassium/magnesium monitoring schedule — formulation (conventional vs lipid) matters; confirm the product in hand.",
      "Tell clinicians about kidney disease, ALL other medicines, and prior infusion reactions to antifungals.",
      "Infusion-related fever, chills, or kidney/electrolyte effects are recognised teaching points — the team monitors labs during therapy.",
      "Ask which formulation you are receiving and what symptoms should be reported during the infusion.",
      "If chest pain, severe shortness of breath, reduced urine, or confusion develops — alert the care team immediately.",
    ],
    [
      "I-amphotericin B i-polyene antifungal esetshenziselwa izifo ezinzima zesikhunta nezifo ezikhethiwe ze-opportunistic — izindlela zesibhedlela/zongoti kuphela.",
      "I-Materia ayiqambi umthamo, i-premedication, noma uhlelo lokuqapha i-potassium/magnesium — ukwakheka (okujwayelekile vs i-lipid) kubalulekile; qinisekisa umkhiqizo osesandleni.",
      "Tshela odokotela ngesifo sezinso, WONKE amanye amaphilisi, nokuphendula kwangaphambilini kwe-infusion kuma-antifungal.",
      "Umkhuhlane, ukuqhaqhazela, noma imiphumela yezinso/ama-electrolyte ahlobene ne-infusion ayizinto zokufundisa — ithimba liqapha amalebhu ngesikhathi sokwelashwa.",
      "Buza ukuthi yiluphi ukwakheka owatholayo nokuthi yiziphi izimpawu okufanele zibikwe ngesikhathi se-infusion.",
      "Uma ubuhlungu besifuba, ukuphefumula kanzima kakhulu, umchamo omncane, noma ukudideka kuvela — xwayisa ithimba ngokushesha.",
    ],
    [
      "Amfoterisien B is 'n polieen-swammiddel vir ernstige swam- en geselekteerde opportunistiese infeksies — slegs hospitaal-/spesialispaaie.",
      "Materia versin nie 'n dosis, premedikasie, of kalium-/magnesium-moniteringskedule nie — formulering (konvensioneel vs lipied) saak; bevestig die produk in die hand.",
      "Sê vir klinici van niersiekte, ALLE ander medisyne, en vorige infusiereaksies op swammiddels.",
      "Infusie-verwante koors, rillings, of nier-/elektrolieteffekte is erkende onderrigpunte — die span monitor laboratoiumtoetse tydens terapie.",
      "Vra watter formulering jy ontvang en watter simptome tydens die infusie gerapporteer moet word.",
      "As borspyn, ernstige asemnood, verminderde urine, of verwarring ontwikkel — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Amphotericin B ke polyene antifungal e sebelisoang bakeng sa mafu a matla a fungal le opportunistic a khethiloeng — litsela tsa sepetlele/litsebi feela.",
      "Materia ha e iqape tekanyo, premedication, kapa kemiso ea ho hlokomela potassium/magnesium — sebopeho (se tloaelehileng vs lipid) sea bohlokoa; netefatsa sehlahisoa se letsohong.",
      "Bolella lingaka ka lefu la liphio, MERIANA EOHLE e meng, le karabelo ea pejana ea infusion ho li-antifungal.",
      "Feberu, ho thothomela, kapa liphello tsa liphio/li-electrolyte tse amanang le infusion ke lintlha tsa thuto — sehlopha se hlokomela liteko nakong ea kalafo.",
      "Botsoa hore na ke sebopeho sefe seo u se fumanang le hore na ke matšoao afe a lokelang ho tlalehoa nakong ea infusion.",
      "Haeba bohloko ba sefuba, ho hema thata haholo, moroto o fokotsehileng, kapa ho ferekana ho hlaha — tsebisa sehlopha hang-hang.",
    ],
    [
      "I-amphotericin B yi-polyene antifungal esetyenziselwa izifo ezinzima zefungus kunye nezifo ezikhethiweyo ze-opportunistic — iindlela zesibhedlele/zeengcali kuphela.",
      "I-Materia ayiyiqiqi idosi, i-premedication, okanye ishedyuli yokuqaphela i-potassium/magnesium — ukwakheka (okuqhelekileyo vs i-lipid) kubalulekile; Qinisekisa imveliso esesandleni.",
      "Xelela oogqirha ngesifo sezintso, ONKE amanye amayeza, kunye neempendulo zangaphambili ze-infusion kuma-antifungal.",
      "Umkhuhlane, ukungcangcazela, okanye iziphumo zezintso/ii-electrolyte ezinxulumene ne-infusion zizinto zokufundisa — iqela liqaphela iilabhu ngexesha lonyango.",
      "Buza ukuba loluphi ukwakheka olufumanayo nokuba zeziphi iimpawu ezifanele zixelwe ngexesha le-infusion.",
      "Ukuba intlungu yesifuba, ukuphefumla nzima kakhulu, umchamo onciphileyo, okanye ukudideka kuvela — xelela iqela ngoko nangoko.",
    ],
  ),

  "mol-ampicillin": five(
    [
      "Ampicillin is an aminopenicillin antibiotic used for selected susceptible infections in hospital and other labelled pathways.",
      "Materia does not invent a dose, interval, or course length — confirm against current SA STG/EML and the labelled product.",
      "Tell your pharmacist or clinician about ANY penicillin or beta-lactam allergy before this medicine is given.",
      "Finish the prescribed course unless a clinician says stop — report severe diarrhoea, rash, or breathing difficulty urgently.",
      "Ask whether food timing matters for your oral form (if used) and how to store reconstituted liquid if supplied.",
      "If facial swelling, wheeze, collapse, or bloody diarrhoea develops — seek emergency care immediately.",
    ],
    [
      "I-ampicillin i-aminopenicillin antibiotic esetshenziselwa izifo ezikhethiwe ezizwela umuthi ezibhedlela nasezindleleni ezinelebula.",
      "I-Materia ayiqambi umthamo, isikhathi phakathi, noma ubude bekosi — qinisekisa ne-STG/EML yaseNingizimu Afrika nomkhiqizo onelebula.",
      "Tshela usokhemisi noma udokotela nganoma yikuphi ukungezwani kwe-penicillin noma i-beta-lactam ngaphambi kokunikezwa kwalo muthi.",
      "Qedela inkosi engunyiwe ngaphandle uma udokotela ethi uyeke — bika isidia ebuhlungu, irashi, noma ubunzima bokuphefumula ngokushesha.",
      "Buza ukuthi isikhathi sokudla sibalulekile yini kwifomu yakho yomlomo (uma isetshenziswa) nokuthi ugcina kanjani uketshezi oluhlanganisiwe uma lunikeziwe.",
      "Uma ukuvuvukala kobuso, ukubhobha, ukuwa, noma isidia esinegazi kuvela — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Ampisillien is 'n aminopenisillien-antibiotikum vir geselekteerde vatbare infeksies in hospitaal- en ander geëtiketteerde paaie.",
      "Materia versin nie 'n dosis, interval, of kursuslengte nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir jou apteker of klinikus van ENIGE penisillien- of beta-laktamallergie voordat hierdie medisyne gegee word.",
      "Voltooi die voorgeskrewe kursus tensy 'n klinikus sê stop — rapporteer ernstige diarree, uitslag, of asemnood dringend.",
      "Vra of voedingstydsberekening vir jou mondelinge vorm (indien gebruik) saak maak en hoe om gerekonstrueerde vloeistof te stoor indien verskaf.",
      "As gesigswelling, piep, ineenstorting, of bloederige diarree ontwikkel — soek onmiddellik noodhulp.",
    ],
    [
      "Ampicillin ke aminopenicillin antibiotic e sebelisoang bakeng sa mafu a khethiloeng a amohelang meriana litseleng tsa sepetlele le tse ling tse nang le ileibole.",
      "Materia ha e iqape tekanyo, nako pakeng, kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella chemist kapa ngaka ka allergy EFE KAPA EFE ea penicillin kapa beta-lactam pele moriana ona o fanoa.",
      "Qetella thuto e ngoliloeng ntle le haeba ngaka e re emisa — tlaleha letshollo le matla, lekome, kapa ho hema thata ka potlako.",
      "Botsoa hore na nako ea lijo e bohlokoa bakeng sa foromo ea hau ea molomo (haeba e sebelisoa) le hore na u boloka joang mokelikeli o kopantsoeng haeba o fanoa.",
      "Haeba ho ruruha ha sefahleho, ho honotha, ho oa, kapa letshollo le nang le mali ho hlaha — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-ampicillin yi-aminopenicillin antibiotic esetyenziselwa izifo ezikhethiweyo ezivakalelwa liyeza kwiindlela zesibhedlele kunye nezinye ezinelebula.",
      "I-Materia ayiyiqiqi idosi, ixesha phakathi, okanye ubude bekhosi — Qinisekisa ne-STG/EML yaseMzantsi Afrika kunye nemveliso enelebula.",
      "Xelela usokhemisi okanye ugqirha ngayo NAYIPHI allergy ye-penicillin okanye i-beta-lactam phambi kokuba eli yeza linikwe.",
      "Gqibezela ikhosi emiselweyo ngaphandle kokuba ugqirha athi uyeke — xela urhudo olubi, irhashi, okanye ubunzima bokuphefumla ngokukhawuleza.",
      "Buza ukuba ixesha lokutya libalulekile na kwifomu yakho yomlomo (ukuba isetyenziswa) nokuba ugcina njani ulwelo oludibanisiweyo ukuba lunikeziwe.",
      "Ukuba ukudumba kobuso, ukubhobha, ukuwa, okanye urhudo olnegazi kuvela — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-cefazolin": five(
    [
      "Cefazolin is a first-generation cephalosporin used for selected infections and often for surgical prophylaxis in hospital pathways.",
      "Materia does not invent a dose, redosing interval, or allergy algorithm — confirm against current SA STG/EML and the labelled product.",
      "Tell the team about ANY penicillin or cephalosporin allergy before cefazolin is given around surgery or treatment.",
      "This is usually an injection given by clinicians — ask what monitoring for rash or breathing difficulty will occur after the dose.",
      "Ask how long prophylaxis continues for your procedure and whether further antibiotic doses are planned.",
      "If rash, facial swelling, wheeze, or collapse occurs after a dose — seek emergency care immediately.",
    ],
    [
      "I-cefazolin i-cephalosporin yesizukulwane sokuqala esetshenziselwa izifo ezikhethiwe futhi kuvame ukuvikela ukuhlinzwa ezindleleni zesibhedlela.",
      "I-Materia ayiqambi umthamo, isikhathi sokuphinda, noma i-algorithm yokungezwani — qinisekisa ne-STG/EML yaseNingizimu Afrika nomkhiqizo onelebula.",
      "Tshela ithimba nganoma yikuphi ukungezwani kwe-penicillin noma i-cephalosporin ngaphambi kokunikezwa kwe-cefazolin ngesikhathi sokuhlinzwa noma ukwelashwa.",
      "Lokhu kuvame ukuba umjovo onikezwa odokotela — buza ukuthi yikuphi ukuqapha irashi noma ubunzima bokuphefumula okuzokwenzeka ngemva komthamo.",
      "Buza ukuthi ukuvikela kuqhubeka isikhathi esingakanani enqubeni yakho nokuthi kukhona yini eminye imithamo ye-antibiotic ehleliwe.",
      "Uma irashi, ukuvuvukala kobuso, ukubhobha, noma ukuwa kuvela ngemva komthamo — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Sefasolien is 'n eerste-generasie sefalosporien vir geselekteerde infeksies en dikwels vir chirurgiese profilakse in hospitaalpaaie.",
      "Materia versin nie 'n dosis, herdoseringsinterval, of allergie-algoritme nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir die span van ENIGE penisillien- of sefalosporienallergie voordat sefasolien rondom chirurgie of behandeling gegee word.",
      "Dit is gewoonlik 'n inspuiting deur klinici — vra watter monitering vir uitslag of asemnood ná die dosis sal plaasvind.",
      "Vra hoe lank profilakse vir jou prosedure voortduur en of verdere antibiotikadosisse beplan is.",
      "As uitslag, gesigswelling, piep, of ineenstorting ná 'n dosis voorkom — soek onmiddellik noodhulp.",
    ],
    [
      "Cefazolin ke cephalosporin ea moloko oa pele e sebelisoang bakeng sa mafu a khethiloeng 'me hangata bakeng sa thibelo ea opereishene litseleng tsa sepetlele.",
      "Materia ha e iqape tekanyo, nako ea ho pheta, kapa algorithm ea allergy — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka allergy EFE KAPA EFE ea penicillin kapa cephalosporin pele cefazolin e fanoa nakong ea opereishene kapa kalafo.",
      "Hona hangata ke ente e fanoang ke lingaka — botsoa hore na ke tlhokomelo efe ea lekome kapa ho hema thata e tla etsahala ka mor'a tekanyo.",
      "Botsoa hore na thibelo e tsoela pele nako e kae bakeng sa mohato oa hau le hore na ho na le litekanyo tse ling tsa antibiotic tse reriloeng.",
      "Haeba lekome, ho ruruha ha sefahleho, ho honotha, kapa ho oa ho hlaha ka mor'a tekanyo — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-cefazolin yi-cephalosporin yesizukulwana sokuqala esetyenziselwa izifo ezikhethiweyo kwaye rhoqo kukhuselo lokutyandwa kwiindlela zesibhedlele.",
      "I-Materia ayiyiqiqi idosi, ixesha lokuphinda, okanye i-algorithm ye-allergy — Qinisekisa ne-STG/EML yaseMzantsi Afrika kunye nemveliso enelebula.",
      "Xelela iqela ngayo NAYIPHI allergy ye-penicillin okanye i-cephalosporin phambi kokuba i-cefazolin inikwe ngexesha lokutyandwa okanye unyango.",
      "Oku kudla ngokuba yinjeksini enikwa ngoogqirha — buza ukuba yeyiphi ukubeka esweni irhashi okanye ubunzima bokuphefumla okuya kwenzeka emva kwedosi.",
      "Buza ukuba ukhuseleko luqhubeka ixesha elingakanani kwinkqubo yakho nokuba kukho na ezinye iidosi ze-antibiotic ezicwangcisiweyo.",
      "Ukuba irhashi, ukudumba kobuso, ukubhobha, okanye ukuwa kuvela emva kwedosi — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-benzylpenicillin": five(
    [
      "Benzylpenicillin (penicillin G) is a classic natural penicillin used for selected susceptible infections in hospital pathways.",
      "Materia does not invent a unit dose, infusion rate, or duration — confirm against current SA STG/EML and the labelled product.",
      "Tell clinicians about ANY penicillin allergy before this medicine is started — allergy history is a critical safety check.",
      "It is usually given by injection or infusion under clinical supervision — report rash, itch, or breathing difficulty during or after a dose.",
      "Ask what infection is being treated and how long the course is expected to continue.",
      "If facial swelling, wheeze, collapse, or severe diarrhoea with blood develops — seek emergency care immediately.",
    ],
    [
      "I-benzylpenicillin (penicillin G) i-penicillin yemvelo yakudala esetshenziselwa izifo ezikhethiwe ezizwela umuthi ezindleleni zesibhedlela.",
      "I-Materia ayiqambi umthamo we-unit, isivinini se-infusion, noma ubude — qinisekisa ne-STG/EML yaseNingizimu Afrika nomkhiqizo onelebula.",
      "Tshela odokotela nganoma yikuphi ukungezwani kwe-penicillin ngaphambi kokuqala lo muthi — umlando wokungezwani uwuhlolo olubalulekile lokuphepha.",
      "Ivame ukunikezwa ngomjovo noma i-infusion ngaphansi kokuqapha kodokotela — bika irashi, ukulunywa, noma ubunzima bokuphefumula ngesikhathi noma ngemva komthamo.",
      "Buza ukuthi yisiphi isifo eselashwayo nokuthi inkosi ilindelwe ukuqhubeka isikhathi esingakanani.",
      "Uma ukuvuvukala kobuso, ukubhobha, ukuwa, noma isidia esibi esinegazi kuvela — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Bensielpenisillien (penisillien G) is 'n klassieke natuurlike penisillien vir geselekteerde vatbare infeksies in hospitaalpaaie.",
      "Materia versin nie 'n eenheidsdosis, infusietempo, of duur nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir klinici van ENIGE penisillienallergie voordat hierdie medisyne begin word — allergiegeskiedenis is 'n kritieke veiligheidsondersoek.",
      "Dit word gewoonlik per inspuiting of infusie onder kliniese toesig gegee — rapporteer uitslag, jeuk, of asemnood tydens of ná 'n dosis.",
      "Vra watter infeksie behandel word en hoe lank die kursus verwag word om voort te duur.",
      "As gesigswelling, piep, ineenstorting, of ernstige diarree met bloed ontwikkel — soek onmiddellik noodhulp.",
    ],
    [
      "Benzylpenicillin (penicillin G) ke penicillin ea tlhaho ea khale e sebelisoang bakeng sa mafu a khethiloeng a amohelang meriana litseleng tsa sepetlele.",
      "Materia ha e iqape tekanyo ea unit, lebelo la infusion, kapa bolelele — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella lingaka ka allergy EFE KAPA EFE ea penicillin pele moriana ona o qala — histori ea allergy ke tlhahlobo ea bohlokoa ea tšireletso.",
      "Hangata e fanoa ka ente kapa infusion tlas'a tlhokomelo ea bongaka — tlaleha lekome, ho hlohlona, kapa ho hema thata nakong kapa ka mor'a tekanyo.",
      "Botsoa hore na ke tšoaetso efe e alafsoang le hore na thuto e lebelletsoe ho tsoela pele nako e kae.",
      "Haeba ho ruruha ha sefahleho, ho honotha, ho oa, kapa letshollo le matla le nang le mali ho hlaha — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-benzylpenicillin (penicillin G) yi-penicillin yendalo yeklasi esetyenziselwa izifo ezikhethiweyo ezivakalelwa liyeza kwiindlela zesibhedlele.",
      "I-Materia ayiyiqiqi idosi ye-unit, isantya se-infusion, okanye ubude — Qinisekisa ne-STG/EML yaseMzantsi Afrika kunye nemveliso enelebula.",
      "Xelela oogqirha ngayo NAYIPHI allergy ye-penicillin phambi kokuba eli yeza liqaliswe — imbali ye-allergy luvavanyo olubalulekileyo lokhuseleko.",
      "Idla ngokunikwa ngenjeksini okanye i-infusion phantsi kweliso lezonyango — xela irhashi, ukurhawuzela, okanye ubunzima bokuphefumla ngexesha okanye emva kwedosi.",
      "Buza ukuba yeyiphi isifo esinyangwayo nokuba ikhosi ilindeleke ukuqhubeka ixesha elingakanani.",
      "Ukuba ukudumba kobuso, ukubhobha, ukuwa, okanye urhudo olubi olnegazi kuvela — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),
};
