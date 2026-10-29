# 02 — Product Requirements Document (PRD)

**Product:** Lipi Sabha  
**Release:** MVP  
**Status:** Proposed baseline for implementation

## 1. Scope

The MVP is a responsive web application with authentication, role-aware workflows, project review, orthography setup, word-focused tests, limited phrase-level contextual tests, simple gamification, transparent results, Community Mirror, and a consultation/decision record.

The core unit is a **linguistic stimulus**. Initially this will mostly be a word; short phrases may be used to check whether a convention remains usable in context. The system does not correct sentence grammar.

## 2. Roles and permissions

| Capability | Participant | Proposer / coordinator | Linguist reviewer | Governance reviewer / admin |
|---|---:|---:|---:|---:|
| Browse public approved projects | Yes | Yes | Yes | Yes |
| Submit a project proposal | Yes, subject to anti-spam limits | Yes | Yes | Yes |
| Edit own unsubmitted proposal | Yes | Yes | Yes | Yes |
| Approve/reject project | No | No | No, unless separately appointed | Yes |
| Configure candidate profiles on approved project | No | Yes, if assigned | Yes, if assigned | Yes |
| Approve linguistic items/scoring criteria | No | No, unless qualified and assigned | Yes | Can require review |
| Complete quests/tests | Yes | Yes | Yes | Yes |
| View own individual response history | Yes | Yes | Yes | Yes, only when needed for moderation/audit and policy permits |
| View aggregate results | Yes, when released | Yes | Yes | Yes |
| Create consultation poll | No | Yes, if project rules allow | Can advise | Can moderate/authorize according to project rules |
| Cast eligible consultation vote | Yes | Yes | Yes | Yes, if eligible under published rules |
| Record formal outcome | No | Can submit proposed record | Can attest to linguistic review | Authorized community/governance role only |

Permissions may be narrowed by each project’s published rules. Platform administrator status must never automatically imply linguistic authority.

## 3. Functional requirements

### FR-01 — Authentication and profile
- Users can sign in and maintain a minimal profile.
- Users may optionally declare a language variety/region only at a broad, privacy-conscious level.
- Do not collect exact home address or precise location.
- Role grants are controlled server-side and cannot be self-assigned through editable profile fields.

**Acceptance:** a participant cannot modify their own role to become an admin or reviewer.

### FR-02 — Project proposal
The proposal form includes:
- project/language name and known alternative names;
- broad region/communities involved (optional and not precise location);
- language variety/dialect names, with “not yet documented” available;
- problem statement and project goal;
- candidate scripts/orthographies, if known;
- source/provenance for existing forms and proposed variants;
- community engagement/consent plan;
- proposer contact or project contact setting;
- initial scope: words, short phrases, or both.

**Acceptance:** submission creates a proposal in `submitted`/`under_review` state, not an automatically public active project.

### FR-03 — Governance review
- Reviewer can approve, request changes, or reject.
- Every action records actor, timestamp, status change, and reason.
- Proposer can revise and resubmit a changes-requested proposal.
- Public project pages show review state and do not describe approval as proof that a particular writing system is correct.

**Acceptance:** an unapproved proposal is not listed as an active public research project and cannot collect official research responses.

### FR-04 — Candidate orthography profiles
- A project may configure two or more candidate profiles.
- Each profile represents a script plus spelling/orthographic conventions, not just a script label.
- Capture a plain-language description, representative examples, reviewer status, source, and known limitations.
- Keep each candidate neutral (Option A/B labels are acceptable during blinded testing).

**Acceptance:** reviewers can tell what convention a participant was testing and what version of the rules applied.

### FR-05 — Stimulus/variant dataset
- Create stimuli of type `word` or `phrase` for MVP.
- Capture target/reference form, variety where known, optional pronunciation note or consented audio reference, data source, consent/usage basis, status, and review notes.
- Attach one or more forms/variants to candidate orthography profiles.
- Support multiple acceptable forms when the reviewed criteria allow them.
- A variant must not be automatically marked incorrect simply because it is less common.

**Acceptance:** every active test item has a provenance record and a review status. Unreviewed items cannot be used in scored accuracy tasks.

