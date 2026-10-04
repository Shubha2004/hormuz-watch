<script lang="ts">
  import { NAV_LINKS } from '../lib/types';
  import { dataStatus, isOnline, lastRefreshError, marketData, refreshData } from '../lib/stores';
  import { formatDateTime, timeAgo } from '../lib/format';

  interface Props {
    currentPath: string;
  }

  const { currentPath }: Props = $props();

  let menuOpen = $state(false);
  let toast = $state<string | null>(null);

  // Show primary links on desktop; the rest live in the "More" menu.
  const primaryLinks = NAV_LINKS.slice(0, 7);
  const moreLinks = NAV_LINKS.slice(7);

  function isActive(href: string): boolean {
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(href + '/');
  }

  async function onRefresh() {
    await refreshData();
    const unsub = dataStatus.subscribe((s) => {
      if (s === 'ready') {
        toast = 'Data refreshed';
        setTimeout(() => (toast = null), 2500);
        unsub();
      } else if (s === 'error') {
        toast = 'Refresh failed — showing cached demo data';
        setTimeout(() => (toast = null), 3500);
        unsub();
      }
    });
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') menuOpen = false;
  }
</script>

<svelte:window onkeydown={onKeydown} />

<header class="sticky top-0 z-40 border-b border-navy-700/60 bg-navy-950/90 backdrop-blur">
  <div class="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-3 sm:px-5">
    <!-- Brand -->
    <a href="/" class="flex shrink-0 items-center gap-2.5" aria-label="Hormuz Watch home">
      <img src="/favicon.svg" alt="" class="h-9 w-9" aria-hidden="true" />
      <span class="leading-tight">
        <span class="block text-[15px] font-bold tracking-wide text-white">HORMUZ WATCH</span>
        <span class="block text-[10px] uppercase tracking-[0.2em] text-cyan-400/80">Shipping Intelligence</span>
      </span>
    </a>

    <!-- Desktop nav -->
    <nav class="ml-4 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
      {#each primaryLinks as link}
        <a
          href={link.href}
          aria-current={isActive(link.href) ? 'page' : undefined}
          class={`rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${
            isActive(link.href)
              ? 'bg-cyan-500/15 text-cyan-300'
              : 'text-slate-300 hover:bg-navy-800 hover:text-white'
          }`}
        >
          {link.label}
        </a>
      {/each}
      <div class="relative">
        <button
          type="button"
          class="rounded-md px-2.5 py-2 text-[13px] font-medium text-slate-300 hover:bg-navy-800 hover:text-white"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          onclick={() => (menuOpen = !menuOpen)}
        >
          More ▾
        </button>
        {#if menuOpen}
          <div class="absolute right-0 top-full mt-1 w-48 rounded-lg border border-navy-700 bg-navy-900 p-1 shadow-xl" role="menu">
            {#each moreLinks as link}
              <a
                href={link.href}
                role="menuitem"
                class={`block rounded-md px-3 py-2 text-[13px] ${isActive(link.href) ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-300 hover:bg-navy-800'}`}
                onclick={() => (menuOpen = false)}
              >
                {link.label}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </nav>

    <div class="flex-1"></div>

    <!-- Status + refresh -->
    <div class="hidden items-center gap-3 md:flex">
      <span class="flex items-center gap-1.5 text-xs text-slate-400" title={$isOnline ? 'Browser reports network connectivity' : 'Browser reports no network connectivity'}>
        <span class={`h-2 w-2 rounded-full ${$isOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} aria-hidden="true"></span>
        {$isOnline ? 'Online' : 'Offline'}
      </span>
      <span class="text-xs text-slate-500" title={`Last refresh: ${formatDateTime($marketData.refreshedAt)}`}>
        Updated {timeAgo($marketData.refreshedAt)}
      </span>
      <button
        type="button"
        class="btn-ghost !py-1.5"
        onclick={onRefresh}
        disabled={$dataStatus === 'loading'}
        aria-label="Refresh data"
      >
        <svg class={`h-4 w-4 ${$dataStatus === 'loading' ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="hidden xl:inline">{$dataStatus === 'loading' ? 'Refreshing…' : 'Refresh'}</span>
      </button>
    </div>

    <!-- Mobile menu button -->
    <button
      type="button"
      class="rounded-md p-2 text-slate-300 hover:bg-navy-800 lg:hidden"
      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      {#if menuOpen}
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" stroke-linecap="round"/></svg>
      {:else}
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round"/></svg>
      {/if}
    </button>
  </div>

  <!-- Mobile nav -->
  {#if menuOpen}
    <nav class="border-t border-navy-800 px-3 py-2 lg:hidden" aria-label="Mobile">
      <ul class="grid gap-0.5 py-1">
        {#each NAV_LINKS as link}
          <li>
            <a
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              class={`block rounded-md px-3 py-2.5 text-sm font-medium ${isActive(link.href) ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-300 hover:bg-navy-800'}`}
              onclick={() => (menuOpen = false)}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
      <div class="flex items-center justify-between border-t border-navy-800 px-3 py-3 md:hidden">
        <span class="text-xs text-slate-500">Updated {timeAgo($marketData.refreshedAt)}</span>
        <button type="button" class="btn-ghost !py-1.5" onclick={onRefresh} disabled={$dataStatus === 'loading'}>
          {$dataStatus === 'loading' ? 'Refreshing…' : 'Refresh data'}
        </button>
      </div>
    </nav>
  {/if}

  <!-- Toast -->
  {#if toast}
    <div class="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-navy-600 bg-navy-800 px-4 py-2.5 text-sm text-slate-200 shadow-xl" role="status">
      {toast}
      {#if $lastRefreshError}<span class="block text-xs text-slate-400">{$lastRefreshError}</span>{/if}
    </div>
  {/if}
</header>
