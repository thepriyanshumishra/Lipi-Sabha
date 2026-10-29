# Lipi Sabha — Product Audit & State Assessment

**Date:** 2026-10-29  
**Core Principle:** *"The community is the decision-maker, not just the dataset."*

---

## 1. Executive Summary

This independent audit assesses the complete Lipi Sabha platform across architecture, security, UX, workflows, accessibility, script handling, and data integrity.

The initial scaffolding created a comprehensive structural foundation (22 React pages, 9 Django applications, SQLite local database, synthetic demo datasets). However, deep code-level inspection reveals significant discrepancies between the visual UI and backend enforcement:
1. **Security & Authorization:** Multiple API endpoints default to `AllowAny`, leaving review decisions, contribution withdrawals, and progress tracking open without role validation.
2. **XP Manipulation Vulnerabilities:** XP can be repeatedly granted without idempotency checks, and the client previously updated its own XP in localStorage without server confirmation.
3. **Data Immutability & Audit Integrity:** The `AuditEvent` model lacked append-only constraints at the model/view level.
4. **Offline Mock Fallback Coupling:** Frontend pages heavily relied on localStorage alongside demo constants, causing disconnects with the running Django REST API.
5. **Unicode and Script Handling:** Diacritics insertion did not apply Unicode normalization (NFC/NFD), risking visual ambiguity in search and storage.

---

## 2. Current Implementation Inventory

### Frontend Modules (React 19, TypeScript, Tailwind CSS v4)
| Module / View | Route | Implemented State | Data Source |
|---|---|---|---|
| **Homepage** | `/` | Complete with Letter Garden hero | Static + Demo |
| **Explore** | `/explore` | Interactive search & filters | Local demo array (Needs API bridge) |
| **Project Profiles** | `/projects/:id` | Tabbed view (Overview, Systems, Rules) | Demo array |
| **Learning Quests** | `/learn`, `/learn/:id` | Functional lesson engine (MCQ, matching, pattern) | Demo array + localStorage |
| **Writing Lab** | `/lab` | Playground, comparison, pattern inspector | Local state |
| **Contributions** | `/contribute`, `/contribute/new`, `/contributions`, `/contributions/:id` | Multi-step form, status tracker, withdrawal | localStorage + Demo |
| **Review Studio** | `/review`, `/review/:id` | 4-part rubric, rationale, action buttons | Demo array + localStorage |
| **Sabha Deliberation**| `/sabha`, `/sabha/proposals/:id`, `/sabha/decisions/:id` | Proposals, options, feedback form, decisions | Demo array |
| **User Dashboard & Profile** | `/dashboard`, `/profile` | Overview metrics, badges showcase, settings | Context + localStorage |
| **Admin Operations** | `/admin` | Projects creation, user scopes, audit trail | Demo array + local state |
| **Auth** | `/auth/sign-in`, `/auth/sign-up` | Email/password login, demo role switcher | Context + localStorage |
| **About & Guidelines**| `/about`, `/guidelines` | Vision, ethics, 10 product questions | Static editorial content |

### Backend Applications (Django 5, DRF, Python 3.13)
| App Name | Key Models | API Endpoints | Security & Auth State |
|---|---|---|---|
| `accounts` | `User` (roles: visitor, learner, contributor, reviewer, specialist, facilitator, admin) | `/api/auth/register/`, `login/`, `logout/`, `me/`, `csrf/` | Implemented; Session-based |
| `projects` | `Project`, `WritingSystem`, `OrthographyVersion`, `OrthographicRule` | `/api/projects/`, `/api/orthographies/`, `/api/rules/` | Read-only public; Mutations unconstrained |
| `contributions`| `Contribution` | `/api/contributions/`, `/mine/`, `/:id/withdraw/` | `AllowAny` permissions (Security Gap) |
| `reviews` | `ReviewTask`, `ReviewDecision` | `/api/reviews/`, `/queue/`, `/:id/submit/` | `AllowAny` permissions; No role check (Security Gap) |
| `learning` | `LearningQuest`, `LearningLesson`, `LearningProgress` | `/api/learning/quests/`, `/progress/` | XP awarded upon quest POST without idempotency (Integrity Gap) |
| `gamification` | `XPEvent`, `BadgeDefinition` | `/api/gamification/me/`, `/badges/` | Mocked endpoint responses |
| `community` | `Proposal`, `ProposalOption`, `DecisionRecord`, `ProposalParticipation` | `/api/proposals/`, `/decisions/` | Missing `ProposalParticipation` feedback persistence |
| `notifications`| `Notification` | `/api/notifications/`, `/:id/read/` | Functional |
| `moderation` | `AuditEvent` | `/api/admin/audit-log/` | Missing append-only model constraint & automatic audit logging |

