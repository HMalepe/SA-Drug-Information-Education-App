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

type LocumResult = {
  error?: string;
  brief?: {
    innName?: string;
    className?: string;
    schedules?: string[];
    topBrands?: Array<{ brandName: string; strength: string; isOriginator: boolean }>;
    topWarnings?: string[];
    counsellingLang?: string;
    counsellingLines?: string[];
    availableCounsellingLangs?: string[];
    stockoutHint?: string;
    disclaimer?: string;
  };
};

type ColdChainResult = {
  error?: string;
  available?: string[];
  note?: {
    productKey?: string;
    title?: string;
    storage?: string;
    loadSheddingSteps?: string[];
    sourceNote?: string;
  };
  notes?: Array<{
    productKey?: string;
    title?: string;
    storage?: string;
    loadSheddingSteps?: string[];
    sourceNote?: string;
  }>;
};

type SubstitutionOptionRow = {
  productId: string;
  brandName: string;
  strength: string;
  form: string;
  schedule: string;
  isOriginator: boolean;
  bioequivalentFlag: boolean;
  sepZar: number | null;
  sepPublished: boolean;
  priceDeltaVsSelected: number | null;
  rankReason: string;
};

type SubstitutionResult = {
  error?: string;
  upgradeTo?: string;
  molecule?: { id?: string; slug?: string; innName?: string };
  moleculeId?: string;
  selectedProductId?: string;
  options?: SubstitutionOptionRow[];
  cheapestBioequivalentId?: string | null;
  note?: string;
};

type FormularyMatchRowView = {
  productId: string;
  brandName: string;
  schemeName: string;
  reimbursed: boolean;
  coPayEstimateZar: number | null;
  sepZar: number | null;
  bioequivalentFlag: boolean;
  isOriginator: boolean;
  switchSavesVsSelected: number | null;
  note: string;
};

type FormularyResult = {
  error?: string;
  upgradeTo?: string;
  molecule?: { slug?: string; innName?: string };
  schemeName?: string;
  moleculeId?: string;
  selectedProductId?: string;
  rows?: FormularyMatchRowView[];
  recommendedProductId?: string | null;
  disclaimer?: string;
};

type StockSignalView = "in_stock" | "limited" | "shortage" | "unknown";

type AvailabilitySignalView = {
  wholesaler: string;
  signal: StockSignalView;
  note?: string;
  observedAt: string;
};

type AvailabilityRowView = {
  productId: string;
  brandName: string;
  moleculeId: string;
  strength: string;
  form: string;
  signals: AvailabilitySignalView[];
  worstSignal: StockSignalView;
  isShortage: boolean;
  alternativesHint: string;
};

type AvailabilityResult = {
  error?: string;
  upgradeTo?: string;
  moleculeSlug?: string;
  rows?: AvailabilityRowView[];
  note?: string;
};

type ShortagesResult = {
  error?: string;
  upgradeTo?: string;
  shortages?: AvailabilityRowView[];
  note?: string;
};

type PharmacyHitView = {
  pharmacy: {
    id: string;
    name: string;
    chain?: string;
    city: string;
    suburb: string;
    phoneDisplay?: string;
    hoursNote: string;
  };
  distanceKm: number | null;
  cityMatch: boolean;
};

type PharmacyLocatorResult = {
  error?: string;
  upgradeTo?: string;
  city?: string;
  queryLat?: number;
  queryLng?: number;
  pharmacies?: PharmacyHitView[];
  substitution?: SubstitutionResult | null;
  refillPrompt?: string | null;
  note?: string;
  disclaimer?: string;
  molecule?: { id?: string; slug?: string; innName?: string } | null;
  cities?: Array<{ key: string; label: string }>;
};

type OfflineEssentialView = {
  moleculeId: string;
  slug: string;
  innName: string;
  className: string;
  scheduleHints: string[];
  counsellingEn: string[];
  overdoseFirstAid: string[];
  cachedAt: string;
  disclaimer: string;
};

type OfflinePackResult = {
  error?: string;
  upgradeTo?: string;
  generatedAt?: string;
  count?: number;
  essentials?: OfflineEssentialView[];
  fromCache?: boolean;
};

