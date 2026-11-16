const BOX_MULTIPLIERS = {
  1: 3.0,
  2: 2.0,
  3: 1.0,
  4: 0.5,
  5: 0.2,
};

/**
 * Decrement cooldowns for all cards in place or return updated copies
 */
export function tickCooldowns(cards) {
  return cards.map(c => ({
    ...c,
    cooldown: Math.max(0, (c.cooldown || 0) - 1),
  }));
}

/**
 * Select the next card to practice using adaptive weighted random selection
 * with micro-Leitner box weighting and anti-repeat cooldowns.
 *
 * @param {Array} cards - All active practice cards
 * @param {string[]} lastShownKana - Array of last 2-3 shown kana
 * @param {string|null} forcedKana - Optional kana to force next (e.g. confusable drill partner)
 * @returns {object} Selected card
 */
export function selectNextCard(cards, lastShownKana = [], forcedKana = null) {
  if (!cards || cards.length === 0) return null;
  if (cards.length === 1) return cards[0];

  // 1. If a specific kana is forced (from confusable pair drill), prioritize it
  if (forcedKana) {
    const forcedCard = cards.find(c => c.kana === forcedKana);
    if (forcedCard) return forcedCard;
  }

  const lastShownSet = new Set(lastShownKana);

  // 2. Filter candidates: cooldown == 0 and not in lastShown
  let candidates = cards.filter(c => (c.cooldown || 0) === 0 && !lastShownSet.has(c.kana));

  // If pool is small and filtering left no candidates:
  if (candidates.length === 0) {
    // Relax lastShown filter, only require not being the immediately previous one
    const immediateLast = lastShownKana[lastShownKana.length - 1];
    candidates = cards.filter(c => c.kana !== immediateLast);
  }

  // If still empty (e.g. pool has 1-2 cards):
  if (candidates.length === 0) {
    candidates = [...cards];
  }

  // 3. Compute effective weights using box multipliers
  let totalWeight = 0;
  const weightedList = candidates.map(card => {
    const box = card.box || 1;
    const boxMultiplier = BOX_MULTIPLIERS[box] ?? 1.0;
    const effectiveWeight = Math.max(0.1, (card.weight || 1) * boxMultiplier);
    totalWeight += effectiveWeight;
    return { card, effectiveWeight };
  });

  // 4. Weighted random roll
  let roll = Math.random() * totalWeight;
  for (const item of weightedList) {
    if (roll < item.effectiveWeight) {
      return item.card;
    }
    roll -= item.effectiveWeight;
  }

  // Fallback to first candidate
  return weightedList[0].card;
}
