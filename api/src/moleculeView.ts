import {
  MEDICINE_360_TABS,
  buildMoleculeVisualGallery,
  buildProductVisualCard,
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
import { db, getMoleculeBySlug, getSafety, getSource } from "./store.js";

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
        explainerNote:
          "Excipients explained (Build Spec §5.4) — inactive until the wrong patient context. Confirm against the labelled pack.",
        visualNote:
          "Packaging form silhouettes (Build Spec §5.5) — educational placeholders; imprint codes are never invented.",
        insertNote:
          "Package-insert summaries use Tools → Insert translator (Build Spec §9). Professional and Grade-5 passages are separately authored — never auto-invented.",
      },
      sources: [getSource("src-sahpra")].filter(Boolean) as Source[],
    },
    dosing: {
      title: "Dosing",
      body: {
        adult: sourcedText(safety?.dosingAdult).text,
        paediatric: sourcedText(safety?.dosingPaediatric).text,
        geriatric: sourcedText(safety?.dosingGeriatric).text,
        renal: sourcedText(safety?.renalAdjustment).text,
        hepatic: sourcedText(safety?.hepaticAdjustment).text,
        note: "Numeric calculator rules are not invented — unavailable until published DoseRules exist.",
        modeFraming: lens.framing.dosing,
        professionalDepth: lens.professionalDepthTabs.includes("dosing"),
      },
      sources: [sourcedText(safety?.dosingAdult).source].filter(Boolean) as Source[],
    },
    contraindications: {
      title: "Contraindications",
      body: {
        items: (safety?.contraindications ?? [])
          .map((f) => {
            const r = renderableFact(f);
            if (!r) return null;
            return { ...r.value, source: getSource(r.sourceId) };
          })
          .filter(Boolean),
        modeFraming: lens.framing.contraindications,
      },
      sources: [],
    },
    warnings: {
      title: "Warnings & Monitoring",
      body: {
        items: (safety?.warnings ?? [])
          .map((f) => {
            const r = renderableFact(f);
            return r ? { text: r.value, source: getSource(r.sourceId) } : null;
          })
          .filter(Boolean),
        modeFraming: lens.framing.warnings,
      },
      sources: [],
    },
    interactions: {
      title: "Drug Interactions",
      body: {
        items: [],
        empty: "No published pairwise interactions in the seed set yet.",
      },
      sources: [],
    },
    "food-lifestyle": {
      title: "Food & Lifestyle",
      body: { summary: sourcedText(safety?.foodLifestyle).text },
      sources: [sourcedText(safety?.foodLifestyle).source].filter(Boolean) as Source[],
    },
    pregnancy: {
      title: "Pregnancy & Breastfeeding",
      body: {
        pregnancy: sourcedText(safety?.pregnancy).text,
        breastfeeding: sourcedText(safety?.breastfeeding).text,
      },
      sources: [],
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
        items: (safety?.clinicalPearls ?? [])
          .map((f) => {
            const r = renderableFact(f);
            return r ? { text: r.value, source: getSource(r.sourceId) } : null;
          })
          .filter(Boolean),
        modeFraming: lens.framing.pearls,
        professionalDepth: lens.professionalDepthTabs.includes("pearls"),
      },
      sources: [],
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
        items: (safety?.counsellingPoints ?? [])
          .map((f) => {
            const r = renderableFact(f);
            return r ? { text: r.value, source: getSource(r.sourceId) } : null;
          })
          .filter(Boolean),
        modeNote: lens.framing.counselling,
        modeFraming: lens.framing.counselling,
      },
      sources: [],
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