type VisionHitView = {
  kind: "barcode" | "brand_text" | "fuzzy" | string;
  query: string;
  moleculeId: string;
  moleculeSlug: string;
  moleculeName: string;
  brandName?: string;
  confidence: "high" | "medium" | "low" | string;
  note: string;
};

type VisionResolveResult = {
  error?: string;
  upgradeTo?: string;
  hits?: VisionHitView[];
  note?: string;
};

const STOCK_SIGNAL_TONE: Record<StockSignalView, string> = {
  shortage: "red",
  limited: "orange",
  unknown: "slate",
  in_stock: "slate",
};

/** Published SEP/co-pay only — null never renders as R0. */
function formatPublishedZar(
  value: number | null | undefined,
  emptyLabel = "not yet published",
): string {
  if (value == null) return emptyLabel;
  return `R${value.toFixed(2)}`;
}

function formatZarDelta(value: number | null | undefined): string | null {
  if (value == null) return null;
  const sign = value > 0 ? "+" : "";
  return `${sign}R${value.toFixed(2)}`;
}

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
  const [doseAdjust, setDoseAdjust] = useState<DoseAdjustResult | null>(null);
  const [clashBoard, setClashBoard] = useState<ClashBoardView | null>(null);
  const [counselling, setCounselling] = useState<CounsellingResult | null>(null);
  const [insertResult, setInsertResult] = useState<InsertResult | null>(null);
  const [monograph, setMonograph] = useState<MonographResult | null>(null);
  const [handout, setHandout] = useState<HandoutResult | null>(null);
  const [voice, setVoice] = useState<VoiceResult | null>(null);
  const [locum, setLocum] = useState<LocumResult | null>(null);
  const [coldChain, setColdChain] = useState<ColdChainResult | null>(null);
  const [substitution, setSubstitution] = useState<SubstitutionResult | null>(null);
  const [formulary, setFormulary] = useState<FormularyResult | null>(null);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [shortages, setShortages] = useState<ShortagesResult | null>(null);
  const [pharmacyLocator, setPharmacyLocator] = useState<PharmacyLocatorResult | null>(null);
  const [offlinePack, setOfflinePack] = useState<OfflinePackResult | null>(null);
  const [vision, setVision] = useState<VisionResolveResult | null>(null);
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
    setLocum(null);
    setColdChain(null);
    setSubstitution(null);
    setFormulary(null);
    setAvailability(null);
    setShortages(null);
    setPharmacyLocator(null);
    setOfflinePack(null);
    setVision(null);
  }

  function showClinicalPanel(
    kind:
      | "dose"
      | "clash"
      | "counselling"
      | "insert"
      | "monograph"
      | "handout"
      | "voice"
      | "locum"
      | "coldchain"
      | "substitution"
      | "formulary"
      | "availability"
      | "shortages"
      | "pharmacy"
      | "offlinepack"
      | "vision",
    data: unknown,
  ) {
    clearClinicalPanels();
    if (kind === "dose") setDoseAdjust(data as DoseAdjustResult);
    else if (kind === "clash") setClashBoard(data as ClashBoardView);
    else if (kind === "counselling") setCounselling(data as CounsellingResult);
    else if (kind === "insert") setInsertResult(data as InsertResult);
    else if (kind === "monograph") setMonograph(data as MonographResult);
    else if (kind === "handout") setHandout(data as HandoutResult);
    else if (kind === "voice") setVoice(data as VoiceResult);
    else if (kind === "locum") setLocum(data as LocumResult);
    else if (kind === "coldchain") setColdChain(data as ColdChainResult);
    else if (kind === "substitution") setSubstitution(data as SubstitutionResult);
    else if (kind === "formulary") setFormulary(data as FormularyResult);
    else if (kind === "availability") setAvailability(data as AvailabilityResult);
    else if (kind === "shortages") setShortages(data as ShortagesResult);
    else if (kind === "pharmacy") setPharmacyLocator(data as PharmacyLocatorResult);
    else if (kind === "offlinepack") setOfflinePack(data as OfflinePackResult);
    else setVision(data as VisionResolveResult);
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

  async function cacheOffline() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/offline/pack?userId=${uid}`);
    const data = await res.json();
    if (res.status === 402) {
      track(
        "gated_feature_hit",
        { feature: "offline_core", tier: "professional" },
        { tier: "free" },
      );
      showClinicalPanel("offlinepack", data);
      return;
    }
    track("tool_used", { tool: "offline_core" }, { tier: "professional" });
    if (res.ok && data.essentials) {
      saveOfflinePack({
        generatedAt: data.generatedAt ?? new Date().toISOString(),
        essentials: data.essentials,
      });
      showClinicalPanel("offlinepack", { ...data, fromCache: false });
      return;
    }
    showClinicalPanel("offlinepack", data);
  }

  function readOfflineCache() {
    const cached = loadOfflinePack();
    if (!cached) {
      showClinicalPanel("offlinepack", {
        error: "No pack cached yet — tap Offline pack first while online.",
      });
      return;
    }
    showClinicalPanel("offlinepack", {
      generatedAt: cached.generatedAt,
      essentials: cached.essentials,
      count: cached.essentials.length,
      fromCache: true,
    });
  }

  async function resolveVision() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/tools/vision/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, input: scanInput }),
    });
    if (res.status === 402) {
      track(
        "gated_feature_hit",
        { feature: "vision_scan", tier: "professional" },
        { tier: "free" },
      );
    } else {
      track("tool_used", { tool: "vision_scan" }, { tier: "professional" });
    }
    showClinicalPanel("vision", await res.json());
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

  async function runLocum() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/locum/${encodeURIComponent(slug)}?userId=${uid}&lang=${lang}`,
    );
    track("tool_used", { tool: "locum_brief" }, { tier: "professional" });
    showClinicalPanel("locum", await res.json());
  }

  async function runColdChain() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/tools/cold-chain?userId=${uid}`);
    track("tool_used", { tool: "cold_chain_notes" }, { tier: "professional" });
    showClinicalPanel("coldchain", await res.json());
  }

  async function runSubstitution() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/substitution/${encodeURIComponent(slug)}?userId=${uid}&selectedProductId=prod-amoxil`,
    );
    if (res.status === 402) {
      track(
        "gated_feature_hit",
        { feature: "substitution_sep", tier: "professional" },
        { tier: "free" },
      );
    } else {
      track("tool_used", { tool: "substitution_sep" }, { tier: "professional" });
    }
    showClinicalPanel("substitution", await res.json());
  }

  async function runFormulary() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/formulary/${encodeURIComponent(slug)}?userId=${uid}&scheme=${encodeURIComponent(scheme)}&selectedProductId=prod-amoxil`,
    );
    if (res.status === 402) {
      track(
        "gated_feature_hit",
        { feature: "formulary_copay", tier: "professional" },
        { tier: "free" },
      );
    } else {
      track("tool_used", { tool: "formulary_copay" }, { tier: "professional" });
    }
    showClinicalPanel("formulary", await res.json());
  }

  async function runAvailability() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/availability/${encodeURIComponent(slug)}?userId=${uid}`,
    );
    if (res.status === 402) {
      track(
        "gated_feature_hit",
        { feature: "shortage_alerts", tier: "professional" },
        { tier: "free" },
      );
    } else {
      track("tool_used", { tool: "shortage_alerts" }, { tier: "professional" });
    }
    showClinicalPanel("availability", await res.json());
  }

  async function runShortages() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/tools/shortages?userId=${uid}`);
    if (res.status === 402) {
      track(
        "gated_feature_hit",
        { feature: "shortage_alerts", tier: "professional" },
        { tier: "free" },
      );
    } else {
      track("tool_used", { tool: "shortage_alerts" }, { tier: "professional" });
    }
    showClinicalPanel("shortages", await res.json());
  }

  async function runPharmacyLocator() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/pharmacy-locator?userId=${uid}&city=${encodeURIComponent(city)}&moleculeSlug=${encodeURIComponent(slug)}&selectedProductId=prod-amoxil`,
    );
    if (res.status === 402) {
      track(
        "gated_feature_hit",
        { feature: "pharmacy_locator", tier: "professional" },
        { tier: "free" },
      );
    } else {
      track("tool_used", { tool: "pharmacy_locator" }, { tier: "professional" });
    }
    showClinicalPanel("pharmacy", await res.json());
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
          <button className="btn" type="button" onClick={() => void runSubstitution()}>
            Substitute + SEP
          </button>
          <button className="btn" type="button" onClick={() => void runFormulary()}>
            Formulary + co-pay
          </button>
          <button className="btn" type="button" onClick={() => void runLocum()}>
            Locum brief
          </button>
          <button className="btn" type="button" onClick={() => void runColdChain()}>
            Cold-chain notes
          </button>
          <button className="btn" type="button" onClick={() => void runAvailability()}>
            Availability
          </button>
          <button className="btn" type="button" onClick={() => void runShortages()}>
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
          onClick={() => readOfflineCache()}
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
        <button className="btn" type="button" onClick={() => void runPharmacyLocator()}>
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
      {locum && <LocumResultPanel result={locum} />}
      {coldChain && <ColdChainResultPanel result={coldChain} />}
      {substitution && <SubstitutionResultPanel result={substitution} />}
      {formulary && <FormularyResultPanel result={formulary} />}
      {availability && <AvailabilityResultPanel result={availability} />}
      {shortages && <ShortagesResultPanel result={shortages} />}
      {pharmacyLocator && <PharmacyLocatorResultPanel result={pharmacyLocator} />}
      {offlinePack && <OfflinePackResultPanel result={offlinePack} />}
      {vision && <VisionResolveResultPanel result={vision} />}
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

