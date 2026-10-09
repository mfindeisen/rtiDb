import { apiUrl } from './client';

export interface DemoInfo {
  demoMode: boolean;
  username?: string;
  password?: string;
}

export async function getDemoInfo(): Promise<DemoInfo> {
  try {
    const res = await fetch(apiUrl('/api/demo'), { credentials: 'include' });
    if (!res.ok) return { demoMode: false };
    return (await res.json()) as DemoInfo;
  } catch {
    return { demoMode: false };
  }
}
