# 25_Operations

> Converted from `25_Operations.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 25 of 30
25
Operations
Keeping the lights on â€” because reliability is trust

1 Â· Operations philosophy
Reliability is a feature. A pharmacist who reaches for Materia mid-shift and finds it down or stale stops reaching for it. Uptime and freshness are trust, and trust is the product.
Boring is the goal. The best ops story is no story â€” quiet, dependable, predictable. Optimise for fewer surprises, not heroics.
Automate the routine, rehearse the rare. Automate deploys, backups and monitoring; rehearse the incidents you hope never happen.
2 Â· Monitoring & alerting
Uptime & health checks on every critical service; alert before users notice.
Performance monitoring â€” real-user load times, especially low-end Android/3G (Document 20).
Error & crash reporting â€” catch, prioritise, fix (feeds QA, Document 19).
AI cost & quality dashboards â€” spend, cache hit-rate, eval scores (Document 17).
Sensible alerting â€” alert on what needs action; alert fatigue is how real incidents get missed.
3 Â· Incident response
The Document 14 procedure, operationalised. Even a team of one needs a written plan so a 2am outage is a checklist, not a panic.
Detect (monitoring) â†’ acknowledge.
Contain â†’ restore service (runbooks for common failures).
Communicate â†’ tell affected users honestly if impact is user-facing.
Resolve â†’ fix root cause.
Post-mortem â†’ blameless; feed fixes back into runbooks and monitoring.
4 Â· Backups & disaster recovery
5 Â· Content operations â€” the engine that never stops
Unique to Materia: the biggest ongoing operation isn't servers, it's keeping medicine content current and correct. This is a perpetual production line, not a one-off build.
6 Â· Cost & vendor management
Cloud & AI cost â€” monitor monthly; the two most likely to surprise you. Cache and pre-generate to control AI spend (Document 17).
Vendor register â€” every integration tracked with its DPA and data-residency status (Document 16).
Right-size continuously â€” scale infra to real load; don't pay for imagined scale (Document 27).
7 Â· Compliance operations (ongoing POPIA)
Information Officer duties â€” the registered role has continuing obligations (Document 15).
Handle data-subject requests (access, correction, deletion) within required timeframes.
Maintain audit logs, review access, keep the breach plan current.
Periodic privacy/security review as the product and data grow.

Document 25 of 30 Â· Next: Financial Planning.
