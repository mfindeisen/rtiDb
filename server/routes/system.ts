import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import type { Express, RequestHandler } from 'express';
import { buildOpenApiSpec } from '../lib/openapi.js';
import { getBaseUrl } from '../lib/records.js';
import { SUPPORTED_EXPORT_FORMATS } from '../lib/export.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultDocsDir = path.join(__dirname, '../../client/dist/docs');

const SWAGGER_AUTH_BRIDGE = `
(function trySwaggerAuth() {
  var token = localStorage.getItem('adminToken');
  if (!window.ui) {
    setTimeout(trySwaggerAuth, 150);
    return;
  }
  if (!token) return;
  try {
    window.ui.authActions.authorize({
      bearerAuth: {
        name: 'bearerAuth',
        schema: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        value: token,
      },
    });
  } catch (e) {
    console.warn('Swagger auth bridge:', e);
  }
})();
`.trim();

export function registerHealthRoutes(app: Express) {
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });
}

export function registerDocsRoutes(app: Express, sessionAuthMiddleware: RequestHandler) {
  app.get('/api/openapi.json', sessionAuthMiddleware, (req, res) => {
    res.json(buildOpenApiSpec(req));
  });

  app.get('/api/docs/auth-bridge.js', sessionAuthMiddleware, (_req, res) => {
    res.type('application/javascript').send(SWAGGER_AUTH_BRIDGE);
  });

  app.use('/api/docs', sessionAuthMiddleware, swaggerUi.serve, swaggerUi.setup(null, {
    customSiteTitle: 'RTI Database API',
    customCss: '.swagger-ui .topbar { display: none }',
    customJs: '/api/docs/auth-bridge.js',
    swaggerOptions: {
      url: '/api/openapi.json',
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  }));

  const docsDir = process.env.DOCS_DIR || defaultDocsDir;
  if (!fs.existsSync(docsDir)) return;

  app.use('/docs', sessionAuthMiddleware, express.static(docsDir, { index: 'index.html' }));
}

export function registerDiscoveryRoutes(app: Express) {
  app.get('/api', (req, res) => {
    const base = getBaseUrl(req);
    res.json({
      name: 'RTI Database API',
      version: 1,
      documentation: `${base}/docs/`,
      endpoints: {
        openapi: `${base}/api/openapi.json`,
        swaggerUi: `${base}/api/docs`,
        records: {
          list: `GET ${base}/api/records?published=1&primaryMotif=…&culturalPeriod=…`,
          search: `GET ${base}/api/search?q=…&filters={…}`,
          lookup: `GET ${base}/api/records/lookup/{id-or-registration-number}`,
          detail: `GET ${base}/api/records/{id-or-slug}`,
          metadata: `GET ${base}/api/records/{id-or-slug}/metadata`,
          rti: `GET ${base}/api/records/{id-or-slug}/rti`,
          export: `GET ${base}/api/records/{id-or-slug}/export?format=json|xml|csv|bibtex|ris|iiif`,
          revisions: `GET ${base}/api/records/{id-or-slug}/revisions`,
          revisionCompare: `GET ${base}/api/records/{id-or-slug}/revisions/compare?from=1&to=current`,
          bulkExport: `GET ${base}/api/export/records?format=json|xml|csv&published=1`,
        },
        notes: [
          'Record IDs are numeric. Human-readable slugs (from registration number or name) work in URLs and API paths.',
          'Example viewer URL: /record/DEMO-2024-SEAL-001 — numeric /record/42 still works.',
          'Metadata filters use real field names (primaryMotif, culturalPeriod) or aliases (motif, period, iconography).',
          'For complex queries use /api/search with filters JSON and optional bbox.',
        ],
        exportFormats: SUPPORTED_EXPORT_FORMATS,
      },
    });
  });
}
