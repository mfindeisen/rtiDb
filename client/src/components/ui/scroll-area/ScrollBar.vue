<script setup lang="ts">
import type { PropType } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ScrollAreaScrollbar, ScrollAreaThumb } from "reka-ui";
import type { ScrollAreaScrollbarProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps({
  orientation: {
    type: String as PropType<"vertical" | "horizontal">,
    required: false,
    default: "vertical",
  },
  forceMount: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
});

const delegatedProps = reactiveOmit(props, "class") as ScrollAreaScrollbarProps;
</script>

<template>
  <ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    v-bind="delegatedProps"
    :class="
      cn(
        'flex touch-none p-px transition-colors select-none',
        props.orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent',
        props.orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent',
        props.class,
      )
    "
  >
    <ScrollAreaThumb
      data-slot="scroll-area-thumb"
      class="bg-border relative flex-1 rounded-full"
    />
  </ScrollAreaScrollbar>
</template>
