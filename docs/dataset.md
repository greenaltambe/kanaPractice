# Kana Dataset Specification

This document details the complete 250-character dataset, acceptable romanization variants, and confusable character clusters.

---

## 1. Character Inventory

The dataset contains **250 total characters**:
- **Hiragana**: 107 characters
  - 46 Gojūon (base sounds)
  - 20 Dakuten (voiced)
  - 5 Handakuten (plosive)
  - 36 Yōon (digraphs/contracted sounds, including `dya`, `dyu`, `dyo`)
- **Katakana**: 143 characters
  - 46 Gojūon
  - 20 Dakuten
  - 5 Handakuten
  - 36 Yōon (including `ヂャ`, `ヂュ`, `ヂョ`)
  - 36 Extended Katakana (foreign loan syllables: `va`, `ti`, `fa`, `wi`, `di`, `she`, `che`, `je`, `tsa`, etc.)

---

## 2. Romanization & Input Permissiveness

Japanese romanization systems (Hepburn, Nihon-shiki, Kunrei-shiki) often map the same sound to different Latin spellings. To provide a friction-free experience, the input engine accepts all common variations:

| Sound / Kana | Accepted Inputs |
| :--- | :--- |
| **し / シ** | `shi`, `si` |
| **ち / チ** | `chi`, `ti` |
| **つ / ツ** | `tsu`, `tu` |
| **ふ / フ** | `fu`, `hu` |
| **じ / ジ** | `ji`, `zi` |
| **ぢ / ヂ** | `ji`, `di`, `dzi` |
| **づ / ヅ** | `zu`, `du`, `dzu` |
| **しゃ / シャ** | `sha`, `sya` |
| **ちゃ / チャ** | `cha`, `tya`, `cya` |
| **じゃ / ジャ** | `ja`, `jya`, `zya` |
| **を / ヲ** | `wo`, `o` |

---

## 3. Visual Confusable Pairs (`src/lib/data/confusables.js`)

Certain Japanese characters are notoriously confusable for learners. The app specifically detects when a user mistakes one for another and boosts the practice frequency of the partner:

### Katakana Visual Clusters
- **`シ` (shi) vs `ツ` (tsu)**: Stroke angle and stroke origin difference.
- **`ソ` (so) vs `ン` (n)**: Single upward stroke vs single downward stroke.
- **`シ` (shi) vs `ソ` (so)** and **`ツ` (tsu) vs `ン` (n)**: Multi-stroke vs single-stroke confusion.
- **`ワ` (wa) vs `ウ` (u) vs `フ` (fu)**: Top tick mark differences.
- **`ヌ` (nu) vs `ス` (su)**: Loop/tail differences.
- **`ク` (ku) vs `タ` (ta) vs `ケ` (ke)**: Cross-stroke differences.
- **`チ` (chi) vs `テ` (te)**: Top bar angle.
- **`マ` (ma) vs `ア` (a) vs `ム` (mu)**: Geometric similarity.

### Hiragana Visual Clusters
- **`は` (ha) vs `ほ` (ho) vs `ま` (ma)**: Top loop/horizontal bar differences.
- **`わ` (wa) vs `れ` (re) vs `ね` (ne)**: Right vertical stroke termination (round vs outward vs curled).
- **`ぬ` (nu) vs `め` (me)**: End curl loop difference.
- **`る` (ru) vs `ろ` (ro)**: Bottom curl loop difference.
- **`さ` (sa) vs `ち` (chi)**: Mirror symmetry.
- **`き` (ki) vs `さ` (sa)**: Double horizontal bar vs single horizontal bar.
