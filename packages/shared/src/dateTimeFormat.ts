export const DATE_FORMAT_IDS = [
  'mdy-slash',
  'dmy-slash',
  'dmy-dot',
  'dmy-dash',
  'ymd-dash',
  'ymd-slash',
] as const;

export type DateFormatId = (typeof DATE_FORMAT_IDS)[number];

export const TIME_FORMAT_IDS = ['24h', '12h'] as const;
export type TimeFormatId = (typeof TIME_FORMAT_IDS)[number];

export interface DateTimeFormatConfig {
  dateFormat: DateFormatId;
  timeFormat: TimeFormatId;
}

export const DEFAULT_DATE_FORMAT: DateFormatId = 'mdy-slash';
export const DEFAULT_TIME_FORMAT: TimeFormatId = '24h';

export const DATE_FORMAT_OPTIONS: ReadonlyArray<{
  id: DateFormatId;
  label: string;
  hint: string;
}> = [
  { id: 'mdy-slash', label: 'MM/DD/YYYY', hint: 'United States' },
  { id: 'dmy-slash', label: 'DD/MM/YYYY', hint: 'United Kingdom, much of Europe' },
  { id: 'dmy-dot', label: 'DD.MM.YYYY', hint: 'Germany, Austria, Switzerland' },
  { id: 'dmy-dash', label: 'DD-MM-YYYY', hint: 'Netherlands, Italy, Spain' },
  { id: 'ymd-dash', label: 'YYYY-MM-DD', hint: 'ISO 8601' },
  { id: 'ymd-slash', label: 'YYYY/MM/DD', hint: 'Japan, some East Asian locales' },
];

export const TIME_FORMAT_OPTIONS: ReadonlyArray<{
  id: TimeFormatId;
  label: string;
  hint: string;
}> = [
  { id: '24h', label: '24-hour', hint: '14:30' },
  { id: '12h', label: '12-hour', hint: '2:30 PM' },
];

/** Unambiguous sample: 7 February 2024, 14:30:05 local. */
export const DATE_FORMAT_PREVIEW_ISO = '2024-02-07T14:30:05';

let active: DateTimeFormatConfig = {
  dateFormat: DEFAULT_DATE_FORMAT,
  timeFormat: DEFAULT_TIME_FORMAT,
};

export function parseDateFormatId(value: unknown): DateFormatId {
  const raw = String(value || '').trim();
  return (DATE_FORMAT_IDS as readonly string[]).includes(raw)
    ? (raw as DateFormatId)
    : DEFAULT_DATE_FORMAT;
}

export function parseTimeFormatId(value: unknown): TimeFormatId {
  const raw = String(value || '').trim();
  return (TIME_FORMAT_IDS as readonly string[]).includes(raw)
    ? (raw as TimeFormatId)
    : DEFAULT_TIME_FORMAT;
}

export function applyDateTimeFormats(
  config: Partial<DateTimeFormatConfig> | null | undefined,
): DateTimeFormatConfig {
  active = {
    dateFormat: parseDateFormatId(config?.dateFormat),
    timeFormat: parseTimeFormatId(config?.timeFormat),
  };
  return { ...active };
}

export function getDateTimeFormats(): DateTimeFormatConfig {
  return { ...active };
}

function resolveFormats(override?: Partial<DateTimeFormatConfig> | null): DateTimeFormatConfig {
  return {
    dateFormat: override?.dateFormat ? parseDateFormatId(override.dateFormat) : active.dateFormat,
    timeFormat: override?.timeFormat ? parseTimeFormatId(override.timeFormat) : active.timeFormat,
  };
}

export interface DateParts {
  month: number;
  day: number;
  year: number;
}

