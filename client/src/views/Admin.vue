<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
      <Button variant="ghost" class="justify-start sm:justify-center" @click="$router.push('/')">
        <ArrowLeft class="w-4 h-4 mr-2" /> Back to Gallery
      </Button>
      <Button variant="ghost" class="text-destructive hover:text-destructive justify-start sm:justify-center" @click="logout">
        Logout
      </Button>
    </div>

    <Tabs v-model="activeTab" @update:model-value="onTabChange">
      <TabsList v-if="userRole === 'admin'" class="mb-6 w-full grid grid-cols-2 h-auto gap-1 p-1 sm:w-auto sm:inline-flex">
        <TabsTrigger value="records" class="gap-1.5 text-xs sm:text-sm"><FolderOpen class="w-4 h-4 shrink-0" /> Records & Upload</TabsTrigger>
        <TabsTrigger value="users" class="gap-1.5 text-xs sm:text-sm"><Users class="w-4 h-4 shrink-0" /> User Management</TabsTrigger>
      </TabsList>

      <TabsContent value="records" :class="(hasPermission('upload_rti') || hasPermission('edit_record')) ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-start' : 'max-w-3xl mx-auto space-y-6'">
      <FancyCard v-if="hasPermission('upload_rti') || hasPermission('edit_record')">
        <CardContent class="pt-6">
        <SegmentPills
          v-model="panelMode"
          class="mb-6"
          full-width
          :options="panelOptions"
        />

        <div v-if="panelMode === 'create' && hasPermission('edit_record')">
          <h2 class="section-heading mb-2">Create Catalog Record</h2>
          <p class="section-sub mb-6">Create a record with metadata first. Upload the RTI scan file later from the records list.</p>

          <form @submit.prevent="createRecord" class="space-y-6">
            <div class="flex flex-col text-left">
              <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Record Name</Label>
              <Input v-model="createName" required class="form-input !px-4 !py-3" :disabled="isCreating" />
            </div>
            <div class="flex flex-col text-left">
              <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Description</Label>
              <Textarea v-model="createDescription" rows="3" class="form-input !px-4 !py-3" :disabled="isCreating" :dir="createDirection" />
              <SegmentPills v-model="createDirection" class="mt-2" :options="directionOptions" />
            </div>
            <button type="submit" class="btn-primary w-full" :disabled="isCreating">
              {{ isCreating ? 'Creating...' : 'Create Record' }}
            </button>
          </form>
          <InfoCallout v-if="createError" variant="error" class="mt-4">{{ createError }}</InfoCallout>
          <InfoCallout v-if="createSuccess" variant="success" class="mt-4">{{ createSuccess }}</InfoCallout>
        </div>

        <div v-else-if="panelMode === 'upload' && hasPermission('upload_rti')">
        <h2 class="section-heading mb-2">Upload RTI Scan</h2>
        <p class="section-sub mb-4">Upload a .rti, .ptm or .hsh file. Attach to an existing draft record or create a new one in one step.</p>

        <InfoCallout v-if="uploadTargetId" variant="warn" class="mb-6">
          Uploading RTI for: <strong>{{ uploadTargetName }}</strong>
          <template #action>
            <button type="button" class="text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline shrink-0" @click="clearUploadTarget">Clear</button>
          </template>
        </InfoCallout>
        
        <form @submit.prevent="uploadFile" class="space-y-6">
          <div v-if="!uploadTargetId" class="flex flex-col text-left">
            <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Scan Name</Label>
            <Input v-model="name" required class="form-input !px-4 !py-3" :disabled="isUploading" />
          </div>

          <div v-if="!uploadTargetId" class="flex flex-col text-left">
            <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Description</Label>
            <Textarea v-model="description" rows="3" placeholder="Additional details about the scan..." class="form-input !px-4 !py-3" :disabled="isUploading" :dir="direction" />
            <SegmentPills v-model="direction" class="mt-2" :options="directionOptionsLong" :disabled="isUploading" />
          </div>

          <div v-if="!uploadTargetId && draftRecords.length" class="flex flex-col text-left">
            <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Attach to existing draft (optional)</Label>
            <select v-model="attachDraftId" class="form-input py-2 cursor-pointer text-sm" :disabled="isUploading">
              <option value="">— New record —</option>
              <option v-for="d in draftRecords" :key="d.id" :value="String(d.id)">{{ d.name }}</option>
            </select>
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
                <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200 md:hidden">Latent Map Image (.png, .jpg, .jpeg)</Label>
                <Label class="mb-2 font-medium text-slate-700 dark:text-slate-200 hidden md:block">Latent Map Image (.png, .jpg, .jpeg)</Label>
                <FilePicker
                  ref="latentMapInputRef"
                  :file-name="selectedLatentMapName"
                  accept="image/png,image/jpeg,image/jpg"
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
            <div class="format-toggle">
              <button
                type="button"
                @click="outputType = 'geotiff'"
                :disabled="isUploading"
                :class="['format-toggle-btn', outputType === 'geotiff' ? 'active-geotiff' : 'inactive']"
              >
                <span class="flex items-center gap-2"><Map class="w-4 h-4" /> GeoTIFF <span class="text-[10px] font-normal opacity-70">(Modern)</span></span>
                <span class="text-[11px] font-normal opacity-70">Single file, HTTP Range Requests, no legacy tiler</span>
              </button>
              <button
                type="button"
                @click="outputType = 'tiles'"
                :disabled="isUploading"
                :class="['format-toggle-btn border-l border-slate-200 dark:border-white/10', outputType === 'tiles' ? 'active-tiles' : 'inactive']"
              >
                <span class="flex items-center gap-2"><Layers class="w-4 h-4" /> Tile Folder <span class="text-[10px] font-normal opacity-70">(Legacy)</span></span>
                <span class="text-[11px] font-normal opacity-70">Hundreds of JPEG/PNG tiles + info.xml</span>
              </button>
            </div>
          </div>

          <div v-if="uploadMode === 'standard'" class="pt-4 border-t border-slate-200 dark:border-white/10">
            <h3 class="text-lg font-medium text-slate-800 dark:text-white mb-4">Advanced Settings</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex flex-col text-left">
                <Label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Quality ({{ quality }}%)</Label>
                <input type="range" v-model="quality" min="10" max="100" class="w-full mt-2 accent-blue-600" :disabled="isUploading" />
              </div>
              <div class="flex flex-col text-left">
                <Label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Tile Size</Label>
                <select v-model="tileSize" class="form-input py-1.5 cursor-pointer" :disabled="isUploading">
                  <option :value="128">128px</option>
                  <option :value="256">256px</option>
                  <option :value="512">512px</option>
                  <option :value="1024">1024px</option>
                </select>
              </div>
              <div class="flex flex-col text-left">
                <Label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Image Format</Label>
                <select v-model="format" class="form-input py-1.5 cursor-pointer" :disabled="isUploading">
                  <option value="jpg">JPG (Smaller)</option>
                  <option value="png">PNG (Lossless)</option>
                  <option value="webp">WebP (Modern)</option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="isUploading" class="upload-progress-box">
            <div class="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-200">
              <span>Uploading scan file to server...</span>
              <span class="font-bold text-blue-600 dark:text-blue-400">{{ uploadProgress }}%</span>
            </div>
            <div class="w-full h-2 bg-slate-200 dark:bg-black/30 rounded-full overflow-hidden">
              <div class="h-full bg-blue-500 transition-all duration-100" :style="{ width: uploadProgress + '%' }" />
            </div>
            <div class="flex justify-between text-[11px] text-blue-500/80 dark:text-blue-400/70 pt-1.5 border-t border-blue-100 dark:border-blue-800/30 mt-1">
              <span>Speed: {{ uploadSpeed || 'Calculating...' }}</span>
              <span>ETA: {{ uploadETA || 'Calculating...' }}</span>
            </div>
          </div>

          <button type="submit" class="btn-primary w-full mt-4" :disabled="isUploading">
            {{ isUploading ? 'Uploading to Server...' : (uploadTargetId || attachDraftId ? 'Upload RTI to Record' : 'Upload & Start Processing') }}
          </button>
        </form>

        <InfoCallout v-if="error" variant="error" class="mt-4">{{ error }}</InfoCallout>
        </div>
        </CardContent>
      </FancyCard>

      <FancyCard>
        <CardContent class="pt-6">
        <h2 class="section-heading mb-4">Manage Records</h2>

        <InfoCallout
          v-if="userRole === 'admin'"
          variant="info"
          title="AI auto-annotation (prototype)"
          dismiss-key="admin-auto-annotate"
          class="mb-6"
        >
          <p>
            Runs <strong>OWL-ViT</strong> zero-shot detection on the catalog thumbnail (CPU, ~200–400&nbsp;MB extra RAM).
            Looks for figures, animals, symbols, and inscriptions. If nothing is detected, falls back to catalog metadata as a labeled region.
          </p>
          <p class="mt-1.5 text-xs opacity-85">
            Annotations are saved as <span class="font-semibold text-violet-600 dark:text-violet-300">purple AI marks</span> on your account.
            Quality on ancient sealings may be limited — use offline GPU batch processing if this is not good enough.
            Max 5 runs per hour.
          </p>
        </InfoCallout>

        <div v-if="loadingRecords" class="text-center text-slate-500 dark:text-slate-400 py-8">Loading records...</div>
        <div v-else-if="records.length === 0" class="text-center text-slate-500 dark:text-slate-400 py-8">No records found.</div>

        <div v-else class="space-y-4">
          <div v-for="rec in records" :key="rec.id" class="metadata-field p-4 text-left">
            <div v-if="editingId === rec.id" class="space-y-4">
              <div class="space-y-3 p-3 rounded-lg border border-slate-200/70 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03]">
                <h4 class="text-sm font-semibold text-slate-800 dark:text-white">Basic Information</h4>
                <Input v-model="editName" placeholder="Name" class="form-input" />
                <Textarea v-model="editDescription" rows="2" placeholder="Description" class="form-input" :dir="editDirection" />
                <SegmentPills v-model="editDirection" :options="directionOptions" />
              </div>

              <div class="p-3 rounded-lg border border-slate-200/70 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03]">
                <h4 class="text-sm font-semibold text-slate-800 dark:text-white mb-3">Catalog Metadata</h4>
                <div class="max-h-[60vh] overflow-y-auto pr-1">
                  <MetadataForm v-model="editMetadata" :text-direction="editDirection" :open-sections="['identification', 'archaeological', 'physical']" />
                </div>
              </div>

              <div class="flex gap-2">
                <button type="button" class="btn-primary px-5 py-2" @click="saveEdit(rec.id)">Save</button>
                <Button variant="outline" @click="cancelEdit">Cancel</Button>
              </div>
            </div>

            <div v-else>
              <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div class="flex gap-4 items-start flex-1 min-w-0">
                <div v-if="rec.thumbnailUrl" class="w-20 h-20 shrink-0 bg-slate-100 dark:bg-black/30 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10">
                  <img :src="rec.thumbnailUrl" alt="Thumbnail" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-20 h-20 shrink-0 bg-slate-100 dark:bg-black/30 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400">
                  <ImageIcon class="w-8 h-8 opacity-50" />
                </div>

                <div class="flex-grow min-w-0">
                  <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 class="text-xl font-bold truncate text-slate-800 dark:text-white">{{ rec.name }}</h3>
                    <span v-if="rec.status === 'done'" class="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">Ready</span>
                    <span v-if="autoAnnotateState[rec.id]?.running" class="text-xs font-bold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 animate-pulse">AI running</span>
                    <span v-else-if="rec.status === 'draft'" class="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">Draft</span>
                    <span v-else-if="rec.status === 'processing'" class="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 animate-pulse">Processing</span>
                    <span v-else class="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400">Error</span>
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono flex items-center gap-1">
                    <CalendarIcon class="w-3.5 h-3.5" />
                    {{ new Date(rec.date).toLocaleString() }}
                  </div>
                  <p class="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2" :dir="rec.direction">{{ rec.description }}</p>
                </div>
              </div>

              <div class="flex items-center gap-1 shrink-0">
                <button v-if="rec.status === 'draft' && hasPermission('upload_rti')" type="button" class="record-action-btn text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10" @click="startUploadForRecord(rec)" title="Upload RTI">
                  <Upload class="w-4 h-4" />
                </button>
                <button v-if="rec.status === 'done' && hasPermission('edit_record')" type="button" class="record-action-btn text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10" @click="togglePublish(rec)" :title="rec.isPublished ? 'Unpublish' : 'Publish'">
                  {{ rec.isPublished ? 'Unpublish' : 'Publish' }}
                </button>
                <button v-if="rec.status === 'error' && hasPermission('upload_rti')" type="button" class="record-action-btn text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10" @click="rerunRecord(rec.id)" title="Rerun">
                  <RefreshCw class="w-4 h-4" />
                </button>
                <button v-if="userRole === 'admin' && rec.status === 'done' && rec.thumbnailUrl" type="button" class="record-action-btn text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10" :disabled="!!autoAnnotateState[rec.id]?.running" @click="runAutoAnnotate(rec, false)" title="AI auto-annotate (prototype)">
                  <Sparkles class="w-4 h-4" :class="autoAnnotateState[rec.id]?.running ? 'animate-spin' : ''" />
                </button>
                <button v-if="hasPermission('edit_record')" type="button" class="record-action-btn text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10" @click="startEdit(rec)" title="Edit">
                  <Pencil class="w-4 h-4" />
                </button>
                <button v-if="hasPermission('delete_record')" type="button" class="record-action-btn text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10" @click="deleteRecord(rec.id)" title="Delete">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div v-if="rec.status === 'processing'" class="mt-4 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 space-y-2">
              <div class="w-full h-2 bg-slate-200 dark:bg-black/30 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 transition-all duration-300" :style="{ width: (rec.progress || 0) + '%' }" />
              </div>
              <div class="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                <span class="italic truncate">{{ rec.message || 'Initializing...' }}</span>
                <span class="font-semibold ml-3">{{ rec.progress || 0 }}%</span>
              </div>
              <div class="flex justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-blue-100 dark:border-blue-900/30 pt-2">
                <span>Elapsed: {{ getElapsed(rec) }}</span>
                <span>ETA: {{ getETA(rec) }}</span>
              </div>
            </div>

            <div v-if="autoAnnotateState[rec.id]" class="mt-3 p-3 rounded-lg border text-sm" :class="autoAnnotatePanelClass(rec.id)">
              <div v-if="autoAnnotateState[rec.id].running" class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin shrink-0" />
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-violet-900 dark:text-violet-100">{{ autoAnnotateState[rec.id].message }}</p>
                    <p v-if="autoAnnotateState[rec.id].startedAt" class="text-xs opacity-75 mt-0.5">
                      Elapsed: {{ getAutoAnnotateElapsed(rec.id) }}
                    </p>
                  </div>
                  <span class="text-xs font-bold font-mono tabular-nums text-violet-700 dark:text-violet-300 shrink-0">
                    {{ autoAnnotateProgress(rec.id) }}%
                  </span>
                </div>

                <div class="w-full h-2.5 bg-slate-200/80 dark:bg-black/30 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700 ease-out"
                    :class="autoAnnotateState[rec.id].phase === 'detecting' ? 'animate-pulse' : ''"
                    :style="{ width: `${autoAnnotateProgress(rec.id)}%` }"
                  />
                </div>

                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="step in autoAnnotateSteps(rec.id)"
                    :key="step.id"
                    class="text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-colors"
                    :class="step.active
                      ? 'bg-violet-200/80 dark:bg-violet-500/25 border-violet-300 dark:border-violet-500/50 text-violet-800 dark:text-violet-200'
                      : step.done
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'"
                  >
                    {{ step.label }}
                  </span>
                </div>
              </div>

              <template v-else>
                <p>{{ autoAnnotateState[rec.id].message }}</p>
                <button
                  v-if="autoAnnotateState[rec.id]?.canRetry"
                  type="button"
                  class="btn-secondary mt-2 !py-1.5 !px-3 text-xs"
                  @click="runAutoAnnotate(rec, true)"
                >
                  Replace AI annotations &amp; re-run
                </button>
              </template>
            </div>

            <div v-if="rec.status === 'done'" class="mt-2 text-right">
              <router-link :to="recordPath(rec)" class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">View Record →</router-link>
            </div>
            <div v-else-if="rec.status === 'draft'" class="mt-2 text-right">
              <router-link :to="recordPath(rec)" class="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:underline">View catalog entry →</router-link>
            </div>
            </div>
          </div>
        </div>
        </CardContent>
      </FancyCard>
      </TabsContent>

      <TabsContent v-if="userRole === 'admin'" value="users">
      <FancyCard class="text-left">
        <CardHeader class="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Accounts</CardTitle>
            <CardDescription>Create and manage access credentials and permission roles.</CardDescription>
          </div>
          <Button @click="openAddUser">Add User</Button>
        </CardHeader>
        <CardContent class="space-y-6">

        <div v-if="showUserForm" class="surface-panel p-6 space-y-4">
          <h3 class="text-lg font-bold">
            {{ editingUserId ? 'Edit User Credentials' : 'Create New User Account' }}
          </h3>
          <form @submit.prevent="saveUser" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label>Username</Label>
                <Input v-model="userForm.username" required placeholder="e.g. johndoe" />
              </div>
              <div class="space-y-2">
                <Label>Password {{ editingUserId ? '(leave blank to keep current)' : '' }}</Label>
                <Input v-model="userForm.password" type="password" :required="!editingUserId" placeholder="••••••••" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label>Role</Label>
                <Select v-model="userForm.role">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor (Custom Permissions)</SelectItem>
                    <SelectItem value="researcher">Researcher (Private notes &amp; collaboration)</SelectItem>
                    <SelectItem value="admin">Administrator (All Permissions)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div v-if="userForm.role === 'editor'" class="space-y-2">
                <Label>Granted Permissions</Label>
                <div class="space-y-2">
                  <label class="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox v-model="permUploadRti" />
                    <span>Upload RTI scans & rerun failed jobs</span>
                  </label>
                  <label class="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox v-model="permEditRecord" />
                    <span>Edit records details / publish status</span>
                  </label>
                  <label class="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox v-model="permDeleteRecord" />
                    <span>Delete records</span>
                  </label>
                </div>
              </div>

              <div v-else-if="userForm.role === 'researcher'" class="space-y-2">
                <Label>Researcher access</Label>
                <p class="text-xs text-muted-foreground leading-relaxed">
                  Can sign in to add private notes, annotations (coming soon), and scholarly comments on catalog records. No upload or admin access.
                </p>
              </div>
            </div>

            <Alert v-if="userFormError" variant="destructive">
              <AlertDescription>{{ userFormError }}</AlertDescription>
            </Alert>

            <div class="flex gap-2 justify-end">
              <Button type="submit">{{ editingUserId ? 'Save Changes' : 'Create User' }}</Button>
              <Button type="button" variant="outline" @click="closeUserForm">Cancel</Button>
            </div>
          </form>
        </div>

        <div class="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="u in usersList" :key="u.id">
                <TableCell class="font-semibold">{{ u.username }}</TableCell>
                <TableCell>
                  <Badge :variant="u.role === 'admin' ? 'default' : u.role === 'researcher' ? 'outline' : 'secondary'">{{ u.role }}</Badge>
                </TableCell>
                <TableCell>
                  <span v-if="u.role === 'admin'" class="text-xs text-muted-foreground">All permissions</span>
                  <span v-else-if="u.role === 'researcher'" class="text-xs text-muted-foreground">Private notes &amp; collaboration</span>
                  <span v-else-if="u.permissions.length === 0" class="text-xs text-muted-foreground">None (read-only)</span>
                  <div v-else class="flex flex-wrap gap-1">
                    <Badge v-for="p in u.permissions" :key="p" variant="outline" class="text-xs">{{ p }}</Badge>
                  </div>
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex gap-1 justify-end">
                    <Button variant="ghost" size="icon" @click="editUser(u)" title="Edit User">
                      <Pencil class="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" class="text-destructive hover:text-destructive" @click="deleteUser(u)" title="Delete User">
                      <Trash2 class="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        </CardContent>
      </FancyCard>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Pencil, Trash2, ArrowLeft, Image as ImageIcon, Calendar as CalendarIcon, Map, Layers, RefreshCw, ExternalLink, FolderOpen, Users, FilePlus, Upload, Sparkles } from '@lucide/vue';
