import type { CatalogMetadata } from '../metadataFields.js';

export interface PublicRecordLinks {
  self: string;
  metadata: string;
  export: string;
  rti: string;
  viewer: string;
  iiif: string;
}

export interface PublicRecordAssets {
  thumbnailUrl: string | null;
  tiffUrl: string | null;
  folderUrl: string | null;
  outputType: string | null;
  ready: boolean;
}

export interface PublicRecord {
  id: number;
  slug: string | null;
  name: string;
  description: string | null;
  date: string;
  status: string;
  direction: string | null;
  isPublished: boolean;
  registrationNumber: string | null;
  metadata: Partial<CatalogMetadata>;
  links: PublicRecordLinks;
  assets: PublicRecordAssets;
}

/** Record row as returned by list/detail API endpoints. */
export interface RecordRow {
  id: number;
  slug: string | null;
  name: string;
  description: string | null;
  date: string;
  status: string;
  progress: number | null;
  message: string | null;
  direction: string | null;
  outputType: string | null;
  folderUrl: string | null;
  tiffUrl: string | null;
  thumbnailUrl: string | null;
  isPublished: number;
  quality: number | null;
  tileSize: number | null;
  format: string | null;
  metadata: CatalogMetadata;
}

export interface RecordDetail extends RecordRow {
  folderSize: number;
  fileCount: number;
  revisionNumber: number;
}

export interface CreateRecordResponse {
  success: true;
  id: number;
  slug: string;
  metadata: CatalogMetadata;
}

export interface SuccessResponse {
  success: true;
}

export interface SuccessWithIdResponse extends SuccessResponse {
  id: number;
}

export interface UpdateMetadataResponse extends SuccessResponse {
  metadata: CatalogMetadata;
}

export interface ProgressEvent {
  id: number;
  progress: number;
  message: string;
}
