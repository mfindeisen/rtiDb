import type { RecordComment, CommentUpdateResponse, CreateCommentPayload } from '@rtidb/shared/api/comments';
import type { SuccessResponse } from '@rtidb/shared/api/records';
import { request } from './client';

export async function listComments(recordId: number | string): Promise<RecordComment[]> {
  return request<RecordComment[]>(`/api/records/${recordId}/comments`);
}

export async function createComment(
  recordId: number | string,
  payload: CreateCommentPayload,
): Promise<RecordComment> {
  return request<RecordComment>(`/api/records/${recordId}/comments`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateComment(
  recordId: number | string,
  commentId: number,
  body: string,
): Promise<CommentUpdateResponse> {
  return request<CommentUpdateResponse>(`/api/records/${recordId}/comments/${commentId}`, {
    method: 'PUT',
    body: JSON.stringify({ body }),
  });
}

export async function deleteComment(
  recordId: number | string,
  commentId: number,
): Promise<SuccessResponse> {
  return request<SuccessResponse>(`/api/records/${recordId}/comments/${commentId}`, {
    method: 'DELETE',
  });
}