import FancyCard from '../components/FancyCard.vue';
import InfoCallout from '../components/InfoCallout.vue';
import FilePicker from '../components/FilePicker.vue';
import SegmentPills from '../components/SegmentPills.vue';
import MetadataForm from '../components/MetadataForm.vue';
import { recordPath } from '../lib/recordPath.js';
import { normalizeMetadata, emptyMetadata } from '../lib/metadataFields.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const API = import.meta.env.VITE_API_URL || '';

const router = useRouter();

// --- Auth helpers ---
const getToken = () => localStorage.getItem('adminToken');

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});

// Parse role & permissions out of the stored JWT payload
function parseTokenPayload() {
  const token = getToken();
  if (!token) return {};
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return {};
  }
}

const userRole = ref(parseTokenPayload().role || 'editor');
const userPermissions = ref(parseTokenPayload().permissions || []);

const hasPermission = (perm) => {
  if (userRole.value === 'admin') return true;
  return userPermissions.value.includes(perm);
};

// --- Tab state (only relevant for admins) ---
const activeTab = ref('records');

const logout = () => {
  localStorage.removeItem('adminToken');
  router.push('/login');
};

// --- Panel mode ---
const panelMode = ref(hasPermission('edit_record') ? 'create' : 'upload');

const panelOptions = computed(() => {
  const opts = [];
  if (hasPermission('edit_record')) {
    opts.push({ value: 'create', label: 'Create Record', icon: FilePlus });
  }
  if (hasPermission('upload_rti')) {
    opts.push({ value: 'upload', label: 'Upload RTI', icon: Upload });
  }
  return opts;
});

