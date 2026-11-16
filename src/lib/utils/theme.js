/**
 * System color scheme query
 */
const darkMedia = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-color-scheme: dark)') 
  : null;

export function getSystemTheme() {
  return darkMedia && darkMedia.matches ? 'dark' : 'light';
}

/**
 * Apply theme to document element
 * @param {'auto'|'light'|'dark'} theme
 */
export function applyTheme(theme) {
  if (typeof document === 'undefined') return;

  const resolved = theme === 'auto' ? getSystemTheme() : theme;
  document.documentElement.setAttribute('data-theme', resolved);
}

/**
 * Cycle through theme modes: auto -> light -> dark -> auto
 * @param {'auto'|'light'|'dark'} current
 * @returns {'auto'|'light'|'dark'}
 */
export function getNextTheme(current) {
  if (current === 'auto') return 'light';
  if (current === 'light') return 'dark';
  return 'auto';
}

/**
 * Listen for OS color scheme preference changes
 * @param {Function} callback
 * @returns {Function} cleanup function
 */
export function watchSystemTheme(callback) {
  if (!darkMedia) return () => {};

  const listener = (e) => {
    callback(e.matches ? 'dark' : 'light');
  };

  darkMedia.addEventListener('change', listener);
  return () => darkMedia.removeEventListener('change', listener);
}
