/**
 * Demo dataset for Hormuz Watch.
 *
 * EVERYTHING in this file is demonstration data. It is synthetic,
 * illustrative, and must never be presented as real-time fact.
 * Each record carries `quality: 'simulated'` (or 'estimate' where
 * noted) and every UI panel renders a DEMO badge for this dataset.
 *
 * Vessel names are fictional. Ports are real geographic locations
 * (public knowledge). Oil prices are a deterministic synthetic series
 * generated with a seeded PRNG — they are illustrative, not market data.
 * Incident timeline entries are illustrative scenarios, not real events.
 */

import type {
  BlogPost,
  DataSource,
  FaqItem,
  GlossaryTerm,
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

const DEMO_UPDATED = '2026-10-04T12:00:00Z';

export function demoSource(name: string, note?: string): DataSource {
  return {
    name,
    url: '/methodology',
    lastUpdated: DEMO_UPDATED,
    quality: 'simulated',
    note: note ?? 'Demonstration dataset bundled with the app. Not real-time data.'
  };
}

/* ------------------------------------------------------------------ */
/* Vessels — fictional names, illustrative positions                   */
/* ------------------------------------------------------------------ */

export const demoVessels: Vessel[] = [
  { id: 'v-01', name: 'GULF PIONEER', type: 'tanker', flag: 'Panama', lat: 26.42, lng: 56.38, speedKn: 11.2, courseDeg: 96, destination: 'SINGAPORE', status: 'Underway', operator: 'Meridian Tankers (demo)', dwt: 158000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-02', name: 'STRAIT SENTINEL', type: 'lng', flag: 'Marshall Islands', lat: 26.31, lng: 56.12, speedKn: 13.8, courseDeg: 275, destination: 'RAS LAFFAN', status: 'Underway', operator: 'Northwind Gas (demo)', dwt: 84000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-03', name: 'PEARL HORIZON', type: 'container', flag: 'Liberia', lat: 26.55, lng: 56.62, speedKn: 16.4, courseDeg: 102, destination: 'JEBEL ALI', status: 'Underway', operator: 'Pearl Line (demo)', dwt: 95000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-04', name: 'DESERT CARRIER', type: 'bulk', flag: 'Malta', lat: 26.18, lng: 56.45, speedKn: 9.6, courseDeg: 88, destination: 'FUJAIRAH', status: 'Underway', operator: 'Desert Bulk (demo)', dwt: 76000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-05', name: 'CORAL ENDEAVOUR', type: 'tanker', flag: 'Greece', lat: 26.47, lng: 56.05, speedKn: 0.4, courseDeg: 0, destination: 'KHARG ISLAND', status: 'At anchor', operator: 'Aegean Freight (demo)', dwt: 320000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-06', name: 'NORTHERN LIGHT', type: 'lng', flag: 'Bahamas', lat: 26.22, lng: 56.71, speedKn: 12.1, courseDeg: 110, destination: 'DAHEJ', status: 'Underway', operator: 'Northwind Gas (demo)', dwt: 92000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-07', name: 'SAFFRON TRADER', type: 'general', flag: 'India', lat: 26.62, lng: 56.31, speedKn: 10.8, courseDeg: 268, destination: 'BANDAR ABBAS', status: 'Underway', operator: 'Saffron Shipping (demo)', dwt: 28000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-08', name: 'ONYX VOYAGER', type: 'tanker', flag: 'Singapore', lat: 26.35, lng: 56.9, speedKn: 12.9, courseDeg: 95, destination: 'ROTTERDAM', status: 'Underway', operator: 'Onyx Maritime (demo)', dwt: 159000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-09', name: 'TIDEWATER STAR', type: 'container', flag: 'Portugal', lat: 26.12, lng: 56.28, speedKn: 15.2, courseDeg: 282, destination: 'MUNDRA', status: 'Underway', operator: 'Tidewater Lines (demo)', dwt: 110000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-10', name: 'GOLDEN DUNE', type: 'bulk', flag: 'Cyprus', lat: 26.5, lng: 56.48, speedKn: 0.2, courseDeg: 0, destination: 'JEBEL ALI', status: 'At anchor', operator: 'Desert Bulk (demo)', dwt: 63000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-11', name: 'AZURE CURRENT', type: 'tanker', flag: 'Norway', lat: 26.28, lng: 56.22, speedKn: 11.7, courseDeg: 91, destination: 'YOKOHAMA', status: 'Underway', operator: 'Fjord Tankers (demo)', dwt: 157000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-12', name: 'MONSOON RELIANCE', type: 'lng', flag: 'Hong Kong', lat: 26.44, lng: 56.74, speedKn: 13.2, courseDeg: 104, destination: 'INCHEON', status: 'Underway', operator: 'Monsoon Energy (demo)', dwt: 88000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-13', name: 'COBALT MERIDIAN', type: 'container', flag: 'Denmark', lat: 26.16, lng: 56.55, speedKn: 14.6, courseDeg: 276, destination: 'KARACHI', status: 'Underway', operator: 'Cobalt Line (demo)', dwt: 88000, lastUpdate: DEMO_UPDATED, quality: 'simulated' },
  { id: 'v-14', name: 'DUNE FALCON', type: 'tanker', flag: 'UAE', lat: 26.58, lng: 56.18, speedKn: 8.4, courseDeg: 85, destination: 'FUJAIRAH', status: 'Underway', operator: 'Falcon Bunkering (demo)', dwt: 45000, lastUpdate: DEMO_UPDATED, quality: 'simulated' }
];

/* ------------------------------------------------------------------ */
/* Ports — real geographic locations (public knowledge)                */
/* ------------------------------------------------------------------ */

export const demoPorts: Port[] = [
  { id: 'p-01', name: 'Bandar Abbas', country: 'Iran', lat: 27.18, lng: 56.27, kind: 'multipurpose' },
  { id: 'p-02', name: 'Jebel Ali', country: 'UAE', lat: 25.01, lng: 55.06, kind: 'container' },
  { id: 'p-03', name: 'Fujairah', country: 'UAE', lat: 25.12, lng: 56.34, kind: 'oil-terminal' },
  { id: 'p-04', name: 'Ras Tanura', country: 'Saudi Arabia', lat: 26.64, lng: 50.16, kind: 'oil-terminal' },
  { id: 'p-05', name: 'Ras Laffan', country: 'Qatar', lat: 25.91, lng: 51.58, kind: 'oil-terminal' },
  { id: 'p-06', name: 'Mina Al Ahmadi', country: 'Kuwait', lat: 29.08, lng: 48.17, kind: 'oil-terminal' },
  { id: 'p-07', name: 'Khor Fakkan', country: 'UAE', lat: 25.35, lng: 56.36, kind: 'container' },
  { id: 'p-08', name: 'Chabahar', country: 'Iran', lat: 25.3, lng: 60.64, kind: 'multipurpose' }
];

/* ------------------------------------------------------------------ */
/* Shipping routes                                                     */
/* ------------------------------------------------------------------ */

export const demoRoutes: ShippingRoute[] = [
  {
    id: 'r-01',
    name: 'Gulf Crude Export Corridor',
    code: 'GCC-01',
    waypoints: [[26.6, 50.2], [26.45, 52.5], [26.35, 54.8], [26.3, 56.3], [25.9, 57.5], [25.3, 59.0]],
    description: 'Primary outbound lane for crude carriers loading at Gulf terminals, transiting the strait eastbound toward Asian and European markets.',
    weeklyTransitsEstimate: 118,
    primaryCargo: 'Crude oil',
    riskLevel: 'elevated',
    quality: 'simulated'
  },
  {
    id: 'r-02',
    name: 'LNG Eastbound Lane',
    code: 'LNG-02',
    waypoints: [[25.9, 51.6], [26.2, 53.5], [26.35, 55.5], [26.4, 56.6], [25.8, 58.2], [24.9, 60.5]],
    description: 'Dedicated LNG carrier routing from Qatari export terminals to buyers in South and East Asia.',
    weeklyTransitsEstimate: 34,
    primaryCargo: 'Liquefied natural gas',
    riskLevel: 'moderate',
    quality: 'simulated'
  },
  {
    id: 'r-03',
    name: 'Container Feeder Loop',
    code: 'CNT-03',
    waypoints: [[25.0, 55.1], [25.6, 55.9], [26.2, 56.4], [26.55, 56.7], [25.35, 56.4]],
    description: 'Short-sea container shuttle connecting Jebel Ali and Khor Fakkan with regional feeder ports.',
    weeklyTransitsEstimate: 62,
    primaryCargo: 'Containerised goods',
    riskLevel: 'low',
    quality: 'simulated'
  },
  {
    id: 'r-04',
    name: 'Westbound Product Return',
    code: 'PRD-04',
    waypoints: [[24.9, 60.5], [25.8, 58.2], [26.3, 56.3], [26.5, 54.0], [26.7, 51.8], [26.64, 50.16]],
    description: 'Westbound lane for refined product carriers and ballast tankers returning to Gulf loading terminals.',
    weeklyTransitsEstimate: 96,
    primaryCargo: 'Refined products / ballast',
    riskLevel: 'moderate',
    quality: 'simulated'
  }
];

/* ------------------------------------------------------------------ */
/* Oil prices — deterministic synthetic series (NOT market data)        */
/* ------------------------------------------------------------------ */

function seededRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 365-day illustrative series. Clearly simulated — never market data. */
export function buildDemoOilSeries(days = 365): OilPricePoint[] {
  const rand = seededRandom(20261004);
  const points: OilPricePoint[] = [];
  let brent = 78.4;
  let wti = 74.1;
  const end = new Date('2026-10-04T00:00:00Z');
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - i);
    // Mean-reverting random walk with a mild "tension premium" hump mid-series
    const hump = 9 * Math.exp(-Math.pow((i - 200) / 55, 2));
    brent += (rand() - 0.5) * 2.4 + (78 + hump - brent) * 0.02;
    wti += (rand() - 0.5) * 2.2 + (brent - 4.2 - wti) * 0.05;
    points.push({
      date: d.toISOString().slice(0, 10),
      brent: Math.round(brent * 100) / 100,
      wti: Math.round(wti * 100) / 100
    });
  }
  return points;
}

