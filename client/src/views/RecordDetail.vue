<template>
  <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
    
    <!-- Collapsible Page-Level Sidebar Help Guide (Left Side) -->
    <div 
      v-if="record && record.status === 'done' && showGuide && viewerMode === 'modern'"
      class="w-full lg:w-80 shrink-0 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-2xl p-5 space-y-6 shadow-sm"
    >
      <h3 class="font-bold text-slate-800 dark:text-white text-base border-b border-slate-200 dark:border-white/10 pb-2 flex items-center justify-between w-full">
        <span class="flex items-center gap-2">
          <HelpCircle class="w-5 h-5 text-blue-500" /> Viewer Help Guide
        </span>
        <button 
          @click="toggleGuide" 
          class="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 transition-all"
        >
          Hide
        </button>
      </h3>
      
      <!-- Interaction Modes -->
      <div class="space-y-3">
        <h4 class="font-semibold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">Interaction Modes</h4>
        <div class="space-y-3">
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-xs">
              <Hand class="w-4 h-4 text-slate-400" /> Pan & Zoom
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              Click and drag to pan across the high-resolution image. Scroll or pinch to zoom in and out.
            </p>
          </div>
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-xs">
              <Lightbulb class="w-4 h-4 text-slate-400" /> Light Direction
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              Click and drag on the image canvas to interactively shift the simulated light source angle.
            </p>
          </div>
        </div>
      </div>

      <!-- Render Modes -->
      <div class="space-y-3 pt-3 border-t border-slate-200 dark:border-white/5">
        <h4 class="font-semibold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">Render Modes</h4>
        <div class="space-y-3 text-xs leading-normal">
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Image class="w-4 h-4 text-slate-400" /> Default Mode
            </div>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Standard 2D lighting reconstruction using coefficients.</p>
          </div>
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Sparkles class="w-4 h-4 text-slate-400" /> Glossy Mode
            </div>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Adds specular highlights to read fine scratches. Adjust intensity with the slider.</p>
          </div>
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Layers class="w-4 h-4 text-slate-400" /> Normals Mode
            </div>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Renders structural surface vectors to view raw shape geometry. Note: In Neural RTI mode, pseudo-normals are estimated in real-time on the GPU.</p>
          </div>
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Map class="w-4 h-4 text-slate-400" /> Slope Heatmap
            </div>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Color-codes slope angles (blue is flat, red is steep) to highlight carvings.</p>
          </div>
          <div v-if="rtiMetadata?.format === 'Neural RTI'">
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Layers class="w-4 h-4 text-slate-400" /> Latent Map Mode
            </div>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Displays the raw 4D latent representation (as RGB channels) learned by the neural network, visualizing the compressed shape and material features.</p>
          </div>
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Sun class="w-4 h-4 text-slate-400" /> Dual Light
            </div>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Projects red and blue opposing raking lights to create high-contrast geometric reliefs.</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-3 pt-3 border-t border-slate-200 dark:border-white/5">
        <h4 class="font-semibold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">Viewer Actions</h4>
        <div class="space-y-3 text-xs leading-normal">
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Maximize class="w-4 h-4 text-slate-400" /> Fullscreen
            </div>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Toggles fullscreen view to expand workspace. Press Escape to exit.</p>
          </div>
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Download class="w-4 h-4 text-slate-400" /> Download Render
            </div>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Saves and downloads the current WebGL viewport rendering as a PNG file.</p>
          </div>
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Link class="w-4 h-4 text-slate-400" /> Copy Link
            </div>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Copies a shareable URL of the exact camera position, zoom, and lighting angle.</p>
          </div>
          <div>
            <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Info class="w-4 h-4 text-slate-400" /> About
            </div>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Opens the information overlay containing project metadata and credits.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-grow w-full space-y-6">
      <div class="max-w-5xl mx-auto space-y-6">
    <button @click="goBack" class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors">
      <ArrowLeft class="w-5 h-5" /> Back
    </button>
    <div v-if="loading" class="text-center py-16 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">Loading record...</div>
    <div v-else-if="error" class="p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 rounded-lg">{{ error }}</div>
    <div v-else class="glass-card">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white mb-2 sm:mb-0">{{ record.name }}</h2>
        <span class="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{{ new Date(record.date).toLocaleDateString() }}</span>
      </div>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-8" :dir="record.direction">{{ record.description }}</p>
      
      <!-- Technical Details Section -->
      <div v-if="rtiMetadata" class="mb-8 p-5 bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Technical Details</h4>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div>
            <div class="text-xs text-slate-400 dark:text-slate-500 mb-0.5">RTI Format</div>
            <div class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ rtiMetadata.format }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-400 dark:text-slate-500 mb-0.5">Resolution</div>
            <div class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ rtiMetadata.resolution }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-400 dark:text-slate-500 mb-0.5">Tile Size</div>
            <div class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ rtiMetadata.tileSize }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-400 dark:text-slate-500 mb-0.5">Coefficients / Layers</div>
            <div class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ rtiMetadata.layerCount }}</div>
          </div>
          <div v-if="record.folder_size">
            <div class="text-xs text-slate-400 dark:text-slate-500 mb-0.5">Storage Size</div>
            <div class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ formatBytes(record.folder_size) }}</div>
          </div>
          <div v-if="record.file_count">
            <div class="text-xs text-slate-400 dark:text-slate-500 mb-0.5">Total Image Tiles</div>
            <div class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ record.file_count }}</div>
          </div>
        </div>
      </div>
      
      <!-- Viewer Mode Switcher: only show when no tiff_url (legacy tile mode) -->
      <div v-if="record.status === 'done' && !record.tiff_url" class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div class="flex items-center gap-3">
          <div class="text-sm font-semibold text-slate-700 dark:text-slate-300">RTI Interactive Viewer</div>
          <button 
            v-if="viewerMode === 'modern'"
            @click="toggleGuide"
            :class="[
              'px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 flex items-center gap-1 border',
              showGuide 
                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30' 
                : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/5'
            ]"
          >
            <HelpCircle class="w-3.5 h-3.5" />
            {{ showGuide ? 'Hide Help' : 'Help Guide' }}
          </button>
        </div>
        <div class="inline-flex rounded-lg p-0.5 bg-slate-200/80 dark:bg-white/5 border border-slate-300/50 dark:border-white/10">
          <button 
            @click="viewerMode = 'modern'"
            :class="[
              'px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 whitespace-nowrap',
              viewerMode === 'modern' 
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-300/30 dark:border-white/5' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            Modern (Three.js)
          </button>
          <button 
            @click="viewerMode = 'legacy'"
            :class="[
              'px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 whitespace-nowrap',
              viewerMode === 'legacy' 
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-300/30 dark:border-white/5' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            Legacy (WebRTIViewer)
          </button>
        </div>
      </div>

      <!-- GeoTIFF badge when in modern mode -->
      <div v-if="record.status === 'done' && record.tiff_url" class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
        <div class="flex items-center gap-3">
          <div class="text-sm font-semibold text-slate-700 dark:text-slate-300">RTI Interactive Viewer</div>
          <button 
            @click="toggleGuide"
            :class="[
              'px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 flex items-center gap-1 border',
              showGuide 
                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30' 
                : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/5'
            ]"
          >
            <HelpCircle class="w-3.5 h-3.5" />
            {{ showGuide ? 'Hide Help' : 'Help Guide' }}
          </button>
        </div>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
          <Map class="w-3.5 h-3.5" /> GeoTIFF &middot; HTTP Range Requests
        </span>
      </div>

      <div v-if="record.status === 'done'" class="mt-6 flex justify-center bg-slate-100 dark:bg-black/40 rounded-xl border border-slate-200 dark:border-white/10 h-[calc(100vh-320px)] min-h-[450px] w-full overflow-hidden">
        <!-- Viewer Content Wrapper -->
        <div class="flex-grow h-full overflow-hidden">
          <!-- GeoTIFF Mode: always use modern viewer with the TIFF URL -->
          <template v-if="record.tiff_url">
            <modern-rti-viewer
              :url="record.tiff_url"
              class="w-full h-full block"
              debug="true"
              @rti-loaded="onRtiLoaded"
            ></modern-rti-viewer>
          </template>
          <!-- Classic Tile Mode -->
          <template v-else-if="viewerMode === 'modern'">
            <modern-rti-viewer 
              :url="record.folder_url"
              class="w-full h-full block"
              debug="true"
              @rti-loaded="onRtiLoaded"
            ></modern-rti-viewer>
          </template>
          <template v-else-if="viewerMode === 'legacy'">
            <iframe 
              :src="`/viewer/viewer.html?url=${encodeURIComponent(record.folder_url)}`" 
              class="w-full h-full border-0 bg-[#0f172a]"
              allowfullscreen
            ></iframe>
          </template>
        </div>
      </div>
      <div v-else-if="record.status === 'processing'" class="text-center py-12 bg-blue-50 dark:bg-blue-500/10 border border-dashed border-blue-300 dark:border-blue-500/50 rounded-xl">
        <h3 class="text-xl font-medium text-blue-700 dark:text-blue-400 mb-2">This scan is currently being processed.</h3>
        <p class="text-slate-500 dark:text-slate-400">Please check back later.</p>
      </div>
      <div v-else class="p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 rounded-lg">
        There was an error processing this scan.
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, HelpCircle, Hand, Lightbulb, Image, Sparkles, Layers, Map, Sun, Maximize, Download, Link, Info } from '@lucide/vue';

