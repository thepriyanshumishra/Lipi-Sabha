# Lipi Sabha — UX Redesign Audit & Transformation Strategy

**Date:** 2026-10-29  
**Core Purpose:** Transform Lipi Sabha from an informational, card-heavy catalog into an engaging, playful, deeply immersive learning journey while preserving our ethical commitment: *"The community is the decision-maker, not just the dataset."*

---

## 1. Current UX Dilemma: Why the Existing Experience Feels Overwhelming

### 1.1 Redundant Structure & Competing Visual Clutter
1. **Wall of Repetitive Cards:** The current pages relied on generic SaaS card layouts with thin borders, small gray text, and identical visual containers, obscuring the human curiosity of writing systems.
2. **Feature Exposition Overload:** Visitors were immediately confronted with contribution tracking, review clinic rubrics, community governance options, and administrative stats instead of a focused, welcoming entry point.
3. **Passive Reading vs. Active Wonder:** Rather than inviting users to physically press, compare, and feel letters, earlier screens presented long paragraphs explaining orthography before users had experienced a single writing contrast.

### 1.2 Information Architecture Simplification
We are consolidating the public product into **FOUR core experiences**:
```
                 [ Lipi Sabha ]
                 /      |      \       \
          Explore     Learn    Writing  Community
                             Lab     (Sabha)
```
- **Contextual Demotion:** Review Studio, contribution management, and administration are removed from top-level clutter and nested naturally within user roles or project contexts.

---

## 2. Visual Direction: Duolingo-Inspired Tactility + Distinct Lipi Sabha Identity

### 2.1 The Tactile Aesthetic
- **Chunky, Confident Typography:** Introducing **Nunito** (`800`/`900` weights) for rounded, warm, storybook-friendly display headlines paired with **Inter** for crisp body text and Noto for authentic scripts.
- **Sticker-Style Interactive Buttons:** 3D chunky buttons with bottom borders (e.g., `border-b-4 border-purple-hover active:translate-y-1 active:border-b-0`) that provide tactile, rewarding physical feedback.
- **Restrained Palette with Emotional Roles:**
  - `Cream (#FFFCF7)` as the warm paper canvas.
  - `Purple (#7657E8)` as the primary exploratory accent.
  - `Mint (#D6F3E3 / #2D8B57)` for celebratory discoveries and positive validation.
  - `Coral (#FF947F)` and `Yellow (#FFE89C)` for story accents and playful surprises.

---

## 3. Signature Innovations

### 3.1 The Living Letter Garden
- Replaced abstract decorative floating blobs with an interactive **Character Discovery Flora**:
  - Interactive glyph nodes representing verified scripts (Devanagari, Latin Extended, Cyrillic, Tibetan/Ethiopic).
  - Hovering/clicking a node blooms a contextual discovery card explaining the sound, stroke history, and community context with real Unicode fidelity.

### 3.2 The Curiosity Hook (Side-by-Side Playground)
- An immediate interactive switch between orthographic conventions (e.g. Macron Vowels `tāla` vs. Doubled ASCII `taala`).
- Clearly emphasizes trade-offs without declaring a "winner".

### 3.3 The Discovery Trail
- A contextual trail leading from a single character → a recurring pattern → an orthographic rule → a community project → a gentle quest.

### 3.4 Visual Illustrated Learning Journey (The Learning Path)
- Redesigned `/learn` from a cards grid into an illustrated winding path of quest nodes (Meet a Script → Pattern Finder → Sound & Symbol → Beyond the Familiar) with progress stones and growing garden stages.

---

## 4. Phased Execution Roadmap

- [x] **Phase 1: Design Tokens & Typography:** Add Nunito rounded font family and tactile button utility classes.
- [x] **Phase 2: Master Navigation & Header:** Clean 4-link header + tactile sign-in/profile pill.
- [x] **Phase 3: Living Letter Garden & Homepage:** Interactive storybook hero, interactive comparison hook, 3 entry paths, and instant 30-second mini-quest.
- [x] **Phase 4: Illustrated Learning Path (`/learn`):** Winding journey map with unlocked nodes, celebration animations, and personal Progress Garden.
- [x] **Phase 5: Studio Writing Lab (`/lab`):** Big clean canvas, tactile diacritic stamp palette, and real-time convention comparison.
- [x] **Phase 6: Verification & User Journeys:** Comprehensive test runs across all journeys without forced registration.
