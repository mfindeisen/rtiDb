import { ALL_METADATA_KEYS, getFilledMetadata, normalizeMetadata } from './metadataFields.js';
import {
  buildPublicRecord,
  buildRtiAssets,
  getBaseUrl,
  recordCitationKey,
  recordCitationTitle,
  recordGps,
} from './records.js';

function escapeXml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeBibtex(str) {
  return String(str ?? '').replace(/[{}\\]/g, '');
}

function csvEscape(value) {
  const s = String(value ?? '');
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function exportRecordsJson(records, req) {
  return records.map((r) => buildPublicRecord(r, req));
}

export function exportRecordsXml(records, req) {
  const items = records
    .map((r) => {
      const pub = buildPublicRecord(r, req);
      const metaEntries = Object.entries(pub.metadata)
        .map(([k, v]) => `      <field key="${escapeXml(k)}">${escapeXml(v)}</field>`)
        .join('\n');
      return `  <record id="${pub.id}">
    <name>${escapeXml(pub.name)}</name>
    <description>${escapeXml(pub.description)}</description>
    <date>${escapeXml(pub.date)}</date>
    <status>${escapeXml(pub.status)}</status>
    <registrationNumber>${escapeXml(pub.registrationNumber || '')}</registrationNumber>
    <metadata>
${metaEntries}
    </metadata>
    <links>
      <self>${escapeXml(pub.links.self)}</self>
      <viewer>${escapeXml(pub.links.viewer)}</viewer>
      <rti>${escapeXml(pub.links.rti)}</rti>
    </links>
  </record>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rtiCatalog exportedAt="${new Date().toISOString()}">\n${items}\n</rtiCatalog>`;
}

export function exportRecordsCsv(records) {
  const columns = [
    'id',
    'name',
    'description',
    'date',
    'status',
    'isPublished',
    'registrationNumber',
    ...ALL_METADATA_KEYS,
  ];

  const header = columns.map(csvEscape).join(',');
  const rows = records.map((r) => {
    const meta = normalizeMetadata(r.metadata);
    const reg = meta.primaryRegistrationNumber || meta.rtiFileName || '';
    const values = [
      r.id,
      r.name,
      r.description,
      r.date,
      r.status,
      r.isPublished === 1 ? 'yes' : 'no',
      reg,
      ...ALL_METADATA_KEYS.map((k) => meta[k] || ''),
    ];
    return values.map(csvEscape).join(',');
  });

  // UTF-8 BOM helps Excel open UTF-8 correctly
  return `\uFEFF${header}\n${rows.join('\n')}`;
}

export function exportRecordBibtex(record, req) {
  const pub = buildPublicRecord(record, req);
  const meta = pub.metadata;
  const key = recordCitationKey(record);
  const title = recordCitationTitle(record);
  const year = (pub.date || '').slice(0, 4) || new Date().getFullYear();
  const lines = [
    `@misc{${key},`,
    `  title = {${escapeBibtex(title)}},`,
    `  author = {${escapeBibtex(meta.metadataAuthor || meta.documenter || 'RTI Database')}},`,
    `  year = {${year}},`,
    `  howpublished = {RTI Database},`,
    `  note = {Reflectance Transformation Imaging catalog record. Registration: ${escapeBibtex(pub.registrationNumber || pub.id)}},`,
    `  url = {${pub.links.viewer}},`,
  ];
  if (meta.publishedSources) lines.push(`  annote = {${escapeBibtex(meta.publishedSources)}},`);
  if (meta.culturalPeriod) lines.push(`  keywords = {${escapeBibtex(meta.culturalPeriod)}},`);
  lines.push('}');
  return lines.join('\n');
}

export function exportRecordRis(record, req) {
  const pub = buildPublicRecord(record, req);
  const meta = pub.metadata;
  const lines = [
    'TY  - GEN',
    `TI  - ${recordCitationTitle(record)}`,
    `AU  - ${meta.metadataAuthor || meta.documenter || 'RTI Database'}`,
    `PY  - ${(pub.date || '').slice(0, 4)}`,
    `N1  - RTI catalog record ${pub.registrationNumber || pub.id}`,
    `UR  - ${pub.links.viewer}`,
  ];
  if (meta.siteGeographicLocation) lines.push(`C1  - ${meta.siteGeographicLocation}`);
  if (meta.culturalPeriod) lines.push(`KW  - ${meta.culturalPeriod}`);
  if (meta.primaryMotif) lines.push(`KW  - ${meta.primaryMotif}`);
  if (meta.publishedSources) lines.push(`N2  - ${meta.publishedSources}`);
  lines.push('ER  - ');
  return lines.join('\n');
}

export function exportRecordIiifManifest(record, req) {
  const baseUrl = getBaseUrl(req);
  const pub = buildPublicRecord(record, req);
  const assets = buildRtiAssets(record, baseUrl);
  const meta = pub.metadata;
  const manifestId = `${baseUrl}/api/records/${record.id}/export?format=iiif`;
  const label = pub.name;

  const thumbnail = assets.thumbnailUrl
    ? [{ id: assets.thumbnailUrl, type: 'Image', format: 'image/jpeg' }]
    : [];

  const canvasItems = [];
  if (assets.thumbnailUrl) {
    canvasItems.push({
      id: `${manifestId}/canvas/1/annotation/1`,
      type: 'Annotation',
      motivation: 'painting',
      body: {
        id: assets.thumbnailUrl,
        type: 'Image',
        format: 'image/jpeg',
        label: { en: ['Thumbnail'] },
      },
      target: `${manifestId}/canvas/1`,
    });
  }

  const metadataPairs = Object.entries(meta).slice(0, 20).map(([k, v]) => ({
    label: { en: [k] },
    value: { en: [v] },
  }));

  const manifest = {
    '@context': 'http://iiif.io/api/presentation/3/context.json',
    id: manifestId,
    type: 'Manifest',
    label: { en: [label] },
    metadata: metadataPairs,
    thumbnail,
    homepage: [{ id: pub.links.viewer, type: 'Text', label: { en: ['Open in RTI Database viewer'] } }],
    seeAlso: [
      { id: pub.links.metadata, type: 'Dataset', format: 'application/json', label: { en: ['Catalog metadata (JSON)'] } },
    ],
    items: [
      {
        id: `${manifestId}/canvas/1`,
        type: 'Canvas',
        label: { en: [label] },
        height: Number(meta.resolutionHeight) || 2000,
        width: Number(meta.resolutionWidth) || 2000,
        items: canvasItems,
      },
    ],
  };

  const gps = recordGps(record);
  if (gps) {
    manifest.items[0].metadata = [
      {
        label: { en: ['GPS'] },
        value: { en: [`${gps.lat}, ${gps.lng}`] },
      },
    ];
  }

  if (assets.tiffUrl || assets.folderUrl) {
    manifest.seeAlso.push({
      id: pub.links.rti,
      type: 'Dataset',
      format: 'application/json',
      label: { en: ['RTI asset descriptors'] },
    });
  }

  return manifest;
}

export function getExportContent(records, format, req) {
  const list = Array.isArray(records) ? records : [records];
  const single = list.length === 1 ? list[0] : null;

  switch (format) {
    case 'json':
      return {
        contentType: 'application/json; charset=utf-8',
        body: JSON.stringify(single ? buildPublicRecord(single, req) : exportRecordsJson(list, req), null, 2),
        filename: single ? `record-${single.id}.json` : 'rti-records.json',
      };
    case 'xml':
      return {
        contentType: 'application/xml; charset=utf-8',
        body: exportRecordsXml(list, req),
        filename: single ? `record-${single.id}.xml` : 'rti-records.xml',
      };
    case 'csv':
      return {
        contentType: 'text/csv; charset=utf-8',
        body: exportRecordsCsv(list),
        filename: single ? `record-${single.id}.csv` : 'rti-records.csv',
      };
    case 'bibtex':
      if (!single) throw new Error('BibTeX export supports one record at a time');
      return {
        contentType: 'application/x-bibtex; charset=utf-8',
        body: exportRecordBibtex(single, req),
        filename: `${recordCitationKey(single)}.bib`,
      };
    case 'ris':
      if (!single) throw new Error('RIS export supports one record at a time');
      return {
        contentType: 'application/x-research-info-systems; charset=utf-8',
        body: exportRecordRis(single, req),
        filename: `${recordCitationKey(single)}.ris`,
      };
    case 'iiif':
      if (!single) throw new Error('IIIF manifest export supports one record at a time');
      return {
        contentType: 'application/ld+json; charset=utf-8',
        body: JSON.stringify(exportRecordIiifManifest(single, req), null, 2),
        filename: `record-${single.id}-manifest.json`,
      };
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

export const SUPPORTED_EXPORT_FORMATS = ['json', 'xml', 'csv', 'bibtex', 'ris', 'iiif'];

export function metadataOnlyPayload(record) {
  const normalized = normalizeMetadata(record.metadata);
  return {
    id: record.id,
    slug: record.slug || null,
    name: record.name,
    registrationNumber: normalized.primaryRegistrationNumber || normalized.rtiFileName || null,
    metadata: getFilledMetadata(normalized),
  };
}
