<template>
  <div
    class="w-full lg:w-72 shrink-0 flex flex-col overflow-hidden bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm max-lg:h-[35svh] lg:h-[calc(100svh-15rem)]"
  >
    <h3 class="font-bold text-slate-800 dark:text-white text-base border-b border-slate-200 dark:border-white/10 pb-2 flex items-center justify-between w-full shrink-0 px-5 pt-5">
      <span class="flex items-center gap-2">
        <HelpCircle class="w-5 h-5 text-blue-500" /> Viewer Help Guide
      </span>
      <Button type="button" variant="outline" size="xs" @click="$emit('hide')">
        Hide
      </Button>
    </h3>
    <ScrollArea class="flex-1 min-h-0">
      <div class="px-5 pb-5 pt-4 space-y-6">
        <template v-if="viewerMode === 'modern' || tiffUrl">
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The modern viewer has a vertical toolbar on the left edge of the canvas. Click a button to switch modes, then interact on the image.
          </p>

          <div class="space-y-3">
            <h4 class="font-semibold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">Interaction Modes</h4>
            <div class="space-y-3">
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-xs">
                  <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600 text-white shrink-0">
                    <Hand class="w-3.5 h-3.5" />
                  </span>
                  Pan &amp; Zoom
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Select the hand icon (blue when active). Drag to pan across the image. Scroll wheel or pinch to zoom in and out. High-resolution tiles load automatically as you zoom.
                </p>
              </div>
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-xs">
                  <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-yellow-500 text-white shrink-0">
                    <Lightbulb class="w-3.5 h-3.5" />
                  </span>
                  Light Direction
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Select the lightbulb icon (yellow when active). Drag on the canvas to move the simulated light source and reveal surface detail from different angles.
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-3 pt-3 border-t border-slate-200 dark:border-white/5">
            <h4 class="font-semibold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">Light Compass</h4>
            <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
              <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-xs">
                <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800 text-yellow-400 border border-white/10 shrink-0">
                  <Navigation class="w-3.5 h-3.5" />
                </span>
                Compass widget (bottom-left)
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                The circular overlay shows the current light direction. The yellow dot marks the light position. You can also drag inside the compass to adjust lighting without using the main canvas.
              </p>
            </div>
          </div>

          <div class="space-y-3 pt-3 border-t border-slate-200 dark:border-white/5">
            <h4 class="font-semibold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">Keyboard</h4>
            <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Click the viewer first. <span class="font-semibold text-slate-700 dark:text-slate-200">H</span> pan,
                <span class="font-semibold text-slate-700 dark:text-slate-200">L</span> light,
                <span class="font-semibold text-slate-700 dark:text-slate-200">W</span> white balance,
                <span class="font-semibold text-slate-700 dark:text-slate-200">A</span> annotate,
                <span class="font-semibold text-slate-700 dark:text-slate-200">1–5</span> render modes,
                arrows nudge light,
                <span class="font-semibold text-slate-700 dark:text-slate-200">+</span>/<span class="font-semibold text-slate-700 dark:text-slate-200">-</span> zoom,
                <span class="font-semibold text-slate-700 dark:text-slate-200">F</span> fit,
                <span class="font-semibold text-slate-700 dark:text-slate-200">R</span> center light,
                <span class="font-semibold text-slate-700 dark:text-slate-200">?</span> shortcut list,
                <span class="font-semibold text-slate-700 dark:text-slate-200">S</span> snapshot,
                <span class="font-semibold text-slate-700 dark:text-slate-200">Esc</span> back to pan.
              </p>
            </div>
          </div>

          <div class="space-y-3 pt-3 border-t border-slate-200 dark:border-white/5">
            <h4 class="font-semibold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">Render Modes</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Switch how the RTI surface is calculated. The active mode is highlighted in white on the toolbar.
            </p>
            <div class="space-y-2.5 text-xs leading-normal">
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Image class="w-4 h-4 text-slate-400 shrink-0" /> Default Mode
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-1">Standard diffuse RTI reconstruction — natural color and shading for general study.</p>
              </div>
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-slate-400 shrink-0" /> Glossy Mode
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-1">Adds specular highlights to emphasize fine scratches, tool marks, and shallow grooves. A vertical slider appears to adjust specular intensity (“surface wetness”).</p>
              </div>
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Layers class="w-4 h-4 text-slate-400 shrink-0" /> Normals Mode
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-1">Shows surface normal vectors as color — useful for analyzing shape without texture color.</p>
              </div>
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Map class="w-4 h-4 text-slate-400 shrink-0" /> Slope Heatmap
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-1">Maps surface steepness to color (flat = cool tones, steep = warm). Highlights shallow carvings and wear patterns.</p>
              </div>
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Sun class="w-4 h-4 text-slate-400 shrink-0" /> Dual Light
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-1">Two opposing lights (red and blue) create raking contrast that reveals fine edges and incised detail.</p>
              </div>
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Layers class="w-4 h-4 text-slate-400 shrink-0" /> Latent Map
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-1">Neural RTI only — displays the raw learned latent feature map instead of the shaded reconstruction.</p>
              </div>
            </div>
          </div>

          <div class="space-y-3 pt-3 border-t border-slate-200 dark:border-white/5">
            <h4 class="font-semibold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">Toolbar Actions</h4>
            <div class="space-y-2.5 text-xs leading-normal">
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Maximize2 class="w-4 h-4 text-slate-400 shrink-0" /> Fullscreen
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-1">Expand the viewer to fill your screen. Click again to exit fullscreen.</p>
              </div>
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <ImageDown class="w-4 h-4 text-slate-400 shrink-0" /> Download Render
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-1">Save the current view — including zoom, render mode, and light angle — as a PNG image.</p>
              </div>
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Link class="w-4 h-4 text-slate-400 shrink-0" /> Copy Link
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-1">Copy a shareable URL that restores the exact camera position, zoom level, light direction, and render mode.</p>
              </div>
              <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
                <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Info class="w-4 h-4 text-slate-400 shrink-0" /> About
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-1">Opens credits and technical information about the Modern RTI Viewer (Vue 3 + Three.js).</p>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-200 dark:border-white/5">
            <p class="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
              Tip: Start in <strong class="text-slate-500 dark:text-slate-400">Light Direction</strong> mode and drag slowly across scratches or inscriptions. Switch to <strong class="text-slate-500 dark:text-slate-400">Glossy</strong> or <strong class="text-slate-500 dark:text-slate-400">Slope Heatmap</strong> for fine surface detail.
            </p>
          </div>
        </template>

        <template v-else-if="viewerMode === 'legacy'">
          <div class="space-y-3">
            <h4 class="font-semibold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">Legacy Viewer</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The legacy WebRTIViewer uses its own on-screen controls inside the embedded frame. Switch back to <strong class="text-slate-700 dark:text-slate-300">Modern</strong> for the full toolbar, render modes, compass, download, and share link features described above.
            </p>
          </div>
        </template>

        <div v-if="!tiffUrl" class="space-y-3 pt-3 border-t border-slate-200 dark:border-white/5">
          <h4 class="font-semibold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">Page Controls</h4>
          <div class="space-y-2.5 text-xs leading-normal">
            <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
              <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <HelpCircle class="w-4 h-4 text-blue-500 shrink-0" /> Help Guide
              </div>
              <p class="text-slate-500 dark:text-slate-400 mt-1">Toggle this panel on or off. Your preference is remembered in the browser.</p>
            </div>
            <div class="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-3">
              <div class="font-semibold text-slate-800 dark:text-slate-200">Modern / Legacy</div>
              <p class="text-slate-500 dark:text-slate-400 mt-1">
                <strong class="text-slate-700 dark:text-slate-300">Modern</strong> — WebGL viewer with all modes above.
                <strong class="text-slate-700 dark:text-slate-300">Legacy</strong> — classic WebRTIViewer in an embedded frame (older interface, fewer tools).
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
import {
  HelpCircle,
  Hand,
  Lightbulb,
  Image,
  Sparkles,
  Layers,
  Map,
  Sun,
  Maximize2,
  Link,
  Info,
  Navigation,
  ImageDown,
} from '@lucide/vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

defineProps<{
  viewerMode: 'modern' | 'legacy';
  tiffUrl?: string | null;
}>();

defineEmits<{
  hide: [];
}>();
</script>
