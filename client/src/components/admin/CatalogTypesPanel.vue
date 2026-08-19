<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
      <div>
        <h2 class="section-heading">Record types</h2>
        <p class="section-sub mt-1">Each type has its own catalog fields. Existing seal records stay on the default type.</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <Button type="button" variant="outline" @click="createBlank">New type</Button>
        <Button type="button" variant="outline" :disabled="!selectedId" @click="duplicateSelected">Duplicate</Button>
      </div>
    </div>

    <InfoCallout v-if="error" variant="error">{{ error }}</InfoCallout>
    <InfoCallout v-if="success" variant="success">{{ success }}</InfoCallout>

    <div class="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6 items-start">
      <FancyCard>
        <CardContent class="pt-4 space-y-1">
          <Button
            v-for="type in types"
            :key="type.id"
            type="button"
            variant="ghost"
            class="w-full h-auto justify-start py-2 px-3"
            :class="selectedId === type.id
              ? 'bg-accent text-accent-foreground font-semibold'
              : ''"
            @click="selectType(type.id)"
          >
            <span class="block truncate">{{ type.name }}</span>
            <span class="block text-[11px] font-normal text-slate-400">
              {{ type.recordCount || 0 }} records{{ type.isDefault ? ' · default' : '' }}
            </span>
          </Button>
          <p v-if="!types.length" class="text-sm text-slate-500 py-4">No types yet.</p>
        </CardContent>
      </FancyCard>

      <FancyCard v-if="draft">
        <CardContent class="pt-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <Label class="mb-2">Name</Label>
              <Input v-model="draft.name" />
            </div>
            <div class="flex flex-col">
              <Label class="mb-2">Slug</Label>
              <Input v-model="draft.slug" class="font-mono text-sm" />
            </div>
            <div class="flex flex-col md:col-span-2">
              <Label class="mb-2">Description</Label>
              <Textarea v-model="draft.description" rows="2" />
            </div>
          </div>
          <label class="flex items-center gap-2 text-sm">
            <Checkbox :model-value="draft.isDefault" @update:model-value="draft.isDefault = $event === true" />
            Default type for new records
          </label>

          <div class="flex flex-wrap justify-between gap-2">
            <Button type="button" variant="outline" @click="addSection">Add section</Button>
            <div class="flex gap-2">
              <Button type="button" :disabled="saving" @click="save">{{ saving ? 'Saving…' : 'Save type' }}</Button>
              <Button type="button" variant="destructive" :disabled="saving || draft.isDefault" @click="remove">Delete</Button>
            </div>
          </div>

          <div v-for="(section, sIndex) in draft.schema" :key="section.id + sIndex" class="rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
            <div class="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-white/[0.04]">
              <Input v-model="section.title" class="h-8 text-sm font-semibold" />
              <Button type="button" variant="ghost" size="icon-xs" :disabled="sIndex === 0" @click="moveSection(sIndex, -1)">↑</Button>
              <Button type="button" variant="ghost" size="icon-xs" :disabled="sIndex === draft.schema.length - 1" @click="moveSection(sIndex, 1)">↓</Button>
              <Button type="button" variant="ghost" size="icon-xs" class="text-red-500" @click="draft.schema.splice(sIndex, 1)">×</Button>
            </div>
            <div class="p-3 space-y-2">
              <div
                v-for="(field, fIndex) in section.fields"
                :key="field.key + fIndex"
                class="rounded-lg border border-slate-200/80 dark:border-white/10 p-3 grid grid-cols-1 md:grid-cols-6 gap-2 items-end"
              >
                <div class="md:col-span-2">
                  <Label class="text-[11px]">Label</Label>
                  <Input v-model="field.label" class="h-8 text-sm" />
                </div>
                <div>
                  <Label class="text-[11px]">Key</Label>
                  <Input v-model="field.key" class="h-8 text-xs font-mono" :disabled="lockedKeys.has(field.key)" />
                </div>
                <div>
                  <Label class="text-[11px]">Type</Label>
                  <Select :model-value="field.type" @update:model-value="(v) => field.type = v">
                    <SelectTrigger class="h-8"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="t in fieldTypes" :key="t" :value="t">{{ t }}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="flex items-center gap-1">
                  <Button type="button" variant="ghost" size="icon-xs" :disabled="fIndex === 0" @click="moveField(section, fIndex, -1)">↑</Button>
                  <Button type="button" variant="ghost" size="icon-xs" :disabled="fIndex === section.fields.length - 1" @click="moveField(section, fIndex, 1)">↓</Button>
                  <Button type="button" variant="ghost" size="icon-xs" class="text-red-500" @click="section.fields.splice(fIndex, 1)">×</Button>
                </div>
                <div v-if="field.type === 'select'" class="md:col-span-6">
                  <Label class="text-[11px]">Options (comma-separated)</Label>
                  <Input :model-value="(field.options || []).join(', ')" class="h-8 text-sm" @update:model-value="(v) => field.options = String(v).split(',').map((s) => s.trim()).filter(Boolean)" />
                </div>
                <div class="md:col-span-6 flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300">
                  <label class="flex items-center gap-1.5"><Checkbox :model-value="!!field.showInSearch" @update:model-value="field.showInSearch = $event === true" /> Search filter</label>
                  <label class="flex items-center gap-1.5"><Checkbox :model-value="!!field.showInGallery" @update:model-value="field.showInGallery = $event === true" /> Gallery column</label>
                  <label class="flex items-center gap-1.5"><Checkbox :model-value="!!field.required" @update:model-value="field.required = $event === true" /> Required</label>
                  <label class="flex items-center gap-1.5"><Checkbox :model-value="!!field.readonly" @update:model-value="field.readonly = $event === true" /> Readonly</label>
                </div>
              </div>
              <Button type="button" variant="outline" size="sm" @click="addField(section)">Add field</Button>
            </div>
          </div>
        </CardContent>
      </FancyCard>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { CATALOG_FIELD_TYPES, cloneCatalogSchema, slugifyCatalogId, slugifyFieldKey } from '@rtidb/shared';
