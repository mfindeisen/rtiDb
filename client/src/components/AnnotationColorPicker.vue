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
        @click="selectPreset(color)"
      />
      <button
        type="button"
        class="w-8 h-8 rounded-full p-[2px] border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        :class="customColorActive ? 'border-slate-800 dark:border-white scale-105 shadow-md' : 'border-slate-200/80 dark:border-white/20'"
        :style="{ background: RAINBOW_SWATCH }"
        title="Custom color"
        aria-label="Custom color"
        :aria-pressed="customColorActive"
        @click="toggleCustomPicker"
      >
        <span
          class="block w-full h-full rounded-full border border-white/40 dark:border-slate-900/40"
          :style="{ backgroundColor: customColorActive ? modelValue : 'var(--background, #fff)' }"
        />
      </button>
    </div>
    <AnnotationHsvPicker
      v-if="customPickerOpen"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ANNOTATION_COLOR_PRESETS, isPresetAnnotationColor } from '@/lib/annotationColors';
import AnnotationHsvPicker from './AnnotationHsvPicker.vue';

const props = defineProps({
  modelValue: { type: String, required: true },
});

const emit = defineEmits(['update:modelValue']);

const RAINBOW_SWATCH = 'conic-gradient(from 0deg, #ef4444, #f59e0b, #22c55e, #14b8a6, #3b82f6, #8b5cf6, #ec4899, #ef4444)';
const customPickerOpen = ref(!isPresetAnnotationColor(props.modelValue));
const customColorActive = computed(() => customPickerOpen.value || !isPresetAnnotationColor(props.modelValue));

function selectPreset(color: string) {
  customPickerOpen.value = false;
  emit('update:modelValue', color);
}

function toggleCustomPicker() {
  customPickerOpen.value = !customPickerOpen.value;
}
</script>
