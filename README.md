# Lipi Sabha — Let Communities Choose How to Write

> **Core Principle:** *"The community is the decision-maker, not just the dataset."*

Lipi Sabha is a full-stack web application designed to help language communities explore, compare, and deliberate writing systems. It combines an engaging learning system, an interactive writing lab, a structured contribution workflow, an evidence-based review studio, and community governance features (the Sabha).

---

## 🎨 Visual Design System

Built with an original editorial identity centered around the **Letter Garden**:
- **Background:** `#FFFCF7` (warm cream canvas)
- **Main Text:** `#28243B` (deep ink)
- **Primary Purple:** `#7657E8` (intentional focus for primary actions)
- **Coral:** `#FF947F` (creative highlights)
- **Mint:** `#D6F3E3` (verified progress & milestones)
- **Yellow:** `#FFE89C` (highlight discoveries)
- **Sky Blue:** `#DDEEFF` (educational explanations)
- **Soft Lilac:** `#F0EBFF` (soft backgrounds)
- **Typography:** Playfair Display (editorial serif display) + Inter (clean sans body) + Noto multi-script stacks

---

## 🏗️ Architecture & Stack

### Frontend
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Custom Design Tokens
- **Routing:** React Router v6
- **Animation:** Framer Motion (Letter Garden floating shapes & transitions)
- **Icons:** Lucide React
- **Forms & State:** React Hook Form + Context API + TanStack Query

### Backend
- **Framework:** Python 3.13 + Django 5 + Django REST Framework
- **Database:** SQLite (development) / PostgreSQL (production-ready)
- **Security:** Session Authentication with CSRF protection + CORS configuration
- **Modular Monolith:** 9 domain apps (`accounts`, `projects`, `contributions`, `reviews`, `learning`, `gamification`, `community`, `notifications`, `moderation`)

---

## 🌐 Complete Information Architecture

| Section | Route | Purpose |
|---|---|---|
| **Home** | `/` | Editorial Letter Garden hero, comparison tool, 3 entry paths, principles |
| **Explore** | `/explore` | Multi-script project library with search and status filtering |
| **Project** | `/projects/:id` | Project profiles, orthography versions, documented rules, and context |
| **Learning** | `/learn` | Quests overview, personal Progress Garden stage, milestone badges |
| **Quest** | `/learn/:id` | Interactive lessons (MCQ, rule matching, pattern spotting, XP awards) |
| **Writing Lab** | `/lab` | Sandbox with character insert palette, side-by-side comparison, rule inspector |
| **Contribute** | `/contribute` | Guidelines and multi-step submission wizard with consent options |
| **My Contributions** | `/contributions` | Submissions tracker with withdrawal and status timeline |
| **Review Studio** | `/review` | Review queue for verified community reviewers |
| **Review Task** | `/review/:id` | Evidence workspace with 4-part rubric and accountable rationale |
| **Sabha** | `/sabha` | Community deliberation forum, proposals, and official decision records |
| **Proposal** | `/sabha/proposals/:id` | Neutral alternatives presentation, limitations, and feedback form |
| **Decision Record**| `/sabha/decisions/:id` | Permanent records with documented dissent and reconsideration clauses |
| **Dashboard** | `/dashboard` | User dashboard with garden progress, activity, and notifications |
| **Profile** | `/profile` | User settings, role switcher, and badge showcase |
| **Admin** | `/admin` | Operations studio: project registration, user access, analytics, audit log |
| **About & Guidelines** | `/about`, `/guidelines` | Core commitments, data ethics, and the 10 essential product questions |

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start at `http://localhost:5173`.

To verify production build:
```bash
npm run build
```

### 2. Backend Setup
```bash
cd backend
python manage.py migrate
python manage.py seed_demo_data
python manage.py runserver 8000
```
The Django REST API will run at `http://127.0.0.1:8000/api/`.

---

## 🧪 Testing

### Backend Unit Tests
```bash
cd backend
python manage.py test accounts projects
```

### Frontend Typecheck & Build Test
```bash
cd frontend
npm run build
```

---

## 👥 Demo Accounts (Instant Role Switcher)

For instant testing, navigate to `/auth/sign-in` and use the **Instant Demo Role Switcher**:
- **Learner (`Aria`):** Explore quests, see Progress Garden growth, earn XP.
- **Contributor (`Kavi`):** Draft words and sentences, track review progress, request withdrawal.
- **Reviewer (`Meera`):** Access Review Studio, evaluate submissions against documented rules.
- **Facilitator (`Rohan`):** Host community consultations, record Sabha decisions.
- **Administrator (`Admin`):** Manage projects, inspect audit logs, and view product analytics.

---

## ⚠️ Known Limitations & Demonstration Notice
All initial datasets (e.g. *Tundra Script Project*, *Tundrani*, *Nadivali*) are **clearly labeled synthetic demonstration examples**. They test platform mechanisms without fabricating real community endorsements or authentic linguistic authority. Real-world deployment requires explicit partnership with legitimate community-defined decision-making bodies.
