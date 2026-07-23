"use client";

import { useEffect, useState } from "react";
import { MoleculeTabs } from "@/components/MoleculeTabs";
import { AskMateria } from "@/components/AskMateria";
import { useUserMode } from "@/components/ModeProvider";
import { API_BASE } from "@/lib/api";

interface MoleculeView {
  molecule: {
    slug: string;
    innName: string;
    className: string;
    atcCode?: string;
  };
  mode?: string;
  modeLens?: {
    label: string;
    vocabulary: string;
    emphasizes: string[];
  };
  defaultTab: string;
  tabOrder: Array<{ id: string; label: string }>;
  tabs: Record<string, { title: string; body: unknown; sources: Array<{ citation: string; lastReviewed: string }> }>;
}

export function ModeAwareMolecule({
  slug,
  initialView,
}: {
  slug: string;
  initialView: MoleculeView;
}) {
  const { mode, ready } = useUserMode();
  const [view, setView] = useState(initialView);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/molecules/${encodeURIComponent(slug)}?mode=${mode}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as MoleculeView;
        if (!cancelled) setView(data);
      } catch {
        /* keep last good view */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [mode, ready, slug]);

  return (
    <>
      {view.modeLens && (
        <p className="muted" style={{ marginTop: 8 }}>
          {view.modeLens.label}
          {loading ? " · updating…" : ""} · emphasises {view.modeLens.emphasizes.slice(0, 3).join(", ")}
        </p>
      )}
      <MoleculeTabs
        key={`${mode}-${view.defaultTab}`}
        tabOrder={view.tabOrder}
        tabs={view.tabs}
        defaultTab={view.defaultTab}
        moleculeSlug={slug}
      />
      <AskMateria moleculeSlug={slug} />
    </>
  );
}
