/** JSON metadata blob as stored on records. */
export type StoredMetadata = Record<string, unknown>;

/**
 * Catalog metadata field definitions based on the Persepolis Seal Impression
 * documentation data model (for dear Matthias .docx).
 */
export const METADATA_SECTIONS = [
  {
    id: 'identification',
    title: 'Identification & Cataloging',
    fields: [
      { key: 'primaryRegistrationNumber', label: 'Primary Registration Number', type: 'text', placeholder: 'DEMO-2024-SEAL-001' },
      { key: 'secondaryRegistrationNumber', label: 'Secondary Registration Number', type: 'text', placeholder: 'DEMO-2024-SEAL-001-B' },
      { key: 'rtiFileName', label: 'RTI File Name', type: 'text', placeholder: 'DEMO-2024-SEAL-001' },
      { key: 'digitalRegistrationDate', label: 'Digital Registration Date', type: 'date' },
      {
        key: 'recordStatus',
        label: 'Record Status',
        type: 'select',
        options: ['Unpublished', 'Draft', 'Under Review', 'Published'],
      },
      { key: 'physicalStorageLocation', label: 'Physical Storage Location', type: 'text', placeholder: 'Example City Archaeology Museum, Study Collection Room B' },
    ],
  },
  {
    id: 'archaeological',
    title: 'Archaeological Context',
    fields: [
      { key: 'discoveryLocation', label: 'Discovery Location', type: 'text', placeholder: 'Archaeological context' },
      { key: 'siteGeographicLocation', label: 'Site / Geographic Location', type: 'text' },
      { key: 'gpsPosition', label: 'GPS Position', type: 'gps' },
      { key: 'layerDiscoveryDepth', label: 'Layer / Discovery Depth', type: 'text', placeholder: 'Stratigraphy' },
      { key: 'excavationDate', label: 'Excavation Date', type: 'text', placeholder: '1934' },
      { key: 'excavatorMission', label: 'Excavator / Mission', type: 'text', placeholder: 'Fictional Valley Survey, University of Exampleton' },
      { key: 'discoverySource', label: 'Discovery Source', type: 'text' },
      { key: 'excavationReportNumber', label: 'Excavation Report Number', type: 'text', placeholder: 'Exampleton Survey 1899, p. 42' },
      { key: 'culturalPeriod', label: 'Cultural Period', type: 'text', placeholder: 'Achaemenid' },
      { key: 'absoluteDateEstimated', label: 'Absolute Date (Estimated)', type: 'text' },
      { key: 'associatedObjects', label: 'Associated Objects', type: 'textarea', placeholder: 'Related finds' },
    ],
  },
  {
    id: 'physical',
    title: 'Physical Description',
    fields: [
      {
        key: 'objectType',
        label: 'Object Type',
        type: 'select',
        options: ['Clay sealing', 'Sealing', 'Seal', 'Other'],
      },
      { key: 'dimensionsLength', label: 'Dimensions (Length)', type: 'text', placeholder: '3.0 cm' },
      { key: 'dimensionsWidth', label: 'Dimensions (Width)', type: 'text', placeholder: '2.0 cm' },
      { key: 'dimensionsThickness', label: 'Dimensions (Thickness)', type: 'text', placeholder: '0.8 cm' },
      { key: 'weight', label: 'Weight', type: 'text', placeholder: '12.5 gr' },
      {
        key: 'material',
        label: 'Material',
        type: 'select',
        options: ['Clay', 'Stone', 'Metal', 'Other'],
      },
      { key: 'primaryColor', label: 'Primary Color', type: 'color', placeholder: '#D2691E, reddish brown' },
      { key: 'secondaryColors', label: 'Secondary Colors', type: 'color', placeholder: 'Gray, black' },
      {
        key: 'conservationStatus',
        label: 'Conservation Status',
        type: 'select',
        options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'],
      },
      {
        key: 'damageType',
        label: 'Damage Type',
        type: 'select',
        options: ['Breakage', 'Scratch', 'Erosion', 'Fading', 'Stain', 'None', 'Other'],
      },
      { key: 'completenessLevel', label: 'Completeness Level', type: 'text', placeholder: 'How much of the artifact is intact' },
    ],
  },
  {
    id: 'iconographic',
    title: 'Iconographic Analysis',
    fields: [
      { key: 'primaryMotif', label: 'Primary Motif', type: 'text', placeholder: 'Armed person, animal, ritual scene, Farvahar' },
      { key: 'secondaryMotif', label: 'Secondary Motif', type: 'text', placeholder: 'Helmet, armor, spear, shield' },
      {
        key: 'numberOfFigures',
        label: 'Number of Figures',
        type: 'select',
        options: ['0', '1', '2', '3+'],
      },
      {
        key: 'numberOfAnimals',
        label: 'Number of Animals',
        type: 'select',
        options: ['0', '1', '2+'],
      },
      { key: 'animalType', label: 'Animal Type', type: 'text', placeholder: 'Lion' },
      { key: 'architecturalElements', label: 'Architectural Elements', type: 'text' },
      { key: 'symbolicElements', label: 'Symbolic Elements', type: 'text', placeholder: 'Ahuramazda, zigzag lines' },
      {
        key: 'artisticStyle',
        label: 'Artistic Style',
        type: 'select',
        options: ['Imperial Achaemenid', 'Babylonian', 'Elamite', 'Mixed', 'Other'],
      },
      { key: 'inscriptionText', label: 'Inscription / Text', type: 'textarea' },
      { key: 'inscriptionLanguage', label: 'Inscription Language', type: 'text' },
      { key: 'motifDescription', label: 'Motif Description', type: 'textarea', placeholder: 'Fictional clay sealing showing a stylized griffin beside a palm tree (demo data only)' },
    ],
  },
  {
    id: 'functional',
    title: 'Functional Analysis',
    fields: [
      {
        key: 'usageType',
        label: 'Usage Type',
        type: 'select',
        options: ['Administrative', 'Commercial', 'Ritual', 'Personal', 'Other'],
      },
      {
        key: 'typeOfSealedDocument',
        label: 'Type of Sealed Document',
        type: 'select',
        options: ['Goods package', 'Legal document', 'Letter', 'Vessel', 'Other'],
      },
      {
        key: 'textileImpression',
        label: 'Textile Impression',
        type: 'select',
        options: ['Yes', 'No', 'Unknown'],
      },
      {
        key: 'ropeImpression',
        label: 'Rope Impression',
        type: 'select',
        options: ['Yes', 'No', 'Unknown'],
      },
      {
        key: 'woodLeatherImpression',
        label: 'Wood / Leather Impression',
        type: 'select',
        options: ['Yes', 'No', 'Unknown'],
      },
      {
        key: 'numberOfSealImpressions',
        label: 'Number of Seal Impressions',
        type: 'select',
        options: ['1', '2', 'Multiple'],
      },
      { key: 'probableOwnerName', label: 'Probable Owner Name', type: 'text', placeholder: 'Name read from inscription' },
      {
        key: 'probableTitlePosition',
        label: 'Probable Title / Position',
        type: 'select',
        options: ['Administrative official', 'Military commander', 'Priest', 'Merchant', 'Other'],
      },
    ],
  },
  {
    id: 'rtiTechnical',
    title: 'RTI Technical Metadata',
    fields: [
      {
        key: 'rtiFormat',
        label: 'RTI Format',
        type: 'select',
        options: ['Hemispherical Harmonics (HSH)', 'Polynomial Texture Mapping (PTM)', 'Neural RTI', 'Other'],
      },
      { key: 'resolutionWidth', label: 'Resolution (Width)', type: 'text', placeholder: '4096' },
      { key: 'resolutionHeight', label: 'Resolution (Height)', type: 'text', placeholder: '3072' },
      { key: 'metadataTileSize', label: 'Tile Size', type: 'text', placeholder: '256' },
      { key: 'numberOfCoefficients', label: 'Number of Coefficients / Layers', type: 'text', placeholder: '4' },
      { key: 'fileSize', label: 'File Size', type: 'text', placeholder: '24.75 MB' },
      { key: 'numberOfImageTiles', label: 'Number of Image Tiles', type: 'text', placeholder: '4245' },
      {
        key: 'viewerVersion',
        label: 'Viewer Version',
        type: 'select',
        options: ['Modern (Three.js)', 'Legacy (WebRTIViewer)', 'Both'],
      },
    ],
  },
  {
    id: 'acquisition',
    title: 'Acquisition Protocol',
    fields: [
      { key: 'camera', label: 'Camera', type: 'text', placeholder: 'Nikon D850' },
      { key: 'lens', label: 'Lens', type: 'text', placeholder: 'Nikon 60mm Macro' },
      { key: 'lightSource', label: 'Light Source', type: 'text', placeholder: 'LED Flash 60W' },
      { key: 'numberOfCapturedImages', label: 'Number of Captured Images', type: 'text', placeholder: '36' },
      { key: 'processingSoftware', label: 'Processing Software', type: 'text', placeholder: 'RTIBuilder v2.0.2' },
      {
        key: 'processingAlgorithm',
        label: 'Processing Algorithm',
        type: 'select',
        options: ['HSH Fitter', 'PTM Fitter', 'Neural RTI', 'Other'],
      },
      { key: 'imagingDate', label: 'Imaging Date', type: 'date' },
      { key: 'documenter', label: 'Documenter', type: 'text', placeholder: 'Alex Example - Sam Sample' },
      { key: 'databaseDesigner', label: 'Database Designer', type: 'text', placeholder: 'Demo Developer' },
      { key: 'imagingLocation', label: 'Imaging Location', type: 'text', placeholder: 'Example City Archaeology Museum, Demo Lab' },
    ],
  },
  {
    id: 'quality',
    title: 'Quality Control & Analytical Notes',
    fields: [
      {
        key: 'rtiQuality',
        label: 'RTI Quality',
        type: 'select',
        options: ['Excellent', 'Good', 'Acceptable', 'Poor'],
      },
      { key: 'technicalIssues', label: 'Technical Issues', type: 'textarea', placeholder: 'Hard shadow, noise, disturbing reflection' },
      { key: 'bestRenderMode', label: 'Best Render Mode for This Artifact', type: 'text', placeholder: 'Glossy Mode for scratches' },
      { key: 'detailsRevealedByRti', label: 'Details Revealed by RTI', type: 'textarea', placeholder: 'Important findings' },
      { key: 'comparisonWithConventionalPhotography', label: 'Comparison with Conventional Photography', type: 'textarea', placeholder: 'Grooves were invisible in conventional photography' },
      { key: 'analyticalNotes', label: 'Analytical Notes', type: 'textarea' },
      { key: 'requiresFurtherInvestigation', label: 'Requires Further Investigation', type: 'text', placeholder: 'Yes: Need consultation with Assyriologist' },
    ],
  },
  {
    id: 'references',
    title: 'References & Related Materials',
    fields: [
      { key: 'publishedSources', label: 'Published Sources', type: 'textarea', placeholder: 'Exampleton Survey 1899 (fictional reference)' },
      { key: 'linkToSimilarObjects', label: 'Link to Similar Objects', type: 'text' },
      { key: 'linkToExternalDatabases', label: 'Link to External Databases', type: 'url', placeholder: 'https://example.invalid/demo/external/001' },
      { key: 'historicalImages', label: 'Historical Images', type: 'text', placeholder: 'Example archive plate EC-1899-042' },
      { key: 'model3d', label: '3D Model', type: 'text' },
      { key: 'chemicalPhysicalAnalysis', label: 'Chemical / Physical Analysis', type: 'textarea' },
    ],
  },
  {
    id: 'access',
    title: 'Access Control & Rights',
    fields: [
      {
        key: 'accessLevel',
        label: 'Access Level',
        type: 'select',
        options: ['Public', 'Registered Users', 'Researchers Only', 'Admin Only'],
      },
      { key: 'usageLicense', label: 'Usage License', type: 'text' },
      { key: 'copyrightHolder', label: 'Copyright Holder', type: 'text', placeholder: 'Example City Archaeology Museum (fictional)' },
      { key: 'usageRestrictions', label: 'Usage Restrictions', type: 'textarea' },
      { key: 'metadataAuthor', label: 'Metadata Author', type: 'text', placeholder: 'Demo Developer' },
      { key: 'lastEdit', label: 'Last Edit', type: 'text', readonly: true },
      { key: 'editHistory', label: 'Edit History', type: 'textarea', placeholder: '[2026-06-20: Initial creation] [2026-07-02: Analysis added]' },
    ],
  },
] as const;

