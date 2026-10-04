/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_DEMO_MODE?: string;
  readonly PUBLIC_GDELT_ENABLED?: string;
  readonly PUBLIC_MAP_TILES_URL?: string;
  readonly PUBLIC_MAP_ATTRIBUTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
