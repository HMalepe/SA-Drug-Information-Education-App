/**
 * v230–v239 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V230_TO_V239: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-levonorgestrel": five(
    [
      "Take or use this progestogen exactly as directed on your labelled product — tablets, implants, and IUSs differ; confirm the form you were given.",
      "Levonorgestrel counselling commonly includes timing for emergency contraception when that is the labelled use — confirm against the product, not an invented clock. Materia does not invent a dose or fertility score.",
      "Tell your pharmacist about clot history, migraine with aura, unexplained vaginal bleeding, and ALL other hormones on your list.",
      "Report severe abdominal pain, calf swelling, chest pain, or sudden vision change early.",
      "Ask how missed emergency or routine doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le progestogen njengoba kubhalwe kumkhiqizo onelebula — amaphilisi, ama-implant, nama-IUS ayahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-levonorgestrel kuvame ukufaka isikhathi se-emergency contraception uma kuyindlela yelebula — qinisekisa kumkhiqizo, hhayi iwashi eliqanjiwe. I-Materia ayiqambi umthamo noma isikali sokuzala.",
      "Tshela umkhiqizi ngomlando weqhwa, i-migraine ene-aura, ukopha kwesibeletho okungachazeki, NAWO WONKE amanye ama-hormone.",
      "Bika ubuhlungu besisu obukhulu, ukuvuvuka kweqakala, ubuhlungu besifuba, noma ukushintsha kokubona okuzumayo ngokushesha.",
      "Buza ukuthi imithamo ye-emergency noma ejwayelekile elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem of gebruik hierdie progestogeen soos op die geëtiketteerde produk aangedui — tablette, implantate en IUSs verskil; bevestig die vorm wat jy ontvang het.",
      "Levonorgestrel-berading sluit dikwels tydsberekening vir noodgevalvoorbehoeding in wanneer dit die geëtiketteerde gebruik is — bevestig teen die produk, nie ’n versinde klok nie. Materia versin nie ’n dosis of vrugbaarheidstelling nie.",
      "Sê vir jou apteker van klontgeskiedenis, migraine met aura, onverklaarde vaginale bloeding, en ALLE ander hormone op jou lys.",
      "Rapporteer ernstige buikpyn, kuitswelling, borspyn, of skielike sigverandering vroeg.",
      "Vra hoe gemiste nood- of roetinedosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Nka kapa sebelisa progestogen ena hantle kamoo e hlalositsoeng holabel — litafole, li-implant, le li-IUS lia fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea levonorgestrel hangata e kenyelletsa nako ea emergency contraception haeba e le tšebeliso ea leibole — netefatsa holabel, eseng nako e iqapiloeng. Materia ha e iqape tekanyo kapa lintlha tsa ho ema.",
      "Bolella rakhemisi ka histori ea tlala ea mali, migraine e nang le aura, ho tsoa mali ha botona bo sa hlaloseng, le LIHOMONE TSOHLE tse ling.",
      "Tlaleha bohloko ba mpeng bo matla, ho ruruha ha leoto, bohloko ba sefuba, kapa phetoho ea pono ka tšohanyetso kapele.",
      "Botsa hore litekanyo tsa tšohanyetso kapa tse tloaelehileng tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Thatha okanye sebenzisa le progestogen ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iipilisi, ii-implant, nee-IUS ziyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-levonorgestrel zihlala zibandakanya ixesha le-emergency contraception ukuba yeyileyibhile — qinisekisa kwimveliso, hayi iwotshi eyiqiwe. I-Materia ayiyiqiqi idosi okanye amanqaku okuzala.",
      "Xelela usokhemisti ngembali yeqhwa, i-migraine ene-aura, ukopha kwesibeleko okungachazekiyo, NAZO ZONKE ezinye ii-hormone.",
      "Xela iintlungu zesisu ezinzima, ukudumba kweqakala, iintlungu zesifuba, okanye utshintsho lokubona ngequbuliso kwangoko.",
      "Buza indlela iidosi ze-emergency okanye eziqhelekileyo ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-medroxyprogesterone": five(
    [
      "Use this injectable / oral progestogen exactly as directed on your labelled product — Depo and tablets differ; confirm the form you were given.",
      "Medroxyprogesterone counselling commonly includes bleeding-pattern change and bone-health discussions for long-term injectable use. Materia does not invent a dose, injection interval, or bone target.",
      "Tell your pharmacist about clot history, unexplained vaginal bleeding, and ALL other hormones on your list.",
      "Report severe abdominal pain, calf swelling, chest pain, or sudden vision change early.",
      "Ask how delayed injections should be handled on your care plan — do not invent a catch-up calendar.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le injectable / oral progestogen njengoba kubhalwe kumkhiqizo onelebula — i-Depo namaphilisi ayahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-medroxyprogesterone kuvame ukufaka ukushintsha kwendlela yokopha nokuxoxa ngamathambo ekusebenziseni isikhathi eside nge-injectable. I-Materia ayiqambi umthamo, isikhathi sokujova, noma umgomo wamathambo.",
      "Tshela umkhiqizi ngomlando weqhwa, ukopha kwesibeletho okungachazeki, NAWO WONKE amanye ama-hormone.",
      "Bika ubuhlungu besisu obukhulu, ukuvuvuka kweqakala, ubuhlungu besifuba, noma ukushintsha kokubona okuzumayo ngokushesha.",
      "Buza ukuthi imijovo eyabambezeleka kufanele iphathwe kanjani ohlelweni lwakho — ungayiqiqi ikhalenda lokubuyisela.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie inspuitbare / orale progestogeen soos op die geëtiketteerde produk aangedui — Depo en tablette verskil; bevestig die vorm wat jy ontvang het.",
      "Medroksiprogesteroon-berading sluit dikwels bloedingpatroonverandering en been-gesondheidbesprekings vir langtermyn-inspuitbare gebruik in. Materia versin nie ’n dosis, inspuitingsinterval of beenteiken nie.",
      "Sê vir jou apteker van klontgeskiedenis, onverklaarde vaginale bloeding, en ALLE ander hormone op jou lys.",
      "Rapporteer ernstige buikpyn, kuitswelling, borspyn, of skielike sigverandering vroeg.",
      "Vra hoe vertraagde inspuitings op jou sorgplan hanteer moet word — moenie ’n inhaalkalender versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa injectable / oral progestogen ena hantle kamoo e hlalositsoeng holabel — Depo le litafole lia fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea medroxyprogesterone hangata e kenyelletsa phetoho ea mokhoa oa ho tsoa mali le lipuisano tsa bophelo ba masapo bakeng sa tšebeliso ea nako e telele ea injectable. Materia ha e iqape tekanyo, nako ea ho enteoa, kapa sepheo sa masapo.",
      "Bolella rakhemisi ka histori ea tlala ea mali, ho tsoa mali ha botona bo sa hlaloseng, le LIHOMONE TSOHLE tse ling.",
      "Tlaleha bohloko ba mpeng bo matla, ho ruruha ha leoto, bohloko ba sefuba, kapa phetoho ea pono ka tšohanyetso kapele.",
      "Botsa hore li-ente tse liehang li lokela ho tšoaroa joang moralong oa hau — se ke oa iqapa khalendara ea ho tsosolosa.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le injectable / oral progestogen ngokuchanekileyo njengoko kubhaliwe kwileyibhile — i-Depo neepilisi ziyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-medroxyprogesterone zihlala zibandakanya utshintsho lwendlela yokopha neengxoxo zempilo yamathambo kukusetyenziswa ixesha elide nge-injectable. I-Materia ayiyiqiqi idosi, ixesha lokutofa, okanye usukelo lwamathambo.",
      "Xelela usokhemisti ngembali yeqhwa, ukopha kwesibeleko okungachazekiyo, NAZO ZONKE ezinye ii-hormone.",
      "Xela iintlungu zesisu ezinzima, ukudumba kweqakala, iintlungu zesifuba, okanye utshintsho lokubona ngequbuliso kwangoko.",
      "Buza indlela iinotofa ezilibazisekileyo ezifanele ziphathwe ngayo kwisicwangciso sakho — sukuyiqqa ikhalenda yokubuyisela.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-ethinylestradiol": five(
    [
      "Use this synthetic oestrogen exactly as directed on your labelled combined product — it is usually part of a combined contraceptive, not taken alone as a freestyle plan.",
      "Ethinylestradiol counselling commonly includes clot-risk teaching and smoking discussions for combined products. Materia does not invent a dose, pill clock, or clot score.",
      "Tell your pharmacist about clot history, migraine with aura, uncontrolled hypertension, and ALL other hormones on your list.",
      "Report calf pain with swelling, chest pain, sudden shortness of breath, or vision change early.",
      "Ask how missed combined pills should be handled on your labelled pack — do not invent a catch-up plan.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le synthetic oestrogen njengoba kubhalwe kumkhiqizo wakho ohlanganisiwe onelebula — kuvame ukuba yingxenye ye-contraceptive ehlanganisiwe, hhayi ukuyithatha wedwa.",
      "Ukwelulekwa kwe-ethinylestradiol kuvame ukufaka ukufundisa ngeqhwa nokuxoxa ngokubhema kwimikhiqizo ehlanganisiwe. I-Materia ayiqambi umthamo, iwashi lephilisi, noma isikali seqhwa.",
      "Tshela umkhiqizi ngomlando weqhwa, i-migraine ene-aura, umfutho wegazi ongalaweleki, NAWO WONKE amanye ama-hormone.",
      "Bika ubuhlungu beqakala nokuvuvuka, ubuhlungu besifuba, ukuphefumula kanzima okuzumayo, noma ukushintsha kokubona ngokushesha.",
      "Buza ukuthi amaphilisi ahlanganisiwe alahlekile kufanele aphathwe kanjani kuphakethe onelebula — ungayiqiqi uhlelo lokubuyisela.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie sintetiese oestrogeen soos op jou geëtiketteerde gekombineerde produk aangedui — dit is gewoonlik deel van ’n gekombineerde voorbehoedmiddel, nie alleen as ’n vryestylplan nie.",
      "Etinielestradiol-berading sluit dikwels klont-risiko-onderrig en rookbesprekings vir gekombineerde produkte in. Materia versin nie ’n dosis, pilklok of klonttelling nie.",
      "Sê vir jou apteker van klontgeskiedenis, migraine met aura, onbeheerde hipertensie, en ALLE ander hormone op jou lys.",
      "Rapporteer kuitpyn met swelling, borspyn, skielike kortasem, of sigverandering vroeg.",
      "Vra hoe gemiste gekombineerde pille op jou geëtiketteerde pak hanteer moet word — moenie ’n inhaalplan versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa synthetic oestrogen ena hantle kamoo e hlalositsoeng sehlahiswa sa hau se kopantsoeng — hangata ke karolo ea contraceptive e kopantsoeng, eseng ho e nka u le mong.",
      "Keletso ea ethinylestradiol hangata e kenyelletsa thuto ea kotsi ea tlala ea mali le lipuisano tsa ho tsuba bakeng sa lihlahiswa tse kopantsoeng. Materia ha e iqape tekanyo, nako ea pilisi, kapa lintlha tsa tlala.",
      "Bolella rakhemisi ka histori ea tlala ea mali, migraine e nang le aura, khatello ea mali e sa laoleheng, le LIHOMONE TSOHLE tse ling.",
      "Tlaleha bohloko ba leoto ka ho ruruha, bohloko ba sefuba, ho hema thata ka tšohanyetso, kapa phetoho ea pono kapele.",
      "Botsa hore lipilisi tse kopantsoeng tse lahlehileng li lokela ho tšoaroa joang pakeng ea hau e nang le leibole — se ke oa iqapa moralo oa ho tsosolosa.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le synthetic oestrogen ngokuchanekileyo njengoko kubhaliwe kwimveliso yakho edibeneyo eneleyibhile — ihlala iyinxalenye ye-contraceptive edibeneyo, hayi ukuyithatha wedwa.",
      "Iingcebiso ze-ethinylestradiol zihlala zibandakanya ukufundisa ngomngcipheko weqhwa neengxoxo zokutshaya kwiimveliso ezidibeneyo. I-Materia ayiyiqiqi idosi, iwotshi yepilisi, okanye amanqaku eqhwa.",
      "Xelela usokhemisti ngembali yeqhwa, i-migraine ene-aura, uxinzelelo lwegazi olungalawulekiyo, NAZO ZONKE ezinye ii-hormone.",
      "Xela iintlungu zeqakala nokudumba, iintlungu zesifuba, uxinzelelo lokuphefumla ngequbuliso, okanye utshintsho lokubona kwangoko.",
      "Buza indlela iipilisi ezidibeneyo ezilahlekileyo ezifanele ziphathwe ngayo kwipakethi yakho eneleyibhile — sukuyiqqa isicwangciso sokubuyisela.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-norethisterone": five(
    [
      "Take this progestogen exactly as directed on your labelled product — period-delay and contraception uses differ; confirm why you were given it.",
      "Norethisterone counselling commonly includes spotting, mood change, and clot-risk discussions depending on the labelled use. Materia does not invent a dose, day-count, or clot score.",
      "Tell your pharmacist about clot history, unexplained vaginal bleeding, liver disease, and ALL other hormones on your list.",
      "Report severe abdominal pain, calf swelling, chest pain, or sudden vision change early.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get sudden chest pain, coughing blood, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le progestogen njengoba kubhalwe kumkhiqizo onelebula — ukubambezela inyanga nokuvimbela inzalo kuyahluka; qinisekisa ukuthi unikewe ngani.",
      "Ukwelulekwa kwe-norethisterone kuvame ukufaka ukopha okuncane, ukushintsha kwemizwa, nokuxoxa ngeqhwa kuye ngokusebenzisa kwelebula. I-Materia ayiqambi umthamo, inani lezinsuku, noma isikali seqhwa.",
      "Tshela umkhiqizi ngomlando weqhwa, ukopha kwesibeletho okungachazeki, isifo sesibindi, NAWO WONKE amanye ama-hormone.",
      "Bika ubuhlungu besisu obukhulu, ukuvuvuka kweqakala, ubuhlungu besifuba, noma ukushintsha kokubona okuzumayo ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukukhwehlela igazi, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie progestogeen soos op die geëtiketteerde produk aangedui — periode-uitstel en voorbehoedinggebruike verskil; bevestig waarom jy dit ontvang het.",
      "Noretisteroon-berading sluit dikwels spotting, buiieverandering, en klont-risiko-besprekings in afhangend van die geëtiketteerde gebruik. Materia versin nie ’n dosis, dagtelling of klonttelling nie.",
      "Sê vir jou apteker van klontgeskiedenis, onverklaarde vaginale bloeding, lewersiekte, en ALLE ander hormone op jou lys.",
      "Rapporteer ernstige buikpyn, kuitswelling, borspyn, of skielike sigverandering vroeg.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy skielike borspyn, bloed hoes, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa progestogen ena hantle kamoo e hlalositsoeng holabel — ho liehisa khoeli le thibelo ea kemo lia fapana; netefatsa hore na u e filoe hobaneng.",
      "Keletso ea norethisterone hangata e kenyelletsa ho tsoa mali ho fokolang, phetoho ea maikutlo, le lipuisano tsa kotsi ea tlala ea mali ho ea ka tšebeliso ea leibole. Materia ha e iqape tekanyo, palo ea matsatsi, kapa lintlha tsa tlala.",
      "Bolella rakhemisi ka histori ea tlala ea mali, ho tsoa mali ha botona bo sa hlaloseng, lefu la sebete, le LIHOMONE TSOHLE tse ling.",
      "Tlaleha bohloko ba mpeng bo matla, ho ruruha ha leoto, bohloko ba sefuba, kapa phetoho ea pono ka tšohanyetso kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho khohlela mali, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le progestogen ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukulibazisa inyanga nokuthintela ukukhulelwa kuyahluka; qinisekisa ukuba unikwe ntoni.",
      "Iingcebiso ze-norethisterone zihlala zibandakanya ukopha okuncinci, utshintsho lwemeko, neengxoxo zomngcipheko weqhwa ngokuxhomekeke ekusetyenzisweni kweleyibhile. I-Materia ayiyiqiqi idosi, inani leentsuku, okanye amanqaku eqhwa.",
      "Xelela usokhemisti ngembali yeqhwa, ukopha kwesibeleko okungachazekiyo, isifo sesibindi, NAZO ZONKE ezinye ii-hormone.",
      "Xela iintlungu zesisu ezinzima, ukudumba kweqakala, iintlungu zesifuba, okanye utshintsho lokubona ngequbuliso kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukukhohlela igazi, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-brimonidine": five(
    [
      "Use these alpha-2 agonist eye drops exactly as directed on your labelled product — usually one drop in the affected eye(s); confirm the label.",
      "Brimonidine counselling commonly includes dry mouth, fatigue, and waiting between other eye drops. Materia does not invent a drop count or intraocular-pressure target.",
      "Tell your pharmacist about depression medicines (MAOIs), other eye drops, and contact-lens use on your list.",
      "Wait between different eye drops as the labelled product advises — do not invent spacing minutes.",
      "Report sudden vision loss, severe eye pain, or unusual drowsiness early for urgent review.",
      "If you get severe allergic swelling around the eyes with trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa la ma-alpha-2 agonist eye drops njengoba kubhalwe kumkhiqizo onelebula — kuvame ithonsi eyodwa esweni elithintekile; qinisekisa ilebula.",
      "Ukwelulekwa kwe-brimonidine kuvame ukufaka umlomo owomile, ukukhathala, nokulinda phakathi kwamanye ama-eye drops. I-Materia ayiqambi inani lamathonsi noma umgomo womfutho wangaphakathi kweso.",
      "Tshela umkhiqizi ngamaphilisi okucindezeleka (ama-MAOI), amanye ama-eye drops, nokusebenzisa ama-contact lens.",
      "Linda phakathi kwama-eye drops ahlukene njengoba umkhiqizo onelebula ucebisa — ungayiqiqi amaminithi okuhlukanisa.",
      "Bika ukulahlekelwa ukubona okuzumayo, ubuhlungu beso obukhulu, noma ukozela okungajwayelekile ngokushesha.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo nokuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie alfa-2-agonis-oogdruppels soos op die geëtiketteerde produk aangedui — gewoonlik een druppel in die aangetaste oog/oë; bevestig die etiket.",
      "Brimonidien-berading sluit dikwels droë mond, moegheid, en wag tussen ander oogdruppels in. Materia versin nie ’n druppeltelling of intraokulêre-drukteiken nie.",
      "Sê vir jou apteker van depressiemedisyne (MAOIs), ander oogdruppels, en kontaklensgebruik op jou lys.",
      "Wag tussen verskillende oogdruppels soos die geëtiketteerde produk adviseer — moenie skeidingsminute versin nie.",
      "Rapporteer skielike sigverlies, ernstige oorpyn, of ongewone slaperigheid vroeg vir dringende hersiening.",
      "As jy ernstige allergiese swelling rondom die oë met asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa li-alpha-2 agonist eye drops tsena hantle kamoo e hlalositsoeng holabel — hangata thopa e le 'ngoe leihlong le amehileng; netefatsa leibole.",
      "Keletso ea brimonidine hangata e kenyelletsa molomo o omeletseng, mokhathala, le ho ema pakeng tsa li-eye drops tse ling. Materia ha e iqape palo ea mathopa kapa sepheo sa khatello ka har'a leihlo.",
      "Bolella rakhemisi ka meriana ea depression (li-MAOI), li-eye drops tse ling, le tšebeliso ea li-contact lens.",
      "Ema pakeng tsa li-eye drops tse fapaneng kamoo sehlahiswa se nang le leibole e eletsang — se ke oa iqapa metsotso ea ho arola.",
      "Tlaleha tahlehelo ea pono ka tšohanyetso, bohloko ba leihlo bo matla, kapa ho otsela ho sa tloaelehang kapele.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo ka ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa la ma-alpha-2 agonist eye drops ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala ithontsi enye kwiliso elichaphazelekileyo; qinisekisa ileyibhile.",
      "Iingcebiso ze-brimonidine zihlala zibandakanya umlomo owomileyo, ukudinwa, nokulinda phakathi kwezinye ii-eye drops. I-Materia ayiyiqiqi inani leethontsi okanye usukelo loxinzelelo lwangaphakathi kweliso.",
      "Xelela usokhemisti ngamayeza oxinzelelo (ii-MAOI), ezinye ii-eye drops, nokusebenzisa ii-contact lens.",
      "Linda phakathi kwee-eye drops ezahlukeneyo njengoko imveliso eneleyibhile icebisa — sukuyiqqa imizuzu yokwahlula.",
      "Xela ukulahlekelwa kukubona ngequbuliso, iintlungu zeliso ezinzima, okanye ukozela okungaqhelekanga kwangoko.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo noxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-dorzolamide": five(
    [
      "Use these carbonic anhydrase inhibitor eye drops exactly as directed on your labelled product — usually one drop in the affected eye(s); confirm the label.",
      "Dorzolamide counselling commonly includes bitter taste, stinging, and sulfa-allergy discussions. Materia does not invent a drop count or intraocular-pressure target.",
      "Tell your pharmacist about sulfa allergy history, kidney disease, and ALL other eye drops on your list.",
      "Wait between different eye drops as the labelled product advises — do not invent spacing minutes.",
      "Report sudden vision loss, severe eye pain, or swelling around the eyes early for urgent review.",
      "If you get severe allergic swelling around the eyes with trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa la ma-carbonic anhydrase inhibitor eye drops njengoba kubhalwe kumkhiqizo onelebula — kuvame ithonsi eyodwa esweni elithintekile; qinisekisa ilebula.",
      "Ukwelulekwa kwe-dorzolamide kuvame ukufaka ukunambitha okubaba, ukushisa, nokuxoxa nge-allergy ye-sulfa. I-Materia ayiqambi inani lamathonsi noma umgomo womfutho wangaphakathi kweso.",
      "Tshela umkhiqizi ngomlando we-allergy ye-sulfa, isifo sezinso, NAWO WONKE amanye ama-eye drops.",
      "Linda phakathi kwama-eye drops ahlukene njengoba umkhiqizo onelebula ucebisa — ungayiqiqi amaminithi okuhlukanisa.",
      "Bika ukulahlekelwa ukubona okuzumayo, ubuhlungu beso obukhulu, noma ukuvuvuka eduze kwamehlo ngokushesha.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo nokuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie karboniese-anhidrase-inhibeerder-oogdruppels soos op die geëtiketteerde produk aangedui — gewoonlik een druppel in die aangetaste oog/oë; bevestig die etiket.",
      "Dorsolamied-berading sluit dikwels bitter smaak, steek, en sulfa-allergiebesprekings in. Materia versin nie ’n druppeltelling of intraokulêre-drukteiken nie.",
      "Sê vir jou apteker van sulfa-allergiegeskiedenis, niersiekte, en ALLE ander oogdruppels op jou lys.",
      "Wag tussen verskillende oogdruppels soos die geëtiketteerde produk adviseer — moenie skeidingsminute versin nie.",
      "Rapporteer skielike sigverlies, ernstige oorpyn, of swelling rondom die oë vroeg vir dringende hersiening.",
      "As jy ernstige allergiese swelling rondom die oë met asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa li-carbonic anhydrase inhibitor eye drops tsena hantle kamoo e hlalositsoeng holabel — hangata thopa e le 'ngoe leihlong le amehileng; netefatsa leibole.",
      "Keletso ea dorzolamide hangata e kenyelletsa tatso e babang, ho hlaba, le lipuisano tsa allergy ea sulfa. Materia ha e iqape palo ea mathopa kapa sepheo sa khatello ka har'a leihlo.",
      "Bolella rakhemisi ka histori ea allergy ea sulfa, lefu la liphio, le LI-EYE DROPS TSOHLE.",
      "Ema pakeng tsa li-eye drops tse fapaneng kamoo sehlahiswa se nang le leibole e eletsang — se ke oa iqapa metsotso ea ho arola.",
      "Tlaleha tahlehelo ea pono ka tšohanyetso, bohloko ba leihlo bo matla, kapa ho ruruha haufi le mahlo kapele.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo ka ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa la ma-carbonic anhydrase inhibitor eye drops ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala ithontsi enye kwiliso elichaphazelekileyo; qinisekisa ileyibhile.",
      "Iingcebiso ze-dorzolamide zihlala zibandakanya ukunambitha okukrakrayo, ukuhlaba, neengxoxo ze-allergy ye-sulfa. I-Materia ayiyiqiqi inani leethontsi okanye usukelo loxinzelelo lwangaphakathi kweliso.",
      "Xelela usokhemisti ngembali ye-allergy ye-sulfa, isifo sezintso, NAZO ZONKE ezinye ii-eye drops.",
      "Linda phakathi kwee-eye drops ezahlukeneyo njengoko imveliso eneleyibhile icebisa — sukuyiqqa imizuzu yokwahlula.",
      "Xela ukulahlekelwa kukubona ngequbuliso, iintlungu zeliso ezinzima, okanye ukudumba kufuphi namehlo kwangoko.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo noxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-liothyronine": five(
    [
      "Take this thyroid hormone (T3) exactly as directed on your labelled product — do not change brand or timing without your clinician.",
      "Liothyronine counselling commonly includes heart-rate and tremor watch, and not combining with other thyroid products unless planned. Materia does not invent a dose or TSH / free-T3 target.",
      "Tell your pharmacist about heart disease history, ALL other thyroid medicines, and iron or calcium products that may need separation.",
      "Report chest pain, palpitations, marked anxiety, or unexplained weight loss early for clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours or a catch-up plan.",
      "If you get severe chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le thyroid hormone (T3) njengoba kubhalwe kumkhiqizo onelebula — ungashintshi uhlobo noma isikhathi ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-liothyronine kuvame ukufaka ukugada isivinini senhliziyo nokuthuthumela, nokungahlanganisi namanye amakhiqizo ethroid ngaphandle kohlelo. I-Materia ayiqambi umthamo noma umgomo we-TSH / free-T3.",
      "Tshela umkhiqizi ngomlando wesifo senhliziyo, NAWO WONKE amanye amaphilisi ethroid, namakhiqizo e-iron noma e-calcium angadinga ukuhlukaniswa.",
      "Bika ubuhlungu besifuba, ukushaya kwenhliziyo, ukukhathazeka okukhulu, noma ukuncipha kwesisindo okungachazeki ngokushesha.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa noma uhlelo lokubuyisela.",
      "Uma uthola ubuhlungu besifuba obukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie tiroïedhormoon (T3) soos op die geëtiketteerde produk aangedui — moenie handelsmerk of tydsberekening sonder jou klinikus verander nie.",
      "Liotironien-berading sluit dikwels hartklop- en bewingwaak in, en om nie met ander tiroïedprodukte te kombineer tensy beplan nie. Materia versin nie ’n dosis of TSH / vrye-T3-teiken nie.",
      "Sê vir jou apteker van hartsiektegeskiedenis, ALLE ander tiroïedmedisyne, en yster- of kalsiumprodukte wat skeiding mag nodig hê.",
      "Rapporteer borspyn, hartklopgings, merkbare angs, of onverklaarde gewigsverlies vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure of ’n inhaalplan versin nie.",
      "As jy ernstige borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa thyroid hormone (T3) ena hantle kamoo e hlalositsoeng holabel — se ke oa fetola brand kapa nako ntle le ngaka.",
      "Keletso ea liothyronine hangata e kenyelletsa ho hlokomela morethetho oa pelo le ho thothomela, le ho se e kopanye le lihlahiswa tse ling tsa thyroid ntle le moralo. Materia ha e iqape tekanyo kapa sepheo sa TSH / free-T3.",
      "Bolella rakhemisi ka histori ea lefu la pelo, MERIANA EOHLE ea thyroid, le lihlahiswa tsa iron kapa calcium tse ka hlokang ho arola.",
      "Tlaleha bohloko ba sefuba, ho otla ha pelo, ho tšoha ho hlakileng, kapa tahlehelo ea boima e sa hlaloseng kapele.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola kapa moralo oa ho tsosolosa.",
      "Haeba u fumana bohloko ba sefuba bo matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le thyroid hormone (T3) ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukutshintsha uphawu okanye ixesha ngaphandle kogqirha.",
      "Iingcebiso ze-liothyronine zihlala zibandakanya ukuqapha isingqisho sentliziyo nokungcangcazela, nokungadibanisi nezinye iimveliso zethroid ngaphandle kwesicwangciso. I-Materia ayiyiqiqi idosi okanye usukelo lwe-TSH / free-T3.",
      "Xelela usokhemisti ngembali yesifo sentliziyo, NAWO ONKE amanye amayeza ethroid, neemveliso ze-iron okanye ze-calcium ezinokufuna ukwahlulwa.",
      "Xela iintlungu zesifuba, ukubetha kwentliziyo, ukuxhalaba okucacileyo, okanye ukuncipha kobunzima okungachazekiyo kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula okanye isicwangciso sokubuyisela.",
      "Ukuba ufumana iintlungu zesifuba ezinzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-midazolam": five(
    [
      "Use this benzodiazepine exactly as directed by your care team and labelled product — procedural and home uses differ; confirm the setting you were given.",
      "Midazolam counselling commonly includes drowsiness, memory gaps, and not combining with alcohol or other sedatives unless your clinician agrees. Materia does not invent a dose or titration schedule.",
      "Tell your pharmacist about breathing problems, sleep apnoea, other opioids or sedatives, and pregnancy plans.",
      "Arrange a responsible adult if your clinician advises after procedural use — do not invent a driving clearance clock.",
      "Report severe sleepiness, confusion, or slow breathing early for urgent review.",
      "If breathing becomes slow or shallow, you cannot be woken easily, or lips turn blue — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le benzodiazepine njengoba ithimba lakho lokunakekelwa nomkhiqizo onelebula esho — ukusetshenziswa kwenqubo nasekhaya kuyahluka; qinisekisa indawo onikewe yona.",
      "Ukwelulekwa kwe-midazolam kuvame ukufaka ukozela, izikhala zenkumbulo, nokungahlanganisi notshwala noma amanye ama-sedative ngaphandle kokuvuma kukadokotela. I-Materia ayiqambi umthamo noma uhlelo lokunyuka.",
      "Tshela umkhiqizi ngezinkinga zokuphefumula, i-sleep apnoea, amanye ama-opioid noma ama-sedative, nezinhlelo zokukhulelwa.",
      "Hlela umuntu omdala onakekelayo uma udokotela ecebisa ngemva kokusetshenziswa kwenqubo — ungayiqiqi iwashi lokuvunyelwa ukushayela.",
      "Bika ukozela okukhulu, ukudideka, noma ukuphefumula kancane ngokushesha.",
      "Uma ukuphefumula kuba kancane noma kufiphala, ungavuswa kalula, noma izindebe ziba luhlaza — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Gebruik hierdie bensodiasepien soos jou sorgspan en geëtiketteerde produk aandui — prosedure- en tuisgebruike verskil; bevestig die opset wat jy ontvang het.",
      "Midazolam-berading sluit dikwels slaperigheid, geheuegapings, en om nie met alkohol of ander sederende middels te kombineer tensy jou klinikus saamstem nie. Materia versin nie ’n dosis of titrasieskedule nie.",
      "Sê vir jou apteker van asemhalingsprobleme, slaapapnee, ander opioïede of sederende middels, en swangerskapsplanne.",
      "Reël ’n verantwoordelike volwassene as jou klinikus ná proseduregebruik adviseer — moenie ’n bestuursklaringsklok versin nie.",
      "Rapporteer ernstige slaperigheid, verwarring, of stadige asemhaling vroeg vir dringende hersiening.",
      "As asemhaling stadig of vlak word, jy nie maklik wakker gemaak kan word nie, of lippe blou word — soek noodhulp dadelik.",
    ],
    [
      "Sebelisa benzodiazepine ena hantle kamoo sehlopha sa hau sa tlhokomelo le sehlahiswa se nang le leibole se bolelang — tšebeliso ea ts'ebetso le ea hae ea fapana; netefatsa sebaka seo u se fileng.",
      "Keletso ea midazolam hangata e kenyelletsa ho otsela, likheo tsa mohopolo, le ho se e kopanye le joala kapa li-sedative tse ling ntle le tumellano ea ngaka. Materia ha e iqape tekanyo kapa kemiso ea ho nyolohela.",
      "Bolella rakhemisi ka mathata a ho hema, sleep apnoea, li-opioid kapa li-sedative tse ling, le merero ea ho ima.",
      "Rera motho e moholo ea ikarabellang haeba ngaka e eletsa ka mor'a tšebeliso ea ts'ebetso — se ke oa iqapa nako ea tumello ea ho khanna.",
      "Tlaleha ho otsela ho matla, ho ferekana, kapa ho hema butle kapele.",
      "Haeba ho hema ho fetoha butle kapa sehlahisoa, u sitoa ho tsosoa habonolo, kapa melomo e fetoha boputsoa — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "Sebenzisa le benzodiazepine ngokuchanekileyo njengoko iqela lakho lokhathalelo nemveliso eneleyibhile isho — ukusetyenziswa kwenkqubo nasekhaya kuyahluka; qinisekisa indawo onikwe yona.",
      "Iingcebiso ze-midazolam zihlala zibandakanya ukozela, izithuba zeenkumbulo, nokungadibanisi notywala okanye ezinye ii-sedative ngaphandle kokuvuma kugqirha. I-Materia ayiyiqiqi idosi okanye ishedyuli yokunyuka.",
      "Xelela usokhemisti ngeengxaki zokuphefumla, i-sleep apnoea, ezinye ii-opioid okanye ii-sedative, nezicwangciso zokukhulelwa.",
      "Cwangcisa umntu omdala onakekileyo ukuba ugqirha ecebisa emva kokusetyenziswa kwenkqubo — sukuyiqqa iwotshi yokuvunyelwa ukuqhuba.",
      "Xela ukolala okunzima, ukudideka, okanye ukuphefumla kancinci kwangoko.",
      "Ukuba ukuphefumla kuba kancinci okanye kufiphala, awuvuswa lula, okanye imilebe iba luhlaza — funa uncedo olungxamisekileyo kwangoko.",
    ],
  ),

  "mol-fentanyl": five(
    [
      "Use this opioid analgesic exactly as directed by your care team and labelled product — patches, lozenges, and injections are not interchangeable without advice.",
      "Fentanyl counselling commonly includes breathing watch, constipation, and never combining with alcohol or other sedatives unless your clinician agrees. Materia does not invent a dose, patch clock, or titration schedule.",
      "Tell your pharmacist about breathing problems, sleep apnoea, other opioids or benzodiazepines, and pregnancy plans.",
      "Store and dispose of used patches safely as the labelled product advises — keep away from children and pets.",
      "Report severe sleepiness, confusion, or slow breathing early for urgent review.",
      "If breathing becomes slow or shallow, you cannot be woken easily, or lips turn blue — seek emergency care immediately.",
    ],
    [
      "Sebenzisa le opioid analgesic njengoba ithimba lakho lokunakekelwa nomkhiqizo onelebula esho — ama-patch, ama-lozenge, nokujova akushintshani ngaphandle kwezeluleko.",
      "Ukwelulekwa kwe-fentanyl kuvame ukufaka ukugada ukuphefumula, ukuqina kwamathumbu, nokungahlanganisi notshwala noma amanye ama-sedative ngaphandle kokuvuma kukadokotela. I-Materia ayiqambi umthamo, iwashi le-patch, noma uhlelo lokunyuka.",
      "Tshela umkhiqizi ngezinkinga zokuphefumula, i-sleep apnoea, amanye ama-opioid noma ama-benzodiazepine, nezinhlelo zokukhulelwa.",
      "Gcina futhi ulahle ama-patch asetshenzisiwe ngokuphephile njengoba umkhiqizo onelebula ucebisa — gcina kude nezingane nezilwane.",
      "Bika ukozela okukhulu, ukudideka, noma ukuphefumula kancane ngokushesha.",
      "Uma ukuphefumula kuba kancane noma kufiphala, ungavuswa kalula, noma izindebe ziba luhlaza — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Gebruik hierdie opioïed-pynstiller soos jou sorgspan en geëtiketteerde produk aandui — pleisters, suigtablette en inspuitings is nie uitruilbaar sonder advies nie.",
      "Fentaniel-berading sluit dikwels asemhalingswaak, hardlywigheid, en nooit met alkohol of ander sederende middels te kombineer tensy jou klinikus saamstem nie. Materia versin nie ’n dosis, pleisterklok of titrasieskedule nie.",
      "Sê vir jou apteker van asemhalingsprobleme, slaapapnee, ander opioïede of bensodiasepiene, en swangerskapsplanne.",
      "Berg en gooi gebruikte pleisters veilig weg soos die geëtiketteerde produk adviseer — hou weg van kinders en troeteldiere.",
      "Rapporteer ernstige slaperigheid, verwarring, of stadige asemhaling vroeg vir dringende hersiening.",
      "As asemhaling stadig of vlak word, jy nie maklik wakker gemaak kan word nie, of lippe blou word — soek noodhulp dadelik.",
    ],
    [
      "Sebelisa opioid analgesic ena hantle kamoo sehlopha sa hau sa tlhokomelo le sehlahiswa se nang le leibole se bolelang — li-patch, li-lozenge, le ho enteoa ha li fapanyetsanoe ntle le keletso.",
      "Keletso ea fentanyl hangata e kenyelletsa ho hlokomela ho hema, ho thatafala ha mala, le ho se e kopanye le joala kapa li-sedative tse ling ntle le tumellano ea ngaka. Materia ha e iqape tekanyo, nako ea patch, kapa kemiso ea ho nyolohela.",
      "Bolella rakhemisi ka mathata a ho hema, sleep apnoea, li-opioid kapa li-benzodiazepine tse ling, le merero ea ho ima.",
      "Boloka 'me u lahle li-patch tse sebelisitsoeng ka polokeho kamoo sehlahiswa se nang le leibole e eletsang — boloka hole le bana le liphoofolo.",
      "Tlaleha ho otsela ho matla, ho ferekana, kapa ho hema butle kapele.",
      "Haeba ho hema ho fetoha butle kapa sehlahisoa, u sitoa ho tsosoa habonolo, kapa melomo e fetoha boputsoa — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "Sebenzisa le opioid analgesic ngokuchanekileyo njengoko iqela lakho lokhathalelo nemveliso eneleyibhile isho — ii-patch, ii-lozenge, nokutofa azitshintshani ngaphandle kweengcebiso.",
      "Iingcebiso ze-fentanyl zihlala zibandakanya ukuqapha ukuphefumla, ukuqina kwamathumbu, nokungaze udibanise notywala okanye ezinye ii-sedative ngaphandle kokuvuma kugqirha. I-Materia ayiyiqiqi idosi, iwotshi ye-patch, okanye ishedyuli yokunyuka.",
      "Xelela usokhemisti ngeengxaki zokuphefumla, i-sleep apnoea, ezinye ii-opioid okanye ii-benzodiazepine, nezicwangciso zokukhulelwa.",
      "Gcina uze ulahle ii-patch ezisetyenzisiweyo ngokukhuselekileyo njengoko imveliso eneleyibhile icebisa — gcina kude nabantwana nezilwanyana.",
      "Xela ukolala okunzima, ukudideka, okanye ukuphefumla kancinci kwangoko.",
      "Ukuba ukuphefumla kuba kancinci okanye kufiphala, awuvuswa lula, okanye imilebe iba luhlaza — funa uncedo olungxamisekileyo kwangoko.",
    ],
  ),

  "mol-granisetron": five(
    [
      "Take this 5-HT3 antagonist antiemetic exactly as directed on your labelled product — tablets and injections differ; confirm the form you were given.",
      "Granisetron counselling commonly includes constipation, headache, and heart-rhythm caution with interacting medicines. Materia does not invent a dose, schedule hours, or nausea score.",
      "Tell your pharmacist about heart rhythm history and ALL other medicines on your list, including other antiemetics.",
      "Report palpitations, severe constipation, or allergic rash early for clinician review.",
      "Ask how this fits with chemotherapy or post-operative plans — do not invent a personal rescue schedule.",
      "If you get fainting, severe chest pain, seizures, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le 5-HT3 antagonist antiemetic njengoba kubhalwe kumkhiqizo onelebula — amaphilisi nokujova kuyahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-granisetron kuvame ukufaka ukuqina kwamathumbu, ikhanda elibuhlungu, nokuqapha isivinini senhliziyo namaphilisi axhumana. I-Materia ayiqambi umthamo, amahora ohlelo, noma isikali sesicanucanu.",
      "Tshela umkhiqizi ngomlando wesivinini senhliziyo NAWO WONKE amanye amaphilisi, kuhlanganise amanye ama-antiemetic.",
      "Bika ukushaya kwenhliziyo, ukuqina kwamathumbu okukhulu, noma ukuqubuka kwe-allergy ngokushesha.",
      "Buza ukuthi lokhu kuhambisana kanjani nezinhlelo ze-chemotherapy noma zasemva kokuhlinzwa — ungayiqiqi uhlelo lakho lokuzisindisa.",
      "Uma uthola ukuwa, ubuhlungu besifuba obukhulu, ukuxhuzula, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie 5-HT3-antagonis-antiëmetikum soos op die geëtiketteerde produk aangedui — tablette en inspuitings verskil; bevestig die vorm wat jy ontvang het.",
      "Granisetron-berading sluit dikwels hardlywigheid, hoofpyn, en hartritmeversigtigheid met interaksie-medisyne in. Materia versin nie ’n dosis, skedule-ure of naarheidstelling nie.",
      "Sê vir jou apteker van hartritmegeskiedenis en ALLE ander medisyne op jou lys, insluitend ander antiëmetika.",
      "Rapporteer hartklopgings, ernstige hardlywigheid, of allergiese uitslag vroeg vir klinikus-hersiening.",
      "Vra hoe dit by chemoterapie- of postoperatiewe planne pas — moenie ’n persoonlike reddingskedule versin nie.",
      "As jy floute, ernstige borspyn, stuiptrekkings, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa 5-HT3 antagonist antiemetic ena hantle kamoo e hlalositsoeng holabel — litafole le ho enteoa lia fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea granisetron hangata e kenyelletsa ho thatafala ha mala, hlooho e bohloko, le tlhokomelo ea morethetho oa pelo ka meriana e sebelisanang. Materia ha e iqape tekanyo, lihora tsa kemiso, kapa lintlha tsa ho nyatsa.",
      "Bolella rakhemisi ka histori ea morethetho oa pelo le MERIANA EOHLE e meng, ho kenyeletsoa li-antiemetic tse ling.",
      "Tlaleha ho otla ha pelo, ho thatafala ha mala ho matla, kapa lekhopho la allergy kapele.",
      "Botsa hore sena se tšoana joang le merero ea chemotherapy kapa ea ka mor'a opereishene — se ke oa iqapa kemiso ea hau ea ho iphelisa.",
      "Haeba u akheha, u fumana bohloko ba sefuba bo matla, ho thothomela, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le 5-HT3 antagonist antiemetic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iipilisi nokutofa kuyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-granisetron zihlala zibandakanya ukuqina kwamathumbu, intloko ebuhlungu, nokulumka ngesingqisho sentliziyo namayeza asebenzisanayo. I-Materia ayiyiqiqi idosi, iiyure zeshedyuli, okanye amanqaku esicanucanu.",
      "Xelela usokhemisti ngembali yesingqisho sentliziyo NAWO ONKE amanye amayeza, kuquka ezinye ii-antiemetic.",
      "Xela ukubetha kwentliziyo, ukuqina kwamathumbu okunzima, okanye irhashalala ye-allergy kwangoko.",
      "Buza indlela oku kuhambelana ngayo nezicwangciso ze-chemotherapy okanye zasemva kotyando — sukuyiqqa ishedyuli yakho yokuzisindisa.",
      "Ukuba uya, ufumana iintlungu zesifuba ezinzima, ukuxhuzula, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
