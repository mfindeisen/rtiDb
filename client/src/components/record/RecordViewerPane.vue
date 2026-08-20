<template>
  <div class="flex flex-col gap-4">
    <template v-if="viewerMounted">
      <div class="flex flex-col lg:flex-row gap-4 items-stretch max-lg:min-h-[22rem] max-lg:h-[70svh] lg:min-h-[max(49rem,calc(100svh-15rem))]">
        <RecordViewerHelp
          v-if="showGuide"
          :viewer-mode="viewerMode"
          :tiff-url="record.tiffUrl"
          @hide="toggleGuide"
        />

        <div
          class="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/75 dark:bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
        >
          <template v-if="record.status === 'done'">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-white/10 shrink-0 bg-white/50 dark:bg-white/[0.02]">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">RTI Viewer</span>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  :class="showGuide ? 'bg-accent' : ''"
                  @click="toggleGuide"
                >
                  <HelpCircle class="w-3.5 h-3.5" />
                  {{ showGuide ? 'Hide Help' : 'Help Guide' }}
                </Button>
                <span
                  v-if="record.tiffUrl"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30"
                >
                  <Map class="w-3.5 h-3.5" /> {{ record.outputType === 'neural' ? 'Neural GeoTIFF' : 'GeoTIFF' }}
                </span>
              </div>

              <ToggleGroup
                v-if="!record.tiffUrl"
                type="single"
                size="sm"
                class="bg-muted p-0.5 rounded-lg"
                :model-value="viewerMode"
                @update:model-value="onViewerModeChange"
              >
                <ToggleGroupItem value="modern" class="px-4 text-xs">
                  Modern
                </ToggleGroupItem>
                <ToggleGroupItem value="legacy" class="px-4 text-xs">
                  Legacy
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div class="flex-1 min-h-0 flex flex-col relative overflow-hidden bg-slate-900 lg:min-h-[49rem]">
              <RtiViewerHost
                ref="viewerHostComponentRef"
                :record="record"
                :viewer-mode="viewerMode"
                :annotation-enabled="canAnnotateViewer"
                :scale-editable="canEditScale"
                class="flex-1 min-h-0 flex flex-col"
                @annotation-create="onAnnotationCreate"
                @annotation-click="onAnnotationClick"
                @annotation-update="onAnnotationUpdate"
                @rti-loaded="onViewerLoaded"
                @scale-change="onScaleChange"
              />
            </div>
          </template>

          <div
            v-else-if="record.status === 'draft'"
            class="flex-1 flex items-center justify-center text-center py-12 px-6 bg-amber-50 dark:bg-amber-500/10"
          >
            <div>
              <h3 class="text-xl font-medium text-amber-800 dark:text-amber-300 mb-2">No RTI scan uploaded yet</h3>
              <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm">
                Upload an RTI file in the admin area to enable the viewer.
              </p>
            </div>
          </div>
          <div
            v-else-if="record.status === 'processing'"
            class="flex-1 flex items-center justify-center text-center py-12 px-6 bg-blue-50 dark:bg-blue-500/10"
          >
            <div>
              <h3 class="text-xl font-medium text-blue-700 dark:text-blue-400 mb-2">Processing…</h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm">Please check back later.</p>
            </div>
          </div>
          <div
            v-else
            class="flex-1 flex items-center justify-center p-4 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300"
          >
            There was an error processing this scan.
          </div>
        </div>
      </div>

      <div
        v-if="showAnnotationsSection"
        class="glass-card !p-6 flex flex-col gap-4"
      >
        <div class="shrink-0 border-b border-slate-200 dark:border-white/10 pb-3">
          <h3 class="text-sm font-bold text-slate-800 dark:text-white">Annotations &amp; Notes</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Use the annotate tool, pick a shape, then draw on the image. Choose private, team, or published visibility.
          </p>
        </div>
        <RecordAnnotationsPanel
          ref="annotationsPanelRef"
          :record-id="record.id"
          :record-slug="record.slug || ''"
          :record-published="record.isPublished === 1"
          :highlight-id="editingAnnotation?.id"
          embedded
          @jump-to-view="onJumpToAnnotation"
          @edit="openAnnotationEdit"
          @loaded="syncViewerAnnotations"
          @updated="syncViewerAnnotations"
        />
        <div class="pt-4 border-t border-slate-200 dark:border-white/10">
          <RecordNotesPanel
            :record-id="record.id"
            :record-slug="record.slug || ''"
            embedded
          />
        </div>
      </div>
    </template>

    <AnnotationNoteDialog
      :open="annotationNoteOpen"
      :saving="annotationSaving"
      :deleting="annotationDeleting"
      :mode="annotationDialogMode"
      :initial-color="annotationDialogMode === 'edit' ? editingAnnotation?.color : (pendingAnnotation?.color as string | undefined)"
      :initial-stroke-width="annotationDialogMode === 'edit' ? editingAnnotation?.strokeWidth : (pendingAnnotation?.strokeWidth as number | undefined)"
      :initial-label="editingAnnotation?.label || ''"
      :initial-visibility="editingAnnotation?.visibility || 'private'"
      @save="saveAnnotationDialog"
      @cancel="closeAnnotationDialog"
      @delete="deleteAnnotationDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, toRef, watch } from 'vue';
