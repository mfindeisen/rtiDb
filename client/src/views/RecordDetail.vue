<template>
  <div class="max-w-5xl mx-auto space-y-6">
    <button @click="$router.back()" class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors">
      <ArrowLeft class="w-5 h-5" /> Back
    </button>
    <div v-if="loading" class="text-center py-16 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">Loading record...</div>
    <div v-else-if="error" class="p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 rounded-lg">{{ error }}</div>
    <div v-else class="glass-card">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white mb-2 sm:mb-0">{{ record.name }}</h2>
        <span class="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{{ new Date(record.date).toLocaleDateString() }}</span>
      </div>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{{ record.description }}</p>
      
      <div v-if="record.status === 'done'" class="mt-8 flex justify-center bg-slate-100 dark:bg-black/40 p-4 rounded-xl border border-slate-200 dark:border-white/10 h-[600px] w-full overflow-hidden">
        <modern-rti-viewer 
          :url="record.folder_url"
          class="w-full h-full block"
          debug="true"
        ></modern-rti-viewer>
      </div>
      <div v-else-if="record.status === 'processing'" class="text-center py-12 bg-blue-50 dark:bg-blue-500/10 border border-dashed border-blue-300 dark:border-blue-500/50 rounded-xl">
        <h3 class="text-xl font-medium text-blue-700 dark:text-blue-400 mb-2">This scan is currently being processed.</h3>
        <p class="text-slate-500 dark:text-slate-400">Please check back later.</p>
      </div>
      <div v-else class="p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 rounded-lg">
        There was an error processing this scan.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft } from '@lucide/vue';

const route = useRoute();
const record = ref(null);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const id = route.params.id;
    const res = await fetch(`/api/records/${id}`);
    if (!res.ok) throw new Error('Failed to load record details');
    
    record.value = await res.json();
    
    // Set loading to false BEFORE nextTick so Vue renders the v-else block containing #viewerContainer
    loading.value = false;
    
    // Viewer is now initialized automatically by the modern-rti-viewer web component!
  } catch (err) {
    error.value = err.message;
    loading.value = false;
  }
});
</script>
