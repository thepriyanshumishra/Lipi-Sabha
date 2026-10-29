# 09 — Decision Log

**Status labels:** `LOCKED` = use as MVP baseline; `PROPOSED` = recommended, not yet validated with target communities; `OPEN` = decide before relevant feature ships.

## Product decisions

| ID | Status | Decision | Rationale / boundary |
|---|---|---|---|
| D-01 | LOCKED | Lipi Sabha is a collaborative web application, not a generic social network. | Research workflow + community governance are the product core. |
| D-02 | LOCKED | Grammar correction is out of scope. | The focus is writing systems and orthographic conventions. |
| D-03 | LOCKED | Words are the primary MVP unit; short phrases may be used for contextual validation. | Avoids limiting the system to isolated names while keeping testing manageable. |
| D-04 | LOCKED | Candidate option = script plus spelling/orthographic conventions. | Script labels alone do not define how a language is written. |
| D-05 | LOCKED | The community is the final decision-maker; software provides evidence and records process. | No automatic “winning script” verdict. |
| D-06 | LOCKED | Project proposals require governance review before an official active study. | Reduces spam and unsupported public claims while preserving open proposals. |
| D-07 | LOCKED | Basic gamification is included in MVP. | Quests, small XP system, a few badges; no elaborate reward economy. |
| D-08 | LOCKED | Community Mirror is a core differentiator. | Blind-first answer then aggregate comparison, with safeguards and methodology. |
| D-09 | LOCKED | Task accuracy, orthographic agreement, learning, preference, and alignment are separate. | Prevents false certainty and misleading rankings. |
| D-10 | LOCKED | No public leaderboard for native-language knowledge in MVP. | Avoids shaming and false authority hierarchies. |
| D-11 | LOCKED | No custom ML model training in MVP. | Deterministic rules and human review are sufficient for initial validation. |
| D-12 | PROPOSED | Use a non-binding consultation poll by default. | Polls measure preference; any formal decision must follow a declared community process. |

## Technical decisions

| ID | Status | Decision | Rationale / boundary |
|---|---|---|---|
| T-01 | PROPOSED | Next.js App Router + React + TypeScript. | Compact web stack for UI and server-side functionality. |
| T-02 | PROPOSED | Supabase PostgreSQL + Auth. | Relational relationships, auth, managed service, RLS. |
| T-03 | PROPOSED | Tailwind CSS + shadcn/ui. | Reusable UI while allowing custom identity. |
| T-04 | PROPOSED | Vercel deployment. | Integrated Next.js deployment and preview environments. |
| T-05 | LOCKED | No secrets in client bundles; no service-role key in browser. | Security boundary. |
| T-06 | LOCKED | Migrations and RLS/policy tests are required. | Authorization must be reproducible and tested. |
| T-07 | LOCKED | No Redis, separate Express service, vector DB, or microservices in MVP without written rationale. | Avoid premature complexity. |

## Decisions still to make before a real pilot

1. How a community defines eligibility for participation and formal decision-making.
2. Who may serve as a linguist reviewer and how conflicts of interest are handled.
3. What consent and data license is appropriate for each type of contribution/audio.
4. The exact scoring rubric for each pilot task.
5. Retention, export, deletion, and attribution policy for contributed language data.
6. Whether consultation votes are advisory or part of a community-defined formal process for a specific project.
7. Which real community/project is willing to pilot and validate the workflow.

These should not be invented by the coding agent. Where they are not settled, the app should use explicit pilot settings and clearly label outputs as exploratory.
