/**
 * v300–v309 deepened SA counselling batch (6 lines × 5 langs) — hospital/peri-op agents & vaccines.
 * Original Materia educational scripts only — no invented doses, rates, numeric lab targets, or intervals.
 * Hospital/peri-op molecules: clinician/theatre/care-team directed use; Materia is educational only.
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

export const COUNSELLING_V300_TO_V309: Record<string, Partial<Record<ExtLang, ExtScript>>> = {
  "mol-bcg-vaccine": five(
    [
      "This is a live BCG vaccine administered by a trained vaccinator — timing within the EPI schedule belongs with the clinic team, not a self-directed plan.",
      "A small raised bump at the injection site developing into a pustule and healing scar is the expected local reaction; Materia does not invent a tuberculin conversion schedule, local reaction timeline, or antibody titre.",
      "Tell the vaccinator about any known immune-suppressing condition, HIV status and current treatment, recent live vaccines, and pregnancy — all of these affect whether BCG is appropriate.",
      "Report spreading redness beyond the expected site reaction, swollen lymph nodes near the injection arm, or fever lasting beyond the normal settling period.",
      "Ask the clinic team about immune or pregnancy questions before the dose — do not attempt to interpret or alter the EPI schedule yourself.",
      "If you develop severe allergic swelling, collapse, or difficulty breathing after any vaccine — seek emergency care immediately.",
    ],
    [
      "Lesi yivaccine ye-BCG ephilayo enikezwa umjovo oqeqeshiwe — isikhathi esiku-EPI schedule sihambisana nethimba leyikhliniki, hhayi uhlelo oluziphathayo.",
      "Inqola encane eziphakamile endaweni yokujovwa iya iba i-pustule ibuyele nenseba eyisilonda esishelelayo kuyimpendulo ekulindelekile yendawo; I-Materia ayiqambi uhlelo lwokushintsheka kwe-tuberculin, umugqa wesikhathi sendawo, noma i-antibody titre.",
      "Tshela umjovo ngezimo ezicindezelayo ze-immune ezaziwa, isimo se-HIV kanye nokwelashwa kwamanje, ama-vaccine aphilayo amuva, nokukhulelwa — konke lokhu kuthinta ukuthi i-BCG ifanelekile.",
      "Bika ukubomba okusakazekile ngaphezu kwendawo ekulindelekiwe, amaqhubu anenkukhu eduze nengalo yokujovwa, noma umkhuhlane omiyo kuze kudlule isikhathi esijwayelekile sokuphumula.",
      "Buza ithimba leyikhliniki ngemibuzo ye-immune noma yokukhulelwa ngaphambi komthamo — ungazami ukuchaza noma ukushintsha i-EPI schedule ngokwakho.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ubunzima bokuphefumula ngemva kwe-vaccine — funa usizo lwezokwelapha ngokushesha.",
    ],
    [
      "Dit is 'n lewende BCG-entstof wat deur 'n opgeleide entstoftoediener toegedien word — tydsberekening binne die EPI-skedule behoort by die kliniekspan, nie 'n selfgerigte plan nie.",
      "Dn klein verhewe knobbel op die inspuitingsplek wat ontwikkel in 'n pustule en 'n geneeswaar litteken is die verwagte plaaslike reaksie; Materia versin nie 'n tuberkulien-omsettingskedule, plaaslike reaksietydlyn of teenliggaamtiter nie.",
      "Sê die entstoftoediener van enige bekende immuunonderdrukkende toestand, MIV-status en huidige behandeling, onlangse lewende entstowwe, en swangerskap — dit alles beïnvloed of BCG gepas is.",
      "Rapporteer verspreide rooiheid buite die verwagte pleksbereaksie, geswolle limfknope naby die inspuitingsarm, of koors wat langer duur as die normale bedaarperiode.",
      "Vra die kliniekspan oor immuun- of swangerskapsvrae voor die dosis — moenie probeer om die EPI-skedule self te interpreteer of te verander nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná enige entstof kry — soek onmiddellik noodhulp.",
    ],
    [
      "Ke vaccine ea BCG e phelang e filoe ke motho ea ruisoang ho entea — nako kahare ho kemiso ea EPI ke ea sehlopha sa kliniki, eseng moralo oa motho ka noho.",
      "Phuphu e nyane e phahamisitsoeng sebakeng sa ho enteoa e ntseng e fetoha i-pustule le leeba le fooang ke karabelo e letetsoeng ea sebaka; Materia ha e iqape kemiso ea phetoho ea tuberculin, mola oa nako oa karabelo ea sebaka, kapa antibody titre.",
      "Bolella motho ea enteang ka boemo bofe kapa bofe bo hatellang immune bo tsejoang, boemo ba HIV le kalafo ea hona joale, li-vaccine tse phelang tse sa tswa fuoa, le boimana — tsena tsohle li amehang ha e le hore na BCG e tloaelehile.",
      "Tlaleha botšo bo hasanang ka ho feta karabelo e letetsoeng ea sebaka, li-nodi tsa lymph tse ruruhetsoeng haufi le lephaka la ho enteoa, kapa feberu e tsoelang pele ka ho feta nako e tloaelehileng ea ho khomarela.",
      "Botsa sehlopha sa kliniki lipotso tsa immune kapa boimana pele ho tekanyo — se leke ho hlalosa kapa ho fetola kemiso ea EPI ka noho.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine efe kapa efe — batla thuso ea tšohanyetso ka potlako.",
    ],
    [
      "Le yivaccine ye-BCG ephilayo enikezwa ngumjovo oqeqeshiweyo — ixesha ngaphakathi kweshedyuli ye-EPI lihamba neqela leklinikhi, hayi isicwangciso esilawulwa nguye ngokwakhe.",
      "Isiqhuma esincinci esiphakemileyo endaweni yokutofa esiba i-pustule isiphenduke nesikwa esinyanisiweyo yimpendulo ekulindelekileyo yendawo; I-Materia ayiyiqiqi ishedyuli yophuculo lwe-tuberculin, umgca wexesha wempendulo yendawo, okanye i-antibody titre.",
      "Xelela umjovo ngayo nayiphi imeko ecinezelayo ye-immune ewaziyo, imeko ye-HIV nonyango lwangoku, ii-vaccine eziphilayo ezisanda kunikwa, nokukhulelwa — zonke ezi zichaphazela ukuba i-BCG ifanelekile.",
      "Xela ukubomba okwandayo ngaphezu kwempendulo ekulindelekileyo yendawo, amaqhubu e-lymph adijiwe eduze nengalo yokutofa, okanye umkhuhlane oqhubekayo ngaphezu kwexesha eliqhelekileyo lokuphumla.",
      "Buza iqela leklinikhi imibuzo ye-immune okanye yokukhulelwa ngaphambi kwedosi — sukuzama ukuchaza okanye ukuguqula ishedyuli ye-EPI ngokwakho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye ubunzima bokuphefumla emva kwevaccine nayiphi na — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-ppsv-vaccine": five(
    [
      "This is a pneumococcal polysaccharide vaccine (PPSV) — it is not the same as the conjugate PCV given in infancy; confirm which product you are receiving with your clinic team.",
      "PPSV counselling commonly includes mild injection-site soreness and clarifying that it targets different pneumococcal serotypes to PCV. Materia does not invent a dose, re-vaccination interval, or antibody titre.",
      "Tell your pharmacist or nurse about prior pneumococcal vaccines of any type, your immune status and any immune-suppressing medicines, asplenia or chronic organ conditions, and ALL other vaccines due the same day.",
      "Report high fever, unusual rash, or severe allergic signs early after vaccination.",
      "Ask the clinic team which pneumococcal vaccine you previously received and whether a repeat or a different product is indicated — do not decide re-vaccination timing yourself.",
      "If you get severe allergic swelling, collapse, or trouble breathing after a vaccine — seek emergency care.",
    ],
    [
      "Le yivaccine ye-pneumococcal polysaccharide (PPSV) — ayifani ne-conjugate PCV enikezwa ebuntwaneni; qinisekisa ukuthi yimuphi umkhiqizo owutholayo nethimba leyikhliniki yakho.",
      "Ukwelulekwa kwe-PPSV kuvame ukufaka ubuhlungu bendawo yokujova nokucacisa ukuthi ikhangela i-serotype ye-pneumococcal ehlukile kune-PCV. I-Materia ayiqambi umthamo, isikhathi sokugoma kabusha, noma i-antibody titre.",
      "Tshela umkhiqizi noma umhlengikazi ngama-pneumococcal vaccine angaphambilini wazo zonke izinhlobo, isimo sakho se-immune namanye amaphilisi acindezela i-immune, ukwenqatshwa kwe-asplenia noma izimo ze-organ ezibuhlungu, NAWO WONKE amanye ama-vaccine afanele ngosuku olufanayo.",
      "Bika umkhuhlane ophezulu, ukuqubuka okungajwayelekile, noma izimpawu ze-allergy ezinkulu ngokushesha ngemva kokugoma.",
      "Buza ithimba leyikhliniki ukuthi yimuphi umkhiqizo we-pneumococcal owawunikwa ngaphambilini nokuthi ukugoma kabusha noma umkhiqizo omusha kukhombisa — ungagumi isikhathi sokugoma kabusha wena.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ukuphefumula kanzima ngemva kwe-vaccine — funa usizo oluphuthumayo.",
    ],
    [
      "Dit is 'n pneumokokkale polisakkariede-entstof (PPSV) — dit is nie dieselfde as die gekonjugeerde PCV wat in die babatyd gegee word nie; bevestig watter produk jy ontvang met jou kliniekspan.",
      "PPSV-berading sluit dikwels ligte inspuitingsplekpyn in en maak duidelik dat dit verskillende pneumokokkale serogroepe as PCV teiken. Materia versin nie 'n dosis, herinentingsinterval of teenliggaamtiter nie.",
      "Sê vir jou apteker of verpleegkundige van vorige pneumokokkale entstowwe van enige tipe, jou immuunstatus en enige immuunonderdrukkende medisyne, asplenie of chroniese orgaantoestande, en ALLE ander entstowwe wat dieselfde dag verskuldig is.",
      "Rapporteer hoë koors, ongewone uitslag, of ernstige allergiese tekens vroeg ná inenting.",
      "Vra die kliniekspan watter pneumokokkale entstof jy voorheen ontvang het en of 'n herhaling of 'n ander produk aangedui is — moenie self herinentingstyd besluit nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná 'n entstof kry — soek noodhulp.",
    ],
    [
      "Ke vaccine ea pneumococcal polysaccharide (PPSV) — ha e tšoane le conjugate PCV e filaoeng bongoaneng; netefatsa hore na ke sehlahiswa sefe seo u se amohelang le sehlopha sa kliniki ea hau.",
      "Keletso ea PPSV hangata e kenyelletsa bohloko ba sebaka sa ho enteoa bo bobebe le ho hlakisa hore e shebane le mefuta e fapaneng ea serotype ea pneumococcal ho fapana le PCV. Materia ha e iqape tekanyo, nako ea ho entea bocha, kapa antibody titre.",
      "Bolella rakhemisi kapa mooki ka li-pneumococcal vaccine tsa pejana tsa mofuta ofe kapa ofe, boemo ba hau ba immune le meriana efe kapa efe e hatellang immune, asplenia kapa maemo a chronic a organ, le LI-VACCINE TSOHLE tse lokelang ka letsatsi le le leng.",
      "Tlaleha feberu e phahameng, lekhopho le sa tloaelehang, kapa matšoao a allergy a matla kapele ka mor'a ente.",
      "Botsa sehlopha sa kliniki hore na ke vaccine efe ea pneumococcal eo u e amohelang pele le hore na ho pheta kapa sehlahiswa se fapaneng se hlokahala — o se ke oa etsa qeto ea nako ea ho entea bocha ka noho.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a vaccine — batla thuso ea tšohanyetso.",
    ],
    [
      "Le yivaccine ye-pneumococcal polysaccharide (PPSV) — ayifani ne-conjugate PCV enikwa ebusweni bobusha; qinisekisa ukuba yeyiphi imveliso oyifumanayo neqela leklinikhi yakho.",
      "Iingcebiso ze-PPSV zihlala zibandakanya iintlungu zendawo yokutofa ezincinci nokucacisa ukuba iphikisana neentlobo ze-serotype ze-pneumococcal ezihlukile kwi-PCV. I-Materia ayiyiqiqi idosi, ixesha lokugonywa kwakhona, okanye i-antibody titre.",
      "Xelela usokhemisti okanye umongikazi ngee-pneumococcal vaccine zangaphambili zazo zonke iintlobo, imeko yakho ye-immune nawo nawuphi amayeza acinezelayo e-immune, asplenia okanye iimeko ze-organ ezijongolong, NAZO ZONKE ezinye ii-vaccine ezifanelekileyo ngosuku olufanayo.",
      "Xela umkhuhlane ophezulu, irhashalala engaqhelekanga, okanye iimpawu ze-allergy ezinzima kwangoko emva kogonyo.",
      "Buza iqela leklinikhi ukuba yeyiphi ivaccine ye-pneumococcal owayifumana ngaphambili nokuba ukuphinda-gonywa okanye imveliso ehlukileyo iboniswa — sukugqiba ixesha lokugonywa kwakhona ngokwakho.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye uxinzelelo lokuphefumla emva kwe-vaccine — funa uncedo olungxamisekileyo.",
    ],
  ),

  "mol-rabies-vaccine": five(
    [
      "Rabies vaccine context matters greatly — pre-exposure prophylaxis for travellers or workers differs completely from post-exposure management after an animal bite; confirm your context with the clinic team.",
      "Post-exposure counselling involves wound washing, the vaccination series, and whether rabies immunoglobulin is needed — all directed by the clinic. Materia does not invent a post-exposure series schedule, immunoglobulin dose, or antibody titre target.",
      "Tell your nurse or doctor about any prior rabies vaccine doses received, the date and nature of any wound or exposure, and ALL immune-suppressing medicines you take.",
      "Report high fever, unusual rash, injection-site swelling, or neurological symptoms and seek prompt review.",
      "Ask the clinic team for the complete wound plan — do not attempt to self-direct the post-exposure series or skip doses.",
      "If you get severe allergic swelling, collapse, or trouble breathing after any vaccine dose — seek emergency care immediately.",
    ],
    [
      "Umongo we-rabies vaccine ubaluleke kakhulu — i-prophylaxis yangaphambi kokuchayeka yabahambi noma abasebenzi yehluka ngokuphelele ekuphathweni ngemva kokuchayeka ngemva kokululwa yilwane; qinisekisa umongo wakho nethimba leyikhliniki.",
      "Ukwelulekwa ngemva kokuchayeka kuhilela ukugezwa kwesilonda, uchungechunge lwevaccination, nokuthi irabies immunoglobulin iyadingeka — konke kulawulwa yikhliniki. I-Materia ayiqambi uhlelo lochungechunge ngemva kokuchayeka, umthamo we-immunoglobulin, noma umzimba wokufinyelelela we-antibody titre.",
      "Tshela umhlengikazi noma udokotela ngawo wonke umthamo we-rabies vaccine owawunikwa ngaphambilini, usuku nentando yesikhathi noma silonda sokuchayeka, NAWO WONKE amaphilisi acindezela i-immune owatholayo.",
      "Bika umkhuhlane ophezulu, ukuqubuka okungajwayelekile, ukuvuvuka kwendawo yokujovwa, noma izimpawu zezinzwa bese ufuna ukuhlolwa ngokushesha.",
      "Buza ithimba leyikhliniki uhlelo oluphelele lwesilonda — ungazami ukuzilawula uchungechunge ngemva kokuchayeka noma ukushiya imithamo.",
      "Uma uthola ukuvuvuka kwe-allergy okukhulu, ukuwa, noma ubunzima bokuphefumula ngemva kwemithamo ye-vaccine — funa usizo lwezokwelapha ngokushesha.",
    ],
    [
      "Rabies-entstofkonteks is baie belangrik — pre-blootstellingsprofylakse vir reisigers of werkers verskil geheel en al van post-blootstellingsbestuur ná 'n dierbyt; bevestig jou konteks met die kliniekspan.",
      "Post-blootstellingsberading behels wondwassing, die entstofreeks, en of rabies-immunoglobulien benodig word — alles gelei deur die kliniek. Materia versin nie 'n post-blootstellingreeksskedule, immunoglobuliendosis of teenliggaamtiterteiken nie.",
      "Sê vir jou verpleegkundige of dokter van enige vorige rabies-entstofdosisse, die datum en aard van enige wond of blootstelling, en ALLE immuunonderdrukkende medisyne wat jy neem.",
      "Rapporteer hoë koors, ongewone uitslag, inspuitingsplekswelling, of neurologiese simptome en soek vinnige hersiening.",
      "Vra die kliniekspan vir die volledige wondplan — moenie probeer om die post-blootstellingsreeks self te bestuur of dosisse oor te slaan nie.",
      "As jy ernstige allergiese swelling, ineenstorting, of asemhalingsprobleme ná enige entstofdosis kry — soek onmiddellik noodhulp.",
    ],
    [
      "Moelelo oa vaccine ea rabies o bohlokoa haholo — prophylaxis pele ho chayeha bakeng sa bahahlauli kapa basebetsi e fapana ka ho feletseng le tsamaiso ka mor'a ho chayeha ka mor'a ho lometsa ke phoofolo; netefatsa moelelo oa hau le sehlopha sa kliniki.",
      "Keletso ka mor'a ho chayeha e kenyelletsa ho hlatsoa ha leqeba, letoto la vaccination, le hore na rabies immunoglobulin e hlokahala kapa che — tsohle tse laoloa ke kliniki. Materia ha e iqape kemiso ea letoto ka mor'a ho chayeha, tekanyo ea immunoglobulin, kapa taelo ea antibody titre.",
      "Bolella mooki kapa ngaka ka litekanyo tsohle tsa vaccine ea rabies tse amohetseng pele, letsatsi le hlalosong ea leqeba lefe kapa lefe kapa ho chayeha, le MERIANA YOHLE e hatellang immune eo u e nkelang.",
      "Tlaleha feberu e phahameng, lekhopho le sa tloaelehang, ho ruruha ha sebaka sa ho enteoa, kapa matšoao a neurological 'me u batle bohlokoa bo potlakileng.",
      "Botsa sehlopha sa kliniki moralo o feletseng oa leqeba — o se ke oa leka ho laola letoto ka mor'a ho chayeha ka noho kapa ho tlola litekanyo.",
      "Haeba u fumana ho ruruha ha allergy ho matla, ho oa, kapa ho hema thata ka mor'a tekanyo efe kapa efe ea vaccine — batla thuso ea tšohanyetso ka potlako.",
    ],
    [
      "Umxholo wevaccine ye-rabies ubaluleke kakhulu — i-prophylaxis yangaphambi kokuchaphazeleka yabahamba okanye abasebenzi ihluka ngokupheleleyo ekuphathweni emva kokuchaphazeleka emva kokulumwa lirhamncwa; qinisekisa umxholo wakho neqela leklinikhi.",
      "Iingcebiso emva kokuchaphazeleka zibandakanya ukuhlamba isilonda, uthotho lwevaccination, nokuba i-rabies immunoglobulin iyafuneka — konke kukhokhelwa yiklinikhi. I-Materia ayiyiqiqi ishedyuli yothotho emva kokuchaphazeleka, idosi ye-immunoglobulin, okanye umgingqi we-antibody titre.",
      "Xelela umongikazi okanye ugqirha ngeedosi zangaphambili ze-rabies vaccine ezinikwayo, umhla nendalo yesilonda okanye ukuchaphazeleka okuthile, NAZO ZONKE amayeza acinezelayo e-immune owathabathayo.",
      "Xela umkhuhlane ophezulu, irhashalala engaqhelekanga, ukudumba endaweni yokutofa, okanye iimpawu ze-neurological uze ufune uvavanyo olusheshayo.",
      "Buza iqela leklinikhi isicwangciso esipheleleyo sesilonda — sukuzama ukulawula uthotho emva kokuchaphazeleka ngokwakho okanye ukushiya iidosi.",
      "Ukuba ufumana ukudumba kwe-allergy okunzima, ukuwa, okanye ubunzima bokuphefumla emva kwedosi nayiphi na yevaccine — funa uncedo olungxamisekileyo ngoko nangoko.",
    ],
  ),

  "mol-oxytocin": five(
    [
      "Oxytocin is a uterotonic medicine used in hospital settings to support labour, manage postpartum bleeding, and assist delivery — its use is directed entirely by the obstetric and midwifery care team.",
      "This medicine is never for self-administration. Materia does not invent an infusion rate, uterine contraction target, or uterotonic switching protocol — all decisions belong with the clinician at the bedside.",
      "If you are a patient, inform your midwife or doctor of any prior uterine surgery, uterine abnormality, or previous difficult labour, as these affect how this medicine is safely used.",
      "Monitoring during oxytocin use includes watching for uterine hyperstimulation and fetal heart-rate changes — only the care team can assess and act on these signs at the bedside.",
      "Ask the midwifery or obstetric team to explain the labour plan in terms you understand — you have the right to informed consent for all obstetric interventions.",
      "If you experience severe abdominal pain, heavy bleeding, or feel unwell during or after labour — alert the care team immediately.",
    ],
    [
      "I-oxytocin iyumuthi we-uterotonic osetshenziswa ezibhedlela ukusekela ukubeletha, ukulawula ukuphuma kwegazi ngemva kokuzala, nokuphasa ukuhlinzwa — ukusetshenziswa kwayo kulawulwa ngokuphelele yithimba lokunakekela elenza umsebenzi we-obstetric nomkhuzi.",
      "Lo muthi awusetshenziswa yena. I-Materia ayiqambi inani le-infusion, umzimba we-uterine contraction target, noma uhlelo lokushintsha kwe-uterotonic — zonke izinqumo zihambisana nodokotela osebenza ngasogandaganda.",
      "Uma ungumguli, tshela umkhuzi noma udokotela ngaluphi uhlobo lwe-uterine surgery langaphambilini, ukulimala kwe-uterine, noma ukubeletha okwedlule okunzima, njengoba lokhu kuthinta ukuthi lo muthi usetyenziswa kanjani ngokuphepha.",
      "Ukuqapha ngesikhathi sokusebenzisa i-oxytocin kuhilela ukubuka ukuchichibezeka kwe-uterine okweqile nezinguquko zenhliziyo yengane — ithimba lokunakekela kuphela elingazihlola futhi lisabele kulezo zimpawu ngasogandaganda.",
      "Cela ithimba lomkhuzi noma le-obstetric lichaze uhlelo lokubeletha ngamagama oyaqondana nawo — unelungelo lokuvuma ngemuva kolwazi lwazo zonke izinyathelo ze-obstetric.",
      "Uma uzwa ubuhlungu besisu obukhulu, ukuphuma kwegazi okukhulu, noma uzizwa ungesemi ngesikhathi noma ngemva kokubeletha — xwayisa ithimba lokunakekela ngokushesha.",
    ],
    [
      "Oksitosieen is 'n uterotonikum wat in hospitaalinstellings gebruik word om kraam te ondersteun, naboortsebloeding te bestuur en geboorte te help — die gebruik daarvan word geheel en al deur die verloskunde- en vroedvrou-sorgspan gelei.",
      "Hierdie medisyne is nooit vir selftoediening nie. Materia versin nie 'n infusiesnelheid, uterinekontraksieteiken, of uterotonikuswisselingprotokol nie — alle besluite behoort by die klinikus aan die bedsykant.",
      "As jy 'n pasiënt is, sê vir jou vroedvrou of dokter van enige vorige uterinechirurgie, uterine abnormaliteit, of vorige moeilike kraam, aangesien dit beïnvloed hoe hierdie medisyne veilig gebruik word.",
      "Monitering tydens oksitosieen-gebruik sluit in om te let op uterine hiperstimulasie en veranderinge in fetale harttempo — slegs die sorgspan kan hierdie tekens aan die bedsykant assesseer en op reageer.",
      "Vra die vroedvrou- of verloskunde-span om die kraamsplan in terme wat jy verstaan te verduidelik — jy het die reg op ingeligte toestemming vir alle verloskundige ingrypings.",
      "As jy ernstige buikpyn, swaar bloeding, of ongesteldheid tydens of ná kraam ervaar — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Oxytocin ke moriana oa uterotonic o sebelisoang maemong a sepetela ho tshehetsa ho belega, ho laola ho tsoa ha mali ka mor'a ho belega, le ho thusa ha ho beleha — tšebeliso ea eona e laoloa ka ho feletseng ke sehlopha sa tlhokomelo sa obstetric le mooki.",
      "Moriana ona ha o ka noa o itokisetsa. Materia ha e iqape lebelo la infusion, taelo ea uterine contraction target, kapa protokolo ea ho fetola uterotonic — liphetoho tsohle li le teng le ngaka e sebetsang haufi le mokotla.",
      "Haeba u mokuli, bolella mooki kapa ngaka ka ho phekola uterine ho fetileng hobe, ho se tloaelehe ha uterine, kapa ho belega ho thata pejana, hobane tsena li amehang hore na moriana ona o sebelisoa joang ka tšireletso.",
      "Ho hlokomela nakong ea tšebeliso ea oxytocin ho kenyelletsa ho sheba ho hatella ha uterine ho feteletseng le liphetoho tsa pelo ea ngoanana — sehlopha sa tlhokomelo feela se ka lekola le ho arabela matšoao ana haufi le mokotla.",
      "Kopa sehlopha sa mooki kapa obstetric ho hlalosa moralo oa ho belega ka mantsoe ao u a utloang — u na le tokelo ea tumello e tsebisitsoeng bakeng sa liphekolo tsohle tsa obstetric.",
      "Haeba u ikutloa bohloko bo boholo ba mpa, ho tsoa mali ho feteletseng, kapa u sa ikutloe hantle nakong kapa ka mor'a ho belega — tsebisa sehlopha sa tlhokomelo ka potlako.",
    ],
    [
      "I-oxytocin yiyeza le-uterotonic elisetshenziswa kwiindawo zasesibhedlele ukuxhasa ukubeleka, ukulawula ukuphuma kwegazi emva kokuzala, nokunceda ekuzaleni — ukusetyenziswa kwalo kukhokhelwa ngokupheleleyo yiqela lokunakekela le-obstetric nomzalisi.",
      "Esi yeza asikaze sizinikwe ngokwakho. I-Materia ayiyiqiqi isantya se-infusion, umgingqi we-uterine contraction target, okanye iqhinga lokutshintsha i-uterotonic — zonke izigqibo zihamba noGqirha osebenzela ecaleni lomtshayelo.",
      "Ukuba ungumguli, xelela umzalisi okanye ugqirha ngayo nayiphi utyando lwangaphambili lwe-uterine, isifo se-uterine, okanye ukubeleka okunzima kwangaphambili, njengoko ezi zichaphazela indlela esi yeza sisetyenziswa ngokuphephileyo.",
      "Ukuqhekeza ngexesha lokusetyenziswa kwe-oxytocin kubandakanya ukuqaphela ukuphazamiseka kwe-uterine okuthe kratya nokuguquka kwehati yefilas — iqela lokunakekela kuphela elinokuxilonga lize lisabele kwezi mpawu ecaleni lomtshayelo.",
      "Cela iqela lomzalisi okanye le-obstetric ukuba licacise isicwangciso sokubeleka ngeelwimi oziqondayo — unamalungelo okunikezela ngokwazisiweyo kuzo zonke izonyuso ze-obstetric.",
      "Ukuba uziva iintlungu ezinzima zesisu, ukuphuma kwegazi okuninzi, okanye uziva unganamandla ngexesha okanye emva kokubeleka — xelela iqela lokunakekela ngoko nangoko.",
    ],
  ),

  "mol-protamine": five(
    [
      "Protamine is a hospital-only medicine used to reverse the effects of heparin — it is administered by the clinical team in settings such as cardiac surgery, intensive care, or interventional procedures.",
      "Protamine counselling in an educational context focuses on understanding why it is used and what to watch for. Materia does not invent a reversal dose ratio, infusion rate, or anti-Xa target — these are calculated and managed by the clinical team.",
      "A history of fish allergy, prior protamine exposure, or use of protamine-containing insulin products is clinically important — tell the care team before protamine is given in any procedure.",
      "Signs of a protamine reaction include sudden drop in blood pressure, flushing, difficulty breathing, or chest tightness — the care team monitors for these during administration.",
      "This medicine is never self-administered; if you are a patient scheduled for a procedure involving heparin, ask the surgical or interventional team to explain how heparin reversal is planned for you.",
      "If you experience sudden chest tightness, difficulty breathing, or collapse in a hospital setting — alert the care team immediately.",
    ],
    [
      "I-protamine iyumuthi webhelu kuphela osetshenziswa ukuphendula imiphumela ye-heparin — inikezwa yithimba lezokwelapha ezindaweni ezinjenge-cardiac surgery, ukunakekelwa okuqhubekayo, noma izinyathelo ze-interventional.",
      "Ukwelulekwa kwe-protamine kumongo wemfundo kugxila ekuqondeni ukuthi isetshenziswa ngani nokuthi kukhangelelwa ini. I-Materia ayiqambi ikhosi yokuvusela, inani le-infusion, noma umzimba we-anti-Xa target — lezi zibalwa futhi zilawulwa yithimba lezokwelapha.",
      "Umlando we-allergy yezinhlanzi, ukuchayeka kwangaphambilini kwe-protamine, noma ukusebenzisa imikhiqizo ye-insulin equkethe i-protamine kubalulekile ngokomtholampilo — tshela ithimba lokunakekela ngaphambi kokunikwa i-protamine kunoma yiluphi inqubo.",
      "Izimpawu zokuphendula kwe-protamine zihilela ukuwela kwegazi ngokushesha, ukushisa, ubunzima bokuphefumula, noma ukuqiniseka kwesifuba — ithimba lokunakekela lihlola lezi ngesikhathi sokuhlinzwa.",
      "Lo muthi awusetshenziswa yena; uma ungumguli ohlelwe inqubo ehilela i-heparin, buza ithimba le-surgical noma le-interventional ukuba lichaze ukuthi ukuvusela kwe-heparin kulungiselwa kanjani kuwe.",
      "Uma uzwa ukuqiniseka kwesifuba ngokushesha, ubunzima bokuphefumula, noma ukuwa ezindaweni zebhedi — xwayisa ithimba lokunakekela ngokushesha.",
    ],
    [
      "Protamien is 'n hospitaal-alleenmedisyne wat gebruik word om die effekte van heparin om te keer — dit word deur die kliniese span toegedien in omgewings soos hartslagchirurgie, intensiewe sorg, of intervensionele prosedures.",
      "Protamienberading in 'n opvoedkundige konteks fokus op begrip van hoekom dit gebruik word en waarna om te kyk. Materia versin nie 'n omkeringsdosisverhouding, infusiesnelheid of anti-Xa-teiken nie — dit word bereken en bestuur deur die kliniese span.",
      "'n Geskiedenis van vis-allergie, vorige protamienblootstelling, of gebruik van protamien-bevattende insulienprodukte is klinies belangrik — sê dit vir die sorgspan voordat protamien in enige prosedure gegee word.",
      "Tekens van 'n protamienreaksie sluit in skielike bloeddrukdaling, bloosheid, asemhalingsprobleme, of borsbeklemming — die sorgspan monitor hiervoor tydens toediening.",
      "Hierdie medisyne word nooit self toegedien nie; as jy 'n pasiënt is wat vir 'n prosedure met heparin geskeduleer is, vra die chirurgiese of intervensionele span om te verduidelik hoe heparin-omkeering vir jou beplan is.",
      "As jy skielike borsbeklemming, asemhalingsprobleme, of ineenstorting in 'n hospitaalagting ervaar — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Protamine ke moriana oa sepetela feela o sebelisoang ho fetola litlamorao tsa heparin — o noa ke sehlopha sa tlhokomelo maemong a kang ho phekola pelo, tlhokomelo e matla, kapa lits'ebetso tsa interventional.",
      "Keletso ea protamine molemong oa thuto e shebane le ho utloisisa hore na e sebelisoa hobane'ng le hore na ho shebelloa eng. Materia ha e iqape ratio ea tekanyo ea ho fetola, lebelo la infusion, kapa taelo ea anti-Xa — tsena li baloa le ho laoloa ke sehlopha sa tlhokomelo.",
      "Histori ea allergy ea tlhapi, ho chayeha ha protamine pejana, kapa tšebeliso ea lihlahisoa tsa insulin tse nang le protamine ke bohlokoa ka hare ho tlhokomelo — bolella sehlopha sa tlhokomelo pele ho fana ka protamine mohato ofe kapa ofe.",
      "Matšoao a karabelo ea protamine a kenyelletsa phôtho e potlakileng ea kgatello ea mali, ho chesoa, ho hema thata, kapa ho tightening ha sehuba — sehlopha sa tlhokomelo se hlokomela tsena nakong ea ho noa.",
      "Moriana ona ha o ka noa o itokisetsa; haeba u mokuli o reretsoe mohato o kenyelletsa heparin, kopa sehlopha sa surgery kapa interventional ho hlalosa hore na ho fetola heparin ho reretsoe joang bakeng sa hau.",
      "Haeba u ikutloa ho tightening ha sehuba ha potlako, ho hema thata, kapa ho oa setšeng sa sepetela — tsebisa sehlopha sa tlhokomelo ka potlako.",
    ],
    [
      "I-protamine yiyeza lesibhedlele-kuphela elisetshenziswa ukuphendulelana nemiphumela ye-heparin — inikezwa yiqela lezonyango kwiindawo ezifana ne-cardiac surgery, ukunyangwa okugqithisileyo, okanye iinkqubo ze-interventional.",
      "Iingcebiso ze-protamine kumxholo wezemfundo zigxile ekuqondeni ukuba isetshenziswa ngoba yintoni nokuba kukhangelelwa ntoni. I-Materia ayiyiqiqi inqanaba lokubuyisela, isantya se-infusion, okanye umgingqi we-anti-Xa — ezi zibalwa kwaye zilawulwa yiqela lezonyango.",
      "Imbali ye-allergy yentlanzi, ukuchaphazeleka kwangaphambili kwe-protamine, okanye ukusetyenziswa kwemveliso ye-insulin equkethe i-protamine kubalulekile ngokwezonyango — xelela iqela lokunakekela ngaphambi kokunikiwa i-protamine nakuyiphi na inkqubo.",
      "Iimpawu zempendulo ye-protamine zibandakanya ukwehla ngequbuliso kwengcinezelo yegazi, ukufuthumala, ubunzima bokuphefumla, okanye ukucinezela kwesifuba — iqela lokunakekela liqaphela ezi ngexesha lokunikwa.",
      "Esi yeza asizinikwa ngokwakho; ukuba ungumguli ohlelelwe inkqubo ebandakanya i-heparin, cela iqela le-surgical okanye le-interventional ukuba lichaze ukuba ukubuyisa i-heparin kulungiselwe njani kuwe.",
      "Ukuba uziva ukucinezela kwesifuba ngequbuliso, ubunzima bokuphefumla, okanye ukuwa kwisibhedlele — xelela iqela lokunakekela ngoko nangoko.",
    ],
  ),

  "mol-bupivacaine": five(
    [
      "Bupivacaine is a long-acting local anaesthetic used by anaesthetists and trained clinicians — available forms include plain solution, adrenaline-containing mixtures, and hyperbaric spinal preparations; the correct form for each procedure is selected by the anaesthetic team.",
      "This medicine is never self-administered. Materia does not invent a maximum dose for a block type, concentration for each form, or infusion rate — all are determined and managed by the anaesthetist based on your weight, block type, and clinical context.",
      "Tell your anaesthetist about ALL cardiac medicines you take, any prior local anaesthetic reactions, liver disease, and any history of seizures, as these affect bupivacaine safety.",
      "Local anaesthetic systemic toxicity (LAST) is a serious but rare complication — the anaesthetic team is trained to recognise early signs such as metallic taste, ringing in the ears, dizziness, or muscle twitching.",
      "Ask your anaesthetist what type of block or epidural is planned and what sensations to expect — you have the right to understand the anaesthetic approach.",
      "If you notice metallic taste, sudden dizziness, abnormal heartbeat, or muscle twitching during or after a local anaesthetic procedure — alert the clinical team immediately.",
    ],
    [
      "I-bupivacaine iyisicutho se-local anaesthetic eside isetshenziswa ngabahlengikazi be-anaesthetics nabezokwelapha abaqeqeshiwe — izinhlobo ezitholakalayo zihilela isixazululo esijwayelekile, izihlanganiso eziqukethe i-adrenaline, nezilungiselelo ze-spinal hyperbaric; ifomu efanele yalungiselelo ngalinye ikhethwa yithimba le-anaesthetic.",
      "Lo muthi awusetshenziswa yena. I-Materia ayiqambi umthamo omkhulu wobuhlobo be-block, i-concentration yalungiselelo ngalinye, noma inani le-infusion — konke kulawulwa futhi kuphathwa umhlengikazi we-anaesthetic ngokusekelwe kuwa-phela, uhlobo lwe-block, nomongo wezokwelapha.",
      "Tshela umhlengikazi we-anaesthetic ngawo WONKE amaphilisi ezinhliziyo owatholayo, noma yiluphi uhlobo lwe-local anaesthetic lwalungaphambilini, isifo sezibindi, noma umlando wezihibe, njengoba lokhu kuthinta ukuphepha kwe-bupivacaine.",
      "I-local anaesthetic systemic toxicity (LAST) iyinkinga ebuhlungu kodwa into enkabazane — ithimba le-anaesthetic liqeqeshiwe ukubona izimpawu zokuqala ezinjengezithelelo ze-metallic, ukungcwinga ezindlebeni, ukuphenduka, noma ukujikijika kwamasimu.",
      "Buza umhlengikazi we-anaesthetic ukuthi yiluphi uhlobo lwe-block noma le-epidural oluhlelelwe nokuthi izinzwa zini ezikulindelekiwe — unelungelo lokwazi indlela ye-anaesthetic.",
      "Uma uzwa ukuphinda kwe-metallic, ukuphenduka ngokushesha, inhliziyo ehlukile, noma ukujikijika kwamasimu ngesikhathi noma ngemva kwezikhungo ze-local anaesthetic — xwayisa ithimba lezokwelapha ngokushesha.",
    ],
    [
      "Bupivakïen is 'n langwerkende plaaslike verdowingsmiddel wat deur anestesiste en opgeleide klinici gebruik word — beskikbare vorms sluit in gewone oplossing, adrenalien-bevattende mengsels, en hiperbariese spinale preparate; die korrekte vorm vir elke prosedure word deur die anestesispan gekies.",
      "Hierdie medisyne word nooit self toegedien nie. Materia versin nie 'n maksimum dosis vir 'n blokkeringstipe, konsentrasie vir elke vorm, of infusiesnelheid nie — dit word alles bepaal en bestuur deur die anestesist op grond van jou gewig, blokkeringstipe, en kliniese konteks.",
      "Sê vir jou anestesist van ALLE hartmiddelens wat jy neem, enige vorige plaaslike verdowingsreaksies, lewersiektes, en enige geskiedenis van stuiptrekkings, aangesien dit bupivakïenveiligheid beïnvloed.",
      "Plaaslike verdowingsmiddel sistemiese toksisiteit (LAST) is 'n ernstige maar skaars komplikasie — die anestesispan is opgelei om vroeë tekens soos metaalsmaak, tinnitus, duiseligheid, of spiertrekkings te herken.",
      "Vra jou anestesist watter tipe blokkering of epiduraal beplan is en watter sensasies om te verwag — jy het die reg om die anestesiese benadering te verstaan.",
      "As jy metaalsmaak, skielike duiseligheid, abnormale hartklop, of spiertrekkings tydens of ná 'n plaaslike verdowingsprosedure opmerk — waarsku die kliniese span onmiddellik.",
    ],
    [
      "Bupivacaine ke sedopa sa ho fokoletsa bohloko ba sebaka se leng ka teng se sebetsang nako e telele se sebelisoang ke ba anaesthetics le bafani ba tlhokomelo ba ruisoang — mefuta e fumanoang e kenyelletsa solution e tloaelehileng, mixtures tse nang le adrenaline, le lihlahisoa tsa spinal hyperbaric; mofuta o nepahetseng bakeng sa mohato ka mong o khethoa ke sehlopha sa anaesthetic.",
      "Moriana ona ha o ka noa o itokisetsa. Materia ha e iqape tekanyo e phahameng ea mofuta oa block, concentration bakeng sa mofuta ka mong, kapa lebelo la infusion — tsohle li tsejoa le ho laoloa ke anaesthetist ho latela boima ba hau, mofuta oa block, le moelelo oa tlhokomelo.",
      "Bolella anaesthetist ea hau ka MERIANA YOHLE ea pelo eo u e nkelang, karabelo efe kapa efe ea local anaesthetic ea pejana, lefu la sebete, le histori efe kapa efe ea li-seizure, hobane tsena li amehang tšireletso ea bupivacaine.",
      "Local anaesthetic systemic toxicity (LAST) ke mathata a matla empa a sa tloaelehang — sehlopha sa anaesthetic se ruisoana le ho lemoha matšoao a tšoaong a kang letsoa la metale, ho letsa litsebeng, ho ferekana, kapa ho thothomela ha maikutlo.",
      "Botsa anaesthetist ea hau hore na ke mofuta ofe oa block kapa epidural o reriloeng le hore na maikutlo afe a letetsoeng — u na le tokelo ea ho utloisisa mokhoa oa anaesthetic.",
      "Haeba u lemoha letsoa la metale, ho ferekana ha potlako, ho itela ha pelo ho sa tloaelehang, kapa ho thothomela ha maikutlo nakong kapa ka mor'a ts'ebetso ea local anaesthetic — tsebisa sehlopha sa tlhokomelo ka potlako.",
    ],
    [
      "I-bupivacaine yisicoco se-local anaesthetic eside esetshenziswa ngabantu be-anaesthetics nabezonyango abaqeqeshiweyo — iintlobo ezifumanekayo zibandakanya isixazululo esiqhelekileyo, izindululo ezinadrenaline, nezilungiselelo ze-spinal hyperbaric; ifomu eyiyo yenkqubo nganye ikhethwa yiqela le-anaesthetic.",
      "Esi yeza asizinikwa ngokwakho. I-Materia ayiyiqiqi idosi ephezulu yohlobo lwe-block, i-concentration yobuqu bwesimo ngasinye, okanye isantya se-infusion — zonke zinqunywa kwaye zilawulwa yi-anaesthetist ngokusekelwe kwisisindo sakho, uhlobo lwe-block, nomxholo wezonyango.",
      "Xelela i-anaesthetist yakho ngawo WONKE amayeza entliziyo owathabathayo, nayiphi impendulo yangaphambili ye-local anaesthetic, isifo sezibindi, nayo nayiphi imbali ye-seizures, njengoko ezi zichaphazela ukuphepha kwe-bupivacaine.",
      "I-local anaesthetic systemic toxicity (LAST) yingxaki enzima kodwa ayiqhelekanga — iqela le-anaesthetic liqeqeshiwe ukuqaphela izimpawu zokuqala ezifana nencasa ye-metallic, umsindo eendlebeni, ukuzizwa uyadunguzela, okanye ukuthothozela kwamasimu.",
      "Buza i-anaesthetist yakho ukuba yeyiphi uhlobo lwe-block okanye le-epidural olulungiselwayo nokuba ziluphi imvakalelo ekulindelekileyo — unamalungelo okuqonda indlela ye-anaesthetic.",
      "Ukuba uqaphela incasa ye-metallic, ukuzizwa uyadunguzela ngequbuliso, intliziyo engaqhelekanga, okanye ukuthothozela kwamasimu ngexesha okanye emva kwenkqubo ye-local anaesthetic — xelela iqela lezonyango ngoko nangoko.",
    ],
  ),

  "mol-ropivacaine": five(
    [
      "Ropivacaine is an amide local anaesthetic used for regional blocks, epidurals, and wound infiltration by trained anaesthetic and surgical teams — available forms and concentrations differ for different block types.",
      "This medicine is never self-administered. Materia does not invent a maximum dose for a block type, concentration for each form, or infusion rate — these are selected and managed by the anaesthetic team for each patient and procedure.",
      "Tell your anaesthetist about ALL cardiac medicines, any prior local anaesthetic reactions, liver disease, and any history of seizures — these affect how ropivacaine is safely used.",
      "Like all amide local anaesthetics, ropivacaine carries a risk of local anaesthetic systemic toxicity (LAST) — early warning signs include metallic taste, ringing in the ears, dizziness, and muscle twitching.",
      "Ask your anaesthetic or surgical team what regional technique is planned and what sensations or numbness to expect after the block — this helps you report any unexpected change promptly.",
      "If you notice metallic taste, sudden dizziness, abnormal heartbeat, or muscle twitching during or after a regional anaesthetic procedure — alert the care team immediately.",
    ],
    [
      "I-ropivacaine iyisi-amide local anaesthetic isetshenziswa kumablock esifunda, ama-epidural, nezinyathelo zokuphenywa kwesilonda yithimba le-anaesthetic nezocwaningo eqeqeshiwe — izinhlobo nezikali ezikhona iyahluka ngezinhlobo ezihlukile zeblock.",
      "Lo muthi awusetshenziswa yena. I-Materia ayiqambi umthamo omkhulu wobuhlobo be-block, i-concentration yalungiselelo ngalinye, noma inani le-infusion — lezi zikhethwa futhi zilawulwa yithimba le-anaesthetic kumguli ngamunye nalezo zinyathelo.",
      "Tshela umhlengikazi we-anaesthetic ngawo WONKE amaphilisi ezinhliziyo, noma yiluphi uhlobo lwe-local anaesthetic lwalungaphambilini, isifo sezibindi, kanye nomlando wezihibe — lokhu kuthinta ukuphepha kwe-ropivacaine.",
      "Njengawo wonke ama-amide local anaesthetics, i-ropivacaine ithwala ingozi ye-local anaesthetic systemic toxicity (LAST) — izimpawu zexwayiso lokuqala zihilela letsolo le-metallic, ukungcwinga ezindlebeni, ukuphenduka, nokuphenduka kwamasimu.",
      "Buza ithimba le-anaesthetic noma le-surgical ukuthi yiluphi ubuchwepheshe besifunda oluhlelelwe nokuthi kuzizwa izinzwa noma ukufa kwezinzwa okukulindelekiwe ngemva kweblock — lokhu kukusiza ukubika ushintsho olungalindelekile ngokushesha.",
      "Uma uzwa ukuphinda kwe-metallic, ukuphenduka ngokushesha, inhliziyo ehlukile, noma ukujikijika kwamasimu ngesikhathi noma ngemva kwezikhungo ze-regional anaesthetic — xwayisa ithimba lokunakekela ngokushesha.",
    ],
    [
      "Ropivakïen is 'n amied plaaslike verdowingsmiddel wat gebruik word vir streeksblokkeringe, epidurale, en wondinfiltrasie deur opgeleide anestesiese en chirurgiese spanne — beskikbare vorms en konsentrasies verskil vir verskillende blokkeringstipes.",
      "Hierdie medisyne word nooit self toegedien nie. Materia versin nie 'n maksimum dosis vir 'n blokkeringstipe, konsentrasie vir elke vorm, of infusiesnelheid nie — dit word deur die anestesispan vir elke pasiënt en prosedure gekies en bestuur.",
      "Sê vir jou anestesist van ALLE hartmiddelens, enige vorige plaaslike verdowingsreaksies, lewersiekte, en enige geskiedenis van stuiptrekkings — dit beïnvloed hoe ropivakïen veilig gebruik word.",
      "Soos alle amied plaaslike verdowingsmiddels dra ropivakïen 'n risiko van plaaslike verdowingsmiddel sistemiese toksisiteit (LAST) — vroeë waarskuwingstekens sluit in metaalsmaak, tinnitus, duiseligheid, en spiertrekkings.",
      "Vra jou anestesiese of chirurgiese span watter streekstegniek beplan is en watter sensasies of gevoelloosheid ná die blokkering om te verwag — dit help jou om enige onverwagte verandering vinnig te rapporteer.",
      "As jy metaalsmaak, skielike duiseligheid, abnormale hartklop, of spiertrekkings tydens of ná 'n streeksanestesiesprosedure opmerk — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Ropivacaine ke sedopa sa ho fokoletsa bohloko sa amide se sebelisoang bakeng sa li-block tsa sebaka, li-epidural, le ho kenya leqebeng ka sehlopha sa anaesthetic le surgery se ruisoang — mefuta le li-concentration tse fumanoang li fapana bakeng sa mefuta e fapaneng ea block.",
      "Moriana ona ha o ka noa o itokisetsa. Materia ha e iqape tekanyo e phahameng ea mofuta oa block, concentration bakeng sa mofuta ka mong, kapa lebelo la infusion — tsena li khethoa le ho laoloa ke sehlopha sa anaesthetic bakeng sa mokuli ka mong le ts'ebetso.",
      "Bolella anaesthetist ea hau ka MERIANA YOHLE ea pelo, karabelo efe kapa efe ea local anaesthetic ea pejana, lefu la sebete, le histori efe kapa efe ea li-seizure — tsena li amehang hore na ropivacaine e sebelisoa joang ka tšireletso.",
      "Joaloka li-amide local anaesthetics tsohle, ropivacaine e rwala kotsi ea local anaesthetic systemic toxicity (LAST) — matšoao a tlhahiso ea tšoaong a kenyelletsa letsoa la metale, ho letsa litsebeng, ho ferekana, le ho thothomela ha maikutlo.",
      "Botsa sehlopha sa hau sa anaesthetic kapa surgery hore na ke tekhniki efe ea sebaka e reriloeng le hore na maikutlo kapa ho foea ha maikutlo ho letetsoeng ka mor'a block — sena se o thusa ho tlaleha phetoho efe kapa efe e sa letetsoeng ka potlako.",
      "Haeba u lemoha letsoa la metale, ho ferekana ha potlako, ho itela ha pelo ho sa tloaelehang, kapa ho thothomela ha maikutlo nakong kapa ka mor'a ts'ebetso ea anaesthetic ea sebaka — tsebisa sehlopha sa tlhokomelo ka potlako.",
    ],
    [
      "I-ropivacaine yi-amide local anaesthetic esetshenziswa kwii-block zesithili, ii-epidural, nokuphenywa kwesilonda yiqela le-anaesthetic neqela le-surgical eliQeqeshiweyo — iintlobo ne-concentration ezifumanekayo ziyahluka ngohlobo lwe-block.",
      "Esi yeza asizinikwa ngokwakho. I-Materia ayiyiqiqi idosi ephezulu yohlobo lwe-block, i-concentration yobuqu bwesimo ngasinye, okanye isantya se-infusion — ezi zikhethwa kwaye zilawulwa yiqela le-anaesthetic kumguli ngamnye nankqubo nganye.",
      "Xelela i-anaesthetist yakho ngawo WONKE amayeza entliziyo, nayiphi impendulo yangaphambili ye-local anaesthetic, isifo sezibindi, nayo nayiphi imbali ye-seizures — ezi zichaphazela indlela i-ropivacaine esetshenziswa ngokuphephileyo.",
      "Njengabo bonke ama-amide local anaesthetics, i-ropivacaine ithwala ingozi ye-local anaesthetic systemic toxicity (LAST) — izimpawu zexwayiso zokuqala zibandakanya incasa ye-metallic, umsindo eendlebeni, ukuzizwa uyadunguzela, nokuqhagamshelana kwamasimu.",
      "Buza iqela lakho le-anaesthetic okanye le-surgical ukuba yeyiphi itekhnike yesithili elungiselwayo nokuba ziluphi imvakalelo okanye ukufa kwemvakalelo ekulindelekileyo emva kwe-block — oku kukunceda ukuba uxele naluphi ushintsho olungalindelekileyo ngokushesha.",
      "Ukuba uqaphela incasa ye-metallic, ukuzizwa uyadunguzela ngequbuliso, intliziyo engaqhelekanga, okanye ukuqhagamshelana kwamasimu ngexesha okanye emva kwenkqubo ye-regional anaesthetic — xelela iqela lokunakekela ngoko nangoko.",
    ],
  ),

  "mol-ketamine": five(
    [
      "Ketamine is a dissociative anaesthetic used in hospital and emergency settings for procedural sedation, induction of anaesthesia, and pain management — it is administered and monitored by a trained clinical team.",
      "This medicine is never for self-administration. Materia does not invent an induction dose, maintenance rate, or emergence management protocol — all are determined by the anaesthetist or emergency clinician for each patient and clinical context.",
      "Tell your anaesthetic or emergency team about ALL medicines you take, any history of psychosis or hallucinations, thyroid conditions, raised intracranial pressure, and history of substance use — all of these affect ketamine safety.",
      "Emergence phenomena — including vivid dreams, confusion, or altered perception on waking — are a recognised feature of ketamine; the clinical team anticipates and manages these in recovery.",
      "Ask the clinical team what to expect during recovery — knowing about the emergence experience helps reduce anxiety and improves cooperation with the care team.",
      "If you or a family member experience prolonged confusion, severe agitation, or difficulty breathing after a ketamine procedure — alert the care team immediately.",
    ],
    [
      "I-ketamine iyisicuthu se-dissociative anaesthetic isetshenziswa ezindaweni zebhedi nezokusizakala ukuseda inqubo, ukuzalisa i-anaesthesia, nokuphathwa kobuhlungu — inikezwa futhi ihlolwa yithimba lezokwelapha eqeqeshiwe.",
      "Lo muthi awusetshenziswa yena. I-Materia ayiqambi umthamo wokuqala, inani lokuqhubeka, noma uhlelo lokuphatha ukuvuka — konke kulawulwa yi-anaesthetist noma umngani wezokusizakala kumguli ngamunye nomongo wezokwelapha.",
      "Tshela ithimba le-anaesthetic noma lezokusizakala ngawo WONKE amaphilisi owatholayo, noma yiluphi umlando we-psychosis noma wokuphantaza, izimo zesilulu, ukukhuphuka kwengcindezi yangaphakathi kwengqondo, kanye nomlando wokusetshenziswa kwezinto — konke lokhu kuthinta ukuphepha kwe-ketamine.",
      "Izinto zokuvuka — kuhilela amaphupho asensimbi, ukudideka, noma izinzwa ezihlukile ngesikhathi sokuvuka — kuyinto eyaziwa kwe-ketamine; ithimba lezokwelapha ilindela futhi ilawule lezi ezinhlelweni zokubuyisela.",
      "Buza ithimba lezokwelapha okuthi kulindeleke nini ngesikhathi sokubuyisela — ukwazi ngokuvuka kusiza ukunciphisa ukukhathazeka nokusiza nokusekelana nethimba lokunakekela.",
      "Uma wena noma ilungu lomndeni luzwa ukudideka okuqhubekayo, ukuzonda okukhulu, noma ubunzima bokuphefumula ngemva kwe-ketamine — xwayisa ithimba lokunakekela ngokushesha.",
    ],
    [
      "Ketamien is 'n dissosiatiewe verdowingsmiddel wat in hospitaal- en noodomgewings gebruik word vir prosedurele sedasie, verdowingsinleiding, en pynbestuur — dit word toegedien en gemonitor deur 'n opgeleide kliniese span.",
      "Hierdie medisyne is nooit vir selftoediening nie. Materia versin nie 'n induksiedosis, onderhoudsnelheid, of opkomende bestuursprotokol nie — dit word alles deur die anestesist of noodklinikus vir elke pasiënt en kliniese konteks bepaal.",
      "Sê vir jou anestesiese of noodspan van ALLE medisyne wat jy neem, enige geskiedenis van psigose of hallusinasies, skildklierstoornisse, verhoogde intrakraniale druk, en geskiedenis van middelemisbruik — dit alles beïnvloed ketamïenveiligheid.",
      "Opkomende verskynsels — insluitend lewendige drome, verwarring, of veranderde persepsie by ontwaak — is 'n erkende kenmerk van ketamïen; die kliniese span antisipeer en bestuur hierdie tydens herstel.",
      "Vra die kliniese span wat om te verwag tydens herstel — kennis van die opkomende ondervinding help om angs te verminder en samewerking met die sorgspan te verbeter.",
      "As jy of 'n familielid verlengde verwarring, ernstige agitasie, of asemhalingsprobleme ná 'n ketamïenprosedure ervaar — waarsku die sorgspan onmiddellik.",
    ],
    [
      "Ketamine ke sedopa sa anaesthetic se fetohang se sebelisoang maemong a sepetela le a tšohanyetso bakeng sa ho homotsa mohato, ho qala anaesthesia, le ho laola bohloko — e noa le ho hlokomeloa ke sehlopha sa tlhokomelo se ruisoang.",
      "Moriana ona ha o ka noa o itokisetsa. Materia ha e iqape tekanyo ea ho qala, lebelo la ho boloka, kapa protokolo ea ho laola ho vuka — tsohle li tsejoa ke anaesthetist kapa ngaka ea tšohanyetso bakeng sa mokuli ka mong le moelelo oa tlhokomelo.",
      "Bolella sehlopha sa hau sa anaesthetic kapa tšohanyetso ka MERIANA YOHLE eo u e nkelang, histori efe kapa efe ea psychosis kapa ho bona litšoantšo, maemo a thyroid, kgatello e phahamisitsoeng kahare ho hlogong, le histori ea tšebeliso ea lintho — tsena tsohle li amehang tšireletso ea ketamine.",
      "Matšoao a ho vuka — kenyelletsa lipono tse phelang, ho fokotseha, kapa maikutlo a fetohetsoeng ha ho vuka — ke sebopeho se tsejoang sa ketamine; sehlopha sa tlhokomelo se lebelela le ho laola tsena nakong ea ho hola.",
      "Botsa sehlopha sa tlhokomelo hore na ho letetsoeng nakong ea ho hola — ho tseba ka maitemohelo a ho vuka ho thusa ho fokotsa aho matšoao le ho ntlafatsa tšebelisano le sehlopha sa tlhokomelo.",
      "Haeba wena kapa setho sa lelapa u ikutloa ho fokotseha ho tsoelang pele, ho halefisoa ho matla, kapa ho hema thata ka mor'a ts'ebetso ea ketamine — tsebisa sehlopha sa tlhokomelo ka potlako.",
    ],
    [
      "I-ketamine yi-dissociative anaesthetic esetshenziswa kwisibhedlele nakwiimeko zezingxamiseko ukuphumza inkqubo, ukuqalisa i-anaesthesia, nokuphathwa kwentlungu — inikezwa kwaye iqhekeza yiqela lezonyango eliQeqeshiweyo.",
      "Esi yeza asizinikwa ngokwakho. I-Materia ayiyiqiqi idosi yokuqalisa, isantya sokunakekela, okanye iqhinga lokuphathwa kokuvuka — zonke zinqunywa yi-anaesthetist okanye ugqirha wezingxamiseko kumguli ngamnye nomxholo wezonyango.",
      "Xelela iqela lakho le-anaesthetic okanye lezingxamiseko ngawo WONKE amayeza owathabathayo, nayiphi imbali ye-psychosis okanye ukubona izinto ezingekhoyo, iimeko ze-thyroid, ingcinezelo ephakamileyo ngaphakathi entloko, nembali yokusetyenziswa kwezinto — zonke ezi zichaphazela ukuphepha kwe-ketamine.",
      "Izinto zokuvuka — kubandakanya amaphupho aselula, ukudideka, okanye imvakalelo etshintshiweyo ngexesha lokuvuka — ngumfanekiso owaziwayo we-ketamine; iqela lezonyango liyalindela kwaye lilawe ezi ngexesha lokubuyisela.",
      "Buza iqela lezonyango ukuba kululindele ntoni ngexesha lokubuyisela — ukwazi ngamava okuvuka kunceda ukunciphisa uxinzelelo nokuphucula ukusebenzisana neqela lokunakekela.",
      "Ukuba wena okanye ilungu losapho liziva ukudideka okuqhubekayo, ukucaphuka okunzima, okanye ubunzima bokuphefumla emva kwenkqubo ye-ketamine — xelela iqela lokunakekela ngoko nangoko.",
    ],
  ),

  "mol-propofol": five(
    [
      "Propofol is an intravenous anaesthetic used in hospital settings for induction and maintenance of general anaesthesia and procedural sedation — it is always administered by a trained anaesthetist or intensivist, never in a community or self-care setting.",
      "This medicine is never for self-administration. Materia does not invent an induction dose, target-controlled infusion rate, or propofol infusion syndrome threshold — all clinical decisions are made by the anaesthetic team based on your weight, procedure, and physiological monitoring.",
      "Tell your anaesthetist about ALL medicines you take, any egg or soya allergy (the emulsion contains these), lipid disorders, and any history of propofol infusion syndrome in close family members.",
      "Propofol is a lipid emulsion — strict asepsis during preparation and administration is critical to prevent infection; the anaesthetic team observes specific handling protocols for every use.",
      "Ask your anaesthetic team to explain the sedation plan and expected recovery time — knowing what to expect helps you and your family prepare for the post-procedure period.",
      "If you have a known egg or soya allergy, ensure this is clearly documented and communicated to the anaesthetic team before any procedure — do not assume the team already knows.",
    ],
    [
      "I-propofol iyumuthi we-intravenous anaesthetic osetshenziswa ezibhedlela ukuqala nokugcina i-general anaesthesia nokuseda inqubo — ihlala inikezwa yi-anaesthetist noma umchwami we-intensive care eqeqeshiwe, hhayi endaweni yomphakathi noma ezinakekelweni eziziphathayo.",
      "Lo muthi awusetshenziswa yena. I-Materia ayiqambi umthamo wokuqala, inani le-target-controlled infusion, noma umzimba we-propofol infusion syndrome threshold — zonke izinqumo zezokwelapha zenziwa yithimba le-anaesthetic ngokusekelwe kuwa-phela, inqubo, nokuhlolwa kwe-physiological.",
      "Tshela umhlengikazi we-anaesthetic ngawo WONKE amaphilisi owatholayo, noma yiluphi i-allergy ye-egg noma ye-soya (i-emulsion iqukethe lezi), izimpazamo ze-lipid, kanye nomlando we-propofol infusion syndrome kumalungu omndeni asondele.",
      "I-propofol iy-emulsion ye-lipid — i-asepsis eqinile ngesikhathi sokulungiselela nokunikeza ibalulekile ukuvikela ukungena kwegciwane; ithimba le-anaesthetic lihlola imithetho yokuphatha egciniwe kumjovo ngamunye.",
      "Buza ithimba le-anaesthetic ukuba lichaze uhlelo lokuseda nesikhathi esilindelekile sokubuyisela — ukwazi okuthi kulindeleke kusiza wena nomndeni ukuba nilungisele isikhathi ngemva kwalungiselelo.",
      "Uma unomoya we-allergy ye-egg noma ye-soya, qinisekisa ukuthi lokhu kubhalwe ngokucacile futhi kuxoxiselwa nalo ithimba le-anaesthetic ngaphambi kwanoma yiluphi uhlobo — ungacingi ukuthi ithimba seliyazi.",
    ],
    [
      "Propofol is 'n intraveneuse verdowingsmiddel wat in hospitaalinstellings gebruik word vir inleiding en instandhouding van algemene narkose en prosedurele sedasie — dit word altyd deur 'n opgeleide anestesist of intensivis toegedien, nooit in 'n gemeenskap- of selfsorgsetting nie.",
      "Hierdie medisyne is nooit vir selftoediening nie. Materia versin nie 'n induksiedosis, teikenbeheerde infusiesnelheid, of propofol-infusiesindroom-drempelwaarde nie — alle kliniese besluite word deur die anestesispan geneem op grond van jou gewig, prosedure, en fisiologiese monitering.",
      "Sê vir jou anestesist van ALLE medisyne wat jy neem, enige eier- of soja-allergie (die emulsie bevat hierdie), lipidale stoornisse, en enige geskiedenis van propofol-infusiesindroom by nabye familielede.",
      "Propofol is 'n lipidemulsie — streng asepsie tydens voorbereiding en toediening is krities om infeksie te voorkom; die anestesispan volg spesifieke hanteringsprotokols vir elke gebruik.",
      "Vra jou anestesispan om die sedasieplan en verwagte hersteltyd te verduidelik — om te weet wat om te verwag help jou en jou familie om voor te berei vir die post-prosedure tydperk.",
      "As jy 'n bekende eier- of soja-allergie het, verseker dat dit duidelik gedokumenteer en aan die anestesispan gekommunikeer word voor enige prosedure — moenie aanvaar die span weet dit reeds nie.",
    ],
    [
      "Propofol ke moriana oa anaesthetic oa intravenous o sebelisoang maemong a sepetela bakeng sa ho qala le ho boloka anaesthesia ea kakaretso le ho homotsa mohato — o noa kamehla ke anaesthetist kapa intensivist ea ruisoang, eseng setšeng sa sechaba kapa tlhokomelo e itokisetsoang.",
      "Moriana ona ha o ka noa o itokisetsa. Materia ha e iqape tekanyo ea ho qala, lebelo la target-controlled infusion, kapa lebelo la propofol infusion syndrome — liphetoho tsohle tsa tlhokomelo li etsoa ke sehlopha sa anaesthetic ho latela boima ba hau, mohato, le ho hlokomela ha physiological.",
      "Bolella anaesthetist ea hau ka MERIANA YOHLE eo u e nkelang, allergy efe kapa efe ea leei kapa soya (emulsion e na le tsena), mathata a lipid, le histori ea propofol infusion syndrome ho setho sa lelapa se haufi.",
      "Propofol ke emulsion ea lipid — asepsis e matla nakong ea ho etsa le ho noa ke bohlokoa ho thibela tšoaetso; sehlopha sa anaesthetic se latela liprotokolo tse khetheho tsa ho sebetsana le tšebeliso e 'ngoe le e 'ngoe.",
      "Botsa sehlopha sa hau sa anaesthetic ho hlalosa moralo oa ho homotsa le nako e letetsoang ea ho hola — ho tseba hore na ho letetsoang ho thusa wena le lelapa la hau ho itokisetsa nako ka mor'a mohato.",
      "Haeba u na le allergy e tsejoang ea leei kapa soya, netefatsa hore sena se qoiloe ka ho hlakile 'me se hlalosoa ho sehlopha sa anaesthetic pele ho mohato ofe kapa ofe — o se ke oa nahana hore sehlopha se se tseba.",
    ],
    [
      "I-propofol yi-anaesthetic ye-intravenous esetshenziswa kwisibhedlele ukuqalisa nokuqhubeka kwe-general anaesthesia nokuphumza inkqubo — ihlala inikezwa yi-anaesthetist okanye umchwami we-intensive care oqeqeshiweyo, hayi kwimeko yoluntu okanye yonaniko lwangokwakho.",
      "Esi yeza asizinikwa ngokwakho. I-Materia ayiyiqiqi idosi yokuqalisa, isantya se-target-controlled infusion, okanye umgingqi we-propofol infusion syndrome — zonke izigqibo zezonyango zenziwa yiqela le-anaesthetic ngokusekelwe kwisisindo sakho, inkqubo, nokuqhekeza kwe-physiological.",
      "Xelela i-anaesthetist yakho ngawo WONKE amayeza owathabathayo, nayiphi i-allergy ye-egg okanye ye-soya (i-emulsion iquke ezi), iingxaki ze-lipid, nayo nayiphi imbali ye-propofol infusion syndrome kumalungu osapho asondeleyo.",
      "I-propofol yi-emulsion ye-lipid — i-asepsis enzima ngexesha lokulungiselela nokunikezwa ibalulekile ukuthintela ukusulela; iqela le-anaesthetic lilandela iiprotokolo ezithile zokuphatha kumjovo ngamnye.",
      "Buza iqela lakho le-anaesthetic ukuba licacise isicwangciso sokuphumzwa nexesha elikulindelekileyo lokubuyisela — ukwazi okuthi kululindele kunceda wena nosapho lwakho ukuba nililungiselele ixesha emva kwenkqubo.",
      "Ukuba unee-allergy ezaziwayo ze-egg okanye ze-soya, qinisekisa ukuba oku kuqoshiwe ngokucacileyo kwaye kuxelwa kwiqela le-anaesthetic ngaphambi kwankqubo nayiphi na — sukucinga ukuba iqela seliyazi.",
    ],
  ),

  "mol-suxamethonium": five(
    [
      "Suxamethonium (succinylcholine) is a depolarising neuromuscular blocking agent used exclusively in theatre and emergency airway settings for rapid-sequence intubation — it is administered and monitored by an anaesthetic or emergency team.",
      "This medicine is never for self-administration. Materia does not invent an intubation dose, fasciculation management protocol, or malignant hyperthermia treatment protocol — all decisions belong with the anaesthetist and theatre team.",
      "A personal or family history of malignant hyperthermia (MH), pseudocholinesterase deficiency, or prolonged apnoea after anaesthesia are critically important — inform the anaesthetic team before any procedure so that safer alternatives can be planned.",
      "Malignant hyperthermia is a rare but life-threatening reaction to certain anaesthetic agents — if triggered, it requires immediate recognition and specific treatment managed entirely by the theatre team.",
      "Ask your anaesthetist whether your personal or family history changes the airway management plan — you have the right to understand the risks and alternatives discussed for your procedure.",
      "If you have a personal or family history of unexpected prolonged muscle weakness, difficulty waking after anaesthesia, or unexplained fever during surgery — ensure this is documented and communicated before every anaesthetic.",
    ],
    [
      "I-suxamethonium (succinylcholine) iyisiduli se-depolarising neuromuscular blocking sasetshenziswa ngokuphelele ezikhungweni ze-theatre nezokusizakala ngomlomo ukuqala ngokushesha — inikezwa futhi ihlolwa yithimba le-anaesthetic noma lezokusizakala.",
      "Lo muthi awusetshenziswa yena. I-Materia ayiqambi umthamo wokuqala kwegula, uhlelo lokuphatha ukujikijika, noma uhlelo lokuphatha ukushisa ngokuyingozi — zonke izinqumo zihambisana ne-anaesthetist nethimba le-theatre.",
      "Umlando womuntu siqu noma womndeni we-malignant hyperthermia (MH), ukubuthaka kwe-pseudocholinesterase, noma ukuphefumula okudingeka isikhathi eside ngemva kwe-anaesthesia kubalulekile kakhulu — tshela ithimba le-anaesthetic ngaphambi kwanoma yiluphi uhlobo ukuze ezinye izindlela eziphephayo zikwazi ukuhlelelwa.",
      "I-malignant hyperthermia yinkinga eyinkabazane kodwa engozi ekupheleni kwempilo impendulo kwezinye izinto ze-anaesthetic — uma inqanyuliwe, idinga ukubonwa ngokushesha nokuphathwa ngokugcwele ngokuqonde kuthimba le-theatre.",
      "Buza umhlengikazi we-anaesthetic ukuthi umlando wakho womuntu siqu noma womndeni ushintsha njani uhlelo lokuphathwa kwe-airway — unelungelo lokwazi izingozi nezinye izindlela ezixoxiswayo ngenhloso yakho.",
      "Uma unalo umlando womuntu siqu noma womndeni wokubuthaka kwamasimu okungalindelekile okundele, nobunzima bokuvuka ngemva kwe-anaesthesia, noma umkhuhlane ongachazwa ngesikhathi sokuhlinzwa — qinisekisa ukuthi lokhu kubhaliwe futhi kuxoxiselwa ngaphambi kwanoma yiluphi i-anaesthetic.",
    ],
    [
      "Suksametoonium (suksinielcholien) is 'n depolariserende neuromuskulêre blokkeringsmiddel wat uitsluitlik in teater- en noodlugwegomgewings vir vinnige-reeksintubasie gebruik word — dit word deur 'n anestesiese of noodspan toegedien en gemonitor.",
      "Hierdie medisyne is nooit vir selftoediening nie. Materia versin nie 'n intubasiedosis, fasikkulasiebestuursprotokol, of malignehandhawermia-behandelingsprotokol nie — alle besluite behoort by die anestesist en teaterspanne.",
      "'n Persoonlike of familiegeskiedenis van malignehandhawermia (MH), pseudocholinesterase-tekortkoming, of verlengde apnee ná narkose is krities belangrik — sê dit vir die anestesispan voor enige prosedure sodat veiliger alternatiewe beplan kan word.",
      "Malignehandhawermia is 'n seldsame maar lewensbedreigende reaksie op sekere verdowingsmiddels — indien uitgelok, vereis dit onmiddellike herkenning en spesifieke behandeling wat geheel en al deur die teaterspanne bestuur word.",
      "Vra jou anestesist of jou persoonlike of familiegeskiedenis die lugwegbestuursplan verander — jy het die reg om die risiko's en alternatiewe wat vir jou prosedure bespreek word te verstaan.",
      "As jy 'n persoonlike of familiegeskiedenis het van onverwagte verlengde spierswakheid, moeite om ná narkose wakker te word, of onverklaarde koors tydens chirurgie — verseker dat dit gedokumenteer en gekommunikeer word voor elke narkose.",
    ],
    [
      "Suxamethonium (succinylcholine) ke sedimelo sa neuromuscular blocking sa depolarising se sebelisoang ka ho feletseng maemong a theatre le a tšohanyetso a tsela ea moea bakeng sa intubation ea potlako-letoto — e noa le ho hlokomeloa ke sehlopha sa anaesthetic kapa tšohanyetso.",
      "Moriana ona ha o ka noa o itokisetsa. Materia ha e iqape tekanyo ea intubation, protokolo ea ho laola fasciculation, kapa protokolo ea kalafo ea malignant hyperthermia — liphetoho tsohle li le teng le anaesthetist le sehlopha sa theatre.",
      "Histori ea motho ka noho kapa ea lelapa ea malignant hyperthermia (MH), tlhaselo ea pseudocholinesterase, kapa apnoea e telele ka mor'a anaesthesia ke bohlokoa ka ho fetisisa — bolella sehlopha sa anaesthetic pele ho mohato ofe kapa ofe hore liphetoho tse bolokehang li kgone ho rera.",
      "Malignant hyperthermia ke karabelo e seng tloaelo empa e senya bophelo ho litlhare tse ling tsa anaesthetic — haeba e qaloa, e hloka ho lemoha kapele le kalafo e khetheho e laoloa ka ho feletseng ke sehlopha sa theatre.",
      "Botsa anaesthetist ea hau hore na histori ea hau ea motho ka noho kapa ea lelapa e fetola moralo oa ho laola tsela ea moea — u na le tokelo ea ho utloisisa lintlha tsa kotsi le liphetoho tse buuoang bakeng sa mohato oa hau.",
      "Haeba u na le histori ea motho ka noho kapa ea lelapa ea bokoa ba maikutlo bo telele bo sa letetsoeng, mathata a ho vuka ka mor'a anaesthesia, kapa feberu e sa hlalosehang nakong ea surgery — netefatsa hore sena se qoiloe le ho hlalosoa pele ho anaesthetic efe kapa efe.",
    ],
    [
      "I-suxamethonium (succinylcholine) yiagente ye-depolarising neuromuscular blocking esetshenziswa ngokukhuselekileyo kwiindawo ze-theatre nezingxamiseko zendlela yomoya ukuqalisa ngokukhawuleza — inikezwa kwaye iqhekeza yiqela le-anaesthetic okanye lezingxamiseko.",
      "Esi yeza asizinikwa ngokwakho. I-Materia ayiyiqiqi idosi ye-intubation, iqhinga lokuphatha i-fasciculation, okanye iqhinga lokonyango lwe-malignant hyperthermia — zonke izigqibo zihamba ne-anaesthetist neqela le-theatre.",
      "Imbali yomntu ngokwakhe okanye yosapho ye-malignant hyperthermia (MH), ukunciphisa kwe-pseudocholinesterase, okanye i-apnoea ende emva kwe-anaesthesia ibaluleke kakhulu — xelela iqela le-anaesthetic ngaphambi kwankqubo nayiphi na ukuze izinye izinto eziphephileyo zikwazi ukulungiselwa.",
      "I-malignant hyperthermia yimpendulo engaqhelekanga kodwa eyingozi kubomi impendulo kwamanye amayeza e-anaesthetic — ukuba ivuswa, ifuna ukuqaphelwa ngoko nangoko nonyango oluthile oluphethwe ngokupheleleyo yiqela le-theatre.",
      "Buza i-anaesthetist yakho ukuba imbali yakho yomntu ngokwakhe okanye yosapho iguqula isicwangciso sokuphatha indlela yomoya — unamalungelo okuqonda iingozi nezinye izinto ezixoxwa enkqubweni yakho.",
      "Ukuba uneembali zomntu ngokwakhe okanye zosapho zokubuthaka kwamasimu okungalindelekileyo okude, ubunzima bokuvuka emva kwe-anaesthesia, okanye umkhuhlane ongachaziyo ngexesha lohlobo — qinisekisa ukuba oku kuqoshiwe kwaye kuxelwa ngaphambi kwanye ne-anaesthetic nganye.",
    ],
  ),
};
