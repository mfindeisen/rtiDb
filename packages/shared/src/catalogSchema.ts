/** Runtime catalog field schema stored on record types. */

export const CATALOG_FIELD_TYPES = [
  'text',
  'textarea',
  'select',
  'date',
  'gps',
  'color',
  'url',
] as const;

export type CatalogFieldType = (typeof CATALOG_FIELD_TYPES)[number];

export interface CatalogField {
  key: string;
  label: string;
  type: CatalogFieldType;
  options?: string[];
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  showInSearch?: boolean;
  showInGallery?: boolean;
}

export interface CatalogSection {
  id: string;
  title: string;
  fields: CatalogField[];
}

export type CatalogSchema = CatalogSection[];

export interface CatalogSectionSource {
  id: string;
  title: string;
  fields: ReadonlyArray<{
    key: string;
    label: string;
    type: string;
    options?: readonly string[];
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
  }>;
}

export const FIELD_KEY_RE = /^[a-zA-Z][a-zA-Z0-9_]{0,63}$/;

export function isCatalogFieldType(value: string): value is CatalogFieldType {
  return (CATALOG_FIELD_TYPES as readonly string[]).includes(value);
}

export function slugifyFieldKey(value: string): string {
  const trimmed = String(value || '').trim();
  const camel = trimmed
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((part, index) => {
      const lower = part.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
  const key = camel.replace(/^[0-9]+/, '');
  return FIELD_KEY_RE.test(key) ? key : `field${Date.now().toString(36)}`;
}

export function slugifyCatalogId(value: string): string {
  const slug = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return slug || `item-${Date.now().toString(36)}`;
}

export function buildCatalogSchemaFromSections(
  sections: readonly CatalogSectionSource[],
  searchAndGalleryKeys: readonly string[] = [],
): CatalogSchema {
  const flagged = new Set(searchAndGalleryKeys);
  return sections.map((section) => ({
    id: section.id,
    title: section.title,
    fields: section.fields.map((field) => ({
      key: field.key,
      label: field.label,
      type: isCatalogFieldType(field.type) ? field.type : 'text',
      options: field.options ? [...field.options] : undefined,
      placeholder: field.placeholder,
      readonly: field.readonly,
      required: field.required,
      showInSearch: flagged.has(field.key),
      showInGallery: flagged.has(field.key),
    })),
  }));
}

export function flattenCatalogFields(schema: CatalogSchema | null | undefined): CatalogField[] {
  if (!schema?.length) return [];
  return schema.flatMap((section) => section.fields);
}

export function schemaFieldKeys(schema: CatalogSchema | null | undefined): string[] {
  return flattenCatalogFields(schema).map((field) => field.key);
}

export function schemaFieldMap(schema: CatalogSchema | null | undefined): Map<string, CatalogField> {
  return new Map(flattenCatalogFields(schema).map((field) => [field.key, field]));
}

export function getFieldDefFromSchema(
  schema: CatalogSchema | null | undefined,
  key: string,
): CatalogField | null {
  return schemaFieldMap(schema).get(key) ?? null;
}

export function schemaDateKeys(schema: CatalogSchema | null | undefined): Set<string> {
  const keys = new Set<string>(['digitalRegistrationDate', 'imagingDate']);
  for (const field of flattenCatalogFields(schema)) {
    if (field.type === 'date') keys.add(field.key);
  }
  return keys;
}

export function searchFilterFieldsFromSchema(schema: CatalogSchema | null | undefined): CatalogField[] {
  return flattenCatalogFields(schema).filter((field) => field.showInSearch);
}

export function galleryMetadataFieldsFromSchema(schema: CatalogSchema | null | undefined): CatalogField[] {
  return flattenCatalogFields(schema).filter((field) => field.showInGallery);
}

export function emptyMetadataFromSchema(schema: CatalogSchema | null | undefined): Record<string, string> {
  return Object.fromEntries(schemaFieldKeys(schema).map((key) => [key, '']));
}

export function cloneCatalogSchema(schema: CatalogSchema): CatalogSchema {
  return schema.map((section) => ({
    ...section,
    fields: section.fields.map((field) => ({
      ...field,
      options: field.options ? [...field.options] : undefined,
    })),
  }));
}

export function catalogFieldLabelMap(schema: CatalogSchema | null | undefined): Record<string, string> {
  return Object.fromEntries(flattenCatalogFields(schema).map((field) => [field.key, field.label]));
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const options = value.map((item) => String(item).trim()).filter(Boolean);
  return options.length ? options : undefined;
}

export function parseCatalogField(raw: unknown, fallbackKey: string): CatalogField | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const data = raw as Record<string, unknown>;
  const key = FIELD_KEY_RE.test(String(data.key || '')) ? String(data.key) : slugifyFieldKey(String(data.label || fallbackKey));
  const label = String(data.label || key).trim() || key;
  const type = isCatalogFieldType(String(data.type || '')) ? (data.type as CatalogFieldType) : 'text';
  const field: CatalogField = { key, label, type };
  const options = asStringArray(data.options);
  if (options) field.options = options;
  if (typeof data.placeholder === 'string' && data.placeholder.trim()) field.placeholder = data.placeholder;
  if (data.readonly) field.readonly = true;
  if (data.required) field.required = true;
  if (data.showInSearch) field.showInSearch = true;
  if (data.showInGallery) field.showInGallery = true;
  return field;
}

export function parseCatalogSchema(raw: unknown): CatalogSchema {
  if (!Array.isArray(raw)) return [];
  const usedKeys = new Set<string>();
  const sections: CatalogSchema = [];

  raw.forEach((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return;
    const data = item as Record<string, unknown>;
    const title = String(data.title || `Section ${index + 1}`).trim();
    const id = slugifyCatalogId(String(data.id || title));
    const fieldsRaw = Array.isArray(data.fields) ? data.fields : [];
    const fields: CatalogField[] = [];
    fieldsRaw.forEach((fieldRaw, fieldIndex) => {
      const field = parseCatalogField(fieldRaw, `field${fieldIndex + 1}`);
      if (!field || usedKeys.has(field.key)) return;
      usedKeys.add(field.key);
      fields.push(field);
    });
    sections.push({ id, title, fields });
  });

  return sections;
}

export function unionCatalogSchemas(schemas: CatalogSchema[]): CatalogSchema {
  const seen = new Set<string>();
  const sections: CatalogSchema = [];
  for (const schema of schemas) {
    for (const section of schema) {
      const fields = section.fields.filter((field) => {
        if (seen.has(field.key)) return false;
        seen.add(field.key);
        return true;
      });
      if (!fields.length) continue;
      const existing = sections.find((item) => item.id === section.id);
      if (existing) existing.fields.push(...fields);
      else sections.push({ ...section, fields: [...fields] });
    }
  }
  return sections;
}
