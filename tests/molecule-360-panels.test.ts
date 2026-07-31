import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { MEDICINE_360_TABS } from "@materia/shared";

/**
 * Medicine 360 must never dump clinical tab bodies as raw JSON (constitution 3.1–3.2).
 * Expo already uses a muted empty fallback; web must match, and every known tab id
 * needs an explicit panel branch.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const webTabs = join(root, "web/src/components/MoleculeTabs.tsx");
const expoTabs = join(root, "app/lib/MoleculeTabBody.tsx");

describe("Medicine 360 tab panels — no clinical JSON dump", () => {
  it("web MoleculeTabs never JSON.stringifys tab.body", () => {
    const src = readFileSync(webTabs, "utf8");
    assert.doesNotMatch(src, /JSON\.stringify\(\s*tab\.body/);
  });

  it("Expo MoleculeTabBody never JSON.stringifys clinical bodies", () => {
    const src = readFileSync(expoTabs, "utf8");
    assert.doesNotMatch(src, /JSON\.stringify\(/);
  });

  it("every MEDICINE_360_TABS id has an explicit web panel branch", () => {
    const src = readFileSync(webTabs, "utf8");
    for (const tab of MEDICINE_360_TABS) {
      if (
        tab.id === "contraindications" ||
        tab.id === "warnings" ||
        tab.id === "pearls" ||
        tab.id === "counselling"
      ) {
        assert.match(src, /isSourcedListTab/, `list tab ${tab.id} needs SourcedListPanel`);
        continue;
      }
      const needle = new RegExp(`active === ["']${tab.id}["']`);
      assert.match(src, needle, `missing web panel branch for tab ${tab.id}`);
    }
  });

  it("every MEDICINE_360_TABS id has an explicit Expo panel branch", () => {
    const src = readFileSync(expoTabs, "utf8");
    for (const tab of MEDICINE_360_TABS) {
      if (
        tab.id === "contraindications" ||
        tab.id === "warnings" ||
        tab.id === "pearls" ||
        tab.id === "counselling"
      ) {
        const explicit = new RegExp(`tabId === ["']${tab.id}["']`);
        const listHelper = /SourcedList|contraindications|warnings|pearls|counselling/;
        assert.ok(
          explicit.test(src) || listHelper.test(src),
          `missing Expo panel for tab ${tab.id}`,
        );
        continue;
      }
      const needle = new RegExp(`tabId === ["']${tab.id}["']`);
      assert.match(src, needle, `missing Expo panel branch for tab ${tab.id}`);
    }
  });

  it("Expo dosing hub never JSON.stringifys clinical bodies or calculator results", () => {
    const src = readFileSync(join(root, "app/app/dosing/[slug].tsx"), "utf8");
    assert.doesNotMatch(src, /JSON\.stringify\(/);
    assert.match(src, /MoleculeTabBody/);
    assert.match(src, /DoseCalcResultPanel|working/);
    assert.match(src, /suggestedDoseDisplay/);
    assert.match(src, /disclaimer/);
  });
});
