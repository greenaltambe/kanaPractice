<script>
  import Icon from '../lib/components/Icon.svelte';

  let { stats = null } = $props();

  function getAccuracyColor(acc) {
    if (acc >= 85) return 'var(--success)';
    if (acc >= 70) return 'var(--text)';
    return 'var(--error)';
  }
</script>

{#if stats}
  <footer class="session-bar">
    <div class="stat-item">
      <span class="label">Accuracy</span>
      <span class="value" style:color={getAccuracyColor(stats.accuracy)}>
        {stats.accuracy}%
      </span>
      <span class="detail">({stats.totalCorrect}/{stats.totalAnswered})</span>
    </div>

    <div class="divider"></div>

    <div class="stat-item">
      <Icon name="zap" size={13} color="var(--text-muted)" />
      <span class="label">Streak</span>
      <span class="value">{stats.currentStreak}</span>
      <span class="detail">(max {stats.bestStreak})</span>
    </div>

    <div class="divider"></div>

    <div class="stat-item">
      <span class="label">Speed</span>
      <span class="value">{stats.cpm}</span>
      <span class="detail">cpm</span>
    </div>

    {#if stats.weakest && stats.weakest.length > 0}
      <div class="divider"></div>
      <div class="stat-item">
        <span class="label">Missed</span>
        <div class="weak-list">
          {#each stats.weakest as item}
            <span class="weak-badge" title={`${item.count} mistake(s)`}>
              {item.kana}
            </span>
          {/each}
        </div>
      </div>
    {/if}
  </footer>
{/if}

<style>
  .session-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-size: 0.8rem;
    z-index: 10;
    flex-wrap: wrap;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .label {
    color: var(--text-muted);
    font-weight: 500;
  }

  .value {
    font-weight: 600;
    font-family: var(--font-mono);
  }

  .detail {
    font-size: 0.75rem;
    color: var(--text-faint);
  }

  .divider {
    width: 1px;
    height: 14px;
    background: var(--border);
  }

  .weak-list {
    display: flex;
    gap: 4px;
  }

  .weak-badge {
    background: var(--error-bg);
    color: var(--error);
    border: 1px solid var(--error-border);
    border-radius: var(--radius-xs);
    padding: 0 4px;
    font-weight: 600;
    font-size: 0.8rem;
    font-family: var(--font-jp-sans);
  }

  @media (max-width: 600px) {
    .session-bar {
      padding: 6px 12px;
      gap: 10px;
      font-size: 0.75rem;
    }
    .divider {
      display: none;
    }
  }
</style>