const route = useRoute();
const router = useRouter();
const record = ref(null);

const goBack = () => {
  if (window.history.state && window.history.state.back) {
    router.back();
  } else {
    router.push('/');
  }
};
const loading = ref(true);
const error = ref('');
const viewerMode = ref('modern');
const showGuide = ref(true);
const rtiMetadata = ref(null);

const fetchRtiMetadata = async (folderUrl) => {
  try {
    const response = await fetch(`${folderUrl}/info.xml`);
    if (!response.ok) return;
    const xmlText = await response.text();
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    const getValue = (tag) => {
      const el = xmlDoc.getElementsByTagName(tag)[0];
      return el ? el.textContent : null;
    };

    const contentEl = xmlDoc.getElementsByTagName('Content')[0];
    const sizeEl = xmlDoc.getElementsByTagName('Size')[0];
    
    let typeName = 'Unknown';
    let width = 0;
    let height = 0;
    let tileSize = 256;
    let layerCount = 0;

    if (contentEl && sizeEl) {
      // Old Format (e.g. LRGB_PTM)
      const contentType = contentEl.getAttribute('type');
      width = parseInt(sizeEl.getAttribute('width')) || 0;
      height = parseInt(sizeEl.getAttribute('height')) || 0;
      layerCount = parseInt(sizeEl.getAttribute('coefficients')) || 3;
      
      const typeDisplayNames = {
        'HSH': 'Hemispherical Harmonics (HSH)',
        'HSH_RTI': 'Hemispherical Harmonics (HSH)',
        'LRGB_PTM': 'Polynomial Texture Mapping (LRGB_PTM)',
        'RGB_PTM': 'Polynomial Texture Mapping (RGB_PTM)',
        'IMAGE': 'Static Image'
      };
      typeName = typeDisplayNames[contentType] || contentType || 'Unknown';
      
      const treeEl = xmlDoc.getElementsByTagName('Tree')[0];
      if (treeEl) {
        const treeLines = treeEl.textContent.trim().split('\n');
        if (treeLines.length > 1) tileSize = parseInt(treeLines[1]) || 256;
      }
    } else {
      // New Format
      const typeNum = parseInt(getValue('type'));
      width = parseInt(getValue('width')) || 0;
      height = parseInt(getValue('height')) || 0;
      tileSize = parseInt(getValue('tileSize')) || 256;
      layerCount = parseInt(getValue('layerCount')) || 1;
      
      const typeNames = {
        1: 'Hemispherical Harmonics (HSH)',
        2: 'Polynomial Texture Mapping (LRGB_PTM)',
        3: 'Polynomial Texture Mapping (RGB_PTM)',
        4: 'Static Image',
        5: 'Neural RTI'
      };
      typeName = typeNames[typeNum] || `Type ${typeNum}`;
    }

    rtiMetadata.value = {
      format: typeName,
      resolution: `${width} × ${height} px`,
      tileSize: `${tileSize} px`,
      layerCount: layerCount
    };
  } catch (err) {
    console.error('Failed to parse RTI metadata:', err);
  }
};

