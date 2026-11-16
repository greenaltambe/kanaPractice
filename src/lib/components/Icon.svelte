<script>
  let { name = '', size = 18, color = 'currentColor', strokeWidth = 2, class: className = '' } = $props();

  const icons = {
    sun: `
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    `,
    moon: `
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    `,
    monitor: `
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    `,
    settings: `
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    `,
    check: `
      <polyline points="20 6 9 17 4 12"></polyline>
    `,
    x: `
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    `,
    play: `
      <polygon points="6 3 20 12 6 21 6 3"></polygon>
    `,
    square: `
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    `,
    lock: `
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    `,
    zap: `
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    `,
    chart: `
      <line x1="18" x2="18" y1="20" y2="10"></line>
      <line x1="12" x2="12" y1="20" y2="4"></line>
      <line x1="6" x2="6" y1="20" y2="14"></line>
    `,
    download: `
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" x2="12" y1="15" y2="3"></line>
    `,
    upload: `
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" x2="12" y1="3" y2="15"></line>
    `,
    volume: `
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    `,
    volumeX: `
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="22" x2="16" y1="9" y2="15"></line>
      <line x1="16" x2="22" y1="9" y2="15"></line>
    `,
    keyboard: `
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="M6 8h.001"></path>
      <path d="M10 8h.001"></path>
      <path d="M14 8h.001"></path>
      <path d="M18 8h.001"></path>
      <path d="M8 12h.001"></path>
      <path d="M12 12h.001"></path>
      <path d="M16 12h.001"></path>
      <path d="M7 16h10"></path>
    `,
    chevronRight: `
      <path d="m9 18 6-6-6-6"></path>
    `,
    rotateCcw: `
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
      <path d="M3 3v5h5"></path>
    `,
  };

  let iconBody = $derived(icons[name] || '');
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={`lucide-icon ${className}`}
>
  {@html iconBody}
</svg>

<style>
  .lucide-icon {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
  }
</style>
