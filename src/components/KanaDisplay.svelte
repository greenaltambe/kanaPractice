<script>
  let { kana = '', fontVariation = true } = $props();

  const fonts = [
    'var(--font-jp-sans)',
    'var(--font-jp-serif)',
    'sans-serif'
  ];

  let selectedFont = $state(fonts[0]);

  $effect(() => {
    if (kana && fontVariation) {
      selectedFont = fonts[Math.floor(Math.random() * fonts.length)];
    } else {
      selectedFont = fonts[0];
    }
  });
</script>

<div class="kana-display">
  <div class="glyph" style:font-family={selectedFont}>
    {kana}
  </div>
</div>

<style>
  .kana-display {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 240px;
    height: 240px;
    margin: 0 auto;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    user-select: none;
  }

  .glyph {
    font-size: 7.5rem;
    line-height: 1;
    color: var(--text);
    font-weight: 500;
  }

  @media (max-width: 600px) {
    .kana-display {
      width: 180px;
      height: 180px;
    }
    .glyph {
      font-size: 5.5rem;
    }
  }
</style>
