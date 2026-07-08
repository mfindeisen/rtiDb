<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import OpenLimeViewer from './OpenLimeViewer.vue';

const props = defineProps<{
  record: { tiffUrl?: string | null; folderUrl?: string | null; status?: string } | null;
  viewerMode: 'modern' | 'legacy' | 'openlime';
  annotationEnabled: boolean;
  debug?: boolean;
}>();

const emit = defineEmits<{
  annotationCreate: [event: CustomEvent];
  annotationClick: [event: CustomEvent];
  rtiLoaded: [];
}>();

const modernViewerRef = ref<HTMLElement | null>(null);
const openLimeRef = ref<InstanceType<typeof OpenLimeViewer> | null>(null);
const viewerRef = ref<HTMLElement | null>(null);

watch(
  [() => props.viewerMode, openLimeRef, modernViewerRef],
  () => {
    viewerRef.value =
      props.viewerMode === 'openlime'
        ? openLimeRef.value?.viewerRef ?? null
        : modernViewerRef.value;
  },
  { immediate: true, flush: 'post' },
);

defineExpose({ viewerRef });

const folderUrl = computed(() => props.record?.folderUrl || '');
const viewerUrl = computed(() => props.record?.tiffUrl || folderUrl.value);
const useModern = computed(() => !!props.record?.tiffUrl || props.viewerMode === 'modern');
const useOpenLime = computed(() => props.viewerMode === 'openlime' && !!folderUrl.value);
const annotationAttr = computed(() => (props.annotationEnabled ? 'true' : 'false'));
const debugEnabled = computed(() => props.debug ?? import.meta.env.DEV);
</script>

<template>
  <template v-if="useOpenLime">
    <OpenLimeViewer
      ref="openLimeRef"
      :url="folderUrl"
      class="flex-1 min-h-0 flex flex-col"
      @rti-loaded="emit('rtiLoaded')"
    />
  </template>
  <template v-else-if="useModern && viewerUrl">
    <modern-rti-viewer
      ref="modernViewerRef"
      :url="viewerUrl"
      :annotation-enabled="annotationAttr"
      class="flex-1 w-full min-h-[49rem]"
      :debug="debugEnabled ? 'true' : undefined"
      @annotation-create="emit('annotationCreate', $event)"
      @annotation-click="emit('annotationClick', $event)"
      @rti-loaded="emit('rtiLoaded')"
    />
  </template>
  <template v-else-if="viewerUrl">
    <iframe
      :src="`/viewer/viewer.html?url=${encodeURIComponent(viewerUrl)}`"
      class="flex-1 w-full min-h-[49rem] border-0 bg-[#0f172a]"
      allowfullscreen
    />
  </template>
</template>