export interface TimeParts {
  hours: number;
  minutes: number;
  seconds: number;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function validDateParts(parts: DateParts): boolean {
  return parts.month >= 1 && parts.month <= 12 && parts.day >= 1 && parts.day <= 31 && parts.year >= 1000 && parts.year <= 9999;
}

function slashOrder(format: DateFormatId): 'mdy' | 'dmy' {
  return format.startsWith('dmy') ? 'dmy' : 'mdy';
}

function fromOrder(first: number, second: number, year: number, order: 'mdy' | 'dmy'): DateParts {
  return order === 'dmy'
    ? { day: first, month: second, year }
    : { month: first, day: second, year };
}

function parseTwoPartDate(first: number, second: number, year: number, format: DateFormatId): DateParts | null {
  const preferred = fromOrder(first, second, year, slashOrder(format));
  if (validDateParts(preferred)) return preferred;

  const swapped = fromOrder(first, second, year, slashOrder(format) === 'dmy' ? 'mdy' : 'dmy');
  if (validDateParts(swapped)) return swapped;

  return validDateParts({ month: first, day: second, year }) ? { month: first, day: second, year } : null;
}

/** Parse catalog, ISO, and locale date strings into numeric parts. */
export function parseDateParts(
  value: unknown,
  formats?: Partial<DateTimeFormatConfig> | null,
): DateParts | null {
  const s = String(value ?? '').trim();
  if (!s) return null;
  const format = resolveFormats(formats).dateFormat;

  const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) {
    const parts = { year: +iso[1]!, month: +iso[2]!, day: +iso[3]! };
    return validDateParts(parts) ? parts : null;
  }

  const ymdSlash = s.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})/);
  if (ymdSlash) {
    const parts = { year: +ymdSlash[1]!, month: +ymdSlash[2]!, day: +ymdSlash[3]! };
    return validDateParts(parts) ? parts : null;
  }

  const dotted = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (dotted) {
    const parts = { day: +dotted[1]!, month: +dotted[2]!, year: +dotted[3]! };
    return validDateParts(parts) ? parts : null;
  }

  const twoPart = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (twoPart) return parseTwoPartDate(+twoPart[1]!, +twoPart[2]!, +twoPart[3]!, format);

  return null;
}

function parseTimeParts(value: unknown): TimeParts | null {
  const s = String(value ?? '').trim();
  const match = s.match(/\b(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:Z)?(?:\s*(AM|PM))?\s*$/i);
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = Number(match[3] || 0);
  const period = match[4]?.toUpperCase();

  if (period) {
    if (hours < 1 || hours > 12) return null;
    if (period === 'AM') hours = hours === 12 ? 0 : hours;
    else hours = hours === 12 ? 12 : hours + 12;
  }

  if (hours < 0 || hours > 23 || minutes > 59 || seconds > 59) return null;
  return { hours, minutes, seconds };
}

export function formatDateParts(parts: DateParts, format: DateFormatId = active.dateFormat): string {
  const y = String(parts.year);
  const m = pad(parts.month);
  const d = pad(parts.day);
  switch (format) {
    case 'mdy-slash':
      return `${m}/${d}/${y}`;
    case 'dmy-slash':
      return `${d}/${m}/${y}`;
    case 'dmy-dot':
      return `${d}.${m}.${y}`;
    case 'dmy-dash':
      return `${d}-${m}-${y}`;
    case 'ymd-dash':
      return `${y}-${m}-${d}`;
    case 'ymd-slash':
      return `${y}/${m}/${d}`;
  }
}

export function formatTimeParts(
  time: TimeParts,
  format: TimeFormatId = active.timeFormat,
  withSeconds = true,
): string {
  const mm = pad(time.minutes);
  const ss = pad(time.seconds);
  if (format === '12h') {
    const period = time.hours >= 12 ? 'PM' : 'AM';
    const hour12 = time.hours % 12 || 12;
    return withSeconds ? `${hour12}:${mm}:${ss} ${period}` : `${hour12}:${mm} ${period}`;
  }
  const hh = pad(time.hours);
  return withSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
}

function fromDate(date: Date): { date: DateParts; time: TimeParts } {
  return {
    date: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    },
    time: {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    },
  };
}

