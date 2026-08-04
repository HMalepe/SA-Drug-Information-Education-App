import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("Pro demo busy gates", () => {
  it("pearls/cpd/notes use busy state and disabled={busy}", () => {
    const files = [
      "web/src/app/pearls/page.tsx",
      "web/src/app/cpd/page.tsx",
      "web/src/app/notes/page.tsx",
    ];
    for (const rel of files) {
      const src = readFileSync(join(root, rel), "utf8");
      assert.match(src, /const \[busy, setBusy\]/, `${rel} should declare busy`);
      assert.match(src, /if \(busy\) return/, `${rel} should early-return when busy`);
      assert.match(src, /disabled=\{busy\}/, `${rel} should disable controls while busy`);
      assert.match(src, /finally \{\s*setBusy\(false\)/, `${rel} should clear busy in finally`);
    }
  });

  it("pearls loadFeed handles !res.ok beyond 402", () => {
    const src = readFileSync(join(root, "web/src/app/pearls/page.tsx"), "utf8");
    assert.match(src, /res\.status === 402/);
    assert.match(src, /!res\.ok/);
    assert.match(src, /formatApiError/);
  });

  it("ops demos (ambassador/institution/pricing) use busy gates", () => {
    const files = [
      "web/src/app/ambassador/page.tsx",
      "web/src/app/institution/page.tsx",
      "web/src/app/pricing/page.tsx",
    ];
    for (const rel of files) {
      const src = readFileSync(join(root, rel), "utf8");
      assert.match(src, /const \[busy, setBusy\]/, `${rel} should declare busy`);
      assert.match(src, /if \(busy\) return/, `${rel} should early-return when busy`);
      assert.match(src, /disabled=\{busy\}/, `${rel} should disable controls while busy`);
      assert.match(src, /finally \{\s*setBusy\(false\)/, `${rel} should clear busy in finally`);
    }
  });

  it("Academy learn demos with ensureStudent use busy gates", () => {
    const learnDir = join(root, "web/src/app/learn");
    const dirs = readdirSync(learnDir, { withFileTypes: true }).filter((d) => d.isDirectory());
    const wired: string[] = [];
    for (const d of dirs) {
      let src: string;
      try {
        src = readFileSync(join(learnDir, d.name, "page.tsx"), "utf8");
      } catch {
        continue;
      }
      if (!src.includes("ensureStudent")) continue;
      assert.match(src, /const \[busy, setBusy\]/, `${d.name} should declare busy`);
      assert.match(src, /busy\) return/, `${d.name} should early-return when busy`);
      assert.match(src, /disabled=\{busy/, `${d.name} should disable controls while busy`);
      assert.match(src, /finally \{\s*setBusy\(false\)/, `${d.name} should clear busy in finally`);
      wired.push(d.name);
    }
    assert.ok(wired.length >= 10, `expected ≥10 learn demos busy-gated, got ${wired.join(",")}`);
  });

  it("insights + onboarding use busy gates", () => {
    for (const rel of ["web/src/app/insights/page.tsx", "web/src/app/onboarding/page.tsx"]) {
      const src = readFileSync(join(root, rel), "utf8");
      assert.match(src, /const \[busy, setBusy\]/, `${rel} should declare busy`);
      assert.match(src, /if \(busy\) return/, `${rel} should early-return when busy`);
      assert.match(src, /disabled=\{busy\}/, `${rel} should disable controls while busy`);
      assert.match(src, /finally \{\s*setBusy\(false\)/, `${rel} should clear busy in finally`);
    }
    const insights = readFileSync(join(root, "web/src/app/insights/page.tsx"), "utf8");
    assert.match(insights, /!res\.ok/);
    assert.match(insights, /formatApiError/);
  });

  it("my-meds uses runBusy helper and disabled={busy}", () => {
    const src = readFileSync(join(root, "web/src/app/my-meds/page.tsx"), "utf8");
    assert.match(src, /const \[busy, setBusy\]/);
    assert.match(src, /async function runBusy/);
    assert.match(src, /if \(busy\) return/);
    assert.match(src, /finally \{\s*setBusy\(false\)/);
    assert.match(src, /disabled=\{busy\}/);
    const busyButtons = src.match(/disabled=\{busy\}/g) ?? [];
    assert.ok(busyButtons.length >= 12, `expected ≥12 busy-disabled controls, got ${busyButtons.length}`);
  });

  it("Pro tools page uses runBusy and disabled={busy}", () => {
    const src = readFileSync(join(root, "web/src/app/tools/page.tsx"), "utf8");
    assert.match(src, /const \[busy, setBusy\]/);
    assert.match(src, /async function runBusy/);
    assert.match(src, /if \(busy\) return/);
    assert.match(src, /finally \{\s*setBusy\(false\)/);
    assert.match(src, /disabled=\{busy\}/);
    const wrapped = [
      "cacheOffline",
      "resolveVision",
      "runDoseAdjustment",
      "runClashBoard",
      "runCounselling",
      "speakVoice",
    ];
    for (const name of wrapped) {
      assert.match(src, new RegExp(`async function ${name}[\\s\\S]*?await runBusy`), `${name} wrapped`);
    }
    const busyButtons = src.match(/disabled=\{busy\}/g) ?? [];
    assert.ok(busyButtons.length >= 15, `expected ≥15 busy-disabled controls, got ${busyButtons.length}`);
  });

  it("founder /review uses runBusy and disables write/copy controls", () => {
    const src = readFileSync(join(root, "web/src/app/review/page.tsx"), "utf8");
    assert.match(src, /const \[busy, setBusy\]/);
    assert.match(src, /async function runBusy/);
    assert.match(src, /if \(busy\) return/);
    assert.match(src, /finally \{\s*setBusy\(false\)/);
    for (const name of ["decide", "decideStg", "publishStgBatch", "copyStgCli", "copyPlaceholderCli"]) {
      assert.match(src, new RegExp(`async function ${name}[\\s\\S]*?await runBusy`), `${name} wrapped`);
    }
    assert.match(src, /disabled=\{busy \|\| numericBlocked\}/);
    assert.match(src, /disabled=\{busy \|\| stgEligibleForFilter === 0 \|\| stgBlockedForFilter > 0\}/);
    const busyDisabled = src.match(/disabled=\{busy(?:\s*\|\|[^}]+)?\}/g) ?? [];
    assert.ok(busyDisabled.length >= 18, `expected ≥18 busy-disabled controls, got ${busyDisabled.length}`);
  });
});
