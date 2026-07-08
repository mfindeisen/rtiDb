<template>
  <div class="space-y-3">
    <Collapsible
      v-for="section in sections"
      :key="section.id"
      :default-open="openSections.includes(section.id)"
      class="border rounded-xl overflow-hidden"
    >
      <CollapsibleTrigger class="flex w-full items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted transition-colors text-sm font-semibold text-left">
        <span>{{ section.title }}</span>
        <Badge v-if="filledCount(section) > 0" variant="secondary" class="text-xs">
          {{ filledCount(section) }} filled
        </Badge>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="field in section.fields"
            :key="field.key"
            :class="field.type === 'textarea' ? 'md:col-span-2' : ''"
            class="space-y-1.5 text-left"
          >
            <Label class="text-xs">{{ field.label }}</Label>

            <Select
              v-if="field.type === 'select'"
              :model-value="model[field.key] || SELECT_EMPTY"
              :disabled="disabled"
              @update:model-value="(v) => setField(field.key, v)"
            >
              <SelectTrigger class="w-full">
                <SelectValue placeholder="— Select —" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="SELECT_EMPTY">— Select —</SelectItem>
                <SelectItem v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              v-else-if="field.type === 'textarea'"
              v-model="model[field.key]"
              :rows="3"
              :placeholder="metadataFieldPlaceholder(field)"
              :disabled="disabled || metadataFieldReadonly(field)"
              :dir="textDirection"
            />

            <Input
              v-else-if="field.type === 'date'"
              :model-value="dateToIso(model[field.key])"
              type="date"
              :placeholder="metadataFieldPlaceholder(field)"
              :disabled="disabled || metadataFieldReadonly(field)"
              @update:model-value="(v) => setDateField(field.key, v)"
            />

            <Input
              v-else
              v-model="model[field.key]"
              :type="inputType(field)"
              :placeholder="metadataFieldPlaceholder(field)"
              :disabled="disabled || metadataFieldReadonly(field)"
              :dir="textDirection"
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script setup lang="ts">
import { METADATA_SECTIONS, dateToIso, formatCatalogDate, metadataFieldPlaceholder, metadataFieldReadonly } from '@rtidb/shared';
import type { MetadataFieldDef } from '@rtidb/shared';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const SELECT_EMPTY = '__empty__';

const model = defineModel({ type: Object, required: true });

defineProps({
  disabled: { type: Boolean, default: false },
  textDirection: { type: String, default: 'ltr' },
  openSections: { type: Array, default: () => ['identification'] },
});

const sections = METADATA_SECTIONS;

function setField(key, value) {
  model.value[key] = value === SELECT_EMPTY ? '' : value;
}

function setDateField(key, value) {
  model.value[key] = value ? formatCatalogDate(value) : '';
}

function inputType(field: MetadataFieldDef): string {
  if (field.type === 'url') return 'url';
  return 'text';
}

const filledCount = (section) =>
  section.fields.filter((f) => model.value[f.key]?.trim?.()).length;
</script>
