export interface RecordNote {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteUpdateResponse {
  success: true;
  updatedAt: string;
}
