export type CounsellingLang = "en" | "zu" | "af" | "st" | "xh";

export const COUNSELLING_LANGS: Array<{ code: CounsellingLang; label: string }> = [
  { code: "en", label: "English" },
  { code: "zu", label: "isiZulu" },
  { code: "af", label: "Afrikaans" },
  { code: "st", label: "Sesotho" },
  { code: "xh", label: "isiXhosa" },
];

export interface CounsellingScript {
  lang: CounsellingLang;
  lines: string[];
  sourceNote: string;
  publishState: "published" | "draft";
}

/**
 * Multilingual counselling — original Materia scripts only.
 * Draft languages must not be shown as verified clinical translation until founder review.
 */
const SCRIPTS: Record<string, Partial<Record<CounsellingLang, CounsellingScript>>> = {
  "mol-amox": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antibiotic exactly as directed on your label.",
        "Tell your pharmacist if you have ever had a penicillin or beta-lactam allergy.",
        "Finish the course unless your clinician tells you to stop.",
        "If you get a rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic njengoba kubhalwe kulebula yakho.",
        "Tshela umkhiqizi wamaphilisi uma wake waba ne-allergy ye-penicillin.",
        "Qeda ikhosi ngaphandle uma udokotela noma umkhiqizi ethi uma.",
        "Uma uqala ukuba nesikhumba esibomvu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antibiotika soos op jou etiket aangedui.",
        "Sê vir jou apteker as jy al ooit ’n penisillien-allergie gehad het.",
        "Voltooi die kuur tensy jou klinikus sê jy moet stop.",
        "As jy ’n uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antibiotic ena hantle kamoo e hlalositsoeng holabel ea hau.",
        "Bolella rakhemisi haeba u kile ua ba le allergy ea penicillin kapa beta-lactam.",
        "Qetella thero ntle le haeba ngaka ea hau e re u emise.",
        "Haeba u fumana lekhopho, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile yakho.",
        "Xelela usokhemisti ukuba wakhe waba ne-allergy ye-penicillin okanye ye-beta-lactam.",
        "Gqiba ikhosi ngaphandle kokuba ugqirha wakho athi uyeke.",
        "Ukuba ufumana irashi, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-doxy": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antibiotic exactly as directed on your labelled product.",
        "Dairy, antacids, and mineral supplements can reduce absorption — ask your pharmacist how to separate them from this medicine; Materia does not invent a spacing schedule.",
        "This class may increase sun sensitivity — use sun protection and check the label.",
        "If you get a severe rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic njengoba kubhalwe kumkhiqizo onelebula.",
        "Ubisi, ama-antacid, kanye nezithako zamaminerali kunganciphisa ukumunca — buza umkhiqizi wamaphilisi ukuthi uzihlukanise kanjani; i-Materia ayiqambi isikhathi.",
        "Lolu hlobo lungakhulisa ukuzwela ilanga — vikela isikhumba futhi uhlole ilebula.",
        "Uma uthola isikhumba esibi kakhulu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antibiotika soos op die geëtiketteerde produk aangedui.",
        "Suiwel, antasuurs en mineraalaanvullings kan absorpsie verminder — vra jou apteker hoe om dit te skei; Materia versin nie ’n tydskedule nie.",
        "Hierdie klas kan sonsensitiwiteit verhoog — beskerm jou vel en kontroleer die etiket.",
        "As jy ’n ernstige uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antibiotic ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Lebese, li-antacid le liminerale li ka fokotsa absorption — botsa rakhemisi hore u li arole ka mokhoa ofe; Materia ha e iqape nako.",
        "Sehlopha sena se ka eketsa ho utloa letsatsi haholo — sireletsa letlalo ’me u shebe leibole.",
        "Haeba u fumana lekhopho le tebileng, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Ubisi, ii-antacids kunye neziminerals zinokunciphisa ukufunxwa — buza usokhemisti indlela yokuzahlula; i-Materia ayiyiqiqi ixesha.",
        "Olu didi lunganyusa ukuziva ilanga — khuselani ulusu kwaye niqwalasele ileyibhile.",
        "Ukuba ufumana irashi eqatha, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-metro": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antimicrobial exactly as directed on your labelled product.",
        "Alcohol is commonly counselled against during and shortly after this course — confirm the labelled product and ask your pharmacist; Materia does not invent a duration.",
        "Metallic taste or mild stomach upset can occur — check the label and speak to your pharmacist if it worries you.",
        "If you get a severe rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antimicrobial njengoba kubhalwe kumkhiqizo onelebula.",
        "Utshwala kuvame ukwelulekwa ngakho ngesikhathi saleli khosi nangemva kwaso — qinisekisa ilebula futhi ubuze umkhiqizi; i-Materia ayiqambi isikhathi.",
        "Ukunambitha okufana nensimbi noma isisu esithambile kungenzeka — hlole ilebula futhi ukhulume nomkhiqizi uma ukhathazekile.",
        "Uma uthola isikhumba esibi kakhulu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antimikrobiese middel soos op die geëtiketteerde produk aangedui.",
        "Alkohol word dikwels afgeraai tydens en kort na hierdie kuur — bevestig die etiket en vra jou apteker; Materia versin nie ’n duur nie.",
        "’n Metaalsmaak of ligte maagongemak kan voorkom — kontroleer die etiket en praat met jou apteker as jy bekommerd is.",
        "As jy ’n ernstige uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antimicrobial ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Joala hangata ho eletsoa hore u e qobe nakong ea thero ena le haufinyane ka mor’a eona — netefatsa leibole ’me u botse rakhemisi; Materia ha e iqape nako.",
        "Tatso ea tšepe kapa ho opeloa ke mpeng ho ka etsahala — sheba leibole ’me u bue le rakhemisi haeba u tšoenyehile.",
        "Haeba u fumana lekhopho le tebileng, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antimicrobial ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Utywala kudla ngokucebiswa ukuba lungasetyenziswa ngexesha lekhosi nasekufutshane emva kwayo —qinisekisa ileyibhile kwaye ubuze usokhemisti; i-Materia ayiyiqiqi ixesha.",
        "Incasa yentsimbi okanye ukuqaqanjelwa kwesisu okuncinci kunokwenzeka —qwalasela ileyibhile kwaye uthethe nosokhemisti ukuba uyakhathazeka.",
        "Ukuba ufumana irashi eqatha, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-amoxclav": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this combination antibiotic exactly as directed on your labelled product.",
        "Tell your pharmacist if you have ever had a penicillin or beta-lactam allergy.",
        "Food may help if stomach upset occurs — still follow the labelled product; Materia does not invent a meal schedule.",
        "If you get a rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic ehlanganisiwe njengoba kubhalwe kumkhiqizo onelebula.",
        "Tshela umkhiqizi wamaphilisi uma wake waba ne-allergy ye-penicillin noma ye-beta-lactam.",
        "Ukudla kungasiza uma isisu sikhathaza — landela namanje umkhiqizo onelebula; i-Materia ayiqambi uhlelo lokudla.",
        "Uma uqala ukuba nesikhumba esibomvu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie kombinasie-antibiotika soos op die geëtiketteerde produk aangedui.",
        "Sê vir jou apteker as jy al ooit ’n penisillien- of beta-laktamienallergie gehad het.",
        "Kos kan help as jy maagongemak kry — volg steeds die geëtiketteerde produk; Materia versin nie ’n maaltydskedule nie.",
        "As jy ’n uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antibiotic ena e kopantsoeng hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Bolella rakhemisi haeba u kile ua ba le allergy ea penicillin kapa beta-lactam.",
        "Lijo li ka thusa haeba mpeng e o hloba — ntse u latele sehlahiswa se nang le leibole; Materia ha e iqape kemiso ea lijo.",
        "Haeba u fumana lekhopho, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic edibeneyo ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Xelela usokhemisti ukuba wakhe waba ne-allergy ye-penicillin okanye ye-beta-lactam.",
        "Ukutya kunokunceda ukuba isisu sikuxhalabisa — landela umkhiqizo oneleyibhile; i-Materia ayiyiqiqi ishedyuli yokutya.",
        "Ukuba ufumana irashi, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-cipro": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antibiotic exactly as directed on your labelled product.",
        "Dairy, antacids, and mineral supplements may affect absorption — ask your pharmacist how to separate them; Materia does not invent a spacing schedule.",
        "Fluoroquinolone counselling commonly includes sun protection and reporting unusual tendon pain — confirm against the labelled product.",
        "If you get a severe rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic njengoba kubhalwe kumkhiqizo onelebula.",
        "Ubisi, ama-antacid, kanye nezithako zamaminerali kungathinta ukumunca — buza umkhiqizi ukuthi uzihlukanise kanjani; i-Materia ayiqambi isikhathi.",
        "Ukwelulekwa kwe-fluoroquinolone kuvame ukufaka ukuvikela ilanga nokubika ubuhlungu bethendon obungajwayelekile — qinisekisa kumkhiqizo onelebula.",
        "Uma uthola isikhumba esibi kakhulu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antibiotika soos op die geëtiketteerde produk aangedui.",
        "Suiwel, antasuurs en mineraalaanvullings kan absorpsie beïnvloed — vra jou apteker hoe om dit te skei; Materia versin nie ’n tydskedule nie.",
        "Fluorokinoloon-berading sluit dikwels sonbeskerming en die aanmelding van ongewone peespyn in — bevestig teen die geëtiketteerde produk.",
        "As jy ’n ernstige uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antibiotic ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Lebese, li-antacid le liminerale li ka ama absorption — botsa rakhemisi hore u li arole joang; Materia ha e iqape nako.",
        "Keletso ea fluoroquinolone hangata e kenyelletsa tšireletso ea letsatsi le ho tlaleha bohloko ba tendon bo sa tloaelehang — netefatsa holabel.",
        "Haeba u fumana lekhopho le tebileng, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Ubisi, ii-antacids kunye neziminerals zinokuchaphazela ukufunxwa — buza usokhemisti indlela yokuzahlula; i-Materia ayiyiqiqi ixesha.",
        "Iingcebiso ze-fluoroquinolone zihlala zibandakanya ukukhusela ilanga nokuxela iintlungu ze-tendon ezingaqhelekanga — qinisekisa kwileyibhile.",
        "Ukuba ufumana irashi eqatha, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-azithro": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this antibiotic exactly as directed on your labelled product.",
        "Tell your pharmacist about other medicines you take — macrolides can interact with some products; Materia does not invent interaction lists or doses.",
        "Finish the course unless your clinician tells you to stop.",
        "If you get a severe rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic njengoba kubhalwe kumkhiqizo onelebula.",
        "Tshela umkhiqizi ngemanye imithi oyisebenzisayo — ama-macrolide angase ahlangane neminye imikhiqizo; i-Materia ayiqambi uhlu noma imithamo.",
        "Qeda ikhosi ngaphandle uma udokotela noma umkhiqizi ethi uma.",
        "Uma uthola isikhumba esibi kakhulu, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antibiotika soos op die geëtiketteerde produk aangedui.",
        "Sê vir jou apteker van ander medisyne wat jy neem — makroliede kan met sommige produkte wisselwerk; Materia versin nie wisselwerkingslyste of dosisse nie.",
        "Voltooi die kuur tensy jou klinikus sê jy moet stop.",
        "As jy ’n ernstige uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa antibiotic ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Bolella rakhemisi ka meriana e meng eo u e sebelisang — li-macrolide li ka kopana le lihlahiswa tse ling; Materia ha e iqape lethathamo kapa litekanyo.",
        "Qetella thero ntle le haeba ngaka ea hau e re u emise.",
        "Haeba u fumana lekhopho le tebileng, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa le antibiotic ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Xelela usokhemisti ngamanye amayeza owasebenzisayo — ii-macrolides zinokudibana nezinye iimveliso; i-Materia ayiyiqiqi uluhlu okanye iidosi.",
        "Gqiba ikhosi ngaphandle kokuba ugqirha wakho athi uyeke.",
        "Ukuba ufumana irashi eqatha, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-ibuprofen": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this pain/inflammation medicine exactly as directed on your labelled product.",
        "NSAID counselling often includes taking with food if stomach upset occurs — still confirm against the labelled product.",
        "Tell your pharmacist about ulcer, asthma, bleeding history, or other pain medicines you use; Materia does not invent a dose or combination rule.",
        "If you get a severe rash, swelling, black stools, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa lo muthi wobuhlungu/ukuvuvuka njengoba kubhalwe kumkhiqizo onelebula.",
        "Ukwelulekwa kwe-NSAID kuvame ukufaka ukudla uma isisu sikuxhalabisa — qinisekisa kumkhiqizo onelebula.",
        "Tshela umkhiqizi ngesilonda sesisu, i-asthma, ukopha, noma eminye imithi yobuhlungu; i-Materia ayiqambi umthamo noma umthetho wokuhlanganisa.",
        "Uma uthola isikhumba esibi kakhulu, ukuvuvuka, indle emnyama, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie pyn-/ontstekingsmiddel soos op die geëtiketteerde produk aangedui.",
        "NSAID-berading sluit dikwels in om met kos te neem as maagongemak voorkom — bevestig steeds teen die geëtiketteerde produk.",
        "Sê vir jou apteker van maagsweer-, asma- of bloedinggeskiedenis, of ander pynmiddels; Materia versin nie ’n dosis of kombinasireël nie.",
        "As jy ’n ernstige uitslag, swelling, swart stoelgang of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa moriana ona oa bohloko/ho ruruha hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Keletso ea NSAID hangata e kenyelletsa ho ja haeba mpa e u tšoenya — netefatsa holabel ea sehlahiswa.",
        "Bolella rakhemisi ka leqeba la mpa, asthma, ho tsoa mali, kapa meriana e meng ea bohloko; Materia ha e iqape tekanyo kapa molao oa ho kopanya.",
        "Haeba u fumana lekhopho le tebileng, ho ruruha, bolusepa bo botšo, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa eli yeza leentlungu/ukudumba ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Iingcebiso ze-NSAID zihlala zibandakanya ukutya ukuba isisu sikuxhalabisa — qinisekisa kwileyibhile yemveliso.",
        "Xelela usokhemisti ngesilonda sesisu, i-asthma, ukopha, okanye amanye amayeza eentlungu; i-Materia ayiyiqiqi idosi okanye umgaqo wokudibanisa.",
        "Ukuba ufumana irashi eqatha, ukudumba, indolwana emnyama, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-levothyroxine": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this thyroid medicine exactly as directed on your labelled product.",
        "Common teaching: take consistently on an empty stomach; iron, calcium, and some foods reduce absorption — ask your pharmacist how to separate them; Materia does not invent a spacing schedule or mcg dose.",
        "Keep the same brand/generic where possible and tell your clinician before switching products.",
        "If you get chest pain, severe palpitations, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa lo muthi wethyroid njengoba kubhalwe kumkhiqizo onelebula.",
        "Ukufundisa okujwayelekile: sebenzisa ngokungaguquki ngesisu esingenalutho; i-iron, i-calcium, nokudla okuthile kunciphisa ukumunca — buza umkhiqizi ukuthi uzihlukanise kanjani; i-Materia ayiqambi isikhathi noma umthamo we-mcg.",
        "Gcina uhlobo olufanayo uma kungenzeka futhi tshela udokotela ngaphambi kokushintsha imikhiqizo.",
        "Uma uthola ubuhlungu besifuba, ukushaya kwenhliziyo okubi, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie skildkliermedisyne soos op die geëtiketteerde produk aangedui.",
        "Algemene onderrig: neem konsekwent op ’n leë maag; yster, kalsium en sommige kosse verminder absorpsie — vra jou apteker hoe om dit te skei; Materia versin nie ’n tydskedule of mcg-dosis nie.",
        "Hou dieselfde handelsmerk/generiese produk waar moontlik en sê vir jou klinikus voor jy produkte wissel.",
        "As jy borspyn, ernstige hartkloppings of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa moriana ona oa thyroid hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Thuto e tloaelehileng: e nke ka mokhoa o ts'oanang ka mpa e se nang letho; tšepe, calcium le lijo tse ling li fokotsa absorption — botsa rakhemisi hore u li arole joang; Materia ha e iqape nako kapa tekanyo ea mcg.",
        "Boloka mofuta o tšoanang ha ho khoneha ’me bolelle ngaka pele u fetola lihlahiswa.",
        "Haeba u fumana bohloko ba sefuba, ho otla ha pelo ho tebileng, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa eli yeza le-thyroid ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Ukufundisa okuqhelekileyo: sebenzisa ngokungaguquki ngesisu esingenanto; i-iron, i-calcium, kunye nokutya okuthile kunciphisa ukufunxwa — buza usokhemisti indlela yokuzahlula; i-Materia ayiyiqiqi ixesha okanye idosi ye-mcg.",
        "Gcina uhlobo olufanayo xa kunokwenzeka kwaye xelela ugqirha phambi kokutshintsha iimveliso.",
        "Ukuba ufumana iintlungu zesifuba, ukubetha kwentliziyo okuqatha, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-warfarin": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this anticoagulant exactly as directed on your labelled product and care plan.",
        "Keep vitamin K–rich foods reasonably consistent week to week; sudden diet swings can affect anticoagulation teaching discussions — INR targets stay clinician-directed. Materia does not invent an INR or dose.",
        "Tell your pharmacist before starting new medicines, herbals, or painkillers — many products interact with warfarin.",
        "If you get unusual bleeding, black stools, severe headache, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa lo muthi ovimbela ukopha njengoba kubhalwe kumkhiqizo onelebula nasezinhlelweni zokwelashwa.",
        "Gcina ukudla okune-vitamin K ngokulinganayo isonto ngesonto; ukushintsha okungazelelwe kungathinta izingxoxo zokufundisa — ama-INR asala kudokotela. I-Materia ayiqambi i-INR noma umthamo.",
        "Tshela umkhiqizi ngaphambi kokuqala imithi emisha, ama-herbals, noma imithi yobuhlungu — imikhiqizo eminingi ihlangana ne-warfarin.",
        "Uma uthola ukopha okungajwayelekile, indle emnyama, ikhanda elibuhlungu kakhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie antikoagulant soos op die geëtiketteerde produk en jou sorgplan aangedui.",
        "Hou vitamien K-ryke kos redelik konsekwent week tot week; skielike dieetskommelings kan antikoagulasie-onderrig beïnvloed — INR-teikens bly klinikus-gerig. Materia versin nie ’n INR of dosis nie.",
        "Sê vir jou apteker voordat jy nuwe medisyne, kruie of pynstillers begin — baie produkte wisselwerk met warfarin.",
        "As jy ongewone bloeding, swart stoelgang, ernstige hoofpyn of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa anticoagulant ena hantle kamoo e hlalositsoeng holabel ea sehlahiswa le moralo oa tlhokomelo.",
        "Boloka lijo tse nang le vitamin K ka mokhoa o ts'oanang beke le beke; liphetoho tsa tšohanyetso li ka ama lipuisano tsa thuto — li-INR li sala tsa ngaka. Materia ha e iqape INR kapa tekanyo.",
        "Bolella rakhemisi pele u qala meriana e mecha, li-herbals, kapa meriana ea bohloko — lihlahiswa tse ngata li kopana le warfarin.",
        "Haeba u fumana ho tsoa mali ho sa tloaelehang, bolusepa bo botšo, hlooho e bohloko haholo, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa eli yeza lokuthintela ukopha ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso nakwicwangciso lokhathalelo.",
        "Gcina ukutya okune-vitamin K ngokungaguquki iveki nganye; utshintsho olukhawulezayo lunokuchaphazela iingxoxo zokufundisa — ii-INR zihlala zilawulwa gugqirha. I-Materia ayiyiqiqi i-INR okanye idosi.",
        "Xelela usokhemisti phambi kokuqala amayeza amatsha, ii-herbals, okanye amayeza eentlungu — iimveliso ezininzi zidibana ne-warfarin.",
        "Ukuba ufumana ukopha okungaqhelekanga, indolwana emnyama, intloko ebuhlungu kakhulu, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-paracetamol": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this pain/fever medicine exactly as directed on your labelled product.",
        "Check other cold, flu, and pain products for paracetamol (acetaminophen) so you do not double up — Materia does not invent a daily maximum.",
        "Tell your pharmacist about liver disease or heavy alcohol use before using this medicine.",
        "If too much may have been taken, or you get severe abdominal pain, vomiting, or yellowing of the skin/eyes — seek emergency care immediately (do not wait for symptoms).",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa lo muthi wobuhlungu/umkhuhlane njengoba kubhalwe kumkhiqizo onelebula.",
        "Hlola eminye imikhiqizo yomkhuhlane nobuhlungu ukuthi ine-paracetamol yini ukuze ungaphindi — i-Materia ayiqambi umkhawulo wansuku zonke.",
        "Tshela umkhiqizi ngesifo sesibindi noma ukuphuza kakhulu ngaphambi kokusebenzisa lo muthi.",
        "Uma kungenzeka uthathe okuningi kakhulu, noma uthola ubuhlungu besisu obukhulu, ukuhlanza, noma ukuphaphatheka kwesikhumba/amehlo — funa usizo oluphuthumayo ngokushesha (ungalindi izimpawu).",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie pyn-/koorsmiddel soos op die geëtiketteerde produk aangedui.",
        "Kontroleer ander verkoue-, griep- en pynmiddels vir parasetamol sodat jy nie verdubbel nie — Materia versin nie ’n daaglikse maksimum nie.",
        "Sê vir jou apteker van lewersiekte of swaar alkoholgebruik voordat jy hierdie middel gebruik.",
        "As te veel moontlik geneem is, of jy ernstige buikpyn, braking of vergeling van vel/oë kry — soek onmiddellik noodhulp (moenie vir simptome wag nie).",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa moriana ona oa bohloko/feberu hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Hlahloba lihlahiswa tse ling tsa sefuba, flu le bohloko bakeng sa paracetamol hore u se ke ua pheta — Materia ha e iqape moeli oa letsatsi le letsatsi.",
        "Bolella rakhemisi ka boloetse ba sebete kapa ho noa haholo pele u sebelisa moriana ona.",
        "Haeba ho ka etsahala hore u nkile ho hongata haholo, kapa u fumana bohloko ba mpa bo tebileng, ho hlatsa, kapa ho mosehla ha letlalo/mahlo — batla thuso ea tšohanyetso hang-hang (u se ke ua emela matšoao).",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa eli yeza leentlungu/umkhuhlane ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Jonga ezinye iimveliso zomkhuhlane neentlungu ukuba zine-paracetamol na ukuze ungaphindi — i-Materia ayiyiqiqi umda wemihla ngemihla.",
        "Xelela usokhemisti ngesifo sesibindi okanye ukusela kakhulu phambi kokusebenzisa eli yeza.",
        "Ukuba kusenokwenzeka uthathe okuninzi kakhulu, okanye ufumana iintlungu zesisu eziqatha, ukugabha, okanye ukutyheliwa kwesikhumba/amehlo — funa uncedo olungxamisekileyo ngokukhawuleza (ungalindi iimpawu).",
      ],
    },
  },
  "mol-metformin": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this diabetes medicine exactly as directed on your labelled product.",
        "Metformin counselling often includes taking with food if stomach upset occurs — still confirm against the labelled product. Materia does not invent a dose or meal schedule.",
        "Tell your pharmacist or clinician about kidney problems, heavy alcohol use, or severe dehydration/illness before and during use.",
        "If you get unusual muscle pain, severe vomiting, trouble breathing, or extreme tiredness — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa lo muthi wesifo sikashukela njengoba kubhalwe kumkhiqizo onelebula.",
        "Ukwelulekwa kwe-metformin kuvame ukufaka ukudla uma isisu sikuxhalabisa — qinisekisa kumkhiqizo onelebula. I-Materia ayiqambi umthamo noma ishedyuli yokudla.",
        "Tshela umkhiqizi noma udokotela ngezinkinga zezinso, ukuphuza kakhulu, noma ukoma/ukugula okukhulu ngaphambi nangesikhathi sokusebenzisa.",
        "Uma uthola ubuhlungu bemisipha obungajwayelekile, ukuhlanza okukhulu, ukuphefumula kanzima, noma ukukhathala okwedlulele — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie diabetesmedisyne soos op die geëtiketteerde produk aangedui.",
        "Metformin-berading sluit dikwels in om met kos te neem as maagongemak voorkom — bevestig steeds teen die geëtiketteerde produk. Materia versin nie ’n dosis of maaltydskedule nie.",
        "Sê vir jou apteker of klinikus van nierprobleme, swaar alkoholgebruik, of ernstige dehidrasie/siekte voor en tydens gebruik.",
        "As jy ongewone spierpyn, ernstige braking, asemhalingsprobleme of uiterste moegheid kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa moriana ona oa diabetes hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Keletso ea metformin hangata e kenyelletsa ho ja haeba mpa e u tšoenya — netefatsa holabel. Materia ha e iqape tekanyo kapa kemiso ea lijo.",
        "Bolella rakhemisi kapa ngaka ka mathata a liphio, ho noa haholo, kapa ho oma/ho kula ho tebileng pele le nakong ea tšebeliso.",
        "Haeba u fumana bohloko ba mesifa bo sa tloaelehang, ho hlatsa ho tebileng, ho hema thata, kapa mokhathala o feteletseng — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa eli yeza lesifo seswekile ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Iingcebiso ze-metformin zihlala zibandakanya ukutya ukuba isisu sikuxhalabisa — qinisekisa kwileyibhile. I-Materia ayiyiqiqi idosi okanye ishedyuli yokutya.",
        "Xelela usokhemisti okanye ugqirha ngeengxaki zezintso, ukusela kakhulu, okanye ukoma/ukugula okuqatha phambi naxa usebenzisa.",
        "Ukuba ufumana iintlungu zemisipha ezingaqhelekanga, ukugabha okuqatha, uxinzelelo lokuphefumla, okanye ukudinwa okugqithisileyo — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-enalapril": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this blood-pressure medicine exactly as directed on your labelled product.",
        "ACE-inhibitor counselling commonly includes telling your pharmacist if you are pregnant, planning pregnancy, or breastfeeding — confirm against the labelled product. Materia does not invent a dose or blood-pressure target.",
        "Report a new persistent dry cough, dizziness on standing, or kidney concerns to your pharmacist or clinician.",
        "If you get swelling of the face, lips, tongue, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa lo muthi womfutho wegazi njengoba kubhalwe kumkhiqizo onelebula.",
        "Ukwelulekwa kwe-ACE-inhibitor kuvame ukufaka ukutshela umkhiqizi uma ukhulelwe, uhlela ukukhulelwa, noma uncelisa — qinisekisa kumkhiqizo onelebula. I-Materia ayiqambi umthamo noma umgomo womfutho wegazi.",
        "Bika ukukhwehlela okomile okungapheli, isiyezi uma umi, noma izinkinga zezinso kumkhiqizi noma udokotela.",
        "Uma uthola ukuvuvuka kobuso, izindebe, ulimi, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie bloeddrukmiddel soos op die geëtiketteerde produk aangedui.",
        "ASE-inhibeerder-berading sluit dikwels in om jou apteker te sê as jy swanger is, beplan om swanger te word, of borsvoed — bevestig teen die geëtiketteerde produk. Materia versin nie ’n dosis of bloeddrukteiken nie.",
        "Meld ’n nuwe aanhoudende droë hoes, duiseligheid wanneer jy opstaan, of nierkommer by jou apteker of klinikus.",
        "As jy swelling van die gesig, lippe, tong of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa moriana ona oa khatello ea mali hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Keletso ea ACE-inhibitor hangata e kenyelletsa ho bolella rakhemisi haeba u imme, u rera ho ima, kapa u anyesa — netefatsa holabel. Materia ha e iqape tekanyo kapa sepheo sa khatello ea mali.",
        "Tlaleha khohlela e omehileng e sa feleng, ho tsekela ha u ema, kapa mathata a liphio ho rakhemisi kapa ngaka.",
        "Haeba u fumana ho ruruha ha sefahleho, melomo, leleme, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa eli yeza loxinzelelo lwegazi ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Iingcebiso ze-ACE-inhibitor zihlala zibandakanya ukuxelela usokhemisti ukuba ukhulelweyo, uceba ukukhulelwa, okanye uncancisayo — qinisekisa kwileyibhile. I-Materia ayiyiqiqi idosi okanye usukelo loxinzelelo lwegazi.",
        "Xela ukukhohlela okomileyo okungapheliyo, isiyezi xa umile, okanye iinkxalabo zezintso kusokhemisti okanye ugqirha.",
        "Ukuba ufumana ukudumba kobuso, imilebe, ulwimi, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-amlodipine": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this blood-pressure medicine exactly as directed on your labelled product.",
        "Calcium-channel blocker counselling commonly includes ankle swelling and dizziness — tell your pharmacist if these bother you. Materia does not invent a dose or blood-pressure target.",
        "Grapefruit products may affect some calcium-channel blockers — confirm against the labelled product; Materia does not invent a food list.",
        "If you get severe dizziness, chest pain that is new or worse, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa lo muthi womfutho wegazi njengoba kubhalwe kumkhiqizo onelebula.",
        "Ukwelulekwa kwe-calcium-channel blocker kuvame ukufaka ukuvuvuka kwamaqakala nesiyezi — tshela umkhiqizi uma kukuhlupha. I-Materia ayiqambi umthamo noma umgomo womfutho wegazi.",
        "Imikhiqizo ye-grapefruit ingase ithinte amanye ama-calcium-channel blockers — qinisekisa kumkhiqizo onelebula; i-Materia ayiqambi uhlu lokudla.",
        "Uma uthola isiyezi esikhulu, ubuhlungu besifuba obusha noma obubi kakhulu, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie bloeddrukmiddel soos op die geëtiketteerde produk aangedui.",
        "Kalsiumkanaalblokker-berading sluit dikwels enkelswelling en duiseligheid in — sê vir jou apteker as dit jou pla. Materia versin nie ’n dosis of bloeddrukteiken nie.",
        "Pampelmousprodukte kan sommige kalsiumkanaalblokkers beïnvloed — bevestig teen die geëtiketteerde produk; Materia versin nie ’n koslys nie.",
        "As jy ernstige duiseligheid, nuwe of erger borspyn, of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa moriana ona oa khatello ea mali hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Keletso ea calcium-channel blocker hangata e kenyelletsa ho ruruha ha maoto le ho tsekela — bolella rakhemisi haeba ho u tšoenya. Materia ha e iqape tekanyo kapa sepheo sa khatello ea mali.",
        "Lihlahiswa tsa grapefruit li ka ama li-calcium-channel blockers tse ling — netefatsa holabel; Materia ha e iqape lethathamo la lijo.",
        "Haeba u fumana ho tsekela ho tebileng, bohloko ba sefuba bo bocha kapa bo mpefala, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa eli yeza loxinzelelo lwegazi ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Iingcebiso ze-calcium-channel blocker zihlala zibandakanya ukudumba kwamaqakala nesiyezi — xelela usokhemisti ukuba oku kukukhathaza. I-Materia ayiyiqiqi idosi okanye usukelo loxinzelelo lwegazi.",
        "Iimveliso ze-grapefruit zinokuchaphazela ezinye ii-calcium-channel blockers — qinisekisa kwileyibhile; i-Materia ayiyiqiqi uluhlu lokutya.",
        "Ukuba ufumana isiyezi esiqatha, iintlungu zesifuba ezintsha okanye ezimbi ngakumbi, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-aspirin": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this medicine exactly as directed on your labelled product — pain and heart-protection uses differ; follow the product and care plan you were given.",
        "Tell your pharmacist about ulcer, bleeding history, asthma, or other pain/blood-thinning medicines; Materia does not invent a dose or combination rule.",
        "Aspirin is generally not for children or teens with viral illness unless a clinician directs it — confirm against the labelled product.",
        "If you get unusual bleeding, black stools, severe rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa lo muthi njengoba kubhalwe kumkhiqizo onelebula — ukusebenziswa kobuhlungu nokuvikela inhliziyo kuyahlukana; landela umkhiqizo nohlelo lokwelashwa.",
        "Tshela umkhiqizi ngesilonda sesisu, ukopha, i-asthma, noma eminye imithi yobuhlungu/okunciphisa ukopha; i-Materia ayiqambi umthamo noma umthetho wokuhlanganisa.",
        "I-aspirin ngokuvamile ayenzelwe izingane noma abasha abanesifo se-virus ngaphandle uma udokotela eyala — qinisekisa kumkhiqizo onelebula.",
        "Uma uthola ukopha okungajwayelekile, indle emnyama, isikhumba esibi, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie medisyne soos op die geëtiketteerde produk aangedui — pyn- en hartbeskermingsgebruike verskil; volg die produk en sorgplan wat jy gekry het.",
        "Sê vir jou apteker van maagsweer-, bloedinggeskiedenis, asma, of ander pyn-/bloedverdunningsmiddels; Materia versin nie ’n dosis of kombinasireël nie.",
        "Aspirien is oor die algemeen nie vir kinders of tieners met virusinfeksie nie tensy ’n klinikus dit aanbeveel — bevestig teen die geëtiketteerde produk.",
        "As jy ongewone bloeding, swart stoelgang, ernstige uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa moriana ona hantle kamoo e hlalositsoeng holabel — tšebeliso ea bohloko le tšireletso ea pelo li fapana; latela sehlahiswa le moralo oa tlhokomelo.",
        "Bolella rakhemisi ka leqeba la mpa, ho tsoa mali, asthma, kapa meriana e meng ea bohloko/e fokotsang mali; Materia ha e iqape tekanyo kapa molao oa ho kopanya.",
        "Aspirin ka kakaretso ha e etsetsoe bana kapa bacha ba nang le boloetse ba vaerase ntle le haeba ngaka e e laela — netefatsa holabel.",
        "Haeba u fumana ho tsoa mali ho sa tloaelehang, bolusepa bo botšo, lekhopho le tebileng, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa eli yeza ngokuchanekileyo njengoko kubhaliwe kwileyibhile — ukusetyenziswa kweentlungu nokukhusela intliziyo kuyahluka; landela imveliso necwangciso lokhathalelo.",
        "Xelela usokhemisti ngesilonda sesisu, ukopha, i-asthma, okanye amanye amayeza eentlungu/okunciphisa ukopha; i-Materia ayiyiqiqi idosi okanye umgaqo wokudibanisa.",
        "I-aspirin ngokuqhelekileyo ayenzelwanga abantwana okanye abatsha abanesifo se-virus ngaphandle kokuba ugqirha eyalela — qinisekisa kwileyibhile.",
        "Ukuba ufumana ukopha okungaqhelekanga, indolwana emnyama, irashi eqatha, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
  "mol-omeprazole": {
    en: {
      lang: "en",
      publishState: "published",
      sourceNote: "Materia original counselling — founder-reviewed educational layer",
      lines: [
        "Take this acid-reducing medicine exactly as directed on your labelled product.",
        "PPI counselling often includes taking before food — confirm timing against the labelled product; Materia does not invent a clock schedule or dose.",
        "Tell your pharmacist about other medicines you take — some products interact with PPIs.",
        "If you get severe diarrhoea, black stools, a severe rash, swelling, or trouble breathing — seek emergency care.",
      ],
    },
    zu: {
      lang: "zu",
      publishState: "published",
      sourceNote: "Materia original isiZulu counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa lo muthi onciphisa i-asidi njengoba kubhalwe kumkhiqizo onelebula.",
        "Ukwelulekwa kwe-PPI kuvame ukufaka ukuthatha ngaphambi kokudla — qinisekisa isikhathi kumkhiqizo onelebula; i-Materia ayiqambi ishedyuli noma umthamo.",
        "Tshela umkhiqizi ngemanye imithi oyisebenzisayo — eminye imikhiqizo ihlangana nama-PPI.",
        "Uma uthola uhudo olukhulu, indle emnyama, isikhumba esibi, ukuvuvuka, noma ukuphefumula kanzima — funa usizo oluphuthumayo.",
      ],
    },
    af: {
      lang: "af",
      publishState: "published",
      sourceNote: "Materia original Afrikaans counselling — founder-reviewed educational layer",
      lines: [
        "Neem hierdie suurverminderende middel soos op die geëtiketteerde produk aangedui.",
        "PPI-berading sluit dikwels in om voor kos te neem — bevestig tydsberekening teen die geëtiketteerde produk; Materia versin nie ’n klokskedule of dosis nie.",
        "Sê vir jou apteker van ander medisyne wat jy neem — sommige produkte wisselwerk met PPI’s.",
        "As jy ernstige diarree, swart stoelgang, ’n ernstige uitslag, swelling of asemhalingsprobleme kry — soek noodhulp.",
      ],
    },
    st: {
      lang: "st",
      publishState: "published",
      sourceNote: "Materia original Sesotho counselling — founder-reviewed educational layer",
      lines: [
        "Sebelisa moriana ona o fokotsang asiti hantle kamoo e hlalositsoeng holabel ea sehlahiswa.",
        "Keletso ea PPI hangata e kenyelletsa ho e nka pele ho ja — netefatsa nako holabel; Materia ha e iqape kemiso ea nako kapa tekanyo.",
        "Bolella rakhemisi ka meriana e meng eo u e sebelisang — lihlahiswa tse ling li kopana le li-PPI.",
        "Haeba u fumana letšollo le tebileng, bolusepa bo botšo, lekhopho le tebileng, ho ruruha, kapa ho hema thata — batla thuso ea tšohanyetso.",
      ],
    },
    xh: {
      lang: "xh",
      publishState: "published",
      sourceNote: "Materia original isiXhosa counselling — founder-reviewed educational layer",
      lines: [
        "Sebenzisa eli yeza elinciphisa i-asidi ngokuchanekileyo njengoko kubhaliwe kwileyibhile yemveliso.",
        "Iingcebiso ze-PPI zihlala zibandakanya ukuthatha phambi kokutya — qinisekisa ixesha kwileyibhile; i-Materia ayiyiqiqi ishedyuli okanye idosi.",
        "Xelela usokhemisti ngamanye amayeza owasebenzisayo — ezinye iimveliso zidibana nee-PPI.",
        "Ukuba ufumana urhudo oluqatha, indolwana emnyama, irashi eqatha, ukudumba, okanye uxinzelelo lokuphefumla — funa uncedo olungxamisekileyo.",
      ],
    },
  },
};

