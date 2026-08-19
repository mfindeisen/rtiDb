<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  value?: string | number
  selected?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <option
    data-slot="native-select-option"
    :class="cn('bg-[Canvas] text-[CanvasText]', props.class)"
    :value="value"
    :selected="selected"
    :disabled="disabled"
  >
    <slot />
  </option>
</template>
