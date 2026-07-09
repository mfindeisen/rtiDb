<template>
  <div
    class="space-y-4"
    :class="embedded ? '' : 'p-4 bg-amber-50/80 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl'"
  >
    <div class="flex items-center justify-between gap-2">
      <h4 class="section-label flex items-center gap-2 mb-0">
        <Circle class="w-3.5 h-3.5" /> Image Annotations
      </h4>
      <span class="text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
        Private · RTI view saved
      </span>
    </div>

    <p v-if="!canAnnotate" class="text-xs text-slate-500 dark:text-slate-400">
      <router-link to="/login" class="text-blue-600 dark:text-blue-400 hover:underline">Sign in</router-link>
      as a researcher to draw on the RTI image (Annotate tool in the viewer toolbar).
    </p>

    <template v-else>
      <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        Draw shapes in the viewer, notes appear beside each mark. Click an annotation on the image or use Edit below.
      </p>

      <div v-if="loading" class="text-xs text-slate-500 dark:text-slate-400">Loading annotations…</div>
      <div v-else-if="annotations.length === 0" class="text-xs text-slate-500 dark:text-slate-400">
        No annotations yet. Use <strong class="text-slate-700 dark:text-slate-300">Annotate</strong> mode in the viewer.
      </div>
      <ul v-else class="space-y-2" :class="embedded ? '' : 'max-h-56 overflow-y-auto [scrollbar-gutter:stable]'">
        <li
          v-for="ann in annotations"
          :key="ann.id"
          class="rounded-lg border border-amber-200/80 dark:border-amber-500/20 bg-white/70 dark:bg-white/[0.03] p-3 flex items-start justify-between gap-2"
          :class="highlightId === ann.id ? 'ring-2 ring-blue-400/60' : ''"
        >
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: ann.color || '#f59e0b' }" />
              <component :is="typeIcon(ann)" class="w-3.5 h-3.5 text-slate-500" />
              {{ typeLabel(ann) }}
              <span v-if="ann.source === 'ai'" class="text-[9px] font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400">AI</span>
            </div>
            <p v-if="ann.label" class="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap mt-1.5">{{ ann.label }}</p>
            <p v-else class="text-xs text-slate-400 dark:text-slate-500 italic mt-1.5">No note</p>
            <time class="text-[10px] font-mono text-slate-400 block mt-2">{{ formatDate(ann.createdAt) }}</time>
          </div>

          <div class="flex flex-col gap-1 shrink-0">
            <button
              type="button"
              class="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline px-1"
              @click="$emit('jump-to-view', ann)"
            >
              Jump to view
            </button>
            <button
              type="button"
              class="text-[10px] font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 px-1"
              @click="$emit('edit', ann)"
            >
              Edit
            </button>
            <button
              type="button"
              class="text-[10px] font-semibold text-slate-500 hover:text-red-600 dark:hover:text-red-400 px-1"
              @click="remove(ann.id)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
      <p v-if="error" class="text-xs text-red-600 dark:text-red-400">{{ error }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Circle, CircleDot, Square } from '@lucide/vue';
import { canAnnotate as checkCanAnnotate } from '@/composables/useAuth';
import { formatCatalogDateTime } from '@rtidb/shared';
import type { RecordAnnotation } from '@rtidb/shared/api/annotations';
import * as annotationsApi from '@/api/annotations';
import { ApiError } from '@/api/client';

const props = defineProps({
  recordId: { type: [Number, String], required: true },
  recordSlug: { type: String, default: '' },
  embedded: { type: Boolean, default: false },
  highlightId: { type: [Number, String], default: null },
});

const emit = defineEmits(['jump-to-view', 'updated', 'loaded', 'edit']);

const canAnnotate = ref(checkCanAnnotate());
const annotations = ref([]);
const loading = ref(false);
const error = ref('');

const recordKey = () => props.recordSlug || props.recordId;
const formatDate = (iso) => formatCatalogDateTime(iso);

const TYPE_LABELS = { point: 'Point', circle: 'Circle', rectangle: 'Rectangle' };
const TYPE_ICONS = { point: CircleDot, circle: Circle, rectangle: Square };
const typeLabel = (ann) => TYPE_LABELS[ann.type] || 'Annotation';
const typeIcon = (ann) => TYPE_ICONS[ann.type] || Circle;

async function fetchAnnotations() {
  if (!canAnnotate.value) return;
  loading.value = true;
  error.value = '';
  try {
    annotations.value = await annotationsApi.listAnnotations(recordKey());
  } catch (err) {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      canAnnotate.value = false;
      return;
    }
    error.value = err instanceof Error ? err.message : 'Failed to load annotations';
  } finally {
    loading.value = false;
    emit('loaded');
  }
}

async function remove(id: number) {
  if (!window.confirm('Delete this annotation?')) return;
  try {
    await annotationsApi.deleteAnnotation(recordKey(), id);
    annotations.value = annotations.value.filter((a) => a.id !== id);
    emit('updated');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to delete';
  }
}

defineExpose({ annotations, fetchAnnotations, refresh: fetchAnnotations });

onMounted(fetchAnnotations);
watch(() => props.recordId, fetchAnnotations);
</script>
