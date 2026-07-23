"use client";

import { useEffect, useState } from "react";
import { isBrowserOffline, loadOfflinePack, saveOfflinePack } from "@/lib/offlineCache";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function ToolsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [slug, setSlug] = useState("amoxicillin");
  const [lang, setLang] = useState("en");
  const [sub, setSub] = useState("");
  const [counsel, setCounsel] = useState("");
  const [offlineMsg, setOfflineMsg] = useState("");
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
    // upgrade to pro via billing stub
    await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: data.user.id, tier: "professional" }),
    });
    setUserId(data.user.id);
    return data.user.id as string;
  }

  async function runSubstitution() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/substitution/${encodeURIComponent(slug)}?userId=${uid}&selectedProductId=prod-amoxil`,
    );
    const data = await res.json();
    setSub(JSON.stringify(data, null, 2));
  }

  async function runCounselling() {
    const uid = await ensurePro();
    const res = await fetch(
      `${API}/tools/counselling/${encodeURIComponent(slug)}?userId=${uid}&lang=${lang}`,
    );
    const data = await res.json();
    setCounsel(JSON.stringify(data, null, 2));
  }

  async function cacheOffline() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/offline/pack?userId=${uid}`);
    const data = await res.json();
    if (!res.ok) {
      setOfflineMsg(JSON.stringify(data));
      return;
    }
    saveOfflinePack(data);
    setOfflineMsg(`Cached ${data.count} molecules at ${data.generatedAt}`);
  }

  function readCache() {
    const pack = loadOfflinePack();
    setOfflineMsg(pack ? JSON.stringify(pack, null, 2) : "No offline pack in localStorage.");
  }

  return (
    <>
      <h1>Pro tools</h1>
      <p className="tagline">
        Substitution · multilingual counselling · offline core (Professional).
        {offlineBadge && (
          <span className="chip-red" style={{ marginLeft: 8 }}>
            Offline
          </span>
        )}
      </p>
      <div className="card">
        <label className="muted">Molecule slug</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <button className="btn" type="button" onClick={() => void runSubstitution()}>
          Substitute + SEP rank
        </button>
      </div>
      {sub && (
        <pre className="card" style={{ whiteSpace: "pre-wrap" }}>
          {sub}
        </pre>
      )}
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
          <option value="st">Sesotho (draft — may 404)</option>
          <option value="xh">isiXhosa (draft — may 404)</option>
        </select>
        <button className="btn" type="button" onClick={() => void runCounselling()}>
          Load counselling script
        </button>
      </div>
      {counsel && (
        <pre className="card" style={{ whiteSpace: "pre-wrap" }}>
          {counsel}
        </pre>
      )}
      <div className="card">
        <button className="btn" type="button" onClick={() => void cacheOffline()}>
          Download offline pack
        </button>{" "}
        <button
          className="btn"
          type="button"
          style={{ background: "var(--ink)" }}
          onClick={readCache}
        >
          Read local cache
        </button>
      </div>
      {offlineMsg && (
        <pre className="card" style={{ whiteSpace: "pre-wrap" }}>
          {offlineMsg}
        </pre>
      )}
    </>
  );
}
