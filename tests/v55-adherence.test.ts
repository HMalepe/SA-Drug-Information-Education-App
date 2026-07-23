import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  appendAdherenceEvent,
  buildAdherenceReport,
  createAdherenceEvent,
  expectedSlotKeys,
  type RegimenItem,
} from "@materia/shared";

const regimen: RegimenItem[] = [
  {
    moleculeId: "mol-amox",
    moleculeName: "Amoxicillin",
    brandName: "Amoxil",
    reminderTimes: ["08:00", "20:00"],
  },
];

describe("v55 companion adherence streaks §6", () => {
  it("lists expected slots and rejects invented reminder times", () => {
    assert.deepEqual(expectedSlotKeys(regimen), ["mol-amox|08:00", "mol-amox|20:00"]);
    const made = createAdherenceEvent({
      userId: "u1",
      moleculeId: "mol-amox",
      moleculeName: "Amoxicillin",
      scheduledTime: "08:00",
      onDate: "2026-07-21",
      status: "taken",
      loggedAt: "2026-07-21T08:05:00.000Z",
    });
    assert.equal(made.ok, true);
    if (!made.ok) return;
    const bad = appendAdherenceEvent([], { ...made.event, scheduledTime: "12:00" }, regimen);
    assert.equal(bad.ok, false);
  });

  it("computes current and best streaks from complete taken days only", () => {
    const events = [];
    for (const date of ["2026-07-20", "2026-07-21", "2026-07-22"]) {
      for (const t of ["08:00", "20:00"]) {
        const made = createAdherenceEvent({
          userId: "u1",
          moleculeId: "mol-amox",
          moleculeName: "Amoxicillin",
          scheduledTime: t,
          onDate: date,
          status: "taken",
          loggedAt: `${date}T${t}:00.000Z`,
          id: `e-${date}-${t}`,
        });
        assert.equal(made.ok, true);
        if (made.ok) events.push(made.event);
      }
    }
    // Break on 23rd: only morning taken
    const partial = createAdherenceEvent({
      userId: "u1",
      moleculeId: "mol-amox",
      moleculeName: "Amoxicillin",
      scheduledTime: "08:00",
      onDate: "2026-07-23",
      status: "taken",
      loggedAt: "2026-07-23T08:00:00.000Z",
      id: "partial",
    });
    assert.equal(partial.ok, true);
    if (partial.ok) events.push(partial.event);

    const report = buildAdherenceReport({
      regimen,
      events,
      asOf: "2026-07-23",
      lookbackDays: 7,
    });
    assert.equal(report.currentStreakDays, 0);
    assert.equal(report.bestStreakDays, 3);
    assert.equal(report.takenLast7Days, 7);
    assert.match(report.disclaimer, /never invents a dose/i);
    assert.doesNotMatch(JSON.stringify(report), /\b\d+\s*mg\b/i);
  });

  it("upserts the same slot/day and counts skipped without inventing clinical advice", () => {
    const first = createAdherenceEvent({
      userId: "u1",
      moleculeId: "mol-amox",
      moleculeName: "Amoxicillin",
      scheduledTime: "08:00",
      onDate: "2026-07-23",
      status: "skipped",
      id: "a",
    });
    assert.equal(first.ok, true);
    if (!first.ok) return;
    const next = createAdherenceEvent({
      userId: "u1",
      moleculeId: "mol-amox",
      moleculeName: "Amoxicillin",
      scheduledTime: "08:00",
      onDate: "2026-07-23",
      status: "taken",
      id: "b",
    });
    assert.equal(next.ok, true);
    if (!next.ok) return;
    let store: typeof first.event[] = [];
    const a1 = appendAdherenceEvent(store, first.event, regimen);
    assert.equal(a1.ok, true);
    if (!a1.ok) return;
    store = a1.events;
    const a2 = appendAdherenceEvent(store, next.event, regimen);
    assert.equal(a2.ok, true);
    if (!a2.ok) return;
    assert.equal(a2.events.length, 1);
    assert.equal(a2.events[0]?.status, "taken");
  });
});
