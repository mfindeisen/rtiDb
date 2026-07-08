<template>
  <div v-if="dismissKey && dismissed" class="flex">
    <button
      type="button"
      class="inline-flex items-center justify-center w-8 h-8 rounded-full border border-blue-200 dark:border-blue-700/40 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
      :title="revealLabel"
      :aria-label="revealLabel"
      @click="showAgain"
    >
      <Info class="w-4 h-4" />
    </button>
  </div>
  <div
    v-else
    v-bind="$attrs"
    :class="['flex gap-3 p-3.5 rounded-xl text-sm relative', variants[variant]]"
  >
    <component :is="icons[variant]" class="w-5 h-5 shrink-0 mt-0.5" :class="iconColors[variant]" />
    <div class="min-w-0 flex-1 pr-6" :class="textColors[variant]">
      <p v-if="title" class="font-semibold mb-1">{{ title }}</p>
      <slot />
    </div>
    <slot name="action" />
    <button
      v-if="dismissKey"
      type="button"
      class="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      :title="dismissLabel"
      :aria-label="dismissLabel"
      @click="dismiss"
    >
      <X class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Info, AlertTriangle, CheckCircle2, XCircle, X } from '@lucide/vue';

defineOptions({ inheritAttrs: false });

const props = defineProps({
  variant: { type: String, default: 'info' },
  title: { type: String, default: '' },
  /** When set, the callout can be dismissed and the state is stored in localStorage. */
  dismissKey: { type: String, default: '' },
});

const STORAGE_PREFIX = 'infoCallout.dismissed.';

const dismissed = ref(false);

const revealLabel = computed(() => props.title || 'Show help');
const dismissLabel = computed(() => `Hide${props.title ? `: ${props.title}` : ' help'}`);

onMounted(() => {
  if (props.dismissKey) {
    dismissed.value = localStorage.getItem(STORAGE_PREFIX + props.dismissKey) === '1';
  }
});

function dismiss() {
  if (!props.dismissKey) return;
  dismissed.value = true;
  localStorage.setItem(STORAGE_PREFIX + props.dismissKey, '1');
}

function showAgain() {
  if (!props.dismissKey) return;
  dismissed.value = false;
  localStorage.removeItem(STORAGE_PREFIX + props.dismissKey);
}

const variants = {
  info: 'bg-blue-50 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-700/40',
  warn: 'bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-700/40',
  success: 'bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-700/40',
  error: 'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/40',
};

const textColors = {
  info: 'text-blue-700 dark:text-blue-300',
  warn: 'text-amber-800 dark:text-amber-200',
  success: 'text-emerald-700 dark:text-emerald-300',
  error: 'text-red-700 dark:text-red-300',
};

const iconColors = {
  info: 'text-blue-500 dark:text-blue-400',
  warn: 'text-amber-500 dark:text-amber-400',
  success: 'text-emerald-500 dark:text-emerald-400',
  error: 'text-red-500 dark:text-red-400',
};

const icons = {
  info: Info,
  warn: AlertTriangle,
  success: CheckCircle2,
  error: XCircle,
};
</script>
