# 02 — Product Requirements Document (PRD)

**Product:** Lipi Sabha (लिपि सभा)  
**Release:** MVP  
**Status:** Approved baseline for implementation  
**Aesthetic & UX Benchmark:** Duolingo-grade playful, tactile storybook experience ([`00-design-system.md`](./00-design-system.md)) paired with sovereign community governance.

---

## 1. Scope

The MVP is a responsive web application featuring role-aware community governance, orthography and script configuration, high-engagement Duolingo-style bite-sized learning quests, transparent evidence dashboards, a blind-first Community Mirror, and auditable consultation and decision records.

The core linguistic unit is a **linguistic stimulus**. In the MVP, stimuli consist primarily of single words and short phrases (to validate orthographic conventions in real contextual flow). The system does not attempt automatic grammar correction or machine translation.

---

## 2. Roles and Permissions Matrix

| Capability | Participant | Proposer / Coordinator | Linguist Reviewer | Governance Reviewer / Admin |
|---|:---:|:---:|:---:|:---:|
| Browse public approved projects | Yes | Yes | Yes | Yes |
| Submit a project proposal | Yes (with anti-spam limits) | Yes | Yes | Yes |
| Edit own unsubmitted proposal | Yes | Yes | Yes | Yes |
| Approve / reject project proposal | No | No | No (unless assigned) | Yes |
| Configure candidate profiles on approved project | No | Yes (if assigned) | Yes (if assigned) | Yes |
| Review / approve linguistic items & scoring rules | No | No (unless qualified) | Yes | Can require review |
| Complete daily & project quests | Yes | Yes | Yes | Yes |
| View own response history & learning progress | Yes | Yes | Yes | Yes (audit policy permits) |
| View aggregate results & Community Mirror | Yes (when released) | Yes | Yes | Yes |
| Create consultation poll | No | Yes (if rules allow) | Can advise | Can moderate / authorize |
| Cast eligible consultation vote | Yes | Yes | Yes | Yes (if eligible) |
| Record formal community outcome | No | Can submit proposed record | Can attest review | Authorized role only |

*Permissions may be narrowed by each project's published rules. Platform administrator status must never automatically imply linguistic authority.*

---

## 3. Functional Requirements

### FR-01 — Authentication and Profile
- Users can authenticate via Supabase Auth (email magic link, password, or OAuth).
- Users maintain a minimal profile: `display_name`, avatar, preferred UI language.
- Users may optionally self-describe their language variety or broad region only at a privacy-conscious macro level (no exact GPS or street addresses).
- Role grants are managed server-side with PostgreSQL Row Level Security (RLS) and cannot be modified via client-side requests.
- **Acceptance Gate:** A participant cannot elevate their own permissions or bypass server-side role validation.

### FR-02 — Project Proposal Workflow
Proposals capture structured information:
- Language name, ISO/glottolog codes if known, and community-recognized alternative names.
- Broad geographical regions and community stakeholders.
- Language varieties / dialects involved (with an explicit "Not documented yet" option).
- Problem statement, historical context, and project goals.
- Candidate scripts / orthographic conventions proposed for comparison.
- Provenance and consent plan for language data.
- Proposer contact details and organizational affiliation (if any).
- Initial scope: words, phrases, or both.
- **Acceptance Gate:** Submission transitions the project to `submitted`/`under_review`. Unapproved proposals are completely hidden from public listings and cannot collect responses.

### FR-03 — Governance Review & Audit
- Governance reviewers evaluate proposals against legitimacy, community consent, safety, and feasibility rubrics.
- Actions: `approve`, `request_changes`, `reject`.
- Every transition logs the actor, timestamp, prior state, new state, and review reason to an immutable audit table.
- Proposers can revise and resubmit proposals with requested changes.
- **Acceptance Gate:** Only projects with `approved` status can be activated for quest authoring and community participation.

