import type {
  CreateAnnotationPayload,
  RecordAnnotation,
  UpdateAnnotationPayload,
  AnnotationUpdateResponse,
} from '@rtidb/shared/api/annotations';
import type { SuccessResponse } from '@rtidb/shared/api/records';
import { request } from './client';

export async function listAnnotations(recordId: number | string): Promise<RecordAnnotation[]> {
  return request<RecordAnnotation[]>(`/api/records/${recordId}/annotations`);
}

export async function createAnnotation(
  recordId: number | string,
  payload: CreateAnnotationPayload,
): Promise<RecordAnnotation> {
  return request<RecordAnnotation>(`/api/records/${recordId}/annotations`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateAnnotation(
  recordId: number | string,
  annotationId: number,
  payload: UpdateAnnotationPayload,
): Promise<AnnotationUpdateResponse> {
  return request<AnnotationUpdateResponse>(`/api/records/${recordId}/annotations/${annotationId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteAnnotation(recordId: number | string, annotationId: number): Promise<SuccessResponse> {
  return request<SuccessResponse>(`/api/records/${recordId}/annotations/${annotationId}`, {
    method: 'DELETE',
  });
}
