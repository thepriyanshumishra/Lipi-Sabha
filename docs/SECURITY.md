# Lipi Sabha — Security & Authorization Architecture

**Security Tier:** Community Sovereign Educational Platform  
**Threat Model:** Public web application handling sensitive language documentation, orthographic proposals, and community decision records.

---

## 1. Authentication Architecture

- **Mechanism:** Django Session-Based Authentication backed by HttpOnly session cookies.
- **CSRF Protection:** Django `CsrfViewMiddleware` with `CSRF_TRUSTED_ORIGINS` configured for allowed frontend origins.
- **Password Storage:** Django PBKDF2 with SHA-256 password hashing.
- **Session Expiration:** Standard session cookie lifecycle with explicit server-side `logout` invalidation.

---

## 2. Role-Based Access Control (RBAC)

Lipi Sabha defines 7 distinct user roles:
1. `visitor`: Read-only access to public projects, writing lab, and guidelines.
2. `learner`: Enrolls in quests, records personal progress, and earns learning XP.
3. `contributor`: Submits example words, sentences, and rule suggestions. Can withdraw own submissions prior to acceptance.
4. `reviewer`: Authorized community reviewer. Accesses Review Studio queue, submits rubric assessments and rationales.
5. `specialist`: Senior linguistic consultant. Handles escalated ambiguities and orthographic edge cases.
6. `facilitator`: Community moderator. Oversees Sabha discussions, opens proposals, and publishes decision records.
7. `admin`: Technical administrator. Manages infrastructure, inspects audit logs, and monitors system health.

### Enforced Permission Classes (`backend/accounts/permissions.py`)
- `IsReviewerOrAdmin`: Blocks learners, contributors, or visitors from submitting reviews or altering review tasks.
- `IsFacilitatorOrAdmin`: Restricts project and proposal management mutations to authorized facilitators and administrators.
- `IsOwnerOrReviewer`: Object-level permission verifying that a contributor can only withdraw or edit their own submission.

---

## 3. XP & Gamification Safeguards

To uphold our core principle (*"The community is the decision-maker, not just the dataset"*):
- **Server-Side Validation:** The frontend cannot submit arbitrary XP increments. XP is calculated strictly on the backend upon server-verified quest completion.
- **Idempotency Keys:** Every XP event is assigned a unique idempotency key (e.g. `quest_<user_id>_<quest_id>`). Duplicate completions in review mode award 0 additional XP.
- **No Governance Privilege:** Neither XP nor badges grant voting weight, review approval rights, or authority over community decisions.

---

## 4. Immutable Audit Trail

- **Model Level:** The `AuditEvent` model overrides `save()` and `delete()` to raise a `PermissionError` if an update or delete is attempted on an existing record.
- **Scope:** All high-impact actions (`review.approve`, `review.revision`, `contribution.created`, `contribution.withdrawn`, `quest.completed`, `proposal.feedback_submitted`) automatically append a permanent entry to the audit log.
