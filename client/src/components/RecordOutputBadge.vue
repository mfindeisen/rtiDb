<script setup lang="ts">
import { computed } from 'vue';
import {
  getRecordOutputBadge,
  recordOutputBadgeClass,
  type RecordOutputSource,
} from '@rtidb/shared';

const props = defineProps<{
  record: RecordOutputSource;
}>();

const badge = computed(() => getRecordOutputBadge(props.record));
</script>

<template>
  <span
    v-if="badge"
    class="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
    :class="recordOutputBadgeClass(badge.kind)"
    :title="badge.title"
  >
    {{ badge.label }}
  </span>
</template>