### FR-06 — Guided quest and testing
- Participant chooses an approved active project.
- Quest has a small set of clearly described tasks; default pilot target is 3–5 tasks per quest.
- MVP question types: (a) choose/recognize a reading or writing convention, (b) compare variants, (c) optional free-text spelling response for manual review.
- Each question is tied to a reviewed item and an explicit evaluation method.
- Save attempt start/completion and answers, with appropriate consent and privacy settings.

**Acceptance:** participant can finish a quest and view a completion state without needing every free-text response to be automatically scored.

### FR-07 — Blind-first reveal / Community Mirror
- A participant's response is recorded before aggregate responses are revealed.
- After submission, show aggregate community response distribution when the release threshold is met.
- Where safe and sufficiently sampled, show aggregate results by self-described language variety; otherwise suppress the subgroup.
- Clearly label community alignment as similarity to participant responses, not correctness.
- Display sample size, data period, review status, and limitations.

**Acceptance:** a user cannot see the answer distribution for a blind-first question before answering; small groups are not exposed through filters.

### FR-08 — Evidence dashboard
Display separate measures:
- task accuracy for explicitly scored tasks with reviewed criteria;
- spelling/orthographic agreement for comparable responses;
- median completion time and pre/post learning change, when test design supports it;
- community preference from consultation polls;
- qualitative feedback and known limitations.

Do not combine these into a single weighted “best script” score in the MVP.

**Acceptance:** every metric has a tooltip/help text or methodology panel and cannot be misread as a universal ranking.

### FR-09 — Lightweight gamification
- Award XP for completing a quest and making a valid, non-duplicative contribution.
- Add a small set of badges (e.g., First Quest, Careful Observer, Community Helper).
- Show personal progress and optional streak.
- XP is not awarded for choosing a popular option, voting for a particular script, agreeing with a majority, or reporting a language variety.
- No public leaderboard ranking native speakers in MVP.

**Acceptance:** gamification rewards participation quality and learning effort, never political/linguistic preference.

### FR-10 — Discussion and consultation
- Project discussion can capture comments/observations linked to an item or result.
- A project can open a consultation poll with the eligible voter group, poll question/options, start/end, and published method.
- Store one eligible vote per account per poll unless a formally approved design states otherwise.
- Poll output is labeled preference/consultation unless the project’s community-defined governance policy specifies a formal decision process.

**Acceptance:** poll result cannot silently change the approved orthography status or select a winner.

### FR-11 — Decision log
- Record outcome categories: `decision_recorded`, `more_testing_needed`, `no_consensus`, `no_decision_yet`.
- Store the decision method, participating/eligible group description, date, summary of evidence considered, dissent/limitations, and next review date if applicable.
- The system never automatically turns the highest vote count or metric into the formal decision.

**Acceptance:** a project can close a cycle without declaring a winning option.

### FR-12 — Moderation and audit trail
- Flag/report project content, variants, or comments.
- Admins can hide unsafe/spam content while preserving an audit trail.
- Keep review actions and project status transitions auditable.

**Acceptance:** privileged actions record actor, timestamp, action, target, and reason.

## 4. Non-functional requirements

- Responsive UI, keyboard accessible, readable at mobile sizes.
- Fast enough for low-bandwidth environments; avoid heavy animation and large media by default.
- TypeScript strict mode.
- Database migrations committed to source control.
- Authorization enforced server-side and with database Row Level Security where client access exists.
- No secrets in frontend bundles or repository.
- Automated checks for critical data permissions and workflow transitions.
- Clear distinction between demo/synthetic data and real community-sourced data.
- Audit-relevant timestamps stored consistently (UTC in database; localized for display).

## 5. Explicit non-goals

- Grammar correction or general sentence correction.
- Automatically generating or prescribing a new script.
- AI-generated “correct spelling” answers without an approved reference.
- Custom ML model training, speech recognition, or automatic transcription in MVP.
- Public leaderboards based on native-language knowledge.
- General-purpose chat, friends, social feed, or native mobile apps.

## 6. MVP acceptance gate

The MVP is demo-ready only when one seeded **synthetic/demo project** can complete the full flow from proposal review to test submission, evidence view, consultation, and decision record; real-data workflows remain disabled or clearly consent-gated until a real community and data permission are secured.
