import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ApiError } from '@/api/client';
import { subscribeProgress } from '@/api/progress';
import {
  listRecords,
  createRecord as apiCreateRecord,
  deleteRecord as apiDeleteRecord,
  publishRecord,
  rerunProcessing,
  startAutoAnnotate,
  getAutoAnnotateJob,
  getRecordProcessing,
  cancelRecordProcessing,
} from '@/api/records';
import { listRecordTypes } from '@/api/catalog';
import { getCurrentUser, logout as authLogout, hasPermission } from '@/composables/useAuth';
import { pollJob } from '@/composables/useJobPoll';
import { confirmAction, showAlert } from '@/composables/useConfirmDialog';
import type { ProcessingJob } from '@rtidb/shared/api/jobs';
import type { RecordRow } from '@rtidb/shared/api/records';
import type { RecordType } from '@rtidb/shared/api/catalog';
import type { AutoAnnotateUiState } from '@/components/admin/AutoAnnotateProgressPanel.vue';

export type AdminRecordsWorkspace = ReturnType<typeof useAdminRecords>;

export function useAdminRecords() {
  const router = useRouter();
  const userRole = ref(getCurrentUser()?.role || 'editor');

  const logout = async () => {
    await authLogout();
    router.push('/login');
  };

  function handleUnauthorized(err: unknown): boolean {
    if (err instanceof ApiError && err.status === 401) {
      void logout();
      return true;
    }
    return false;
  }

  const panelMode = ref(hasPermission('edit_record') ? 'create' : 'upload');

  const createName = ref('');
  const createDescription = ref('');
  const createDirection = ref('ltr');
  const createTypeId = ref('');
  const recordTypes = ref<RecordType[]>([]);
  const isCreating = ref(false);
  const createError = ref('');
  const createSuccess = ref('');

  const uploadTargetId = ref<number | null>(null);
  const uploadTargetName = ref('');
  const attachDraftId = ref('');
  const error = ref('');

  const records = ref<RecordRow[]>([]);
  const autoAnnotateState = ref<Record<number, AutoAnnotateUiState>>({});
  const cancelling = ref<Record<number, boolean>>({});
  const loadingRecords = ref(true);
  const now = ref(Date.now());

  let autoAnnotatePollTimer: ReturnType<typeof setTimeout> | null = null;
  let unsubscribeProgress: (() => void) | null = null;
  let timer: ReturnType<typeof setInterval> | null = null;
  let processingPollTimer: ReturnType<typeof setInterval> | null = null;

  function clearAutoAnnotatePoll() {
    if (autoAnnotatePollTimer) {
      clearTimeout(autoAnnotatePollTimer);
      autoAnnotatePollTimer = null;
    }
  }

  function phaseLabel(phase: string | null | undefined, status: string | undefined, position: number | undefined) {
    if (status === 'queued') {
      return (position ?? 0) > 1 ? `In queue — position ${position}` : 'Waiting for server worker…';
    }
    if (phase === 'prepare') return 'Preparing thumbnail…';
    if (phase === 'loading') return 'Loading OWL-ViT model…';
    if (phase === 'detecting') return 'Detecting figures & symbols…';
    if (phase === 'metadata') return 'Using catalog metadata fallback…';
    if (phase === 'done') return 'Saving annotations…';
    return 'Processing…';
  }

  async function pollAutoAnnotateJob(recordId: number, jobId: string) {
    try {
      const data = await pollJob(
        jobId,
        {
          fetchJob: async (id) => {
            try {
              return await getAutoAnnotateJob(recordId, id);
            } catch (err) {
              if (handleUnauthorized(err)) return null;
              throw err;
            }
          },
          getStatus: (job) => job.status,
          getPhase: (job) => job.phase,
          stepsForPhase: () => [],
          intervalMs: 900,
        },
        (job) => {
          if (job.status === 'queued' || job.status === 'processing') {
            autoAnnotateState.value[recordId] = {
              ...autoAnnotateState.value[recordId],
              running: true,
              status: job.status,
              phase: job.phase || autoAnnotateState.value[recordId]?.phase,
              position: job.position || 0,
              message: phaseLabel(job.phase, job.status, job.position),
            };
          }
        },
      );

      if (data.status === 'done') {
        const methods = (data.methods || []).join(', ') || 'none';
        autoAnnotateState.value[recordId] = {
          running: false,
          status: 'done',
          phase: 'done',
          message: data.created
            ? `Created ${data.created} AI annotation(s) via ${methods}. Open the record viewer to review (purple marks).`
            : (data.error || 'Finished but created no annotations.'),
          canRetry: true,
          error: !data.created,
          startedAt: autoAnnotateState.value[recordId]?.startedAt,
        };
        return;
      }

      if (data.status === 'error') {
        autoAnnotateState.value[recordId] = {
          running: false,
          status: 'error',
          phase: 'error',
          message: data.error || 'Auto-annotation failed',
          error: true,
          canRetry: true,
          startedAt: autoAnnotateState.value[recordId]?.startedAt,
        };
      }
    } catch (err) {
      if (handleUnauthorized(err)) return;
      throw err;
    }
  }

  async function runAutoAnnotate(rec: RecordRow, replace = false) {
    const ok = await confirmAction({
      title: replace ? 'Replace AI annotations?' : 'Run AI auto-annotation?',
      description: replace
        ? 'This replaces your existing AI annotations and uses significant CPU/RAM on the server.'
        : 'This uses significant CPU/RAM on the server (experimental).',
      confirmLabel: replace ? 'Replace and re-run' : 'Run',
      variant: replace ? 'destructive' : 'default',
    });
    if (!ok) return;

    clearAutoAnnotatePoll();
    autoAnnotateState.value[rec.id] = {
      running: true,
      status: 'queued',
      phase: 'queued',
      position: 0,
      message: 'Starting…',
      startedAt: Date.now(),
    };

    try {
      const data = await startAutoAnnotate(rec.id, replace);
      await pollAutoAnnotateJob(rec.id, data.jobId);
    } catch (err) {
      if (handleUnauthorized(err)) return;
      let message = 'Auto-annotation failed';
      if (err instanceof ApiError) {
        try {
          const body = JSON.parse(err.body) as { error?: string };
          message = body.error || err.body || message;
        } catch {
          message = err.body || message;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }
      autoAnnotateState.value[rec.id] = {
        running: false,
        message,
        error: true,
        canRetry: true,
      };
    } finally {
      autoAnnotateState.value[rec.id] = {
        ...autoAnnotateState.value[rec.id],
        running: false,
      };
      clearAutoAnnotatePoll();
    }
  }

  const draftRecords = computed(() => records.value.filter((r) => r.status === 'draft'));

  const startUploadForRecord = (rec: RecordRow) => {
    uploadTargetId.value = rec.id;
    uploadTargetName.value = rec.name;
    attachDraftId.value = '';
    panelMode.value = 'upload';
    error.value = '';
  };

  const clearUploadTarget = () => {
    uploadTargetId.value = null;
    uploadTargetName.value = '';
    attachDraftId.value = '';
  };

  const fetchRecords = async () => {
    try {
      records.value = await listRecords({ published: 'all' });
    } catch (err) {
      if (!handleUnauthorized(err)) {
        console.error('Failed to load records', err);
      }
    } finally {
      loadingRecords.value = false;
    }
  };

  const createRecord = async () => {
    isCreating.value = true;
    createError.value = '';
    createSuccess.value = '';
    try {
      const data = await apiCreateRecord({
        name: createName.value,
        description: createDescription.value,
        direction: createDirection.value,
        recordTypeId: createTypeId.value ? Number(createTypeId.value) : undefined,
      });
      createSuccess.value = `Record #${data.id} created. You can add metadata and upload RTI when ready.`;
      createName.value = '';
      createDescription.value = '';
      createDirection.value = 'ltr';
      await fetchRecords();
      if (hasPermission('upload_rti')) {
        const rec = records.value.find((r) => r.id === data.id);
        if (rec) startUploadForRecord(rec);
      }
    } catch (err) {
      if (handleUnauthorized(err)) return;
      createError.value = err instanceof ApiError ? err.body : (err instanceof Error ? err.message : 'Network error.');
    } finally {
      isCreating.value = false;
    }
  };

  const setupProgress = () => {
    if (unsubscribeProgress) return;
    unsubscribeProgress = subscribeProgress((data) => {
      const targetRecord = records.value.find((r) => r.id === data.id);
      if (targetRecord) {
        if (data.message) {
          targetRecord.message = data.message;
        }
        if (data.progress === -1) {
          targetRecord.status = 'error';
        } else {
          const finished = data.progress >= 100;
          targetRecord.status = finished ? 'done' : 'processing';
          targetRecord.progress = data.progress;
          if (finished) {
            void fetchRecords();
          }
        }
      }
    });
  };

  function applyProcessingJob(job: ProcessingJob) {
    const rec = records.value.find((r) => r.id === job.recordId);
    if (!rec) return;
    if (job.status === 'queued') {
      rec.status = 'processing';
      rec.message = job.position > 1 ? `In queue — position ${job.position}` : 'Waiting for worker…';
      return;
    }
    if (job.status === 'processing') {
      rec.status = 'processing';
      return;
    }
    if (job.status === 'done') {
      rec.status = 'done';
      rec.progress = 100;
      void fetchRecords();
      return;
    }
    if (job.status === 'error' || job.status === 'cancelled') {
      rec.status = 'error';
      rec.message = job.status === 'cancelled' ? 'Cancelled' : (job.error || rec.message);
    }
  }

  async function pollProcessingFallback() {
    const processingIds = records.value
      .filter((r) => r.status === 'processing')
      .map((r) => r.id);
    if (processingIds.length === 0) return;

    await Promise.all(processingIds.map(async (id) => {
      try {
        applyProcessingJob(await getRecordProcessing(id));
      } catch (err) {
        if (handleUnauthorized(err)) return;
      }
    }));
  }

  const formatTime = (ms: number) => {
    if (!ms || ms < 0 || ms === Infinity) return '--:--';
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  const getElapsed = (rec: RecordRow) => {
    const startTime = new Date(rec.date).getTime();
    return formatTime(now.value - startTime);
  };

  const getETA = (rec: RecordRow) => {
    if (!rec.progress || rec.progress <= 0) return 'Calculating...';
    const startTime = new Date(rec.date).getTime();
    const elapsed = now.value - startTime;
    const totalEstimated = elapsed / (rec.progress / 100);
    const remaining = totalEstimated - elapsed;
    return formatTime(remaining);
  };

  const openEdit = (id: number) => {
    router.push(`/admin/records/${id}/edit`);
  };

  const deleteRecord = async (id: number) => {
    const ok = await confirmAction({
      title: 'Delete this record?',
      description: 'This permanently deletes the record and its files from the server. This cannot be undone.',
      confirmLabel: 'Delete record',
    });
    if (!ok) return;

    try {
      await apiDeleteRecord(id);
      records.value = records.value.filter((r) => r.id !== id);
    } catch (err) {
      if (handleUnauthorized(err)) return;
      await showAlert({
        title: 'Could not delete record',
        description: err instanceof ApiError ? err.body : 'Failed to delete record.',
        variant: 'destructive',
      });
      console.error('Failed to delete record', err);
    }
  };

  const togglePublish = async (rec: RecordRow) => {
    const newPublishedState = !rec.isPublished;
    try {
      await publishRecord(rec.id, newPublishedState);
      rec.isPublished = newPublishedState ? 1 : 0;
    } catch (err) {
      if (handleUnauthorized(err)) return;
      console.error('Failed to toggle publish status', err);
    }
  };

  const rerunRecord = async (id: number) => {
    try {
      await rerunProcessing(id);
      const rec = records.value.find((r) => r.id === id);
      if (rec) {
        rec.status = 'processing';
        rec.progress = 0;
        rec.message = 'Rerun requested...';
      }
      void pollProcessingFallback();
    } catch (err) {
      if (handleUnauthorized(err)) return;
      await showAlert({
        title: 'Could not rerun record',
        description: err instanceof ApiError ? err.body : 'Failed to rerun record.',
        variant: 'destructive',
      });
      console.error('Failed to rerun record', err);
    }
  };

  const cancelProcessing = async (id: number) => {
    if (cancelling.value[id]) return;
    cancelling.value = { ...cancelling.value, [id]: true };
    const rec = records.value.find((r) => r.id === id);
    if (rec) rec.message = 'Cancelling…';
    try {
      applyProcessingJob(await cancelRecordProcessing(id));
      void pollProcessingFallback();
    } catch (err) {
      if (handleUnauthorized(err)) return;
      await showAlert({
        title: 'Could not cancel processing',
        description: err instanceof ApiError ? err.body : 'Failed to cancel processing.',
        variant: 'destructive',
      });
      console.error('Failed to cancel processing', err);
    } finally {
      const next = { ...cancelling.value };
      delete next[id];
      cancelling.value = next;
    }
  };

  onMounted(() => {
    fetchRecords();
    void listRecordTypes().then((list) => {
      recordTypes.value = list;
      const def = list.find((t) => t.isDefault) || list[0];
      if (def) createTypeId.value = String(def.id);
    }).catch(() => {});
    setupProgress();
    timer = setInterval(() => { now.value = Date.now(); }, 1000);
    processingPollTimer = setInterval(() => { void pollProcessingFallback(); }, 3000);
  });

  onUnmounted(() => {
    unsubscribeProgress?.();
    if (timer) clearInterval(timer);
    if (processingPollTimer) clearInterval(processingPollTimer);
    clearAutoAnnotatePoll();
  });

  return {
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
    error,
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
  };
}