function LocumResultPanel({ result }: { result: LocumResult }) {
  if (result.error || !result.brief) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Locum brief</h2>
        <p>{result.error ?? "No locum brief returned."}</p>
      </section>
    );
  }
  const b = result.brief;
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>
        Locum brief · {b.innName ?? "—"}
        {b.className ? ` · ${b.className}` : ""}
      </h2>
      {b.schedules && b.schedules.length > 0 ? (
        <p className="muted">Schedules: {b.schedules.join(", ")}</p>
      ) : null}
      {b.topBrands && b.topBrands.length > 0 ? (
        <>
          <h3 style={{ marginBottom: 4 }}>Top brands</h3>
          <ul style={{ paddingLeft: 20, marginTop: 0 }}>
            {b.topBrands.map((p) => (
              <li key={`${p.brandName}-${p.strength}`}>
                {p.brandName} · {p.strength}
                {p.isOriginator ? " · originator" : ""}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {b.topWarnings && b.topWarnings.length > 0 ? (
        <>
          <h3 style={{ marginBottom: 4 }}>Published warnings / CIs</h3>
          <ul style={{ paddingLeft: 20, marginTop: 0 }}>
            {b.topWarnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </>
      ) : null}
      <h3 style={{ marginBottom: 4 }}>
        Counselling{b.counsellingLang ? ` · ${b.counsellingLang}` : ""}
      </h3>
      {(b.counsellingLines ?? []).length === 0 ? (
        <p className="muted">No published counselling lines.</p>
      ) : (
        <ol style={{ paddingLeft: 20, marginTop: 0 }}>
          {(b.counsellingLines ?? []).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      )}
      {b.availableCounsellingLangs && b.availableCounsellingLangs.length > 0 ? (
        <p className="muted">Available langs: {b.availableCounsellingLangs.join(", ")}</p>
      ) : null}
      {b.stockoutHint ? <p className="muted">{b.stockoutHint}</p> : null}
      {b.disclaimer ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {b.disclaimer}
        </p>
      ) : null}
    </section>
  );
}

function ColdChainResultPanel({ result }: { result: ColdChainResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Cold-chain notes</h2>
        <p>{result.error}</p>
        {result.available && result.available.length > 0 ? (
          <p className="muted">Available keys: {result.available.join(", ")}</p>
        ) : null}
      </section>
    );
  }
  const notes = result.notes ?? (result.note ? [result.note] : []);
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>Cold-chain notes</h2>
      {notes.length === 0 ? (
        <p className="muted">No published cold-chain notes.</p>
      ) : (
        notes.map((n) => (
          <div key={n.productKey ?? n.title} style={{ marginTop: 12 }}>
            <h3 style={{ marginBottom: 4 }}>{n.title}</h3>
            {n.storage ? <p>{n.storage}</p> : null}
            {(n.loadSheddingSteps ?? []).length > 0 ? (
              <ol style={{ paddingLeft: 20 }}>
                {(n.loadSheddingSteps ?? []).map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            ) : null}
            {n.sourceNote ? <p className="source-tag">source · {n.sourceNote}</p> : null}
          </div>
        ))
      )}
    </section>
  );
}

function SubstitutionResultPanel({ result }: { result: SubstitutionResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Substitute + SEP</h2>
        <p>{result.error}</p>
        {result.upgradeTo ? <p className="muted">Upgrade to {result.upgradeTo}</p> : null}
      </section>
    );
  }
  const options = result.options ?? [];
  const title =
    result.molecule?.innName ?? result.molecule?.slug ?? result.moleculeId ?? "Substitution";
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>Substitute + SEP · {title}</h2>
      {result.selectedProductId ? (
        <p className="muted">Selected product: {result.selectedProductId}</p>
      ) : null}
      {options.length === 0 ? (
        <p className="muted">No published products for substitution.</p>
      ) : (
        <ul style={{ paddingLeft: 20, marginTop: 0 }}>
          {options.map((o) => {
            const delta = formatZarDelta(o.priceDeltaVsSelected);
            const cheapest =
              result.cheapestBioequivalentId && o.productId === result.cheapestBioequivalentId;
            return (
              <li key={o.productId} style={{ marginBottom: 10 }}>
                <strong>{o.brandName}</strong> · {o.strength} · {o.form} · {o.schedule}
                {o.isOriginator ? " · originator" : ""}
                {o.bioequivalentFlag ? " · bioequivalent" : ""}
                {cheapest ? " · cheapest bioeq (published SEP)" : ""}
                <br />
                <span className="muted">
                  SEP {formatPublishedZar(o.sepZar)}
                  {o.sepPublished ? "" : " (unpublished)"}
                  {delta ? ` · Δ vs selected ${delta}` : ""}
                </span>
                <br />
                <span className="muted">{o.rankReason}</span>
              </li>
            );
          })}
        </ul>
      )}
      {result.note ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {result.note}
        </p>
      ) : null}
    </section>
  );
}

