<script lang="ts">
  interface Props {
    state: 'loading' | 'error' | 'empty' | 'offline';
    message?: string;
    onRetry?: () => void;
  }

  const { state, message, onRetry }: Props = $props();

  const copy: Record<Props['state'], { title: string; body: string }> = {
    loading: { title: 'Loading…', body: message ?? 'Fetching the latest data.' },
    error: { title: 'Something went wrong', body: message ?? 'The data could not be loaded. Please try again.' },
    empty: { title: 'No results', body: message ?? 'Nothing matches the current filters.' },
    offline: { title: 'You are offline', body: message ?? 'Showing the last loaded data. Reconnect to refresh.' }
  };

  const c = copy[state];
</script>

<div
  class="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-navy-600 bg-navy-900/50 px-6 py-10 text-center"
  role="status"
  aria-live="polite"
>
  {#if state === 'loading'}
    <span class="h-8 w-8 animate-spin rounded-full border-2 border-navy-600 border-t-cyan-400" aria-hidden="true"></span>
  {:else if state === 'error'}
    <svg class="h-8 w-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
  {:else if state === 'offline'}
    <svg class="h-8 w-8 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
  {:else}
    <svg class="h-8 w-8 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
  {/if}
  <p class="font-semibold text-slate-200">{c.title}</p>
  <p class="max-w-sm text-sm text-slate-400">{c.body}</p>
  {#if state === 'error' && onRetry}
    <button type="button" class="btn-ghost mt-2" onclick={onRetry}>Try again</button>
  {/if}
</div>
