<template>
  <div
    class="glass-card px-4 py-4 sm:px-6"
    :class="{ 'max-lg:hidden': hideOnMobileViewer }"
  >
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 min-w-0">
      <div class="flex flex-col gap-2 min-w-0">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white wrap-anywhere">
          {{ record.name }}
        </h2>
        <div class="flex flex-wrap items-center gap-1.5">
          <RecordOutputBadge :record="record" />
          <span
            v-if="record.recordTypeName"
            class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
          >{{ record.recordTypeName }}</span>
          <span
            v-if="record.revisionNumber"
            class="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10"
          >
            rev. {{ record.revisionNumber }}
          </span>
        </div>
      </div>
      <div class="text-sm text-slate-500 dark:text-slate-400 shrink-0 space-y-1 sm:text-right">
        <div>
          <div class="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Date created
          </div>
          <div class="font-mono text-slate-600 dark:text-slate-300">{{ createdAt }}</div>
        </div>
        <div v-if="updatedAt">
          <div class="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Date updated
          </div>
          <div class="font-mono text-slate-600 dark:text-slate-300">{{ updatedAt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecordOutputBadge from '@/components/RecordOutputBadge.vue';
import type { RecordDetail } from '@rtidb/shared/api/records';

defineProps<{
  record: RecordDetail;
  createdAt: string;
  updatedAt: string;
  hideOnMobileViewer?: boolean;
}>();
</script>
