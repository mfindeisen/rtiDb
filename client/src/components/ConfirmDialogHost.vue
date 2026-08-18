<script setup lang="ts">
import { Info, TriangleAlert } from '@lucide/vue';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useConfirmDialogHost } from '@/composables/useConfirmDialog';

const { open, pending, onUpdateOpen, confirm, cancel } = useConfirmDialogHost();
</script>

<template>
  <AlertDialog :open="open" @update:open="onUpdateOpen">
    <AlertDialogContent v-if="pending" class="data-[size=default]:max-w-sm data-[size=default]:sm:max-w-md">
      <AlertDialogHeader>
        <AlertDialogMedia
          :class="pending.options.variant === 'destructive'
            ? 'bg-destructive/10 text-destructive'
            : 'bg-muted text-muted-foreground'"
        >
          <TriangleAlert v-if="pending.options.variant === 'destructive'" />
          <Info v-else />
        </AlertDialogMedia>
        <AlertDialogTitle>{{ pending.options.title }}</AlertDialogTitle>
        <AlertDialogDescription v-if="pending.options.description">
          {{ pending.options.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button v-if="pending.mode === 'confirm'" type="button" variant="outline" @click="cancel">
          {{ pending.options.cancelLabel }}
        </Button>
        <Button
          type="button"
          :variant="pending.options.variant === 'destructive' ? 'destructive' : 'default'"
          @click="confirm"
        >
          {{ pending.options.confirmLabel }}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
