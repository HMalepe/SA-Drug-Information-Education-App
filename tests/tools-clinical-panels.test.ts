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
    assert.match(src, /setDoseAdjust\(data\)|showClinicalPanel\("dose"/);
    assert.match(src, /publishedGuidance/);
    assert.match(src, /inventedAdjustedDose stays null/);
    const runFn = src.slice(src.indexOf("async function runDoseAdjustment"));
    const end = runFn.indexOf("async function runClashBoard");
    const body = runFn.slice(0, end);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /showClinicalPanel\("dose"|setDoseAdjust/);
  });

  it("clash board routes to ClashBoardPanel with tone-coded rows", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function ClashBoardPanel/);
    assert.match(src, /showClinicalPanel\("clash"/);
    assert.match(src, /view\.summary\.red/);
    assert.match(src, /view\.disclaimer/);
    const runFn = src.slice(src.indexOf("async function runClashBoard"));
    const end = runFn.indexOf("async function runCounselling");
    const body = runFn.slice(0, end > 0 ? end : undefined);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /showClinicalPanel\("clash"/);
  });

  it("counselling routes to CounsellingResultPanel with sourceNote", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function CounsellingResultPanel/);
    assert.match(src, /async function runCounselling/);
    assert.match(src, /script\.sourceNote|sourceNote/);
    const runFn = src.slice(src.indexOf("async function runCounselling"));
    const end = runFn.indexOf("async function runInsertTranslator");
    const body = runFn.slice(0, end);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /showClinicalPanel\("counselling"/);
  });

  it("insert translator routes to InsertResultPanel with source + disclaimer", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function InsertResultPanel/);
    assert.match(src, /result\.disclaimer/);
    const runFn = src.slice(src.indexOf("async function runInsertTranslator"));
    const end = runFn.indexOf("async function runMonograph");
    const body = runFn.slice(0, end);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /showClinicalPanel\("insert"/);
  });

  it("monograph routes to MonographResultPanel with sections + disclaimer", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function MonographResultPanel/);
    assert.match(src, /omittedDraftTabs/);
    assert.match(src, /async function runMonograph/);
    const runFn = src.slice(src.indexOf("async function runMonograph"));
    const end = runFn.indexOf("async function runHandout");
    const body = runFn.slice(0, end > 0 ? end : undefined);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /showClinicalPanel\("monograph"/);
  });

  it("handout routes to HandoutResultPanel with lines + disclaimer", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function HandoutResultPanel/);
    assert.match(src, /async function runHandout/);
    assert.match(src, /result\.sourceNote|sourceNote/);
    const runFn = src.slice(src.indexOf("async function runHandout"));
    const end = runFn.indexOf("async function speakVoice");
    const body = runFn.slice(0, end);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /showClinicalPanel\("handout"/);
  });

  it("voice routes to VoiceResultPanel (text + note), not showRaw JSON", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function VoiceResultPanel/);
    const runFn = src.slice(src.indexOf("async function speakVoice"));
    const end = runFn.indexOf("\n  return (");
    const body = runFn.slice(0, end > 0 ? end : undefined);
    assert.doesNotMatch(body, /showRaw\(/);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /showClinicalPanel\("voice"/);
  });

  it("locum brief routes to LocumResultPanel with counselling + disclaimer", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function LocumResultPanel/);
    assert.match(src, /async function runLocum/);
    assert.match(src, /counsellingLines/);
    const runFn = src.slice(src.indexOf("async function runLocum"));
    const end = runFn.indexOf("async function runColdChain");
    const body = runFn.slice(0, end);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /showClinicalPanel\("locum"/);
  });

  it("cold-chain routes to ColdChainResultPanel with sourceNote", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function ColdChainResultPanel/);
    assert.match(src, /async function runColdChain/);
    const runFn = src.slice(src.indexOf("async function runColdChain"));
    const end = runFn.indexOf("async function runSubstitution");
    const body = runFn.slice(0, end > 0 ? end : undefined);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.match(body, /showClinicalPanel\("coldchain"/);
  });

  it("substitution routes to SubstitutionResultPanel (SEP never R0 when missing)", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function SubstitutionResultPanel/);
    assert.match(src, /async function runSubstitution/);
    assert.match(src, /formatPublishedZar/);
    assert.match(src, /not yet published/);
    const runFn = src.slice(src.indexOf("async function runSubstitution"));
    const end = runFn.indexOf("async function runFormulary");
    const body = runFn.slice(0, end > 0 ? end : undefined);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.doesNotMatch(body, /showRaw\(/);
    assert.match(body, /showClinicalPanel\("substitution"/);
  });

  it("formulary routes to FormularyResultPanel with disclaimer", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function FormularyResultPanel/);
    assert.match(src, /async function runFormulary/);
    assert.match(src, /result\.disclaimer/);
    const runFn = src.slice(src.indexOf("async function runFormulary"));
    const end = runFn.indexOf("async function runAvailability");
    const body = runFn.slice(0, end > 0 ? end : undefined);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.doesNotMatch(body, /showRaw\(/);
    assert.match(body, /showClinicalPanel\("formulary"/);
  });

  it("availability routes to AvailabilityResultPanel (empty ≠ reassuring)", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function AvailabilityResultPanel/);
    assert.match(src, /async function runAvailability/);
    assert.match(src, /empty ≠ reassuring|empty !== reassuring|empty ≠/);
    const runFn = src.slice(src.indexOf("async function runAvailability"));
    const end = runFn.indexOf("async function runShortages");
    const body = runFn.slice(0, end > 0 ? end : undefined);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.doesNotMatch(body, /showRaw\(/);
    assert.match(body, /showClinicalPanel\("availability"/);
  });

  it("shortages routes to ShortagesResultPanel with API note", () => {
    const src = readFileSync(toolsPage, "utf8");
    assert.match(src, /function ShortagesResultPanel/);
    assert.match(src, /async function runShortages/);
    assert.match(src, /AvailabilityRowList/);
    const runFn = src.slice(src.indexOf("async function runShortages"));
    const end = runFn.indexOf("async function speakVoice");
    const body = runFn.slice(0, end > 0 ? end : undefined);
    assert.doesNotMatch(body, /setOut\(JSON\.stringify/);
    assert.doesNotMatch(body, /showRaw\(/);
    assert.match(body, /showClinicalPanel\("shortages"/);
  });
});
