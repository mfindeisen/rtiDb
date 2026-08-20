<template>
  <div>
    <h2 class="section-heading mb-2">Create Catalog Record</h2>
    <p class="section-sub mb-6">Create a record with metadata first. Upload the RTI scan file later from the records list.</p>

    <form class="space-y-6" @submit.prevent="$emit('submit')">
      <div class="flex flex-col text-left">
        <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Record type</Label>
        <Select v-model="typeId" :disabled="isCreating">
          <SelectTrigger class="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
          <SelectContent>
            <SelectItem v-for="type in recordTypes" :key="type.id" :value="String(type.id)">{{ type.name }}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex flex-col text-left">
        <Label for="create-record-name" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Record Name</Label>
        <Input id="create-record-name" v-model="name" required :disabled="isCreating" />
      </div>
      <div class="flex flex-col text-left">
        <Label for="create-record-description" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Description</Label>
        <Textarea id="create-record-description" v-model="description" rows="3" :disabled="isCreating" :dir="direction" />
        <SegmentPills v-model="direction" class="mt-2" :options="directionOptions" />
      </div>
      <Button type="submit" class="w-full" :disabled="isCreating">
        {{ isCreating ? 'Creating...' : 'Create Record' }}
      </Button>
    </form>
    <InfoCallout v-if="error" variant="error" class="mt-4">{{ error }}</InfoCallout>
    <InfoCallout v-if="success" variant="success" class="mt-4">{{ success }}</InfoCallout>
  </div>
</template>

<script setup lang="ts">
import SegmentPills from '@/components/SegmentPills.vue';
import InfoCallout from '@/components/InfoCallout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { directionOptions } from '@/components/admin/adminFormOptions';
import type { RecordType } from '@rtidb/shared/api/catalog';

defineProps<{
  recordTypes: RecordType[];
  isCreating: boolean;
  error: string;
  success: string;
}>();

defineEmits<{
  submit: [];
}>();

const name = defineModel<string>('name', { required: true });
const description = defineModel<string>('description', { required: true });
const direction = defineModel<string>('direction', { required: true });
const typeId = defineModel<string>('typeId', { required: true });
</script>
