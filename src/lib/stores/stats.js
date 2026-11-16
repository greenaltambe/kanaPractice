import { writable, get } from 'svelte/store';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage.js';

function createStatsStore() {
  // Mapping of kana string -> { box, totalSeen, totalCorrect, totalWrong, avgResponseTime, confusionMap, lastPracticed }
  const initial = loadFromStorage(STORAGE_KEYS.STATS, {});
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    set: (val) => {
      saveToStorage(STORAGE_KEYS.STATS, val);
      set(val);
    },
    saveCardStats: (kana, card) => {
      update((current) => {
        const next = {
          ...current,
          [kana]: {
            box: card.box || 1,
            totalSeen: card.totalSeen || 0,
            totalCorrect: card.totalCorrect || 0,
            totalWrong: card.totalWrong || 0,
            avgResponseTime: card.avgResponseTime || 0,
            confusionMap: { ...(card.confusionMap || {}) },
            lastPracticed: card.lastPracticed || Date.now(),
          },
        };
        saveToStorage(STORAGE_KEYS.STATS, next);
        return next;
      });
    },
    saveBulkStats: (cards) => {
      update((current) => {
        const next = { ...current };
        for (const card of cards) {
          next[card.kana] = {
            box: card.box || 1,
            totalSeen: card.totalSeen || 0,
            totalCorrect: card.totalCorrect || 0,
            totalWrong: card.totalWrong || 0,
            avgResponseTime: card.avgResponseTime || 0,
            confusionMap: { ...(card.confusionMap || {}) },
            lastPracticed: card.lastPracticed || Date.now(),
          };
        }
        saveToStorage(STORAGE_KEYS.STATS, next);
        return next;
      });
    },
    resetStats: () => {
      saveToStorage(STORAGE_KEYS.STATS, {});
      set({});
    },
  };
}

export const statsStore = createStatsStore();
