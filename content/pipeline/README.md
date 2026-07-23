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
6. CI clinical-eval must pass (no published draft dosing).

## Forbidden

- Inventing doses, antidotes, interactions
- Copying SAMF / MIMS / Lexicomp
- Publishing AI-drafted clinical text without human review