function FormularyResultPanel({ result }: { result: FormularyResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Formulary + co-pay</h2>
        <p>{result.error}</p>
        {result.upgradeTo ? <p className="muted">Upgrade to {result.upgradeTo}</p> : null}
      </section>
    );
  }
  const rows = result.rows ?? [];
  const title =
    result.molecule?.innName ?? result.molecule?.slug ?? result.moleculeId ?? "Formulary";
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>
        Formulary + co-pay · {title}
        {result.schemeName ? ` · ${result.schemeName}` : ""}
      </h2>
      {result.selectedProductId ? (
        <p className="muted">Selected product: {result.selectedProductId}</p>
      ) : null}
      {rows.length === 0 ? (
        <p className="muted">No published products for this scheme match.</p>
      ) : (
        <ul style={{ paddingLeft: 20, marginTop: 0 }}>
          {rows.map((r) => {
            const saves = formatZarDelta(r.switchSavesVsSelected);
            const recommended =
              result.recommendedProductId && r.productId === result.recommendedProductId;
            return (
              <li key={r.productId} style={{ marginBottom: 10 }}>
                <strong>{r.brandName}</strong>
                {r.reimbursed ? " · reimbursed" : " · not reimbursed"}
                {r.isOriginator ? " · originator" : ""}
                {r.bioequivalentFlag ? " · bioequivalent" : ""}
                {recommended ? " · recommended" : ""}
                <br />
                <span className="muted">
                  Co-pay {formatPublishedZar(r.coPayEstimateZar)} · SEP{" "}
                  {formatPublishedZar(r.sepZar)}
                  {saves ? ` · switch vs selected ${saves}` : ""}
                </span>
                <br />
                <span className="muted">{r.note}</span>
              </li>
            );
          })}
        </ul>
      )}
      {result.disclaimer ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {result.disclaimer}
        </p>
      ) : null}
    </section>
  );
}

