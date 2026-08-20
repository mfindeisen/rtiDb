<template>
  <div class="page-shell space-y-8">
    <div class="text-center mb-6 md:mb-12">
      <h2 class="page-title mb-4">RTI Gallery</h2>
    </div>

    <div v-if="loading" class="text-center py-20 text-slate-400">
      <div class="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4" />
      <p>Loading gallery...</p>
    </div>

    <div v-else-if="error" class="p-4 bg-red-500/10 border border-red-500 text-red-500 dark:text-red-300 rounded-lg text-center">
      {{ error }}
    </div>

    <div v-else class="glass-card flex flex-col !p-0 overflow-hidden">
      <div class="flex flex-col gap-3 p-3 sm:p-6 pb-3 sm:pb-4 md:flex-row md:justify-between md:items-center md:gap-4">
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 min-w-0">
          <div class="relative flex-1 md:max-w-xs min-w-0">
            <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <Input
              v-model="searchQuery"
              type="text"
              placeholder="Search catalog..."
              class="pl-10 w-full"
            />
          </div>
          <Button as-child variant="outline" class="w-full sm:w-auto shrink-0">
            <router-link to="/search">
              <ScanSearchIcon class="w-4 h-4" />
              Advanced Search
            </router-link>
          </Button>
        </div>

        <div class="flex flex-wrap items-center gap-2 w-full min-w-0 md:w-auto">
          <div v-if="galleryViews.length" class="w-full min-w-0 basis-full sm:w-auto sm:basis-auto">
            <Select :model-value="selectedViewSlug" @update:model-value="onViewChange">
              <SelectTrigger class="w-full min-w-0 sm:w-[12rem]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="view in galleryViews" :key="view.slug" :value="view.slug">{{ view.name }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <GalleryColumnPicker
            :prefs="columnPrefs"
            :extra-fields="viewFields"
            @change="onColumnPrefsChange"
            @reset="onColumnReset"
          />
          <div class="flex items-center gap-2 ml-auto sm:ml-0">
            <Label class="text-sm font-medium text-slate-600 dark:text-slate-300 shrink-0">Show:</Label>
            <Select :model-value="String(itemsPerPage)" @update:model-value="onItemsPerPageChange">
              <SelectTrigger class="w-[4.75rem] shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" align="end">
                <SelectItem v-for="n in pageSizeOptions" :key="n" :value="String(n)">{{ n }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <!-- Mobile card list -->
      <div class="md:hidden space-y-3 px-4 sm:px-6 pb-4 sm:pb-6">
        <router-link
          v-for="rec in records"
          :key="rec.id"
          :to="recordPath(rec)"
          class="rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 p-4 flex gap-3 active:bg-slate-50 dark:active:bg-white/5 no-underline text-inherit"
        >
          <div class="w-16 h-16 shrink-0 bg-slate-200 dark:bg-slate-800 rounded-md overflow-hidden border border-slate-300 dark:border-slate-700">
            <img v-if="rec.thumbnailUrl" :src="rec.thumbnailUrl" alt="" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
              <ImageIcon class="w-6 h-6 opacity-30" />
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-bold text-slate-800 dark:text-white leading-snug wrap-anywhere">{{ rec.name }}</h3>
            <div class="flex flex-wrap items-center gap-1.5 mt-1">
              <span v-if="rec.recordTypeName" class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10">{{ rec.recordTypeName }}</span>
              <RecordOutputBadge :record="rec" />
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1" :dir="rec.direction">{{ rec.description }}</p>
            <p class="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-2">{{ formatRecordDateTime(rec.date) }}</p>
          </div>
        </router-link>
        <p v-if="records.length === 0" class="text-center py-8 text-slate-500 dark:text-slate-400">
          No scans match your search.
        </p>
      </div>

      <!-- Desktop table -->
      <ScrollArea
        type="auto"
        class="hidden md:block border-t border-slate-200 dark:border-white/10 [&_[data-slot=scroll-area-viewport]]:h-auto [&_[data-slot=scroll-area-viewport]]:w-full [&_[data-slot=scroll-area-viewport]>div]:min-w-max [&_[data-slot=scroll-area-viewport]>div]:pb-2.5"
      >
        <table class="min-w-full w-max text-left border-collapse">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm border-b border-slate-200 dark:border-white/10">
              <th
                v-for="col in visibleColumns"
                :key="col.id"
                class="p-4 font-semibold whitespace-nowrap sticky top-0 z-20 bg-slate-100 dark:bg-slate-800"
                :class="[columnSizeClass(col), col.align === 'center' ? 'text-center' : '']"
                :aria-sort="ariaSortForColumn(col)"
              >
                <button
                  v-if="sortFieldForColumn(col)"
                  type="button"
                  class="inline-flex items-center gap-1.5 font-semibold text-inherit hover:text-slate-900 dark:hover:text-white transition-colors select-none whitespace-nowrap"
                  :class="[
                    col.align === 'center' ? 'justify-center w-full' : '',
                    isColumnSorted(col) ? 'text-slate-900 dark:text-white' : '',
                  ]"
                  :aria-label="`Sort by ${col.label}`"
                  @click="toggleSort(col)"
                >
                  <span>{{ col.label }}</span>
                  <ChevronUpIcon
                    v-if="isColumnSorted(col) && activeSort?.dir === 'asc'"
                    class="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <ChevronDownIcon
                    v-else-if="isColumnSorted(col) && activeSort?.dir === 'desc'"
                    class="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <ArrowUpDownIcon
                    v-else
                    class="w-3.5 h-3.5 shrink-0 opacity-40"
                    aria-hidden="true"
                  />
                </button>
                <span v-else>{{ col.label }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="rec in records"
              :key="rec.id"
              class="border-b border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 focus-within:bg-slate-50 dark:focus-within:bg-white/5 transition-colors group"
            >
              <td
                v-for="(col, colIndex) in visibleColumns"
                :key="col.id"
                class="p-4 align-middle relative overflow-hidden"
                :class="[columnSizeClass(col), col.align === 'center' ? 'text-center' : '']"
              >
                <router-link
                  :to="recordPath(rec)"
                  class="absolute inset-0 z-10 block outline-none"
                  :aria-label="colIndex === 0 ? rec.name : undefined"
                  :aria-hidden="colIndex !== 0"
                  :tabindex="colIndex === 0 ? undefined : -1"
                />
                <template v-if="col.kind === 'preview'">
                  <div class="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-md overflow-hidden relative shadow-sm border border-slate-300 dark:border-slate-700">
                    <img
                      v-if="rec.thumbnailUrl"
                      :src="rec.thumbnailUrl"
                      alt="Thumbnail"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIcon class="w-6 h-6 opacity-30" />
                    </div>
                  </div>
                </template>

                <template v-else-if="col.kind === 'nameDescription'">
                  <div class="flex flex-wrap items-center gap-2 mb-1">
                    <h3 class="text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {{ rec.name }}
                    </h3>
                    <RecordOutputBadge :record="rec" />
                  </div>
                  <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-1" :dir="rec.direction">{{ rec.description }}</p>
                </template>

                <template v-else-if="col.kind === 'name'">
                  <h3 class="text-base font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ rec.name }}
                  </h3>
                </template>

                <template v-else-if="col.kind === 'description'">
                  <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2" :dir="rec.direction">{{ rec.description || '—' }}</p>
                </template>

                <template v-else-if="col.kind === 'outputType'">
                  <RecordOutputBadge :record="rec" />
                </template>

                <template v-else-if="col.kind === 'dates'">
                  <div class="space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <div>
                      <div class="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        Date created
                      </div>
                      <div class="font-mono text-xs text-slate-600 dark:text-slate-300">
                        {{ formatRecordDateTime(rec.date) }}
                      </div>
                    </div>
                    <div v-if="getRecordUpdatedAt(rec)">
                      <div class="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        Date updated
                      </div>
                      <div class="font-mono text-xs text-slate-600 dark:text-slate-300">
                        {{ getRecordUpdatedAt(rec) }}
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else-if="col.kind === 'dateCreated'">
                  <span class="font-mono text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {{ formatRecordDateTime(rec.date) }}
                  </span>
                </template>

                <template v-else-if="col.kind === 'dateUpdated'">
                  <span class="font-mono text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {{ getRecordUpdatedAt(rec) || '—' }}
                  </span>
                </template>

                <template v-else-if="col.kind === 'recordType'">
                  <span class="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">{{ rec.recordTypeName || '—' }}</span>
                </template>

                <template v-else-if="col.kind === 'metadata'">
                  <span class="text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {{ getMetadataValue(rec, col.metadataKey!) || '—' }}
                  </span>
                </template>

                <template v-else-if="col.kind === 'action'">
                  <span
                    class="inline-flex p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors shadow-sm pointer-events-none"
                    aria-hidden="true"
                  >
                    <EyeIcon class="w-5 h-5" />
                  </span>
                </template>
              </td>
            </tr>
            <tr v-if="records.length === 0">
              <td :colspan="visibleColumns.length" class="p-8 text-center text-slate-500 dark:text-slate-400">
                No scans match your search.
              </td>
            </tr>
          </tbody>
        </table>
      </ScrollArea>

      <div class="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 sm:p-6 pt-4 border-t border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400">
        <div class="text-center sm:text-left">
          Showing <span class="font-bold text-slate-800 dark:text-white">{{ totalResults === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1 }}</span> to
          <span class="font-bold text-slate-800 dark:text-white">{{ Math.min(currentPage * itemsPerPage, totalResults) }}</span> of
          <span class="font-bold text-slate-800 dark:text-white">{{ totalResults }}</span> entries
        </div>

        <div class="flex flex-wrap items-center justify-center gap-2 max-w-full">
          <Button
            type="button"
            variant="outline"
            size="sm"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            <ChevronLeftIcon class="w-4 h-4" /> Prev
          </Button>

          <div class="flex gap-1">
            <Button
              v-for="p in visiblePages"
              :key="p"
              type="button"
              size="icon-sm"
              :variant="currentPage === p ? 'default' : 'outline'"
              @click="goToPage(p)"
            >
              {{ p }}
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            :disabled="currentPage >= totalPages || totalPages === 0"
            @click="nextPage"
          >
            Next <ChevronRightIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { recordPath } from '@/lib/recordPath';
import { formatRecordDateTime, getRecordUpdatedAt } from '@rtidb/shared';
import type { RecordRow } from '@rtidb/shared/api/records';
import { listRecordsPage } from '@/api/records';
import { listCatalogViews, listRecordTypes } from '@/api/catalog';
import type { CatalogView } from '@rtidb/shared/api/catalog';
import type { RecordType } from '@rtidb/shared/api/catalog';
import RecordOutputBadge from '@/components/RecordOutputBadge.vue';
import GalleryColumnPicker from '@/components/GalleryColumnPicker.vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DEFAULT_VISIBLE_COLUMN_IDS,
  clearColumnOverride,
  getColumnOverride,
  getMetadataValue,
  hasStoredGalleryColumnPrefs,
  loadGalleryColumnPrefs,
  resolveColumnsByIds,
  sanitizeColumnIds,
  saveGalleryColumnPrefs,
  setColumnOverride,
  sortFieldForColumn,
  type GalleryColumnDef,
  type GalleryColumnPrefs,
} from '@/lib/galleryColumns';
import { flattenCatalogFields } from '@rtidb/shared';
import {
  Search as SearchIcon,
  ScanSearch as ScanSearchIcon,
  Image as ImageIcon,
  Eye as EyeIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  ArrowUpDown as ArrowUpDownIcon,
} from '@lucide/vue';

