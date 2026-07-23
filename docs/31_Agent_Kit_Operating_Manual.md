# 31_Agent_Kit_Operating_Manual

> Converted from `31_Agent_Kit_Operating_Manual.docx`. Source of truth for Materia strategy.

MATERIA
The Agent Build Kit  Â·  Part 1 of 3
Operating Manual
How to drive Cursor / Claude Code to architect, build and test Materia

1 Â· How the whole system fits together
Five layers, each feeding the one below it. Get this mental model and everything else is mechanical.
2 Â· Cursor and Claude Code â€” current conventions (2026)
Both tools are supported; the kit gives you the files for each. Use whichever you prefer â€” or both. Here's how each consumes rules today.
Claude Code
CLAUDE.md at the repo root is the 'constitution' â€” auto-loaded into every session. It is the single most important file. Keep it tight and maintained (Part 2 gives you the content).
Subagents (.claude/agents/) isolate tasks â€” a code-reviewer, a test-writer, an explorer â€” in their own context windows so your main session stays clean. Built-ins include Explore (read-only) and Plan (planning without executing).
Plan mode makes the agent produce a plan before touching code â€” use it for every non-trivial task.
Slash commands / skills (.claude/commands/ or .claude/skills/) store repeatable prompts. Use sparingly â€” a good CLAUDE.md beats a pile of commands.
Cursor
.cursor/rules/*.mdc is the current format (the old single .cursorrules is deprecated but still read). Each .mdc file has YAML frontmatter â€” description, globs, alwaysApply â€” controlling when it loads.
Four activation modes: always-applied, auto-attached (by file glob), agent-requested, or manual (@ruleName). Keep 5â€“8 focused rules, each under ~150 lines.
Numbered, single-concern files (001-core, 002-architecture â€¦) give clean diffs and load only what's relevant.
3 Â· The workflow loop (run this for every chunk)
The single most important habit. Never let the agent free-code a big feature in one shot â€” it will drift. Run this four-beat loop for every meaningful piece of work:
4 Â· Session hygiene (how to not degrade quality)
One concern per session. Start a fresh conversation for each feature/chunk. Long, sprawling sessions accumulate confused context and quality drops.
Use subagents for exploration. â€˜Go read how X worksâ€™ pollutes your main context â€” farm it to an Explore subagent that returns just the answer.
Point at specific docs. Reference the exact doc the task needs (â€˜read /docs/13-data-model.mdâ€™) rather than making the agent guess or load everything.
Commit often. Small, working commits give you clean rollback points and readable history (Document 18).
Re-ground after compaction. If the agent auto-compacts a long session, remind it of the current task and the relevant doc before continuing.
5 Â· The order of operations
Fire the Part-3 playbook prompts in this sequence. Each builds on the last; don't skip ahead.
6 Â· Golden rules for working with the agent on Materia
Plan before code. Approve the plan, then let it build.
The clinical rules are sacred. If a change touches a dose, antidote, interaction or the grounding contract, it gets extra scrutiny â€” every time (Part 2).
Point to the doc. Give the agent the specific /docs file the task depends on.
Small chunks, fresh sessions, frequent commits.
Make it prove it. Tests and a review pass before you accept anything.
Keep it current. The agent verifies live versions/docs before scaffolding, not from memory.
You are the senior reviewer. The agent is a fast, tireless mid-level engineer with your whole plan in its head â€” brilliant, but it still needs your judgement at the plan and review beats.

Agent Build Kit Â· Part 1 of 3 Â· Next: Part 2 â€” the Project Constitution (paste-ready CLAUDE.md and .cursor/rules).
