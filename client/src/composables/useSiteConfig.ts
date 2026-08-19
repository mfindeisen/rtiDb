import { ref } from 'vue';
import { siteBrandingStyleTag, DEFAULT_SITE_CONFIG, applyDateTimeFormats, type SiteConfig } from '@rtidb/shared';
import { getSiteConfig as fetchSiteConfig } from '@/api/catalog';

const config = ref<SiteConfig>({ ...DEFAULT_SITE_CONFIG });
const loaded = ref(false);

export function applySiteBranding(next: SiteConfig): void {
  let style = document.getElementById('site-branding-vars');
  if (!style) {
    style = document.createElement('style');
    style.id = 'site-branding-vars';
    document.head.appendChild(style);
  }
  style.textContent = siteBrandingStyleTag(next);
  document.title = next.siteName;
  const favicon = next.faviconUrl || '/favicon.svg';
  let icon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (!icon) {
    icon = document.createElement('link');
    icon.rel = 'icon';
    document.head.appendChild(icon);
  }
  icon.href = favicon;
}

export async function loadSiteConfig(): Promise<SiteConfig> {
  try {
    config.value = await fetchSiteConfig();
  } catch {
    config.value = { ...DEFAULT_SITE_CONFIG };
  }
  applySiteBranding(config.value);
  applyDateTimeFormats(config.value);
  loaded.value = true;
  return config.value;
}

export function useSiteConfig() {
  async function reload() {
    return loadSiteConfig();
  }

  return { config, loaded, reload };
}