const directionOptions = [
  { value: 'ltr', label: 'LTR' },
  { value: 'rtl', label: 'RTL' },
];

const directionOptionsLong = [
  { value: 'ltr', label: 'Left to Right (LTR)' },
  { value: 'rtl', label: 'Right to Left (RTL)' },
];

const uploadModeOptions = [
  { value: 'standard', label: 'Standard RTI', icon: Layers },
  { value: 'neural', label: 'Neural RTI', icon: Sparkles },
];

// --- Create record state ---
const createName = ref('');
const createDescription = ref('');
const createDirection = ref('ltr');
const isCreating = ref(false);
const createError = ref('');
const createSuccess = ref('');

// --- Upload State ---
const uploadTargetId = ref(null);
const uploadTargetName = ref('');
const attachDraftId = ref('');
const name = ref('');
const description = ref('');
const direction = ref('ltr');
const fileInputRef = ref(null);

const quality = ref(90);
const tileSize = ref(256);
const format = ref('jpg');
const outputType = ref('geotiff'); // 'geotiff' | 'tiles'
const uploadMode = ref('standard'); // 'standard' | 'neural'
const latentMapInputRef = ref(null);
const weightsInputRef = ref(null);

const selectedFileName = ref('');
const selectedLatentMapName = ref('');
const selectedWeightsName = ref('');

