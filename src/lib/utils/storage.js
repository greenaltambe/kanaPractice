export const STORAGE_KEYS = {
  SETTINGS: 'kana_practice_settings',
  STATS: 'kana_practice_stats',
  SESSION_HISTORY: 'kana_practice_sessions',
};

export function loadFromStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to load from localStorage [${key}]:`, err);
    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save to localStorage [${key}]:`, err);
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Failed to remove from localStorage [${key}]:`, err);
  }
}

/**
 * Export all app data as a downloadable JSON string
 */
export function exportAllData() {
  const exportPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    settings: loadFromStorage(STORAGE_KEYS.SETTINGS, null),
    stats: loadFromStorage(STORAGE_KEYS.STATS, null),
    sessionHistory: loadFromStorage(STORAGE_KEYS.SESSION_HISTORY, []),
  };
  return JSON.stringify(exportPayload, null, 2);
}

/**
 * Import previously exported data
 */
export function importAllData(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON format');
    }

    if (parsed.settings) {
      saveToStorage(STORAGE_KEYS.SETTINGS, parsed.settings);
    }
    if (parsed.stats) {
      saveToStorage(STORAGE_KEYS.STATS, parsed.stats);
    }
    if (parsed.sessionHistory) {
      saveToStorage(STORAGE_KEYS.SESSION_HISTORY, parsed.sessionHistory);
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Clear all progress
 */
export function clearAllData() {
  Object.values(STORAGE_KEYS).forEach(k => removeFromStorage(k));
}
