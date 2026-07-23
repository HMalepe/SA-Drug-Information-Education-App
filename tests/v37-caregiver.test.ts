import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  addDependantProfile,
  CAREGIVER_DISCLAIMER,
  companionScopeKey,
  createDependantProfile,
  deactivateDependant,
  listActiveDependants,
} from "@materia/shared";

describe("v37 caregiver / dependant profiles §6", () => {
  it("creates POPIA-minimised profiles and blocks ID-like names", () => {
    const ok = createDependantProfile({
      caregiverUserId: "u1",
      displayName: "  Mama Thandi  ",
      relation: "parent",
      birthYear: 1952,
    });
    assert.equal(ok.ok, true);
    if (ok.ok) assert.equal(ok.profile.displayName, "Mama Thandi");

    const bad = createDependantProfile({
      caregiverUserId: "u1",
      displayName: "ID number 9001015800088",
      relation: "child",
    });
    assert.equal(bad.ok, false);
  });

  it("lists, scopes keys, and deactivates", () => {
    const a = createDependantProfile({
      caregiverUserId: "u1",
      displayName: "Child A",
      relation: "child",
      id: "dep-a",
    });
    const b = createDependantProfile({
      caregiverUserId: "u1",
      displayName: "Parent B",
      relation: "parent",
      id: "dep-b",
    });
    assert.equal(a.ok && b.ok, true);
    if (!a.ok || !b.ok) return;

    let list = addDependantProfile([], a.profile);
    assert.equal(list.ok, true);
    if (!list.ok) return;
    list = addDependantProfile(list.profiles, b.profile);
    assert.equal(list.ok, true);
    if (!list.ok) return;

    assert.equal(listActiveDependants(list.profiles, "u1").length, 2);
    assert.equal(companionScopeKey("u1"), "u1");
    assert.equal(companionScopeKey("u1", "dep-a"), "u1::dep-a");

    const off = deactivateDependant(list.profiles, "u1", "dep-a");
    assert.equal(off.ok, true);
    if (!off.ok) return;
    assert.equal(listActiveDependants(off.profiles, "u1").length, 1);
    assert.match(CAREGIVER_DISCLAIMER, /does not prescribe/i);
  });
});
