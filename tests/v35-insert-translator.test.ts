import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  availableInsertLevels,
  findInsertDocument,
  translateInsert,
  type InsertDocument,
} from "@materia/shared";

const doc: InsertDocument = {
  id: "insert-x",
  moleculeId: "mol-x",
  moleculeSlug: "demo",
  passages: [
    {
      level: "professional",
      title: "Pro",
      body: "Professional wording about beta-lactam counselling.",
      publishState: "published",
      sourceId: "src-edu",
      lastReviewed: "2026-07-01",
    },
    {
      level: "grade5",
      title: "Plain",
      body: "Simple wording about allergy and finishing the course.",
      publishState: "draft",
      sourceId: "src-edu",
      lastReviewed: "2026-07-01",
    },
  ],
};

describe("v35 insert translator §9", () => {
  it("finds documents by slug and lists published levels only", () => {
    assert.equal(findInsertDocument({ moleculeSlug: "demo" }, [doc])?.id, "insert-x");
    assert.deepEqual(availableInsertLevels(doc), ["professional"]);
  });

  it("returns professional when published and refuses unpublished grade5", () => {
    const pro = translateInsert({ document: doc, level: "professional" });
    assert.equal(pro.status, "ok");
    assert.match(pro.body ?? "", /beta-lactam/i);

    const plain = translateInsert({ document: doc, level: "grade5" });
    assert.equal(plain.status, "unavailable");
    assert.match(plain.message, /will not invent|auto-invented|No published/i);
  });

  it("never invents a document when library miss", () => {
    const r = translateInsert({ document: null, level: "grade5" });
    assert.equal(r.status, "unavailable");
    assert.match(r.message, /will not invent/i);
  });
});
