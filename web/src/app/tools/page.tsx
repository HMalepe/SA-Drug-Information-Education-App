"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { isBrowserOffline, loadOfflinePack, saveOfflinePack } from "@/lib/offlineCache";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type DoseAdjustResult = {
  status: string;
  disclaimer: string;
  context?: string;
  whyAdjust?: string;
  renalBandNote?: string;
  publishedGuidance?: string;
  working?: string[];
  message?: string;
  source?: { citation?: string; lastReviewed?: string };
  inventedAdjustedDose?: null;
};

type ClashBoardRow = {
  id: string;
  kind: string;
  tone: "red" | "orange" | "yellow" | "slate" | string;
  title: string;
  detail: string;
  severity?: string;
};

type ClashBoardView = {
  rows: ClashBoardRow[];
  summary: { red: number; orange: number; yellow: number; slate: number; total: number };
  note: string;
  disclaimer: string;
};

type CounsellingResult = {
  error?: string;
  moleculeName?: string;
  moleculeSlug?: string;
  available?: string[];
  script?: { lang?: string; lines?: string[]; sourceNote?: string; publishState?: string };
};

type InsertResult = {
  status: string;
  level?: string;
  title?: string;
  body?: string;
  availableLevels?: string[];
  source?: { citation?: string; lastReviewed?: string };
  message?: string;
  disclaimer?: string;
  moleculeName?: string;
};

type MonographResult = {
  error?: string;
  title?: string;
  moleculeName?: string;
  className?: string;
  therapeuticArea?: string;
  sections?: Array<{
    id: string;
    title: string;
    body: string;
    sourceId?: string;
    lastReviewed?: string;
  }>;
  omittedDraftTabs?: string[];
  disclaimer?: string;
};

type HandoutResult = {
  error?: string;
  available?: string[];
  title?: string;
  moleculeName?: string;
  moleculeSlug?: string;
  lang?: string;
  lines?: string[];
  sourceNote?: string;
  disclaimer?: string;
  generatedAt?: string;
};

type VoiceResult = {
  error?: string;
  moleculeSlug?: string;
  lang?: string;
  text?: string;
  note?: string;
};