function stockSignalColor(signal: StockSignalView): string {
  return TONE_COLOR[STOCK_SIGNAL_TONE[signal]] ?? TONE_COLOR.slate;
}

function AvailabilityRowList({ rows }: { rows: AvailabilityRowView[] }) {
  return (
    <ul style={{ paddingLeft: 20, marginTop: 0 }}>
      {rows.map((row) => (
        <li key={row.productId} style={{ marginBottom: 12 }}>
          <strong>{row.brandName}</strong> · {row.strength} · {row.form}{" "}
          <span style={{ color: stockSignalColor(row.worstSignal) }}>
            · {row.worstSignal.replace("_", " ")}
          </span>
          {row.isShortage ? " · shortage flag" : ""}
          {(row.signals ?? []).length > 0 ? (
            <ul style={{ paddingLeft: 18, marginTop: 4 }}>
              {row.signals.map((s, i) => (
                <li key={`${row.productId}-${s.wholesaler}-${s.observedAt}-${i}`}>
                  <span style={{ color: stockSignalColor(s.signal) }}>{s.signal}</span>
                  {" · "}
                  {s.wholesaler} · observed {s.observedAt}
                  {s.note ? ` — ${s.note}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted" style={{ margin: "4px 0 0" }}>
              No published wholesaler signals for this product.
            </p>
          )}
          {row.alternativesHint ? <p className="muted">{row.alternativesHint}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function AvailabilityResultPanel({ result }: { result: AvailabilityResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Availability</h2>
        <p>{result.error}</p>
        {result.upgradeTo ? <p className="muted">Upgrade to {result.upgradeTo}</p> : null}
      </section>
    );
  }
  const rows = result.rows ?? [];
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>
        Availability{result.moleculeSlug ? ` · ${result.moleculeSlug}` : ""}
      </h2>
      {rows.length === 0 ? (
        <p className="muted">
          No published availability signals — empty ≠ reassuring; confirm stock locally.
        </p>
      ) : (
        <AvailabilityRowList rows={rows} />
      )}
      {result.note ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {result.note}
        </p>
      ) : null}
    </section>
  );
}

function ShortagesResultPanel({ result }: { result: ShortagesResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Active shortages</h2>
        <p>{result.error}</p>
        {result.upgradeTo ? <p className="muted">Upgrade to {result.upgradeTo}</p> : null}
      </section>
    );
  }
  const rows = result.shortages ?? [];
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>Active shortages</h2>
      {rows.length === 0 ? (
        <p className="muted">
          No published active shortages — empty ≠ all clear; confirm stock locally.
        </p>
      ) : (
        <AvailabilityRowList rows={rows} />
      )}
      {result.note ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {result.note}
        </p>
      ) : null}
    </section>
  );
}

function PharmacyLocatorResultPanel({ result }: { result: PharmacyLocatorResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Pharmacy locator</h2>
        <p>{result.error}</p>
        {result.upgradeTo ? <p className="muted">Upgrade to {result.upgradeTo}</p> : null}
      </section>
    );
  }
  const hits = result.pharmacies ?? [];
  const sub = result.substitution;
  const molLabel = result.molecule?.innName ?? result.molecule?.slug;
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>
        Pharmacy locator
        {result.city ? ` · ${result.city}` : ""}
        {molLabel ? ` · ${molLabel}` : ""}
      </h2>
      {hits.length === 0 ? (
        <p className="muted">No published pharmacy fixtures for this query.</p>
      ) : (
        <ul style={{ paddingLeft: 20, marginTop: 0 }}>
          {hits.map((hit) => {
            const p = hit.pharmacy;
            return (
              <li key={p.id} style={{ marginBottom: 10 }}>
                <strong>{p.name}</strong>
                {p.chain ? ` · ${p.chain}` : ""}
                <br />
                <span className="muted">
                  {p.suburb}
                  {hit.distanceKm != null ? ` · ~${hit.distanceKm.toFixed(1)} km` : ""}
                  {hit.cityMatch ? " · city match" : ""}
                </span>
                <br />
                <span className="muted">{p.hoursNote}</span>
                {p.phoneDisplay ? (
                  <>
                    <br />
                    <span className="muted">Display phone: {p.phoneDisplay} (confirm locally)</span>
                  </>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
      {result.refillPrompt ? (
        <>
          <h3 style={{ marginBottom: 4 }}>Refill / SEP prompt</h3>
          <p>{result.refillPrompt}</p>
        </>
      ) : null}
      {sub && (sub.options?.length ?? 0) > 0 ? (
        <>
          <h3 style={{ marginBottom: 4 }}>Published substitution / SEP context</h3>
          <ul style={{ paddingLeft: 20, marginTop: 0 }}>
            {(sub.options ?? []).slice(0, 5).map((o) => (
              <li key={o.productId} style={{ marginBottom: 6 }}>
                <strong>{o.brandName}</strong> · {o.strength} · SEP{" "}
                {formatPublishedZar(o.sepZar)}
                {o.bioequivalentFlag ? " · bioequivalent" : ""}
              </li>
            ))}
          </ul>
          {sub.note ? <p className="muted">{sub.note}</p> : null}
        </>
      ) : null}
      {result.note ? <p className="muted">{result.note}</p> : null}
      {result.disclaimer ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {result.disclaimer}
        </p>
      ) : null}
    </section>
  );
}

function OfflinePackResultPanel({ result }: { result: OfflinePackResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Offline pack</h2>
        <p>{result.error}</p>
        {result.upgradeTo ? <p className="muted">Upgrade to {result.upgradeTo}</p> : null}
      </section>
    );
  }
  const essentials = result.essentials ?? [];
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>
        Offline pack
        {result.fromCache ? " · browser cache" : " · freshly generated"}
        {typeof result.count === "number" ? ` · ${result.count}` : ""}
      </h2>
      {result.generatedAt ? (
        <p className="muted">Generated {result.generatedAt}</p>
      ) : null}
      {essentials.length === 0 ? (
        <p className="muted">No essentials in this pack — empty ≠ safe offline coverage.</p>
      ) : (
        essentials.map((e) => (
          <div key={e.moleculeId} style={{ marginTop: 16 }}>
            <h3 style={{ marginBottom: 4 }}>
              {e.innName} · {e.className}
            </h3>
            <p className="muted">
              {e.slug}
              {(e.scheduleHints ?? []).length > 0
                ? ` · schedules ${e.scheduleHints.join(", ")}`
                : ""}
              {e.cachedAt ? ` · cached ${e.cachedAt}` : ""}
            </p>
            <h4 style={{ marginBottom: 4 }}>Counselling (EN)</h4>
            {(e.counsellingEn ?? []).length === 0 ? (
              <p className="muted">No published counselling lines in pack.</p>
            ) : (
              <ol style={{ paddingLeft: 20, marginTop: 0 }}>
                {e.counsellingEn.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ol>
            )}
            <h4 style={{ marginBottom: 4 }}>Overdose first aid</h4>
            <ol style={{ paddingLeft: 20, marginTop: 0 }}>
              {(e.overdoseFirstAid ?? []).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {e.disclaimer ? (
              <p className="muted" style={{ marginBottom: 0 }}>
                {e.disclaimer}
              </p>
            ) : null}
          </div>
        ))
      )}
    </section>
  );
}

function VisionResolveResultPanel({ result }: { result: VisionResolveResult }) {
  if (result.error) {
    return (
      <section className="card" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Pack / barcode resolve</h2>
        <p>{result.error}</p>
        {result.upgradeTo ? <p className="muted">Upgrade to {result.upgradeTo}</p> : null}
      </section>
    );
  }
  const hits = result.hits ?? [];
  return (
    <section className="card" aria-live="polite">
      <h2 style={{ marginTop: 0 }}>Pack / barcode resolve</h2>
      {hits.length === 0 ? (
        <p className="muted">
          No published matches — empty ≠ unidentified. Try another barcode, brand, or form cue;
          confirm the physical pack.
        </p>
      ) : (
        <ul style={{ paddingLeft: 20, marginTop: 0 }}>
          {hits.map((h) => (
            <li key={`${h.kind}-${h.moleculeId}-${h.query}`} style={{ marginBottom: 10 }}>
              <strong>{h.moleculeName}</strong>
              {h.brandName ? ` · ${h.brandName}` : ""} · {h.moleculeSlug}
              <br />
              <span className="muted">
                {h.kind} · confidence {h.confidence} · query “{h.query}”
              </span>
              <br />
              <span className="muted">{h.note}</span>
            </li>
          ))}
        </ul>
      )}
      {result.note ? (
        <p className="muted" style={{ marginBottom: 0 }}>
          {result.note}
        </p>
      ) : null}
    </section>
  );
}
