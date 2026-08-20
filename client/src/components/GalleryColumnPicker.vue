<template>
  <div class="relative">
    <div ref="buttonEl">
      <Button
        type="button"
        variant="outline"
        :aria-expanded="open"
        aria-haspopup="dialog"
        @click="toggle"
      >
        <Columns3Icon class="w-4 h-4" />
        Columns
      </Button>
    </div>

    <Teleport :to="overlayContainer">
      <div
        v-if="open"
        class="fixed inset-0 z-[200]"
        aria-hidden="true"
        @click="open = false"
      />
      <div
        v-if="open"
        role="dialog"
        aria-label="Configure gallery columns"
        class="fixed z-[210] max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl"
        :style="panelStyle"
      >
        <ScrollArea class="h-[min(28rem,calc(100vh-5rem))]">
          <div class="p-4 space-y-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="text-sm font-semibold text-slate-800 dark:text-white">Table columns</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Choose visible columns and their order.
            </p>
          </div>
          <Button
            type="button"
            variant="link"
            size="xs"
            class="h-auto px-0 shrink-0"
            @click="resetColumns"
          >
            Reset
          </Button>
        </div>

        <div class="space-y-2">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Visible
          </p>
          <ul class="space-y-1">
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
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  :disabled="index === 0"
                  title="Move up"
                  @click="move(col.id, -1)"
                >
                  <ChevronUpIcon class="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  :disabled="index === visibleColumns.length - 1"
                  title="Move down"
                  @click="move(col.id, 1)"
                >
                  <ChevronDownIcon class="w-4 h-4" />
                </Button>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="hiddenColumns.length > 0" class="space-y-2">
          <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Available
          </p>
          <ul class="space-y-1">
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
        </ScrollArea>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { useOverlayContainer } from '@/composables/useOverlayContainer';
import { Columns3 as Columns3Icon, ChevronUp as ChevronUpIcon, ChevronDown as ChevronDownIcon } from '@lucide/vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  getHiddenColumns,
  moveColumn,
  resolveVisibleColumns,
  toggleColumn,
  type GalleryColumnField,
  type GalleryColumnPrefs,
} from '@/lib/galleryColumns';

const props = withDefaults(defineProps<{
  prefs: GalleryColumnPrefs;
  extraFields?: GalleryColumnField[];
}>(), {
  extraFields: () => [],
});

const emit = defineEmits<{
  change: [prefs: GalleryColumnPrefs];
  reset: [];
}>();

const extraFields = computed(() => props.extraFields ?? []);
const overlayContainer = useOverlayContainer();
const open = ref(false);
const buttonEl = ref<HTMLElement | null>(null);
const panelStyle = ref<Record<string, string>>({});

const visibleColumns = computed(() => resolveVisibleColumns(props.prefs, extraFields.value));
const hiddenColumns = computed(() => getHiddenColumns(props.prefs, extraFields.value));

const PANEL_MARGIN = 16;
const PANEL_WIDTH = 22 * 16;

function updatePosition() {
  const el = buttonEl.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const top = `${rect.bottom + 8}px`;
  const narrow = window.matchMedia('(max-width: 767px)').matches;

  if (narrow) {
    const width = Math.min(PANEL_WIDTH, window.innerWidth - PANEL_MARGIN * 2);
    panelStyle.value = {
      top,
      left: '50%',
      right: 'auto',
      width: `${width}px`,
      transform: 'translateX(-50%)',
    };
    return;
  }

  const width = Math.min(PANEL_WIDTH, window.innerWidth - PANEL_MARGIN * 2);
  const maxLeft = window.innerWidth - PANEL_MARGIN - width;
  const left = Math.min(Math.max(rect.right - width, PANEL_MARGIN), maxLeft);
  panelStyle.value = {
    top,
    left: `${left}px`,
    right: 'auto',
    width: `${width}px`,
    transform: 'none',
  };
}

function toggle() {
  open.value = !open.value;
}

watch(open, (isOpen) => {
  if (!isOpen) {
    window.removeEventListener('resize', updatePosition);
    window.removeEventListener('scroll', updatePosition, true);
    return;
  }
  updatePosition();
  window.addEventListener('resize', updatePosition);
  window.addEventListener('scroll', updatePosition, true);
});

onUnmounted(() => {
  window.removeEventListener('resize', updatePosition);
  window.removeEventListener('scroll', updatePosition, true);
});

function apply(next: GalleryColumnPrefs) {
  emit('change', next);
}

function setColumnVisible(columnId: string, visible: boolean) {
  apply(toggleColumn(props.prefs, columnId, visible, extraFields.value));
}

function move(columnId: string, direction: -1 | 1) {
  apply(moveColumn(props.prefs, columnId, direction));
}

function resetColumns() {
  emit('reset');
}
</script>
