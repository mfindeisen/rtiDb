<template>
  <li>
    <div
      class="rounded-lg border p-3"
      :class="depth > 0
        ? 'border-sky-200/70 dark:border-sky-500/20 bg-sky-50/40 dark:bg-sky-500/[0.06]'
        : 'border-sky-200/80 dark:border-sky-500/20 bg-white/70 dark:bg-white/[0.03]'"
    >
      <template v-if="editingId === node.comment.id">
        <Textarea
          :model-value="editBody"
          rows="3"
          class="text-sm w-full"
          @update:model-value="$emit('update:edit-body', String($event ?? ''))"
        />
        <div class="flex gap-2 mt-2">
          <Button type="button" size="sm" :disabled="saving" @click="$emit('save-edit', node.comment.id)">
            Save
          </Button>
          <Button type="button" variant="ghost" size="sm" @click="$emit('cancel-edit')">
            Cancel
          </Button>
        </div>
      </template>
      <template v-else>
        <blockquote
          v-if="quotedParent"
          class="mb-2.5 rounded-md border-l-2 border-sky-400/80 dark:border-sky-400/50 bg-slate-50/80 dark:bg-white/[0.04] px-3 py-2"
        >
          <p class="text-[10px] font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            Replying to {{ quotedParent.username }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 whitespace-pre-wrap line-clamp-3 mt-0.5">
            {{ quotedParent.body }}
          </p>
        </blockquote>

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
          <Button
            type="button"
            variant="ghost"
            size="xs"
            class="text-slate-500"
            @click="$emit('reply', node.comment.id)"
          >
            Reply
          </Button>
          <template v-if="node.comment.userId === currentUserId">
            <Button
              type="button"
              variant="ghost"
              size="xs"
              class="text-slate-500"
              @click="$emit('edit', node.comment)"
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              class="text-slate-500 hover:text-destructive"
              @click="$emit('delete', node.comment.id)"
            >
              Delete
            </Button>
          </template>
        </div>
      </template>
    </div>

    <div
      v-if="replyToId === node.comment.id || node.replies.length"
      class="mt-3 ml-2 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-sky-300/70 dark:border-sky-500/35 space-y-3"
    >
      <form
        v-if="replyToId === node.comment.id"
        class="rounded-lg border border-dashed border-sky-300/80 dark:border-sky-500/30 bg-sky-50/50 dark:bg-sky-500/[0.05] p-3 space-y-2"
        @submit.prevent="$emit('submit-reply')"
      >
        <blockquote class="rounded-md border-l-2 border-sky-400/80 dark:border-sky-400/50 px-3 py-1.5">
          <p class="text-[10px] font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            Replying to {{ node.comment.username }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 whitespace-pre-wrap line-clamp-3 mt-0.5">
            {{ node.comment.body }}
          </p>
        </blockquote>
        <Textarea
          :model-value="replyBody"
          rows="3"
          class="text-sm w-full"
          :placeholder="`Reply to ${node.comment.username}…`"
          :disabled="saving"
          @update:model-value="$emit('update:reply-body', String($event ?? ''))"
        />
        <div class="flex gap-2">
          <Button type="submit" size="sm" :disabled="saving || !replyBody.trim()">
            {{ saving ? 'Posting…' : 'Post reply' }}
          </Button>
          <Button type="button" variant="ghost" size="sm" @click="$emit('cancel-reply')">
            Cancel
          </Button>
        </div>
      </form>

      <ul v-if="node.replies.length" class="space-y-3">
        <CommentThreadItem
          v-for="child in node.replies"
          :key="child.comment.id"
          :node="child"
          :quoted-parent="node.comment"
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
    </div>
  </li>
</template>

<script setup lang="ts">
import { formatCatalogDateTime } from '@rtidb/shared';
import type { RecordComment } from '@rtidb/shared/api/comments';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export interface CommentNode {
  comment: RecordComment;
  replies: CommentNode[];
}

withDefaults(defineProps<{
  node: CommentNode;
  quotedParent?: RecordComment | null;
  depth?: number;
  currentUserId: number | null;
  replyToId: number | null;
  replyBody: string;
  editingId: number | null;
  editBody: string;
  saving: boolean;
}>(), {
  quotedParent: null,
  depth: 0,
});

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
