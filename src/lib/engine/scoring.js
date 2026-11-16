/**
 * Create a fresh card object from a kana data definition
 */
export function getInitialCard(kanaObj) {
  return {
    ...kanaObj,
    box: 1,                    // Micro-Leitner box (1 to 5)
    weight: 5,                 // Selection weight
    cooldown: 0,               // Number of selections before eligible again
    consecutiveCorrect: 0,
    consecutiveWrong: 0,
    totalSeen: 0,
    totalCorrect: 0,
    totalWrong: 0,
    avgResponseTime: 0,
    confusionMap: {},          // { [wrongAnswer]: count }
    lastPracticed: null,
  };
}

/**
 * Merge persistent historical stats into a fresh card
 */
export function mergeWithHistory(card, history) {
  if (!history) return card;

  // Known cards start at min(history.box, 3) so they don't jump straight to mastered,
  // but don't force veteran users to start completely at box 1.
  const startingBox = Math.max(1, Math.min(history.box || 1, 3));

  // If historically weak (<70% accuracy), boost starting weight
  const histAccuracy = history.totalSeen > 0 ? (history.totalCorrect / history.totalSeen) : 1;
  let startingWeight = 5;
  if (histAccuracy < 0.6) {
    startingWeight = 9;
  } else if (histAccuracy < 0.8) {
    startingWeight = 7;
  } else if (histAccuracy > 0.95 && history.totalSeen >= 5) {
    startingWeight = 3;
  }

  return {
    ...card,
    box: startingBox,
    weight: startingWeight,
    totalSeen: history.totalSeen || 0,
    totalCorrect: history.totalCorrect || 0,
    totalWrong: history.totalWrong || 0,
    avgResponseTime: history.avgResponseTime || 0,
    confusionMap: { ...(history.confusionMap || {}) },
    lastPracticed: history.lastPracticed || null,
  };
}

/**
 * Update card after a correct answer
 */
export function updateOnCorrect(card, responseTimeMs) {
  const updated = { ...card };
  updated.totalSeen = (updated.totalSeen || 0) + 1;
  updated.totalCorrect = (updated.totalCorrect || 0) + 1;
  updated.consecutiveCorrect = (updated.consecutiveCorrect || 0) + 1;
  updated.consecutiveWrong = 0;
  updated.lastPracticed = Date.now();

  // Running average response time
  const prevAvg = updated.avgResponseTime || responseTimeMs;
  updated.avgResponseTime = Math.round((prevAvg * (updated.totalCorrect - 1) + responseTimeMs) / updated.totalCorrect);

  if (responseTimeMs < 2000) {
    // Fast & confident
    updated.weight = Math.max(1, updated.weight * 0.6);
    updated.box = Math.min(5, updated.box + 1);
    updated.cooldown = updated.box * 3;
  } else if (responseTimeMs <= 4000) {
    // Normal pace
    updated.weight = Math.max(1, updated.weight * 0.75);
    updated.box = Math.min(5, updated.box + 1);
    updated.cooldown = updated.box * 2;
  } else {
    // Slow (> 4s) -> hesitant, keep in current box
    updated.weight = Math.max(1, updated.weight * 0.9);
    updated.cooldown = 2;
  }

  return updated;
}

/**
 * Update card after an incorrect answer
 */
export function updateOnWrong(card, userAnswer) {
  const updated = { ...card };
  updated.totalSeen = (updated.totalSeen || 0) + 1;
  updated.totalWrong = (updated.totalWrong || 0) + 1;
  updated.consecutiveCorrect = 0;
  updated.consecutiveWrong = (updated.consecutiveWrong || 0) + 1;
  updated.lastPracticed = Date.now();

  // Demote to box 1 immediately
  updated.box = 1;

  // Aggressive weight boost to drill this weakness
  updated.weight = updated.weight * 2.5 + 3;
  if (updated.consecutiveWrong >= 2) {
    updated.weight += 5; // Stack penalty for repeat mistakes
  }

  // Very short cooldown so it resurfaces soon
  updated.cooldown = 1;

  // Record confusion pattern
  const cleanAns = (userAnswer || '(empty)').toLowerCase().trim();
  const confMap = { ...(updated.confusionMap || {}) };
  confMap[cleanAns] = (confMap[cleanAns] || 0) + 1;
  updated.confusionMap = confMap;

  return updated;
}
