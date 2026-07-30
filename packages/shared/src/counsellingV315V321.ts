/**
 * v315–v321 deepened SA counselling batch (6 lines × 5 langs) — STG/EML Batch A emergency & antidotes.
 * Original Materia educational scripts only — no invented doses, dilutions, rates, nomogram cut-offs, or intervals.
 * Emergency/hospital molecules: clinician-directed use; Materia is educational only.
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

export const COUNSELLING_V315_TO_V321: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-adrenaline": five(
    [
      "Adrenaline (epinephrine) is an emergency medicine used in anaphylaxis and selected resuscitation pathways — it is given only by trained clinicians in settings that can manage airway and circulation.",
      "This is not a home self-treatment medicine for most people unless a clinician has prescribed and trained you on a specific auto-injector product — Materia does not invent a dilution, dose, or route algorithm.",
      "Tell every emergency clinician about ALL medicines you take, heart disease, thyroid disease, and any prior severe reaction to adrenaline products.",
      "After any emergency adrenaline use, urgent clinical follow-up matters — symptoms can return; do not leave care until the team says it is safe.",
      "Ask how to recognise anaphylaxis warning signs (breathing difficulty, swelling, collapse) and when to call emergency services again.",
      "If breathing worsens, swelling spreads, or you feel faint after treatment — seek emergency care immediately.",
    ],
    [
      "I-adrenaline (epinephrine) umuthi wezimo eziphuthumayo osetshenziswa ku-anaphylaxis nasezindleleni ezikhethiwe zokuvuselela — unikwa kuphela ongqondongqondo abaqeqeshiwe ezindaweni ezingaphatha umgudu womoya nokugeleza kwegazi.",
      "Lokhu akuyona umuthi wokuzelapha ekhaya kwabaningi ngaphandle uma udokotela ekuqokele futhi ekuqeqeshile nge-auto-injector ethile — i-Materia ayiqambi i-dilution, umthamo, noma indlela yokunikeza.",
      "Tshela wonke udokotela wezimo eziphuthumayo ngawo WONKE amaphilisi owathathayo, isifo senhliziyo, isifo se-thyroid, nokuphendula okubi kwangaphambilini kwemikhiqizo ye-adrenaline.",
      "Ngemva kokusebenzisa i-adrenaline yesimo esiphuthumayo, ukulandelwa ngokushesha kubalulekile — izimpawu zingabuya; ungashiya ukunakekelwa kuze ithimba lithi kuphephile.",
      "Buza ukuthi uqaphela kanjani izimpawu ze-anaphylaxis (ubunzima bokuphefumula, ukuvuvukala, ukuwa) nokuthi ubiza nini izinsiza eziphuthumayo futhi.",
      "Uma ukuphefumula kuba kubi, ukuvuvukala kusabalala, noma uzizwa uphelelwa amandla ngemva kokwelashwa — funa usizo oluphuthumayo ngokushesha.",
    ],
    [
      "Adrenalien (epinefrien) is 'n noodmedisyne wat in anafilakse en geselekteerde resussitasiepaaie gebruik word — dit word slegs deur opgeleide klinici toegedien in omgewings wat lugweg en sirkulasie kan bestuur.",
      "Dit is nie tuis selfbehandeling vir die meeste mense nie tensy 'n klinikus 'n spesifieke outo-inspuitproduk voorgeskryf en jou opgelei het — Materia versin nie 'n verdunning, dosis, of toedieningsalgoritme nie.",
      "Sê vir elke noodklinikus van ALLE medisyne wat jy neem, hartsiekte, tiroïedsiekte, en enige vorige ernstige reaksie op adrenalienprodukte.",
      "Na enige noodadrenaliengebruik is dringende kliniese opvolging belangrik — simptome kan terugkeer; moenie sorg verlaat totdat die span sê dit is veilig nie.",
      "Vra hoe om anafilakse-waarskuwingstekens (asemnood, swelling, ineenstorting) te herken en wanneer om weer nooddienste te bel.",
      "As asemhaling versleg, swelling versprei, of jy flou voel ná behandeling — soek onmiddellik noodhulp.",
    ],
    [
      "Adrenaline (epinephrine) ke moriana oa tšohanyetso o sebelisoang ho anaphylaxis le litsela tse khethiloeng tsa ho tsosolosa — o fanoa feela ke litsebi tse koetlisitsoeng maemong a ka laolang tsela ea moea le phallo ea mali.",
      "Hona ha se moriana oa ho itlhokomela hae bakeng sa batho ba bangata ntle le haeba ngaka e u fane ka sehlahisoa se itseng sa auto-injector 'me ea u ruta — Materia ha e iqape dilution, tekanyo, kapa mokhoa oa ho fana.",
      "Bolella ngaka eohle ea tšohanyetso ka MERIANA YOHLE eo u e nkelang, lefu la pelo, lefu la thyroid, le karabelo efe kapa efe e matla ea pejana ho lihlahisoa tsa adrenaline.",
      "Ka mor'a tšebeliso efe kapa efe ea adrenaline ea tšohanyetso, ho latela ka potlako hoa bohlokoa — matšoao a ka khutla; u se ke ua tloha tlhokomelong ho fihlela sehlopha se re ho bolokehile.",
      "Botsoa hore na u lemoha joang matšoao a anaphylaxis (ho hema thata, ho ruruha, ho oa) le hore na u letsetsa litšebeletso tsa tšohanyetso hape neng.",
      "Haeba ho hema ho mpefala, ho ruruha hoa ata, kapa u ikutloa u fokola ka mor'a kalafo — batla thuso ea tšohanyetso hang-hang.",
    ],
    [
      "I-adrenaline (epinephrine) liyeza lemxholo elisetyenziswa kwi-anaphylaxis nakwiindlela ezikhethiweyo zokuvuselela — linikwa kuphela ngoogqirha abaqeqeshiweyo kwiindawo ezinokulawula umgca womoya kunye nokuhamba kwegazi.",
      "Oku ayilonyango lokuzinyanga ekhaya kwabaninzi ngaphandle kokuba ugqirha ukunikeze kwaye wakufundisa nge-auto-injector ethile — i-Materia ayiyiqiqi i-dilution, idosi, okanye indlela yokunikezela.",
      "Xelela wonke ugqirha wemeko engxamisekileyo ngawo WONKE amayeza owathabathayo, isifo sentliziyo, isifo se-thyroid, nayo nayiphi impendulo enzima yangaphambili kwiimveliso ze-adrenaline.",
      "Emva kokusetyenziswa kwe-adrenaline yemeko engxamisekileyo, ukulandela ngokukhawuleza kubalulekile — iimpawu zinokubuya; ungashiya ukhathalelo de iqela lithi kukhuselekile.",
      "Buza indlela yokuqaphela iimpawu ze-anaphylaxis (ubunzima bokuphefumla, ukudumba, ukuwa) nokuba ubiza nini iinkonzo ezingxamisekileyo kwakhona.",
      "Ukuba ukuphefumla kuya kuba kubi, ukudumba kuyasasazeka, okanye uziva uphelelwa ngamandla emva konyango — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-atropine": five(
    [
      "Atropine is an antimuscarinic medicine used in selected hospital pathways such as symptomatic bradycardia and certain poisonings — it is clinician-directed, not a routine home medicine.",
      "Materia does not invent a dose, titration step, or indication algorithm — confirm every use against current SA STG/EML and the labelled product with the treating team.",
      "Tell clinicians about glaucoma risk, prostate/urinary obstruction history, heart disease, and ALL other medicines before atropine is considered.",
      "Expected educational effects can include dry mouth, blurred vision, and faster heart rate — report distressing symptoms to the care team.",
      "Ask what monitoring (heart rate, rhythm, symptoms) the team will use while atropine is given.",
      "If you develop severe eye pain, inability to pass urine, confusion, or chest pain around treatment — alert clinicians immediately.",
    ],
    [
      "I-atropine umuthi we-antimuscarinic osetshenziswa ezindleleni ezikhethiwe zesibhedlela ezifana ne-bradycardia enezimpawu nokudlova okuthile — uqondiswa udokotela, hhayi umuthi wasekhaya ojwayelekile.",
      "I-Materia ayiqambi umthamo, isinyathelo se-titration, noma i-algorithm yesidingo — qinisekisa ukusetshenziswa ngakunye ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula nethimba elilapha.",
      "Tshela odokotela ngegozi ye-glaucoma, umlando wokuvaleka kwe-prostate/umchamo, isifo senhliziyo, nawo WONKE amanye amaphilisi ngaphambi kokuthi i-atropine icatshangelwe.",
      "Imiphumela yokufundisa engalindelwa ingabandakanya umlomo owomile, ukubona okufiphele, nenhliziyo esheshayo — bika izimpawu ezikhathazayo ethimbeni lokunakekela.",
      "Buza ukuthi yikuphi ukuqapha (izinhliziyo, isigqi, izimpawu) ithimba elizosisebenzisa ngenkathi i-atropine inikezwa.",
      "Uma uthola ubuhlungu beso obukhulu, ukungakwazi ukuchama, ukudideka, noma ubuhlungu besifuba ngesikhathi sokwelashwa — xwayisa odokotela ngokushesha.",
    ],
    [
      "Atropien is 'n antimuskariniese medisyne wat in geselekteerde hospitaalpaaie soos simptomatiese bradikardie en sekere vergiftigings gebruik word — dit is klinikus-gerig, nie 'n roetine-tuismedisyne nie.",
      "Materia versin nie 'n dosis, titrasiestap, of indikasie-algoritme nie — bevestig elke gebruik teen huidige SA STG/EML en die geëtiketteerde produk met die behandelingspan.",
      "Sê vir klinici van glaukoomrisiko, prostaat-/uriene-obstruksiegeskiedenis, hartsiekte, en ALLE ander medisyne voordat atropien oorweeg word.",
      "Verwagte opvoedkundige effekte kan droë mond, dowwe sig, en vinniger hartklop insluit — rapporteer ontstellende simptome aan die sorgspan.",
      "Vra watter monitering (harttempo, ritme, simptome) die span sal gebruik terwyl atropien gegee word.",
      "As jy ernstige oogpyn, onvermoë om urine te passeer, verwarring, of borspyn rondom behandeling ontwikkel — waarsku klinici onmiddellik.",
    ],
    [
      "Atropine ke moriana oa antimuscarinic o sebelisoang litseleng tse khethiloeng tsa sepetlele tse kang bradycardia e nang le matšoao le chefo e itseng — e tataisoa ke ngaka, eseng moriana o tloaelehileng oa hae.",
      "Materia ha e iqape tekanyo, mohato oa titration, kapa algorithm ea tšebeliso — netefatsa tšebeliso e 'ngoe le e 'ngoe khahlanong le STG/EML ea hajoale ea SA le sehlahisoa se nang le ileibole le sehlopha se alafang.",
      "Bolella lingaka ka kotsi ea glaucoma, histori ea ho thibela prostate/moroto, lefu la pelo, le MERIANA EOHLE e meng pele atropine e nahanoa.",
      "Liphello tsa thuto tse ka lebelloang li ka kenyelletsa molomo o omileng, pono e fifalitseng, le lebelo la pelo le potlakileng — tlaleha matšoao a tšoenyang sehlopheng sa tlhokomelo.",
      "Botsoa hore na ke tlhokomelo efe (lebelo la pelo, morethetho, matšoao) seo sehlopha se tla se sebelisa ha atropine e fanoa.",
      "Haeba u ba le bohloko bo matla ba mahlo, ho sitoa ho ntša moroto, ho ferekana, kapa bohloko ba sefuba nakong ea kalafo — tsebisa lingaka hang-hang.",
    ],
    [
      "I-atropine liyeza le-antimuscarinic elisetyenziswa kwiindlela ezikhethiweyo zesibhedlele ezifana ne-bradycardia eneempawu kunye notyhudo oluthile — liyalathiswa ngugqirha, hayi iyeza lasekhaya eliqhelekileyo.",
      "I-Materia ayiyiqiqi idosi, inyathelo le-titration, okanye i-algorithm yokusetyenziswa — Qinisekisa ukusetyenziswa ngakunye ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula neqela elinyangayo.",
      "Xelela oogqirha ngomngcipheko we-glaucoma, imbali yokuvaleka kwe-prostate/umchamo, isifo sentliziyo, nawo WONKE amanye amayeza phambi kokuba i-atropine iqwalaselwe.",
      "Iziphumo zemfundo ezinokulindelwa zinokubandakanya umlomo owomileyo, ukubona okufiphele, kunye nentliziyo ekhawulezayo — xela iimpawu ezikhathazayo kwiqela lokhathalelo.",
      "Buza ukuba yeyiphi ukubeka esweni (isantya sentliziyo, isigqi, iimpawu) iqela eliza kuyisebenzisa ngelixa i-atropine inikwa.",
      "Ukuba ufumana intlungu yeso enzima, ukungakwazi ukuchama, ukudideka, okanye intlungu yesifuba ngexesha lonyango — xelela oogqirha ngoko nangoko.",
    ],
  ),

  "mol-naloxone": five(
    [
      "Naloxone is an opioid antagonist used to reverse life-threatening opioid breathing depression — it is an emergency/hospital medicine directed by clinicians (or by trained responders with an authorised product).",
      "Materia does not invent a dose, titration ladder, or observation interval — confirm against current SA STG/EML and the labelled product.",
      "Tell the team about ALL opioids, sedatives, alcohol, and other medicines involved — short-acting opioids may cause symptoms to return after naloxone wears off.",
      "Withdrawal symptoms can appear after reversal; the care team monitors breathing and alertness — do not leave against advice.",
      "Ask what warning signs mean you need another emergency review after naloxone.",
      "If breathing slows again, you become very sleepy, or you cannot be woken — call emergency services immediately.",
    ],
    [
      "I-naloxone i-opioid antagonist esetshenziswa ukubuyisela ukucindezelwa kokuphefumula okubulalayo kwe-opioid — umuthi wezimo eziphuthumayo/wesibhedlela oqondiswa odokotela (noma abasizi abaqeqeshiwe nomkhiqizo ogunyaziwe).",
      "I-Materia ayiqambi umthamo, isiqlunga se-titration, noma isikhathi sokubhekwa — qinisekisa ne-STG/EML yaseNingizimu Afrika yamanje nomkhiqizo onelebula.",
      "Tshela ithimba ngawo WONKE ama-opioid, izidakamizwa, utshwala, namanye amaphilisi abandakanyekayo — ama-opioid asesebenze isikhashana angabangela izimpawu zibuye ngemva kokuphela kwe-naloxone.",
      "Izimpawu zokuyeka zingavela ngemva kokubuyiselwa; ithimba liqapha ukuphefumula nokuqaphela — ungahambi ngokuphikisana neseluleko.",
      "Buza ukuthi iziphi izimpawu ezisho ukuthi udinga ukuhlolwa okunye okuphuthumayo ngemva kwe-naloxone.",
      "Uma ukuphefumula kubamnyango futhi, ulala kakhulu, noma ungavuswa — shayela izinsiza eziphuthumayo ngokushesha.",
    ],
    [
      "Naloksoon is 'n opioïedantagonis wat gebruik word om lewensgevaarlike opioïed-asemhalingsdepressie om te keer — dit is 'n nood-/hospitaalmedisyne deur klinici gerig (of opgeleide responders met 'n goedgekeurde produk).",
      "Materia versin nie 'n dosis, titrasieleer, of waarnemingsinterval nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir die span van ALLE opioïede, kalmeermiddels, alkohol, en ander medisyne betrokke — kortwerkende opioïede kan simptome laat terugkeer nadat naloksoon uitwerk.",
      "Onttrekkingsimptome kan ná omkering verskyn; die sorgspan monitor asemhaling en wakkerheid — moenie teen advies weggaan nie.",
      "Vra watter waarskuwingstekens beteken jy het weer 'n noodhersiening ná naloksoon nodig.",
      "As asemhaling weer verlangsaam, jy baie slaperig word, of nie wakker gemaak kan word nie — bel nooddienste onmiddellik.",
    ],
    [
      "Naloxone ke anti-opioid e sebelisoang ho khutlisa khatello ea ho hema ea opioid e kotsi bophelong — ke moriana oa tšohanyetso/oa sepetlele o tataisoang ke lingaka (kapa baruti ba koetlisitsoeng ka sehlahisoa se lumelletsoeng).",
      "Materia ha e iqape tekanyo, litekanyo tsa titration, kapa nako ea ho shebella — netefatsa khahlanong le STG/EML ea hajoale ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka LI-OPIOID TSOHLE, lithethefatsi, joala, le meriana e meng e amehang — li-opioid tse sebetsang nako e khutšoanyane li ka baka hore matšoao a khutle ka mor'a hore naloxone e fele.",
      "Matšoao a ho tlohela a ka hlaha ka mor'a ho khutlisa; sehlopha se hlokomela ho hema le ho falimeha — u se ke ua tloha khahlanong le keletso.",
      "Botsoa hore na ke matšoao afe a bolelang hore u hloka tlhahlobo e 'ngoe ea tšohanyetso ka mor'a naloxone.",
      "Haeba ho hema ho lieha hape, u robala haholo, kapa u ke ke ua tsosoa — letsetsa litšebeletso tsa tšohanyetso hang-hang.",
    ],
    [
      "I-naloxone yi-opioid antagonist esetyenziswa ukubuyisela ukucinezela kokuphefumla kwe-opioid okubulalayo — liyeza lemxholo/lesibhedlele elikhokelwa ngoogqirha (okanye abasizi abaqeqeshiweyo ngemveliso egunyazisiweyo).",
      "I-Materia ayiyiqiqi idosi, irele ye-titration, okanye ixesha lokujonga — Qinisekisa ne-STG/EML yaseMzantsi Afrika yangoku kunye nemveliso enelebula.",
      "Xelela iqela ngazo ZONKE ii-opioid, iziyobisi, utywala, namanye amayeza abandakanyekayo — ii-opioid ezisebenza ixesha elifutshane zinokubangela iimpawu zibuye emva kokuba i-naloxone iphelile.",
      "Iimpawu zokuyeka zinokuvela emva kokubuyiselwa; iqela liqaphela ukuphefumla nokuqaphela — ungahambi ngokuchasene nengcebiso.",
      "Buza ukuba zeziphi iimpawu ezithetha ukuba ufuna uphononongo olungxamisekileyo kwakhona emva kwe-naloxone.",
      "Ukuba ukuphefumla kuyacotha kwakhona, ulala kakhulu, okanye awuvuswa — tsalela iinkonzo ezingxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-acetylcysteine": five(
    [
      "N-acetylcysteine (NAC) is used in hospital pathways for paracetamol poisoning and some other labelled contexts — timing and regimen are clinician decisions.",
      "Materia does not invent a weight-based infusion schedule, nomogram cut-off, or blood-level target — confirm against current SA STG/EML, Poisons guidance, and the labelled product.",
      "Tell the team the exact products and amounts possibly taken, the time of ingestion if known, and ALL other medicines — early presentation matters even if you feel well.",
      "Nausea or flushing can occur with some NAC infusions; report chest symptoms, wheeze, or severe rash during treatment.",
      "Ask what liver-test and observation plan the team will follow after NAC is started.",
      "If confusion, severe vomiting, yellowing of the eyes, or right-upper tummy pain develops — alert the care team urgently.",
    ],
    [
      "I-N-acetylcysteine (NAC) isetshenziswa ezindleleni zesibhedlela zokudlova kwe-paracetamol nakwezinye izimo ezinelebula — isikhathi nohlelo kuyizinqumo zodokotela.",
      "I-Materia ayiqambi uhlelo lwe-infusion olususelwa esisisindweni, i-nomogram cut-off, noma umgomo wezinga legazi — qinisekisa ne-STG/EML yaseNingizimu Afrika, izeluleko zePoisons, nomkhiqizo onelebula.",
      "Tshela ithimba ngemikhiqizo nenani elingase lithathiwe, isikhathi sokudla uma saziwa, nawo WONKE amanye amaphilisi — ukufika kusenesikhathi kubalulekile noma uzizwa kahle.",
      "Isicanucanu noma ukushisa kungavela ngezinye izinto ze-NAC; bika izimpawu zesifuba, ukubhobha, noma irashi elibi ngesikhathi sokwelashwa.",
      "Buza ukuthi yiluphi uhlelo lokuhlolwa kwesibindi nokubhekwa ithimba elizolulandela ngemva kokuqala i-NAC.",
      "Uma ukudideka, ukuhlanza okukhulu, ukuphuzi kwamehlo, noma ubuhlungu besisu esingakwesokudla phezulu kuvela — xwayisa ithimba ngokushesha.",
    ],
    [
      "N-asetielcysteïen (NAC) word in hospitaalpaaie vir parasetamolvergiftiging en sommige ander geëtiketteerde kontekste gebruik — tydsberekening en regimen is klinikusbesluite.",
      "Materia versin nie 'n gewigsgebaseerde infusieskedule, nomogram-afsnyding, of bloedvlakteiken nie — bevestig teen huidige SA STG/EML, Vergifnisriglyne, en die geëtiketteerde produk.",
      "Sê vir die span die presiese produkte en hoeveelhede moontlik geneem, die tyd van inname indien bekend, en ALLE ander medisyne — vroeë aanmelding saak selfs as jy goed voel.",
      "Naarheid of bloos kan met sommige NAC-infusies voorkom; rapporteer borssimptome, piep, of ernstige uitslag tydens behandeling.",
      "Vra watter lewertoets- en waarnemingsplan die span sal volg nadat NAC begin is.",
      "As verwarring, ernstige braking, vergeling van die oë, of regter-boonste buikpyn ontwikkel — waarsku die sorgspan dringend.",
    ],
    [
      "N-acetylcysteine (NAC) e sebelisoa litseleng tsa sepetlele bakeng sa chefo ea paracetamol le maemo a mang a nang le ileibole — nako le moralo ke liqeto tsa ngaka.",
      "Materia ha e iqape kemiso ea infusion e thehiloeng boima, nomogram cut-off, kapa sepheo sa boemo ba mali — netefatsa khahlanong le STG/EML ea SA, tataiso ea Poisons, le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka lihlahisoa le palo e ka 'nang e nkiloe, nako ea ho noa haeba e tsejoa, le MERIANA EOHLE e meng — ho fihla kapele hoa bohlokoa leha u ikutloa u le hantle.",
      "Ho nyekiswa kapa ho futhumala ho ka hlaha ka li-infusion tse ling tsa NAC; tlaleha matšoao a sefuba, ho honotha, kapa lekome le matla nakong ea kalafo.",
      "Botsoa hore na ke moralo ofe oa liteko tsa sebete le ho shebella seo sehlopha se tla se latela ka mor'a hore NAC e qale.",
      "Haeba ho ferekana, ho hlatsa ho matla, ho mofubelu oa mahlo, kapa bohloko ba mpeng e kaholimo ka ho le letona ho hlaha — tsebisa sehlopha ka potlako.",
    ],
    [
      "I-N-acetylcysteine (NAC) isetyenziswa kwiindlela zesibhedlele zotyhudo lwe-paracetamol nakweminye imeko enelebula — ixesha kunye nenkqubo zizigqibo zoogqirha.",
      "I-Materia ayiyiqiqi ishedyuli ye-infusion esekelwe kubunzima, i-nomogram cut-off, okanye umgomo wenqanaba legazi — Qinisekisa ne-STG/EML yaseMzantsi Afrika, izikhokelo zePoisons, kunye nemveliso enelebula.",
      "Xelela iqela ngeemveliso ezichanekileyo kunye namanani anokuthi athathwe, ixesha lokungenisa ukuba liyaziwa, nawo WONKE amanye amayeza — ukufika kwangethuba kubalulekile nokuba uziva ulungile.",
      "Isicaphucaphu okanye ukubila kunokuvela ngezinye ii-infusion ze-NAC; xela iimpawu zesifuba, ukubhobha, okanye irhashi elibi ngexesha lonyango.",
      "Buza ukuba yeyiphi isicwangciso sovavanyo lwesibindi nokujonga iqela eliza kulandela emva kokuqala i-NAC.",
      "Ukuba ukudideka, ukugabha okunzima, ukutyheliwa kwamehlo, okanye intlungu yesisu esingasentla ekunene kuvela — xelela iqela ngokukhawuleza.",
    ],
  ),

  "mol-activated-charcoal": five(
    [
      "Activated charcoal is sometimes used in hospital overdose care to adsorb selected poisons in the gut — it is not appropriate for every ingestion.",
      "Materia does not invent a gram dose, timing window, or list of compatible poisons — the Poisons/clinical team decides case by case against current SA guidance.",
      "Tell clinicians exactly what was taken, when, and whether vomiting has already occurred — airway safety comes first if consciousness is reduced.",
      "Charcoal can cause vomiting and black stools; aspiration into the lungs is a serious risk if the airway is unprotected.",
      "Ask whether charcoal is suitable for this poisoning and what monitoring will follow.",
      "If breathing difficulty, severe vomiting, or reduced alertness develops after charcoal — alert the care team immediately.",
    ],
    [
      "I-activated charcoal ngezinye izikhathi isetshenziswa ekunakekelweni kokudlova esibhedlela ukuze imunce ubuthi obukhethiwe emathunjini — ayifaneleki kukudla konke.",
      "I-Materia ayiqambi umthamo wegramu, iwindi yesikhathi, noma uhlu lobuthi obuhambisanayo — ithimba lePoisons/lezokwelapha linquma ngecala ngalinye ngokwezeluleko zaseNingizimu Afrika zamanje.",
      "Tshela odokotela ngokucacile ukuthi kwathathwani, nini, nokuthi ukuhlanza sekwenzekile yini — ukuphepha komgudu womoya kuqala uma ukwazi kunciphile.",
      "Amalahle angabangela ukuhlanza namathumbu amnyama; ukungena emaphashini kuyingozi enkulu uma umgudu womoya ungavikelekile.",
      "Buza ukuthi amalahle afanelekile yini kulokhu kudlova nokuthi yikuphi ukuqapha okuzolandela.",
      "Uma ubunzima bokuphefumula, ukuhlanza okukhulu, noma ukwehla kokuqaphela kuvela ngemva kwamalahle — xwayisa ithimba ngokushesha.",
    ],
    [
      "Geaktiveerde houtskool word soms in hospitaal-oordosisorg gebruik om geselekteerde gifstowwe in die derm te adsorbeer — dit is nie vir elke inname gepas nie.",
      "Materia versin nie 'n gramdosis, tydvenster, of lys van versoenbare gifstowwe nie — die Vergifnis-/kliniese span besluit saak-vir-saak teen huidige SA-riglyne.",
      "Sê vir klinici presies wat geneem is, wanneer, en of braking reeds voorgekom het — lugwegveiligheid kom eerste as bewustheid verminder is.",
      "Houtskool kan braking en swart stoelgang veroorsaak; aspirasie in die longe is 'n ernstige risiko as die lugweg onbeskermd is.",
      "Vra of houtskool geskik is vir hierdie vergiftiging en watter monitering sal volg.",
      "As asemnood, ernstige braking, of verminderde wakkerheid ná houtskool ontwikkel — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Activated charcoal ka linako tse ling e sebelisoa tlhokomelong ea chefo ea sepetlele ho monya chefo e khethiloeng ka mpeng — ha e lokelle ho noa hohle.",
      "Materia ha e iqape tekanyo ea gram, nako, kapa lenane la chefo e lumellanang — sehlopha sa Poisons/sa bongaka se etsa qeto nyeoe ka nyeoe khahlanong le tataiso ea hajoale ea SA.",
      "Bolella lingaka ka ho hlaka hore na ho nkiloe eng, neng, le hore na ho hlatsa ho se ho etsahalile — tšireletso ea tsela ea moea e tla pele haeba ho falimeha ho fokotsehile.",
      "Charcoal e ka baka ho hlatsa le litšila tse ntšo; ho kenella matšoafong ke kotsi e kholo haeba tsela ea moea e sa sireletsoa.",
      "Botsoa hore na charcoal e loketse chefo ee le hore na ke tlhokomelo efe e tla latela.",
      "Haeba ho hema thata, ho hlatsa ho matla, kapa ho fokotseha ha ho falimeha ho hlaha ka mor'a charcoal — tsebisa sehlopha hang-hang.",
    ],
    [
      "I-activated charcoal ngamanye amaxesha isetyenziswa kukhathalelo lotyhudo lwesibhedlele ukuze imonce ityhefu ekhethiweyo emathunjini — ayifanelekanga kukungenisa konke.",
      "I-Materia ayiyiqiqi idosi yegram, ifestile yexesha, okanye uluhlu lwetyhefu ehambelanayo — iqela lePoisons/lezonyango lithatha isigqibo ityala ngetyala ngokwezikhokelo zaseMzantsi Afrika zangoku.",
      "Xelela oogqirha ngokucacileyo ukuba kwathathwa ntoni, nini, nokuba ukugabha sele kwenzekile na — ukhuseleko lomgca womoya luqala ukuba ukuqaphela kuncitshisiwe.",
      "Amalahle anokubangela ukugabha kunye namathumbu amnyama; ukungena emaphaphini ngumngcipheko onzima ukuba umgca womoya awukhuselwanga.",
      "Buza ukuba amalahle afanelekile na kolu tyhudo nokuba yeyiphi ukubeka esweni eya kulandela.",
      "Ukuba ubunzima bokuphefumla, ukugabha okunzima, okanye ukuncipha kokuqaphela kuvela emva kwamalahle — xelela iqela ngoko nangoko.",
    ],
  ),

  "mol-calcium-gluconate": five(
    [
      "Calcium gluconate is a hospital electrolyte medicine used in selected urgent pathways (for example some high-potassium ECG emergencies) — clinician-directed only.",
      "Materia does not invent an infusion rate, mmol dose, or ECG-triggered algorithm — confirm against current SA STG/EML and institutional protocols.",
      "Tell the team about digoxin/heart-glycoside use, kidney disease, and ALL other medicines before calcium is given.",
      "IV calcium needs careful line and monitoring practice; report pain, burning, or swelling at the infusion site.",
      "Ask what heart-rhythm monitoring will be used during and after administration.",
      "If chest pain, severe palpitations, or sudden weakness develops around treatment — alert clinicians immediately.",
    ],
    [
      "I-calcium gluconate umuthi we-electrolyte wesibhedlela osetshenziswa ezindleleni eziphuthumayo ezikhethiwe (isibonelo ezinye izimo eziphuthumayo ze-ECG zokuphakama kwe-potassium) — uqondiswa udokotela kuphela.",
      "I-Materia ayiqambi isivinini se-infusion, umthamo we-mmol, noma i-algorithm ye-ECG — qinisekisa ne-STG/EML yaseNingizimu Afrika nemithetho yesikhungo.",
      "Tshela ithimba ngokusebenzisa i-digoxin/ama-glycoside enhliziyo, isifo sezinso, nawo WONKE amanye amaphilisi ngaphambi kokunikezwa kwe-calcium.",
      "I-calcium ye-IV idinga umugqa oqaphile nokuqapha; bika ubuhlungu, ukushisa, noma ukuvuvukala endaweni ye-infusion.",
      "Buza ukuthi yikuphi ukuqapha kwesigqi senhliziyo okuzosetshenziswa ngesikhathi nangemva kokunikezwa.",
      "Uma ubuhlungu besifuba, ukushaya kwenhliziyo okukhulu, noma ubuthaka obusheshayo kuvela ngesikhathi sokwelashwa — xwayisa odokotela ngokushesha.",
    ],
    [
      "Kalsiumglukonaat is 'n hospitaal-elektrolietmedisyne wat in geselekteerde dringende paaie gebruik word (byvoorbeeld sommige hoë-kalium-EKG-noodgevalle) — slegs klinikus-gerig.",
      "Materia versin nie 'n infusietempo, mmol-dosis, of EKG-geaktiveerde algoritme nie — bevestig teen huidige SA STG/EML en institusionele protokolle.",
      "Sê vir die span van digoksien-/hartglikosiedgebruik, niersiekte, en ALLE ander medisyne voordat kalsium gegee word.",
      "IV-kalsium benodig versigtige lyn- en moniteringspraktyk; rapporteer pyn, brand, of swelling by die infusieterrein.",
      "Vra watter hart-ritmemonitering tydens en ná toediening gebruik sal word.",
      "As borspyn, ernstige hartklop, of skielike swakheid rondom behandeling ontwikkel — waarsku klinici onmiddellik.",
    ],
    [
      "Calcium gluconate ke moriana oa electrolyte oa sepetlele o sebelisoang litseleng tse potlakileng tse khethiloeng (mohlala maemo a mang a tšohanyetso a EKG a potassium e phahameng) — e tataisoa ke ngaka feela.",
      "Materia ha e iqape lebelo la infusion, tekanyo ea mmol, kapa algorithm ea EKG — netefatsa khahlanong le STG/EML ea SA le melao ea setsi.",
      "Bolella sehlopha ka tšebeliso ea digoxin/li-glycoside tsa pelo, lefu la liphio, le MERIANA EOHLE e meng pele calcium e fanoa.",
      "Calcium ea IV e hloka mokhoa o hlokolosi oa mohala le ho hlokomela; tlaleha bohloko, ho chesa, kapa ho ruruha sebakeng sa infusion.",
      "Botsoa hore na ke tlhokomelo efe ea morethetho oa pelo e tla sebelisoa nakong le ka mor'a ho fana.",
      "Haeba bohloko ba sefuba, ho otla ha pelo ho matla, kapa bokoa ba tšohanyetso ho hlaha nakong ea kalafo — tsebisa lingaka hang-hang.",
    ],
    [
      "I-calcium gluconate liyeza le-electrolyte lesibhedlele elisetyenziswa kwiindlela ezingxamisekileyo ezikhethiweyo (umzekelo ezinye iimeko ezingxamisekileyo ze-ECG zepotassium ephezulu) — likhokelwa ngugqirha kuphela.",
      "I-Materia ayiyiqiqi isantya se-infusion, idosi ye-mmol, okanye i-algorithm ye-ECG — Qinisekisa ne-STG/EML yaseMzantsi Afrika kunye nemigaqo yeziko.",
      "Xelela iqela ngokusebenzisa i-digoxin/ii-glycoside zentliziyo, isifo sezintso, nawo WONKE amanye amayeza phambi kokuba i-calcium inikwe.",
      "I-calcium ye-IV ifuna umgca ononopheleyo kunye nokuqaphela; xela intlungu, ukutshisa, okanye ukudumba kwindawo ye-infusion.",
      "Buza ukuba yeyiphi ukubeka esweni kwesigqi sentliziyo eya kusetyenziswa ngexesha nasemva kokunikezela.",
      "Ukuba intlungu yesifuba, ukubetha kwentliziyo okunzima, okanye ubuthaka obukhawulezayo buvela ngexesha lonyango — xelela oogqirha ngoko nangoko.",
    ],
  ),

  "mol-magnesium-sulfate": five(
    [
      "Magnesium sulfate is used in selected hospital pathways including eclampsia care and some other labelled contexts — it is clinician-directed, often with close monitoring.",
      "Materia does not invent a loading dose, maintenance rate, or monitoring target — confirm against current SA STG/EML and the labelled product.",
      "Tell the team about kidney disease, myasthenia or serious muscle weakness, heart block history, and ALL other medicines.",
      "Educational watch-outs include loss of reflexes, slow breathing, low blood pressure, and unusual sleepiness — the team checks these during treatment.",
      "Ask what monitoring (reflexes, breathing, urine output as applicable) will be used while magnesium is running.",
      "If breathing slows, you cannot lift your head, or you feel suddenly very weak — alert the care team immediately.",
    ],
    [
      "I-magnesium sulfate isetshenziswa ezindleleni ezikhethiwe zesibhedlela ezihlanganisa ukunakekelwa kwe-eclampsia nezinye izimo ezinelebula — iqhutshwa udokotela, kuvame ukuba nokuqapha eduze.",
      "I-Materia ayiqambi umthamo wokuqala, isivinini sokugcina, noma umgomo wokuqapha — qinisekisa ne-STG/EML yaseNingizimu Afrika nomkhiqizo onelebula.",
      "Tshela ithimba ngesifo sezinso, i-myasthenia noma ubuthaka bemisipha obukhulu, umlando we-heart block, nawo WONKE amanye amaphilisi.",
      "Izinto zokuqaphela zokufundisa zihlanganisa ukulahlekelwa yimiphumela, ukuphefumula okucothayo, umfutho wegazi ophansi, nokulala okungajwayelekile — ithimba lihlola lokhu ngesikhathi sokwelashwa.",
      "Buza ukuthi yikuphi ukuqapha (imiphumela, ukuphefumula, ukuchama uma kufanele) okuzosetshenziswa ngenkathi i-magnesium isebenza.",
      "Uma ukuphefumula kucotha, ungakwazi ukusonga ikhanda, noma uzizwa ubuthaka obusheshayo — xwayisa ithimba ngokushesha.",
    ],
    [
      "Magnesiumsulfaat word in geselekteerde hospitaalpaaie gebruik, insluitend eklampsiesorg en sommige ander geëtiketteerde kontekste — dit is klinikus-gerig, dikwels met noue monitering.",
      "Materia versin nie 'n laaidosis, onderhoudstempo, of moniteringsteiken nie — bevestig teen huidige SA STG/EML en die geëtiketteerde produk.",
      "Sê vir die span van niersiekte, miastenie of ernstige spierswakheid, hartblokgeskiedenis, en ALLE ander medisyne.",
      "Opvoedkundige waarskuwings sluit in verlies van refleksies, stadige asemhaling, lae bloeddruk, en ongewone slaperigheid — die span kontroleer dit tydens behandeling.",
      "Vra watter monitering (refleksies, asemhaling, uriene-uitset soos van toepassing) gebruik sal word terwyl magnesium loop.",
      "As asemhaling verlangsaam, jy nie jou kop kan lig nie, of jy skielik baie swak voel — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Magnesium sulfate e sebelisoa litseleng tse khethiloeng tsa sepetlele ho kenyelletsa tlhokomelo ea eclampsia le maemo a mang a nang le ileibole — e tataisoa ke ngaka, hangata ka tlhokomelo e haufi.",
      "Materia ha e iqape tekanyo ea ho qala, lebelo la ho boloka, kapa sepheo sa ho hlokomela — netefatsa khahlanong le STG/EML ea SA le sehlahisoa se nang le ileibole.",
      "Bolella sehlopha ka lefu la liphio, myasthenia kapa bokoa bo matla ba mesifa, histori ea heart block, le MERIANA EOHLE e meng.",
      "Lintlha tsa thuto li kenyelletsa tahlehelo ea li-reflex, ho hema butle, khatello ea mali e tlase, le boroko bo sa tloaelehang — sehlopha se hlahloba tsena nakong ea kalafo.",
      "Botsoa hore na ke tlhokomelo efe (li-reflex, ho hema, tlhahiso ea moroto ha ho hlokahala) e tla sebelisoa ha magnesium e sebetsa.",
      "Haeba ho hema ho lieha, u sitoa ho phahamisa hlooho, kapa u ikutloa u fokola ka tšohanyetso — tsebisa sehlopha hang-hang.",
    ],
    [
      "I-magnesium sulfate isetyenziswa kwiindlela ezikhethiweyo zesibhedlele ezibandakanya ukhathalelo lwe-eclampsia kunye neminye imeko enelebula — ikhokelwa ngugqirha, ngokufuthi ngokuqaphela okusondeleyo.",
      "I-Materia ayiyiqiqi idosi yokuqala, isantya sokugcina, okanye umgomo wokuqaphela — Qinisekisa ne-STG/EML yaseMzantsi Afrika kunye nemveliso enelebula.",
      "Xelela iqela ngesifo sezintso, i-myasthenia okanye ubuthaka bemisipha obunzima, imbali ye-heart block, nawo WONKE amanye amayeza.",
      "Izinto zokuqaphela zemfundo zibandakanya ukulahlekelwa ziimpendulo, ukuphefumla okucothayo, uxinzelelo lwegazi olusezantsi, kunye nokulala okungaqhelekanga — iqela lihlola oku ngexesha lonyango.",
      "Buza ukuba yeyiphi ukubeka esweni (iimpendulo, ukuphefumla, ukuphuma komchamo xa kufanelekile) eya kusetyenziswa ngelixa i-magnesium isebenza.",
      "Ukuba ukuphefumla kuyacotha, awukwazi ukuphakamisa ikhanda, okanye uziva ubuthaka obukhawulezayo — xelela iqela ngoko nangoko.",
    ],
  ),
};
