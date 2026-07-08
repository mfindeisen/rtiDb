<script setup lang="ts">
import type { PropType } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ProgressIndicator, ProgressRoot } from "reka-ui";
import type { ProgressRootProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps({
  modelValue: { type: [Number, null] as PropType<number | null>, required: false, default: 0 },
  max: { type: Number, required: false },
  getValueLabel: {
    type: Function as PropType<(value: number, max: number) => string>,
    required: false,
  },
  getValueText: {
    type: Function as PropType<(value: number, max: number) => string>,
    required: false,
  },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
});

const delegatedProps = reactiveOmit(props, "class") as ProgressRootProps;
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    v-bind="delegatedProps"
    :class="
      cn(
        'bg-muted h-1 rounded-full relative flex w-full items-center overflow-x-hidden',
        props.class,
      )
    "
  >
    <ProgressIndicator
      data-slot="progress-indicator"
      class="bg-primary size-full flex-1 transition-all"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
