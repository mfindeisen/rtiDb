<template>
  <div
    class="space-y-4"
    :class="embedded ? '' : 'p-4 bg-violet-50/80 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 rounded-xl'"
  >
    <div class="flex items-center justify-between gap-2">
      <h4 class="section-label flex items-center gap-2 mb-0">
        <StickyNote class="w-3.5 h-3.5" /> Private Research Notes
      </h4>
      <span class="text-[10px] font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
        Only visible to you
      </span>
    </div>

    <p v-if="!canCollaborate" class="text-xs text-slate-500 dark:text-slate-400">
      <router-link to="/login" class="text-blue-600 dark:text-blue-400 hover:underline">Sign in</router-link>
      as a researcher to add private notes to this record.
    </p>

    <template v-else>
      <form class="space-y-2" @submit.prevent="saveNewNote">
        <textarea
          v-model="newNoteBody"
          rows="3"
          class="form-input text-sm resize-y min-h-[72px]"
          placeholder="Observation, reference, hypothesis…"
          :disabled="saving"
        />
        <div class="flex items-center gap-2">
          <button type="submit" class="btn-primary text-xs px-3 py-1.5" :disabled="saving || !newNoteBody.trim()">
            {{ saving ? 'Saving…' : 'Add note' }}
          </button>
          <p v-if="formError" class="text-xs text-red-600 dark:text-red-400">{{ formError }}</p>
        </div>
      </form>

      <div v-if="loading" class="text-xs text-slate-500 dark:text-slate-400 py-2">Loading notes…</div>
      <div v-else-if="notes.length === 0" class="text-xs text-slate-500 dark:text-slate-400 py-1">
        No notes yet for this record.
      </div>
      <ul v-else class="space-y-3" :class="embedded ? '' : 'max-h-80 overflow-y-auto [scrollbar-gutter:stable]'">
        <li
          v-for="note in notes"
          :key="note.id"
          class="rounded-lg border border-violet-200/80 dark:border-violet-500/20 bg-white/70 dark:bg-white/[0.03] p-3"
        >
          <template v-if="editingId === note.id">
            <textarea v-model="editBody" rows="3" class="form-input text-sm w-full resize-y" />
            <div class="flex gap-2 mt-2">
              <button type="button" class="btn-primary text-xs px-2.5 py-1" @click="saveEdit(note.id)">Save</button>
              <button type="button" class="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1" @click="cancelEdit">Cancel</button>
            </div>
          </template>
          <template v-else>
            <p class="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{{ note.body }}</p>
            <div class="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200/80 dark:border-white/5">
              <time class="text-[10px] font-mono text-slate-400">{{ formatNoteDate(note.updatedAt || note.createdAt) }}</time>
              <div class="flex gap-1">
                <button type="button" class="text-[10px] font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 px-1.5 py-0.5" @click="startEdit(note)">Edit</button>
                <button type="button" class="text-[10px] font-semibold text-slate-500 hover:text-red-600 dark:hover:text-red-400 px-1.5 py-0.5" @click="removeNote(note.id)">Delete</button>
              </div>
            </div>
          </template>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { StickyNote } from '@lucide/vue';
import { authHeaders, canCollaborate as checkCanCollaborate } from '../lib/auth.js';
import { formatCatalogDateTime } from '../lib/metadataFields.js';

const props = defineProps({
  recordId: { type: [Number, String], required: true },
  recordSlug: { type: String, default: '' },
  embedded: { type: Boolean, default: false },
});

const canCollaborate = ref(checkCanCollaborate());
const notes = ref([]);
const loading = ref(false);
const saving = ref(false);
const formError = ref('');
const newNoteBody = ref('');
const editingId = ref(null);
const editBody = ref('');

const recordKey = () => props.recordSlug || props.recordId;

const formatNoteDate = (iso) => formatCatalogDateTime(iso);

async function fetchNotes() {
  if (!canCollaborate.value) return;
  loading.value = true;
  formError.value = '';
  try {
    const res = await fetch(`/api/records/${recordKey()}/notes`, { headers: authHeaders() });
    if (res.status === 401 || res.status === 403) {
      canCollaborate.value = false;
      return;
    }
    if (!res.ok) throw new Error('Failed to load notes');
    notes.value = await res.json();
  } catch (err) {
    formError.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function saveNewNote() {
  if (!newNoteBody.value.trim()) return;
  saving.value = true;
  formError.value = '';
  try {
    const res = await fetch(`/api/records/${recordKey()}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ body: newNoteBody.value.trim() }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to save note');
    }
    const created = await res.json();
    notes.value.unshift(created);
    newNoteBody.value = '';
  } catch (err) {
    formError.value = err.message;
  } finally {
    saving.value = false;
  }
}

function startEdit(note) {
  editingId.value = note.id;
  editBody.value = note.body;
}

function cancelEdit() {
  editingId.value = null;
  editBody.value = '';
}

async function saveEdit(noteId) {
  if (!editBody.value.trim()) return;
  saving.value = true;
  formError.value = '';
  try {
    const res = await fetch(`/api/records/${recordKey()}/notes/${noteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ body: editBody.value.trim() }),
    });
    if (!res.ok) throw new Error('Failed to update note');
    const data = await res.json();
    const idx = notes.value.findIndex((n) => n.id === noteId);
    if (idx >= 0) {
      notes.value[idx] = { ...notes.value[idx], body: editBody.value.trim(), updatedAt: data.updatedAt };
    }
    cancelEdit();
  } catch (err) {
    formError.value = err.message;
  } finally {
    saving.value = false;
  }
}

async function removeNote(noteId) {
  if (!window.confirm('Delete this note?')) return;
  try {
    const res = await fetch(`/api/records/${recordKey()}/notes/${noteId}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete note');
    notes.value = notes.value.filter((n) => n.id !== noteId);
  } catch (err) {
    formError.value = err.message;
  }
}

onMounted(fetchNotes);
watch(() => props.recordId, fetchNotes);
</script>
