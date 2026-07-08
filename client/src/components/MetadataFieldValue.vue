<template>
  <span v-if="field.isEmpty" class="text-slate-400 dark:text-slate-500">—</span>
  <a
    v-else-if="field.type === 'url'"
    :href="field.value"
    target="_blank"
    rel="noopener"
    class="text-blue-600 dark:text-blue-400 hover:underline break-all"
  >{{ field.value }}</a>
  <span v-else-if="field.type === 'gps' && field.mapsUrl" class="inline-flex items-center gap-2 text-slate-800 dark:text-slate-200">
    <span>{{ field.value }}</span>
    <a
      :href="field.mapsUrl"
      target="_blank"
      rel="noopener"
      title="Open in Maps"
      class="inline-flex items-center justify-center w-7 h-7 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
    >
      <MapPin class="w-3.5 h-3.5" />
    </a>
  </span>
  <span v-else-if="field.type === 'gps'" class="text-slate-800 dark:text-slate-200">{{ field.displayValue }}</span>
  <span v-else-if="field.type === 'color' && field.hexColor" class="inline-flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
    <span
      class="w-6 h-6 rounded-md border border-slate-300/80 dark:border-white/25 shadow-sm shrink-0 ring-1 ring-black/5"
      :style="{ backgroundColor: field.hexColor }"
      :title="field.hexColor"
    />
    <span>{{ field.value }}</span>
  </span>
  <span v-else class="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{{ field.displayValue }}</span>
</template>

<script setup lang="ts">
import { MapPin } from '@lucide/vue';

defineProps({
  field: { type: Object, required: true },
});
</script>
