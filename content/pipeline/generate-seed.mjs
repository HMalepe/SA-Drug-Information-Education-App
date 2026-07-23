/**
 * Generates placeholder antibiotic seed JSON.
 * Clinical doses/antidotes stay draft — never invent clinical values.
 * Public-ish metadata (INN, class, example brand names) only.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../../db/seed");
mkdirSync(outDir, { recursive: true });

const PLACEHOLDER_SOURCE = {
  id: "src-placeholder-review",
  citation:
    "PLACEHOLDER — founder pharmacist review required. Not a clinical reference. Do not use for patient care.",
  sourceType: "original_authoring",
  lastReviewed: "2026-07-01",
  reviewerCredential: "Pending founder review",
  notes: "Scaffold only. Replace with SAHPRA/DoH/original authored sourced facts.",
};

const SAHPRA_META_SOURCE = {
  id: "src-sahpra-register-meta",
  citation:
    "SAHPRA medicines register — metadata scaffolding (verify live register before publish)",
  sourceType: "register",
  url: "https://www.sahpra.org.za/",
  lastReviewed: "2026-07-01",
  reviewerCredential: "Pending verification",
};

const EDUCATIONAL_SOURCE = {
  id: "src-educational-scaffold",
  citation:
    "Materia original educational scaffold (non-dosing). Pending clinical review before treating as teaching fact.",
  sourceType: "original_authoring",
  lastReviewed: "2026-07-01",
  reviewerCredential: "Pending founder review",
};

/** @type {Array<{slug:string,inn:string,className:string,synonyms:string[],brands:Array<{brand:string,synonyms?:string[],originator?:boolean,partner?:string}>}>} */
const ANTIBIOTICS = [
  {
    slug: "amoxicillin",
    inn: "Amoxicillin",
    className: "Beta-lactam / aminopenicillin",
    synonyms: ["amoxycillin", "amoxil"],
    brands: [
      { brand: "Amoxil", synonyms: ["amoxil"], originator: true },
      { brand: "Iltux", synonyms: ["iltux"] },
      { brand: "Betamox", synonyms: ["betamox"] },
    ],
  },
  {
    slug: "amoxicillin-clavulanate",
    inn: "Amoxicillin-clavulanate",
    className: "Beta-lactam / penicillin + beta-lactamase inhibitor",
    synonyms: ["amoxicillin clavulanic acid", "co-amoxiclav", "amox-clav", "augmentin"],
    brands: [
      { brand: "Augmentin", synonyms: ["augmentin", "augmentin es"], originator: true },
      { brand: "Curam", synonyms: ["curam"] },
      { brand: "Mega-Clav", synonyms: ["megaclav", "mega clav"] },
    ],
  },
  {
    slug: "phenoxymethylpenicillin",
    inn: "Phenoxymethylpenicillin",
    className: "Beta-lactam / penicillin V",
    synonyms: ["penicillin v", "penicillin vk", "phenoxymethyl penicillin"],
    brands: [{ brand: "LenVPK", synonyms: ["lenvpk", "pen v"] }],
  },
  {
    slug: "flucloxacillin",
    inn: "Flucloxacillin",
    className: "Beta-lactam / antistaphylococcal penicillin",
    synonyms: ["floxapen", "fluclox"],
    brands: [{ brand: "Floxapen", synonyms: ["floxapen"], originator: true }],
  },
  {
    slug: "cephalexin",
    inn: "Cephalexin",
    className: "Cephalosporin (1st generation)",
    synonyms: ["cefalexin", "keflex"],
    brands: [{ brand: "Keflex", synonyms: ["keflex"], originator: true }],
  },
  {
    slug: "cefuroxime",
    inn: "Cefuroxime",
    className: "Cephalosporin (2nd generation)",
    synonyms: ["zinacef", "ceftin"],
    brands: [{ brand: "Zinnat", synonyms: ["zinnat"], originator: true }],
  },
  {
    slug: "ceftriaxone",
    inn: "Ceftriaxone",
    className: "Cephalosporin (3rd generation)",
    synonyms: ["rocephin"],
    brands: [{ brand: "Rocephin", synonyms: ["rocephin"], originator: true }],
  },
  {
    slug: "azithromycin",
    inn: "Azithromycin",
    className: "Macrolide",
    synonyms: ["zithromax"],
    brands: [{ brand: "Zithromax", synonyms: ["zithromax"], originator: true }],
  },
  {
    slug: "clarithromycin",
    inn: "Clarithromycin",
    className: "Macrolide",
    synonyms: ["klacid", "biaxin"],
    brands: [{ brand: "Klacid", synonyms: ["klacid"], originator: true }],
  },
  {
    slug: "erythromycin",
    inn: "Erythromycin",
    className: "Macrolide",
    synonyms: ["erythrocin"],
    brands: [{ brand: "Erythrocin", synonyms: ["erythrocin"] }],
  },
  {
    slug: "doxycycline",
    inn: "Doxycycline",
    className: "Tetracycline",
    synonyms: ["vibramycin"],
    brands: [{ brand: "Vibramycin", synonyms: ["vibramycin"], originator: true }],
  },
  {
    slug: "ciprofloxacin",
    inn: "Ciprofloxacin",
    className: "Fluoroquinolone",
    synonyms: ["cipro", "ciprobay"],
    brands: [{ brand: "Ciprobay", synonyms: ["ciprobay", "cipro"], originator: true }],
  },
  {
    slug: "metronidazole",
    inn: "Metronidazole",
    className: "Nitroimidazole",
    synonyms: ["flagyl"],
    brands: [{ brand: "Flagyl", synonyms: ["flagyl"], originator: true }],
  },
  {
    slug: "co-trimoxazole",
    inn: "Co-trimoxazole",
    className: "Sulfonamide + trimethoprim",
    synonyms: ["trimethoprim sulfamethoxazole", "bactrim", "septran"],
    brands: [
      { brand: "Bactrim", synonyms: ["bactrim"], originator: true },
      { brand: "Septran", synonyms: ["septran"] },
    ],
  },
  {
    slug: "nitrofurantoin",
    inn: "Nitrofurantoin",
    className: "Nitrofuran",
    synonyms: ["macrodantin", "furadantin"],
    brands: [{ brand: "Macrodantin", synonyms: ["macrodantin"] }],
  },
  {
    slug: "clindamycin",
    inn: "Clindamycin",
    className: "Lincosamide",
    synonyms: ["dalacin"],
    brands: [{ brand: "Dalacin C", synonyms: ["dalacin", "dalacin c"], originator: true }],
  },
  {
    slug: "vancomycin",
    inn: "Vancomycin",
    className: "Glycopeptide",
    synonyms: ["vancocin"],
    brands: [{ brand: "Vancocin", synonyms: ["vancocin"], originator: true }],
  },
  {
    slug: "gentamicin",
    inn: "Gentamicin",
    className: "Aminoglycoside",
    synonyms: ["garamycin"],
    brands: [{ brand: "Garamycin", synonyms: ["garamycin"] }],
  },
  {
    slug: "amoxicillin-placeholder-extra-1",
    inn: "Pivmecillinam",
    className: "Beta-lactam / mecillinam prodrug",
    synonyms: ["selexid"],
    brands: [{ brand: "Selexid", synonyms: ["selexid"] }],
  },
  {
    slug: "fosfomycin",
    inn: "Fosfomycin",
    className: "Phosphonic acid derivative",
    synonyms: ["monuril"],
    brands: [{ brand: "Monuril", synonyms: ["monuril"] }],
  },
];

