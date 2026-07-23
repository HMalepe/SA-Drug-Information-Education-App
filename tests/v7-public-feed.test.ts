import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadPublicFeed } from "@materia/shared";

describe("v7 public feed fetch", () => {
  it("uses fixture when URL unset", async () => {
    const feed = await loadPublicFeed({
      kind: "sep",
      fixtureText: "sahpraRegNo,brandName,sepZar,effectiveDate\nA1,X,1,2026-07-01",
    });
    assert.equal(feed.origin, "fixture");
    assert.match(feed.note, /No live URL/i);
  });

  it("falls back to fixture when live fetch fails", async () => {
    const feed = await loadPublicFeed({
      kind: "sahpra",
      url: "https://example.invalid/feed.csv",
      fixtureText: "# fixture\nok",
      fetchImpl: async () => {
        throw new Error("network down");
      },
    });
    assert.equal(feed.origin, "fixture");
    assert.match(feed.note, /network down|error/i);
  });

  it("returns live origin on successful fetch", async () => {
    const feed = await loadPublicFeed({
      kind: "sep",
      url: "https://feeds.example/sep.csv",
      fixtureText: "fixture",
      fetchImpl: async () =>
        new Response("sahpraRegNo,brandName,sepZar,effectiveDate\nA1,Brand,10,2026-07-01", {
          status: 200,
        }),
    });
    assert.equal(feed.origin, "live");
    assert.match(feed.text, /Brand/);
  });
});
