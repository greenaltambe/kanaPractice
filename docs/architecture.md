# Architecture & Engine Overview

This document details the internal design, algorithms, and reactive store architecture powering the Kana Practice app.

---

## 1. Core Principles

The app is built as a **zero-click, keyboard-first training tool** designed to build rapid visual-to-phonetic muscle memory for Japanese kana.

- **Instant Keystroke Validation**: Typing the correct romanization immediately validates and advances to the next character without requiring an `Enter` keypress.
- **Micro-Leitner Dynamic Spaced Repetition**: Instead of rigid "review tomorrow" intervals, card difficulty adapts within active practice sessions across 5 Leitner boxes.
- **Speed Sensitivity**: High accuracy at slow speeds indicates hesitation; promotion requires quick recall.
- **Confusable Discrimination**: Making an error on visually similar characters (e.g. `シ` vs `ツ`) triggers immediate review of the confusable partner.
- **Anti-Repetition Cooldown**: Prevents back-to-back repetitions of the same character.

---

## 2. Engine Logic (`src/lib/engine/`)

### 2.1 Micro-Leitner Scoring (`scoring.js`)
Every kana item has an associated Leitner box ($1$ to $5$):

- **Correct & Fast ($< 2.0\text{s}$)**: Advances $+1$ box (capped at Box 5).
- **Correct & Moderate ($2.0\text{s} - 4.0\text{s}$)**: Card remains in current box (reinforced).
- **Correct & Hesitant ($> 4.0\text{s}$)**: Drops $-1$ box (speed needs improvement).
- **Incorrect**: Immediately resets to **Box 1**, records the mistake, and logs the confusion pairing if an accepted romanization of another kana was typed.

### 2.2 Weighted Random Selection (`weightedRandom.js`)
When drawing the next card from the active deck:
1. **Cooldown Queue**: A rolling window of the last $N$ seen characters ($N = \min(5, \text{deckSize} - 1)$) are excluded from immediate selection.
2. **Box Weights**: Cards in Box 1 have a high selection weight ($10\times$), decaying down to Box 5 ($1\times$):
   $$\text{Weight}(\text{box}) = \max(1, 12 - 2 \times \text{box})$$
3. **Confusable Partner Priority**: When a card has confusable partners that have errors logged, the partner card's probability is multiplied by $2.5\times$.

### 2.3 Stage Progression (`progression.js`)
Guided Mode stages unlock automatically when all characters in the current stage meet strict mastery criteria:
- Seen count $\ge 3$
- Consecutive correct $\ge 3$
- Average response time $< 4.0\text{s}$

### 2.4 Session Analytics (`session.js`)
Calculates real-time session metrics:
- Overall accuracy percentage
- Current streak and best streak
- Characters per minute (CPM)
- Top weakest characters (cards with lowest accuracy / most mistakes)

---

## 3. State Management (`src/lib/stores/`)

- **`practice.js`**: Orchestrates active session state, current card, input value, inline error correction, timer, and card key transitions.
- **`stats.js`**: Persists per-character history, Leitner boxes, mistakes, and session summaries to `localStorage`.
- **`settings.js`**: Persists user preferences (Guided vs Free mode, sound effects toggle, TTS pronunciation toggle, Kana font style, active stages).

---

## 4. UI Architecture & Styling

- **Framework**: Svelte 5 with runes / reactive stores.
- **Component Hierarchy**:
  - `App.svelte`: Main layout and router (Practice, Stages, Stats, Settings).
  - `KanaDisplay.svelte`: Card surface showing character and group/script badge.
  - `InputField.svelte`: Controlled input with zero-latency validation and inline red correction (`ソ = so`).
  - `SessionBar.svelte`: Flat footer showing accuracy, streak, CPM, and weakest kana tags.
  - `Heatmap.svelte`: Solid-color matrix showing accuracy and review frequency.
  - `Icon.svelte`: Custom SVG vector icons (no external font or emoji dependencies).
- **Design Tokens**: Solid flat color palette (`app.css`) using slate, zinc, and crimson accents with zero gradients.
