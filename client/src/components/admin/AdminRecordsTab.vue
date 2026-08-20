<template>
  <div :class="(hasPermission('upload_rti') || hasPermission('edit_record')) ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-start' : 'max-w-3xl mx-auto space-y-6'">
    <FancyCard v-if="hasPermission('upload_rti') || hasPermission('edit_record')">
      <CardContent class="pt-6">
        <SegmentPills
          v-model="panelMode"
          class="mb-6"
          full-width
          :options="panelOptions"
        />

        <AdminCreateRecordForm
          v-if="panelMode === 'create' && hasPermission('edit_record')"
          v-model:name="createName"
          v-model:description="createDescription"
          v-model:direction="createDirection"
          v-model:type-id="createTypeId"
          :record-types="recordTypes"
          :is-creating="isCreating"
          :error="createError"
          :success="createSuccess"
          @submit="createRecord"
        />

        <AdminUploadForm
          v-else-if="panelMode === 'upload' && hasPermission('upload_rti')"
          v-model:attach-draft-id="attachDraftId"
          :upload-target-id="uploadTargetId"
          :upload-target-name="uploadTargetName"
          :draft-records="draftRecords"
          :create-type-id="createTypeId"
          :handle-unauthorized="handleUnauthorized"
          :fetch-records="fetchRecords"
          :poll-processing-fallback="pollProcessingFallback"
          @clear-target="clearUploadTarget"
        />
      </CardContent>
    </FancyCard>

    <FancyCard>
      <CardContent class="pt-6">
        <AdminRecordsList
          :user-role="userRole"
          :loading-records="loadingRecords"
          :records="records"
          :auto-annotate-state="autoAnnotateState"
          :cancelling="cancelling"
          :now="now"
          :elapsed-for="getElapsed"
          :eta-for="getETA"
          @upload-for="startUploadForRecord"
          @toggle-publish="togglePublish"
          @rerun="rerunRecord"
          @auto-annotate="runAutoAnnotate"
          @edit="openEdit"
          @delete="deleteRecord"
          @cancel="cancelProcessing"
        />
      </CardContent>
    </FancyCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FancyCard from '@/components/FancyCard.vue';
import SegmentPills from '@/components/SegmentPills.vue';
import { CardContent } from '@/components/ui/card';
import { hasPermission } from '@/composables/useAuth';
import { useAdminRecords } from '@/composables/useAdminRecords';
import { recordsPanelOptions } from '@/components/admin/adminFormOptions';
import AdminCreateRecordForm from '@/components/admin/AdminCreateRecordForm.vue';
import AdminUploadForm from '@/components/admin/AdminUploadForm.vue';
import AdminRecordsList from '@/components/admin/AdminRecordsList.vue';

const {
  userRole,
  panelMode,
  createName,
  createDescription,
  createDirection,
  createTypeId,
  recordTypes,
  isCreating,
  createError,
  createSuccess,
  uploadTargetId,
  uploadTargetName,
  attachDraftId,
  records,
  autoAnnotateState,
  cancelling,
  loadingRecords,
  now,
  draftRecords,
  handleUnauthorized,
  startUploadForRecord,
  clearUploadTarget,
  createRecord,
  fetchRecords,
  pollProcessingFallback,
  getElapsed,
  getETA,
  openEdit,
  deleteRecord,
  togglePublish,
  rerunRecord,
  cancelProcessing,
  runAutoAnnotate,
} = useAdminRecords();

const panelOptions = computed(() => recordsPanelOptions());
</script>
