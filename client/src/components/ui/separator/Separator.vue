<script setup lang="ts">
import type { PropType } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { Separator } from "reka-ui";
import type { SeparatorProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps({
  orientation: {
    type: String as PropType<NonNullable<SeparatorProps["orientation"]>>,
    required: false,
    default: "horizontal",
  },
  decorative: { type: Boolean, required: false, default: true },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
});

const delegatedProps = reactiveOmit(props, "class") as SeparatorProps;
</script>

<template>
  <Separator
    data-slot="separator"
    v-bind="delegatedProps"
    :class="
      cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
        props.class,
      )
    "
  />
</template>
