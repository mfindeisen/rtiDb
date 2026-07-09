<template>
  <div class="relative">
    <button
      type="button"
      class="btn-secondary inline-flex items-center justify-center gap-2 text-sm !py-2.5 !px-4 whitespace-nowrap"
      :aria-expanded="open"
      aria-haspopup="dialog"
      @click="open = !open"
    >
      <Columns3Icon class="w-4 h-4" />
      Columns
    </button>

    <div
      v-if="open"
      class="fixed inset-0 z-40"
      aria-hidden="true"
      @click="open = false"
    />

    <div
      v-if="open"
      role="dialog"
      aria-label="Configure gallery columns"
      class="absolute right-0 top-full mt-2 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl p-4 space-y-4"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-sm font-semibold text-slate-800 dark:text-white">Table columns</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Choose visible columns and their order.
          </p>
        </div>
        <button
          type="button"
          class="text-xs text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          @click="resetColumns"
        >
          Reset
        </button>
      </div>

      <div class="space-y-2">
        <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Visible
        </p>
        <ul class="space-y-1 max-h-52 overflow-y-auto">
          <li
            v-for="(col, index) in visibleColumns"
            :key="col.id"
            class="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 px-2 py-1.5 bg-slate-50/80 dark:bg-white/[0.03]"
          >
            <Checkbox
              :id="`gallery-col-${col.id}`"
              :model-value="true"
              :disabled="visibleColumns.length <= 1"
              @update:model-value="(checked) => setColumnVisible(col.id, checked === true)"
            />
            <label
              :for="`gallery-col-${col.id}`"
              class="flex-1 text-sm text-slate-700 dark:text-slate-200 cursor-pointer truncate"
            >
              {{ col.label }}
            </label>
            <div class="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                class="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                :disabled="index === 0"
                title="Move up"
                @click="move(col.id, -1)"
              >
                <ChevronUpIcon class="w-4 h-4" />
              </button>
              <button
                type="button"
                class="p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                :disabled="index === visibleColumns.length - 1"
                title="Move down"
                @click="move(col.id, 1)"
              >
                <ChevronDownIcon class="w-4 h-4" />
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="hiddenColumns.length > 0" class="space-y-2">
        <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Available
        </p>
        <ul class="space-y-1 max-h-40 overflow-y-auto">
          <li
            v-for="col in hiddenColumns"
            :key="col.id"
            class="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-white/[0.03]"
          >
            <Checkbox
              :id="`gallery-col-${col.id}`"
              :model-value="false"
              @update:model-value="(checked) => setColumnVisible(col.id, checked === true)"
            />
            <label
              :for="`gallery-col-${col.id}`"
              class="flex-1 text-sm text-slate-600 dark:text-slate-300 cursor-pointer truncate"
            >
              {{ col.label }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Columns3 as Columns3Icon, ChevronUp as ChevronUpIcon, ChevronDown as ChevronDownIcon } from '@lucide/vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import {
  getHiddenColumns,
  loadGalleryColumnPrefs,
  moveColumn,
  resetGalleryColumnPrefs,
  resolveVisibleColumns,
  saveGalleryColumnPrefs,
  toggleColumn,
  type GalleryColumnPrefs,
} from '@/lib/galleryColumns';

const emit = defineEmits<{
  change: [prefs: GalleryColumnPrefs];
}>();

const open = ref(false);
const prefs = ref<GalleryColumnPrefs>(loadGalleryColumnPrefs());

const visibleColumns = computed(() => resolveVisibleColumns(prefs.value));
const hiddenColumns = computed(() => getHiddenColumns(prefs.value));

function apply(next: GalleryColumnPrefs) {
  prefs.value = next;
  saveGalleryColumnPrefs(next);
  emit('change', next);
}

function setColumnVisible(columnId: string, visible: boolean) {
  apply(toggleColumn(prefs.value, columnId, visible));
}

function move(columnId: string, direction: -1 | 1) {
  apply(moveColumn(prefs.value, columnId, direction));
}

function resetColumns() {
  apply(resetGalleryColumnPrefs());
}
</script>
