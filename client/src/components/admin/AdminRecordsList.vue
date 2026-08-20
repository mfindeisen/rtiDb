<template>
  <div>
    <h2 class="section-heading mb-4">Manage Records</h2>

    <InfoCallout
      v-if="userRole === 'admin'"
      variant="info"
      title="AI auto-annotation"
      experimental
      dismiss-key="admin-auto-annotate"
      class="mb-6"
    >
      <p>
        <span class="text-amber-700 dark:text-amber-300 font-semibold">Experimental.</span>
        Runs <strong>OWL-ViT</strong> zero-shot detection on the catalog thumbnail (CPU, ~200–400&nbsp;MB extra RAM).
        Looks for figures, animals, symbols, and inscriptions. If nothing is detected, falls back to catalog metadata as a labeled region.
      </p>
      <p class="mt-1.5 text-xs opacity-85">
        Annotations are saved as <span class="font-semibold text-violet-600 dark:text-violet-300">purple AI marks</span> on your account.
        Quality on ancient sealings may be limited — use offline GPU batch processing if this is not good enough.
        Max 5 runs per hour.
      </p>
    </InfoCallout>

    <div v-if="loadingRecords" class="text-center text-slate-500 dark:text-slate-400 py-8">Loading records...</div>
    <div v-else-if="records.length === 0" class="text-center text-slate-500 dark:text-slate-400 py-8">No records found.</div>

    <div v-else class="space-y-4">
      <div v-for="rec in records" :key="rec.id" class="metadata-field p-3 sm:p-4 text-left">
        <div class="flex flex-col gap-3">
          <div class="flex gap-3 items-start min-w-0">
            <div v-if="rec.thumbnailUrl" class="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-slate-100 dark:bg-black/30 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10">
              <img :src="rec.thumbnailUrl" alt="Thumbnail" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-slate-100 dark:bg-black/30 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400">
              <ImageIcon class="w-8 h-8 opacity-50" />
            </div>

            <div class="flex-grow min-w-0">
              <h3 class="text-lg sm:text-xl font-bold text-slate-800 dark:text-white wrap-anywhere leading-snug">{{ rec.name }}</h3>
              <div class="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span v-if="rec.recordTypeName" class="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">{{ rec.recordTypeName }}</span>
                <span v-if="rec.status === 'done'" class="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">Ready</span>
                <RecordOutputBadge :record="rec" />
                <span v-if="autoAnnotateState[rec.id]?.running" class="text-xs font-bold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 animate-pulse">AI running</span>
                <span v-else-if="rec.status === 'draft'" class="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">Draft</span>
                <span v-else-if="rec.status === 'processing'" class="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 animate-pulse">Processing</span>
                <span v-else class="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400">Error</span>
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-mono flex items-center gap-1">
                <CalendarIcon class="w-3.5 h-3.5 shrink-0" />
                {{ formatRecordDateTime(rec.date) }}
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2" :dir="rec.direction">{{ rec.description }}</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-1 border-t border-slate-200/70 dark:border-white/10 pt-2">
            <Button v-if="rec.status === 'draft' && hasPermission('upload_rti')" type="button" variant="ghost" size="icon" class="size-9 text-emerald-600 dark:text-emerald-400" title="Upload RTI" @click="$emit('upload-for', rec)">
              <Upload />
            </Button>
            <Button v-if="rec.status === 'done' && hasPermission('edit_record')" type="button" variant="ghost" size="sm" class="h-9 px-2.5 text-blue-600 dark:text-blue-400" :title="rec.isPublished ? 'Unpublish' : 'Publish'" @click="$emit('toggle-publish', rec)">
              {{ rec.isPublished ? 'Unpublish' : 'Publish' }}
            </Button>
            <Button v-if="rec.status === 'error' && hasPermission('upload_rti')" type="button" variant="ghost" size="icon" class="size-9 text-amber-600 dark:text-amber-400" title="Rerun" @click="$emit('rerun', rec.id)">
              <RefreshCw />
            </Button>
            <Button v-if="userRole === 'admin' && rec.status === 'done' && rec.thumbnailUrl" type="button" variant="ghost" size="icon" class="relative size-9 text-violet-600 dark:text-violet-400" :disabled="!!autoAnnotateState[rec.id]?.running" title="AI auto-annotate (experimental)" @click="$emit('auto-annotate', rec, false)">
              <Sparkles :class="autoAnnotateState[rec.id]?.running ? 'animate-spin' : ''" />
              <span class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            </Button>
            <Button v-if="hasPermission('edit_record')" type="button" variant="ghost" size="icon" class="size-9 text-blue-600 dark:text-blue-400" title="Edit" @click="$emit('edit', rec.id)">
              <Pencil />
            </Button>
            <Button v-if="hasPermission('delete_record')" type="button" variant="ghost" size="icon" class="size-9 text-destructive" title="Delete" @click="$emit('delete', rec.id)">
              <Trash2 />
            </Button>
            <router-link
              v-if="rec.status === 'done' || rec.status === 'draft'"
              :to="recordPath(rec)"
              class="ml-auto text-sm font-semibold px-2 py-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              {{ rec.status === 'draft' ? 'View catalog →' : 'View Record →' }}
            </router-link>
          </div>
        </div>

        <div v-if="rec.status === 'processing'" class="mt-4 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 space-y-2">
          <div class="w-full h-2 bg-slate-200 dark:bg-black/30 rounded-full overflow-hidden">
            <div class="h-full bg-blue-500 transition-all duration-300" :style="{ width: (rec.progress || 0) + '%' }" />
          </div>
          <div class="flex justify-between text-xs text-slate-600 dark:text-slate-300">
            <span class="italic truncate">{{ rec.message || 'Initializing...' }}</span>
            <span class="font-semibold ml-3">{{ rec.progress || 0 }}%</span>
          </div>
          <div class="flex justify-between items-center gap-2 text-xs text-slate-500 dark:text-slate-400 border-t border-blue-100 dark:border-blue-900/30 pt-2">
            <span>Elapsed: {{ elapsedFor(rec) }}</span>
            <span class="shrink-0">ETA: {{ etaFor(rec) }}</span>
          </div>
          <Button
            v-if="hasPermission('upload_rti')"
            type="button"
            variant="outline"
            size="sm"
            class="w-full h-8 text-xs"
            :disabled="!!cancelling[rec.id]"
            title="Stop processing"
            @click="$emit('cancel', rec.id)"
          >
            <CircleStop class="w-3.5 h-3.5 mr-1.5" />
            {{ cancelling[rec.id] ? 'Cancelling…' : 'Cancel processing' }}
          </Button>
        </div>

        <AutoAnnotateProgressPanel
          v-if="autoAnnotateState[rec.id]"
          :record-id="rec.id"
          :state="autoAnnotateState[rec.id]"
          :now="now"
          @retry="$emit('auto-annotate', rec, true)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pencil, Trash2, Image as ImageIcon, Calendar as CalendarIcon, RefreshCw, CircleStop, Upload, Sparkles } from '@lucide/vue';
import InfoCallout from '@/components/InfoCallout.vue';
import RecordOutputBadge from '@/components/RecordOutputBadge.vue';
import AutoAnnotateProgressPanel, { type AutoAnnotateUiState } from '@/components/admin/AutoAnnotateProgressPanel.vue';
import { Button } from '@/components/ui/button';
import { recordPath } from '@/lib/recordPath';
import { formatRecordDateTime } from '@rtidb/shared';
import { hasPermission } from '@/composables/useAuth';
import type { RecordRow } from '@rtidb/shared/api/records';

defineProps<{
  userRole: string;
  loadingRecords: boolean;
  records: RecordRow[];
  autoAnnotateState: Record<number, AutoAnnotateUiState>;
  cancelling: Record<number, boolean>;
  now: number;
  elapsedFor: (rec: RecordRow) => string;
  etaFor: (rec: RecordRow) => string;
}>();

defineEmits<{
  'upload-for': [rec: RecordRow];
  'toggle-publish': [rec: RecordRow];
  rerun: [id: number];
  'auto-annotate': [rec: RecordRow, replace: boolean];
  edit: [id: number];
  delete: [id: number];
  cancel: [id: number];
}>();
</script>
