# Content authoring & review pipeline

## States

`draft` → `reviewed` → `published`

Only **published** clinical facts render in app/web (constitution 3.3).

## Steps

1. Edit molecule YAML/JSON under `content/antibiotics/` (or regenerate scaffold).
2. Attach a real `Source` per clinical field.
3. Founder/clinician marks `reviewed`, then `published`.
4. Run `node content/pipeline/generate-seed.mjs` and `npm run seed:check`.
5. Optional public-data preview: `npm run ingest:preview` (SAHPRA/SEP fixtures → draft only; see `/content/ingest`).
6. Founder review: use API `/review/batches-ai` or offline CLI:
   - `npm run review:report` — coverage by therapeutic area
   - `npm run review:batches` — Batch A–I dosing + STG extract backlog
   - `npm run review:batches -- progress` — read-only next actions (STG + dosing + RAG)
   - `npm run review:batches -- checklist A|all` — one-shot sweep pack: progress + blocked +
     copy-ready STG/dosing CLI lines (no `--write`)
   - API: `GET /review/checklist?batch=A|all` — same pack for web `/review` Sweep checklist panel
   - `npm run review:batches -- decisions [--limit 50]` — recent decisions.jsonl audit lines
   - `npm run review:batches -- show A` — detail for one batch
   - `npm run review:batches -- plan-stg A|all` — dry-run report of STG drafts eligible to publish
   - `npm run review:batches -- plan-dosing A|all` — classify dosing drafts (placeholder vs numeric suspect)
   - `npm run review:batches -- export-dosing-cli A|all` — individual publish-dosing lines for
     placeholders only (no `--write`; never includes numeric_suspect)
   - `npm run review:batches -- export-stg-cli A|all` — individual publish-stg lines for eligible
     pointers only (no `--write`; blocked omitted; prefer batch for all-or-nothing)
   - `npm run review:batches -- publish-stg-batch A|all --attestation "I confirm sourced…" [--write]`
   - `npm run review:batches -- publish-stg <id> --attestation "I confirm sourced…" --write`
   - API: `POST /review/publish-stg-batch` `{ batch, reviewerLabel, attestation, dryRun? }` —
     same all-or-nothing gate; `dryRun: true` returns planned mutations with no write.
     Web `/review` has Preview + Publish + STG checklist (eligible IDs).
   - `npm run review:batches -- publish-dosing <moleculeId> <fieldPath> --attestation "…" --write`
   Decisions persist to seed / `stg-extracts.json` + `content/review/decisions.jsonl` (dry-run without `--write`).
   No batch auto-publish for dosing. Every individual dosing publish path (CLI `publish-dosing`,
   `POST /review/decide`, web `/review` "Publish" button) shares one gate
   (`validateReviewDecision` in `@materia/shared`) that refuses to publish a dosing field whose
   preview still looks like an invented numeric placeholder (`classifyDosingPreview` ===
   `numeric_suspect`, e.g. "500 mg") — only honest "not yet published" placeholders or facts
   rewritten with a real sourced value may be published. `GET /review/queue` attaches
   `dosingClass` on dosing items so the web UI can disable Publish before the click.
   Filter: `GET /review/queue?dosingClass=placeholder_absent` (also `numeric_suspect`|
   `other_draft`); web `/review` toggles “Publishable placeholders” and “Numeric suspects
   (audit)” — suspects stay unpublished (constitution 3.1).
7. CI clinical-eval / `npm run seed:check` must pass. Seed gate refuses **published** dosing
   or STG text that still looks like inventable numeric scaffolds (`listPublishedNumericSuspectDosing`
   / `listPublishedStgNumericSuspects`) — draft suspects may remain in backlog. Clinical eval
   (`npm run test:clinical`) uses the same helpers. CI also runs `npm run rag:check-env`.
8. Deploy RAG: `npm run rag:check-env` (blank = local default; refuses offshore hosts). Runtime: `GET /health/rag`.

## Forbidden

- Inventing doses, antidotes, interactions
- Copying SAMF / MIMS / Lexicomp
- Publishing AI-drafted clinical text without human review
