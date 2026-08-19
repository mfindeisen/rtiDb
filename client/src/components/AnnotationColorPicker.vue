<template>
  <div class="space-y-2">
    <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Color</span>
    <div class="flex flex-wrap gap-2">
      <Button
        v-for="color in ANNOTATION_COLOR_PRESETS"
        :key="color"
        type="button"
        variant="ghost"
        size="icon"
        class="rounded-full border-2 hover:scale-105"
        :class="modelValue === color ? 'border-foreground scale-105 shadow-md' : 'border-border'"
        :style="{ backgroundColor: color }"
        :title="color"
        :aria-label="`Color ${color}`"
        :aria-pressed="modelValue === color"
        @click="selectPreset(color)"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        class="rounded-full p-[2px] border-2 hover:scale-105"
        :class="customColorActive ? 'border-foreground scale-105 shadow-md' : 'border-border'"
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
      </Button>
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
import { Button } from '@/components/ui/button';

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
