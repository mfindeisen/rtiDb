<template>
  <div class="p-4 sm:p-6 space-y-6">
    <p
      v-if="record.description"
      class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm border-l-2 border-blue-500/30 pl-4"
      :dir="record.direction"
    >
      {{ record.description }}
    </p>

    <div
      v-if="sourceFiles.length"
      class="p-4 bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl"
    >
      <h4 class="section-label mb-1 flex items-center gap-2">
        <FileDown class="w-3.5 h-3.5" /> Original files
      </h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">
        The uploaded source file kept after processing.
      </p>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="file in sourceFiles"
          :key="file.kind"
          as-child
          variant="outline"
          size="sm"
          class="h-9"
        >
          <a :href="originalUrl(file.kind)" :download="file.fileName" :title="file.fileName">
            <FileDown class="w-3.5 h-3.5" />
            {{ sourceFileLabel(file.kind) }}
            <span class="text-slate-500 dark:text-slate-400 font-normal">{{ formatBytes(file.sizeBytes) }}</span>
          </a>
        </Button>
      </div>
    </div>

    <div class="p-4 bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl">
      <h4 class="section-label mb-2 flex items-center gap-2">
        <Download class="w-3.5 h-3.5" /> Data Export
      </h4>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="fmt in exportFormats"
          :key="fmt.id"
          as-child
          variant="outline"
          size="sm"
          class="h-9"
        >
          <a :href="exportUrl(fmt.id)" :download="fmt.download">
            <component :is="fmt.icon" class="w-3.5 h-3.5" />
            {{ fmt.label }}
          </a>
        </Button>
      </div>
    </div>

    <MetadataDisplay
      title="Catalog Record"
      :metadata="record.metadata"
      :schema="schema"
      :text-direction="record.direction || 'ltr'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Download, FileDown, FileJson, FileText, Table, BookOpen, Library } from '@lucide/vue';
import MetadataDisplay from '@/components/MetadataDisplay.vue';
import { Button } from '@/components/ui/button';
import { exportRecordUrl, originalFileUrl } from '@/api/records';
import { formatBytes } from '@/lib/format';
import type { RecordDetail, RecordSourceFileKind } from '@rtidb/shared/api/records';
import type { CatalogSchema } from '@rtidb/shared/catalogSchema';

const props = defineProps<{
  record: RecordDetail;
  schema: CatalogSchema;
}>();

const exportFormats = [
  { id: 'json', label: 'JSON', icon: FileJson, download: true },
  { id: 'xml', label: 'XML', icon: FileText, download: true },
  { id: 'csv', label: 'CSV', icon: Table, download: true },
  { id: 'bibtex', label: 'BibTeX', icon: BookOpen, download: true },
  { id: 'ris', label: 'RIS', icon: BookOpen, download: true },
  { id: 'iiif', label: 'IIIF', icon: Library, download: true },
];

const exportUrl = (format: string) => exportRecordUrl(props.record.slug || props.record.id, format);

const sourceFiles = computed(() => props.record.sourceFiles || []);

const originalUrl = (kind: RecordSourceFileKind) =>
  originalFileUrl(props.record.slug || props.record.id, kind);

function sourceFileLabel(kind: RecordSourceFileKind) {
  if (kind === 'weights') return 'Decoder weights';
  return props.record.outputType === 'neural' ? 'Latent map' : 'Original scan';
}
</script>