const onFileChange = (e) => {
  const file = e.target.files[0];
  selectedFileName.value = file ? file.name : '';
};
const onLatentMapChange = (e) => {
  const file = e.target.files[0];
  selectedLatentMapName.value = file ? file.name : '';
};
const onWeightsChange = (e) => {
  const file = e.target.files[0];
  selectedWeightsName.value = file ? file.name : '';
};

const isUploading = ref(false);
const uploadProgress = ref(0);
const uploadSpeed = ref('');
const uploadETA = ref('');
const uploadStartTime = ref(null);
const error = ref('');

// --- Records Management State ---
const records = ref([]);
const autoAnnotateState = ref({});
let autoAnnotatePollTimer = null;

function clearAutoAnnotatePoll() {
  if (autoAnnotatePollTimer) {
    clearTimeout(autoAnnotatePollTimer);
    autoAnnotatePollTimer = null;
  }
}

function autoAnnotateSleep(ms) {
  return new Promise((resolve) => {
    autoAnnotatePollTimer = setTimeout(resolve, ms);
  });
}

function phaseLabel(phase, status, position) {
  if (status === 'queued') {
    return position > 1 ? `In queue — position ${position}` : 'Waiting for server worker…';
  }
  if (phase === 'prepare') return 'Preparing thumbnail…';
  if (phase === 'loading') return 'Loading OWL-ViT model…';
  if (phase === 'detecting') return 'Detecting figures & symbols…';
  if (phase === 'metadata') return 'Using catalog metadata fallback…';
  if (phase === 'done') return 'Saving annotations…';
  return 'Processing…';
}

