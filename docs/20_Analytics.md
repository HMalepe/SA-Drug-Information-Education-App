# 20_Analytics

> Converted from `20_Analytics.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 20 of 30
20
Analytics
Measuring what matters, ignoring what flatters

1 Â· Analytics philosophy
Measure to decide, not to decorate. Every metric on a dashboard should change a decision. If a number wouldn't alter what you do next, stop tracking it.
Instrument from day one. You can't analyse data you didn't capture. Build event tracking into the MVP â€” retrofitting analytics loses months of learning.
Behaviour over opinion. What users do beats what they say. Interviews (Document 2) generate hypotheses; analytics confirms or kills them.
Privacy by design. Collect the minimum, anonymise where possible, get consent, never over-collect health data for analytics (Documents 14, 15). Good ethics and good POPIA compliance are the same thing here.
2 Â· The North Star Metric
A North Star aligns everyone (even a team of one) on the single number that best proxies delivered value. Downloads, signups and MAU are supporting metrics â€” they feed the North Star but never replace it.
3 Â· The metric framework (AARRR)
4 Â· Retention is the metric that tells the truth
Acquisition can be bought; retention cannot be faked. Cohort retention curves are the single clearest signal of product-market fit.
Cohort curves. Track each weekly signup cohort's retention over time. A curve that flattens (a 'retention smile') = a real, sticky product. A curve that decays to zero = no PMF yet, no matter how good acquisition looks.
Segment by persona. Students, pharmacists and patients retain differently â€” watch each. A great pharmacist curve and a leaky patient curve tells you where the product works.
The habit metric. For pharmacists, weekly-use frequency; for students, streak/lesson cadence. Habit is the moat.
5 Â· Funnels to instrument
6 Â· Events to track (the starter set)
Search performed Â· molecule viewed Â· tab opened (which tabs get used tells you what to invest in).
Lesson started/completed Â· quiz answered Â· badge earned.
Tool used (calculator, substitution, interaction check).
Gated-feature hit Â· pricing viewed Â· subscription started/cancelled.
Referral sent/converted Â· content requested (a gap signal â€” Document 9).
Crash / error / slow-load events (performance monitoring).
7 Â· Operational monitoring
Crash & error reporting â€” catch and prioritise stability issues (feeds QA, Document 19).
Performance â€” real-user load times, especially on low-end devices/networks.
AI cost & quality â€” spend per feature, cache hit-rate, eval scores over time (Document 17).
8 Â· Experimentation
A/B where it pays. Test the high-leverage decisions â€” onboarding flow, paywall placement, pricing (Document 6) â€” with real experiments, not opinions.
But respect small numbers. Early on, sample sizes are tiny; lean more on qualitative signal + directional data, and reserve rigorous A/B tests for when traffic supports them.
9 Â· Cadence & dashboards

Document 20 of 30 Â· Next: Customer Support.
