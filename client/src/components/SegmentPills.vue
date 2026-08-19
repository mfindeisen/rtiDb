<template>
  <ToggleGroup
    type="single"
    :model-value="modelValue"
    :disabled="disabled"
    :class="fullWidth ? 'w-full bg-muted p-1 rounded-lg' : 'w-fit bg-muted p-1 rounded-lg'"
    :spacing="4"
    size="sm"
    @update:model-value="onChange"
  >
    <ToggleGroupItem
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
      :disabled="opt.disabled"
      :class="fullWidth ? 'flex-1' : ''"
      class="gap-1.5 px-4 text-xs font-semibold data-[state=on]:bg-background data-[state=on]:shadow-sm"
    >
      <component v-if="opt.icon" :is="opt.icon" class="w-3.5 h-3.5 shrink-0" />
      <span v-if="opt.shortLabel" class="sm:hidden">{{ opt.shortLabel }}</span>
      <span :class="opt.shortLabel ? 'hidden sm:inline' : ''">{{ opt.label }}</span>
      <ExperimentalBadge v-if="opt.experimental" class="max-sm:hidden" />
      <span
        v-if="opt.experimental"
        class="sm:hidden w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"
        aria-hidden="true"
      />
    </ToggleGroupItem>
  </ToggleGroup>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import ExperimentalBadge from './ExperimentalBadge.vue';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export interface SegmentOption {
  value: string;
  label: string;
  icon?: Component;
  disabled?: boolean;
  shortLabel?: string;
  experimental?: boolean;
}

withDefaults(defineProps<{
  modelValue: string;
  options: SegmentOption[];
  disabled?: boolean;
  fullWidth?: boolean;
}>(), {
  disabled: false,
  fullWidth: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function onChange(value: string | string[] | undefined) {
  if (typeof value === 'string' && value) emit('update:modelValue', value);
}
</script>
