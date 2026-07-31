import {
  MEDICINE_360_TABS,
  buildMoleculeVisualGallery,
  buildProductVisualCard,
  buildManufacturingTransparency,
  buildInteractionTabBody,
  collectInteractionTabSources,
  buildSourcedListItems,
  emptyStateMessage,
  explainProductExcipients,
  getModeLens,
  modeContentDepth,
  parseUserMode,
  renderableFact,
  type Medicine360TabId,
  type Source,
  type UserMode,
} from "@materia/shared";
import { buildOverdoseEmergencyTemplate } from "@materia/shared";
import {
  db,
  getMoleculeBySlug,
  getSafety,
  getSource,
  listPublishedInteractionsForMolecule,
} from "./store.js";

function sourcedText(
  fact: { value: string; sourceId: string; publishState: string; lastReviewed: string } | undefined,
): { text: string; source: Source | null; empty: boolean } {
  if (!fact) return { text: emptyStateMessage("this field"), source: null, empty: true };
  const rendered = renderableFact(fact as never);
  if (!rendered) return { text: emptyStateMessage("this field"), source: null, empty: true };
  const source = getSource(rendered.sourceId) ?? null;
  if (!source) return { text: emptyStateMessage("this field"), source: null, empty: true };
  return { text: String(rendered.value), source, empty: false };
}

type SourcedListItem = {
  text: string;
  level?: string;
  source: Source | null;
};

function sourcedListFacts(
  facts: Array<{ value: unknown; sourceId: string; publishState: string; lastReviewed?: string }> | undefined,
): { items: SourcedListItem[]; sources: Source[] } {
  return buildSourcedListItems(facts as never, getSource);
}

