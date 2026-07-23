"use client";

import { useState } from "react";
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
          {active === "overdose" ? (
            <EmergencyPanel body={tab.body as Record<string, unknown>} />
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
