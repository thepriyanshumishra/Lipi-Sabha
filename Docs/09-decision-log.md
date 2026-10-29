# 09 — Decision Log

**Status labels:** `LOCKED` = use as baseline for implementation; `PROPOSED` = recommended, not yet validated with target communities; `OPEN` = decide before relevant feature ships.

---

## Product Decisions

| ID | Status | Decision | Rationale / Boundary |
|---|---|---|---|
| D-01 | LOCKED | Lipi Sabha is a collaborative web application, not a generic social network. | Research workflow + community governance are the product core. |
| D-02 | LOCKED | Grammar correction and machine translation are out of scope. | The focus is writing systems and orthographic conventions. |
| D-03 | LOCKED | Words are the primary MVP unit; short phrases are used for contextual validation. | Avoids limiting the system to isolated names while keeping testing manageable. |
| D-04 | LOCKED | Candidate option = script plus spelling/orthographic conventions. | Script labels alone do not define how a language is written. |
| D-05 | LOCKED | The community is the sovereign decision-maker; software provides evidence. | No automatic “winning script” verdict or algorithmic coercion. |
| D-06 | LOCKED | Project proposals require governance review before active testing. | Reduces spam, trolling, and unsupported claims while keeping proposals open. |
| D-07 | LOCKED | Duolingo-grade tactile gamification & interactive quests are core to MVP. | High engagement (3-min quests, XP, Scribe Ranks, Mascot) without ideological bias. |
| D-08 | LOCKED | Community Mirror is a core differentiator. | Blind-first answer then aggregate comparison, with safeguards and methodology. |
| D-09 | LOCKED | Task accuracy, orthographic agreement, learning, preference, and alignment are separate. | Prevents false certainty and misleading single-metric rankings. |
| D-10 | LOCKED | No public leaderboard ranking native speakers by linguistic knowledge. | Avoids linguistic shaming and false authority hierarchies. |
| D-11 | LOCKED | No custom ML model training in MVP. | Deterministic rules and human review are sufficient for initial validation. |
| D-12 | PROPOSED | Use non-binding consultation polls by default. | Polls measure preference; any formal decision must follow a declared community process. |
| D-13 | LOCKED | Duolingo visual tokens and Scribe Mascot "Lipi" define the UI/UX baseline. | Tactile 12px rounded cards, 2px borders, Paper White canvas, Eager Green/Spark Blue accents. |

---

## Technical Decisions

| ID | Status | Decision | Rationale / Boundary |
|---|---|---|---|
| T-01 | LOCKED | Next.js 15 (App Router) + React 19 + TypeScript. | Compact full-stack architecture for responsive UI and server actions. |
| T-02 | LOCKED | Neon Serverless PostgreSQL + Drizzle ORM. | Superior serverless connection pooling, instant branching, fast query execution, zero vendor lock-in. |
| T-03 | LOCKED | NextAuth.js with Direct Google OAuth. | Clean session management with direct Google Cloud OAuth application. |
| T-04 | LOCKED | Cloudinary for media and audio assets. | Fast CDN-hosted media for manuscript images, mascot illustrations, and pronunciation audio clips. |
| T-05 | LOCKED | Tailwind CSS v4 + Radix UI + Custom 3D Tactile Tokens. | Reusable accessible primitives styled to Duolingo design system specifications. |
| T-06 | LOCKED | Deep Module Seam Architecture (`codebase-design`). | Four isolated deep modules: `QuestEngine`, `MetricsEngine`, `GovernanceWorkflow`, `GamificationLedger`. |
| T-07 | LOCKED | Deployments on Vercel / Render. | Optimized for Next.js 15 edge runtime and background services. |
| T-08 | LOCKED | `codebase-memory-mcp` integration for persistent structural repo intelligence. | Saves context tokens and prevents repetitive full-codebase scanning. |

---

## Decisions Still to Make Before a Real Pilot

1. **Eligibility Criteria:** How a real community defines who can participate in formal governance ballots.
2. **Reviewer Qualifications:** Who qualifies as a community linguist and how conflicts of interest are declared.
3. **Audio Licensing:** What creative commons or traditional knowledge licenses apply to community recordings.
4. **Scoring Rubric:** Exact phonetic distance weighting for regional dialect variants.
5. **Data Retention & Sovereignty:** Community data export and deletion procedures.
