export interface ColdChainNote {
  productKey: string;
  title: string;
  storage: string;
  loadSheddingSteps: string[];
  publishState: "published" | "draft";
  sourceNote: string;
}

/**
 * Load-shedding cold-chain notes (Build Spec §12) — SA-shaped premium feature.
 * Educational storage tolerance framing only; not patient-specific advice.
 */
const NOTES: ColdChainNote[] = [
  {
    productKey: "insulin",
    title: "Insulin (class note)",
    storage: "Typically refrigerated unused; in-use pens often room-temp for a labelled window — check the specific product insert.",
    loadSheddingSteps: [
      "Keep the fridge closed during outages to hold temperature longer.",
      "If power will be out for many hours, move insulin to a validated cooler with ice packs — do not freeze.",
      "Discard if frozen or if the insert's excursion limits were exceeded — confirm with the insert / pharmacist.",
      "Log the outage window for the patient when counselling.",
    ],
    publishState: "published",
    sourceNote: "Materia original SA practice note — verify against current product PILs",
  },
  {
    productKey: "vaccines",
    title: "Vaccines (class note)",
    storage: "Cold-chain vaccines generally require 2–8 °C; never freeze unless the product specifically requires it.",
    loadSheddingSteps: [
      "Minimise fridge door opening; use a fridge thermometer if available.",
      "During prolonged outages, transfer to a monitored cold box per clinic SOP.",
      "Do not use vials exposed to freezing or unknown excursions — quarantine and escalate.",
      "Document excursion and follow NDoH / facility vaccine SOP.",
    ],
    publishState: "published",
    sourceNote: "Materia original SA practice note — verify against EPI / product guidance",
  },
  {
    productKey: "amoxicillin-suspension",
    title: "Reconstituted antibiotic suspensions (class note)",
    storage: "Many reconstitutions need fridge storage after mixing — follow the brand PIL for hours/days.",
    loadSheddingSteps: [
      "If fridge fails, check the PIL for room-temperature allowance after reconstitution.",
      "Advise the caregiver of the new discard time if an excursion occurred.",
      "When unsure, do not guess — replace stock per SOP.",
    ],
    publishState: "published",
    sourceNote: "Materia original counselling aid — product-specific PIL wins",
  },
];

export function listColdChainNotes(): ColdChainNote[] {
  return NOTES.filter((n) => n.publishState === "published");
}

export function getColdChainNote(productKey: string): ColdChainNote | null {
  return (
    NOTES.find((n) => n.productKey === productKey && n.publishState === "published") ?? null
  );
}
