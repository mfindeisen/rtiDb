<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  record: { tiffUrl?: string | null; folderUrl?: string | null; format?: string | null; status?: string; slug?: string | null; id?: number } | null;
  viewerMode: 'modern' | 'legacy';
  annotationEnabled: boolean;
  debug?: boolean;
}>();

const route = useRoute();

const emit = defineEmits<{
  annotationCreate: [event: CustomEvent];
  annotationClick: [event: CustomEvent];
  rtiLoaded: [];
}>();

const modernViewerRef = ref<HTMLElement | null>(null);

defineExpose({ viewerRef: modernViewerRef });

const folderUrl = computed(() => props.record?.folderUrl || '');
const viewerUrl = computed(() => props.record?.tiffUrl || folderUrl.value);
const tileFormat = computed(() => props.record?.format || '');
const useModern = computed(() => !!props.record?.tiffUrl || props.viewerMode === 'modern');
const annotationAttr = computed(() => (props.annotationEnabled ? 'true' : 'false'));
const debugEnabled = computed(() => props.debug ?? import.meta.env.DEV);
const shareUrl = computed(() => {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}${route.fullPath.split('#')[0]}`;
});
</script>

<template>
  <template v-if="useModern && viewerUrl">
    <modern-rti-viewer
      ref="modernViewerRef"
      :url="viewerUrl"
      :share-url="shareUrl"
      :tile-format="tileFormat"
      :annotation-enabled="annotationAttr"
      class="flex-1 w-full h-full min-h-0 lg:min-h-[49rem]"
      :debug="debugEnabled ? 'true' : undefined"
      @annotation-create="emit('annotationCreate', $event)"
      @annotation-click="emit('annotationClick', $event)"
      @rti-loaded="emit('rtiLoaded')"
    />
  </template>
  <template v-else-if="viewerUrl">
    <iframe
      :src="`/viewer/viewer.html?url=${encodeURIComponent(viewerUrl)}`"
      class="flex-1 w-full h-full min-h-0 lg:min-h-[49rem] border-0 bg-[#0f172a]"
      allowfullscreen
    />
  </template>
</template>
