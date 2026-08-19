import { afterEach, describe, expect, it } from 'vitest';
import {
  applyDateTimeFormats,
  dateToIso,
  formatCatalogDate,
  formatCatalogDateTime,
  formatDateTimePreview,
  formatRecordDateTime,
} from './dateTimeFormat.js';

afterEach(() => {
  applyDateTimeFormats({});
});

describe('date formats', () => {
  it('formats the February 7 sample in common locales', () => {
    const value = '2024-02-07';
    expect(formatCatalogDate(value, { dateFormat: 'mdy-slash' })).toBe('02/07/2024');
    expect(formatCatalogDate(value, { dateFormat: 'dmy-slash' })).toBe('07/02/2024');
    expect(formatCatalogDate(value, { dateFormat: 'dmy-dot' })).toBe('07.02.2024');
    expect(formatCatalogDate(value, { dateFormat: 'dmy-dash' })).toBe('07-02-2024');
    expect(formatCatalogDate(value, { dateFormat: 'ymd-dash' })).toBe('2024-02-07');
    expect(formatCatalogDate(value, { dateFormat: 'ymd-slash' })).toBe('2024/02/07');
  });

  it('parses existing US, German, and ISO catalog dates', () => {
    expect(dateToIso('7/2/2024')).toBe('2024-07-02');
    expect(dateToIso('02.07.2024')).toBe('2024-07-02');
    expect(dateToIso('2024-07-02')).toBe('2024-07-02');
  });

  it('uses the active format to disambiguate slash dates', () => {
    applyDateTimeFormats({ dateFormat: 'mdy-slash' });
    expect(dateToIso('01/02/2024')).toBe('2024-01-02');

    applyDateTimeFormats({ dateFormat: 'dmy-slash' });
    expect(dateToIso('01/02/2024')).toBe('2024-02-01');
  });

  it('swaps impossible months instead of dropping the value', () => {
    applyDateTimeFormats({ dateFormat: 'mdy-slash' });
    expect(dateToIso('13/02/2024')).toBe('2024-02-13');
  });
});

describe('time formats', () => {
  it('formats 24-hour and 12-hour timestamps', () => {
    const value = '2024-02-07 14:30:05';
    expect(formatCatalogDateTime(value, { dateFormat: 'dmy-dot', timeFormat: '24h' })).toBe('07.02.2024 14:30:05');
    expect(formatCatalogDateTime(value, { dateFormat: 'dmy-dot', timeFormat: '12h' })).toBe('07.02.2024 2:30:05 PM');
    expect(formatCatalogDateTime('2024-02-07 00:05:00', { dateFormat: 'ymd-dash', timeFormat: '12h' })).toBe('2024-02-07 12:05:00 AM');
    expect(formatCatalogDateTime('2024-02-07 12:00:00', { dateFormat: 'ymd-dash', timeFormat: '12h' })).toBe('2024-02-07 12:00:00 PM');
  });

  it('parses 12-hour strings back for display', () => {
    expect(
      formatCatalogDateTime('07.02.2024 2:30:05 PM', { dateFormat: 'mdy-slash', timeFormat: '24h' }),
    ).toBe('02/07/2024 14:30:05');
  });

  it('applies the global site config', () => {
    applyDateTimeFormats({ dateFormat: 'dmy-dot', timeFormat: '12h' });
    expect(formatCatalogDate('2024-02-07')).toBe('07.02.2024');
    expect(formatCatalogDateTime('2024-02-07 14:30:05')).toBe('07.02.2024 2:30:05 PM');
  });

  it('builds an admin preview without seconds on the short time', () => {
    const preview = formatDateTimePreview('2024-02-07T14:30:05', { dateFormat: 'dmy-dot', timeFormat: '12h' });
    expect(preview.date).toBe('07.02.2024');
    expect(preview.time).toBe('2:30 PM');
    expect(preview.dateTime).toBe('07.02.2024 2:30:05 PM');
  });
});

describe('record timestamps', () => {
  it('formats ISO timestamps via Date', () => {
    const formatted = formatRecordDateTime('2024-02-07T14:30:05');
    expect(formatted).toMatch(/2024/);
    expect(formatted).toMatch(/14:30:05|2:30:05 PM/);
  });
});
