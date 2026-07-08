import type { RecordNote, NoteUpdateResponse } from '@rtidb/shared/api/notes';
import type { SuccessResponse } from '@rtidb/shared/api/records';
import { request } from './client';

export async function listNotes(recordId: number | string): Promise<RecordNote[]> {
  return request<RecordNote[]>(`/api/records/${recordId}/notes`);
}

export async function createNote(recordId: number | string, body: string): Promise<RecordNote> {
  return request<RecordNote>(`/api/records/${recordId}/notes`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  });
}

export async function updateNote(
  recordId: number | string,
  noteId: number,
  body: string,
): Promise<NoteUpdateResponse> {
  return request<NoteUpdateResponse>(`/api/records/${recordId}/notes/${noteId}`, {
    method: 'PUT',
    body: JSON.stringify({ body }),
  });
}

export async function deleteNote(recordId: number | string, noteId: number): Promise<SuccessResponse> {
  return request<SuccessResponse>(`/api/records/${recordId}/notes/${noteId}`, {
    method: 'DELETE',
  });
}
