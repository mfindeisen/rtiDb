<template>
  <div class="max-w-6xl mx-auto space-y-6">
    
    <div class="flex justify-between items-center">
      <button @click="$router.push('/')" class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft class="w-5 h-5" /> Back to Gallery
      </button>
      <button @click="logout" class="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors">
        Logout
      </button>
    </div>

    <!-- Tab switcher (Visible to admins) -->
    <div v-if="userRole === 'admin'" class="flex border-b border-slate-200 dark:border-white/10 mb-6">
      <button @click="onTabChange('records')" class="px-6 py-3 font-semibold text-sm border-b-2 transition-all outline-none cursor-pointer" :class="activeTab === 'records' ? 'border-blue-600 text-blue-600 dark:text-white dark:border-white' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'">
        Records & Upload
      </button>
      <button @click="onTabChange('users')" class="px-6 py-3 font-semibold text-sm border-b-2 transition-all outline-none cursor-pointer" :class="activeTab === 'users' ? 'border-blue-600 text-blue-600 dark:text-white dark:border-white' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'">
        User Management
      </button>
    </div>

    <!-- Tab Content: Records & Upload -->
    <div v-if="activeTab === 'records'" :class="hasPermission('upload_rti') ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-start' : 'max-w-3xl mx-auto space-y-6'">
      <!-- Upload Section (Visible only if has upload_rti permission) -->
      <div v-if="hasPermission('upload_rti')" class="glass-card">
        <h2 class="text-3xl font-semibold mb-2 text-slate-800 dark:text-white">Upload New RTI Scan</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-8 text-sm">Upload a .rti, .ptm or .hsh file. Our server will process it and build a multi-resolution pyramid for the web viewer.</p>
        
        <form @submit.prevent="uploadFile" class="space-y-6">
          <div class="flex flex-col text-left">
            <label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Scan Name</label>
            <input type="text" v-model="name" required placeholder="" class="form-input" :disabled="isUploading" />
          </div>
          
          <div class="flex flex-col text-left">
            <label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Description</label>
            <textarea v-model="description" rows="3" placeholder="Additional details about the scan..." class="form-input" :disabled="isUploading" :dir="direction"></textarea>
            
            <!-- Direction Switcher -->
            <div class="flex bg-slate-100 dark:bg-black/30 p-1 rounded-lg w-fit mt-2">
              <button type="button" @click="direction = 'ltr'" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer outline-none" :class="direction === 'ltr' ? 'bg-white dark:bg-white/10 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'" :disabled="isUploading">
                Left-to-Right (LTR)
              </button>
              <button type="button" @click="direction = 'rtl'" class="px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer outline-none" :class="direction === 'rtl' ? 'bg-white dark:bg-white/10 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'" :disabled="isUploading">
                Right-to-Left (RTL)
              </button>
            </div>
          </div>
          
          <!-- Upload Mode Switcher -->
          <div class="flex flex-col text-left">
            <label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Upload Type</label>
            <div class="flex bg-slate-100 dark:bg-black/30 p-1 rounded-lg w-fit">
              <button type="button" @click="uploadMode = 'standard'" class="px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer outline-none" :class="uploadMode === 'standard' ? 'bg-white dark:bg-white/10 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'" :disabled="isUploading">
                Standard RTI (.rti, .ptm, .hsh)
              </button>
              <button type="button" @click="uploadMode = 'neural'" class="px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer outline-none" :class="uploadMode === 'neural' ? 'bg-white dark:bg-white/10 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'" :disabled="isUploading">
                Neural RTI (Compressed)
              </button>
            </div>
          </div>

          <!-- Standard File Input -->
          <div v-if="uploadMode === 'standard'" class="flex flex-col text-left">
            <label class="mb-2 font-medium text-slate-700 dark:text-slate-200">RTI File (.rti, .ptm, .hsh)</label>
            <div class="flex items-center gap-3 form-input py-2">
              <input type="file" ref="fileInput" required accept=".ptm,.hsh,.rti" class="hidden" :disabled="isUploading" @change="onFileChange" />
              <button type="button" @click="fileInput.click()" class="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer outline-none" :disabled="isUploading">
                Choose File
              </button>
              <span class="text-sm text-slate-500 dark:text-slate-400 truncate">
                {{ selectedFileName || 'No file chosen' }}
              </span>
            </div>
          </div>

          <!-- Neural RTI File Inputs -->
          <div v-else class="space-y-2 text-left">
            <!-- Desktop Labels Row -->
            <div class="hidden md:grid grid-cols-2 gap-4">
              <label class="font-medium text-slate-700 dark:text-slate-200">Latent Map Image (.png, .jpg, .jpeg)</label>
              <label class="font-medium text-slate-700 dark:text-slate-200">Decoder Weights (.json)</label>
            </div>
            <!-- Inputs Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col">
                <label class="mb-2 font-medium text-slate-700 dark:text-slate-200 md:hidden">Latent Map Image (.png, .jpg, .jpeg)</label>
                <div class="flex items-center gap-3 form-input py-2">
                  <input type="file" ref="latentMapInput" required accept="image/png,image/jpeg,image/jpg" class="hidden" :disabled="isUploading" @change="onLatentMapChange" />
                  <button type="button" @click="latentMapInput.click()" class="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer outline-none" :disabled="isUploading">
                    Choose File
                  </button>
                  <span class="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {{ selectedLatentMapName || 'No file chosen' }}
                  </span>
                </div>
              </div>
              <div class="flex flex-col">
                <label class="mb-2 font-medium text-slate-700 dark:text-slate-200 md:hidden">Decoder Weights (.json)</label>
                <div class="flex items-center gap-3 form-input py-2">
                  <input type="file" ref="weightsInput" required accept="application/json,.json" class="hidden" :disabled="isUploading" @change="onWeightsChange" />
                  <button type="button" @click="weightsInput.click()" class="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer outline-none" :disabled="isUploading">
                    Choose File
                  </button>
                  <span class="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {{ selectedWeightsName || 'No file chosen' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Output Format Toggle (Standard Mode only) -->
          <div v-if="uploadMode === 'standard'" class="flex flex-col text-left">
            <label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Output Format</label>
            <div class="flex rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 w-full">
              <button
                type="button"
                @click="outputType = 'geotiff'"
                :disabled="isUploading"
                :class="[
                  'flex-1 py-3 px-4 text-sm font-semibold transition-all flex flex-col items-start gap-0.5 outline-none',
                  outputType === 'geotiff'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                ]"
              >
                <span class="flex items-center gap-2"><Map class="w-4 h-4" /> GeoTIFF <span class="text-[10px] font-normal opacity-70">(Modern)</span></span>
                <span class="text-[11px] font-normal opacity-70">Single file, HTTP Range Requests, no legacy tiler</span>
              </button>
              <button
                type="button"
                @click="outputType = 'tiles'"
                :disabled="isUploading"
                :class="[
                  'flex-1 py-3 px-4 text-sm font-semibold transition-all flex flex-col items-start gap-0.5 border-l border-slate-200 dark:border-white/10 outline-none',
                  outputType === 'tiles'
                    ? 'bg-slate-700 text-white dark:bg-white/20'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                ]"
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
                <label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Quality ({{ quality }}%)</label>
                <input type="range" v-model="quality" min="10" max="100" class="w-full mt-2 accent-blue-600" :disabled="isUploading" />
              </div>
              
              <div class="flex flex-col text-left">
                <label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Tile Size</label>
                <select v-model="tileSize" class="form-input py-1.5 cursor-pointer" :disabled="isUploading">
                  <option value="128">128px</option>
                  <option value="256">256px</option>
                  <option value="512">512px</option>
                  <option value="1024">1024px</option>
                </select>
              </div>
              
              <div class="flex flex-col text-left">
                <label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Image Format</label>
                <select v-model="format" class="form-input py-1.5 cursor-pointer" :disabled="isUploading">
                  <option value="jpg">JPG (Smaller)</option>
                  <option value="png">PNG (Lossless)</option>
                  <option value="webp">WebP (Modern)</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Upload Progress Bar -->
          <div v-if="isUploading" class="space-y-2 mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <div class="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-200">
              <span>Uploading scan file to server...</span>
              <span class="font-bold text-blue-600 dark:text-blue-400">{{ uploadProgress }}%</span>
            </div>
            <div class="w-full h-2 bg-slate-200 dark:bg-black/30 rounded-full overflow-hidden">
              <div class="h-full bg-blue-500 transition-all duration-100" :style="{ width: uploadProgress + '%' }"></div>
            </div>
            <div class="flex justify-between text-[11px] text-blue-500/80 dark:text-blue-400/70 pt-1.5 border-t border-blue-100 dark:border-blue-800/30 mt-1">
              <span>Speed: {{ uploadSpeed || 'Calculating...' }}</span>
              <span>ETA: {{ uploadETA || 'Calculating...' }}</span>
            </div>
          </div>

          <button type="submit" class="btn-primary w-full mt-4" :disabled="isUploading">
            {{ isUploading ? 'Uploading to Server...' : 'Upload & Start Processing' }}
          </button>
        </form>

        <div v-if="error" class="mt-4 p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 rounded-lg">
          {{ error }}
        </div>
      </div>

      <!-- Management List Section -->
      <div class="glass-card">
        <h2 class="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">Manage Records</h2>
        
        <div v-if="loadingRecords" class="text-center text-slate-500 dark:text-slate-400">Loading records...</div>
        <div v-else-if="records.length === 0" class="text-center text-slate-500 dark:text-slate-400">No records found.</div>
        
        <div v-else class="space-y-4">
          <div v-for="rec in records" :key="rec.id" class="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-white/10 text-left">
            
            <div v-if="editingId === rec.id" class="space-y-3">
              <input type="text" v-model="editName" class="form-input p-2 text-sm" placeholder="Name" />
              <textarea v-model="editDescription" class="form-input p-2 text-sm" rows="2" placeholder="Description" :dir="editDirection"></textarea>
              
              <!-- Edit Direction Switcher -->
              <div class="flex bg-slate-100 dark:bg-black/30 p-0.5 rounded-md w-fit text-xs">
                <button type="button" @click="editDirection = 'ltr'" class="px-2.5 py-1 rounded" :class="editDirection === 'ltr' ? 'bg-white dark:bg-white/10 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500'">LTR</button>
                <button type="button" @click="editDirection = 'rtl'" class="px-2.5 py-1 rounded" :class="editDirection === 'rtl' ? 'bg-white dark:bg-white/10 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500'">RTL</button>
              </div>

              <div class="flex gap-2">
                <button @click="saveEdit(rec.id)" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-sm transition-colors">Save</button>
                <button @click="cancelEdit" class="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm transition-colors">Cancel</button>
              </div>
            </div>
            
            <div v-else>
              <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              
              <div class="flex gap-4 items-start flex-1 min-w-0">
                <!-- Thumbnail -->
                <div v-if="rec.thumbnail_url" class="w-20 h-20 shrink-0 bg-slate-100 dark:bg-black/50 rounded-md overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center">
                  <img :src="rec.thumbnail_url" alt="Thumbnail" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-20 h-20 shrink-0 bg-slate-100 dark:bg-black/50 rounded-md border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400">
                  <ImageIcon class="w-8 h-8 opacity-50" />
                </div>

                <!-- Info -->
                <div class="flex-grow min-w-0">
                  <div class="flex items-center gap-3 mb-1">
                    <h3 class="text-xl font-bold text-slate-800 dark:text-white truncate">{{ rec.name }}</h3>
                    <span v-if="rec.status === 'done'" class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">Ready</span>
                    <span v-else-if="rec.status === 'processing'" class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 animate-pulse">Processing</span>
                    <span v-else class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30">Error</span>
                  </div>
                  <div class="text-xs text-slate-400 dark:text-slate-500 mb-2 font-mono flex items-center gap-1">
                    <CalendarIcon class="w-3.5 h-3.5" />
                    {{ new Date(rec.date).toLocaleString() }}
                  </div>
                  <p class="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2" :dir="rec.direction">{{ rec.description }}</p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button v-if="rec.status === 'done' && hasPermission('edit_record')" @click="togglePublish(rec)" class="text-xs px-2.5 py-1 border border-slate-300 dark:border-white/20 rounded font-semibold transition-colors outline-none cursor-pointer" :class="rec.is_published ? 'text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10' : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10'" :title="rec.is_published ? 'Unpublish' : 'Publish'">
                  {{ rec.is_published ? 'Unpublish' : 'Publish' }}
                </button>
                <button v-if="rec.status === 'error' && hasPermission('upload_rti')" @click="rerunRecord(rec.id)" class="p-1 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" title="Rerun">
                  <RefreshCw class="w-4 h-4" />
                </button>
                <button v-if="hasPermission('edit_record')" @click="startEdit(rec)" class="p-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Edit">
                  <Pencil class="w-4 h-4" />
                </button>
                <button v-if="hasPermission('delete_record')" @click="deleteRecord(rec.id)" class="p-1 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors" title="Delete">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <!-- Inline Progress Bar if processing -->
            <div v-if="rec.status === 'processing'" class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
              <div class="w-full h-2 bg-slate-200 dark:bg-black/30 rounded-full overflow-hidden mb-2">
                <div class="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300" :style="{ width: (rec.progress || 0) + '%' }"></div>
              </div>
              <div class="flex justify-between items-center text-xs mb-1.5">
                <span class="text-blue-600 dark:text-blue-400 italic truncate">{{ rec.message || 'Initializing...' }}</span>
                <span class="font-bold text-blue-700 dark:text-blue-300 ml-3">{{ rec.progress || 0 }}%</span>
              </div>
              <div class="flex justify-between text-[11px] text-blue-500/80 dark:text-blue-400/70 border-t border-blue-100 dark:border-blue-800/30 pt-1.5 mt-1">
                <span>Elapsed: {{ getElapsed(rec) }}</span>
                <span>ETA: {{ getETA(rec) }}</span>
              </div>
            </div>
            
            <div v-if="rec.status === 'done'" class="mt-2 text-right">
              <router-link :to="'/record/' + rec.id" class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline">View Viewer</router-link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <!-- Tab Content: User Management -->
  <div v-if="activeTab === 'users' && userRole === 'admin'" class="glass-card space-y-6 text-left">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-3xl font-semibold mb-2 text-slate-800 dark:text-white">User Accounts</h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Create and manage access credentials and permission roles.</p>
      </div>
      <button @click="openAddUser" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm outline-none cursor-pointer">
        Add User
      </button>
    </div>

    <!-- User Creation/Editing Form -->
    <div v-if="showUserForm" class="p-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl space-y-4">
      <h3 class="text-lg font-bold text-slate-800 dark:text-white">
        {{ editingUserId ? 'Edit User Credentials' : 'Create New User Account' }}
      </h3>
      
      <form @submit.prevent="saveUser" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="mb-1 text-sm font-medium text-slate-600 dark:text-slate-300">Username</label>
            <input type="text" v-model="userForm.username" required class="form-input p-2 text-sm" placeholder="e.g. johndoe" />
          </div>
          <div class="flex flex-col">
            <label class="mb-1 text-sm font-medium text-slate-600 dark:text-slate-300">
              Password {{ editingUserId ? '(leave blank to keep current)' : '' }}
            </label>
            <input type="password" v-model="userForm.password" :required="!editingUserId" class="form-input p-2 text-sm" placeholder="••••••••" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="mb-1 text-sm font-medium text-slate-600 dark:text-slate-300">Role</label>
            <select v-model="userForm.role" class="form-input p-2 text-sm cursor-pointer">
              <option value="editor">Editor (Custom Permissions)</option>
              <option value="admin">Administrator (All Permissions)</option>
            </select>
          </div>
          
          <!-- Permissions checkboxes (visible/relevant only if role is 'editor') -->
          <div class="flex flex-col" v-if="userForm.role === 'editor'">
            <label class="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">Granted Permissions</label>
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" v-model="userForm.permissions" value="upload_rti" class="accent-blue-600" />
                <span>Upload RTI scans & rerun failed jobs</span>
              </label>
              <label class="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" v-model="userForm.permissions" value="edit_record" class="accent-blue-600" />
                <span>Edit records details / publish status</span>
              </label>
              <label class="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" v-model="userForm.permissions" value="delete_record" class="accent-blue-600" />
                <span>Delete records</span>
              </label>
            </div>
          </div>
        </div>

        <div v-if="userFormError" class="p-3 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 rounded text-xs">
          {{ userFormError }}
        </div>

        <div class="flex gap-2 justify-end">
          <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors outline-none cursor-pointer">
            {{ editingUserId ? 'Save Changes' : 'Create User' }}
          </button>
          <button type="button" @click="closeUserForm" class="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-xs font-semibold transition-colors outline-none cursor-pointer">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Users List Table -->
    <div class="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-xl">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-white/5">
            <th class="py-3 px-4">Username</th>
            <th class="py-3 px-4">Role</th>
            <th class="py-3 px-4">Permissions</th>
            <th class="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-white/10 text-sm">
          <tr v-for="u in usersList" :key="u.id" class="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <td class="py-3.5 px-4 font-semibold text-slate-800 dark:text-white">{{ u.username }}</td>
            <td class="py-3.5 px-4">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider" :class="u.role === 'admin' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400' : 'bg-slate-100 dark:bg-slate-500/20 text-slate-700 dark:text-slate-300'">
                {{ u.role }}
              </span>
            </td>
            <td class="py-3.5 px-4">
              <div v-if="u.role === 'admin'" class="text-xs text-slate-400">All permissions granted (Bypasses checks)</div>
              <div v-else-if="u.permissions.length === 0" class="text-xs text-slate-400">None (Read-only gallery)</div>
              <div v-else class="flex flex-wrap gap-1">
                <span v-for="p in u.permissions" :key="p" class="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium">
                  {{ p }}
                </span>
              </div>
            </td>
            <td class="py-3.5 px-4 text-right">
              <div class="flex gap-2 justify-end">
                <button @click="editUser(u)" class="p-1 text-slate-500 hover:text-blue-600 transition-colors" title="Edit User">
                  <Pencil class="w-4.5 h-4.5" />
                </button>
                <button @click="deleteUser(u)" class="p-1 text-slate-500 hover:text-red-600 transition-colors" title="Delete User">
                  <Trash2 class="w-4.5 h-4.5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Pencil, Trash2, ArrowLeft, Image as ImageIcon, Calendar as CalendarIcon, Map, Layers, RefreshCw } from '@lucide/vue';

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

