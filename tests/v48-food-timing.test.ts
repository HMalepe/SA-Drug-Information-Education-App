import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  FOOD_TIMING_LIBRARY,
  buildFoodTimingCues,
  classifyFoodLifestyleText,
  enrichReminderBody,
  type SafetyProfile,
} from "@materia/shared";

const safety: SafetyProfile[] = [
  {
    id: "safe-amox",
    moleculeId: "mol-amox",
    publishState: "published",
    foodLifestyle: {
      value: "May be taken with food if stomach upset occurs; complete the prescribed course unless a clinician advises otherwise.",
      sourceId: "src-materia-edu",
      publishState: "published",
      lastReviewed: "2026-07-01",
    },
  },
];

describe("v48 food timing cues §6", () => {
  it("classifies published counselling themes without inventing hours", () => {
    assert.ok(classifyFoodLifestyleText("Take on an empty stomach before breakfast").includes("empty_stomach"));
    assert.ok(classifyFoodLifestyleText("Avoid dairy and antacids nearby").includes("separate_dairy_or_minerals"));
    assert.ok(classifyFoodLifestyleText("Do not drink alcohol with this course").includes("alcohol_caution"));
    assert.doesNotMatch(classifyFoodLifestyleText("with food").join(","), /\d+\s*hour/i);
  });

  it("builds regimen cues from seed + library and enriches reminders", () => {
    const report = buildFoodTimingCues({
      regimen: [
        { moleculeId: "mol-amox", moleculeName: "Amoxicillin", brandName: "Amoxil", reminderTimes: ["08:00"] },
        { moleculeId: "mol-doxy", moleculeName: "Doxycycline", reminderTimes: ["09:00"] },
        { moleculeId: "mol-unknown", moleculeName: "Unknown", reminderTimes: [] },
      ],
      safetyProfiles: safety,
    });
    assert.equal(report.cues.length, 2);
    assert.ok(report.cues.some((c) => c.moleculeId === "mol-amox" && c.tags.includes("with_food")));
    const doxy = report.cues.find((c) => c.moleculeId === "mol-doxy");
    assert.ok(doxy);
    assert.ok(doxy!.tags.includes("separate_dairy_or_minerals"));
    assert.doesNotMatch(doxy!.publishedNote, /\d+\s*mg/i);
    assert.doesNotMatch(doxy!.reminderHint, /\d+\s*hour/i);
    assert.equal(report.missingPublishedNote.some((m) => m.moleculeId === "mol-unknown"), true);
    assert.ok(FOOD_TIMING_LIBRARY.some((x) => x.moleculeId === "mol-metro"));

    const enriched = enrichReminderBody("Materia reminder: time for Doxycycline.", doxy);
    assert.match(enriched, /dairy|mineral/i);
  });
});