### FR-04 — Candidate Orthography Profiles
- Projects can configure two or more candidate orthography profiles (e.g., Option A: Classical Modi vs Option B: Modernized Devanagari; or competing vowel marking conventions).
- Each profile represents **script + orthographic rules**, not just a superficial script name.
- Captures plain-language summaries, rules documentation, representative glyph samples, reviewer attestation, and documented limitations.
- Supports blinded labels (e.g., "Orthography 1" vs "Orthography 2") during empirical testing to prevent brand/label bias.
- **Acceptance Gate:** Every test item is explicitly version-linked to the active candidate profile rules in effect during the quest.

### FR-05 — Stimulus & Variant Dataset
- Stimuli of type `word` or `phrase`.
- Attributes: target reference form, language variety, optional pronunciation note, optional consented audio asset (compressed Opus/MP3), source description, consent basis, and review status.
- Attaches variants to candidate profiles with explicit status: `reported`, `reviewed`, `accepted_for_task`, `disputed`, `retired`.
- Multiple acceptable forms are supported; an unfamiliar variant is never marked incorrect simply because it is rare.
- **Acceptance Gate:** Scored tasks require reviewed stimuli with explicit acceptance criteria. Unreviewed items are labeled "Exploratory / Unreviewed".

### FR-06 — Guided Quest Engine (Duolingo-Inspired Interactive Learning)
Quests are bite-sized (default 3–5 tasks, ~2–3 minutes), designed for maximum engagement, clarity, and fun:
- **Task Type 1 — Script Match Pill:** Tap to match a phonetic sound/syllable (e.g., "ka") with its candidate script glyph.
- **Task Type 2 — Script Tile Reorder (Phrase Builder):** Arrange chunky rounded word tiles into the correct orthographic sequence.
- **Task Type 3 — Audio Discrimination:** Listen to native pronunciation and select which candidate spelling accurately reflects vowel length or nasalization.
- **Task Type 4 — Side-by-Side Orthography Comparison (Blind-First):** Compare Option A and Option B in a contextual sentence; submit preference or readability rating before viewing community results.
- **Task Type 5 — Canvas Glyph Tracing (Interactive Stroke):** Practice stroke order for key characters on an HTML5 canvas with snap-to-guide feedback.
- **Acceptance Gate:** Participant completes a quest with real-time tactile animations, bouncy button states, and immediate explanatory feedback.

### FR-07 — Blind-First Reveal & Community Mirror
- A participant must submit their own response before the Community Mirror aggregate distribution is unlocked.
- After submission, display a clean percentage distribution breakdown between candidate conventions.
- Displays sample size, active data collection dates, and review status.
- If subgroup sample size is below the threshold (default: < 5 participants), the subgroup breakdown is suppressed to protect anonymity.
- Copy strictly reinforces alignment rather than correctness (e.g., *"34% of participants selected Option A"* vs *"Option A is correct"*).
- **Acceptance Gate:** Network inspection cannot reveal aggregate answer distributions prior to client submission.

### FR-08 — Transparent Evidence Dashboard
Displays distinct, non-conflated measures:
- **Task Accuracy:** Scored performance on items with verified linguistic criteria.
- **Orthographic Agreement:** Measure of consensus among comparable submissions under explicit normalization rules.
- **Learnability & Speed:** Completion time curves and pre/post lesson retention.
- **Community Preference:** Results from formal consultation polls.
- **Qualitative Observations & Limitations:** Documented community feedback and dialect nuances.
- **Acceptance Gate:** No single weighted "winner score" or "best script ranking" is ever displayed in MVP.

### FR-09 — Lightweight Gamification & Mascot Motivation
- **XP Engine:** 
  - +10 XP for completing a quest.
  - +2 XP for submitting an optional reflection note.
  - +5 XP for contributing a verified spelling variant with provenance.
  - XP ledger is append-only and strictly idempotent (no double-counting on page refresh).
  - XP is never awarded for voting for a majority option or a specific script.
