# 00 — Design System & Visual Specification

**Brand Identity:** Lipi Sabha (लिपि सभा)  
**Aesthetic Theme:** Duolingo-inspired playful tactile classroom mascot on crisp paper canvas  
**Reference Specification:** [design.md](./design.md)  
**Core Doctrine:** High-craft, sticker-like tactile UI, playful rounded typography, expressive character mascot animations, and zero-slop contrast.

---

## 1. Visual Philosophy & Duolingo Translation

Duolingo revolutionized language education by stripping away intimidation and treating the screen like a vibrant, friendly storybook. For **Lipi Sabha**, where users engage with ancient, endangered, or competing writing systems (such as Brahmi, Sharada, Modi, Devanagari, Grantha, and regional orthographies), an intimidating academic interface causes cognitive fatigue. 

By translating Duolingo's tactile design language into script learning and community research:
* **Paper White Canvas (`#ffffff`):** Pure, uncluttered surface that allows script glyphs and stroke contrast to shine with museum-grade clarity.
* **Sticker-Style Tactile Components:** Every interactive button, script card, and choice chip features rounded 12px corners, chunky 2px solid borders, and bottom shadow/border depth that feels physical and clickable.
* **Emotional Color Palette:**
  * **Eager Green (`#58cc02`):** Primary progress, success feedback, and celebratory milestones.
  * **Spark Blue (`#1cb0f6`):** Secondary interactive exploration, links, audio playback buttons, and curiosity triggers.
  * **Storybook Tint (`#d7ffb8`):** Gentle wash for completed quest cards and subtle badge backgrounds.
  * **Charcoal (`#4b4b4b`) & Pencil Gray (`#777777`):** Readable, accessible text hierarchy that never creates harsh glare.
* **The Mascot ("Lipi"):** A charming, scholarly mascot (a playful little scribe bird holding a traditional reed pen / kalam) who guides participants through scripts, celebrates learning milestones, and introduces script history with warmth.

---

## 2. Design Tokens

### Colors (Tailwind & CSS Custom Properties)

```css
:root {
  /* Brand Core */
  --color-eager-green: #58cc02;
  --color-eager-green-depth: #46a302;   /* 3D button press border */
  --color-storybook-green: #d7ffb8;
  --color-spark-blue: #1cb0f6;
  --color-spark-blue-depth: #1899d6;    /* 3D button press border */
  --color-fresh-leaf: #a5ed6e;
  --color-night-ink: #000437;
  
  /* Gamification Accents */
  --color-sun-yellow: #ffc800;          /* XP / Stars / Coins */
  --color-sun-yellow-depth: #e5b400;
  --color-coral-fire: #ff4b4b;          /* Streak Flame / Hearts / Attention */
  --color-coral-fire-depth: #d63f3f;
  
  /* Neutrals */
  --color-paper-white: #ffffff;
  --color-canvas-cream: #fafafa;
  --color-charcoal: #4b4b4b;
  --color-pencil-gray: #777777;
  --color-faded-gray: #afafaf;
  --color-border-light: #e5e5e5;
  --color-border-subtle: #f0f0f0;

  /* Typography Families */
  --font-display: 'Feather Bold', 'Nunito Black', system-ui, sans-serif;
  --font-body: 'DIN Next', 'Inter', 'Nunito Sans', system-ui, sans-serif;
  --font-script-indic: 'Noto Sans Devanagari', 'Noto Sans Sharada', 'Noto Sans Brahmi', 'Noto Sans Modi', sans-serif;

  /* Typography Scale */
  --text-caption: 13px;
  --text-nav-label: 15px;
  --text-body: 17px;
  --text-subheading: 19px;
  --text-heading-sm: 24px;
  --text-heading-md: 32px;
  --text-heading-lg: 48px;
  --text-display: 64px;

  /* Spacing Scale (4px base) */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;

  /* Geometry & Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 9999px;
  --border-width-tactile: 2px;
  --border-width-thick: 3px;
}
```

---

## 3. Component Architecture & Micro-Interactions

### A. Tactile 3D Action Button (`<TactileButton />`)
* **Visual Treatment:** Solid vibrant fill, white bold uppercase text, 12px border radius, 2px bottom border shadow (`box-shadow: 0 4px 0 var(--depth-color)`).
* **Hover State:** Slight scale bounce (`scale(1.02)`), color brightens.
* **Active / Press State:** Translates 4px down (`transform: translateY(4px)`), bottom border collapses to 0, providing the tactile feedback of a physical keyboard button or arcade switch.
* **Variants:**
  * `primary` (Eager Green fill `#58cc02` + `#46a302` depth)
  * `secondary` (Paper White fill + 2px solid `#e5e5e5` border + Spark Blue text `#1cb0f6` + `#afafaf` depth)
  * `danger` (Coral Fire `#ff4b4b` for reset/mistakes)
  * `ghost` (Transparent + rounded pill)

