import type { Component } from 'vue';
import { FilePlus, Layers, Sparkles, Upload } from '@lucide/vue';
import { hasPermission } from '@/composables/useAuth';
import type { SegmentOption } from '@/components/SegmentPills.vue';

export const directionOptions: SegmentOption[] = [
  { value: 'ltr', label: 'LTR' },
  { value: 'rtl', label: 'RTL' },
];

export const directionOptionsLong: SegmentOption[] = [
  { value: 'ltr', label: 'Left to Right (LTR)' },
  { value: 'rtl', label: 'Right to Left (RTL)' },
];

export const uploadModeOptions: SegmentOption[] = [
  { value: 'standard', label: 'Standard RTI', icon: Layers as Component },
  { value: 'neural', label: 'Neural RTI', icon: Sparkles as Component },
];

export function recordsPanelOptions(): SegmentOption[] {
  const opts: SegmentOption[] = [];
  if (hasPermission('edit_record')) {
    opts.push({ value: 'create', label: 'Create Record', icon: FilePlus as Component });
  }
  if (hasPermission('upload_rti')) {
    opts.push({ value: 'upload', label: 'Upload RTI', icon: Upload as Component });
  }
  return opts;
}