import FancyCard from '../FancyCard.vue';
import InfoCallout from '../InfoCallout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createRecordType, deleteRecordType, listRecordTypes, updateRecordType } from '@/api/catalog';
import { confirmAction } from '@/composables/useConfirmDialog';
import { ApiError } from '@/api/client';

const fieldTypes = CATALOG_FIELD_TYPES;
const types = ref([]);
const selectedId = ref(null);
const draft = ref(null);
const lockedKeys = ref(new Set());
const saving = ref(false);
const error = ref('');
const success = ref('');

const selected = () => types.value.find((t) => t.id === selectedId.value);

function toDraft(type) {
  return {
    id: type.id,
    name: type.name,
    slug: type.slug,
    description: type.description || '',
    isDefault: type.isDefault,
    schema: cloneCatalogSchema(type.schema || []),
  };
}

async function load() {
  types.value = await listRecordTypes();
  if (!selectedId.value && types.value[0]) selectType(types.value[0].id);
  else if (selectedId.value) selectType(selectedId.value);
}

function selectType(id) {
  selectedId.value = id;
  const type = types.value.find((item) => item.id === id);
  if (!type) {
    draft.value = null;
    return;
  }
  draft.value = toDraft(type);
  lockedKeys.value = new Set(type.schema.flatMap((section) => section.fields.map((field) => field.key)));
}

async function createBlank() {
  error.value = '';
  try {
    const created = await createRecordType({
      name: 'New type',
      schema: [{ id: 'identification', title: 'Identification', fields: [{ key: 'title', label: 'Title', type: 'text' }] }],
    });
    await load();
    selectType(created.id);
    success.value = 'Type created.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Could not create type.';
  }
}

async function duplicateSelected() {
  const type = selected();
  if (!type) return;
  try {
    const created = await createRecordType({
      name: `${type.name} copy`,
      cloneFromId: type.id,
    });
    await load();
    selectType(created.id);
    success.value = 'Type duplicated.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Could not duplicate type.';
  }
}

function addSection() {
  if (!draft.value) return;
  const title = `Section ${draft.value.schema.length + 1}`;
  draft.value.schema.push({ id: slugifyCatalogId(title), title, fields: [] });
}

function addField(section) {
  const label = `Field ${section.fields.length + 1}`;
  section.fields.push({
    key: slugifyFieldKey(label + Date.now().toString(36).slice(-3)),
    label,
    type: 'text',
    showInSearch: false,
    showInGallery: false,
  });
}

function moveSection(index, dir) {
  const list = draft.value.schema;
  const target = index + dir;
  [list[index], list[target]] = [list[target], list[index]];
}

function moveField(section, index, dir) {
  const list = section.fields;
  const target = index + dir;
  [list[index], list[target]] = [list[target], list[index]];
}

async function save() {
  if (!draft.value) return;
  saving.value = true;
  error.value = '';
  success.value = '';
  try {
    await updateRecordType(draft.value.id, {
      name: draft.value.name,
      slug: draft.value.slug,
      description: draft.value.description,
      isDefault: draft.value.isDefault,
      schema: draft.value.schema,
    });
    await load();
    success.value = 'Type saved.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Could not save type.';
  } finally {
    saving.value = false;
  }
}

async function remove() {
  if (!draft.value) return;
  const ok = await confirmAction({
    title: 'Delete record type?',
    description: 'Only types without records can be deleted.',
    confirmLabel: 'Delete',
    variant: 'destructive',
  });
  if (!ok) return;
  try {
    await deleteRecordType(draft.value.id);
    selectedId.value = null;
    await load();
    success.value = 'Type deleted.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Could not delete type.';
  }
}

onMounted(load);
</script>