import { HelpCircle, Map } from '@lucide/vue';
import RecordViewerHelp from '@/components/record/RecordViewerHelp.vue';
import RecordNotesPanel from '@/components/RecordNotesPanel.vue';
import RecordAnnotationsPanel from '@/components/RecordAnnotationsPanel.vue';
import AnnotationNoteDialog from '@/components/AnnotationNoteDialog.vue';
import RtiViewerHost from '@/components/RtiViewerHost.vue';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { canAnnotate, getCurrentUser, hasPermission } from '@/composables/useAuth';
import { userCanViewRecord } from '@rtidb/shared/authorization';
import { useRecordAnnotations } from '@/composables/useRecordAnnotations';
import type { RecordDetail } from '@rtidb/shared/api/records';

const props = defineProps<{
  record: RecordDetail;
  viewerMounted: boolean;
  viewerActive: boolean;
  viewerMode: 'modern' | 'legacy';
}>();

const emit = defineEmits<{
  'update:record': [value: RecordDetail];
  'update:viewerMode': [value: 'modern' | 'legacy'];
}>();

const recordRef = computed({
  get: () => props.record,
  set: (value) => emit('update:record', value),
});

const viewerModeRef = toRef(props, 'viewerMode');
const viewerActive = computed(() => props.viewerActive);

const viewerHostComponentRef = ref<{ viewerRef?: HTMLElement | null } | null>(null);
const annotationsPanelRef = ref<InstanceType<typeof RecordAnnotationsPanel> | null>(null);
const viewerRef = computed(() => viewerHostComponentRef.value?.viewerRef ?? null);

const showModernViewer = computed(() =>
  props.record.status === 'done' && !!(props.record.tiffUrl || props.viewerMode === 'modern'),
);
const canAnnotateViewer = computed(() => canAnnotate() && showModernViewer.value);
const canEditScale = computed(() => hasPermission('edit_record') && showModernViewer.value);
const showAnnotationsSection = computed(() =>
  showModernViewer.value && userCanViewRecord(getCurrentUser(), { isPublished: props.record.isPublished }),
);

const {
  showGuide,
  pendingAnnotation,
  editingAnnotation,
  annotationDialogMode,
  annotationNoteOpen,
  annotationSaving,
  annotationDeleting,
  syncViewerAnnotations,
  triggerResize,
  onViewerLoaded,
  onScaleChange,
  onJumpToAnnotation,
  onAnnotationCreate,
  openAnnotationEdit,
  onAnnotationClick,
  onAnnotationUpdate,
  closeAnnotationDialog,
  saveAnnotationDialog,
  deleteAnnotationDialog,
  toggleGuide,
} = useRecordAnnotations({
  record: recordRef,
  viewerRef,
  annotationsPanelRef,
  canEditScale,
  canAnnotateViewer,
  viewerActive,
  showModernViewer,
  viewerMode: viewerModeRef,
});

function onViewerModeChange(value: string | string[] | undefined) {
  if (value === 'modern' || value === 'legacy') emit('update:viewerMode', value);
}

watch(viewerActive, (isActive) => {
  if (isActive) {
    nextTick(() => {
      triggerResize();
      void syncViewerAnnotations();
    });
  }
});

defineExpose({
  triggerResize,
  syncViewerAnnotations,
});
</script>
