#!/usr/bin/env node
/**
 * Extract catalog example values from "for dear Matthias .docx".
 * Only the document's Example column is used — never the Purpose column.
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { writeFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DEFAULT_DOCX = join(__dirname, '..', 'for dear Matthias .docx');

const metadataFieldsUrl = (() => {
  for (const p of [
    join(__dirname, '..', 'server', 'lib', 'metadataFields.js'),
    '/app/lib/metadataFields.js',
  ]) {
    if (existsSync(p)) return pathToFileURL(p).href;
  }
  throw new Error('metadataFields.js not found');
})();

const { formatCatalogDate, formatCatalogDateTime } = await import(metadataFieldsUrl);

/** Word table label → metadata key */
const FIELD_MAP = {
  'Primary Registration Number': 'primaryRegistrationNumber',
  'Secondary Registration Number': 'secondaryRegistrationNumber',
  'RTI File Name': 'rtiFileName',
  'Digital Registration Date': 'digitalRegistrationDate',
  'Record Status': 'recordStatus',
  'Physical Storage Location': 'physicalStorageLocation',
  'Discovery Location': 'discoveryLocation',
  'Site/Geographic Location': 'siteGeographicLocation',
  'Layer/Discovery Depth': 'layerDiscoveryDepth',
  'Excavation Date': 'excavationDate',
  'Excavator/Mission': 'excavatorMission',
  'Excavation Report Number': 'excavationReportNumber',
  'Cultural Period': 'culturalPeriod',
  'Absolute Date (Estimated)': 'absoluteDateEstimated',
  'Associated Objects': 'associatedObjects',
  'Object Type': 'objectType',
  'Dimensions (Length)': 'dimensionsLength',
  'Dimensions (Width)': 'dimensionsWidth',
  'Dimensions (Thickness)': 'dimensionsThickness',
  Weight: 'weight',
  Material: 'material',
  'Primary Color': 'primaryColor',
  'Secondary Colors': 'secondaryColors',
  'Conservation Status': 'conservationStatus',
  'Damage Type': 'damageType',
  'Completeness Level': 'completenessLevel',
  'Primary Motif': 'primaryMotif',
  'Secondary Motif': 'secondaryMotif',
  'Number of Figures': 'numberOfFigures',
  'Number of Animals': 'numberOfAnimals',
  'Animal Type': 'animalType',
  'Architectural Elements': 'architecturalElements',
  'Symbolic Elements': 'symbolicElements',
  'Artistic Style': 'artisticStyle',
  'Inscription/Text': 'inscriptionText',
  'Inscription Language': 'inscriptionLanguage',
  'Motif Description': 'motifDescription',
  'Usage Type': 'usageType',
  'Type of Sealed Document': 'typeOfSealedDocument',
  'Textile Impression': 'textileImpression',
  'Rope Impression': 'ropeImpression',
  'Wood/Leather Impression': 'woodLeatherImpression',
  'Number of Seal Impressions': 'numberOfSealImpressions',
  'Probable Owner Name': 'probableOwnerName',
  'Probable Title/Position': 'probableTitlePosition',
  'RTI Format': 'rtiFormat',
  'Resolution (Width)': 'resolutionWidth',
  'Resolution (Height)': 'resolutionHeight',
  'Tile Size': 'metadataTileSize',
  'Number of Coefficients/Layers': 'numberOfCoefficients',
  'File Size': 'fileSize',
  'Number of Image Tiles': 'numberOfImageTiles',
  'Viewer Version': 'viewerVersion',
  Camera: 'camera',
  Lens: 'lens',
  'Light Source': 'lightSource',
  'Number of Captured Images': 'numberOfCapturedImages',
  'Processing Software': 'processingSoftware',
  'Processing Algorithm': 'processingAlgorithm',
  'Imaging Date': 'imagingDate',
  Documenter: 'documenter',
  'Database Designer': 'databaseDesigner',
  'Imaging Location': 'imagingLocation',
  'RTI Quality': 'rtiQuality',
  'Technical Issues': 'technicalIssues',
  'Best Render Mode for This Artifact': 'bestRenderMode',
  'Details Revealed by RTI': 'detailsRevealedByRti',
  'Comparison with Conventional Photography': 'comparisonWithConventionalPhotography',
  'Analytical Notes': 'analyticalNotes',
  'Requires Further Investigation': 'requiresFurtherInvestigation',
  'Published Sources': 'publishedSources',
  'Link to Similar Objects': 'linkToSimilarObjects',
  'Link to External Databases': 'linkToExternalDatabases',
  'Historical Images': 'historicalImages',
  '3D Model': 'model3d',
  'Chemical/Physical Analysis': 'chemicalPhysicalAnalysis',
  'Access Level': 'accessLevel',
  'Usage License': 'usageLicense',
  'Copyright Holder': 'copyrightHolder',
  'Usage Restrictions': 'usageRestrictions',
  'Metadata Author': 'metadataAuthor',
  'Last Edit': 'lastEdit',
  'Edit History': 'editHistory',
};

