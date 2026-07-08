<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as OpenLIME from 'openlime';
import { openLimeInfoUrl, resolveOpenLimeDatasetUrl } from '@/lib/openlimeRti';

const props = defineProps<{
  url: string;
}>();

const emit = defineEmits<{
  rtiLoaded: [];
}>();

const wrapperRef = ref<HTMLElement | null>(null);
const status = ref('Loading OpenLIME…');
const error = ref('');

let viewer: InstanceType<typeof OpenLIME.Viewer> | null = null;
let ui: InstanceType<typeof OpenLIME.UIBasic> | null = null;
let mountEl: HTMLDivElement | null = null;
let resizeObserver: ResizeObserver | null = null;
let initGeneration = 0;

function resizeViewer() {
  if (!viewer || !wrapperRef.value) return;
  const { width, height } = wrapperRef.value.getBoundingClientRect();
  if (width > 0 && height > 0) {
    viewer.resize(width, height);
  }
}

function destroyViewer() {
  resizeObserver?.disconnect();
  resizeObserver = null;

  if (viewer) {
    try {
      viewer.resizeObserver?.disconnect();
      viewer.canvas?.dispose?.();
    } catch (cleanupError) {
      console.warn('OpenLIME cleanup failed:', cleanupError);
    }
  }

  ui = null;
  viewer = null;

  if (mountEl) {
    mountEl.replaceChildren();
    mountEl.remove();
    mountEl = null;
  }
}

async function initViewer() {
  if (!props.url) return;

  await nextTick();
  if (!wrapperRef.value) return;

  const generation = ++initGeneration;
  destroyViewer();
  status.value = 'Loading OpenLIME…';
  error.value = '';

  mountEl = document.createElement('div');
  mountEl.className = 'openlime absolute inset-0';
  wrapperRef.value.appendChild(mountEl);

  try {
    const datasetUrl = await resolveOpenLimeDatasetUrl(props.url);
    const infoUrl = openLimeInfoUrl(datasetUrl);
    const response = await fetch(infoUrl);
    if (!response.ok) {
      throw new Error('Could not load RTI metadata for OpenLIME');
    }

    if (generation !== initGeneration) return;

    viewer = new OpenLIME.Viewer(mountEl, {
      background: '#0f172a',
      autofit: true,
    });

    const layer = new OpenLIME.Layer({
      id: 'rti',
      label: 'RTI',
      layout: 'deepzoom',
      type: 'rti',
      url: infoUrl,
      normals: false,
    } as Record<string, unknown> as ConstructorParameters<typeof OpenLIME.Layer>[0]);

    viewer.addLayer('rti', layer);

    OpenLIME.Skin.setUrl('/openlime/skin.svg');

    ui = new OpenLIME.UIBasic(viewer, {
      showLightDirections: true,
      actions: {
        light: { display: true, active: true },
        zoomin: { display: true },
        zoomout: { display: true },
      },
    });

    if (generation !== initGeneration) return;

    await nextTick();
    resizeViewer();

    if (wrapperRef.value) {
      resizeObserver = new ResizeObserver(() => resizeViewer());
      resizeObserver.observe(wrapperRef.value);
    }

    status.value = '';
    emit('rtiLoaded');
  } catch (err) {
    if (generation !== initGeneration) return;
    console.error(err);
    error.value = err instanceof Error ? err.message : 'OpenLIME failed to load';
    status.value = '';
    destroyViewer();
  }
}

onMounted(() => {
  initViewer();
});

watch(() => props.url, () => {
  initViewer();
});

onBeforeUnmount(() => {
  initGeneration++;
  destroyViewer();
});

defineExpose({
  viewerRef: wrapperRef,
});
</script>

<template>
  <div
    ref="wrapperRef"
    class="flex-1 w-full min-h-[49rem] relative bg-[#0f172a] overflow-hidden"
  >
    <div
      v-show="status"
      class="absolute inset-0 flex items-center justify-center text-sm text-slate-300 z-10 pointer-events-none"
    >
      {{ status }}
    </div>
    <div
      v-show="error"
      class="absolute inset-0 flex items-center justify-center p-6 z-10"
    >
      <p class="text-sm text-red-300 text-center max-w-md">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
:deep(.openlime) {
  color: #e2e8f0;
}
</style>
