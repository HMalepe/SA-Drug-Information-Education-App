import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getModeLens,
  isProfessionalDepthTab,
  modeContentDepth,
  parseUserMode,
} from "@materia/shared";

describe("v31 modes §5.7", () => {
  it("parses known modes and falls back safely", () => {
    assert.equal(parseUserMode("patient"), "patient");
    assert.equal(parseUserMode("PHARMACIST"), "pharmacist");
    assert.equal(parseUserMode("nope"), "pharmacist");
    assert.equal(parseUserMode(undefined, "patient"), "patient");
  });

  it("patient lens defaults to counselling and plain depth", () => {
    const lens = getModeLens("patient");
    assert.equal(lens.defaultTab, "counselling");
    assert.equal(lens.vocabulary, "plain");
    assert.equal(modeContentDepth("patient"), "plain");
    assert.ok(lens.framing.counselling.toLowerCase().includes("patient"));
    assert.equal(isProfessionalDepthTab("patient", "pearls"), true);
  });

  it("pharmacist lens defaults to dosing and clinical depth", () => {
    const lens = getModeLens("pharmacist");
    assert.equal(lens.defaultTab, "dosing");
    assert.equal(modeContentDepth("pharmacist"), "clinical");
    assert.ok(lens.framing.warnings.toLowerCase().includes("monitoring"));
    assert.equal(isProfessionalDepthTab("pharmacist", "pearls"), false);
  });

  it("student starts on mechanism; doctor on dosing", () => {
    assert.equal(getModeLens("student").defaultTab, "moa");
    assert.equal(getModeLens("doctor").defaultTab, "dosing");
    assert.equal(getModeLens("doctor").vocabulary, "prescriber");
  });
});
