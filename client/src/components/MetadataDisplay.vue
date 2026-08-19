<template>
  <div :class="compact ? 'space-y-2' : 'space-y-4'">
    <div
      v-if="title || !compact"
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <h4 v-if="title" class="section-label" :class="compact ? 'text-[10px] mb-0' : 'mb-0'">{{ title }}</h4>
      <ToggleGroup
        type="single"
        size="sm"
        class="bg-muted p-0.5 rounded-lg"
        :model-value="viewMode"
        @update:model-value="onViewModeChange"
      >
        <ToggleGroupItem value="cards" class="gap-1.5 px-3 text-xs" title="Section cards">
          <LayoutGrid class="w-3.5 h-3.5" />
          Sections
        </ToggleGroupItem>
        <ToggleGroupItem value="table" class="gap-1.5 px-3 text-xs" title="Classic table">
          <Table2 class="w-3.5 h-3.5" />
          Table
        </ToggleGroupItem>
      </ToggleGroup>
    </div>

    <!-- Card / section view -->
    <template v-if="viewMode === 'cards'">
      <details
        v-for="section in sections"
        :key="section.id"
        :open="!compact"
        class="rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] overflow-hidden"
      >
        <summary
          class="flex items-center justify-between bg-slate-100/80 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors font-semibold text-slate-800 dark:text-white cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden"
          :class="compact ? 'px-3 py-2 text-xs' : 'px-4 py-3.5 text-sm'"
        >
          <span>{{ section.title }}</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300">
            {{ section.filledCount }} / {{ section.fields.length }}
          </span>
        </summary>
        <dl
          class="grid grid-cols-1 sm:grid-cols-2 gap-2"
          :class="compact ? 'p-2.5 lg:grid-cols-2' : 'p-4 gap-3 lg:grid-cols-3'"
        >
          <div
            v-for="field in section.fields"
            :key="field.key"
            :class="field.type === 'textarea' ? 'sm:col-span-2 lg:col-span-3' : ''"
            class="metadata-field"
          >
            <dt class="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">{{ field.label }}</dt>
            <dd
              class="whitespace-pre-wrap leading-snug"
              :class="compact ? 'text-xs' : 'text-sm leading-relaxed'"
              :dir="textDirection"
            >
              <MetadataFieldValue :field="field" />
            </dd>
          </div>
        </dl>
      </details>
    </template>

    <!-- Classic table view -->
    <template v-else>
      <div
        v-for="section in sections"
        :key="section.id"
        class="rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] overflow-hidden"
      >
        <div
          class="flex items-center justify-between bg-slate-100/80 dark:bg-white/[0.04] border-b border-slate-200/70 dark:border-white/10 font-semibold text-slate-800 dark:text-white"
          :class="compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'"
        >
          <span>{{ section.title }}</span>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300">
            {{ section.filledCount }} / {{ section.fields.length }}
          </span>
        </div>
        <Table>
          <TableHeader>
            <TableRow class="hover:bg-transparent">
              <TableHead class="w-[38%] min-w-[10rem] font-semibold text-slate-600 dark:text-slate-300">Field</TableHead>
              <TableHead class="font-semibold text-slate-600 dark:text-slate-300">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="field in section.fields"
              :key="field.key"
              :class="field.isEmpty ? 'opacity-60' : ''"
            >
              <TableCell class="align-top font-medium text-slate-700 dark:text-slate-200 whitespace-normal">
                {{ field.label }}
              </TableCell>
              <TableCell class="align-top text-slate-800 dark:text-slate-100 whitespace-normal" :dir="textDirection">
                <MetadataFieldValue :field="field" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { LayoutGrid, Table2 } from '@lucide/vue';
import MetadataFieldValue from './MetadataFieldValue.vue';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { DEFAULT_CATALOG_SCHEMA, normalizeMetadata, gpsMapsUrl, parseHexColor, formatCatalogDate, formatCatalogDateTime } from '@rtidb/shared';
import type { CatalogSchema } from '@rtidb/shared';

const VIEW_MODE_KEY = 'metadataViewMode';

const props = defineProps({
  metadata: { type: Object, default: () => ({}) },
  textDirection: { type: String, default: 'ltr' },
  title: { type: String, default: '' },
  compact: { type: Boolean, default: false },
  schema: { type: Array as () => CatalogSchema | null, default: null },
});

const viewMode = ref(
  typeof localStorage !== 'undefined' && localStorage.getItem(VIEW_MODE_KEY) === 'table'
    ? 'table'
    : 'cards'
);

const setViewMode = (mode) => {
  viewMode.value = mode;
  localStorage.setItem(VIEW_MODE_KEY, mode);
};

function onViewModeChange(value) {
  if (value === 'cards' || value === 'table') setViewMode(value);
}

const normalized = computed(() => normalizeMetadata(props.metadata, props.schema));

const sections = computed(() => {
  const source = props.schema?.length ? props.schema : DEFAULT_CATALOG_SCHEMA;
  return source.map((section) => {
    const fields = section.fields.map((f) => {
      const value = normalized.value[f.key] || '';
      const trimmed = value.trim();
      return {
        ...f,
        value,
        displayValue: trimmed ? formatFieldValue(f, value) : '',
        isEmpty: !trimmed,
        mapsUrl: f.type === 'gps' && trimmed ? gpsMapsUrl(value) : null,
        hexColor: f.type === 'color' && trimmed ? parseHexColor(value) : null,
      };
    });
    const filledCount = fields.filter((f) => !f.isEmpty).length;
    return { ...section, fields, filledCount };
  });
});

function formatFieldValue(field, value) {
  if (!value) return value;
  if (field.type === 'date') return formatCatalogDate(value);
  if (field.key === 'lastEdit') return formatCatalogDateTime(value);
  return value;
}
</script>
