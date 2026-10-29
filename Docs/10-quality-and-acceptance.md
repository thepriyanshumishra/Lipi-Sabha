# 10 — Quality, Privacy, and Acceptance Checklist

This checklist defines the rigorous release criteria for the Lipi Sabha MVP. Every vertical slice must verify compliance against these gates before being marked complete.

---

## 1. Tactile UI & Design System Gates ([`00-design-system.md`](./00-design-system.md))

- [ ] **Duolingo Token Conformance:** Colors conform strictly to the palette (`#58cc02` Eager Green, `#1cb0f6` Spark Blue, `#d7ffb8` Storybook Green, `#4b4b4b` Charcoal text on `#ffffff` Paper White).
- [ ] **Tactile 3D Button Press:** Buttons and cards feature 2px solid borders, 12px rounded corners, and a physical 3D press-depth translation on active click.
- [ ] **Scribe Mascot Feedback:** The mascot ("Lipi") appears on quest cards and reacts contextually to attempts (happy bounce on success, thoughtful pose on variants).
- [ ] **Celebration Animations:** Completing a quest triggers confetti particles, XP ticker rollup, and streak flame increments without UI lag.
- [ ] **Accessible Contrast:** Text combinations meet or exceed WCAG 2.1 AA (minimum 4.5:1 for body copy).
- [ ] **Mobile Responsiveness:** All quest cards, speech bubbles, and evidence charts scale smoothly on 375px mobile viewports.

---

## 2. Core Functional & Governance Gates ([`02-prd.md`](./02-prd.md))

- [ ] **Role Isolation:** Participants cannot access coordinator or admin tools by tampering with URLs, client state, or network request payloads.
- [ ] **Proposal Governance:** Proposals move sequentially through `submitted` -> `under_review` -> `approved`. Unapproved proposals cannot collect public responses.
- [ ] **Audit Trail:** Every governance status change, approval, rejection, or content moderation logs an immutable record with actor, timestamp, and justification reason.
- [ ] **Orthography Versioning:** Every test response is permanently bound to the active orthography profile rules version in effect during the attempt.
- [ ] **Blind-First Enforcement:** Aggregate community response distributions are cryptographically/architecturally hidden from the participant until their own response is saved.
- [ ] **Small-Cohort Privacy Guard:** Any subgroup breakdown with fewer than 5 respondents ($N < 5$) is automatically suppressed to protect anonymity.
- [ ] **Non-Judgmental Feedback:** Unfamiliar or minority variants are labeled as "Documented variant / Under review", never given a red "wrong" penalty.
- [ ] **Idempotent Gamification:** Refreshing or resending quest completion requests does not award duplicate XP in the `xp_ledger`.
- [ ] **Consultation Voting:** Polls strictly enforce one vote per user and cannot unilaterally declare a winning writing system.
- [ ] **Legitimate Ambiguity:** The platform natively supports recording `no_consensus` or `more_testing_needed` as valid formal outcomes.

---

## 3. Technical & Security Gates ([`04-system-architecture.md`](./04-system-architecture.md))

- [ ] **TypeScript Strict Mode:** Zero type errors (`tsc --noEmit` exits with code 0).
- [ ] **Row Level Security (RLS):** All exposed PostgreSQL tables have active RLS policies with tests covering both permit and deny paths.
- [ ] **Zero Secret Leakage:** `SUPABASE_SERVICE_ROLE_KEY` is completely absent from browser bundles and client-side code.
- [ ] **Deep Module Seams:** Domain logic is quarantined inside `lib/modules/` (`QuestEngine`, `MetricsEngine`, `GovernanceWorkflow`, `GamificationLedger`).
- [ ] **Synthetic Data Watermark:** Demo datasets are explicitly flagged with `is_synthetic_demo = true` and visibly marked in the UI.
- [ ] **Codebase Memory Indexing:** Codebase indexed in `codebase-memory-mcp` for structural intelligence.

---

## 4. Release Sign-Off Gate

The Lipi Sabha MVP is authorized for demonstration only when:
1. All automated lint, typecheck, and unit test suites pass.
2. A seeded synthetic project (Modi Script vs Devanagari in Marathi Orthography) executes the complete journey from proposal review to interactive quest, Community Mirror reveal, and consultation record.
3. The UI delights users with playful Duolingo-grade tactile responsiveness while maintaining absolute linguistic humility and community sovereignty.
