<script>
  import { getAllKana } from '../lib/data/index.js';

  let { stats = {} } = $props();

  const allKanaList = getAllKana();

  function getAccuracy(kana) {
    const s = stats[kana];
    if (!s || !s.totalSeen) return null;
    return Math.round((s.totalCorrect / s.totalSeen) * 100);
  }

  function getColorClass(acc) {
    if (acc === null) return 'unseen';
    if (acc >= 85) return 'great';
    if (acc >= 70) return 'good';
    if (acc >= 50) return 'weak';
    return 'critical';
  }
</script>

<div class="heatmap-container">
  <div class="heatmap-legend">
    <span class="legend-item"><span class="swatch unseen"></span> Unseen</span>
    <span class="legend-item"><span class="swatch critical"></span> &lt;50%</span>
    <span class="legend-item"><span class="swatch weak"></span> 50-70%</span>
    <span class="legend-item"><span class="swatch good"></span> 70-85%</span>
    <span class="legend-item"><span class="swatch great"></span> 85%+</span>
  </div>

  <div class="heatmap-grid">
    {#each allKanaList as item}
      {@const acc = getAccuracy(item.kana)}
      {@const colorClass = getColorClass(acc)}
      <div 
        class={`cell ${colorClass}`}
        title={`${item.kana} (${item.romaji.join(', ')}) — ${acc !== null ? `${acc}% (${stats[item.kana]?.totalCorrect}/${stats[item.kana]?.totalSeen})` : 'Not practiced'}`}
      >
        <span class="glyph">{item.kana}</span>
        <span class="acc-text">{acc !== null ? `${acc}%` : ''}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .heatmap-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .heatmap-legend {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.75rem;
    color: var(--text-muted);
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .swatch {
    width: 10px;
    height: 10px;
    border-radius: var(--radius-xs);
    display: inline-block;
  }

  .heatmap-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
    gap: 4px;
  }

  .cell {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-xs);
    border: 1px solid var(--border);
    cursor: default;
  }

  .glyph {
    font-family: var(--font-jp-sans);
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1;
  }

  .acc-text {
    font-size: 0.6rem;
    font-family: var(--font-mono);
    line-height: 1;
    margin-top: 2px;
  }

  /* Plain Solid Colors */
  .unseen {
    background: var(--bg-subtle);
    color: var(--text-faint);
  }

  .great {
    background: #16a34a;
    color: #ffffff;
    border-color: #15803d;
  }

  .good {
    background: #ca8a04;
    color: #ffffff;
    border-color: #a16207;
  }

  .weak {
    background: #ea580c;
    color: #ffffff;
    border-color: #c2410c;
  }

  .critical {
    background: #dc2626;
    color: #ffffff;
    border-color: #b91c1c;
  }
</style>