const GALLERY_VIEW_KEY = 'galleryViewSlug';
const GALLERY_PAGE_SIZE_KEY = 'galleryPageSize';
const records = ref<RecordRow[]>([]);
const totalResults = ref(0);
const totalPages = ref(1);
const galleryViews = ref<CatalogView[]>([]);
const recordTypes = ref<RecordType[]>([]);
const selectedViewSlug = ref('');
const loading = ref(true);
const error = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const pageSizeOptions = [5, 10, 20, 50] as const;

function readGalleryPageSize(): (typeof pageSizeOptions)[number] {
  try {
    const n = Number(typeof localStorage !== 'undefined' ? localStorage.getItem(GALLERY_PAGE_SIZE_KEY) : '');
    if ((pageSizeOptions as readonly number[]).includes(n)) {
      return n as (typeof pageSizeOptions)[number];
    }
  } catch {
    /* ignore */
  }
  return 10;
}

const itemsPerPage = ref<(typeof pageSizeOptions)[number]>(readGalleryPageSize());
const columnPrefs = ref<GalleryColumnPrefs>(loadGalleryColumnPrefs());
const userSort = ref<{ field: string; dir: 'asc' | 'desc' } | null>(null);

const selectedView = computed(() => galleryViews.value.find((view) => view.slug === selectedViewSlug.value) || galleryViews.value.find((view) => view.isDefault) || galleryViews.value[0] || null);

