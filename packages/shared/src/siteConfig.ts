import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  parseDateFormatId,
  parseTimeFormatId,
  type DateFormatId,
  type TimeFormatId,
} from './dateTimeFormat.js';

export interface SiteConfig {
  siteName: string;
  tagline: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  brandFrom: string;
  brandTo: string;
  citationName: string;
  dateFormat: DateFormatId;
  timeFormat: TimeFormatId;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: 'RTI Database',
  tagline: 'Sign in to browse catalog records, RTI scans, and annotations.',
  logoUrl: null,
  faviconUrl: null,
  primaryColor: '#3B82F6',
  brandFrom: '#2563EB',
  brandTo: '#10B981',
  citationName: 'RTI Database',
  dateFormat: DEFAULT_DATE_FORMAT,
  timeFormat: DEFAULT_TIME_FORMAT,
};

const HEX_RE = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

export function normalizeHexColor(value: unknown, fallback: string): string {
  const raw = String(value || '').trim();
  if (!HEX_RE.test(raw)) return fallback.toUpperCase();
  let hex = raw.slice(1).toUpperCase();
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  return `#${hex}`;
}

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function hexToOklch(hex: string): { l: number; c: number; h: number } {
  const normalized = normalizeHexColor(hex, '#3B82F6').slice(1);
  const r = srgbToLinear(parseInt(normalized.slice(0, 2), 16));
  const g = srgbToLinear(parseInt(normalized.slice(2, 4), 16));
  const b = srgbToLinear(parseInt(normalized.slice(4, 6), 16));

  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  return {
    l: L,
    c: Math.hypot(a, bVal),
    h: (Math.atan2(bVal, a) * 180) / Math.PI + (Math.atan2(bVal, a) < 0 ? 360 : 0),
  };
}

export function oklchCss(hex: string, deltaL = 0): string {
  const { l, c, h } = hexToOklch(hex);
  const nextL = Math.min(0.96, Math.max(0.18, l + deltaL));
  return `oklch(${nextL.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
}

function optionalUrl(value: unknown): string | null {
  if (value == null) return null;
  const text = String(value).trim();
  return text || null;
}

export function parseSiteConfig(raw: unknown): SiteConfig {
  const data = raw && typeof raw === 'object' && !Array.isArray(raw)
    ? (raw as Record<string, unknown>)
    : {};
  const siteName = String(data.siteName || DEFAULT_SITE_CONFIG.siteName).trim() || DEFAULT_SITE_CONFIG.siteName;
  return {
    siteName,
    tagline: String(data.tagline ?? DEFAULT_SITE_CONFIG.tagline),
    logoUrl: optionalUrl(data.logoUrl),
    faviconUrl: optionalUrl(data.faviconUrl),
    primaryColor: normalizeHexColor(data.primaryColor, DEFAULT_SITE_CONFIG.primaryColor),
    brandFrom: normalizeHexColor(data.brandFrom, DEFAULT_SITE_CONFIG.brandFrom),
    brandTo: normalizeHexColor(data.brandTo, DEFAULT_SITE_CONFIG.brandTo),
    citationName: String(data.citationName || siteName).trim() || siteName,
    dateFormat: parseDateFormatId(data.dateFormat),
    timeFormat: parseTimeFormatId(data.timeFormat),
  };
}

export function siteBrandingStyleTag(config: SiteConfig): string {
  return `:root {
  --primary: ${oklchCss(config.primaryColor)};
  --ring: ${oklchCss(config.primaryColor)};
  --brand-from: ${config.brandFrom};
  --brand-to: ${config.brandTo};
}
.dark {
  --primary: ${oklchCss(config.primaryColor, 0.07)};
  --ring: ${oklchCss(config.primaryColor, 0.07)};
}`;
}