export const demoOilSeries: OilPricePoint[] = buildDemoOilSeries();

/* ------------------------------------------------------------------ */
/* KPI cards                                                           */
/* ------------------------------------------------------------------ */

export const demoKpis: KpiDatum[] = [
  {
    id: 'kpi-vessels',
    label: 'Vessels in Strait (24h)',
    value: '214',
    delta: '+3.1% vs prior 24h',
    deltaDirection: 'up',
    quality: 'simulated',
    source: demoSource('Demo AIS feed'),
    hint: 'Illustrative vessel count for the strait transit zone.'
  },
  {
    id: 'kpi-traffic',
    label: 'Est. Weekly Transits',
    value: '310',
    delta: '-1.9% vs 4-wk avg',
    deltaDirection: 'down',
    quality: 'estimate',
    source: demoSource('Demo traffic model', 'Estimate derived from the demo route model.'),
    hint: 'Model-based estimate, not an observed count.'
  },
  {
    id: 'kpi-brent',
    label: 'Brent (illustrative)',
    value: '$84.62',
    delta: '+1.4% on day',
    deltaDirection: 'up',
    quality: 'simulated',
    source: demoSource('Simulated price series'),
    hint: 'Simulated series for UI demonstration only.'
  },
  {
    id: 'kpi-risk',
    label: 'Shipping Risk Index',
    value: 'Elevated',
    delta: 'Unchanged this week',
    deltaDirection: 'flat',
    quality: 'estimate',
    source: demoSource('Demo risk model'),
    hint: 'Composite of illustrative incident and insurance inputs.'
  },
  {
    id: 'kpi-insurance',
    label: 'War-Risk Premium (illustrative)',
    value: '0.55%',
    delta: '+0.05 pts this week',
    deltaDirection: 'up',
    quality: 'estimate',
    source: demoSource('Demo insurance desk'),
    hint: 'Illustrative hull war-risk indication, not a quote.'
  }
];

