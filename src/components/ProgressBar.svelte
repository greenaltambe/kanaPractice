<script>
  import { stages } from '../lib/data/stages.js';
  import Icon from '../lib/components/Icon.svelte';

  let { currentStageId = 1, progress = 0, stageJustUnlocked = false } = $props();

  let stage = $derived(stages.find(s => s.id === currentStageId) || stages[0]);
  let percent = $derived(Math.min(100, Math.round(progress * 100)));
</script>

<div class="progress-container">
  <div class="stage-info">
    <div class="stage-left">
      <span class="stage-tag">Stage {stage.id} of {stages.length}</span>
      <span class="stage-name">{stage.name}</span>
    </div>
    <span class="percent-label">{percent}%</span>
  </div>

  <div class="bar-track">
    <div 
      class="bar-fill" 
      style:width={`${percent}%`}
      class:mastered={percent >= 100}
    ></div>
  </div>

  {#if stageJustUnlocked}
    <div class="unlock-banner fade-in">
      <Icon name="check" size={14} color="var(--success)" />
      <span>Stage complete &mdash; new characters added</span>
    </div>
  {/if}
</div>

<style>
  .progress-container {
    width: 100%;
    max-width: 440px;
    margin: 0 auto 1.5rem auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .stage-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .stage-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stage-tag {
    font-weight: 600;
    font-size: 0.75rem;
    color: var(--text-muted);
    background: var(--bg-subtle);
    padding: 2px 6px;
    border-radius: var(--radius-xs);
  }

  .stage-name {
    font-weight: 500;
    color: var(--text);
  }

  .percent-label {
    font-family: var(--font-mono);
    font-weight: 600;
  }

  .bar-track {
    width: 100%;
    height: 4px;
    background: var(--border);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    background: var(--primary);
    border-radius: var(--radius-full);
    transition: width 0.2s ease;
  }

  .bar-fill.mastered {
    background: var(--success);
  }

  .unlock-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 0.8rem;
    color: var(--success);
    font-weight: 500;
    padding-top: 2px;
  }
</style>
