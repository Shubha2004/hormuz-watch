/**
 * Centralized data models for Hormuz Watch.
 *
 * Every dataset carries an explicit `quality` field so the UI can
 * distinguish live observations from historical records, estimates and
 * simulated demonstration values. Nothing in the demo dataset is
 * presented as real-time fact — see `src/lib/demo-data.ts`.
 */

/** How a datum was obtained. Shown to users via the DEMO badge system. */
export type DataQuality = 'live' | 'historical' | 'estimate' | 'simulated';

export const QUALITY_LABELS: Record<DataQuality, string> = {
  live: 'LIVE',
  historical: 'HISTORICAL',
  estimate: 'ESTIMATE',
  simulated: 'SIMULATED'
};

/** Provenance shown under every data panel. */
export interface DataSource {
  name: string;
  url: string;
  lastUpdated: string; // ISO 8601
  quality: DataQuality;
  note?: string;
}

export type VesselType = 'tanker' | 'lng' | 'container' | 'bulk' | 'general';
export type RiskLevel = 'low' | 'moderate' | 'elevated' | 'high';

export interface Vessel {
  id: string;
  name: string;
  type: VesselType;
  flag: string;
  lat: number;
  lng: number;
  speedKn: number;
  courseDeg: number;
  destination: string;
  status: string;
  operator: string;
  dwt: number; // deadweight tonnage
  lastUpdate: string;
  quality: DataQuality;
}

export interface Port {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  kind: 'oil-terminal' | 'container' | 'multipurpose';
}

export interface ShippingRoute {
  id: string;
  name: string;
  code: string;
  waypoints: Array<[number, number]>; // [lat, lng]
  description: string;
  weeklyTransitsEstimate: number;
  primaryCargo: string;
  riskLevel: RiskLevel;
  quality: DataQuality;
}

export interface OilPricePoint {
  date: string; // YYYY-MM-DD
  brent: number;
  wti: number;
}

export interface MarketIndicator {
  id: string;
  label: string;
  value: string;
  changePct: number;
  quality: DataQuality;
  source: DataSource;
}

export interface InsuranceIndicator {
  id: string;
  label: string;
  value: string;
  detail: string;
  trend: 'up' | 'down' | 'flat';
  quality: DataQuality;
  source: DataSource;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  category: 'shipping' | 'energy' | 'geopolitics' | 'insurance';
  quality: DataQuality;
}

export interface Incident {
  id: string;
  date: string;
  title: string;
  description: string;
  severity: RiskLevel;
  location: string;
  quality: DataQuality;
}

export interface RegionImpact {
  id: string;
  region: string;
  exposure: string;
  impactSummary: string;
  riskLevel: RiskLevel;
  keyStats: Array<{ label: string; value: string }>;
  quality: DataQuality;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readingMinutes: number;
  /** Pre-rendered safe HTML body. */
  bodyHtml: string;
}

export interface KpiDatum {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaDirection: 'up' | 'down' | 'flat';
  quality: DataQuality;
  source: DataSource;
  hint: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Dashboard' },
  { href: '/map', label: 'Map' },
  { href: '/routes', label: 'Routes' },
  { href: '/vessels', label: 'Vessels' },
  { href: '/oil', label: 'Oil & Markets' },
  { href: '/insurance', label: 'Insurance' },
  { href: '/news', label: 'News' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/regions', label: 'Regions' },
  { href: '/blog', label: 'Blog' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' }
];