export const demoMarketIndicators: MarketIndicator[] = [
  { id: 'm-1', label: 'Brent crude (illustrative)', value: '$84.62 / bbl', changePct: 1.4, quality: 'simulated', source: demoSource('Simulated price series') },
  { id: 'm-2', label: 'WTI crude (illustrative)', value: '$80.31 / bbl', changePct: 1.1, quality: 'simulated', source: demoSource('Simulated price series') },
  { id: 'm-3', label: 'Tanker spot rates — VLCC (illustrative)', value: 'WS 68', changePct: 2.3, quality: 'estimate', source: demoSource('Demo freight model') },
  { id: 'm-4', label: 'LNG spot — JKM (illustrative)', value: '$11.20 / mmBtu', changePct: -0.8, quality: 'estimate', source: demoSource('Demo freight model') },
  { id: 'm-5', label: 'Bunker fuel — Fujairah VLSFO (illustrative)', value: '$592 / t', changePct: 0.6, quality: 'estimate', source: demoSource('Demo bunker model') }
];

export const demoInsurance: InsuranceIndicator[] = [
  { id: 'i-1', label: 'Hull war-risk premium', value: '0.55% of hull value', detail: 'Illustrative indication for a standard VLCC transit. Not a quote.', trend: 'up', quality: 'estimate', source: demoSource('Demo insurance desk') },
  { id: 'i-2', label: 'Additional premium — 7-day cover', value: '0.12%', detail: 'Illustrative short-period additional premium indication.', trend: 'flat', quality: 'estimate', source: demoSource('Demo insurance desk') },
  { id: 'i-3', label: 'Kidnap & ransom — crew cover', value: 'Stable', detail: 'Illustrative status; no change in the demo scenario this week.', trend: 'flat', quality: 'estimate', source: demoSource('Demo insurance desk') },
  { id: 'i-4', label: 'Loss-of-hire waiting time', value: '14 days deductible', detail: 'Illustrative market-standard deductible in the demo scenario.', trend: 'flat', quality: 'estimate', source: demoSource('Demo insurance desk') }
];

