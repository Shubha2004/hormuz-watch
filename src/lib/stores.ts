/**
 * Client-side Svelte stores for market data.
 *
 * Pages render with static demo data at build time (guaranteed to work
 * offline). These stores power the header refresh control: `refreshData()`
 * re-runs the provider layer (attempting keyless live sources, falling
 * back to demo) and pushes the result to every subscribed component.
 */
import { writable } from 'svelte/store';
import { getStaticMarketData, loadMarketData, type MarketData } from './providers';

export type DataStatus = 'idle' | 'loading' | 'ready' | 'error';

export const marketData = writable<MarketData>(getStaticMarketData());
export const dataStatus = writable<DataStatus>('idle');
export const lastRefreshError = writable<string | null>(null);

/** Re-fetch via providers. Never throws; falls back to demo on failure. */
export async function refreshData(): Promise<void> {
  dataStatus.set('loading');
  lastRefreshError.set(null);
  try {
    const data = await loadMarketData();
    marketData.set(data);
    dataStatus.set('ready');
  } catch (err) {
    // loadMarketData is designed not to throw, but stay safe regardless.
    marketData.set(getStaticMarketData());
    lastRefreshError.set(err instanceof Error ? err.message : 'Refresh failed');
    dataStatus.set('error');
  }
}

/** True when the browser reports no network connectivity. */
export function createOnlineStore() {
  const { subscribe, set } = writable<boolean>(
    typeof navigator === 'undefined' ? true : navigator.onLine
  );
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => set(true));
    window.addEventListener('offline', () => set(false));
  }
  return { subscribe };
}

export const isOnline = createOnlineStore();
