/**
 * Runtime validation for external API responses.
 * Every live provider response is checked here before the UI may use it.
 */

import type { NewsItem } from './types';

interface GdeltArticle {
  title?: unknown;
  url?: unknown;
  sourceCountry?: unknown;
  seendate?: unknown;
}

interface GdeltPayload {
  articles?: unknown;
}

export function isGdeltResponse(value: unknown): value is GdeltPayload {
  if (typeof value !== 'object' || value === null) return false;
  const articles = (value as { articles?: unknown }).articles;
  return Array.isArray(articles);
}

const CATEGORY_HINTS: Array<{ match: RegExp; category: NewsItem['category'] }> = [
  { match: /insur|premium|underwrit/i, category: 'insurance' },
  { match: /crude|brent|wti|lng|opec|energy|gas/i, category: 'energy' },
  { match: /navy|sanction|diplomac|military|tension/i, category: 'geopolitics' }
];

/** Convert a validated GDELT payload into NewsItems. Drops malformed rows. */
export function toNewsItems(payload: GdeltPayload): NewsItem[] {
  if (!Array.isArray(payload.articles)) return [];
  const items: NewsItem[] = [];
  for (const raw of payload.articles) {
    const a = raw as GdeltArticle;
    if (typeof a.title !== 'string' || typeof a.url !== 'string') continue;
    if (!a.title.trim() || !/^https?:\/\//.test(a.url)) continue;
    const title = a.title.trim().slice(0, 180);
    const category =
      CATEGORY_HINTS.find((h) => h.match.test(title))?.category ?? 'shipping';
    const seen = typeof a.seendate === 'string' ? a.seendate : '';
    // GDELT seendate: YYYYMMDDTHHMMSSZ
    const publishedAt = /^\d{8}T\d{6}Z$/.test(seen)
      ? `${seen.slice(0, 4)}-${seen.slice(4, 6)}-${seen.slice(6, 8)}T${seen.slice(9, 11)}:${seen.slice(11, 13)}:${seen.slice(13, 15)}Z`
      : new Date().toISOString();
    items.push({
      id: `gdelt-${items.length}-${seen || 'x'}`,
      title,
      summary: 'Live headline via GDELT. Open the source link to read the full article.',
      source: 'GDELT / originating publisher',
      url: a.url,
      publishedAt,
      category,
      quality: 'live'
    });
    if (items.length >= 12) break;
  }
  return items;
}
