import { SearchBox } from "@/components/SearchBox";
import { apiGet } from "@/lib/api";

interface MoleculeList {
  molecules: Array<{ slug: string; innName: string; className: string; therapeuticArea: string }>;
  areas?: string[];
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  const { area } = await searchParams;
  let molecules: MoleculeList["molecules"] = [];
  let areas: string[] = [];
  try {
    const qs = area ? `?area=${encodeURIComponent(area)}` : "";
    const data = await apiGet<MoleculeList>(`/molecules${qs}`);
    molecules = data.molecules;
    areas = data.areas ?? [];
  } catch {
    molecules = [];
  }

  return (
    <>
      <h1 className="brand" style={{ fontSize: 40, margin: "0 0 8px" }}>
        Every medicine, <span style={{ color: "var(--teal)" }}>understood.</span>
      </h1>
      <p className="tagline">
        Molecule-first medicine intelligence for South Africa — originator, generics, safety, and
        the why behind the what.
      </p>
      <SearchBox />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "16px 0" }}>
        <a className="btn" href="/" style={{ opacity: area ? 0.7 : 1 }}>
          All
        </a>
        {areas.map((a) => (
          <a
            key={a}
            className="btn"
            href={`/?area=${encodeURIComponent(a)}`}
            style={{ opacity: area === a ? 1 : 0.7 }}
          >
            {a}
          </a>
        ))}
      </div>
      <h2>{area ? area : "Seed coverage"}</h2>
      <p className="muted">
        Antibiotics, analgesics, antihypertensives, diabetes, HIV/TB scaffolds (Doc 29). Dosing stays
        draft.
      </p>
      {molecules.length === 0 ? (
        <div className="card">
          API offline. Start the API (`npm run dev:api`) then refresh.
        </div>
      ) : (
        molecules.map((m) => (
          <a key={m.slug} className="card" href={`/molecules/${m.slug}`} style={{ display: "block" }}>
            <strong>{m.innName}</strong>
            <div className="muted">
              {m.className} · {m.therapeuticArea}
            </div>
          </a>
        ))
      )}
    </>
  );
}
