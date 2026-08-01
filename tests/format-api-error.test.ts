import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  formatApiError,
  messageFromHttpErrorBody,
} from "@materia/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("formatApiError (shared)", () => {
  it("prefers string / message / error / code over dumping objects", () => {
    assert.equal(formatApiError("seat full"), "seat full");
    assert.equal(formatApiError({ message: "bad token" }), "bad token");
    assert.equal(formatApiError({ error: "forbidden" }), "forbidden");
    assert.equal(formatApiError({ code: "RATE_LIMIT" }), "RATE_LIMIT");
    assert.equal(formatApiError({ nested: { a: 1 } }), "Request failed");
    assert.equal(formatApiError(null, "gone"), "gone");
  });

  it("messageFromHttpErrorBody parses JSON error bodies without dumping", () => {
    assert.equal(
      messageFromHttpErrorBody('{"error":"seat full"}'),
      "seat full",
    );
    assert.equal(
      messageFromHttpErrorBody('{"message":"gone"}'),
      "gone",
    );
    assert.equal(messageFromHttpErrorBody("plain failure"), "plain failure");
    assert.equal(
      messageFromHttpErrorBody('{"nested":{"x":1}}', "fallback"),
      "fallback",
    );
    assert.equal(
      messageFromHttpErrorBody("x".repeat(400), "too long"),
      "too long",
    );
  });

  it("canonical helper lives in shared; web re-exports", () => {
    const shared = readFileSync(
      join(root, "packages/shared/src/formatApiError.ts"),
      "utf8",
    );
    assert.match(shared, /export function formatApiError/);
    assert.match(shared, /export function messageFromHttpErrorBody/);
    assert.doesNotMatch(shared, /JSON\.stringify/);

    const web = readFileSync(join(root, "web/src/lib/formatApiError.ts"), "utf8");
    assert.match(web, /from "@materia\/shared"/);
    assert.doesNotMatch(web, /function formatApiError/);
  });

  it("Expo api client uses messageFromHttpErrorBody (no raw res.text throw)", () => {
    const src = readFileSync(join(root, "app/lib/api.ts"), "utf8");
    assert.match(src, /messageFromHttpErrorBody/);
    assert.doesNotMatch(src, /throw new Error\(\s*text\s*\|\|/);
  });

  it("ops/review/onboarding import formatApiError (no JSON.stringify of errors)", () => {
    const files = [
      "web/src/app/institution/page.tsx",
      "web/src/app/cpd/page.tsx",
      "web/src/app/ambassador/page.tsx",
      "web/src/app/pricing/page.tsx",
      "web/src/app/review/page.tsx",
      "web/src/app/onboarding/page.tsx",
    ];
    for (const f of files) {
      const src = readFileSync(join(root, f), "utf8");
      assert.match(src, /formatApiError/, `${f} should import/use formatApiError`);
      assert.doesNotMatch(
        src,
        /JSON\.stringify\([^)]*error/,
        `${f} must not JSON.stringify errors into the UI`,
      );
    }
  });

  it("learn/notes/companion surfaces use formatApiError (no String(data.error))", () => {
    const files = [
      "web/src/app/my-meds/page.tsx",
      "web/src/app/insights/page.tsx",
      "web/src/app/pearls/page.tsx",
      "web/src/app/notes/page.tsx",
      "web/src/app/learn/mystery/page.tsx",
      "web/src/app/learn/spot-error/page.tsx",
      "web/src/app/learn/match/page.tsx",
      "web/src/app/learn/drag-drop/page.tsx",
      "web/src/app/learn/packaging/page.tsx",
      "web/src/app/learn/build-treatment/page.tsx",
      "web/src/app/learn/badges/page.tsx",
      "web/src/app/learn/adaptive/page.tsx",
      "web/src/app/learn/leaderboard/page.tsx",
      "web/src/app/learn/review/page.tsx",
      "web/src/components/CoursePlayer.tsx",
    ];
    for (const f of files) {
      const src = readFileSync(join(root, f), "utf8");
      assert.match(src, /formatApiError/, `${f} should use formatApiError`);
      assert.doesNotMatch(src, /String\(\s*data\.error/, `${f} must not String(data.error)`);
    }
  });

  it("my-meds symptom export handles !res.ok via messageFromHttpErrorBody", () => {
    const src = readFileSync(join(root, "web/src/app/my-meds/page.tsx"), "utf8");
    assert.match(src, /messageFromHttpErrorBody/);
    assert.match(src, /Could not export symptoms/);
  });
});