const viewFields = computed(() => {
  const type = recordTypes.value.find((item) => item.id === selectedView.value?.recordTypeId);
  const fields = type
    ? flattenCatalogFields(type.schema)
    : recordTypes.value.flatMap((item) => flattenCatalogFields(item.schema).filter((field) => field.showInGallery));
  const unique: Array<{ key: string; label: string }> = [];
  const seen = new Set<string>();
  for (const field of fields) {
    if (seen.has(field.key)) continue;
    seen.add(field.key);
    unique.push(field);
  }
  return unique;
});

const viewColumnIds = computed(() =>
  selectedView.value?.config.visibleColumnIds?.length
    ? selectedView.value.config.visibleColumnIds
    : [...DEFAULT_VISIBLE_COLUMN_IDS],
);

const visibleColumns = computed(() =>
  resolveColumnsByIds(columnPrefs.value.visibleOrder, viewFields.value),
);

function applyColumnsForView(slug: string) {
  const override = slug ? getColumnOverride(slug) : null;
  const fallback = !slug && hasStoredGalleryColumnPrefs()
    ? loadGalleryColumnPrefs().visibleOrder
    : viewColumnIds.value;
  columnPrefs.value = {
    visibleOrder: sanitizeColumnIds(override ?? fallback, viewFields.value, viewColumnIds.value),
  };
}

