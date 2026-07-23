# `/content` — authoring & review pipeline

Workflow (constitution 3.3): **draft → reviewed → published**.

Unreviewed clinical content must never render in `/app` or `/web`.

## Seed

- [`seed/antibiotics.json`](seed/antibiotics.json) — first therapeutic area (common antibiotics)
- Numeric dosing rules intentionally empty until founder pharmacist review
- SEP values are placeholders (`draft`) — ingest public DoH SEP, do not invent

## Validate

```bash
npm run seed:check
```

## Ingestion notes (public data only)

| Feed | Status |
|------|--------|
| SAHPRA register | Public metadata — clean & map to Product |
| DoH SEP | Public — time-series PriceRecord |
| DoH STG/EML | Public PDFs — cite, do not paste licensed monographs |

Never reproduce SAMF / MIMS / Lexicomp (/docs/15, Build Spec §14).