export function getCounsellingScript(
  moleculeId: string,
  lang: CounsellingLang,
  allowDraft = false,
): CounsellingScript | null {
  const script = SCRIPTS[moleculeId]?.[lang];
  if (!script) return null;
  if (script.publishState !== "published" && !allowDraft) return null;
  return script;
}

export function listCounsellingLangs(moleculeId: string): CounsellingLang[] {
  const entry = SCRIPTS[moleculeId];
  if (!entry) return [];
  return (Object.keys(entry) as CounsellingLang[]).filter(
    (l) => entry[l]?.publishState === "published",
  );
}

/** Coverage helper for Academy / Insights — published SA counselling langs per molecule. */
export function counsellingCoverage(
  moleculeId: string,
): Array<{ lang: CounsellingLang; label: string; lineCount: number }> {
  return listCounsellingLangs(moleculeId).map((lang) => {
    const script = getCounsellingScript(moleculeId, lang)!;
    const label = COUNSELLING_LANGS.find((l) => l.code === lang)?.label ?? lang;
    return { lang, label, lineCount: script.lines.length };
  });
}

/** Molecules with at least one published counselling language (SA moat coverage). */
export function listMoleculesWithPublishedCounselling(): string[] {
  return Object.keys(SCRIPTS).filter((id) => listCounsellingLangs(id).length > 0);
}
