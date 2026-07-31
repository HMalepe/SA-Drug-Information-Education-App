import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildSourcedListItems, type Source, type SourcedFact } from "@materia/shared";

const edu: Source = {
  id: "src-materia-edu",
  citation: "Materia educational authoring",
  sourceType: "original_authoring",
  lastReviewed: "2026-07-01",
};

describe("buildSourcedListItems (360 list tabs)", () => {
  it("normalizes string and {text,level} published facts with sources", () => {
    const facts: Array<SourcedFact<unknown>> = [
      {
        value: { level: "red", text: "Hypersensitivity — do not use." },
        sourceId: "src-materia-edu",
        publishState: "published",
        lastReviewed: "2026-07-01",
      },
      {
        value: "Counsel on allergy history.",
        sourceId: "src-materia-edu",
        publishState: "published",
        lastReviewed: "2026-07-01",
      },
      {
        value: "Draft invent — must not render.",
        sourceId: "src-materia-edu",
        publishState: "draft",
        lastReviewed: "2026-07-01",
      },
    ];
    const { items, sources } = buildSourcedListItems(facts, (id) =>
      id === edu.id ? edu : undefined,
    );
    assert.equal(items.length, 2);
    assert.equal(items[0]!.level, "red");
    assert.match(items[0]!.text, /Hypersensitivity/);
    assert.match(items[1]!.text, /allergy history/);
    assert.equal(sources.length, 1);
    assert.equal(sources[0]!.id, "src-materia-edu");
  });

  it("skips facts with missing source registry entries", () => {
    const facts: Array<SourcedFact<unknown>> = [
      {
        value: "Orphan sourced text",
        sourceId: "src-missing",
        publishState: "published",
        lastReviewed: "2026-07-01",
      },
    ];
    const { items } = buildSourcedListItems(facts, () => undefined);
    assert.equal(items.length, 0);
  });
});
