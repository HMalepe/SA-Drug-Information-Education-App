"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { isBrowserOffline, loadOfflinePack, saveOfflinePack } from "@/lib/offlineCache";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function ToolsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [slug, setSlug] = useState("amoxicillin");
  const [lang, setLang] = useState("en");
  const [scheme, setScheme] = useState("Discovery Health");
  const [scanInput, setScanInput] = useState("6001234567890");
  const [egfr, setEgfr] = useState("45");
  const [adjustContext, setAdjustContext] = useState("renal");
  const [clashSlugs, setClashSlugs] = useState("amoxicillin, warfarin, aspirin");
  const [insertLevel, setInsertLevel] = useState<"grade5" | "professional">("grade5");
  const [city, setCity] = useState("johannesburg");
  const [out, setOut] = useState("");
  const [offlineBadge, setOfflineBadge] = useState(false);

  useEffect(() => {
    const sync = () => setOfflineBadge(isBrowserOffline());
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  async function ensurePro() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "pro@materiatest.za",
        mode: "pharmacist",
        tier: "professional",
      }),
    });
    const data = await res.json();
    await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: data.user.id, tier: "professional" }),
    });
    setUserId(data.user.id);
    return data.user.id as string;
  }

  async function call(path: string, tool?: string) {
    const uid = await ensurePro();
    const res = await fetch(`${API}${path}${path.includes("?") ? "&" : "?"}userId=${uid}`);
    const data = await res.json();
    if (res.status === 402) {
      track("gated_feature_hit", { feature: tool ?? path, tier: "professional" }, { tier: "free" });
    } else {
      track("tool_used", { tool: tool ?? path.split("?")[0] ?? path }, { tier: "professional" });
    }
    setOut(JSON.stringify(data, null, 2));
  }

  async function cacheOffline() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/offline/pack?userId=${uid}`);
    const data = await res.json();
    if (res.ok) saveOfflinePack(data);
    setOut(JSON.stringify(data, null, 2));
  }

  async function resolveVision() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/tools/vision/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, input: scanInput }),
    });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function runDoseAdjustment(confirmed: boolean) {
    const uid = await ensurePro();
    const res = await fetch(`${API}/tools/dose-adjustment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: uid,
        moleculeSlug: slug,
        context: adjustContext,
        egfrMlMin: egfr.trim() ? Number(egfr) : undefined,
        clinicallyConfirmed: confirmed,
      }),
    });
    track("tool_used", { tool: "dose_adjustment" }, { tier: "professional" });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function runClashBoard() {
    const uid = await ensurePro();
    const moleculeSlugs = clashSlugs
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const res = await fetch(`${API}/tools/clash-board`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, moleculeSlugs }),
    });
    track("tool_used", { tool: "clash_board" }, { tier: "professional" });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function runInsertTranslator() {
    const res = await fetch(
      `${API}/tools/insert/${encodeURIComponent(slug)}?level=${insertLevel}`,
    );
    track("tool_used", { tool: "insert_translator" }, { tier: "free" });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function speakVoice() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/voice/${encodeURIComponent(slug)}?userId=${uid}&lang=${lang}`,
    );
    const data = await res.json();
    setOut(JSON.stringify(data, null, 2));
    if (res.ok && data.text && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(data.text as string);
      utter.lang =
        lang === "af"
          ? "af-ZA"
          : lang === "zu"
            ? "zu-ZA"
            : lang === "xh"
              ? "xh-ZA"
              : lang === "st"
                ? "st-ZA"
                : "en-ZA";
      window.speechSynthesis.speak(utter);
    }
  }

  return (
    <>
      <h1>Pro tools</h1>
      <p className="tagline">
        SA counter toolkit — Professional tier.
        {offlineBadge && (
          <span className="chip-red" style={{ marginLeft: 8 }}>
            Offline
          </span>
        )}
      </p>

      <div className="card">
        <label className="muted">Molecule slug</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0", padding: 10 }}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <label className="muted">Scheme</label>
        <select
          value={scheme}
          onChange={(e) => setScheme(e.target.value)}
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
        >
          <option>Discovery Health</option>
          <option>Bonitas</option>
        </select>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button
            className="btn"
            type="button"
            onClick={() =>
              void call(
                `/tools/substitution/${encodeURIComponent(slug)}?selectedProductId=prod-amoxil`,
              )
            }
          >
            Substitute + SEP
          </button>
          <button
            className="btn"
            type="button"
            onClick={() =>
              void call(
                `/tools/formulary/${encodeURIComponent(slug)}?scheme=${encodeURIComponent(scheme)}&selectedProductId=prod-amoxil`,
              )
            }
          >
            Formulary + co-pay
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => void call(`/tools/locum/${encodeURIComponent(slug)}`)}
          >
            Locum brief
          </button>
          <button className="btn" type="button" onClick={() => void call(`/tools/cold-chain`)}>
            Cold-chain notes
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => void call(`/tools/availability/${encodeURIComponent(slug)}`)}
          >
            Availability
          </button>
          <button className="btn" type="button" onClick={() => void call(`/tools/shortages`)}>
            Active shortages
          </button>
        </div>
      </div>

      <div className="card">
        <label className="muted">Dose-adjustment assistant (§8.5) — published notes only</label>
        <select
          value={adjustContext}
          onChange={(e) => setAdjustContext(e.target.value)}
          style={{ display: "block", width: "100%", margin: "8px 0", padding: 10 }}
        >
          <option value="renal">Renal</option>
          <option value="hepatic">Hepatic</option>
          <option value="geriatric">Older adults</option>
          <option value="pregnancy">Pregnancy</option>
          <option value="dialysis">Dialysis</option>
          <option value="obesity">Obesity</option>
          <option value="underweight">Underweight</option>
        </select>
        <label className="muted">eGFR / CrCl-style (optional, renal/dialysis)</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          value={egfr}
          onChange={(e) => setEgfr(e.target.value)}
          placeholder="e.g. 45"
        />
        <button className="btn" type="button" onClick={() => void runDoseAdjustment(false)}>
          Preview (needs confirmation)
        </button>{" "}
        <button
          className="btn"
          type="button"
          style={{ background: "var(--ink)" }}
          onClick={() => void runDoseAdjustment(true)}
        >
          Confirm clinically + show
        </button>
        <p className="muted" style={{ marginTop: 8 }}>
          Never invents an adjusted mg/schedule — surfaces published renal/hepatic notes only.
        </p>
      </div>

      <div className="card">
        <label className="muted">Clash board (§12) — paste molecule slugs</label>
        <textarea
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10, minHeight: 72 }}
          value={clashSlugs}
          onChange={(e) => setClashSlugs(e.target.value)}
          placeholder="amoxicillin, warfarin, aspirin"
        />
        <button className="btn" type="button" onClick={() => void runClashBoard()}>
          Build clash board
        </button>
        <p className="muted" style={{ marginTop: 8 }}>
          Colour-coded published interactions, duplications, class overlap, renal/hepatic/food flags. Empty ≠ safe.
        </p>
      </div>

      <div className="card">
        <label className="muted">Insert translator (§9) — reading level</label>
        <select
          value={insertLevel}
          onChange={(e) => setInsertLevel(e.target.value as "grade5" | "professional")}
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
        >
          <option value="grade5">Grade ~5 plain English</option>
          <option value="professional">Professional</option>
        </select>
        <button className="btn" type="button" onClick={() => void runInsertTranslator()}>
          Show insert for slug
        </button>
        <p className="muted" style={{ marginTop: 8 }}>
          Both levels are separately authored educational excerpts — Materia never invents a rewrite. Try{" "}
          <code>amoxicillin</code> or <code>paracetamol</code>.
        </p>
      </div>

      <div className="card">
        <label className="muted">Counselling language</label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ display: "block", margin: "8px 0 16px", padding: 10 }}
        >
          <option value="en">English</option>
          <option value="zu">isiZulu</option>
          <option value="af">Afrikaans</option>
          <option value="st">Sesotho</option>
          <option value="xh">isiXhosa</option>
        </select>
        <button
          className="btn"
          type="button"
          onClick={() =>
            void call(`/tools/counselling/${encodeURIComponent(slug)}?lang=${lang}`)
          }
        >
          Counselling script
        </button>{" "}
        <button className="btn" type="button" onClick={() => void speakVoice()}>
          Voice read-aloud
        </button>
        <p className="muted" style={{ marginTop: 8 }}>
          Published SA counselling: try <code>amoxicillin</code>, <code>metformin</code>,{" "}
          <code>salbutamol</code>, <code>atorvastatin</code>, <code>simvastatin</code>, or{" "}
          <code>omeprazole</code> (EN/ZU/AF/ST/XH).
        </p>{" "}
        <button
          className="btn"
          type="button"
          onClick={() =>
            void call(`/tools/handout/${encodeURIComponent(slug)}?lang=${lang}`)
          }
        >
          Counselling handout
        </button>{" "}
        <button
          className="btn"
          type="button"
          onClick={() =>
            void call(`/tools/monograph/${encodeURIComponent(slug)}?lang=${lang}`, "monograph_export")
          }
        >
          Molecule monograph
        </button>{" "}
        <button className="btn" type="button" onClick={() => void cacheOffline()}>
          Offline pack
        </button>{" "}
        <button
          className="btn"
          type="button"
          style={{ background: "var(--ink)" }}
          onClick={() => setOut(JSON.stringify(loadOfflinePack(), null, 2))}
        >
          Read cache
        </button>
      </div>

      <div className="card">
        <label className="muted">City for pharmacy locator stub (Doc 16)</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ display: "block", margin: "8px 0 16px", padding: 10 }}
        >
          <option value="johannesburg">Johannesburg</option>
          <option value="pretoria">Pretoria / Tshwane</option>
          <option value="cape-town">Cape Town</option>
          <option value="durban">Durban</option>
          <option value="bloemfontein">Bloemfontein</option>
          <option value="gqeberha">Gqeberha / PE</option>
        </select>
        <button
          className="btn"
          type="button"
          onClick={() =>
            void call(
              `/tools/pharmacy-locator?city=${encodeURIComponent(city)}&moleculeSlug=${encodeURIComponent(slug)}&selectedProductId=prod-amoxil`,
              "pharmacy_locator",
            )
          }
        >
          Nearby pharmacies + SEP refill prompt
        </button>
        <p className="muted" style={{ marginTop: 8 }}>
          Illustrative directory only — not live stock or Google Places. SEP from published seed prices.
        </p>
      </div>

      <div className="card">
        <label className="muted">Barcode, brand, or form cue (e.g. inhaler) — vision stub</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          value={scanInput}
          onChange={(e) => setScanInput(e.target.value)}
          placeholder="6001234567890 or Amoxil"
        />
        <button className="btn" type="button" onClick={() => void resolveVision()}>
          Resolve pack / barcode
        </button>
        <p className="muted" style={{ marginTop: 8 }}>
          Suggestive only — confirm the physical pack. Camera capture later.
        </p>
      </div>

      {out && (
        <pre className="card" style={{ whiteSpace: "pre-wrap" }}>
          {out}
        </pre>
      )}
    </>
  );
}
