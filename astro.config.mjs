import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

// Static output for clean deployment to Cloudflare Pages (or any static host).
// All dynamic behaviour (map, charts, data refresh) runs client-side.
export default defineConfig({
  output: 'static',
  // Base path for GitHub Pages project site (https://shubha2004.github.io/hormuz-watch/)
  base: '/hormuz-watch/',
  integrations: [svelte(), tailwind()],
  vite: {
    build: {
      // Keep Leaflet's assets working when bundled
      assetsInlineLimit: 0
    }
  }
});
