<script>
  import StageOverview from './StageOverview.svelte';
  import KanaGrid from './KanaGrid.svelte';

  let { 
    mode = 'guided', 
    currentStageId = 1, 
    selectedGroups = [], 
    onModeChange,
    onStageSelect,
    onGroupsChange,
    onStartPractice 
  } = $props();
</script>

<div class="setup-container">
  <div class="mode-tabs">
    <button 
      class="mode-tab" 
      class:active={mode === 'guided'}
      onclick={() => onModeChange?.('guided')}
    >
      <span class="tab-title">Guided Progression</span>
      <span class="tab-desc">Auto-unlocks kana rows as you achieve mastery</span>
    </button>

    <button 
      class="mode-tab" 
      class:active={mode === 'free'}
      onclick={() => onModeChange?.('free')}
    >
      <span class="tab-title">Custom Selection</span>
      <span class="tab-desc">Choose specific kana groups to drill</span>
    </button>
  </div>

  <div class="setup-body">
    {#if mode === 'guided'}
      <StageOverview 
        {currentStageId}
        onSelectStage={onStageSelect}
      />
    {:else}
      <KanaGrid 
        {selectedGroups}
        onSelectionChange={onGroupsChange}
      />
    {/if}
  </div>

  <div class="setup-actions">
    <button class="start-btn" onclick={onStartPractice}>
      Start Practice &nbsp;
      <kbd class="kbd-hint">Space</kbd>
    </button>
  </div>
</div>

<style>
  .setup-container {
    max-width: 760px;
    margin: 0 auto;
    padding: 1.5rem 1rem 4rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .mode-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .mode-tab {
    padding: 12px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    cursor: pointer;
    transition: all 0.1s ease;
    text-align: left;
  }

  .mode-tab:hover {
    border-color: var(--border-strong);
    background: var(--surface-hover);
  }

  .mode-tab.active {
    border-color: var(--text);
    background: var(--surface);
  }

  .tab-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
  }

  .tab-desc {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .setup-body {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 1.25rem;
  }

  .setup-actions {
    display: flex;
    justify-content: center;
    position: sticky;
    bottom: 24px;
    z-index: 5;
  }

  .start-btn {
    background: var(--primary);
    color: #ffffff;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 10px 24px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: opacity 0.1s ease;
  }

  .start-btn:hover {
    background: var(--primary-hover);
  }

  .kbd-hint {
    background: rgba(255, 255, 255, 0.2);
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: var(--radius-xs);
    font-family: var(--font-mono);
  }

  @media (max-width: 600px) {
    .mode-tabs {
      grid-template-columns: 1fr;
    }
  }
</style>
