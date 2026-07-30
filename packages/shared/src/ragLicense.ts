/**
 * RAG license gate — constitution NEVER reproduce SAMF/MIMS/Lexicomp (docs/15, Build Spec §14).
 * Only index public guidelines, owned authoring, register metadata, or licensed inserts we own.
 */

export type RagLicenseClass =
  | "owned_authoring"
  | "public_guideline"
  | "register_metadata"
  | "sep_public"
  | "insert_owned"
  | "licensed_forbidden";

const FORBIDDEN: ReadonlySet<RagLicenseClass> = new Set(["licensed_forbidden"]);

/** Map Materia seed source IDs to license class. Unknown → refuse to index. */
export function licenseClassForSourceId(sourceId: string): RagLicenseClass | null {
  switch (sourceId) {
    case "src-materia-edu":
      return "owned_authoring";
    case "src-doh-stg":
      return "public_guideline";
    case "src-sahpra":
      return "register_metadata";
    case "src-sep":
    case "src-sep-doh":
      return "sep_public";
    default:
      if (sourceId.startsWith("src-insert-")) return "insert_owned";
      if (
        /samf|mims|lexicomp|uptodate|bnf/i.test(sourceId) ||
        sourceId.startsWith("src-samf") ||
        sourceId.startsWith("src-mims")
      ) {
        return "licensed_forbidden";
      }
      return null;
  }
}

export function isIndexableLicense(license: RagLicenseClass): boolean {
  return !FORBIDDEN.has(license);
}

export function assertIndexableLicense(license: RagLicenseClass, context: string): void {
  if (!isIndexableLicense(license)) {
    throw new Error(
      `RAG refuse: cannot index licensed_forbidden content (${context}). Own/author or use public STG/EML/SAHPRA — never SAMF/MIMS/Lexicomp.`,
    );
  }
}