### B. Interactive Script Tile Card (`<ScriptTileCard />`)
* **Role:** Represents an orthographic candidate, letterform, or word variant in a quest.
* **Structure:**
  * Large, high-legibility glyph display at center (36–48px size in proper Indic webfont).
  * Phonetic / IAST Latin transcription below in mid-gray (`#777777`, 15px).
  * Audio preview speaker icon (Spark Blue `#1cb0f6`) in top-right corner.
  * 16px padding, 16px border-radius, 2px border in `#e5e5e5`.
* **Selection State:**
  * Border color switches to Spark Blue (`#1cb0f6`) with soft tint wash (`#ddf4ff`).
  * Smooth 150ms spring animation.

### C. Animated Progress Bar (`<QuestProgressBar />`)
* **Role:** Tracks progression through a 3–5 task quest at the top of the viewport.
* **Structure:** 16px height, pill-shaped background in `#e5e5e5`.
* **Fill:** Eager Green `#58cc02` bar with an inner highlight streak (Storybook Green `#d7ffb8`).
* **Motion:** Uses velocity-matched ease (`power4.out`) to glide forward with a tiny bounce on every completed question.

### D. Mascot Bubble Dialog (`<LipiMascotBubble />`)
* **Role:** Delivers bite-sized linguistic context, script hints, or celebratory cheers.
* **Structure:**
  * Mascot illustration on the left (2D flat vector, bold black outlines, expressive eyes).
  * Rounded speech bubble on the right with a triangular tail pointing to the mascot.
  * Content in Charcoal `#4b4b4b` at 17px/500, with keywords highlighted in Eager Green or Spark Blue.

### E. Community Mirror Reveal Modal (`<CommunityMirrorCard />`)
* **Role:** Displays after blind-first submission.
* **Structure:**
  * Top status pill: "Your Choice: Option A (Modi Script)" with a checkmark badge.
  * Horizontal rounded percentage distribution bars comparing Option A vs Option B with sample counts.
  * Clear explanatory tooltip: *"Community preference indicates usage patterns in our sample, not historical correctness."*

---

## 4. Motion Doctrine & Sound Philosophy

Following our installed **`cut-the-curve`** and **`motion-doctrine`** skills:
1. **The Vector Law of Motion:** Transitions between quest tasks must never feel like jarring slide swaps. When transitioning to the next task:
   * Current question elements slide out to the left with mirrored power4 deceleration (`power4.inOut`).
   * The next question arrives with a waterfall entry from the right, elements cascading by weight: question title (0ms) -> script tiles (80ms) -> action CTA (160ms).
2. **Tactile Haptic Feedback:** Every button click, tile tap, and card flip triggers immediate visual compression (10/65/25 slide ratio).
3. **Celebration Moments (Lesson Complete):**
   * High-energy burst: XP tally rolls up from 0 to +10 XP with counter animation.
   * Confetti particle cascade (yellow, green, blue, pink).
   * Scribe mascot performs a victory dance.

---

## 5. Script & Font Stack Specifications

To ensure authentic, high-quality rendering of historical and living Indic scripts:

| Script Family | Primary Font | Fallback Stack | Rendering Requirements |
|---|---|---|---|
| **Devanagari** | `Noto Sans Devanagari` | `Mukta`, system-ui | HarfBuzz ligature engine, proper virama / matra positioning |
| **Sharada** | `Noto Sans Sharada` | Local SVG fallback | Unicode 15.0 block `U+11180–U+111DF` |
| **Brahmi** | `Noto Sans Brahmi` | Local vector glyphs | Unicode 6.0 block `U+11000–U+1107F` |
| **Modi** | `Noto Sans Modi` | Curated webfont | Unicode 7.0 block `U+11600–U+1165F` |
| **Grantha** | `Noto Sans Grantha` | System fallback | Unicode 7.0 block `U+11300–U+1137F` |
| **Latin Transliteration** | `Inter` / `DIN Next` | `Nunito Sans` | IAST diacritic support (`ā, ī, ū, ṛ, ḷ, ṅ, ñ, ṭ, ḍ, ṇ, ś, ṣ`) |

---

## 6. Accessibility & Responsive Constraints

* **Contrast Ratios:** All text combinations exceed WCAG 2.1 AA (4.5:1 for body copy `#4b4b4b` on `#ffffff`, 3:1 for large display text `#58cc02`).
* **Keyboard Navigation:** Every card, button, and audio player is fully focusable with a 2px Spark Blue outline ring.
* **Low-Bandwidth Mode:**
  * Vector SVGs used for mascot illustrations and glyphs (lightweight, zero pixelation).
  * Audio clips are compressed Opus/MP3 under 50KB per stimulus.
  * Animations respect `prefers-reduced-motion` media queries.
