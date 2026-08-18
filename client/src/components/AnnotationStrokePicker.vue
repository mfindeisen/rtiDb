<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between gap-2">
      <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Line width</span>
      <span class="text-xs tabular-nums text-slate-500 dark:text-slate-400">{{ modelValue }}px</span>
    </div>
    <Slider
      :model-value="[modelValue]"
      :min="MIN_ANNOTATION_STROKE_WIDTH"
      :max="MAX_ANNOTATION_STROKE_WIDTH"
      :step="1"
      :aria-label="`Line width ${modelValue} pixels`"
      @update:model-value="onStrokeWidthChange"
    />
    <svg class="w-full h-5" viewBox="0 0 160 20" aria-hidden="true">
      <line
        x1="4"
        y1="10"
        x2="156"
        y2="10"
        :stroke="previewColor"
        :stroke-width="modelValue"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { MIN_ANNOTATION_STROKE_WIDTH, MAX_ANNOTATION_STROKE_WIDTH } from '@rtidb/shared/annotationStroke';
import { Slider } from '@/components/ui/slider';

defineProps({
  modelValue: { type: Number, required: true },
  previewColor: { type: String, default: '#f59e0b' },
});

const emit = defineEmits(['update:modelValue']);

function onStrokeWidthChange(value: number[] | undefined) {
  if (value?.[0] != null) emit('update:modelValue', value[0]);
}
</script>