---

## 3. Detailed Gap & Risk Analysis

### A. Security Weaknesses
1. **Unenforced Role Permissions in Reviews:**  
   `ReviewTaskViewSet` and `submit` action currently permit any HTTP client to approve/reject review tasks and set reviewer feedback without verifying if `request.user` has `role in ['reviewer', 'specialist', 'facilitator', 'admin']`.
2. **Unauthenticated Contribution Mutations:**  
   `ContributionViewSet` allowed anonymous users to create and withdraw contributions without session tracking or authentication.
3. **Audit Log Tampering Vulnerability:**  
   `AuditEvent` model lacked Django model-level restrictions preventing deletion or editing by standard database routines.
4. **CSRF Enforcement in Multi-Origin Environments:**  
   While local dev uses session auth with credentials, production deployment requires strict CSRF cookies with `SameSite=Lax/Strict` and explicit trusted origin matching.

### B. XP & Gamification Integrity
1. **Duplicate XP Exploits:**  
   Calling `/api/learning/progress/` repeatedly for the same quest incremented `user.learning_xp` without checking if `progress.completed` was already `True`.
2. **Authority Separation:**  
   While the documentation states XP does not confer governance authority, the codebase must enforce that proposal submission and Sabha participation check user community standing/roles rather than XP totals.

### C. Community Sabha Governance Integrity
1. **Participation Feedback Storage:**  
   The frontend Proposal page had a feedback form that updated local state but did not persist community comments to a `ProposalParticipation` backend model.
2. **Immutable Decision History:**  
   `DecisionRecord` must be strictly append-only so published outcomes cannot be silently altered or deleted.

### D. Unicode & Script Rigor
1. **Decomposed Diacritic Input Ambiguity:**  
   Typing characters like `ā` can be represented as NFC (`\u0101`) or NFD (`a` + `\u0304`). Without standard normalization on input in the Writing Lab and backend, search, comparison, and storage can yield mismatches.
2. **Grapheme Cluster Awareness:**  
   Word and character counting in the Writing Lab used standard `.length`, which miscounts complex combining character sequences and astral Unicode planes.

### E. Accessibility (WCAG 2.2 AA)
1. **Interactive Controls:** Certain toggle buttons in the Writing Lab and Explore filters lacked explicit `aria-pressed` or `aria-selected` attributes.
2. **Form Accessibility:** Error messages in authentication and contribution forms needed programmatic association via `aria-describedby` and `aria-invalid`.
3. **Motion Sensitivity:** Ensure all Framer Motion animations explicitly adhere to `prefers-reduced-motion: reduce`.

---

## 4. Prioritized Action Plan

- [x] **P0.1: Security & Permissions:** Implement custom DRF permission classes (`IsReviewerOrAdmin`, `IsAuthenticatedContributor`, `IsFacilitatorOrAdmin`) and apply to all mutation endpoints.
- [x] **P0.2: XP Engine Idempotency:** Fix server-side XP award logic to prevent duplicate awards on quest completion and record an immutable `XPEvent`.
- [x] **P0.3: Community Feedback Model:** Create and migrate `ProposalParticipation` model and API for the Sabha.
- [x] **P0.4: Immutable Audit Trail:** Implement append-only model constraints on `AuditEvent` and automatic logging of high-impact review, contribution, and decision actions.
- [x] **P0.5: Test-Driven Verification (TDD):** Expand test suite across authentication, permissions, XP duplication, contribution lifecycle, and review rubric validation.
- [x] **P1.1: Unicode & Writing Lab Enhancements:** Add NFC normalization and grapheme-safe counting in the Writing Lab.
- [x] **P1.2: Accessibility Improvements:** Add missing ARIA attributes, semantic landmarks, and focus management across forms and tabs.
- [x] **P1.3: Documentation:** Complete `AGENT_SKILLS.md`, `TESTING.md`, `SECURITY.md`, and `DEPLOYMENT.md`.
