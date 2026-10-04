<script lang="ts">
  import type { RiskLevel } from '../lib/types';

  interface Props {
    level: RiskLevel;
  }

  const { level }: Props = $props();

  const styles: Record<RiskLevel, string> = {
    low: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40',
    moderate: 'bg-sky-500/15 text-sky-300 border-sky-400/40',
    elevated: 'bg-amber-500/15 text-amber-300 border-amber-400/40',
    high: 'bg-red-500/15 text-red-300 border-red-400/40'
  };
</script>

<span
  class={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize ${styles[level]}`}
>
  {level}
</span>