export type CatalogMetadataKey = (typeof METADATA_SECTIONS)[number]['fields'][number]['key'];
export type CatalogMetadata = Record<CatalogMetadataKey, string>;
export type MetadataFieldDef = (typeof METADATA_SECTIONS)[number]['fields'][number];

/** Optional field attrs for form/display (not every variant in the union declares them). */
export function metadataFieldPlaceholder(field: MetadataFieldDef): string {
  return 'placeholder' in field ? String(field.placeholder ?? '') : '';
}

export function metadataFieldReadonly(field: MetadataFieldDef): boolean {
  return 'readonly' in field && Boolean(field.readonly);
}

/** Flat list of all metadata field keys */
export const ALL_METADATA_KEYS = METADATA_SECTIONS.flatMap((s) => s.fields.map((f) => f.key)) as CatalogMetadataKey[];

const DATE_METADATA_KEYS = new Set<CatalogMetadataKey>(['digitalRegistrationDate', 'imagingDate']);

interface DateParts {
  month: number;
  day: number;
  year: number;
}

function parseDateParts(value: unknown): DateParts | null {
  const s = String(value).trim();

  const us = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (us) return { month: +us[1], day: +us[2], year: +us[3] };

  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return { year: +iso[1], month: +iso[2], day: +iso[3] };

  const de = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (de) return { day: +de[1], month: +de[2], year: +de[3] };

  return null;
}

