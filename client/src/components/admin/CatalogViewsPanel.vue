<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
      <div>
        <h2 class="section-heading">Gallery views</h2>
        <p class="section-sub mt-1">Saved column sets, filters, and optional type filters — like Airtable views.</p>
      </div>
      <Button type="button" variant="outline" @click="createView">
        <Plus />
        New view
      </Button>
    </div>

    <Alert v-if="error" variant="destructive">
      <CircleAlert />
      <AlertTitle>Could not update view</AlertTitle>
      <AlertDescription>{{ error }}</AlertDescription>
    </Alert>
    <Alert v-if="success">
      <CheckCircle2 />
      <AlertDescription>{{ success }}</AlertDescription>
    </Alert>

    <div class="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Views</CardTitle>
          <CardDescription>Pick a view to edit its columns and sort.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-1">
          <Button
            v-for="view in views"
            :key="view.id"
            type="button"
            :variant="selectedId === view.id ? 'secondary' : 'ghost'"
            class="w-full h-auto justify-start py-2 px-3"
            @click="selectView(view.id)"
          >
            <span class="flex min-w-0 flex-1 items-center justify-between gap-2">
              <span class="truncate font-medium">{{ view.name }}</span>
              <Badge :variant="viewStatusVariant(view)">{{ viewStatusLabel(view) }}</Badge>
            </span>
          </Button>
          <p v-if="!views.length" class="text-sm text-muted-foreground py-4">No views yet. Create one to start.</p>
        </CardContent>
      </Card>

      <Card v-if="draft">
        <CardHeader>
          <CardTitle>{{ draft.name || 'Untitled view' }}</CardTitle>
          <CardDescription>Columns, sort, and visibility for this gallery view.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup class="gap-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel for="view-name">Name</FieldLabel>
                <Input id="view-name" v-model="draft.name" :disabled="saving" />
              </Field>
              <Field>
                <FieldLabel for="view-type">Record type</FieldLabel>
                <Select
                  :model-value="draft.recordTypeId == null ? '__all__' : String(draft.recordTypeId)"
                  :disabled="saving"
                  @update:model-value="onTypeChange"
                >
                  <SelectTrigger id="view-type" class="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">All types</SelectItem>
                    <SelectItem v-for="type in types" :key="type.id" :value="String(type.id)">{{ type.name }}</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <FieldSet>
              <FieldLegend variant="label">Visibility</FieldLegend>
              <FieldDescription>
                The default view opens first in the gallery. Public views appear in the gallery picker.
              </FieldDescription>
              <FieldGroup data-slot="checkbox-group">
                <Field orientation="horizontal">
                  <Checkbox
                    id="view-default"
                    :model-value="draft.isDefault"
                    :disabled="saving"
                    @update:model-value="draft.isDefault = $event === true"
                  />
                  <FieldLabel for="view-default" class="font-normal">Default view</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox
                    id="view-public"
                    :model-value="draft.isPublic"
                    :disabled="saving"
                    @update:model-value="draft.isPublic = $event === true"
                  />
                  <FieldLabel for="view-public" class="font-normal">Public</FieldLabel>
                </Field>
              </FieldGroup>
            </FieldSet>

            <Separator />

            <FieldSet>
              <FieldLegend variant="label">Visible columns</FieldLegend>
              <FieldDescription>Choose which columns appear when this view is selected.</FieldDescription>
              <ScrollArea class="h-72 rounded-lg border">
                <FieldGroup data-slot="checkbox-group" class="p-3">
                  <Field v-for="col in columnChoices" :key="col.id" orientation="horizontal">
                    <Checkbox
                      :id="columnInputId(col.id)"
                      :model-value="draft.config.visibleColumnIds.includes(col.id)"
                      :disabled="saving"
                      @update:model-value="toggleColumn(col.id, $event === true)"
                    />
                    <FieldLabel :for="columnInputId(col.id)" class="font-normal">{{ col.label }}</FieldLabel>
                  </Field>
                </FieldGroup>
              </ScrollArea>
            </FieldSet>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel for="view-sort-field">Sort field</FieldLabel>
                <Select :model-value="draft.config.sort.field" :disabled="saving" @update:model-value="onSortFieldChange">
                  <SelectTrigger id="view-sort-field" class="w-full">
                    <SelectValue placeholder="Choose a field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="field in sortFieldChoices" :key="field.value" :value="field.value">
                      {{ field.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel for="view-sort-dir">Direction</FieldLabel>
                <Select :model-value="draft.config.sort.dir" :disabled="saving" @update:model-value="onSortDirChange">
                  <SelectTrigger id="view-sort-dir" class="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter class="justify-between gap-2">
          <Button type="button" variant="destructive" :disabled="saving" @click="remove">Delete</Button>
          <Button type="button" :disabled="saving" @click="save">{{ saving ? 'Saving…' : 'Save view' }}</Button>
        </CardFooter>
      </Card>

      <Card v-else>
        <CardHeader>
          <CardTitle>No view selected</CardTitle>
          <CardDescription>Choose a view on the left, or create a new one.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { CheckCircle2, CircleAlert, Plus } from '@lucide/vue';
import { flattenCatalogFields, parseViewConfig } from '@rtidb/shared';
import type { CatalogView, RecordType } from '@rtidb/shared/api/catalog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { createCatalogView, deleteCatalogView, listCatalogViews, listRecordTypes, updateCatalogView } from '@/api/catalog';
import { allGalleryColumnsForFields, sortFieldOptionsForColumns } from '@/lib/galleryColumns';
import { confirmAction } from '@/composables/useConfirmDialog';
import { ApiError } from '@/api/client';

const types = ref<RecordType[]>([]);
const views = ref<CatalogView[]>([]);
const selectedId = ref<number | null>(null);
const draft = ref<CatalogView | null>(null);
const saving = ref(false);
const error = ref('');
const success = ref('');

const columnChoices = computed(() => {
  const type = types.value.find((item) => item.id === draft.value?.recordTypeId);
  const fields = type
    ? flattenCatalogFields(type.schema)
    : types.value.flatMap((item) => flattenCatalogFields(item.schema).filter((field) => field.showInGallery));
  const unique: Array<{ key: string; label: string }> = [];
  const seen = new Set<string>();
  for (const field of fields) {
    if (seen.has(field.key)) continue;
    seen.add(field.key);
    unique.push(field);
  }
  return allGalleryColumnsForFields(unique);
});

const sortFieldChoices = computed(() => {
  const options = sortFieldOptionsForColumns(columnChoices.value);
  const current = draft.value?.config.sort.field;
  if (current && !options.some((item) => item.value === current)) {
    options.unshift({ value: current, label: current });
  }
  return options;
});

function columnInputId(id: string) {
  return `view-col-${id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
}

function viewStatusLabel(view: CatalogView) {
  if (view.isDefault) return 'Default';
  return view.isPublic ? 'Public' : 'Hidden';
}

function viewStatusVariant(view: CatalogView) {
  if (view.isDefault) return 'default' as const;
  return view.isPublic ? 'secondary' as const : 'outline' as const;
}

async function load() {
  types.value = await listRecordTypes();
  views.value = await listCatalogViews(true);
  if (!selectedId.value && views.value[0]) selectView(views.value[0].id);
  else if (selectedId.value) selectView(selectedId.value);
}

function selectView(id: number) {
  selectedId.value = id;
  const view = views.value.find((item) => item.id === id);
  draft.value = view
    ? {
        ...view,
        config: parseViewConfig(view.config),
      }
    : null;
}

function onTypeChange(value: unknown) {
  if (!draft.value) return;
  draft.value.recordTypeId = value === '__all__' ? null : Number(value);
}

function onSortFieldChange(value: unknown) {
  if (!draft.value) return;
  if (typeof value === 'string' && value) draft.value.config.sort.field = value;
}

function onSortDirChange(value: unknown) {
  if (!draft.value) return;
  if (value === 'asc' || value === 'desc') draft.value.config.sort.dir = value;
}

function toggleColumn(id: string, visible: boolean) {
  if (!draft.value) return;
  const ids = draft.value.config.visibleColumnIds;
  if (visible && !ids.includes(id)) ids.push(id);
  if (!visible) draft.value.config.visibleColumnIds = ids.filter((item) => item !== id);
}

async function createView() {
  error.value = '';
  success.value = '';
  try {
    const created = await createCatalogView({ name: 'New view', isPublic: true });
    await load();
    selectView(created.id);
    success.value = 'View created.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Could not create view.';
  }
}

async function save() {
  if (!draft.value) return;
  saving.value = true;
  error.value = '';
  success.value = '';
  try {
    await updateCatalogView(draft.value.id, {
      name: draft.value.name,
      recordTypeId: draft.value.recordTypeId,
      isDefault: draft.value.isDefault,
      isPublic: draft.value.isPublic,
      config: draft.value.config,
    });
    await load();
    success.value = 'View saved.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Could not save view.';
  } finally {
    saving.value = false;
  }
}

async function remove() {
  if (!draft.value) return;
  const ok = await confirmAction({
    title: 'Delete view?',
    description: 'The gallery will fall back to another public view.',
    confirmLabel: 'Delete',
  });
  if (!ok) return;
  error.value = '';
  success.value = '';
  try {
    await deleteCatalogView(draft.value.id);
    selectedId.value = null;
    await load();
    success.value = 'View deleted.';
  } catch (err) {
    error.value = err instanceof ApiError ? err.body : 'Could not delete view.';
  }
}

onMounted(load);
</script>