function parseDateTimeValue(
  value: unknown,
  formats?: Partial<DateTimeFormatConfig> | null,
): { date: DateParts; time: TimeParts | null } | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    const parsed = fromDate(value);
    return { date: parsed.date, time: parsed.time };
  }

  const s = String(value ?? '').trim();
  if (!s) return null;

  const isoTimestamp = /^\d{4}-\d{2}-\d{2}T/.test(s);
  if (isoTimestamp) {
    const date = new Date(s);
    if (!Number.isNaN(date.getTime())) {
      const parsed = fromDate(date);
      return { date: parsed.date, time: parsed.time };
    }
  }

  const date = parseDateParts(s, formats);
  if (!date) return null;
  return { date, time: parseTimeParts(s) };
}

function joinDateTime(date: string, time: string): string {
  return `${date} ${time}`;
}

/** Format a date using the active (or overridden) site date format. */
export function formatCatalogDate(
  value: unknown,
  formats?: Partial<DateTimeFormatConfig> | null,
): string {
  if (value == null || value === '') return '';
  const parts = parseDateParts(value, formats);
  if (!parts) return String(value).trim();
  return formatDateParts(parts, resolveFormats(formats).dateFormat);
}

/** Format a date-time using the active (or overridden) site date and time formats. */
export function formatCatalogDateTime(
  value: unknown,
  formats?: Partial<DateTimeFormatConfig> | null,
): string {
  if (value == null || value === '') return '';
  const parsed = parseDateTimeValue(value, formats);
  if (!parsed) return String(value).trim();
  const cfg = resolveFormats(formats);
  const date = formatDateParts(parsed.date, cfg.dateFormat);
  if (!parsed.time) return date;
  return joinDateTime(date, formatTimeParts(parsed.time, cfg.timeFormat));
}

/** Convert a catalog/locale date string to yyyy-mm-dd for date inputs. */
export function dateToIso(value: unknown, formats?: Partial<DateTimeFormatConfig> | null): string {
  const parts = parseDateParts(value, formats);
  if (!parts) return '';
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`;
}

/** Format a record timestamp as a date using local timezone when the value is a real Date/ISO timestamp. */
export function formatRecordDate(
  value: unknown,
  formats?: Partial<DateTimeFormatConfig> | null,
): string {
  if (value == null || value === '') return '';
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return formatDateParts(fromDate(value).date, resolveFormats(formats).dateFormat);
  }
  const s = String(value).trim();
  const asDate = new Date(s);
  if (!Number.isNaN(asDate.getTime()) && /^\d{4}-\d{2}-\d{2}T/.test(s)) {
    return formatDateParts(fromDate(asDate).date, resolveFormats(formats).dateFormat);
  }
  return formatCatalogDate(value, formats);
}

/** Format a record timestamp with time using local timezone for ISO datetimes. */
export function formatRecordDateTime(
  value: unknown,
  formats?: Partial<DateTimeFormatConfig> | null,
): string {
  if (value == null || value === '') return '';
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return formatCatalogDateTime(value, formats);
  }
  const s = String(value).trim();
  const asDate = new Date(s);
  if (!Number.isNaN(asDate.getTime()) && /^\d{4}-\d{2}-\d{2}T/.test(s)) {
    return formatCatalogDateTime(asDate, formats);
  }
  return formatCatalogDateTime(s, formats);
}

export function formatDateTimePreview(
  value: Date | string = DATE_FORMAT_PREVIEW_ISO,
  formats?: Partial<DateTimeFormatConfig> | null,
): { date: string; time: string; dateTime: string } {
  const parsed = parseDateTimeValue(value, formats) || parseDateTimeValue(DATE_FORMAT_PREVIEW_ISO, formats)!;
  const cfg = resolveFormats(formats);
  const date = formatDateParts(parsed.date, cfg.dateFormat);
  const time = parsed.time ? formatTimeParts(parsed.time, cfg.timeFormat, false) : '';
  const dateTime = parsed.time
    ? joinDateTime(date, formatTimeParts(parsed.time, cfg.timeFormat))
    : date;
  return { date, time, dateTime };
}