/* ------------------------------------------------------------------ */
/* News & incidents — illustrative, clearly labeled                    */
/* ------------------------------------------------------------------ */

export const demoNews: NewsItem[] = [
  { id: 'n-1', title: 'Demo: Tanker traffic holds steady through strait transit zone', summary: 'Illustrative report — vessel counts in the demo feed remain within the normal weekly band.', source: 'Hormuz Watch Demo Wire', url: '/news', publishedAt: '2026-10-03T09:15:00Z', category: 'shipping', quality: 'simulated' },
  { id: 'n-2', title: 'Demo: Regional insurers review war-risk pricing assumptions', summary: 'Illustrative report — underwriters in the demo scenario cite stable but elevated risk pricing.', source: 'Hormuz Watch Demo Wire', url: '/news', publishedAt: '2026-10-02T14:40:00Z', category: 'insurance', quality: 'simulated' },
  { id: 'n-3', title: 'Demo: LNG carriers maintain scheduled eastbound sailings', summary: 'Illustrative report — no demo-scenario diversions recorded on the LNG lane this week.', source: 'Hormuz Watch Demo Wire', url: '/news', publishedAt: '2026-10-01T11:05:00Z', category: 'energy', quality: 'simulated' },
  { id: 'n-4', title: 'Demo: Port authority issues seasonal traffic advisory', summary: 'Illustrative notice — demo port authority reminds operators of monsoon-season routing guidance.', source: 'Hormuz Watch Demo Wire', url: '/news', publishedAt: '2026-09-30T08:20:00Z', category: 'shipping', quality: 'simulated' },
  { id: 'n-5', title: 'Demo: Bunker prices edge higher at regional hub', summary: 'Illustrative market note — demo bunker model shows a modest weekly increase.', source: 'Hormuz Watch Demo Wire', url: '/news', publishedAt: '2026-09-29T16:55:00Z', category: 'energy', quality: 'simulated' },
  { id: 'n-6', title: 'Demo: Naval exercise announced in adjacent waters', summary: 'Illustrative scenario — a scheduled exercise in the demo dataset prompts a routing advisory.', source: 'Hormuz Watch Demo Wire', url: '/news', publishedAt: '2026-09-28T10:30:00Z', category: 'geopolitics', quality: 'simulated' },
  { id: 'n-7', title: 'Demo: Container feeder loop adds weekly sailing', summary: 'Illustrative report — demo operator adds capacity on the short-sea loop.', source: 'Hormuz Watch Demo Wire', url: '/news', publishedAt: '2026-09-27T13:12:00Z', category: 'shipping', quality: 'simulated' },
  { id: 'n-8', title: 'Demo: Analysts model disruption scenarios for energy markets', summary: 'Illustrative analysis — demo scenario modelling, not a forecast of real events.', source: 'Hormuz Watch Demo Wire', url: '/news', publishedAt: '2026-09-26T09:48:00Z', category: 'energy', quality: 'simulated' }
];

