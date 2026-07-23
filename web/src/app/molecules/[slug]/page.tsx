import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MoleculeTabs } from "@/components/MoleculeTabs";
import { AskMateria } from "@/components/AskMateria";
import { apiGet, API_BASE } from "@/lib/api";

interface MoleculeView {
  molecule: {
    slug: string;
    innName: string;
    className: string;
    atcCode?: string;
  };
  defaultTab: string;
  tabOrder: Array<{ id: string; label: string }>;
  tabs: Record<string, { title: string; body: unknown; sources: Array<{ citation: string; lastReviewed: string }> }>;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const view = await apiGet<MoleculeView>(`/molecules/${slug}`);
    return {
      title: view.molecule.innName,
      description: `${view.molecule.innName} — ${view.molecule.className}. South African molecule-first medicine page on Materia.`,
      alternates: { canonical: `/molecules/${slug}` },
      openGraph: {
        title: `${view.molecule.innName} · Materia`,
        description: "Molecule-first SA medicine understanding.",
        type: "article",
      },
    };
  } catch {
    return { title: "Molecule" };
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE}/molecules`, { cache: "no-store" });
    if (!res.ok) return [{ slug: "amoxicillin" }];
    const data = (await res.json()) as { molecules: Array<{ slug: string }> };
    return data.molecules.map((m) => ({ slug: m.slug }));
  } catch {
    return [{ slug: "amoxicillin" }];
  }
}

export default async function MoleculePage({ params }: Props) {
  const { slug } = await params;
  let view: MoleculeView | null = null;
  try {
    view = await apiGet<MoleculeView>(`/molecules/${slug}?mode=pharmacist`);
  } catch {
    view = null;
  }
  if (!view) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: view.molecule.innName,
    about: view.molecule.innName,
    description: view.molecule.className,
    isPartOf: { "@type": "WebSite", name: "Materia" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="muted">Medicine 360°</p>
      <h1 style={{ margin: "0 0 4px" }}>{view.molecule.innName}</h1>
      <p className="muted">
        {view.molecule.className}
        {view.molecule.atcCode ? ` · ATC ${view.molecule.atcCode}` : ""}
      </p>
      <MoleculeTabs
        tabOrder={view.tabOrder}
        tabs={view.tabs}
        defaultTab={view.defaultTab}
      />
      <AskMateria moleculeSlug={slug} />
    </>
  );
}
