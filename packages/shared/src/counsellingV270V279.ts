/**
 * v270–v279 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V270_TO_V279: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-pseudoephedrine": five(
    [
      "Take this oral decongestant exactly as directed on your labelled product — multi-ingredient cold packs differ; confirm what you were given.",
      "Pseudoephedrine counselling commonly includes blood-pressure and sleep-disturbance watch. Materia does not invent a dose, spacing hours, or congestion score.",
      "Tell your pharmacist about high blood pressure, heart disease, thyroid problems, and ALL other stimulant or cold medicines on your list.",
      "Report severe headache, chest pain, fast heartbeat, or trouble sleeping early.",
      "Ask how this fits with other cough–cold products — do not invent a personal combination plan.",
      "If you get sudden chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le oral decongestant njengoba kubhalwe kumkhiqizo onelebula — amaphakethe amaningi omkhuhlane ayahluka; qinisekisa okunikiwe.",
      "Ukwelulekwa kwe-pseudoephedrine kuvame ukufaka ukuqapha umfutho wegazi nokuphazamiseka kokulala. I-Materia ayiqambi umthamo, amahora okuhlukanisa, noma isikali sokuvimba.",
      "Tshela umkhiqizi ngomfutho wegazi ophezulu, isifo senhliziyo, izinkinga ze-thyroid, NAWO WONKE amanye amaphilisi e-stimulant noma omkhuhlane.",
      "Bika ikhanda elibuhlungu kakhulu, ubuhlungu besifuba, ukushaya kwenhliziyo okusheshayo, noma ukunzima ukulala ngokushesha.",
      "Buza ukuthi lokhu kuhambisana kanjani namanye amakhiqizo e-cough–cold — ungayiqiqi uhlelo lwakho lokuhlanganisa.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie orale dekongestant soos op die geëtiketteerde produk aangedui — multi-bestanddeel verkoue-pakkies verskil; bevestig wat jy gekry het.",
      "Pseudoefedrien-berading sluit dikwels bloeddruk- en slaapversteuringswaak in. Materia versin nie ’n dosis, spasiëringsure of kongestietelling nie.",
      "Sê vir jou apteker van hoë bloeddruk, hartsiektes, tiroïedprobleme, en ALLE ander stimulant- of verkouemedisyne op jou lys.",
      "Rapporteer ernstige hoofpyn, borspyn, vinnige hartklop, of slaapprobleme vroeg.",
      "Vra hoe dit by ander hoes-verkoue produkte pas — moenie ’n persoonlike kombinasieplan versin nie.",
      "As jy skielike borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa oral decongestant ena hantle kamoo e hlalositsoeng holabel — lipaka tse ngata tsa cold lia fapana; netefatsa seo u se fileng.",
      "Keletso ea pseudoephedrine hangata e kenyelletsa ho hlokomela khatello ea mali le mathata a boroko. Materia ha e iqape tekanyo, lihora tsa ho arola, kapa lintlha tsa ho koala.",
      "Bolella rakhemisi ka khatello ea mali e phahameng, lefu la pelo, mathata a thyroid, le MERIANA EOHLE ea stimulant kapa cold.",
      "Tlaleha hlooho e bohloko haholo, bohloko ba sefuba, ho otla ha pelo ka potlako, kapa bothata ba ho robala kapele.",
      "Botsa hore sena se tšoana joang le lihlahiswa tse ling tsa cough–cold — se ke oa iqapa moralo oa hau oa ho kopanya.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le oral decongestant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iipakethi ezininzi zomkhuhlane ziyahluka; qinisekisa okunikwe.",
      "Iingcebiso ze-pseudoephedrine zihlala zibandakanya ukuqapha uxinzelelo lwegazi nokuphazamiseka kokulala. I-Materia ayiyiqiqi idosi, iiyure zokwahlula, okanye amanqaku okuvimba.",
      "Xelela usokhemisti ngoxinzelelo lwegazi oluphezulu, isifo sentliziyo, iingxaki ze-thyroid, NAWO ONKE amanye amayeza e-stimulant okanye omkhuhlane.",
      "Xela intloko ebuhlungu kakhulu, iintlungu zesifuba, ukubetha kwentliziyo okukhawulezayo, okanye ubunzima bokulala kwangoko.",
      "Buza indlela oku kuhambelana ngayo nezinye iimveliso ze-cough–cold — sukuyiqqa isicwangciso sakho sokudibanisa.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-oxymetazoline": five(
    [
      "Use this topical nasal decongestant exactly as directed on your labelled product — short courses are common counselling; confirm the labelled maximum duration.",
      "Oxymetazoline counselling commonly includes rebound congestion if used longer than labelled. Materia does not invent a dose, spray clock, or congestion score.",
      "Tell your pharmacist about high blood pressure, heart disease, and ALL other decongestant sprays or tablets on your list.",
      "Report persistent nosebleeds, worsening blockage after stopping, or severe headache early.",
      "Ask how missed sprays fit the labelled plan — do not invent a double-up schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical nasal decongestant njengoba kubhalwe kumkhiqizo onelebula — izinkambo ezimfushane zivame ukufundiswa; qinisekisa ubude obukhulu belebula.",
      "Ukwelulekwa kwe-oxymetazoline kuvame ukufaka ukuvimba okubuyayo uma kusetshenziswa isikhathi eside kunokubhalwe. I-Materia ayiqambi umthamo, iwashi lespray, noma isikali sokuvimba.",
      "Tshela umkhiqizi ngomfutho wegazi ophezulu, isifo senhliziyo, NAWO WONKE amanye amaspray noma amaphilisi e-decongestant.",
      "Bika ukopha kwamakhala okuqhubekayo, ukuvimba okuya ngokuba kubi ngemva kokuyeka, noma ikhanda elibuhlungu kakhulu ngokushesha.",
      "Buza ukuthi amaspray alahlekile ahambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lokuphinda kabili.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese neusdekongestant soos op die geëtiketteerde produk aangedui — kort kurse is algemene berading; bevestig die geëtiketteerde maksimum duur.",
      "Oksimetasolien-berading sluit dikwels terugslagkongestie in as dit langer as geëtiketteer gebruik word. Materia versin nie ’n dosis, spuitklok of kongestietelling nie.",
      "Sê vir jou apteker van hoë bloeddruk, hartsiektes, en ALLE ander dekongestant-spuite of tablette op jou lys.",
      "Rapporteer aanhoudende neusbloedings, verergerende verstopping ná stilstand, of ernstige hoofpyn vroeg.",
      "Vra hoe gemiste spuite by die geëtiketteerde plan pas — moenie ’n verdubbelingskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical nasal decongestant ena hantle kamoo e hlalositsoeng holabel — lithuto tse khutšoane ke keletso e tloaelehileng; netefatsa bolelele bo boholo ba leibole.",
      "Keletso ea oxymetazoline hangata e kenyelletsa ho koala ho khutlang ha e sebelisoa nako e telele ho feta leibole. Materia ha e iqape tekanyo, nako ea spray, kapa lintlha tsa ho koala.",
      "Bolella rakhemisi ka khatello ea mali e phahameng, lefu la pelo, le LI-SPRAY KAPA LIPILISI TSOHLE tsa decongestant.",
      "Tlaleha ho tsoa mali ha nko ho tsoelang pele, ho koala ho mpefalang ka mor'a ho emisa, kapa hlooho e bohloko haholo kapele.",
      "Botsa hore li-spray tse lahlehileng li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea ho pheta habeli.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical nasal decongestant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iikhosi ezimfutshane zihlala zifundiswa; qinisekisa ubude obukhulu beleyibhile.",
      "Iingcebiso ze-oxymetazoline zihlala zibandakanya ukuvimba okubuyayo ukuba kusetyenziswa ixesha elide kunokubhaliweyo. I-Materia ayiyiqiqi idosi, iwotshi yespray, okanye amanqaku okuvimba.",
      "Xelela usokhemisti ngoxinzelelo lwegazi oluphezulu, isifo sentliziyo, NAZO ZONKE ezinye iispray okanye iipilisi ze-decongestant.",
      "Xela ukopha kwempumlo okuqhubekayo, ukuvimba okuya kuba mbi emva kokuyeka, okanye intloko ebuhlungu kakhulu kwangoko.",
      "Buza indlela iispray ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yokuphinda kabini.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-xylometazoline": five(
    [
      "Use this topical nasal decongestant exactly as directed on your labelled product — short courses are common counselling; confirm the labelled maximum duration.",
      "Xylometazoline counselling commonly includes rebound congestion if used longer than labelled. Materia does not invent a dose, spray clock, or congestion score.",
      "Tell your pharmacist about high blood pressure, heart disease, and ALL other decongestant sprays or tablets on your list.",
      "Report persistent nosebleeds, worsening blockage after stopping, or severe headache early.",
      "Ask how missed sprays fit the labelled plan — do not invent a double-up schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le topical nasal decongestant njengoba kubhalwe kumkhiqizo onelebula — izinkambo ezimfushane zivame ukufundiswa; qinisekisa ubude obukhulu belebula.",
      "Ukwelulekwa kwe-xylometazoline kuvame ukufaka ukuvimba okubuyayo uma kusetshenziswa isikhathi eside kunokubhalwe. I-Materia ayiqambi umthamo, iwashi lespray, noma isikali sokuvimba.",
      "Tshela umkhiqizi ngomfutho wegazi ophezulu, isifo senhliziyo, NAWO WONKE amanye amaspray noma amaphilisi e-decongestant.",
      "Bika ukopha kwamakhala okuqhubekayo, ukuvimba okuya ngokuba kubi ngemva kokuyeka, noma ikhanda elibuhlungu kakhulu ngokushesha.",
      "Buza ukuthi amaspray alahlekile ahambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lokuphinda kabili.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie topiese neusdekongestant soos op die geëtiketteerde produk aangedui — kort kurse is algemene berading; bevestig die geëtiketteerde maksimum duur.",
      "Xylometasolien-berading sluit dikwels terugslagkongestie in as dit langer as geëtiketteer gebruik word. Materia versin nie ’n dosis, spuitklok of kongestietelling nie.",
      "Sê vir jou apteker van hoë bloeddruk, hartsiektes, en ALLE ander dekongestant-spuite of tablette op jou lys.",
      "Rapporteer aanhoudende neusbloedings, verergerende verstopping ná stilstand, of ernstige hoofpyn vroeg.",
      "Vra hoe gemiste spuite by die geëtiketteerde plan pas — moenie ’n verdubbelingskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa topical nasal decongestant ena hantle kamoo e hlalositsoeng holabel — lithuto tse khutšoane ke keletso e tloaelehileng; netefatsa bolelele bo boholo ba leibole.",
      "Keletso ea xylometazoline hangata e kenyelletsa ho koala ho khutlang ha e sebelisoa nako e telele ho feta leibole. Materia ha e iqape tekanyo, nako ea spray, kapa lintlha tsa ho koala.",
      "Bolella rakhemisi ka khatello ea mali e phahameng, lefu la pelo, le LI-SPRAY KAPA LIPILISI TSOHLE tsa decongestant.",
      "Tlaleha ho tsoa mali ha nko ho tsoelang pele, ho koala ho mpefalang ka mor'a ho emisa, kapa hlooho e bohloko haholo kapele.",
      "Botsa hore li-spray tse lahlehileng li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea ho pheta habeli.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le topical nasal decongestant ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iikhosi ezimfutshane zihlala zifundiswa; qinisekisa ubude obukhulu beleyibhile.",
      "Iingcebiso ze-xylometazoline zihlala zibandakanya ukuvimba okubuyayo ukuba kusetyenziswa ixesha elide kunokubhaliweyo. I-Materia ayiyiqiqi idosi, iwotshi yespray, okanye amanqaku okuvimba.",
      "Xelela usokhemisti ngoxinzelelo lwegazi oluphezulu, isifo sentliziyo, NAZO ZONKE ezinye iispray okanye iipilisi ze-decongestant.",
      "Xela ukopha kwempumlo okuqhubekayo, ukuvimba okuya kuba mbi emva kokuyeka, okanye intloko ebuhlungu kakhulu kwangoko.",
      "Buza indlela iispray ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yokuphinda kabini.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-hypromellose": five(
    [
      "Use these artificial tears exactly as directed on your labelled product — preservative-free and multi-dose packs differ; confirm your labelled form.",
      "Hypromellose counselling commonly includes temporary blurring and contact-lens advice on the label. Materia does not invent a drop count, spacing minutes, or dryness score.",
      "Tell your pharmacist about other eye drops, contact lens use, and ALL other eye medicines on your list.",
      "Report worsening redness, severe eye pain, or sudden vision change early.",
      "Ask how to space other eye products on the labelled pack — do not invent a personal drop schedule.",
      "If you get severe allergic swelling around the eyes or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa la ma-artificial tears njengoba kubhalwe kumkhiqizo onelebula — amaphakethe angenawo i-preservative nawamaningi ayahluka; qinisekisa ifomu yakho yelebula.",
      "Ukwelulekwa kwe-hypromellose kuvame ukufaka ukufiphala okwesikhashana neseluleko sama-contact lens elebula. I-Materia ayiqambi inani lathonsi, amaminithi okuhlukanisa, noma isikali sokoma.",
      "Tshela umkhiqizi ngamanye amathonsi amehlo, ukusetshenziswa kwama-contact lens, NAWO WONKE amanye amaphilisi amehlo.",
      "Bika ukubomvu okuya ngokuba kubi, ubuhlungu beso obukhulu, noma ukushintsha kokubona okuzumayo ngokushesha.",
      "Buza ukuthi amanye amakhiqizo amehlo ahlukaniswa kanjani kuphakethe onelebula — ungayiqiqi uhlelo lwakho lwamathonsi.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu eduze kwamehlo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie kunsmatige trane soos op die geëtiketteerde produk aangedui — preserveermiddelvrye en multi-dosis pakke verskil; bevestig jou geëtiketteerde vorm.",
      "Hipromellose-berading sluit dikwels tydelike waas en kontaklensadvies op die etiket in. Materia versin nie ’n druppeltelling, spasiëringsminute of droogheidstelling nie.",
      "Sê vir jou apteker van ander oogdruppels, kontaklensgebruik, en ALLE ander oogmedisyne op jou lys.",
      "Rapporteer verergerende rooiheid, ernstige oogpyn, of skielike sigverandering vroeg.",
      "Vra hoe om ander oogprodukte op die geëtiketteerde pak te spasieer — moenie ’n persoonlike druppelskedule versin nie.",
      "As jy ernstige allergiese swelling rondom die oë of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa li-artificial tears tsena hantle kamoo e hlalositsoeng holabel — lipaka tse se nang preservative le tse ngata lia fapana; netefatsa mofuta oa hau oa leibole.",
      "Keletso ea hypromellose hangata e kenyelletsa ho fifala ha nakoana le keletso ea contact lens holabel. Materia ha e iqape palo ea thopa, metsotso ea ho arola, kapa lintlha tsa ho omella.",
      "Bolella rakhemisi ka mathopa a mang a mahlo, tšebeliso ea contact lens, le MERIANA EOHLE ea mahlo.",
      "Tlaleha bofubelu bo mpefala, bohloko ba leihlo bo matla, kapa phetoho ea pono ka tšohanyetso kapele.",
      "Botsa hore lihlahiswa tse ling tsa mahlo li lokela ho arola joang pakeng ea leibole — se ke oa iqapa kemiso ea hau ea mathopa.",
      "Haeba u fumana ho ruruha ha allergy ho matla haufi le mahlo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa la ma-artificial tears ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iipakethi ezingenayo i-preservative neezininzi ziyahluka; qinisekisa ifomu yakho yeleyibhile.",
      "Iingcebiso ze-hypromellose zihlala zibandakanya ukufiphala okwethutyana nengcebiso ye-contact lens kwileyibhile. I-Materia ayiyiqiqi inani lethontsi, imizuzu yokwahlula, okanye amanqaku okoma.",
      "Xelela usokhemisti ngamanye amathontsi amehlo, ukusetyenziswa kwe-contact lens, NAWO ONKE amanye amayeza amehlo.",
      "Xela ububomvu obuya kuba mbi, iintlungu zeliso ezinzima, okanye utshintsho lokubona ngequbuliso kwangoko.",
      "Buza indlela ezinye iimveliso zamehlo ezifanele zahlulwe ngayo kwipakethi eneleyibhile — sukuyiqqa ishedyuli yakho yamathontsi.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kufuphi namehlo okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-sodium-cromoglicate": five(
    [
      "Use this mast-cell stabiliser exactly as directed on your labelled product — nasal and ocular forms differ; confirm the form you were given.",
      "Sodium cromoglicate counselling commonly includes regular use before full benefit and temporary stinging. Materia does not invent a dose, spray or drop clock, or allergy score.",
      "Tell your pharmacist about other allergy medicines, contact lens use for eye forms, and ALL other nasal or eye products on your list.",
      "Report worsening redness, severe eye or nose pain, or new breathing difficulty early.",
      "Ask how missed doses fit the labelled plan — do not invent a catch-up schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le mast-cell stabiliser njengoba kubhalwe kumkhiqizo onelebula — amafomu amakhala namehlo ayahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-sodium cromoglicate kuvame ukufaka ukusetshenziswa njalo ngaphambi kosizo olugcwele nokushisa okwesikhashana. I-Materia ayiqambi umthamo, iwashi lespray noma lathonsi, noma isikali se-allergy.",
      "Tshela umkhiqizi ngamanye amaphilisi e-allergy, ukusetshenziswa kwama-contact lens kwamaforma amehlo, NAWO WONKE amanye amakhiqizo amakhala noma amehlo.",
      "Bika ukubomvu okuya ngokuba kubi, ubuhlungu beso noma bamakhala obukhulu, noma ukuphefumula kanzima okusha ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lokubuyisela.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie mas-sel-stabiliseerder soos op die geëtiketteerde produk aangedui — neus- en oogvorms verskil; bevestig die vorm wat jy gekry het.",
      "Natriumkromogliikaat-berading sluit dikwels gereelde gebruik voor volle voordeel en tydelike steek in. Materia versin nie ’n dosis, spuit- of druppelklok of allergiestelling nie.",
      "Sê vir jou apteker van ander allergiemedisyne, kontaklensgebruik vir oogvorms, en ALLE ander neus- of oogprodukte op jou lys.",
      "Rapporteer verergerende rooiheid, ernstige oog- of neuspyn, of nuwe asemhalingsmoeilikheid vroeg.",
      "Vra hoe gemiste dosisse by die geëtiketteerde plan pas — moenie ’n inhaalskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa mast-cell stabiliser ena hantle kamoo e hlalositsoeng holabel — mefuta ea nko le mahlo ea fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea sodium cromoglicate hangata e kenyelletsa tšebeliso ea kamehla pele ho thuso e felletseng le ho hlaba ha nakoana. Materia ha e iqape tekanyo, nako ea spray kapa thopa, kapa lintlha tsa allergy.",
      "Bolella rakhemisi ka meriana e meng ea allergy, tšebeliso ea contact lens bakeng sa mefuta ea mahlo, le LIHLAHISWA TSOHLE tsa nko kapa mahlo.",
      "Tlaleha bofubelu bo mpefala, bohloko ba leihlo kapa nko bo matla, kapa bothata ba ho hema bo mocha kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea ho tsosolosa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le mast-cell stabiliser ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iifomu zempumlo namehlo ziyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-sodium cromoglicate zihlala zibandakanya ukusetyenziswa rhoqo phambi kwencedo olupheleleyo nokurhawuzelela okwethutyana. I-Materia ayiyiqiqi idosi, iwotshi yespray okanye yethontsi, okanye amanqaku e-allergy.",
      "Xelela usokhemisti ngamanye amayeza e-allergy, ukusetyenziswa kwe-contact lens kwiifomu zamehlo, NAZO ZONKE ezinye iimveliso zempumlo okanye zamehlo.",
      "Xela ububomvu obuya kuba mbi, iintlungu zeliso okanye zempumlo ezinzima, okanye ubunzima bokuphefumla obutsha kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yokubuyisela.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-rizatriptan": five(
    [
      "Take this triptan exactly as directed on your labelled product — it is for migraine attacks as labelled, not a daily pain plan unless your clinician says so.",
      "Rizatriptan counselling commonly includes chest-tightness teaching and not stacking triptans casually. Materia does not invent a dose, attack clock, or migraine score.",
      "Tell your pharmacist about heart disease, uncontrolled blood pressure, other triptans, and ALL ergot medicines on your list.",
      "Report severe chest pain, sudden weakness on one side, speech change, or fainting early.",
      "Ask how a second labelled dose fits if the headache returns — do not invent a personal stack plan.",
      "If you get sudden chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le triptan njengoba kubhalwe kumkhiqizo onelebula — yenzelwe ukuhlasela kwe-migraine njengoba kubhalwe, hhayi uhlelo lwezilonda zansuku zonke ngaphandle kokuthi udokotela asho.",
      "Ukwelulekwa kwe-rizatriptan kuvame ukufaka ukufundisa ngokuminyana kwesifuba nokungaqambi ama-triptan nje. I-Materia ayiqambi umthamo, iwashi lokuhlasela, noma isikali se-migraine.",
      "Tshela umkhiqizi ngesifo senhliziyo, umfutho wegazi ongalawuleki, amanye ama-triptan, NAWO WONKE amaphilisi e-ergot.",
      "Bika ubuhlungu besifuba obukhulu, ubuthakathaka obuzumayo ohlangothini olulodwa, ukushintsha kwenkulumo, noma ukuwa ngokushesha.",
      "Buza ukuthi umthamo wesibili onelebula uhambisana kanjani uma ikhanda libuya — ungayiqiqi uhlelo lwakho lokuqoqa.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie triptaan soos op die geëtiketteerde produk aangedui — dit is vir migraine-aanvalle soos geëtiketteer, nie ’n daaglikse pynplan nie tensy jou klinikus so sê.",
      "Rizatriptan-berading sluit dikwels borsstyfheidonderrig in en nie triptane lukraak stapel nie. Materia versin nie ’n dosis, aanvalklok of migrainetelling nie.",
      "Sê vir jou apteker van hartsiektes, onbeheerde bloeddruk, ander triptane, en ALLE ergot-medisyne op jou lys.",
      "Rapporteer ernstige borspyn, skielike swakte aan een kant, spraakverandering, of floute vroeg.",
      "Vra hoe ’n tweede geëtiketteerde dosis pas as die hoofpyn terugkeer — moenie ’n persoonlike stapelplan versin nie.",
      "As jy skielike borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa triptan ena hantle kamoo e hlalositsoeng holabel — ke bakeng sa litlhaselo tsa migraine kamoo e hlalositsoeng, eseng moralo oa bohloko ba letsatsi le letsatsi ntle le ha ngaka e bua.",
      "Keletso ea rizatriptan hangata e kenyelletsa thuto ea ho thatafala ha sefuba le ho se bokelle li-triptan feela. Materia ha e iqape tekanyo, nako ea tlhaselo, kapa lintlha tsa migraine.",
      "Bolella rakhemisi ka lefu la pelo, khatello ea mali e sa laoleheng, li-triptan tse ling, le MERIANA EOHLE ea ergot.",
      "Tlaleha bohloko ba sefuba bo matla, bofokoli ba tšohanyetso ka lehlakoreng le le leng, phetoho ea puo, kapa ho akheha kapele.",
      "Botsa hore tekanyo ea bobeli e nang le leibole e tšoana joang ha hlooho e khutla — se ke oa iqapa moralo oa hau oa ho bokella.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le triptan ngokuchanekileyo njengoko kubhaliwe kwileyibhile — yenzelwe uhlaselo lwe-migraine njengoko kubhaliwe, hayi isicwangciso sentlungu yemihla ngemihla ngaphandle kokuba ugqirha atsho.",
      "Iingcebiso ze-rizatriptan zihlala zibandakanya ukufundisa ngokumiqina kwesifuba nokungafaki ii-triptan nje. I-Materia ayiyiqiqi idosi, iwotshi yohlaselo, okanye amanqaku e-migraine.",
      "Xelela usokhemisti ngesifo sentliziyo, uxinzelelo lwegazi olungalawulekiyo, ezinye ii-triptan, NAWO ONKE amayeza e-ergot.",
      "Xela iintlungu zesifuba ezinzima, ubuthathaka ngequbuliso kwicala elinye, utshintsho lwentetho, okanye ukuwa kwangoko.",
      "Buza indlela idosi yesibini eneleyibhile ehambelana ngayo ukuba intloko ibuya — sukuyiqqa isicwangciso sakho sokufaka.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-tolterodine": five(
    [
      "Take this antimuscarinic exactly as directed on your labelled product — immediate- and modified-release forms differ; confirm your labelled form.",
      "Tolterodine counselling commonly includes dry mouth, constipation, and blurred-vision teaching. Materia does not invent a dose, dosing clock, or bladder score.",
      "Tell your pharmacist about glaucoma, urinary retention, gut blockage history, and ALL other anticholinergic medicines on your list.",
      "Report trouble urinating, severe constipation, confusion, or fast heartbeat early.",
      "Ask how missed doses fit the labelled plan — do not invent a double-up schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antimuscarinic njengoba kubhalwe kumkhiqizo onelebula — amafomu a-immediate- noma modified-release ayahluka; qinisekisa ifomu yakho yelebula.",
      "Ukwelulekwa kwe-tolterodine kuvame ukufaka umlomo owomile, ukuqunjelwa, nokufundisa ngokufiphala kokubona. I-Materia ayiqambi umthamo, iwashi lomthamo, noma isikali sesinye.",
      "Tshela umkhiqizi nge-glaucoma, ukugcinwa komchamo, umlando wokuvinjwa kwesisu, NAWO WONKE amanye amaphilisi e-anticholinergic.",
      "Bika ukunzima ukuchama, ukuqunjelwa okukhulu, ukudideka, noma ukushaya kwenhliziyo okusheshayo ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lokuphinda kabili.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antimuskariniese middel soos op die geëtiketteerde produk aangedui — onmiddellike- en gewysigde-vrystellingvorms verskil; bevestig jou geëtiketteerde vorm.",
      "Tolterodine-berading sluit dikwels droë mond, hardlywigheid, en waas-sigonderrig in. Materia versin nie ’n dosis, doseringsklok of blaasstelling nie.",
      "Sê vir jou apteker van gloukoom, urienretensie, dermblokkeringgeskiedenis, en ALLE ander anticholinergiese medisyne op jou lys.",
      "Rapporteer moeilikheid om te urineer, ernstige hardlywigheid, verwarring, of vinnige hartklop vroeg.",
      "Vra hoe gemiste dosisse by die geëtiketteerde plan pas — moenie ’n verdubbelingskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antimuscarinic ena hantle kamoo e hlalositsoeng holabel — mefuta ea immediate- le modified-release ea fapana; netefatsa mofuta oa hau oa leibole.",
      "Keletso ea tolterodine hangata e kenyelletsa molomo o omileng, ho thatafala, le thuto ea ho fifala ha pono. Materia ha e iqape tekanyo, nako ea tekanyo, kapa lintlha tsa senya.",
      "Bolella rakhemisi ka glaucoma, ho boloka moroto, histori ea ho koala ha mala, le MERIANA EOHLE ea anticholinergic.",
      "Tlaleha bothata ba ho ntša moroto, ho thatafala ho matla, ho ferekana, kapa ho otla ha pelo ka potlako kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea ho pheta habeli.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antimuscarinic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iifomu ze-immediate- ne-modified-release ziyahluka; qinisekisa ifomu yakho yeleyibhile.",
      "Iingcebiso ze-tolterodine zihlala zibandakanya umlomo owomileyo, ukuqunjelwa, nokufundisa ngokufiphala kokubona. I-Materia ayiyiqiqi idosi, iwotshi yedosi, okanye amanqaku esinyo.",
      "Xelela usokhemisti nge-glaucoma, ukugcinwa komchamo, imbali yokuvinjwa kwesisu, NAWO ONKE amanye amayeza e-anticholinergic.",
      "Xela ubunzima bokuchama, ukuqunjelwa okunzima, ukudideka, okanye ukubetha kwentliziyo okukhawulezayo kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yokuphinda kabini.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-vardenafil": five(
    [
      "Take this PDE5 inhibitor exactly as directed on your labelled product — never combine with nitrate medicines without clinician advice.",
      "Vardenafil counselling commonly includes headache, flushing, and sudden vision or hearing-change watch. Materia does not invent a dose, timing hours, or erection score.",
      "Tell your pharmacist about heart disease, nitrate use, alpha-blocker therapy, and ALL other PDE5 products on your list.",
      "Report chest pain during sex, painful erection lasting longer than labelled advice, sudden vision loss, or hearing loss early.",
      "Ask how food and alcohol fit the labelled product — do not invent a personal timing plan.",
      "If you get sudden chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le PDE5 inhibitor njengoba kubhalwe kumkhiqizo onelebula — ungahlanganisi namaphilisi e-nitrate ngaphandle kweseluleko sikadokotela.",
      "Ukwelulekwa kwe-vardenafil kuvame ukufaka ikhanda elibuhlungu, ukubomvu, nokuqapha ukushintsha kokubona noma kokuzwa okuzumayo. I-Materia ayiqambi umthamo, amahora esikhathi, noma isikali sokuqina.",
      "Tshela umkhiqizi ngesifo senhliziyo, ukusetshenziswa kwe-nitrate, i-alpha-blocker therapy, NAWO WONKE amanye amakhiqizo e-PDE5.",
      "Bika ubuhlungu besifuba ngesikhathi socansi, ukuqina okubuhlungu okude kuneseluleko selebula, ukulahlekelwa ukubona okuzumayo, noma ukuzwa ngokushesha.",
      "Buza ukuthi ukudla notshwala kuhambisana kanjani nomkhiqizo onelebula — ungayiqiqi uhlelo lwakho lwesikhathi.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie PDE5-inhibeerder soos op die geëtiketteerde produk aangedui — kombineer nooit met nitraatmedisyne sonder klinikusadvies nie.",
      "Vardenafil-berading sluit dikwels hoofpyn, flushing, en skielike sig- of gehoorveranderingswaak in. Materia versin nie ’n dosis, tydsberekeningure of ereksietelling nie.",
      "Sê vir jou apteker van hartsiektes, nitraatgebruik, alfa-blokkeerderterapie, en ALLE ander PDE5-produkte op jou lys.",
      "Rapporteer borspyn tydens seks, pynlike ereksie langer as geëtiketteerde raad, skielike sigverlies, of gehoorverlies vroeg.",
      "Vra hoe kos en alkohol by die geëtiketteerde produk pas — moenie ’n persoonlike tydsberekeningsplan versin nie.",
      "As jy skielike borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa PDE5 inhibitor ena hantle kamoo e hlalositsoeng holabel — se ke oa e kopanya le meriana ea nitrate ntle le keletso ea ngaka.",
      "Keletso ea vardenafil hangata e kenyelletsa hlooho e bohloko, ho fubela, le ho hlokomela phetoho ea pono kapa kutlo ka tšohanyetso. Materia ha e iqape tekanyo, lihora tsa nako, kapa lintlha tsa ho thatafala.",
      "Bolella rakhemisi ka lefu la pelo, tšebeliso ea nitrate, alpha-blocker therapy, le LIHLAHISWA TSOHLE tsa PDE5.",
      "Tlaleha bohloko ba sefuba nakong ea thobalano, ho thatafala ho bohloko ho telele ho feta keletso ea leibole, tahlehelo ea pono ka tšohanyetso, kapa tahlehelo ea kutlo kapele.",
      "Botsa hore lijo le joala li tšoana joang le sehlahiswa se nang le leibole — se ke oa iqapa moralo oa hau oa nako.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le PDE5 inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ungaze udibanise namayeza e-nitrate ngaphandle kwengcebiso kagqirha.",
      "Iingcebiso ze-vardenafil zihlala zibandakanya intloko ebuhlungu, ukubomvu, nokuqapha utshintsho lokubona okanye lokuva ngequbuliso. I-Materia ayiyiqiqi idosi, iiyure zexesha, okanye amanqaku okuqina.",
      "Xelela usokhemisti ngesifo sentliziyo, ukusetyenziswa kwe-nitrate, i-alpha-blocker therapy, NAZO ZONKE ezinye iimveliso ze-PDE5.",
      "Xela iintlungu zesifuba ngexesha lesondo, ukuqina okubuhlungu okude kunengcebiso yeleyibhile, ukulahlekelwa ukubona ngequbuliso, okanye ukuva kwangoko.",
      "Buza indlela ukutya notywala okuhambelana ngayo nemveliso eneleyibhile — sukuyiqqa isicwangciso sakho sexesha.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-prednisolone-oral": five(
    [
      "Take this systemic corticosteroid exactly as directed on your labelled product — do not stop suddenly without your clinician’s plan.",
      "Prednisolone oral counselling commonly includes infection watch, mood change, and stomach protection discussions. Materia does not invent a dose, taper clock, or steroid score.",
      "Tell your pharmacist about diabetes, stomach ulcers, infection history, and ALL other steroid products on your list.",
      "Report fever, black stools, severe mood change, vision change, or unusual swelling early.",
      "Ask how missed doses and taper steps fit the labelled plan — do not invent a personal taper schedule.",
      "If you get severe allergic swelling, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le systemic corticosteroid njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kohlelo lukadokotela.",
      "Ukwelulekwa kwe-prednisolone oral kuvame ukufaka ukuqapha izifo, ukushintsha kwemizwa, nokuxoxa ngokuvikela isisu. I-Materia ayiqambi umthamo, iwashi lokunciphisa, noma isikali se-steroid.",
      "Tshela umkhiqizi nge-diabetes, izilonda zesisu, umlando wezifo, NAWO WONKE amanye amakhiqizo e-steroid.",
      "Bika umkhuhlane, indle emnyama, ukushintsha kwemizwa okukhulu, ukushintsha kokubona, noma ukuvuvuka okungajwayelekile ngokushesha.",
      "Buza ukuthi imithamo elahlekile nezinyathelo zokunciphisa zihambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lwakho lokunciphisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie sistemiese kortikosteroïed soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus se plan nie.",
      "Prednisolone-orale berading sluit dikwels infeksiewaak, gemoedverandering, en maagbeskermingsgesprekke in. Materia versin nie ’n dosis, afbouklok of steroïedtelling nie.",
      "Sê vir jou apteker van diabetes, maagsere, infeksiegeskiedenis, en ALLE ander steroïedprodukte op jou lys.",
      "Rapporteer koors, swart stoelgang, ernstige gemoedverandering, sigverandering, of ongewone swelling vroeg.",
      "Vra hoe gemiste dosisse en afboutrappe by die geëtiketteerde plan pas — moenie ’n persoonlike afbouskedule versin nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa systemic corticosteroid ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le moralo oa ngaka.",
      "Keletso ea prednisolone oral hangata e kenyelletsa ho hlokomela tšoaetso, phetoho ea maikutlo, le lipuisano tsa tšireletso ea mpeng. Materia ha e iqape tekanyo, nako ea ho fokotsa, kapa lintlha tsa steroid.",
      "Bolella rakhemisi ka diabetes, liso tsa mpeng, histori ea tšoaetso, le LIHLAHISWA TSOHLE tsa steroid.",
      "Tlaleha feberu, mantle a lefifi, phetoho ea maikutlo e matla, phetoho ea pono, kapa ho ruruha ho sa tloaelehang kapele.",
      "Botsa hore litekanyo tse lahlehileng le mehato ea ho fokotsa li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea hau ea ho fokotsa.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le systemic corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kwesicwangciso sikagqirha.",
      "Iingcebiso ze-prednisolone oral zihlala zibandakanya ukuqapha usulelo, utshintsho lwemvakalelo, neengxoxo zokukhusela isisu. I-Materia ayiyiqiqi idosi, iwotshi yokunciphisa, okanye amanqaku e-steroid.",
      "Xelela usokhemisti nge-diabetes, izilonda zesisu, imbali yosulelo, NAZO ZONKE ezinye iimveliso ze-steroid.",
      "Xela umkhuhlane, indle emnyama, utshintsho lwemvakalelo olunzima, utshintsho lokubona, okanye ukudumba okungaqhelekanga kwangoko.",
      "Buza indlela iidosi ezilahlekileyo namanyathelo okunciphisa ahambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yakho yokunciphisa.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-fludrocortisone": five(
    [
      "Take this mineralocorticoid exactly as directed on your labelled product — salt and fluid advice belongs with your clinician’s plan.",
      "Fludrocortisone counselling commonly includes blood-pressure and swelling watch. Materia does not invent a dose, sodium target, or blood-pressure target.",
      "Tell your pharmacist about heart failure, high blood pressure, kidney disease, and ALL other steroid or diuretic medicines on your list.",
      "Report rapid weight gain, severe headache, unusual swelling, or dizziness on standing early.",
      "Ask how missed doses fit the labelled plan — do not invent a personal catch-up schedule.",
      "If you get sudden chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le mineralocorticoid njengoba kubhalwe kumkhiqizo onelebula — iseluleko sikasawoti namanzi sihambisana nohlelo lukadokotela.",
      "Ukwelulekwa kwe-fludrocortisone kuvame ukufaka ukuqapha umfutho wegazi nokuvuvuka. I-Materia ayiqambi umthamo, umgomo we-sodium, noma umgomo womfutho wegazi.",
      "Tshela umkhiqizi nge-heart failure, umfutho wegazi ophezulu, isifo sezinso, NAWO WONKE amanye amaphilisi e-steroid noma e-diuretic.",
      "Bika ukwanda kwesisindo okusheshayo, ikhanda elibuhlungu kakhulu, ukuvuvuka okungajwayelekile, noma isiyezi uma umile ngokushesha.",
      "Buza ukuthi imithamo elahlekile ihambisana kanjani nohlelo lwelebula — ungayiqiqi uhlelo lwakho lokubuyisela.",
      "Uma uthola ubuhlungu besifuba obuzumayo, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie mineralokortikoïed soos op die geëtiketteerde produk aangedui — sout- en vloeistofadvies behoort by jou klinikus se plan.",
      "Fludrokortisoon-berading sluit dikwels bloeddruk- en swellingwaak in. Materia versin nie ’n dosis, natriumteiken of bloeddrukteiken nie.",
      "Sê vir jou apteker van hartversaking, hoë bloeddruk, niersiekte, en ALLE ander steroïed- of diuretikummedisyne op jou lys.",
      "Rapporteer vinnige gewigstoename, ernstige hoofpyn, ongewone swelling, of duiseligheid by staan vroeg.",
      "Vra hoe gemiste dosisse by die geëtiketteerde plan pas — moenie ’n persoonlike inhaalskedule versin nie.",
      "As jy skielike borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa mineralocorticoid ena hantle kamoo e hlalositsoeng holabel — keletso ea letsoai le metsi ke ea moralo oa ngaka.",
      "Keletso ea fludrocortisone hangata e kenyelletsa ho hlokomela khatello ea mali le ho ruruha. Materia ha e iqape tekanyo, sepheo sa sodium, kapa sepheo sa khatello ea mali.",
      "Bolella rakhemisi ka heart failure, khatello ea mali e phahameng, lefu la liphio, le MERIANA EOHLE ea steroid kapa diuretic.",
      "Tlaleha ho eketseha ha boima ka potlako, hlooho e bohloko haholo, ho ruruha ho sa tloaelehang, kapa ho tsekela ha u ema kapele.",
      "Botsa hore litekanyo tse lahlehileng li tšoana joang le moralo oa leibole — se ke oa iqapa kemiso ea hau ea ho tsosolosa.",
      "Haeba u fumana bohloko ba sefuba ka tšohanyetso, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le mineralocorticoid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ingcebiso yetyuwa namanzi ihamba nesicwangciso sikagqirha.",
      "Iingcebiso ze-fludrocortisone zihlala zibandakanya ukuqapha uxinzelelo lwegazi nokudumba. I-Materia ayiyiqiqi idosi, usukelo lwe-sodium, okanye usukelo loxinzelelo lwegazi.",
      "Xelela usokhemisti nge-heart failure, uxinzelelo lwegazi oluphezulu, isifo sezintso, NAWO ONKE amanye amayeza e-steroid okanye e-diuretic.",
      "Xela ukwanda kobunzima okukhawulezayo, intloko ebuhlungu kakhulu, ukudumba okungaqhelekanga, okanye isiyezi xa umile kwangoko.",
      "Buza indlela iidosi ezilahlekileyo ezihambelana ngayo nesicwangciso seleyibhile — sukuyiqqa ishedyuli yakho yokubuyisela.",
      "Ukuba ufumana iintlungu zesifuba ngequbuliso, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),
};