const AUTO_ANNOTATE_PROGRESS = {
  queued: 12,
  prepare: 18,
  loading: 38,
  detecting: 68,
  metadata: 86,
  done: 100,
};

function autoAnnotateProgress(recordId) {
  const s = autoAnnotateState.value[recordId];
  if (!s) return 0;
  if (!s.running) return s.error ? 100 : 100;
  if (s.status === 'queued') return AUTO_ANNOTATE_PROGRESS.queued;
  return AUTO_ANNOTATE_PROGRESS[s.phase] ?? 25;
}

function autoAnnotateSteps(recordId) {
  const s = autoAnnotateState.value[recordId];
  const status = s?.status;
  const phase = s?.phase || '';
  const running = !!s?.running;

  const queuedDone = status !== 'queued' && running;
  const loadingActive = phase === 'loading' || phase === 'prepare';
  const loadingDone = ['detecting', 'metadata', 'done'].includes(phase) || !running;
  const detectingActive = phase === 'detecting';
  const detectingDone = ['metadata', 'done'].includes(phase) || !running;
  const savingActive = phase === 'metadata' || phase === 'done';
  const savingDone = !running && !s?.error && s?.message;

  return [
    { id: 'queue', label: 'Queued', active: status === 'queued', done: queuedDone },
    { id: 'model', label: 'Load model', active: loadingActive, done: loadingDone && !loadingActive },
    { id: 'detect', label: 'Detect', active: detectingActive, done: detectingDone && !detectingActive },
    { id: 'save', label: 'Save', active: savingActive && running, done: !!savingDone },
  ];
}

