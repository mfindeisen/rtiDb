<template>
  <div>
    <h2 class="section-heading mb-2">Upload RTI Scan</h2>
    <p class="section-sub mb-4">Upload a .rti, .ptm or .hsh file. Attach to an existing draft record or create a new one in one step.</p>

    <InfoCallout v-if="uploadTargetId" variant="warn" class="mb-6">
      Uploading RTI for: <strong>{{ uploadTargetName }}</strong>
      <template #action>
        <Button type="button" variant="link" size="xs" class="text-amber-700 dark:text-amber-300 h-auto px-0" @click="$emit('clear-target')">Clear</Button>
      </template>
    </InfoCallout>

    <form class="space-y-6" @submit.prevent="uploadFile">
      <div v-if="!uploadTargetId" class="flex flex-col text-left">
        <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Scan Name</Label>
        <Input v-model="name" required :disabled="isUploading" />
      </div>

      <div v-if="!uploadTargetId" class="flex flex-col text-left">
        <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Description</Label>
        <Textarea v-model="description" rows="3" placeholder="Additional details about the scan..." :disabled="isUploading" :dir="direction" />
        <SegmentPills v-model="direction" class="mt-2" :options="directionOptionsLong" :disabled="isUploading" />
      </div>

      <div v-if="!uploadTargetId && draftRecords.length" class="flex flex-col text-left">
        <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Attach to existing draft (optional)</Label>
        <Select :model-value="attachDraftId || '__new__'" :disabled="isUploading" @update:model-value="onAttachDraftChange">
          <SelectTrigger class="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__new__">— New record —</SelectItem>
            <SelectItem v-for="d in draftRecords" :key="d.id" :value="String(d.id)">{{ d.name }}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="flex flex-col text-left">
        <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Upload Type</Label>
        <SegmentPills v-model="uploadMode" :options="uploadModeOptions" :disabled="isUploading" />
      </div>

      <div v-if="uploadMode === 'standard'" class="flex flex-col text-left">
        <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">RTI File (.rti, .ptm, .hsh)</Label>
        <FilePicker
          ref="fileInputRef"
          :file-name="selectedFileName"
          accept=".ptm,.hsh,.rti"
          required
          :disabled="isUploading"
          @change="onFileChange"
        />
      </div>

      <div v-else class="space-y-4 text-left">
        <InfoCallout variant="info" dismiss-key="admin-neural-rti">
          Neural RTI requires pre-generated compressed files from the training pipeline. See the documentation for details:
          <div class="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
            <a href="/docs/guide/neural-rti.html" target="_blank" rel="noopener" class="doc-link">
              <ExternalLink class="w-3.5 h-3.5" /> Getting Started Guide
            </a>
            <a href="/docs/technical/neural-rti.html" target="_blank" rel="noopener" class="doc-link">
              <ExternalLink class="w-3.5 h-3.5" /> Technical Reference
            </a>
          </div>
        </InfoCallout>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200 md:hidden">Latent Map Image (.png)</Label>
            <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200 hidden md:block">Latent Map Image (.png)</Label>
            <FilePicker
              ref="latentMapInputRef"
              :file-name="selectedLatentMapName"
              accept="image/png,.png"
              required
              :disabled="isUploading"
              @change="onLatentMapChange"
            />
          </div>
          <div class="flex flex-col">
            <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Decoder Weights (.json)</Label>
            <FilePicker
              ref="weightsInputRef"
              :file-name="selectedWeightsName"
              accept="application/json,.json"
              required
              :disabled="isUploading"
              @change="onWeightsChange"
            />
          </div>
        </div>
      </div>

      <div v-if="uploadMode === 'standard'" class="flex flex-col text-left">
        <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Output Format</Label>
        <ToggleGroup
          type="single"
          variant="outline"
          class="w-full"
          :model-value="outputType"
          :disabled="isUploading"
          @update:model-value="onOutputTypeChange"
        >
          <ToggleGroupItem value="geotiff" class="flex-1 h-auto min-h-16 flex-col items-start gap-0.5 py-3 whitespace-normal data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
            <span class="flex items-center gap-2"><Map class="w-4 h-4" /> GeoTIFF <span class="text-[10px] font-normal opacity-70">(Modern)</span></span>
            <span class="text-[11px] font-normal opacity-70 text-left">Single file, HTTP Range Requests, no legacy tiler</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="tiles" class="flex-1 h-auto min-h-16 flex-col items-start gap-0.5 py-3 whitespace-normal">
            <span class="flex items-center gap-2"><Layers class="w-4 h-4" /> Tile Folder <span class="text-[10px] font-normal opacity-70">(Legacy)</span></span>
            <span class="text-[11px] font-normal opacity-70 text-left">Hundreds of JPEG/PNG tiles + info.xml</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div v-if="uploadMode === 'standard' && outputType === 'tiles'" class="pt-4 border-t border-slate-200 dark:border-white/10">
        <h3 class="text-lg font-medium text-slate-800 dark:text-white mb-1">Advanced Settings</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Only applies to Tile Folder output (JPEG, PNG, or WebP tiles via rtiprep).</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex flex-col text-left">
            <Label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Quality ({{ quality }}%)</Label>
            <Slider
              class="mt-3"
              :model-value="[Number(quality)]"
              :min="10"
              :max="100"
              :step="1"
              :disabled="isUploading || format === 'png'"
              @update:model-value="onQualityChange"
            />
          </div>
          <div class="flex flex-col text-left">
            <Label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Tile Size</Label>
            <Select :model-value="String(tileSize)" :disabled="isUploading" @update:model-value="onTileSizeChange">
              <SelectTrigger class="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="128">128px</SelectItem>
                <SelectItem value="256">256px</SelectItem>
                <SelectItem value="512">512px</SelectItem>
                <SelectItem value="1024">1024px</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col text-left">
            <Label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Image Format</Label>
            <Select :model-value="format" :disabled="isUploading" @update:model-value="onFormatChange">
              <SelectTrigger class="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jpg">JPG (Smaller)</SelectItem>
                <SelectItem value="png">PNG (Lossless)</SelectItem>
                <SelectItem value="webp">WebP (Modern)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div v-if="isUploading" class="upload-progress-box">
        <div class="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-200">
          <span>Uploading scan file to server...</span>
          <span class="font-bold text-blue-600 dark:text-blue-400">{{ uploadProgress }}%</span>
        </div>
        <Progress :model-value="uploadProgress" class="h-2" />
        <div class="flex justify-between text-[11px] text-blue-500/80 dark:text-blue-400/70 pt-1.5 border-t border-blue-100 dark:border-blue-800/30 mt-1">
          <span>Speed: {{ uploadSpeed || 'Calculating...' }}</span>
          <span>ETA: {{ uploadETA || 'Calculating...' }}</span>
        </div>
      </div>

      <Button type="submit" class="w-full mt-4" :disabled="isUploading">
        {{ isUploading ? 'Uploading to Server...' : (uploadTargetId || attachDraftId ? 'Upload RTI to Record' : 'Upload & Start Processing') }}
      </Button>
    </form>

    <InfoCallout v-if="error" variant="error" class="mt-4">{{ error }}</InfoCallout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ExternalLink, Map, Layers } from '@lucide/vue';
