import type { RecordAnnotation } from '@rtidb/shared/api/annotations';
import type { AnnotationRtiView } from '@rtidb/shared/api/annotations';

interface ViewerElement extends HTMLElement {
  _pendingAnnotations?: RecordAnnotation[];
}

/** Send commands to the modern-rti-viewer web component. */
export function viewerCommand(
  viewerEl: ViewerElement | null | undefined,
  type: string,
  payload: Record<string, unknown> = {},
): void {
  if (!viewerEl) return;
  viewerEl.dispatchEvent(new CustomEvent('rti-command', {
    detail: { type, ...payload },
    bubbles: false,
  }));
}

export function setViewerAnnotations(
  viewerEl: ViewerElement | null | undefined,
  annotations: RecordAnnotation[] | null | undefined,
): void {
  if (viewerEl) {
    viewerEl._pendingAnnotations = Array.isArray(annotations) ? annotations : [];
  }
  viewerCommand(viewerEl, 'set-annotations', { annotations: annotations || [] });
}

export function restoreViewerView(
  viewerEl: ViewerElement | null | undefined,
  rtiView: AnnotationRtiView,
): void {
  viewerCommand(viewerEl, 'restore-view', { rtiView });
}

export function resizeViewer(viewerEl: ViewerElement | null | undefined): void {
  viewerCommand(viewerEl, 'resize');
}

export function selectViewerAnnotation(
  viewerEl: ViewerElement | null | undefined,
  id: number | null | undefined,
): void {
  viewerCommand(viewerEl, 'select-annotation', { id: id ?? null });
}
