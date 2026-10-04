/**
 * Provider / service layer for Hormuz Watch.
 *
 * Architecture:
 *  - `MarketData` is the single shape every UI component consumes.
 *  - `loadMarketData()` is the only entry point. It assembles the demo
 *    dataset by default and then *attempts* keyless live providers
 *    (currently: GDELT news) client-side. Any failure — network error,
 *    bad response, disabled flag — falls back to the bundled demo items
 *    for that section, and the UI keeps its DEMO badge.
 *  - Keyed providers (EIA, AIS vendors) are intentionally NOT called
 *    from the browser. They are documented in `.env.example` for a
 *    future server-side deployment.
 *
 * Data-integrity rules enforced here:
 *  - validate every external response before use (`validate.ts`)
 *  - never present demo values as live observations
 *  - every section carries source attribution + last-updated timestamp
 */

import {
  demoIncidents,
  demoInsurance,
  demoKpis,
  demoMarketIndicators,
  demoNews,
  demoOilSeries,
  demoPorts,
  demoRegions,
  demoRoutes,
  demoSource,
  demoVessels
} from './demo-data';
import type {
  DataSource,
  Incident,
  InsuranceIndicator,
  KpiDatum,
  MarketIndicator,
  NewsItem,
  OilPricePoint,
  Port,
  RegionImpact,
  ShippingRoute,
  Vessel
} from './types';
import { isGdeltResponse, toNewsItems } from './validate';

export interface MarketData {
  vessels: Vessel[];
  ports: Port[];
  routes: ShippingRoute[];
  oilSeries: OilPricePoint[];
  kpis: KpiDatum[];
  marketIndicators: MarketIndicator[];
  insurance: InsuranceIndicator[];
  news: NewsItem[];
  incidents: Incident[];
  regions: RegionImpact[];
  /** Per-section provenance shown under each panel. */
  sources: Record<string, DataSource>;
  /** When this payload was assembled (ISO 8601). */
  refreshedAt: string;
  /** True when every section is demo data. */
  allDemo: boolean;
}

function envFlag(name: 'PUBLIC_DEMO_MODE' | 'PUBLIC_GDELT_ENABLED', fallback: boolean): boolean {
  const raw = import.meta.env?.[name];
  if (raw === undefined) return fallback;
  return String(raw).toLowerCase() === 'true';
}

/** Keyless GDELT 2.1 document API — no credentials required. */
async function fetchLiveNews(): Promise<NewsItem[] | null> {
  if (!envFlag('PUBLIC_GDELT_ENABLED', true)) return null;
  try {
    const query = encodeURIComponent('(strait of hormuz) AND (oil OR tanker OR shipping)');
    const url =
      `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}` +
      `&mode=artlist&maxrecords=12&format=json&sort=datedesc`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const json: unknown = await res.json();
    if (!isGdeltResponse(json)) return null;
    const items = toNewsItems(json);
    return items.length > 0 ? items : null;
  } catch {
    // Network blocked, CORS denied, timeout, malformed payload — fall back.
    return null;
  }
}

/**
 * Assemble the full market dataset. Safe to call in the browser and at
 * build time. Never throws — worst case returns the full demo dataset.
 */
export async function loadMarketData(): Promise<MarketData> {
  const demoMode = envFlag('PUBLIC_DEMO_MODE', true);
  const refreshedAt = new Date().toISOString();

  let news = demoNews;
  let newsSource: DataSource = demoSource('Demo news wire');
  let allDemo = true;

  if (!demoMode) {
    const live = await fetchLiveNews();
    if (live) {
      news = live;
      newsSource = {
        name: 'GDELT Project 2.1 API',
        url: 'https://www.gdeltproject.org/',
        lastUpdated: refreshedAt,
        quality: 'live',
        note: 'Live headlines via the keyless GDELT API. Headlines only — not verified reporting.'
      };
      allDemo = false;
    }
  }

  return {
    vessels: demoVessels,
    ports: demoPorts,
    routes: demoRoutes,
    oilSeries: demoOilSeries,
    kpis: demoKpis,
    marketIndicators: demoMarketIndicators,
    insurance: demoInsurance,
    news,
    incidents: demoIncidents,
    regions: demoRegions,
    sources: {
      vessels: demoSource('Demo AIS feed'),
      ports: demoSource('Demo port directory', 'Port locations are real geography; traffic figures are illustrative.'),
      routes: demoSource('Demo route model'),
      oil: demoSource('Simulated price series'),
      kpis: demoSource('Demo KPI bundle'),
      markets: demoSource('Demo market desk'),
      insurance: demoSource('Demo insurance desk'),
      news: newsSource,
      incidents: demoSource('Illustrative scenario log', 'Scenarios are fictional and for UI demonstration only.'),
      regions: demoSource('Demo regional model')
    },
    refreshedAt,
    allDemo
  };
}

/** Synchronous build-time accessor — always the demo dataset. */
export function getStaticMarketData(): MarketData {
  const refreshedAt = new Date().toISOString();
  return {
    vessels: demoVessels,
    ports: demoPorts,
    routes: demoRoutes,
    oilSeries: demoOilSeries,
    kpis: demoKpis,
    marketIndicators: demoMarketIndicators,
    insurance: demoInsurance,
    news: demoNews,
    incidents: demoIncidents,
    regions: demoRegions,
    sources: {
      vessels: demoSource('Demo AIS feed'),
      ports: demoSource('Demo port directory'),
      routes: demoSource('Demo route model'),
      oil: demoSource('Simulated price series'),
      kpis: demoSource('Demo KPI bundle'),
      markets: demoSource('Demo market desk'),
      insurance: demoSource('Demo insurance desk'),
      news: demoSource('Demo news wire'),
      incidents: demoSource('Illustrative scenario log'),
      regions: demoSource('Demo regional model')
    },
    refreshedAt,
    allDemo: true
  };
}
