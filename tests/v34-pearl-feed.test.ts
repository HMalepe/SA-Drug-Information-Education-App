import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildPearlFeed,
  collectPublishedPearls,
  dateKeyUtc,
  type Molecule,
  type SafetyProfile,
} from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-a",
    slug: "amoxicillin",
    innName: "Amoxicillin",
    className: "Penicillin",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-m",
    slug: "metformin",
    innName: "Metformin",
    className: "Biguanide",
    therapeuticArea: "diabetes",
    synonyms: [],
    publishState: "published",
  },
];

const safety: SafetyProfile[] = [
  {
    id: "saf-a",
    moleculeId: "mol-a",
    clinicalPearls: [
      {
        value: "Amoxicillin pearl — published fixture.",
        sourceId: "src-edu",
        publishState: "published",
        lastReviewed: "2026-07-01",
      },
      {
        value: "Draft pearl must not appear.",
        sourceId: "src-edu",
        publishState: "draft",
        lastReviewed: "2026-07-01",
      },
    ],
    contraindications: [],
    warnings: [],
    counsellingPoints: [],
    publishState: "published",
  },
  {
    id: "saf-m",
    moleculeId: "mol-m",
    clinicalPearls: [
      {
        value: "Metformin pearl — published fixture.",
        sourceId: "src-edu",
        publishState: "published",
        lastReviewed: "2026-07-01",
      },
    ],
    contraindications: [],
    warnings: [],
    counsellingPoints: [],
    publishState: "published",
  },
];

describe("v34 pearl feed §12", () => {
  it("collects only published pearls", () => {
    const catalog = collectPublishedPearls(molecules, safety);
    assert.equal(catalog.length, 2);
    assert.equal(
      catalog.some((c) => c.pearl.value.includes("Draft")),
      false,
    );
  });

  it("boosts specialty / weak areas without inventing text", () => {
    const catalog = collectPublishedPearls(molecules, safety);
    const feed = buildPearlFeed({
      catalog,
      specialtyAreas: ["diabetes"],
      weakAreas: [],
      dateKey: "2026-07-23",
      userKey: "u1",
      limit: 2,
    });
    assert.equal(feed.items[0]?.innName, "Metformin");
    assert.equal(feed.items[0]?.reason, "specialty");
    assert.match(feed.items[0]?.text ?? "", /Metformin pearl/);
    assert.match(feed.note, /never invents/i);
  });

  it("is stable for the same date + user", () => {
    const catalog = collectPublishedPearls(molecules, safety);
    const a = buildPearlFeed({ catalog, dateKey: "2026-07-23", userKey: "u1", limit: 5 });
    const b = buildPearlFeed({ catalog, dateKey: "2026-07-23", userKey: "u1", limit: 5 });
    assert.deepEqual(
      a.items.map((i) => i.id),
      b.items.map((i) => i.id),
    );
    assert.match(dateKeyUtc(new Date("2026-07-23T12:00:00Z")), /2026-07-23/);
  });
});
