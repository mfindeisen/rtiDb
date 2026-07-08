<template>
  <div class="file-picker-row">
    <input
      ref="inputRef"
      type="file"
      class="hidden"
      :accept="accept"
      :required="required"
      :disabled="disabled"
      @change="onChange"
    />
    <button
      type="button"
      class="file-picker-btn"
      :disabled="disabled"
      @click="inputRef?.click()"
    >
      <Upload class="w-3.5 h-3.5 inline-block mr-1 -mt-px" />
      Choose File
    </button>
    <span class="text-sm text-slate-500 dark:text-slate-400 truncate">
      {{ fileName || placeholder }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Upload } from '@lucide/vue';

defineProps({
  fileName: { type: String, default: '' },
  placeholder: { type: String, default: 'No file chosen' },
  accept: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['change']);

const inputRef = ref(null);

defineExpose({ inputRef });

function onChange(e) {
  emit('change', e);
}
</script>