/** Format a date as M/D/YYYY (e.g. 7/2/2024), matching the catalog doc. */
export function formatCatalogDate(value: unknown): string {
  if (value == null || value === '') return '';
  const parts = parseDateParts(value);
  if (!parts) return String(value).trim();
  return `${parts.month}/${parts.day}/${parts.year}`;
}

/** Format date-time as M/D/YYYY HH:MM:SS */
export function formatCatalogDateTime(value: unknown): string {
  if (value == null || value === '') return '';
  const s = String(value).trim();

  const isoDt = s.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})/);
  if (isoDt) {
    const [, y, m, d, hh, mm, ss] = isoDt;
    return `${+m!}/${+d!}/${y} ${hh}:${mm}:${ss}`;
  }

  const usDt = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/);
  if (usDt) return s;

  const deDt = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})$/);
  if (deDt) {
    const [, d, m, y, hh, mm, ss] = deDt;
    return `${+m!}/${+d!}/${y} ${hh}:${mm}:${ss}`;
  }

  return formatCatalogDate(s) || s;
}

/** Convert catalog date (M/D/YYYY) to yyyy-mm-dd for HTML date inputs */
export function dateToIso(value: unknown): string {
  const parts = parseDateParts(value);
  if (!parts) return '';
  const m = String(parts.month).padStart(2, '0');
  const d = String(parts.day).padStart(2, '0');
  return `${parts.year}-${m}-${d}`;
}

