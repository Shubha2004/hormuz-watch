<script lang="ts">
  import type { KpiDatum } from '../lib/types';
  import DemoBadge from './DemoBadge.svelte';

  interface Props {
    kpi: KpiDatum;
  }

  const { kpi }: Props = $props();

  const deltaColor =
    kpi.deltaDirection === 'up'
      ? 'text-cyan-300'
      : kpi.deltaDirection === 'down'
        ? 'text-amber-300'
        : 'text-slate-400';

  const deltaArrow = kpi.deltaDirection === 'up' ? '▲' : kpi.deltaDirection === 'down' ? '▼' : '●';
</script>

<article class="panel panel-pad flex flex-col gap-2" aria-label={kpi.label}>
  <div class="flex items-start justify-between gap-2">
    <h3 class="text-[13px] font-medium text-slate-400">{kpi.label}</h3>
    <DemoBadge quality={kpi.quality} note={kpi.source.note} />
  </div>
  <p class="text-2xl font-bold tracking-tight text-white sm:text-[26px]">{kpi.value}</p>
  <p class={`text-xs font-medium ${deltaColor}`} aria-label={`Trend: ${kpi.delta}`}>
    <span aria-hidden="true">{deltaArrow}</span>
    {kpi.delta}
  </p>
  <p class="mt-auto text-[11px] leading-relaxed text-slate-500" title={kpi.hint}>
    {kpi.hint}
  </p>
</article>