import InfoCallout from '@/components/InfoCallout.vue';
import FilePicker from '@/components/FilePicker.vue';
import SegmentPills from '@/components/SegmentPills.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { uploadRtiResumable } from '@/api/uploads';
import { directionOptionsLong, uploadModeOptions } from '@/components/admin/adminFormOptions';
import type { RecordRow } from '@rtidb/shared/api/records';

type FilePickerExpose = { inputRef?: HTMLInputElement | null };

const props = defineProps<{
  uploadTargetId: number | null;
  uploadTargetName: string;
  draftRecords: RecordRow[];
  createTypeId: string;
  handleUnauthorized: (err: unknown) => boolean;
  fetchRecords: () => Promise<void>;
  pollProcessingFallback: () => Promise<void>;
}>();

const emit = defineEmits<{
  'clear-target': [];
}>();

const attachDraftId = defineModel<string>('attachDraftId', { required: true });

const name = ref('');
const description = ref('');
const direction = ref('ltr');
const fileInputRef = ref<FilePickerExpose | null>(null);
const quality = ref(90);
const tileSize = ref(256);
const format = ref('jpg');
const outputType = ref('geotiff');
const uploadMode = ref('standard');
const latentMapInputRef = ref<FilePickerExpose | null>(null);
const weightsInputRef = ref<FilePickerExpose | null>(null);
const selectedFileName = ref('');
const selectedLatentMapName = ref('');
const selectedWeightsName = ref('');
const isUploading = ref(false);
const uploadProgress = ref(0);
const uploadSpeed = ref('');
const uploadETA = ref('');
const uploadStartTime = ref<number | null>(null);
const error = ref('');

function onOutputTypeChange(value: string | string[] | undefined) {
  if (typeof value === 'string' && value) outputType.value = value;
}

function onAttachDraftChange(value: unknown) {
  attachDraftId.value = !value || value === '__new__' ? '' : String(value);
}

function onTileSizeChange(value: unknown) {
  if (value) tileSize.value = Number(value);
}

function onFormatChange(value: unknown) {
  if (typeof value === 'string') format.value = value;
}

