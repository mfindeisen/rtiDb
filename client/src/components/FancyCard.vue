<template>
  <Card :class="cn('fancy-card', props.class)">
    <slot />
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const props = defineProps({
  class: { type: [String, Object, Array], default: '' },
});
</script>
