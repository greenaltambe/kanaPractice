# Kana Practice

A fast, zero-click, keyboard-only Japanese Kana drill app inspired by the DJT Guide kana drill, designed to build instant visual-to-phonetic muscle memory.

---

## Features

- **Full 250-Kana Inventory**: Complete Hiragana, Katakana, Dakuten, Handakuten, Yōon, and extended foreign Katakana (`vi`, `ti`, `fa`, `wi`, `di`, `she`, `che`, `je`, etc.).
- **Zero-Click Keyboard Flow**: Keystrokes are validated instantly as you type with zero advance latency—no `Enter` key required.
- **Micro-Leitner Dynamic Spaced Repetition**: In-session 5-box Leitner engine that adapts in real time to your speed and accuracy.
- **Confusable Pair Detection**: Mistakes on visually similar characters (e.g. `シ` vs `ツ`, `ソ` vs `ン`, `わ` vs `れ`) immediately schedule the counterpart card for reinforcement.
- **46 Bite-Sized Stages**: Carefully paced 3–6 character stages across both Hiragana and Katakana to eliminate cognitive overload.
- **Speech & Audio**: Browser Web Speech API native Japanese pronunciation (`ja-JP`) and Web Audio sound feedback.
- **Clean Flat Design**: Minimalist solid-color UI (no gradients), custom vector SVG icons, and light/dark theme support.
- **Analytics & Heatmap**: Live CPM speed, streak counters, error confusion matrix, and accuracy heatmap with JSON backup and restore.

---

## Keyboard Controls

| Key | Action |
| :--- | :--- |
| `Space` | Start practice / Resume |
| `Esc` | Pause practice / Close modal |
| `a-z` | Type romaji (advances automatically on correct match) |
| `Backspace` | Clear input or correction |

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v9+)

### Installation & Development

```bash
# Clone the repository
git clone <repository-url>
cd kanaPractice

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open `http://localhost:5173` in your browser.

### Testing & Production Build

```bash
# Run unit tests
pnpm test

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

---

## Documentation

Detailed architectural and curriculum references are available in [`docs/`](file:///home/greenaltambe/Projects/kanaPractice/docs/):

- [Architecture & Engine Overview](file:///home/greenaltambe/Projects/kanaPractice/docs/architecture.md): Micro-Leitner engine, scoring, weighted random selection, and store state machine.
- [Curriculum & Stages](file:///home/greenaltambe/Projects/kanaPractice/docs/curriculum.md): Full 46-stage breakdown and unlock criteria.
- [Dataset Specification](file:///home/greenaltambe/Projects/kanaPractice/docs/dataset.md): 250 kana items, accepted romanization spellings, and confusable groupings.
- [Roadmap & TODO](file:///home/greenaltambe/Projects/kanaPractice/TODO.md): Planned future enhancements (stroke order animations, timeline charts, custom decks).
