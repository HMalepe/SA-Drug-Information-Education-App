/**
 * v200–v209 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V200_TO_V209: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-heparin": five(
    [
      "Use this unfractionated heparin exactly as directed on your labelled product — injection technique and monitoring belong with your care team.",
      "Heparin counselling commonly includes bleed watch and not combining with other blood thinners unless your clinician agrees. Materia does not invent a dose, aPTT target, or injection schedule.",
      "Tell your pharmacist about recent surgery, ulcers, stroke history, and ALL other anticoagulants or antiplatelets on your list.",
      "Report unusual bruising, black stools, pink urine, or severe headache early for clinician review.",
      "Ask how missed doses should be handled on your care plan — do not invent spacing hours or a catch-up plan.",
      "If you vomit blood, have a sudden severe headache with collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le unfractionated heparin njengoba kubhalwe kumkhiqizo onelebula — indlela yokujova nokuqapha kuhambisana nethimba lakho lokunakekelwa.",
      "Ukwelulekwa kwe-heparin kuvame ukufaka ukugada ukopha nokungahlanganisi namanye ama-blood thinner ngaphandle kokuvuma kukadokotela. I-Materia ayiqambi umthamo, umgomo we-aPTT, noma uhlelo lokujova.",
      "Tshela umkhiqizi ngokuhlinzwa kwakamuva, izilonda, umlando we-stroke, NAWO WONKE amanye ama-anticoagulant noma ama-antiplatelet.",
      "Bika amabala aluhlaza angajwayelekile, izindlebe ezimnyama, umchamo ophinki, noma ikhanda elibuhlungu kakhulu ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani ohlelweni lwakho — ungayiqiqi amahora okuhlukanisa noma uhlelo lokubuyisela.",
      "Uma uhlanza igazi, unekhanda elibuhlungu elizumayo nokukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie ongefractioneerde heparien soos op die geëtiketteerde produk aangedui — inspuitingstegniek en monitering behoort by jou sorgspan.",
      "Heparien-berading sluit dikwels bloedingwaak in en om nie met ander bloedverdunners te kombineer tensy jou klinikus saamstem nie. Materia versin nie ’n dosis, aPTT-teiken of inspuitingskedule nie.",
      "Sê vir jou apteker van onlangse chirurgie, ulkusse, beroertegeskiedenis, en ALLE ander antikoagulante of antiplaatjies op jou lys.",
      "Rapporteer ongewone kneusings, swart stoelgang, pienk urine, of ernstige hoofpyn vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou sorgplan hanteer moet word — moenie skeidingsure of ’n inhaalplan versin nie.",
      "As jy bloed braak, skielike ernstige hoofpyn met ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa unfractionated heparin ena hantle kamoo e hlalositsoeng holabel — mokhoa oa ho enteoa le ho hlokomela ke tsa sehlopha sa hau sa tlhokomelo.",
      "Keletso ea heparin hangata e kenyelletsa ho hlokomela ho tsoa mali le ho se e kopanye le li-blood thinner tse ling ntle le tumellano ea ngaka. Materia ha e iqape tekanyo, sepheo sa aPTT, kapa kemiso ea ho enteoa.",
      "Bolella rakhemisi ka opereishene ea morao-rao, maqeba, histori ea stroke, le LI-ANTICOAGULANT KAPA LI-ANTIPLATELET TSOHLE.",
      "Tlaleha matheba a sootho a sa tloaelehang, litšila tse ntšo, moroto o pinki, kapa hlooho e bohloko haholo kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang moralong oa hau — se ke oa iqapa lihora tsa ho arola kapa moralo oa ho tsosolosa.",
      "Haeba u hlatsa mali, u na le hlooho e bohloko ka tšohanyetso ka ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le unfractionated heparin ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ubuchule bokutofa nokuqapha buhamba neqela lakho lokhathalelo.",
      "Iingcebiso ze-heparin zihlala zibandakanya ukuqapha ukopha nokungadibanisi nezinye ii-blood thinner ngaphandle kokuvuma kugqirha. I-Materia ayiyiqiqi idosi, usukelo lwe-aPTT, okanye ishedyuli yokutofa.",
      "Xelela usokhemisti ngotyando lwakutshanje, izilonda, imbali ye-stroke, NAZO ZONKE ezinye ii-anticoagulant okanye ii-antiplatelet.",
      "Xela amabala aluhlaza angaqhelekanga, izindlebe ezimnyama, umchamo opinki, okanye intloko ebuhlungu kakhulu kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwisicwangciso sakho — sukuyiqqa iiyure zokwahlula okanye isicwangciso sokubuyisela.",
      "Ukuba uhlanza igazi, unentloko ebuhlungu ngequbuliso nokukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-morphine": five(
    [
      "Take this opioid analgesic exactly as directed on your labelled product — do not increase on your own or share with others.",
      "Morphine counselling commonly includes drowsiness, constipation, and not combining with alcohol or other sedatives unless your clinician agrees. Materia does not invent a dose or titration schedule.",
      "Tell your pharmacist about breathing problems, sleep apnoea, other opioids or benzodiazepines, and pregnancy plans.",
      "Use a labelled constipation plan if your clinician provides one — do not invent a laxative schedule.",
      "Report severe sleepiness, confusion, or slow breathing early for urgent review.",
      "If breathing becomes slow or shallow, you cannot be woken easily, or lips turn blue — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le opioid analgesic njengoba kubhalwe kumkhiqizo onelebula — ungakhuphuli wedwa noma wabelane nabanye.",
      "Ukwelulekwa kwe-morphine kuvame ukufaka ukozela, ukuqina kwamathumbu, nokungahlanganisi notshwala noma amanye ama-sedative ngaphandle kokuvuma kukadokotela. I-Materia ayiqambi umthamo noma uhlelo lokunyuka.",
      "Tshela umkhiqizi ngezinkinga zokuphefumula, i-sleep apnoea, amanye ama-opioid noma ama-benzodiazepine, nezinhlelo zokukhulelwa.",
      "Sebenzisa uhlelo lwelebula lokuqina kwamathumbu uma udokotela elunikeza — ungayiqiqi uhlelo lwe-laxative.",
      "Bika ukozela okukhulu, ukudideka, noma ukuphefumula kancane ngokushesha ukuze kubuyekezwe ngokushesha.",
      "Uma ukuphefumula kuba kancane noma kufiphala, ungavuswa kalula, noma izindebe ziba luhlaza — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Neem hierdie opioïed-pynstiller soos op die geëtiketteerde produk aangedui — moenie self verhoog of met ander deel nie.",
      "Morfiene-berading sluit dikwels slaperigheid, hardlywigheid, en om nie met alkohol of ander sederende middels te kombineer tensy jou klinikus saamstem nie. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Sê vir jou apteker van asemhalingsprobleme, slaapapnee, ander opioïede of bensodiasepiene, en swangerskapsplanne.",
      "Gebruik ’n geëtiketteerde hardlywigheidplan as jou klinikus een gee — moenie ’n lakseermiddelskedeule versin nie.",
      "Rapporteer ernstige slaperigheid, verwarring, of stadige asemhaling vroeg vir dringende hersiening.",
      "As asemhaling stadig of vlak word, jy nie maklik wakker gemaak kan word nie, of lippe blou word — soek noodhulp dadelik.",
    ],
    [
      "Sebelisa opioid analgesic ena hantle kamoo e hlalositsoeng holabel — se ke oa e nyolla u le mong kapa u arolelane le ba bang.",
      "Keletso ea morphine hangata e kenyelletsa ho otsela, ho thatafala ha mala, le ho se e kopanye le joala kapa li-sedative tse ling ntle le tumellano ea ngaka. Materia ha e iqape tekanyo kapa kemiso ea ho nyolohela.",
      "Bolella rakhemisi ka mathata a ho hema, sleep apnoea, li-opioid kapa li-benzodiazepine tse ling, le merero ea ho ima.",
      "Sebelisa moralo oa leibole oa ho thatafala ha mala haeba ngaka e o fana — se ke oa iqapa kemiso ea laxative.",
      "Tlaleha ho otsela ho matla, ho ferekana, kapa ho hema butle kapele bakeng sa tlhahlobo ea potlako.",
      "Haeba ho hema ho fetoha butle kapa sehlahisoa, u sitoa ho tsosoa habonolo, kapa melomo e fetoha boputsoa — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "Sebenzisa le opioid analgesic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukunyusa wedwa okanye wabelane nabanye.",
      "Iingcebiso ze-morphine zihlala zibandakanya ukozela, ukuqina kwamathumbu, nokungadibanisi notywala okanye ezinye ii-sedative ngaphandle kokuvuma kugqirha. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyuka.",
      "Xelela usokhemisti ngeengxaki zokuphefumla, i-sleep apnoea, ezinye ii-opioid okanye ii-benzodiazepine, nezicwangciso zokukhulelwa.",
      "Sebenzisa isicwangciso seleyibhile sokuqina kwamathumbu ukuba ugqirha usinika — sukuyiqqa ishedyuli ye-laxative.",
      "Xela ukolala okunzima, ukudideka, okanye ukuphefumla kancinci kwangoko ukuze kujongwe ngokukhawuleza.",
      "Ukuba ukuphefumla kuba kancinci okanye kufiphala, awuvuswa lula, okanye imilebe iba luhlaza — funa uncedo olungxamisekileyo kwangoko.",
    ],
  ),

  "mol-tranexamic-acid": five(
    [
      "Take this antifibrinolytic exactly as directed on your labelled product — heavy-period courses are common counselling; confirm the labelled window.",
      "Tranexamic acid counselling commonly includes clot-risk discussions and not using it if you have an active clot unless your clinician says so. Materia does not invent a dose, day-count, or bleed score.",
      "Tell your pharmacist about clot history, migraine with aura, combined hormonal contraception, and ALL other medicines on your list.",
      "Report calf pain with swelling, chest pain, sudden shortness of breath, or vision change early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antifibrinolytic njengoba kubhalwe kumkhiqizo onelebula — izinkambo zenyanga enzima zivame ukufundiswa; qinisekisa iwindi yelebula.",
      "Ukwelulekwa kwe-tranexamic acid kuvame ukufaka izingxoxo zengozi yeqhwa nokungayisebenzisi uma uneqhwa elisebenzayo ngaphandle kokusho kukadokotela. I-Materia ayiqambi umthamo, inani lezinsuku, noma isikali sokopha.",
      "Tshela umkhiqizi ngomlando weqhwa, i-migraine ene-aura, i-contraception yamahormone ahlanganisiwe, NAWO WONKE amanye amaphilisi.",
      "Bika ubuhlungu beqakala nokuvuvuka, ubuhlungu besifuba, ukuphefumula kanzima okuzumayo, noma ukushintsha kokubona ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antifibrinolitiese middel soos op die geëtiketteerde produk aangedui — swaar-periode kuurse is algemene berading; bevestig die geëtiketteerde venster.",
      "Traneksaamsuur-berading sluit dikwels klont-risiko-besprekings in en om dit nie te gebruik as jy ’n aktiewe klont het tensy jou klinikus so sê nie. Materia versin nie ’n dosis, dagtelling of bloedingstelling nie.",
      "Sê vir jou apteker van klontgeskiedenis, migraine met aura, gekombineerde hormonale voorbehoeding, en ALLE ander medisyne op jou lys.",
      "Rapporteer kuitpyn met swelling, borspyn, skielike kortasem, of sigverandering vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antifibrinolytic ena hantle kamoo e hlalositsoeng holabel — lithuto tsa khoeli e matla ke keletso e tloaelehileng; netefatsa fensetere ea leibole.",
      "Keletso ea tranexamic acid hangata e kenyelletsa lipuisano tsa kotsi ea ho tlala ha mali le ho se e sebelise haeba u na le tlala e sebetsang ntle le ha ngaka e re joalo. Materia ha e iqape tekanyo, palo ea matsatsi, kapa lintlha tsa ho tsoa mali.",
      "Bolella rakhemisi ka histori ea tlala ea mali, migraine e nang le aura, contraception ea lihomone tse kopantsoeng, le MERIANA EOHLE e meng.",
      "Tlaleha bohloko ba leoto ka ho ruruha, bohloko ba sefuba, ho hema thata ka tšohanyetso, kapa phetoho ea pono kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antifibrinolytic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iikhosi zenyanga enzima zihlala zifundiswa; qinisekisa ifestile yeleyibhile.",
      "Iingcebiso ze-tranexamic acid zihlala zibandakanya iingxoxo zomngcipheko weqhwa nokungayisebenzisi ukuba uneqhwa elisebenzayo ngaphandle kokuba ugqirha athi kunjalo. I-Materia ayiyiqiqi idosi, inani leentsuku, okanye amanqaku okopha.",
      "Xelela usokhemisti ngembali yeqhwa, i-migraine ene-aura, i-contraception yeehormone ezidibeneyo, NAWO ONKE amanye amayeza kuluhlu lwakho.",
      "Xela iintlungu zeqakala nokudumba, iintlungu zesifuba, uxinzelelo lokuphefumla ngequbuliso, okanye utshintsho lokubona kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-doxazosin": five(
    [
      "Take this alpha-blocker exactly as directed on your labelled product — first-dose dizziness is common counselling; confirm the label.",
      "Doxazosin counselling commonly includes rising slowly and evening starts for some regimens. Materia does not invent a dose or blood-pressure target.",
      "Tell your pharmacist about other blood-pressure medicines, cataract surgery plans, and ALL other alpha-blockers on your list.",
      "Sit or lie down if dizzy — report fainting or severe light-headedness early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you collapse, get chest pain with trouble breathing, or a painful erection lasting far too long — seek emergency care.",
    ],
    [
      "Sebenzisa le alpha-blocker njengoba kubhalwe kumkhiqizo onelebula — isiyezi somthamo wokuqala sivame ukufundiswa; qinisekisa ilebula.",
      "Ukwelulekwa kwe-doxazosin kuvame ukufaka ukusukuma kancane nokuqala kusihlwa kwezinye izinhlelo. I-Materia ayiqambi umthamo noma umgomo womfutho wegazi.",
      "Tshela umkhiqizi ngamanye amaphilisi omfutho wegazi, izinhlelo zokuhlinzwa kwe-cataract, NAWO WONKE amanye ama-alpha-blocker.",
      "Hlala noma ulale uma unesiyezi — bika ukuwa noma isiyezi esikhulu ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uwa, uthola ubuhlungu besifuba nokuphefumula kanzima, noma ukuqina okubuhlungu okuthatha isikhathi eside kakhulu — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie alfa-blokkeerder soos op die geëtiketteerde produk aangedui — eerste-dosis duiseligheid is algemene berading; bevestig die etiket.",
      "Doksasosien-berading sluit dikwels stadig opstaan en aandbegin vir sommige regimens in. Materia versin nie ’n dosis of bloeddrukteiken nie.",
      "Sê vir jou apteker van ander bloeddrukmedisyne, katarakchirurgie-planne, en ALLE ander alfa-blokkeerders op jou lys.",
      "Sit of lê as jy duiselig is — rapporteer floute of ernstige lighoofdigheid vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ineenstort, borspyn met asemhalingsprobleme kry, of ’n pynlike ereksie wat veels te lank duur — soek noodhulp.",
    ],
    [
      "Sebelisa alpha-blocker ena hantle kamoo e hlalositsoeng holabel — ho tsekela ha tekanyo ea pele ke keletso e tloaelehileng; netefatsa leibole.",
      "Keletso ea doxazosin hangata e kenyelletsa ho ema butle le ho qala mantsiboea bakeng sa li-regimen tse ling. Materia ha e iqape tekanyo kapa sepheo sa khatello ea mali.",
      "Bolella rakhemisi ka meriana e meng ea khatello ea mali, merero ea opereishene ea cataract, le LI-ALPHA-BLOCKER TSOHLE.",
      "Lula kapa o robaleng haeba u tsekela — tlaleha ho akheha kapa ho tsekela ho matla kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u oa, u fumana bohloko ba sefuba ka ho hema thata, kapa ho otlolla ha botona bo bohloko bo nkang nako e telele haholo — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le alpha-blocker ngokuchanekileyo njengoko kubhaliwe kwileyibhile — isiyezi sedosi yokuqala sihlala sifundiswa; qinisekisa ileyibhile.",
      "Iingcebiso ze-doxazosin zihlala zibandakanya ukusuka kancinci nokuqala ngokuhlwa kwezinye iirejimeni. I-Materia ayiyiqiqi idosi okanye usukelo loxinzelelo lwegazi.",
      "Xelela usokhemisti ngamanye amayeza oxinzelelo lwegazi, izicwangciso zotyando lwe-cataract, NAZO ZONKE ezinye ii-alpha-blocker.",
      "Hlala okanye ulale ukuba unesiyezi — xela ukuwa okanye isiyezi esinzima kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba uwa, ufumana iintlungu zesifuba noxinzelelo lokuphefumla, okanye ukuqina kobudoda obubuhlungu obuthatha ixesha elide kakhulu — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-colecalciferol": five(
    [
      "Take this vitamin D3 exactly as directed on your labelled product — daily and weekly products differ; confirm the label.",
      "Colecalciferol counselling commonly includes not exceeding the labelled amount and discussing calcium co-therapy with your clinician. Materia does not invent a dose, IU count, or blood-level target.",
      "Tell your pharmacist about kidney stones, high calcium history, and ALL other vitamin D or calcium products on your list.",
      "Report unusual thirst, persistent nausea, constipation, or confusion early — these may need clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours or a catch-up plan.",
      "If you get severe vomiting, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le vitamin D3 njengoba kubhalwe kumkhiqizo onelebula — imikhiqizo yansuku zonke neyamaviki iyahluka; qinisekisa ilebula.",
      "Ukwelulekwa kwe-colecalciferol kuvame ukufaka ukungadluli inani lelebula nokuxoxa nge-calcium kudokotela. I-Materia ayiqambi umthamo, inani le-IU, noma umgomo weleveli egazini.",
      "Tshela umkhiqizi ngamatshe ezinso, umlando we-calcium ephezulu, NAWO WONKE amanye amakhiqizo e-vitamin D noma e-calcium.",
      "Bika ukoma okungajwayelekile, isicanucanu esiqhubekayo, ukuqina kwamathumbu, noma ukudideka ngokushesha — lokhu kungadinga ukubuyekezwa.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa noma uhlelo lokubuyisela.",
      "Uma uthola ukuhlanza okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie vitamien D3 soos op die geëtiketteerde produk aangedui — daaglikse en weeklikse produkte verskil; bevestig die etiket.",
      "Colecalciferol-berading sluit dikwels in om nie die geëtiketteerde hoeveelheid te oorskry nie en kalsium-ko-terapie met jou klinikus te bespreek. Materia versin nie ’n dosis, IE-telling of bloedvlakteiken nie.",
      "Sê vir jou apteker van nierstene, hoë-kalsiumgeskiedenis, en ALLE ander vitamien D- of kalsiumprodukte op jou lys.",
      "Rapporteer ongewone dors, aanhoudende naarheid, hardlywigheid, of verwarring vroeg — dit mag klinikus-hersiening nodig hê.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure of ’n inhaalplan versin nie.",
      "As jy ernstige braking, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa vitamin D3 ena hantle kamoo e hlalositsoeng holabel — lihlahiswa tsa letsatsi le letsatsi le tsa beke lia fapana; netefatsa leibole.",
      "Keletso ea colecalciferol hangata e kenyelletsa ho se fete bongata ba leibole le ho buisana ka calcium le ngaka. Materia ha e iqape tekanyo, palo ea IU, kapa sepheo sa level ea mali.",
      "Bolella rakhemisi ka majoe a liphio, histori ea calcium e phahameng, le LIHLAHISWA TSOHLE tsa vitamin D kapa calcium.",
      "Tlaleha lenyora le sa tloaelehang, ho nyatsa ho tsoelang pele, ho thatafala ha mala, kapa ho ferekana kapele — sena se ka hloka tlhahlobo ea ngaka.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola kapa moralo oa ho tsosolosa.",
      "Haeba u fumana ho hlatsa ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le vitamin D3 ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iimveliso zemihla nezoveki ziyahluka; qinisekisa ileyibhile.",
      "Iingcebiso ze-colecalciferol zihlala zibandakanya ukungagqithi inani leleyibhile nokuxoxa nge-calcium nogqirha. I-Materia ayiyiqiqi idosi, inani le-IU, okanye usukelo lweleveli yegazi.",
      "Xelela usokhemisti ngamatye ezintso, imbali ye-calcium ephezulu, NAZO ZONKE ezinye iimveliso ze-vitamin D okanye ze-calcium.",
      "Xela unxano olungaqhelekanga, isicanucanu esiqhubekayo, ukuqina kwamathumbu, okanye ukudideka kwangoko — oku kunokufuna ukujongwa kugqirha.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula okanye isicwangciso sokubuyisela.",
      "Ukuba ufumana ukuhlanza okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-calcium-carbonate": five(
    [
      "Take this calcium salt exactly as directed on your labelled product — with food is common counselling for many products; confirm the label.",
      "Calcium carbonate counselling commonly includes constipation and separating from some other medicines. Materia does not invent a dose, elemental-calcium target, or spacing hours.",
      "Tell your pharmacist about kidney stones, high calcium history, and ALL thyroid, iron, or bisphosphonate medicines on your list.",
      "Report persistent constipation, unusual thirst, or severe abdominal pain early for clinician review.",
      "Ask how this fits with vitamin D on your care plan — do not invent a personal supplement stack.",
      "If you get severe vomiting, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le calcium salt njengoba kubhalwe kumkhiqizo onelebula — nokudla kuvame ukufundiswa kwimikhiqizo eminingi; qinisekisa ilebula.",
      "Ukwelulekwa kwe-calcium carbonate kuvame ukufaka ukuqina kwamathumbu nokuhlukanisa namanye amaphilisi. I-Materia ayiqambi umthamo, umgomo we-elemental calcium, noma amahora okuhlukanisa.",
      "Tshela umkhiqizi ngamatshe ezinso, umlando we-calcium ephezulu, NAWO WONKE amaphilisi ethroid, e-iron, noma e-bisphosphonate.",
      "Bika ukuqina kwamathumbu okuqhubekayo, ukoma okungajwayelekile, noma ubuhlungu besisu obukhulu ngokushesha.",
      "Buza ukuthi lokhu kuhambisana kanjani ne-vitamin D ohlelweni lwakho — ungayiqiqi inqwaba yakho yezithasiselo.",
      "Uma uthola ukuhlanza okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie kalsiumsout soos op die geëtiketteerde produk aangedui — met kos is algemene berading vir baie produkte; bevestig die etiket.",
      "Kalsiumkarbonaat-berading sluit dikwels hardlywigheid en skeiding van sommige ander medisyne in. Materia versin nie ’n dosis, elementêre-kalsiumteiken of skeidingsure nie.",
      "Sê vir jou apteker van nierstene, hoë-kalsiumgeskiedenis, en ALLE tiroïed-, yster- of bisfosfonaatmedisyne op jou lys.",
      "Rapporteer aanhoudende hardlywigheid, ongewone dors, of ernstige buikpyn vroeg vir klinikus-hersiening.",
      "Vra hoe dit by vitamien D op jou sorgplan pas — moenie ’n persoonlike aanvullingstapel versin nie.",
      "As jy ernstige braking, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa calcium salt ena hantle kamoo e hlalositsoeng holabel — le lijo ke keletso e tloaelehileng bakeng sa lihlahiswa tse ngata; netefatsa leibole.",
      "Keletso ea calcium carbonate hangata e kenyelletsa ho thatafala ha mala le ho arola le meriana e meng. Materia ha e iqape tekanyo, sepheo sa elemental calcium, kapa lihora tsa ho arola.",
      "Bolella rakhemisi ka majoe a liphio, histori ea calcium e phahameng, le MERIANA EOHLE ea thyroid, iron, kapa bisphosphonate.",
      "Tlaleha ho thatafala ha mala ho tsoelang pele, lenyora le sa tloaelehang, kapa bohloko ba mpeng bo matla kapele.",
      "Botsa hore sena se tšoana joang le vitamin D moralong oa hau — se ke oa iqapa mokotla oa hau oa litlatsetso.",
      "Haeba u fumana ho hlatsa ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le calcium salt ngokuchanekileyo njengoko kubhaliwe kwileyibhile — nokutya kuhlala kufundiswa kwiimveliso ezininzi; qinisekisa ileyibhile.",
      "Iingcebiso ze-calcium carbonate zihlala zibandakanya ukuqina kwamathumbu nokwahlula kwamanye amayeza. I-Materia ayiyiqiqi idosi, usukelo lwe-elemental calcium, okanye iiyure zokwahlula.",
      "Xelela usokhemisti ngamatye ezintso, imbali ye-calcium ephezulu, NAWO ONKE amayeza ethroid, e-iron, okanye e-bisphosphonate.",
      "Xela ukuqina kwamathumbu okuqhubekayo, unxano olungaqhelekanga, okanye iintlungu zesisu ezinzima kwangoko.",
      "Buza indlela oku kuhambelana ngayo ne-vitamin D kwisicwangciso sakho — sukuyiqqa indwangu yakho yezongezelelo.",
      "Ukuba ufumana ukuhlanza okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-hydrocortisone": five(
    [
      "Use this mild topical corticosteroid exactly as directed on your labelled product — thin layer to affected skin only; confirm the label.",
      "Hydrocortisone counselling commonly includes short courses on the face unless your clinician says otherwise. Materia does not invent a finger-tip unit count or course length.",
      "Tell your pharmacist about infection in the treated area, other steroid creams, and pregnancy or breastfeeding plans.",
      "Wash hands after application unless hands are the treated area — report worsening redness or spreading rash early.",
      "Ask how long the labelled course should run — do not invent a stop date or a rebound plan.",
      "If you get spreading infection, severe blistering, or allergic swelling with trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le mild topical corticosteroid njengoba kubhalwe kumkhiqizo onelebula — ungqimba omncane esikhumbeni esithintekile kuphela; qinisekisa ilebula.",
      "Ukwelulekwa kwe-hydrocortisone kuvame ukufaka izinkambo ezimfushane ebusweni ngaphandle kokusho kukadokotela. I-Materia ayiqambi inani le-finger-tip unit noma ubude benkambo.",
      "Tshela umkhiqizi ngesifo endaweni elashwayo, amanye ama-cream e-steroid, nezinhlelo zokukhulelwa noma zokuncelisa.",
      "Geza izandla ngemva kokufaka ngaphandle uma izandla ziyindawo elashwayo — bika ukubomvu okuya ngokuba kubi noma ukuqubuka okusabalele ngokushesha.",
      "Buza ukuthi inkambo yelebula kufanele iqhubeke isikhathi esingakanani — ungayiqiqi usuku lokuyeka noma uhlelo lokubuyela.",
      "Uma uthola isifo esanda, amaqhubu amakhulu, noma ukuvuvuka kwe-allergy nokuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie sagte topiese kortikosteroïed soos op die geëtiketteerde produk aangedui — dun laag slegs op aangetaste vel; bevestig die etiket.",
      "Hidrokortisoon-berading sluit dikwels kort kuurse op die gesig in tensy jou klinikus anders sê. Materia versin nie ’n vingerpunt-eenheidtelling of kuurduur nie.",
      "Sê vir jou apteker van infeksie in die behandelde area, ander steroïedrome, en swangerskap- of borsvoedingplanne.",
      "Was hande ná aanwending tensy hande die behandelde area is — rapporteer erger wordende rooiheid of verspreidende uitslag vroeg.",
      "Vra hoe lank die geëtiketteerde kuur moet loop — moenie ’n stopdatum of terugslagplan versin nie.",
      "As jy verspreidende infeksie, ernstige blistering, of allergiese swelling met asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa mild topical corticosteroid ena hantle kamoo e hlalositsoeng holabel — lera le tšesafe letlalong le amehileng feela; netefatsa leibole.",
      "Keletso ea hydrocortisone hangata e kenyelletsa lithuto tse khutšoane sefahlehong ntle le ha ngaka e re joalo. Materia ha e iqape palo ea finger-tip unit kapa bolelele ba thuto.",
      "Bolella rakhemisi ka tšoaetso sebakeng se alafuoang, li-cream tse ling tsa steroid, le merero ea ho ima kapa ho anyesa.",
      "Hlatsoa matsoho ka mor'a ho sebelisa ntle le haeba matsoho e le sebaka se alafuoang — tlaleha bofubelu bo mpefalang kapa lekhopho le atileng kapele.",
      "Botsa hore thuto ea leibole e lokela ho tsoela pele nako e kae — se ke oa iqapa letsatsi la ho emisa kapa moralo oa ho khutla.",
      "Haeba u fumana tšoaetso e atolohang, lihlabana tse matla, kapa ho ruruha ha allergy ka ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le mild topical corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — umaleko ocekeceke kulusu oluchaphazelekileyo kuphela; qinisekisa ileyibhile.",
      "Iingcebiso ze-hydrocortisone zihlala zibandakanya iikhosi ezimfutshane ebusweni ngaphandle kokuba ugqirha athi kunjalo. I-Materia ayiyiqiqi inani le-finger-tip unit okanye ubude bekhosi.",
      "Xelela usokhemisti ngosulelo kwindawo enyangwayo, ezinye ii-cream ze-steroid, nezicwangciso zokukhulelwa okanye zokuncancisa.",
      "Hlamba izandla emva kokufaka ngaphandle kokuba izandla ziyindawo enyangwayo — xela ukubomvu okubiayo okanye irhashalala esasazekayo kwangoko.",
      "Buza indlela ikhosi yeleyibhile ekufanele iqhubeke ngayo — sukuyiqqa umhla wokuyeka okanye isicwangciso sokubuyela.",
      "Ukuba ufumana usulelo olusasazekayo, amaqhuma anzima, okanye ukudumba kwe-allergy noxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-latanoprost": five(
    [
      "Use these prostaglandin eye drops exactly as directed on your labelled product — usually one drop in the affected eye(s); confirm the label.",
      "Latanoprost counselling commonly includes iris darkening, eyelash growth, and evening dosing for many products. Materia does not invent a drop count or intraocular-pressure target.",
      "Tell your pharmacist about other eye drops, eye surgery plans, and contact-lens use on your list.",
      "Wait between different eye drops as the labelled product advises — do not invent spacing minutes.",
      "Report sudden vision loss, severe eye pain, or light sensitivity early for urgent review.",
      "If you get severe allergic swelling around the eyes with trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa la ma-prostaglandin eye drops njengoba kubhalwe kumkhiqizo onelebula — kuvame ithonsi eyodwa esweni elithintekile; qinisekisa ilebula.",
      "Ukwelulekwa kwe-latanoprost kuvame ukufaka ukumnyama kwe-iris, ukukhula kwamakhehla, nokuthatha kusihlwa kwimikhiqizo eminingi. I-Materia ayiqambi inani lamathonsi noma umgomo womfutho wangaphakathi kweso.",
      "Tshela umkhiqizi ngamanye ama-eye drops, izinhlelo zokuhlinzwa kwamehlo, nokusebenzisa ama-contact lens.",
      "Linda phakathi kwama-eye drops ahlukene njengoba umkhiqizo onelebula ucebisa — ungayiqiqi amaminithi okuhlukanisa.",
      "Bika ukulahlekelwa ukubona okuzumayo, ubuhlungu beso obukhulu, noma ukungabekezeleli ukukhanya ngokushesha.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo nokuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie prostaglandien-oogdruppels soos op die geëtiketteerde produk aangedui — gewoonlik een druppel in die aangetaste oog/oë; bevestig die etiket.",
      "Latanoprost-berading sluit dikwels irisverdonkering, wimpergroei, en aanddosering vir baie produkte in. Materia versin nie ’n druppeltelling of intraokulêre-drukteiken nie.",
      "Sê vir jou apteker van ander oogdruppels, oogchirurgie-planne, en kontaklensgebruik op jou lys.",
      "Wag tussen verskillende oogdruppels soos die geëtiketteerde produk adviseer — moenie skeidingsminute versin nie.",
      "Rapporteer skielike sigverlies, ernstige oorpyn, of ligsensitiwiteit vroeg vir dringende hersiening.",
      "As jy ernstige allergiese swelling rondom die oë met asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa li-prostaglandin eye drops tsena hantle kamoo e hlalositsoeng holabel — hangata thopa e le 'ngoe leihlong le amehileng; netefatsa leibole.",
      "Keletso ea latanoprost hangata e kenyelletsa ho fifala ha iris, ho hola ha litelu, le ho nka mantsiboea bakeng sa lihlahiswa tse ngata. Materia ha e iqape palo ea mathopa kapa sepheo sa khatello ka har'a leihlo.",
      "Bolella rakhemisi ka li-eye drops tse ling, merero ea opereishene ea mahlo, le tšebeliso ea li-contact lens.",
      "Ema pakeng tsa li-eye drops tse fapaneng kamoo sehlahiswa se nang le leibole e eletsang — se ke oa iqapa metsotso ea ho arola.",
      "Tlaleha tahlehelo ea pono ka tšohanyetso, bohloko ba leihlo bo matla, kapa ho utloa bohloko ha leseli kapele.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo ka ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa la ma-prostaglandin eye drops ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala ithontsi enye kwiliso elichaphazelekileyo; qinisekisa ileyibhile.",
      "Iingcebiso ze-latanoprost zihlala zibandakanya ukumnyama kwe-iris, ukukhula kweenkophe, nokuthatha ngokuhlwa kwiimveliso ezininzi. I-Materia ayiyiqiqi inani leethontsi okanye usukelo loxinzelelo lwangaphakathi kweliso.",
      "Xelela usokhemisti ngezinye ii-eye drops, izicwangciso zotyando lwamehlo, nokusebenzisa ii-contact lens.",
      "Linda phakathi kwee-eye drops ezahlukeneyo njengoko imveliso eneleyibhile icebisa — sukuyiqqa imizuzu yokwahlula.",
      "Xela ukulahlekelwa kukubona ngequbuliso, iintlungu zeliso ezinzima, okanye ukunganyamezeli ukukhanya kwangoko.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo noxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-genta": five(
    [
      "Use this aminoglycoside exactly as directed on your labelled product — injection and topical/eye forms differ; confirm the form you were given.",
      "Gentamicin counselling commonly includes kidney and hearing watch for systemic courses. Materia does not invent a dose, level target, or course length.",
      "Tell your pharmacist about kidney disease, hearing problems, and ALL other antibiotics or diuretics on your list.",
      "Report reduced urine, ringing in the ears, dizziness, or balance change early for clinician review.",
      "Ask how monitoring fits your care plan — do not invent a personal blood-level schedule.",
      "If you get severe allergic swelling, trouble breathing, or sudden hearing loss — seek emergency care.",
    ],
    [
      "Sebenzisa le aminoglycoside njengoba kubhalwe kumkhiqizo onelebula — ukujova nezindlela ze-topical/eso ziyahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-gentamicin kuvame ukufaka ukugada izinto nokuzwa kwezinkambo zesistimu. I-Materia ayiqambi umthamo, umgomo weleveli, noma ubude benkambo.",
      "Tshela umkhiqizi ngesifo sezinso, izinkinga zokuzwa, NAWO WONKE amanye ama-antibiotic noma ama-diuretic.",
      "Bika umchamo omncane, ukukhala ezindlebeni, isiyezi, noma ukushintsha kwebhalansi ngokushesha.",
      "Buza ukuthi ukuqapha kuhambisana kanjani nohlelo lwakho — ungayiqiqi uhlelo lakho lwama-level egazini.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuphefumula kanzima, noma ukulahlekelwa ukuzwa okuzumayo — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie aminoglikosied soos op die geëtiketteerde produk aangedui — inspuiting en topiese/oogvorms verskil; bevestig die vorm wat jy ontvang het.",
      "Gentamisien-berading sluit dikwels nier- en gehoorwaak vir sistemiese kuurse in. Materia versin nie ’n dosis, vlakteiken of kuurduur nie.",
      "Sê vir jou apteker van niersiekte, gehoorprobleme, en ALLE ander antibiotika of diuretika op jou lys.",
      "Rapporteer verminderde urine, suising in die ore, duiseligheid, of balansverandering vroeg vir klinikus-hersiening.",
      "Vra hoe monitering by jou sorgplan pas — moenie ’n persoonlike bloedvlakskedeule versin nie.",
      "As jy ernstige allergiese swelling, asemhalingsprobleme, of skielike gehoorverlies kry — soek noodhulp.",
    ],
    [
      "Sebelisa aminoglycoside ena hantle kamoo e hlalositsoeng holabel — ho enteoa le mefuta ea topical/mahlo ea fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea gentamicin hangata e kenyelletsa ho hlokomela liphio le kutlo bakeng sa lithuto tsa sistimi. Materia ha e iqape tekanyo, sepheo sa level, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka lefu la liphio, mathata a kutlo, le LI-ANTIBIOTIC KAPA LI-DIURETIC TSOHLE.",
      "Tlaleha moroto o fokotsehileng, ho lla litsebeng, ho tsekela, kapa phetoho ea botsitso kapele.",
      "Botsa hore ho hlokomela ho tšoana joang le moralo oa hau — se ke oa iqapa kemiso ea hau ea maemo a mali.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho hema thata, kapa tahlehelo ea kutlo ka tšohanyetso — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le aminoglycoside ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukutofa neendlela ze-topical/amehlo ziyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-gentamicin zihlala zibandakanya ukuqapha iintso nokuva kwiikhosi zesistimu. I-Materia ayiyiqiqi idosi, usukelo lweleveli, okanye ubude bekhosi.",
      "Xelela usokhemisti ngesifo sezintso, iingxaki zokuva, NAZO ZONKE ezinye ii-antibiotic okanye ii-diuretic.",
      "Xela umchamo omncinci, ukukhala ezindlebeni, isiyezi, okanye utshintsho lwebhalansi kwangoko.",
      "Buza indlela ukuqapha okuhambelana ngayo nesicwangciso sakho — sukuyiqqa ishedyuli yakho yeeleveli zegazi.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, uxinzelelo lokuphefumla, okanye ukulahlekelwa kukuva ngequbuliso — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-mupirocin": five(
    [
      "Use this topical antibiotic exactly as directed on your labelled product — thin layer to the affected area; confirm the label.",
      "Mupirocin counselling commonly includes completing the labelled course and not using it in the eyes unless the product is for that use. Materia does not invent a dose, application clock, or course length.",
      "Tell your pharmacist about widespread infection, other topical antibiotics, and pregnancy or breastfeeding plans.",
      "Wash hands before and after application — report worsening redness, swelling, or fever early.",
      "Ask whether nasal vs skin products differ on your labelled pack — do not invent an off-label site.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical antibiotic njengoba kubhalwe kumkhiqizo onelebula — ungqimba omncane endaweni ethintekile; qinisekisa ilebula.",
      "Ukwelulekwa kwe-mupirocin kuvame ukufaka ukuqedela inkambo yelebula nokungayifaki emehlweni ngaphandle uma umkhiqizo ungowalokho. I-Materia ayiqambi umthamo, iwashi lokufaka, noma ubude benkambo.",
      "Tshela umkhiqizi ngesifo esisabalele, amanye ama-antibiotic e-topical, nezinhlelo zokukhulelwa noma zokuncelisa.",
      "Geza izandla ngaphambi nangemva kokufaka — bika ukubomvu okuya ngokuba kubi, ukuvuvuka, noma umkhuhlane ngokushesha.",
      "Buza ukuthi imikhiqizo yekhala nesikhumba iyehluka yini kuphakethe onelebula — ungayiqiqi indawo engeyona yelebula.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese antibiotikum soos op die geëtiketteerde produk aangedui — dun laag op die aangetaste area; bevestig die etiket.",
      "Mupirosien-berading sluit dikwels in om die geëtiketteerde kuur te voltooi en dit nie in die oë te gebruik tensy die produk daarvoor is nie. Materia versin nie ’n dosis, aanwendingsklok of kuurduur nie.",
      "Sê vir jou apteker van wydverspreide infeksie, ander topiese antibiotika, en swangerskap- of borsvoedingplanne.",
      "Was hande voor en ná aanwending — rapporteer erger wordende rooiheid, swelling, of koors vroeg.",
      "Vra of neus- teenoor velprodukte op jou geëtiketteerde pak verskil — moenie ’n buite-etiket-plek versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical antibiotic ena hantle kamoo e hlalositsoeng holabel — lera le tšesafe sebakeng se amehileng; netefatsa leibole.",
      "Keletso ea mupirocin hangata e kenyelletsa ho qeta thuto ea leibole le ho se e sebelise mahlong ntle le haeba sehlahiswa se etselitsoe seo. Materia ha e iqape tekanyo, nako ea ho sebelisa, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka tšoaetso e atileng, li-antibiotic tse ling tsa topical, le merero ea ho ima kapa ho anyesa.",
      "Hlatsoa matsoho pele le ka mor'a ho sebelisa — tlaleha bofubelu bo mpefalang, ho ruruha, kapa feberu kapele.",
      "Botsa hore na lihlahiswa tsa nko le letlalo li fapane pakeng tsa hau e nang le leibole — se ke oa iqapa sebaka se sa ngolisoang.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — umaleko ocekeceke kwindawo echaphazelekileyo; qinisekisa ileyibhile.",
      "Iingcebiso ze-mupirocin zihlala zibandakanya ukugqiba ikhosi yeleyibhile nokungayifaki emehlweni ngaphandle kokuba imveliso yeyaloo ndawo. I-Materia ayiyiqiqi idosi, iwotshi yokufaka, okanye ubude bekhosi.",
      "Xelela usokhemisti ngosulelo olusasazekileyo, ezinye ii-antibiotic ze-topical, nezicwangciso zokukhulelwa okanye zokuncancisa.",
      "Hlamba izandla phambi nasemva kokufaka — xela ukubomvu okubiayo, ukudumba, okanye umkhuhlane kwangoko.",
      "Buza ukuba iimveliso zeempumlo nezesikhumba ziyahluka na kwipakethi yakho eneleyibhile — sukuyiqqa indawo engekho kwileyibhile.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
