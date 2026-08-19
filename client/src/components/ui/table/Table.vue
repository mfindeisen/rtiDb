<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
});
</script>

<template>
  <ScrollArea data-slot="table-container" class="w-full">
    <table
      data-slot="table"
      :class="cn('w-full caption-bottom text-sm', props.class)"
    >
      <slot />
    </table>
  </ScrollArea>
</template>
