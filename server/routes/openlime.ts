import type { Express, Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import type { ServerContext } from '../types/index.js';
import {
  buildDeepZoomXml,
  convertToOpenLimeInfo,
  deepZoomTileToNodeId,
  readRtiDescriptor,
  tileFilePath,
} from '../lib/openlimeAdapter.js';

function param(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

export function registerOpenLimeRoutes(app: Express, ctx: ServerContext): void {
  app.get('/api/openlime/:folder/info.json', async (req: Request, res: Response) => {
    try {
      const folder = param(req.params.folder);
      const folderPath = path.join(ctx.uploadDir, folder);
      const descriptor = await readRtiDescriptor(folderPath);
      res.json(convertToOpenLimeInfo(descriptor));
    } catch (err) {
      console.error('OpenLIME info.json error:', err);
      res.status(404).json({ error: 'RTI folder not found or info.json missing' });
    }
  });

  app.get('/api/openlime/:folder/:planeFile', async (req: Request, res: Response) => {
    const planeFile = param(req.params.planeFile);
    const dziMatch = planeFile.match(/^plane_(\d+)\.dzi$/);
    if (!dziMatch) {
      res.status(404).send('Not found');
      return;
    }

    try {
      const folder = param(req.params.folder);
      const folderPath = path.join(ctx.uploadDir, folder);
      const descriptor = await readRtiDescriptor(folderPath);
      const content = descriptor.content ?? {};
      const tileSize = descriptor.tree?.tileSize ?? 256;
      const format = descriptor.format ?? 'jpg';
      const xml = buildDeepZoomXml(content.width ?? 0, content.height ?? 0, tileSize, format);
      res.type('application/xml').send(xml);
    } catch (err) {
      console.error('OpenLIME .dzi error:', err);
      res.status(404).send('Not found');
    }
  });

  app.get('/api/openlime/:folder/:planeDir/:level/:coords', async (req: Request, res: Response) => {
    const planeDir = param(req.params.planeDir);
    const filesMatch = planeDir.match(/^plane_(\d+)_files$/);
    if (!filesMatch) {
      res.status(404).send('Not found');
      return;
    }

    try {
      const folder = param(req.params.folder);
      const folderPath = path.join(ctx.uploadDir, folder);
      const descriptor = await readRtiDescriptor(folderPath);
      const format = descriptor.format ?? 'jpg';
      const plane = parseInt(filesMatch[1], 10);
      const level = parseInt(param(req.params.level), 10);
      const coords = param(req.params.coords);
      const [xStr, yStr] = coords.split('_');
      const x = parseInt(xStr, 10);
      const y = parseInt(yStr.split('.')[0], 10);

      const nodeId = deepZoomTileToNodeId(level, x, y, descriptor);

      if (!nodeId) {
        res.status(404).send('Tile not found');
        return;
      }

      const filePath = tileFilePath(folderPath, nodeId, plane, format);
      await fs.access(filePath);
      res.sendFile(filePath);
    } catch (err) {
      console.error('OpenLIME tile error:', err);
      res.status(404).send('Tile not found');
    }
  });
}
