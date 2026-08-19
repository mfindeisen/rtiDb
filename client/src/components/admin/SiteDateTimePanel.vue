<template>
  <div class="space-y-6">
    <div>
      <h2 class="section-heading">Date &amp; time</h2>
      <p class="section-sub mt-1">How dates and times appear across the catalog, gallery, and admin pages.</p>
    </div>

    <InfoCallout v-if="error" variant="error">{{ error }}</InfoCallout>
    <InfoCallout v-if="success" variant="success">{{ success }}</InfoCallout>

    <FancyCard>
      <CardContent class="pt-6 space-y-5">
        <div class="rounded-xl border border-slate-200 dark:border-white/10 px-4 py-3 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl">
          <p class="text-[10px] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500 font-semibold">Preview</p>
          <p class="mt-1 font-mono text-lg sm:text-xl font-semibold text-slate-800 dark:text-white tabular-nums">
            {{ preview.dateTime }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sample date 7 February 2024, 14:30
          </p>
        </div>

        <div class="flex flex-col text-left">
          <Label class="mb-2">Date format</Label>
          <div class="grid grid-cols-1 gap-1.5">
            <button
              v-for="opt in dateFormatOptions"
              :key="opt.id"
              type="button"
              class="flex items-center justify-between gap-3 w-full rounded-lg border px-3 py-2 text-left transition-colors"
              :class="draft.dateFormat === opt.id
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'"
              :disabled="saving"
              @click="draft.dateFormat = opt.id"
            >
              <span class="min-w-0">
                <span class="block font-mono text-sm font-semibold text-slate-800 dark:text-white">{{ opt.label }}</span>
                <span class="block text-[11px] text-slate-500 dark:text-slate-400">{{ opt.hint }}</span>
              </span>
              <span class="font-mono text-sm tabular-nums text-slate-600 dark:text-slate-300 shrink-0">
                {{ sampleDate(opt.id) }}
              </span>
            </button>
          </div>
        </div>

        <div class="flex flex-col text-left">
          <Label class="mb-2">Time format</Label>
          <SegmentPills
            :model-value="draft.timeFormat"
            full-width
            :disabled="saving"
            :options="timeOptions"
            @update:model-value="draft.timeFormat = $event"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          <Button type="button" :disabled="saving" @click="save">{{ saving ? 'Saving…' : 'Save date & time' }}</Button>
          <Button type="button" variant="outline" :disabled="saving" @click="reset">Reset to defaults</Button>
        </div>
      </CardContent>
    </FancyCard>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import {
  DATE_FORMAT_OPTIONS,
  DATE_FORMAT_PREVIEW_ISO,
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  applyDateTimeFormats,
  formatDateParts,
  formatDateTimePreview,
  parseDateParts,
  parseSiteConfig,
} from '@rtidb/shared';
import FancyCard from '../FancyCard.vue';
import InfoCallout from '../InfoCallout.vue';
import SegmentPills from '../SegmentPills.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { getSiteConfig, updateSiteConfig } from '@/api/catalog';
import { useSiteConfig } from '@/composables/useSiteConfig';
import { ApiError } from '@/api/client';

const { reload } = useSiteConfig();
const dateFormatOptions = DATE_FORMAT_OPTIONS;
const draft = reactive({
  dateFormat: DEFAULT_DATE_FORMAT,
  timeFormat: DEFAULT_TIME_FORMAT,
});
const saving = ref(false);
const error = ref('');
const success = ref('');

const preview = computed(() => formatDateTimePreview(DATE_FORMAT_PREVIEW_ISO, draft));

const sampleParts = parseDateParts(DATE_FORMAT_PREVIEW_ISO);

function sampleDate(formatId) {
  if (!sampleParts) return '';
  return formatDateParts(sampleParts, formatId);
}

const timeOptions = [
  { value: '24h', label: '24-hour (14:30)' },
  { value: '12h', label: '12-hour (2:30 PM)' },
];

async function load() {
  const config = parseSiteConfig(await getSiteConfig());
  draft.dateFormat = config.dateFormat;
  draft.timeFormat = config.timeFormat;
}

async function save() {
  saving.value = true;
  error.value = '';
  success.value = '';
  try {
    const saved = await updateSiteConfig({
      dateFormat: draft.dateFormat,
      timeFormat: draft.timeFormat,
    });
    draft.dateFormat = saved.dateFormat;
    draft.timeFormat = saved.timeFormat;
    applyDateTimeFormats(saved);
    await reload();
    success.value = 'Date and time format saved.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Could not save date and time format.';
  } finally {
    saving.value = false;
  }
}

async function reset() {
  draft.dateFormat = DEFAULT_DATE_FORMAT;
  draft.timeFormat = DEFAULT_TIME_FORMAT;
  await save();
  if (!error.value) success.value = 'Reset to MM/DD/YYYY and 24-hour time.';
}

onMounted(load);
</script>
