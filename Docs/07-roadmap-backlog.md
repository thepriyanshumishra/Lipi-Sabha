# 07 — Agile Roadmap and Product Backlog

**Delivery Strategy:** Vertical slices delivering functional, end-to-end user journeys rather than horizontal technical layers.  
**Design Standard:** Duolingo-grade playful tactile design system ([`00-design-system.md`](./00-design-system.md)).  
**Architecture:** Deep module seams ([`04-system-architecture.md`](./04-system-architecture.md)).

---

## Development Roadmap (Vertical Slices)

### Phase 0 — Setup, Architecture & Design Tokens
**Goal:** Establish reproducible developer environment and design foundation.
- Initialize Next.js 15 (App Router) + TypeScript strict mode repository.
- Configure Tailwind CSS v4 with Duolingo design tokens (Paper White, Eager Green, Spark Blue, 12px radii, 2px borders).
- Set up Supabase local migration tooling and client/server helpers.
- Mount `codebase-memory-mcp` for structural repository indexing.
- Verify that [`Docs/`](./) serves as the canonical source of truth.
* **Exit Gate:** Clean local build, zero TypeScript warnings, design tokens accessible globally.

### Phase 1 — App Shell, Auth & Tactile UI Primitives
**Goal:** Deliver authenticated participant shell and tactile sticker components.
- Implement base tactile primitives: `<TactileButton />`, `<TactileCard />`, `<ProgressBar />`, `<LipiMascotBubble />`.
- Supabase Auth integration (magic link / password) with automatic profile creation trigger.
- Server-side role checks and baseline RLS policies for `profiles` and `platform_roles`.
- Public landing page with playful mascot introduction and public project browser.
* **Exit Gate:** Users can sign in, see their Scribe Rank ("Novice Reader"), and experience tactile 3D button press physics.

### Phase 2 — Project Proposal & Governance Review
**Goal:** Complete end-to-end community proposal submission and review workflow.
- Multi-step proposal form with auto-save and macro-region selectors.
- Governance review queue for admins (`approve`, `request_changes`, `reject`).
- Immutable `audit_events` logging for all status transitions.
- State machine enforcement: Unapproved proposals cannot collect responses.
* **Exit Gate:** Proposers can draft and submit projects; admins can review and activate them with an auditable reason.

### Phase 3 — Candidate Orthographies & Linguistic Stimuli
**Goal:** Enable coordinators to configure competing writing systems and test items.
- Orthography profile builder (script name, conventions, examples, corpus provenance).
- Stimuli dataset manager for words and short phrases.
- Variant manager linking spellings to candidate profiles with reviewer attestation stamps.
- Support for multiple accepted variants without binary "wrong" labels.
* **Exit Gate:** Approved projects contain at least two candidate orthography profiles and a reviewed dataset.

### Phase 4 — Duolingo-Grade Quest Runner & Gamification Engine
**Goal:** Deliver the bite-sized interactive quest experience.
- Interactive Quest Runner with top animated progress bar and mascot feedback.
- Task Type 1: Script Match Pill (phoneme -> glyph).
- Task Type 2: Script Tile Reorder (phrase builder).
- Task Type 3: Audio Discrimination (sound -> spelling).
- Task Type 4: Side-by-Side Orthography Comparison (blind-first).
- Task Type 5: Canvas Glyph Tracing.
- Idempotent `xp_ledger` awarding `+10 XP` per completed quest.
- Celebration Screen: Confetti burst, XP rollup ticker, Scribe Streak increment.
* **Exit Gate:** A participant can complete a 3-minute quest with tactile card interactions and celebration animations.

### Phase 5 — Community Mirror & Transparent Evidence Dashboard
**Goal:** Reveal aggregate community patterns safely after submission.
- Blind-first reveal trigger: Community Mirror unlocks only after response submission.
- Real-time comparison percentage bars between Candidate Orthography A and B.
- Small-cohort suppression ($N < 5$) to prevent subgroup de-anonymization.
- Evidence Dashboard displaying separate metrics: Task Accuracy, Orthographic Agreement, Learnability Curves, and Consultation Preference.
* **Exit Gate:** Aggregates cannot be inspected prior to submission; no composite "winner" score is displayed.

### Phase 6 — Community Consultation, Decision Record & Demo Polish
**Goal:** Provide sovereign closure to community research iterations.
- Moderated discussion threads with trolling flag controls.
- Consultation polls with one-vote-per-user enforcement.
- Formal Decision Record logger (`decision_recorded`, `more_testing_needed`, `no_consensus`, `no_decision_yet`).
- Complete synthetic demo project (Modi vs Devanagari in Marathi orthography) clearly marked with demo badge.
* **Exit Gate:** End-to-end demo path functions flawlessly from proposal to decision record with zero console errors.

---

## Prioritized Product Backlog

### P0 — Non-Negotiable Core (MVP)
1. Duolingo tactile token system & Scribe Mascot ("Lipi") feedback.
2. Next.js 15 + Supabase Auth + RLS security boundary.
3. Project proposal and governance review workflow with audit logging.
4. Candidate orthography configuration (script + conventions).
5. 5-Task interactive quest runner with audio, tile reordering, and canvas tracing.
6. Blind-first Community Mirror with cohort suppression ($N < 5$).
7. Idempotent XP ledger, Scribe Ranks, and daily streaks with Ink Savers.
8. Consultation poll and auditable decision record.
9. Seeded synthetic demo project.

### P1 — Post-MVP Enhancements
1. Consented native speaker audio recording and upload tool.
2. Advanced HarfBuzz webassembly complex glyph rendering inspector.
3. Contributor attribution export in TEI / XML linguistic formats.
4. Dark paper mode / sepia manuscript reading mode.
5. Offline PWA sync for remote linguistic fieldwork.

### P2 — Out of Scope / Prohibited for Initial Release
1. AI grammar correction or automatic transliteration guessing.
2. Custom ML speech-to-text models.
3. Public competitive leaderboards between native speakers.
4. General-purpose social network chat.
