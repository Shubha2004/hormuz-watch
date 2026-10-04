<script lang="ts">
  import type { DataSource } from '../lib/types';
  import DemoBadge from './DemoBadge.svelte';
  import { formatDateTime } from '../lib/format';

  interface Props {
    source: DataSource;
    compact?: boolean;
  }

  const { source, compact = false }: Props = $props();
</script>

<div class={`flex flex-wrap items-center gap-x-3 gap-y-1 ${compact ? 'text-[11px]' : 'text-xs'} text-slate-500`}>
  <DemoBadge quality={source.quality} note={source.note} />
  <span>
    Source:
    {#if source.url.startsWith('http')}
      <a href={source.url} target="_blank" rel="noopener noreferrer" class="text-cyan-400/90 hover:text-cyan-300 underline decoration-dotted underline-offset-2">{source.name}</a>
    {:else}
      <span class="text-slate-400">{source.name}</span>
    {/if}
  </span>
  <span>Updated <time datetime={source.lastUpdated}>{formatDateTime(source.lastUpdated)}</time></span>
</div>
