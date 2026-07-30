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
   - `npm run review:batches -- show A` — detail for one batch
   - `npm run review:batches -- plan-stg A|all` — dry-run report of STG drafts eligible to publish
   - `npm run review:batches -- plan-dosing A|all` — classify dosing drafts (placeholder vs numeric suspect)
   - `npm run review:batches -- publish-stg-batch A|all --attestation "I confirm sourced…" [--write]`
   - `npm run review:batches -- publish-stg <id> --attestation "I confirm sourced…" --write`
   Decisions persist to seed / `stg-extracts.json` + `content/review/decisions.jsonl` (dry-run without `--write`).
   No batch auto-publish for dosing.
7. CI clinical-eval must pass (no published draft dosing).

## Forbidden

- Inventing doses, antidotes, interactions
- Copying SAMF / MIMS / Lexicomp
- Publishing AI-drafted clinical text without human review
