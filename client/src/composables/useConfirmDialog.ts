import { ref, shallowRef } from 'vue';

export type ConfirmDialogVariant = 'default' | 'destructive';

export type ConfirmDialogOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
};

type PendingDialog = {
  options: Required<Pick<ConfirmDialogOptions, 'title' | 'confirmLabel' | 'cancelLabel' | 'variant'>> &
    Pick<ConfirmDialogOptions, 'description'>;
  mode: 'confirm' | 'alert';
  resolve: (value: boolean) => void;
};

const open = ref(false);
const pending = shallowRef<PendingDialog | null>(null);

function settle(result: boolean) {
  const current = pending.value;
  if (!current) return;
  const resolve = current.resolve;
  current.resolve = () => {};
  open.value = false;
  resolve(result);
}

function present(mode: 'confirm' | 'alert', options: ConfirmDialogOptions): Promise<boolean> {
  pending.value?.resolve(false);
  return new Promise((resolve) => {
    pending.value = {
      mode,
      options: {
        title: options.title,
        description: options.description,
        confirmLabel: options.confirmLabel ?? (mode === 'alert' ? 'OK' : 'Continue'),
        cancelLabel: options.cancelLabel ?? 'Cancel',
        variant: options.variant ?? (mode === 'confirm' ? 'destructive' : 'default'),
      },
      resolve,
    };
    open.value = true;
  });
}

export function confirmAction(options: ConfirmDialogOptions): Promise<boolean> {
  return present('confirm', options);
}

export function showAlert(options: ConfirmDialogOptions | string): Promise<boolean> {
  return present('alert', typeof options === 'string' ? { title: options } : options);
}

export function useConfirmDialogHost() {
  return {
    open,
    pending,
    onUpdateOpen(value: boolean) {
      if (value) {
        open.value = true;
        return;
      }
      settle(false);
    },
    confirm() {
      settle(true);
    },
    cancel() {
      settle(false);
    },
  };
}
