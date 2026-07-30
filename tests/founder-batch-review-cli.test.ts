import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cli = join(root, "content/pipeline/founder-batch-review.mjs");

function run(args) {
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
});
