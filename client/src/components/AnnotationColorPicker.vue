<template>
  <div class="space-y-2">
    <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Color</span>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="color in ANNOTATION_COLOR_PRESETS"
        :key="color"
        type="button"
        class="w-8 h-8 rounded-full border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        :class="modelValue === color ? 'border-slate-800 dark:border-white scale-105 shadow-md' : 'border-slate-200/80 dark:border-white/20'"
        :style="{ backgroundColor: color }"
        :title="color"
        :aria-label="`Color ${color}`"
        :aria-pressed="modelValue === color"
        @click="$emit('update:modelValue', color)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ANNOTATION_COLOR_PRESETS } from '@/lib/annotationColors';

defineProps({
  modelValue: { type: String, required: true },
});

defineEmits(['update:modelValue']);
</script>
