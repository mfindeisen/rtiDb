<template>
  <div class="segment-pills" :class="fullWidth ? 'w-full' : 'w-fit'">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      :disabled="disabled || opt.disabled"
      class="segment-pill"
      :class="{ active: modelValue === opt.value, 'flex-1': fullWidth }"
      @click="$emit('update:modelValue', opt.value)"
    >
      <component v-if="opt.icon" :is="opt.icon" class="w-3.5 h-3.5 shrink-0" />
      <span v-if="opt.shortLabel" class="sm:hidden">{{ opt.shortLabel }}</span>
      <span :class="opt.shortLabel ? 'hidden sm:inline' : ''">{{ opt.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

export interface SegmentOption {
  value: string;
  label: string;
  icon?: Component;
  disabled?: boolean;
  shortLabel?: string;
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

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>
