import type { SerializedRevision } from '../recordRevisions.js';

export interface RevisionListResponse {
  recordId: number;
  currentRevision: number;
  revisions: SerializedRevision[];
}

export interface RevisionCompareResponse {
  from: number;
  to: number | 'current';
  changes: SerializedRevision['changes'];
  changeCount: number;
}
