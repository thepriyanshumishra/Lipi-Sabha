# 08 — AI Coding Agent Operating Guide

**Purpose:** Empowers autonomous, high-velocity engineering while strictly enforcing product boundaries, security invariants, and community sovereignty.

---

## 1. Canonical Hierarchy of Truth

When making architectural or implementation decisions, follow this strict precedence order:
1. `01-product-brief.md` and `02-prd.md` (Product purpose and functional scope)
2. `00-design-system.md` and `design.md` (Duolingo visual benchmark, tokens, and tactile UI components)
3. `09-decision-log.md` (Locked product and technical decisions)
4. `04-system-architecture.md` (Deep module boundaries and stack topography)
5. `05-data-model.md` (Database schema and relational constraints)
6. `07-roadmap-backlog.md` (Vertical slice implementation priorities)

---

## 2. Autonomous Decision Latitude

The coding agent is authorized to decide independently:
- **Component Decomposition & UI Craft:** Crafting modular React components that fulfill the tactile Duolingo aesthetic (3D press buttons, rounded cards, sticker pills).
- **Internal Seam Architecture:** Structuring internal helper functions inside deep modules (`QuestEngine`, `MetricsEngine`, `GovernanceWorkflow`, `GamificationLedger`).
- **Animations & Micro-interactions:** Integrating velocity-matched eases from `cut-the-curve` and particle bursts for quest celebrations.
- **Test Generation & Coverage:** Writing unit, integration, and RLS policy tests for all newly added endpoints.
- **Codebase Memory Indexing:** Querying and maintaining the local `codebase-memory-mcp` knowledge graph to optimize context tokens.

---

## 3. Strict Boundary Invariants (What the Agent Must Never Do)

1. **Never Declare a "Winning" Script:** The agent must never write code that ranks scripts, declares a spelling "objectively best", or presents majority votes as linguistic correctness.
2. **Never Collapse Variant Diversity:** A submitted variant differing from common forms must never be silently marked "incorrect" or deleted unless it violates community safety rules.
3. **Never Compromise the Security Boundary:** Never expose the `SUPABASE_SERVICE_ROLE_KEY` to client components, `NEXT_PUBLIC_*` variables, or client bundles.
4. **Never Bypass Governance Approval:** Unapproved or draft proposals must never be shown on public project pages or allowed to collect participant responses.
5. **Never Fabricate Real Community Data:** All demo or seed data must be explicitly flagged with `is_synthetic_demo = true` and visibly marked in the UI.
6. **Never Add Unsanctioned Dependencies:** Do not introduce Redis, a separate Express service, vector databases, or external AI APIs without an approved change proposal.

---

## 4. Engineering Workflow per Vertical Slice

For every feature or vertical slice:
1. **Consult Knowledge Graph:** Use `codebase-memory-mcp` or directory inspection to understand existing types and seams.
2. **Implement Inside Deep Modules:** Keep core business logic inside `lib/modules/` with clean public functions.
3. **Apply Tactile Design Tokens:** Use Tailwind classes matching the Duolingo token system (`bg-[var(--color-eager-green)]`, `rounded-xl`, `border-2`, `shadow-[0_4px_0_var(--color-eager-green-depth)]`).
4. **Validate at Trust Boundaries:** Validate incoming parameters with Zod schemas in server actions.
5. **Verify Security via RLS:** Ensure table queries respect row-level authorization.
6. **Report Observed Results:** Accurately document files modified, tests executed, and UI states verified.
