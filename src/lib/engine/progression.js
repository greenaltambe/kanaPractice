import { stages } from '../data/stages.js';
import { getKanaForStage } from '../data/index.js';
import { getInitialCard } from './scoring.js';

/**
 * Check if the active cards corresponding to the current stage have fulfilled unlock criteria.
 * @param {Array} cards - All active cards in the practice pool
 * @param {number} currentStageId
 * @returns {{ unlocked: boolean, nextStageId: number|null, progress: number, details: Array }}
 */
export function checkStageUnlock(cards, currentStageId) {
  const currentStage = stages.find(s => s.id === currentStageId);
  if (!currentStage) {
    return { unlocked: false, nextStageId: null, progress: 1, details: [] };
  }

  // Next stage exists?
  const nextStage = stages.find(s => s.id === currentStageId + 1);
  if (!nextStage) {
    // Already on the final stage
    return { unlocked: false, nextStageId: null, progress: 1, details: [] };
  }

  // Get the kana that belong specifically to this current stage
  const stageKanaObjs = getKanaForStage(currentStageId);
  const stageKanaChars = new Set(stageKanaObjs.map(k => k.kana));

  const relevantCards = cards.filter(c => stageKanaChars.has(c.kana));
  if (relevantCards.length === 0) {
    return { unlocked: false, nextStageId: nextStage.id, progress: 0, details: [] };
  }

  const { minSeen, consecutiveCorrect, maxAvgTime } = currentStage.unlockCriteria;

  let masteredCount = 0;
  const details = [];

  for (const card of relevantCards) {
    const seenOk = (card.totalSeen || 0) >= minSeen;
    const streakOk = (card.consecutiveCorrect || 0) >= consecutiveCorrect;
    const timeOk = (card.avgResponseTime || 0) <= maxAvgTime || (card.totalCorrect || 0) >= 5;

    const isMastered = seenOk && streakOk && timeOk;
    if (isMastered) masteredCount++;

    details.push({
      kana: card.kana,
      seen: card.totalSeen || 0,
      minSeen,
      streak: card.consecutiveCorrect || 0,
      minStreak: consecutiveCorrect,
      avgTime: card.avgResponseTime || 0,
      isMastered,
    });
  }

  const progress = masteredCount / relevantCards.length;
  const unlocked = progress >= 1;

  return {
    unlocked,
    nextStageId: unlocked ? nextStage.id : null,
    progress,
    details,
  };
}

/**
 * Unlock next stage: returns new array of cards with next stage cards added
 * @param {Array} currentCards
 * @param {number} nextStageId
 * @param {object} historyStats - Persistent historical stats mapping kana to stats
 * @returns {Array} Updated cards array
 */
export function addStageCards(currentCards, nextStageId, historyStats = {}) {
  const nextChars = getKanaForStage(nextStageId);
  const existingKana = new Set(currentCards.map(c => c.kana));

  const newCards = nextChars
    .filter(k => !existingKana.has(k.kana))
    .map(k => {
      const card = getInitialCard(k);
      const hist = historyStats[k.kana];
      if (hist) {
        card.totalSeen = hist.totalSeen || 0;
        card.totalCorrect = hist.totalCorrect || 0;
        card.totalWrong = hist.totalWrong || 0;
        card.avgResponseTime = hist.avgResponseTime || 0;
        card.confusionMap = { ...(hist.confusionMap || {}) };
      }
      return card;
    });

  return [...currentCards, ...newCards];
}