const TONE_COLOR: Record<string, string> = {
  red: "var(--danger)",
  orange: "var(--caution)",
  yellow: "var(--adjust)",
  slate: "var(--slate)",
};

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
  const [doseAdjust, setDoseAdjust] = useState<DoseAdjustResult | null>(null);
  const [clashBoard, setClashBoard] = useState<ClashBoardView | null>(null);
  const [counselling, setCounselling] = useState<CounsellingResult | null>(null);
  const [insertResult, setInsertResult] = useState<InsertResult | null>(null);
  const [monograph, setMonograph] = useState<MonographResult | null>(null);
  const [handout, setHandout] = useState<HandoutResult | null>(null);
  const [voice, setVoice] = useState<VoiceResult | null>(null);
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

  function clearClinicalPanels() {
    setDoseAdjust(null);
    setClashBoard(null);
    setCounselling(null);
    setInsertResult(null);
    setMonograph(null);
    setHandout(null);
    setVoice(null);
  }

  function showRaw(data: unknown) {
    clearClinicalPanels();
    setOut(JSON.stringify(data, null, 2));
  }

  function showClinicalPanel(
    kind: "dose" | "clash" | "counselling" | "insert" | "monograph" | "handout" | "voice",
    data: unknown,
  ) {
    clearClinicalPanels();
    setOut("");
    if (kind === "dose") setDoseAdjust(data as DoseAdjustResult);
    else if (kind === "clash") setClashBoard(data as ClashBoardView);
    else if (kind === "counselling") setCounselling(data as CounsellingResult);
    else if (kind === "insert") setInsertResult(data as InsertResult);
    else if (kind === "monograph") setMonograph(data as MonographResult);
    else if (kind === "handout") setHandout(data as HandoutResult);
    else setVoice(data as VoiceResult);
  }

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
    showRaw(data);
  }

  async function cacheOffline() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/offline/pack?userId=${uid}`);
    const data = await res.json();
    if (res.ok) saveOfflinePack(data);
    showRaw(data);
  }

  async function resolveVision() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/tools/vision/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, input: scanInput }),
    });
    showRaw(await res.json());
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
    showClinicalPanel("dose", await res.json());
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
    showClinicalPanel("clash", await res.json());
  }

  async function runCounselling() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/counselling/${encodeURIComponent(slug)}?userId=${uid}&lang=${lang}`,
    );
    track("tool_used", { tool: "counselling" }, { tier: "professional" });
    showClinicalPanel("counselling", await res.json());
  }

  async function runInsertTranslator() {
    const res = await fetch(
      `${API}/tools/insert/${encodeURIComponent(slug)}?level=${insertLevel}`,
    );
    track("tool_used", { tool: "insert_translator" }, { tier: "free" });
    showClinicalPanel("insert", await res.json());
  }

  async function runMonograph() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/monograph/${encodeURIComponent(slug)}?userId=${uid}&lang=${lang}`,
    );
    track("tool_used", { tool: "monograph_export" }, { tier: "professional" });
    showClinicalPanel("monograph", await res.json());
  }

  async function runHandout() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/handout/${encodeURIComponent(slug)}?userId=${uid}&lang=${lang}`,
    );
    track("tool_used", { tool: "handout_export" }, { tier: "professional" });
    showClinicalPanel("handout", await res.json());
  }

  async function speakVoice() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/voice/${encodeURIComponent(slug)}?userId=${uid}&lang=${lang}`,
    );
    const data = await res.json();
    track("tool_used", { tool: "voice_mode" }, { tier: "professional" });
    showClinicalPanel("voice", data);
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
          Colour-coded published interactions, duplications, class overlap, renal/hepatic/food
          flags. Empty ≠ safe.
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
          Both levels are separately authored educational excerpts — Materia never invents a
          rewrite. Try <code>amoxicillin</code> or <code>paracetamol</code>.
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
        <button className="btn" type="button" onClick={() => void runCounselling()}>
          Counselling script
        </button>{" "}
        <button className="btn" type="button" onClick={() => void speakVoice()}>
          Voice read-aloud
        </button>
        <p className="muted" style={{ marginTop: 8 }}>
          Published SA counselling: deepened v385–v403 Paediatric Batches H–I (19 molecules —
          cardio/neuro/endocrine + supportive). Locum accepts <code>?lang=zu</code> (af/st/xh
          too).
        </p>{" "}
        <button className="btn" type="button" onClick={() => void runHandout()}>
          Counselling handout
        </button>{" "}
        <button className="btn" type="button" onClick={() => void runMonograph()}>
          Molecule monograph
        </button>{" "}
        <button className="btn" type="button" onClick={() => void cacheOffline()}>
          Offline pack
        </button>{" "}
        <button
          className="btn"
          type="button"
          style={{ background: "var(--ink)" }}
          onClick={() => showRaw(loadOfflinePack())}
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
          Illustrative directory only — not live stock or Google Places. SEP from published seed
          prices.
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

      {doseAdjust && <DoseAdjustResultPanel result={doseAdjust} />}
      {clashBoard && <ClashBoardPanel view={clashBoard} />}
      {counselling && <CounsellingResultPanel result={counselling} />}
      {insertResult && <InsertResultPanel result={insertResult} />}
      {monograph && <MonographResultPanel result={monograph} />}
      {handout && <HandoutResultPanel result={handout} />}
      {voice && <VoiceResultPanel result={voice} />}

      {out && (
        <pre className="card" style={{ whiteSpace: "pre-wrap" }}>
          {out}
        </pre>
      )}
    </>
  );
}

function DoseAdjustResultPanel({ result }: { result: DoseAdjustResult }) {
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>Dose adjustment · {result.status}</h2>
      {result.message ? <p>{result.message}</p> : null}
      {result.whyAdjust ? <p>{result.whyAdjust}</p> : null}
      {result.renalBandNote ? <p className="muted">{result.renalBandNote}</p> : null}
      {result.publishedGuidance ? (
        <p>
          <strong>Published guidance:</strong> {result.publishedGuidance}
        </p>
      ) : null}
      {result.working && result.working.length > 0 ? (
        <ol style={{ paddingLeft: 20 }}>
          {result.working.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}
      {result.source?.citation ? (
        <p className="source-tag">
          source · {result.source.citation}
          {result.source.lastReviewed ? ` · reviewed ${result.source.lastReviewed}` : ""}
        </p>
      ) : null}
      <p className="muted">{result.disclaimer}</p>
      <p className="muted" style={{ marginBottom: 0 }}>
        inventedAdjustedDose stays null — Materia never invents an adjusted mg/schedule.
      </p>
    </section>
  );
}

function ClashBoardPanel({ view }: { view: ClashBoardView }) {
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>Clash board</h2>
      <p className="muted">
        red {view.summary.red} · orange {view.summary.orange} · yellow {view.summary.yellow} · slate{" "}
        {view.summary.slate} · total {view.summary.total}
      </p>
      {view.rows.length === 0 ? (
        <p className="muted">No published clash rows for this list — empty ≠ safe.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: "12px 0" }}>
          {view.rows.map((row) => (
            <li
              key={row.id}
              style={{
                borderLeft: `4px solid ${TONE_COLOR[row.tone] ?? TONE_COLOR.slate}`,
                padding: "8px 12px",
                marginBottom: 8,
              }}
            >
              <strong>{row.title}</strong>
              {row.severity ? <span className="muted"> · {row.severity}</span> : null}
              <div className="muted" style={{ marginTop: 4 }}>
                {row.detail}
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="muted">{view.note}</p>
      <p className="muted" style={{ marginBottom: 0 }}>
        {view.disclaimer}
      </p>
    </section>
  );
}

function CounsellingResultPanel({ result }: { result: CounsellingResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Counselling</h2>
        <p>{result.error}</p>
        {result.available && result.available.length > 0 ? (
          <p className="muted">Available languages: {result.available.join(", ")}</p>
        ) : null}
      </section>
    );
  }
  const lines = result.script?.lines ?? [];
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>
        Counselling{result.moleculeName ? ` · ${result.moleculeName}` : ""}
        {result.script?.lang ? ` · ${result.script.lang}` : ""}
      </h2>
      {lines.length === 0 ? (
        <p className="muted">No published counselling lines for this language.</p>
      ) : (
        <ol style={{ paddingLeft: 20 }}>
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      )}
      {result.available && result.available.length > 0 ? (
        <p className="muted">Available languages: {result.available.join(", ")}</p>
      ) : null}
      {result.script?.sourceNote ? (
        <p className="source-tag">source · {result.script.sourceNote}</p>
      ) : null}
    </section>
  );
}

function InsertResultPanel({ result }: { result: InsertResult }) {
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>
        Insert translator · {result.level ?? "—"}
        {result.moleculeName ? ` · ${result.moleculeName}` : ""}
      </h2>
      {result.status === "unavailable" || !result.body ? (
        <p>{result.message ?? "No published insert passage for this level."}</p>
      ) : (
        <>
          {result.title ? <h3 style={{ marginBottom: 8 }}>{result.title}</h3> : null}
          <p style={{ whiteSpace: "pre-wrap" }}>{result.body}</p>
        </>
      )}
      {result.availableLevels && result.availableLevels.length > 0 ? (
        <p className="muted">Available levels: {result.availableLevels.join(", ")}</p>
      ) : null}
      {result.source?.citation ? (
        <p className="source-tag">
          source · {result.source.citation}
          {result.source.lastReviewed ? ` · reviewed ${result.source.lastReviewed}` : ""}
        </p>
      ) : null}
      {result.disclaimer ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {result.disclaimer}
        </p>
      ) : null}
    </section>
  );
}

function MonographResultPanel({ result }: { result: MonographResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Monograph</h2>
        <p>{result.error}</p>
      </section>
    );
  }
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>{result.title ?? "Molecule monograph"}</h2>
      <p className="muted">
        {result.moleculeName}
        {result.className ? ` · ${result.className}` : ""}
        {result.therapeuticArea ? ` · ${result.therapeuticArea}` : ""}
      </p>
      {(result.sections ?? []).map((section) => (
        <div key={section.id} style={{ marginTop: 12 }}>
          <h3 style={{ marginBottom: 4 }}>{section.title}</h3>
          <p style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>{section.body}</p>
          {section.sourceId || section.lastReviewed ? (
            <p className="source-tag">
              {section.sourceId ? `source · ${section.sourceId}` : "source"}
              {section.lastReviewed ? ` · reviewed ${section.lastReviewed}` : ""}
            </p>
          ) : null}
        </div>
      ))}
      {result.omittedDraftTabs && result.omittedDraftTabs.length > 0 ? (
        <p className="muted">
          Omitted draft tabs (not published): {result.omittedDraftTabs.join(", ")}
        </p>
      ) : null}
      {result.disclaimer ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {result.disclaimer}
        </p>
      ) : null}
    </section>
  );
}

function HandoutResultPanel({ result }: { result: HandoutResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Counselling handout</h2>
        <p>{result.error}</p>
        {result.available && result.available.length > 0 ? (
          <p className="muted">Available languages: {result.available.join(", ")}</p>
        ) : null}
      </section>
    );
  }
  const lines = result.lines ?? [];
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>{result.title ?? "Counselling handout"}</h2>
      <p className="muted">
        {result.moleculeName}
        {result.lang ? ` · ${result.lang}` : ""}
        {result.generatedAt ? ` · generated ${result.generatedAt}` : ""}
      </p>
      {lines.length === 0 ? (
        <p className="muted">No published counselling lines for this handout.</p>
      ) : (
        <ol style={{ paddingLeft: 20 }}>
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      )}
      {result.sourceNote ? <p className="source-tag">source · {result.sourceNote}</p> : null}
      {result.disclaimer ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {result.disclaimer}
        </p>
      ) : null}
    </section>
  );
}

function VoiceResultPanel({ result }: { result: VoiceResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Voice read-aloud</h2>
        <p>{result.error}</p>
      </section>
    );
  }
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>
        Voice read-aloud
        {result.lang ? ` · ${result.lang}` : ""}
        {result.moleculeSlug ? ` · ${result.moleculeSlug}` : ""}
      </h2>
      {result.text ? (
        <p style={{ whiteSpace: "pre-wrap" }}>{result.text}</p>
      ) : (
        <p className="muted">No voice text returned.</p>
      )}
      {result.note ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {result.note}
        </p>
      ) : null}
    </section>
  );
}
