import type { CounsellingLang, CounsellingScript } from "./counselling.js";

export const COUNSELLING_V100_TO_V109: Record<
  string,
  Partial<Record<CounsellingLang, CounsellingScript>>
> = {
  "mol-lamivudine": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this NRTI antiretroviral exactly as directed on your labelled product — daily adherence supports clinician-directed HIV or hepatitis B plans.",
        "Lamivudine counselling commonly includes completing the regimen as prescribed and reporting new medicines for interaction checks. Materia does not invent a dose or viral-load target.",
        "Tell your pharmacist about kidney history and all other antivirals or herbals you use.",
        "If you get severe rash with fever, yellow eyes, extreme fatigue, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le NRTI antiretroviral njengoba kubhalwe kumkhiqizo onelebula — ukuthatha nsuku zonke kusekela izinhlelo ze-HIV noma i-hepatitis B ezilawulwa udokotela.",
        "Ukwelulekwa kwe-lamivudine kuvame ukufaka ukuqeda irhimba njengoba kunikiwe nokubika amaphilisi amasha ukuze kuhlolwe ukuxhumana. I-Materia ayiqambi umthamo noma umgomo we-viral load.",
        "Tshela umkhiqizi ngomlando wezintso nawo wonke amanye ama-antiviral noma ama-herbal owasebenzisayo.",
        "Uma uthola ukuqubuka okukhulu nomkhuhlane, amehlo aphuzi, ukukhathala okukhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie NRTI-antiretrovirale middel soos op die geëtiketteerde produk aangedui — daaglikse nakoming ondersteun klinikus-gerigte MIV- of hepatitis B-planne.",
        "Lamivudine-berading sluit dikwels in om die regime soos voorgeskryf te voltooi en nuwe medisyne vir interaksiekontroles te rapporteer. Materia versin nie ’n dosis of virale-ladingteiken nie.",
        "Sê vir jou apteker van niergeskiedenis en alle ander antivirale middels of kruie wat jy gebruik.",
        "As jy ernstige uitslag met koors, geel oë, uiterste moegheid of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa NRTI antiretroviral ena hantle kamoo e hlalositsoeng holabel — ho e nka letsatsi le letsatsi ho tšehetsa merero ea HIV kapa hepatitis B e tataisoang ke ngaka.",
        "Keletso ea lamivudine hangata e kenyelletsa ho qeta regimen kamoo e ngotsoeng le ho tlaleha meriana e mecha bakeng sa tlhahlobo ea ho sebelisana. Materia ha e iqape tekanyo kapa sepheo sa viral load.",
        "Bolella rakhemisi ka histori ea liphio le li-antiviral kapa litlama tse ling tseo u li sebelisang.",
        "Haeba u fumana lekhopho le matla le feberu, mahlo a mosehla, mokhathala o feteletseng, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le NRTI antiretroviral ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukuthatha yonke imihla kuxhasa izicwangciso ze-HIV okanye i-hepatitis B ezikhokelwa ngugqirha.",
        "Iingcebiso ze-lamivudine zihlala zibandakanya ukugqiba i-regimen njengoko kunikiwe nokuxela amayeza amatsha ukuze kujongwe ukusebenzelana. I-Materia ayiyiqiqi idosi okanye usukelo lwe-viral load.",
        "Xelela usokhemisti ngembali yezintso nawo onke amanye ama-antiviral okanye ama-herbal owasebenzisayo.",
        "Ukuba ufumana irhashalala enzima nomkhuhlane, amehlo atyheli, ukudinwa okugqithisileyo, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-tdf": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this tenofovir NRTI exactly as directed on your labelled product — adherence supports clinician-directed HIV or hepatitis B care.",
        "Tenofovir counselling commonly includes kidney and bone health discussions with your clinician — report reduced urine, bone pain, or new medicines. Materia does not invent a dose, eGFR, or viral-load target.",
        "Tell your pharmacist about kidney history, NSAIDs, and all other antivirals you use.",
        "If you get severe rash with fever, yellow eyes, sudden swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le tenofovir NRTI njengoba kubhalwe kumkhiqizo onelebula — ukuthatha kahle kusekela ukwelashwa kwe-HIV noma i-hepatitis B okulawulwa udokotela.",
        "Ukwelulekwa kwe-tenofovir kuvame ukufaka izingxoxo zezintso namathambo nodokotela — bika umchamo omncane, ubuhlungu bamathambo, noma amaphilisi amasha. I-Materia ayiqambi umthamo, i-eGFR, noma umgomo we-viral load.",
        "Tshela umkhiqizi ngomlando wezintso, ama-NSAID, nawo wonke amanye ama-antiviral.",
        "Uma uthola ukuqubuka okukhulu nomkhuhlane, amehlo aphuzi, ukuvuvuka okuzumayo, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie tenofovir-NRTI soos op die geëtiketteerde produk aangedui — nakoming ondersteun klinikus-gerigte MIV- of hepatitis B-sorg.",
        "Tenofovir-berading sluit dikwels nier- en been-gesondheidsbesprekings met jou klinikus in — rapporteer minder urine, beenpyn of nuwe medisyne. Materia versin nie ’n dosis, eGFR of virale-ladingteiken nie.",
        "Sê vir jou apteker van niergeskiedenis, NSAIDs, en alle ander antivirale middels wat jy gebruik.",
        "As jy ernstige uitslag met koors, geel oë, skielike swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa tenofovir NRTI ena hantle kamoo e hlalositsoeng holabel — ho e nka hantle ho tšehetsa tlhokomelo ea HIV kapa hepatitis B e tataisoang ke ngaka.",
        "Keletso ea tenofovir hangata e kenyelletsa lipuisano tsa bophelo ba liphio le masapo le ngaka — tlaleha moroto o fokolang, bohloko ba masapo, kapa meriana e mecha. Materia ha e iqape tekanyo, eGFR, kapa sepheo sa viral load.",
        "Bolella rakhemisi ka histori ea liphio, li-NSAID, le li-antiviral tse ling tseo u li sebelisang.",
        "Haeba u fumana lekhopho le matla le feberu, mahlo a mosehla, ho ruruha ka tšohanyetso, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le tenofovir NRTI ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukuthatha kakuhle kuxhasa unyango lwe-HIV okanye i-hepatitis B olukhokelwa ngugqirha.",
        "Iingcebiso ze-tenofovir zihlala zibandakanya iingxoxo zempilo yezintso namathambo nogqirha — xela umchamo omncinci, iintlungu zamathambo, okanye amayeza amatsha. I-Materia ayiyiqiqi idosi, i-eGFR, okanye usukelo lwe-viral load.",
        "Xelela usokhemisti ngembali yezintso, ama-NSAID, nawo onke amanye ama-antiviral.",
        "Ukuba ufumana irhashalala enzima nomkhuhlane, amehlo atyheli, ukudumba ngequbuliso, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-pyrazinamide": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antimycobacterial exactly as directed on your labelled product — TB regimens are clinician-directed courses.",
        "Pyrazinamide counselling commonly includes liver and joint-pain watch — report yellow eyes, dark urine, severe nausea, or new joint pain. Materia does not invent a dose or liver-enzyme target.",
        "Tell your pharmacist about alcohol use, other TB medicines, and known liver problems.",
        "If you get yellow eyes with severe abdominal pain, vomiting blood, or extreme confusion — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antimycobacterial njengoba kubhalwe kumkhiqizo onelebula — izinhlelo ze-TB zilawulwa udokotela.",
        "Ukwelulekwa kwe-pyrazinamide kuvame ukufaka ukugada isibindi nobuhlungu bamajoyinti — bika amehlo aphuzi, umchamo omnyama, isicanucanu esikhulu, noma ubuhlungu bamajoyinti obusha. I-Materia ayiqambi umthamo noma umgomo we-enzyme yesibindi.",
        "Tshela umkhiqizi nokusebenzisa utshwala, amanye amaphilisi e-TB, nezinkinga zesibindi ezaziwayo.",
        "Uma uthola amehlo aphuzi nobuhlungu besisu obukhulu, ukuhlanza igazi, noma ukudideka okukhulu — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antimikobakteriële middel soos op die geëtiketteerde produk aangedui — TB-regimes is klinikus-gerigte kuursoorsigte.",
        "Pyrazinamied-berading sluit dikwels lewer- en gewrigspynwaaksaamheid in — rapporteer geel oë, donker urine, ernstige naarheid of nuwe gewrigspyn. Materia versin nie ’n dosis of lewerensiemteiken nie.",
        "Sê vir jou apteker van alkoholgebruik, ander TB-medisyne, en bekende lewerprobleme.",
        "As jy geel oë met ernstige buikpyn, bloedsbraak of uiterste verwarring kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antimycobacterial ena hantle kamoo e hlalositsoeng holabel — merero ea TB e tataisoa ke ngaka.",
        "Keletso ea pyrazinamide hangata e kenyelletsa ho hlokomela sebete le bohloko ba manonyeletso — tlaleha mahlo a mosehla, moroto o lefifi, ho nyatsa ho matla, kapa bohloko ba manonyeletso bo bocha. Materia ha e iqape tekanyo kapa sepheo sa enzyme ea sebete.",
        "Bolella rakhemisi ka tšebeliso ea joala, meriana e meng ea TB, le mathata a sebete a tsejoang.",
        "Haeba u fumana mahlo a mosehla le bohloko ba mpeng bo matla, ho hlatsa mali, kapa ho ferekana ho feteletseng — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antimycobacterial ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iiregimen ze-TB zikhokelwa ngugqirha.",
        "Iingcebiso ze-pyrazinamide zihlala zibandakanya ukugada isibindi neentlungu zamalungu — xela amehlo atyheli, umchamo omnyama, isicanucanu esinzima, okanye iintlungu zamalungu ezintsha. I-Materia ayiyiqiqi idosi okanye usukelo lwe-enzyme yesibindi.",
        "Xelela usokhemisti nokusebenzisa utywala, amanye amayeza e-TB, neengxaki zesibindi ezaziwayo.",
        "Ukuba ufumana amehlo atyheli neentlungu zesisu ezinzima, ukuhlanza igazi, okanye ukudideka okugqithisileyo — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-ethambutol": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antimycobacterial exactly as directed on your labelled product — TB courses are clinician-directed.",
        "Ethambutol counselling commonly includes vision changes (blur, colour vision) — report eye symptoms early; do not invent a dose or visual-acuity target. Materia does not invent either.",
        "Tell your pharmacist about kidney history and all other TB medicines in your regimen.",
        "If you suddenly lose vision, get severe eye pain, yellow eyes, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antimycobacterial njengoba kubhalwe kumkhiqizo onelebula — izinhlelo ze-TB zilawulwa udokotela.",
        "Ukwelulekwa kwe-ethambutol kuvame ukufaka ukushintsha kokubona (ukufiphala, umbala) — bika izimpawu zamehlo ngokushesha; ungayiqiqi umthamo noma umgomo wokubona. I-Materia ayiqambi noma yikuphi.",
        "Tshela umkhiqizi ngomlando wezintso nawo wonke amanye amaphilisi e-TB erhimbeni lakho.",
        "Uma ulahlekelwa ukubona ngokuzumayo, uthola ubuhlungu bamehlo obukhulu, amehlo aphuzi, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antimikobakteriële middel soos op die geëtiketteerde produk aangedui — TB-kuursoorsigte is klinikus-gerig.",
        "Ethambutol-berading sluit dikwels visiieveranderinge in (wasigheid, kleurvisie) — rapporteer oogsimptome vroeg; moenie ’n dosis of visuele-skerpteiken versin nie. Materia versin nie een van die twee nie.",
        "Sê vir jou apteker van niergeskiedenis en alle ander TB-medisyne in jou regime.",
        "As jy skielik sig verloor, ernstige oogpyn, geel oë of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antimycobacterial ena hantle kamoo e hlalositsoeng holabel — lithuto tsa TB li tataisoa ke ngaka.",
        "Keletso ea ethambutol hangata e kenyelletsa liphetoho tsa pono (ho fifala, 'mala) — tlaleha matšoao a mahlo kapele; se ke oa iqapa tekanyo kapa sepheo sa pono. Materia ha e iqape e 'ngoe ea tsona.",
        "Bolella rakhemisi ka histori ea liphio le meriana eohle e meng ea TB ea regimen ea hau.",
        "Haeba u lahleheloa ke pono ka tšohanyetso, u fumana bohloko ba mahlo bo matla, mahlo a mosehla, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antimycobacterial ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iikhosi ze-TB zikhokelwa ngugqirha.",
        "Iingcebiso ze-ethambutol zihlala zibandakanya utshintsho lokubona (ukufiphala, umbala) — xela iimpawu zamehlo kwangoko; sukuyiqqa idosi okanye usukelo lokubona. I-Materia ayiyiqiqi nanye kuzo.",
        "Xelela usokhemisti ngembali yezintso nawo onke amanye amayeza e-TB kwi-regimen yakho.",
        "Ukuba uphulukana nombono ngequbuliso, ufumana iintlungu zamehlo ezinzima, amehlo atyheli, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-sertraline": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this SSRI antidepressant exactly as directed on your labelled product — benefit is often gradual; do not stop suddenly.",
        "Report worsening mood or suicidal thoughts early, including after clinician dose changes — Materia does not invent a dose or taper schedule.",
        "Tell your pharmacist about other serotonergic medicines (including some pain or migraine products) and alcohol use.",
        "If you have self-harm thoughts, severe agitation, fever with muscle rigidity, or trouble breathing — seek emergency care immediately.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le SSRI antidepressant njengoba kubhalwe kumkhiqizo onelebula — inzuzo ivame ukuba kancane; ungayeki ngokuzumayo.",
        "Bika ukwehla kwemizwa noma imicabango yokuzibulala ngokushesha, kuhlanganise ngemva kokushintsha umthamo kudokotela — I-Materia ayiqambi umthamo noma uhlelo lokwehlisa.",
        "Tshela umkhiqizi ngamanye amaphilisi e-serotonin (kuhlanganise eminye imikhiqizo yobuhlungu noma i-migraine) nokusebenzisa utshwala.",
        "Uma unemicabango yokuzilimaza, ukuphaphazeka okukhulu, umkhuhlane nokuginya kwemisipha, noma ukuphefumula kanzima — funa usizo oluphuthumayo ngokushesha.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie SSRI-antidepressant soos op die geëtiketteerde produk aangedui — voordeel is dikwels geleidelik; moenie skielik stop nie.",
        "Rapporteer verergerende bui of selfmoordgedagtes vroeg, insluitend ná klinikus-dosisveranderinge — Materia versin nie ’n dosis of afbouskedule nie.",
        "Sê vir jou apteker van ander serotonergiese medisyne (insluitend sommige pyn- of migraineprodukte) en alkoholgebruik.",
        "As jy selfskade-gedagtes, ernstige agitasie, koors met spierstijfheid of asemhalingsprobleme het — soek dadelik noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa SSRI antidepressant ena hantle kamoo e hlalositsoeng holabel — molemo hangata o tla butle; se ke oa emisa ka potlako.",
        "Tlaleha maikutlo a mabe kapa menahano ea ho ipolaea kapele, ho kenyeletsoa ka mor'a liphetoho tsa tekanyo tsa ngaka — Materia ha e iqape tekanyo kapa moralo oa ho fokotsa.",
        "Bolella rakhemisi ka meriana e meng ea serotonin (ho kenyeletsoa lihlahiswa tse ling tsa bohloko kapa migraine) le tšebeliso ea joala.",
        "Haeba u na le menahano ea ho intša kotsi, ho ferekana ho matla, feberu le ho thatafala ha mesifa, kapa ho hema thata — batla thuso ea tšohanyetso hang-hang.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le SSRI antidepressant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — inzuzo ihlala ibonakala kancinci; sukuyeki ngokungxamisekileyo.",
        "Xela ukwehla kwemvakalelo okanye iingcinga zokuzibulala kwangoko, kuquka emva kotshintsho lwedosi lugqirha — I-Materia ayiyiqiqi idosi okanye ishedyuli yokunciphisa.",
        "Xelela usokhemisti ngamanye amayeza e-serotonin (kuquka ezinye iimveliso zeentlungu okanye i-migraine) nokusebenzisa utywala.",
        "Ukuba uneengcinga zokuzilimaza, ukuphaphazeka okunzima, umkhuhlane nokuginya kwemisipha, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo ngokukhawuleza.",
      ],
    },
  },
  "mol-insulin-glargine": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Use this long-acting basal insulin exactly as directed on your labelled product — injection technique and site rotation follow product teaching.",
        "Insulin counselling commonly includes hypoglycaemia recognition and never sharing pens/needles. Materia does not invent a dose, units, or glucose target.",
        "Tell your pharmacist about meal pattern changes, illness, other diabetes medicines, and how you store the pen or vial.",
        "If you cannot swallow, seize, lose consciousness, or remain confused after hypo treatment — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le insulin yesikhathi eside njengoba kubhalwe kumkhiqizo onelebula — indlela yokujova nokushintsha indawo kulandela ukufundiswa komkhiqizo.",
        "Ukwelulekwa kwe-insulin kuvame ukufaka ukwazi i-hypoglycaemia nokungabelani amapeni/izinaliti. I-Materia ayiqambi umthamo, amayunithi, noma umgomo kashukela.",
        "Tshela umkhiqizi ngokushintsha kwendlela yokudla, ukugula, amanye amaphilisi esifo sikashukela, nokugcina ipeni noma ibhodlela.",
        "Uma ungakwazi ukugwinya, uthola ukuxhuzula, ulahlekelwa ukwazi, noma uhlala udidekile ngemva kokwelapha i-hypo — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Gebruik hierdie langwerkende basale insulien soos op die geëtiketteerde produk aangedui — inspuitingstegniek en plekrotasie volg produkonderrig.",
        "Insulienberading sluit dikwels hipoglisemie-herkenning in en nooit penne/naalde deel nie. Materia versin nie ’n dosis, eenhede of glukoseteiken nie.",
        "Sê vir jou apteker van maaltydpatroonveranderinge, siekte, ander diabetesmedisyne, en hoe jy die pen of flessie berg.",
        "As jy nie kan sluk nie, stuiptrekkings kry, bewusteloos raak, of verward bly ná hipo-behandeling — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa insulin ena ea nako e telele hantle kamoo e hlalositsoeng holabel — mokhoa oa ho enta le ho potoloha ha sebaka o latela thuto ea sehlahiswa.",
        "Keletso ea insulin hangata e kenyelletsa ho tseba hypoglycaemia le ho se arolelane lipene/dinalete. Materia ha e iqape tekanyo, liyunithi, kapa sepheo sa tsoekere.",
        "Bolella rakhemisi ka liphetoho tsa mokhoa oa ho ja, ho kula, meriana e meng ea diabetes, le hore u boloka pene kapa bottle joang.",
        "Haeba u sitoa ho koenya, u ts'oaroa ke ho thothomela, u lahleheloa ke kelello, kapa u lula u ferekane ka mor'a kalafo ea hypo — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le insulin yexesha elide ngokuchanekileyo njengoko kubhaliwe kwileyibhile — indlela yokutofa nokutshintsha indawo ilandela ukufundiswa kwemveliso.",
        "Iingcebiso ze-insulin zihlala zibandakanya ukwazi i-hypoglycaemia nokungabelani iipeni/iinaliti. I-Materia ayiyiqiqi idosi, iiyunithi, okanye usukelo lweswekile.",
        "Xelela usokhemisti ngotshintsho lwendlela yokutya, ukugula, amanye amayeza esifo seswekile, nendlela ogcina ngayo ipeni okanye ibhotile.",
        "Ukuba awukwazi ukuginya, ufumana ukuxhuzula, uphulukana nokuqonda, okanye uhlala udidekile emva konyango lwe-hypo — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-rivaroxaban": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this DOAC anticoagulant exactly as directed on your labelled product — some strengths are taken with food; confirm against the label.",
        "Rivaroxaban counselling commonly includes bleeding watch and not stopping without your clinician before procedures. Materia does not invent a dose, INR, or clotting target.",
        "Tell your pharmacist about other blood thinners, NSAIDs, planned surgery, and kidney or liver history.",
        "If you have uncontrolled bleeding, stroke symptoms, severe headache, or black stools with dizziness — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le DOAC anticoagulant njengoba kubhalwe kumkhiqizo onelebula — amanye amandla athathwa nokudla; qinisekisa kulebula.",
        "Ukwelulekwa kwe-rivaroxaban kuvame ukufaka ukugada ukopha nokungayeki ngaphandle kwedokotela ngaphambi kwezinqubo. I-Materia ayiqambi umthamo, i-INR, noma umgomo wokuvuvuka.",
        "Tshela umkhiqizi ngamanye ama-blood thinner, ama-NSAID, ukuhlinzwa okuhleliwe, nomlando wezintso noma isibindi.",
        "Uma unokopha okungalawuleki, izimpawu ze-stroke, ikhanda elibuhlungu kakhulu, noma indle emnyama nesiyezi — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie DOAC-antikoagulant soos op die geëtiketteerde produk aangedui — sommige sterktes word met kos geneem; bevestig teen die etiket.",
        "Rivaroxaban-berading sluit dikwels bloedingwaaksaamheid in en nie stop sonder jou klinikus voor prosedures nie. Materia versin nie ’n dosis, INR of stollingsteiken nie.",
        "Sê vir jou apteker van ander bloedverdunners, NSAIDs, beplande chirurgie, en nier- of lewergeskiedenis.",
        "As jy onbeheerde bloeding, beroerte-simptome, ernstige hoofpyn of swart stoelgang met duiseligheid het — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa DOAC anticoagulant ena hantle kamoo e hlalositsoeng holabel — matla a mang a nkoa le lijo; netefatsa holabel.",
        "Keletso ea rivaroxaban hangata e kenyelletsa ho hlokomela ho tsoa mali le ho se emise ntle le ngaka pele ho mekhoa. Materia ha e iqape tekanyo, INR, kapa sepheo sa ho oma ha mali.",
        "Bolella rakhemisi ka li-blood thinner tse ling, li-NSAID, opereishene e reriloeng, le histori ea liphio kapa sebete.",
        "Haeba u na le ho tsoa mali ho sa laoleheng, matšoao a stroke, hlooho e bohloko haholo, kapa mantle a sootho le ho tsekela — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le DOAC anticoagulant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — amanye amandla athathwa nokutya; qinisekisa kwileyibhile.",
        "Iingcebiso ze-rivaroxaban zihlala zibandakanya ukugada ukopha nokungayeki ngaphandle kogqirha phambi kweenkqubo. I-Materia ayiyiqiqi idosi, i-INR, okanye usukelo lokubola kwegazi.",
        "Xelela usokhemisti ngamanye ama-blood thinner, ama-NSAID, utyando olucetyiweyo, nembali yezintso okanye isibindi.",
        "Ukuba unokopha okungalawulekiyo, iimpawu ze-stroke, intloko ebuhlungu kakhulu, okanye indle emnyama nesiyezi — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-carbamazepine": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antiepileptic exactly as directed on your labelled product — do not stop suddenly without your clinician.",
        "Carbamazepine counselling commonly includes rash watch, dizziness, and interaction checks with many medicines and hormonal contraceptives. Materia does not invent a dose or blood-level target.",
        "Tell your pharmacist about pregnancy plans, all other medicines, and alcohol use.",
        "If you get blistering rash with fever, yellow eyes, severe dizziness with falls, or prolonged seizures — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antiepileptic njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
        "Ukwelulekwa kwe-carbamazepine kuvame ukufaka ukugada ukuqubuka, isiyezi, nokuhlola ukuxhumana namaphilisi amaningi nama-contraceptive e-hormone. I-Materia ayiqambi umthamo noma umgomo weleveli egazini.",
        "Tshela umkhiqizi ngezinhlelo zokukhulelwa, wonke amanye amaphilisi, nokusebenzisa utshwala.",
        "Uma uthola ukuqubuka kwamaqhubu nomkhuhlane, amehlo aphuzi, isiyezi esikhulu nokuwela, noma ukuxhuzula okude — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antiepileptikum soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
        "Karbamazepien-berading sluit dikwels uitslagwaaksaamheid, duiseligheid en interaksiekontroles met baie medisyne en hormonale voorbehoedmiddels in. Materia versin nie ’n dosis of bloedvlakteiken nie.",
        "Sê vir jou apteker van swangerskapplanne, alle ander medisyne, en alkoholgebruik.",
        "As jy blaasuitslag met koors, geel oë, ernstige duiseligheid met valle, of langdurige stuiptrekkings kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antiepileptic ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
        "Keletso ea carbamazepine hangata e kenyelletsa ho hlokomela lekhopho, ho tsekela, le tlhahlobo ea ho sebelisana le meriana e mengata le li-contraceptive tsa hormone. Materia ha e iqape tekanyo kapa sepheo sa level ea mali.",
        "Bolella rakhemisi ka merero ea ho ima, meriana eohle e meng, le tšebeliso ea joala.",
        "Haeba u fumana lekhopho la lihlabana le feberu, mahlo a mosehla, ho tsekela ho matla le ho oa, kapa ho thothomela ho telele — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antiepileptic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
        "Iingcebiso ze-carbamazepine zihlala zibandakanya ukugada irhashalala, isiyezi, nokujonga ukusebenzelana namayeza amaninzi nama-contraceptive e-hormone. I-Materia ayiyiqiqi idosi okanye usukelo lweleveli yegazi.",
        "Xelela usokhemisti ngezicwangciso zokukhulelwa, onke amanye amayeza, nokusebenzisa utywala.",
        "Ukuba ufumana irhashalala yamaqhuma nomkhuhlane, amehlo atyheli, isiyezi esinzima nokuwawa, okanye ukuxhuzula okude — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-valproate": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antiepileptic / mood-stabiliser exactly as directed on your labelled product — do not stop suddenly without your clinician.",
        "Valproate counselling commonly includes pregnancy prevention discussions and liver/pancreas watch — report abdominal pain, vomiting, or yellow eyes early. Materia does not invent a dose or blood-level target.",
        "Tell your pharmacist about pregnancy plans, contraception, and all other medicines.",
        "If you get severe abdominal pain with vomiting, yellow eyes, unexplained bruising, or prolonged seizures — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antiepileptic / mood-stabiliser njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
        "Ukwelulekwa kwe-valproate kuvame ukufaka izingxoxo zokuvimbela ukukhulelwa nokugada isibindi/iphancreas — bika ubuhlungu besisu, ukuhlanza, noma amehlo aphuzi ngokushesha. I-Materia ayiqambi umthamo noma umgomo weleveli egazini.",
        "Tshela umkhiqizi ngezinhlelo zokukhulelwa, ukuvimbela inzalo, nawo wonke amanye amaphilisi.",
        "Uma uthola ubuhlungu besisu obukhulu nokuhlanza, amehlo aphuzi, amabala aluhlaza angachaziwe, noma ukuxhuzula okude — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antiepileptikum / bui-stabiliseerder soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
        "Valproaat-berading sluit dikwels swangerskapvoorkoming-besprekings en lewer/pankreas-waaksaamheid in — rapporteer buikpyn, braking of geel oë vroeg. Materia versin nie ’n dosis of bloedvlakteiken nie.",
        "Sê vir jou apteker van swangerskapplanne, voorbehoeding, en alle ander medisyne.",
        "As jy ernstige buikpyn met braking, geel oë, onverklaarde kneusings of langdurige stuiptrekkings kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antiepileptic / mood-stabiliser ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
        "Keletso ea valproate hangata e kenyelletsa lipuisano tsa thibelo ea ho ima le ho hlokomela sebete/pancreas — tlaleha bohloko ba mpeng, ho hlatsa, kapa mahlo a mosehla kapele. Materia ha e iqape tekanyo kapa sepheo sa level ea mali.",
        "Bolella rakhemisi ka merero ea ho ima, thibelo ea pehi, le meriana eohle e meng.",
        "Haeba u fumana bohloko ba mpeng bo matla le ho hlatsa, mahlo a mosehla, matheba a sootho a sa hlaloseng, kapa ho thothomela ho telele — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antiepileptic / mood-stabiliser ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
        "Iingcebiso ze-valproate zihlala zibandakanya iingxoxo zokuthintela ukukhulelwa nokugada isibindi/ipancreas — xela iintlungu zesisu, ukuhlanza, okanye amehlo atyheli kwangoko. I-Materia ayiyiqiqi idosi okanye usukelo lweleveli yegazi.",
        "Xelela usokhemisti ngezicwangciso zokukhulelwa, ukuthintela inzala, nawo onke amanye amayeza.",
        "Ukuba ufumana iintlungu zesisu ezinzima nokuhlanza, amehlo atyheli, amabala aluhlaza angachazwanga, okanye ukuxhuzula okude — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-montelukast": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this leukotriene-receptor antagonist exactly as directed on your labelled product — it is a controller, not a sudden-relief reliever.",
        "Montelukast counselling commonly includes mood and behaviour change watch — report agitation, sleep disturbance, or suicidal thoughts early. Materia does not invent a dose or asthma-control score.",
        "Tell your pharmacist about other asthma or allergy medicines you use and keep your reliever inhaler plan as your clinician directed.",
        "If you get severe breathing difficulty, facial swelling, or thoughts of self-harm — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le leukotriene-receptor antagonist njengoba kubhalwe kumkhiqizo onelebula — iyilawuli, hhayi i-reliever yesikhathi esizumayo.",
        "Ukwelulekwa kwe-montelukast kuvame ukufaka ukugada ukushintsha kwemizwa nokuziphatha — bika ukuphaphazeka, ukuphazamiseka kokulala, noma imicabango yokuzibulala ngokushesha. I-Materia ayiqambi umthamo noma isikolo sokulawula i-asthma.",
        "Tshela umkhiqizi ngamanye amaphilisi e-asthma noma allergy owasebenzisayo futhi gcina uhlelo lwe-reliever inhaler njengoba udokotela ekuqondile.",
        "Uma uthola ukuphefumula kanzima kakhulu, ukuvuvuka kobuso, noma imicabango yokuzilimaza — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie leukotrienreseptor-antagonis soos op die geëtiketteerde produk aangedui — dit is ’n beheerder, nie ’n skielike-verligtingsmiddel nie.",
        "Montelukast-berading sluit dikwels bui- en gedragsveranderingwaaksaamheid in — rapporteer agitasie, slaapversteuring of selfmoordgedagtes vroeg. Materia versin nie ’n dosis of asma-beheertelling nie.",
        "Sê vir jou apteker van ander asma- of allergiemedisyne wat jy gebruik en hou jou verligter-inhalerplan soos jou klinikus gerig het.",
        "As jy ernstige asemhalingsmoeilikheid, gesigswelling of selfskade-gedagtes kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa leukotriene-receptor antagonist ena hantle kamoo e hlalositsoeng holabel — ke controller, eseng reliever ea tšohanyetso.",
        "Keletso ea montelukast hangata e kenyelletsa ho hlokomela liphetoho tsa maikutlo le boitšoaro — tlaleha ho ferekana, tšitiso ea boroko, kapa menahano ea ho ipolaea kapele. Materia ha e iqape tekanyo kapa lintlha tsa taolo ea asthma.",
        "Bolella rakhemisi ka meriana e meng ea asthma kapa allergy eo u e sebelisang 'me boloka moralo oa reliever inhaler kamoo ngaka e u laetseng.",
        "Haeba u fumana bothata bo matla ba ho hema, ho ruruha ha sefahleho, kapa menahano ea ho intša kotsi — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le leukotriene-receptor antagonist ngokuchanekileyo njengoko kubhaliwe kwileyibhile — yilawuli, hayi i-reliever yexesha elingxamisekileyo.",
        "Iingcebiso ze-montelukast zihlala zibandakanya ukugada utshintsho lwemvakalelo nokuziphatha — xela ukuphaphazeka, ukuphazamiseka kokulala, okanye iingcinga zokuzibulala kwangoko. I-Materia ayiyiqiqi idosi okanye inqanaba lolawulo lwe-asthma.",
        "Xelela usokhemisti ngamanye amayeza e-asthma okanye allergy owasebenzisayo kwaye gcina isicwangciso se-reliever inhaler njengoko ugqirha ekulathile.",
        "Ukuba ufumana uxinzelelo lokuphefumla olunzima, ukudumba kobuso, okanye iingcinga zokuzilimaza — funa uncedo olungxamisekileyo.",
      ],
    },
  },
};
