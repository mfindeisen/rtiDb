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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <!-- Upload Section -->
      <div class="glass-card">
      <h2 class="text-3xl font-semibold mb-2 text-slate-800 dark:text-white">Upload New RTI Scan</h2>
      <p class="text-slate-500 dark:text-slate-400 mb-8 text-sm">Upload a .rti, .ptm or .hsh file. Our server will process it and build a multi-resolution pyramid for the web viewer.</p>
      
      <form @submit.prevent="uploadFile" class="space-y-6">
        <div class="flex flex-col text-left">
          <label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Scan Name</label>
          <input type="text" v-model="name" required placeholder="" class="form-input" />
        </div>
        
        <div class="flex flex-col text-left">
          <label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Description</label>
          <textarea v-model="description" rows="3" placeholder="Additional details about the scan..." class="form-input"></textarea>
        </div>
        
        <div class="flex flex-col text-left">
          <label class="mb-2 font-medium text-slate-700 dark:text-slate-200">RTI File (.rti)</label>
          <input type="file" ref="fileInput" required accept=".ptm,.hsh,.rti" class="form-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 dark:file:bg-blue-900/50 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-200 dark:hover:file:bg-blue-800 transition-colors cursor-pointer" />
        </div>

        <div class="pt-4 border-t border-slate-200 dark:border-white/10">
          <h3 class="text-lg font-medium text-slate-800 dark:text-white mb-4">Advanced Settings</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex flex-col text-left">
              <label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Quality ({{ quality }}%)</label>
              <input type="range" v-model="quality" min="10" max="100" class="w-full mt-2 accent-blue-600" />
            </div>
            
            <div class="flex flex-col text-left">
              <label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Tile Size</label>
              <select v-model="tileSize" class="form-input py-1.5 cursor-pointer">
                <option value="128">128px</option>
                <option value="256">256px</option>
                <option value="512">512px</option>
                <option value="1024">1024px</option>
              </select>
            </div>
            
            <div class="flex flex-col text-left">
              <label class="mb-1 text-sm text-slate-600 dark:text-slate-300">Image Format</label>
              <select v-model="format" class="form-input py-1.5 cursor-pointer">
                <option value="jpg">JPG (Smaller)</option>
                <option value="png">PNG (Lossless)</option>
                <option value="webp">WebP (Modern)</option>
              </select>
            </div>
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
        <div v-for="rec in records" :key="rec.id" class="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-white/10">
          
          <div v-if="editingId === rec.id" class="space-y-3">
            <input type="text" v-model="editName" class="form-input p-2 text-sm" placeholder="Name" />
            <textarea v-model="editDescription" class="form-input p-2 text-sm" rows="2" placeholder="Description"></textarea>
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
                <p class="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{{ rec.description }}</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
                <button v-if="rec.status === 'done'" @click="togglePublish(rec)" class="text-sm px-2 py-1 border border-slate-300 dark:border-white/20 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors" :class="rec.is_published ? 'text-orange-600 dark:text-orange-400' : 'text-emerald-600 dark:text-emerald-400'" :title="rec.is_published ? 'Unpublish' : 'Publish'">
                  {{ rec.is_published ? 'Unpublish' : 'Publish' }}
                </button>
                <button @click="startEdit(rec)" class="p-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Edit">
                  <Pencil class="w-4 h-4" />
                </button>
                <button @click="deleteRecord(rec.id)" class="p-1 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors" title="Delete">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">{{ rec.description }}</p>
            
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Pencil, Trash2, ArrowLeft, Image as ImageIcon, Calendar as CalendarIcon } from '@lucide/vue';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('adminToken');
  router.push('/login');
};

// --- Upload State ---
const name = ref('');
const description = ref('');
const fileInput = ref(null);

const quality = ref(90);
const tileSize = ref(256);
const format = ref('jpg');

const isUploading = ref(false);
const error = ref('');

// --- Records Management State ---
const records = ref([]);
const loadingRecords = ref(true);
const editingId = ref(null);
const editName = ref('');
const editDescription = ref('');

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
  const file = fileInput.value.files[0];
  if (!file) return;

  isUploading.value = true;
  error.value = '';

  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('description', description.value);
  formData.append('quality', quality.value);
  formData.append('tileSize', tileSize.value);
  formData.append('format', format.value);
  formData.append('file', file);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: formData
    });

    if (res.status === 401) return logout();

    if (!res.ok) throw new Error("Upload failed (Maybe file too large?)");
    
    isUploading.value = false;
    resetForm();

    // Refresh list so the new uploading record appears at the top
    await fetchRecords();
  } catch (err) {
    error.value = err.message;
    isUploading.value = false;
  }
};

const resetForm = () => {
  name.value = '';
  description.value = '';
  if (fileInput.value) fileInput.value.value = '';
  isUploading.value = false;
  error.value = '';
};

// --- Management Functions ---

const startEdit = (rec) => {
  editingId.value = rec.id;
  editName.value = rec.name;
  editDescription.value = rec.description;
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
      body: JSON.stringify({ name: editName.value, description: editDescription.value })
    });
    if (res.status === 401) return logout();
    if (res.ok) {
      const rec = records.value.find(r => r.id === id);
      if (rec) {
        rec.name = editName.value;
        rec.description = editDescription.value;
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
</script>
