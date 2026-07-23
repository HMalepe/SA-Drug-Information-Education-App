# Clinical review journal

`decisions.jsonl` is appended by `POST /review/decide` when `REVIEW_PERSIST` is not `false`.

Each line is one founder decision (publishState change only — never invented clinical text).

Seed JSON under `content/seed/` is updated in place; `db/seed/` is mirrored.
