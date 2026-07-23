import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  appendSymptomLog,
  buildSymptomSummary,
  createSymptomLog,
  detectCoOccurrences,
} from "@materia/shared";

describe("v36 symptom tracking §6", () => {
  it("creates capped logs and rejects dosing language in notes", () => {
    const ok = createSymptomLog({
      userId: "u1",
      at: "2026-07-20",
      label: "  nausea  ",
      severity: 2,
      moleculeId: "mol-amox",
      moleculeName: "Amoxicillin",
    });
    assert.equal(ok.ok, true);
    if (ok.ok) assert.equal(ok.entry.label, "nausea");

    const bad = createSymptomLog({
      userId: "u1",
      at: "2026-07-20",
      label: "pain",
      severity: 3,
      note: "I will stop the dose tomorrow",
    });
    assert.equal(bad.ok, false);
  });

  it("summarises co-occurrences without claiming causality", () => {
    const a = createSymptomLog({
      userId: "u1",
      at: "2026-07-18",
      label: "rash",
      severity: 3,
      moleculeId: "mol-amox",
      moleculeName: "Amoxicillin",
      id: "s1",
    });
    const b = createSymptomLog({
      userId: "u1",
      at: "2026-07-19",
      label: "rash",
      severity: 2,
      moleculeId: "mol-amox",
      moleculeName: "Amoxicillin",
      id: "s2",
    });
    assert.equal(a.ok && b.ok, true);
    if (!a.ok || !b.ok) return;
    let entries = appendSymptomLog([], a.entry);
    assert.equal(entries.ok, true);
    if (!entries.ok) return;
    entries = appendSymptomLog(entries.entries, b.entry);
    assert.equal(entries.ok, true);
    if (!entries.ok) return;

    const co = detectCoOccurrences(entries.entries);
    assert.equal(co[0]?.count, 2);
    assert.match(co[0]?.note ?? "", /not proof/i);

    const summary = buildSymptomSummary({
      entries: entries.entries,
      regimen: [{ moleculeId: "mol-amox", moleculeName: "Amoxicillin", reminderTimes: ["08:00"] }],
    });
    assert.match(summary.exportText, /patient-authored/i);
    assert.match(summary.disclaimer, /does not diagnose/i);
    assert.match(summary.exportText, /rash/);
  });
});
