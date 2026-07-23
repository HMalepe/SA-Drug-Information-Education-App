import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  EXCIPIENT_LIBRARY,
  enrichExcipient,
  explainExcipient,
  explainProductExcipients,
  type Excipient,
  type Product,
} from "@materia/shared";

const lactose: Excipient = {
  id: "exc-lactose",
  name: "Lactose",
};

const thinUnknown: Excipient = {
  id: "exc-unknown-demo",
  name: "Unknown filler",
};

const product: Product = {
  id: "prod-demo",
  moleculeId: "mol-x",
  manufacturerId: "mfr-x",
  brandName: "DemoTab",
  strength: "500 mg",
  form: "tablet",
  schedule: "S2",
  isOriginator: false,
  isDiscontinued: false,
  synonymKeys: [],
  excipientIds: ["exc-lactose", "exc-mg-stearate"],
  publishState: "published",
};

describe("v15 excipient explainer", () => {
  it("merges library notes onto thin seed rows", () => {
    const enriched = enrichExcipient(lactose);
    assert.ok(enriched.purpose?.toLowerCase().includes("filler") || enriched.purpose?.includes("diluent"));
    assert.ok(enriched.inactiveUntilNote.toLowerCase().includes("inactive"));
    assert.equal(EXCIPIENT_LIBRARY["exc-lactose"]?.name, "Lactose");
  });

  it("explains lactose with patient vs pharmacist mode copy", () => {
    const patient = explainExcipient(lactose, "patient");
    const pharmacist = explainExcipient(lactose, "pharmacist");
    assert.ok(patient.plainLanguage.toLowerCase().includes("not the medicine"));
    assert.ok(pharmacist.plainLanguage.toLowerCase().includes("allergy"));
    assert.equal(patient.canBecomeActive, false);
    assert.ok(pharmacist.counsellingCue.length > 10);
  });

  it("does not invent clinical doses in unknown excipient fallback", () => {
    const e = explainExcipient(thinUnknown, "pharmacist");
    assert.match(e.plainLanguage, /Unknown filler/i);
    assert.ok(!/\d+\s*mg/i.test(e.plainLanguage));
    assert.ok(e.inactiveUntilNote.length > 0);
  });

  it("maps product excipient ids to explanations", () => {
    const result = explainProductExcipients({
      product,
      excipients: [
        lactose,
        { id: "exc-mg-stearate", name: "Magnesium stearate" },
      ],
      mode: "pharmacist",
    });
    assert.equal(result.brandName, "DemoTab");
    assert.equal(result.explanations.length, 2);
    assert.ok(result.explanations.every((x) => x.purpose.length > 0));
    assert.equal(result.emptyNote, undefined);
  });

  it("returns empty note when product has no linked excipients", () => {
    const result = explainProductExcipients({
      product: { ...product, excipientIds: [] },
      excipients: [lactose],
    });
    assert.equal(result.explanations.length, 0);
    assert.ok(result.emptyNote);
  });
});