function autoAnnotatePanelClass(recordId) {
  const s = autoAnnotateState.value[recordId];
  if (!s) return '';
  if (s.running) {
    return 'border-violet-300 dark:border-violet-500/40 bg-violet-50/60 dark:bg-violet-500/10 text-violet-900 dark:text-violet-100';
  }
  if (s.error) {
    return 'border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-500/10 text-red-700 dark:text-red-300';
  }
  return 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200';
}

function getAutoAnnotateElapsed(recordId) {
  const started = autoAnnotateState.value[recordId]?.startedAt;
  if (!started) return '—';
  const sec = Math.floor((now.value - started) / 1000);
  if (sec < 60) return `${sec}s`;
  return `${Math.floor(sec / 60)}m ${sec % 60}s`;
}

async function pollAutoAnnotateJob(recordId, jobId) {
  while (autoAnnotateState.value[recordId]?.running) {
    const res = await fetch(`${API}/api/records/${recordId}/auto-annotate/jobs/${jobId}`, {
      headers: authHeaders(),
    });
    if (res.status === 401) return logout();
    if (!res.ok) throw new Error('Lost track of auto-annotation job');
    const data = await res.json();

    if (data.status === 'queued' || data.status === 'processing') {
      autoAnnotateState.value[recordId] = {
        ...autoAnnotateState.value[recordId],
        running: true,
        status: data.status,
        phase: data.phase || autoAnnotateState.value[recordId]?.phase,
        position: data.position || 0,
        message: phaseLabel(data.phase, data.status, data.position),
      };
    }

    if (data.status === 'done') {
      const methods = (data.methods || []).join(', ') || 'none';
      autoAnnotateState.value[recordId] = {
        running: false,
        status: 'done',
        phase: 'done',
        message: data.created
          ? `Created ${data.created} AI annotation(s) via ${methods}. Open the record viewer to review (purple marks).`
          : (data.error || 'Finished but created no annotations.'),
        canRetry: true,
        error: !data.created,
        startedAt: autoAnnotateState.value[recordId]?.startedAt,
      };
      return;
    }

    if (data.status === 'error') {
      autoAnnotateState.value[recordId] = {
        running: false,
        status: 'error',
        phase: 'error',
        message: data.error || 'Auto-annotation failed',
        error: true,
        canRetry: true,
        startedAt: autoAnnotateState.value[recordId]?.startedAt,
      };
      return;
    }

    await autoAnnotateSleep(900);
  }
}

async function runAutoAnnotate(rec, replace = false) {
  if (!window.confirm(
    replace
      ? 'Replace your existing AI annotations and re-run? This uses significant CPU/RAM on the server.'
      : 'Run AI auto-annotation on this thumbnail? This uses significant CPU/RAM on the server (prototype).'
  )) return;

  clearAutoAnnotatePoll();
  autoAnnotateState.value[rec.id] = {
    running: true,
    status: 'queued',
    phase: 'queued',
    position: 0,
    message: 'Starting…',
    startedAt: Date.now(),
  };

  try {
    const res = await fetch(`${API}/api/records/${rec.id}/auto-annotate`, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ replace }),
    });
    if (res.status === 401) return logout();
    if (res.status === 429) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Rate limit exceeded');
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Could not start auto-annotation');
    }
    const data = await res.json();
    await pollAutoAnnotateJob(rec.id, data.jobId);
  } catch (err) {
    autoAnnotateState.value[rec.id] = {
      running: false,
      message: err.message || 'Auto-annotation failed',
      error: true,
      canRetry: true,
    };
  } finally {
    autoAnnotateState.value[rec.id] = {
      ...autoAnnotateState.value[rec.id],
      running: false,
    };
    clearAutoAnnotatePoll();
  }
}

const loadingRecords = ref(true);
const editingId = ref(null);
const editName = ref('');
const editDescription = ref('');
const editDirection = ref('ltr');
const editMetadata = ref(emptyMetadata());

const draftRecords = computed(() => records.value.filter((r) => r.status === 'draft'));

const startUploadForRecord = (rec) => {
  uploadTargetId.value = rec.id;
  uploadTargetName.value = rec.name;
  attachDraftId.value = '';
  panelMode.value = 'upload';
  error.value = '';
};

const clearUploadTarget = () => {
  uploadTargetId.value = null;
  uploadTargetName.value = '';
  attachDraftId.value = '';
};

const createRecord = async () => {
  isCreating.value = true;
  createError.value = '';
  createSuccess.value = '';
  try {
    const res = await fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({
        name: createName.value,
        description: createDescription.value,
        direction: createDirection.value,
      }),
    });
    if (res.status === 401) return logout();
    if (!res.ok) {
      createError.value = await res.text() || 'Failed to create record.';
      return;
    }
    const data = await res.json();
    createSuccess.value = `Record #${data.id} created. You can add metadata and upload RTI when ready.`;
    createName.value = '';
    createDescription.value = '';
    createDirection.value = 'ltr';
    await fetchRecords();
    if (hasPermission('upload_rti')) {
      const rec = records.value.find((r) => r.id === data.id);
      if (rec) startUploadForRecord(rec);
    }
  } catch (err) {
    createError.value = err.message || 'Network error.';
  } finally {
    isCreating.value = false;
  }
};

