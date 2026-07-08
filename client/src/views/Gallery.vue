<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <div class="text-center mb-12">
      <h2 class="page-title mb-4">RTI Gallery</h2>
    </div>

    <div v-if="loading" class="text-center py-20 text-slate-400">
      <div class="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4" />
      <p>Loading gallery...</p>
    </div>

    <div v-else-if="error" class="p-4 bg-red-500/10 border border-red-500 text-red-500 dark:text-red-300 rounded-lg text-center">
      {{ error }}
    </div>

    <div v-else-if="records.length === 0" class="text-center py-20 glass-card">
      <p class="text-slate-500 dark:text-slate-400 text-lg">No published scans found.</p>
    </div>

    <div v-else class="glass-card flex flex-col space-y-4 !p-4 sm:!p-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
          <div class="relative flex-1 md:max-w-xs">
            <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search scans..."
              class="form-input pl-10 w-full"
            />
          </div>
          <router-link
            to="/search"
            class="btn-secondary inline-flex items-center justify-center gap-2 text-sm !py-2.5 !px-4 whitespace-nowrap"
          >
            <ScanSearchIcon class="w-4 h-4" />
            Advanced Search
          </router-link>
        </div>

        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-300">Show:</label>
          <select v-model.number="itemsPerPage" class="form-input py-1.5 px-3 cursor-pointer w-20">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>
      </div>

      <!-- Mobile card list -->
      <div class="md:hidden space-y-3">
        <article
          v-for="rec in paginatedRecords"
          :key="rec.id"
          class="rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 p-4 flex gap-3 cursor-pointer active:bg-slate-50 dark:active:bg-white/5"
          @click="$router.push(recordPath(rec))"
        >
          <div class="w-16 h-16 shrink-0 bg-slate-200 dark:bg-slate-800 rounded-md overflow-hidden border border-slate-300 dark:border-slate-700">
            <img v-if="rec.thumbnailUrl" :src="rec.thumbnailUrl" alt="" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
              <ImageIcon class="w-6 h-6 opacity-30" />
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-bold text-slate-800 dark:text-white leading-snug">{{ rec.name }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1" :dir="rec.direction">{{ rec.description }}</p>
            <p class="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-2">{{ formatRecordDateTime(rec.date) }}</p>
          </div>
        </article>
        <p v-if="paginatedRecords.length === 0" class="text-center py-8 text-slate-500 dark:text-slate-400">
          No scans match your search.
        </p>
      </div>

      <!-- Desktop table -->
      <div class="hidden md:block overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm border-b border-slate-200 dark:border-white/10">
              <th class="p-4 font-semibold w-24">Preview</th>
              <th class="p-4 font-semibold">Name & Description</th>
              <th class="p-4 font-semibold w-52">Dates</th>
              <th class="p-4 font-semibold w-24 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="rec in paginatedRecords"
              :key="rec.id"
              class="border-b border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
              @click="$router.push(recordPath(rec))"
            >
              <td class="p-4 align-middle">
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
              </td>
              <td class="p-4 align-middle">
                <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ rec.name }}
                </h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-1" :dir="rec.direction">{{ rec.description }}</p>
              </td>
              <td class="p-4 align-middle text-sm text-slate-500 dark:text-slate-400">
                <div class="space-y-1.5">
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
              </td>
              <td class="p-4 align-middle text-center">
                <button
                  type="button"
                  class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors shadow-sm"
                  @click.stop="$router.push(recordPath(rec))"
                >
                  <EyeIcon class="w-5 h-5" />
                </button>
              </td>
            </tr>
            <tr v-if="paginatedRecords.length === 0">
              <td colspan="4" class="p-8 text-center text-slate-500 dark:text-slate-400">
                No scans match your search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 text-sm text-slate-600 dark:text-slate-400">
        <div>
          Showing <span class="font-bold text-slate-800 dark:text-white">{{ filteredRecords.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1 }}</span> to
          <span class="font-bold text-slate-800 dark:text-white">{{ Math.min(currentPage * itemsPerPage, filteredRecords.length) }}</span> of
          <span class="font-bold text-slate-800 dark:text-white">{{ filteredRecords.length }}</span> entries
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            @click="prevPage"
          >
            <ChevronLeftIcon class="w-4 h-4" /> Prev
          </button>

          <div class="flex gap-1">
            <button
              v-for="p in visiblePages"
              :key="p"
              type="button"
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center border transition-colors',
                currentPage === p
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800',
              ]"
              @click="goToPage(p)"
            >
              {{ p }}
            </button>
          </div>

          <button
            type="button"
            :disabled="currentPage >= totalPages || totalPages === 0"
            class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            @click="nextPage"
          >
            Next <ChevronRightIcon class="w-4 h-4" />
          </button>
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
import { listRecords } from '@/api/records';
import {
  Search as SearchIcon,
  ScanSearch as ScanSearchIcon,
  Image as ImageIcon,
  Eye as EyeIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@lucide/vue';

const records = ref<RecordRow[]>([]);
const loading = ref(true);
const error = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

onMounted(async () => {
  try {
    const allRecords = await listRecords();
    records.value = allRecords.filter((r) => r.isPublished === 1);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch records';
  } finally {
    loading.value = false;
  }
});

const filteredRecords = computed(() => {
  if (!searchQuery.value) return records.value;
  const q = searchQuery.value.toLowerCase();
  return records.value.filter(
    (r) => r.name.toLowerCase().includes(q) || (r.description && r.description.toLowerCase().includes(q))
  );
});

const totalPages = computed(() => Math.ceil(filteredRecords.value.length / itemsPerPage.value) || 1);

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredRecords.value.slice(start, start + itemsPerPage.value);
});

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

watch([searchQuery, itemsPerPage], () => { currentPage.value = 1; });
</script>
