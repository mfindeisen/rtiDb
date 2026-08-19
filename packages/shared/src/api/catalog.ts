import type { CatalogSchema } from '../catalogSchema.js';
import type { CatalogView, CatalogViewConfig } from '../catalogViews.js';
import type { SiteConfig } from '../siteConfig.js';

export type { SiteConfig, CatalogSchema, CatalogView, CatalogViewConfig };

export interface RecordType {
  id: number;
  slug: string;
  name: string;
  description: string;
  isDefault: boolean;
  sortOrder: number;
  schema: CatalogSchema;
  recordCount?: number;
}

export interface RecordTypeWritePayload {
  name: string;
  slug?: string;
  description?: string;
  isDefault?: boolean;
  sortOrder?: number;
  schema?: CatalogSchema;
  cloneFromId?: number;
}

export interface CatalogViewWritePayload {
  name: string;
  slug?: string;
  recordTypeId?: number | null;
  isDefault?: boolean;
  isPublic?: boolean;
  config?: CatalogViewConfig;
}
