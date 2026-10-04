<script lang="ts">
  import { onMount } from 'svelte';
  import type { Port, ShippingRoute, Vessel } from '../lib/types';

  interface Props {
    vessels: Vessel[];
    routes: ShippingRoute[];
    ports: Port[];
    /** CSS height of the map container. */
    height?: string;
    /** Show the layer toggle panel. */
    showControls?: boolean;
    /** Initial map centre [lat, lng]. */
    center?: [number, number];
    /** Initial zoom. */
    zoom?: number;
  }

  const {
    vessels,
    routes,
    ports,
    height = '480px',
    showControls = true,
    center = [26.3, 56.4],
    zoom = 7
  }: Props = $props();

  let container: HTMLDivElement | null = $state(null);
  let loadError = $state<string | null>(null);
  let showVessels = $state(true);
  let showRoutes = $state(true);
  let showPorts = $state(true);

  // Layer references kept outside Svelte reactivity (Leaflet mutates them).
  let map: any = null;
  let vesselLayer: any = null;
  let routeLayer: any = null;
  let portLayer: any = null;
  let L: any = null;

  const vesselColors: Record<Vessel['type'], string> = {
    tanker: '#22d3ee',
    lng: '#a78bfa',
    container: '#34d399',
    bulk: '#fbbf24',
    general: '#94a3b8'
  };

  function vesselIcon(v: Vessel): any {
    const color = vesselColors[v.type];
    const rotation = v.status === 'At anchor' ? 0 : v.courseDeg;
    return L.divIcon({
      className: 'hw-vessel-marker',
      html: `<div style="transform: rotate(${rotation}deg); width:22px; height:22px; display:flex; align-items:center; justify-content:center;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${color}" stroke="#050b16" stroke-width="1.2">
          <path d="M12 2 L19 21 L12 17 L5 21 Z"/>
        </svg></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -10]
    });
  }

  function vesselPopup(v: Vessel): string {
    return `<strong style="font-size:13px">${v.name}</strong><br/>
      <span style="color:#94a3b8">${v.type.toUpperCase()} · ${v.flag} · ${v.status}</span><br/>
      Speed ${v.speedKn.toFixed(1)} kn · Course ${Math.round(v.courseDeg)}°<br/>
      Destination: ${v.destination}<br/>
      Operator: ${v.operator} · DWT ${v.dwt.toLocaleString('en-US')}<br/>
      <em style="color:#fbbf24; font-size:11px">Demo vessel — illustrative position, not live AIS.</em>`;
  }

  function applyLayers() {
    if (!map) return;
    for (const [layer, visible] of [[vesselLayer, showVessels], [routeLayer, showRoutes], [portLayer, showPorts]] as const) {
      if (!layer) continue;
      if (visible && !map.hasLayer(layer)) layer.addTo(map);
      if (!visible && map.hasLayer(layer)) map.removeLayer(layer);
    }
  }

  $effect(() => {
    // Re-apply layers whenever a toggle changes (after init).
    void showVessels; void showRoutes; void showPorts;
    applyLayers();
  });

  onMount(async () => {
    try {
      const leaflet = await import('leaflet');
      L = leaflet.default ?? leaflet;
      await import('leaflet/dist/leaflet.css');

      if (!container) return;
      map = L.map(container, { scrollWheelZoom: true }).setView(center, zoom);

      const tilesUrl =
        (import.meta.env.PUBLIC_MAP_TILES_URL as string | undefined) ||
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      const attribution =
        (import.meta.env.PUBLIC_MAP_ATTRIBUTION as string | undefined) ||
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

      L.tileLayer(tilesUrl, { attribution, maxZoom: 18 }).addTo(map);

      vesselLayer = L.layerGroup(
        vessels.map((v) => L.marker([v.lat, v.lng], { icon: vesselIcon(v) }).bindPopup(vesselPopup(v)))
      );
      routeLayer = L.layerGroup(
        routes.map((r) =>
          L.polyline(r.waypoints, {
            color: r.riskLevel === 'high' ? '#f87171' : r.riskLevel === 'elevated' ? '#fbbf24' : '#22d3ee',
            weight: 2.5,
            opacity: 0.85,
            dashArray: '8 5'
          }).bindPopup(
            `<strong>${r.name}</strong> <span style="color:#94a3b8">(${r.code})</span><br/>${r.description}<br/>Est. weekly transits: ${r.weeklyTransitsEstimate} · Cargo: ${r.primaryCargo}<br/><em style="color:#fbbf24; font-size:11px">Demo route — illustrative geometry.</em>`
          )
        )
      );
      portLayer = L.layerGroup(
        ports.map((p) =>
          L.circleMarker([p.lat, p.lng], {
            radius: 6,
            color: '#050b16',
            weight: 1.5,
            fillColor: '#fbbf24',
            fillOpacity: 0.95
          }).bindPopup(`<strong>${p.name}</strong><br/><span style="color:#94a3b8">${p.country} · ${p.kind}</span>`)
        )
      );

      applyLayers();
    } catch (err) {
      loadError = err instanceof Error ? err.message : 'Map failed to load';
    }

    return () => {
      if (map) {
        map.remove();
        map = null;
      }
    };
  });
</script>

<div class="panel overflow-hidden">
  {#if showControls}
    <div class="flex flex-wrap items-center gap-2 border-b border-navy-700/60 px-4 py-2.5" role="group" aria-label="Map layers">
      <span class="card-title mr-1">Layers</span>
      {#each [{ key: 'vessels', label: 'Vessels', checked: showVessels, set: (v: boolean) => (showVessels = v) }, { key: 'routes', label: 'Routes', checked: showRoutes, set: (v: boolean) => (showRoutes = v) }, { key: 'ports', label: 'Ports', checked: showPorts, set: (v: boolean) => (showPorts = v) }] as layer (layer.key)}
        <label class="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-navy-600 px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-400/50">
          <input type="checkbox" class="h-3.5 w-3.5 accent-cyan-400" checked={layer.checked} onchange={(e) => layer.set((e.target as HTMLInputElement).checked)} />
          {layer.label}
        </label>
      {/each}
      <span class="ml-auto hidden text-[11px] text-slate-500 sm:inline">Vessel positions are simulated demo data</span>
    </div>
  {/if}
  {#if loadError}
    <div class="p-6 text-sm text-red-300" role="alert">Map failed to load: {loadError}</div>
  {:else}
    <div bind:this={container} style={`height: ${height};`} class="z-0" role="application" aria-label="Interactive map of the Strait of Hormuz"></div>
  {/if}
</div>