const formatSpeed = (bytesPerSec) => {
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

const formatUploadETA = (seconds) => {
  if (seconds === Infinity || isNaN(seconds) || seconds < 0) return '--:--';
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s.toString().padStart(2, '0')}s`;
};



let eventSource = null;

const setupSSE = () => {
  if (eventSource) return;
  eventSource = new EventSource('/api/progress');
  
  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      

      // Update List Progress State
      const targetRecord = records.value.find(r => r.id === data.id);
      if (targetRecord) {
        if (data.message) {
          targetRecord.message = data.message;
        }
        if (data.progress === -1) {
          targetRecord.status = 'error';
        } else {
          targetRecord.status = data.progress >= 100 ? 'done' : 'processing';
          targetRecord.progress = data.progress;
          if (data.progress >= 100 && targetRecord.status !== 'done') {
            fetchRecords(); // Refresh to get folder url once done
          }
        }
      }

    } catch(e) {
      console.error("SSE parse error", e);
    }
  };
};

const fetchRecords = async () => {
  try {
    const res = await fetch('/api/records');
    if (res.ok) {
      records.value = await res.json();
    }
  } catch (err) {
    console.error("Failed to load records", err);
  } finally {
    loadingRecords.value = false;
  }
};

const now = ref(Date.now());
let timer = null;

const formatTime = (ms) => {
  if (!ms || ms < 0 || ms === Infinity) return '--:--';
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}m ${s.toString().padStart(2, '0')}s`;
};

const getElapsed = (rec) => {
  const startTime = new Date(rec.date).getTime();
  return formatTime(now.value - startTime);
};

const getETA = (rec) => {
  if (!rec.progress || rec.progress <= 0) return 'Calculating...';
  const startTime = new Date(rec.date).getTime();
  const elapsed = now.value - startTime;
  const totalEstimated = elapsed / (rec.progress / 100);
  const remaining = totalEstimated - elapsed;
  return formatTime(remaining);
};

onMounted(() => {
  fetchRecords();
  setupSSE();
  timer = setInterval(() => { now.value = Date.now(); }, 1000);
});

onUnmounted(() => {
  if (eventSource) {
    eventSource.close();
  }
  if (timer) clearInterval(timer);
  clearAutoAnnotatePoll();
});

const uploadFile = async () => {
  const isNeural = uploadMode.value === 'neural';
  const targetId = uploadTargetId.value || attachDraftId.value || null;

  let file = null;
  let latentMapFile = null;
  let weightsFile = null;

  if (isNeural) {
    latentMapFile = latentMapInputRef.value?.inputRef?.files?.[0] ?? null;
    weightsFile = weightsInputRef.value?.inputRef?.files?.[0] ?? null;
    if (!latentMapFile || !weightsFile) {
      error.value = 'Both latent map image and weights JSON files are required.';
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

  const formData = new FormData();
  if (!targetId) {
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('direction', direction.value);
  }
  formData.append('uploadMode', uploadMode.value);

  if (isNeural) {
    formData.append('latentMap', latentMapFile);
    formData.append('weights', weightsFile);
  } else {
    formData.append('quality', quality.value);
    formData.append('tileSize', tileSize.value);
    formData.append('format', format.value);
    formData.append('outputType', outputType.value);
    formData.append('file', file);
  }

  const uploadUrl = targetId ? `/api/records/${targetId}/upload` : '/api/upload';

  try {
    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl);
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('adminToken')}`);
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          uploadProgress.value = percentComplete;

          const elapsedMs = Date.now() - uploadStartTime.value;
          if (elapsedMs > 0) {
            const speed = event.loaded / (elapsedMs / 1000);
            uploadSpeed.value = formatSpeed(speed);
            
            if (speed > 0) {
              const remainingBytes = event.total - event.loaded;
              const etaSec = remainingBytes / speed;
              uploadETA.value = formatUploadETA(etaSec);
            } else {
              uploadETA.value = 'Calculating...';
            }
          }
        }
      };

      xhr.onload = () => {
        if (xhr.status === 401) {
          logout();
          reject(new Error("Unauthorized"));
          return;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(xhr.responseText || `Upload failed (Status ${xhr.status})`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Upload failed (Network error)"));
      };

      xhr.send(formData);
    });

    isUploading.value = false;
    resetForm();
    clearUploadTarget();

    await fetchRecords();
  } catch (err) {
    if (err.message !== "Unauthorized") {
      error.value = err.message;
    }
    isUploading.value = false;
  }
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

// --- Management Functions ---

const startEdit = (rec) => {
  editingId.value = rec.id;
  editName.value = rec.name;
  editDescription.value = rec.description;
  editDirection.value = rec.direction || 'ltr';
  editMetadata.value = normalizeMetadata(rec.metadata);
};

const cancelEdit = () => {
  editingId.value = null;
};

const saveEdit = async (id) => {
  try {
    const res = await fetch(`/api/records/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify({
        name: editName.value,
        description: editDescription.value,
        direction: editDirection.value,
        metadata: editMetadata.value,
      })
    });
    if (res.status === 401) return logout();
    if (res.ok) {
      const data = await res.json();
      const rec = records.value.find(r => r.id === id);
      if (rec) {
        rec.name = editName.value;
        rec.description = editDescription.value;
        rec.direction = editDirection.value;
        rec.metadata = data.metadata || editMetadata.value;
      }
      editingId.value = null;
    }
  } catch (err) {
    console.error("Failed to edit record", err);
  }
};

