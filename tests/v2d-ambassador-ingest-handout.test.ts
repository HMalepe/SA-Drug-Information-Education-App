import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  AMBASSADOR_BONUS_CREDITS,
  HANDOUT_DISCLAIMER,
  REFERRAL_SIGNUP_CREDITS,
  buildCounsellingHandout,
  buildReferralCredits,
  canRedeemReferral,
  generateReferralCode,
  normalizeReferralCode,
  sahpraFromCsv,
  sepFromCsv,
  sumCredits,
  tierAllows,
  validateSahpraRows,
  validateSepRows,
} from "@materia/shared";

describe("v2d ambassador referral", () => {
  it("generates and normalizes codes", () => {
    const code = generateReferralCode("user-9", "ambassador");
    assert.match(code, /^AMB-/);
    assert.equal(normalizeReferralCode(" amb-ab12-xy "), "AMB-AB12-XY");
  });

  it("blocks self-redeem and double redeem", () => {
    const code = {
      code: "AMB-TEST-1",
      ownerUserId: "u1",
      createdAt: "2026-07-01T00:00:00.000Z",
      kind: "ambassador" as const,
    };
    assert.equal(
      canRedeemReferral({ code, refereeUserId: "u1", existingRedemptions: [] }).ok,
      false,
    );
    assert.equal(
      canRedeemReferral({
        code,
        refereeUserId: "u2",
        existingRedemptions: [
          {
            id: "r1",
            code: code.code,
            referrerUserId: "u1",
            refereeUserId: "u2",
            redeemedAt: "2026-07-01T00:00:00.000Z",
          },
        ],
      }).ok,
      false,
    );
    assert.equal(
      canRedeemReferral({ code, refereeUserId: "u3", existingRedemptions: [] }).ok,
      true,
    );
  });

  it("awards ambassador bonus credits", () => {
    const code = {
      code: "AMB-X",
      ownerUserId: "u1",
      createdAt: "2026-07-01T00:00:00.000Z",
      kind: "ambassador" as const,
    };
    const redemption = {
      id: "r1",
      code: code.code,
      referrerUserId: "u1",
      refereeUserId: "u2",
      redeemedAt: "2026-07-01T00:00:00.000Z",
    };
    const credits = buildReferralCredits({ redemption, code });
    assert.equal(sumCredits(credits, "u1"), REFERRAL_SIGNUP_CREDITS + AMBASSADOR_BONUS_CREDITS);
    assert.equal(tierAllows("free", "ambassador_tools"), true);
  });
});

describe("v2d SEP/SAHPRA ingest", () => {
  it("validates SAHPRA fixture rows as draft", () => {
    const csv = `sahpraRegNo,brandName,innName,strength,form,schedule,manufacturerName,bioequivalentFlag
A1,BrandX,Amoxicillin,500 mg,capsule,S4,Mfr,true
,BadBrand,Amoxicillin,500 mg,capsule,S4,Mfr,false`;
    const preview = validateSahpraRows(sahpraFromCsv(csv));
    assert.equal(preview.accepted, 1);
    assert.equal(preview.rejected, 1);
    assert.equal(preview.draftProducts[0]?.publishState, "draft");
  });

  it("rejects invalid SEP and accepts valid draft prices", () => {
    const csv = `sahpraRegNo,brandName,sepZar,effectiveDate
A1,BrandX,52.5,2026-07-01
A2,BrandY,-1,2026-07-01`;
    const preview = validateSepRows(sepFromCsv(csv));
    assert.equal(preview.accepted, 1);
    assert.equal(preview.rejected, 1);
    assert.equal(preview.draftPrices[0]?.publishState, "draft");
  });
});

describe("v2d counselling handout", () => {
  it("builds printable text/html with disclaimer", () => {
    const handout = buildCounsellingHandout({
      molecule: { innName: "Amoxicillin", slug: "amoxicillin" },
      lang: "en",
      lines: ["Finish the course.", "Tell your pharmacist about penicillin allergy."],
      sourceNote: "Materia original",
    });
    assert.match(handout.plainText, /Finish the course/);
    assert.match(handout.html, /<ol>/);
    assert.match(handout.disclaimer, /Not a prescription/);
    assert.ok(HANDOUT_DISCLAIMER.length > 20);
    assert.equal(tierAllows("free", "handout_export"), true);
  });
});
