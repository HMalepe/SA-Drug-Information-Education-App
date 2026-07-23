const API_BASE =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export async function fetchMolecules() {
  const res = await fetch(`${API_BASE}/molecules`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to load molecules");
  return res.json() as Promise<{
    molecules: Array<{ slug: string; innName: string; className: string; therapeuticArea: string }>;
  }>;
}

export async function fetchMedicine360(slug: string) {
  const res = await fetch(`${API_BASE}/molecules/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json() as Promise<{
    molecule: {
      innName: string;
      slug: string;
      className: string;
      therapeuticArea: string;
      synonyms: string[];
    };
    tabOrder: Array<{ id: string; label: string; index: number }>;
    tabs: Record<string, { title: string; body: unknown; sources: unknown[] }>;
    trust?: { notice: string };
  }>;
}
