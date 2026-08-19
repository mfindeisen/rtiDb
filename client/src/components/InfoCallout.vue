<template>
  <div v-if="dismissKey && dismissed" class="flex" :class="$attrs.class || 'mb-4'">
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      class="rounded-full text-blue-500 dark:text-blue-400"
      :title="revealLabel"
      :aria-label="revealLabel"
      @click="showAgain"
    >
      <Info />
    </Button>
  </div>
  <div
    v-else
    v-bind="$attrs"
    :class="['flex gap-3 p-3.5 rounded-xl text-sm relative', variants[variant]]"
  >
    <component :is="icons[variant]" class="w-5 h-5 shrink-0 mt-0.5" :class="iconColors[variant]" />
    <div class="min-w-0 flex-1 pr-6" :class="textColors[variant]">
      <p v-if="title" class="font-semibold mb-1 flex items-center gap-1.5 flex-wrap">
        {{ title }}
        <ExperimentalBadge v-if="experimental" />
      </p>
      <slot />
    </div>
    <slot name="action" />
    <Button
      v-if="dismissKey"
      type="button"
      variant="ghost"
      size="icon-xs"
      class="absolute top-2.5 right-2.5 text-muted-foreground"
      :title="dismissLabel"
      :aria-label="dismissLabel"
      @click="dismiss"
    >
      <X />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Info, AlertTriangle, CheckCircle2, XCircle, X } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import ExperimentalBadge from './ExperimentalBadge.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps({
  variant: { type: String, default: 'info' },
  title: { type: String, default: '' },
  experimental: { type: Boolean, default: false },
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
