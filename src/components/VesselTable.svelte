<script lang="ts">
  import type { Vessel, VesselType } from '../lib/types';
  import StateBlock from './StateBlock.svelte';
  import DemoBadge from './DemoBadge.svelte';

  interface Props {
    vessels: Vessel[];
    title?: string;
  }

  const { vessels, title = 'Vessel directory' }: Props = $props();

  let query = $state('');
  let typeFilter = $state<'all' | VesselType>('all');

  const typeLabels: Record<VesselType, string> = {
    tanker: 'Tanker',
    lng: 'LNG carrier',
    container: 'Container',
    bulk: 'Bulk carrier',
    general: 'General cargo'
  };

  const filtered = $derived(
    vessels.filter((v) => {
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.destination.toLowerCase().includes(q) ||
        v.operator.toLowerCase().includes(q) ||
        v.flag.toLowerCase().includes(q);
      const matchT = typeFilter === 'all' || v.type === typeFilter;
      return matchQ && matchT;
    })
  );
</script>

<section aria-label={title} class="panel panel-pad">
  <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
    <h2 class="card-title">{title}</h2>
    <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
      <label class="sr-only" for="vessel-search">Search vessels</label>
      <input id="vessel-search" type="search" class="input-dark sm:w-56" placeholder="Search name, flag, destination…" bind:value={query} />
      <label class="sr-only" for="vessel-type">Filter by vessel type</label>
      <select id="vessel-type" class="input-dark sm:w-44" bind:value={typeFilter}>
        <option value="all">All vessel types</option>
        {#each Object.entries(typeLabels) as [value, label]}
          <option {value}>{label}</option>
        {/each}
      </select>
    </div>
  </div>

  {#if filtered.length === 0}
    <StateBlock state="empty" />
  {:else}
    <div class="overflow-x-auto rounded-lg border border-navy-700/60">
      <table class="table-dark min-w-[760px]">
        <thead>
          <tr>
            <th scope="col">Vessel</th>
            <th scope="col">Type</th>
            <th scope="col">Flag</th>
            <th scope="col">Status</th>
            <th scope="col">Speed</th>
            <th scope="col">Destination</th>
            <th scope="col">Operator</th>
            <th scope="col">Data</th>
          </tr>
        </thead>
        <tbody>
          {#each filtered as v (v.id)}
            <tr>
              <td class="font-semibold text-slate-100">{v.name}</td>
              <td class="capitalize text-slate-300">{v.type === 'lng' ? 'LNG' : v.type}</td>
              <td class="text-slate-400">{v.flag}</td>
              <td><span class={`inline-flex items-center gap-1.5 text-xs ${v.status === 'At anchor' ? 'text-amber-300' : 'text-emerald-300'}`}><span class="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true"></span>{v.status}</span></td>
              <td class="text-slate-300">{v.speedKn.toFixed(1)} kn</td>
              <td class="text-slate-300">{v.destination}</td>
              <td class="text-slate-400">{v.operator}</td>
              <td><DemoBadge quality={v.quality} /></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p class="mt-2 text-[11px] text-slate-500">
      Showing {filtered.length} of {vessels.length} vessels. Positions are simulated demo data, not live AIS.
    </p>
  {/if}
</section>
