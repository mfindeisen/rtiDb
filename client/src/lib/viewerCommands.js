/** Send commands to the modern-rti-viewer web component. */
export function viewerCommand(viewerEl, type, payload = {}) {
  if (!viewerEl) return;
  viewerEl.dispatchEvent(new CustomEvent('rti-command', {
    detail: { type, ...payload },
    bubbles: false,
  }));
}

export function setViewerAnnotations(viewerEl, annotations) {
  if (viewerEl) {
    viewerEl._pendingAnnotations = Array.isArray(annotations) ? annotations : [];
  }
  viewerCommand(viewerEl, 'set-annotations', { annotations: annotations || [] });
}

export function restoreViewerView(viewerEl, rtiView) {
  viewerCommand(viewerEl, 'restore-view', { rtiView });
}

export function resizeViewer(viewerEl) {
  viewerCommand(viewerEl, 'resize');
}

export function selectViewerAnnotation(viewerEl, id) {
  viewerCommand(viewerEl, 'select-annotation', { id: id ?? null });
}
