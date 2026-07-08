/** Native OpenLIME export path inside an RTI tile folder. */
export function openLimeNativeUrl(folderUrl: string): string {
  return `${folderUrl.replace(/\/$/, '')}/openlime`;
}

/** Legacy server adapter for records processed before native OpenLIME export existed. */
export function openLimeAdapterUrl(folderUrl: string): string {
  const trimmed = folderUrl.replace(/\/$/, '');
  const folderName = trimmed.split('/').pop() ?? '';
  return `/api/openlime/${encodeURIComponent(folderName)}`;
}

export interface OpenLimeMaterial {
  scale?: number[];
  bias?: number[];
}

export interface OpenLimeInfo {
  width?: number;
  height?: number;
  format?: string;
  type?: string;
  colorspace?: string;
  nplanes?: number;
  coefficients?: number;
  materials?: OpenLimeMaterial[];
}

/** OpenLIME stores one scalar per RGB channel; rtiprep stores one per coefficient image. */
export function expandOpenLimeScalars(values: number[], nplanes: number): number[] {
  if (values.length === nplanes) return values;
  if (values.length > 0 && values.length * 3 === nplanes) {
    const expanded: number[] = [];
    for (const value of values) {
      expanded.push(value, value, value);
    }
    return expanded;
  }

  const fallback = values.length ? values[values.length - 1] : 1;
  const padded = [...values];
  while (padded.length < nplanes) padded.push(fallback);
  return padded.slice(0, nplanes);
}

function openLimePlaneCount(coefficients: number, rtiType: string): number {
  if (rtiType === 'hsh' || rtiType === 'ptm') {
    return coefficients * 3;
  }
  return coefficients;
}

/** Normalize RTI metadata so OpenLIME shader uniforms always receive vec3-aligned arrays. */
export function normalizeOpenLimeInfo(json: OpenLimeInfo): OpenLimeInfo {
  const type = (json.type ?? 'hsh').toLowerCase();
  let coefficients = json.coefficients;

  if (coefficients == null && json.nplanes != null) {
    coefficients = type === 'hsh' || type === 'ptm'
      ? Math.round(json.nplanes / 3)
      : json.nplanes;
  }
  coefficients ??= 9;

  let nplanes = json.nplanes ?? openLimePlaneCount(coefficients, type);
  if ((type === 'hsh' || type === 'ptm') && nplanes % 3 !== 0) {
    nplanes = Math.ceil(nplanes / 3) * 3;
  }

  const sourceMaterial = json.materials?.[0] ?? {};
  const material = {
    scale: expandOpenLimeScalars(sourceMaterial.scale ?? [], nplanes),
    bias: expandOpenLimeScalars(sourceMaterial.bias ?? [], nplanes),
  };

  return {
    ...json,
    type,
    colorspace: json.colorspace ?? 'rgb',
    nplanes,
    materials: [material],
  };
}

export function openLimeInfoNeedsFix(json: OpenLimeInfo): boolean {
  const normalized = normalizeOpenLimeInfo(json);
  const scale = json.materials?.[0]?.scale ?? [];
  const bias = json.materials?.[0]?.bias ?? [];
  const nplanes = json.nplanes ?? 0;
  const type = (json.type ?? 'hsh').toLowerCase();

  if (!nplanes) return true;
  if ((type === 'hsh' || type === 'ptm') && nplanes % 3 !== 0) return true;
  if (scale.length !== normalized.nplanes) return true;
  if (bias.length !== normalized.nplanes) return true;
  if (scale.length % 3 !== 0 || bias.length % 3 !== 0) return true;
  return false;
}

/** Prefer the server adapter for legacy tile folders; use native openlime/ only when present. */
export async function resolveOpenLimeDatasetUrl(folderUrl: string): Promise<string> {
  const adapter = openLimeAdapterUrl(folderUrl);

  try {
    const adapterResponse = await fetch(openLimeInfoUrl(adapter));
    if (adapterResponse.ok) {
      return adapter;
    }
  } catch {
    // try native export below
  }

  const native = openLimeNativeUrl(folderUrl);
  try {
    const response = await fetch(`${native}/info.json`);
    if (response.ok) {
      const json = (await response.json()) as OpenLimeInfo;
      if (!openLimeInfoNeedsFix(json)) return native;
    }
  } catch {
    // ignore
  }

  return adapter;
}

export function openLimeInfoUrl(datasetUrl: string): string {
  return `${datasetUrl.replace(/\/$/, '')}/info.json`;
}
