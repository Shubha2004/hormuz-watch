# Hormuz Watch

**Shipping intelligence dashboard for the Strait of Hormuz** — vessel activity, energy markets, insurance signals, regional analysis and maritime news in one dark-navy, information-dense interface.

> **Data notice:** unless a panel is explicitly marked **LIVE**, every figure, vessel position, price and headline on this site is **simulated demonstration data**. Never use it for trading, navigation, insurance or safety-critical decisions. See [Data sources & methodology](https://hormuz-watch.example.com/methodology).

## Tech stack

| Layer | Technology |
|---|---|
| Routing / rendering | [Astro](https://astro.build/) 5 (static output) |
| Interactivity | [Svelte](https://svelte.dev/) 5 (runes mode) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 3 |
| Maps | [Leaflet](https://leafletjs.com/) 1.9 (CARTO dark basemap) |
| Charts | [Chart.js](https://www.chartjs.org/) 4 |
| Language | TypeScript (strict) |
| Deployment target | Cloudflare Pages (or any static host) |

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) copy and edit environment variables
cp .env.example .env

# 3. Start the dev server
npm run dev
# → http://localhost:4321
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run check` | `astro check` — TypeScript + Svelte diagnostics |
| `npm run build` | Production static build → `dist/` |
| `npm run preview` | Serve the production build locally |

## Testing

There is no test runner bundled; verification is done via the type checker and the production build plus a route smoke test:

```bash
npm run check          # must report 0 errors
npm run build          # must complete with no errors
npm run preview &      # serve dist/
for r in / /map /routes /vessels /oil /insurance /news /timeline /regions /blog /methodology /faq /about; do
  curl -s -o /dev/null -w "%{http_code} $r\n" "http://localhost:4321$r"
done
# every route must return 200
```

## Project structure

```
hormuz-watch/
├── public/
│   ├── favicon.svg          # original compass/anchor brand mark
│   ├── _headers             # Cloudflare Pages security headers
│   └── robots.txt
├── src/
│   ├── components/          # Svelte 5 interactive components
│   │   ├── Header.svelte    # nav, live clock, refresh control, online status
│   │   ├── Footer.svelte
│   │   ├── MapView.svelte   # Leaflet map (client-only)
│   │   ├── OilChart.svelte  # Chart.js price chart (client-only)
│   │   ├── KpiGrid.svelte / KpiCard.svelte
│   │   ├── NewsSection.svelte  # search + category filter, live-refresh aware
│   │   ├── VesselTable.svelte  # search + type filter
│   │   ├── TimelineList.svelte # severity filter
│   │   ├── DemoBadge.svelte / SourceLine.svelte / RiskBadge.svelte
│   │   └── StateBlock.svelte   # loading / error / empty / offline states
│   ├── layouts/
│   │   └── Layout.astro     # HTML shell, SEO meta, skip link
│   ├── lib/
│   │   ├── types.ts         # centralized data models
│   │   ├── demo-data.ts     # clearly-labeled demo dataset
│   │   ├── providers.ts     # provider/service layer (demo + live attempts)
│   │   ├── validate.ts      # external-response validation
│   │   ├── format.ts        # presentation formatting
│   │   └── stores.ts        # Svelte stores + refresh logic
│   ├── pages/               # 13 routes (see below)
│   └── styles/global.css    # Tailwind + Leaflet dark-theme tweaks
├── .env.example             # documented environment variables
├── astro.config.mjs         # output: 'static'
└── tailwind.config.mjs      # navy palette extension
```

### Routes

| Route | Page |
|---|---|
| `/` | Dashboard — KPIs, map, oil chart, headlines, timeline |
| `/map` | Full-page interactive map with layer toggles |
| `/routes` | Shipping route cards + route map |
| `/vessels` | Vessel/carrier directory (search + type filter) |
| `/oil` | Oil prices & market indicators |
| `/insurance` | Insurance & maritime risk |
| `/news` | News feed (search + category filter) |
| `/timeline` | Crisis/incident timeline (severity filter) |
| `/regions` | Regional trade-impact analysis |
| `/blog` | Editorial articles |
| `/blog/[slug]` | Article pages (statically generated) |
| `/methodology` | Data sources & methodology |
| `/faq` | FAQ + glossary |
| `/about` | About + disclaimers |

## Data & environment variables

The app ships with a bundled **demo dataset** (`src/lib/demo-data.ts`) so every page works offline out of the box. All demo content carries `quality: 'simulated'` and renders with a visible **DEMO badge**, source attribution and timestamps.

The provider layer (`src/lib/providers.ts`) defines the interface for real data:

- **News:** when `PUBLIC_DEMO_MODE=false` and `PUBLIC_GDELT_ENABLED=true`, the app attempts the keyless [GDELT 2.1 API](https://www.gdeltproject.org/) in the browser for live headlines, with validation (`validate.ts`) and graceful fallback to demo headlines on any failure.
- **Oil prices / AIS vessels:** documented for future server-side use only — see `.env.example` (`EIA_API_KEY`, `MARINETRAFFIC_API_KEY`). These are **never** called from the browser and must never use the `PUBLIC_` prefix.

Copy `.env.example` to `.env` to experiment. No secrets are required for local development.

## Deployment — Cloudflare Pages

The build is fully static (`output: 'static'` in `astro.config.mjs`), so it deploys to Cloudflare Pages with zero configuration:

1. Push this repo to GitHub.
2. In Cloudflare Pages: **Create application → Pages → Connect to Git**.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 20+ (set via `NODE_VERSION` env var or `.nvmrc`)
4. Deploy. `public/_headers` is picked up automatically for security headers.

The same `dist/` output works on Netlify, Vercel, GitHub Pages or any static host.

## Data-integrity policy

1. **Never fabricate** real-time shipping, price, incident or insurance data as fact.
2. **Label everything** — every panel shows a quality badge (LIVE / HISTORICAL / ESTIMATE / SIMULATED).
3. **Attribute sources** with last-updated timestamps under each panel.
4. **Validate** every external API response before rendering; failures degrade to demo data, never to a broken page.

## License

MIT — see `LICENSE` (add one before publishing if needed).
