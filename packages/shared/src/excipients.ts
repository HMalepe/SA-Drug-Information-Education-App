import type { Excipient, Product, UserMode } from "./types.js";

/** Fixed-template excipient explainer (Build Spec §5.4). Never invents clinical doses. */

export interface ExcipientExplanation {
  id: string;
  name: string;
  purpose: string;
  allergyRisk: string;
  absorptionNote?: string;
  canBecomeActive: boolean;
  /** The §5.4 hook: inactive until the wrong patient context */
  inactiveUntilNote: string;
  plainLanguage: string;
  counsellingCue: string;
}

/** Authoritative educational library — merges onto thin seed rows by id. */
export const EXCIPIENT_LIBRARY: Record<string, Omit<Excipient, "id"> & { inactiveUntilNote: string }> = {
  "exc-mg-stearate": {
    name: "Magnesium stearate",
    purpose: "Tablet/capsule lubricant — helps powder flow and prevents sticking to machinery.",
    allergyRisk: "True allergy is rare; usually not clinically significant at tablet levels.",
    absorptionNote: "Not an active medicine; negligible systemic effect at typical excipient amounts.",
    canBecomeActive: false,
    inactiveUntilNote: "Inactive for most people — flag only if a specific magnesium/stearate sensitivity is documented.",
  },
  "exc-lactose": {
    name: "Lactose",
    purpose: "Filler / diluent; also a common carrier in dry-powder inhalers.",
    allergyRisk: "Relevant in lactose intolerance (GI) and rare milk-protein allergy contexts — confirm the clinical picture.",
    absorptionNote: "Amounts in tablets are often small vs dietary lactose, but DPI carriers can matter for sensitive patients.",
    canBecomeActive: false,
    inactiveUntilNote: "Inactive until it meets lactose intolerance or milk-protein allergy — then it becomes a counselling problem.",
  },
  "exc-starch": {
    name: "Maize / corn starch",
    purpose: "Binder and disintegrant — helps the tablet hold shape then break apart.",
    allergyRisk: "Usually low; confirm in documented corn hypersensitivity.",
    canBecomeActive: false,
    inactiveUntilNote: "Inactive for most — become relevant if the patient has a confirmed corn/starch allergy narrative.",
  },
  "exc-povidone": {
    name: "Povidone (PVP)",
    purpose: "Binder — helps powders stick into a coherent tablet.",
    allergyRisk: "Uncommon; report unexpected rash/allergy patterns to the clinician.",
    canBecomeActive: false,
    inactiveUntilNote: "Inactive until a rare hypersensitivity story appears — still not an active API.",
  },
  "exc-sodium-starch-glycolate": {
    name: "Sodium starch glycolate",
    purpose: "Super-disintegrant — helps the tablet break up quickly after swallowing.",
    allergyRisk: "Low for most patients.",
    canBecomeActive: false,
    inactiveUntilNote: "Inactive for most people; not a substitute for checking the active ingredient.",
  },
  "exc-titanium-dioxide": {
    name: "Titanium dioxide",
    purpose: "Opacifier / colourant in film coats.",
    allergyRisk: "Generally low at coating levels; regulatory status can change — follow current SA labelling.",
    canBecomeActive: false,
    inactiveUntilNote: "Cosmetic/functional coating aid — not the medicine, but still listed for transparency.",
  },
  "exc-croscarmellose": {
    name: "Croscarmellose sodium",
    purpose: "Disintegrant — draws water to help the tablet break apart.",
    allergyRisk: "Low for most patients.",
    canBecomeActive: false,
    inactiveUntilNote: "Inactive until an unusual hypersensitivity history makes any excipient relevant.",
  },
};

export function enrichExcipient(excipient: Excipient): Excipient & { inactiveUntilNote: string } {
  const lib = EXCIPIENT_LIBRARY[excipient.id];
  if (!lib) {
    return {
      ...excipient,
      purpose: excipient.purpose ?? "Purpose not yet authored in Materia.",
      allergyRisk: excipient.allergyRisk ?? "Allergy notes not yet authored — confirm against the labelled product.",
      inactiveUntilNote:
        "Excipients are labelled inactive until they meet the wrong patient context — confirm clinically.",
    };
  }
  return {
    id: excipient.id,
    name: excipient.name || lib.name,
    purpose: excipient.purpose || lib.purpose,
    allergyRisk: excipient.allergyRisk || lib.allergyRisk,
    absorptionNote: excipient.absorptionNote || lib.absorptionNote,
    canBecomeActive: excipient.canBecomeActive ?? lib.canBecomeActive,
    inactiveUntilNote: lib.inactiveUntilNote,
  };
}

export function explainExcipient(excipient: Excipient, mode: UserMode = "pharmacist"): ExcipientExplanation {
  const e = enrichExcipient(excipient);
  const plain =
    mode === "patient"
      ? `${e.name} is not the medicine itself — it helps make the tablet/inhaler. ${e.inactiveUntilNote}`
      : `${e.name}: ${e.purpose} Allergy lens: ${e.allergyRisk}`;
  const counsellingCue =
    mode === "patient"
      ? "If you have food or ingredient allergies, show this list to your pharmacist."
      : "Match excipient risks to the patient's allergy/intolerance history before recommending a brand switch.";
  return {
    id: e.id,
    name: e.name,
    purpose: e.purpose ?? "",
    allergyRisk: e.allergyRisk ?? "",
    absorptionNote: e.absorptionNote,
    canBecomeActive: Boolean(e.canBecomeActive),
    inactiveUntilNote: e.inactiveUntilNote,
    plainLanguage: plain,
    counsellingCue,
  };
}

export function explainProductExcipients(input: {
  product: Product;
  excipients: Excipient[];
  mode?: UserMode;
}): {
  productId: string;
  brandName: string;
  explanations: ExcipientExplanation[];
  emptyNote?: string;
} {
  const mode = input.mode ?? "pharmacist";
  const mapped = input.product.excipientIds
    .map((id) => input.excipients.find((e) => e.id === id))
    .filter((e): e is Excipient => Boolean(e))
    .map((e) => explainExcipient(e, mode));
  return {
    productId: input.product.id,
    brandName: input.product.brandName,
    explanations: mapped,
    emptyNote:
      mapped.length === 0
        ? "No published excipient rows for this pack yet — empty states are intentional."
        : undefined,
  };
}
