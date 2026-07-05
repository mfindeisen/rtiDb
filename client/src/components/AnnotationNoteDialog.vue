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
              ? 'Update the note and color for this mark on the image.'
              : 'Pick a color and optionally add a note. Camera and light settings are saved automatically.' }}
          </p>
        </div>

        <AnnotationColorPicker v-model="selectedColor" />

        <div class="space-y-2">
          <label for="annotation-note-text" class="text-xs font-semibold text-slate-500 dark:text-slate-400">Note (optional)</label>
          <textarea
            id="annotation-note-text"
            ref="inputRef"
            v-model="noteText"
            rows="4"
            class="form-input text-sm resize-y min-h-[96px]"
            placeholder="e.g. scratch near lower edge, possible cuneiform sign…"
            @keydown.escape="cancel"
          />
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
          <button
            v-if="mode === 'edit'"
            type="button"
            class="text-sm px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            :disabled="saving || deleting"
            @click="remove"
          >
            {{ deleting ? 'Deleting…' : 'Delete' }}
          </button>
          <div v-else />
          <div class="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
            <button
              type="button"
              class="btn-secondary text-sm px-4 py-2"
              :disabled="saving || deleting"
              @click="cancel"
            >
              {{ mode === 'edit' ? 'Cancel' : 'Discard' }}
            </button>
            <button
              type="button"
              class="btn-primary text-sm px-4 py-2"
              :disabled="saving || deleting"
              @click="save"
            >
              {{ saving ? 'Saving…' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import AnnotationColorPicker from './AnnotationColorPicker.vue';
import { loadAnnotationColor, saveAnnotationColor, DEFAULT_ANNOTATION_COLOR } from '../lib/annotationColors.js';

const props = defineProps({
  open: { type: Boolean, default: false },
  saving: { type: Boolean, default: false },
  deleting: { type: Boolean, default: false },
  mode: { type: String, default: 'create' },
  initialColor: { type: String, default: '' },
  initialLabel: { type: String, default: '' },
});

const emit = defineEmits(['save', 'cancel', 'delete']);

const noteText = ref('');
const selectedColor = ref(loadAnnotationColor());
const inputRef = ref(null);

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    noteText.value = props.initialLabel || '';
    selectedColor.value = props.initialColor || loadAnnotationColor();
    nextTick(() => inputRef.value?.focus());
  }
});

function save() {
  saveAnnotationColor(selectedColor.value);
  emit('save', {
    label: noteText.value.trim(),
    color: selectedColor.value || DEFAULT_ANNOTATION_COLOR,
  });
}

function cancel() {
  emit('cancel');
}

function remove() {
  emit('delete');
}
</script>
