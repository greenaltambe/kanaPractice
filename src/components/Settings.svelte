<script>
  import { exportAllData, importAllData, clearAllData } from '../lib/utils/storage.js';
  import Icon from '../lib/components/Icon.svelte';

  let { currentSettings = {}, onUpdateSettings, onClose } = $props();

  let importMsg = $state('');

  function handleThemeChange(t) {
    onUpdateSettings?.({ ...currentSettings, theme: t });
  }

  function handleFontToggle(e) {
    onUpdateSettings?.({ ...currentSettings, fontVariation: e.target.checked });
  }

  function handleSoundEffectsToggle(e) {
    onUpdateSettings?.({ ...currentSettings, soundEffects: e.target.checked });
  }

  function handlePronounceToggle(e) {
    onUpdateSettings?.({ ...currentSettings, pronounceKana: e.target.checked });
  }

  function handleExport() {
    const json = exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kana-practice-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = importAllData(event.target.result);
      if (result.success) {
        importMsg = 'Data imported successfully. Reloading...';
        setTimeout(() => window.location.reload(), 800);
      } else {
        importMsg = `Import failed: ${result.error}`;
      }
    };
    reader.readAsText(file);
  }

  function handleResetAll() {
    if (confirm('Reset all practice history and progress? This cannot be undone.')) {
      clearAllData();
      window.location.reload();
    }
  }
</script>

<div class="settings-modal fade-in">
  <div class="modal-card">
    <div class="modal-header">
      <h3>Settings</h3>
      <button class="close-btn" onclick={onClose} aria-label="Close settings">
        <Icon name="x" size={16} />
      </button>
    </div>

    <!-- Theme -->
    <div class="settings-section">
      <span class="section-title">Theme</span>
      <div class="theme-options">
        <button 
          class="theme-btn" 
          class:active={currentSettings.theme === 'auto'}
          onclick={() => handleThemeChange('auto')}
        >
          <Icon name="monitor" size={14} />
          <span>System</span>
        </button>
        <button 
          class="theme-btn" 
          class:active={currentSettings.theme === 'light'}
          onclick={() => handleThemeChange('light')}
        >
          <Icon name="sun" size={14} />
          <span>Light</span>
        </button>
        <button 
          class="theme-btn" 
          class:active={currentSettings.theme === 'dark'}
          onclick={() => handleThemeChange('dark')}
        >
          <Icon name="moon" size={14} />
          <span>Dark</span>
        </button>
      </div>
    </div>

    <!-- Audio -->
    <div class="settings-section">
      <span class="section-title">Audio</span>
      <label class="toggle-row">
        <input 
          type="checkbox" 
          checked={currentSettings.soundEffects ?? true}
          onchange={handleSoundEffectsToggle}
        />
        <div class="toggle-text">
          <span class="toggle-name">Sound Effects</span>
          <span class="toggle-desc">Chimes on correct answers and soft audio on mistakes</span>
        </div>
      </label>

      <label class="toggle-row">
        <input 
          type="checkbox" 
          checked={currentSettings.pronounceKana ?? false}
          onchange={handlePronounceToggle}
        />
        <div class="toggle-text">
          <span class="toggle-name">Japanese Voice Pronunciation</span>
          <span class="toggle-desc">Speak each kana aloud using Japanese speech synthesis</span>
        </div>
      </label>
    </div>

    <!-- Visuals -->
    <div class="settings-section">
      <span class="section-title">Visuals</span>
      <label class="toggle-row">
        <input 
          type="checkbox" 
          checked={currentSettings.fontVariation ?? true}
          onchange={handleFontToggle}
        />
        <div class="toggle-text">
          <span class="toggle-name">Alternate Fonts</span>
          <span class="toggle-desc">Vary font styles (sans, serif) to build robust recognition</span>
        </div>
      </label>
    </div>

    <!-- Backup & Restore -->
    <div class="settings-section">
      <span class="section-title">Data Backup</span>
      <div class="backup-actions">
        <button class="action-btn" onclick={handleExport}>
          <Icon name="download" size={14} />
          <span>Export JSON</span>
        </button>

        <label class="action-btn import-btn">
          <Icon name="upload" size={14} />
          <span>Import JSON</span>
          <input type="file" accept=".json" onchange={handleImport} style="display: none;" />
        </label>
      </div>
      {#if importMsg}
        <div class="import-msg">{importMsg}</div>
      {/if}
    </div>

    <!-- Reset -->
    <div class="settings-section danger-zone">
      <button class="danger-btn" onclick={handleResetAll}>
        Clear All Data & Progress
      </button>
    </div>
  </div>
</div>

<style>
  .settings-modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 100;
  }

  .modal-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    width: 100%;
    max-width: 420px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }

  .modal-header h3 {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text);
  }

  .close-btn {
    color: var(--text-muted);
    padding: 4px;
    border-radius: var(--radius-xs);
    display: flex;
    align-items: center;
  }

  .close-btn:hover {
    color: var(--text);
    background: var(--bg-subtle);
  }

  .settings-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  .theme-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  .theme-btn {
    padding: 8px 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: var(--radius-xs);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.1s ease;
  }

  .theme-btn:hover {
    border-color: var(--border-strong);
    background: var(--surface-hover);
  }

  .theme-btn.active {
    border-color: var(--text);
    background: var(--bg-subtle);
    font-weight: 600;
  }

  .toggle-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
  }

  .toggle-row input[type="checkbox"] {
    margin-top: 3px;
    accent-color: var(--text);
  }

  .toggle-text {
    display: flex;
    flex-direction: column;
  }

  .toggle-name {
    font-weight: 500;
    font-size: 0.85rem;
    color: var(--text);
  }

  .toggle-desc {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .backup-actions {
    display: flex;
    gap: 8px;
  }

  .action-btn {
    flex: 1;
    padding: 8px 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xs);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    transition: all 0.1s ease;
  }

  .action-btn:hover {
    background: var(--surface-hover);
    border-color: var(--border-strong);
  }

  .import-msg {
    font-size: 0.8rem;
    color: var(--success);
    margin-top: 2px;
  }

  .danger-zone {
    padding-top: 8px;
    border-top: 1px solid var(--border);
  }

  .danger-btn {
    padding: 8px 12px;
    background: var(--error-bg);
    border: 1px solid var(--error-border);
    color: var(--error);
    border-radius: var(--radius-xs);
    font-weight: 500;
    font-size: 0.8rem;
    transition: all 0.1s ease;
  }

  .danger-btn:hover {
    background: var(--error);
    color: #ffffff;
  }
</style>
