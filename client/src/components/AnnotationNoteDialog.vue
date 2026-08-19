<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="annotation-note-title"
    >
      <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="cancel" />
      <div class="relative w-full max-w-md rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl p-6 space-y-4">
        <div>
          <h3 id="annotation-note-title" class="text-lg font-bold text-slate-800 dark:text-white">
            {{ mode === 'edit' ? 'Edit annotation' : 'Save annotation' }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {{ mode === 'edit'
              ? 'Update the note, color, and line width for this mark on the image.'
              : 'Pick a color and line width, then optionally add a note. Camera and light settings are saved automatically.' }}
          </p>
        </div>

        <AnnotationColorPicker v-model="selectedColor" />
        <AnnotationStrokePicker v-model="selectedStrokeWidth" :preview-color="selectedColor" />

        <div v-if="mode === 'create' || mode === 'edit'" class="space-y-2">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Visibility</span>
          <ToggleGroup
            type="single"
            variant="outline"
            class="flex-wrap h-auto"
            :model-value="selectedVisibility"
            @update:model-value="onVisibilityChange"
          >
            <ToggleGroupItem
              v-for="option in visibilityOptions"
              :key="option.value"
              :value="option.value"
              class="h-auto flex-col items-start gap-0 px-3 py-2"
            >
              <span class="font-semibold">{{ option.label }}</span>
              <span class="text-muted-foreground font-normal">{{ option.hint }}</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div class="space-y-2">
          <Label for="annotation-note-text" class="text-xs font-semibold text-slate-500 dark:text-slate-400">Note (optional)</Label>
          <Textarea
            id="annotation-note-text"
            ref="inputRef"
            v-model="noteText"
            rows="4"
            class="text-sm min-h-[96px]"
            placeholder="e.g. scratch near lower edge, possible cuneiform sign…"
            @keydown.escape="cancel"
          />
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
          <Button
            v-if="mode === 'edit'"
            type="button"
            variant="destructive"
            :disabled="saving || deleting"
            @click="remove"
          >
            {{ deleting ? 'Deleting…' : 'Delete' }}
          </Button>
          <div v-else />
          <div class="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              :disabled="saving || deleting"
              @click="cancel"
            >
              {{ mode === 'edit' ? 'Cancel' : 'Discard' }}
            </Button>
            <Button
              type="button"
              :disabled="saving || deleting"
              @click="save"
            >
              {{ saving ? 'Saving…' : 'Save' }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import AnnotationColorPicker from './AnnotationColorPicker.vue';
import AnnotationStrokePicker from './AnnotationStrokePicker.vue';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { loadAnnotationColor, saveAnnotationColor, DEFAULT_ANNOTATION_COLOR } from '@/lib/annotationColors';
import {
  DEFAULT_ANNOTATION_STROKE_WIDTH,
  loadStoredAnnotationStrokeWidth,
  storeAnnotationStrokeWidth,
  normalizeAnnotationStrokeWidth,
} from '@rtidb/shared/annotationStroke';
import { ANNOTATION_VISIBILITIES, ANNOTATION_VISIBILITY_LABELS, type AnnotationVisibility } from '@rtidb/shared/annotations';

const props = defineProps({
  open: { type: Boolean, default: false },
  saving: { type: Boolean, default: false },
  deleting: { type: Boolean, default: false },
  mode: { type: String, default: 'create' },
  initialColor: { type: String, default: '' },
  initialStrokeWidth: { type: Number, default: undefined },
  initialLabel: { type: String, default: '' },
  initialVisibility: { type: String, default: 'private' },
});

const emit = defineEmits(['save', 'cancel', 'delete']);

const noteText = ref('');
const selectedColor = ref(loadAnnotationColor());
const selectedStrokeWidth = ref(loadStoredAnnotationStrokeWidth());
const selectedVisibility = ref<AnnotationVisibility>('private');
const inputRef = ref<{ $el?: HTMLTextAreaElement } | null>(null);

const visibilityOptions = ANNOTATION_VISIBILITIES.map((value) => ({
  value,
  label: ANNOTATION_VISIBILITY_LABELS[value],
  hint: value === 'private'
    ? 'Only you'
    : value === 'team'
      ? 'Researchers'
      : 'Everyone',
}));

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    noteText.value = props.initialLabel || '';
    selectedColor.value = props.initialColor || loadAnnotationColor();
    selectedStrokeWidth.value = props.initialStrokeWidth == null
      ? (props.mode === 'edit' ? DEFAULT_ANNOTATION_STROKE_WIDTH : loadStoredAnnotationStrokeWidth())
      : normalizeAnnotationStrokeWidth(props.initialStrokeWidth);
    selectedVisibility.value = (props.initialVisibility as AnnotationVisibility) || 'private';
    nextTick(() => inputRef.value?.$el?.focus());
  }
});

function onVisibilityChange(value: string | string[] | undefined) {
  if (typeof value === 'string' && value) selectedVisibility.value = value as AnnotationVisibility;
}

function save() {
  saveAnnotationColor(selectedColor.value);
  storeAnnotationStrokeWidth(selectedStrokeWidth.value);
  emit('save', {
    label: noteText.value.trim(),
    color: selectedColor.value || DEFAULT_ANNOTATION_COLOR,
    strokeWidth: selectedStrokeWidth.value || DEFAULT_ANNOTATION_STROKE_WIDTH,
    visibility: selectedVisibility.value,
  });
}

function cancel() {
  emit('cancel');
}

function remove() {
  emit('delete');
}
</script>
