<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  record: { tiffUrl?: string | null; folderUrl?: string | null; format?: string | null; status?: string; slug?: string | null; id?: number } | null;
  viewerMode: 'modern' | 'legacy';
  annotationEnabled: boolean;
  scaleEditable?: boolean;
  debug?: boolean;
}>();

const route = useRoute();

const emit = defineEmits<{
  annotationCreate: [event: CustomEvent];
  annotationClick: [event: CustomEvent];
  annotationUpdate: [event: CustomEvent];
  rtiLoaded: [];
  scaleChange: [event: CustomEvent];
}>();

const modernViewerRef = ref<HTMLElement | null>(null);

defineExpose({ viewerRef: modernViewerRef });

const folderUrl = computed(() => props.record?.folderUrl || '');
const viewerUrl = computed(() => props.record?.tiffUrl || folderUrl.value);
const tileFormat = computed(() => props.record?.format || '');
const useModern = computed(() => !!props.record?.tiffUrl || props.viewerMode === 'modern');
const annotationAttr = computed(() => (props.annotationEnabled ? 'true' : 'false'));
const scaleEditableAttr = computed(() => (props.scaleEditable ? 'true' : 'false'));
const debugEnabled = computed(() => props.debug === true);
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
      :scale-editable="scaleEditableAttr"
      class="flex-1 w-full h-full min-h-0 lg:min-h-[49rem]"
      :debug="debugEnabled ? 'true' : undefined"
      @annotation-create="emit('annotationCreate', $event)"
      @annotation-click="emit('annotationClick', $event)"
      @annotation-update="emit('annotationUpdate', $event)"
      @rti-loaded="emit('rtiLoaded')"
      @scale-change="emit('scaleChange', $event)"
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
