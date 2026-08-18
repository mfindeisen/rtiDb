<template>
  <div class="page-shell space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
      <Button variant="ghost" class="justify-start sm:justify-center" @click="$router.push('/admin')">
        <ArrowLeft class="w-4 h-4 mr-2" /> Back to Records
      </Button>
    </div>

    <div v-if="loading" class="text-center text-slate-500 dark:text-slate-400 py-16">Loading record…</div>
    <InfoCallout v-else-if="loadError" variant="error">{{ loadError }}</InfoCallout>

    <form v-else class="space-y-6" @submit.prevent="save">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p class="section-label mb-1">Edit catalog record</p>
          <h1 class="page-title">{{ name || 'Untitled record' }}</h1>
        </div>
        <div class="flex flex-wrap gap-2 shrink-0">
          <Button type="button" variant="outline" :disabled="saving" @click="$router.push('/admin')">
            Cancel
          </Button>
          <button type="submit" class="btn-primary px-6 py-2" :disabled="saving || !name.trim()">
            {{ saving ? 'Saving…' : 'Save changes' }}
          </button>
        </div>
      </div>

      <InfoCallout v-if="saveError" variant="error">{{ saveError }}</InfoCallout>
      <InfoCallout v-if="saveSuccess" variant="success">{{ saveSuccess }}</InfoCallout>

      <FancyCard>
        <CardContent class="pt-6 space-y-4">
          <h2 class="section-heading">Basic information</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="flex flex-col text-left lg:col-span-2">
              <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Record Name</Label>
              <Input v-model="name" required class="form-input !px-4 !py-3" :disabled="saving" />
            </div>
            <div class="flex flex-col text-left lg:col-span-2">
              <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Description</Label>
              <Textarea v-model="description" rows="5" class="form-input !px-4 !py-3" :disabled="saving" :dir="direction" />
              <SegmentPills v-model="direction" class="mt-2" :options="directionOptions" :disabled="saving" />
            </div>
          </div>
        </CardContent>
      </FancyCard>

      <FancyCard>
        <CardContent class="pt-6 space-y-4">
          <div>
            <h2 class="section-heading">Catalog metadata</h2>
            <p class="section-sub mt-1">All catalog sections on one page. Expand a section to fill fields.</p>
          </div>
          <MetadataForm
            v-model="metadata"
            :text-direction="direction"
            :disabled="saving"
            :open-sections="openSections"
          />
        </CardContent>
      </FancyCard>

      <div class="flex flex-wrap justify-end gap-2 pb-8">
        <Button type="button" variant="outline" :disabled="saving" @click="$router.push('/admin')">
          Cancel
        </Button>
        <button type="submit" class="btn-primary px-6 py-2" :disabled="saving || !name.trim()">
          {{ saving ? 'Saving…' : 'Save changes' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from '@lucide/vue';
import { METADATA_SECTIONS, normalizeMetadata, emptyMetadata } from '@rtidb/shared';
import FancyCard from '../components/FancyCard.vue';
import InfoCallout from '../components/InfoCallout.vue';
import MetadataForm from '../components/MetadataForm.vue';
import SegmentPills from '../components/SegmentPills.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { ApiError } from '@/api/client';
import { getRecord, updateRecord } from '@/api/records';
import { logout as authLogout } from '@/composables/useAuth';

const route = useRoute();
const router = useRouter();

const directionOptions = [
  { value: 'ltr', label: 'Left to Right (LTR)' },
  { value: 'rtl', label: 'Right to Left (RTL)' },
];

const openSections = METADATA_SECTIONS.map((section) => section.id);

const loading = ref(true);
const saving = ref(false);
const loadError = ref('');
const saveError = ref('');
const saveSuccess = ref('');

const name = ref('');
const description = ref('');
const direction = ref('ltr');
const metadata = ref(emptyMetadata());

const recordId = computed(() => Number.parseInt(String(route.params.id), 10));

async function handleUnauthorized(err: unknown): Promise<boolean> {
  if (err instanceof ApiError && err.status === 401) {
    await authLogout();
    router.push('/login');
    return true;
  }
  return false;
}

async function load() {
  loading.value = true;
  loadError.value = '';
  if (!Number.isFinite(recordId.value)) {
    loadError.value = 'Invalid record id.';
    loading.value = false;
    return;
  }
  try {
    const rec = await getRecord(recordId.value);
    name.value = rec.name || '';
    description.value = rec.description || '';
    direction.value = rec.direction || 'ltr';
    metadata.value = normalizeMetadata(rec.metadata);
  } catch (err) {
    if (await handleUnauthorized(err)) return;
    loadError.value = err instanceof ApiError ? (err.body || 'Record not found.') : 'Failed to load record.';
  } finally {
    loading.value = false;
  }
}

async function save() {
  saveError.value = '';
  saveSuccess.value = '';
  saving.value = true;
  try {
    const data = await updateRecord(recordId.value, {
      name: name.value,
      description: description.value,
      direction: direction.value,
      metadata: metadata.value,
    });
    if (data.metadata) metadata.value = normalizeMetadata(data.metadata);
    saveSuccess.value = 'Record saved.';
  } catch (err) {
    if (await handleUnauthorized(err)) return;
    saveError.value = err instanceof ApiError ? (err.body || 'Save failed.') : 'Save failed.';
  } finally {
    saving.value = false;
  }
}

onMounted(load);
</script>
