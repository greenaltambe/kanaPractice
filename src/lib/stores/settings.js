import { writable } from 'svelte/store';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage.js';
import { applyTheme } from '../utils/theme.js';

const DEFAULT_SETTINGS = {
  mode: 'guided',                      // 'guided' or 'free'
  selectedGroups: ['hiragana-gojuon'], // Default for free mode
  theme: 'auto',                       // 'auto', 'light', 'dark'
  currentStageId: 1,                   // Saved stage for guided mode
  fontVariation: true,                 // Random font variation in practice
  soundEffects: true,                  // Pleasant correct/wrong audio tones
  pronounceKana: false,                // Pronounce kana using Japanese voice
};

function createSettingsStore() {
  const initial = loadFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const { subscribe, set, update } = writable(initial);

  // Apply theme on initial load
  if (typeof window !== 'undefined') {
    applyTheme(initial.theme || 'auto');
  }

  return {
    subscribe,
    set: (val) => {
      saveToStorage(STORAGE_KEYS.SETTINGS, val);
      if (val.theme) applyTheme(val.theme);
      set(val);
    },
    update: (fn) => {
      update((current) => {
        const next = fn(current);
        saveToStorage(STORAGE_KEYS.SETTINGS, next);
        if (next.theme) applyTheme(next.theme);
        return next;
      });
    },
    reset: () => {
      saveToStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      applyTheme(DEFAULT_SETTINGS.theme);
      set(DEFAULT_SETTINGS);
    },
  };
}

export const settings = createSettingsStore();
