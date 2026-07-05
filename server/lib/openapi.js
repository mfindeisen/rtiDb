import { SUPPORTED_EXPORT_FORMATS } from './export.js';
import { METADATA_FILTER_ALIASES } from './records.js';
import { ALL_METADATA_KEYS } from './metadataFields.js';

const metadataFilterParams = ALL_METADATA_KEYS.slice(0, 12).map((key) => ({
  name: key,
  in: 'query',
  schema: { type: 'string' },
  description: 'Metadata filter (substring match)',
}));

export function buildOpenApiSpec(req) {
  // Relative URL so Swagger "Try it out" always hits the same origin (works behind nginx on any port).
  const absoluteBase =
    process.env.PUBLIC_BASE_URL?.replace(/\/$/, '')
    || `${req.get('x-forwarded-proto') || req.protocol || 'http'}://${req.get('x-forwarded-host') || req.get('host') || 'localhost:3000'}`;

  return {
    openapi: '3.0.3',
    info: {
      title: 'RTI Database API',
      version: '1.0.0',
      description: [
        'REST API for the RTI scan catalog with rich archaeological metadata.',
        '',
        '**Authentication:** Use `POST /login` with username/password, copy the `token` from the response, then click **Authorize** and paste it (without the `Bearer ` prefix).',
        'If you are already logged in to the web app (`/login`), Swagger picks up the same JWT automatically.',
        '',
        '**Identifiers:** Records use numeric `id`. Catalog registration numbers (e.g. `DEMO-2024-SEAL-001`) work via `/records/lookup/{identifier}`.',
        '',
        '**Metadata filters:** Use real field names (`primaryMotif`, `culturalPeriod`, …) or aliases:',
        Object.entries(METADATA_FILTER_ALIASES).map(([a, f]) => `- \`${a}\` → \`${f}\``).join('\n'),
        '',
        '**Export formats:** ' + SUPPORTED_EXPORT_FORMATS.join(', '),
      ].join('\n'),
      contact: { name: 'RTI Database' },
    },
    servers: [
      { url: '/api', description: 'Current host (recommended for Swagger UI)' },
      { url: `${absoluteBase}/api`, description: 'Absolute base URL' },
    ],
    tags: [
      { name: 'Discovery', description: 'API overview' },
      { name: 'Records', description: 'Public catalog access' },
      { name: 'Search', description: 'Full-text and spatial search' },
      { name: 'Export', description: 'Data export formats' },
      { name: 'Auth', description: 'Authentication' },
      { name: 'Admin', description: 'Authenticated administration (JWT required)' },
    ],
    paths: {
      '/': {
        get: {
          tags: ['Discovery'],
          summary: 'API discovery',
          responses: {
            200: { description: 'Endpoint index and usage notes' },
          },
        },
      },
      '/records': {
        get: {
          tags: ['Records'],
          summary: 'List or filter records',
          description: 'Without filters returns all records. With query parameters uses the same logic as search (paginated). Use `published=1` for public catalog only.',
          parameters: [
            { name: 'published', in: 'query', schema: { type: 'string', enum: ['0', '1'] }, description: '1 = published only (default when filtering)' },
            { name: 'q', in: 'query', schema: { type: 'string' }, description: 'Full-text search' },
            { name: 'filters', in: 'query', schema: { type: 'string' }, description: 'JSON object of metadata filters' },
            { name: 'bbox', in: 'query', schema: { type: 'string' }, description: 'west,south,east,north' },
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } },
            { name: 'primaryMotif', in: 'query', schema: { type: 'string' }, description: 'Alias: iconography, motif' },
            { name: 'culturalPeriod', in: 'query', schema: { type: 'string' }, description: 'Alias: period' },
            ...metadataFilterParams,
          ],
          responses: {
            200: { description: 'Record array or paginated search result' },
          },
        },
        post: {
          tags: ['Admin'],
          summary: 'Create draft catalog record',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    direction: { type: 'string', enum: ['ltr', 'rtl'] },
                    metadata: { type: 'object', additionalProperties: { type: 'string' } },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Created record id' },
            401: { description: 'Unauthorized' },
            403: { description: 'Forbidden' },
          },
        },
      },
      '/records/lookup/{identifier}': {
        get: {
          tags: ['Records'],
          summary: 'Lookup by ID or registration number',
          parameters: [
            { name: 'identifier', in: 'path', required: true, schema: { type: 'string' }, example: 'DEMO-2024-SEAL-001' },
          ],
          responses: {
            200: { description: 'Public record with metadata and links' },
            404: { description: 'Not found' },
          },
        },
      },
      '/records/{id}': {
        get: {
          tags: ['Records'],
          summary: 'Get single record',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { description: 'Full record including metadata' },
            404: { description: 'Not found' },
          },
        },
        put: {
          tags: ['Admin'],
          summary: 'Update record',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    direction: { type: 'string' },
                    metadata: { type: 'object' },
                    isPublished: { type: 'boolean' },
                  },
                },
              },
            },
          },
          responses: { 200: { description: 'Updated' }, 401: { description: 'Unauthorized' } },
        },
        delete: {
          tags: ['Admin'],
          summary: 'Delete record',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Deleted' }, 401: { description: 'Unauthorized' } },
        },
      },
      '/records/{id}/metadata': {
        get: {
          tags: ['Records', 'Export'],
          summary: 'Metadata only (filled fields)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            200: {
              description: 'Metadata JSON',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      name: { type: 'string' },
                      registrationNumber: { type: 'string', nullable: true },
                      metadata: { type: 'object', additionalProperties: { type: 'string' } },
                    },
                  },
                },
              },
            },
            404: { description: 'Not found' },
          },
        },
      },
      '/records/{id}/rti': {
        get: {
          tags: ['Records'],
          summary: 'RTI asset descriptors',
          description: 'Returns URLs for TIFF, tile folder, thumbnail, and viewer. Use `redirect=1` to redirect to the primary asset.',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
            { name: 'redirect', in: 'query', schema: { type: 'string', enum: ['0', '1'] } },
          ],
          responses: {
            200: { description: 'RTI asset JSON' },
            404: { description: 'Not found' },
          },
        },
      },
      '/records/{id}/export': {
        get: {
          tags: ['Export'],
          summary: 'Export single record',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
            { name: 'format', in: 'query', required: true, schema: { type: 'string', enum: SUPPORTED_EXPORT_FORMATS } },
            { name: 'download', in: 'query', schema: { type: 'string', enum: ['0', '1'] }, description: '0 = inline display' },
          ],
          responses: {
            200: { description: 'Exported file' },
            400: { description: 'Invalid format' },
            404: { description: 'Not found' },
          },
        },
      },
      '/export/records': {
        get: {
          tags: ['Export'],
          summary: 'Bulk export (published catalog)',
          parameters: [
            { name: 'format', in: 'query', schema: { type: 'string', enum: ['json', 'xml', 'csv'], default: 'json' } },
            { name: 'published', in: 'query', schema: { type: 'string', enum: ['0', '1'], default: '1' } },
            { name: 'q', in: 'query', schema: { type: 'string' } },
            { name: 'filters', in: 'query', schema: { type: 'string' } },
            { name: 'primaryMotif', in: 'query', schema: { type: 'string' } },
            { name: 'culturalPeriod', in: 'query', schema: { type: 'string' } },
          ],
          responses: { 200: { description: 'Export file' } },
        },
      },
      '/search': {
        get: {
          tags: ['Search'],
          summary: 'Advanced search',
          parameters: [
            { name: 'q', in: 'query', schema: { type: 'string' } },
            { name: 'filters', in: 'query', schema: { type: 'string' }, description: 'JSON metadata filters' },
            { name: 'bbox', in: 'query', schema: { type: 'string' } },
            { name: 'published', in: 'query', schema: { type: 'string', enum: ['0', '1'] } },
            { name: 'page', in: 'query', schema: { type: 'integer' } },
            { name: 'limit', in: 'query', schema: { type: 'integer' } },
          ],
          responses: { 200: { description: 'Paginated search results with GPS enrichment' } },
        },
      },
      '/search/image': {
        post: {
          tags: ['Search'],
          summary: 'Queue image similarity search (CLIP embeddings)',
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    image: { type: 'string', format: 'binary' },
                  },
                },
              },
            },
          },
          parameters: [
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 12 } },
            { name: 'force', in: 'query', schema: { type: 'boolean', default: false }, description: 'Bypass cache and re-run CLIP' },
          ],
          responses: {
            200: { description: 'Cached results (identical image searched before)' },
            202: { description: 'Job queued — poll GET /search/image/jobs/{jobId}' },
            429: { description: 'Rate limit exceeded (10 CLIP searches per hour per user)' },
          },
        },
      },
      '/search/image/jobs/{jobId}': {
        get: {
          tags: ['Search'],
          summary: 'Image search job status',
          parameters: [
            { name: 'jobId', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: { 200: { description: 'queued | processing | done | error' } },
        },
      },
      '/login': {
        post: {
          tags: ['Auth'],
          summary: 'Admin login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['username', 'password'],
                  properties: {
                    username: { type: 'string', example: 'admin' },
                    password: { type: 'string', format: 'password', example: 'admin' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'JWT token',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      token: { type: 'string' },
                    },
                  },
                },
              },
            },
            401: { description: 'Invalid credentials' },
          },
        },
      },
      '/records/{id}/upload': {
        post: {
          tags: ['Admin'],
          summary: 'Upload RTI to existing draft record',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: { type: 'string', format: 'binary', description: 'Standard RTI (.rti, .ptm, .hsh)' },
                    latentMap: { type: 'string', format: 'binary' },
                    weights: { type: 'string', format: 'binary' },
                    uploadMode: { type: 'string', enum: ['standard', 'neural'] },
                    quality: { type: 'integer' },
                    tileSize: { type: 'integer' },
                    format: { type: 'string', enum: ['jpg', 'png', 'webp'] },
                    outputType: { type: 'string', enum: ['geotiff', 'tiles'] },
                  },
                },
              },
            },
          },
          responses: { 200: { description: 'Upload started' }, 401: { description: 'Unauthorized' } },
        },
      },
      '/upload': {
        post: {
          tags: ['Admin'],
          summary: 'Upload RTI and create new record',
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  required: ['name', 'file'],
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    file: { type: 'string', format: 'binary' },
                  },
                },
              },
            },
          },
          responses: { 200: { description: 'Upload started' } },
        },
      },
      '/records/{id}/revisions': {
        get: {
          tags: ['Records'],
          summary: 'List metadata revisions for a record',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Revision list' }, 403: { description: 'Forbidden' } },
        },
      },
      '/records/{id}/revisions/compare': {
        get: {
          tags: ['Records'],
          summary: 'Compare two revisions (or revision vs current)',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'from', in: 'query', required: true, schema: { type: 'integer' } },
            { name: 'to', in: 'query', required: true, schema: { oneOf: [{ type: 'integer' }, { type: 'string', enum: ['current'] }] } },
          ],
          responses: { 200: { description: 'Field-level diff' } },
        },
      },
      '/records/{id}/revisions/{revisionNumber}': {
        get: {
          tags: ['Records'],
          summary: 'Get a single revision with full snapshot',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'revisionNumber', in: 'path', required: true, schema: { type: 'integer' } },
          ],
          responses: { 200: { description: 'Revision detail' } },
        },
      },
      '/records/{id}/publish': {
        put: {
          tags: ['Admin'],
          summary: 'Toggle publish status',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Updated' } },
        },
      },
      '/records/{id}/rerun': {
        post: {
          tags: ['Admin'],
          summary: 'Rerun failed processing',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Processing restarted' } },
        },
      },
      '/users': {
        get: {
          tags: ['Admin'],
          summary: 'List users',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'User list' } },
        },
        post: {
          tags: ['Admin'],
          summary: 'Create user',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Created' } },
        },
      },
      '/users/{id}': {
        put: {
          tags: ['Admin'],
          summary: 'Update user',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Updated' } },
        },
        delete: {
          tags: ['Admin'],
          summary: 'Delete user',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Deleted' } },
        },
      },
      '/progress': {
        get: {
          tags: ['Admin'],
          summary: 'SSE processing progress stream',
          description: 'Server-Sent Events stream for upload/processing progress. Not ideal for Swagger Try-it-out.',
          responses: { 200: { description: 'text/event-stream' } },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Obtain token via POST /login, then paste the JWT here (without "Bearer ").',
        },
      },
    },
  };
}
