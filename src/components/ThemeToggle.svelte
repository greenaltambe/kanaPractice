<script>
  import Icon from '../lib/components/Icon.svelte';

  let { theme = 'auto', onToggle } = $props();

  const labels = {
    auto: 'System',
    light: 'Light',
    dark: 'Dark'
  };

  const iconNames = {
    auto: 'monitor',
    light: 'sun',
    dark: 'moon'
  };
</script>

<button 
  class="theme-toggle" 
  onclick={onToggle}
  title={`Theme: ${labels[theme]} (Click to toggle)`}
  aria-label={`Theme: ${labels[theme]}`}
>
  <Icon name={iconNames[theme] || 'monitor'} size={15} />
  <span class="label">{labels[theme]}</span>
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: var(--radius-sm);
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.8rem;
    font-weight: 500;
    transition: all 0.1s ease;
  }

  .theme-toggle:hover {
    background: var(--surface-hover);
    color: var(--text);
    border-color: var(--border-strong);
  }

  .label {
    text-transform: capitalize;
  }
</style>
