/** Normalize an Express route param to a single string value. */
export function routeParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

/** Parse a query value as number when present. */
export function queryNumber(value: unknown): number | undefined {
  if (value == null || value === '') return undefined;
  const raw = Array.isArray(value) ? value[0] : value;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}