- **Scribe Streaks (Lipi Sadhana):** Daily habit counter with an optional "Ink Saver" (streak freeze) to encourage steady learning without punitive stress.
- **Badges:** First Quest, Careful Scribe, Script Explorer, Community Contributor.
- **Scribe Ranks:** Playful progression titles (e.g., Novice Reader -> Script Apprentice -> Scribe -> Epigraphist -> Lipi Ratna).
- **Celebration Modals:** Confetti explosion, bouncy mascot victory dance, and level-up audio-visual feedback upon completing a quest.
- **Acceptance Gate:** Public leaderboards ranking native speakers are completely absent.

### FR-10 — Discussion & Consultation Polls
- Moderated discussion threads attached to project milestones and stimuli.
- Structured consultation polls with published voter eligibility, start/end dates, and voting methodology.
- Enforces strictly one vote per user per poll.
- Results are explicitly marked as "Community Consultation / Advisory" unless the community's formal charter establishes a binding governance process.
- **Acceptance Gate:** Poll results cannot automatically overwrite database profile states or declare an official script.

### FR-11 — Auditable Decision Log
- Formal outcomes: `decision_recorded`, `more_testing_needed`, `no_consensus`, `no_decision_yet`.
- Captures decision method, participating bodies, summary of evidence evaluated, dissenting opinions, and scheduled review dates.
- **Acceptance Gate:** A project can cleanly close an iteration with `no_consensus` or `more_testing_needed` as a first-class valid outcome.

### FR-12 — Moderation & Abuse Prevention
- Community flagging for offensive content, spam, or linguistic trolling.
- Admin dashboard to review, hide, or restore flagged items with an auditable reason.
- Rate limiting on quest submissions, proposals, and comments.
- **Acceptance Gate:** All administrative moderation actions generate immutable audit log records.

### FR-13 — Tactile UI & Mascot Feedback Engine
- Complies fully with the Duolingo Design Tokens specified in [`00-design-system.md`](./00-design-system.md).
- Interactive tactile buttons with physical 2px-4px 3D depth press effects.
- Dynamic mascot speech bubbles delivering encouraging hints and linguistic context.
- Velocity-matched transitions powered by the `cut-the-curve` motion doctrine.
- **Acceptance Gate:** UI scores 100% on tactile responsiveness with zero flat generic defaults.

---

## 4. Non-Functional Requirements

- **Performance & Bandwidth:** First Contentful Paint < 1.2s on 4G networks; bundle size optimized via Next.js dynamic imports; SVG assets for glyphs and mascots.
- **Accessibility:** Full WCAG 2.1 AA compliance, keyboard navigation for all quest cards, high contrast ratios (`#4b4b4b` text on `#ffffff` canvas).
- **Internationalization & Script Rendering:** Flawless HarfBuzz / OpenType complex text shaping for Indic scripts (Devanagari, Sharada, Brahmi, Modi) with ligature preservation.
- **Codebase Architecture:** Follows Matt Pocock's `codebase-design` principles—deep modules with high depth-to-interface ratios (`QuestEngine`, `MetricsEngine`, `GovernanceWorkflow`, `GamificationLedger`).
- **Security:** Supabase PostgreSQL Row Level Security (RLS) on all user-accessible tables; zero secrets in client bundles; server-side Zod validation on every mutation.

---

## 5. Explicit Non-Goals for MVP

1. Grammar correction, automatic essay grading, or machine translation.
2. AI-generated prescription of "correct" writing systems.
3. Ranking native speakers or dialects by "purity" or "authority".
4. Custom ML model training or automatic speech recognition (ASR) in MVP.
5. Real-time chat feeds or generic social networking features.

---

## 6. MVP Release Gate

The MVP is production-ready only when:
1. An end-to-end synthetic demo project (e.g., comparing Classical Modi vs Devanagari orthographies) passes all 13 Functional Requirements.
2. The UI renders the Duolingo-grade tactile design system with active mascot feedback and sound/motion flourishes.
3. RLS security tests confirm that unauthenticated users cannot read private proposals or bypass blind-first restrictions.
4. The documentation suite is synchronized with zero contradictions.
