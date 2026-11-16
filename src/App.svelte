<script>
  import './app.css';
  import { onMount, onDestroy } from 'svelte';
  import KanaDisplay from './components/KanaDisplay.svelte';
  import InputField from './components/InputField.svelte';
  import SessionBar from './components/SessionBar.svelte';
  import ProgressBar from './components/ProgressBar.svelte';
  import Setup from './components/Setup.svelte';
  import Stats from './components/Stats.svelte';
  import SettingsModal from './components/Settings.svelte';
  import ThemeToggle from './components/ThemeToggle.svelte';
  import Icon from './lib/components/Icon.svelte';

  import { practiceStore } from './lib/stores/practice.js';
  import { settings } from './lib/stores/settings.js';
  import { statsStore } from './lib/stores/stats.js';
  import { getNextTheme, watchSystemTheme } from './lib/utils/theme.js';
  import { playCorrectSound, playWrongSound, speakKana } from './lib/utils/audio.js';

  let currentView = $state('setup');
  let showSettings = $state(false);

  onMount(() => {
    const unwatch = watchSystemTheme(() => {
      if ($settings.theme === 'auto') {
        settings.update(s => ({ ...s }));
      }
    });

    const handleGlobalKey = (e) => {
      // Spacebar to start practice from Setup view
      if (e.code === 'Space' && currentView === 'setup' && !showSettings) {
        e.preventDefault();
        handleStartPractice();
        return;
      }

      if (e.key === 'Escape') {
        if (showSettings) {
          showSettings = false;
        } else if (currentView === 'practice') {
          handleStopPractice();
        } else if (currentView === 'stats') {
          currentView = 'setup';
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKey);

    return () => {
      unwatch();
      window.removeEventListener('keydown', handleGlobalKey);
    };
  });

  function handleStartPractice() {
    practiceStore.startPractice($settings.mode, $settings.selectedGroups);
    currentView = 'practice';
  }

  function handleStopPractice() {
    practiceStore.stopPractice();
    currentView = 'setup';
  }

  function handleCheckInput(cleanAnswer) {
    const currentKana = $practiceStore.currentCard?.kana;
    const result = practiceStore.checkInput(cleanAnswer);

    if (result && result.status === 'correct') {
      if ($settings.soundEffects) playCorrectSound();
      if ($settings.pronounceKana && currentKana) speakKana(currentKana);
    } else if (result && result.status === 'wrong') {
      if ($settings.soundEffects) playWrongSound();
      if ($settings.pronounceKana && currentKana) speakKana(currentKana);
    }

    return result;
  }

  function handleSkipCard() {
    practiceStore.skipCard();
  }

  function handleThemeToggle() {
    const next = getNextTheme($settings.theme);
    settings.update(s => ({ ...s, theme: next }));
  }

  function handleModeChange(newMode) {
    settings.update(s => ({ ...s, mode: newMode }));
  }

  function handleStageSelect(stageId) {
    settings.update(s => ({ ...s, currentStageId: stageId }));
  }

  function handleGroupsChange(newGroups) {
    settings.update(s => ({ ...s, selectedGroups: newGroups }));
  }
</script>

<div class="app-shell">
  <!-- Minimalist Header -->
  <header class="app-header">
    <div class="header-left">
      <button class="logo-btn" onclick={() => currentView = 'setup'}>
        <span class="logo-accent">仮名</span>
        <span class="logo-text">Kana Practice</span>
      </button>
      {#if currentView === 'practice'}
        <span class="mode-pill">
          {$practiceStore.mode === 'guided' ? 'Guided' : 'Free'}
        </span>
      {/if}
    </div>

    <nav class="header-nav">
      {#if currentView === 'practice'}
        <button class="nav-btn stop-btn" onclick={handleStopPractice}>
          <Icon name="square" size={13} />
          <span>Stop</span>
        </button>
      {:else}
        <button 
          class="nav-btn" 
          class:active={currentView === 'setup'}
          onclick={() => currentView = 'setup'}
        >
          Practice
        </button>
        <button 
          class="nav-btn" 
          class:active={currentView === 'stats'}
          onclick={() => currentView = 'stats'}
        >
          Analytics
        </button>
      {/if}

      <button class="icon-btn" onclick={() => showSettings = true} title="Settings" aria-label="Settings">
        <Icon name="settings" size={15} />
      </button>

      <ThemeToggle 
        theme={$settings.theme} 
        onToggle={handleThemeToggle} 
      />
    </nav>
  </header>

  <!-- Main View Area -->
  <main class="app-main">
    {#if currentView === 'practice'}
      <div class="practice-view fade-in">
        {#if $practiceStore.mode === 'guided'}
          <ProgressBar 
            currentStageId={$practiceStore.currentStageId}
            progress={$practiceStore.stageProgress}
            stageJustUnlocked={$practiceStore.stageJustUnlocked}
          />
        {/if}

        {#if $practiceStore.currentCard}
          <KanaDisplay 
            kana={$practiceStore.currentCard.kana}
            fontVariation={$settings.fontVariation}
          />

          {#key $practiceStore.cardKey}
            <InputField 
              onCheckInput={handleCheckInput}
              onSkip={handleSkipCard}
              correction={$practiceStore.currentCorrection}
            />
          {/key}
        {/if}

        <SessionBar stats={$practiceStore.sessionStats} />
      </div>

    {:else if currentView === 'setup'}
      <Setup 
        mode={$settings.mode}
        currentStageId={$settings.currentStageId}
        selectedGroups={$settings.selectedGroups}
        onModeChange={handleModeChange}
        onStageSelect={handleStageSelect}
        onGroupsChange={handleGroupsChange}
        onStartPractice={handleStartPractice}
      />

    {:else if currentView === 'stats'}
      <Stats 
        stats={$statsStore}
        onResetStats={() => statsStore.resetStats()}
      />
    {/if}
  </main>

  <!-- Settings Modal -->
  {#if showSettings}
    <SettingsModal 
      currentSettings={$settings}
      onUpdateSettings={(newVal) => settings.set(newVal)}
      onClose={() => showSettings = false}
    />
  {/if}
</div>

<style>
  .app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 20;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
    padding: 0;
  }

  .logo-accent {
    color: var(--primary);
    font-family: var(--font-jp-sans);
    font-weight: 700;
  }

  .logo-text {
    letter-spacing: -0.2px;
  }

  .mode-pill {
    font-size: 0.7rem;
    font-weight: 500;
    background: var(--bg-subtle);
    padding: 1px 6px;
    border-radius: var(--radius-xs);
    color: var(--text-muted);
    text-transform: uppercase;
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-btn {
    padding: 5px 10px;
    border-radius: var(--radius-xs);
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-muted);
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: all 0.1s ease;
  }

  .nav-btn:hover {
    color: var(--text);
    background: var(--bg-subtle);
  }

  .nav-btn.active {
    color: var(--text);
    background: var(--bg-subtle);
    font-weight: 600;
  }

  .stop-btn {
    color: var(--error);
    border: 1px solid var(--error-border);
    background: var(--error-bg);
  }

  .stop-btn:hover {
    background: var(--error);
    color: #ffffff;
  }

  .icon-btn {
    padding: 6px;
    border-radius: var(--radius-xs);
    color: var(--text-muted);
    border: 1px solid var(--border);
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s ease;
  }

  .icon-btn:hover {
    background: var(--surface-hover);
    color: var(--text);
    border-color: var(--border-strong);
  }

  .app-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
  }

  .practice-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 1rem;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
  }

  @media (max-width: 600px) {
    .app-header {
      padding: 8px 12px;
    }
  }
</style>
