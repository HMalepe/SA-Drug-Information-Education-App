import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

/**
 * Founder/ops demo pages must not dump raw API JSON into status boxes.
 * Mirrors review-action-status + tools-clinical-panels guards.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const PAGES = [
  {
    file: "web/src/app/institution/page.tsx",
    formatter: "formatInstitutionMsg",
    setter: "setOut",
  },
  {
    file: "web/src/app/cpd/page.tsx",
    formatter: "formatCpdMsg",
    setter: "setMsg",
  },
  {
    file: "web/src/app/ambassador/page.tsx",
    formatter: "formatAmbassadorMsg",
    setter: "setOut",
  },
  {
    file: "web/src/app/pricing/page.tsx",
    formatter: "formatPricingMsg",
    setter: "setMsg",
  },
] as const;

describe("Ops pages status (no raw JSON dump)", () => {
  for (const page of PAGES) {
    it(`${page.file} uses ${page.formatter} instead of JSON.stringify dumps`, () => {
      const src = readFileSync(join(root, page.file), "utf8");
      assert.match(src, new RegExp(`function ${page.formatter}`));
      assert.match(src, new RegExp(`${page.setter}\\(${page.formatter}`));
      assert.doesNotMatch(src, new RegExp(`${page.setter}\\(JSON\\.stringify`));
      assert.doesNotMatch(src, /<pre[^>]*>\{?\s*JSON\.stringify/);
    });
  }

  it("CPD certificates render as a list, not JSON.stringify(certs)", () => {
    const src = readFileSync(join(root, "web/src/app/cpd/page.tsx"), "utf8");
    assert.doesNotMatch(src, /JSON\.stringify\(certs/);
    assert.match(src, /certs\.map/);
  });

  it("my-meds reminders use formatRemindersMsg (no setOut JSON dump)", () => {
    const src = readFileSync(join(root, "web/src/app/my-meds/page.tsx"), "utf8");
    assert.match(src, /function formatRemindersMsg/);
    assert.match(src, /setReminderStatus\(formatRemindersMsg/);
    assert.doesNotMatch(src, /setOut\(JSON\.stringify/);
    assert.doesNotMatch(src, /exportText \?\? JSON\.stringify/);
  });

  it("onboarding uses formatOnboardingError (no setMsg JSON dump)", () => {
    const src = readFileSync(join(root, "web/src/app/onboarding/page.tsx"), "utf8");
    assert.match(src, /function formatOnboardingError/);
    assert.match(src, /setMsg\(formatOnboardingError/);
    assert.doesNotMatch(src, /setMsg\(JSON\.stringify/);
  });

  it("insights renders tables/lists — no JSON.stringify dumps in <pre>", () => {
    const src = readFileSync(join(root, "web/src/app/insights/page.tsx"), "utf8");
    assert.match(src, /function LearningCurveTable/);
    assert.match(src, /function MasteryTable/);
    assert.match(src, /function MoleculeViewsList/);
    assert.match(src, /function ToolUsesList/);
    assert.match(src, /function EventCountsList/);
    assert.doesNotMatch(src, /<pre[^>]*>[\s\S]*JSON\.stringify/);
    assert.doesNotMatch(src, /JSON\.stringify\(personal\./);
    assert.doesNotMatch(src, /JSON\.stringify\(summary\./);
  });
});
