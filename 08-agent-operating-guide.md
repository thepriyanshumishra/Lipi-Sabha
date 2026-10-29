# 08 — AI Coding Agent Operating Guide

This guide lets the coding agent make routine implementation decisions independently without changing the product's core purpose or governance rules.

## 1. Source-of-truth hierarchy

1. `01-product-brief.md` and `02-prd.md` define purpose and requirements.
2. `09-decision-log.md` contains locked decisions and explicitly open decisions.
3. `04-system-architecture.md` and `05-data-model.md` define technical boundaries and core semantics.
4. `07-roadmap-backlog.md` defines current priority.
5. The agent may propose changes, but must document them before implementing any change that affects a locked decision, user permissions, community governance, privacy, metric meaning, or schema semantics.

## 2. What the agent may decide independently

- Component decomposition, file naming and internal code organization.
- Small UI details that do not change accessibility or the product promise.
- Library choices that are compatible with the locked stack and do not add disproportionate maintenance.
- Refactoring, test utilities and non-breaking performance improvements.
- Copy improvements that preserve the distinction between preference, accuracy, agreement, learning, and alignment.

## 3. What the agent must not decide silently

- That a particular script, spelling, dialect or variety is “correct” or “best”.
- That the majority vote decides adoption automatically.
- That project creators can approve their own project without the defined review process.
- That a user may assign themselves reviewer/admin authority.
- That a free-text response is wrong merely because it differs from one exact string.
- That personal/community data can be used without permission or consent.
- That a custom AI model or paid external AI service is needed.
- That the stack should change, a second backend should be added, or a large new dependency should be introduced without a documented rationale.
- That synthetic examples are real community data.

## 4. Required implementation workflow

For each vertical slice:
1. Read the relevant PRD and decision log sections.
2. Summarize scope and acceptance criteria in the task/PR description.
3. Inspect current code and tests before changing files.
4. Implement the smallest complete path end-to-end.
5. Add or update tests, including permission-denial tests for protected actions.
6. Run lint, typecheck, relevant tests, and build; report exactly what ran and what did not.
7. Update docs and migrations.
8. Provide a concise completion report: files changed, behavior implemented, tests run, known limitations, and next recommended task.

Do not attempt a broad rewrite when a focused patch is sufficient. Do not claim commands passed unless they were run and observed to pass.

## 5. Architecture rules

- Next.js App Router + TypeScript + Supabase PostgreSQL/Auth is the default stack.
- Keep business rules in testable server-side modules, not only in React components.
- Validate untrusted input on the server using schemas.
- Enforce authorization on the server and through RLS for exposed data.
- Never expose Supabase secret/service-role credentials in browser code or public variables.
- Use migrations; do not rely on undocumented manual dashboard edits for schema.
- Keep metric calculations in explicit, versioned functions/queries with tests.
- Avoid introducing Redis, microservices, a vector DB, or a custom model in MVP without a real need.

## 6. Content and demo data rules

- Demo seed data must be labeled `synthetic_demo` and visibly marked in the UI.
- Do not seed real words, pronunciations, language names, scripts, or community claims as validated if they are illustrative.
- A project must store provenance and review status.
- Where evidence is incomplete, display uncertainty instead of inventing an answer key.

## 7. Security and data integrity

- Every exposed table must have reviewed grants and RLS policies.
- Test allow and deny behavior for signed-out users and each role.
- Every privileged status transition records an audit event.
- XP granting must be idempotent.
- Poll voting must be server-validated and constrained to eligible users.
- Aggregate views must enforce minimum group thresholds in data access logic.
- Avoid logging private free-text answers or secrets.

## 8. Change proposal format

If the agent believes a locked choice should change, it should first create a short proposal containing:
- current decision;
- problem/evidence;
- proposed alternative;
- implementation and migration cost;
- risks to community sovereignty/privacy;
- rollback plan.

Then pause before implementing the change. Routine reversible engineering details do not require a pause.
