<script lang="ts">
  import type { Incident, RiskLevel } from '../lib/types';
  import RiskBadge from './RiskBadge.svelte';
  import DemoBadge from './DemoBadge.svelte';
  import StateBlock from './StateBlock.svelte';
  import { formatDate } from '../lib/format';

  interface Props {
    incidents: Incident[];
    title?: string;
  }

  const { incidents, title = 'Incident timeline' }: Props = $props();

  let severity = $state<'all' | RiskLevel>('all');

  const sorted = $derived([...incidents].sort((a, b) => b.date.localeCompare(a.date)));
  const filtered = $derived(severity === 'all' ? sorted : sorted.filter((i) => i.severity === severity));

  const severities: Array<'all' | RiskLevel> = ['all', 'low', 'moderate', 'elevated', 'high'];
</script>

<section aria-label={title} class="panel panel-pad">
  <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
    <h2 class="card-title">{title}</h2>
    <div class="flex gap-1" role="group" aria-label="Filter by severity">
      {#each severities as s}
        <button
          type="button"
          onclick={() => (severity = s)}
          aria-pressed={severity === s}
          class={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
            severity === s ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'border border-navy-600 text-slate-400 hover:text-slate-200'
          }`}
        >
          {s}
        </button>
      {/each}
    </div>
  </div>

  {#if filtered.length === 0}
    <StateBlock state="empty" />
  {:else}
    <ol class="relative space-y-4 border-l border-navy-600 pl-5">
      {#each filtered as inc (inc.id)}
        <li class="relative">
          <span class="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-navy-950 bg-cyan-400" aria-hidden="true"></span>
          <div class="flex flex-wrap items-center gap-2">
            <time class="text-xs font-semibold text-slate-400" datetime={inc.date}>{formatDate(inc.date)}</time>
            <RiskBadge level={inc.severity} />
            <DemoBadge quality={inc.quality} />
          </div>
          <h3 class="mt-1 font-semibold text-slate-100">{inc.title}</h3>
          <p class="mt-0.5 text-sm leading-relaxed text-slate-400">{inc.description}</p>
          <p class="mt-0.5 text-[11px] text-slate-500">{inc.location}</p>
        </li>
      {/each}
    </ol>
  {/if}
</section>
