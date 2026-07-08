import type { RevisionCompareResponse, RevisionListResponse } from '@rtidb/shared/api/revisions';
import type { SerializedRevision } from '@rtidb/shared/recordRevisions';
import { request } from './client';

export async function listRevisions(recordId: number | string): Promise<RevisionListResponse> {
  return request<RevisionListResponse>(`/api/records/${recordId}/revisions`);
}

export async function compareRevisions(
  recordId: number | string,
  from: number,
  to: number | 'current',
): Promise<RevisionCompareResponse> {
  const toParam = to === 'current' ? 'current' : String(to);
  return request<RevisionCompareResponse>(
    `/api/records/${recordId}/revisions/compare?from=${from}&to=${toParam}`,
  );
}

export async function getRevision(
  recordId: number | string,
  revisionNumber: number,
): Promise<SerializedRevision> {
  return request<SerializedRevision>(`/api/records/${recordId}/revisions/${revisionNumber}`);
}