const OPTION_LIST_FIELDS = new Set([
  'Record Status',
  'Object Type',
  'Material',
  'Conservation Status',
  'Damage Type',
  'Number of Figures',
  'Number of Animals',
  'Artistic Style',
  'Usage Type',
  'Type of Sealed Document',
  'Textile Impression',
  'Rope Impression',
  'Wood/Leather Impression',
  'Number of Seal Impressions',
  'Probable Owner Name',
  'Probable Title/Position',
  'RTI Format',
  'Processing Algorithm',
  'RTI Quality',
  'Technical Issues',
  'Access Level',
]);

function decodeXml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function cellTexts(rowXml) {
  const cells = rowXml.match(/<w:tc[^>]*>[\s\S]*?<\/w:tc>/g) || [];
  return cells.map((cell) => {
    const parts = cell.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
    return decodeXml(parts.map((p) => p.replace(/<[^>]+>/g, '')).join('')).trim();
  });
}

function parseTables(xml) {
  const tables = xml.match(/<w:tbl>[\s\S]*?<\/w:tbl>/g) || [];
  const rows = [];

  for (const table of tables) {
    const trs = table.match(/<w:tr[^>]*>[\s\S]*?<\/w:tr>/g) || [];
    if (!trs.length) continue;
    const header = cellTexts(trs[0]);
    if (header[0] !== 'Field' || !header[1]?.startsWith('Example')) continue;

    for (const tr of trs.slice(1)) {
      const cells = cellTexts(tr);
      if (cells.length < 2) continue;
      const [field, example, purpose] = cells;
      if (!field || field === 'Field') continue;
      rows.push({ field, example: example ?? '', purpose: purpose ?? '' });
    }
  }

  return rows;
}

/** Use only the Example column; never copy Purpose into values. */
export function normalizeExample(field, example) {
  const ex = example.trim();
  if (!ex) return null;
  if (ex === '-') return null;

  const marked = ex.match(/([^,\[\]/]+?)×/);
  if (marked) {
    const picked = marked[1].trim();
    if (field === 'Damage Type') {
      return picked.charAt(0).toUpperCase() + picked.slice(1).toLowerCase();
    }
    return picked;
  }

  if (OPTION_LIST_FIELDS.has(field) && ex.startsWith('[')) {
    return null;
  }

  if (field === 'Record Status') {
    return null;
  }

  if (field === 'Digital Registration Date' || field === 'Imaging Date') {
    return formatCatalogDate(ex);
  }

  if (field === 'Last Edit') {
    return formatCatalogDateTime(ex);
  }

  return ex;
}

/** Values for map/search testing — not in the Word doc Example column. */
export function applyCatalogTestSupplements(metadata) {
  metadata.gpsPosition = '29.9350° N, 52.8916° E'; // Persepolis (Tacht-e Jamshid)
}

export function extractCatalogFromDocx(docxPath = DEFAULT_DOCX) {
  const xml = execSync(`unzip -p ${JSON.stringify(docxPath)} word/document.xml`, {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });

  const metadata = {};
  for (const { field, example } of parseTables(xml)) {
    const key = FIELD_MAP[field];
    if (!key) continue;
    const value = normalizeExample(field, example);
    if (value != null && value !== '') {
      metadata[key] = value;
    }
  }

  const name =
    metadata.primaryRegistrationNumber ||
    metadata.rtiFileName ||
    'catalog-sample';

  const record = {
    name,
    description: metadata.motifDescription || '',
    direction: 'ltr',
  };

  applyCatalogTestSupplements(metadata);

  return { record, metadata };
}

function main() {
  const writeJson = process.argv.includes('--write-json');
  const docxArg = process.argv.find((a) => a.endsWith('.docx'));
  const docxPath = docxArg || DEFAULT_DOCX;
  const payload = extractCatalogFromDocx(docxPath);

  if (writeJson) {
    const outPath = join(__dirname, 'sample-catalog-from-doc.json');
    const body = {
      _comment: 'Auto-extracted from for dear Matthias .docx (Example column only)',
      ...payload,
    };
    writeFileSync(outPath, `${JSON.stringify(body, null, 2)}\n`);
    console.log(`Wrote ${outPath} (${Object.keys(payload.metadata).length} metadata fields)`);
    return;
  }

  console.log(JSON.stringify(payload, null, 2));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
