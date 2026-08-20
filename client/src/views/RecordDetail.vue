<template>
  <div class="page-shell space-y-4">
    <Button
      type="button"
      variant="ghost"
      class="text-slate-500 dark:text-slate-400 justify-start"
      :class="{ 'max-lg:hidden': activeTab === 'viewer' && !showHistory }"
      @click="goBack"
    >
      <ArrowLeft class="w-5 h-5" /> Back
    </Button>

    <div
      v-if="loading"
      class="text-center py-16 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-white/10"
    >
      Loading record...
    </div>
    <div
      v-else-if="error"
      class="p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 rounded-lg"
    >
      {{ error }}
    </div>

    <div v-else-if="record" class="space-y-4">
      <RecordDetailHeader
        :record="record"
        :created-at="recordCreatedAt"
        :updated-at="recordUpdatedAt"
        :hide-on-mobile-viewer="activeTab === 'viewer' && !showHistory"
      />

      <div class="flex items-stretch gap-2 mb-4" :class="{ 'max-lg:mb-2': activeTab === 'viewer' && !showHistory }">
        <SegmentPills
          v-model="activeTab"
          full-width
          class="flex-1 min-w-0"
          :options="recordTabOptions"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          class="shrink-0 self-stretch h-auto"
          :class="showHistory ? 'bg-muted' : ''"
          title="Version history"
          @click="toggleHistory"
        >
          <History class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">History</span>
        </Button>
      </div>

      <ScrollArea
        v-show="showHistory"
        class="glass-card !p-0 xl:h-[calc(100vh-220px)]"
      >
        <div class="p-4 sm:p-6">
          <RecordHistoryPanel
            :record-id="record.id"
            :record-slug="record.slug || ''"
          />
        </div>
      </ScrollArea>

      <ScrollArea
        v-show="!showHistory && activeTab === 'metadata'"
        class="glass-card !p-0 xl:h-[calc(100vh-220px)]"
      >
        <RecordMetadataPanel :record="record" :schema="recordSchema" />
      </ScrollArea>

      <ScrollArea
        v-show="!showHistory && activeTab === 'discussion'"
        class="glass-card !p-0 xl:h-[calc(100vh-220px)]"
      >
        <div class="p-4 sm:p-6">
          <RecordCommentsPanel
            :record-id="record.id"
            :record-slug="record.slug || ''"
          />
        </div>
      </ScrollArea>

      <RecordViewerPane
        v-show="!showHistory && activeTab === 'viewer'"
        v-model:record="record"
        v-model:viewer-mode="viewerMode"
        :viewer-mounted="viewerMounted"
        :viewer-active="activeTab === 'viewer'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, Image, FileText, History, MessageSquare } from '@lucide/vue';
import RecordCommentsPanel from '@/components/RecordCommentsPanel.vue';
import RecordHistoryPanel from '@/components/RecordHistoryPanel.vue';
import SegmentPills from '@/components/SegmentPills.vue';
import RecordDetailHeader from '@/components/record/RecordDetailHeader.vue';
import RecordMetadataPanel from '@/components/record/RecordMetadataPanel.vue';
import RecordViewerPane from '@/components/record/RecordViewerPane.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { getRecord } from '@/api/records';
import { recordPath } from '@/lib/recordPath';
import { formatRecordDateTime, getRecordUpdatedAt, DEFAULT_CATALOG_SCHEMA } from '@rtidb/shared';
import { listRecordTypes } from '@/api/catalog';
import type { RecordType } from '@rtidb/shared/api/catalog';
import type { RecordDetail } from '@rtidb/shared/api/records';

const route = useRoute();
const router = useRouter();
const record = ref<RecordDetail | null>(null);
const recordTypes = ref<RecordType[]>([]);
const recordSchema = computed(() => {
  const type = recordTypes.value.find((item) => item.id === record.value?.recordTypeId);
  return type?.schema?.length ? type.schema : DEFAULT_CATALOG_SCHEMA;
});

const goBack = () => {
  if (window.history.state && window.history.state.back) {
    router.back();
  } else {
    router.push('/');
  }
};

const loading = ref(true);
const error = ref('');
const activeTab = ref('metadata');
const viewerMounted = ref(false);
const showHistory = ref(false);
const viewerMode = ref<'modern' | 'legacy'>('modern');

const recordTabOptions = computed(() => [
  { value: 'metadata', label: 'Catalog & Metadata', shortLabel: 'Catalog', icon: FileText },
  {
    value: 'viewer',
    label: 'RTI Viewer & Annotations',
    shortLabel: 'Viewer',
    icon: Image,
    disabled: record.value?.status !== 'done',
  },
  { value: 'discussion', label: 'Scholarly Discussion', shortLabel: 'Discussion', icon: MessageSquare },
]);

watch(activeTab, (tab) => {
  showHistory.value = false;
  localStorage.setItem('recordDetailTab', tab);
  if (tab === 'viewer') viewerMounted.value = true;
});

const recordCreatedAt = computed(() =>
  record.value?.date ? formatRecordDateTime(record.value.date) : '',
);

const recordUpdatedAt = computed(() =>
  record.value ? getRecordUpdatedAt(record.value) : '',
);

const toggleHistory = () => {
  showHistory.value = !showHistory.value;
};

onMounted(async () => {
  try {
    const param = Array.isArray(route.params.slug) ? route.params.slug[0]! : route.params.slug;
    record.value = await getRecord(param);
    try {
      recordTypes.value = await listRecordTypes();
    } catch {
      recordTypes.value = [];
    }

    if (record.value.slug && param !== record.value.slug) {
      router.replace(recordPath(record.value));
    }

    const storedTab = localStorage.getItem('recordDetailTab');
    if (storedTab === 'viewer' && record.value.status === 'done') {
      activeTab.value = 'viewer';
      viewerMounted.value = true;
    }

    loading.value = false;
  } catch (err) {
    error.value = err instanceof Error ? err.message : String((err as { message?: string }).message ?? err);
    loading.value = false;
  }
});
</script>
