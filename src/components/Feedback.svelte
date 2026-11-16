<script>
  let { feedback = null } = $props();
</script>

<div class="feedback-container">
  {#if feedback}
    {#if feedback.type === 'correct'}
      <div class="feedback-badge correct fade-in">
        <span class="icon">✓</span>
        <span class="text">Correct!</span>
      </div>
    {:else if feedback.type === 'wrong'}
      <div class="feedback-badge wrong shake">
        <span class="icon">✗</span>
        <span class="text">
          Wrong &nbsp;→&nbsp; <strong class="answer">{feedback.correctAnswer}</strong>
        </span>
      </div>
    {/if}
  {:else}
    <div class="feedback-placeholder"></div>
  {/if}
</div>

<style>
  .feedback-container {
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .feedback-placeholder {
    height: 48px;
  }

  .feedback-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: var(--radius-full);
    font-size: 1.1rem;
    font-weight: 600;
  }

  .feedback-badge.correct {
    background: var(--success-bg);
    border: 1px solid var(--success-border);
    color: var(--success);
  }

  .feedback-badge.wrong {
    background: var(--error-bg);
    border: 1px solid var(--error-border);
    color: var(--error);
  }

  .answer {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    text-decoration: underline;
  }

  .icon {
    font-size: 1.2rem;
    line-height: 1;
  }
</style>