const activeSort = computed(() => userSort.value ?? selectedView.value?.config.sort ?? null);

function galleryQuery(): Record<string, string> {
  const params: Record<string, string> = {
    published: '1',
    page: String(currentPage.value),
    limit: String(itemsPerPage.value),
  };
  const q = searchQuery.value.trim();
  if (q) params.q = q;
  const view = selectedView.value;
  if (view?.recordTypeId) params.recordTypeId = String(view.recordTypeId);
  if (view?.config.filters) {
    for (const [key, value] of Object.entries(view.config.filters)) {
      if (value) params[key] = value;
    }
  }
  const sort = activeSort.value;
  if (sort?.field) {
    params.sort = sort.field;
    params.dir = sort.dir;
  }
  return params;
}

async function fetchGallery() {
  const result = await listRecordsPage(galleryQuery());
  records.value = result.results;
  totalResults.value = result.total;
  totalPages.value = result.totalPages;
  if (currentPage.value > result.totalPages && result.totalPages >= 1) {
    currentPage.value = result.totalPages;
  }
}

let galleryReady = false;
let searchTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(async () => {
  try {
    const [views, types] = await Promise.all([
      listCatalogViews().catch(() => []),
      listRecordTypes().catch(() => []),
    ]);
    galleryViews.value = views;
    recordTypes.value = types;
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(GALLERY_VIEW_KEY) : '';
    const match = views.find((view) => view.slug === stored);
    selectedViewSlug.value = match?.slug || views.find((view) => view.isDefault)?.slug || views[0]?.slug || '';
    if (hasStoredGalleryColumnPrefs()) {
      const defaultSlug = views.find((view) => view.isDefault)?.slug || views[0]?.slug || '';
      if (defaultSlug && !getColumnOverride(defaultSlug)) {
        setColumnOverride(defaultSlug, loadGalleryColumnPrefs().visibleOrder);
      }
    }
    applyColumnsForView(selectedViewSlug.value);
    await fetchGallery();
    galleryReady = true;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch records';
  } finally {
    loading.value = false;
  }
});

