<template>
  <Collapsible v-model:open="open" class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
      <CollapsibleTrigger class="group min-w-0 flex-1 cursor-pointer rounded-lg border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
        <h2 class="section-heading inline-flex items-center gap-2">
          {{ title }}
          <ChevronDown
            class="size-5 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=closed]:-rotate-90"
            aria-hidden="true"
          />
        </h2>
        <p class="section-sub mt-1">{{ description }}</p>
      </CollapsibleTrigger>
      <div class="flex flex-wrap gap-2">
        <slot name="actions" />
      </div>
    </div>
    <CollapsibleContent>
      <div class="space-y-6">
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>

<script setup lang="ts">
import { ChevronDown } from '@lucide/vue';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

defineProps<{
  title: string;
  description: string;
}>();

const open = defineModel<boolean>('open', { default: true });
</script>