export const demoIncidents: Incident[] = [
  { id: 'e-1', date: '2026-09-28', title: 'Illustrative scenario: naval exercise advisory', description: 'Demo scenario — a published exercise area prompts a temporary routing advisory in the demo dataset.', severity: 'moderate', location: 'Gulf of Oman (demo)', quality: 'simulated' },
  { id: 'e-2', date: '2026-09-14', title: 'Illustrative scenario: GPS interference reports', description: 'Demo scenario — simulated reports of navigation-signal degradation near the transit zone.', severity: 'elevated', location: 'Strait of Hormuz (demo)', quality: 'simulated' },
  { id: 'e-3', date: '2026-08-30', title: 'Illustrative scenario: minor machinery breakdown', description: 'Demo scenario — a bulk carrier in the demo feed reports a machinery issue and anchors safely.', severity: 'low', location: 'Fujairah anchorage (demo)', quality: 'simulated' },
  { id: 'e-4', date: '2026-08-11', title: 'Illustrative scenario: insurance pricing review', description: 'Demo scenario — underwriters reassess indicative war-risk pricing after regional developments.', severity: 'moderate', location: 'London market (demo)', quality: 'simulated' },
  { id: 'e-5', date: '2026-07-22', title: 'Illustrative scenario: traffic separation scheme update', description: 'Demo scenario — simulated update to lane guidance published by a demo authority.', severity: 'low', location: 'Strait of Hormuz (demo)', quality: 'simulated' },
  { id: 'e-6', date: '2026-07-02', title: 'Illustrative scenario: small-craft approach report', description: 'Demo scenario — a merchant vessel in the demo feed reports a close approach; no contact made.', severity: 'elevated', location: 'Strait of Hormuz (demo)', quality: 'simulated' },
  { id: 'e-7', date: '2026-06-15', title: 'Illustrative scenario: bunker spill drill', description: 'Demo scenario — scheduled pollution-response drill at a demo terminal.', severity: 'low', location: 'Fujairah (demo)', quality: 'simulated' },
  { id: 'e-8', date: '2026-05-29', title: 'Illustrative scenario: detention for inspection', description: 'Demo scenario — a tanker in the demo feed is briefly held for a routine port-state inspection.', severity: 'moderate', location: 'Bandar Abbas (demo)', quality: 'simulated' }
];

/* ------------------------------------------------------------------ */
/* Regional analysis                                                   */
/* ------------------------------------------------------------------ */

