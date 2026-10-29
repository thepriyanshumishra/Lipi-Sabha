# Lipi Sabha — Agent Skills Integration & Registry

**Maintained for:** Lipi Sabha Development Team  
**Standards Registry:** [https://skills.sh/](https://skills.sh/)  
**Policy:** *Install only inspected, safe, and high-relevance skills. Never execute unverified code or expose repository credentials.*

---

## 1. Skill Categories & Audit Matrix

In accordance with Phase 2 and Phase 3 instructions, six core skill categories were queried against the official `skills.sh` registry, inspected for security, evaluated for compatibility with Antigravity and our tech stack (React 19 + TypeScript + Django 5), and classified:

| Category | Searched Identifier | Exact Discovered Package | Publisher / Source | Status | Trust & Safety Review |
|---|---|---|---|---|---|
| **1. Find Skills** | `find-skills` | `vercel-labs/skills@find-skills` | Vercel Labs (`skills.sh`) | **Adopted / Active** | Safe. Pure markdown instruction guide. Teaches discovery patterns without telemetry or executable backdoors. |
| **2. Frontend Design** | `frontend-design` | `anthropics/skills@frontend-design` | Anthropic | **Adopted / Active** | Safe. High-quality editorial design instructions emphasizing typography, content-first layout, avoiding generic SaaS kits. |
| **3. Accessibility** | `accessibility` | `addyosmani/web-quality-skills@accessibility` | Addy Osmani | **Adopted / Active** | Safe. Exhaustive WCAG 2.2 AA audit criteria, keyboard navigation patterns, screen reader announcements, and focus management. |
| **4. TDD** | `tdd` | `mattpocock/skills@tdd` | Matt Pocock | **Adopted / Active** | Safe. Clear test-driven development seam definitions, red-green-refactor rules, and anti-pattern warnings. |
| **5. Best Practices** | `best-practices` | `vercel-labs/agent-skills@vercel-react-best-practices` | Vercel Labs | **Adopted / Active** | Safe. 70 performance and security rules covering React, bundle optimization, and server action validation. |
| **6. Agent Browser** | `agent-browser` | `vercel-labs/agent-browser@agent-browser` | Vercel Labs | **Evaluated** | Requires local Rust native binary or Playwright CLI for live browser interaction. Evaluated and supplemented with headless API/HTTP integration suites. |

---

## 2. Detailed Trust & Compatibility Audits

### 1. `vercel-labs/skills@find-skills`
- **Purpose:** Discovery of specialized agent capabilities when encountering new domain requirements.
- **Publisher:** Vercel Labs (4.1M installs).
- **Security Check:** Contains zero executable scripts, network requests, or credential extraction routines. Pure instructional Markdown.
- **Lipi Sabha Relevance:** Enables structured discovery when encountering complex multilingual NLP, Unicode collation, or font rendering tasks.

### 2. `anthropics/skills@frontend-design`
- **Purpose:** Editorial design direction, aesthetic uniqueness, and avoiding repetitive AI layout tropes.
- **Publisher:** Anthropic (1.0M installs).
- **Security Check:** Pure instructional Markdown. No external network dependencies.
- **Lipi Sabha Relevance:** Critical for preserving our unique **Letter Garden** visual identity and preventing the product from decaying into a generic SaaS card dashboard.

### 3. `addyosmani/web-quality-skills@accessibility`
- **Purpose:** Systematic WCAG 2.2 AA compliance auditing and remediation.
- **Publisher:** Addy Osmani (65K installs).
- **Security Check:** Pure instructional guide with standard HTML/ARIA patterns.
- **Lipi Sabha Relevance:** Language communities contain speakers of all digital literacy and accessibility needs; proper keyboard navigation, high-contrast states, and screen reader announcements are foundational to our mission.

### 4. `mattpocock/skills@tdd`
- **Purpose:** Test-Driven Development (Red-Green-Refactor) at public interface seams.
- **Publisher:** Matt Pocock (1.2M installs).
- **Security Check:** Pure instructional Markdown.
- **Lipi Sabha Relevance:** Essential for ensuring critical security and workflow changes (authorization checks, review rubrics, XP awards, and audit logging) are implemented with rigorous test coverage.

### 5. `vercel-labs/agent-skills@vercel-react-best-practices`
- **Purpose:** Engineering, security, and React 19 performance guidelines.
- **Publisher:** Vercel Labs (850K installs).
- **Security Check:** Pure instructional Markdown.
- **Lipi Sabha Relevance:** Enforces proper event listener cleanup, eliminates waterfalls, and optimizes bundle sizes for low-bandwidth community users.

---

## 3. Lightweight Skills Maintenance Practice

To keep Lipi Sabha’s capabilities up to date without uncontrolled background polling or unvetted updates:
1. **Task-Triggered Evaluation:** Before beginning a complex new domain task (e.g. font shaping, complex transliteration, or PostgreSQL clustering), check if an existing skill covers the domain.
2. **Search Verification:** Query `npx skills find <keyword>` or browse `https://skills.sh/`.
3. **Inspect Before Adopting:** Always run `npx skills use <package>@<skill>` or review the raw `SKILL.md` to verify author, permissions, and instructions.
4. **Safety Filter:** Reject any package that demands arbitrary bash execution, uploads code to unknown third-party endpoints, or requests credentials.
5. **Registry Log:** Record all adopted skills in this document (`docs/AGENT_SKILLS.md`).