function draftFact(value) {
  return {
    value,
    sourceId: PLACEHOLDER_SOURCE.id,
    publishState: "draft",
    lastReviewed: "2026-07-01",
    aiDrafted: false,
  };
}

function publishedEdu(value) {
  return {
    value,
    sourceId: EDUCATIONAL_SOURCE.id,
    publishState: "published",
    lastReviewed: "2026-07-01",
    aiDrafted: false,
  };
}

const manufacturers = [
  {
    id: "mfr-gsk",
    name: "GlaxoSmithKline",
    marketingCompany: "GSK",
    madeInSa: false,
    apiOrigin: "Verify",
  },
  {
    id: "mfr-sandoz",
    name: "Sandoz",
    marketingCompany: "Sandoz SA",
    madeInSa: true,
    apiOrigin: "Verify",
  },
  {
    id: "mfr-adcock",
    name: "Adcock Ingram",
    marketingCompany: "Adcock Ingram",
    madeInSa: true,
    apiOrigin: "Verify",
  },
  {
    id: "mfr-generic",
    name: "Generic SA Manufacturer (scaffold)",
    marketingCompany: "TBD",
    madeInSa: true,
  },
];

const excipients = [
  {
    id: "exc-mg-stearate",
    name: "Magnesium stearate",
    purpose: "Lubricant (scaffold explanation — review before publish)",
    allergyRisk: "Rare; usually low clinical significance — verify",
    canBecomeActive: false,
  },
  {
    id: "exc-cellulose",
    name: "Microcrystalline cellulose",
    purpose: "Filler / binder (scaffold)",
    allergyRisk: "Low — verify",
    canBecomeActive: false,
  },
];

