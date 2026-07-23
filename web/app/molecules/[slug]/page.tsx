import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { colors } from "@materia/design-tokens";
import { MEDICINE_360_TABS } from "@materia/shared";
import { fetchMedicine360, fetchMolecules } from "../../../lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const data = await fetchMolecules();
    return data.molecules.map((m) => ({ slug: m.slug }));
  } catch {
    return [{ slug: "amoxicillin" }];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchMedicine360(slug);
  if (!page) return { title: "Molecule not found" };
  const title = `${page.molecule.innName} — Medicine 360°`;
  const description = `${page.molecule.innName} (${page.molecule.className}) on Materia. Sourced, review-gated SA medicine intelligence.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
    alternates: { canonical: `/molecules/${slug}` },
  };
}

export default async function MoleculeSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = await fetchMedicine360(slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: page.molecule.innName,
    about: {
      "@type": "Drug",
      name: page.molecule.innName,
      drugClass: page.molecule.className,
    },
    description:
      "Materia reference page. Clinical values are sourced and review-gated. Not a medical device.",
    audience: "https://schema.org/Clinician",
    specialty: "Pharmacy",
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p style={{ color: colors.teal, fontWeight: 700, marginBottom: 4 }}>Medicine 360°</p>
      <h1 style={{ fontSize: 44, margin: "0 0 8px", color: colors.ink }}>{page.molecule.innName}</h1>
      <p style={{ color: colors.slate }}>{page.molecule.className}</p>
      <p style={{ color: colors.slate, fontSize: 14 }}>
        Only published, sourced facts render. Empty states are intentional content.
      </p>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ color: colors.deepTeal }}>15 standardized tabs</h2>
        <ol style={{ paddingLeft: 20, color: colors.ink }}>
          {MEDICINE_360_TABS.map((t) => {
            const live = page.tabs[t.id];
            const hasSources = (live?.sources?.length ?? 0) > 0;
            return (
              <li key={t.id} style={{ marginBottom: 8 }}>
                <strong>{t.label}</strong>
                <span style={{ color: colors.slate }}>
                  {" "}
                  — {hasSources ? "sourced content" : "empty / scaffold state"}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <section style={{ marginTop: 24, background: colors.white, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Tab payloads</h2>
        {Object.entries(page.tabs).map(([id, t]) => (
          <div key={id} style={{ marginBottom: 16 }}>
            <h3 style={{ color: colors.teal }}>{t.title}</h3>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: 12,
                color: colors.slate,
                background: colors.mist,
                padding: 12,
              }}
            >
              {JSON.stringify(t.body, null, 2)}
            </pre>
          </div>
        ))}
      </section>
    </article>
  );
}
