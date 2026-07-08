<template>
  <div class="space-y-4">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h4 class="section-label flex items-center gap-2 mb-1">
          <History class="w-3.5 h-3.5" /> Version History
        </h4>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Read-only audit trail of catalog metadata and record state. Historical versions cannot be re-applied.
          <span v-if="currentRevision">Current revision: <strong class="font-mono">v{{ currentRevision }}</strong></span>
        </p>
      </div>
      <button
        v-if="selectedRevision && compareTarget"
        type="button"
        class="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10"
        @click="clearSelection"
      >
        Clear comparison
      </button>
    </div>

    <div v-if="loading" class="text-xs text-slate-500 dark:text-slate-400 py-4">Loading revision historyÔÇª</div>
    <div v-else-if="forbidden" class="text-xs text-slate-500 dark:text-slate-400 py-2">
      Version history is only available for published records unless you are signed in as an editor.
    </div>
    <div v-else-if="error" class="text-xs text-red-600 dark:text-red-400 py-2">{{ error }}</div>

    <template v-else>
      <div
        v-if="diffItems.length"
        class="rounded-xl border border-blue-200/80 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/10 p-4 space-y-3"
      >
        <h5 class="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Comparison: v{{ compareFrom }} ÔåÆ {{ compareToLabel }}
        </h5>
        <div class="space-y-2 max-h-64 overflow-y-auto [scrollbar-gutter:stable]">
          <div
            v-for="item in diffItems"
            :key="item.key"
            class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-3 text-xs"
          >
            <div class="font-semibold text-slate-700 dark:text-slate-200 mb-1">{{ item.label }}</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div class="text-red-700/80 dark:text-red-300/90 whitespace-pre-wrap break-words">
                <span class="text-[10px] uppercase tracking-wide text-slate-400 block mb-0.5">Before</span>
                {{ formatRevisionValue(item.old) }}
              </div>
              <div class="text-emerald-700/80 dark:text-emerald-300/90 whitespace-pre-wrap break-words">
                <span class="text-[10px] uppercase tracking-wide text-slate-400 block mb-0.5">After</span>
                {{ formatRevisionValue(item.new) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="revisions.length === 0" class="text-xs text-slate-500 dark:text-slate-400 py-2">
        No revisions recorded yet.
      </div>

      <ul v-else class="space-y-3">
        <li
          v-for="revision in revisions"
          :key="revision.id"
          class="rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] overflow-hidden"
        >
          <div class="p-4 space-y-2">
            <div class="flex flex-wrap items-start justify-between gap-2">
              <div class="space-y-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-mono text-sm font-bold text-slate-800 dark:text-white">v{{ revision.revisionNumber }}</span>
                  <span
                    v-if="revision.revisionNumber === currentRevision"
                    class="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  >
                    Current
                  </span>
                  <span class="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {{ revisionActionLabel(revision.action) }}
                  </span>
                </div>
                <p v-if="revision.comment" class="text-xs text-slate-600 dark:text-slate-300">{{ revision.comment }}</p>
              </div>
              <time class="text-[10px] font-mono text-slate-400 shrink-0">{{ formatCatalogDateTime(revision.createdAt) }}</time>
            </div>

            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span v-if="revision.createdByName">by {{ revision.createdByName }}</span>
              <span v-else-if="revision.action === 'imported'">system migration</span>
              <span v-else>system</span>
              <span v-if="revision.changeCount > 0">{{ revision.changeCount }} field{{ revision.changeCount === 1 ? '' : 's' }} changed</span>
              <span v-else-if="revision.revisionNumber === 1">baseline</span>
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                class="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400"
                @click="compareWithCurrent(revision.revisionNumber)"
              >
                Compare with current
              </button>
              <button
                v-if="revision.revisionNumber > 1"
                type="button"
                class="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400"
                @click="compareWithPrevious(revision.revisionNumber)"
              >
                Compare with previous
              </button>
            </div>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { History } from '@lucide/vue';
import { formatCatalogDateTime } from '@rtidb/shared';
import {
  revisionActionLabel,
  formatRevisionValue,
  flattenRevisionChanges,
} from '@rtidb/shared/recordRevisions';
import * as revisionsApi from '@/api/revisions';
import { ApiError } from '@/api/client';

const props = defineProps<{
  recordId: number | string;
  recordSlug?: string;
}>();

const loading = ref(true);
const error = ref('');
const forbidden = ref(false);
const revisions = ref<import('@rtidb/shared/recordRevisions').SerializedRevision[]>([]);
const currentRevision = ref(0);
const selectedRevision = ref<number | null>(null);
const compareTarget = ref<number | 'current' | null>(null);
const diffItems = ref<import('@rtidb/shared/recordRevisions').RevisionChangeItem[]>([]);

const recordKey = computed(() => props.recordSlug || props.recordId);
const compareFrom = computed(() => selectedRevision.value);
const compareToLabel = computed(() => (compareTarget.value === 'current' ? 'current' : `v${compareTarget.value}`));

const loadRevisions = async () => {
  loading.value = true;
  error.value = '';
  forbidden.value = false;
  try {
    const data = await revisionsApi.listRevisions(recordKey.value);
    revisions.value = data.revisions || [];
    currentRevision.value = data.currentRevision || 0;
  } catch (err) {
    if (err instanceof ApiError && err.status === 403) {
      forbidden.value = true;
      return;
    }
    error.value = err instanceof Error ? err.message : 'Failed to load revisions';
  } finally {
    loading.value = false;
  }
};

const loadComparison = async (from: number, to: number | 'current') => {
  selectedRevision.value = from;
  compareTarget.value = to;
  diffItems.value = [];
  try {
    const data = await revisionsApi.compareRevisions(recordKey.value, from, to);
    diffItems.value = flattenRevisionChanges(data.changes);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Comparison failed';
  }
};

const compareWithCurrent = (revisionNumber: number) => {
  loadComparison(revisionNumber, 'current');
};

const compareWithPrevious = (revisionNumber: number) => {
  if (revisionNumber <= 1) return;
  loadComparison(revisionNumber - 1, revisionNumber);
};

const clearSelection = () => {
  selectedRevision.value = null;
  compareTarget.value = null;
  diffItems.value = [];
  error.value = '';
};

onMounted(loadRevisions);
watch(() => [props.recordId, props.recordSlug], loadRevisions);
</script>