// --- Upload State ---
const name = ref('');
const description = ref('');
const direction = ref('ltr');
const fileInput = ref(null);

const quality = ref(90);
const tileSize = ref(256);
const format = ref('jpg');
const outputType = ref('geotiff'); // 'geotiff' | 'tiles'
const uploadMode = ref('standard'); // 'standard' | 'neural'
const latentMapInput = ref(null);
const weightsInput = ref(null);

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
const loadingRecords = ref(true);
const editingId = ref(null);
const editName = ref('');
const editDescription = ref('');
const editDirection = ref('ltr');

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
});

const uploadFile = async () => {
  const isNeural = uploadMode.value === 'neural';
  
  let file = null;
  let latentMapFile = null;
  let weightsFile = null;

  if (isNeural) {
    latentMapFile = latentMapInput.value ? latentMapInput.value.files[0] : null;
    weightsFile = weightsInput.value ? weightsInput.value.files[0] : null;
    if (!latentMapFile || !weightsFile) {
      error.value = 'Both latent map image and weights JSON files are required.';
      return;
    }
  } else {
    file = fileInput.value ? fileInput.value.files[0] : null;
    if (!file) return;
  }

  isUploading.value = true;
  uploadProgress.value = 0;
  uploadSpeed.value = '';
  uploadETA.value = '';
  uploadStartTime.value = Date.now();
  error.value = '';

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('description', description.value);
  formData.append('direction', direction.value);
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

  try {
    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload');
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
          reject(new Error(`Upload failed (Status ${xhr.status})`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Upload failed (Network error)"));
      };

      xhr.send(formData);
    });

    isUploading.value = false;
    resetForm();

    // Refresh list so the new uploading record appears at the top
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
  if (fileInput.value) fileInput.value.value = '';
  if (latentMapInput.value) latentMapInput.value.value = '';
  if (weightsInput.value) weightsInput.value.value = '';
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
      body: JSON.stringify({ name: editName.value, description: editDescription.value, direction: editDirection.value })
    });
    if (res.status === 401) return logout();
    if (res.ok) {
      const rec = records.value.find(r => r.id === id);
      if (rec) {
        rec.name = editName.value;
        rec.description = editDescription.value;
        rec.direction = editDirection.value;
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
  const newPublishedState = rec.is_published ? false : true;
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
      rec.is_published = newPublishedState ? 1 : 0;
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
      permissions: userForm.value.role === 'editor' ? userForm.value.permissions : [],
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
  activeTab.value = tab;
  if (tab === 'users' && userRole.value === 'admin') {
    await fetchUsers();
  }
};
</script>