export const demoRegions: RegionImpact[] = [
  {
    id: 'rg-1', region: 'GCC Exporters', exposure: 'Direct',
    impactSummary: 'Demo assessment — Gulf exporters ship the majority of crude through the strait; any disruption scenario hits loadings first.',
    riskLevel: 'elevated',
    keyStats: [
      { label: 'Share of exports via strait (demo est.)', value: '~85%' },
      { label: 'Key terminals', value: 'Ras Tanura, Mina Al Ahmadi' }
    ],
    quality: 'estimate'
  },
  {
    id: 'rg-2', region: 'South Asia', exposure: 'High',
    impactSummary: 'Demo assessment — major crude and LNG import dependence makes regional refineries sensitive to freight spikes.',
    riskLevel: 'elevated',
    keyStats: [
      { label: 'Import dependence (demo est.)', value: 'High' },
      { label: 'Key buyers', value: 'India, Pakistan' }
    ],
    quality: 'estimate'
  },
  {
    id: 'rg-3', region: 'East Asia', exposure: 'High',
    impactSummary: 'Demo assessment — long-haul buyers face the largest absolute freight exposure on Gulf–Asia lanes.',
    riskLevel: 'moderate',
    keyStats: [
      { label: 'Voyage length (demo est.)', value: '~6,500 nm' },
      { label: 'Key buyers', value: 'China, Japan, South Korea' }
    ],
    quality: 'estimate'
  },
  {
    id: 'rg-4', region: 'Europe', exposure: 'Moderate',
    impactSummary: 'Demo assessment — Suez-routed cargoes add canal exposure; Atlantic alternatives lengthen voyages materially.',
    riskLevel: 'moderate',
    keyStats: [
      { label: 'Alternative routing', value: 'Cape of Good Hope' },
      { label: 'Extra steaming (demo est.)', value: '+12–15 days' }
    ],
    quality: 'estimate'
  },
  {
    id: 'rg-5', region: 'Iran', exposure: 'Direct',
    impactSummary: 'Demo assessment — Kharg Island exports and Bandar Abbas container traffic sit at the strait’s northern shore.',
    riskLevel: 'high',
    keyStats: [
      { label: 'Key terminal', value: 'Kharg Island' },
      { label: 'Key port', value: 'Bandar Abbas' }
    ],
    quality: 'estimate'
  },
  {
    id: 'rg-6', region: 'United States', exposure: 'Indirect',
    impactSummary: 'Demo assessment — limited direct import exposure, but global benchmark pricing transmits shocks quickly.',
    riskLevel: 'low',
    keyStats: [
      { label: 'Price transmission', value: 'Via Brent/WTI' },
      { label: 'Strategic reserve', value: 'Policy buffer (demo note)' }
    ],
    quality: 'estimate'
  }
];

/* ------------------------------------------------------------------ */
/* FAQ & glossary                                                      */
/* ------------------------------------------------------------------ */

export const demoFaq: FaqItem[] = [
  { question: 'Is the data on Hormuz Watch real-time?', answer: 'No. Unless a panel is explicitly marked LIVE, all figures on this site are demonstration data — simulated or estimated values bundled with the app so you can explore the interface. Every panel shows its data quality and source. See the Methodology page for details.' },
  { question: 'Why is the Strait of Hormuz strategically important?', answer: 'The strait is the only sea passage from the Persian Gulf to the open ocean. A large share of globally traded crude oil and liquefied natural gas passes through it, so disruptions here move energy prices worldwide.' },
  { question: 'What does "war-risk premium" mean?', answer: 'When underwriters consider a region riskier, they charge an additional premium on hull and cargo insurance for transits. Higher premiums raise the delivered cost of oil and goods. Figures shown here are illustrative estimates, not quotes.' },
  { question: 'What is AIS?', answer: 'The Automatic Identification System broadcasts a vessel’s identity, position, course and speed. Public AIS aggregators are the usual source for vessel-tracking dashboards; this demo uses fictional vessels instead of real AIS data.' },
  { question: 'What is a VLCC?', answer: 'A Very Large Crude Carrier — a tanker class of roughly 200,000–320,000 deadweight tonnes, the workhorse of long-haul crude transport from the Gulf.' },
  { question: 'How should I interpret the risk index?', answer: 'As a demonstration composite only. In a production deployment it would blend incident frequency, insurance pricing and traffic anomalies. Here it is a static illustrative value.' },
  { question: 'Can I use this data for trading or navigation decisions?', answer: 'Absolutely not. All data here is simulated for demonstration. Never use it for commercial, navigational or safety-critical decisions.' },
  { question: 'How do I connect real data sources?', answer: 'See the Methodology page and .env.example. The provider layer is designed so real APIs (e.g. EIA for oil prices, AIS providers for vessels) can be plugged in behind the same interface.' }
];

