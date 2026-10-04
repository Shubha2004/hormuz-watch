<script lang="ts">
  import type { KpiDatum } from '../lib/types';
  import KpiCard from './KpiCard.svelte';

  interface Props {
    kpis: KpiDatum[];
  }

  const { kpis }: Props = $props();
</script>

<section aria-label="Key indicators">
  <div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
    {#each kpis as kpi (kpi.id)}
      <KpiCard {kpi} />
    {/each}
  </div>
</section>
