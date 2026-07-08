<template>
  <div ref="mapEl" class="w-full h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export interface MapMarker {
  id: number;
  lat: number | null;
  lng: number | null;
  name: string;
}

const props = withDefaults(defineProps<{
  markers?: MapMarker[];
  selectedId?: number | null;
  autoFit?: boolean;
}>(), {
  markers: () => [],
  selectedId: null,
  autoFit: true,
});

const emit = defineEmits<{
  'marker-click': [id: number];
  'bounds-change': [bounds: { west: number; south: number; east: number; north: number }];
}>();

const mapEl = ref<HTMLElement | null>(null);
let map: L.Map | null = null;
let markerLayer: L.LayerGroup | null = null;
let boundsTimer: ReturnType<typeof setTimeout> | null = null;
let suppressBoundsEvent = false;

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function emitBounds() {
  if (!map) return;
  const b = map.getBounds();
  emit('bounds-change', {
    west: b.getWest(),
    south: b.getSouth(),
    east: b.getEast(),
    north: b.getNorth(),
  });
}

function renderMarkers() {
  if (!map || !markerLayer) return;
  markerLayer.clearLayers();

  const valid = props.markers.filter((m): m is MapMarker & { lat: number; lng: number } =>
    m.lat != null && m.lng != null,
  );
  for (const m of valid) {
    const marker = L.marker([m.lat, m.lng], { icon: defaultIcon });
    marker.bindPopup(`<strong>${escapeHtml(m.name)}</strong>`);
    marker.on('click', () => emit('marker-click', m.id));
    markerLayer.addLayer(marker);
  }

  if (valid.length > 0 && props.autoFit) {
    suppressBoundsEvent = true;
    const group = L.featureGroup(markerLayer.getLayers());
    map.fitBounds(group.getBounds().pad(0.15));
  }
}

function escapeHtml(text: string) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

onMounted(() => {
  if (!mapEl.value) return;
  map = L.map(mapEl.value, { zoomControl: true }).setView([29.935, 52.892], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map);

  markerLayer = L.layerGroup().addTo(map);
  renderMarkers();

  map.on('moveend', () => {
    if (boundsTimer) clearTimeout(boundsTimer);
    boundsTimer = setTimeout(() => {
      if (suppressBoundsEvent) {
        suppressBoundsEvent = false;
        return;
      }
      emitBounds();
    }, 300);
  });
  emitBounds();
});

onBeforeUnmount(() => {
  if (boundsTimer) clearTimeout(boundsTimer);
  if (map) {
    map.remove();
    map = null;
  }
});

watch(() => props.markers, renderMarkers, { deep: true });
</script>
