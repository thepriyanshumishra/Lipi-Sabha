# 03 — UX Flows and Screen Map

## 1. Navigation

### Public / signed-out
- Home and product explanation
- Browse approved public projects
- Project overview (released information only)
- Sign in / create account

### Signed-in participant
- Home / daily quest
- My learning progress
- Project explorer
- Test and Community Mirror
- Contributions and feedback
- Profile and privacy settings

### Project proposer / coordinator
- Submit proposal
- Proposal status and reviewer feedback
- Project workspace (after approval)
- Orthography profiles
- Word/phrase dataset
- Quest/test builder
- Results and consultation tools

### Linguist reviewer
- Review queue for assigned projects/items
- Candidate convention details
- Stimulus provenance and scoring criteria
- Approve, request revision, or mark uncertain

### Governance reviewer / admin
- Project proposal queue
- Report/moderation queue
- Role management
- Audit log

## 2. Journey A — Propose a project

1. User signs in and selects “Propose a language project”.
2. Form asks for language/variety, broad region, problem, proposed scope, candidate options if known, data sources and community engagement plan.
3. User saves draft or submits.
4. Proposal status becomes `under_review`.
5. Reviewer sees a checklist: project purpose, community connection, provenance, consent, safety, and feasibility.
6. Reviewer approves, requests changes, or rejects with a reason.
7. Only approved proposals can be activated for official participant responses.

Empty fields should not force the proposer to invent certainty. “Unknown/not documented yet” must be available.

## 3. Journey B — Configure project

1. Coordinator defines each candidate orthography profile: script, rules, examples, known limitations and sources.
2. Coordinator adds word stimuli and optional short phrases.
3. Each item has its own provenance and review status.
4. Linguist/reviewer reviews pronunciation/scoring assumptions and acceptable forms.
5. Coordinator creates a small quest using only eligible reviewed items.
6. A dry run previews questions, answers, time capture and reveal behavior.
7. Quest is published to project participants.

## 4. Journey C — Learn and contribute

1. Participant opens Daily Quest or a project quest.
2. Intro explains what is being tested, consent, expected time, and whether answers are used in research.
3. Participant answers without seeing other participants' distribution (blind-first).
4. Submit response; app records attempt and answer under the chosen privacy setting.
5. Participant sees feedback: an explanation if validated, or “multiple forms are documented / under review” if no single answer is justified.
6. Community Mirror displays aggregate patterns only if minimum sample thresholds are met.
7. XP is awarded for completion and eligible contribution actions, not for agreement with majority.
8. Participant can optionally leave feedback or contribute a documented variant.

## 5. Journey D — Review evidence and deliberate

1. Coordinator opens the result dashboard.
2. Reviewer confirms that metrics use eligible data and the correct scoring rule.
3. Dashboard shows consistency, task accuracy, learning measures, preference and uncertainty separately.
4. Community discussion opens; minority responses and qualitative observations are not hidden by a single average.
5. If community-defined rules allow, a consultation poll opens with eligibility and method shown before voting.
6. An authorized role records the outcome and evidence considered. Outcomes include no consensus or more testing needed.

## 6. Important UI states

- Empty state: no verified writing profiles/items yet.
- Review pending: clearly show proposal is not active.
- Needs review: unverified item cannot contribute to a scored accuracy metric.
- Low sample size: suppress subgroup breakdown and explain why.
- Multiple valid forms: do not show a red “wrong” mark; show an explanation.
- No consensus: valid project outcome, not a failure state.
- Demo data: persistent visual label “Illustrative data — not community-validated”.
- Offline/failed request: preserve draft where safe and show an actionable retry state.

## 7. UX language guidance

Prefer:
- “Your answer differed from 42% of responses in this sample.”
- “Most participants selected Option A in this poll.”
- “This task has no single validated answer.”
- “Results are preliminary; sample size is 12.”

Avoid:
- “You know your language 42%.”
- “The community is wrong.”
- “AI selected the best script.”
- “Option A is objectively the winner” unless a tightly scoped, explicit test criterion supports that exact claim—and even then, it is not the community's adoption decision.