function onQualityChange(value: number[] | undefined) {
  if (value?.[0] != null) quality.value = value[0];
}

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  selectedFileName.value = file ? file.name : '';
};
const onLatentMapChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  selectedLatentMapName.value = file ? file.name : '';
};
const onWeightsChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  selectedWeightsName.value = file ? file.name : '';
};

const formatSpeed = (bytesPerSec: number) => {
  if (bytesPerSec === Infinity || isNaN(bytesPerSec) || bytesPerSec <= 0) return '0 B/s';
  const units = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
  let index = 0;
  let speed = bytesPerSec;
  while (speed >= 1024 && index < units.length - 1) {
    speed /= 1024;
    index++;
  }
  return `${speed.toFixed(1)} ${units[index]}`;
};

const formatUploadETA = (seconds: number) => {
  if (seconds === Infinity || isNaN(seconds) || seconds < 0) return '--:--';
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s.toString().padStart(2, '0')}s`;
};

const resetForm = () => {
  name.value = '';
  description.value = '';
  direction.value = 'ltr';
  if (fileInputRef.value?.inputRef) fileInputRef.value.inputRef.value = '';
  if (latentMapInputRef.value?.inputRef) latentMapInputRef.value.inputRef.value = '';
  if (weightsInputRef.value?.inputRef) weightsInputRef.value.inputRef.value = '';
  selectedFileName.value = '';
  selectedLatentMapName.value = '';
  selectedWeightsName.value = '';
  isUploading.value = false;
  uploadProgress.value = 0;
  uploadSpeed.value = '';
  uploadETA.value = '';
  error.value = '';
};

const uploadFile = async () => {
  const isNeural = uploadMode.value === 'neural';
  const targetId = props.uploadTargetId || attachDraftId.value || null;

  let file: File | null = null;
  let latentMapFile: File | null = null;
  let weightsFile: File | null = null;

  if (isNeural) {
    latentMapFile = latentMapInputRef.value?.inputRef?.files?.[0] ?? null;
    weightsFile = weightsInputRef.value?.inputRef?.files?.[0] ?? null;
    if (!latentMapFile || !weightsFile) {
      error.value = 'Both latent map image and weights JSON files are required.';
      return;
    }
    if (!latentMapFile.name.toLowerCase().endsWith('.png')) {
      error.value = 'Neural latent maps must be PNG. JPEG drops the 4th channel.';
      return;
    }
  } else {
    file = fileInputRef.value?.inputRef?.files?.[0] ?? null;
    if (!file) {
      error.value = 'Please choose an RTI file.';
      return;
    }
  }

  if (!targetId && !name.value) {
    error.value = 'Name is required for new records.';
    return;
  }

  isUploading.value = true;
  uploadProgress.value = 0;
  uploadSpeed.value = '';
  uploadETA.value = '';
  uploadStartTime.value = Date.now();
  error.value = '';

  const totalBytes = isNeural
    ? (latentMapFile?.size ?? 0) + (weightsFile?.size ?? 0)
    : (file?.size ?? 0);

  const onUploadProgress = (percentComplete: number) => {
    uploadProgress.value = percentComplete;
    const loaded = (percentComplete / 100) * totalBytes;
    const elapsedMs = Date.now() - (uploadStartTime.value ?? 0);
    if (elapsedMs > 0) {
      const speed = loaded / (elapsedMs / 1000);
      uploadSpeed.value = formatSpeed(speed);
      if (speed > 0) {
        const remainingBytes = totalBytes - loaded;
        uploadETA.value = formatUploadETA(remainingBytes / speed);
      } else {
        uploadETA.value = 'Calculating...';
      }
    }
  };

  try {
    await uploadRtiResumable({
      recordId: targetId ? Number(targetId) : undefined,
      name: targetId ? undefined : name.value,
      description: targetId ? undefined : description.value,
      direction: targetId ? undefined : direction.value,
      recordTypeId: !targetId && props.createTypeId ? Number(props.createTypeId) : undefined,
      uploadMode: uploadMode.value === 'neural' ? 'neural' : 'standard',
      outputType: isNeural ? undefined : outputType.value,
      quality: !isNeural && outputType.value === 'tiles' ? quality.value : undefined,
      tileSize: !isNeural && outputType.value === 'tiles' ? tileSize.value : undefined,
      format: !isNeural && outputType.value === 'tiles' ? format.value : undefined,
      file,
      latentMap: latentMapFile,
      weights: weightsFile,
    }, onUploadProgress);

    isUploading.value = false;
    resetForm();
    emit('clear-target');

    await props.fetchRecords();
    void props.pollProcessingFallback();
  } catch (err) {
    if (props.handleUnauthorized(err)) return;
    error.value = err instanceof Error ? err.message : 'Upload failed';
    isUploading.value = false;
  }
};
</script>
