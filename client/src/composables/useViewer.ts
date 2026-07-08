import { nextTick, onBeforeUnmount, ref, watch, type Ref } from 'vue';
import {
  setViewerAnnotations,
  restoreViewerView,
  selectViewerAnnotation,
  resizeViewer,
} from '@/lib/viewerCommands';
import type { RecordAnnotation, AnnotationRtiView } from '@rtidb/shared/api/annotations';

interface ViewerElement extends HTMLElement {
  _pendingAnnotations?: RecordAnnotation[];
}

export function useViewer(options: {
  viewerRef: Ref<ViewerElement | null | undefined>;
  active: Ref<boolean>;
  onSyncAnnotations?: () => Promise<void> | void;
}) {
  const showGuide = ref(false);
  let resizeObserver: ResizeObserver | null = null;

  const triggerResize = () => {
    nextTick(() => {
      const el = options.viewerRef.value;
      if (el) {
        resizeViewer(el);
      } else {
        window.dispatchEvent(new Event('resize'));
      }
    });
  };

  const attachResizeObserver = (el: ViewerElement | null | undefined) => {
    resizeObserver?.disconnect();
    if (!el) return;
    resizeObserver = new ResizeObserver(() => {
      if (options.active.value) {
        triggerResize();
      }
    });
    resizeObserver.observe(el);
  };

  watch(options.viewerRef, (el) => {
    attachResizeObserver(el);
  });

  watch(options.active, (isActive) => {
    if (isActive) triggerResize();
  });

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
  });

  return {
    showGuide,
    toggleGuide: () => { showGuide.value = !showGuide.value; },
    triggerResize,
    syncAnnotations: async () => {
      await options.onSyncAnnotations?.();
    },
    jumpToAnnotation: (ann: { rtiView?: AnnotationRtiView } | null | undefined) => {
      const el = options.viewerRef.value;
      if (el && ann?.rtiView) {
        restoreViewerView(el, ann.rtiView);
      }
    },
    selectAnnotation: (annotationId: number | null) => {
      selectViewerAnnotation(options.viewerRef.value, annotationId);
    },
    applyAnnotations: (annotations: RecordAnnotation[]) => {
      const el = options.viewerRef.value;
      if (el) setViewerAnnotations(el, annotations);
    },
    onRtiLoaded: async () => {
      await options.onSyncAnnotations?.();
    },
  };
}

export function useGoBack() {
  return () => {
    if (window.history.length > 1 && window.history.state?.back) {
      window.history.back();
    }
  };
}