/** Create an empty metadata object with all keys set to empty string */
export function emptyMetadata(): CatalogMetadata {
  return Object.fromEntries(ALL_METADATA_KEYS.map((k) => [k, ''])) as CatalogMetadata;
}

/** Merge stored metadata with defaults so every key exists */
export function normalizeMetadata(data: StoredMetadata | null | undefined): CatalogMetadata {
  const base = emptyMetadata();
  if (!data || typeof data !== 'object') return base;
  for (const key of ALL_METADATA_KEYS) {
    if (data[key] != null && data[key] !== '') {
      let val = String(data[key]);
      if (DATE_METADATA_KEYS.has(key)) val = formatCatalogDate(val);
      else if (key === 'lastEdit') val = formatCatalogDateTime(val);
      base[key] = val;
    }
  }
  return base;
}

/** Return only non-empty fields for display */
export function getFilledMetadata(data: StoredMetadata | null | undefined): Partial<CatalogMetadata> {
  const normalized = normalizeMetadata(data);
  const filled: Partial<CatalogMetadata> = {};
  for (const [key, value] of Object.entries(normalized)) {
    if (value && value.trim()) filled[key as CatalogMetadataKey] = value.trim();
  }
  return filled;
}

/** Find field definition by key */
export function getFieldDef(key: string): MetadataFieldDef | null {
  for (const section of METADATA_SECTIONS) {
    const field = section.fields.find((f) => f.key === key);
    if (field) return field;
  }
  return null;
}

