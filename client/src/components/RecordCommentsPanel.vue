<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-2">
      <h4 class="section-label flex items-center gap-2 mb-0">
        <MessageSquare class="w-3.5 h-3.5" /> Scholarly Discussion
      </h4>
      <span class="text-[10px] font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
        Visible to researchers
      </span>
    </div>

    <p v-if="!canComment" class="text-xs text-slate-500 dark:text-slate-400">
      <router-link to="/login" class="text-blue-600 dark:text-blue-400 hover:underline">Sign in</router-link>
      as a researcher to join the discussion on this record.
    </p>

    <template v-else>
      <form v-if="!replyToId" class="space-y-2" @submit.prevent="submitNewComment">
        <textarea
          v-model="newBody"
          rows="3"
          class="form-input text-sm resize-y min-h-[72px]"
          placeholder="Share an observation, question, or reference for other researchers…"
          :disabled="saving"
        />
        <div class="flex items-center gap-2">
          <button type="submit" class="btn-primary text-xs px-3 py-1.5" :disabled="saving || !newBody.trim()">
            {{ saving ? 'Posting…' : 'Post comment' }}
          </button>
          <p v-if="formError" class="text-xs text-red-600 dark:text-red-400">{{ formError }}</p>
        </div>
      </form>

      <div v-if="loading" class="text-xs text-slate-500 dark:text-slate-400 py-2">Loading discussion…</div>
      <div v-else-if="thread.length === 0" class="text-xs text-slate-500 dark:text-slate-400 py-1">
        No comments yet. Start the scholarly discussion for this record.
      </div>
      <ul v-else class="space-y-3">
        <CommentThreadItem
          v-for="node in thread"
          :key="node.comment.id"
          :node="node"
          :current-user-id="currentUserId"
          :reply-to-id="replyToId"
          :reply-body="replyBody"
          :editing-id="editingId"
          :edit-body="editBody"
          :saving="saving"
          @reply="startReply"
          @cancel-reply="cancelReply"
          @submit-reply="submitReply"
          @update:reply-body="replyBody = $event"
          @edit="startEdit"
          @cancel-edit="cancelEdit"
          @save-edit="saveEdit"
          @update:edit-body="editBody = $event"
          @delete="removeComment"
        />
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { MessageSquare } from '@lucide/vue';
import { canComment as checkCanComment, currentUserId as getCurrentUserId } from '@/composables/useAuth';
import type { RecordComment } from '@rtidb/shared/api/comments';
import * as commentsApi from '@/api/comments';
import { ApiError } from '@/api/client';
import CommentThreadItem, { type CommentNode } from './CommentThreadItem.vue';

const props = defineProps<{
  recordId: number | string;
  recordSlug?: string;
}>();

const canComment = ref(checkCanComment());
const currentUserId = ref(getCurrentUserId());
const comments = ref<RecordComment[]>([]);
const loading = ref(false);
const saving = ref(false);
const formError = ref('');
const newBody = ref('');
const replyToId = ref<number | null>(null);
const replyBody = ref('');
const editingId = ref<number | null>(null);
const editBody = ref('');

const recordKey = () => props.recordSlug || props.recordId;

function buildThread(items: RecordComment[]): CommentNode[] {
  const byParent = new Map<number | null, RecordComment[]>();
  for (const item of items) {
    const key = item.parentId ?? null;
    const bucket = byParent.get(key) ?? [];
    bucket.push(item);
    byParent.set(key, bucket);
  }

  function build(parentId: number | null): CommentNode[] {
    const siblings = byParent.get(parentId) ?? [];
    return siblings.map((comment) => ({
      comment,
      replies: build(comment.id),
    }));
  }

  return build(null);
}

const thread = computed(() => buildThread(comments.value));

async function fetchComments() {
  if (!canComment.value) return;
  loading.value = true;
  formError.value = '';
  try {
    comments.value = await commentsApi.listComments(recordKey());
  } catch (err) {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      canComment.value = false;
      return;
    }
    if (err instanceof ApiError) {
      try {
        const data = JSON.parse(err.body) as { error?: string };
        formError.value = data.error || 'Failed to load comments';
      } catch {
        formError.value = err.body || 'Failed to load comments';
      }
    } else {
      formError.value = err instanceof Error ? err.message : 'Failed to load comments';
    }
  } finally {
    loading.value = false;
  }
}

async function submitNewComment() {
  if (!newBody.value.trim()) return;
  saving.value = true;
  formError.value = '';
  try {
    const created = await commentsApi.createComment(recordKey(), { body: newBody.value.trim() });
    comments.value.push(created);
    newBody.value = '';
  } catch (err) {
    if (err instanceof ApiError) {
      try {
        const data = JSON.parse(err.body) as { error?: string };
        formError.value = data.error || 'Failed to post comment';
      } catch {
        formError.value = err.body || 'Failed to post comment';
      }
    } else {
      formError.value = err instanceof Error ? err.message : 'Failed to post comment';
    }
  } finally {
    saving.value = false;
  }
}

function startReply(commentId: number) {
  replyToId.value = commentId;
  replyBody.value = '';
  editingId.value = null;
  editBody.value = '';
}

function cancelReply() {
  replyToId.value = null;
  replyBody.value = '';
}

async function submitReply() {
  if (!replyToId.value || !replyBody.value.trim()) return;
  saving.value = true;
  formError.value = '';
  try {
    const created = await commentsApi.createComment(recordKey(), {
      body: replyBody.value.trim(),
      parentId: replyToId.value,
    });
    comments.value.push(created);
    cancelReply();
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to post reply';
  } finally {
    saving.value = false;
  }
}

function startEdit(comment: RecordComment) {
  editingId.value = comment.id;
  editBody.value = comment.body;
  cancelReply();
}

function cancelEdit() {
  editingId.value = null;
  editBody.value = '';
}

async function saveEdit(commentId: number) {
  if (!editBody.value.trim()) return;
  saving.value = true;
  formError.value = '';
  try {
    const data = await commentsApi.updateComment(recordKey(), commentId, editBody.value.trim());
    const idx = comments.value.findIndex((c) => c.id === commentId);
    if (idx >= 0) {
      comments.value[idx] = {
        ...comments.value[idx],
        body: editBody.value.trim(),
        updatedAt: data.updatedAt,
      };
    }
    cancelEdit();
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to update comment';
  } finally {
    saving.value = false;
  }
}

async function removeComment(commentId: number) {
  if (!window.confirm('Delete this comment? Replies will also be removed.')) return;
  try {
    await commentsApi.deleteComment(recordKey(), commentId);
    const toRemove = new Set<number>();
    const collect = (id: number) => {
      toRemove.add(id);
      comments.value.filter((c) => c.parentId === id).forEach((c) => collect(c.id));
    };
    collect(commentId);
    comments.value = comments.value.filter((c) => !toRemove.has(c.id));
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to delete comment';
  }
}

onMounted(fetchComments);
watch(() => props.recordId, fetchComments);
</script>