export const demoGlossary: GlossaryTerm[] = [
  { term: 'AIS', definition: 'Automatic Identification System — broadcasts vessel identity, position, course and speed.' },
  { term: 'Ballast', definition: 'Seawater taken on for stability when a tanker sails without cargo.' },
  { term: 'Bunker fuel', definition: 'Fuel oil consumed by ships; VLSFO is the common low-sulphur grade.' },
  { term: 'Deadweight tonnage (DWT)', definition: 'Total weight a ship can safely carry, including cargo, fuel and stores.' },
  { term: 'Demurrage', definition: 'Charges payable when a chartered vessel is delayed beyond agreed laytime.' },
  { term: 'Estimated time of arrival (ETA)', definition: 'Projected arrival time at the next port or waypoint.' },
  { term: 'JKM', definition: 'Japan-Korea Marker — the benchmark price for spot LNG in Northeast Asia.' },
  { term: 'Knot (kn)', definition: 'Nautical mile per hour; the standard unit of vessel speed.' },
  { term: 'LNG', definition: 'Liquefied natural gas — natural gas cooled to liquid for ocean transport.' },
  { term: 'P&I Club', definition: 'Mutual insurance association covering shipowners’ third-party liabilities.' },
  { term: 'Strait of Hormuz', definition: 'Narrow strait between Iran and Oman linking the Persian Gulf to the Gulf of Oman.' },
  { term: 'TSS', definition: 'Traffic Separation Scheme — charted lanes separating opposing traffic flows.' },
  { term: 'VLCC', definition: 'Very Large Crude Carrier — tanker class of ~200,000–320,000 DWT.' },
  { term: 'War-risk premium', definition: 'Additional insurance charge for transiting areas underwriters deem risky.' },
  { term: 'Worldscale (WS)', definition: 'Index system for quoting tanker freight rates as a percentage of a nominal flat rate.' },
  { term: 'WTI', definition: 'West Texas Intermediate — the US crude-oil benchmark grade.' }
];

/* ------------------------------------------------------------------ */
/* Blog posts                                                          */
/* ------------------------------------------------------------------ */

