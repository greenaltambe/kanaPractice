<script>
  import Heatmap from './Heatmap.svelte';
  import { getAllKana } from '../lib/data/index.js';
  import Icon from '../lib/components/Icon.svelte';

  let { stats = {}, onResetStats } = $props();

  const allKana = getAllKana();

  let totalReviews = $derived.by(() => {
    return Object.values(stats).reduce((acc, s) => acc + (s.totalSeen || 0), 0);
  });

  let totalCorrect = $derived.by(() => {
    return Object.values(stats).reduce((acc, s) => acc + (s.totalCorrect || 0), 0);
  });

  let overallAccuracy = $derived.by(() => {
    return totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;
  });

  let masteredCount = $derived.by(() => {
    return Object.values(stats).filter(s => (s.box || 1) >= 4 && s.totalSeen >= 3).length;
  });

  let weakestKanaList = $derived.by(() => {
    const list = [];
    for (const item of allKana) {
      const s = stats[item.kana];
      if (s && s.totalSeen >= 2) {
        const accuracy = Math.round((s.totalCorrect / s.totalSeen) * 100);
        list.push({
          kana: item.kana,
          romaji: item.romaji[0],
          accuracy,
          seen: s.totalSeen,
          wrong: s.totalWrong || 0,
        });
      }
    }
    return list.sort((a, b) => a.accuracy - b.accuracy || b.wrong - a.wrong).slice(0, 10);
  });

  let confusionList = $derived.by(() => {
    const list = [];
    for (const [kana, s] of Object.entries(stats)) {
      if (s.confusionMap) {
        for (const [wrongInput, count] of Object.entries(s.confusionMap)) {
          if (wrongInput && wrongInput !== '(empty)' && wrongInput !== '(skipped)' && count >= 1) {
            list.push({
              kana,
              typed: wrongInput,
              count,
            });
          }
        }
      }
    }
    return list.sort((a, b) => b.count - a.count).slice(0, 8);
  });
</script>

<div class="stats-dashboard">
  <div class="stats-header">
    <h2>Performance & Mastery</h2>
  </div>

  <!-- Metric Summary -->
  <div class="metrics-grid">
    <div class="metric-card">
      <span class="metric-label">Reviews</span>
      <span class="metric-val">{totalReviews}</span>
    </div>

    <div class="metric-card">
      <span class="metric-label">Accuracy</span>
      <span class="metric-val" style:color={overallAccuracy >= 80 ? 'var(--success)' : 'var(--text)'}>
        {overallAccuracy}%
      </span>
    </div>

    <div class="metric-card">
      <span class="metric-label">Mastered</span>
      <span class="metric-val">{masteredCount} <small>/ {allKana.length}</small></span>
    </div>
  </div>

  <!-- Weakest Kana -->
  {#if weakestKanaList.length > 0}
    <div class="section-card">
      <h3>Needs Practice (Lowest Accuracy)</h3>
      <div class="weakness-table">
        {#each weakestKanaList as item}
          <div class="weakness-row">
            <span class="w-glyph">{item.kana}</span>
            <span class="w-romaji">{item.romaji}</span>
            <div class="w-bar-track">
              <div 
                class="w-bar-fill" 
                style:width={`${item.accuracy}%`}
                style:background={item.accuracy < 50 ? 'var(--error)' : 'var(--text-muted)'}
              ></div>
            </div>
            <span class="w-acc">{item.accuracy}%</span>
            <span class="w-count">{item.wrong} misses / {item.seen}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Confusion Patterns -->
  {#if confusionList.length > 0}
    <div class="section-card">
      <h3>Mistake Patterns</h3>
      <div class="confusion-grid">
        {#each confusionList as item}
          <div class="confusion-card">
            <span class="c-target">{item.kana}</span>
            <span class="c-arrow">&rarr;</span>
            <span class="c-typed">{item.typed}</span>
            <span class="c-badge">{item.count}&times;</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Accuracy Heatmap -->
  <div class="section-card">
    <h3>Kana Accuracy Map</h3>
    <Heatmap {stats} />
  </div>

  <div class="stats-footer">
    <button class="reset-stats-btn" onclick={onResetStats}>
      <Icon name="rotateCcw" size={13} />
      <span>Reset Progress</span>
    </button>
  </div>
</div>

<style>
  .stats-dashboard {
    max-width: 760px;
    margin: 0 auto;
    padding: 1.5rem 1rem 4rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  h2 {
    font-size: 1.15rem;
    color: var(--text);
    font-weight: 600;
  }

  h3 {
    font-size: 0.9rem;
    color: var(--text);
    font-weight: 600;
    margin-bottom: 10px;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .metric-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .metric-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .metric-val {
    font-size: 1.6rem;
    font-weight: 600;
    font-family: var(--font-mono);
    color: var(--text);
  }

  .metric-val small {
    font-size: 0.85rem;
    color: var(--text-faint);
    font-weight: 400;
  }

  .section-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px 16px;
  }

  .weakness-table {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .weakness-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    padding: 2px 0;
  }

  .w-glyph {
    font-family: var(--font-jp-sans);
    font-size: 1.25rem;
    font-weight: 600;
    width: 28px;
    text-align: center;
  }

  .w-romaji {
    font-family: var(--font-mono);
    color: var(--text-muted);
    width: 40px;
  }

  .w-bar-track {
    flex: 1;
    height: 4px;
    background: var(--bg-subtle);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .w-bar-fill {
    height: 100%;
    border-radius: var(--radius-full);
  }

  .w-acc {
    font-weight: 600;
    font-family: var(--font-mono);
    width: 40px;
    text-align: right;
    font-size: 0.8rem;
  }

  .w-count {
    font-size: 0.75rem;
    color: var(--text-faint);
    width: 100px;
    font-family: var(--font-mono);
  }

  .confusion-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 6px;
  }

  .confusion-card {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--bg-subtle);
    padding: 6px 10px;
    border-radius: var(--radius-xs);
    font-size: 0.85rem;
  }

  .c-target {
    font-family: var(--font-jp-sans);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--primary);
  }

  .c-arrow {
    font-size: 0.75rem;
    color: var(--text-faint);
  }

  .c-typed {
    font-family: var(--font-mono);
    font-weight: 600;
    color: var(--text);
  }

  .c-badge {
    margin-left: auto;
    font-size: 0.7rem;
    font-family: var(--font-mono);
    color: var(--text-muted);
  }

  .stats-footer {
    display: flex;
    justify-content: flex-end;
  }

  .reset-stats-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--text-muted);
    border: 1px solid var(--border);
    background: var(--surface);
    padding: 6px 12px;
    border-radius: var(--radius-xs);
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.1s ease;
  }

  .reset-stats-btn:hover {
    color: var(--error);
    border-color: var(--error);
  }

  @media (max-width: 600px) {
    .metrics-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
