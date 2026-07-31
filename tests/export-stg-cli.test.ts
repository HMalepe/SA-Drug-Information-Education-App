import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  exportEligibleStgCli,
  flattenStgEligibleItems,
} from "@materia/shared";

describe("exportEligibleStgCli", () => {
  it("emits publish-stg lines without --write and reports blocked skips", () => {
    const exported = exportEligibleStgCli({
      scope: "A",
      eligible: [
        { extractId: "stg-atropine-batcha-pointer" },
        { extractId: "stg-activated-charcoal-batcha-pointer" },
      ],
      blockedCount: 1,
      attestation: 'I confirm "sourced" STG',
    });
    assert.equal(exported.count, 2);
    assert.equal(exported.skippedBlocked, 1);
    assert.ok(exported.lines.every((l) => !l.includes("--write")));
    assert.ok(exported.lines.every((l) => /publish-stg stg-/.test(l)));
    assert.match(exported.lines[0]!, /sourced\\"/);
    assert.match(exported.note, /publish-stg-batch|publishState/i);
  });

  it("flattenStgEligibleItems concatenates batch eligible rows", () => {
    const flat = flattenStgEligibleItems([
      { eligible: [{ extractId: "a" }] },
      { eligible: [{ extractId: "b" }, { extractId: "c" }] },
    ]);
    assert.deepEqual(
      flat.map((e) => e.extractId),
      ["a", "b", "c"],
    );
  });
});
