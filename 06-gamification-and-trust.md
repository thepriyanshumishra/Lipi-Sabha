# 06 — Gamification, Community Mirror, and Trust

## 1. Product loop

**Learn → Answer blind → Reveal context → Reflect → Contribute**

Gamification should make useful participation easier to repeat; it must not manipulate community outcomes.

## 2. MVP gamification

### Quests
- Daily Quest: default 3–5 short tasks.
- Project Quest: a focused set of tasks for a specific approved writing-system study.
- Community Mission: a project goal such as reviewing a small batch of sample forms, documenting sources, or completing a study session.

### XP (starter rules; tune after pilot)
- Complete a quest: 10 XP.
- Complete an optional reflection/explanation: 2 XP, capped per quest.
- Submit a contribution that passes the project's provenance/review criteria: 5 XP.
- Complete a reviewed learning module: 5 XP.

XP is for effort and constructive contribution, not for which script the user selects, how often they vote, or whether they agree with the majority. Apply idempotency to prevent duplicate XP from retries. Keep an audit ledger.

### Badges
- **First Quest** — first completed quest.
- **Careful Observer** — completed a set number of comparisons and reviewed the explanations.
- **Community Helper** — supplied a contribution that passed review.
- **Evidence Explorer** — viewed the methodology/explanation for a result.

Badges must not claim someone is a better native speaker or more authoritative than another participant.

### Streaks
- Optional in the MVP and easy to disable.
- Do not penalize missed days or create loss-aversion pressure around community participation.

### Leaderboards
- No public leaderboard for language knowledge in MVP.
- If group progress is displayed, it should represent collaborative mission completion, not which option members voted for.

## 3. Community Mirror

### Purpose
After a user submits an answer, show how responses in the current sample are distributed. The goal is to help users discover variation, not judge them against the majority.

### Interaction contract
1. Explain the task and consent/use before answering.
2. Record the participant’s response.
3. Reveal the aggregate only after submission.
4. Separate peer distribution from reviewed task feedback.
5. Show sample size and whether the item/convention has expert review.
6. If the sample is too small, show a neutral “not enough data to display a breakdown” state.

### Example labels
- “You selected Option B. In this sample, 31% selected Option B.”
- “Answers vary across the participants who responded.”
- “This task is not scored because more than one form is accepted.”
- “This is a preference poll, not a language-correctness test.”

Avoid: “You know your language 31%”, “you are wrong because most people chose A”, or “the community is wrong”.

### Dialect/variety-aware view
- Variety/region is optional self-description, not inferred from IP or precise location.
- Never imply the platform’s list of varieties is complete.
- Default minimum cohort for subgroup display: 5, subject to a stricter threshold when context requires it.
- Avoid filter combinations that allow someone to infer one person’s response.
- Show “variety not provided” as a legitimate option.

## 4. Metrics must remain separate

### Task accuracy
For a task with reviewed, explicit criteria only. For free-text spelling, automatic scoring needs reviewed accepted forms/normalization. Otherwise mark as `needs_human_review` or `not_scored`.

### Orthographic agreement
The degree to which responses agree under a specified, transparent grouping/normalization rule. Agreement is not proof that the convention is best or that dissenters are wrong.

### Learnability
For a controlled task, compare pre/post performance and completion-time distributions. Record prior familiarity where appropriate. Small pilot numbers are exploratory, not definitive proof.

### Community preference
Report poll results, eligibility, sample size, and method. A preference poll does not itself prove consensus.

### Community alignment
How similar the participant’s response is to other responses in a defined sample. It is descriptive, not a correctness score.

No composite winner score in the MVP.

## 5. Anti-gaming and fairness controls

- Do not give XP for votes or for choosing a majority option.
- Rate-limit repeated submissions and enforce one eligible poll vote per user.
- Do not reveal aggregate answers before blind-first responses are submitted.
- Mark demo/synthetic data persistently.
- Flag suspicious duplicate contribution patterns for review rather than silently deleting valid variants.
- Support multiple legitimate responses and unresolved variants.
- Keep majority/minority distributions visible when safe; avoid collapsing diversity into a single score.
- Do not rank dialects or speakers.

## 6. Research integrity

- Record source, permission/consent basis, reviewer, version, and task criteria.
- Clearly separate community reports, expert-reviewed claims, and automated calculations.
- Publish methodology alongside result displays.
- If the study design cannot establish a single correct answer, do not fabricate one for quiz convenience.
