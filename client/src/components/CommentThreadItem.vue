<template>
  <li class="space-y-3">
    <div
      class="rounded-lg border border-sky-200/80 dark:border-sky-500/20 bg-white/70 dark:bg-white/[0.03] p-3"
      :class="depth > 0 ? 'ml-4 sm:ml-6 border-l-2 border-l-sky-300/60 dark:border-l-sky-500/30' : ''"
    >
      <template v-if="editingId === node.comment.id">
        <textarea
          :value="editBody"
          rows="3"
          class="form-input text-sm w-full resize-y"
          @input="$emit('update:edit-body', ($event.target as HTMLTextAreaElement).value)"
        />
        <div class="flex gap-2 mt-2">
          <button type="button" class="btn-primary text-xs px-2.5 py-1" :disabled="saving" @click="$emit('save-edit', node.comment.id)">
            Save
          </button>
          <button type="button" class="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1" @click="$emit('cancel-edit')">
            Cancel
          </button>
        </div>
      </template>
      <template v-else>
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <span class="text-xs font-semibold text-sky-700 dark:text-sky-300">{{ node.comment.username }}</span>
            <span
              v-if="node.comment.userId === currentUserId"
              class="ml-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400"
            >
              you
            </span>
          </div>
          <time class="text-[10px] font-mono text-slate-400 shrink-0">{{ formatDate(node.comment.updatedAt || node.comment.createdAt) }}</time>
        </div>
        <p class="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap mt-1.5">{{ node.comment.body }}</p>
        <div class="flex gap-1 mt-2 pt-2 border-t border-slate-200/80 dark:border-white/5">
          <button
            type="button"
            class="text-[10px] font-semibold text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 px-1.5 py-0.5"
            @click="$emit('reply', node.comment.id)"
          >
            Reply
          </button>
          <template v-if="node.comment.userId === currentUserId">
            <button
              type="button"
              class="text-[10px] font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 px-1.5 py-0.5"
              @click="$emit('edit', node.comment)"
            >
              Edit
            </button>
            <button
              type="button"
              class="text-[10px] font-semibold text-slate-500 hover:text-red-600 dark:hover:text-red-400 px-1.5 py-0.5"
              @click="$emit('delete', node.comment.id)"
            >
              Delete
            </button>
          </template>
        </div>
      </template>

      <form
        v-if="replyToId === node.comment.id"
        class="space-y-2 mt-3 pt-3 border-t border-slate-200/80 dark:border-white/5"
        @submit.prevent="$emit('submit-reply')"
      >
        <textarea
          :value="replyBody"
          rows="2"
          class="form-input text-sm w-full resize-y"
          placeholder="Write a reply…"
          :disabled="saving"
          @input="$emit('update:reply-body', ($event.target as HTMLTextAreaElement).value)"
        />
        <div class="flex gap-2">
          <button type="submit" class="btn-primary text-xs px-2.5 py-1" :disabled="saving || !replyBody.trim()">
            {{ saving ? 'Posting…' : 'Post reply' }}
          </button>
          <button type="button" class="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1" @click="$emit('cancel-reply')">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <ul v-if="node.replies.length" class="space-y-3">
      <CommentThreadItem
        v-for="child in node.replies"
        :key="child.comment.id"
        :node="child"
        :depth="depth + 1"
        :current-user-id="currentUserId"
        :reply-to-id="replyToId"
        :reply-body="replyBody"
        :editing-id="editingId"
        :edit-body="editBody"
        :saving="saving"
        @reply="$emit('reply', $event)"
        @cancel-reply="$emit('cancel-reply')"
        @submit-reply="$emit('submit-reply')"
        @update:reply-body="$emit('update:reply-body', $event)"
        @edit="$emit('edit', $event)"
        @cancel-edit="$emit('cancel-edit')"
        @save-edit="$emit('save-edit', $event)"
        @update:edit-body="$emit('update:edit-body', $event)"
        @delete="$emit('delete', $event)"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { formatCatalogDateTime } from '@rtidb/shared';
import type { RecordComment } from '@rtidb/shared/api/comments';

export interface CommentNode {
  comment: RecordComment;
  replies: CommentNode[];
}

defineProps<{
  node: CommentNode;
  depth?: number;
  currentUserId: number | null;
  replyToId: number | null;
  replyBody: string;
  editingId: number | null;
  editBody: string;
  saving: boolean;
}>();

defineEmits<{
  reply: [commentId: number];
  'cancel-reply': [];
  'submit-reply': [];
  'update:reply-body': [value: string];
  edit: [comment: RecordComment];
  'cancel-edit': [];
  'save-edit': [commentId: number];
  'update:edit-body': [value: string];
  delete: [commentId: number];
}>();

const formatDate = (iso: string) => formatCatalogDateTime(iso);
</script>
