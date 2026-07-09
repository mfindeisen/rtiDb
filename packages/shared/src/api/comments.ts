export interface RecordComment {
  id: number;
  body: string;
  parentId: number | null;
  userId: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentUpdateResponse {
  success: true;
  updatedAt: string;
}

export interface CreateCommentPayload {
  body: string;
  parentId?: number | null;
}
