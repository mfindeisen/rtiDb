<template>
  <div
    class="space-y-4"
    :class="embedded ? '' : 'p-4 bg-amber-50/80 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl'"
  >
    <div class="flex items-center justify-between gap-2">
      <h4 class="section-label flex items-center gap-2 mb-0">
        <Circle class="w-3.5 h-3.5" /> Image Annotations
      </h4>
      <Button
        v-if="canView"
        type="button"
        variant="outline"
        size="xs"
        class="uppercase tracking-wide"
        :class="overlaysVisible ? 'bg-accent' : ''"
        :aria-pressed="overlaysVisible"
        :title="overlaysVisible ? 'Hide all annotations on the image' : 'Show annotations on the image'"
        @click="overlaysVisible = !overlaysVisible"
      >
        <Eye v-if="overlaysVisible" />
        <EyeOff v-else />
        {{ overlaysVisible ? 'Shown on image' : 'Hidden on image' }}
      </Button>
    </div>

    <p v-if="!canView" class="text-xs text-slate-500 dark:text-slate-400">
      Published annotations appear here when this record is public.
    </p>

    <template v-else>
      <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <template v-if="canAnnotate">
          Draw shapes in the viewer, then choose who can see each mark: private, team, or published.
        </template>
        <template v-else>
          Published annotations from researchers are shown on the image.
        </template>
      </p>

      <div v-if="canAnnotate" class="flex flex-wrap gap-2">
        <Button
          v-for="layer in layerOptions"
          :key="layer.key"
          type="button"
          variant="outline"
          size="xs"
          class="uppercase tracking-wide"
          :class="layerFilters[layer.key] ? 'bg-accent' : ''"
          @click="layerFilters[layer.key] = !layerFilters[layer.key]"
        >
          {{ layer.label }}
        </Button>
      </div>

      <p v-if="!overlaysVisible && listedAnnotations.length > 0" class="text-xs text-slate-500 dark:text-slate-400">
        Marks are hidden on the image. The list below stays available.
      </p>

      <div v-if="loading" class="text-xs text-slate-500 dark:text-slate-400">Loading annotations…</div>
      <div v-else-if="listedAnnotations.length === 0" class="text-xs text-slate-500 dark:text-slate-400">
        <template v-if="canAnnotate">
          No annotations in the selected layers. Use <strong class="text-slate-700 dark:text-slate-300">Annotate</strong> mode in the viewer.
        </template>
        <template v-else>No published annotations yet.</template>
      </div>
      <ScrollArea v-else :class="embedded ? '' : 'h-56'">
        <ul class="space-y-2 pr-2">
        <li
          v-for="ann in listedAnnotations"
          :key="ann.id"
          class="rounded-lg border border-amber-200/80 dark:border-amber-500/20 bg-white/70 dark:bg-white/[0.03] p-3 flex items-start justify-between gap-2"
          :class="highlightId === ann.id ? 'ring-2 ring-blue-400/60' : ''"
        >
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 flex-wrap">
              <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: ann.color || '#f59e0b' }" />
              <component :is="typeIcon(ann)" class="w-3.5 h-3.5 text-slate-500" />
              {{ typeLabel(ann) }}
              <span class="text-[9px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{{ visibilityLabel(ann.visibility) }}</span>
              <span v-if="ann.source === 'ai'" class="text-[9px] font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400">AI</span>
            </div>
            <p v-if="ann.username" class="text-[10px] text-slate-400 mt-1">by {{ ann.username }}</p>
            <p v-if="ann.label" class="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap mt-1.5">{{ ann.label }}</p>
            <p v-else class="text-xs text-slate-400 dark:text-slate-500 italic mt-1.5">No note</p>
            <time class="text-[10px] font-mono text-slate-400 block mt-2">{{ formatDate(ann.createdAt) }}</time>
          </div>

          <div class="flex flex-col gap-1 shrink-0">
            <Button type="button" variant="link" size="xs" class="h-auto px-1" @click="jumpTo(ann)">
              Jump to view
            </Button>
            <template v-if="canEditAnnotation(ann)">
              <Button type="button" variant="ghost" size="xs" class="h-auto px-1" @click="edit(ann)">
                Edit
              </Button>
              <Button type="button" variant="ghost" size="xs" class="h-auto px-1 text-destructive" @click="remove(ann.id)">
                Delete
              </Button>
            </template>
          </div>
        </li>
        </ul>
      </ScrollArea>
      <p v-if="error" class="text-xs text-red-600 dark:text-red-400">{{ error }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { Circle, CircleDot, Square, Eye, EyeOff } from '@lucide/vue';
import { canAnnotate as checkCanAnnotate, currentUserId, getCurrentUser } from '@/composables/useAuth';
import { userCanViewRecord } from '@rtidb/shared/authorization';
import { formatCatalogDateTime } from '@rtidb/shared';
import { ANNOTATION_VISIBILITY_LABELS, type AnnotationVisibility } from '@rtidb/shared/annotations';
import type { RecordAnnotation } from '@rtidb/shared/api/annotations';
import * as annotationsApi from '@/api/annotations';
import { ApiError } from '@/api/client';
import { confirmAction } from '@/composables/useConfirmDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const props = defineProps({
  recordId: { type: [Number, String], required: true },
  recordSlug: { type: String, default: '' },
  recordPublished: { type: Boolean, default: false },
  embedded: { type: Boolean, default: false },
  highlightId: { type: [Number, String], default: null },
});

