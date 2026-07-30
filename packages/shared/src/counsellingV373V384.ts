/**
 * v373–v384 deepened SA counselling batch (6 lines × 5 langs) — STG/EML Paediatric Batch G.
 * ID/neonatal priority molecules. Original Materia educational scripts only —
 * no invented mg/kg doses, loading regimens, serum targets, IU amounts, or infusion rates.
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

export const COUNSELLING_V373_TO_V384: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-caffeine": five(
    [
      "Caffeine citrate is used in selected neonatal apnoea pathways — it is given only in hospital settings that can monitor breathing and heart rate.",
      "Materia does not invent a loading dose, maintenance regimen, or serum-level target — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the neonatal team about other methylxanthines, heart rhythm concerns, and ALL medicines the baby is receiving.",
      "Parents: ask what breathing pauses mean, when caffeine may be stopped, and what follow-up after discharge looks like.",
      "This is not a home stimulant for babies — dosing and monitoring stay with the clinical team.",
      "If breathing worsens, unusual jitteriness, vomiting, or feeding refusal develops — alert the care team immediately.",
    ],
    [
      "I-caffeine citrate isetshenziswa ezindleleni ezikhethiwe ze-apnoea yezinsana ezizelwe zingakakhuli — inikwa kuphela ezibhedlela ezingaqapha ukuphefumula nokushaya kwenhliziyo.",
      "I-Materia ayiqambi umthamo wokuqala, uhlelo lokugcina, noma umgomo wezinga legazi — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba lezinsana ngezinye izinto ze-methylxanthine, izinkinga zesigqi senhliziyo, nawo WONKE amaphilisi umntwana awatholayo.",
      "Abazali: buza ukuthi ukuphefumula okumisayo kusho ukuthini, i-caffeine ingayekwa nini, nokuthi ukulandela ngemva kokukhishwa kubukeka kanjani.",
      "Lokhu akuwona umuthi wasekhaya ovuselela izingane — ukunikeza nokuqapha kuhlala nethimba lezokwelapha.",
      "Uma ukuphefumula kuba kubi, ukuthuthumela okungajwayelekile, ukuhlanza, noma ukwenqaba ukudla kuvela — xwayisa ithimba ngokushesha.",
    ],
    [
      "Kafeïensitraat word in geselekteerde neonatale apnee-paaie gebruik — dit word slegs in hospitaalsettings gegee wat asemhaling en hartklop kan monitor.",
      "Materia versin nie 'n laaidosis, instandhoudingsregime, of serumvlakteiken nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die neonatale span van ander metielxantiene, hartritme kommer, en ALLE medisyne wat die baba ontvang.",
      "Ouers: vra wat asemhalingspouses beteken, wanneer kafeïen gestop mag word, en hoe opvolg na ontslag lyk.",
      "Dit is nie 'n huisstiluleermiddel vir babas nie — dosering en monitering bly by die kliniese span.",
      "As asemhaling versleg, ongewone bewing, braking, of voedingsweiering ontwikkel — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Caffeine citrate e sebelisoa litseleng tse khethiloeng tsa apnoea ea masea a sa tsoa tsoaloa — e fuoa feela libakeng tsa sepetlele tse ka hlokomelang ho hema le ho otla ha pelo.",
      "Materia ha e iqape tekanyo ea ho qala, kemiso ea ho boloka, kapa sepheo sa boemo ba mali — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha sa masea ka li-methylxanthine tse ling, mathata a morethetho oa pelo, le MERIANA EOHLE eo ngoana a e fumanang.",
      "Batsoali: botsa hore na ho khaotsa ha ho hema ho bolelang, caffeine e ka emisoa neng, le hore na ho latela ka mor'a ho tsoa ho shebahala joang.",
      "Sena ha se meriana ea lapeng e susumetsang bakeng sa masea — tekanyo le tlhokomelo li sala le sehlopha sa bongaka.",
      "Haeba ho hema ho mpefala, ho thothomela ho sa tloaelehang, ho hlatsa, kapa ho hana ho fepa ho hlaha — tsebisa sehlopha hang-hang.",
    ],
    [
      "I-caffeine citrate isetyenziswa kwiindlela ezikhethiweyo ze-apnoea yezana ezizelwe zingekakhuli — inikwa kuphela kwiindawo zesibhedlele ezinokujonga ukuphefumla nokubetha kwentliziyo.",
      "I-Materia ayiyiqiqi idosi yokuqala, inkqubo yokugcina, okanye usukelo lwenqanaba legazi — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela lezana ngezinye ii-methylxanthine, iingxaki zesingqisho sentliziyo, kunye NAWO ONKE amayeza umntwana awafumanayo.",
      "Abazali: buza ukuba ukuphefumla okumisayo kuthetha ntoni, i-caffeine ingayekwa nini, nokuba ukulandela emva kokukhululwa kubonakala njani.",
      "Oku ayililo iyeza lasekhaya elivuselela iintsana — ukunikezela nokujonga kuhlala neqela lezonyango.",
      "Ukuba ukuphefumla kuba mbi, ukungcangcazela okungaqhelekanga, ukugabha, okanye ukwala ukutya kuvela — xelela iqela ngoko nangoko.",
    ],
  ),

  "mol-cefotaxime": five(
    [
      "Cefotaxime is a third-generation cephalosporin used in selected neonatal and paediatric infection pathways — hospital teams set the regimen.",
      "Materia does not invent a mg/kg dose or meningitis regimen — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the team about penicillin or cephalosporin allergy, kidney disease, and ALL other medicines the child receives.",
      "Ask how long IV treatment is planned, when oral step-down may happen, and what fever or rash should trigger review.",
      "Finish the full antibiotic course the clinician sets — do not invent a stop day based on feeling better.",
      "If breathing difficulty, swelling, severe diarrhoea, or a spreading rash develops — seek care urgently.",
    ],
    [
      "I-cefotaxime i-cephalosporin yesizukulwane sesithathu esetshenziswa ezindleleni ezikhethiwe zezifo zezinsana nezingane — amathimba esibhedlela abeka uhlelo.",
      "I-Materia ayiqambi umthamo we-mg/kg noma uhlelo lwe-meningitis — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba nge-allergy ye-penicillin noma ye-cephalosporin, isifo sezinso, nawo WONKE amanye amaphilisi umntwana awatholayo.",
      "Buza ukuthi ukwelashwa kwe-IV kucatshangelwe isikhathi esingakanani, ukwehla ngomlomo kungenzeka nini, nokuthi umkhuhlane noma ukuqubuka kufanele kuqale ukubuyekezwa.",
      "Qedela inkambo ephelele ye-antibiotic udokotela ayibekayo — ungacabangi usuku lokuyeka ngokuzizwa ungcono.",
      "Uma ubunzima bokuphefumula, ukuvuvuka, uhudo olukhulu, noma ukuqubuka okusabalalayo kuvela — funa usizo ngokushesha.",
    ],
    [
      "Sefotaksiem is 'n derdegenerasie sefalosporien in geselekteerde neonatale en pediatriese infeksiepaaie — hospitaalspanne stel die regimen.",
      "Materia versin nie 'n mg/kg dosis of meningitis-regime nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die span van penisillien- of sefalosporienallergie, niersiekte, en ALLE ander medisyne wat die kind ontvang.",
      "Vra hoe lank IV-behandeling beplan is, wanneer mondelinge aftrap mag gebeur, en watter koors of uitslag hersiening moet sneller.",
      "Voltooi die volle antibiotikumkursus wat die klinikus stel — moenie 'n stopdag versin omdat dit beter voel nie.",
      "As asemnood, swelling, ernstige diarree, of 'n spreidende uitslag ontwikkel — soek dringend sorg.",
    ],
    [
      "Cefotaxime ke cephalosporin ea moloko oa boraro e sebelisoang litseleng tse khethiloeng tsa tšoaetso ea masea le bana — lihlopha tsa sepetlele li beha kemiso.",
      "Materia ha e iqape tekanyo ea mg/kg kapa kemiso ea meningitis — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka allergy ea penicillin kapa cephalosporin, lefu la liphio, le MERIANA EOHLE e meng eo ngoana a e fumanang.",
      "Botsoa hore na kalafo ea IV e reriloe nako e kae, ho theoha ka molomo ho ka etsahala neng, le hore na feberu kapa lekhopho li lokela ho qala tlhahlobo.",
      "Qetella thuto e felletseng ea antibiotic eo ngaka e e behang — u se ke ua iqapa letsatsi la ho emisa hobane u ikutloa u le betere.",
      "Haeba ho hema thata, ho ruruha, letshollo le matla, kapa lekhopho le hasanang le hlaha — batla thuso ka potlako.",
    ],
    [
      "I-cefotaxime yi-cephalosporin yesizukulwana sesithathu esetyenziswa kwiindlela ezikhethiweyo zeentsholongwane zezana nabantwana — amaqela esibhedlele abeka inkqubo.",
      "I-Materia ayiyiqiqi idosi ye-mg/kg okanye inkqubo ye-meningitis — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela nge-allergy ye-penicillin okanye ye-cephalosporin, isifo sezintso, kunye NAWO ONKE amanye amayeza umntwana awafumanayo.",
      "Buza ukuba unyango lwe-IV lucingelwe ixesha elingakanani, ukuhla ngomlomo kungenzeka nini, nokuba umkhuhlane okanye irhashalala kufuneka kuqalise ukujongwa.",
      "Gqiba ikhosi epheleleyo ye-antibiotic ugqirha ayibekayo — ungacingi usuku lokuyeka ngenxa yokuziva ungcono.",
      "Ukuba ubunzima bokuphefumla, ukudumba, urhudo olukhulu, okanye irhashalala esasazekayo kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-ceftazidime": five(
    [
      "Ceftazidime is an antipseudomonal cephalosporin used in selected paediatric infection pathways — often IV in hospital.",
      "Materia does not invent a mg/kg dose — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the team about cephalosporin allergy, kidney disease, and ALL other antibiotics the child is receiving.",
      "Ask why this antibiotic was chosen and what cultures or reviews will guide stopping or changing it.",
      "Do not invent home IV schedules — administration stays with trained clinicians unless a formal home-IV programme applies.",
      "If rash, wheeze, severe diarrhoea, or reduced urine output develops — seek care urgently.",
    ],
    [
      "I-ceftazidime i-cephalosporin elwa ne-pseudomonas esetshenziswa ezindleleni ezikhethiwe zezifo zezingane — ngokuvamile i-IV esibhedlela.",
      "I-Materia ayiqambi umthamo we-mg/kg — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba nge-allergy ye-cephalosporin, isifo sezinso, nawo WONKE amanye ama-antibiotic umntwana awatholayo.",
      "Buza ukuthi kungani le antibiotic ikhethiwe nokuthi yimaphi amasiko noma ukubuyekezwa okuzoqondisa ukuyeka noma ukushintsha.",
      "Ungacabangi izinhlelo ze-IV zasekhaya — ukunikeza kuhlala nongqondongqondo abaqeqeshiwe ngaphandle kohlelo olusemthethweni lwe-IV yasekhaya.",
      "Uma ukuqubuka, ukuhema kanzima, uhudo olukhulu, noma ukuncipha komchamo kuvela — funa usizo ngokushesha.",
    ],
    [
      "Seftasidiem is 'n antipseudomonale sefalosporien in geselekteerde pediatriese infeksiepaaie — dikwels IV in hospitaal.",
      "Materia versin nie 'n mg/kg dosis nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die span van sefalosporienallergie, niersiekte, en ALLE ander antibiotika wat die kind ontvang.",
      "Vra waarom hierdie antibiotikum gekies is en watter kulture of hersienings sal lei tot stop of verandering.",
      "Moenie tuis-IV skedules versin nie — toediening bly by opgeleide klinici tensy 'n formele tuis-IV program geld.",
      "As uitslag, piepende asem, ernstige diarree, of verminderde urine-uitset ontwikkel — soek dringend sorg.",
    ],
    [
      "Ceftazidime ke cephalosporin e loantšanang le pseudomonas e sebelisoang litseleng tse khethiloeng tsa tšoaetso ea bana — hangata IV sepetlele.",
      "Materia ha e iqape tekanyo ea mg/kg — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka allergy ea cephalosporin, lefu la liphio, le LI-ANTIBIOTIC TSOHLE tse ling tseo ngoana a li fumanang.",
      "Botsoa hore na ke hobaneng antibiotic ena e khethiloe le hore na ke litloaelo life kapa litlhahlobo tse tla tataisa ho emisa kapa ho fetola.",
      "U se ke ua iqapa kemiso ea IV ea lapeng — ho fana ho sala le lingaka tse koetlisitsoeng ntle le lenaneo le hlophisitsoeng la IV ea lapeng.",
      "Haeba lekhopho, ho hema ka thata, letshollo le matla, kapa ho fokotseha ha moroto ho hlaha — batla thuso ka potlako.",
    ],
    [
      "I-ceftazidime yi-cephalosporin elwa ne-pseudomonas esetyenziswa kwiindlela ezikhethiweyo zeentsholongwane zabantwana — rhoqo i-IV esibhedlele.",
      "I-Materia ayiyiqiqi idosi ye-mg/kg — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela nge-allergy ye-cephalosporin, isifo sezintso, kunye NAZO ZONKE ezinye ii-antibiotic umntwana azifumanayo.",
      "Buza ukuba kutheni le antibiotic ikhethiwe nokuba zeziphi iinkcubeko okanye ukujonga okuya kukhokela ukuyeka okanye ukutshintsha.",
      "Ungacingi iishedyuli ze-IV zasekhaya — ukunikezela kuhlala koogqirha abaqeqeshiweyo ngaphandle kwenkqubo esemthethweni ye-IV yasekhaya.",
      "Ukuba irhashalala, ukuphefumla nzima, urhudo olukhulu, okanye ukuncipha komchamo kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-amikacin": five(
    [
      "Amikacin is an aminoglycoside used in selected neonatal, paediatric, and mycobacterial pathways — kidney and hearing monitoring matter.",
      "Materia does not invent a mg/kg dose or level-monitoring interval — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the team about kidney disease, hearing concerns, dehydration, and ALL other medicines that can stress the kidneys.",
      "Ask which blood levels and hearing checks are planned and what reduced urine or ringing in the ears should trigger review.",
      "Do not invent home injection schedules — aminoglycosides stay under clinical oversight.",
      "If hearing changes, dizziness, markedly reduced urine, or rash with fever develops — seek care urgently.",
    ],
    [
      "I-amikacin i-aminoglycoside esetshenziswa ezindleleni ezikhethiwe zezinsana, izingane, neze-mycobacteria — ukuqapha izinho nokuzwa kubalulekile.",
      "I-Materia ayiqambi umthamo we-mg/kg noma isikhathi sokuqapha amazinga — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba ngesifo sezinso, izinkinga zokuzwa, ukoma, nawo WONKE amanye amaphilisi angacindezela izinho.",
      "Buza ukuthi yimaphi amazinga egazi nokuhlolwa kokuzwa okucwangisiwe nokuthi umchamo omncane noma umsindo ezindlebeni kufanele kuqale ukubuyekezwa.",
      "Ungacabangi izinhlelo zomjovo wasekhaya — ama-aminoglycoside ahlala ngaphansi kokuqapha kwezokwelapha.",
      "Uma ukuzwa kushintsha, isiyezi, umchamo omncane kakhulu, noma ukuqubuka nomkhuhlane kuvela — funa usizo ngokushesha.",
    ],
    [
      "Amikasien is 'n aminoglikosied in geselekteerde neonatale, pediatriese, en mikobakteriële paaie — nier- en gehoormonitering maak saak.",
      "Materia versin nie 'n mg/kg dosis of vlakmoniteringsinterval nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die span van niersiekte, gehoorkommer, dehidrasie, en ALLE ander medisyne wat die niere kan belas.",
      "Vra watter bloedvlakke en gehoortoetse beplan is en watter verminderde urine of oorsuising hersiening moet sneller.",
      "Moenie tuis-inspuitingskedules versin nie — aminoglikosiede bly onder kliniese toesig.",
      "As gehoorveranderinge, duiseligheid, merkbaar verminderde urine, of uitslag met koors ontwikkel — soek dringend sorg.",
    ],
    [
      "Amikacin ke aminoglycoside e sebelisoang litseleng tse khethiloeng tsa masea, bana, le mycobacteria — tlhokomelo ea liphio le kutlo e bohlokoa.",
      "Materia ha e iqape tekanyo ea mg/kg kapa nako ea tlhokomelo ea maemo — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka lefu la liphio, mathata a kutlo, ho omella, le MERIANA EOHLE e meng e ka hatellang liphio.",
      "Botsoa hore na ke maemo afe a mali le liteko tsa kutlo tse reriloeng le hore na moroto o fokotsehileng kapa molumo litsebeng o lokela ho qala tlhahlobo.",
      "U se ke ua iqapa kemiso ea ente ea lapeng — li-aminoglycoside li sala tlas'a tlhokomelo ea bongaka.",
      "Haeba liphetoho tsa kutlo, ho tsekela, moroto o fokotsehileng haholo, kapa lekhopho le feberu li hlaha — batla thuso ka potlako.",
    ],
    [
      "I-amikacin yi-aminoglycoside esetyenziswa kwiindlela ezikhethiweyo zezana, abantwana, kunye ne-mycobacteria — ukujonga izintso nokuva kubalulekile.",
      "I-Materia ayiyiqiqi idosi ye-mg/kg okanye ixesha lokujonga amanqanaba — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela ngesifo sezintso, iingxaki zokuva, ukoma, kunye NAWO ONKE amanye amayeza anokucinezelela izintso.",
      "Buza ukuba ngawaphi amanqanaba egazi kunye neemvavanyo zokuva ezicwangcisiweyo nokuba umchamo omncinci okanye umsindo ezindlebeni kufuneka kuqalise ukujongwa.",
      "Ungacingi iishedyuli zenaliti zasekhaya — ii-aminoglycoside zihlala phantsi kokujonga kwezonyango.",
      "Ukuba utshintsho lokuva, isiyezi, umchamo omncinci kakhulu, okanye irhashalala nomkhuhlane kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-piperacillin-tazobactam": five(
    [
      "Piperacillin/tazobactam is an extended-spectrum penicillin combination used in selected severe paediatric infections — hospital IV use is typical.",
      "Materia does not invent a mg/kg dose or infusion schedule — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the team about penicillin allergy, kidney disease, and ALL other medicines before administration.",
      "Ask what infection is being treated, how long the course may run, and what fever pattern should prompt review.",
      "Stay for the observation period after the first doses if the team advises — allergy can present after infusion starts.",
      "If rash, wheeze, facial swelling, or collapse develops during or after infusion — seek emergency care immediately.",
    ],
    [
      "I-piperacillin/tazobactam inhlanganisela ye-penicillin yesibalo esibanzi esetshenziswa ezifweni ezinzima ezikhethiwe zezingane — ukusetshenziswa kwe-IV esibhedlela kujwayelekile.",
      "I-Materia ayiqambi umthamo we-mg/kg noma uhlelo lokufaka emithanjeni — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba nge-allergy ye-penicillin, isifo sezinso, nawo WONKE amanye amaphilisi ngaphambi kokunikezwa.",
      "Buza ukuthi yisiphi isifo eselashwayo, inkambo ingaqhubeka isikhathi esingakanani, nokuthi yimuphi umkhuhlane ofanele uqale ukubuyekezwa.",
      "Hlala isikhathi sokubhekwa ngemva kwemithamo yokuqala uma ithimba licebisa — i-allergy ingenela ngemva kokuqala kokufaka.",
      "Uma ukuqubuka, ukuhema kanzima, ukuvuvuka kobuso, noma ukuwa kuvela ngesikhathi noma ngemva kokufaka — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Piperasilien/tasobaktam is 'n uitgebreide-spektrum penisillienkombinasie in geselekteerde ernstige pediatriese infeksies — hospitaal-IV gebruik is tipies.",
      "Materia versin nie 'n mg/kg dosis of infusieskedule nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die span van penisillienallergie, niersiekte, en ALLE ander medisyne voor toediening.",
      "Vra watter infeksie behandel word, hoe lank die kursus mag loop, en watter koorspatroon hersiening moet sneller.",
      "Bly vir die waarnemingstydperk na die eerste dosisse as die span dit aanbeveel — allergie kan ná begin van infusie verskyn.",
      "As uitslag, piepende asem, gesigswelling, of ineenstorting tydens of na infusie ontwikkel — soek onmiddellik noodgeval sorg.",
    ],
    [
      "Piperacillin/tazobactam ke motsoako oa penicillin oa spektrum e pharaletseng o sebelisoang tšoaetsong tse matla tse khethiloeng tsa bana — tšebeliso ea IV ea sepetlele e tloaelehile.",
      "Materia ha e iqape tekanyo ea mg/kg kapa kemiso ea infusion — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka allergy ea penicillin, lefu la liphio, le MERIANA EOHLE e meng pele ho fana.",
      "Botsoa hore na ke tšoaetso efe e phekoloang, thuto e ka tsamaea nako e kae, le hore na ke mokhoa ofe oa feberu o lokelang ho qala tlhahlobo.",
      "Lula nako ea ho sheba ka mor'a litekanyo tsa pele haeba sehlopha se eletsa — allergy e ka hlaha ka mor'a hore infusion e qale.",
      "Haeba lekhopho, ho hema ka thata, ho ruruha ha sefahleho, kapa ho oa ho etsahala nakong kapa ka mor'a infusion — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-piperacillin/tazobactam yindibaniselwano ye-penicillin yomda obanzi esetyenziswa kwiintsholongwane ezinzima ezikhethiweyo zabantwana — ukusetyenziswa kwe-IV esibhedlele kuqhelekile.",
      "I-Materia ayiyiqiqi idosi ye-mg/kg okanye ishedyuli yokugalela — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela nge-allergy ye-penicillin, isifo sezintso, kunye NAWO ONKE amanye amayeza ngaphambi kokunikezelwa.",
      "Buza ukuba yeyiphi intsholongwane enyangwayo, ikhosi inokuqhuba ixesha elingakanani, nokuba yeyiphi ipateni yomkhuhlane ekufuneka iqalise ukujongwa.",
      "Hlala ixesha lokujonga emva kweedosi zokuqala ukuba iqela licebisa — i-allergy inokuvela emva kokuqala kokugalela.",
      "Ukuba irhashalala, ukuphefumla nzima, ukudumba kobuso, okanye ukuwa kuvela ngexesha okanye emva kokugalela — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-flucytosine": five(
    [
      "Flucytosine is an antifungal used in selected cryptococcal and candidal pathways, often in combination — blood-count monitoring is common.",
      "Materia does not invent a dose or therapeutic-drug-monitoring target — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the team about kidney disease, blood disorders, pregnancy concerns if relevant, and ALL other medicines.",
      "Ask which blood tests are planned and what fever, mouth ulcers, or unusual bruising should trigger earlier review.",
      "Do not stop combination antifungal therapy early without the infectious-disease plan — incomplete courses risk relapse.",
      "If severe diarrhoea, rash with fever, unusual bleeding, or marked tiredness develops — seek care urgently.",
    ],
    [
      "I-flucytosine i-antifungal esetshenziswa ezindleleni ezikhethiwe ze-cryptococcal neze-Candida, ngokuvamile nenhlanganisela — ukuqapha ukubalwa kwegazi kujwayelekile.",
      "I-Materia ayiqambi umthamo noma umgomo wokuqapha umuthi — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba ngesifo sezinso, izinkinga zegazi, ukukhulelwa uma kufanele, nawo WONKE amanye amaphilisi.",
      "Buza ukuthi yiziphi izivivinyo zegazi ezicwangisiwe nokuthi umkhuhlane, izilonda zomlomo, noma ukulimala okungajwayelekile kufanele kuqale ukubuyekezwa.",
      "Ungayeki ukwelashwa kwe-antifungal enhlanganisweni kusenesikhathi ngaphandle kohlelo lwezifo ezithathelanayo — izinkambo ezingaphelele zibeka engcupheni ukubuya.",
      "Uma uhudo olukhulu, ukuqubuka nomkhuhlane, ukopha okungajwayelekile, noma ukukhathala okukhulu kuvela — funa usizo ngokushesha.",
    ],
    [
      "Flusitosien is 'n antifungale middel in geselekteerde kriptokokkale en kandidale paaie, dikwels in kombinasie — bloedtelling monitering is algemeen.",
      "Materia versin nie 'n dosis of terapeutiese middelmoniteringteiken nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die span van niersiekte, bloedversteurings, swangerskapkommer indien relevant, en ALLE ander medisyne.",
      "Vra watter bloedtoetse beplan is en watter koors, mondsere, of ongewone kneusings vroeër hersiening moet sneller.",
      "Moenie kombinasie antifungale terapie vroeg stop sonder die infeksiesiekte-plan nie — onvolledige kursusse waag terugval.",
      "As ernstige diarree, uitslag met koors, ongewone bloeding, of merkbare moegheid ontwikkel — soek dringend sorg.",
    ],
    [
      "Flucytosine ke antifungal e sebelisoang litseleng tse khethiloeng tsa cryptococcal le Candida, hangata ka motsoako — tlhokomelo ea palo ea mali e tloaelehile.",
      "Materia ha e iqape tekanyo kapa sepheo sa tlhokomelo ea meriana — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka lefu la liphio, mathata a mali, mathata a bokhachane haeba ho hlokahala, le MERIANA EOHLE e meng.",
      "Botsoa hore na ke liteko life tsa mali tse reriloeng le hore na feberu, lisoa tsa molomo, kapa ho otlaha ho sa tloaelehang ho lokela ho qala tlhahlobo pele.",
      "U se ke ua emisa kalafo ea antifungal ea motsoako kapele ntle le moralo oa mafu a tšoaetsanoang — lithuto tse sa fellang li beha kotsing ea ho khutla.",
      "Haeba letshollo le matla, lekhopho le feberu, ho tsoa mali ho sa tloaelehang, kapa mokhathala o hlakileng o hlaha — batla thuso ka potlako.",
    ],
    [
      "I-flucytosine yi-antifungal esetyenziswa kwiindlela ezikhethiweyo ze-cryptococcal kunye ne-Candida, rhoqo nendibaniselwano — ukujonga ukubalwa kwegazi kuqhelekile.",
      "I-Materia ayiyiqiqi idosi okanye usukelo lokujonga iyeza — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela ngesifo sezintso, iingxaki zegazi, iinkxalabo zokukhulelwa ukuba kufanelekile, kunye NAWO ONKE amanye amayeza.",
      "Buza ukuba zeziphi iimvavanyo zegazi ezicwangcisiweyo nokuba umkhuhlane, izilonda zomlomo, okanye ukulimala okungaqhelekanga kufuneka kuqalise ukujongwa kwangethuba.",
      "Ungayeki unyango lwe-antifungal yendibaniselwano kwangethuba ngaphandle kwesicwangciso sezifo ezosulelayo — iikhosi ezingaphelelanga zibeka umngcipheko wokubuya.",
      "Ukuba urhudo olukhulu, irhashalala nomkhuhlane, ukopha okungaqhelekanga, okanye ukudinwa okucacileyo kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-primaquine": five(
    [
      "Primaquine is an 8-aminoquinoline antimalarial used for selected radical-cure and gametocyte pathways — G6PD status matters clinically.",
      "Materia does not invent a mg/kg dose or course length — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the clinician about G6PD results if known, pregnancy concerns in adolescents, and ALL other medicines before starting.",
      "Ask whether G6PD testing is required before the first dose and what dark urine or unusual tiredness should trigger review.",
      "Finish the full course the malaria team sets — incomplete radical cure risks relapse for some malaria types.",
      "If dark urine, severe tiredness, yellow eyes, or breathing difficulty develops — seek care urgently.",
    ],
    [
      "I-primaquine i-antimalarial ye-8-aminoquinoline esetshenziswa ezindleleni ezikhethiwe zokwelapha ngokuphelele neze-gametocyte — isimo se-G6PD sibalulekile.",
      "I-Materia ayiqambi umthamo we-mg/kg noma ubude benkambo — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngemiphumela ye-G6PD uma yaziwa, ukukhulelwa kwezentsha, nawo WONKE amanye amaphilisi ngaphambi kokuqala.",
      "Buza ukuthi ukuhlolwa kwe-G6PD kuyadingeka ngaphambi komthamo wokuqala nokuthi umchamo omnyama noma ukukhathala okungajwayelekile kufanele kuqale ukubuyekezwa.",
      "Qedela inkambo ephelele ithimba le-malaria eliyibekayo — ukwelapha okungaphelele kubeka engcupheni ukubuya kwezinye izinhlobo ze-malaria.",
      "Uma umchamo omnyama, ukukhathala okukhulu, amehlo aphuzi, noma ubunzima bokuphefumula kuvela — funa usizo ngokushesha.",
    ],
    [
      "Primakwien is 'n 8-aminokinolien antimalaria middel vir geselekteerde radikale genesing- en gametosietpaaie — G6PD-status maak klinies saak.",
      "Materia versin nie 'n mg/kg dosis of kursuslengte nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van G6PD-resultate indien bekend, swangerskapkommer by adolessente, en ALLE ander medisyne voor jy begin.",
      "Vra of G6PD-toetsing voor die eerste dosis vereis word en watter donker urine of ongewone moegheid hersiening moet sneller.",
      "Voltooi die volle kursus wat die malaria-span stel — onvolledige radikale genesing waag terugval vir sommige malaria tipes.",
      "As donker urine, ernstige moegheid, geel oë, of asemnood ontwikkel — soek dringend sorg.",
    ],
    [
      "Primaquine ke antimalaria ea 8-aminoquinoline e sebelisoang litseleng tse khethiloeng tsa ho folisa ka botlalo le tsa gametocyte — boemo ba G6PD bo bohlokoa kliniking.",
      "Materia ha e iqape tekanyo ea mg/kg kapa bolelele ba thuto — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka liphetho tsa G6PD haeba li tsejoa, mathata a bokhachane ho bacha, le MERIANA EOHLE e meng pele u qala.",
      "Botsoa hore na tlhahlobo ea G6PD e hlokahala pele ho tekanyo ea pele le hore na moroto o lefifi kapa mokhathala o sa tloaelehang o lokela ho qala tlhahlobo.",
      "Qetella thuto e felletseng eo sehlopha sa malaria se e behang — kalafo e sa fellang e beha kotsing ea ho khutla bakeng sa mefuta e meng ea malaria.",
      "Haeba moroto o lefifi, mokhathala o matla, mahlo a mosehla, kapa ho hema thata ho hlaha — batla thuso ka potlako.",
    ],
    [
      "I-primaquine yi-antimalarial ye-8-aminoquinoline esetyenziswa kwiindlela ezikhethiweyo zokuphilisa ngokupheleleyo kunye ne-gametocyte — imeko ye-G6PD ibalulekile ngokwezonyango.",
      "I-Materia ayiyiqiqi idosi ye-mg/kg okanye ubude bekhosi — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngeziphumo ze-G6PD ukuba ziyaziwa, iinkxalabo zokukhulelwa kwolutsha, kunye NAWO ONKE amanye amayeza ngaphambi kokuqala.",
      "Buza ukuba uvavanyo lwe-G6PD luyafuneka ngaphambi kwedosi yokuqala nokuba umchamo omnyama okanye ukudinwa okungaqhelekanga kufuneka kuqalise ukujongwa.",
      "Gqiba ikhosi epheleleyo iqela le-malaria eliyibekayo — unyango olungaphelelanga lubeka umngcipheko wokubuya kwezinye iintlobo ze-malaria.",
      "Ukuba umchamo omnyama, ukudinwa okukhulu, amehlo atyheli, okanye ubunzima bokuphefumla kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-miconazole": five(
    [
      "Miconazole is an imidazole antifungal used in selected topical and mucosal Candida pathways in children — form and site matter.",
      "Materia does not invent an application schedule or oral-gel regimen — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the clinician about other azole antifungals, warfarin if relevant in older teens, and any prior irritation.",
      "For oral gel, keep in contact with affected areas as the label advises — do not invent a swallowing technique.",
      "Ask how long to continue after spots improve and when to return if thrush persists or spreads.",
      "If swelling of lips or throat, wheeze, or severe rash develops — seek emergency care immediately.",
    ],
    [
      "I-miconazole i-imidazole antifungal esetshenziswa ezindleleni ezikhethiwe zesikhumba nezimucosal ze-Candida ezinganeni — uhlobo nendawo kubalulekile.",
      "I-Materia ayiqambi uhlelo lokufaka noma uhlelo lwe-gel yomlomo — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngezinye izinto ze-azole antifungal, i-warfarin uma kufanele entsheni, nanoma yikuphi ukucasuka kwangaphambilini.",
      "Ku-gel yomlomo, gcina ithintana nezindawo ezithintekile njengoba ilebula icebisa — ungacabangi indlela yokugwinya.",
      "Buza ukuthi uqhubeka isikhathi esingakanani ngemva kokuthuthuka kwamabala nokuthi ubuyela nini uma i-thrush iqhubeka noma isabalala.",
      "Uma ukuvuvuka kwezindebe noma umphimbo, ukuhema kanzima, noma ukuqubuka okukhulu kuvela — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Mikonasool is 'n imidazool antifungale middel in geselekteerde topiese en mukosale Candida-paaie by kinders — vorm en plek maak saak.",
      "Materia versin nie 'n aanwendingsskudule of mondjel-regime nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van ander asool antifungale middels, warfarien indien relevant by ouer tieners, en enige vorige irritasie.",
      "Vir mondjel, hou kontak met aangetaste areas soos die etiket aanbeveel — moenie 'n sluktegniek versin nie.",
      "Vra hoe lank om voort te gaan nadat kolle verbeter en wanneer om terug te kom as sproei aanhou of versprei.",
      "As swelling van lippe of keel, piepende asem, of ernstige uitslag ontwikkel — soek onmiddellik noodgeval sorg.",
    ],
    [
      "Miconazole ke imidazole antifungal e sebelisoang litseleng tse khethiloeng tsa letlalo le mucosal tsa Candida ho bana — sebopeho le sebaka lia bohlokoa.",
      "Materia ha e iqape kemiso ea ho kenya kapa kemiso ea gel ea molomo — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka li-azole antifungal tse ling, warfarin haeba ho hlokahala ho bacha ba baholoanyane, le ho teka hafe kapa hafe ha pejana.",
      "Bakeng sa gel ea molomo, boloka e kopane le libaka tse amehang joalo ka ha ileibole e eletsa — u se ke ua iqapa mokhoa oa ho koenya.",
      "Botsoa hore na u tsoela pele nako e kae ka mor'a hore matheba a ntlafale le hore na u khutle neng haeba thrush e tsoela pele kapa e hasana.",
      "Haeba ho ruruha ha melomo kapa 'metso, ho hema ka thata, kapa lekhopho le matla le hlaha — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-miconazole yi-imidazole antifungal esetyenziswa kwiindlela ezikhethiweyo zolusu kunye ne-mucosal ze-Candida kubantwana — uhlobo nendawo kubalulekile.",
      "I-Materia ayiyiqiqi ishedyuli yokufaka okanye inkqubo ye-gel yomlomo — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngezinye ii-azole antifungal, i-warfarin ukuba kufanelekile kulutsha oludala, kunye nayiphi na ukucaphuka kwangaphambili.",
      "Kwi-gel yomlomo, gcina ithintana neendawo ezichaphazelekileyo njengoko ilebhile icebisa — ungacingi indlela yokuginya.",
      "Buza ukuba uqhubeka ixesha elingakanani emva kokuba amabala aphucuke nokuba ubuyela nini ukuba i-thrush iyaqhubeka okanye iyasasazeka.",
      "Ukuba ukudumba kwemilebe okanye umqala, ukuphefumla nzima, okanye irhashalala enzima kuvela — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-levofloxacin": five(
    [
      "Levofloxacin is a fluoroquinolone used in selected paediatric infection and DR-TB pathways under specialist guidance — joint and tendon counselling matters.",
      "Materia does not invent a mg/kg dose — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the clinician about tendon problems, myasthenia, epilepsy, pregnancy concerns in adolescents, and ALL other medicines.",
      "Ask why a fluoroquinolone was chosen and what warning signs (joint pain, tendon pain, mood change) should stop the medicine pending review.",
      "Do not invent sun-exposure rules — follow the labelled product and clinician advice for photosensitivity if relevant.",
      "If tendon pain, severe joint swelling, seizures, or breathing difficulty develops — seek care urgently.",
    ],
    [
      "I-levofloxacin i-fluoroquinolone esetshenziswa ezindleleni ezikhethiwe zezifo zezingane neze-DR-TB ngaphansi kweseluleko sochwepheshe — ukwelulekwa ngamajoyinti nematende kubalulekile.",
      "I-Materia ayiqambi umthamo we-mg/kg — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngezinkinga zamatende, i-myasthenia, i-epilepsy, ukukhulelwa kwezentsha, nawo WONKE amanye amaphilisi.",
      "Buza ukuthi kungani i-fluoroquinolone ikhethiwe nokuthi yiziphi izimpawu zokuxwayisa (ubuhlungu bejoyinti, ubuhlungu betende, ukushintsha kwemizwa) ezifanele zimise umuthi kuze kubuyekezwe.",
      "Ungacabangi imithetho yokuchayeka elangeni — landela umkhiqizo onelebula neseluleko sikadokotela se-photosensitivity uma kufanele.",
      "Uma ubuhlungu betende, ukuvuvuka kwejoyinti okukhulu, ukuxega, noma ubunzima bokuphefumula kuvela — funa usizo ngokushesha.",
    ],
    [
      "Levofloksasien is 'n fluorokinoloon in geselekteerde pediatriese infeksie- en DR-TB-paaie onder spesialisleiding — gewrig- en tendonberading maak saak.",
      "Materia versin nie 'n mg/kg dosis nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van tendonprobleme, miastenie, epilepsie, swangerskapkommer by adolessente, en ALLE ander medisyne.",
      "Vra waarom 'n fluorokinoloon gekies is en watter waarskuwingstekens (gewrigspyn, tendonpyn, bui verandering) die medisyne moet stop hangende hersiening.",
      "Moenie sonblootstellingsreëls versin nie — volg die geëtiketteerde produk en klinikusadvies vir fotosensitiwiteit indien relevant.",
      "As tendonpyn, ernstige gewrigswelling, aanvalle, of asemnood ontwikkel — soek dringend sorg.",
    ],
    [
      "Levofloxacin ke fluoroquinolone e sebelisoang litseleng tse khethiloeng tsa tšoaetso ea bana le tsa DR-TB tlas'a tataiso ea setsebi — keletso ea manonyeletso le litendon e bohlokoa.",
      "Materia ha e iqape tekanyo ea mg/kg — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka mathata a litendon, myasthenia, epilepsy, mathata a bokhachane ho bacha, le MERIANA EOHLE e meng.",
      "Botsoa hore na ke hobaneng fluoroquinolone e khethiloe le hore na ke matšoao afe a temoso (bohloko ba manonyeletso, bohloko ba tendon, phetoho ea maikutlo) a lokelang ho emisa meriana ho fihlela tlhahlobo.",
      "U se ke ua iqapa melao ea ho pepeseha letsatsing — latela sehlahisoa se nang le ileibole le keletso ea ngaka bakeng sa photosensitivity haeba ho hlokahala.",
      "Haeba bohloko ba tendon, ho ruruha ha manonyeletso ho matla, ho thothomela, kapa ho hema thata ho hlaha — batla thuso ka potlako.",
    ],
    [
      "I-levofloxacin yi-fluoroquinolone esetyenziswa kwiindlela ezikhethiweyo zeentsholongwane zabantwana kunye ne-DR-TB phantsi kwesikhokelo segcisa — iingcebiso zamalungu kunye nee-tendon zibalulekile.",
      "I-Materia ayiyiqiqi idosi ye-mg/kg — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngeengxaki zee-tendon, i-myasthenia, i-epilepsy, iinkxalabo zokukhulelwa kulutsha, kunye NAWO ONKE amanye amayeza.",
      "Buza ukuba kutheni i-fluoroquinolone ikhethiwe nokuba zeziphi iimpawu zesilumkiso (intlungu yelungu, intlungu ye-tendon, utshintsho lwemvakalelo) ekufuneka zimise iyeza de kujongwe.",
      "Ungacingi imithetho yokutyhileka elangeni — landela imveliso enelebula kunye neengcebiso zogqirha ze-photosensitivity ukuba kufanelekile.",
      "Ukuba intlungu ye-tendon, ukudumba kwelungu okukhulu, ukuxhuzula, okanye ubunzima bokuphefumla kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-dapsone": five(
    [
      "Dapsone is a sulfone used in selected leprosy, dermatitis herpetiformis, and PCP-prophylaxis contexts — haemolysis risk rises with G6PD deficiency.",
      "Materia does not invent a dose — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the clinician about G6PD status if known, anaemia history, sulfa allergy, and ALL other medicines before starting.",
      "Ask which blood counts are monitored and what dark urine, pale gums, or unusual tiredness should trigger review.",
      "Do not stop long-term prophylaxis suddenly without a clinician plan if it is part of an infection-prevention pathway.",
      "If dark urine, severe tiredness, rash with fever, or breathing difficulty develops — seek care urgently.",
    ],
    [
      "I-dapsone i-sulfone esetshenziswa ezimeni ezikhethiwe ze-leprosy, i-dermatitis herpetiformis, neze-PCP-prophylaxis — ubungozi be-haemolysis bukhula nge-G6PD deficiency.",
      "I-Materia ayiqambi umthamo — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela udokotela ngesimo se-G6PD uma saziwa, umlando we-anaemia, i-allergy ye-sulfa, nawo WONKE amanye amaphilisi ngaphambi kokuqala.",
      "Buza ukuthi yimaphi ukubalwa kwegazi okuqashiwe nokuthi umchamo omnyama, izinhliziyo ezimpunga, noma ukukhathala okungajwayelekile kufanele kuqale ukubuyekezwa.",
      "Ungayeki i-prophylaxis yesikhathi eside ngokuzumayo ngaphandle kohlelo lukadokotela uma iyingxenye yendlela yokuvimbela izifo.",
      "Uma umchamo omnyama, ukukhathala okukhulu, ukuqubuka nomkhuhlane, noma ubunzima bokuphefumula kuvela — funa usizo ngokushesha.",
    ],
    [
      "Dapsoon is 'n sulfone in geselekteerde lepra, dermatitis herpetiformis, en PCP-profilakse kontekste — hemolise risiko styg met G6PD-tekort.",
      "Materia versin nie 'n dosis nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die klinikus van G6PD-status indien bekend, anemiegeskiedenis, sulfa-allergie, en ALLE ander medisyne voor jy begin.",
      "Vra watter bloedtellings gemonitor word en watter donker urine, bleek tandvleis, of ongewone moegheid hersiening moet sneller.",
      "Moenie langtermyn profilakse skielik stop sonder 'n klinikusplan nie as dit deel van 'n infeksievoorkomingspad is.",
      "As donker urine, ernstige moegheid, uitslag met koors, of asemnood ontwikkel — soek dringend sorg.",
    ],
    [
      "Dapsone ke sulfone e sebelisoang maemong a khethiloeng a leprosy, dermatitis herpetiformis, le PCP-prophylaxis — kotsi ea haemolysis e phahama ka khaello ea G6PD.",
      "Materia ha e iqape tekanyo — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella ngaka ka boemo ba G6PD haeba bo tsejoa, nalane ea anaemia, allergy ea sulfa, le MERIANA EOHLE e meng pele u qala.",
      "Botsoa hore na ke lipalo life tsa mali tse hlokomeloang le hore na moroto o lefifi, marenana a sootho, kapa mokhathala o sa tloaelehang o lokela ho qala tlhahlobo.",
      "U se ke ua emisa prophylaxis ea nako e telele ka tšohanyetso ntle le moralo oa ngaka haeba e le karolo ea tsela ea thibelo ea tšoaetso.",
      "Haeba moroto o lefifi, mokhathala o matla, lekhopho le feberu, kapa ho hema thata ho hlaha — batla thuso ka potlako.",
    ],
    [
      "I-dapsone yi-sulfone esetyenziswa kwiimeko ezikhethiweyo ze-leprosy, i-dermatitis herpetiformis, kunye ne-PCP-prophylaxis — umngcipheko we-haemolysis ukhula nge-G6PD deficiency.",
      "I-Materia ayiyiqiqi idosi — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela ugqirha ngemeko ye-G6PD ukuba iyaziwa, imbali ye-anaemia, i-allergy ye-sulfa, kunye NAWO ONKE amanye amayeza ngaphambi kokuqala.",
      "Buza ukuba zeziphi iibalwa zegazi ezijongwayo nokuba umchamo omnyama, iintsini ezimdaka, okanye ukudinwa okungaqhelekanga kufuneka kuqalise ukujongwa.",
      "Ungayeki i-prophylaxis yexesha elide ngequbuliso ngaphandle kwesicwangciso sogqirha ukuba yinxalenye yendlela yokuthintela usulelo.",
      "Ukuba umchamo omnyama, ukudinwa okukhulu, irhashalala nomkhuhlane, okanye ubunzima bokuphefumla kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-ethionamide": five(
    [
      "Ethionamide is a second-line antimycobacterial used in selected drug-resistant TB regimens — nausea and liver monitoring are common teaching points.",
      "Materia does not invent a mg/kg dose — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the TB team about liver disease, thyroid concerns, pregnancy plans in adolescents, and ALL other TB medicines.",
      "Take with food if the labelled product and clinician advise — do not invent a meal rule that conflicts with the regimen.",
      "Ask which liver tests are planned and what persistent vomiting or yellow eyes should trigger earlier review.",
      "If yellow eyes, dark urine, severe tummy pain, or unexplained fever develops — seek care urgently.",
    ],
    [
      "I-ethionamide i-antimycobacterial yesigaba sesibili esetshenziswa ezinhlelweni ezikhethiwe ze-TB ephikisa imithi — isicanucanu nokuqapha isibindi yizinto ezivamile zokufundisa.",
      "I-Materia ayiqambi umthamo we-mg/kg — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba le-TB ngesifo sesibindi, izinkinga ze-thyroid, izinhlelo zokukhulelwa kwezentsha, nawo WONKE amanye amaphilisi e-TB.",
      "Thatha nokudla uma umkhiqizo onelebula nodokotela becebisa — ungacabangi umthetho wokudla ophikisana nohlelo.",
      "Buza ukuthi yiziphi izivivinyo zesibindi ezicwangisiwe nokuthi ukuhlanza okuqhubekayo noma amehlo aphuzi kufanele kuqale ukubuyekezwa.",
      "Uma amehlo aphuzi, umchamo omnyama, ubuhlungu besisu obukhulu, noma umkhuhlane ongachazeki kuvela — funa usizo ngokushesha.",
    ],
    [
      "Etionamied is 'n tweedelyn antimikobakteriële middel in geselekteerde middelweerstandige TB-regimens — naarheid en lewermonitering is algemene onderrigpunte.",
      "Materia versin nie 'n mg/kg dosis nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die TB-span van lewersiekte, skildklierkommer, swangerskapplanne by adolessente, en ALLE ander TB-medisyne.",
      "Neem met kos as die geëtiketteerde produk en klinikus dit aanbeveel — moenie 'n maaltydreël versin wat met die regime bots nie.",
      "Vra watter lewertoetse beplan is en watter aanhoudende braking of geel oë vroeër hersiening moet sneller.",
      "As geel oë, donker urine, ernstige maagpyn, of onverklaarde koors ontwikkel — soek dringend sorg.",
    ],
    [
      "Ethionamide ke antimycobacterial ea mohala oa bobeli e sebelisoang litokisetso tse khethiloeng tsa TB e hanyetsang meriana — ho nyekeloa ke pelo le tlhokomelo ea sebete ke lintlha tse tloaelehileng tsa thuto.",
      "Materia ha e iqape tekanyo ea mg/kg — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha sa TB ka lefu la sebete, mathata a thyroid, merero ea bokhachane ho bacha, le MERIANA EOHLE e meng ea TB.",
      "E nke le lijo haeba sehlahisoa se nang le ileibole le ngaka li eletsa — u se ke ua iqapa molao oa lijo o loantšanang le kemiso.",
      "Botsoa hore na ke liteko life tsa sebete tse reriloeng le hore na ho hlatsa ho tsoelang pele kapa mahlo a mosehla a lokela ho qala tlhahlobo pele.",
      "Haeba mahlo a mosehla, moroto o lefifi, bohloko bo boholo ba mpa, kapa feberu e sa hlaloseng e hlaha — batla thuso ka potlako.",
    ],
    [
      "I-ethionamide yi-antimycobacterial yomgca wesibini esetyenziswa kwiinkqubo ezikhethiweyo ze-TB ephikisa amayeza — isicanucanu nokujonga isibindi zizinto eziqhelekileyo zokufundisa.",
      "I-Materia ayiyiqiqi idosi ye-mg/kg — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela le-TB ngesifo sesibindi, iinkxalabo ze-thyroid, izicwangciso zokukhulelwa kulutsha, kunye NAWO ONKE amanye amayeza e-TB.",
      "Thatha nokutya ukuba imveliso enelebula kunye nogqirha bacebisa — ungacingi umthetho wokutya ophikisana nenkqubo.",
      "Buza ukuba zeziphi iimvavanyo zesibindi ezicwangcisiweyo nokuba ukugabha okuqhubekayo okanye amehlo atyheli kufuneka kuqalise ukujongwa kwangethuba.",
      "Ukuba amehlo atyheli, umchamo omnyama, intlungu enkulu yesisu, okanye umkhuhlane ongachazekiyo kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),

  "mol-ganciclovir": five(
    [
      "Ganciclovir is an antiviral used in selected paediatric CMV pathways — myelosuppression risk means blood-count monitoring is clinician-led.",
      "Materia does not invent an induction or maintenance schedule — confirm against current SA Paediatric STG/EML and the labelled product.",
      "Tell the team about kidney disease, low blood counts, pregnancy concerns in adolescents handling the medicine, and ALL other medicines.",
      "Ask which blood tests are planned and what fever, mouth ulcers, or unusual bruising should trigger earlier review.",
      "Caregivers handling liquid forms should follow labelled handling advice — do not invent crushing or measuring shortcuts.",
      "If fever with sore throat, unusual bleeding, severe tiredness, or reduced urine develops — seek care urgently.",
    ],
    [
      "I-ganciclovir i-antiviral esetshenziswa ezindleleni ezikhethiwe ze-CMV zezingane — ubungozi be-myelosuppression busho ukuthi ukuqapha ukubalwa kwegazi kuqhutshwa odokotela.",
      "I-Materia ayiqambi uhlelo lokuqala noma lokugcina — qinisekisa ne-STG/EML yezingane yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba ngesifo sezinso, ukubalwa kwegazi okuphansi, ukukhulelwa kwezentsha ezisingatha umuthi, nawo WONKE amanye amaphilisi.",
      "Buza ukuthi yiziphi izivivinyo zegazi ezicwangisiwe nokuthi umkhuhlane, izilonda zomlomo, noma ukulimala okungajwayelekile kufanele kuqale ukubuyekezwa.",
      "Abanakekeli abasingatha izinhlobo ezinoketshezi kufanele balandele iseluleko sokuphatha esulebula — ungacabangi izindlela ezimfushane zokucindezela noma zokulinganisa.",
      "Uma umkhuhlane nomphimbo obuhlungu, ukopha okungajwayelekile, ukukhathala okukhulu, noma umchamo omncane kuvela — funa usizo ngokushesha.",
    ],
    [
      "Gansiklovir is 'n antivirale middel in geselekteerde pediatriese CMV-paaie — mïelosuppressie risiko beteken bloedtelling monitering is klinikus-gelei.",
      "Materia versin nie 'n induksie- of instandhoudingskedule nie — bevestig teen huidige SA Pediatriese STG/EML en die geëtiketteerde produk.",
      "Sê vir die span van niersiekte, lae bloedtellings, swangerskapkommer by adolessente wat die medisyne hanteer, en ALLE ander medisyne.",
      "Vra watter bloedtoetse beplan is en watter koors, mondsere, of ongewone kneusings vroeër hersiening moet sneller.",
      "Versorgers wat vloeibare vorms hanteer moet geëtiketteerde hanteringsadvies volg — moenie fyndruk- of meetkortpaaie versin nie.",
      "As koors met seer keel, ongewone bloeding, ernstige moegheid, of verminderde urine ontwikkel — soek dringend sorg.",
    ],
    [
      "Ganciclovir ke antiviral e sebelisoang litseleng tse khethiloeng tsa CMV tsa bana — kotsi ea myelosuppression e bolela hore tlhokomelo ea palo ea mali e etelloa pele ke lingaka.",
      "Materia ha e iqape kemiso ea ho qala kapa ea ho boloka — netefatsa khahlanong le STG/EML ea bana ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka lefu la liphio, lipalo tse tlase tsa mali, mathata a bokhachane ho bacha ba sebetsanang le meriana, le MERIANA EOHLE e meng.",
      "Botsoa hore na ke liteko life tsa mali tse reriloeng le hore na feberu, lisoa tsa molomo, kapa ho otlaha ho sa tloaelehang ho lokela ho qala tlhahlobo pele.",
      "Bahlokomeli ba sebetsanang le mefuta ea mokelikeli ba lokela ho latela keletso ea ho sebetsana e nang le ileibole — u se ke ua iqapa mekhoa e khuts'oane ea ho sila kapa ho lekanya.",
      "Haeba feberu le 'metso o bohloko, ho tsoa mali ho sa tloaelehang, mokhathala o matla, kapa moroto o fokotsehileng o hlaha — batla thuso ka potlako.",
    ],
    [
      "I-ganciclovir yi-antiviral esetyenziswa kwiindlela ezikhethiweyo ze-CMV zabantwana — umngcipheko we-myelosuppression uthetha ukuba ukujonga ukubalwa kwegazi kukhokelwa ngoogqirha.",
      "I-Materia ayiyiqiqi ishedyuli yokuqala okanye yokugcina — Qinisekisa ne-STG/EML yabantwana yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela ngesifo sezintso, ukubalwa kwegazi okuphantsi, iinkxalabo zokukhulelwa kulutsha oluphethe iyeza, kunye NAWO ONKE amanye amayeza.",
      "Buza ukuba zeziphi iimvavanyo zegazi ezicwangcisiweyo nokuba umkhuhlane, izilonda zomlomo, okanye ukulimala okungaqhelekanga kufuneka kuqalise ukujongwa kwangethuba.",
      "Abakhathaleli abaphethe iintlobo ezinolwelo kufuneka balandele iingcebiso zokuphatha ezinelebula — ungacingi iindlela ezimfutshane zokucinezelela okanye zokulinganisa.",
      "Ukuba umkhuhlane nomqala obuhlungu, ukopha okungaqhelekanga, ukudinwa okukhulu, okanye umchamo omncinci kuvela — funa uncedo ngokukhawuleza.",
    ],
  ),
};
