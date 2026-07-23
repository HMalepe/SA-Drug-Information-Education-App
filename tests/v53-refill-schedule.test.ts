import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildRefillBoard,
  classifyRefillStatus,
  isIsoDate,
  resolveRefillDueOn,
  type PriceRecord,
  type Product,
  type RegimenItem,
} from "@materia/shared";

const products: Product[] = [
  {
    id: "prod-amoxil",
    moleculeId: "mol-amox",
    manufacturerId: "m1",
    brandName: "Amoxil",
    strength: "500 mg",
    form: "capsule",
    schedule: "S4",
    isOriginator: true,
    isDiscontinued: false,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
  {
    id: "prod-aspen",
    moleculeId: "mol-amox",
    manufacturerId: "m2",
    brandName: "Amoxicillin Aspen",
    strength: "500 mg",
    form: "capsule",
    schedule: "S4",
    isOriginator: false,
    isDiscontinued: false,
    bioequivalentFlag: true,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
];

const prices: PriceRecord[] = [
  {
    id: "p1",
    productId: "prod-amoxil",
    sepZar: 89.95,
    effectiveDate: "2026-07-01",
    sourceId: "src-sep",
    publishState: "published",
  },
  {
    id: "p2",
    productId: "prod-aspen",
    sepZar: 52.4,
    effectiveDate: "2026-07-01",
    sourceId: "src-sep",
    publishState: "published",
  },
];

describe("v53 companion refill dates §6", () => {
  it("validates ISO dates and never invents a due date without user fields", () => {
    assert.equal(isIsoDate("2026-07-23"), true);
    assert.equal(isIsoDate("2026-02-30"), false);
    const bare: RegimenItem = {
      moleculeId: "mol-amox",
      moleculeName: "Amoxicillin",
      reminderTimes: [],
    };
    assert.equal(resolveRefillDueOn(bare), null);
    assert.equal(resolveRefillDueOn({ ...bare, refillDueOn: "2026-08-01" }), "2026-08-01");
  });

  it("computes due date only from user lastFilled + packDays (calendar arithmetic)", () => {
    const base: RegimenItem = {
      moleculeId: "mol-amox",
      moleculeName: "Amoxicillin",
      reminderTimes: [],
      lastFilledOn: "2026-07-01",
      packDaysUser: 28,
    };
    assert.equal(resolveRefillDueOn(base), "2026-07-29");
    assert.equal(resolveRefillDueOn({ ...base, packDaysUser: 0 }), null);
  });

  it("classifies status from user dates without inventing clinical supply", () => {
    assert.equal(classifyRefillStatus(null, "2026-07-23").status, "unset");
    assert.equal(classifyRefillStatus("2026-07-20", "2026-07-23").status, "overdue");
    assert.equal(classifyRefillStatus("2026-07-23", "2026-07-23").status, "due_today");
    assert.equal(classifyRefillStatus("2026-07-26", "2026-07-23").status, "due_soon");
    assert.equal(classifyRefillStatus("2026-08-20", "2026-07-23").status, "upcoming");
  });

  it("builds a refill board and attaches published SEP prompt only when due window hits", () => {
    const board = buildRefillBoard({
      asOf: "2026-07-23",
      products,
      prices,
      regimen: [
        {
          moleculeId: "mol-amox",
          moleculeName: "Amoxicillin",
          brandName: "Amoxil",
          reminderTimes: ["08:00"],
          refillDueOn: "2026-07-25",
        },
        {
          moleculeId: "mol-doxy",
          moleculeName: "Doxycycline",
          reminderTimes: ["09:00"],
        },
      ],
    });
    assert.equal(board.dueCount, 1);
    assert.equal(board.unsetCount, 1);
    const amox = board.rows.find((r) => r.moleculeId === "mol-amox");
    assert.ok(amox);
    assert.equal(amox!.status, "due_soon");
    assert.ok(amox!.sepPrompt);
    assert.match(amox!.sepPrompt!, /SEP|bioequivalent|pharmacist/i);
    assert.doesNotMatch(amox!.sepPrompt!, /\b\d+\s*mg\b/i);
    const doxy = board.rows.find((r) => r.moleculeId === "mol-doxy");
    assert.equal(doxy!.status, "unset");
    assert.equal(doxy!.sepPrompt, null);
    assert.match(board.disclaimer, /does not invent/i);
  });
});
