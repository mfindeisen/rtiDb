<template>
  <div class="space-y-6">
    <div>
      <h2 class="section-heading">Site branding</h2>
      <p class="section-sub mt-1">Name, logo, and colors shown on the public site, login page, and citations.</p>
    </div>

    <InfoCallout v-if="error" variant="error">{{ error }}</InfoCallout>
    <InfoCallout v-if="success" variant="success">{{ success }}</InfoCallout>

    <FancyCard>
      <CardContent class="pt-6 space-y-5">
        <div class="rounded-xl border border-slate-200 dark:border-white/10 px-4 py-3 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl">
          <p class="text-[10px] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500 font-semibold">Preview</p>
          <div class="mt-1 flex items-center gap-2.5">
            <img v-if="draft.logoUrl" :src="draft.logoUrl" alt="" class="h-8 w-8 sm:h-9 sm:w-9 object-contain shrink-0" />
            <div class="min-w-0">
              <p
                class="w-fit text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-from)] to-[var(--brand-to)]"
              >{{ draft.siteName || 'Site name' }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ draft.tagline }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col text-left md:col-span-2">
            <Label class="mb-2">Site name</Label>
            <Input v-model="draft.siteName" :disabled="saving" @input="preview" />
          </div>
          <div class="flex flex-col text-left md:col-span-2">
            <Label class="mb-2">Tagline</Label>
            <Input v-model="draft.tagline" :disabled="saving" @input="preview" />
          </div>
          <div class="flex flex-col text-left md:col-span-2">
            <Label class="mb-2">Citation name</Label>
            <Input v-model="draft.citationName" :disabled="saving" placeholder="Used in BibTeX / IIIF exports" />
          </div>
          <div class="flex flex-col text-left">
            <Label class="mb-2">Primary color</Label>
            <div class="flex items-center gap-2">
              <Input v-model="draft.primaryColor" type="color" class="h-10 w-12 cursor-pointer p-1" :disabled="saving" @input="preview" />
              <Input v-model="draft.primaryColor" :disabled="saving" @input="preview" />
            </div>
          </div>
          <div class="flex flex-col text-left">
            <Label class="mb-2">Title gradient</Label>
            <div class="flex items-center gap-2">
              <Input v-model="draft.brandFrom" type="color" class="h-10 w-12 cursor-pointer p-1" :disabled="saving" @input="preview" />
              <Input v-model="draft.brandTo" type="color" class="h-10 w-12 cursor-pointer p-1" :disabled="saving" @input="preview" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col text-left">
            <Label class="mb-2">Logo</Label>
            <FilePicker
              :file-name="logoFileName"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              placeholder="PNG, JPEG, WebP, or SVG"
              :disabled="saving"
              @change="onAsset('logo', $event)"
            />
          </div>
          <div class="flex flex-col text-left">
            <Label class="mb-2">Favicon</Label>
            <FilePicker
              :file-name="faviconFileName"
              accept="image/png,image/svg+xml,image/x-icon,.ico"
              placeholder="PNG, SVG, or ICO"
              :disabled="saving"
              @change="onAsset('favicon', $event)"
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <Button type="button" :disabled="saving" @click="save">{{ saving ? 'Saving…' : 'Save branding' }}</Button>
          <Button type="button" variant="outline" :disabled="saving" @click="reset">Reset colors &amp; names</Button>
        </div>
      </CardContent>
    </FancyCard>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { parseSiteConfig } from '@rtidb/shared';
import { applySiteBranding } from '@/composables/useSiteConfig';
import FancyCard from '../FancyCard.vue';
import FilePicker from '../FilePicker.vue';
import InfoCallout from '../InfoCallout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { getSiteConfig, resetSiteConfig, updateSiteConfig, uploadSiteAsset } from '@/api/catalog';
import { useSiteConfig } from '@/composables/useSiteConfig';
import { ApiError } from '@/api/client';

const { reload } = useSiteConfig();
const draft = reactive(parseSiteConfig(null));
const saving = ref(false);
const error = ref('');
const success = ref('');
const logoFileName = ref('');
const faviconFileName = ref('');

function fileNameFromUrl(url) {
  if (!url) return '';
  try {
    const path = new URL(url, window.location.origin).pathname;
    return decodeURIComponent(path.split('/').pop() || '');
  } catch {
    return String(url).split('/').pop() || '';
  }
}

function syncAssetNames() {
  logoFileName.value = fileNameFromUrl(draft.logoUrl);
  faviconFileName.value = fileNameFromUrl(draft.faviconUrl);
}

function preview() {
  applySiteBranding(parseSiteConfig(draft));
}

async function load() {
  const config = await getSiteConfig();
  Object.assign(draft, config);
  syncAssetNames();
  applySiteBranding(config);
}

async function save() {
  saving.value = true;
  error.value = '';
  success.value = '';
  try {
    const saved = await updateSiteConfig({
      siteName: draft.siteName,
      tagline: draft.tagline,
      citationName: draft.citationName,
      primaryColor: draft.primaryColor,
      brandFrom: draft.brandFrom,
      brandTo: draft.brandTo,
      logoUrl: draft.logoUrl,
      faviconUrl: draft.faviconUrl,
    });
    Object.assign(draft, saved);
    await reload();
    success.value = 'Branding saved.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Could not save branding.';
  } finally {
    saving.value = false;
  }
}

async function reset() {
  saving.value = true;
  error.value = '';
  success.value = '';
  try {
    const saved = await resetSiteConfig();
    Object.assign(draft, saved);
    syncAssetNames();
    await reload();
    success.value = 'Reset to default names and colors.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Could not reset branding.';
  } finally {
    saving.value = false;
  }
}

async function onAsset(kind, event) {
  const file = event.target.files?.[0];
  if (!file) return;
  saving.value = true;
  error.value = '';
  try {
    const saved = await uploadSiteAsset(kind, file);
    Object.assign(draft, saved);
    if (kind === 'logo') logoFileName.value = file.name;
    else faviconFileName.value = file.name;
    await reload();
    success.value = kind === 'logo' ? 'Logo uploaded.' : 'Favicon uploaded.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Upload failed.';
  } finally {
    saving.value = false;
    event.target.value = '';
  }
}

onMounted(load);
</script>
