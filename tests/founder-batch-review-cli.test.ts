import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cli = join(root, "content/pipeline/founder-batch-review.mjs");

function run(args: string[]) {
  return spawnSync(process.execPath, [cli, ...args], {
    cwd: root,
    encoding: "utf8",
    env: process.env,
  });
}

describe("founder-batch-review CLI", () => {
  it("prints Batch A–I summary with totals", () => {
    const r = run(["summary", "--json"]);
    assert.equal(r.status, 0, r.stderr);
    const doc = JSON.parse(r.stdout);
    assert.equal(doc.batches.length, 9);
    assert.ok(doc.totals.molecules >= 70);
    assert.ok(doc.totals.stgExtractDraft >= 70);
    assert.match(doc.note, /never invents/i);
  });

  it("shows Batch A dosing + STG drafts", () => {
    const r = run(["show", "A", "--json"]);
    assert.equal(r.status, 0, r.stderr);
    const doc = JSON.parse(r.stdout);
    assert.equal(doc.batch, "A");
    assert.ok((doc.dosing?.length ?? 0) >= 7);
    assert.ok((doc.stg?.length ?? 0) >= 1);
  });

  it("dry-run publish-stg refuses without attestation", () => {
    const r = run(["publish-stg", "stg-atropine-batcha-pointer"]);
    assert.notEqual(r.status, 0);
  });

  it("dry-run publish-stg validates and does not write without --write", () => {
    const r = run([
      "publish-stg",
      "stg-atropine-batcha-pointer",
      "--attestation",
      "I confirm this is sourced from DoH STG pointer only",
    ]);
    assert.equal(r.status, 0, r.stderr);
    const doc = JSON.parse(r.stdout);
    assert.equal(doc.dryRun, true);
    assert.equal(doc.to, "published");
    assert.match(r.stderr, /Dry-run only/i);
  });

  it("refuses publish-stg when attestation is weak", () => {
    const r = run([
      "publish-stg",
      "stg-atropine-batcha-pointer",
      "--attestation",
      "looks fine",
    ]);
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /Refuse|attestation|sourced|confirm/i);
  });

  it("plan-stg A reports eligible draft pointers", () => {
    const r = run(["plan-stg", "A", "--json"]);
    assert.equal(r.status, 0, r.stderr);
    const doc = JSON.parse(r.stdout);
    assert.equal(doc.batch, "A");
    assert.ok(doc.eligible.length >= 3);
    assert.equal(doc.blocked.length, 0);
    assert.match(doc.note, /Dosing scaffolds are NOT included/i);
  });

  it("publish-stg-batch A dry-run lists results without writing", () => {
    const r = run([
      "publish-stg-batch",
      "A",
      "--attestation",
      "I confirm sourced from DoH STG pointer only",
    ]);
    assert.equal(r.status, 0, r.stderr);
    const doc = JSON.parse(r.stdout);
    assert.equal(doc.dryRun, true);
    assert.ok(doc.count >= 3);
    assert.match(r.stderr, /Dry-run only/i);
  });

  it("plan-stg all and plan-dosing all return roll-ups", () => {
    const stg = run(["plan-stg", "all", "--json"]);
    assert.equal(stg.status, 0, stg.stderr);
    const stgDoc = JSON.parse(stg.stdout);
    assert.equal(stgDoc.batches.length, 9);
    assert.ok(stgDoc.totals.eligible >= 70);

    const dose = run(["plan-dosing", "all", "--json"]);
    assert.equal(dose.status, 0, dose.stderr);
    const doseDoc = JSON.parse(dose.stdout);
    assert.equal(doseDoc.batches.length, 9);
    assert.ok(doseDoc.totals.placeholderAbsent >= 70);
    assert.equal(doseDoc.totals.numericSuspect, 0);
  });

  it("export-dosing-cli all emits placeholder lines without --write", () => {
    const r = run(["export-dosing-cli", "all", "--json"]);
    assert.equal(r.status, 0, r.stderr);
    const doc = JSON.parse(r.stdout);
    assert.ok(doc.count >= 70);
    assert.equal(doc.skippedNumericSuspect, 0);
    assert.ok(Array.isArray(doc.lines));
    assert.equal(doc.lines.length, doc.count);
    assert.ok(doc.lines.every((line: string) => !line.includes("--write")));
    assert.ok(
      doc.lines.every((line: string) => /publish-dosing mol-/.test(line)),
    );
    assert.match(doc.note, /no dosing batch/i);
  });

  it("export-stg-cli all emits eligible publish-stg lines without --write", () => {
    const r = run(["export-stg-cli", "all", "--json"]);
    assert.equal(r.status, 0, r.stderr);
    const doc = JSON.parse(r.stdout);
    assert.ok(doc.count >= 70);
    assert.equal(doc.skippedBlocked, 0);
    assert.ok(Array.isArray(doc.lines));
    assert.equal(doc.lines.length, doc.count);
    assert.ok(doc.lines.every((line: string) => !line.includes("--write")));
    assert.ok(doc.lines.every((line: string) => /publish-stg stg-/.test(line)));
    assert.match(doc.note, /publish-stg-batch|publishState/i);
  });

  it("progress returns ordered next actions without writing", () => {
    const r = run(["progress", "--json"]);
    assert.equal(r.status, 0, r.stderr);
    const doc = JSON.parse(r.stdout);
    assert.ok(doc.stg.eligible >= 0);
    assert.ok(doc.dosing.placeholderAbsent >= 70);
    assert.ok(Array.isArray(doc.nextActions));
    assert.ok(doc.nextActions.length >= 1);
    assert.match(doc.nextActions[0], /STG|eligible|blocked/i);
    assert.match(doc.note, /read-only/i);
  });

  it("decisions returns empty journal safely when no file yet", () => {
    const r = run(["decisions", "--json", "--limit", "10"]);
    assert.equal(r.status, 0, r.stderr);
    const doc = JSON.parse(r.stdout);
    assert.ok(typeof doc.total === "number");
    assert.ok(Array.isArray(doc.items));
    assert.match(doc.note, /Audit journal|publishState/i);
  });
});
