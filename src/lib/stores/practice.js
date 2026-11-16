import { writable, get } from 'svelte/store';
import { getCumulativeKanaForStage, getKanaByGroups, getConfusablePartners } from '../data/index.js';
import { stages } from '../data/stages.js';
import { getInitialCard, mergeWithHistory, updateOnCorrect, updateOnWrong } from '../engine/scoring.js';
import { selectNextCard, tickCooldowns } from '../engine/weightedRandom.js';
import { checkStageUnlock, addStageCards } from '../engine/progression.js';
import { Session } from '../engine/session.js';
import { statsStore } from './stats.js';
import { settings } from './settings.js';

const initialState = {
  isActive: false,
  mode: 'guided',
  cards: [],
  currentCard: null,
  lastShownKana: [],
  // Current card typing state
  currentCorrection: null,    // e.g. "ソ = so" when an error has occurred
  cardHadMistake: false,      // whether this card had a mistake before being answered
  currentStageId: 1,
  stageProgress: 0,
  stageJustUnlocked: false,
  sessionStats: null,
  cardShownAt: 0,
  forcedPartner: null,
  cardKey: 0,                 // Monotonically increasing key to reset input on each card
};

function createPracticeStore() {
  const { subscribe, set, update } = writable(initialState);
  let session = new Session();

  return {
    subscribe,

    /**
     * Start a new practice session
     */
    startPractice: (mode = 'guided', selectedGroups = []) => {
      session = new Session();
      const currentSettings = get(settings);
      const historyStats = get(statsStore);

      let initialChars = [];
      let stageId = currentSettings.currentStageId || 1;

      if (mode === 'guided') {
        initialChars = getCumulativeKanaForStage(stageId);
      } else {
        const groupsToLoad = selectedGroups.length > 0 ? selectedGroups : currentSettings.selectedGroups;
        initialChars = getKanaByGroups(groupsToLoad);
      }

      if (initialChars.length === 0) {
        initialChars = getCumulativeKanaForStage(1);
        stageId = 1;
      }

      const cards = initialChars.map(k => {
        const fresh = getInitialCard(k);
        return mergeWithHistory(fresh, historyStats[k.kana]);
      });

      const firstCard = selectNextCard(cards, []);
      const unlockStatus = mode === 'guided' ? checkStageUnlock(cards, stageId) : { progress: 0 };

      set({
        isActive: true,
        mode,
        cards,
        currentCard: firstCard,
        lastShownKana: firstCard ? [firstCard.kana] : [],
        currentCorrection: null,
        cardHadMistake: false,
        currentStageId: stageId,
        stageProgress: unlockStatus.progress,
        stageJustUnlocked: false,
        sessionStats: session.getStats(),
        cardShownAt: Date.now(),
        forcedPartner: null,
        cardKey: 1,
      });
    },

    /**
     * Rapid keystroke validation on every typed character.
     * @param {string} rawInput - What is currently in the text box
     * @returns {{ status: 'correct'|'typing'|'wrong', correction?: string }}
     */
    checkInput: (rawInput) => {
      const state = get(practiceStore);
      if (!state.isActive || !state.currentCard) {
        return { status: 'typing' };
      }

      const card = state.currentCard;
      const clean = (rawInput || '').toLowerCase().trim();
      if (!clean) {
        return { status: 'typing' };
      }

      const accepted = card.romaji.map(r => r.toLowerCase());

      // 1. EXACT MATCH: User finished typing the correct romaji (or ends with it if recovering from error)
      const isExactMatch = accepted.includes(clean);
      const isRecoveredMatch = state.cardHadMistake && accepted.some(r => clean.endsWith(r));

      if (isExactMatch || isRecoveredMatch) {
        const responseTimeMs = Math.max(100, Date.now() - state.cardShownAt);

        let updatedCard;
        if (!state.cardHadMistake) {
          // Clean correct on first attempt!
          session.recordAnswer(card.kana, true, responseTimeMs);
          updatedCard = updateOnCorrect(card, responseTimeMs);
        } else {
          // Recovered after error
          session.recordAnswer(card.kana, false, responseTimeMs);
          updatedCard = { ...card, lastPracticed: Date.now() };
        }

        // Save card stats
        statsStore.saveCardStats(card.kana, updatedCard);

        let updatedCards = state.cards.map(c => c.kana === card.kana ? updatedCard : c);
        updatedCards = tickCooldowns(updatedCards);

        // Check guided mode progression
        let newStageId = state.currentStageId;
        let stageJustUnlocked = false;
        let stageProgress = state.stageProgress;

        if (state.mode === 'guided') {
          const unlockCheck = checkStageUnlock(updatedCards, state.currentStageId);
          stageProgress = unlockCheck.progress;

          if (unlockCheck.unlocked && unlockCheck.nextStageId) {
            newStageId = unlockCheck.nextStageId;
            stageJustUnlocked = true;
            const historyStats = get(statsStore);
            updatedCards = addStageCards(updatedCards, newStageId, historyStats);
            settings.update(s => ({ ...s, currentStageId: newStageId }));
          }
        }

        // Pick next card immediately
        const nextCard = selectNextCard(updatedCards, state.lastShownKana, state.forcedPartner);
        const lastShown = [...state.lastShownKana, nextCard ? nextCard.kana : ''].filter(Boolean).slice(-3);

        update(s => ({
          ...s,
          cards: updatedCards,
          currentCard: nextCard,
          lastShownKana: lastShown,
          currentCorrection: null,
          cardHadMistake: false,
          currentStageId: newStageId,
          stageProgress,
          stageJustUnlocked,
          sessionStats: session.getStats(),
          cardShownAt: Date.now(),
          forcedPartner: null,
          cardKey: (s.cardKey || 0) + 1,
        }));

        return { status: 'correct', kana: card.kana };
      }

      // 2. VALID PREFIX: User is midway through typing (e.g. 's' for 'shi')
      if (accepted.some(r => r.startsWith(clean))) {
        return { status: 'typing' };
      }

      // 3. MISMATCH: User typed the wrong letter!
      const correction = `${card.kana} = ${card.romaji[0]}`;

      if (!state.cardHadMistake) {
        // First mistake on this card
        const updatedCard = updateOnWrong(card, clean);
        statsStore.saveCardStats(card.kana, updatedCard);

        let nextForcedPartner = null;
        const partners = getConfusablePartners(card.kana);
        if (partners.length > 0) {
          const activePartner = state.cards.find(c => 
            partners.includes(c.kana) && c.romaji.some(r => r.toLowerCase() === clean)
          );
          if (activePartner) {
            nextForcedPartner = activePartner.kana;
          }
        }

        const updatedCards = state.cards.map(c => c.kana === card.kana ? updatedCard : c);

        update(s => ({
          ...s,
          cards: updatedCards,
          currentCorrection: correction,
          cardHadMistake: true,
          sessionStats: session.getStats(),
          forcedPartner: nextForcedPartner,
        }));
      } else {
        update(s => ({
          ...s,
          currentCorrection: correction,
        }));
      }

      return { status: 'wrong', correction };
    },

    /**
     * Force skip to next card (e.g. when user hits Enter on a missed card)
     */
    skipCard: () => {
      const state = get(practiceStore);
      if (!state.isActive || !state.currentCard) return;

      const card = state.currentCard;
      if (!state.cardHadMistake) {
        session.recordAnswer(card.kana, false, 3000);
        const updatedCard = updateOnWrong(card, '(skipped)');
        statsStore.saveCardStats(card.kana, updatedCard);
      }

      const nextCard = selectNextCard(state.cards, state.lastShownKana, state.forcedPartner);
      const lastShown = [...state.lastShownKana, nextCard ? nextCard.kana : ''].filter(Boolean).slice(-3);

      update(s => ({
        ...s,
        currentCard: nextCard,
        lastShownKana: lastShown,
        currentCorrection: null,
        cardHadMistake: false,
        sessionStats: session.getStats(),
        cardShownAt: Date.now(),
        forcedPartner: null,
        cardKey: (s.cardKey || 0) + 1,
      }));
    },

    /**
     * Stop active practice session
     */
    stopPractice: () => {
      const state = get(practiceStore);
      if (state.cards.length > 0) {
        statsStore.saveBulkStats(state.cards);
      }
      set({
        ...initialState,
        sessionStats: session.getStats(),
      });
    },
  };
}

export const practiceStore = createPracticeStore();
