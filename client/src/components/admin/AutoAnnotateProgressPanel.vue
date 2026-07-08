<script setup lang="ts">
import { computed } from 'vue';

export interface AutoAnnotateUiState {
  running?: boolean;
  status?: string;
  phase?: string;
  message?: string;
  error?: string;
  canRetry?: boolean;
  startedAt?: number;
  position?: number;
}

const props = defineProps<{
  recordId: number;
  state: AutoAnnotateUiState;
  now: number;
}>();

defineEmits<{
  retry: [];
}>();

const AUTO_ANNOTATE_PROGRESS: Record<string, number> = {
  queued: 8,
  loading: 25,
  prepare: 25,
  detecting: 55,
  metadata: 85,
  done: 100,
};

const progress = computed(() => {
  const s = props.state;
  if (!s) return 0;
  if (!s.running) return s.error ? 100 : 100;
  if (s.status === 'queued') return AUTO_ANNOTATE_PROGRESS.queued;
  return AUTO_ANNOTATE_PROGRESS[s.phase || ''] ?? 25;
});

const steps = computed(() => {
  const s = props.state;
  const status = s?.status;
  const phase = s?.phase || '';
  const running = !!s?.running;

  const queuedDone = status !== 'queued' && running;
  const loadingActive = phase === 'loading' || phase === 'prepare';
  const loadingDone = ['detecting', 'metadata', 'done'].includes(phase) || !running;
  const detectingActive = phase === 'detecting';
  const detectingDone = ['metadata', 'done'].includes(phase) || !running;
  const savingActive = phase === 'metadata' || phase === 'done';
  const savingDone = !running && !s?.error && s?.message;

  return [
    { id: 'queue', label: 'Queued', active: status === 'queued', done: queuedDone },
    { id: 'model', label: 'Load model', active: loadingActive, done: loadingDone && !loadingActive },
    { id: 'detect', label: 'Detect', active: detectingActive, done: detectingDone && !detectingActive },
    { id: 'save', label: 'Save', active: savingActive && running, done: !!savingDone },
  ];
});

const panelClass = computed(() => {
  const s = props.state;
  if (!s) return '';
  if (s.running) {
    return 'border-violet-300 dark:border-violet-500/40 bg-violet-50/60 dark:bg-violet-500/10 text-violet-900 dark:text-violet-100';
  }
  if (s.error) {
    return 'border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-500/10 text-red-700 dark:text-red-300';
  }
  return 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200';
});

const elapsed = computed(() => {
  const started = props.state?.startedAt;
  if (!started) return '—';
  const sec = Math.floor((props.now - started) / 1000);
  if (sec < 60) return `${sec}s`;
  return `${Math.floor(sec / 60)}m ${sec % 60}s`;
});
</script>

<template>
  <div v-if="state" class="mt-3 p-3 rounded-lg border text-sm" :class="panelClass">
    <div v-if="state.running" class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin shrink-0" />
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-violet-900 dark:text-violet-100">{{ state.message }}</p>
          <p v-if="state.startedAt" class="text-xs opacity-75 mt-0.5">
            Elapsed: {{ elapsed }}
          </p>
        </div>
        <span class="text-xs font-bold font-mono tabular-nums text-violet-700 dark:text-violet-300 shrink-0">
          {{ progress }}%
        </span>
      </div>

      <div class="w-full h-2.5 bg-slate-200/80 dark:bg-black/30 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700 ease-out"
          :class="state.phase === 'detecting' ? 'animate-pulse' : ''"
          :style="{ width: `${progress}%` }"
        />
      </div>

      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="step in steps"
          :key="step.id"
          class="text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-colors"
          :class="step.active
            ? 'bg-violet-200/80 dark:bg-violet-500/25 border-violet-300 dark:border-violet-500/50 text-violet-800 dark:text-violet-200'
            : step.done
              ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'"
        >
          {{ step.label }}
        </span>
      </div>
    </div>

    <template v-else>
      <p>{{ state.message }}</p>
      <button
        v-if="state.canRetry"
        type="button"
        class="btn-secondary mt-2 !py-1.5 !px-3 text-xs"
        @click="$emit('retry')"
      >
        Replace AI annotations &amp; re-run
      </button>
    </template>
  </div>
</template>
