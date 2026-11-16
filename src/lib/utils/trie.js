class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.word = null;
    this.prefixCount = 0; // Number of words that pass through or end at this node
  }
}

export class RomajiTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    if (!word) return;
    const normalized = word.toLowerCase().trim();
    let current = this.root;
    current.prefixCount++;

    for (const char of normalized) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
      current.prefixCount++;
    }

    current.isEndOfWord = true;
    current.word = normalized;
  }

  /**
   * Rebuild the trie from a list of kana card objects (each with .romaji array)
   * @param {Array<{romaji: string[]}>} kanaList
   */
  buildFromKana(kanaList) {
    this.root = new TrieNode();
    for (const item of kanaList) {
      if (item && Array.isArray(item.romaji)) {
        for (const r of item.romaji) {
          this.insert(r);
        }
      }
    }
  }

  /**
   * Inspect a typed prefix
   * @param {string} prefix
   * @returns {{ isExactMatch: boolean, exactWord: string|null, possibleCompletions: number }}
   */
  lookup(prefix) {
    if (!prefix) {
      return { isExactMatch: false, exactWord: null, possibleCompletions: this.root.prefixCount };
    }

    const normalized = prefix.toLowerCase().trim();
    let current = this.root;

    for (const char of normalized) {
      if (!current.children.has(char)) {
        // No words in the trie start with this prefix -> definitely incorrect / no completions
        return { isExactMatch: false, exactWord: null, possibleCompletions: 0 };
      }
      current = current.children.get(char);
    }

    // Is it an exact word, and are there NO longer words that could match?
    // If current.isEndOfWord is true and current.children.size === 0 (or prefixCount === 1 and it's end of word),
    // then this prefix unambiguously points to this single answer!
    const isUnambiguousExact = current.isEndOfWord && current.children.size === 0;

    return {
      isExactMatch: isUnambiguousExact,
      exactWord: current.isEndOfWord ? current.word : null,
      possibleCompletions: current.prefixCount,
    };
  }
}
