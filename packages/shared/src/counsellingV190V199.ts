/**
 * v190–v199 deepened SA counselling batch (6 lines × 5 langs).
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

export const COUNSELLING_V190_TO_V199: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-eplerenone": five(
    [
      "Take this mineralocorticoid-receptor antagonist exactly as directed on your labelled product — potassium monitoring is common counselling.",
      "Eplerenone counselling commonly includes high-potassium watch (weakness, irregular heartbeat) and not combining with potassium supplements unless your clinician agrees. Materia does not invent a dose or potassium target.",
      "Tell your pharmacist about kidney disease, ACE inhibitors / ARBs, potassium-sparing diuretics, and salt substitutes on your list.",
      "Report severe muscle weakness, palpitations, or reduced urine early for clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you collapse, seize, get severe chest pain, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le mineralocorticoid-receptor antagonist njengoba kubhalwe kumkhiqizo onelebula — ukuqapha i-potassium kuvame ukufundiswa.",
      "Ukwelulekwa kwe-eplerenone kuvame ukufaka ukugada i-potassium ephezulu (ubuthakathaka, ukushaya kwenhliziyo okungajwayelekile) nokungahlanganisi nezithasiselo ze-potassium ngaphandle kokuvuma kukadokotela. I-Materia ayiqambi umthamo noma umgomo we-potassium.",
      "Tshela umkhiqizi ngesifo sezinso, ama-ACE inhibitor / ARB, ama-diuretic agcina i-potassium, nezithasiselo zosawoti ohlwini lwakho.",
      "Bika ubuthakathaka bemisipha obukhulu, ukushaya kwenhliziyo, noma umchamo omncane ngokushesha ukuze kubuyekezwe kudokotela.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uwa, uxhuzula, uthola ubuhlungu besifuba obukhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie mineralokortikoïed-reseptorantagonis soos op die geëtiketteerde produk aangedui — kaliummonitering is algemene berading.",
      "Eplerenoon-berading sluit dikwels hoë-kalium-waak in (swakheid, onreëlmatige hartklop) en om nie met kaliumaanvullings te kombineer tensy jou klinikus saamstem nie. Materia versin nie ’n dosis of kaliumteiken nie.",
      "Sê vir jou apteker van niersiekte, AGE-inhibeerders / ARBs, kaliumsparende diuretika, en soutervangers op jou lys.",
      "Rapporteer ernstige spierswakheid, hartklopgings, of verminderde urine vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ineenstort, stuiptrek, ernstige borspyn of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa mineralocorticoid-receptor antagonist ena hantle kamoo e hlalositsoeng holabel — ho hlokomela potassium ke keletso e tloaelehileng.",
      "Keletso ea eplerenone hangata e kenyelletsa ho hlokomela potassium e phahameng (bofokoli, ho otla ha pelo ho sa tloaelehang) le ho se e kopanye le litlatsetso tsa potassium ntle le tumellano ea ngaka. Materia ha e iqape tekanyo kapa sepheo sa potassium.",
      "Bolella rakhemisi ka lefu la liphio, li-ACE inhibitor / ARB, li-diuretic tse bolokang potassium, le litlatsetso tsa letsoai lenaneng la hau.",
      "Tlaleha bofokoli ba mesifa bo matla, ho otla ha pelo, kapa moroto o fokotsehileng kapele bakeng sa tlhahlobo ea ngaka.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u oa, u thothomela, u fumana bohloko ba sefuba bo matla, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le mineralocorticoid-receptor antagonist ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukuqapha i-potassium kuhlala kufundiswa.",
      "Iingcebiso ze-eplerenone zihlala zibandakanya ukuqapha i-potassium ephezulu (ubuthathaka, ukubetha kwentliziyo okungaqhelekanga) nokungadibanisi nezongezelelo ze-potassium ngaphandle kokuvuma kugqirha. I-Materia ayiyiqiqi idosi okanye usukelo lwe-potassium.",
      "Xelela usokhemisti ngesifo sezintso, ii-ACE inhibitor / ARB, ii-diuretic ezigcina i-potassium, nezongezelelo zetyuwa kuluhlu lwakho.",
      "Xela ubuthathaka bemisipha obunzima, ukubetha kwentliziyo, okanye umchamo omncinci kwangoko ukuze kujongwe kugqirha.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba uwa, uyaxhuzula, ufumana iintlungu zesifuba ezinzima, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-mefenamic-acid": five(
    [
      "Take this NSAID exactly as directed on your labelled product — often with food for stomach comfort; confirm the label.",
      "Mefenamic acid counselling commonly includes period-pain use windows and stomach-bleed caution. Materia does not invent a dose, day-count, or pain score.",
      "Tell your pharmacist about ulcer history, kidney disease, pregnancy plans, asthma with NSAID sensitivity, and ALL other pain medicines.",
      "Avoid combining with other over-the-counter NSAIDs unless your clinician agrees — check the labelled product.",
      "Report black stools, coffee-ground vomit, swelling of ankles, or reduced urine early.",
      "If you vomit blood, get sudden severe chest pain, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le NSAID njengoba kubhalwe kumkhiqizo onelebula — kuvame ukuba nokudla ukuze isisu sithule; qinisekisa ilebula.",
      "Ukwelulekwa kwe-mefenamic acid kuvame ukufaka izikhala zokusebenzisa ubuhlungu benyanga nokuqapha ukopha kwesisu. I-Materia ayiqambi umthamo, inani lezinsuku, noma isikali sobuhlungu.",
      "Tshela umkhiqizi ngomlando wesilonda, isifo sezinso, izinhlelo zokukhulelwa, i-asthma ene-NSAID sensitivity, NAWO WONKE amanye amaphilisi obuhlungu.",
      "Gwema ukuhlanganisa namanye ama-NSAID athengwa ngaphandle kophawu ngaphandle kokuvuma kukadokotela — hlola umkhiqizo onelebula.",
      "Bika izindlebe ezimnyama, ukuhlanza okufana nekofi, ukuvuvuka kwamaqakala, noma umchamo omncane ngokushesha.",
      "Uma uhlanza igazi, uthola ubuhlungu besifuba obuzumayo, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie NSAID soos op die geëtiketteerde produk aangedui — dikwels met kos vir maaggemak; bevestig die etiket.",
      "Mefenamienzuur-berading sluit dikwels menstruasiepyn-gebruikvensters en maagbloeding-versigtigheid in. Materia versin nie ’n dosis, dagtelling of pyntelling nie.",
      "Sê vir jou apteker van ulkusgeskiedenis, niersiekte, swangerskapsplanne, asma met NSAID-sensitiwiteit, en ALLE ander pynmedisyne.",
      "Vermy kombinasie met ander oor-die-toonbank NSAIDs tensy jou klinikus saamstem — kontroleer die geëtiketteerde produk.",
      "Rapporteer swart stoelgang, koffiegrond-braking, enkelswelling, of verminderde urine vroeg.",
      "As jy bloed braak, skielike ernstige borspyn, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa NSAID ena hantle kamoo e hlalositsoeng holabel — hangata le lijo bakeng sa boiketlo ba mpeng; netefatsa leibole.",
      "Keletso ea mefenamic acid hangata e kenyelletsa linako tsa tšebeliso ea bohloko ba khoeli le tlhokomelo ea ho tsoa mali ka mpeng. Materia ha e iqape tekanyo, palo ea matsatsi, kapa lintlha tsa bohloko.",
      "Bolella rakhemisi ka histori ea leqeba, lefu la liphio, merero ea ho ima, asthma e nang le NSAID sensitivity, le MERIANA EOHLE ea bohloko.",
      "Qoba ho kopanya le li-NSAID tse ling tsa over-the-counter ntle le tumellano ea ngaka — hlahloba sehlahiswa se nang le leibole.",
      "Tlaleha litšila tse ntšo, ho hlatsa ho kang kofi, ho ruruha ha maqaqailana, kapa moroto o fokotsehileng kapele.",
      "Haeba u hlatsa mali, u fumana bohloko ba sefuba bo matla ka tšohanyetso, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le NSAID ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ihlala isetyenziswa nokutya ukuze isisu sithule; qinisekisa ileyibhile.",
      "Iingcebiso ze-mefenamic acid zihlala zibandakanya iifestile zokusebenzisa iintlungu zenyanga nokulumka ngokopha kwesisu. I-Materia ayiyiqiqi idosi, inani leentsuku, okanye amanqaku eentlungu.",
      "Xelela usokhemisti ngembali yesilonda, isifo sezintso, izicwangciso zokukhulelwa, i-asthma ene-NSAID sensitivity, NAWO ONKE amanye amayeza eentlungu.",
      "Pepa ukudibanisa nezinye ii-NSAID ezithengwa ngaphandle kophawu ngaphandle kokuvuma kugqirha — jonga imveliso eneleyibhile.",
      "Xela izindlebe ezimnyama, ukuhlanza okufana nekofu, ukudumba kwamaqakala, okanye umchamo omncinci kwangoko.",
      "Ukuba uhlanza igazi, ufumana iintlungu zesifuba ezingxamisekileyo, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-sildenafil": five(
    [
      "Take this PDE5 inhibitor exactly as directed on your labelled product — sexual stimulation is still required for effect; confirm timing against the label.",
      "Sildenafil counselling’s non-negotiable hook is never combining with nitrates or recreational nitrite “poppers”. Materia does not invent a dose, timing hours, or blood-pressure target.",
      "Tell your pharmacist about chest-pain history, recent heart events, blood-pressure medicines, and ALL other erectile-dysfunction products.",
      "Report sudden vision or hearing change early — stop and seek urgent clinician review as advised on the labelled product.",
      "Ask how alcohol and heavy meals affect your labelled product — do not invent a meal clock.",
      "If you get chest pain, fainting, a painful erection lasting far too long, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le PDE5 inhibitor njengoba kubhalwe kumkhiqizo onelebula — ukukhuthazwa kocansi kusadingeka ukuze kusebenze; qinisekisa isikhathi kulebula.",
      "Ukwelulekwa kwe-sildenafil okungaxoxwa ngakho kungahlanganisi nama-nitrate noma ama-nitrite “poppers”. I-Materia ayiqambi umthamo, amahora esikhathi, noma umgomo womfutho wegazi.",
      "Tshela umkhiqizi ngomlando wobuhlungu besifuba, izehlakalo zenhliziyo zakamuva, amaphilisi omfutho wegazi, NAWO WONKE amanye amakhiqizo okungaqini kwenhliziyo yobulili.",
      "Bika ukushintsha kokubona noma ukuzwa okuzumayo ngokushesha — yeka futhi funa ukubuyekezwa okuphuthumayo njengoba ilebula isho.",
      "Buza ukuthi utshwala nokudla okusindayo kuthinta kanjani umkhiqizo onelebula — ungayiqiqi iwashi lokudla.",
      "Uma uthola ubuhlungu besifuba, ukuwa, ukuqina okubuhlungu okuthatha isikhathi eside kakhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie PDE5-inhibeerder soos op die geëtiketteerde produk aangedui — seksuele stimulasie is steeds nodig vir effek; bevestig tydsberekening teen die etiket.",
      "Sildenafil-berading se nie-onderhandelbare haak is om nooit met nitrate of ontspanningsnitriet-“poppers” te kombineer nie. Materia versin nie ’n dosis, tydsure of bloeddrukteiken nie.",
      "Sê vir jou apteker van borspyn-geskiedenis, onlangse hartvoorvalle, bloeddrukmedisyne, en ALLE ander erektiele-disfunksieprodukte.",
      "Rapporteer skielike sig- of gehoorverandering vroeg — stop en soek dringende klinikus-hersiening soos die geëtiketteerde produk adviseer.",
      "Vra hoe alkohol en swaar maaltye jou geëtiketteerde produk beïnvloed — moenie ’n maaltydklok versin nie.",
      "As jy borspyn, floute, ’n pynlike ereksie wat veels te lank duur, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa PDE5 inhibitor ena hantle kamoo e hlalositsoeng holabel — ts'usumetso ea thobalano e ntse e hlokahala bakeng sa phello; netefatsa nako holabel.",
      "Keletso ea sildenafil e sa buisanoeng ke ho se e kopanye le li-nitrate kapa li-nitrite tsa boithabiso “poppers”. Materia ha e iqape tekanyo, lihora tsa nako, kapa sepheo sa khatello ea mali.",
      "Bolella rakhemisi ka histori ea bohloko ba sefuba, liketsahalo tsa pelo tsa morao-rao, meriana ea khatello ea mali, le LIHLAHISWA TSOHLE tsa erectile dysfunction.",
      "Tlaleha phetoho ea pono kapa kutlo ka tšohanyetso kapele — emisa 'me u batle tlhahlobo ea ngaka ea potlako kamoo leibole e eletsang.",
      "Botsa hore joala le lijo tse boima li ama joang sehlahiswa sa hau se nang le leibole — se ke oa iqapa nako ea lijo.",
      "Haeba u fumana bohloko ba sefuba, ho akheha, ho otlolla ha botona bo bohloko bo nkang nako e telele haholo, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le PDE5 inhibitor ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukukhuthazwa kocansi kusafuneka ukuze kusebenze; qinisekisa ixesha kwileyibhile.",
      "Iingcebiso ze-sildenafil ezingaxoxwa ngazo kukungaze udibanise nee-nitrate okanye ii-nitrite zokuzonwabisa “poppers”. I-Materia ayiyiqiqi idosi, iiyure zexesha, okanye usukelo loxinzelelo lwegazi.",
      "Xelela usokhemisti ngembali yeentlungu zesifuba, iziganeko zentliziyo zakutshanje, amayeza oxinzelelo lwegazi, NAZO ZONKE ezinye iimveliso zokungaqini kobudoda.",
      "Xela utshintsho lokubona okanye ukuva ngequbuliso kwangoko — yeka uze ufumane ukujongwa kugqirha ngokukhawuleza njengoko ileyibhile icebisa.",
      "Buza indlela utywala nezidlo ezinzima ezichaphazela ngayo imveliso yakho eneleyibhile — sukuyiqqa iwotshi yokutya.",
      "Ukuba ufumana iintlungu zesifuba, ukuwa, ukuqina kobudoda obubuhlungu obuthatha ixesha elide kakhulu, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-oxybutynin": five(
    [
      "Take this antimuscarinic exactly as directed on your labelled product — tablets and patches differ; confirm the form you were given.",
      "Oxybutynin counselling commonly includes dry mouth, constipation, blurred vision, and heat intolerance. Materia does not invent a dose or bladder score.",
      "Tell your pharmacist about glaucoma, bowel obstruction concerns, myasthenia, and ALL other anticholinergic medicines.",
      "Avoid driving if vision blurs or you feel drowsy until you know your response.",
      "Report inability to pass urine, severe constipation, or confusion early — especially in older adults.",
      "If you get eye pain with vision loss, collapse, or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antimuscarinic njengoba kubhalwe kumkhiqizo onelebula — amaphilisi nama-patch ayahluka; qinisekisa uhlobo olunikiwe.",
      "Ukwelulekwa kwe-oxybutynin kuvame ukufaka umlomo owomile, ukuqina kwamathumbu, ukubona okufiphele, nokungabekezeleli ukushisa. I-Materia ayiqambi umthamo noma isikali sesinye.",
      "Tshela umkhiqizi nge-glaucoma, ukuvinjwa kwamathumbu, i-myasthenia, NAWO WONKE amanye ama-anticholinergic.",
      "Gwema ukushayela uma ukubona kufiphele noma uozela kuze wazi impendulo yakho.",
      "Bika ukungakwazi ukuchama, ukuqina kwamathumbu okukhulu, noma ukudideka ngokushesha — ikakhulukazi kubantu abadala.",
      "Uma uthola ubuhlungu beso nokulahlekelwa ukubona, ukuwa, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie antimuskariniese middel soos op die geëtiketteerde produk aangedui — tablette en pleisters verskil; bevestig die vorm wat jy ontvang het.",
      "Oksibutinien-berading sluit dikwels droë mond, hardlywigheid, dowwe sig, en hitte-onverdraagsaamheid in. Materia versin nie ’n dosis of blaas telling nie.",
      "Sê vir jou apteker van gloukoom, dermobstruksie-kommer, miastenie, en ALLE ander anticholinergiese medisyne.",
      "Vermy bestuur as sig dowwe word of jy slaperig voel totdat jy jou reaksie ken.",
      "Rapporteer onvermoë om urine te passeer, ernstige hardlywigheid, of verwarring vroeg — veral by ouer volwassenes.",
      "As jy oorpyn met sigverlies, ineenstorting, of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antimuscarinic ena hantle kamoo e hlalositsoeng holabel — litafole le li-patch lia fapana; netefatsa mofuta oo o fileng.",
      "Keletso ea oxybutynin hangata e kenyelletsa molomo o omeletseng, ho thatafala ha mala, pono e lerootho, le ho se mamelle mocheso. Materia ha e iqape tekanyo kapa lintlha tsa senya.",
      "Bolella rakhemisi ka glaucoma, ho thibeloa ha mala, myasthenia, le MERIANA EOHLE ea anticholinergic.",
      "Qoba ho khanna haeba pono e lerootho kapa u otsela ho fihlela u tseba karabelo ea hau.",
      "Tlaleha ho sitoa ho ntša moroto, ho thatafala ha mala ho matla, kapa ho ferekana kapele — haholo-holo ho batho ba baholo.",
      "Haeba u fumana bohloko ba leihlo ka tahlehelo ea pono, ho oa, kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antimuscarinic ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iipilisi nee-patch ziyahluka; qinisekisa uhlobo olunikwe.",
      "Iingcebiso ze-oxybutynin zihlala zibandakanya umlomo owomileyo, ukuqina kwamathumbu, ukubona okufipheleyo, nokunganyamezeli ubushushu. I-Materia ayiyiqiqi idosi okanye amanqaku esinyi.",
      "Xelela usokhemisti nge-glaucoma, ukuthintelwa kwamathumbu, i-myasthenia, NAZO ZONKE ezinye ii-anticholinergic.",
      "Pepa ukuqhuba ukuba ukubona kuyafiphala okanye uyalala de uyazi impendulo yakho.",
      "Xela ukungakwazi ukuchama, ukuqina kwamathumbu okunzima, okanye ukudideka kwangoko — ngakumbi kubantu abadala.",
      "Ukuba ufumana iintlungu zeliso kunye nokulahlekelwa kukubona, ukuwa, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-insulin-human": five(
    [
      "Use this human insulin exactly as directed on your labelled product — pens, vials, and mixes differ; confirm the form and device you were given.",
      "Human insulin counselling commonly includes hypo recognition, site rotation, and never sharing needles. Materia does not invent a dose, carb ratio, or glucose target.",
      "Tell your pharmacist about meal pattern changes, illness with reduced eating, steroids, and ALL other diabetes medicines.",
      "Carry your clinician’s hypo plan — report severe or recurrent hypos early for review.",
      "Ask how storage and load-shedding affect your labelled product — do not invent fridge temperatures or a sick-day insulin schedule.",
      "If you cannot swallow, seize, lose consciousness, or remain confused after hypo treatment — seek emergency care.",
    ],
    [
      "Sebenzisa le human insulin njengoba kubhalwe kumkhiqizo onelebula — amapeni, amavials, nezinhlanganisela ziyahluka; qinisekisa uhlobo nedivayisi.",
      "Ukwelulekwa kwe-human insulin kuvame ukufaka ukwazi i-hypo, ukushintsha indawo yokujova, nokungabelani ngezinalithi. I-Materia ayiqambi umthamo, i-carb ratio, noma umgomo kashukela.",
      "Tshela umkhiqizi ngokushintsha kwendlela yokudla, ukugula nokudla okuncane, ama-steroid, NAWO WONKE amanye amaphilisi esifo sikashukela.",
      "Phatha uhlelo lwedokotela lwe-hypo — bika ama-hypo amakhulu noma aphindaphindayo ngokushesha.",
      "Buza ukuthi ukugcinwa ne-load-shedding kuthinta kanjani umkhiqizo onelebula — ungayiqiqi amazinga efriji noma uhlelo lwe-insulin lwezinsuku zokugula.",
      "Uma ungakwazi ukugwinya, uxhuzula, ulahlekelwa ukwazi, noma uhlala udidekile ngemva kokwelapha i-hypo — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie menslike insulina soos op die geëtiketteerde produk aangedui — penne, vialle en mengsels verskil; bevestig die vorm en toestel wat jy ontvang het.",
      "Menslike-insulina-berading sluit dikwels hipo-herkenning, plekrotasie, en nooit naalde deel nie. Materia versin nie ’n dosis, koolhidraatverhouding of glukoseteiken nie.",
      "Sê vir jou apteker van maaltydpatroonveranderinge, siekte met minder eet, steroïede, en ALLE ander diabetesmedisyne.",
      "Dra jou klinikus se hipo-plan — rapporteer ernstige of herhaalde hipos vroeg vir hersiening.",
      "Vra hoe berging en beurtkrag jou geëtiketteerde produk beïnvloed — moenie yskastemperature of ’n siektedag-insulinskedeule versin nie.",
      "As jy nie kan sluk nie, stuiptrekkings kry, bewusteloos raak, of verward bly ná hipo-behandeling — soek noodhulp.",
    ],
    [
      "Sebelisa human insulin ena hantle kamoo e hlalositsoeng holabel — lipene, li-vial, le metsoako ea fapana; netefatsa mofuta le sesebelisoa.",
      "Keletso ea human insulin hangata e kenyelletsa ho tseba hypo, ho potoloha ha sebaka, le ho se arolelane linekele. Materia ha e iqape tekanyo, carb ratio, kapa sepheo sa tsoekere.",
      "Bolella rakhemisi ka liphetoho tsa mokhoa oa lijo, ho kula ka ho ja ho fokolang, li-steroid, le MERIANA EOHLE ea diabetes.",
      "Jara moralo oa ngaka oa hypo — tlaleha li-hypo tse matla kapa tse iphetang kapele bakeng sa tlhahlobo.",
      "Botsa hore polokelo le load-shedding li ama joang sehlahiswa sa hau se nang le leibole — se ke oa iqapa mocheso oa sehatsetsi kapa kemiso ea insulin ea matsatsi a ho kula.",
      "Haeba u sitoa ho koenya, u thothomela, u lahleheloa ke kelello, kapa u lula u ferekane ka mor'a kalafo ea hypo — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le human insulin ngokuchanekileyo njengoko kubhaliwe kwileyibhile — iipeni, iivials, nezidibaniso ziyahluka; qinisekisa uhlobo nesixhobo.",
      "Iingcebiso ze-human insulin zihlala zibandakanya ukwazi i-hypo, ukujikeleza indawo yokutofa, nokungabelani ngeenale. I-Materia ayiyiqiqi idosi, i-carb ratio, okanye usukelo lweswekile.",
      "Xelela usokhemisti ngotshintsho lwendlela yokutya, ukugula ngokutya okuncinci, ii-steroid, NAWO ONKE amanye amayeza esifo seswekile.",
      "Phatha isicwangciso sogqirha se-hypo — xela ii-hypo ezinzima okanye eziphindaphindayo kwangoko.",
      "Buza indlela ugcino ne-load-shedding ezichaphazela ngayo imveliso yakho eneleyibhile — sukuyiqqa amaqondo efriji okanye ishedyuli ye-insulin yeentsuku zokugula.",
      "Ukuba awukwazi ukuginya, uyaxhuzula, uphulukana nokuqonda, okanye uhlala udidekile emva konyango lwe-hypo — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-mometasone": five(
    [
      "Use this potent topical corticosteroid exactly as directed on your labelled product — thin layer to affected skin only; confirm the label.",
      "Mometasone counselling commonly includes not using on the face, groin, or broken skin unless your clinician says so. Materia does not invent a finger-tip unit count or course length.",
      "Tell your pharmacist about infection in the treated area, other steroid creams, and pregnancy or breastfeeding plans.",
      "Wash hands after application unless hands are the treated area — report skin thinning or stretch marks early.",
      "Ask how long the labelled course should run — do not invent a stop date or a rebound plan.",
      "If you get spreading infection, severe blistering, or allergic swelling with trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le potent topical corticosteroid njengoba kubhalwe kumkhiqizo onelebula — ungqimba omncane esikhumbeni esithintekile kuphela; qinisekisa ilebula.",
      "Ukwelulekwa kwe-mometasone kuvame ukufaka ukungasebenzisi ebusweni, ezinyeni, noma esikhumbeni esaphukile ngaphandle kokusho kukadokotela. I-Materia ayiqambi inani le-finger-tip unit noma ubude benkambo.",
      "Tshela umkhiqizi ngesifo endaweni elashwayo, amanye ama-cream e-steroid, nezinhlelo zokukhulelwa noma zokuncelisa.",
      "Geza izandla ngemva kokufaka ngaphandle uma izandla ziyindawo elashwayo — bika ukuncipha kwesikhumba noma imivimbo yokunwebeka ngokushesha.",
      "Buza ukuthi inkambo yelebula kufanele iqhubeke isikhathi esingakanani — ungayiqiqi usuku lokuyeka noma uhlelo lokubuyela.",
      "Uma uthola isifo esanda, amaqhubu amakhulu, noma ukuvuvuka kwe-allergy nokuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie potente topiese kortikosteroïed soos op die geëtiketteerde produk aangedui — dun laag slegs op aangetaste vel; bevestig die etiket.",
      "Mometasoon-berading sluit dikwels in om nie op die gesig, lies of gebreekte vel te gebruik tensy jou klinikus so sê nie. Materia versin nie ’n vingerpunt-eenheidtelling of kuurduur nie.",
      "Sê vir jou apteker van infeksie in die behandelde area, ander steroïedrome, en swangerskap- of borsvoedingplanne.",
      "Was hande ná aanwending tensy hande die behandelde area is — rapporteer velverdunning of strekmerke vroeg.",
      "Vra hoe lank die geëtiketteerde kuur moet loop — moenie ’n stopdatum of terugslagplan versin nie.",
      "As jy verspreidende infeksie, ernstige blistering, of allergiese swelling met asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa potent topical corticosteroid ena hantle kamoo e hlalositsoeng holabel — lera le tšesafe letlalong le amehileng feela; netefatsa leibole.",
      "Keletso ea mometasone hangata e kenyelletsa ho se sebelise sefahlehong, lithoeng, kapa letlalo le robehileng ntle le ha ngaka e re joalo. Materia ha e iqape palo ea finger-tip unit kapa bolelele ba thuto.",
      "Bolella rakhemisi ka tšoaetso sebakeng se alafuoang, li-cream tse ling tsa steroid, le merero ea ho ima kapa ho anyesa.",
      "Hlatsoa matsoho ka mor'a ho sebelisa ntle le haeba matsoho e le sebaka se alafuoang — tlaleha ho ohla ha letlalo kapa matšoao a ho otlolla kapele.",
      "Botsa hore thuto ea leibole e lokela ho tsoela pele nako e kae — se ke oa iqapa letsatsi la ho emisa kapa moralo oa ho khutla.",
      "Haeba u fumana tšoaetso e atolohang, lihlabana tse matla, kapa ho ruruha ha allergy ka ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le potent topical corticosteroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — umaleko ocekeceke kulusu oluchaphazelekileyo kuphela; qinisekisa ileyibhile.",
      "Iingcebiso ze-mometasone zihlala zibandakanya ukungasebenzisi ebusweni, ezinyeni, okanye eluswini olwaphukileyo ngaphandle kokuba ugqirha athi kunjalo. I-Materia ayiyiqiqi inani le-finger-tip unit okanye ubude bekhosi.",
      "Xelela usokhemisti ngosulelo kwindawo enyangwayo, ezinye ii-cream ze-steroid, nezicwangciso zokukhulelwa okanye zokuncancisa.",
      "Hlamba izandla emva kokufaka ngaphandle kokuba izandla ziyindawo enyangwayo — xela ukuncipha kolusu okanye imivimbo yokunwebeka kwangoko.",
      "Buza indlela ikhosi yeleyibhile ekufanele iqhubeke ngayo — sukuyiqqa umhla wokuyeka okanye isicwangciso sokubuyela.",
      "Ukuba ufumana usulelo olusasazekayo, amaqhuma anzima, okanye ukudumba kwe-allergy noxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-fexofenadine": five(
    [
      "Take this non-sedating antihistamine exactly as directed on your labelled product — confirm timing against the label.",
      "Fexofenadine counselling commonly includes less drowsiness than older antihistamines; fruit juice may reduce absorption for some products — confirm the label. Materia does not invent a dose or sedation score.",
      "Tell your pharmacist about kidney history and ALL other antihistamines or cold medicines on your list.",
      "Report severe dizziness, palpitations, or widespread rash early for clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le antihistamine engaozelisi kakhulu njengoba kubhalwe kumkhiqizo onelebula — qinisekisa isikhathi kulebula.",
      "Ukwelulekwa kwe-fexofenadine kuvame ukufaka ukozela okuncane; ijusi yezithelo inganciphisa ukumunca kweminye imikhiqizo — qinisekisa ilebula. I-Materia ayiqambi umthamo noma isikali sokozela.",
      "Tshela umkhiqizi ngomlando wezinso NAWO WONKE amanye ama-antihistamine noma amaphilisi engcongolo.",
      "Bika isiyezi esikhulu, ukushaya kwenhliziyo, noma ukuqubuka okusabalele ngokushesha ukuze kubuyekezwe kudokotela.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie nie-sederende antihistamien soos op die geëtiketteerde produk aangedui — bevestig tydsberekening teen die etiket.",
      "Fexofenadien-berading sluit dikwels minder slaperigheid as ouer antihistamiene in; vrugtesap mag absorpsie vir sommige produkte verminder — bevestig die etiket. Materia versin nie ’n dosis of sedasietelling nie.",
      "Sê vir jou apteker van niergeskiedenis en ALLE ander antihistamiene of verkouemedisyne op jou lys.",
      "Rapporteer ernstige duiseligheid, hartklopgings, of wydverspreide uitslag vroeg vir klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa antihistamine e sa otseleng haholo hantle kamoo e hlalositsoeng holabel — netefatsa nako holabel.",
      "Keletso ea fexofenadine hangata e kenyelletsa ho otsela ho fokolang; lero la litholoana le ka fokotsa ho monya bakeng sa lihlahiswa tse ling — netefatsa leibole. Materia ha e iqape tekanyo kapa lintlha tsa ho otsela.",
      "Bolella rakhemisi ka histori ea liphio le LI-ANTIHISTAMINE KAPA MERIANA EA SEFUBA EOHLE.",
      "Tlaleha ho tsekela ho matla, ho otla ha pelo, kapa lekhopho le atileng kapele bakeng sa tlhahlobo ea ngaka.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le antihistamine engaozelisiyo kakhulu ngokuchanekileyo njengoko kubhaliwe kwileyibhile — qinisekisa ixesha kwileyibhile.",
      "Iingcebiso ze-fexofenadine zihlala zibandakanya ukozela okuncinci; ijusi yeziqhamo inokunciphisa ukufunxa kwezinye iimveliso — qinisekisa ileyibhile. I-Materia ayiyiqiqi idosi okanye amanqaku okozela.",
      "Xelela usokhemisti ngembali yezintso NAZO ZONKE ezinye ii-antihistamine okanye amayeza engqele kuluhlu lwakho.",
      "Xela isiyezi esinzima, ukubetha kwentliziyo, okanye irhashalala esasazekileyo kwangoko ukuze kujongwe kugqirha.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-ketoconazole": five(
    [
      "Use this azole antifungal (cream or shampoo) exactly as directed on your labelled product — confirm whether your product is leave-on or rinse-off.",
      "Ketoconazole topical counselling commonly includes completing the labelled course and keeping product out of eyes. Materia does not invent a dose, application clock, or course length.",
      "Tell your pharmacist about broken skin, other topical antifungals or steroids in the same area, and pregnancy plans.",
      "Report worsening redness, burning, or spreading rash early for clinician review.",
      "Ask how often shampoo contact time should be on your labelled product — do not invent minutes.",
      "If you get severe allergic swelling of the face/throat or trouble breathing — seek emergency care.",
    ],
    [
      "Sebenzisa le azole antifungal (cream noma i-shampoo) njengoba kubhalwe kumkhiqizo onelebula — qinisekisa ukuthi umkhiqizo wakho uyashiywa noma uyagezwa.",
      "Ukwelulekwa kwe-ketoconazole topical kuvame ukufaka ukuqedela inkambo yelebula nokugcina umkhiqizo ungayi emehlweni. I-Materia ayiqambi umthamo, iwashi lokufaka, noma ubude benkambo.",
      "Tshela umkhiqizi ngesikhumba esaphukile, amanye ama-antifungal noma ama-steroid endaweni efanayo, nezinhlelo zokukhulelwa.",
      "Bika ukubomvu okuya ngokuba kubi, ukusha, noma ukuqubuka okusabalele ngokushesha ukuze kubuyekezwe kudokotela.",
      "Buza ukuthi isikhathi sokuthinta i-shampoo kufanele sibe yisiphi kumkhiqizo onelebula — ungayiqiqi amaminithi.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu kobuso/umphimbo noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
    ],
    [
      "Gebruik hierdie asool-antimikotikum (room of sjampoe) soos op die geëtiketteerde produk aangedui — bevestig of jou produk laat-aan of spoel-af is.",
      "Ketokonasool-topiese berading sluit dikwels in om die geëtiketteerde kuur te voltooi en produk uit die oë te hou. Materia versin nie ’n dosis, aanwendingsklok of kuurduur nie.",
      "Sê vir jou apteker van gebreekte vel, ander topiese antimikotika of steroïede in dieselfde area, en swangerskapsplanne.",
      "Rapporteer erger wordende rooiheid, brand, of verspreidende uitslag vroeg vir klinikus-hersiening.",
      "Vra hoe lank sjampoe-kontaktyd op jou geëtiketteerde produk moet wees — moenie minute versin nie.",
      "As jy ernstige allergiese swelling van die gesig/keel of asemhalingsprobleme kry — soek noodhulp.",
    ],
    [
      "Sebelisa azole antifungal ena (cream kapa shampoo) hantle kamoo e hlalositsoeng holabel — netefatsa hore na sehlahiswa sa hau ke sa ho siea kapa sa ho hlatsoa.",
      "Keletso ea ketoconazole topical hangata e kenyelletsa ho qeta thuto ea leibole le ho boloka sehlahiswa hole le mahlo. Materia ha e iqape tekanyo, nako ea ho sebelisa, kapa bolelele ba thuto.",
      "Bolella rakhemisi ka letlalo le robehileng, li-antifungal kapa li-steroid tse ling sebakeng se tšoanang, le merero ea ho ima.",
      "Tlaleha bofubelu bo mpefalang, ho chesa, kapa lekhopho le atileng kapele bakeng sa tlhahlobo ea ngaka.",
      "Botsa hore nako ea ho kopana ha shampoo e lokela ho ba bokae holabel — se ke oa iqapa metsotso.",
      "Haeba u fumana ho ruruha ha allergy ho matla ha sefahleho/mokgojo kapa ho hema thata — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le azole antifungal (cream okanye i-shampoo) ngokuchanekileyo njengoko kubhaliwe kwileyibhile — qinisekisa ukuba imveliso yakho iyashiywa okanye iyahlanjwa.",
      "Iingcebiso ze-ketoconazole topical zihlala zibandakanya ukugqiba ikhosi yeleyibhile nokugcina imveliso ingayi emehlweni. I-Materia ayiyiqiqi idosi, iwotshi yokufaka, okanye ubude bekhosi.",
      "Xelela usokhemisti ngolusu olwaphukileyo, ezinye ii-antifungal okanye ii-steroid kwindawo efanayo, nezicwangciso zokukhulelwa.",
      "Xela ukubomvu okubiayo, ukutsha, okanye irhashalala esasazekayo kwangoko ukuze kujongwe kugqirha.",
      "Buza indlela ixesha lokuchukumisa i-shampoo elifanele libe yilo kwileyibhile — sukuyiqqa imizuzu.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima kobuso/umqala okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-salmeterol": five(
    [
      "Use this long-acting beta-agonist exactly as directed on your labelled product — alone or in a combination inhaler as prescribed.",
      "Salmeterol counselling commonly includes not using it as the only asthma controller unless your clinician’s plan says so. Materia does not invent a puff count or step-up plan.",
      "Tell your pharmacist about heart rhythm history, tremor, and ALL other inhalers or nebuliser medicines on your list.",
      "Report chest pain, palpitations, worsening wheeze, or needing rescue more often early.",
      "Ask how this fits with your inhaled steroid preventer — do not invent a solo controller regimen.",
      "If breathing collapses, lips turn blue, or you cannot speak full sentences — seek emergency care and follow your written action plan.",
    ],
    [
      "Sebenzisa le long-acting beta-agonist njengoba kubhalwe kumkhiqizo onelebula — wedwa noma kuhlanganiswe ne-inhaler njengoba kunikiwe.",
      "Ukwelulekwa kwe-salmeterol kuvame ukufaka ukungayisebenzisi iyodwa njenge-controller ye-asthma ngaphandle kohlelo lukadokotela. I-Materia ayiqambi inani lamaphafu noma uhlelo lokunyuka.",
      "Tshela umkhiqizi ngomlando wesivinini senhliziyo, ukuthuthumela, NAWO WONKE amanye ama-inhaler noma amaphilisi e-nebuliser.",
      "Bika ubuhlungu besifuba, ukushaya kwenhliziyo, ukubhobha okuya ngokuba kubi, noma ukudinga i-rescue kaningi ngokushesha.",
      "Buza ukuthi lokhu kuhambisana kanjani ne-inhaled steroid preventer yakho — ungayiqiqi uhlelo lwe-controller eyedwa.",
      "Uma ukuphefumula kuba nzima, izindebe ziba luhlaza, noma ungakwazi ukukhuluma imisho ephelele — funa usizo oluphuthumayo ulandele uhlelo lwakho olubhaliwe.",
    ],
    [
      "Gebruik hierdie lankwerkende beta-agonis soos op die geëtiketteerde produk aangedui — alleen of in ’n kombinasie-inhaler soos voorgeskryf.",
      "Salmeterol-berading sluit dikwels in om dit nie as die enigste asma-beheerder te gebruik nie tensy jou klinikus se plan so sê. Materia versin nie ’n puf-telling of opgraderingsplan nie.",
      "Sê vir jou apteker van hartritmegeskiedenis, bewing, en ALLE ander inhalers of vernevelaar-medisyne op jou lys.",
      "Rapporteer borspyn, hartklopgings, erger wordende piep, of meer gereelde reddingsgebruik vroeg.",
      "Vra hoe dit by jou geïnhaleerde steroïed-voorkomer pas — moenie ’n solo-beheerder-regimen versin nie.",
      "As asemhaling ineenstort, lippe blou word, of jy nie vol sinne kan praat nie — soek noodhulp en volg jou geskrewe aksieplan.",
    ],
    [
      "Sebelisa long-acting beta-agonist ena hantle kamoo e hlalositsoeng holabel — u le mong kapa ka combination inhaler kamoo e ngotsoeng.",
      "Keletso ea salmeterol hangata e kenyelletsa ho se e sebelise e le eona feela e laolang asthma ntle le moralo oa ngaka. Materia ha e iqape palo ea liphofu kapa moralo oa ho nyolohela.",
      "Bolella rakhemisi ka histori ea morethetho oa pelo, ho thothomela, le LI-INHALER KAPA MERIANA EA NEBULISER EOHLE.",
      "Tlaleha bohloko ba sefuba, ho otla ha pelo, ho lla ha matšoa a mpefalang, kapa ho hloka rescue hangata kapele.",
      "Botsa hore sena se tšoana joang le inhaled steroid preventer ea hau — se ke oa iqapa regimen ea controller e le 'ngoe.",
      "Haeba ho hema ho oa, melomo e fetoha boputsoa, kapa u sitoa ho bua lipolelo tse felletseng — batla thuso ea tšohanyetso 'me u latele moralo oa hau o ngotsoeng.",
    ],
    [
      "Sebenzisa le long-acting beta-agonist ngokuchanekileyo njengoko kubhaliwe kwileyibhile — wedwa okanye kwikombination inhaler njengoko kunikiwe.",
      "Iingcebiso ze-salmeterol zihlala zibandakanya ukungayisebenzisi iyodwa njenge-controller ye-asthma ngaphandle kwesicwangciso sogqirha. I-Materia ayiyiqiqi inani leepafu okanye isicwangciso sokunyuka.",
      "Xelela usokhemisti ngembali yesingqisho sentliziyo, ukungcangcazela, NAZO ZONKE ezinye ii-inhaler okanye amayeza e-nebuliser kuluhlu lwakho.",
      "Xela iintlungu zesifuba, ukubetha kwentliziyo, ukurhotyo olubiayo, okanye ukufuna i-rescue rhoqo kwangoko.",
      "Buza indlela oku kuhambelana ngayo ne-inhaled steroid preventer yakho — sukuyiqqa irejimeni ye-controller eyedwa.",
      "Ukuba ukuphefumla kuwa, imilebe iba luhlaza, okanye awukwazi ukuthetha izivakalisi ezigcweleyo — funa uncedo olungxamisekileyo ulandele isicwangciso sakho esibhaliweyo.",
    ],
  ),

  "mol-propylthiouracil": five(
    [
      "Take this thionamide antithyroid exactly as directed on your labelled product — do not stop suddenly without your clinician.",
      "Propylthiouracil counselling commonly includes infection watch (sore throat, fever) and liver-injury teaching. Materia does not invent a dose or thyroid lab target.",
      "Tell your pharmacist about pregnancy plans, liver disease, and ALL other thyroid or blood medicines on your list.",
      "Report unexplained fever, sore throat, yellow eyes, dark urine, or severe abdominal pain early — these need urgent clinician review.",
      "Ask how missed doses should be handled on your labelled product — do not invent spacing hours.",
      "If you get blistering rash with fever, severe shortness of breath, or yellow eyes with collapse — seek emergency care.",
    ],
    [
      "Sebenzisa le thionamide antithyroid njengoba kubhalwe kumkhiqizo onelebula — ungayeki ngokuzumayo ngaphandle kwedokotela.",
      "Ukwelulekwa kwe-propylthiouracil kuvame ukufaka ukugada izifo (umphimbo obuhlungu, umkhuhlane) nokufundisa ukulimala kwesibindi. I-Materia ayiqambi umthamo noma umgomo welabhorethri yethyroid.",
      "Tshela umkhiqizi ngezinhlelo zokukhulelwa, isifo sesibindi, NAWO WONKE amanye amaphilisi ethroid noma egazi.",
      "Bika umkhuhlane ongachazeki, umphimbo obuhlungu, amehlo aphuzi, umchamo omnyama, noma ubuhlungu besisu obukhulu ngokushesha — lokhu kudinga ukubuyekezwa okuphuthumayo.",
      "Buza ukuthi imithamo elahlekile kufanele iphathwe kanjani kumkhiqizo onelebula — ungayiqiqi amahora okuhlukanisa.",
      "Uma uthola ukuqubuka okukhulu namaqhubu nomkhuhlane, ukuphefumula kanzima kakhulu, noma amehlo aphuzi nokukuwa — funa usizo oluphuthumayo.",
    ],
    [
      "Neem hierdie tionamied-antitiroïed soos op die geëtiketteerde produk aangedui — moenie skielik stop sonder jou klinikus nie.",
      "Propieltiourasil-berading sluit dikwels infeksie-waak (seer keel, koors) en lewerbeseringsonderrig in. Materia versin nie ’n dosis of tiroïed-labteiken nie.",
      "Sê vir jou apteker van swangerskapsplanne, lewersiekte, en ALLE ander tiroïed- of bloedmedisyne op jou lys.",
      "Rapporteer onverklaarde koors, seer keel, geel oë, donker urine, of ernstige buikpyn vroeg — dit benodig dringende klinikus-hersiening.",
      "Vra hoe gemiste dosisse op jou geëtiketteerde produk hanteer moet word — moenie skeidingsure versin nie.",
      "As jy blisteruitslag met koors, ernstige kortasem, of geel oë met ineenstorting kry — soek noodhulp.",
    ],
    [
      "Sebelisa thionamide antithyroid ena hantle kamoo e hlalositsoeng holabel — se ke oa emisa ka potlako ntle le ngaka.",
      "Keletso ea propylthiouracil hangata e kenyelletsa ho hlokomela tšoaetso ('metso o bohloko, feberu) le thuto ea ho senyeha ha sebete. Materia ha e iqape tekanyo kapa sepheo sa lab ea thyroid.",
      "Bolella rakhemisi ka merero ea ho ima, lefu la sebete, le MERIANA EOHLE ea thyroid kapa ea mali.",
      "Tlaleha feberu e sa hlaloseng, 'metso o bohloko, mahlo a mosehla, moroto o lefifi, kapa bohloko ba mpeng bo matla kapele — sena se hloka tlhahlobo ea potlako ea ngaka.",
      "Botsa hore litekanyo tse lahlehileng li lokela ho tšoaroa joang holabel — se ke oa iqapa lihora tsa ho arola.",
      "Haeba u fumana lekhopho le lihlabana ka feberu, ho hema thata haholo, kapa mahlo a mosehla ka ho oa — batla thuso ea tšohanyetso.",
    ],
    [
      "Sebenzisa le thionamide antithyroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile — sukuyeki ngokungxamisekileyo ngaphandle kogqirha.",
      "Iingcebiso ze-propylthiouracil zihlala zibandakanya ukuqapha usulelo (umqala obuhlungu, umkhuhlane) nokufundisa ukonakala kwesibindi. I-Materia ayiyiqiqi idosi okanye usukelo lwelabhorethri yethyroid.",
      "Xelela usokhemisti ngezicwangciso zokukhulelwa, isifo sesibindi, NAWO ONKE amanye amayeza ethroid okanye egazi kuluhlu lwakho.",
      "Xela umkhuhlane ongachazekiyo, umqala obuhlungu, amehlo atyheli, umchamo omnyama, okanye iintlungu zesisu ezinzima kwangoko — oku kufuna ukujongwa kugqirha ngokukhawuleza.",
      "Buza indlela iidosi ezilahlekileyo ezifanele ziphathwe ngayo kwileyibhile — sukuyiqqa iiyure zokwahlula.",
      "Ukuba ufumana irhashalala namaqhuma nomkhuhlane, uxinzelelo lokuphefumla olunzima, okanye amehlo atyheli nokukuwa — funa uncedo olungxamisekileyo.",
    ],
  ),
};
