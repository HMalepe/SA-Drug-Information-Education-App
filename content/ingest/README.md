# Public data ingest (Doc 16)

Fixtures under `fixtures/` are **illustrative shapes** for the SAHPRA register and DoH SEP feeds — not live government data.

## Rules

1. Ingest always lands as `publishState: draft`.
2. Founder/clinician maps molecule + reviews before publish.
3. Never invent SEP or registration numbers.
4. Run preview: `node content/pipeline/ingest-public.mjs`

Live crawlers / API pulls replace these CSVs later; the validation helpers stay the same.
