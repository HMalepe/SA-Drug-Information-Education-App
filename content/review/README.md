# Clinical review journal

`decisions.jsonl` is appended by `POST /review/decide` / STG publish paths when `REVIEW_PERSIST` is not `false`.

Read it via:
- `GET /review/decisions?limit=50`
- `npm run review:batches -- decisions [--limit 50] [--json]`
- `/review` “Recent decisions” panel

Each line is one founder decision (publishState change only — never invented clinical text).

Seed JSON under `content/seed/` is updated in place; `db/seed/` is mirrored.
