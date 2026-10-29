# 07 — Agile Roadmap and Product Backlog

Deliver by vertical slices, not by building every screen in isolation. Each phase should result in a coherent, testable workflow. Phase names do not prescribe calendar duration; adjust based on team capacity and hackathon deadline.

## Phase 0 — Setup and specification

**Goal:** Make implementation repeatable before feature coding.

- Create repository and app skeleton.
- Add TypeScript strict mode, linting, formatting, `.env.example` and README.
- Set up Supabase local/hosted project plan and migration workflow.
- Copy these docs into `/docs` and identify the source of truth.
- Seed only clearly labeled synthetic demo data.

**Exit gate:** app boots locally; no secrets committed; CI or documented local checks pass.

## Phase 1 — App shell, auth, roles and authorization

- Landing page and public approved-project list.
- Sign-in and minimal profile.
- Server-side role checks.
- Baseline Supabase RLS and policy tests.
- Admin-only review area skeleton.

**Exit gate:** a participant cannot reach admin actions by editing the URL, request body, or browser state.

## Phase 2 — Project proposal and governance review

- Proposal form, draft, submit, review queue, approve/request changes/reject.
- Review reasons and audit events.
- Project state transitions enforced server-side.

**Exit gate:** a project cannot run official tests until approved/activated.

## Phase 3 — Candidate orthographies and dataset

- Create candidate orthography profiles.
- Add word stimuli and optional short phrases.
- Store variants, source/provenance and review status.
- Review and publish item workflow.

**Exit gate:** active tests can use only reviewed items and refer to an explicit profile version.

## Phase 4 — Learning quest, response capture and simple gamification

- Quest builder / seeded quest.
- Participant test screen with 3–5 tasks.
- Store attempts/responses and timing.
- Award idempotent XP and a few badges.
- Support multiple-accepted-forms, manual review, and not-scored states.

**Exit gate:** one participant can complete a full quest and receive an honest feedback state.

## Phase 5 — Community Mirror and evidence dashboard

- Reveal aggregates only after response submission.
- Calculate response distribution, reviewed-task accuracy where valid, agreement, time, and learning change where supported.
- Show methodology, sample size, review status, and low-sample suppression.

**Exit gate:** no single “best script” score is displayed; accuracy and preference remain separate.

## Phase 6 — Community consultation, decision record and demo polish

- Discussion/comments with moderation controls.
- Consultation poll with published eligibility/method.
- Decision log including no-consensus and more-testing-needed outcomes.
- Accessible empty/error/loading states, mobile review, security regression tests.
- Demo script using synthetic data clearly marked as synthetic.

**Exit gate:** full end-to-end demo works and governance rules are visible to participants.

## Product backlog priorities

### P0 — Required for MVP
- Authentication, role-based authorization.
- Project proposal and approval workflow.
- Candidate orthography profile configuration.
- Word-based test items and optional phrase-level validation.
- Quest attempt/response persistence.
- Small XP/badges loop.
- Blind-first Community Mirror.
- Transparent separate evidence measures.
- Consultation and decision record.
- RLS, audit trail, automated tests, synthetic demo dataset.

### P1 — Valuable after the core works
- Consented audio stimuli.
- Contributor attribution preferences and exports.
- More task types and authoring UX.
- Better accessibility/low-bandwidth options.
- Item version comparison and project report export.
- Moderation queue improvements.

### P2 — Do not build before validating the MVP
- AI transliteration suggestions.
- Audio recording or speech recognition.
- Custom ML/model training.
- Advanced recommendation or personalization engine.
- Native mobile apps, chat, public leaderboard, multi-stage reward economy.

## Definition of Done (every vertical slice)

- Acceptance criteria written and met.
- Loading, empty, error, and success states covered.
- Server-side authorization implemented and tested.
- Input validation and safe error handling included.
- DB migrations and seed changes committed where applicable.
- Unit/integration/e2e tests updated for risk level.
- No secrets or unsupported claims added.
- Docs updated if behavior, schema, roles, or decisions changed.
- Demo path works using synthetic data.