function onViewChange(value: unknown) {
  selectedViewSlug.value = String(value || '');
  if (typeof localStorage !== 'undefined') localStorage.setItem(GALLERY_VIEW_KEY, selectedViewSlug.value);
  applyColumnsForView(selectedViewSlug.value);
  userSort.value = null;
  currentPage.value = 1;
}

function onColumnPrefsChange(prefs: GalleryColumnPrefs) {
  columnPrefs.value = prefs;
  if (selectedViewSlug.value) setColumnOverride(selectedViewSlug.value, prefs.visibleOrder);
  else saveGalleryColumnPrefs(prefs);
}

function onColumnReset() {
  if (selectedViewSlug.value) clearColumnOverride(selectedViewSlug.value);
  columnPrefs.value = {
    visibleOrder: sanitizeColumnIds(viewColumnIds.value, viewFields.value, [...DEFAULT_VISIBLE_COLUMN_IDS]),
  };
}

function onItemsPerPageChange(value: unknown) {
  const n = Number(value);
  if ((pageSizeOptions as readonly number[]).includes(n)) {
    itemsPerPage.value = n as (typeof pageSizeOptions)[number];
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(GALLERY_PAGE_SIZE_KEY, String(n));
    } catch {
      /* ignore */
    }
  }
}

function columnSizeClass(col: GalleryColumnDef): string {
  if (col.kind === 'preview' || col.kind === 'action') return 'min-w-24 w-24';
  if (col.kind === 'outputType') return 'min-w-36';
  if (col.kind === 'dates' || col.kind === 'dateCreated' || col.kind === 'dateUpdated') return 'min-w-52';
  if (col.kind === 'recordType' || col.kind === 'metadata') return 'min-w-44';
  if (col.kind === 'nameDescription') return 'min-w-72';
  if (col.kind === 'name') return 'min-w-56';
  if (col.kind === 'description') return 'min-w-64';
  return 'min-w-40';
}

function isColumnSorted(col: GalleryColumnDef): boolean {
  const field = sortFieldForColumn(col);
  return !!field && activeSort.value?.field === field;
}

function ariaSortForColumn(col: GalleryColumnDef): 'ascending' | 'descending' | 'none' | undefined {
  if (!sortFieldForColumn(col)) return undefined;
  if (!isColumnSorted(col)) return 'none';
  return activeSort.value?.dir === 'asc' ? 'ascending' : 'descending';
}

function toggleSort(col: GalleryColumnDef) {
  const field = sortFieldForColumn(col);
  if (!field) return;
  const current = activeSort.value;
  if (current?.field === field) {
    userSort.value = { field, dir: current.dir === 'asc' ? 'desc' : 'asc' };
  } else {
    const dateField = field === 'date' || field === 'dateUpdated';
    userSort.value = { field, dir: dateField ? 'desc' : 'asc' };
  }
  currentPage.value = 1;
}

const visiblePages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage.value - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;
  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  for (let i = startPage; i <= endPage; i++) pages.push(i);
  return pages;
});

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const goToPage = (page: number) => { currentPage.value = page; };

function resetToFirstPage() {
  if (currentPage.value !== 1) currentPage.value = 1;
  else if (galleryReady) void fetchGallery();
}

watch(searchQuery, () => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => resetToFirstPage(), 300);
});
watch(itemsPerPage, () => {
  resetToFirstPage();
});
watch(selectedViewSlug, () => {
  if (!galleryReady) return;
  resetToFirstPage();
});
watch(activeSort, () => {
  if (!galleryReady) return;
  resetToFirstPage();
});
watch(currentPage, () => {
  if (galleryReady) void fetchGallery();
});
</script>
