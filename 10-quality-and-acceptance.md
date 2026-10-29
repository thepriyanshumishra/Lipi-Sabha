# 10 — Quality, Privacy, and Acceptance Checklist

## 1. Critical user journeys

- [ ] Signed-out visitor can view only public approved project information.
- [ ] Eligible user can submit a project proposal.
- [ ] Proposal moves through review states with actor, time and reason.
- [ ] A proposer cannot approve their own proposal unless independently assigned a permitted review role by a documented policy.
- [ ] Only active approved projects can collect official test responses.
- [ ] A reviewer can mark a stimulus or orthography profile reviewed, disputed, or in need of revision.
- [ ] A participant can complete a quest and responses are stored against the exact item/profile version.
- [ ] Blind-first responses are required before showing aggregate answers.
- [ ] Low-sample subgroup breakdowns are suppressed.
- [ ] “Not scored” and “multiple forms accepted” states display correctly.
- [ ] XP grants are idempotent on refresh/retry.
- [ ] A poll rejects duplicate or ineligible votes.
- [ ] A poll cannot automatically change an orthography profile or community decision state.
- [ ] A decision can be recorded as no consensus or more testing needed.

## 2. Metric checks

- [ ] Task accuracy exists only for items with reviewed explicit criteria.
- [ ] Exact string mismatch is not automatically treated as linguistic error.
- [ ] Orthographic agreement formula and normalization rule are documented.
- [ ] Learning-time results show sample size and test conditions.
- [ ] Community preference is displayed separately from performance metrics.
- [ ] Community alignment is descriptive and never labeled as correctness.
- [ ] No overall weighted “best script” score appears in MVP.

## 3. Security checks

- [ ] RLS enabled on every exposed table.
- [ ] Explicit table grants reviewed for `anon`, `authenticated`, and privileged server roles.
- [ ] Server-only secret values are absent from client bundle and repository.
- [ ] Invalid role claims and tampered project IDs are rejected.
- [ ] Users cannot read private proposals, raw responses or reviewer notes outside their authorization.
- [ ] Admin-only transitions are validated server-side and audited.
- [ ] Input validation, output escaping and basic rate limiting exist on public submission paths.
- [ ] Small-group suppression is enforced before data reaches the client.

## 4. Privacy and consent

- [ ] Research use is explained before a response is collected.
- [ ] Contributor can choose attribution preference where applicable.
- [ ] Audio is stored only with permission and defined access/retention.
- [ ] Exact location and unnecessary personal details are not requested.
- [ ] Users can understand how their responses contribute to aggregate reporting.
- [ ] The project clearly separates synthetic demo data from real research data.
- [ ] Data retention, export and deletion route is defined before production pilot.

## 5. Release gate

Do not call the MVP demo-ready until:
- lint/typecheck/build pass;
- critical tests pass;
- core authorization tests pass;
- one end-to-end synthetic project can be demonstrated;
- the UI explains the distinction between preference, correctness, consistency, learnability and alignment;
- an outcome of “no decision yet” can be represented;
- documentation matches the implemented behavior.
