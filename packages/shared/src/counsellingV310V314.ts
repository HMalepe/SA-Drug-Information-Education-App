/**
 * v310–v314 deepened SA counselling batch (6 lines × 5 langs) — theatre & hospital NMB/anaesthetic agents.
 * Original Materia educational scripts only — no invented doses, rates, numeric lab targets, or intervals.
 * Theatre/hospital molecules: anaesthetist/theatre-team directed use only; Materia is educational only.
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

export const COUNSELLING_V310_TO_V314: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-atracurium": five(
    [
      "Atracurium is a non-depolarising neuromuscular blocking agent used exclusively in theatre and intensive care — it causes complete muscle paralysis and is administered only by anaesthetists and trained intensive care clinicians.",
      "This medicine is never for self-administration. Materia does not invent an intubation dose, infusion target, or reversal timing — all decisions belong with the anaesthetic and theatre team managing your care.",
      "Tell your anaesthetist about ALL medicines you take, any history of severe asthma, liver or kidney disease, and any prior reaction to neuromuscular blocking agents — atracurium's unique degradation pathway means it can still accumulate in some clinical situations.",
      "Residual neuromuscular blockade after a procedure — felt as unexpected weakness, difficulty lifting the head, or trouble swallowing — is a recognised patient-safety teaching point; the recovery team monitors for this before and after extubation.",
      "Ask the anaesthetic team to explain neuromuscular monitoring and what signs of adequate recovery they assess before extubating — understanding this helps you report unexpected weakness after waking.",
      "If you feel unusual weakness, difficulty breathing, or cannot lift your head or swallow after a procedure — alert the care team immediately, as residual block requires clinical assessment.",
    ],
    [
      "I-atracurium iyisiduli se-non-depolarising neuromuscular blocking sasetshenziswa ngokuphelele ezikhungweni ze-theatre nezinakekelweni ezicolisekile — ibanga ukufa kwamasimu ngokuphelele futhi inikezwa kuphela yi-anaesthetist nabezokwelapha abaqeqeshiwe be-intensive care.",
      "Lo muthi awusetshenziswa yena. I-Materia ayiqambi umthamo wokuqala kwegula, umzimba we-infusion target, noma isikhathi sokuvusela — zonke izinqumo zihambisana nethimba le-anaesthetic nele-theatre eliphethe ukunakekelwa kwakho.",
      "Tshela umhlengikazi we-anaesthetic ngawo WONKE amaphilisi owatholayo, noma yiluphi umlando we-asthma enkulu, isifo sezibindi noma sezinso, kanye nokuphendula kwangaphambilini kwe-neuromuscular blocking agents — indlela yokuchitheka kwe-atracurium engajwayelekile ikhombisa ukuthi ingaqoqana kwezinye izimemo zezokwelapha.",
      "Ukumisiwa kwe-neuromuscular blockade ngemva kwenqubo — okuzizwa ngokubuthaka okungalindelekile, ubunzima bokusonga ikhanda, noma inkinga yokugwinya — kuyiqiniso elibalulekile lokufundisa ngokuphepha kumuntu; ithimba lokubuyisela lihlola lezi zimpawu ngaphambi nangemva kokususwa komjovo wokuphefumula.",
      "Cela ithimba le-anaesthetic lichaze ukuqapha kwe-neuromuscular nalezo zimpawu zokubuyisela ngokwanele abazixilonga ngaphambi kokususwa komjovo — ukuqonda lokhu kukusiza ukubika ubuthaka okungebona obujwayelekile ngemva kokuvuka.",
      "Uma uzwa ubuthaka obunyanyisayo, ubunzima bokuphefumula, noma ungakwazi ukusonga ikhanda lakho noma ukugwinya ngemva kwenqubo — xwayisa ithimba lokunakekela ngokushesha, njengoba i-residual block idinga ukuhlolwa ngokomtholampilo.",
    ],
    [
      "Atrakurium is 'n nie-depolariserende neuromuskulêre blokkeringsmiddel wat uitsluitlik in teater- en intensiewesorginstellings gebruik word — dit veroorsaak volledige spierverlamming en word slegs deur anestesiste en opgeleide intensiewesorgklinici toegedien.",
      "Hierdie medisyne is nooit vir selftoediening nie. Materia versin nie 'n intubasiedosis, infusieteiken, of omkeringstydberekening nie — alle besluite behoort by die anestesiese en teaterspanne wat jou sorg bestuur.",
      "Sê vir jou anestesist van ALLE medisyne wat jy neem, enige geskiedenis van ernstige asma, lewer- of niersiekte, en enige vorige reaksie op neuromuskulêre blokkeringsmiddels — atrakurium se unieke degraasiepad beteken dat dit steeds in sommige kliniese situasies kan ophoop.",
      "Oorblywende neuromuskulêre blok na 'n prosedure — ervaar as onverwagte swakheid, moeite om die kop te lig, of moeite met sluk — is 'n erkende pasiëntveiligheids-onderrigpunt; die herstelspan monitor hiervoor voor en ná ekstubering.",
      "Vra die anestesispan om neuromuskulêre monitering en die tekens van voldoende herstel wat hulle voor ekstubering beoordeel, te verduidelik — begrip hiervan help jou om onverwagte swakheid ná ontwaak te rapporteer.",
      "As jy ongewone swakheid, asemhalingsprobleme, of nie jou kop kan lig of sluk ná 'n prosedure voel — waarsku die sorgspan onmiddellik, aangesien oorblywende blok kliniese beoordeling vereis.",
    ],
    [
      "Atracurium ke sedimelo sa neuromuscular blocking sa non-depolarising se sebelisoang ka ho feletseng maemong a theatre le a intensive care — se baka ho foea ha maikutlo ka ho feletseng 'me se noa feela ke li-anaesthetist le bafani ba tlhokomelo ba intensive care ba ruisoang.",
      "Moriana ona ha o ka noa o itokisetsa. Materia ha e iqape tekanyo ea intubation, taelo ea infusion target, kapa nako ea ho fetola — liphetoho tsohle li le teng le sehlopha sa anaesthetic le theatre se laolang tlhokomelo ea hau.",
      "Bolella anaesthetist ea hau ka MERIANA YOHLE eo u e nkelang, histori efe kapa efe ea asthma e matla, lefu la sebete kapa la liphio, le karabelo efe kapa efe ea pejana ho li-neuromuscular blocking agents — tsela ea ho bola ea atracurium e khetheho e bolela hore e ka ntse e bokoa maemong a mang a tlhokomelo.",
      "Ho misa ha neuromuscular blockade ka mor'a mohato — ho ikutuoa joalo ka bokoa bo sa letetsoeng, thata ho phahamisa hlooho, kapa mathata a ho metsa — ke ntlha ea thuto ea tšireletso ea mokuli e tsejoang; sehlopha sa ho hola se hlokomela tsena pele le ka mor'a ho ntša tube ea moea.",
      "Kopa sehlopha sa anaesthetic ho hlalosa ho hlokomela ha neuromuscular le matšoao a ho hola ho lekaneng ao ba a hlahlobang pele ho ntša tube — ho utloisisa sena ho o thusa ho tlaleha bokoa bo sa letetsoeng ka mor'a ho vuka.",
      "Haeba u ikutloa bokoa bo sa tloaelehang, ho hema thata, kapa u ke ke ua phahamisa hlooho kapa ua metsa ka mor'a mohato — tsebisa sehlopha sa tlhokomelo ka potlako, hobane block e setseng e hloka tekolo ea tlhokomelo.",
    ],
    [
      "I-atracurium yiagente ye-non-depolarising neuromuscular blocking esetshenziswa ngokukhuselekileyo kwiindawo ze-theatre neze-intensive care — ibangela ukufa kwamasimu ngokupheleleyo kwaye inikezwa kuphela yi-anaesthetist nabezonyango abaqeqeshiweyo be-intensive care.",
      "Esi yeza asizinikwa ngokwakho. I-Materia ayiyiqiqi idosi ye-intubation, umgingqi we-infusion target, okanye ixesha lokubuyisela — zonke izigqibo zihamba neqela le-anaesthetic neqela le-theatre eliphatha ukunyangwa kwakho.",
      "Xelela i-anaesthetist yakho ngawo WONKE amayeza owathabathayo, nayiphi imbali ye-asthma enzima, isifo sezibindi okanye sezintso, nayo nayiphi impendulo yangaphambili kwii-neuromuscular blocking agents — indlela ye-atracurium yokubola eyahlukileyo ithetha ukuba inokungena kwamanye emeko zezonyango.",
      "Ukumisiwa kwe-neuromuscular blockade emva kwenkqubo — okuzivwa njengobuthaka obengazelelwanga, ubunzima bokuphakamisa ikhanda, okanye uxinzelelo lokuginya — liqhalo elaziwa lokufundisa ukuphepha komguli; iqela lokubuyisela liqaphela ezi ngaphambi nangemva kokususa isitofu somoya.",
      "Cela iqela le-anaesthetic ukuba licacise ukuqhekeza kwe-neuromuscular nezimpawu zokubuyisela ngokwanele abazixilonga ngaphambi kokususa isitofu — ukuqonda oku kukunceda ukuba uxele ubuthaka obengazelelwanga emva kokuvuka.",
      "Ukuba uziva ubuthaka obungaqhelekanga, ubunzima bokuphefumla, okanye awukwazi ukuphakamisa ikhanda lakho okanye ukuginya emva kwenkqubo — xelela iqela lokunakekela ngoko nangoko, njengoko i-residual block ifuna ukuxilongwa kwezonyango.",
    ],
  ),

  "mol-rocuronium": five(
    [
      "Rocuronium is a non-depolarising neuromuscular blocking agent used in theatre for tracheal intubation and muscle relaxation during surgery — it is always administered and monitored by an anaesthetist or trained intensive care clinician.",
      "This medicine is never for self-administration. Materia does not invent an intubation dose, maintenance target, or infusion protocol — all clinical decisions belong with the anaesthetist based on your weight, clinical state, and neuromuscular monitoring.",
      "Tell your anaesthetist about ALL medicines you take — especially aminoglycosides, certain antibiotics, and magnesium-containing medicines — any prior neuromuscular blocking agent reaction, and any personal or family history of neuromuscular disease.",
      "Rocuronium can be reversed by sugammadex, a drug that specifically encapsulates it; questions about reversal strategy, timing, and monitoring all belong with the anaesthetic team, not a self-directed plan.",
      "Ask your anaesthetist about the plan for reversal and recovery so you understand what monitoring is in place — residual weakness after neuromuscular blockade is a known patient-safety concern that the team actively assesses.",
      "If you feel unusual weakness, have trouble breathing, or cannot protect your airway after a procedure — this requires immediate clinical review; alert the care team without delay.",
    ],
    [
      "I-rocuronium iyisiduli se-non-depolarising neuromuscular blocking sasetshenziswa e-theatre ukuqala kwegula kwegula ne-trachea nokukhululeka kwamasimu ngesikhathi sokuhlinzwa — ihlala inikezwa futhi ihlolwa yi-anaesthetist noma umngani wezokwelapha we-intensive care oqeqeshiwe.",
      "Lo muthi awusetshenziswa yena. I-Materia ayiqambi umthamo wokuqala kwegula, umzimba wokuqhubeka, noma uhlelo le-infusion — zonke izinqumo zezokwelapha zihambisana ne-anaesthetist ngokusekelwe kuwa-phela, isimo sakho sezokwelapha, nokuqapha kwe-neuromuscular.",
      "Tshela umhlengikazi we-anaesthetic ngawo WONKE amaphilisi owatholayo — ikakhulukazi ama-aminoglycoside, amanye ama-antibiotics, namaphilisi aqukethe i-magnesium — nokuphendula ngaphambilini kwanoma yikuphi i-neuromuscular blocking agent, kanye nomlando womuntu siqu noma womndeni we-neuromuscular disease.",
      "I-rocuronium ingavuselwa nge-sugammadex, umuthi owocelela i-rocuronium ngokukhetheha; imibuzo mayelana ne-reversal strategy, isikhathi, nokuqapha konke kuhambisana nethimba le-anaesthetic, hhayi uhlelo oluziphathayo.",
      "Buza umhlengikazi we-anaesthetic ngopholelo kanye nokubuyisela ukuze uqonde ukuqapha okulungileyo — ubuthaka obunsalayo ngemva kwe-neuromuscular blockade buyinkinga eyaziwa yokuphepha kumuntu, ithimba elihlola ngokusebenza.",
      "Uma uzwa ubuthaka obunyanyisayo, ukuphefumula kanzima, noma ungakwazi ukuvikela indlela yakho yokuphefumula ngemva kwenqubo — kudinga ukubuyekezwa ngokushesha ngokomtholampilo; xwayisa ithimba lokunakekela ngaphandle kokulinaza.",
    ],
    [
      "Rokuroonium is 'n nie-depolariserende neuromuskulêre blokkeringsmiddel wat in teater gebruik word vir trageale intubering en spierontspanning tydens chirurgie — dit word altyd deur 'n anestesist of opgeleide intensiewesorgklinikus toegedien en gemonitor.",
      "Hierdie medisyne is nooit vir selftoediening nie. Materia versin nie 'n intubasiedosis, onderhoudsteiken, of infusieprotokol nie — alle kliniese besluite behoort by die anestesist op grond van jou gewig, kliniese toestand, en neuromuskulêre monitering.",
      "Sê vir jou anestesist van ALLE medisyne wat jy neem — veral aminoglikosiede, sekere antibiotikas, en magnesium-bevattende medisyne — enige vorige neuromuskulêre blokkeerreaksie, en enige persoonlike of familiegeskiedenis van neuromuskulêre siekte.",
      "Rokuroonium kan omgekeer word deur sugammadeks, 'n middel wat dit spesifiek inkapsel; vrae oor omkeringsstrategie, tydsberekening en monitering behoort almal by die anestesispan, nie 'n selfgerigte plan nie.",
      "Vra jou anestesist oor die plan vir omkeering en herstel sodat jy verstaan watter monitering in plek is — oorblywende swakheid ná neuromuskulêre blok is 'n bekende pasiëntveiligheidskwessie wat die span aktief beoordeel.",
      "As jy ongewone swakheid voel, asemhalingsprobleme het, of nie jou lugweg na 'n prosedure kan beskerm nie — dit vereis onmiddellike kliniese hersiening; waarsku die sorgspan sonder vertraging.",
    ],
    [
      "Rocuronium ke sedimelo sa neuromuscular blocking sa non-depolarising se sebelisoang theatre bakeng sa ho kenya tube tracheal le ho khulusetsa maikutlo nakong ea surgery — e noa le ho hlokomeloa kamehla ke anaesthetist kapa ngaka ea intensive care e ruisoang.",
      "Moriana ona ha o ka noa o itokisetsa. Materia ha e iqape tekanyo ea intubation, taelo ea ho boloka, kapa protokolo ea infusion — liphetoho tsohle tsa tlhokomelo li le teng le anaesthetist ho latela boima ba hau, boemo ba hau ba tlhokomelo, le ho hlokomela ha neuromuscular.",
      "Bolella anaesthetist ea hau ka MERIANA YOHLE eo u e nkelang — haholoholo li-aminoglycoside, li-antibiotics tse ling, le meriana e nang le magnesium — karabelo efe kapa efe ea neuromuscular blocking agent ea pejana, le histori ea motho ka noho kapa ea lelapa ea lefu la neuromuscular.",
      "Rocuronium e ka fetolosoa ke sugammadex, moriana o e phethang ka ho khetheha; lipotso mabapi le leano la ho fetola, nako, le ho hlokomela li le tsohle teng le sehlopha sa anaesthetic, eseng moralo o itokisetsoang.",
      "Botsa anaesthetist ea hau ka moralo oa ho fetola le ho hola hore u utloisise hore na ho hlokomeloa ha mang ho na le teng — bokoa bo setseng ka mor'a neuromuscular blockade ke bothata ba tšireletso ea mokuli bo tsejoang, sehlopha se bo lekola ka boitelo.",
      "Haeba u ikutloa bokoa bo sa tloaelehang, u na le mathata a ho hema, kapa u ke ke ua sireletsa tsela ea hau ea moea ka mor'a mohato — sena se hloka tekolo ea potlako ea tlhokomelo; tsebisa sehlopha sa tlhokomelo ntle le ho lieha.",
    ],
    [
      "I-rocuronium yiagente ye-non-depolarising neuromuscular blocking esetshenziswa e-theatre ukuqalisa i-tracheal intubation nokuphumla kwamasimu ngexesha lohlobo — ihlala inikezwa kwaye iqhekeza yi-anaesthetist okanye ugqirha we-intensive care oqeqeshiweyo.",
      "Esi yeza asizinikwa ngokwakho. I-Materia ayiyiqiqi idosi ye-intubation, umgingqi wokulondoloza, okanye iqhinga le-infusion — zonke izigqibo zezonyango zihamba ne-anaesthetist ngokusekelwe kwisisindo sakho, imeko yakho yezonyango, nokuqhekeza kwe-neuromuscular.",
      "Xelela i-anaesthetist yakho ngawo WONKE amayeza owathabathayo — ingakumbi ii-aminoglycoside, amanye ii-antibiotic, namayeza aqukethe i-magnesium — nayiphi impendulo yangaphambili ye-neuromuscular blocking agent, nayo nayiphi imbali yomntu ngokwakhe okanye yosapho ye-neuromuscular disease.",
      "I-rocuronium inokubuyiselwa yi-sugammadex, umuthi oyijikeleza ngokukhethekileyo; imibuzo malunga nesicwangciso sokubuyisela, ixesha, nokuqhekeza konke kuhamba neqela le-anaesthetic, hayi isicwangciso esilawulwa ngokwakhe.",
      "Buza i-anaesthetist yakho ngegcebo yokubuyisela nokubuyisela ukuze uqonde ukuqhekeza okulungileyo — ubuthaka obunsalayo emva kwe-neuromuscular blockade luchukumiso olwaziwa lokuphepha komguli oliqela elihlola ngokusebenzayo.",
      "Ukuba uziva ubuthaka obungaqhelekanga, uxinzelelo lokuphefumla, okanye awukwazi ukukhusela indlela yakho yomoya emva kwenkqubo — oku kufuna ukuphononongwa ngokukhawuleza kwezonyango; xelela iqela lokunakekela ngaphandle kolibaziso.",
    ],
  ),

  "mol-neostigmine": five(
    [
      "Neostigmine is a cholinesterase inhibitor used in hospital settings — common uses include reversal of non-depolarising neuromuscular blockade after surgery, and management of myasthenia gravis and certain bowel conditions; the clinical context determines the dose form and route.",
      "This medicine is never for self-adjustment in a hospital setting. Materia does not invent a reversal dose, atropine co-administration ratio, or myasthenia titration target — all are managed by the responsible clinician for your specific context.",
      "Tell your treating doctor or anaesthetist about ALL medicines you take, any history of asthma or obstructive lung disease, cardiac arrhythmias, peptic ulcer disease, Parkinson's disease, and any prior neostigmine reaction.",
      "Cholinergic excess — a recognisable pattern of bradycardia, increased secretions, gut cramping, sweating, and muscle fasciculation — is the key safety teaching point for neostigmine; the clinical team watches for and manages these signs.",
      "If you take neostigmine for myasthenia gravis, ask your neurologist about the signs of both under-treatment and cholinergic over-treatment, as these can look similar — never adjust your own dose without specialist guidance.",
      "If you develop severe slow heart rate, difficulty breathing, excessive sweating, or uncontrollable cramping in a hospital setting — alert the care team immediately.",
    ],
    [
      "I-neostigmine iyisithibamisi se-cholinesterase sisetshenziswa ezibhedlela — ukusetshenziswa okujwayelekile kuhilela ukuvusela kwe-non-depolarising neuromuscular blockade ngemva kokuhlinzwa, nokuphathwa kwe-myasthenia gravis nezinye izimo zomgwaqo; ingqikithi yezokwelapha ihlola ifomu lomthamo nendlela.",
      "Lo muthi awulungiswa ngokwakho ezibhedlela. I-Materia ayiqambi umthamo wokuvusela, inqanaba lokunikwa i-atropine kanye nawo, noma umzimba wokufinyelelela kwe-myasthenia titration — konke kuphathwa udokotela omphathayo ngomongo wakho wokukhetheka.",
      "Tshela udokotela wakho wokwelapha noma umhlengikazi we-anaesthetic ngawo WONKE amaphilisi owatholayo, noma yiluphi umlando we-asthma noma isifo sezifuba esivimbelayo, ukushaya kwe-arrhythmia yenhliziyo, isifo se-peptic ulcer, isifo sakwaParkinson, nokuphendula kwangaphambilini kwe-neostigmine.",
      "Ukweqela kwe-cholinergic — uhlelo olubonakala lwe-bradycardia, ukwanda kwemithombo, izidumo zomuntu, ukucindezela, nokuphenduka kwamasimu — kuyiqiniso elibalulekile lokufundisa ngokuphepha kwe-neostigmine; ithimba lezokwelapha lihlola futhi lilawule lezi zimpawu.",
      "Uma uthathelana ne-neostigmine nge-myasthenia gravis, buza udokotela wakho wezinzwa ngezimpawu zokuphathwa ngokuncane kanye nokuphathwa ngokweqile kwe-cholinergic, njengoba lezi zingabonakala zifana — ungalokothi ulungise umthamo wakho ngaphandle kwesiqondiso sochwepheshe.",
      "Uma uthola ukwehla okukhulu kwenhloso yenhliziyo, ubunzima bokuphefumula, ukuchwitha okukhulu, noma ukuphinyelelwa okungalawuleki ezindaweni zebhedi — xwayisa ithimba lokunakekela ngokushesha.",
    ],
    [
      "Neostigmien is 'n cholinesterase-inhibitor wat in hospitaalinstellings gebruik word — algemene gebruike sluit in omkeering van nie-depolariserende neuromuskulêre blok ná chirurgie, en bestuur van myasthenia gravis en sekere dermatoestande; die kliniese konteks bepaal die doseringsvorm en roete.",
      "Hierdie medisyne word nooit selfverstel in 'n hospitaalomgewing nie. Materia versin nie 'n omkeringsdosis, atropien-ko-toedieningsverhouding, of myasthenia-titeringsteiken nie — dit word alles deur die verantwoordelike klinikus vir jou spesifieke konteks bestuur.",
      "Sê vir jou behandelende dokter of anestesist van ALLE medisyne wat jy neem, enige geskiedenis van asma of obstruktiewe longsiekte, hartritmestoornisse, peptiesulsiersiekte, Parkinsonsiekte, en enige vorige neostigmienreaksie.",
      "Cholinergiese oormaat — 'n herkenbare patroon van bradikardies, verhoogde sekresies, dermspaasme, sweet, en spierfasikkulasies — is die sleutel-veiligheidsonderrigpunt vir neostigmien; die kliniese span let op en bestuur hierdie tekens.",
      "As jy neostigmien vir myasthenia gravis neem, vra jou neuroloog oor die tekens van sowel onderbehandeling as cholinergiese oorbehandeling, aangesien dit soortgelyk kan lyk — pas nooit jou eie dosis aan sonder spesialisgeleiding nie.",
      "As jy ernstige stadige hartklop, asemhalingsprobleme, oormatige sweet, of onbeheerbare krampe in 'n hospitaalomgewing ontwikkel — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Neostigmine ke thibelo ea cholinesterase e sebelisoang maemong a sepetela — tšebeliso tse tloaelehileng li kenyelletsa ho fetola neuromuscular blockade ea non-depolarising ka mor'a surgery, le ho laola myasthenia gravis le maemo a mang a mala; moelelo oa tlhokomelo o tseba mofuta oa tekanyo le tsela.",
      "Moriana ona ha o ka itokisetsa maemong a sepetela. Materia ha e iqape tekanyo ea ho fetola, ratio ea ho noa atropine hammoho, kapa taelo ea myasthenia titration — tsohle li laoloa ke ngaka e ikarabellang bakeng sa moelelo oa hau o khetheho.",
      "Bolella ngaka ea hau ea kalafo kapa anaesthetist ka MERIANA YOHLE eo u e nkelang, histori efe kapa efe ea asthma kapa lefu la mapheo le thibelang, li-arrhythmia tsa pelo, lefu la peptic ulcer, lefu la Parkinson, le karabelo efe kapa efe ea pejana ho neostigmine.",
      "Bokaakang ba cholinergic — mokhoa o tsejoang oa bradycardia, keketseho ea litlhapi, mokacha oa mala, ho tsoa thoro, le ho thothomela ha maikutlo — ke ntlha ea bohlokoa ea thuto ea tšireletso ea neostigmine; sehlopha sa tlhokomelo se hlokomela le ho laola matšoao ana.",
      "Haeba u nka neostigmine bakeng sa myasthenia gravis, botsa ngaka ea hau ea boakhi ka matšoao a ho se kalafo ka ho lekaana le kalafo e feteletseng ea cholinergic, hobane tsena li ka bonagala li tšoana — o se ke oa ntlafatsa tekanyo ea hau ka noho ntle le tataiso ea mokhethehoa.",
      "Haeba u ntša lebelo le leholo la pelo le llollang, ho hema thata, ho tsoa thoro ho feteletseng, kapa mokacha oa sa laolehe maemong a sepetela — tsebisa sehlopha sa tlhokomelo ka potlako.",
    ],
    [
      "I-neostigmine yisithinteli se-cholinesterase esetshenziswa kwisibhedlele — ukusetyenziswa okujwayelekileyo kubandakanya ukubuyisela kwe-non-depolarising neuromuscular blockade emva cohlobo, nokuphathwa kwe-myasthenia gravis neemeko ezithile zesisu; umxholo wezonyango uncedisa uhlobo lwedosi nendlela.",
      "Esi yeza asizilungisi ngokwakho kwisibhedlele. I-Materia ayiyiqiqi idosi yokubuyisela, inqanaba lokunikezwa kwe-atropine kanyekanye, okanye umgingqi we-myasthenia titration — zonke zilawulwa ngugqirha owenza oku kumxholo wakho okhethekileyo.",
      "Xelela ugqirha wakho wonyango okanye i-anaesthetist ngawo WONKE amayeza owathabathayo, nayiphi imbali ye-asthma okanye isifo samaphaphu esivalalanayo, ii-arrhythmia zentliziyo, isifo se-peptic ulcer, isifo sakaParkinsoni, nayo nayiphi impendulo yangaphambili ye-neostigmine.",
      "Ubuninzi be-cholinergic — isikhokelo esaziwa se-bradycardia, ukwanda kwezikhukula, ukuqakeleka komala, ukubilisa, nokuqhagamshelana kwamasimu — liqhalo eliphambili lokufundisa ukuphepha kwe-neostigmine; iqela lezonyango liqaphela kwaye lilawule ezi mpawu.",
      "Ukuba uthabatha i-neostigmine ye-myasthenia gravis, buza ugqirha wakho we-neurology ngezimpawu zombini ukungaphathwa ngokwaneleyo nokuphathwa ngokugqithisileyo kwe-cholinergic, njengoko ezi zinokufana — sukutshintshe idosi yakho ngokwakho ngaphandle kwesikhokelo sochwepheshe.",
      "Ukuba ufumana ukucotha okukhulu kwentliziyo, ubunzima bokuphefumla, ukubilisa okuninzi, okanye ukuqakeleka okungalawulekiyo kwisibhedlele — xelela iqela lokunakekela ngoko nangoko.",
    ],
  ),

  "mol-remifentanil": five(
    [
      "Remifentanil is an ultra-short-acting opioid analgesic used exclusively in theatre and intensive care settings — it is delivered by continuous infusion under the direct supervision of an anaesthetist or intensivist, never outside a monitored clinical environment.",
      "This medicine is never for self-administration under any circumstances. Materia does not invent an infusion target, context-sensitive offset time, or opioid-switching protocol — all titration and monitoring belong entirely with the anaesthetic and intensive care team.",
      "Tell your anaesthetist about ALL medicines you take, any history of opioid sensitivity or prior opioid adverse event, respiratory disease, and sleep apnoea — these affect how remifentanil is safely managed during your procedure.",
      "Because remifentanil's action ends very quickly when the infusion stops, planning for pain after the procedure — often called the 'analgesic gap' — is an important part of the anaesthetic plan; ask your anaesthetist what post-procedure analgesia is prepared.",
      "Respiratory depression is the primary safety risk with all opioids; in a monitored theatre or ICU setting the care team continuously observes breathing, oxygen levels, and level of consciousness during remifentanil infusion.",
      "If you feel unexpected sedation, slowed breathing, or confusion in any clinical setting where this medicine is used — alert the care team immediately without waiting.",
    ],
    [
      "I-remifentanil iyisiphoyi se-opioid analgesic eside kakhulu sasetshenziswa ngokuphelele ezikhungweni ze-theatre nezinakekelweni ezicolisekile — inikezwa nge-infusion eqhubekayo ngaphansi kwengqalelo eqondile yi-anaesthetist noma umchwami, hhayi ngaphandle kwemvelo yezokwelapha ehlolwa.",
      "Lo muthi awusetshenziswa yena ngaphansi kwaluphi uhlobo. I-Materia ayiqambi umzimba we-infusion target, isikhathi se-context-sensitive offset, noma uhlelo lokushintsha kwe-opioid — konke ukufinyelelela nokuqapha kuhambisana ngokuphelele nethimba le-anaesthetic nezinakekelweni ezicolisekile.",
      "Tshela umhlengikazi we-anaesthetic ngawo WONKE amaphilisi owatholayo, noma yiluphi umlando we-opioid sensitivity noma icala le-opioid elibi langaphambilini, isifo sezifuba, nokuphefumula okugqilaza — lokhu kuthinta ukuthi i-remifentanil iphathwa kanjani ngokuphepha ngesikhathi senqubo yakho.",
      "Ngoba umsebenzi we-remifentanil uphela ngokushesha kakhulu lapho i-infusion iyekiwe, ukulungiselela ubuhlungu ngemva kwenqubo — kuvame ukubizwa ngokuthi 'analgesic gap' — kuyingxenye ebalulekile yohlelo le-anaesthetic; buza umhlengikazi we-anaesthetic ukuthi izinhlungu zangemva kwenqubo zilungiselelwe kanjani.",
      "Ukucindezeleka kwemfundo yokuphefumula kuyingozi yokuqala yokuphepha kuwo wonke ama-opioid; kumdlalo we-theatre noma ku-ICU ehlolwa, ithimba lokunakekela liqaphela ngokuqhubekayo ukuphefumula, amazinga e-oxygen, nezinga lokucabanga ngesikhathi se-infusion ye-remifentanil.",
      "Uma uzwa ukusoda okungalindelekile, ukuphefumula okuphuza, noma ukudideka kukuphi na lapho lo muthi usetyenziswa khona — xwayisa ithimba lokunakekela ngokushesha ngaphandle kokulinda.",
    ],
    [
      "Remifentanil is 'n ultrakort-werkende opioid-analgetikum wat uitsluitlik in teater- en intensiewesorginstellings gebruik word — dit word deur deurlopende infusie onder die direkte toesig van 'n anestesist of intensivis gelewer, nooit buite 'n gemonitorde kliniese omgewing nie.",
      "Hierdie medisyne is nooit vir selftoediening onder enige omstandighede nie. Materia versin nie 'n infusieteiken, konteksgevoelige versetingstyd, of opioid-omskakelingprotokol nie — alle titrering en monitering behoort geheel en al by die anestesiese en intensiewesorgspan.",
      "Sê vir jou anestesist van ALLE medisyne wat jy neem, enige geskiedenis van opioïedgevoeligheid of vorige opioïedongewenste gebeurtenis, respiratoriese siekte, en slaapapnee — dit beïnvloed hoe remifentanil veilig tydens jou prosedure bestuur word.",
      "Omdat remifentanil se werking baie vinnig eindig wanneer die infusie stop, is beplanning vir pyn ná die prosedure — dikwels die 'analgesiese gaping' genoem — 'n belangrike deel van die anestesiese plan; vra jou anestesist watter post-prosedure analgesia voorberei is.",
      "Respiratoriese depressie is die primêre veiligheidsrisiko met alle opioïede; in 'n gemonitorde teater- of intensiewesorgomgewing observeer die sorgspan deurlopend asemhaling, suurstofvlakke, en bewussynsvlak tydens remifentanil-infusie.",
      "As jy onverwagte sederings, vertraagde asemhaling, of verwarring ervaar in enige kliniese omgewing waar hierdie medisyne gebruik word — waarsku die sorgspan onmiddellik sonder om te wag.",
    ],
    [
      "Remifentanil ke analgesic ea opioid e sebetsang nako e khutšoanyane haholo e sebelisoang ka ho feletseng maemong a theatre le a intensive care — e fanoana ka infusion e tsoelang pele tlas'a tlhokomelo e tobileng ea anaesthetist kapa intensivist, eseng kantle ho tikoloho ea tlhokomelo e hlokomelang.",
      "Moriana ona ha o ka noa o itokisetsa le ka maemo afe kapa afe. Materia ha e iqape taelo ea infusion target, nako ea context-sensitive offset, kapa protokolo ea ho fetola opioid — titration le ho hlokomela tsohle li le teng ka ho feletseng le sehlopha sa anaesthetic le intensive care.",
      "Bolella anaesthetist ea hau ka MERIANA YOHLE eo u e nkelang, histori efe kapa efe ea opioid sensitivity kapa ketsahalo ea pejana ea opioid e mpe, lefu la mapheo, le ho khuoa ha moea ha boroko — tsena li amehang hore na remifentanil e laoloa joang ka tšireletso nakong ea mohato oa hau.",
      "Ka hobane ts'ebetso ea remifentanil e phela kapele haholo infusion e ema, ho rera bohloko ka mor'a mohato — hangata ho bitsoang 'analgesic gap' — ke karolo ea bohlokoa ea moralo oa anaesthetic; botsa anaesthetist ea hau hore na analgesia ka mor'a mohato e etsoa joang.",
      "Ho hatella ha ho hema ke kotsi ea mantlha ea tšireletso le li-opioid tsohle; tikolohong ea theatre kapa ICU e hlokomelang, sehlopha sa tlhokomelo se hlokomela ho hema, maemo a o2, le boemo ba kelello ho tsoela pele nakong ea infusion ea remifentanil.",
      "Haeba u ikutloa ho homotsa ho sa letetsoeng, ho hema ho nolofetsoeng, kapa ho fokotseha setšeng sefe kapa sefe sa tlhokomelo moo moriana ona o sebelisoang teng — tsebisa sehlopha sa tlhokomelo ka potlako ntle le ho ema.",
    ],
    [
      "I-remifentanil yi-opioid analgesic esebenza ixesha elincinci kakhulu esetshenziswa ngokukhuselekileyo kwiindawo ze-theatre neze-intensive care — inikezwa nge-infusion eqhubekayo phantsi kweliso eliqondileyo le-anaesthetist okanye umchwami, hayi ngaphandle kwemveli yezonyango eqhekeziweyo.",
      "Esi yeza asizinikwa ngokwakho phantsi kwanayiphi na imeko. I-Materia ayiyiqiqi umgingqi we-infusion target, ixesha le-context-sensitive offset, okanye iqhinga lokutshintsha i-opioid — wonke umthamo nokuqhekeza kuhamba ngokupheleleyo neqela le-anaesthetic nele-intensive care.",
      "Xelela i-anaesthetist yakho ngawo WONKE amayeza owathabathayo, nayiphi imbali ye-opioid sensitivity okanye isehlo sangaphambili se-opioid esingathandekiyo, isifo samaphaphu, nokulala ngokuphefumla kokuvalwa — ezi zichaphazela indlela i-remifentanil elawulwa ngokuphephileyo ngexesha lenkqubo yakho.",
      "Ngenxa yokuba isenzo se-remifentanil siphela ngokukhawuleza kakhulu xa i-infusion imisiwa, ukulungiselela iintlungu emva kwenkqubo — ngokuxhaphakileyo ebizwa ngokuba yi-'analgesic gap' — sisici esibalulekileyo sesicwangciso se-anaesthetic; buza i-anaesthetist yakho ukuba i-analgesia emva kwenkqubo ilungiselwe njani.",
      "Ukucinezelwa kokuphefumla yingozi ephambili yokuphepha kuzo zonke ii-opioid; kwimeko ye-theatre okanye ye-ICU eqhekeziweyo, iqela lokunakekela liqaphela ngokuqhubekayo ukuphefumla, amanqanaba e-oxygen, nenqanaba lokuqonda ngexesha le-infusion ye-remifentanil.",
      "Ukuba uziva ukuthotyelwa okungalindelekileyo, ukuphefumla okucothayo, okanye ukudideka nakuyiphi na imeko yezonyango apho esi yeza sisetyenziswa khona — xelela iqela lokunakekela ngoko nangoko ngaphandle kokulinda.",
    ],
  ),

  "mol-sevoflurane": five(
    [
      "Sevoflurane is a volatile halogenated anaesthetic agent used exclusively in theatre — it is delivered through a calibrated vaporiser by an anaesthetist; it is never used outside a fully equipped operating environment.",
      "This medicine is never for self-administration. Materia does not invent a minimum alveolar concentration target, vaporiser setting, or inspired fraction — all are set and adjusted in real time by the anaesthetist based on continuous patient monitoring.",
      "A personal or family history of malignant hyperthermia (MH) or unexplained anaesthetic-related death in a close family member is critically important — sevoflurane, like all volatile anaesthetics, is a recognised MH trigger; inform the anaesthetic team before every anaesthetic.",
      "Sevoflurane counselling includes understanding that emergence from volatile anaesthesia can be associated with brief agitation or confusion, particularly in children — the recovery team anticipates and manages this; it does not indicate harm.",
      "Ask your anaesthetist whether your personal or family history of MH or any prior anaesthetic reaction changes the planned anaesthetic technique — safer alternatives such as total intravenous anaesthesia exist and can be discussed.",
      "If you or a family member have ever experienced unexplained fever, muscle rigidity, or abnormal colour change during surgery — ensure this is clearly documented and communicated to the anaesthetic team before every future procedure.",
    ],
    [
      "I-sevoflurane iyisicuthu se-volatile halogenated anaesthetic sasetshenziswa ngokuphelele e-theatre — sinikezwa nge-calibrated vaporiser yi-anaesthetist; asizange sisetshenziswe ngaphandle kwemvelo yokusebenza ephelele.",
      "Lo muthi awusetshenziswa yena. I-Materia ayiqambi umzimba we-minimum alveolar concentration target, ukumiswa kwe-vaporiser, noma ingxenye ewushiwe — konke kusheshwa futhi kulungiswa ngesikhathi esiqondile yi-anaesthetist ngokusekelwe ekuhlolwa okuqhubekayo komguli.",
      "Umlando womuntu siqu noma womndeni we-malignant hyperthermia (MH) noma ukufa okuhlobene ne-anaesthetic okungachazwa esenga somndeni osondele kubalulekile kakhulu — i-sevoflurane, njengazo zonke ezi-volatile anaesthetics, iyaziwayo ukuthi ingenye yezinto eziqala i-MH; tshela ithimba le-anaesthetic ngaphambi kwanoma yiluphi i-anaesthetic.",
      "Ukwelulekwa kwe-sevoflurane kuhilela ukuqonda ukuthi ukuvuka kwe-volatile anaesthesia kungahambisana nokuphazamiseka kwesikhashana noma ukudideka, ikakhulukazi ezinganeni — ithimba lokubuyisela lilindela futhi lilawule lokhu; akukhombisi ukulimala.",
      "Buza umhlengikazi we-anaesthetic ukuthi umlando wakho womuntu siqu noma womndeni we-MH noma nokuphendula kwangaphambilini kwe-anaesthetic kushintsha injinga ye-anaesthetic ehlelelwe — izinye eziphephayo njenge-total intravenous anaesthesia zikhona futhi zingaxoxwa.",
      "Uma wena noma ilungu lomndeni linikezwa umkhuhlane ongachazwa, ukuqina kwamasimu, noma ushintsho lwemibala olunyanyisayo ngesikhathi sokuhlinzwa — qinisekisa ukuthi lokhu kubhaliwe ngokucacile futhi kuxoxiselwa nethimba le-anaesthetic ngaphambi kwanoma yiluphi inqubo ezayo.",
    ],
    [
      "Sevofluraan is 'n vlugtige gehalogeneerde verdowingsmiddel wat uitsluitlik in teater gebruik word — dit word deur 'n gekalibreerde verdamper deur 'n anestesist gelewer; dit word nooit buite 'n volledig toegeruste operasie-omgewing gebruik nie.",
      "Hierdie medisyne is nooit vir selftoediening nie. Materia versin nie 'n minimum alveolêre konsentrasieteiken, verdamperstelling, of geïnspireerde fraksie nie — dit word alles in reële tyd deur die anestesist ingestel en aangepas op grond van deurlopende pasiëntmonitering.",
      "'n Persoonlike of familiegeskiedenis van malignehandhawermia (MH) of onverklaarbare anestesie-verwante dood in 'n nabye familielid is krities belangrik — sevofluraan, soos alle vlugtige verdowingsmiddels, is 'n erkende MH-sneller; sê dit vir die anestesispan voor elke narkose.",
      "Sevofluraanberading sluit in die begrip dat ontwaak uit vlugtige narkose verband kan hou met kortstondige agitasie of verwarring, veral by kinders — die herstelspan antisipeer en bestuur dit; dit dui nie op skade nie.",
      "Vra jou anestesist of jou persoonlike of familiegeskiedenis van MH of enige vorige anestesiereaksie die beplande verdowingstegniek verander — veiliger alternatiewe soos totale intraveneuse narkose bestaan en kan bespreek word.",
      "As jy of 'n familielid ooit onverklaarbare koors, spierrigiditeit, of abnormale kleurverandering tydens chirurgie ervaar het — verseker dat dit duidelik gedokumenteer en aan die anestesispan voor elke toekomstige prosedure gekommunikeer word.",
    ],
    [
      "Sevoflurane ke sedimelo sa anaesthetic sa volatile halogenated se sebelisoang ka ho feletseng theatre — se fanoana ka vaporiser e behisitsoeng ke anaesthetist; se ke se ke sa sebelisoa kantle ho tikoloho e phethehileng ea ho sebetsa.",
      "Moriana ona ha o ka noa o itokisetsa. Materia ha e iqape taelo ea minimum alveolar concentration target, peakanyo ea vaporiser, kapa karolo e hemiloeng — tsohle li behoa le ho ntlafatsoa nako ea nnete ke anaesthetist ho latela ho hlokomela ha mokuli ho tsoelang pele.",
      "Histori ea motho ka noho kapa ea lelapa ea malignant hyperthermia (MH) kapa lefu le sa hlalosehang le amanang le anaesthesia ho setho sa lelapa se haufi ke bohlokoa ka ho fetisisa — sevoflurane, joaloka li-volatile anaesthetics tsohle, e tsejoile e le mpe ea ho qala MH; bolella sehlopha sa anaesthetic pele ho anaesthetic efe kapa efe.",
      "Keletso ea sevoflurane e kenyelletsa ho utloisisa hore ho vuka ho volatile anaesthesia ho ka amanoa le ho halefisoa ha nakoana kapa ho fokotseha, haholoholo baneng — sehlopha sa ho hola se lebelela le ho laola sena; ha se bontše kotsi.",
      "Botsa anaesthetist ea hau hore na histori ea hau ea motho ka noho kapa ea lelapa ea MH kapa karabelo efe kapa efe ea anaesthetic ea pejana e fetola tekhniki ea anaesthetic e reriloeng — liphetoho tse bolokehang tsa joalo ka total intravenous anaesthesia li teng 'me li ka buisanoa.",
      "Haeba wena kapa setho sa lelapa le bile le feberu e sa hlalosehang, ho qinela ha maikutlo, kapa phetoho e sa tloaelehang ea mmala nakong ea surgery — netefatsa hore sena se qoiloe ka ho hlakile 'me se hlalosoa ho sehlopha sa anaesthetic pele ho mohato ofe kapa ofe oa kamoso.",
    ],
    [
      "I-sevoflurane yi-volatile halogenated anaesthetic esetshenziswa ngokukhuselekileyo e-theatre — inikezwa nge-vaporiser ehlolwe yi-anaesthetist; ayizange isetyenziswe ngaphandle kwemveli yokusebenza epheleleyo.",
      "Esi yeza asizinikwa ngokwakho. I-Materia ayiyiqiqi umgingqi we-minimum alveolar concentration target, ukumiswa kwe-vaporiser, okanye inxalenye ephefumlweyo — zonke zinqunywa kwaye zilungiswa ngexesha langoku yi-anaesthetist ngokusekelwe ekuqhekeza kumguli okuqhubekayo.",
      "Imbali yomntu ngokwakhe okanye yosapho ye-malignant hyperthermia (MH) okanye ukufa okungachazekiyo okuhlobene ne-anaesthetic eluphawini losapho oluseduze kubaluleke kakhulu — i-sevoflurane, njengazo zonke ii-volatile anaesthetics, ibonwa njenge-MH trigger; xelela iqela le-anaesthetic ngaphambi kwanye ne-anaesthetic nganye.",
      "Iingcebiso ze-sevoflurane zibandakanya ukuqonda ukuba ukuvuka kwe-volatile anaesthesia kunokuhambisana nokucaphuka okuqhubekayo okanye ukudideka, ingakumbi ebantwaneni — iqela lokubuyisela lilindela kwaye lilawule oku; akubonisi ukuonakala.",
      "Buza i-anaesthetist yakho ukuba imbali yakho yomntu ngokwakhe okanye yosapho ye-MH okanye nayiphi impendulo yangaphambili ye-anaesthetic iguqula itekhnike ye-anaesthetic elungiselwayo — izinye eziphephileyo ezifana ne-total intravenous anaesthesia zikhona kwaye zinokuxoxwa.",
      "Ukuba wena okanye ilungu losapho nibe nalo umkhuhlane ongachazekiyo, ukuqina kwamasimu, okanye utshintsho lwemibala olungaqhelekiyo ngexesha lohlobo — qinisekisa ukuba oku kuqoshiwe ngokucacileyo kwaye kuxelwa kwiqela le-anaesthetic ngaphambi kwankqubo iza nganye.",
    ],
  ),
};
