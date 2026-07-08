import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ServerConfig {
  nodeEnv: string;
  isProduction: boolean;
  port: number;
  dataDir: string;
  jwtSecret: string;
  adminUsername: string;
  adminPassword: string;
  publicBaseUrl: string | null;
  transformersCache: string;
  autoAnnotateEnabled: boolean;
  autoAnnotateModel: string;
  autoAnnotateThreshold: number;
  imageSearchRateLimit: number;
  imageSearchRateWindowMs: number;
}

function requireInProduction(value: string | undefined, name: string, isProduction: boolean, devDefault: string): string {
  if (value) return value;
  if (isProduction) {
    throw new Error(`${name} must be set in production`);
  }
  return devDefault;
}

export function loadConfig(): ServerConfig {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const isProduction = nodeEnv === 'production';
  const dataDir = process.env.DATA_DIR || path.join(__dirname, 'data');

  return {
    nodeEnv,
    isProduction,
    port: Number(process.env.PORT) || 3000,
    dataDir,
    jwtSecret: requireInProduction(
      process.env.JWT_SECRET,
      'JWT_SECRET',
      isProduction,
      'fallback_secret_key_change_in_production',
    ),
    adminUsername: process.env.ADMIN_USERNAME || 'admin',
    adminPassword: requireInProduction(
      process.env.ADMIN_PASSWORD,
      'ADMIN_PASSWORD',
      isProduction,
      'admin',
    ),
    publicBaseUrl: process.env.PUBLIC_BASE_URL?.replace(/\/$/, '') || null,
    transformersCache: process.env.TRANSFORMERS_CACHE || path.join(dataDir, 'transformers-cache'),
    autoAnnotateEnabled: process.env.AUTO_ANNOTATE_ENABLED !== '0',
    autoAnnotateModel: process.env.AUTO_ANNOTATE_MODEL || 'Xenova/owlvit-base-patch32',
    autoAnnotateThreshold: Number(process.env.AUTO_ANNOTATE_THRESHOLD) || 0.08,
    imageSearchRateLimit: Number(process.env.IMAGE_SEARCH_RATE_LIMIT) || 20,
    imageSearchRateWindowMs: Number(process.env.IMAGE_SEARCH_RATE_WINDOW_MS) || 60 * 60 * 1000,
  };
}

let cachedConfig: ServerConfig | null = null;

export function getConfig(): ServerConfig {
  if (!cachedConfig) {
    cachedConfig = loadConfig();
  }
  return cachedConfig;
}
