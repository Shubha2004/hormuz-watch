<script lang="ts">
  import { onMount } from 'svelte';
  import type { OilPricePoint } from '../lib/types';
  import { formatDate } from '../lib/format';

  interface Props {
    series: OilPricePoint[];
    title?: string;
  }

  const { series, title = 'Crude benchmarks — illustrative simulated series' }: Props = $props();

  const RANGES = [30, 90, 365] as const;
  let range = $state<90 | 30 | 365>(90);
  let canvas: HTMLCanvasElement | null = $state(null);
  let loadError = $state<string | null>(null);
  let chart: any = null;

  const sliced = $derived(series.slice(-range));

  function render() {
    if (!canvas || !chart) return;
    chart.data.labels = sliced.map((p) => formatDate(p.date));
    chart.data.datasets[0].data = sliced.map((p) => p.brent);
    chart.data.datasets[1].data = sliced.map((p) => p.wti);
    chart.update();
  }

  $effect(() => {
    void range;
    render();
  });

  onMount(async () => {
    try {
      const mod = await import('chart.js');
      const { Chart, registerables } = mod as any;
      Chart.register(...registerables);
      if (!canvas) return;

      Chart.defaults.color = '#94a3b8';
      Chart.defaults.borderColor = 'rgba(31, 68, 121, 0.5)';
      Chart.defaults.font.family = 'Inter, system-ui, sans-serif';

      chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Brent (simulated $/bbl)',
              data: [],
              borderColor: '#22d3ee',
              backgroundColor: 'rgba(34, 211, 238, 0.12)',
              fill: true,
              tension: 0.25,
              pointRadius: 0,
              pointHoverRadius: 4,
              borderWidth: 2
            },
            {
              label: 'WTI (simulated $/bbl)',
              data: [],
              borderColor: '#fbbf24',
              backgroundColor: 'rgba(251, 191, 36, 0.08)',
              fill: true,
              tension: 0.25,
              pointRadius: 0,
              pointHoverRadius: 4,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'top', align: 'end', labels: { boxWidth: 12, usePointStyle: true } },
            tooltip: {
              backgroundColor: '#0c1830',
              borderColor: '#1f4479',
              borderWidth: 1,
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              padding: 10,
              callbacks: {
                label: (ctx: any) => ` ${ctx.dataset.label}: $${Number(ctx.parsed.y).toFixed(2)}`
              }
            }
          },
          scales: {
            x: { ticks: { maxTicksLimit: 8, maxRotation: 0 } },
            y: { ticks: { callback: (v: any) => `$${v}` } }
          }
        }
      });
      render();
    } catch (err) {
      loadError = err instanceof Error ? err.message : 'Chart failed to load';
    }
    return () => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    };
  });
</script>

<div class="panel panel-pad">
  <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
    <h3 class="card-title">{title}</h3>
    <div class="flex gap-1" role="group" aria-label="Time range">
      {#each RANGES as r}
        <button
          type="button"
          onclick={() => (range = r)}
          aria-pressed={range === r}
          class={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            range === r ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'border border-navy-600 text-slate-400 hover:text-slate-200'
          }`}
        >
          {r}D
        </button>
      {/each}
    </div>
  </div>
  {#if loadError}
    <p class="py-8 text-center text-sm text-red-300" role="alert">Chart failed to load: {loadError}</p>
  {:else}
    <div class="relative h-64 sm:h-80" role="img" aria-label="Line chart of simulated Brent and WTI prices">
      <canvas bind:this={canvas}></canvas>
    </div>
  {/if}
  <p class="mt-2 text-[11px] text-slate-500">Simulated series for interface demonstration — not market data.</p>
</div>
