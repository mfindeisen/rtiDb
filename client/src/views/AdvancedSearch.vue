<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <button
      type="button"
      class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors"
      @click="goBack"
    >
      <ArrowLeft class="w-5 h-5" /> Back
    </button>

    <div class="text-center mb-4">
      <h2 class="page-title mb-2">Advanced Search</h2>
      <p class="section-sub">Full-text search, metadata filters, spatial map, and image similarity</p>
    </div>

    <SegmentPills v-model="activeTab" class="max-w-md mx-auto" full-width :options="tabOptions" />

    <div v-if="activeTab === 'search'" class="space-y-4">
      <InfoCallout variant="info" title="How catalog search works" dismiss-key="search-how-catalog">
        <p>
          Search runs entirely on the server against published catalog records. Your query is matched
          case-insensitively against the record name, description, and all metadata fields.
        </p>
        <ul class="list-disc pl-4 mt-2 space-y-1 text-xs sm:text-sm opacity-90">
          <li><strong>Full-text</strong> — substring match across the combined catalog text (no external search engine).</li>
          <li><strong>Metadata filters</strong> — each filter requires a substring match in the corresponding field (e.g. cultural period, motif type).</li>
          <li><strong>Map view</strong> — records with GPS coordinates in <code class="text-[0.85em]">gpsPosition</code> appear as markers (parsed server-side).</li>
          <li><strong>Filter by map area</strong> — when enabled, only records inside the current map bounding box are returned; pan or zoom to refine the area.</li>
        </ul>
      </InfoCallout>

      <div class="glass-card !p-6 space-y-4">
        <div class="relative">
          <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            v-model="query"
            type="text"
            placeholder="Full-text search across all catalog fields…"
            class="form-input pl-10 w-full"
            @keydown.enter="runSearch"
          />
        </div>

        <details open class="rounded-xl border border-slate-200/70 dark:border-white/10 overflow-hidden">
          <summary class="cursor-pointer text-sm font-semibold select-none flex items-center gap-2 px-4 py-3 bg-slate-100/80 dark:bg-white/[0.04] text-slate-800 dark:text-white list-none [&::-webkit-details-marker]:hidden">
            Filters
            <span
              v-if="activeFilterCount"
              class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300"
            >
              {{ activeFilterCount }} active
            </span>
          </summary>
          <div class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-50/50 dark:bg-white/[0.02]">
            <div v-for="field in SEARCH_FILTER_FIELDS" :key="field.key" class="flex flex-col">
              <label class="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">{{ field.label }}</label>
              <select
                v-if="field.type === 'select'"
                :value="filters[field.key] || ''"
                class="form-input py-2 text-sm cursor-pointer"
                @change="filters[field.key] = ($event.target as HTMLSelectElement).value"
              >
                <option value="">Any</option>
                <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
              </select>
              <input
                v-else
                v-model="filters[field.key]"
                type="text"
                class="form-input py-2 text-sm"
                :placeholder="field.placeholder || ''"
              />
            </div>
          </div>
        </details>

        <div class="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <button type="button" class="btn-primary !py-2.5 !px-5 w-full sm:w-auto" @click="runSearch">Search</button>
          <button type="button" class="btn-secondary !py-2.5 !px-4 text-sm w-full sm:w-auto" @click="clearFilters">Clear filters</button>
          <a
            :href="exportCsvUrl"
            class="btn-secondary inline-flex items-center justify-center gap-1.5 !py-2.5 !px-4 text-sm w-full sm:w-auto"
            download
          >
            <Table class="w-4 h-4" /> Export CSV
          </a>
          <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer sm:ml-auto">
            <input v-model="spatialFilter" type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            Filter by map area
          </label>
          <SegmentPills v-model="viewMode" class="w-full sm:w-auto" :options="viewModeOptions" />
        </div>
      </div>

      <InfoCallout v-if="error" variant="error">{{ error }}</InfoCallout>

      <InfoCallout v-if="loading && activeTab === 'search'" variant="info" class="!py-4">
        <div class="flex items-center gap-3">
          <div class="inline-block animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full shrink-0" />
          <div>
            <p class="font-semibold">Searching catalog…</p>
            <p class="text-xs opacity-80 mt-0.5">Matching your query against metadata and map filters on the server.</p>
          </div>
        </div>
      </InfoCallout>

      <div :class="resultsGridClass">
        <div v-if="viewMode !== 'map'" class="space-y-3 min-h-[200px] relative">
          <div
            v-if="loading"
            class="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/60 dark:bg-slate-950/60 backdrop-blur-[1px]"
          >
            <div class="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            <span class="font-bold text-slate-800 dark:text-white">{{ total }}</span> result{{ total === 1 ? '' : 's' }}
            <span v-if="spatialFilter && mapBounds"> · filtered by map area</span>
          </p>

          <div
            v-for="rec in results"
            :key="rec.id"
            class="metadata-field !p-4 flex gap-4 cursor-pointer group"
            :class="selectedId === rec.id ? '!border-blue-500/50 ring-2 ring-blue-500/20' : ''"
            @click="goToRecord(rec)"
          >
            <div class="w-16 h-16 shrink-0 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700">
              <img
                v-if="rec.thumbnailUrl"
                :src="rec.thumbnailUrl"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                alt=""
              />
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="font-bold truncate text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ rec.name }}
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{{ rec.description }}</p>
              <div class="flex flex-wrap gap-2 mt-1.5">
                <span v-if="rec.metadata?.primaryMotif" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300">
                  {{ rec.metadata.primaryMotif }}
                </span>
                <span v-if="rec.metadata?.culturalPeriod" class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                  {{ rec.metadata.culturalPeriod }}
                </span>
                <span v-if="rec.metadata?.conservationStatus" class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  {{ rec.metadata.conservationStatus }}
                </span>
              </div>
            </div>
          </div>

          <p v-if="results.length === 0" class="text-center py-12 text-slate-500 dark:text-slate-400">No records match your search.</p>

          <div v-if="totalPages > 1" class="flex justify-center gap-2 pt-2">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-sm"
              :disabled="page <= 1"
              @click="changePage(page - 1)"
            >
              Prev
            </button>
            <span class="px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400">{{ page }} / {{ totalPages }}</span>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-sm"
              :disabled="page >= totalPages"
              @click="changePage(page + 1)"
            >
              Next
            </button>
          </div>
        </div>

        <div v-if="viewMode !== 'list'" class="h-[480px] lg:h-auto lg:min-h-[480px] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 relative">
          <div
            v-if="loading && viewMode === 'map'"
            class="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-slate-950/70"
          >
            <div class="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
          <SearchMap
            :markers="mapMarkers"
            :selected-id="selectedId"
            :auto-fit="!spatialFilter"
            @marker-click="onMarkerClick"
            @bounds-change="onBoundsChange"
          />
        </div>
      </div>
    </div>

    <div v-else class="space-y-4">
      <div class="glass-card !p-6 space-y-4">
        <div class="flex items-center gap-2 mb-1">
          <ScanIcon class="w-5 h-5 text-blue-500" />
          <h3 class="text-lg font-bold text-slate-800 dark:text-white">Image Search</h3>
        </div>
        <p class="section-sub">
          Upload a photograph or scan of a sealing motif to find visually similar entries in the catalog.
        </p>

        <InfoCallout variant="info" title="How image search works" dismiss-key="search-how-image">
          <p>
            The uploaded image is converted into a <strong>512-dimensional visual embedding</strong> using
            OpenAI CLIP (model: <code class="text-[0.85em]">Xenova/clip-vit-base-patch32</code>, running
            locally via ONNX on the server). That vector is compared with pre-computed embeddings of
            catalog thumbnails using <strong>cosine similarity</strong>.
          </p>
          <ul class="list-disc pl-4 mt-2 space-y-1 text-xs sm:text-sm opacity-90">
            <li><strong>Indexing</strong> — when an RTI record is processed, a CLIP embedding is computed from its thumbnail and stored in the database.</li>
            <li><strong>Query</strong> — your upload is embedded the same way; the server ranks published records by similarity.</li>
            <li><strong>Match score</strong> — shown as a percentage (cosine similarity × 100). Results below an internal threshold are hidden.</li>
            <li><strong>Semantic matching</strong> — unlike pixel hashing, CLIP captures shape and motif structure, so similar sealings can match even under different lighting, scale, or crop.</li>
            <li><strong>Result cache</strong> — identical uploads (same file bytes) return instantly from a previous search. Use “Re-run anyway” only when you need fresh results after catalog changes.</li>
          </ul>
          <p class="mt-2 text-xs opacity-75">
            Library: <code class="text-[0.85em]">@huggingface/transformers</code> (open source, Apache-2.0).
            Searches run one at a time on the server to limit CPU/RAM usage; additional requests wait in a queue.
            First search after a server restart may take a few seconds while the model loads.
            Each user may run up to <strong>10 CLIP searches per hour</strong> (cached identical uploads do not count).
          </p>
        </InfoCallout>

        <div
          class="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-colors"
          @click="fileInput?.click()"
          @dragover.prevent
          @drop.prevent="onDrop"
        >
          <ImageIcon class="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <p class="text-sm text-slate-500 dark:text-slate-400">Drop an image here or click to upload</p>
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileSelect" />
        </div>

        <div v-if="imagePreview" class="flex items-start gap-4">
          <img :src="imagePreview" alt="Query" class="w-24 h-24 object-cover rounded-lg border border-slate-200 dark:border-white/10" />
          <div>
            <p class="text-sm font-medium text-slate-800 dark:text-white">{{ imageFile?.name }}</p>
            <button type="button" class="btn-primary mt-2 !py-2 !px-4 text-sm" :disabled="imageLoading" @click="runImageSearch(false)">
              {{ imageLoading ? 'Search in progress…' : 'Find similar' }}
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="imageLoading"
        class="glass-card !p-6 border border-blue-200/60 dark:border-blue-500/30 bg-blue-50/40 dark:bg-blue-500/5"
      >
        <div class="flex flex-col sm:flex-row items-start gap-4">
          <div class="relative shrink-0">
            <img
              v-if="imagePreview"
              :src="imagePreview"
              alt="Query"
              class="w-20 h-20 object-cover rounded-lg border border-slate-200 dark:border-white/10 opacity-80"
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
          <div class="flex-1 min-w-0 space-y-3">
            <div>
              <p class="font-semibold text-slate-800 dark:text-white">{{ imageStatusTitle }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{{ imageStatusDetail }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="step in imageSearchSteps"
                :key="step.id"
                class="text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-colors"
                :class="step.active
                  ? 'bg-blue-100 dark:bg-blue-500/20 border-blue-300 dark:border-blue-500/40 text-blue-700 dark:text-blue-300'
                  : step.done
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'"
              >
                {{ step.label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <InfoCallout v-else-if="imageSearchError" variant="error">{{ imageSearchError }}</InfoCallout>

      <InfoCallout
        v-if="imageFromCache && imageSearched && !imageLoading"
        variant="warn"
        title="Cached results"
      >
        <p>
          This exact image was searched before
          <span v-if="imageCachedAt"> on {{ formatCachedDate(imageCachedAt) }}</span>.
          Showing saved matches — no CLIP computation was needed.
        </p>
        <p v-if="imageCatalogChanged" class="mt-1.5 text-xs sm:text-sm">
          The catalog has new indexed records since that search. Re-run for potentially different matches.
        </p>
        <button
          type="button"
          class="btn-secondary mt-3 !py-2 !px-4 text-sm"
          :disabled="imageLoading"
          @click="runImageSearchForced"
        >
          Re-run CLIP search anyway
        </button>
        <p class="text-xs mt-1.5 opacity-80">
          Re-running uses CPU and RAM on the server and may take several seconds. It enters the single-worker queue.
        </p>
      </InfoCallout>

      <div v-if="!imageLoading && imageResults.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="rec in imageResults"
          :key="rec.id"
          class="metadata-field !p-4 cursor-pointer group"
          @click="goToRecord(rec)"
        >
          <div class="aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden mb-3 border border-slate-300 dark:border-slate-700">
            <img v-if="rec.thumbnailUrl" :src="rec.thumbnailUrl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="" />
          </div>
          <h4 class="font-bold truncate text-slate-800 dark:text-white">{{ rec.name }}</h4>
          <span class="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300">
            {{ rec.similarity }}% match
          </span>
        </div>
      </div>
      <p v-else-if="!imageLoading && imageSearched" class="text-center py-12 text-slate-500 dark:text-slate-400">
        No similar records found above the similarity threshold.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Search as SearchIcon, Map as MapIcon, Image as ImageIcon, ScanLine as ScanIcon, Table, ArrowLeft } from '@lucide/vue';
import { recordPath } from '@/lib/recordPath';
import SearchMap from '../components/SearchMap.vue';
import InfoCallout from '../components/InfoCallout.vue';
import SegmentPills from '../components/SegmentPills.vue';
import { SEARCH_FILTER_FIELDS } from '@rtidb/shared';
import type { EnrichedRecord } from '@rtidb/shared/api/search';
import { searchRecords, searchByImage, getImageSearchJob, bulkExportUrl } from '@/api/search';
import { ApiError } from '@/api/client';
import { pollJob } from '@/composables/useJobPoll';

const router = useRouter();

const goBack = () => {
  if (window.history.state?.back) {
    router.back();
  } else {
    router.push('/');
  }
};

const tabOptions = [
  { value: 'search', label: 'Search & Map', icon: MapIcon },
  { value: 'image', label: 'Image Search', icon: ScanIcon },
];

const viewModeOptions = [
  { id: 'split', label: 'Split' },
  { id: 'list', label: 'List' },
  { id: 'map', label: 'Map' },
].map((m) => ({ value: m.id, label: m.label }));

const activeTab = ref('search');
const viewMode = ref('split');
const query = ref('');
const filters = reactive(Object.fromEntries(SEARCH_FILTER_FIELDS.map((f) => [f.key, ''])));
const spatialFilter = ref(false);
const mapBounds = ref(null);
const loading = ref(false);
const error = ref('');
const results = ref([]);
const total = ref(0);
const page = ref(1);
const totalPages = ref(1);
const selectedId = ref(null);
let searchSeq = 0;
let boundsSearchTimer = null;
let boundsSearchInFlight = false;

function boundsEqual(a, b) {
  if (!a || !b) return false;
  const eps = 1e-5;
  return (
    Math.abs(a.west - b.west) < eps
    && Math.abs(a.south - b.south) < eps
    && Math.abs(a.east - b.east) < eps
    && Math.abs(a.north - b.north) < eps
  );
}

const fileInput = ref(null);
const imageFile = ref(null);
const imagePreview = ref('');
const imageLoading = ref(false);
const imageResults = ref([]);
const imageSearched = ref(false);
const imageSearchStatus = ref('');
const imageSearchPhase = ref('');
const imageQueuePosition = ref(0);
const imageSearchError = ref('');
const imageFromCache = ref(false);
const imageCachedAt = ref('');
const imageCatalogChanged = ref(false);

function formatCachedDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

const imageStatusTitle = computed(() => {
  if (imageSearchStatus.value === 'queued') {
    return imageQueuePosition.value > 1
      ? `In queue — position ${imageQueuePosition.value}`
      : 'Waiting for server…';
  }
  if (imageSearchStatus.value === 'processing') {
    if (imageSearchPhase.value === 'ranking') return 'Comparing with catalog…';
    return 'Computing CLIP embedding…';
  }
  if (imageSearchStatus.value === 'submitting') return 'Uploading image…';
  return 'Starting image search…';
});

const imageStatusDetail = computed(() => {
  if (imageSearchStatus.value === 'queued') {
    return 'Only one image search runs at a time on the server. Yours will start automatically.';
  }
  if (imageSearchStatus.value === 'processing' && imageSearchPhase.value === 'ranking') {
    return 'Ranking published records by cosine similarity.';
  }
  if (imageSearchStatus.value === 'processing') {
    return 'Loading the CLIP model if needed, then embedding your upload (CPU-bound, may take a few seconds).';
  }
  return 'Preparing your search request.';
});

const imageSearchSteps = computed(() => {
  const status = imageSearchStatus.value;
  const phase = imageSearchPhase.value;
  const queuedDone = status !== 'queued' && status !== 'submitting' && status !== '';
  const embeddingActive = status === 'processing' && phase === 'embedding';
  const embeddingDone = phase === 'ranking' || phase === 'done';
  const rankingActive = phase === 'ranking';
  const rankingDone = phase === 'done';

  return [
    { id: 'queue', label: 'Queued', active: status === 'queued', done: queuedDone },
    { id: 'embed', label: 'CLIP embedding', active: embeddingActive, done: embeddingDone },
    { id: 'rank', label: 'Compare catalog', active: rankingActive, done: rankingDone },
  ];
});

function clearImagePoll() {
  imageLoading.value = false;
}

const activeFilterCount = computed(() =>
  Object.values(filters).filter((v) => v?.trim()).length
);

const mapMarkers = computed(() =>
  results.value
    .filter((r) => r.lat != null && r.lng != null)
    .map((r) => ({ id: r.id, lat: r.lat, lng: r.lng, name: r.name }))
);

const resultsGridClass = computed(() => {
  if (viewMode.value === 'split') return 'grid grid-cols-1 lg:grid-cols-2 gap-6';
  if (viewMode.value === 'map') return 'grid grid-cols-1';
  return 'grid grid-cols-1';
});

function buildSearchParams(): Record<string, string> {
  const params: Record<string, string> = {
    page: String(page.value),
    limit: '20',
  };
  if (query.value.trim()) params.q = query.value.trim();
  const activeFilters: Record<string, string> = {};
  for (const [key, val] of Object.entries(filters)) {
    if (val?.trim()) activeFilters[key] = val.trim();
  }
  if (Object.keys(activeFilters).length) params.filters = JSON.stringify(activeFilters);
  if (spatialFilter.value && mapBounds.value) {
    const { west, south, east, north } = mapBounds.value;
    params.bbox = `${west},${south},${east},${north}`;
  }
  return params;
}

const exportCsvUrl = bulkExportUrl({ format: 'csv', published: '1' });

async function runSearch() {
  const seq = ++searchSeq;
  boundsSearchInFlight = true;
  loading.value = true;
  error.value = '';
  try {
    const data = await searchRecords(buildSearchParams());
    if (seq !== searchSeq) return;
    results.value = data.results;
    total.value = data.total;
    page.value = data.page;
    totalPages.value = data.totalPages;
  } catch (err) {
    if (seq !== searchSeq) return;
    error.value = err instanceof Error ? err.message : 'Search failed';
  } finally {
    if (seq === searchSeq) {
      loading.value = false;
      boundsSearchInFlight = false;
    }
  }
}

function clearFilters() {
  for (const key of Object.keys(filters)) filters[key] = '';
  query.value = '';
  spatialFilter.value = false;
  page.value = 1;
  runSearch();
}

function changePage(p) {
  page.value = p;
  runSearch();
}

function onBoundsChange(bounds) {
  if (boundsEqual(mapBounds.value, bounds)) return;
  mapBounds.value = bounds;
  if (!spatialFilter.value || boundsSearchInFlight) return;
  clearTimeout(boundsSearchTimer);
  boundsSearchTimer = setTimeout(() => {
    page.value = 1;
    runSearch();
  }, 400);
}

watch(spatialFilter, (enabled) => {
  page.value = 1;
  if (enabled && !mapBounds.value) return;
  runSearch();
});

function onMarkerClick(id) {
  selectedId.value = id;
  goToRecord(results.value.find((r) => r.id === id) || { id });
}

function goToRecord(rec) {
  router.push(recordPath(rec));
}

function onFileSelect(e) {
  const file = e.target.files?.[0];
  if (file) setImageFile(file);
}

function onDrop(e) {
  const file = e.dataTransfer.files?.[0];
  if (file?.type.startsWith('image/')) setImageFile(file);
}

function setImageFile(file) {
  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
  imageResults.value = [];
  imageSearched.value = false;
  imageSearchError.value = '';
  imageFromCache.value = false;
  imageCachedAt.value = '';
  imageCatalogChanged.value = false;
  clearImagePoll();
}

function applyImageSearchPayload(data, { fromCache = false } = {}) {
  imageResults.value = data.results || [];
  imageSearched.value = true;
  imageFromCache.value = fromCache;
  imageCachedAt.value = data.cachedAt || '';
  imageCatalogChanged.value = !!data.catalogChanged;
}

async function pollImageSearchJob(jobId: string) {
  const data = await pollJob(
    jobId,
    {
      fetchJob: (id) => getImageSearchJob(id),
      getStatus: (job) => job.status,
      getPhase: (job) => job.phase,
      stepsForPhase: () => [],
      intervalMs: 600,
    },
    (job) => {
      imageSearchStatus.value = job.status;
      imageSearchPhase.value = job.phase || '';
      imageQueuePosition.value = job.position || 0;
    },
  );

  if (data.status === 'error') {
    throw new Error(data.error || 'Image search failed');
  }

  applyImageSearchPayload(data, { fromCache: false });
}

async function runImageSearch(forced = false) {
  if (!imageFile.value) return;
  clearImagePoll();
  imageLoading.value = true;
  imageSearched.value = false;
  imageSearchError.value = '';
  imageResults.value = [];
  imageFromCache.value = false;
  imageCachedAt.value = '';
  imageCatalogChanged.value = false;
  imageSearchStatus.value = 'submitting';
  imageSearchPhase.value = '';
  imageQueuePosition.value = 0;

  try {
    const data = await searchByImage(imageFile.value, 12, forced);
    if ('cached' in data && (data.cached || data.status === 'done')) {
      applyImageSearchPayload(data, { fromCache: true });
      return;
    }

    imageSearchStatus.value = data.status;
    imageQueuePosition.value = data.position || 0;
    await pollImageSearchJob(data.jobId);
  } catch (err) {
    imageResults.value = [];
    imageSearched.value = true;
    if (err instanceof ApiError && err.status === 429) {
      try {
        const payload = JSON.parse(err.body) as { retryAfterSeconds?: number; limit?: number; error?: string };
        const mins = payload.retryAfterSeconds ? Math.ceil(payload.retryAfterSeconds / 60) : null;
        imageSearchError.value = mins
          ? `Rate limit reached (${payload.limit || 10} CLIP searches per hour). Try again in about ${mins} minute${mins === 1 ? '' : 's'}.`
          : (payload.error || 'Image search rate limit exceeded');
      } catch {
        imageSearchError.value = err.body || 'Image search rate limit exceeded';
      }
    } else {
      imageSearchError.value = err instanceof Error ? err.message : 'Image search failed';
    }
  } finally {
    imageLoading.value = false;
    imageSearchStatus.value = '';
    imageSearchPhase.value = '';
    clearImagePoll();
  }
}

function runImageSearchForced() {
  runImageSearch(true);
}

onUnmounted(clearImagePoll);

onMounted(runSearch);
</script>