const deleteRecord = async (id) => {
  if (!window.confirm("Are you sure you want to completely delete this record and its massive folder from the server? This cannot be undone.")) return;
  
  try {
    const res = await fetch(`/api/records/${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
    if (res.status === 401) return logout();
    if (res.ok) {
      records.value = records.value.filter(r => r.id !== id);
    } else {
      alert("Failed to delete record.");
    }
  } catch (err) {
    console.error("Failed to delete record", err);
  }
};

const togglePublish = async (rec) => {
  const newPublishedState = !rec.isPublished;
  try {
    const res = await fetch(`/api/records/${rec.id}/publish`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify({ is_published: newPublishedState })
    });
    if (res.status === 401) return logout();
    if (res.ok) {
      rec.isPublished = newPublishedState ? 1 : 0;
    }
  } catch (err) {
    console.error("Failed to toggle publish status", err);
  }
};

const rerunRecord = async (id) => {
  try {
    const res = await fetch(`/api/records/${id}/rerun`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
    if (res.status === 401) return logout();
    if (res.ok) {
      const rec = records.value.find(r => r.id === id);
      if (rec) {
        rec.status = 'processing';
        rec.progress = 0;
        rec.message = 'Rerun requested...';
      }
    } else {
      const text = await res.text();
      alert("Failed to rerun record: " + text);
    }
  } catch (err) {
    console.error("Failed to rerun record", err);
  }
};

// --- User Management (Admin only) ---
const usersList = ref([]);
const showUserForm = ref(false);
const editingUserId = ref(null);
const userFormError = ref('');
const userForm = ref({ username: '', password: '', role: 'editor', permissions: [] });

const RESEARCHER_PERMISSIONS = ['private_notes', 'annotate', 'comment'];

function togglePermission(perm, enabled) {
  const next = userForm.value.permissions.filter((p) => p !== perm);
  if (enabled) next.push(perm);
  userForm.value.permissions = next;
}

const permUploadRti = computed({
  get: () => userForm.value.permissions.includes('upload_rti'),
  set: (v) => togglePermission('upload_rti', v),
});
const permEditRecord = computed({
  get: () => userForm.value.permissions.includes('edit_record'),
  set: (v) => togglePermission('edit_record', v),
});
const permDeleteRecord = computed({
  get: () => userForm.value.permissions.includes('delete_record'),
  set: (v) => togglePermission('delete_record', v),
});

const fetchUsers = async () => {
  try {
    const res = await fetch('/api/users', { headers: authHeaders() });
    if (res.status === 401) return logout();
    if (res.ok) {
      usersList.value = await res.json();
    }
  } catch (err) {
    console.error('Failed to load users', err);
  }
};

const openAddUser = () => {
  editingUserId.value = null;
  userForm.value = { username: '', password: '', role: 'editor', permissions: [] };
  userFormError.value = '';
  showUserForm.value = true;
};

const editUser = (u) => {
  editingUserId.value = u.id;
  userForm.value = { username: u.username, password: '', role: u.role, permissions: [...u.permissions] };
  userFormError.value = '';
  showUserForm.value = true;
};

const closeUserForm = () => {
  showUserForm.value = false;
  editingUserId.value = null;
  userFormError.value = '';
};

const saveUser = async () => {
  userFormError.value = '';
  try {
    const body = {
      username: userForm.value.username,
      password: userForm.value.password,
      role: userForm.value.role,
      permissions:
        userForm.value.role === 'editor'
          ? userForm.value.permissions
          : userForm.value.role === 'researcher'
            ? RESEARCHER_PERMISSIONS
            : [],
    };

    const url = editingUserId.value ? `/api/users/${editingUserId.value}` : '/api/users';
    const method = editingUserId.value ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body),
    });

    if (res.status === 401) return logout();
    if (res.ok) {
      await fetchUsers();
      closeUserForm();
    } else {
      const msg = await res.text();
      userFormError.value = msg || 'Failed to save user.';
    }
  } catch (err) {
    userFormError.value = 'Network error. Please try again.';
  }
};

const deleteUser = async (u) => {
  if (!window.confirm(`Delete user "${u.username}"? This action cannot be undone.`)) return;
  try {
    const res = await fetch(`/api/users/${u.id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.status === 401) return logout();
    if (res.ok) {
      usersList.value = usersList.value.filter(x => x.id !== u.id);
    } else {
      const msg = await res.text();
      alert('Failed to delete user: ' + msg);
    }
  } catch (err) {
    console.error('Failed to delete user', err);
  }
};

// Fetch users list when tab is opened (admin only)
const onTabChange = async (tab) => {
  if (tab === 'users' && userRole.value === 'admin') {
    await fetchUsers();
  }
};
</script>
