export {
  METADATA_SECTIONS,
  ALL_METADATA_KEYS,
  formatCatalogDate,
  formatCatalogDateTime,
  formatRecordDate,
  formatRecordDateTime,
  getRecordUpdatedAt,
  SEARCH_FILTER_FIELDS,
  dateToIso,
  emptyMetadata,
  normalizeMetadata,
  getFilledMetadata,
  getFieldDef,
  parseGpsPosition,
  googleMapsUrl,
  gpsMapsUrl,
  parseHexColor,
} from '@rtidb/shared/metadataFields';

export type {
  CatalogMetadataKey,
  CatalogMetadata,
  MetadataFieldDef,
  GpsCoordinates,
  StoredMetadata,
  SearchFilterField,
} from '@rtidb/shared/metadataFields';