export interface GpsCoordinates {
  lat: number;
  lng: number;
}

/**
 * Parse common GPS coordinate strings into { lat, lng }.
 * Supports e.g. "29.9350° N, 52.8916° E" or "29.9350, 52.8916".
 */
export function parseGpsPosition(text: unknown): GpsCoordinates | null {
  if (!text || typeof text !== 'string') return null;
  const cleaned = text.trim();

  const simple = cleaned.match(/^(-?\d+(?:\.\d+)?)\s*[,;]\s*(-?\d+(?:\.\d+)?)$/);
  if (simple) {
    const lat = parseFloat(simple[1]);
    const lng = parseFloat(simple[2]);
    if (Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
      return { lat, lng };
    }
  }

  const directed = cleaned.match(
    /(-?\d+(?:\.\d+)?)\s*°?\s*([NnSs])?\s*[,;]\s*(-?\d+(?:\.\d+)?)\s*°?\s*([EeWw])?/,
  );
  if (directed) {
    let lat = parseFloat(directed[1]);
    let lng = parseFloat(directed[3]);
    if (directed[2]?.toUpperCase() === 'S') lat = -Math.abs(lat);
    if (directed[2]?.toUpperCase() === 'N') lat = Math.abs(lat);
    if (directed[4]?.toUpperCase() === 'W') lng = -Math.abs(lng);
    if (directed[4]?.toUpperCase() === 'E') lng = Math.abs(lng);
    if (Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
      return { lat, lng };
    }
  }

  return null;
}

export function googleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function gpsMapsUrl(text: string): string | null {
  const coords = parseGpsPosition(text);
  return coords ? googleMapsUrl(coords.lat, coords.lng) : null;
}

/** Format record timestamps for display (date only) */
export function formatRecordDate(value: unknown): string {
  if (!value) return '';
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return formatCatalogDate(value);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

/** Format record timestamps with time (M/D/YYYY HH:MM:SS) */
export function formatRecordDateTime(value: unknown): string {
  if (!value) return '';
  const d = new Date(String(value));
  if (!Number.isNaN(d.getTime())) {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  return formatCatalogDateTime(value);
}

export function getRecordUpdatedAt(record: { metadata?: Partial<CatalogMetadata> | null } | null | undefined): string {
  const lastEdit = record?.metadata?.lastEdit?.trim();
  return lastEdit ? formatCatalogDateTime(lastEdit) : '';
}

export interface SearchFilterField {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: readonly string[];
}

/** Fields exposed in Advanced Search filter panel */
export const SEARCH_FILTER_FIELDS: SearchFilterField[] = [
  { key: 'primaryMotif', label: 'Primary Motif', type: 'text', placeholder: 'e.g. Armed person' },
  { key: 'secondaryMotif', label: 'Secondary Motif', type: 'text', placeholder: 'e.g. Helmet, spear' },
  { key: 'culturalPeriod', label: 'Cultural Period', type: 'text', placeholder: 'e.g. Achaemenid' },
  { key: 'conservationStatus', label: 'Conservation Status', type: 'select', options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'] },
  { key: 'objectType', label: 'Object Type', type: 'select', options: ['Clay sealing', 'Sealing', 'Seal', 'Other'] },
  { key: 'artisticStyle', label: 'Artistic Style', type: 'select', options: ['Imperial Achaemenid', 'Babylonian', 'Elamite', 'Mixed', 'Other'] },
  { key: 'animalType', label: 'Animal Type', type: 'text', placeholder: 'e.g. Lion' },
  { key: 'siteGeographicLocation', label: 'Site / Location', type: 'text' },
  { key: 'material', label: 'Material', type: 'select', options: ['Clay', 'Stone', 'Metal', 'Other'] },
  { key: 'usageType', label: 'Usage Type', type: 'select', options: ['Administrative', 'Commercial', 'Ritual', 'Personal', 'Other'] },
];

export function parseHexColor(text: unknown): string | null {
  if (!text || typeof text !== 'string') return null;
  const match = text.match(/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})(?![0-9A-Fa-f])/);
  if (!match) return null;
  let hex = match[1]!;
  if (hex.length === 3) {
    hex = hex.split('').map((c) => c + c).join('');
  }
  return `#${hex.toUpperCase()}`;
}