const emit = defineEmits(['jump-to-view', 'updated', 'loaded', 'edit']);

const canAnnotate = ref(checkCanAnnotate());
const canView = computed(() =>
  userCanViewRecord(getCurrentUser(), { isPublished: props.recordPublished ? 1 : 0 }),
);
const annotations = ref<RecordAnnotation[]>([]);
const loading = ref(false);
const error = ref('');

const overlaysVisible = ref(true);
const layerFilters = reactive<Record<AnnotationVisibility, boolean>>({
  private: true,
  team: true,
  published: true,
});

const layerOptions = [
  { key: 'private' as const, label: 'My private' },
  { key: 'team' as const, label: 'Team' },
  { key: 'published' as const, label: 'Published' },
];

const listedAnnotations = computed(() => {
  if (!canAnnotate.value) {
    return annotations.value.filter((ann) => ann.visibility === 'published');
  }
  return annotations.value.filter((ann) => layerFilters[ann.visibility]);
});

function revealOverlays() {
  overlaysVisible.value = true;
}

function jumpTo(ann: RecordAnnotation) {
  revealOverlays();
  emit('jump-to-view', ann);
}

function edit(ann: RecordAnnotation) {
  revealOverlays();
  emit('edit', ann);
}

const recordKey = () => props.recordSlug || props.recordId;
const formatDate = (iso: string) => formatCatalogDateTime(iso);
const visibilityLabel = (visibility: AnnotationVisibility) => ANNOTATION_VISIBILITY_LABELS[visibility] || visibility;

const TYPE_LABELS: Record<string, string> = { point: 'Point', circle: 'Circle', rectangle: 'Rectangle' };
const TYPE_ICONS: Record<string, typeof Circle> = { point: CircleDot, circle: Circle, rectangle: Square };
const typeLabel = (ann: RecordAnnotation) => TYPE_LABELS[ann.type] || 'Annotation';
const typeIcon = (ann: RecordAnnotation) => TYPE_ICONS[ann.type] || Circle;

function canEditAnnotation(ann: RecordAnnotation): boolean {
  return canAnnotate.value && ann.userId === currentUserId();
}

async function fetchAnnotations() {
  if (!canView.value) return;
  loading.value = true;
  error.value = '';
  try {
    annotations.value = await annotationsApi.listAnnotations(recordKey());
  } catch (err) {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      if (!props.recordPublished) {
        canAnnotate.value = false;
      }
      return;
    }
    error.value = err instanceof Error ? err.message : 'Failed to load annotations';
  } finally {
    loading.value = false;
    emit('loaded');
  }
}

async function remove(id: number) {
  const ok = await confirmAction({
    title: 'Delete this annotation?',
    description: 'This mark and its note will be removed from the image.',
    confirmLabel: 'Delete',
  });
  if (!ok) return;
  try {
    await annotationsApi.deleteAnnotation(recordKey(), id);
    annotations.value = annotations.value.filter((a) => a.id !== id);
    emit('updated');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to delete';
  }
}

defineExpose({
  annotations: listedAnnotations,
  overlaysVisible,
  fetchAnnotations,
  refresh: fetchAnnotations,
  revealOverlays,
  setOverlaysVisible: (visible) => {
    overlaysVisible.value = !!visible;
  },
});

onMounted(fetchAnnotations);
watch(() => props.recordId, fetchAnnotations);
watch(layerFilters, () => emit('updated'), { deep: true });
watch(overlaysVisible, () => emit('updated'));
</script>
