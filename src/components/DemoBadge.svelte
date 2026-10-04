<script lang="ts">
  import type { DataQuality } from '../lib/types';
  import { QUALITY_LABELS } from '../lib/types';

  interface Props {
    quality: DataQuality;
    /** Extra context shown in the tooltip. */
    note?: string;
  }

  const { quality, note }: Props = $props();

  const styles: Record<DataQuality, string> = {
    live: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40',
    historical: 'bg-sky-500/15 text-sky-300 border-sky-400/40',
    estimate: 'bg-amber-500/15 text-amber-300 border-amber-400/40',
    simulated: 'bg-amber-500/15 text-amber-300 border-amber-400/40'
  };

  const dot: Record<DataQuality, string> = {
    live: 'bg-emerald-400 animate-pulse',
    historical: 'bg-sky-400',
    estimate: 'bg-amber-400',
    simulated: 'bg-amber-400'
  };

  const title =
    note ??
    (quality === 'live'
      ? 'Live observation from a public source'
      : quality === 'historical'
        ? 'Historical record'
        : quality === 'estimate'
          ? 'Model-based estimate, not a measurement'
          : 'Simulated demonstration data — not real');
</script>

<span
  class={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-widest ${styles[quality]}`}
  title={title}
  aria-label={`Data quality: ${QUALITY_LABELS[quality]}`}
>
  <span class={`h-1.5 w-1.5 rounded-full ${dot[quality]}`} aria-hidden="true"></span>
  {QUALITY_LABELS[quality]}
</span>
