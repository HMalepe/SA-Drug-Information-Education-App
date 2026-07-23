import { SearchBox } from "@/components/SearchBox";
import { apiGet } from "@/lib/api";

interface MoleculeList {
  molecules: Array<{ slug: string; innName: string; className: string }>;
}

export default async function HomePage() {
  let molecules: MoleculeList["molecules"] = [];
  try {
    const data = await apiGet<MoleculeList>("/molecules");
    molecules = data.molecules;
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
      <h2>Antibiotics seed set</h2>
      <p className="muted">First therapeutic area (depth over breadth). Public free-tier pages.</p>
      {molecules.length === 0 ? (
        <div className="card">
          API offline. Start the API (`npm run dev:api`) then refresh.
        </div>
      ) : (
        molecules.map((m) => (
          <a key={m.slug} className="card" href={`/molecules/${m.slug}`} style={{ display: "block" }}>
            <strong>{m.innName}</strong>
            <div className="muted">{m.className}</div>
          </a>
        ))
      )}
    </>
  );
}
