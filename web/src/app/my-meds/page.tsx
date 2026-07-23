"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type ClashRow = {
  id: string;
  kind: string;
  tone: "red" | "orange" | "yellow" | "slate";
  title: string;
  detail: string;
};

export default function MyMedsPage() {
  const [email, setEmail] = useState("patient@materiatest.za");
  const [userId, setUserId] = useState<string | null>(null);
  const [nowHhmm, setNowHhmm] = useState("08:00");
  const [msg, setMsg] = useState("");
  const [regimenNote, setRegimenNote] = useState("");
  const [clashRows, setClashRows] = useState<ClashRow[]>([]);
  const [clashMeta, setClashMeta] = useState("");
  const [symptomLabel, setSymptomLabel] = useState("nausea");
  const [symptomAt, setSymptomAt] = useState("2026-07-20");
  const [symptomSeverity, setSymptomSeverity] = useState(2);
  const [symptomExport, setSymptomExport] = useState("");
  const [depName, setDepName] = useState("Mama Thandi");
  const [depRelation, setDepRelation] = useState("parent");
  const [dependants, setDependants] = useState<Array<{ id: string; displayName: string; relation: string }>>([]);
  const [activeDependantId, setActiveDependantId] = useState<string>("");
  const [foodCues, setFoodCues] = useState<
    Array<{ moleculeName: string; tags: string[]; publishedNote: string; reminderHint: string }>
  >([]);
  const [foodMeta, setFoodMeta] = useState("");
  const [refillRows, setRefillRows] = useState<
    Array<{
      moleculeName: string;
      status: string;
      statusLabel: string;
      refillDueOn: string | null;
      sepPrompt: string | null;
    }>
  >([]);
  const [refillMeta, setRefillMeta] = useState("");
  const [out, setOut] = useState("");

  async function start() {
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mode: "patient", tier: "free" }),
    });
    const data = await res.json();
    setUserId(data.user.id);
    setMsg("Session ready. Sample Amoxicillin regimen (support only).");
    await fetch(`${API}/companion/regimen/${data.user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            moleculeId: "mol-amox",
            moleculeName: "Amoxicillin",
            brandName: "Amoxil",
            reminderTimes: ["08:00", "20:00"],
            refillDueOn: "2026-07-25",
            lastFilledOn: "2026-06-27",
            packDaysUser: 28,
          },
        ],
      }),
    });
    await fetch(`${API}/companion/reminders/prefs/${data.user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channels: ["in_app", "email"],
        email,
        timezone: "Africa/Johannesburg",
        consentMessaging: true,
      }),
    });
    const check = await fetch(`${API}/companion/interactions/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: data.user.id }),
    });
    const clash = await check.json();
    if (check.status === 402) {
      setRegimenNote(`${clash.error} — upgrade to Student for full interaction check.`);
    } else {
      setRegimenNote(clash.note);
    }
    const deps = await fetch(`${API}/companion/dependants/${data.user.id}`);
    const depData = await deps.json();
    setDependants(Array.isArray(depData.profiles) ? depData.profiles : []);
  }

  async function addDependant() {
    if (!userId) return;
    const res = await fetch(`${API}/companion/dependants/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName: depName, relation: depRelation }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(String(data.error ?? "Could not add profile"));
      return;
    }
    setDependants(Array.isArray(data.profiles) ? data.profiles : []);
    if (data.profile?.id) {
      setActiveDependantId(data.profile.id);
      await fetch(`${API}/companion/regimen/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dependantId: data.profile.id,
          items: [
            {
              moleculeId: "mol-amox",
              moleculeName: "Amoxicillin",
              brandName: "Amoxil",
              reminderTimes: ["08:00"],
            },
          ],
        }),
      });
      setMsg(`Caregiver profile ready for ${data.profile.displayName}. Sample regimen scoped to them.`);
    }
  }

  async function removeDependant(id: string) {
    if (!userId) return;
    const res = await fetch(`${API}/companion/dependants/${userId}/${id}`, { method: "DELETE" });
    const data = await res.json();
    setDependants(Array.isArray(data.profiles) ? data.profiles : []);
    if (activeDependantId === id) setActiveDependantId("");
  }

  async function loadClashBoard() {
    if (!userId) return;
    await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, tier: "professional" }),
    });
    const res = await fetch(`${API}/tools/clash-board`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (res.status === 402) {
      setClashMeta(String(data.error ?? "Pro required"));
      setClashRows([]);
      return;
    }
    setClashRows(Array.isArray(data.rows) ? data.rows : []);
    setClashMeta(
      `${data.note ?? ""} · red ${data.summary?.red ?? 0} · orange ${data.summary?.orange ?? 0} · yellow ${data.summary?.yellow ?? 0}`,
    );
  }

  async function logSymptom() {
    if (!userId) return;
    const res = await fetch(`${API}/companion/symptoms/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dependantId: activeDependantId || undefined,
        at: symptomAt,
        label: symptomLabel,
        severity: symptomSeverity,
        moleculeId: "mol-amox",
        moleculeName: "Amoxicillin",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setSymptomExport(String(data.error ?? "Could not log symptom"));
      return;
    }
    setSymptomExport(data.exportText ?? JSON.stringify(data, null, 2));
  }

  async function exportSymptoms() {
    if (!userId) return;
    const qs = activeDependantId ? `?format=text&dependantId=${encodeURIComponent(activeDependantId)}` : "?format=text";
    const res = await fetch(`${API}/companion/symptoms/${userId}/export${qs}`);
    setSymptomExport(await res.text());
  }

  async function preview() {
    if (!userId) return;
    const res = await fetch(`${API}/companion/reminders/${userId}?from=${nowHhmm}`);
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function dispatch() {
    if (!userId) return;
    const res = await fetch(`${API}/companion/reminders/dispatch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, nowHhmm }),
    });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function loadFoodTiming() {
    if (!userId) return;
    const qs = activeDependantId ? `?dependantId=${encodeURIComponent(activeDependantId)}` : "";
    const res = await fetch(`${API}/companion/food-timing/${userId}${qs}`);
    const data = await res.json();
    if (!res.ok) {
      setFoodMeta(String(data.error ?? "Could not load food timing"));
      setFoodCues([]);
      return;
    }
    setFoodMeta(`${data.note} ${data.disclaimer}`);
    setFoodCues(Array.isArray(data.cues) ? data.cues : []);
  }

  async function loadRefills() {
    if (!userId) return;
    const qsParts = ["asOf=2026-07-23"];
    if (activeDependantId) qsParts.push(`dependantId=${encodeURIComponent(activeDependantId)}`);
    const res = await fetch(`${API}/companion/refills/${userId}?${qsParts.join("&")}`);
    const data = await res.json();
    if (!res.ok) {
      setRefillMeta(String(data.error ?? "Could not load refills"));
      setRefillRows([]);
      return;
    }
    setRefillMeta(`${data.note ?? ""} ${data.disclaimer ?? ""}`);
    setRefillRows(Array.isArray(data.rows) ? data.rows : []);
  }

  return (
    <>
      <h1>My Meds</h1>
      <p className="tagline">
        Reminders and tracking — support only. Never changes your dose.
      </p>
      <div className="card">
        <input
          style={{ width: "100%", padding: 12, marginBottom: 12 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn" type="button" onClick={() => void start()}>
          Set up sample regimen + consent
        </button>
      </div>
      {userId && (
        <div className="card" style={{ marginTop: 12 }}>
          <h2 style={{ marginTop: 0 }}>Caregiver profiles (§6)</h2>
          <p className="muted">
            Organise a parent or child&apos;s reminders from one account — support only, never prescribing.
          </p>
          <label className="muted">Display name</label>
          <input
            style={{ display: "block", width: "100%", margin: "8px 0", padding: 10 }}
            value={depName}
            onChange={(e) => setDepName(e.target.value)}
          />
          <label className="muted">Relation</label>
          <select
            value={depRelation}
            onChange={(e) => setDepRelation(e.target.value)}
            style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          >
            <option value="parent">Parent</option>
            <option value="child">Child</option>
            <option value="spouse">Spouse</option>
            <option value="other">Other</option>
            <option value="self">Self</option>
          </select>
          <button className="btn" type="button" onClick={() => void addDependant()}>
            Add dependant profile
          </button>
          {dependants.length > 0 && (
            <ul style={{ marginTop: 16, paddingLeft: 18 }}>
              {dependants.map((d) => (
                <li key={d.id} style={{ marginBottom: 8 }}>
                  <button
                    type="button"
                    className={`tab${activeDependantId === d.id ? " active" : ""}`}
                    onClick={() => setActiveDependantId(d.id)}
                  >
                    {d.displayName} · {d.relation}
                  </button>{" "}
                  <button className="btn" type="button" onClick={() => void removeDependant(d.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          {activeDependantId && (
            <p className="muted">Active scope: {activeDependantId} (regimen/symptoms use this profile)</p>
          )}
        </div>
      )}
      {userId && (
        <div className="card" style={{ marginTop: 12 }}>
          <label className="muted">Clock tick (HH:mm) for dispatch preview</label>
          <input
            style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
            value={nowHhmm}
            onChange={(e) => setNowHhmm(e.target.value)}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button className="btn" type="button" onClick={() => void preview()}>
              Preview upcoming
            </button>
            <button className="btn" type="button" onClick={() => void dispatch()}>
              Dispatch due now
            </button>
            <button className="btn" type="button" onClick={() => void loadClashBoard()}>
              Clash board (Pro)
            </button>
            <button className="btn" type="button" onClick={() => void loadFoodTiming()}>
              Food timing (§6)
            </button>
            <button className="btn" type="button" onClick={() => void loadRefills()}>
              Refill board (§6)
            </button>
          </div>
          <p className="muted" style={{ marginTop: 8 }}>
            Email/SMS/WhatsApp stay stub-logged until Resend/Twilio keys.
          </p>
        </div>
      )}
      {userId && (
        <div className="card" style={{ marginTop: 12 }}>
          <h2 style={{ marginTop: 0 }}>Symptom diary (§6)</h2>
          <p className="muted">
            Patient-authored only — Materia does not diagnose or tell you to stop a medicine.
          </p>
          <label className="muted">Date</label>
          <input
            style={{ display: "block", width: "100%", margin: "8px 0", padding: 10 }}
            value={symptomAt}
            onChange={(e) => setSymptomAt(e.target.value)}
          />
          <label className="muted">Symptom label</label>
          <input
            style={{ display: "block", width: "100%", margin: "8px 0", padding: 10 }}
            value={symptomLabel}
            onChange={(e) => setSymptomLabel(e.target.value)}
          />
          <label className="muted">Severity (1–5)</label>
          <input
            type="number"
            min={1}
            max={5}
            style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
            value={symptomSeverity}
            onChange={(e) => setSymptomSeverity(Number(e.target.value))}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button className="btn" type="button" onClick={() => void logSymptom()}>
              Log vs Amoxicillin
            </button>
            <button className="btn" type="button" onClick={() => void exportSymptoms()}>
              Export for clinician
            </button>
          </div>
          {symptomExport && (
            <pre style={{ marginTop: 12, whiteSpace: "pre-wrap", fontSize: 13 }}>{symptomExport}</pre>
          )}
        </div>
      )}
      {userId && <p className="muted">User: {userId}</p>}
      {msg && <p>{msg}</p>}
      {regimenNote && <div className="card">{regimenNote}</div>}
      {clashMeta && (
        <div className="card" style={{ marginTop: 12 }}>
          <h2 style={{ marginTop: 0 }}>Clash board</h2>
          <p className="muted">{clashMeta}</p>
          <div className="clash-board">
            {clashRows.map((row) => (
              <article key={row.id} className={`clash-row tone-${row.tone}`}>
                <strong>{row.title}</strong>
                <p className="muted" style={{ margin: "4px 0 0" }}>
                  {row.detail}
                </p>
                <span className="clash-kind">{row.kind}</span>
              </article>
            ))}
            {clashRows.length === 0 && <p className="muted">No published flags on this list.</p>}
          </div>
        </div>
      )}
      {foodMeta && (
        <div className="card" style={{ marginTop: 12 }}>
          <h2 style={{ marginTop: 0 }}>Food &amp; lifestyle timing</h2>
          <p className="muted">{foodMeta}</p>
          {foodCues.map((c) => (
            <article key={`${c.moleculeName}-${c.publishedNote.slice(0, 24)}`} style={{ marginTop: 12 }}>
              <strong>{c.moleculeName}</strong>
              <div className="muted">{c.tags.join(" · ")}</div>
              <p style={{ margin: "6px 0" }}>{c.publishedNote}</p>
              <p className="muted" style={{ fontSize: 13 }}>
                {c.reminderHint}
              </p>
            </article>
          ))}
          {foodCues.length === 0 && <p className="muted">No published food notes on this regimen yet.</p>}
        </div>
      )}
      {refillMeta && (
        <div className="card" style={{ marginTop: 12 }}>
          <h2 style={{ marginTop: 0 }}>Refill dates</h2>
          <p className="muted">{refillMeta}</p>
          {refillRows.map((r) => (
            <article key={`${r.moleculeName}-${r.refillDueOn ?? "unset"}`} style={{ marginTop: 12 }}>
              <strong>
                {r.moleculeName} · {r.status}
              </strong>
              {r.refillDueOn && <div className="muted">Marked due {r.refillDueOn}</div>}
              <p style={{ margin: "6px 0" }}>{r.statusLabel}</p>
              {r.sepPrompt && (
                <p className="muted" style={{ fontSize: 13 }}>
                  {r.sepPrompt}
                </p>
              )}
            </article>
          ))}
          {refillRows.length === 0 && <p className="muted">No regimen items yet.</p>}
        </div>
      )}
      {out && (
        <pre className="card" style={{ marginTop: 16, whiteSpace: "pre-wrap", fontSize: 13 }}>
          {out}
        </pre>
      )}
    </>
  );
}
