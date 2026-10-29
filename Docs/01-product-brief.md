# 01 — Product Brief

## 1. Vision

Help language communities explore and compare writing systems and spelling conventions without outsiders or software choosing on their behalf.

## 2. Problem

Some languages do not have one widely agreed writing system or orthographic convention. Different spellings can make learning materials, transcripts, and digital resources harder to create. A tool can make options easier to compare, but it cannot prove that a community has agreed to adopt one.

## 3. Product definition

Lipi Sabha is a **collaborative language research and learning web application**. It combines:

- a controlled project-proposal and approval workflow;
- a workspace for candidate scripts and orthographic conventions;
- guided, bite-sized learning/testing activities;
- transparent evidence dashboards;
- community discussion and consultation;
- a record of decisions and unresolved disagreement.

It is not a generic social network, grammar-correction system, translation product, or automatic script authority.

## 4. Primary users

### Community participant / speaker
- Takes short quests and reading/writing tests.
- Shares spelling variants with provenance where possible.
- Reviews explanations, discusses results, and participates in eligible consultations.

### Project proposer / coordinator
- Submits a project proposal and explains the need.
- Adds candidate writing profiles and sample items after approval.
- Invites speakers and organizes activities.
- Does not automatically speak for the entire language community.

### Linguist / language reviewer
- Reviews candidate writing conventions, pronunciations, answer keys, and scoring rules.
- Flags uncertainty and documents acceptable variants.
- Does not unilaterally decide community preference.

### Governance reviewer / platform admin
- Reviews project legitimacy, readiness, safeguarding, data provenance, and spam risk.
- Approves, requests changes, or rejects a proposal with an audit trail.
- Moderates abuse and manages platform roles.

A person may hold more than one project-specific role, but authorization must be explicit and auditable.

## 5. Design principles

1. **Community sovereignty:** the community owns the decision process.
2. **Evidence before claims:** every displayed measure has a definition, source, sample size, and limitation.
3. **Preference is not correctness:** popularity, accuracy, consistency, and ease of learning are separate.
4. **Variation is not automatically an error:** do not silently normalize or label an unfamiliar variant incorrect.
5. **Expert review is scoped:** experts validate linguistic claims and test design; community members determine their own governance process.
6. **Consent and provenance:** store who supplied data, the permitted use, and attribution preference.
7. **Inclusive UX:** mobile-responsive, low-bandwidth tolerant, plain language, and usable with limited technical experience.
8. **No unnecessary ML:** rules-based workflows first; AI only when justified by a validated need.

## 6. MVP goal

Demonstrate one end-to-end project where a user can see how an approved project is proposed, reviewed, configured, tested, evaluated, discussed, and brought to a documented community outcome.

## 7. MVP success signals

These are pilot indicators, not promised impact targets:

- A new project proposal can be submitted and reviewed end-to-end.
- An approved project can configure at least two candidate orthography profiles.
- A participant can complete a short quest and submit responses.
- Results clearly distinguish validated task accuracy, spelling agreement, learning measures, and preference.
- A participant can see the Community Mirror only after submitting their own response.
- A reviewer can trace each published test item to a source and review status.
- A project can record “no decision yet” or “more testing needed”.
- Unauthorized access to drafts, private responses, and reviewer tools is blocked by the backend/database, not merely hidden in the UI.

## 8. Non-goals for the MVP

- Grammar correction, general translation, or language-model chat.
- Automatically declaring a “correct” or “winning” script.
- Custom model training, automatic speech recognition, or unsupported pronunciation claims.
- Public user leaderboards that rank native speakers by language knowledge.
- Native Android/iOS apps, real-time chat, general social feed, or complex recommendation engine.
- Large-scale, multi-country governance framework before the first pilot.

## 9. User problem / job to be done

“When our language is written in different ways, help us test and compare the options fairly, understand what the evidence does and does not say, and preserve our community’s authority to decide what to do next.”
