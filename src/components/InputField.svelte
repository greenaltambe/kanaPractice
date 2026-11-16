<script>
  let { onCheckInput, onSkip, correction = null, disabled = false } = $props();

  let inputEl = $state(null);
  let value = $state('');

  // Keep auto-focused
  $effect(() => {
    if (!disabled && inputEl) {
      inputEl.focus();
    }
  });

  function handleInput(e) {
    const raw = e.target.value;
    const clean = raw.toLowerCase().replace(/[^a-z]/g, '');
    value = clean;

    if (!clean || disabled) return;

    const result = onCheckInput?.(clean);
    if (result && result.status === 'correct') {
      value = '';
      if (inputEl) {
        inputEl.value = '';
      }
    } else if (result && result.status === 'wrong') {
      // Auto-select text on wrong input so next keystroke overwrites it immediately
      if (inputEl) {
        setTimeout(() => inputEl?.select(), 10);
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      value = '';
      if (inputEl) inputEl.value = '';
      onSkip?.();
    }
  }
</script>

<div class="input-container">
  <input
    bind:this={inputEl}
    bind:value={value}
    type="text"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
    placeholder=""
    {disabled}
    oninput={handleInput}
    onkeydown={handleKeyDown}
    class="sleek-input"
    class:has-error={correction !== null}
  />

  <div class="correction-area">
    {#if correction}
      <span class="correction-text fade-in">{correction}</span>
    {/if}
  </div>
</div>

<style>
  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.25rem 0 0.5rem 0;
    width: 100%;
  }

  .sleek-input {
    width: 180px;
    height: 48px;
    padding: 0 12px;
    font-size: 1.5rem;
    font-family: var(--font-mono);
    text-align: center;
    background: var(--surface);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    color: var(--text);
    outline: none;
    transition: border-color 0.1s ease;
  }

  .sleek-input:focus {
    border-color: var(--text);
  }

  .sleek-input.has-error {
    border-color: var(--error);
    background: var(--error-bg);
  }

  .correction-area {
    min-height: 28px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .correction-text {
    font-family: var(--font-mono);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--error);
  }
</style>