export function buildMolecule360(slug: string, modeInput: UserMode | string = "pharmacist") {
  const mode = parseUserMode(modeInput);
  const lens = getModeLens(mode);
  const molecule = getMoleculeBySlug(slug);
  if (!molecule) return null;

  const products = db.products.filter(
    (p) => p.moleculeId === molecule.id && p.publishState === "published",
  );
  const manufacturers = db.manufacturers;
  const safety = getSafety(molecule.id);
  const course = db.courses.find((c) => c.moleculeId === molecule.id && c.publishState === "published");

  const chemistry = sourcedText(molecule.chemistrySummary);
  const moa = sourcedText(molecule.moaSummary);
  const discovery = sourcedText(molecule.discoveryNote);

  const interactionBody = buildInteractionTabBody({
    moleculeId: molecule.id,
    interactions: listPublishedInteractionsForMolecule(molecule.id),
    molecules: db.molecules,
    getSource,
  });
  const interactionSources = collectInteractionTabSources(interactionBody);

  const contraindications = sourcedListFacts(safety?.contraindications as never);
  const warnings = sourcedListFacts(safety?.warnings as never);
  const pearls = sourcedListFacts(safety?.clinicalPearls as never);
  const counselling = sourcedListFacts(safety?.counsellingPoints as never);
  const pregnancy = sourcedText(safety?.pregnancy);
  const breastfeeding = sourcedText(safety?.breastfeeding);
  const dosingAdult = sourcedText(safety?.dosingAdult);
  const dosingPaediatric = sourcedText(safety?.dosingPaediatric);
  const dosingGeriatric = sourcedText(safety?.dosingGeriatric);
  const dosingRenal = sourcedText(safety?.renalAdjustment);
  const dosingHepatic = sourcedText(safety?.hepaticAdjustment);
  const foodLifestyle = sourcedText(safety?.foodLifestyle);

  const dosingSources = [
    dosingAdult.source,
    dosingPaediatric.source,
    dosingGeriatric.source,
    dosingRenal.source,
    dosingHepatic.source,
  ].filter(Boolean) as Source[];
  const dosingSourcesUnique = [...new Map(dosingSources.map((s) => [s.id, s])).values()];

  const tabs: Record<
    Medicine360TabId,
    { title: string; body: unknown; sources: Source[] }
  > = {
    chemistry: {
      title: "Chemistry",
      body: {
        summary: chemistry.text,
        discovery: discovery.text,
        depth: modeContentDepth(mode),
        modeFraming: lens.framing.chemistry,
        professionalDepth: lens.professionalDepthTabs.includes("chemistry"),
      },
      sources: [chemistry.source, discovery.source].filter(Boolean) as Source[],
    },
    moa: {
      title: "Mechanism of Action",
      body: {
        summary: moa.text,
        modeFraming: lens.framing.moa,
        professionalDepth: lens.professionalDepthTabs.includes("moa"),
      },
      sources: moa.source ? [moa.source] : [],
    },
    "sa-products": {
      title: "SA Products & Strengths",
      body: {
        lineage: products.map((p) => {
          const explainer = explainProductExcipients({
            product: p,
            excipients: db.excipients,
            mode,
          });
          return {
            ...p,
            manufacturer: manufacturers.find((m) => m.id === p.manufacturerId) ?? null,
            excipients: explainer.explanations,
            excipientEmptyNote: explainer.emptyNote,
            visual: buildProductVisualCard(p),
          };
        }),
        manufacturing: buildManufacturingTransparency({
          molecule,
          products,
          manufacturers,
        }),
        explainerNote:
          "Excipients explained (Build Spec §5.4) — inactive until the wrong patient context. Confirm against the labelled pack.",
        visualNote:
          "Packaging form silhouettes (Build Spec §5.5) — educational placeholders; imprint codes are never invented.",
        manufacturingNote:
          "Manufacturing transparency (Build Spec §5.3 / §10.1) — published manufacturer metadata only; blank sites are not guessed.",
        insertNote:
          "Package-insert summaries use Tools → Insert translator (Build Spec §9). Professional and Grade-5 passages are separately authored — never auto-invented.",
      },
      sources: [getSource("src-sahpra")].filter(Boolean) as Source[],
    },
    dosing: {
      title: "Dosing",
      body: {
        adult: dosingAdult.text,
        paediatric: dosingPaediatric.text,
        geriatric: dosingGeriatric.text,
        renal: dosingRenal.text,
        hepatic: dosingHepatic.text,
        note: "Numeric calculator rules are not invented — unavailable until published DoseRules exist.",
        modeFraming: lens.framing.dosing,
        professionalDepth: lens.professionalDepthTabs.includes("dosing"),
      },
      sources: dosingSourcesUnique,
    },
    contraindications: {
      title: "Contraindications",
      body: {
        items: contraindications.items,
        empty:
          contraindications.items.length === 0
            ? "No published contraindications for this molecule yet."
            : null,
        modeFraming: lens.framing.contraindications,
      },
      sources: contraindications.sources,
    },
    warnings: {
      title: "Warnings & Monitoring",
      body: {
        items: warnings.items,
        empty:
          warnings.items.length === 0 ? "No published warnings for this molecule yet." : null,
        modeFraming: lens.framing.warnings,
      },
      sources: warnings.sources,
    },
    interactions: {
      title: "Drug Interactions",
      body: interactionBody,
      sources: interactionSources,
    },
    "food-lifestyle": {
      title: "Food & Lifestyle",
      body: { summary: foodLifestyle.text },
      sources: foodLifestyle.source ? [foodLifestyle.source] : [],
    },
    pregnancy: {
      title: "Pregnancy & Breastfeeding",
      body: {
        pregnancy: pregnancy.text,
        breastfeeding: breastfeeding.text,
        pregnancyEmpty: pregnancy.empty,
        breastfeedingEmpty: breastfeeding.empty,
      },
      sources: [pregnancy.source, breastfeeding.source].filter(Boolean) as Source[],
    },
    overdose: {
      title: "Overdose & Emergency",
      body: buildOverdoseEmergencyTemplate({
        earlySigns: sourcedText(safety?.overdoseEarlySigns).empty
          ? undefined
          : sourcedText(safety?.overdoseEarlySigns).text,
        severeSigns: sourcedText(safety?.overdoseSevereSigns).empty
          ? undefined
          : sourcedText(safety?.overdoseSevereSigns).text,
        antidoteOrSupportive: sourcedText(safety?.antidoteOrSupportive).empty
          ? undefined
          : sourcedText(safety?.antidoteOrSupportive).text,
        moleculeLabel: molecule.innName,
      }),
      sources: [sourcedText(safety?.antidoteOrSupportive).source].filter(Boolean) as Source[],
    },
    pearls: {
      title: "Clinical Pearls",
      body: {
        items: pearls.items,
        empty: pearls.items.length === 0 ? "No published clinical pearls for this molecule yet." : null,
        modeFraming: lens.framing.pearls,
        professionalDepth: lens.professionalDepthTabs.includes("pearls"),
      },
      sources: pearls.sources,
    },
    animations: {
      title: "Visual identification",
      body: {
        ...buildMoleculeVisualGallery(products),
        cameraNote:
          "Camera / pill-ID model is not live yet — use Tools → barcode or form cue (e.g. “inhaler”) for suggestive resolve only.",
      },
      sources: [getSource("src-sahpra")].filter(Boolean) as Source[],
    },
    quiz: {
      title: "Interactive Quiz",
      body: {
        questions: (course?.quiz ?? []).filter((q) => q.publishState === "published"),
      },
      sources: [],
    },
    "ai-tutor": {
      title: "AI Tutor",
      body: {
        hint: "POST /ai/ask with moleculeSlug + question. Grounded retrieval only.",
      },
      sources: [],
    },
    counselling: {
      title: "Patient Counselling Points",
      body: {
        items: counselling.items,
        empty:
          counselling.items.length === 0
            ? "No published counselling points for this molecule yet."
            : null,
        modeNote: lens.framing.counselling,
        modeFraming: lens.framing.counselling,
      },
      sources: counselling.sources,
    },
  };

  return {
    molecule,
    mode,
    modeLens: {
      label: lens.label,
      vocabulary: lens.vocabulary,
      emphasizes: lens.emphasizes,
    },
    tabOrder: MEDICINE_360_TABS,
    tabs,
    defaultTab: lens.defaultTab,
    course: course
      ? {
          id: course.id,
          title: course.title,
          lessons: course.lessons.filter((l) => l.publishState === "published"),
        }
      : null,
  };
}