const molecules = [];
const products = [];
const safetyProfiles = [];
const courses = [];
const lessons = [];
const interactions = [];
const priceRecords = [];
const ragChunks = [];

ANTIBIOTICS.forEach((ab, idx) => {
  const id = `mol-${ab.slug}`;
  const isAmox = ab.slug === "amoxicillin";
  const isAug = ab.slug === "amoxicillin-clavulanate";

  molecules.push({
    id,
    slug: ab.slug === "amoxicillin-placeholder-extra-1" ? "pivmecillinam" : ab.slug,
    innName: ab.inn,
    className: ab.className,
    atcCode: undefined,
    therapeuticArea: "antibiotics",
    synonyms: ab.synonyms,
    publishState: "published",
    chemistrySummary: publishedEdu(
      `${ab.inn} is classed as ${ab.className}. Detailed structure/functional-group teaching content awaits founder-authored review.`,
    ),
    moaSummary: isAmox
      ? publishedEdu(
          "Amoxicillin inhibits bacterial cell-wall synthesis by binding penicillin-binding proteins (educational scaffold). Clinical dosing is NOT published here.",
        )
      : draftFact(`${ab.inn} MOA summary — draft placeholder; do not use clinically.`),
    discoveryNote: draftFact("Discovery timeline — draft placeholder."),
  });

  ab.brands.forEach((b, bi) => {
    const pid = `prod-${ab.slug}-${bi}`;
    products.push({
      id: pid,
      moleculeId: id,
      manufacturerId: b.originator ? "mfr-gsk" : bi % 2 === 0 ? "mfr-adcock" : "mfr-sandoz",
      brandName: b.brand,
      strength: "Strength pending SAHPRA verification",
      form: "oral (scaffold)",
      sahpraRegNo: undefined,
      schedule: "S4",
      isOriginator: Boolean(b.originator),
      isDiscontinued: false,
      bioequivalentFlag: undefined,
      synonymKeys: b.synonyms ?? [],
      excipientIds: ["exc-mg-stearate", "exc-cellulose"],
      publishState: "published",
    });
    priceRecords.push({
      id: `price-${pid}`,
      productId: pid,
      sepZar: undefined,
      effectiveDate: "2026-01-01",
      sourceId: SAHPRA_META_SOURCE.id,
      publishState: "draft",
      notes: "SEP not loaded — fetch from public DoH SEP dataset; do not invent prices.",
    });
  });

  safetyProfiles.push({
    id: `safety-${ab.slug}`,
    moleculeId: id,
    // Clinical fields remain draft (constitution)
    dosingAdult: draftFact(
      `[DRAFT] Adult dosing for ${ab.inn} — awaiting founder-sourced review. Not for clinical use.`,
    ),
    dosingPaediatric: draftFact(`[DRAFT] Paediatric dosing for ${ab.inn} — not published.`),
    dosingGeriatric: draftFact(`[DRAFT] Geriatric notes for ${ab.inn} — not published.`),
    renalAdjustment: draftFact(`[DRAFT] Renal adjustment — not published.`),
    hepaticAdjustment: draftFact(`[DRAFT] Hepatic adjustment — not published.`),
    contraindications: [
      {
        value: { level: "red", text: `[DRAFT] Hypersensitivity to class — verify before publish.` },
        sourceId: PLACEHOLDER_SOURCE.id,
        publishState: "draft",
        lastReviewed: "2026-07-01",
      },
    ],
    warnings: [
      {
        value: `[DRAFT] Monitoring warnings for ${ab.inn} — not published.`,
        sourceId: PLACEHOLDER_SOURCE.id,
        publishState: "draft",
        lastReviewed: "2026-07-01",
      },
    ],
    foodLifestyle: draftFact(`[DRAFT] Food/lifestyle — not published.`),
    pregnancy: draftFact(`[DRAFT] Pregnancy — not published.`),
    breastfeeding: draftFact(`[DRAFT] Breastfeeding — not published.`),
    overdoseEarlySigns: draftFact(`[DRAFT] Overdose early signs — not published.`),
    overdoseSevereSigns: draftFact(`[DRAFT] Overdose severe signs — not published.`),
    antidoteOrSupportive: draftFact(
      `[DRAFT] Antidote/supportive guidance — not published. UI will show supportive empty state.`,
    ),
    emergencySteps: draftFact(`[DRAFT] Emergency steps — use fixed safe template only.`),
    clinicalPearls: isAmox
      ? [
          publishedEdu(
            "Amoxicillin is among the most dispensed oral beta-lactams in SA primary care — always confirm allergy history (educational pearl scaffold).",
          ),
        ]
      : [],
    counsellingPoints: isAmox
      ? [
          publishedEdu(
            "Complete the course as prescribed; seek care if rash or breathing difficulty occurs (educational counselling scaffold — confirm before clinical use).",
          ),
        ]
      : [],
    publishState: isAmox || isAug ? "reviewed" : "draft",
  });

  const courseId = `course-${ab.slug}`;
  courses.push({
    id: courseId,
    moleculeId: id,
    title: `${ab.inn} — Academy scaffold (5 lessons)`,
    publishState: "draft",
  });
  const lessonTitles = [
    "Story & discovery",
    "Structure",
    "Mechanism of action",
    "Inside the body (ADME)",
    "Clinical pearls",
  ];
  lessonTitles.forEach((title, li) => {
    lessons.push({
      id: `lesson-${ab.slug}-${li + 1}`,
      courseId,
      order: li + 1,
      title,
      body: `DRAFT lesson ${li + 1} for ${ab.inn}. Author original content; do not copy SAMF/MIMS.`,
      publishState: "draft",
    });
  });

  // RAG chunks — only published educational text for amox + brand resolution metadata
  if (isAmox) {
    ragChunks.push({
      moleculeId: id,
      fieldPath: "chemistrySummary",
      content: molecules[molecules.length - 1].chemistrySummary.value,
      sourceId: EDUCATIONAL_SOURCE.id,
      publishState: "published",
      lastReviewed: "2026-07-01",
    });
    ragChunks.push({
      moleculeId: id,
      fieldPath: "moaSummary",
      content: molecules[molecules.length - 1].moaSummary.value,
      sourceId: EDUCATIONAL_SOURCE.id,
      publishState: "published",
      lastReviewed: "2026-07-01",
    });
    ragChunks.push({
      moleculeId: id,
      fieldPath: "counsellingPoints",
      content:
        "Complete the course as prescribed; seek care if rash or breathing difficulty occurs (educational counselling scaffold — confirm before clinical use).",
      sourceId: EDUCATIONAL_SOURCE.id,
      publishState: "published",
      lastReviewed: "2026-07-01",
    });
  }

  void idx;
});