export const demoPosts: BlogPost[] = [
  {
    slug: 'how-war-risk-insurance-works',
    title: 'How War-Risk Insurance Pricing Works for Strait Transits',
    excerpt: 'A plain-language explainer of additional premiums, 7-day covers and why underwriters watch the strait so closely.',
    date: '2026-09-20',
    author: 'Hormuz Watch Editorial',
    tags: ['Insurance', 'Explainer'],
    readingMinutes: 6,
    bodyHtml: `<p>When a merchant vessel transits an area that marine underwriters consider risky, the standard hull policy is not enough. Shipowners buy <strong>war-risk cover</strong> — an additional premium, usually quoted as a percentage of the vessel's insured value, for a defined period (often in 7-day blocks).</p><p>The price moves with perceived risk: regional tension, incident reports and naval activity all feed into underwriters' assessments. A higher premium does not just affect the shipowner — it is passed through the charter chain and ultimately raises the delivered cost of crude, LNG and containerised goods.</p><p><strong>Important:</strong> every insurance figure on this site is an illustrative estimate for demonstration. Real premiums are negotiated privately between brokers and underwriters and are never published on a dashboard like this one.</p><h3>Key terms</h3><ul><li><strong>Additional premium (AP):</strong> the extra charge for a listed area transit.</li><li><strong>Breach of warranty:</strong> entering a listed area without the required cover can void the policy.</li><li><strong>Loss of hire:</strong> separate cover for earnings lost while a vessel is delayed.</li></ul>`
  },
  {
    slug: 'reading-ais-data',
    title: 'Reading AIS Data: What Vessel Trackers Actually Show',
    excerpt: 'Speed, course, draught and destination — what each AIS field means and where the data can mislead.',
    date: '2026-09-06',
    author: 'Hormuz Watch Editorial',
    tags: ['Shipping', 'Data literacy'],
    readingMinutes: 7,
    bodyHtml: `<p>The Automatic Identification System (AIS) was designed for collision avoidance, not for public intelligence dashboards — but its open broadcasts make it the backbone of commercial vessel tracking.</p><p>Each broadcast includes the vessel's <strong>MMSI identity</strong>, position, <strong>speed over ground</strong>, <strong>course</strong>, and a manually entered <strong>destination</strong> — that last field is typed by the crew and is frequently outdated or aspirational, so treat it with scepticism.</p><p>Gaps in coverage are normal: terrestrial receivers have limited range, and satellite AIS has revisit delays. A vessel "disappearing" from a tracker usually means a coverage gap, not an incident.</p><p><strong>Note:</strong> the vessel markers on this site are fictional demonstration data, not real AIS positions.</p>`
  },
  {
    slug: 'strait-geography-chokepoint',
    title: 'The Strait as a Chokepoint: Geography in 5 Minutes',
    excerpt: 'Why 33 kilometres of water between Iran and Oman shape global energy markets.',
    date: '2026-08-22',
    author: 'Hormuz Watch Editorial',
    tags: ['Geography', 'Explainer'],
    readingMinutes: 5,
    bodyHtml: `<p>At its narrowest, the Strait of Hormuz is about <strong>33 kilometres wide</strong>, with shipping lanes just a few kilometres across in each direction under the traffic separation scheme. It is the only sea route out of the Persian Gulf.</p><p>Roughly a fifth of the world's petroleum liquids have historically transited the strait, alongside a large share of global LNG trade — mostly from Qatar. There is no practical alternative: pipelines bypassing the strait exist but carry a fraction of the volume, and rerouting around Africa adds weeks to voyages.</p><p>That concentration is what makes the strait a <strong>chokepoint</strong>: a narrow passage whose disruption propagates through energy prices, freight rates and insurance markets within hours.</p>`
  },
  {
    slug: 'disruption-scenario-modelling',
    title: 'How Analysts Model a Strait Disruption Scenario',
    excerpt: 'From partial closures to full blockades — the framework behind the headlines, and its limits.',
    date: '2026-08-08',
    author: 'Hormuz Watch Editorial',
    tags: ['Analysis', 'Methodology'],
    readingMinutes: 8,
    bodyHtml: `<p>Energy analysts model strait disruptions in <strong>scenarios</strong>, not predictions: a 7-day partial restriction, a 30-day severe disruption, and a full closure. Each scenario feeds assumptions about rerouting, strategic reserve releases and demand response into price models.</p><p>The outputs are wide ranges, not point forecasts — and they depend critically on assumptions about duration, which is the least knowable variable. Treat any precise "oil at $X" headline as illustrative.</p><p><strong>Our approach:</strong> this site does not publish disruption forecasts. The regional impact summaries are labelled estimates describing exposure, not predictions of events.</p>`
  }
];

export function getPost(slug: string): BlogPost | undefined {
  return demoPosts.find((p) => p.slug === slug);
}
