import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

/**
 * Pro tools clinical surfaces (§8.5 dose-adjustment, §12 clash board) must not
 * dump results as JSON.stringify into the shared <pre> out box.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const toolsPage = join(root, "web/src/app/tools/page.tsx");

describe("Pro tools clinical result panels", () => {
  it("dose-adjustment routes to DoseAdjustResultPanel, not setOut(JSON)", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function DoseAdjustResultPanel/);
    assert.match(src, /setDoseAdjust\(data\)/);
    assert.match(src, /publishedGuidance/);
    assert.match(src, /inventedAdjustedDose stays null/);
    const runFn = src.slice(src.indexOf("async function runDoseAdjustment"));
    const end = runFn.indexOf("async function runClashBoard");
    const body = runFn.slice(0, end);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /setDoseAdjust/);
  });

  it("clash board routes to ClashBoardPanel with tone-coded rows", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function ClashBoardPanel/);
    assert.match(src, /setClashBoard\(data\)/);
    assert.match(src, /view\.summary\.red/);
    assert.match(src, /view\.disclaimer/);
    const runFn = src.slice(src.indexOf("async function runClashBoard"));
    const end = runFn.indexOf("async function runInsertTranslator");
    const body = runFn.slice(0, end);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /setClashBoard/);
  });
});
