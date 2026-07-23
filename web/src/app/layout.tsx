import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Materia — Every medicine, understood.",
    template: "%s · Materia",
  },
  description:
    "Molecule-first South African medicine intelligence, companion and academy. Reference and education tool — not a substitute for clinical judgement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body>
        <main>
          <header className="site-header">
            <a className="brand" href="/">
              Mater<span>ia</span>
            </a>
            <nav className="muted" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="/learn">Learn</a>
              <a href="/my-meds">My Meds</a>
              <a href="/tools">Tools</a>
              <a href="/cpd">CPD</a>
              <a href="/institution">Institution</a>
              <a href="/ambassador">Ambassador</a>
              <a href="/insights">Insights</a>
              <a href="/review">Review</a>
              <a href="/pricing">Pricing</a>
              <a href="/onboarding">Get started</a>
            </nav>
          </header>
          {children}
          <p className="disclaimer">
            Materia is a reference and education tool for South Africa. It does not direct
            treatment for a specific patient and is not a substitute for professional clinical
            judgement or emergency care. Every clinical fact shows its source when published.
          </p>
        </main>
      </body>
    </html>
  );
}
