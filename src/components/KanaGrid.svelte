<script>
  import { hiraganaGroups } from '../lib/data/hiragana.js';
  import { katakanaGroups } from '../lib/data/katakana.js';

  let { selectedGroups = [], onSelectionChange } = $props();

  let selectedSet = $derived(new Set(selectedGroups));

  function toggleGroup(groupId) {
    const next = new Set(selectedSet);
    if (next.has(groupId)) {
      next.delete(groupId);
    } else {
      next.add(groupId);
    }
    onSelectionChange?.(Array.from(next));
  }

  function setAllForScript(groups, select) {
    const next = new Set(selectedSet);
    for (const g of groups) {
      if (select) {
        next.add(g.id);
      } else {
        next.delete(g.id);
      }
    }
    onSelectionChange?.(Array.from(next));
  }

  let totalCharsSelected = $derived.by(() => {
    let count = 0;
    const all = [...hiraganaGroups, ...katakanaGroups];
    for (const g of all) {
      if (selectedSet.has(g.id)) {
        count += g.chars.length;
      }
    }
    return count;
  });
</script>

<div class="kana-grid-container">
  <div class="summary-bar">
    <span>Selected: <strong>{totalCharsSelected}</strong> characters</span>
  </div>

  <!-- Hiragana Section -->
  <section class="script-section">
    <div class="section-header">
      <h3>Hiragana</h3>
      <div class="bulk-actions">
        <button class="action-btn" onclick={() => setAllForScript(hiraganaGroups, true)}>
          all
        </button>
        <span class="sep">/</span>
        <button class="action-btn" onclick={() => setAllForScript(hiraganaGroups, false)}>
          none
        </button>
      </div>
    </div>

    <div class="groups-grid">
      {#each hiraganaGroups as group}
        <label class="group-card" class:checked={selectedSet.has(group.id)}>
          <div class="card-header">
            <input
              type="checkbox"
              checked={selectedSet.has(group.id)}
              onchange={() => toggleGroup(group.id)}
            />
            <span class="group-name">{group.name}</span>
            <span class="char-count">{group.chars.length}</span>
          </div>
          <div class="char-preview">
            {#each group.chars.slice(0, 10) as c}
              <span class="sample-char">{c.kana}</span>
            {/each}
            {#if group.chars.length > 10}...{/if}
          </div>
        </label>
      {/each}
    </div>
  </section>

  <!-- Katakana Section -->
  <section class="script-section">
    <div class="section-header">
      <h3>Katakana</h3>
      <div class="bulk-actions">
        <button class="action-btn" onclick={() => setAllForScript(katakanaGroups, true)}>
          all
        </button>
        <span class="sep">/</span>
        <button class="action-btn" onclick={() => setAllForScript(katakanaGroups, false)}>
          none
        </button>
      </div>
    </div>

    <div class="groups-grid">
      {#each katakanaGroups as group}
        <label class="group-card" class:checked={selectedSet.has(group.id)}>
          <div class="card-header">
            <input
              type="checkbox"
              checked={selectedSet.has(group.id)}
              onchange={() => toggleGroup(group.id)}
            />
            <span class="group-name">{group.name}</span>
            <span class="char-count">{group.chars.length}</span>
          </div>
          <div class="char-preview">
            {#each group.chars.slice(0, 10) as c}
              <span class="sample-char">{c.kana}</span>
            {/each}
            {#if group.chars.length > 10}...{/if}
          </div>
        </label>
      {/each}
    </div>
  </section>
</div>

<style>
  .kana-grid-container {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .summary-bar {
    padding: 6px 10px;
    background: var(--bg-subtle);
    border-radius: var(--radius-xs);
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .script-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--border);
  }

  .section-header h3 {
    font-size: 0.95rem;
    color: var(--text);
    font-weight: 600;
  }

  .bulk-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8rem;
  }

  .action-btn {
    color: var(--text-muted);
    font-size: 0.75rem;
    padding: 1px 4px;
  }

  .action-btn:hover {
    color: var(--text);
  }

  .sep {
    color: var(--border-strong);
    font-size: 0.75rem;
  }

  .groups-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 6px;
  }

  .group-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xs);
    cursor: pointer;
    transition: all 0.1s ease;
  }

  .group-card:hover {
    border-color: var(--border-strong);
    background: var(--surface-hover);
  }

  .group-card.checked {
    border-color: var(--text);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
  }

  .card-header input[type="checkbox"] {
    accent-color: var(--text);
    cursor: pointer;
  }

  .group-name {
    font-weight: 500;
    color: var(--text);
  }

  .char-count {
    color: var(--text-faint);
    font-size: 0.75rem;
    font-family: var(--font-mono);
    margin-left: auto;
  }

  .char-preview {
    font-family: var(--font-jp-sans);
    font-size: 0.85rem;
    color: var(--text-muted);
    letter-spacing: 1px;
  }
</style>
