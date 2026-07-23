# 18_Development_Plan

> Converted from `18_Development_Plan.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 18 of 30
18
Development Plan
How the thing actually gets built â€” by a small team, learning as it goes

1 Â· Development philosophy
Vertical slices, not horizontal layers. Build one whole feature end-to-end (the 360Â° page for 20 molecules) before building the next. A thin slice that works beats ten half-built layers â€” and it's the fastest way to learn the stack (Build Spec Â§16).
Ship small, ship often. Frequent small releases over rare big ones. Momentum, feedback and learning compound; big-bang launches hide bugs and delay truth.
Boring tech, bought commodity. Every hour on auth or billing plumbing is an hour not on the moat. Buy the commodity; build only what's differentiated (Document 12).
AI as a pair programmer. Use AI coding assistants aggressively â€” for a founder learning to build, they compress the learning curve and multiply output. The domain judgement is yours; let AI handle boilerplate.
Done beats perfect. Perfectionism is the enemy here (and a known personal risk). Ship it slightly embarrassing, learn, improve. The market teaches faster than more polishing does.
2 Â· Methodology & cadence
Lightweight and realistic for a small team â€” the discipline of agile without the ceremony overhead built for 50-person orgs.
3 Â· Milestones (tied to the roadmap)
4 Â· CI/CD & environments
Automate early, even solo. A pipeline that runs tests and deploys on push saves more time than it costs, and prevents 'it worked on my machine' at 2am.
Three environments: dev (build), staging (test like prod), prod (users). Never test in prod â€” especially with clinical content.
Automated tests gate deploys (Document 19) â€” nothing clinical ships without passing.
Feature flags to ship code dark and enable gradually â€” de-risks releases.
5 Â· Documentation that earns its keep
6 Â· Version control & workflow
Git from commit one; small, frequent, descriptive commits.
Simple branching â€” main always deployable; short-lived feature branches.
Code review on anything touching auth, personal data, or clinical content (even if that reviewer is future-you or an AI checker).
7 Â· The realistic solo-founder playbook
8 Â· When to bring in help
First engineer / contractor. When your own build velocity is the bottleneck on validated demand â€” not before. Premature hiring burns runway on unproven direction (Document 27).
First clinical reviewer (besides you). Early â€” a second qualified reviewer strengthens the trust layer and lets content scale past your own hours (Documents 13, 19).

Document 18 of 30 Â· Next: Quality Assurance.