const onRtiLoaded = (e) => {
  const info = e.detail;
  if (!info) return;
  const typeNames = {
    1: 'Hemispherical Harmonics (HSH)',
    2: 'Polynomial Texture Mapping (LRGB_PTM)',
    3: 'Polynomial Texture Mapping (RGB_PTM)',
    4: 'Static Image',
    5: 'Neural RTI'
  };
  rtiMetadata.value = {
    format: typeNames[info.type] || `Type ${info.type}`,
    resolution: `${info.width} × ${info.height} px`,
    tileSize: `${info.tileSize} px`,
    layerCount: info.layerCount || 1
  };
};

const formatBytes = (bytes) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const toggleGuide = () => {
  showGuide.value = !showGuide.value;
  localStorage.setItem('showGuide', showGuide.value.toString());
};

onMounted(async () => {
  const storedGuide = localStorage.getItem('showGuide');
  if (storedGuide !== null) {
    showGuide.value = storedGuide === 'true';
  }
  try {
    const id = route.params.id;
    const res = await fetch(`/api/records/${id}`);
    if (!res.ok) throw new Error('Failed to load record details');
    
    record.value = await res.json();
    
    if (record.value.metadata) {
      rtiMetadata.value = record.value.metadata;
    } else if (record.value.status === 'done' && record.value.folder_url) {
      await fetchRtiMetadata(record.value.folder_url);
    }
    
    // Set loading to false BEFORE nextTick so Vue renders the v-else block containing #viewerContainer
    loading.value = false;
    
    // Viewer is now initialized automatically by the modern-rti-viewer web component!
  } catch (err) {
    error.value = err.message;
    loading.value = false;
  }
});
</script>
