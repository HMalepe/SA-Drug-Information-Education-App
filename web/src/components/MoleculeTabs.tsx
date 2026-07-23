"use client";

import { useState, type CSSProperties } from "react";
import { track } from "@/lib/analytics";

interface TabBody {
  title: string;
  body: unknown;
  sources: Array<{ citation: string; lastReviewed: string }>;
}

export function MoleculeTabs({
  tabOrder,
  tabs,
  defaultTab,
  moleculeSlug,
}: {
  tabOrder: Array<{ id: string; label: string }>;
  tabs: Record<string, TabBody>;
  defaultTab: string;
  moleculeSlug?: string;
}) {
  const [active, setActive] = useState(defaultTab);
  const tab = tabs[active];

  function openTab(id: string) {
    setActive(id);
    track("tab_opened", { tabId: id, moleculeSlug });
  }

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Medicine 360 tabs">
        {tabOrder.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            className={`tab${active === t.id ? " active" : ""}`}
            onClick={() => openTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab && (
        <section className="card" aria-live="polite">
          <h2 style={{ marginTop: 0 }}>{tab.title}</h2>
          {modeFramingOf(tab.body) && <p className="mode-framing">{modeFramingOf(tab.body)}</p>}
          {active === "overdose" ? (
            <EmergencyPanel body={tab.body as Record<string, unknown>} />
          ) : active === "sa-products" ? (
            <SaProductsPanel body={tab.body as Record<string, unknown>} />
          ) : active === "animations" ? (
            <VisualIdPanel body={tab.body as Record<string, unknown>} />
          ) : (
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "inherit",
                margin: 0,
                fontSize: 16,
                lineHeight: 1.5,
              }}
            >
              {JSON.stringify(tab.body, null, 2)}
            </pre>
          )}
          {tab.sources?.map((s) => (
            <div key={s.citation} className="source-tag">
              source · {s.citation} · reviewed {s.lastReviewed}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function modeFramingOf(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const framing = (body as { modeFraming?: unknown }).modeFraming;
  return typeof framing === "string" && framing.trim() ? framing : null;
}

function EmergencyPanel({ body }: { body: Record<string, unknown> }) {
  return (
    <div className="emergency">
      <h3>Call emergency services / Poisons Centre</h3>
      <p>
        <strong>{String(body.callEmergency ?? "")}</strong>
      </p>
      <p>
        <strong>Early signs:</strong> {String(body.earlySigns ?? "")}
      </p>
      <p>
        <strong>Severe signs:</strong> {String(body.severeSigns ?? "")}
      </p>
      <p>
        <strong>Antidote / supportive:</strong> {String(body.antidoteOrSupportive ?? "")}
      </p>
      <ol>
        {Array.isArray(body.whatToDo) &&
          body.whatToDo.map((step) => <li key={String(step)}>{String(step)}</li>)}
      </ol>
      <p className="muted">{String(body.disclaimer ?? "")}</p>
    </div>
  );
}

type ExcipientExplanation = {
  id: string;
  name: string;
  purpose?: string;
  allergyRisk?: string;
  absorptionNote?: string;
  canBecomeActive?: boolean;
  inactiveUntilNote?: string;
  plainLanguage?: string;
  counsellingCue?: string;
};

type ProductRow = {
  id: string;
  brandName: string;
  form?: string;
  strength?: string;
  schedule?: string;
  manufacturer?: { name?: string } | null;
  excipients?: ExcipientExplanation[];
  excipientEmptyNote?: string;
  visual?: {
    kind: string;
    label: string;
    placeholderNote?: string;
  };
};

function SaProductsPanel({ body }: { body: Record<string, unknown> }) {
  const products = (Array.isArray(body.lineage) ? body.lineage : []) as ProductRow[];
  const note = String(body.explainerNote ?? "");
  const visualNote = String(body.visualNote ?? "");

  return (
    <div>
      {note ? <p className="muted">{note}</p> : null}
      {visualNote ? <p className="muted">{visualNote}</p> : null}
      {products.length === 0 ? (
        <p className="muted">No published SA products linked yet.</p>
      ) : (
        products.map((p) => (
          <article key={p.id} style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ marginBottom: "0.35rem" }}>{p.brandName}</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              {[p.strength, p.form, p.schedule, p.manufacturer?.name].filter(Boolean).join(" · ")}
              {p.visual?.label ? ` · Visual: ${p.visual.label}` : ""}
            </p>
            {p.visual ? <VisualSilhouette kind={p.visual.kind} label={p.visual.label} /> : null}
            <h4 style={{ marginBottom: "0.35rem" }}>Excipients (inactive ingredients)</h4>
            {(p.excipients ?? []).length === 0 ? (
              <p className="muted">{p.excipientEmptyNote ?? "No excipient list on this product row yet."}</p>
            ) : (
              <ul style={{ paddingLeft: "1.1rem", marginTop: 0 }}>
                {(p.excipients ?? []).map((e) => (
                  <li key={`${p.id}-${e.id}`} style={{ marginBottom: "0.65rem" }}>
                    <strong>{e.name}</strong>
                    {e.purpose ? <span className="muted"> — {e.purpose}</span> : null}
                    {e.plainLanguage ? <div>{e.plainLanguage}</div> : null}
                    {e.inactiveUntilNote ? (
                      <div className="muted" style={{ fontSize: 14 }}>
                        {e.inactiveUntilNote}
                      </div>
                    ) : null}
                    {e.allergyRisk ? (
                      <div className="muted" style={{ fontSize: 13 }}>
                        Allergy lens: {e.allergyRisk}
                      </div>
                    ) : null}
                    {e.counsellingCue ? (
                      <div className="muted" style={{ fontSize: 13 }}>
                        Counselling: {e.counsellingCue}
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))
      )}
    </div>
  );
}

type VisualCard = {
  productId: string;
  brandName: string;
  form: string;
  kind: string;
  label: string;
  placeholderNote?: string;
};

function VisualIdPanel({ body }: { body: Record<string, unknown> }) {
  const cards = (Array.isArray(body.cards) ? body.cards : []) as VisualCard[];
  const note = String(body.note ?? "");
  const cameraNote = String(body.cameraNote ?? "");

  return (
    <div>
      {note ? <p className="muted">{note}</p> : null}
      {cameraNote ? <p className="muted">{cameraNote}</p> : null}
      {cards.length === 0 ? (
        <p className="muted">No published products to silhouette yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 12,
            marginTop: 12,
          }}
        >
          {cards.map((c) => (
            <article key={c.productId} style={{ textAlign: "center" }}>
              <VisualSilhouette kind={c.kind} label={c.label} />
              <strong style={{ display: "block", marginTop: 8, fontSize: 14 }}>{c.brandName}</strong>
              <span className="muted" style={{ fontSize: 13 }}>
                {c.form}
              </span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function VisualSilhouette({ kind, label }: { kind: string; label: string }) {
  const shape: Record<string, CSSProperties> = {
    tablet: { width: 56, height: 28, borderRadius: 14, background: "var(--accent, #2a6f6a)" },
    capsule: {
      width: 64,
      height: 26,
      borderRadius: 13,
      background: "linear-gradient(90deg, #2a6f6a 50%, #c45c26 50%)",
    },
    vial: { width: 28, height: 56, borderRadius: "6px 6px 4px 4px", background: "#5a7a8a" },
    inhaler: { width: 36, height: 64, borderRadius: "8px 8px 4px 4px", background: "#3d6b9a" },
    patch: { width: 52, height: 40, borderRadius: 6, background: "#c4a574" },
    syrup: { width: 36, height: 56, borderRadius: "4px 4px 10px 10px", background: "#8a5a9a" },
    cream: { width: 48, height: 36, borderRadius: 4, background: "#9a8a6a" },
    injection: { width: 20, height: 60, borderRadius: 2, background: "#6a7a8a" },
    spray: { width: 32, height: 52, borderRadius: "10px 10px 4px 4px", background: "#4a8a7a" },
    box: { width: 64, height: 40, borderRadius: 2, background: "#6a5a4a" },
    other: { width: 48, height: 48, borderRadius: 8, background: "#6a6a6a" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div
        aria-hidden
        style={{
          ...(shape[kind] ?? shape.other),
          margin: "8px auto",
          opacity: 0.85,
        }}
      />
      <span className="muted" style={{ fontSize: 12 }}>
        {label}
      </span>
    </div>
  );
}
