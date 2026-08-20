import { nextTick, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue';
import { useViewer } from '@/composables/useViewer';
import { createAnnotation, updateAnnotation, deleteAnnotation } from '@/api/annotations';
import { updateScaleCalibration } from '@/api/records';
import { setViewerAnnotations, setViewerAnnotationOverlaysVisible, selectViewerAnnotation, setViewerScale } from '@/lib/viewerCommands';
import { DEFAULT_ANNOTATION_COLOR } from '@/lib/annotationColors';
import { confirmAction, showAlert } from '@/composables/useConfirmDialog';
import type { RecordAnnotation } from '@rtidb/shared/api/annotations';
import type { RecordDetail } from '@rtidb/shared/api/records';

type AnnotationsPanel = {
  annotations?: RecordAnnotation[];
  loading?: boolean;
  overlaysVisible?: boolean;
  refresh?: () => Promise<void> | void;
  revealOverlays?: () => void;
};

function eventDetail(event: unknown): Record<string, unknown> {
  if (event && typeof event === 'object' && 'detail' in event) {
    return ((event as { detail?: Record<string, unknown> }).detail ?? event) as Record<string, unknown>;
  }
  return (event ?? {}) as Record<string, unknown>;
}

export function useRecordAnnotations(options: {
  record: { value: RecordDetail | null };
  viewerRef: ComputedRef<HTMLElement | null | undefined> | Ref<HTMLElement | null | undefined>;
  annotationsPanelRef: ComputedRef<AnnotationsPanel | null | undefined> | Ref<AnnotationsPanel | null | undefined>;
  canEditScale: ComputedRef<boolean> | Ref<boolean>;
  canAnnotateViewer: ComputedRef<boolean> | Ref<boolean>;
  viewerActive: ComputedRef<boolean> | Ref<boolean>;
  showModernViewer: ComputedRef<boolean> | Ref<boolean>;
  viewerMode: Ref<string> | ComputedRef<string>;
}) {
  const pendingAnnotation = ref<Record<string, unknown> | null>(null);
  const editingAnnotation = ref<RecordAnnotation | null>(null);
  const annotationDialogMode = ref<'create' | 'edit'>('create');
  const annotationNoteOpen = ref(false);
  const annotationSaving = ref(false);
  const annotationDeleting = ref(false);

  const syncViewerAnnotations = async () => {
    await nextTick();
    const panel = options.annotationsPanelRef.value;
    const el = options.viewerRef.value;
    if (!panel || !el) return;
    const list = panel.annotations || [];
    if (!list.length && panel.loading) return;
    setViewerAnnotations(el, list);
    setViewerAnnotationOverlaysVisible(el, panel.overlaysVisible !== false);
  };

  const { showGuide, toggleGuide: toggleGuidePanel, triggerResize, onRtiLoaded, jumpToAnnotation } = useViewer({
    viewerRef: options.viewerRef as Ref<HTMLElement | null | undefined>,
    active: options.viewerActive,
    onSyncAnnotations: syncViewerAnnotations,
  });

  const getViewerElement = () => options.viewerRef.value ?? null;

  const applyRecordScale = () => {
    const el = getViewerElement();
    if (!el) return;
    setViewerScale(el, options.record.value?.scaleCalibration ?? null);
  };

  const onViewerLoaded = async () => {
    await onRtiLoaded();
    applyRecordScale();
  };

  const onScaleChange = async (event: unknown) => {
    const detail = eventDetail(event);
    const record = options.record.value;
    if (!record || !options.canEditScale.value) return;
    const key = record.slug || record.id;
    try {
      const data = await updateScaleCalibration(key, detail as never);
      options.record.value = { ...record, scaleCalibration: data.scaleCalibration };
    } catch (err) {
      console.error(err);
      await showAlert({
        title: 'Could not save scale',
        description: err instanceof Error ? err.message : 'Could not save the image scale',
        variant: 'destructive',
      });
    }
  };

  const onJumpToAnnotation = (ann: RecordAnnotation) => {
    jumpToAnnotation(ann);
  };

  const onAnnotationCreate = (event: unknown) => {
    const detail = eventDetail(event);
    if (!options.record.value || !detail?.type || !detail?.geometry || !detail?.rtiView) return;
    editingAnnotation.value = null;
    annotationDialogMode.value = 'create';
    pendingAnnotation.value = detail;
    annotationNoteOpen.value = true;
  };

  const openAnnotationEdit = (ann: RecordAnnotation | null | undefined) => {
    if (!ann?.id) return;
    pendingAnnotation.value = null;
    editingAnnotation.value = ann;
    annotationDialogMode.value = 'edit';
    annotationNoteOpen.value = true;
    selectViewerAnnotation(getViewerElement(), ann.id);
  };

  const onAnnotationClick = (event: unknown) => {
    openAnnotationEdit(eventDetail(event) as unknown as RecordAnnotation);
  };

  const onAnnotationUpdate = async (event: unknown) => {
    const detail = eventDetail(event);
    const record = options.record.value;
    if (!record || detail?.id == null || !detail?.geometry) return;
    const key = record.slug || record.id;
    try {
      await updateAnnotation(key, Number(detail.id), { geometry: detail.geometry as never });
      await options.annotationsPanelRef.value?.refresh?.();
    } catch (err) {
      console.error(err);
      await showAlert({
        title: 'Could not update annotation',
        description: err instanceof Error ? err.message : 'Could not update annotation',
        variant: 'destructive',
      });
    }
  };

  const closeAnnotationDialog = () => {
    annotationNoteOpen.value = false;
    pendingAnnotation.value = null;
    editingAnnotation.value = null;
    annotationDialogMode.value = 'create';
    selectViewerAnnotation(getViewerElement(), null);
  };

  const saveAnnotationDialog = async ({
    label,
    color,
    strokeWidth,
    visibility,
  }: {
    label?: string;
    color?: string;
    strokeWidth?: number;
    visibility?: string;
  }) => {
    const record = options.record.value;
    if (!record) return;
    const key = record.slug || record.id;
    annotationSaving.value = true;
    try {
      if (annotationDialogMode.value === 'edit' && editingAnnotation.value) {
        await updateAnnotation(key, editingAnnotation.value.id, {
          label: label || null,
          color,
          strokeWidth,
          visibility: visibility as never,
        });
      } else if (pendingAnnotation.value) {
        const payload = {
          ...pendingAnnotation.value,
          color: color || pendingAnnotation.value.color || DEFAULT_ANNOTATION_COLOR,
          strokeWidth: strokeWidth || pendingAnnotation.value.strokeWidth,
          visibility: visibility || 'private',
          ...(label ? { label } : {}),
        };
        await createAnnotation(key, payload as never);
      }
      closeAnnotationDialog();
      options.annotationsPanelRef.value?.revealOverlays?.();
      await options.annotationsPanelRef.value?.refresh?.();
      syncViewerAnnotations();
    } catch (err) {
      console.error(err);
      await showAlert({
        title: 'Could not save annotation',
        description: err instanceof Error ? err.message : 'Could not save annotation',
        variant: 'destructive',
      });
    } finally {
      annotationSaving.value = false;
    }
  };

  const deleteAnnotationDialog = async () => {
    const record = options.record.value;
    if (!record || !editingAnnotation.value) return;
    const ok = await confirmAction({
      title: 'Delete this annotation?',
      description: 'This mark and its note will be removed from the image.',
      confirmLabel: 'Delete',
    });
    if (!ok) return;
    const key = record.slug || record.id;
    const annotationId = editingAnnotation.value.id;
    closeAnnotationDialog();
    try {
      await deleteAnnotation(key, annotationId);
      await options.annotationsPanelRef.value?.refresh?.();
      syncViewerAnnotations();
    } catch (err) {
      console.error(err);
      await options.annotationsPanelRef.value?.refresh?.();
      syncViewerAnnotations();
      await showAlert({
        title: 'Could not delete annotation',
        description: err instanceof Error ? err.message : 'Could not delete annotation',
        variant: 'destructive',
      });
    }
  };

  const toggleGuide = () => {
    toggleGuidePanel();
    localStorage.setItem('showGuide', showGuide.value.toString());
  };

  onMounted(() => {
    if (localStorage.getItem('showGuide') === 'true') {
      showGuide.value = true;
    }
  });

  watch(options.canAnnotateViewer, (enabled) => {
    if (enabled) {
      nextTick(() => {
        options.annotationsPanelRef.value?.refresh?.();
        syncViewerAnnotations();
      });
    }
  });

  watch(() => options.record.value?.scaleCalibration, () => {
    nextTick(applyRecordScale);
  });

  watch(options.viewerMode, () => {
    if (options.showModernViewer.value) {
      nextTick(syncViewerAnnotations);
    }
  });

  return {
    showGuide,
    pendingAnnotation,
    editingAnnotation,
    annotationDialogMode,
    annotationNoteOpen,
    annotationSaving,
    annotationDeleting,
    syncViewerAnnotations,
    triggerResize,
    onViewerLoaded,
    onScaleChange,
    onJumpToAnnotation,
    onAnnotationCreate,
    openAnnotationEdit,
    onAnnotationClick,
    onAnnotationUpdate,
    closeAnnotationDialog,
    saveAnnotationDialog,
    deleteAnnotationDialog,
    toggleGuide,
  };
}
