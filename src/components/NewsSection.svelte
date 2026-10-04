<script lang="ts">
  import type { NewsItem } from '../lib/types';
  import { marketData } from '../lib/stores';
  import DemoBadge from './DemoBadge.svelte';
  import StateBlock from './StateBlock.svelte';
  import { formatDateTime, timeAgo } from '../lib/format';

  interface Props {
    items: NewsItem[];
    /** Show search + category filter controls. */
    explorable?: boolean;
    /** Max items to display (0 = all). */
    limit?: number;
    title?: string;
  }

  const { items, explorable = false, limit = 0, title = 'Maritime news' }: Props = $props();

  let query = $state('');
  let category = $state<'all' | NewsItem['category']>('all');
  let liveItems = $state<NewsItem[] | null>(null);

  // After a header refresh, adopt the provider's news list (may be live).
  $effect(() => {
    const unsub = marketData.subscribe((data) => {
      liveItems = data.news;
    });
    return unsub;
  });

  const source = $derived(liveItems ?? items);
  const shown = $derived(limit > 0 ? source.slice(0, limit) : source);

  const filtered = $derived(
    shown.filter((n) => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q);
      const matchC = category === 'all' || n.category === category;
      return matchQ && matchC;
    })
  );

  const categories: Array<'all' | NewsItem['category']> = ['all', 'shipping', 'energy', 'geopolitics', 'insurance'];
</script>

<section aria-label={title} class="panel panel-pad">
  <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
    <h2 class="card-title">{title}</h2>
    {#if explorable}
      <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <label class="sr-only" for="news-search">Search news</label>
        <input
          id="news-search"
          type="search"
          class="input-dark sm:w-56"
          placeholder="Search headlines…"
          bind:value={query}
        />
        <label class="sr-only" for="news-category">Filter by category</label>
        <select id="news-category" class="input-dark sm:w-40" bind:value={category}>
          {#each categories as c}
            <option value={c}>{c === 'all' ? 'All categories' : c[0].toUpperCase() + c.slice(1)}</option>
          {/each}
        </select>
      </div>
    {/if}
  </div>

  {#if filtered.length === 0}
    <StateBlock state="empty" message="No headlines match your search. Try a different term or category." />
  {:else}
    <ul class="space-y-3">
      {#each filtered as n (n.id)}
        <li class="rounded-lg border border-navy-700/60 bg-navy-850/60 p-3.5 transition-colors hover:border-cyan-400/30">
          <div class="flex flex-wrap items-center gap-2">
            <DemoBadge quality={n.quality} />
            <span class="rounded-full bg-navy-700/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{n.category}</span>
            <time class="ml-auto text-[11px] text-slate-500" datetime={n.publishedAt} title={formatDateTime(n.publishedAt)}>{timeAgo(n.publishedAt)}</time>
          </div>
          <a href={n.url} class="mt-1.5 block font-semibold leading-snug text-slate-100 hover:text-cyan-300" target={n.url.startsWith('http') ? '_blank' : undefined} rel={n.url.startsWith('http') ? 'noopener noreferrer' : undefined}>
            {n.title}
          </a>
          <p class="mt-1 text-sm leading-relaxed text-slate-400">{n.summary}</p>
          <p class="mt-1.5 text-[11px] text-slate-500">Via {n.source}</p>
        </li>
      {/each}
    </ul>
  {/if}
</section>
