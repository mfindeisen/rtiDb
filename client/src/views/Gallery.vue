<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-slate-800 dark:text-white mb-4">RTI Gallery</h2>
    </div>

    <div v-if="loading" class="text-center py-20 text-slate-400">
      <div class="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
      <p>Loading gallery...</p>
    </div>
    
    <div v-else-if="error" class="p-4 bg-red-500/10 border border-red-500 text-red-500 dark:text-red-300 rounded-lg text-center">
      {{ error }}
    </div>

    <div v-else-if="records.length === 0" class="text-center py-20 glass-card">
      <p class="text-slate-500 dark:text-slate-400 text-lg mb-4">No published scans found.</p>
    </div>

    <div v-else class="glass-card flex flex-col space-y-4 !p-6">
      
      <!-- Toolbar -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="relative w-full md:w-1/2 lg:w-1/3">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon class="w-5 h-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search scans..." 
            class="form-input pl-10 w-full"
          />
        </div>
        
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-300">Show:</label>
          <select v-model="itemsPerPage" class="form-input py-1.5 px-3 cursor-pointer">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm border-b border-slate-200 dark:border-white/10">
              <th class="p-4 font-semibold w-24">Preview</th>
              <th class="p-4 font-semibold">Name & Description</th>
              <th class="p-4 font-semibold w-40">Date</th>
              <th class="p-4 font-semibold w-24 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="rec in paginatedRecords" 
              :key="rec.id" 
              @click="$router.push(`/record/${rec.id}`)"
              class="border-b border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <td class="p-4 align-middle">
                <div class="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-md overflow-hidden relative shadow-sm border border-slate-300 dark:border-slate-700">
                  <img v-if="rec.thumbnail_url" :src="rec.thumbnail_url" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                    <ImageIcon class="w-6 h-6 opacity-30" />
                  </div>
                </div>
              </td>
              <td class="p-4 align-middle">
                <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ rec.name }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-1" :dir="rec.direction">{{ rec.description }}</p>
              </td>
              <td class="p-4 align-middle text-sm text-slate-500 dark:text-slate-400">
                <div class="flex items-center gap-1.5">
                  <CalendarIcon class="w-4 h-4" />
                  {{ new Date(rec.date).toLocaleDateString() }}
                </div>
              </td>
              <td class="p-4 align-middle text-center">
                <button class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors shadow-sm">
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

      <!-- Pagination Controls -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 text-sm text-slate-600 dark:text-slate-400">
        <div>
          Showing <span class="font-bold text-slate-800 dark:text-white">{{ filteredRecords.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1 }}</span> to 
          <span class="font-bold text-slate-800 dark:text-white">{{ Math.min(currentPage * itemsPerPage, filteredRecords.length) }}</span> of 
          <span class="font-bold text-slate-800 dark:text-white">{{ filteredRecords.length }}</span> entries
        </div>
        
        <div class="flex items-center gap-2">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            <ChevronLeftIcon class="w-4 h-4" /> Prev
          </button>
          
          <div class="flex gap-1">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="goToPage(page)"
              :class="['w-8 h-8 rounded-lg flex items-center justify-center border transition-colors', 
                currentPage === page 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button 
            @click="nextPage" 
            :disabled="currentPage >= totalPages || totalPages === 0"
            class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            Next <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Search as SearchIcon, Image as ImageIcon, Calendar as CalendarIcon, Eye as EyeIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@lucide/vue';

const records = ref([]);
const loading = ref(true);
const error = ref('');

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

onMounted(async () => {
  try {
    const res = await fetch('/api/records');
    if (!res.ok) throw new Error('Failed to fetch records');
    const allRecords = await res.json();
    records.value = allRecords.filter(r => r.is_published === 1);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

// Computed properties for Table
const filteredRecords = computed(() => {
  if (!searchQuery.value) return records.value;
  const q = searchQuery.value.toLowerCase();
  return records.value.filter(r => 
    r.name.toLowerCase().includes(q) || 
    (r.description && r.description.toLowerCase().includes(q))
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredRecords.value.length / itemsPerPage.value) || 1;
});

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredRecords.value.slice(start, end);
});

// Calculate visible page numbers for pagination
const visiblePages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage.value - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

// Pagination controls
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page) => {
  currentPage.value = page;
};

// Reset to first page when search query or items per page changes
watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});
</script>
