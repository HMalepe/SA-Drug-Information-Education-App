/**
 * v345–v356 deepened SA counselling batch (6 lines × 5 langs) — STG/EML PHC Batch D clinic-core.
 * Original Materia educational scripts only — no invented doses, IU amounts, rinse volumes,
 * BP thresholds, gestational cut-offs, or course lengths.
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

export const COUNSELLING_V345_TO_V356: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-mebendazole": five(
    [
      "Mebendazole is an anthelmintic used against selected intestinal worms — take exactly as your clinician and the labelled product direct.",
      "Materia does not invent a dose, age band, or repeat interval — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about pregnancy, breastfeeding plans, liver disease, and ALL other medicines before starting.",
      "Handwashing, clean water, and treating close contacts when advised all matter for stopping reinfection — ask what applies to your household.",
      "Ask whether stool checks or a second treatment round are planned for your worm type.",
      "If severe tummy pain, yellow eyes, rash, or breathing difficulty develops — seek care urgently.",
    ],
    [
      "I-mebendazole i-anthelmintic esetshenziswa ezibungwini ezikhethiwe zesisu — thatha njengoba udokotela nomkhiqizo onelebula bakusho.",
      "I-Materia ayiqambi umthamo, ibhende yobudala, noma isikhathi sokuphinda — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngokukhulelwa, izinhlelo zokuncelisa, isifo sesibindi, nawo WONKE amanye amaphilisi ngaphambi kokuqala.",
      "Ukugeza izandla, amanzi ahlanzekile, nokwelapha abaseduze uma kutuswa — kubalulekile ukunqanda ukungenwa kabusha; buza okusebenza emndenini wakho.",
      "Buza ukuthi kuzohlolwa umgqbamu noma kuzophindwa ukwelashwa kohlobo lwakho lwesibungu.",
      "Uma ubuhlungu besisu obukhulu, amehlo aphuzi, ukuqubuka, noma ubunzima bokuphefumula kuvela — funa usizo ngokushesha.",
    ],
    [
      "Mebendazole is 'n wurmmiddel teen geselekteerde dermwurms — neem presies soos jou klinikus en die geëtiketteerde produk aandui.",
      "Materia versin nie 'n dosis, ouderdomsgroep, of herhaalinterval nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van swangerskap, borsvoedingsplanne, lewersiekte, en ALLE ander medisyne voor jy begin.",
      "Handewas, skoon water, en behandeling van naby kontakte wanneer aangeraai help herinfeksie stop — vra wat vir jou huishouding geld.",
      "Vra of stoeltoetse of 'n tweede behandelingsronde vir jou wurmtipe beplan is.",
      "As ernstige maagpyn, geel oë, uitslag, of asemnood ontwikkel — soek dringend sorg.",
    ],
    [
      "Mebendazole ke anthelmintic e sebelisoang khahlanong le liboko tse khethiloeng tsa mala — e nke hantle joalo ka ha ngaka le sehlahisoa se nang le ileibole li laela.",
      "Materia ha e iqape tekanyo, sehlopha sa lilemo, kapa nako ea ho pheta — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka bokhachane, merero ea ho anyesa, lefu la sebete, le MERIANA EOHLE e meng pele u qala.",
      "Ho hlapa matsoho, metsi a hloekileng, le ho phekola ba haufi ha ho eletswa — ho bohlokoa ho thibela tšoaetso hape; botsa se sebetsang lelapeng la hau.",
      "Botsoa hore na ho tla hlahloboa bolusana kapa phekolo ea bobeli bakeng sa mofuta oa hau oa seboko.",
      "Haeba bohloko bo boholo ba mpa, mahlo a mosehla, lekhopho, kapa ho hema thata ho hlaha — batla thuso ka potlako.",
    ],
    [
      "I-mebendazole yi-anthelmintic esetyenziswa kwiintshulube ezikhethiweyo zesisu — thatha kanye njengoko ugqirha kunye nemveliso enelebula bakuyalela.",
      "I-Materia ayiyiqiqi idosi, iqela leminyaka, okanye ixesha lokuphinda — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngokukhulelwa, izicwangciso zokuncancisa, isifo sesibindi, kunye NAWO ONKE amanye amayeza ngaphambi kokuqala.",
      "Ukuhlamba izandla, amanzi acocekileyo, kunye nonyango lwabasondelayo xa kucebiswa — kubalulekile ukunqanda ukosuleleka kwakhona; buza okusebenza kwikhaya lakho.",
      "Buza ukuba iimvavanyo zomgqbamu okanye umjikelo wesibini wonyango zicwangcisiwe na kuhlobo lwakho lwentshulube.",
      "Ukuba intlungu enkulu yesisu, amehlo atyheli, irhashalala, okanye ubunzima bokuphefumla kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-ivermectin": five(
    [
      "Ivermectin is an antiparasitic used in selected worm and ectoparasite pathways — take only as directed for your indication.",
      "Materia does not invent a mg/kg dose or food-timing rule — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about pregnancy, breastfeeding, liver disease, and ALL other medicines (including warfarins and other antiparasitics).",
      "Ask whether household contacts need treatment and what hygiene steps reduce reinfection for your condition.",
      "Some products advise taking with or without food — follow the labelled product, not guesswork.",
      "If severe dizziness, vision changes, rash, or breathing difficulty develops — seek care urgently.",
    ],
    [
      "I-ivermectin i-antiparasitic esetshenziswa ezindleleni ezikhethiwe zezibungu neze-ectoparasite — thatha kuphela njengoba kushiwo ngesizathu sakho.",
      "I-Materia ayiqambi umthamo we-mg/kg noma umthetho wesikhathi sokudla — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngokukhulelwa, ukuncelisa, isifo sesibindi, nawo WONKE amanye amaphilisi (kuhlanganise ama-warfarin namanye ama-antiparasitic).",
      "Buza ukuthi abaseduze emndenini badinga yini ukwelashwa nokuthi yiziphi izinyathelo zokuhlanzeka ezinciphisa ukungenwa kabusha.",
      "Eminye imikhiqizo icebisa ukuthatha nokudla noma ngaphandle kokudla — landela umkhiqizo onelebula, ungacabangi.",
      "Uma isiyezi esikhulu, ukushintsha kokubona, ukuqubuka, noma ubunzima bokuphefumula kuvela — funa usizo ngokushesha.",
    ],
    [
      "Ivermectin is 'n antiparasitiese middel in geselekteerde wurm- en ektoparasietpaaie — neem slegs soos aangedui vir jou aanduiding.",
      "Materia versin nie 'n mg/kg dosis of kos-tyd reël nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van swangerskap, borsvoeding, lewersiekte, en ALLE ander medisyne (insluitend warfariene en ander antiparasitiese middels).",
      "Vra of huishouding kontakte behandeling nodig het en watter higiëne stappe herinfeksie verminder.",
      "Som produktekette adviseer met of sonder kos — volg die geëtiketteerde produk, moenie raai nie.",
      "As ernstige duiseligheid, visiieveranderinge, uitslag, of asemnood ontwikkel — soek dringend sorg.",
    ],
    [
      "Ivermectin ke antiparasitic e sebelisoang litseleng tse khethiloeng tsa liboko le ectoparasite — e nke feela joalo ka ha u laetsoe bakeng sa sesosa sa hau.",
      "Materia ha e iqape tekanyo ea mg/kg kapa molao oa nako ea lijo — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka bokhachane, ho anyesa, lefu la sebete, le MERIANA EOHLE e meng (ho kenyeletsa li-warfarin le li-antiparasitic tse ling).",
      "Botsoa hore na ba haufi ba lelapa ba hloka kalafo le hore na ke mehato efe ea bohloeki e fokotsang tšoaetso hape.",
      "Lihlahisoa tse ling li eletsa ho nka le lijo kapa ntle le lijo — latela sehlahisoa se nang le ileibole, u se ke ua hakanya.",
      "Haeba ho tsekela ho matla, liphetoho tsa pono, lekhopho, kapa ho hema thata ho hlaha — batla thuso ka potlako.",
    ],
    [
      "I-ivermectin yi-antiparasitic esetyenziswa kwiindlela ezikhethiweyo zeentshulube kunye ne-ectoparasite — thatha kuphela njengoko uyalelelwe ngesizathu sakho.",
      "I-Materia ayiyiqiqi idosi ye-mg/kg okanye umthetho wexesha lokutya — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngokukhulelwa, ukuncancisa, isifo sesibindi, kunye NAWO ONKE amanye amayeza (kuquka ii-warfarin kunye nezinye ii-antiparasitic).",
      "Buza ukuba abasondelayo kwikhaya bafuna unyango na nokuba ngawaphi amanyathelo ococekile anciphisa ukosuleleka kwakhona.",
      "Ezinye iimveliso zicebisa ukuthatha nokutya okanye ngaphandle kokutya — landela imveliso enelebula, ungacingi.",
      "Ukuba isiyezi esikhulu, utshintsho lokubona, irhashalala, okanye ubunzima bokuphefumla kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-nystatin": five(
    [
      "Nystatin treats selected mucosal Candida infections (often mouth thrush) — use the form and schedule on your labelled product.",
      "Materia does not invent a suspension volume, IU regimen, or course length — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about pregnancy, diabetes, dentures, inhaled steroids, and ALL other medicines.",
      "For oral suspension, keep the liquid in contact with affected areas as long as practical before swallowing if the label advises that technique.",
      "Finish the full course even if the white patches improve early — ask when to return if thrush persists.",
      "If swallowing becomes painful, fever develops, or patches spread beyond the mouth — seek care urgently.",
    ],
    [
      "I-nystatin ilapha izifo ezikhethiwe ze-Candida ezimucosal (ngokuvamile i-thrush yomlomo) — sebenzisa uhlobo nohlelo olusemkhiqizweni onelebula.",
      "I-Materia ayiqambi ivolumu ye-suspension, uhlelo lwe-IU, noma ubude benkambo — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngokukhulelwa, isifo sikashukela, amazinyo okufakelwa, ama-steroid aphefumulelwayo, nawo WONKE amanye amaphilisi.",
      "Ku-suspension yomlomo, gcina uketshezi luthintana nezindawo ezithintekile isikhathi eside ngangokunokwenzeka ngaphambi kokugwinya uma ilebula icebisa leyo ndlela.",
      "Qedela inkambo ephelele noma amabala amhlophe athuthuka kusenesikhathi — buza ukuthi ubuyela nini uma i-thrush iqhubeka.",
      "Uma ukugwinya kuba buhlungu, umkhuhlane uvela, noma amabala asabalala ngaphandle komlomo — funa usizo ngokushesha.",
    ],
    [
      "Nistatien behandel geselekteerde mukosale Candida-infeksies (dikwels mondsproei) — gebruik die vorm en skedule op jou geëtiketteerde produk.",
      "Materia versin nie 'n suspensievolume, IU-regimen, of kursuslengte nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van swangerskap, diabetes, kunsgebit, inhaleerde steroïede, en ALLE ander medisyne.",
      "Vir mondsuspensie, hou die vloeistof so lank as prakties in kontak met aangetaste areas voor jy sluk as die etiket daardie tegniek aanbeveel.",
      "Voltooi die volle kursus selfs as wit kolle vroeg verbeter — vra wanneer om terug te kom as sproei aanhou.",
      "As sluk pynlik word, koors ontwikkel, of kolle buite die mond versprei — soek dringend sorg.",
    ],
    [
      "Nystatin e phekola tšoaetso tse khethiloeng tsa Candida tsa mucosal (hangata thrush ea molomo) — sebelisa mofuta le kemiso e holim'a sehlahisoa sa hau se nang le ileibole.",
      "Materia ha e iqape volume ea suspension, kemiso ea IU, kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka bokhachane, lefu la tsoekere, meno a maiketsetso, li-steroid tse monngoang, le MERIANA EOHLE e meng.",
      "Bakeng sa suspension ea molomo, boloka mokelikeli o kopane le libaka tse amehang nako e telele pele u koenya haeba ileibole e eletsa mokhoa oo.",
      "Qetella thuto e felletseng leha matheba a sootho a ntlafala kapele — botsa hore na u khutle neng haeba thrush e tsoela pele.",
      "Haeba ho koenya ho ba bohloko, feberu e hlaha, kapa matheba a hasana ka ntle ho molomo — batla thuso ka potlako.",
    ],
    [
      "I-nystatin inyanga iintsholongwane ezikhethiweyo ze-Candida ze-mucosal (rhoqo i-thrush yomlomo) — sebenzisa uhlobo kunye neshedyuli kwimveliso yakho enelebula.",
      "I-Materia ayiyiqiqi umthamo we-suspension, inkqubo ye-IU, okanye ubude bekhosi — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngokukhulelwa, isifo seswekile, amazinyo okufakelwa, ii-steroid eziphefumlelwayo, kunye NAWO ONKE amanye amayeza.",
      "Kwi-suspension yomlomo, gcina ulwelo luthintana neendawo ezichaphazelekileyo ixesha elide kangangoko kunokwenzeka ngaphambi kokuginya ukuba ilebhile icebisa loo ndlela.",
      "Gqiba ikhosi epheleleyo nokuba amabala amhlophe aphucuka kwangethuba — buza ukuba ubuyela nini ukuba i-thrush iyaqhubeka.",
      "Ukuba ukuginya kuba buhlungu, umkhuhlane uvela, okanye amabala asasazeka ngaphandle komlomo — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-benzathine-benzylpenicillin": five(
    [
      "Benzathine benzylpenicillin is a long-acting depot penicillin given by injection in clinic or hospital — it is not the same as aqueous benzylpenicillin.",
      "Materia does not invent an IU dose, reconstitution volume, or dosing interval — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about penicillin allergy, syphilis or rheumatic-fever history, pregnancy, and ALL other medicines before the injection.",
      "Stay for the observation period the clinic advises after injection — allergic reactions can be delayed.",
      "Ask how many injections your pathway needs and when to return for the next dose or RPR follow-up if relevant.",
      "If rash, swelling, wheeze, or collapse occurs during or after the injection — seek emergency care immediately.",
    ],
    [
      "I-benzathine benzylpenicillin i-penicillin ye-depot ehlala isikhathi eside enikwa ngomjovo ekliniki noma esibhedlela — ayifani ne-benzylpenicillin yamanzi.",
      "I-Materia ayiqambi umthamo we-IU, ivolumu yokuxuba kabusha, noma isikhathi sokuthatha — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela nge-allergy ye-penicillin, umlando we-syphilis noma we-rheumatic fever, ukukhulelwa, nawo WONKE amanye amaphilisi ngaphambi komjovo.",
      "Hlala isikhathi sokubhekwa isikhungo esikusho ngemva komjovo — ukungazwani kungabambezeleka.",
      "Buza ukuthi mingaki imijovo indlela yakho eyidingayo nokuthi ubuyela nini kumthamo olandelayo noma ukulandela kwe-RPR uma kufanele.",
      "Uma ukuqubuka, ukuvuvuka, ukuhema kanzima, noma ukuwa kwenzeka ngesikhathi noma ngemva komjovo — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Bensatiën bensielpenisillien is 'n lankwerkende depot-penisillien wat in kliniek of hospitaal ingespuit word — dit is nie dieselfde as waterige bensielpenisillien nie.",
      "Materia versin nie 'n IU-dosis, hersamestellingsvolume, of doseringsinterval nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van penisillienallergie, sifilis- of rumatiekkoorsgeskiedenis, swangerskap, en ALLE ander medisyne voor die inspuiting.",
      "Bly vir die waarnemingstydperk wat die kliniek na inspuiting aanbeveel — allergiese reaksies kan vertraag wees.",
      "Vra hoeveel inspuitings jou pad benodig en wanneer om terug te kom vir die volgende dosis of RPR-opvolg indien relevant.",
      "As uitslag, swelling, piepende asem, of ineenstorting tydens of na die inspuiting voorkom — soek onmiddellik noodgeval sorg.",
    ],
    [
      "Benzathine benzylpenicillin ke penicillin ea depot e sebetsang nako e telele e fuoang ka ente klinikeng kapa sepetlele — ha e tšoane le benzylpenicillin ea metsi.",
      "Materia ha e iqape tekanyo ea IU, volume ea ho kopanya hape, kapa nako ea tekanyo — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka allergy ea penicillin, nalane ea syphilis kapa rheumatic fever, bokhachane, le MERIANA EOHLE e meng pele ho ente.",
      "Lula nako ea ho sheba eo kliniki e e eletsang ka mor'a ente — karabelo ea allergy e ka lieha.",
      "Botsoa hore na ke li-ente life tseo tsela ea hau e li hlokang le hore na u khutle neng bakeng sa tekanyo e latelang kapa ho latela ha RPR haeba ho hlokahala.",
      "Haeba lekhopho, ho ruruha, ho hema ka thata, kapa ho oa ho etsahala nakong kapa ka mor'a ente — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-benzathine benzylpenicillin yi-penicillin ye-depot ehlala ixesha elide enikwa ngenaliti eklinikhi okanye esibhedlele — ayifani ne-benzylpenicillin yamanzi.",
      "I-Materia ayiyiqiqi idosi ye-IU, umthamo wokuxuba kwakhona, okanye ixesha lokuthatha — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha nge-allergy ye-penicillin, imbali ye-syphilis okanye ye-rheumatic fever, ukukhulelwa, kunye NAWO ONKE amanye amayeza ngaphambi kwenaliti.",
      "Hlala ixesha lokujonga iklinikhi elicebisayo emva kwenaliti — iimpendulo ze-allergy zinokulibaziseka.",
      "Buza ukuba zingaphi iinaliti indlela yakho eyidingayo nokuba ubuyela nini kwidosi elandelayo okanye ukulandela kwe-RPR ukuba kufanelekile.",
      "Ukuba irhashalala, ukudumba, ukuphefumla nzima, okanye ukuwa kwenzeka ngexesha okanye emva kwenaliti — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-griseofulvin": five(
    [
      "Griseofulvin is an oral antifungal for selected dermatophyte (ringworm) infections — take the full course your clinician sets.",
      "Materia does not invent a dose, duration, or food-timing rule — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about pregnancy plans, liver disease, porphyria history, and ALL other medicines (including warfarin and oral contraceptives).",
      "Some labels advise taking with fatty food to aid absorption — follow the labelled product, do not invent a meal plan.",
      "Ask how long nails or scalp infections may need treatment and when to review if there is no improvement.",
      "If jaundice, severe rash, fever, or unusual bruising develops — seek care urgently.",
    ],
    [
      "I-griseofulvin i-antifungal yomlomo yezifo ezikhethiwe ze-dermatophyte (ringworm) — thatha inkambo ephelele udokotela ayibekayo.",
      "I-Materia ayiqambi umthamo, ubude, noma umthetho wesikhathi sokudla — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngezinhlelo zokukhulelwa, isifo sesibindi, umlando we-porphyria, nawo WONKE amanye amaphilisi (kuhlanganise i-warfarin namakhapheshini omlomo).",
      "Amanye amalebula acebisa ukuthatha nokudla okunamafutha ukusiza ukumunca — landela umkhiqizo onelebula, ungacabangi uhlelo lokudla.",
      "Buza ukuthi izinzipho noma ikhanda kungadinga isikhathi esingakanani nokuthi ubuyekezwa nini uma kungabi nampumelelo.",
      "Uma i-jaundice, ukuqubuka okukhulu, umkhuhlane, noma ukulimala okungajwayelekile kuvela — funa usizo ngokushesha.",
    ],
    [
      "Griseofulvien is 'n orale antifungale middel vir geselekteerde dermatofiet (ringwurm) infeksies — neem die volle kursus wat jou klinikus stel.",
      "Materia versin nie 'n dosis, duur, of kos-tyd reël nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van swangerskapplanne, lewersiekte, porfiriegeskiedenis, en ALLE ander medisyne (insluitend warfarien en orale voorbehoedmiddels).",
      "Som etikette adviseer om met vetterige kos te neem om absorpsie te help — volg die geëtiketteerde produk, moenie 'n maaltydplan versin nie.",
      "Vra hoe lank nael- of kopvelinfeksies behandeling mag nodig hê en wanneer om te hersien as daar geen verbetering is nie.",
      "As geelsug, ernstige uitslag, koors, of ongewone kneusings ontwikkel — soek dringend sorg.",
    ],
    [
      "Griseofulvin ke antifungal ea molomo bakeng sa tšoaetso tse khethiloeng tsa dermatophyte (ringworm) — nka thuto e felletseng eo ngaka ea hau e e behang.",
      "Materia ha e iqape tekanyo, nako, kapa molao oa nako ea lijo — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka merero ea bokhachane, lefu la sebete, nalane ea porphyria, le MERIANA EOHLE e meng (ho kenyeletsa warfarin le lithibelo tsa molomo).",
      "Li-ileibole tse ling li eletsa ho nka le lijo tse mafura ho thusa ho monya — latela sehlahisoa se nang le ileibole, u se ke ua iqapa moralo oa lijo.",
      "Botsoa hore na tšoaetso ea manala kapa ea hlooho e ka hloka nako e kae le hore na u hlahlobe neng haeba ho se ntlafatso.",
      "Haeba jaundice, lekhopho le matla, feberu, kapa ho otlaha ho sa tloaelehang ho hlaha — batla thuso ka potlako.",
    ],
    [
      "I-griseofulvin yi-antifungal yomlomo yeentsholongwane ezikhethiweyo ze-dermatophyte (ringworm) — thatha ikhosi epheleleyo ugqirha ayibekayo.",
      "I-Materia ayiyiqiqi idosi, ubude, okanye umthetho wexesha lokutya — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngezicwangciso zokukhulelwa, isifo sesibindi, imbali ye-porphyria, kunye NAWO ONKE amanye amayeza (kuquka i-warfarin kunye nezithinteli zomlomo).",
      "Ezinye iilebhile zicebisa ukuthatha nokutya okunamafutha ukunceda ukumunca — landela imveliso enelebula, ungacingi isicwangciso sokutya.",
      "Buza ukuba iinzipho okanye iintloko zingadinga ixesha elingakanani nokuba ujonga nini ukuba akukho mphpucuko.",
      "Ukuba i-jaundice, irhashalala enzima, umkhuhlane, okanye ukulimala okungaqhelekanga kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-chlorhexidine": five(
    [
      "Chlorhexidine is an antiseptic used as mouthwash or skin prep in selected pathways — use the strength and technique on your labelled product.",
      "Materia does not invent a concentration, rinse volume, or course length — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about mouth ulcers, swallowing difficulty, asthma, and any prior reaction to chlorhexidine products.",
      "Do not swallow mouthwash unless the label explicitly says otherwise — spit after rinsing as directed.",
      "Ask whether you should avoid eating or drinking for a short period after rinsing, per the labelled product.",
      "If swelling of lips or throat, wheeze, or severe rash develops — seek emergency care immediately.",
    ],
    [
      "I-chlorhexidine i-antiseptic esetshenziswa njenge-mouthwash noma ukulungiselela isikhumba ezindleleni ezikhethiwe — sebenzisa amandla nendlela esemkhiqizweni onelebula.",
      "I-Materia ayiqambi ukugxilisa, ivolumu yokuhlanza, noma ubude benkambo — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngezilonda zomlomo, ubunzima bokugwinya, i-asthma, nanoma yikuphi ukungazwani kwangaphambilini nemikhiqizo ye-chlorhexidine.",
      "Ungagwinyi i-mouthwash ngaphandle kokuthi ilebula isho ngokucacile — khafula ngemva kokuhlanza njengoba kushiwo.",
      "Buza ukuthi kufanele ugweme ukudla noma ukuphuza isikhashana ngemva kokuhlanza, ngokomkhiqizo onelebula.",
      "Uma ukuvuvuka kwezindebe noma umphimbo, ukuhema kanzima, noma ukuqubuka okukhulu kuvela — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Chloorheksidien is 'n antiseptikum wat as mondspoelmiddel of velvoorbereiding in geselekteerde paaie gebruik word — gebruik die sterkte en tegniek op jou geëtiketteerde produk.",
      "Materia versin nie 'n konsentrasie, spoelvolume, of kursuslengte nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van mondsere, slukprobleme, asma, en enige vorige reaksie op chloorheksidienprodukte.",
      "Moenie mondspoelmiddel insluk nie tensy die etiket dit uitdruklik sê — spoeg uit na spoel soos aangedui.",
      "Vra of jy eet of drink vir 'n kort tyd na spoel moet vermy, volgens die geëtiketteerde produk.",
      "As swelling van lippe of keel, piepende asem, of ernstige uitslag ontwikkel — soek onmiddellik noodgeval sorg.",
    ],
    [
      "Chlorhexidine ke antiseptic e sebelisoang e le mouthwash kapa tokiso ea letlalo litseleng tse khethiloeng — sebelisa matla le mokhoa o holim'a sehlahisoa sa hau se nang le ileibole.",
      "Materia ha e iqape concentration, volume ea ho hlatsoa, kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka lisoa tsa molomo, bothata ba ho koenya, asthma, le karabelo efe kapa efe ea pejana ho lihlahisoa tsa chlorhexidine.",
      "U se ke ua koenya mouthwash ntle le haeba ileibole e bolela ka ho hlaka — tšoela ka mor'a ho hlatsoa joalo ka ha u laetsoe.",
      "Botsoa hore na u lokela ho qoba ho ja kapa ho noa nako e khuts'oane ka mor'a ho hlatsoa, ho ea ka sehlahisoa se nang le ileibole.",
      "Haeba ho ruruha ha melomo kapa 'metso, ho hema ka thata, kapa lekhopho le matla ho hlaha — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-chlorhexidine yi-antiseptic esetyenziswa njenge-mouthwash okanye ukulungiselela ulusu kwiindlela ezikhethiweyo — sebenzisa amandla kunye nendlela kwimveliso yakho enelebula.",
      "I-Materia ayiyiqiqi ukugxininisa, umthamo wokuhlambela, okanye ubude bekhosi — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngezilonda zomlomo, ubunzima bokuginya, i-asthma, kunye nayiphi na impendulo yangaphambili kwiimveliso ze-chlorhexidine.",
      "Ungaginyi i-mouthwash ngaphandle kokuba ilebhile ithetha ngokucacileyo — khupha emva kokuhlambela njengoko uyalelelwe.",
      "Buza ukuba kufuneka uphephe ukutya okanye ukusela ixesha elifutshane emva kokuhlambela, ngokwemveliso enelebula.",
      "Ukuba ukudumba kwemilebe okanye umqala, ukuphefumla nzima, okanye irhashalala enzima kuvela — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-nifedipine": five(
    [
      "Nifedipine is a calcium-channel blocker used in selected blood-pressure and obstetric pathways — formulation (immediate vs modified release) matters.",
      "Materia does not invent a dose or BP threshold algorithm — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about pregnancy, heart disease, liver disease, and ALL other medicines (including grapefruit products if relevant to your label).",
      "Do not crush or chew modified-release tablets unless the labelled product allows it — ask the pharmacist if unsure.",
      "Ask how often blood pressure should be checked and what dizziness or swelling means for your regimen.",
      "If chest pain, severe headache, fainting, or sudden swelling develops — seek care urgently.",
    ],
    [
      "I-nifedipine i-calcium-channel blocker esetshenziswa ezindleleni ezikhethiwe zomfutho wegazi nezokubeletha — uhlobo (okusheshayo vs okukhululwa kancane) lubalulekile.",
      "I-Materia ayiqambi umthamo noma i-algorithm yomkhawulo we-BP — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngokukhulelwa, isifo senhliziyo, isifo sesibindi, nawo WONKE amanye amaphilisi (kuhlanganise imikhiqizo ye-grapefruit uma ilebula yakho ikusho).",
      "Ungacindezeli noma uhlafune amaphilisi okukhululwa kancane ngaphandle kokuthi umkhiqizo onelebula uvumela — buza usokhemisi uma ungaqiniseki.",
      "Buza ukuthi umfutho wegazi kufanele uhlolwe kangaki nokuthi isiyezi noma ukuvuvuka kusho ukuthini ohlelweni lwakho.",
      "Uma ubuhlungu besifuba, ikhandla elibi kakhulu, ukuquleka, noma ukuvuvuka okuzumayo kuvela — funa usizo ngokushesha.",
    ],
    [
      "Nifedipien is 'n kalsiumkanaalblokkeerder in geselekteerde bloeddruk- en verloskundige paaie — formulering (onmiddellik vs gewysigde vrystelling) maak saak.",
      "Materia versin nie 'n dosis of BP-drempelalgoritme nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van swangerskap, hartsiektes, lewersiekte, en ALLE ander medisyne (insluitend pomelo produkte as dit op jou etiket van toepassing is).",
      "Moenie gewysigde-vrystelling tablette fyndruk of kou nie tensy die geëtiketteerde produk dit toelaat — vra die apteker as jy onseker is.",
      "Vra hoe gereeld bloeddruk nagegaan moet word en wat duiseligheid of swelling vir jou regimen beteken.",
      "As borspyn, ernstige hoofpyn, floute, of skielike swelling ontwikkel — soek dringend sorg.",
    ],
    [
      "Nifedipine ke calcium-channel blocker e sebelisoang litseleng tse khethiloeng tsa khatello ea mali le tsa bokhachane — sebopeho (hang-hang vs ho lokolloa ho fetotsoeng) sea bohlokoa.",
      "Materia ha e iqape tekanyo kapa algorithm ea moeli oa BP — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka bokhachane, lefu la pelo, lefu la sebete, le MERIANA EOHLE e meng (ho kenyeletsa lihlahisoa tsa grapefruit haeba ileibole ea hau e bua ka tsona).",
      "U se ke ua sila kapa u hlafuna litapolete tsa ho lokolloa ho fetotsoeng ntle le haeba sehlahisoa se nang le ileibole se lumella — botsa rakhemisi haeba u sa kholisehe.",
      "Botsoa hore na khatello ea mali e lokela ho hlahlojoa hangata hakae le hore na ho tsekela kapa ho ruruha ho bolelang bakeng sa kemiso ea hau.",
      "Haeba bohloko ba sefuba, hlooho e bohloko haholo, ho akheha, kapa ho ruruha ka tšohanyetso ho hlaha — batla thuso ka potlako.",
    ],
    [
      "I-nifedipine yi-calcium-channel blocker esetyenziswa kwiindlela ezikhethiweyo zoxinzelelo lwegazi kunye nezokubeleka — uhlobo (ngokukhawuleza vs ukukhululwa okuguqulweyo) lubalulekile.",
      "I-Materia ayiyiqiqi idosi okanye i-algorithm yomda we-BP — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngokukhulelwa, isifo sentliziyo, isifo sesibindi, kunye NAWO ONKE amanye amayeza (kuquka iimveliso ze-grapefruit ukuba ilebhile yakho ithetha ngazo).",
      "Ungacinezeli okanye uhlafune iipilisi zokukhululwa okuguqulweyo ngaphandle kokuba imveliso enelebula iyavumela — buza usokhemisi ukuba awuqinisekanga.",
      "Buza ukuba uxinzelelo lwegazi kufuneka lujongwe rhoqo kangakanani nokuba isiyezi okanye ukudumba kuthetha ntoni kwinkqubo yakho.",
      "Ukuba intlungu yesifuba, intloko ebuhlungu kakhulu, ukuquleka, okanye ukudumba ngequbuliso kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-methyldopa": five(
    [
      "Methyldopa is a centrally acting blood-pressure medicine historically used in selected pregnancy hypertension pathways — take only as your clinician directs.",
      "Materia does not invent a dose or titration schedule — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about liver disease, depression history, anaemia, and ALL other medicines before starting or changing dose.",
      "Sedation and dizziness can occur — take care with driving or heights until you know how you respond.",
      "Ask what blood-pressure targets and blood tests (if any) are planned for your pregnancy or hypertension pathway.",
      "If yellow eyes, unexplained fever, severe low mood, or fainting develops — seek care urgently.",
    ],
    [
      "I-methyldopa umuthi womfutho wegazi osebenza phakathi ngokwesiko osetshenziswa ezindleleni ezikhethiwe zomfutho wegazi wokukhulelwa — thatha kuphela njengoba udokotela esho.",
      "I-Materia ayiqambi umthamo noma uhlelo lokunyuka — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngesifo sesibindi, umlando wokucindezeleka, i-anaemia, nawo WONKE amanye amaphilisi ngaphambi kokuqala noma ukushintsha umthamo.",
      "Ukuzizwa ulele nesiyezi kungenzeka — qaphela ukushayela noma ukuphakama uze wazi ukuthi uphendula kanjani.",
      "Buza ukuthi yimiphi imigomo yomfutho wegazi nezivivinyo zegazi (uma zikhona) ezicshiwo ohlelweni lwakho lokukhulelwa noma lomfutho wegazi.",
      "Uma amehlo aphuzi, umkhuhlane ongachazeki, isimo sengqondo esiphansi kakhulu, noma ukuquleka kuvela — funa usizo ngokushesha.",
    ],
    [
      "Metildopa is 'n sentraalwerkende bloeddrukmedisyne histories gebruik in geselekteerde swangerskap hipertensie paaie — neem slegs soos jou klinikus aandui.",
      "Materia versin nie 'n dosis of titrasieskedule nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van lewersiekte, depressiegeskiedenis, anemie, en ALLE ander medisyne voor jy begin of die dosis verander.",
      "Sedasie en duiseligheid kan voorkom — wees versigtig met bestuur of hoogtes totdat jy weet hoe jy reageer.",
      "Vra watter bloeddrukteikens en bloedtoetse (indien enige) beplan is vir jou swangerskap of hipertensie pad.",
      "As geel oë, onverklaarde koors, ernstige lae bui, of floute ontwikkel — soek dringend sorg.",
    ],
    [
      "Methyldopa ke meriana ea khatello ea mali e sebetsang bohareng e neng e sebelisoa litseleng tse khethiloeng tsa khatello ea mali ea bokhachane — e nke feela joalo ka ha ngaka ea hau e laela.",
      "Materia ha e iqape tekanyo kapa kemiso ea ho nyolla — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka lefu la sebete, nalane ea ho tepella maikutlo, anaemia, le MERIANA EOHLE e meng pele u qala kapa u fetola tekanyo.",
      "Ho otlolla le ho tsekela ho ka hlaha — hlokomela ho khanna kapa bophahamo ho fihlela u tseba hore na u arabela joang.",
      "Botsoa hore na ke lipheo life tsa khatello ea mali le liteko tsa mali (haeba li teng) tse reriloeng bakeng sa tsela ea hau ea bokhachane kapa ea khatello ea mali.",
      "Haeba mahlo a mosehla, feberu e sa hlaloseng, maikutlo a tlase haholo, kapa ho akheha ho hlaha — batla thuso ka potlako.",
    ],
    [
      "I-methyldopa liyeza loxinzelelo lwegazi elisebenza phakathi ngokwembali elisetyenziswa kwiindlela ezikhethiweyo zoxinzelelo lwegazi lokukhulelwa — thatha kuphela njengoko ugqirha esho.",
      "I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyusa — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngesifo sesibindi, imbali yokudakumba, i-anaemia, kunye NAWO ONKE amanye amayeza ngaphambi kokuqala okanye ukutshintsha idosi.",
      "Ukuziva ulele nesiyezi kungenzeka — lumkela ukuqhuba okanye ukuphakama de wazi ukuba uphendula njani.",
      "Buza ukuba zeziphi iinjongo zoxinzelelo lwegazi kunye neemvavanyo zegazi (ukuba zikho) ezicwangcisiweyo kwindlela yakho yokukhulelwa okanye yoxinzelelo lwegazi.",
      "Ukuba amehlo atyheli, umkhuhlane ongachazekiyo, imo yengqondo ephantsi kakhulu, okanye ukuquleka kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-mifepristone": five(
    [
      "Mifepristone is an antiprogestogen used in regulated medical abortion and selected obstetric pathways — legal and clinical pathways apply in South Africa.",
      "Materia does not invent a dose, combination regimen, or gestational-age cut-off — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about ectopic pregnancy risk, bleeding disorders, adrenal disease, and ALL other medicines before treatment.",
      "Expect bleeding and cramping after medical abortion pathways — ask what volume of bleeding is too much and when to return urgently.",
      "Ask about contraception plans after the pathway and when a follow-up visit or pregnancy test is required.",
      "If heavy soaking bleeding, severe pain, fever, or fainting develops — seek emergency care immediately.",
    ],
    [
      "I-mifepristone i-antiprogestogen esetshenziswa ezindleleni ezilawulwayo zokuhushulwa kwezokwelapha nasezindleleni ezikhethiwe zokubeletha — izindlela zomthetho nezokwelapha zisebenza eNingizimu Afrika.",
      "I-Materia ayiqambi umthamo, uhlelo lwenhlanganisela, noma umkhawulo wobudala bokukhulelwa — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngobungozi be-ectopic pregnancy, izinkinga zokopha, isifo se-adrenal, nawo WONKE amanye amaphilisi ngaphambi kokwelashwa.",
      "Linda ukopha nokubamba ngemva kwezindlela zokuhushulwa kwezokwelapha — buza ukuthi yiliphi iVolumu yokopha elikhulu kakhulu nokuthi ubuyela nini ngokushesha.",
      "Buza ngezinhlelo zokuvimbela inzalo ngemva kwendlela nokuthi uvakashelwa nini noma uhlolwa ukukhulelwa.",
      "Uma ukopha okumanzisa kakhulu, ubuhlungu obukhulu, umkhuhlane, noma ukuquleka kuvela — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Mifepristoon is 'n antiprogestogeen in gereguleerde mediese aborsie- en geselekteerde verloskundige paaie — wetlike en kliniese paaie geld in Suid-Afrika.",
      "Materia versin nie 'n dosis, kombinasie-regimen, of swangerskapsouderdom afsnypunt nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van ektopiese swangerskap risiko, bloedingstoornisse, byniersiekte, en ALLE ander medisyne voor behandeling.",
      "Verwag bloeding en krampe na mediese aborsie paaie — vra watter bloedingvolume te veel is en wanneer om dringend terug te kom.",
      "Vra oor voorbehoedplanne na die pad en wanneer 'n opvolgbesoek of swangerskaptoets nodig is.",
      "As swaar deurdrenkende bloeding, ernstige pyn, koors, of floute ontwikkel — soek onmiddellik noodgeval sorg.",
    ],
    [
      "Mifepristone ke antiprogestogen e sebelisoang litseleng tse laoloang tsa ho ntša mpa ka bongaka le litsela tse khethiloeng tsa bokhachane — litsela tsa molao le tsa bongaka lia sebetsa Afrika Boroa.",
      "Materia ha e iqape tekanyo, kemiso ea motsoako, kapa moeli oa lilemo tsa bokhachane — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka kotsi ea bokhachane ba ectopic, mathata a ho tsoa mali, lefu la adrenal, le MERIANA EOHLE e meng pele ho kalafo.",
      "Lebella ho tsoa mali le ho hlaba ka mor'a litsela tsa ho ntša mpa ka bongaka — botsa hore na ke bophahamo bofe ba mali bo bongata haholo le hore na u khutle neng ka potlako.",
      "Botsoa ka merero ea thibelo ea bokhachane ka mor'a tsela le hore na ketelo ea ho latela kapa teko ea bokhachane e hlokahala neng.",
      "Haeba ho tsoa mali ho monyang haholo, bohloko bo boholo, feberu, kapa ho akheha ho hlaha — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-mifepristone yi-antiprogestogen esetyenziswa kwiindlela ezilawulwayo zokuqhawula ukukhulelwa ngonyango kunye neendlela ezikhethiweyo zokubeleka — iindlela zomthetho nezonyango zisebenza eMzantsi Afrika.",
      "I-Materia ayiyiqiqi idosi, inkqubo yendibaniselwano, okanye umda weminyaka yokukhulelwa — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngomngcipheko wokukhulelwa kwe-ectopic, iingxaki zokopha, isifo se-adrenal, kunye NAWO ONKE amanye amayeza ngaphambi konyango.",
      "Linda ukopha nokubamba emva kweendlela zokuqhawula ukukhulelwa ngonyango — buza ukuba ngumthamo oni wokopha omninzi kakhulu nokuba ubuyela nini ngokukhawuleza.",
      "Buza ngezicwangciso zokuthintela ukukhulelwa emva kwendlela nokuba undwendwelo lokulandela okanye uvavanyo lokukhulelwa lufuneka nini.",
      "Ukuba ukopha okufaka kakhulu, intlungu enzima, umkhuhlane, okanye ukuquleka kuvela — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-ergometrine": five(
    [
      "Ergometrine is an ergot uterotonic used in selected postpartum haemorrhage pathways — it is given by clinicians in maternity settings.",
      "Materia does not invent a dose, route, or combination with oxytocin — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the maternity team about high blood pressure, heart disease, eclampsia history, and ALL other medicines before administration.",
      "This is not a home medicine — bleeding after birth needs facility-level care and monitoring.",
      "Ask what blood-loss monitoring and follow-up haemoglobin checks are planned after the acute bleed is controlled.",
      "If heavy bleeding continues, chest pain, severe headache, or seizures develop — alert the care team immediately.",
    ],
    [
      "I-ergometrine i-ergot uterotonic esetshenziswa ezindleleni ezikhethiwe zokopha ngemva kokubeletha — inikwa odokotela ezindaweni zokubeletha.",
      "I-Materia ayiqambi umthamo, indlela, noma inhlanganisela ne-oxytocin — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba lokubeletha ngomfutho wegazi ophezulu, isifo senhliziyo, umlando we-eclampsia, nawo WONKE amanye amaphilisi ngaphambi kokunikezwa.",
      "Lokhu akuwona umuthi wasekhaya — ukopha ngemva kokubeletha kudinga ukunakekelwa nokuqashelwa esikhungweni.",
      "Buza ukuthi yikuphi ukuqapha ukolahlekelwa igazi nokuhlolwa kwe-haemoglobin okulandelayo okucshiwo ngemva kokulawulwa kokopha okubucayi.",
      "Uma ukopha okukhulu kuqhubeka, ubuhlungu besifuba, ikhandla elibi, noma ukuxega kuvela — xwayisa ithimba ngokushesha.",
    ],
    [
      "Ergometriene is 'n ergot uterotonikum in geselekteerde nageboorte bloeding paaie — dit word deur klinici in kraamsettings gegee.",
      "Materia versin nie 'n dosis, roete, of kombinasie met oksitosien nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die kraamspan van hoë bloeddruk, hartsiektes, eklampsiegeskiedenis, en ALLE ander medisyne voor toediening.",
      "Dit is nie 'n huismedisyne nie — bloeding na geboorte benodig fasiliteit-vlak sorg en monitering.",
      "Vra watter bloedverlies monitering en opvolg hemoglobientoetse beplan is nadat die akute bloeding beheer is.",
      "As swaar bloeding aanhou, borspyn, ernstige hoofpyn, of aanvalle ontwikkel — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Ergometrine ke ergot uterotonic e sebelisoang litseleng tse khethiloeng tsa ho tsoa mali ka mor'a ho beleha — e fuoa ke lingaka libakeng tsa bokhachane.",
      "Materia ha e iqape tekanyo, tsela, kapa motsoako le oxytocin — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha sa bokhachane ka khatello ea mali e phahameng, lefu la pelo, nalane ea eclampsia, le MERIANA EOHLE e meng pele ho fana.",
      "Sena ha se meriana ea lapeng — ho tsoa mali ka mor'a tsoalo ho hloka tlhokomelo le ho sheba boemong ba setsi.",
      "Botsoa hore na ke tlhokomelo efe ea tahlehelo ea mali le liteko tsa haemoglobin tsa ho latela tse reriloeng ka mor'a hore mali e bohale e laoloe.",
      "Haeba ho tsoa mali ho hoholo ho tsoela pele, bohloko ba sefuba, hlooho e bohloko, kapa ho thothomela ho hlaha — tsebisa sehlopha hang-hang.",
    ],
    [
      "I-ergometrine yi-ergot uterotonic esetyenziswa kwiindlela ezikhethiweyo zokopha emva kokubeleka — inikwa ngoogqirha kwiindawo zokubeleka.",
      "I-Materia ayiyiqiqi idosi, indlela, okanye indibaniselwano ne-oxytocin — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela lokubeleka ngoxinzelelo lwegazi oluphezulu, isifo sentliziyo, imbali ye-eclampsia, kunye NAWO ONKE amanye amayeza ngaphambi kokunikezelwa.",
      "Oku ayililo iyeza lasekhaya — ukopha emva kokuzalwa kufuna ukhathalelo kunye nokujonga kwinqanaba leziko.",
      "Buza ukuba kukuphi ukujonga ukulahlekelwa ligazi kunye neemvavanyo ze-haemoglobin zokulandela ezicwangcisiweyo emva kokuba ukopha okubucala kulawuliwe.",
      "Ukuba ukopha okukhulu kuyaqhubeka, intlungu yesifuba, intloko ebuhlungu, okanye ukuxhuzula kuvela — xelela iqela ngoko nangoko.",
    ],
  ),

  "mol-promethazine": five(
    [
      "Promethazine is a sedating antihistamine used for selected allergy, nausea, and sedation contexts — take only as labelled for your indication.",
      "Materia does not invent a dose or paediatric rule — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about glaucoma, prostate problems, epilepsy, breathing disease, pregnancy, and ALL other sedating medicines or alcohol use.",
      "Expect drowsiness — avoid driving, cycling in traffic, or operating machinery until you know how you respond.",
      "Do not mix with alcohol or other sedatives unless a clinician has reviewed the combination.",
      "If breathing slows, confusion worsens, or a severe rash develops — seek care urgently.",
    ],
    [
      "I-promethazine i-antihistamine eyenza ulale esetshenziswa ezimeni ezikhethiwe ze-allergy, isicanucanu, nokulalisa — thatha kuphela njengoba ilebula isho ngesizathu sakho.",
      "I-Materia ayiqambi umthamo noma umthetho wezingane — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela nge-glaucoma, izinkinga ze-prostate, i-epilepsy, isifo sokuphefumula, ukukhulelwa, nawo WONKE amanye amaphilisi alalisayo noma utshwala.",
      "Linda ukozela — gwema ukushayela, ukuhamba ngebhayisikili ethrafikhi, noma ukusebenzisa imishini uze wazi ukuthi uphendula kanjani.",
      "Ungaxubi notshwala noma amanye ama-sedative ngaphandle kokuthi udokotela ubuyekeze inhlanganisela.",
      "Uma ukuphefumula kuba kancane, ukudideka kuba kubi, noma ukuqubuka okukhulu kuvela — funa usizo ngokushesha.",
    ],
    [
      "Prometasien is 'n sedatiewe antihistamien vir geselekteerde allergie-, naarheid- en sedasie kontekste — neem slegs soos geëtiketteer vir jou aanduiding.",
      "Materia versin nie 'n dosis of pediatriese reël nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van gloukoom, prostaatprobleme, epilepsie, asemhalingsiekte, swangerskap, en ALLE ander sedatiewe medisyne of alkoholgebruik.",
      "Verwag slaperigheid — vermy bestuur, fietsry in verkeer, of masjinerie bedryf totdat jy weet hoe jy reageer.",
      "Moenie met alkohol of ander sedatiewe middels meng nie tensy 'n klinikus die kombinasie nagegaan het.",
      "As asemhaling stadiger word, verwarring versleg, of 'n ernstige uitslag ontwikkel — soek dringend sorg.",
    ],
    [
      "Promethazine ke antihistamine e otlollang e sebelisoang maemong a khethiloeng a allergy, ho nyekeloa ke pelo, le ho otlolla — e nke feela joalo ka ha ileibole e re bakeng sa sesosa sa hau.",
      "Materia ha e iqape tekanyo kapa molao oa bana — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka glaucoma, mathata a prostate, epilepsy, lefu la ho hema, bokhachane, le MERIANA EOHLE e meng e otlollang kapa tšebeliso ea joala.",
      "Lebella ho otsela — qoba ho khanna, ho palama baesekele tseleng, kapa ho sebetsa mechini ho fihlela u tseba hore na u arabela joang.",
      "U se ke ua kopanya le joala kapa li-sedative tse ling ntle le haeba ngaka e hlahlobile motsoako.",
      "Haeba ho hema ho lieha, ho ferekana ho mpefala, kapa lekhopho le matla le hlaha — batla thuso ka potlako.",
    ],
    [
      "I-promethazine yi-antihistamine eyenza ulale esetyenziswa kwiimeko ezikhethiweyo ze-allergy, isicanucanu, kunye nokulalisa — thatha kuphela njengoko ilebhile isho ngesizathu sakho.",
      "I-Materia ayiyiqiqi idosi okanye umthetho wabantwana — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha nge-glaucoma, iingxaki ze-prostate, i-epilepsy, isifo sokuphefumla, ukukhulelwa, kunye NAWO ONKE amanye amayeza alalisayo okanye ukusela utywala.",
      "Linda ukozela — phepha ukuqhuba, ukukhwela ibhayisekile ethrafikhi, okanye ukusebenzisa oomatshini de wazi ukuba uphendula njani.",
      "Ungaxubi notywala okanye ezinye ii-sedative ngaphandle kokuba ugqirha uye wahlola indibaniselwano.",
      "Ukuba ukuphefumla kuya kancinci, ukudideka kuya kuba mbi, okanye irhashalala enzima kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-fosfomycin": five(
    [
      "Fosfomycin is an antibiotic used in selected uncomplicated urinary-tract infection pathways — often as a single sachet product.",
      "Materia does not invent a sachet dose or course rule — confirm against current SA PHC STG/EML and the labelled product.",
      "Tell the clinician about kidney disease, pregnancy, allergy history, and ALL other medicines before taking it.",
      "Dissolve and take the sachet exactly as the labelled product directs — do not invent a mixing method.",
      "Ask when symptoms should improve and when to return if burning, fever, or flank pain persists or worsens.",
      "If rash, swelling, severe diarrhoea, or breathing difficulty develops — seek care urgently.",
    ],
    [
      "I-fosfomycin i-antibiotic esetshenziswa ezindleleni ezikhethiwe zezifo zomchamo ezingenziwanga nzima — ngokuvamile njengomkhiqizo wesachet eyodwa.",
      "I-Materia ayiqambi umthamo wesachet noma umthetho wenkambo — qinisekisa ne-STG/EML ye-PHC yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngesifo sezinso, ukukhulelwa, umlando we-allergy, nawo WONKE amanye amaphilisi ngaphambi kokuyithatha.",
      "Ncibilikisa uthathe i-sachet njengoba umkhiqizo onelebula usho — ungacabangi indlela yokuxuba.",
      "Buza ukuthi izimpawu kufanele zithuthuke nini nokuthi ubuyela nini uma ukushisa, umkhuhlane, noma ubuhlungu bohlangothi buqhubeka noma baba kubi.",
      "Uma ukuqubuka, ukuvuvuka, uhudo olukhulu, noma ubunzima bokuphefumula kuvela — funa usizo ngokushesha.",
    ],
    [
      "Fosfomisien is 'n antibiotikum in geselekteerde ongekompliseerde urineweginfeksie paaie — dikwels as 'n enkel sachet produk.",
      "Materia versin nie 'n sachet dosis of kursusreël nie — bevestig teen huidige SA PHC STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van niersiekte, swangerskap, allergiegeskiedenis, en ALLE ander medisyne voor jy dit neem.",
      "Los op en neem die sachet presies soos die geëtiketteerde produk aandui — moenie 'n mengmetode versin nie.",
      "Vra wanneer simptome moet verbeter en wanneer om terug te kom as brand, koors, of flankpyn aanhou of versleg.",
      "As uitslag, swelling, ernstige diarree, of asemnood ontwikkel — soek dringend sorg.",
    ],
    [
      "Fosfomycin ke antibiotic e sebelisoang litseleng tse khethiloeng tsa tšoaetso ea tsela ea moroto e sa rarahanang — hangata e le sehlahisoa sa sachet e le 'ngoe.",
      "Materia ha e iqape tekanyo ea sachet kapa molao oa thuto — netefatsa khahlanong le STG/EML ea PHC ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka lefu la liphio, bokhachane, nalane ea allergy, le MERIANA EOHLE e meng pele u e nka.",
      "Qhibiliha 'me u nke sachet hantle joalo ka ha sehlahisoa se nang le ileibole se laela — u se ke ua iqapa mokhoa oa ho kopanya.",
      "Botsoa hore na matšoao a lokela ho ntlafala neng le hore na u khutle neng haeba ho chesa, feberu, kapa bohloko ba lehlakore bo tsoela pele kapa bo mpefala.",
      "Haeba lekhopho, ho ruruha, letshollo le matla, kapa ho hema thata ho hlaha — batla thuso ka potlako.",
    ],
    [
      "I-fosfomycin yi-antibiotic esetyenziswa kwiindlela ezikhethiweyo zeentsholongwane zendlela yomchamo ezingenziwanga nzima — rhoqo njengemveliso yesachet enye.",
      "I-Materia ayiyiqiqi idosi yesachet okanye umthetho wekhosi — Qinisekisa ne-STG/EML ye-PHC yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngesifo sezintso, ukukhulelwa, imbali ye-allergy, kunye NAWO ONKE amanye amayeza ngaphambi kokuyithatha.",
      "Nyibilikisa uthathe i-sachet kanye njengoko imveliso enelebula isho — ungacingi indlela yokuxuba.",
      "Buza ukuba iimpawu kufuneka ziphucuke nini nokuba ubuyela nini ukuba ukutshisa, umkhuhlane, okanye intlungu yecala iyaqhubeka okanye iba mbi.",
      "Ukuba irhashalala, ukudumba, urhudo olukhulu, okanye ubunzima bokuphefumla kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),
};