// Example interaction scaffold — draft only
interactions.push({
  id: "ix-amox-methotrexate-draft",
  moleculeAId: "mol-amoxicillin",
  moleculeBId: "mol-amoxicillin-clavulanate",
  severity: "minor",
  mechanism: draftFact("[DRAFT] Interaction mechanism — not published."),
  action: draftFact("[DRAFT] Clinical action — not published."),
  publishState: "draft",
});

const seed = {
  meta: {
    generatedAt: new Date().toISOString(),
    therapeuticArea: "antibiotics",
    moleculeCount: molecules.length,
    notice:
      "Clinical dosing/overdose/interaction values are draft placeholders. Founder review required before publish. No SAMF/MIMS content.",
  },
  sources: [PLACEHOLDER_SOURCE, SAHPRA_META_SOURCE, EDUCATIONAL_SOURCE],
  manufacturers,
  excipients,
  molecules,
  products,
  safetyProfiles,
  interactions,
  priceRecords,
  formularyEntries: [],
  courses,
  lessons,
  quizQuestions: [],
  organizations: [
    { id: "org-demo-uni", name: "Demo Pharmacy School", kind: "university" },
  ],
  users: [],
  ragChunks,
  doseRules: [
    // Intentionally empty / unpublished — calculator must refuse inventing doses
  ],
};

const outPath = join(outDir, "antibiotics.json");
writeFileSync(outPath, JSON.stringify(seed, null, 2), "utf8");
writeFileSync(
  join(__dirname, "../antibiotics/README.md"),
  `# Antibiotic authoring set

Seed generated by \`content/pipeline/generate-seed.mjs\`.

## Review workflow

1. Author original clinical facts from free authoritative sources (SAHPRA, DoH STGs/EML, inserts) + pharmacist expertise.
2. Attach a \`Source\` per fact.
3. Move \`draft → reviewed → published\` only after founder (or delegated clinician) sign-off.
4. Never copy SAMF / MIMS / Lexicomp.

## Current status

- ~${molecules.length} antibiotic molecules scaffolded.
- Brand → molecule resolution keys included (e.g. Augmentin → amoxicillin-clavulanate).
- Clinical dosing / overdose remain **draft**.
- Amoxicillin has limited **published educational** chemistry/MOA/counselling scaffolds for the 360° spine demo.
`,
  "utf8",
);

console.log(`Wrote ${outPath} (${molecules.length} molecules, ${products.length} products)`);
