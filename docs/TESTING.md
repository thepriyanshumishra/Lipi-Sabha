# Lipi Sabha — Automated & Workflow Testing Strategy

**Target:** Lipi Sabha Quality Assurance  
**Standards:** WCAG 2.2 AA, TDD at Public Seams, and Zero-Regressions Integrity

---

## 1. Testing Architecture & Seams

Testing is organized along the public interface seams defined by the TDD skill:
- **Seam 1: Authentication & Authorization** (`backend/accounts/tests.py`)
  - Session login, CSRF tokens, user profile metadata, role assignments.
- **Seam 2: Contributions Lifecycle & Permissions** (`backend/moderation/tests.py`)
  - Authenticated submission, unauthenticated rejection (401/403), contributor-only withdrawal, and admin override.
- **Seam 3: Review Studio & Rubric Rigor** (`backend/moderation/tests.py`)
  - Reviewer/Specialist/Admin role enforcement, mandatory rationale requirement, and status state transitions (`Under Review` → `Accepted` / `Revision Requested` / `Escalated`).
- **Seam 4: XP Engine Idempotency** (`backend/moderation/tests.py`)
  - Server-side validation of quest completion, anti-duplication guards, and ledger tracking in `XPEvent`.
- **Seam 5: Community Sabha Deliberations** (`backend/moderation/tests.py`)
  - Proposal feedback persistence via `ProposalParticipation`, neutral option rendering, and immutable `DecisionRecord` preservation.
- **Seam 6: Audit Log Permanence** (`backend/moderation/tests.py`)
  - Append-only database constraints; verifies that modifying or deleting an `AuditEvent` throws a `PermissionError`.
- **Seam 7: Frontend Build & Type Integrity** (`frontend/`)
  - TypeScript strict mode verification via Vite/Rollup compilation.

---

## 2. Test Execution Commands

### Running Backend Django Test Suite
```powershell
cd "c:\Users\raipr\OneDrive\Desktop\lipi sabha\backend"
python manage.py test accounts projects moderation
```

**Verified Test Results:**
- Ran **13 tests** covering all critical security and workflow seams.
- Result: **13 passed, 0 failures, 0 errors (OK)**.

### Running Frontend Typecheck & Build
```powershell
cd "c:\Users\raipr\OneDrive\Desktop\lipi sabha\frontend"
npm run build
```
- Result: **2,405 modules transformed with zero TypeScript errors**.

---

## 3. End-to-End User Journey Verification Matrix

| Journey | Role / Persona | Entry Point | Core Action | Verified Outcome |
|---|---|---|---|---|
| **Journey A** | Learner (`Aria`) | `/learn/1` | Complete lessons & test recall | 100 XP awarded once; re-completing in review mode does not duplicate XP |
| **Journey B** | Contributor (`Kavi`) | `/contribute/new` | Enter sample, specify provenance, consent | Submission stored; withdrawal tested and verified in audit log |
| **Journey C** | Reviewer (`Meera`) | `/review/1` | Apply 4-part rubric + rationale | Approved with documented rationale; Review XP awarded to reviewer; unauthorized learner blocked |
| **Journey D** | Community Member | `/sabha/proposals/1` | View options, submit consultation note | Feedback persisted in `ProposalParticipation`; audit event logged |
| **Journey E** | Administrator (`Admin`)| `/admin` | Inspect audit trail, manage projects | Project registered; immutable audit history verified |
| **Journey F** | Visitor (Public) | `/`, `/explore`, `/lab` | Try writing playground, view principles | No login required for exploration; NFC normalization available |
