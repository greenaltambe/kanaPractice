<script>
  import { stages } from '../lib/data/stages.js';
  import { getKanaForStage } from '../lib/data/index.js';
  import Icon from '../lib/components/Icon.svelte';

  let { currentStageId = 1, onSelectStage } = $props();

  function getCharsForStagePreview(id) {
    const chars = getKanaForStage(id);
    return chars.map(c => c.kana).join(' ');
  }
</script>

<div class="stages-timeline">
  <div class="timeline-intro">
    <span>
      Auto-unlock criteria: 3+ reviews, 3 consecutive correct, and &lt;4s average speed.
    </span>
  </div>

  <div class="stages-list">
    {#each stages as stage}
      {@const isCompleted = stage.id < currentStageId}
      {@const isCurrent = stage.id === currentStageId}
      {@const isLocked = stage.id > currentStageId}

      <div 
        class="stage-row" 
        class:completed={isCompleted}
        class:current={isCurrent}
        class:locked={isLocked}
        role="button"
        tabindex="0"
        onclick={() => !isLocked && onSelectStage?.(stage.id)}
        onkeydown={(e) => e.key === 'Enter' && !isLocked && onSelectStage?.(stage.id)}
      >
        <div class="stage-badge">
          {#if isCompleted}
            <Icon name="check" size={12} color="var(--success)" />
          {:else if isCurrent}
            <Icon name="play" size={10} color="#ffffff" />
          {:else}
            <Icon name="lock" size={11} color="var(--text-faint)" />
          {/if}
        </div>

        <div class="stage-content">
          <div class="stage-title-row">
            <span class="stage-number">{stage.id}.</span>
            <span class="stage-title">{stage.name}</span>
            <span class="script-tag">{stage.script}</span>
          </div>
          <div class="stage-chars-preview">
            {getCharsForStagePreview(stage.id)}
          </div>
        </div>

        {#if isCurrent}
          <span class="active-pill">Current</span>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .stages-timeline {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .timeline-intro {
    background: var(--bg-subtle);
    padding: 8px 12px;
    border-radius: var(--radius-xs);
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .stages-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 440px;
    overflow-y: auto;
  }

  .stage-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xs);
    cursor: pointer;
    transition: all 0.1s ease;
  }

  .stage-row:hover:not(.locked) {
    background: var(--surface-hover);
    border-color: var(--border-strong);
  }

  .stage-row.current {
    border-color: var(--primary);
    background: var(--primary-bg);
  }

  .stage-row.locked {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .stage-badge {
    width: 22px;
    height: 22px;
    border-radius: var(--radius-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-subtle);
    flex-shrink: 0;
  }

  .completed .stage-badge {
    background: var(--success-bg);
  }

  .current .stage-badge {
    background: var(--primary);
  }

  .stage-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .stage-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .stage-number {
    font-size: 0.8rem;
    color: var(--text-faint);
    font-family: var(--font-mono);
  }

  .stage-title {
    font-weight: 600;
    color: var(--text);
    font-size: 0.85rem;
  }

  .script-tag {
    font-size: 0.7rem;
    padding: 1px 4px;
    background: var(--bg-subtle);
    border-radius: var(--radius-xs);
    color: var(--text-muted);
    text-transform: capitalize;
  }

  .stage-chars-preview {
    font-family: var(--font-jp-sans);
    font-size: 0.85rem;
    color: var(--text-muted);
    letter-spacing: 1px;
  }

  .active-pill {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--primary);
    padding: 1px 6px;
    background: var(--surface);
    border: 1px solid var(--primary);
    border-radius: var(--radius-xs);
    text-transform: uppercase;
  }
</style>
