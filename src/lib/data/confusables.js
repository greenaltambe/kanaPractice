export const confusableGroups = [
  // Katakana confusables (the classic ones)
  ['シ', 'ツ', 'ソ', 'ン'],
  ['ワ', 'ウ', 'フ'],
  ['ヌ', 'ス'],
  ['ク', 'タ', 'ケ'],
  ['コ', 'ユ'],
  ['ナ', 'メ'],
  ['ア', 'ヤ', 'マ'],
  ['テ', 'ラ'],
  ['チ', 'テ'],

  // Hiragana confusables
  ['は', 'ほ', 'ま'],
  ['わ', 'れ', 'ね'],
  ['ぬ', 'め'],
  ['る', 'ろ'],
  ['き', 'さ'],
  ['い', 'り'],
  ['あ', 'お'],
  ['ち', 'ら'],

  // Katakana extended confusables
  ['シェ', 'チェ', 'ジェ'],
  ['ティ', 'ディ'],
  ['トゥ', 'ドゥ'],
  ['ツァ', 'ファ'],
];

// Map each kana to its confusable partners for O(1) lookup
const confusableMap = new Map();

for (const group of confusableGroups) {
  for (const kana of group) {
    if (!confusableMap.has(kana)) {
      confusableMap.set(kana, new Set());
    }
    for (const partner of group) {
      if (partner !== kana) {
        confusableMap.get(kana).add(partner);
      }
    }
  }
}

/**
 * Returns array of characters that are visually confusable with the given kana.
 * @param {string} kana
 * @returns {string[]}
 */
export function getConfusablePartners(kana) {
  const set = confusableMap.get(kana);
  return set ? Array.from(set) : [];
}

/**
 * Check if two characters belong to the same confusable group
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
export function areConfusable(a, b) {
  const set = confusableMap.get(a);
  return set ? set.has(b) : false;
}
