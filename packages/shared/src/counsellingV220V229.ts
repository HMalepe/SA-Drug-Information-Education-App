/**
 * v220–v229 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V220_TO_V229: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-tadalafil": five(
    [
      "Take this PDE5 inhibitor exactly as directed on your labelled product — daily and as-needed products differ; confirm the label.",
      "Tadalafil counselling’s non-negotiable hook is never combining with nitrates or recreational nitrite “poppers”. Materia does not invent a dose, timing hours, or blood-pressure target.",
      "Tell your pharmacist about chest-pain history, recent heart events, blood-pressure medicines, and ALL other erectile-dysfunction or BPH products.",
      "Report sudden vision or hearing change early — stop and seek urgent clinician review as advised on the labelled product.",
      "Ask how alcohol and heavy meals affect your labelled product — do not invent a meal clock.",
      "If you get chest pain, fainting, a painful erection lasting far too long, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le PDE5 inhibitor njengoba kubhalwe kumkhiqizo onelebula — imikhiqizo yansuku zonke neyedingeka iyahluka; qinisekisa ilebula.",
      "Ukwelulekwa kwe-tadalafil okungaxoxwa ngakho kungahlanganisi nama-nitrate noma ama-nitrite “poppers”. I-Materia ayiqambi umthamo, amahora esikhathi, noma umgomo womfutho wegazi.",
      "Tshela umkhiqizi ngomlando wobuhlungu besifuba, izehlakalo zenhliziyo zakamuva, amaphilisi omfutho wegazi, NAWO WONKE amanye amakhiqizo okungaqini noma e-BPH.",
      "Bika ukushintsha kokubona noma ukuzwa okuzumayo ngokushesha — yeka futhi funa ukubuyekezwa okuphuthumayo njengoba ilebula isho.",
      "Buza ukuthi utshwala nokudla okusindayo kuthinta kanjani umkhiqizo onelebula — ungayiqiqi iwashi lokudla.",
      "Uma uthola ubuhlungu besifuba, ukuwa, ukuqina okubuhlungu okuthatha isikhathi eside kakhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie PDE5-inhibeerder soos op die geëtiketteerde produk aangedui — daaglikse en soos-nodig produkte verskil; bevestig die etiket.",
      "Tadalafil-berading se nie-onderhandelbare haak is om nooit met nitrate of ontspanningsnitriet-“poppers” te kombineer nie. Materia versin nie ’n dosis, tydsure of bloeddrukteiken nie.",
      "Sê vir jou apteker van borspyn-geskiedenis, onlangse hartvoorvalle, bloeddrukmedisyne, en ALLE ander erektiele-disfunksie- of BPH-produkte.",
      "Rapporteer skielike sig- of gehoorverandering vroeg — stop en soek dringende klinikus-hersiening soos die geëtiketteerde produk adviseer.",
      "Vra hoe alkohol en swaar maaltye jou geëtiketteerde produk beïnvloed — moenie ’n maaltydklok versin nie.",
      "As jy borspyn, floute, ’n pynlike ereksie wat veels te lank duur, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa PDE5 inhibitor ena hantle kamoo e hlalositsoeng holabel — lihlahiswa tsa letsatsi le letsatsi le tse hlokahalang lia fapana; netefatsa leibole.",
      "Keletso ea tadalafil e sa buisanoeng ke ho se e kopanye le li-nitrate kapa li-nitrite tsa boithabiso “poppers”. Materia ha e iqape tekanyo, lihora tsa nako, kapa sepheo sa khatello ea mali.",
      "Bolella rakhemisi ka histori ea bohloko ba sefuba, liketsahalo tsa pelo tsa morao-rao, meriana ea khatello ea mali, le LIHLAHISWA TSOHLE tsa erectile dysfunction kapa BPH.",
      "Tlaleha phetoho ea pono kapa kutlo ka tšohanyetso kapele — emisa 'me u batle tlhahlobo ea ngaka ea potlako kamoo leibole e eletsang.",
      "Botsa hore joala le lijo tse boima li ama joang sehlahiswa sa hau se nang le leibole — se ke oa iqapa nako ea lijo.",
      "Haeba u fumana bohloko ba sefuba, ho akheha, ho otlolla ha botona bo bohloko bo nkang nako e telele haholo, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le PDE5 inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iimveliso zemihla nezingxamisekileyo ziyahluka; qinisekisa ileyibhile.",
      "Iingcebiso ze-tadalafil ezingaxoxwa ngazo kukungaze udibanise nee-nitrate okanye ii-nitrite zokuzonwabisa “poppers”. I-Materia ayiyiqiqi idosi, iiyure zexesha, okanye usukelo loxinzelelo lwegazi.",
      "Xelela usokhemisti ngembali yeentlungu zesifuba, iziganeko zentliziyo zakutshanje, amayeza oxinzelelo lwegazi, NAZO ZONKE ezinye iimveliso zokungaqini okanye ze-BPH.",
      "Xela utshintsho lokubona okanye ukuva ngequbuliso kwangoko — yeka uze ufumane ukujongwa kugqirha ngokukhawuleza njengoko ileyibhile icebisa.",
      "Buza indlela utywala nezidlo ezinzima ezichaphazela ngayo imveliso yakho eneleyibhile — sukuyiqqa iwotshi yokutya.",
      "Ukuba ufumana iintlungu zesifuba, ukuwa, ukuqina kobudoda obubuhlungu obuthatha ixesha elide kakhulu, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-solifenacin": five(
    [
      "Take this antimuscarinic exactly as directed on your labelled product — it treats overactive bladder urgency; confirm the label.",
      "Solifenacin counselling commonly includes dry mouth, constipation, blurred vision, and heat intolerance. Materia does not invent a dose or bladder score.",
      "Tell your pharmacist about glaucoma, bowel obstruction concerns, myasthenia, and ALL other anticholinergic medicines.",
      "Avoid driving if vision blurs or you feel drowsy until you know your response.",
      "Report inability to pass urine, severe constipation, or confusion early — especially in older adults.",
      "If you get eye pain with vision loss, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antimuscarinic njengoba kubhalwe kumkhiqizo onelebula — ilapha ukuphuthuma kwesinye; qinisekisa ilebula.",
      "Ukwelulekwa kwe-solifenacin kuvame ukufaka umlomo owomile, ukuqina kwamathumbu, ukubona okufiphele, nokungabekezeleli ukushisa. I-Materia ayiqambi umthamo noma isikali sesinye.",
      "Tshela umkhiqizi nge-glaucoma, ukuvinjwa kwamathumbu, i-myasthenia, NAWO WONKE amanye ama-anticholinergic.",
      "Gwema ukushayela uma ukubona kufiphele noma uozela kuze wazi impendulo yakho.",
      "Bika ukungakwazi ukuchama, ukuqina kwamathumbu okukhulu, noma ukudideka ngokushesha — ikakhulukazi kubantu abadala.",
      "Uma uthola ubuhlungu beso nokulahlekelwa ukubona, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antimuskariniese middel soos op die geëtiketteerde produk aangedui — dit behandel ooraktiewe-blaasdringendheid; bevestig die etiket.",
      "Solifenasien-berading sluit dikwels droë mond, hardlywigheid, dowwe sig, en hitte-onverdraagsaamheid in. Materia versin nie ’n dosis of blaas telling nie.",
      "Sê vir jou apteker van gloukoom, dermobstruksie-kommer, miastenie, en ALLE ander anticholinergiese medisyne.",
      "Vermy bestuur as sig dowwe word of jy slaperig voel totdat jy jou reaksie ken.",
      "Rapporteer onvermoë om urine te passeer, ernstige hardlywigheid, of verwarring vroeg — veral by ouer volwassenes.",
      "As jy oorpyn met sigverlies, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antimuscarinic ena hantle kamoo e hlalositsoeng holabel — e alafa potlako ea senya se sebetsang haholo; netefatsa leibole.",
      "Keletso ea solifenacin hangata e kenyelletsa molomo o omeletseng, ho thatafala ha mala, pono e lerootho, le ho se mamelle mocheso. Materia ha e iqape tekanyo kapa lintlha tsa senya.",
      "Bolella rakhemisi ka glaucoma, ho thibeloa ha mala, myasthenia, le MERIANA EOHLE ea anticholinergic.",
      "Qoba ho khanna haeba pono e lerootho kapa u otsela ho fihlela u tseba karabelo ea hau.",
      "Tlaleha ho sitoa ho ntša moroto, ho thatafala ha mala ho matla, kapa ho ferekana kapele — haholo-holo ho batho ba baholo.",
      "Haeba u fumana bohloko ba leihlo ka tahlehelo ea pono, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antimuscarinic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — inyanga ukungxama kwesinyi; qinisekisa ileyibhile.",
      "Iingcebiso ze-solifenacin zihlala zibandakanya umlomo owomileyo, ukuqina kwamathumbu, ukubona okufipheleyo, nokunganyamezeli ubushushu. I-Materia ayiyiqiqi idosi okanye amanqaku esinyi.",
      "Xelela usokhemisti nge-glaucoma, ukuthintelwa kwamathumbu, i-myasthenia, NAZO ZONKE ezinye ii-anticholinergic.",
      "Pepa ukuqhuba ukuba ukubona kuyafiphala okanye uyalala de uyazi impendulo yakho.",
      "Xela ukungakwazi ukuchama, ukuqina kwamathumbu okunzima, okanye ukudideka kwangoko — ngakumbi kubantu abadala.",
      "Ukuba ufumana iintlungu zeliso kunye nokulahlekelwa kukubona, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-alfuzosin": five(
    [
      "Take this alpha-blocker exactly as directed on your labelled product — often after the same meal each day; confirm the label.",
      "Alfuzosin counselling commonly includes dizziness on standing and not crushing prolonged-release tablets unless the labelled product allows. Materia does not invent a dose or blood-pressure target.",
      "Tell your pharmacist about other blood-pressure medicines, cataract surgery plans, and ALL other alpha-blockers on your list.",
      "Rise slowly from sitting or lying — report fainting or severe light-headedness early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you collapse, get chest pain with trouble breathing, or a painful erection lasting far too long — seek emergency care.",
    ],
    [
      "Sebenzisa le alpha-blocker njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba ngemva kokudla okufanayo nsuku zonke; qinisekisa ilebula.",
      "Ukwelulekwa kwe-alfuzosin kuvame ukufaka isiyezi uma umile nokungachobozi amaphilisi e-prolonged-release ngaphandle kokuvuma kwelebula. I-Materia ayiqambi umthamo noma umgomo womfutho wegazi.",
      "Tshela umkhiqizi ngamanye amaphilisi omfutho wegazi, izinhlelo zokuhlinzwa kwe-cataract, NAWO WONKE amanye ama-alpha-blocker.",
      "Sukuma kancane uma uhleli noma ulele — bika ukuwa noma isiyezi esikhulu ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uwa, uthola ubuhlungu besifuba nokuphefumula kanzima, noma ukuqina okubuhlungu okuthatha isikhathi eside kakhulu — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie alfa-blokkeerder soos op die geëtiketteerde produk aangedui — dikwels ná dieselfde maaltyd elke dag; bevestig die etiket.",
      "Alfuzosien-berading sluit dikwels duiseligheid by staan in en om verlengde-vrystellingtablette nie te vergruis tensy die geëtiketteerde produk dit toelaat nie. Materia versin nie ’n dosis of bloeddrukteiken nie.",
      "Sê vir jou apteker van ander bloeddrukmedisyne, katarakchirurgie-planne, en ALLE ander alfa-blokkeerders op jou lys.",
      "Staan stadig op vanaf sit of lê — rapporteer floute of ernstige lighoofdigheid vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ineenstort, borspyn met asemhalingsprobleme kry, of ’n pynlike ereksie wat veels te lank duur — soek noodhulp.",
    ],
    [
      "Sebelisa alpha-blocker ena hantle kamoo e hlalositsoeng holabel — hangata ka mor'a lijo tse tšoanang letsatsi le letsatsi; netefatsa leibole.",
      "Keletso ea alfuzosin hangata e kenyelletsa ho tsekela ha u ema le ho se silafatse litafole tsa prolonged-release ntle le tumello ea leibole. Materia ha e iqape tekanyo kapa sepheo sa khatello ea mali.",
      "Bolella rakhemisi ka meriana e meng ea khatello ea mali, merero ea opereishene ea cataract, le LI-ALPHA-BLOCKER TSOHLE.",
      "Ema butle ho tloha ho lula kapa ho robala — tlaleha ho akheha kapa ho tsekela ho matla kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u oa, u fumana bohloko ba sefuba ka ho hema thata, kapa ho otlolla ha botona bo bohloko bo nkang nako e telele haholo — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le alpha-blocker ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala ithathwa emva kwesidlo esifanayo yonke imihla; qinisekisa ileyibhile.",
      "Iingcebiso ze-alfuzosin zihlala zibandakanya isiyezi xa umile nokungatyumzi iipilisi ze-prolonged-release ngaphandle kokuvuma kweleyibhile. I-Materia ayiyiqiqi idosi okanye usukelo loxinzelelo lwegazi.",
      "Xelela usokhemisti ngamanye amayeza oxinzelelo lwegazi, izicwangciso zotyando lwe-cataract, NAZO ZONKE ezinye ii-alpha-blocker.",
      "Suka kancinci xa uhleli okanye ulele — xela ukuwa okanye isiyezi esinzima kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba uwa, ufumana iintlungu zesifuba noxinzelelo lokuphefumla, okanye ukuqina kobudoda obubuhlungu obuthatha ixesha elide kakhulu — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-benzoyl-peroxide": five(
    [
      "Use this topical acne antibacterial exactly as directed on your labelled product — start gently if the label advises; confirm the strength you were given.",
      "Benzoyl peroxide counselling commonly includes bleaching fabrics and temporary dryness or peeling. Materia does not invent a dose, application clock, or course length.",
      "Tell your pharmacist about other topical retinoids or acids on your list and pregnancy plans.",
      "Keep away from eyes, lips, and mucous membranes — report severe burning or blistering early.",
      "Ask how often to apply on your labelled product — do not invent a personal escalation schedule.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical acne antibacterial njengoba kubhalwe kumkhiqizo onelebula — qala kancane uma ilebula icebisa; qinisekisa amandla onikiwe.",
      "Ukwelulekwa kwe-benzoyl peroxide kuvame ukufaka ukuphucula izindwangu nokoma noma ukuhlehla okwesikhashana. I-Materia ayiqambi umthamo, iwashi lokufaka, noma ubude benkambo.",
      "Tshela umkhiqizi ngamanye ama-retinoid noma ama-acid e-topical nezinhlelo zokukhulelwa.",
      "Gcina kude namehlo, izindebe, nezindawo ezimanzi — bika ukusha okukhulu noma amaqhubu ngokushesha.",
      "Buza ukuthi kufanele ufake kangaki kumkhiqizo onelebula — ungayiqiqi uhlelo lakho lokunyuka.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese aknee-antibakteriese middel soos op die geëtiketteerde produk aangedui — begin sag as die etiket adviseer; bevestig die sterkte wat jy ontvang het.",
      "Bensoïelperoksied-berading sluit dikwels bleik van stowwe en tydelike droogheid of skilfering in. Materia versin nie ’n dosis, aanwendingsklok of kuurduur nie.",
      "Sê vir jou apteker van ander topiese retinoïede of sure op jou lys en swangerskapsplanne.",
      "Hou weg van oë, lippe en slymvliese — rapporteer ernstige brand of blistering vroeg.",
      "Vra hoe gereeld om op jou geëtiketteerde produk aan te wend — moenie ’n persoonlike eskaleerskedeule versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical acne antibacterial ena hantle kamoo e hlalositsoeng holabel — qala butle haeba leibole e eletsa; netefatsa matla ao o fileng.",
      "Keletso ea benzoyl peroxide hangata e kenyelletsa ho soeufatsa masela le ho oma kapa ho hloboha ha nakoana. Materia ha e iqape tekanyo, nako ea ho sebelisa, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka li-retinoid kapa li-acid tse ling tsa topical le merero ea ho ima.",
      "Boloka hole le mahlo, melomo, le limucous membranes — tlaleha ho chesa ho matla kapa lihlabana kapele.",
      "Botsa hore u sebelise hangata hakae holabel — se ke oa iqapa kemiso ea hau ea ho nyolohela.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical acne antibacterial ngokuchanekileyo njengoko kubhaliwe kwileyibhile — qala ngobunono ukuba ileyibhile icebisa; qinisekisa amandla onikiweyo.",
      "Iingcebiso ze-benzoyl peroxide zihlala zibandakanya ukuphucula amalaphu nokoma okanye ukuhlubuka okwethutyana. I-Materia ayiyiqiqi idosi, iwotshi yokufaka, okanye ubude bekhosi.",
      "Xelela usokhemisti ngezinye ii-retinoid okanye ii-acid ze-topical nezicwangciso zokukhulelwa.",
      "Gcina kude namehlo, imilebe, neendawo ezimanzi — xela ukutsha okunzima okanye amaqhuma kwangoko.",
      "Buza indlela yokufaka rhoqo kwileyibhile — sukuyiqqa ishedyuli yakho yokunyuka.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-adapalene": five(
    [
      "Use this topical retinoid exactly as directed on your labelled product — night use and moisturizer pairing are common counselling; confirm the label.",
      "Adapalene counselling commonly includes dryness, peeling, and sun sensitivity — use sun protection as your clinician advises. Materia does not invent a dose, application clock, or course length.",
      "Tell your pharmacist about pregnancy plans and ALL other topical acids or retinoids on your list.",
      "Avoid waxing treated skin and keep away from eyes and lips — report severe blistering early.",
      "Ask how to introduce the product gradually if the labelled product advises — do not invent an escalation schedule.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical retinoid njengoba kubhalwe kumkhiqizo onelebula — ukusebenzisa ebusuku nokuhambisa i-moisturizer kuvame ukufundiswa; qinisekisa ilebula.",
      "Ukwelulekwa kwe-adapalene kuvame ukufaka ukoma, ukuhlehla, nokuzwela ilanga — sebenzisa ukuvikela ilanga njengoba udokotela ecebisa. I-Materia ayiqambi umthamo, iwashi lokufaka, noma ubude benkambo.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa NAWO WONKE amanye ama-acid noma ama-retinoid e-topical.",
      "Gwema ukukhipha uboya nge-wax esikhumbeni eselashiwe ugcine kude namehlo nezindebe — bika amaqhubu amakhulu ngokushesha.",
      "Buza ukuthi ungawethula kanjani umkhiqizo kancane uma ilebula icebisa — ungayiqiqi uhlelo lokunyuka.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese retinoïed soos op die geëtiketteerde produk aangedui — naggebruik en vogroom-paring is algemene berading; bevestig die etiket.",
      "Adapaleen-berading sluit dikwels droogheid, skilfering en sonsensitiwiteit in — gebruik sonbeskerming soos jou klinikus adviseer. Materia versin nie ’n dosis, aanwendingsklok of kuurduur nie.",
      "Sê vir jou apteker van swangerskapsplanne en ALLE ander topiese sure of retinoïede op jou lys.",
      "Vermy wasering van behandelde vel en hou weg van oë en lippe — rapporteer ernstige blistering vroeg.",
      "Vra hoe om die produk geleidelik in te bring as die geëtiketteerde produk dit adviseer — moenie ’n eskaleerskedeule versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical retinoid ena hantle kamoo e hlalositsoeng holabel — tšebeliso ea bosiu le ho kopanya le moisturizer ke keletso e tloaelehileng; netefatsa leibole.",
      "Keletso ea adapalene hangata e kenyelletsa ho oma, ho hloboha, le ho utloa bohloko ha letsatsi — sebelisa tšireletso ea letsatsi kamoo ngaka e eletsang. Materia ha e iqape tekanyo, nako ea ho sebelisa, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka merero ea ho ima le LI-ACID KAPA LI-RETINOID TSOHLE tsa topical.",
      "Qoba ho kuta boea ka wax letlalong le alafuoang 'me u boloke hole le mahlo le melomo — tlaleha lihlabana tse matla kapele.",
      "Botsa hore u ka kenyelletsa sehlahiswa butle joang haeba leibole e eletsa — se ke oa iqapa kemiso ea ho nyolohela.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical retinoid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukusetyenziswa ebusuku nokudibanisa ne-moisturizer kuhlala kufundiswa; qinisekisa ileyibhile.",
      "Iingcebiso ze-adapalene zihlala zibandakanya ukoma, ukuhlubuka, nokuziva ilanga — sebenzisa ukukhusela ilanga njengoko ugqirha ecebisa. I-Materia ayiyiqiqi idosi, iwotshi yokufaka, okanye ubude bekhosi.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa NAZO ZONKE ezinye ii-acid okanye ii-retinoid ze-topical.",
      "Pepa ukukhupha uboya nge-wax eluswini olunyangiweyo ugcine kude namehlo nemilebe — xela amaqhuma anzima kwangoko.",
      "Buza indlela yokungenisa imveliso kancinci ukuba ileyibhile icebisa — sukuyiqqa ishedyuli yokunyuka.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tretinoin": five(
    [
      "Use this topical retinoid exactly as directed on your labelled product — night use and sun protection are common counselling; confirm the label.",
      "Tretinoin counselling commonly includes dryness, peeling, and pregnancy-avoidance teaching for many products. Materia does not invent a dose, application clock, or course length.",
      "Tell your pharmacist about pregnancy or breastfeeding plans and ALL other topical acids or retinoids on your list.",
      "Keep away from eyes, lips, and mucous membranes — report severe blistering or swelling early.",
      "Ask how to introduce the product gradually if the labelled product advises — do not invent an escalation schedule.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical retinoid njengoba kubhalwe kumkhiqizo onelebula — ukusebenzisa ebusuku nokuvikela ilanga kuvame ukufundiswa; qinisekisa ilebula.",
      "Ukwelulekwa kwe-tretinoin kuvame ukufaka ukoma, ukuhlehla, nokufundisa ukugwema ukukhulelwa kwimikhiqizo eminingi. I-Materia ayiqambi umthamo, iwashi lokufaka, noma ubude benkambo.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa noma zokuncelisa NAWO WONKE amanye ama-acid noma ama-retinoid e-topical.",
      "Gcina kude namehlo, izindebe, nezindawo ezimanzi — bika amaqhubu amakhulu noma ukuvuvuka ngokushesha.",
      "Buza ukuthi ungawethula kanjani umkhiqizo kancane uma ilebula icebisa — ungayiqiqi uhlelo lokunyuka.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese retinoïed soos op die geëtiketteerde produk aangedui — naggebruik en sonbeskerming is algemene berading; bevestig die etiket.",
      "Tretinoïen-berading sluit dikwels droogheid, skilfering, en swangerskap-vermydingsonderrig vir baie produkte in. Materia versin nie ’n dosis, aanwendingsklok of kuurduur nie.",
      "Sê vir jou apteker van swangerskap- of borsvoedingplanne en ALLE ander topiese sure of retinoïede op jou lys.",
      "Hou weg van oë, lippe en slymvliese — rapporteer ernstige blistering of swelling vroeg.",
      "Vra hoe om die produk geleidelik in te bring as die geëtiketteerde produk dit adviseer — moenie ’n eskaleerskedeule versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical retinoid ena hantle kamoo e hlalositsoeng holabel — tšebeliso ea bosiu le tšireletso ea letsatsi ke keletso e tloaelehileng; netefatsa leibole.",
      "Keletso ea tretinoin hangata e kenyelletsa ho oma, ho hloboha, le thuto ea ho qoba ho ima bakeng sa lihlahiswa tse ngata. Materia ha e iqape tekanyo, nako ea ho sebelisa, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka merero ea ho ima kapa ho anyesa le LI-ACID KAPA LI-RETINOID TSOHLE tsa topical.",
      "Boloka hole le mahlo, melomo, le limucous membranes — tlaleha lihlabana tse matla kapa ho ruruha kapele.",
      "Botsa hore u ka kenyelletsa sehlahiswa butle joang haeba leibole e eletsa — se ke oa iqapa kemiso ea ho nyolohela.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical retinoid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukusetyenziswa ebusuku nokukhusela ilanga kuhlala kufundiswa; qinisekisa ileyibhile.",
      "Iingcebiso ze-tretinoin zihlala zibandakanya ukoma, ukuhlubuka, nokufundisa ukuphepha ukukhulelwa kwiimveliso ezininzi. I-Materia ayiyiqiqi idosi, iwotshi yokufaka, okanye ubude bekhosi.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa okanye zokuncancisa NAZO ZONKE ezinye ii-acid okanye ii-retinoid ze-topical.",
      "Gcina kude namehlo, imilebe, neendawo ezimanzi — xela amaqhuma anzima okanye ukudumba kwangoko.",
      "Buza indlela yokungenisa imveliso kancinci ukuba ileyibhile icebisa — sukuyiqqa ishedyuli yokunyuka.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-ceftriaxone": five(
    [
      "Use this third-generation cephalosporin exactly as directed on your labelled product — injection technique belongs with your care team.",
      "Ceftriaxone counselling commonly includes allergy watch and diarrhoea reporting. Materia does not invent a dose, infusion clock, or course length.",
      "Tell your pharmacist about penicillin or cephalosporin allergy history, gall-bladder history, and ALL other antibiotics on your list.",
      "Report widespread rash, severe watery diarrhoea, or yellow eyes early for clinician review.",
      "Ask how monitoring and follow-up fit your care plan — do not invent a personal injection schedule.",
      "If you get blistering rash with fever, trouble breathing, or collapse — seek emergency care.",
    ],
    [
      "Sebenzisa le third-generation cephalosporin njengoba kubhalwe kumkhiqizo onelebula — indlela yokujova ihambisana nethimba lakho lokunakekelwa.",
      "Ukwelulekwa kwe-ceftriaxone kuvame ukufaka ukugada i-allergy nokubika ukuhuda. I-Materia ayiqambi umthamo, iwashi lokufaka emithanjeni, noma ubude benkambo.",
      "Tshela umkhiqizi ngomlando we-allergy ye-penicillin noma ye-cephalosporin, umlando wesinye senyongo, NAWO WONKE amanye ama-antibiotic.",
      "Bika ukuqubuka okusabalele, ukuhuda okumanzi okukhulu, noma amehlo aphuzi ngokushesha.",
      "Buza ukuthi ukuqapha nokulandelela kuhambisana kanjani nohlelo lwakho — ungayiqiqi uhlelo lakho lokujova.",
      "Uma uthola ukuqubuka okukhulu namaqhubu nomkhuhlane, ukuphefumula kanzima, noma ukuwa — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie derde-generasie cefalosporien soos op die geëtiketteerde produk aangedui — inspuitingstegniek behoort by jou sorgspan.",
      "Seftriaksoon-berading sluit dikwels allergiewaak en diarree-rapportering in. Materia versin nie ’n dosis, infusieklok of kuurduur nie.",
      "Sê vir jou apteker van penisillien- of cefalosporien-allergiegeskiedenis, galblaasgeskiedenis, en ALLE ander antibiotika op jou lys.",
      "Rapporteer wydverspreide uitslag, ernstige waterige diarree, of geel oë vroeg vir klinikus-hersiening.",
      "Vra hoe monitering en opvolg by jou sorgplan pas — moenie ’n persoonlike inspuitingskedule versin nie.",
      "As jy blisteruitslag met koors, asemhalingsprobleme, of ineenstorting kry — soek noodhulp.",
    ],
    [
      "Sebelisa third-generation cephalosporin ena hantle kamoo e hlalositsoeng holabel — mokhoa oa ho enteoa ke oa sehlopha sa hau sa tlhokomelo.",
      "Keletso ea ceftriaxone hangata e kenyelletsa ho hlokomela allergy le ho tlaleha letšollo. Materia ha e iqape tekanyo, nako ea infusion, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka histori ea allergy ea penicillin kapa cephalosporin, histori ea gallbladder, le LI-ANTIBIOTIC TSOHLE.",
      "Tlaleha lekhopho le atileng, letšollo le metsi le matla, kapa mahlo a mosehla kapele.",
      "Botsa hore ho hlokomela le ho latela ho tšoana joang le moralo oa hau — se ke oa iqapa kemiso ea hau ea ho enteoa.",
      "Haeba u fumana lekhopho le lihlabana ka feberu, ho hema thata, kapa ho oa — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le third-generation cephalosporin ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ubuchule bokutofa buhamba neqela lakho lokhathalelo.",
      "Iingcebiso ze-ceftriaxone zihlala zibandakanya ukuqapha i-allergy nokuxela urhudo. I-Materia ayiyiqiqi idosi, iwotshi ye-infusion, okanye ubude bekhosi.",
      "Xelela usokhemisti ngembali ye-allergy ye-penicillin okanye ye-cephalosporin, imbali yenyongo, NAZO ZONKE ezinye ii-antibiotic.",
      "Xela irhashalala esasazekileyo, urhudo olumanzi olunzima, okanye amehlo atyheli kwangoko.",
      "Buza indlela ukuqapha nokulandela okuhambelana ngayo nesicwangciso sakho — sukuyiqqa ishedyuli yakho yokutofa.",
      "Ukuba ufumana irhashalala namaqhuma nomkhuhlane, uxinzelelo lokuphefumla, okanye ukuwa — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-vanco": five(
    [
      "Use this glycopeptide antibiotic exactly as directed on your labelled product — infusion rate and monitoring belong with your care team.",
      "Vancomycin counselling commonly includes kidney and hearing watch, and “red man” infusion reactions. Materia does not invent a dose, level target, or infusion clock.",
      "Tell your pharmacist about kidney disease, hearing problems, and ALL other antibiotics or diuretics on your list.",
      "Report reduced urine, ringing in the ears, flushing with itching during infusion, or severe diarrhoea early.",
      "Ask how monitoring fits your care plan — do not invent a personal blood-level schedule.",
      "If you get severe allergic swelling, trouble breathing, or collapse during infusion — seek emergency care.",
    ],
    [
      "Sebenzisa le glycopeptide antibiotic njengoba kubhalwe kumkhiqizo onelebula — isivinini se-infusion nokuqapha kuhambisana nethimba lakho lokunakekelwa.",
      "Ukwelulekwa kwe-vancomycin kuvame ukufaka ukugada izinto nokuzwa, kanye nokusabela kwe-“red man” ngesikhathi se-infusion. I-Materia ayiqambi umthamo, umgomo weleveli, noma iwashi le-infusion.",
      "Tshela umkhiqizi ngesifo sezinso, izinkinga zokuzwa, NAWO WONKE amanye ama-antibiotic noma ama-diuretic.",
      "Bika umchamo omncane, ukukhala ezindlebeni, ukubomvu nokuluma ngesikhathi se-infusion, noma ukuhuda okukhulu ngokushesha.",
      "Buza ukuthi ukuqapha kuhambisana kanjani nohlelo lwakho — ungayiqiqi uhlelo lakho lwama-level egazini.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuphefumula kanzima, noma ukuwa ngesikhathi se-infusion — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie glikopeptied-antibiotikum soos op die geëtiketteerde produk aangedui — infusietempo en monitering behoort by jou sorgspan.",
      "Vankomisien-berading sluit dikwels nier- en gehoorwaak in, en “rooi man”-infusiereaksies. Materia versin nie ’n dosis, vlakteiken of infusieklok nie.",
      "Sê vir jou apteker van niersiekte, gehoorprobleme, en ALLE ander antibiotika of diuretika op jou lys.",
      "Rapporteer verminderde urine, suising in die ore, flushing met jeuk tydens infusie, of ernstige diarree vroeg.",
      "Vra hoe monitering by jou sorgplan pas — moenie ’n persoonlike bloedvlakskedeule versin nie.",
      "As jy ernstige allergiese swelling, asemhalingsprobleme, of ineenstorting tydens infusie kry — soek noodhulp.",
    ],
    [
      "Sebelisa glycopeptide antibiotic ena hantle kamoo e hlalositsoeng holabel — lebelo la infusion le ho hlokomela ke tsa sehlopha sa hau sa tlhokomelo.",
      "Keletso ea vancomycin hangata e kenyelletsa ho hlokomela liphio le kutlo, le karabelo ea “red man” nakong ea infusion. Materia ha e iqape tekanyo, sepheo sa level, kapa nako ea infusion.",
      "Bolella rakhemisi ka lefu la liphio, mathata a kutlo, le LI-ANTIBIOTIC KAPA LI-DIURETIC TSOHLE.",
      "Tlaleha moroto o fokotsehileng, ho lla litsebeng, ho fubela ka ho hlohlona nakong ea infusion, kapa letšollo le matla kapele.",
      "Botsa hore ho hlokomela ho tšoana joang le moralo oa hau — se ke oa iqapa kemiso ea hau ea maemo a mali.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho hema thata, kapa ho oa nakong ea infusion — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le glycopeptide antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — isantya se-infusion nokuqapha kuhamba neqela lakho lokhathalelo.",
      "Iingcebiso ze-vancomycin zihlala zibandakanya ukuqapha iintso nokuva, kunye neempendulo ze-“red man” ngexesha le-infusion. I-Materia ayiyiqiqi idosi, usukelo lweleveli, okanye iwotshi ye-infusion.",
      "Xelela usokhemisti ngesifo sezintso, iingxaki zokuva, NAZO ZONKE ezinye ii-antibiotic okanye ii-diuretic.",
      "Xela umchamo omncinci, ukukhala ezindlebeni, ukubomvu nokurhawuzela ngexesha le-infusion, okanye urhudo olunzima kwangoko.",
      "Buza indlela ukuqapha okuhambelana ngayo nesicwangciso sakho — sukuyiqqa ishedyuli yakho yeeleveli zegazi.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, uxinzelelo lokuphefumla, okanye ukuwa ngexesha le-infusion — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-ritonavir": five(
    [
      "Take this HIV protease inhibitor / PK booster exactly as directed on your labelled product — interaction checks are essential counselling.",
      "Ritonavir counselling commonly includes stomach upset and reviewing ALL other medicines and herbal products with your pharmacist. Materia does not invent a dose, interaction list, or viral-load target.",
      "Tell your pharmacist about heart rhythm medicines, cholesterol products, sedatives, and contraception plans on your list.",
      "Report severe diarrhoea, yellow eyes, unexplained muscle pain, or new rash early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours or a catch-up plan.",
      "If you get severe allergic swelling, trouble breathing, or collapse — seek emergency care.",
    ],
    [
      "Sebenzisa le HIV protease inhibitor / PK booster njengoba kubhalwe kumkhiqizo onelebula — ukuhlola ukuxhumana kubalulekile ekufundiseni.",
      "Ukwelulekwa kwe-ritonavir kuvame ukufaka ukucasuka kwesisu nokubuyekeza NAWO WONKE amanye amaphilisi nemikhiqizo yemithi nomkhiqizi. I-Materia ayiqambi umthamo, uhlu lokuxhumana, noma umgomo we-viral load.",
      "Tshela umkhiqizi ngamaphilisi esivinini senhliziyo, imikhiqizo ye-cholesterol, ama-sedative, nezinhlelo zokuvimbela inzalo.",
      "Bika ukuhuda okukhulu, amehlo aphuzi, ubuhlungu bemisipha obungachazeki, noma ukuqubuka okusha ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa noma uhlelo lokubuyisela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuphefumula kanzima, noma ukuwa — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie MIV-protease-inhibeerder / PK-booster soos op die geëtiketteerde produk aangedui — interaksiekontroles is noodsaaklike berading.",
      "Ritonavir-berading sluit dikwels maagonstel in en om ALLE ander medisyne en kruieprodukte met jou apteker te hersien. Materia versin nie ’n dosis, interaksielys of virale-ladingteiken nie.",
      "Sê vir jou apteker van hartritmemedisyne, cholesterolprodukte, sederende middels, en voorbehoedingplanne op jou lys.",
      "Rapporteer ernstige diarree, geel oë, onverklaarde spierpyn, of nuwe uitslag vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure of ’n inhaalplan versin nie.",
      "As jy ernstige allergiese swelling, asemhalingsprobleme, of ineenstorting kry — soek noodhulp.",
    ],
    [
      "Sebelisa HIV protease inhibitor / PK booster ena hantle kamoo e hlalositsoeng holabel — litlhahlobo tsa ho sebelisana ke keletso ea bohlokoa.",
      "Keletso ea ritonavir hangata e kenyelletsa ho tšoenyeha ha mpeng le ho hlahloba MERIANA EOHLE le lihlahiswa tsa litlama le rakhemisi. Materia ha e iqape tekanyo, lenane la ho sebelisana, kapa sepheo sa viral load.",
      "Bolella rakhemisi ka meriana ea morethetho oa pelo, lihlahiswa tsa cholesterol, li-sedative, le merero ea thibelo ea kemo.",
      "Tlaleha letšollo le matla, mahlo a mosehla, bohloko ba mesifa bo sa hlaloseng, kapa lekhopho le lecha kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola kapa moralo oa ho tsosolosa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho hema thata, kapa ho oa — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le HIV protease inhibitor / PK booster ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukujonga ukusebenzelana kubalulekile kwiingcebiso.",
      "Iingcebiso ze-ritonavir zihlala zibandakanya ukucaphuka kwesisu nokujonga NAWO ONKE amanye amayeza neemveliso zemithi nosokhemisti. I-Materia ayiyiqiqi idosi, uluhlu lokusebenzelana, okanye usukelo lwe-viral load.",
      "Xelela usokhemisti ngamayeza esingqisho sentliziyo, iimveliso ze-cholesterol, ii-sedative, nezicwangciso zokuthintela ukukhulelwa.",
      "Xela urhudo olunzima, amehlo atyheli, iintlungu zemisipha ezingachazekiyo, okanye irhashalala entsha kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula okanye isicwangciso sokubuyisela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, uxinzelelo lokuphefumla, okanye ukuwa — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-timolol-eye": five(
    [
      "Use these topical beta-blocker eye drops exactly as directed on your labelled product — usually one drop in the affected eye(s); confirm the label.",
      "Timolol eye counselling commonly includes pressing the tear duct after drops and telling your clinician about asthma or heart-block history. Materia does not invent a drop count or intraocular-pressure target.",
      "Tell your pharmacist about asthma/COPD, slow heart rate, and ALL other eye drops or beta-blockers on your list.",
      "Wait between different eye drops as the labelled product advises — do not invent spacing minutes.",
      "Report sudden vision loss, severe eye pain, wheeze, or fainting early for urgent review.",
      "If breathing collapses or you get severe allergic swelling around the eyes — seek emergency care.",
    ],
    [
      "Sebenzisa la ma-topical beta-blocker eye drops njengoba kubhalwe kumkhiqizo onelebula — kuvame ithonsi eyodwa esweni elithintekile; qinisekisa ilebula.",
      "Ukwelulekwa kwe-timolol eye kuvame ukufaka ukucindezela i-tear duct ngemva kwamathonsi nokutshela udokotela ngomlando we-asthma noma we-heart block. I-Materia ayiqambi inani lamathonsi noma umgomo womfutho wangaphakathi kweso.",
      "Tshela umkhiqizi nge-asthma/COPD, isivinini senhliziyo esiphansi, NAWO WONKE amanye ama-eye drops noma ama-beta-blocker.",
      "Linda phakathi kwama-eye drops ahlukene njengoba umkhiqizo onelebula ucebisa — ungayiqiqi amaminithi okuhlukanisa.",
      "Bika ukulahlekelwa ukubona okuzumayo, ubuhlungu beso obukhulu, ukubhobha, noma ukuwa ngokushesha.",
      "Uma ukuphefumula kuba nzima noma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese beta-blokkeerder-oogdruppels soos op die geëtiketteerde produk aangedui — gewoonlik een druppel in die aangetaste oog/oë; bevestig die etiket.",
      "Timolol-oogberading sluit dikwels in om die traanbuis ná druppels te druk en jou klinikus van asma- of hartblokgeskiedenis te vertel. Materia versin nie ’n druppeltelling of intraokulêre-drukteiken nie.",
      "Sê vir jou apteker van asma/COPD, stadige hartklop, en ALLE ander oogdruppels of beta-blokkeerders op jou lys.",
      "Wag tussen verskillende oogdruppels soos die geëtiketteerde produk adviseer — moenie skeidingsminute versin nie.",
      "Rapporteer skielike sigverlies, ernstige oorpyn, piep, of floute vroeg vir dringende hersiening.",
      "As asemhaling ineenstort of jy ernstige allergiese swelling rondom die oë kry — soek noodhulp.",
    ],
    [
      "Sebelisa li-topical beta-blocker eye drops tsena hantle kamoo e hlalositsoeng holabel — hangata thopa e le 'ngoe leihlong le amehileng; netefatsa leibole.",
      "Keletso ea timolol eye hangata e kenyelletsa ho tobetsa tear duct ka mor'a mathopa le ho bolella ngaka ka histori ea asthma kapa heart block. Materia ha e iqape palo ea mathopa kapa sepheo sa khatello ka har'a leihlo.",
      "Bolella rakhemisi ka asthma/COPD, morethetho oa pelo o tlase, le LI-EYE DROPS KAPA LI-BETA-BLOCKER TSOHLE.",
      "Ema pakeng tsa li-eye drops tse fapaneng kamoo sehlahiswa se nang le leibole e eletsang — se ke oa iqapa metsotso ea ho arola.",
      "Tlaleha tahlehelo ea pono ka tšohanyetso, bohloko ba leihlo bo matla, ho lla ha matšoa, kapa ho akheha kapele.",
      "Haeba ho hema ho oa kapa u fumana ho ruruha ha allergy ho matla haufi le mahlo — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa la ma-topical beta-blocker eye drops ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala ithontsi enye kwiliso elichaphazelekileyo; qinisekisa ileyibhile.",
      "Iingcebiso ze-timolol eye zihlala zibandakanya ukucinezela i-tear duct emva kweethontsi nokuxelela ugqirha ngembali ye-asthma okanye ye-heart block. I-Materia ayiyiqiqi inani leethontsi okanye usukelo loxinzelelo lwangaphakathi kweliso.",
      "Xelela usokhemisti nge-asthma/COPD, isingqisho sentliziyo esiphantsi, NAZO ZONKE ezinye ii-eye drops okanye ii-beta-blocker.",
      "Linda phakathi kwee-eye drops ezahlukeneyo njengoko imveliso eneleyibhile icebisa — sukuyiqqa imizuzu yokwahlula.",
      "Xela ukulahlekelwa kukubona ngequbuliso, iintlungu zeliso ezinzima, ukurhotyo, okanye ukuwa kwangoko.",
      "Ukuba ukuphefumla kuwa okanye ufumana ukudumba kwe-allergy okunzima kufuphi namehlo — funa uncedo olungxamisekileyo.",
    ],
  ),
};
