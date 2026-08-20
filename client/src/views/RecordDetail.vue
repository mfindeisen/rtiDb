<template>
  <div class="page-shell space-y-4">
    <Button
      type="button"
      variant="ghost"
      class="text-slate-500 dark:text-slate-400 justify-start"
      :class="{ 'max-lg:hidden': activeTab === 'viewer' && !showHistory }"
      @click="goBack"
    >
      <ArrowLeft class="w-5 h-5" /> Back
    </Button>

    <div
      v-if="loading"
      class="text-center py-16 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-white/10"
    >
      Loading record...
    </div>
    <div
      v-else-if="error"
      class="p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 rounded-lg"
    >
      {{ error }}
    </div>

    <div v-else class="space-y-4">
      <!-- Record header -->
      <div
        class="glass-card px-4 py-4 sm:px-6"
        :class="{ 'max-lg:hidden': activeTab === 'viewer' && !showHistory }"
      >
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 min-w-0">
          <div class="flex flex-col gap-2 min-w-0">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white wrap-anywhere">
            {{ record.name }}
          </h2>
          <div class="flex flex-wrap items-center gap-1.5">
            <RecordOutputBadge v-if="record" :record="record" />
            <span
              v-if="record.recordTypeName"
              class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
            >{{ record.recordTypeName }}</span>
            <span
              v-if="record.revisionNumber"
              class="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10"
            >
              rev. {{ record.revisionNumber }}
            </span>
          </div>
        </div>
          <div class="text-sm text-slate-500 dark:text-slate-400 shrink-0 space-y-1 sm:text-right">
            <div>
              <div class="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Date created
              </div>
              <div class="font-mono text-slate-600 dark:text-slate-300">{{ recordCreatedAt }}</div>
            </div>
            <div v-if="recordUpdatedAt">
              <div class="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Date updated
              </div>
              <div class="font-mono text-slate-600 dark:text-slate-300">{{ recordUpdatedAt }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-stretch gap-2 mb-4" :class="{ 'max-lg:mb-2': activeTab === 'viewer' && !showHistory }">
        <SegmentPills
          v-model="activeTab"
          full-width
          class="flex-1 min-w-0"
          :options="recordTabOptions"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          class="shrink-0 self-stretch h-auto"
          :class="showHistory ? 'bg-muted' : ''"
          title="Version history"
          @click="toggleHistory"
        >
          <History class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">History</span>
        </Button>
      </div>

      <!-- Version history (secondary panel) -->
      <ScrollArea
        v-show="showHistory"
        class="glass-card !p-0 xl:h-[calc(100vh-220px)]"
      >
        <div class="p-4 sm:p-6">
          <RecordHistoryPanel
            :record-id="record.id"
            :record-slug="record.slug || ''"
          />
        </div>
      </ScrollArea>

      <!-- Tab: Metadata -->
      <ScrollArea
        v-show="!showHistory && activeTab === 'metadata'"
        class="glass-card !p-0 xl:h-[calc(100vh-220px)]"
      >
        <div class="p-4 sm:p-6 space-y-6">
          <p
            v-if="record.description"
            class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm border-l-2 border-blue-500/30 pl-4"
            :dir="record.direction"
          >
            {{ record.description }}
          </p>

          <div class="p-4 bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl">
            <h4 class="section-label mb-2 flex items-center gap-2">
              <Download class="w-3.5 h-3.5" /> Data Export
            </h4>
            <div class="flex flex-wrap gap-2">
                <Button
                  v-for="fmt in exportFormats"
                  :key="fmt.id"
                  as-child
                  variant="outline"
                  size="sm"
                  class="h-9"
                >
                  <a :href="exportUrl(fmt.id)" :download="fmt.download">
                    <component :is="fmt.icon" class="w-3.5 h-3.5" />
                    {{ fmt.label }}
                  </a>
                </Button>
            </div>
          </div>

          <MetadataDisplay
            title="Catalog Record"
            :metadata="record.metadata"
            :schema="recordSchema"
            :text-direction="record.direction || 'ltr'"
          />
        </div>
      </ScrollArea>

      <!-- Tab: Discussion -->
      <ScrollArea
        v-show="!showHistory && activeTab === 'discussion'"
        class="glass-card !p-0 xl:h-[calc(100vh-220px)]"
      >
        <div class="p-4 sm:p-6">
          <RecordCommentsPanel
            :record-id="record.id"
            :record-slug="record.slug || ''"
          />
        </div>
      </ScrollArea>

      <!-- Tab: RTI + annotations -->
      <div v-show="!showHistory && activeTab === 'viewer'" class="flex flex-col gap-4">
          <template v-if="viewerMounted">
          <div class="flex flex-col lg:flex-row gap-4 items-stretch max-lg:min-h-[22rem] max-lg:h-[70svh] lg:min-h-[max(49rem,calc(100svh-15rem))]">
            <!-- Help sidebar -->
            <div
              v-if="showGuide"
              class="w-full lg:w-72 shrink-0 flex flex-col overflow-hidden bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm max-lg:h-[35svh] lg:h-[calc(100svh-15rem)]"
            >
        <h3 class="font-bold text-slate-800 dark:text-white text-base border-b border-slate-200 dark:border-white/10 pb-2 flex items-center justify-between w-full shrink-0 px-5 pt-5">
          <span class="flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-blue-500" /> Viewer Help Guide
          </span>
          <Button
            type="button"
            variant="outline"
            size="xs"
            @click="toggleGuide"
          >
            Hide
          </Button>
        </h3>
        <ScrollArea class="flex-1 min-h-0">
        <div class="px-5 pb-5 pt-4 space-y-6">

        <template v-if="viewerMode === 'modern' || record.tiffUrl">
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

        <div v-if="!record.tiffUrl" class="space-y-3 pt-3 border-t border-slate-200 dark:border-white/5">
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

            <!-- Viewer — full remaining width & height -->
            <div
              class="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/75 dark:bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
            >
              <template v-if="record.status === 'done'">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-white/10 shrink-0 bg-white/50 dark:bg-white/[0.02]">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">RTI Viewer</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      :class="showGuide ? 'bg-accent' : ''"
                      @click="toggleGuide"
                    >
                      <HelpCircle class="w-3.5 h-3.5" />
                      {{ showGuide ? 'Hide Help' : 'Help Guide' }}
                    </Button>
                    <span
                      v-if="record.tiffUrl"
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30"
                    >
                      <Map class="w-3.5 h-3.5" /> {{ record.outputType === 'neural' ? 'Neural GeoTIFF' : 'GeoTIFF' }}
                    </span>
                  </div>

                  <ToggleGroup
                    v-if="!record.tiffUrl"
                    type="single"
                    size="sm"
                    class="bg-muted p-0.5 rounded-lg"
                    :model-value="viewerMode"
                    @update:model-value="onViewerModeChange"
                  >
                    <ToggleGroupItem value="modern" class="px-4 text-xs">
                      Modern
                    </ToggleGroupItem>
                    <ToggleGroupItem value="legacy" class="px-4 text-xs">
                      Legacy
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div ref="viewerHostRef" class="flex-1 min-h-0 flex flex-col relative overflow-hidden bg-slate-900 lg:min-h-[49rem]">
                  <RtiViewerHost
                    ref="viewerHostComponentRef"
                    :record="record"
                    :viewer-mode="viewerMode"
                    :annotation-enabled="canAnnotateViewer"
                    :scale-editable="canEditScale"
                    class="flex-1 min-h-0 flex flex-col"
                    @annotation-create="onAnnotationCreate"
                    @annotation-click="onAnnotationClick"
                    @annotation-update="onAnnotationUpdate"
                    @rti-loaded="onViewerLoaded"
                    @scale-change="onScaleChange"
                  />
                </div>
              </template>

              <div
                v-else-if="record.status === 'draft'"
                class="flex-1 flex items-center justify-center text-center py-12 px-6 bg-amber-50 dark:bg-amber-500/10"
              >
                <div>
                  <h3 class="text-xl font-medium text-amber-800 dark:text-amber-300 mb-2">No RTI scan uploaded yet</h3>
                  <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm">
                    Upload an RTI file in the admin area to enable the viewer.
                  </p>
                </div>
              </div>
              <div
                v-else-if="record.status === 'processing'"
                class="flex-1 flex items-center justify-center text-center py-12 px-6 bg-blue-50 dark:bg-blue-500/10"
              >
                <div>
                  <h3 class="text-xl font-medium text-blue-700 dark:text-blue-400 mb-2">Processing…</h3>
                  <p class="text-slate-500 dark:text-slate-400 text-sm">Please check back later.</p>
                </div>
              </div>
              <div
                v-else
                class="flex-1 flex items-center justify-center p-4 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300"
              >
                There was an error processing this scan.
              </div>
            </div>
          </div>

          <!-- Annotations & notes below viewer (full width) -->
          <div
            v-if="showAnnotationsSection"
            class="glass-card !p-6 flex flex-col gap-4"
          >
            <div class="shrink-0 border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 class="text-sm font-bold text-slate-800 dark:text-white">Annotations &amp; Notes</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Use the annotate tool, pick a shape, then draw on the image. Choose private, team, or published visibility.
              </p>
            </div>
                <RecordAnnotationsPanel
                  ref="annotationsPanelRef"
                  :record-id="record.id"
                  :record-slug="record.slug || ''"
                  :record-published="record.isPublished === 1"
                  :highlight-id="editingAnnotation?.id"
                  embedded
                  @jump-to-view="onJumpToAnnotation"
                  @edit="openAnnotationEdit"
                  @loaded="syncViewerAnnotations"
                  @updated="syncViewerAnnotations"
                />
            <div class="pt-4 border-t border-slate-200 dark:border-white/10">
              <RecordNotesPanel
                :record-id="record.id"
                :record-slug="record.slug || ''"
                embedded
              />
            </div>
          </div>
          </template>
      </div>
    </div>

    <AnnotationNoteDialog
      :open="annotationNoteOpen"
      :saving="annotationSaving"
      :deleting="annotationDeleting"
      :mode="annotationDialogMode"
      :initial-color="annotationDialogMode === 'edit' ? editingAnnotation?.color : pendingAnnotation?.color"
      :initial-stroke-width="annotationDialogMode === 'edit' ? editingAnnotation?.strokeWidth : pendingAnnotation?.strokeWidth"
      :initial-label="editingAnnotation?.label || ''"
      :initial-visibility="editingAnnotation?.visibility || 'private'"
      @save="saveAnnotationDialog"
      @cancel="closeAnnotationDialog"
      @delete="deleteAnnotationDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ArrowLeft,
  HelpCircle,
  Hand,
  Lightbulb,
  Image,
  Sparkles,
  Layers,
  Map,
  Download,
  FileJson,
  FileText,
  Table,
  BookOpen,
  Library,
  Sun,
  Maximize2,
  Link,
  Info,
  Navigation,
  ImageDown,
  History,
  MessageSquare,
} from '@lucide/vue';
import MetadataDisplay from '../components/MetadataDisplay.vue';
import RecordNotesPanel from '../components/RecordNotesPanel.vue';
import RecordCommentsPanel from '../components/RecordCommentsPanel.vue';
import RecordAnnotationsPanel from '../components/RecordAnnotationsPanel.vue';
import RecordHistoryPanel from '../components/RecordHistoryPanel.vue';
import AnnotationNoteDialog from '../components/AnnotationNoteDialog.vue';
import SegmentPills from '../components/SegmentPills.vue';
import RtiViewerHost from '../components/RtiViewerHost.vue';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { canAnnotate, getCurrentUser, hasPermission } from '@/composables/useAuth';
import { userCanViewRecord } from '@rtidb/shared/authorization';
import { useViewer } from '@/composables/useViewer';
import { getRecord, exportRecordUrl, updateScaleCalibration } from '@/api/records';
import { createAnnotation, updateAnnotation, deleteAnnotation } from '@/api/annotations';
import { setViewerAnnotations, setViewerAnnotationOverlaysVisible, selectViewerAnnotation, setViewerScale } from '@/lib/viewerCommands';
import { DEFAULT_ANNOTATION_COLOR } from '@/lib/annotationColors';
import { recordPath } from '@/lib/recordPath';
import { confirmAction, showAlert } from '@/composables/useConfirmDialog';
import { formatRecordDateTime, getRecordUpdatedAt, DEFAULT_CATALOG_SCHEMA } from '@rtidb/shared';
import { listRecordTypes } from '@/api/catalog';
import type { RecordType } from '@rtidb/shared/api/catalog';
import RecordOutputBadge from '@/components/RecordOutputBadge.vue';

const route = useRoute();
const router = useRouter();
const record = ref(null);
const recordTypes = ref<RecordType[]>([]);
const recordSchema = computed(() => {
  const type = recordTypes.value.find((item) => item.id === record.value?.recordTypeId);
  return type?.schema?.length ? type.schema : DEFAULT_CATALOG_SCHEMA;
});

const goBack = () => {
  if (window.history.state && window.history.state.back) {
    router.back();
  } else {
    router.push('/');
  }
};

const loading = ref(true);
const error = ref('');
const activeTab = ref('metadata');
const viewerMounted = ref(false);
const showHistory = ref(false);
const viewerMode = ref<'modern' | 'legacy'>('modern');

function onViewerModeChange(value: string | string[] | undefined) {
  if (value === 'modern' || value === 'legacy') viewerMode.value = value;
}
const viewerHostComponentRef = ref(null);
const viewerHostRef = ref(null);
const viewerRef = computed(() => viewerHostComponentRef.value?.viewerRef ?? null);
const annotationsPanelRef = ref(null);
const pendingAnnotation = ref(null);
const editingAnnotation = ref(null);
const annotationDialogMode = ref('create');
const annotationNoteOpen = ref(false);
const annotationSaving = ref(false);
const annotationDeleting = ref(false);

const showModernViewer = computed(() =>
  record.value?.status === 'done' && !!(record.value.tiffUrl || viewerMode.value === 'modern'),
);

const canAnnotateViewer = computed(() => canAnnotate() && showModernViewer.value);
const canEditScale = computed(() => hasPermission('edit_record') && showModernViewer.value);
const showAnnotationsSection = computed(() =>
  showModernViewer.value && userCanViewRecord(getCurrentUser(), { isPublished: record.value?.isPublished }),
);

const activeViewerTab = computed(() => activeTab.value === 'viewer');

const syncViewerAnnotations = async () => {
  await nextTick();
  const panel = annotationsPanelRef.value;
  const el = viewerRef.value;
  if (!panel || !el) return;
  const list = panel.annotations || [];
  if (!list.length && panel.loading) return;
  setViewerAnnotations(el, list);
  setViewerAnnotationOverlaysVisible(el, panel.overlaysVisible !== false);
};

const { showGuide, toggleGuide: toggleGuidePanel, triggerResize, onRtiLoaded, jumpToAnnotation } = useViewer({
  viewerRef,
  active: activeViewerTab,
  onSyncAnnotations: syncViewerAnnotations,
});

const getViewerElement = () => viewerRef.value;

const applyRecordScale = () => {
  const el = getViewerElement();
  if (!el) return;
  setViewerScale(el, record.value?.scaleCalibration ?? null);
};

const onViewerLoaded = async () => {
  await onRtiLoaded();
  applyRecordScale();
};

const onScaleChange = async (event) => {
  const detail = event?.detail ?? event;
  if (!record.value || !canEditScale.value) return;
  const key = record.value.slug || record.value.id;
  try {
    const data = await updateScaleCalibration(key, detail);
    record.value = { ...record.value, scaleCalibration: data.scaleCalibration };
  } catch (err) {
    console.error(err);
    await showAlert({
      title: 'Could not save scale',
      description: err instanceof Error ? err.message : 'Could not save the image scale',
      variant: 'destructive',
    });
  }
};

const recordTabOptions = computed(() => [
  { value: 'metadata', label: 'Catalog & Metadata', shortLabel: 'Catalog', icon: FileText },
  {
    value: 'viewer',
    label: 'RTI Viewer & Annotations',
    shortLabel: 'Viewer',
    icon: Image,
    disabled: record.value?.status !== 'done',
  },
  { value: 'discussion', label: 'Scholarly Discussion', shortLabel: 'Discussion', icon: MessageSquare },
]);

const onJumpToAnnotation = (ann) => {
  jumpToAnnotation(ann);
};

const onAnnotationCreate = (event) => {
  const detail = event?.detail ?? event;
  if (!record.value || !detail?.type || !detail?.geometry || !detail?.rtiView) return;
  editingAnnotation.value = null;
  annotationDialogMode.value = 'create';
  pendingAnnotation.value = detail;
  annotationNoteOpen.value = true;
};

const openAnnotationEdit = (ann) => {
  if (!ann?.id) return;
  pendingAnnotation.value = null;
  editingAnnotation.value = ann;
  annotationDialogMode.value = 'edit';
  annotationNoteOpen.value = true;
  selectViewerAnnotation(getViewerElement(), ann.id);
};

const onAnnotationClick = (event) => {
  const ann = event?.detail ?? event;
  openAnnotationEdit(ann);
};

const onAnnotationUpdate = async (event) => {
  const detail = event?.detail ?? event;
  if (!record.value || detail?.id == null || !detail?.geometry) return;
  const key = record.value.slug || record.value.id;
  try {
    await updateAnnotation(key, Number(detail.id), { geometry: detail.geometry });
    await annotationsPanelRef.value?.refresh?.();
  } catch (err) {
    console.error(err);
    await showAlert({
      title: 'Could not update annotation',
      description: err instanceof Error ? err.message : 'Could not update annotation',
      variant: 'destructive',
    });
  }
};

const closeAnnotationDialog = () => {
  annotationNoteOpen.value = false;
  pendingAnnotation.value = null;
  editingAnnotation.value = null;
  annotationDialogMode.value = 'create';
  selectViewerAnnotation(getViewerElement(), null);
};

const saveAnnotationDialog = async ({ label, color, strokeWidth, visibility }) => {
  if (!record.value) return;
  const key = record.value.slug || record.value.id;
  annotationSaving.value = true;
  try {
    if (annotationDialogMode.value === 'edit' && editingAnnotation.value) {
      await updateAnnotation(key, editingAnnotation.value.id, {
        label: label || null,
        color,
        strokeWidth,
        visibility,
      });
    } else if (pendingAnnotation.value) {
      const payload = {
        ...pendingAnnotation.value,
        color: color || pendingAnnotation.value.color || DEFAULT_ANNOTATION_COLOR,
        strokeWidth: strokeWidth || pendingAnnotation.value.strokeWidth,
        visibility: visibility || 'private',
        ...(label ? { label } : {}),
      };
      await createAnnotation(key, payload);
    }
    closeAnnotationDialog();
    annotationsPanelRef.value?.revealOverlays?.();
    await annotationsPanelRef.value?.refresh?.();
    syncViewerAnnotations();
  } catch (err) {
    console.error(err);
    await showAlert({
      title: 'Could not save annotation',
      description: err instanceof Error ? err.message : 'Could not save annotation',
      variant: 'destructive',
    });
  } finally {
    annotationSaving.value = false;
  }
};

const deleteAnnotationDialog = async () => {
  if (!record.value || !editingAnnotation.value) return;
  const ok = await confirmAction({
    title: 'Delete this annotation?',
    description: 'This mark and its note will be removed from the image.',
    confirmLabel: 'Delete',
  });
  if (!ok) return;
  const key = record.value.slug || record.value.id;
  const annotationId = editingAnnotation.value.id;
  closeAnnotationDialog();
  try {
    await deleteAnnotation(key, annotationId);
    await annotationsPanelRef.value?.refresh?.();
    syncViewerAnnotations();
  } catch (err) {
    console.error(err);
    await annotationsPanelRef.value?.refresh?.();
    syncViewerAnnotations();
    await showAlert({
      title: 'Could not delete annotation',
      description: err instanceof Error ? err.message : 'Could not delete annotation',
      variant: 'destructive',
    });
  }
};

watch(canAnnotateViewer, (enabled) => {
  if (enabled) {
    nextTick(() => {
      annotationsPanelRef.value?.refresh?.();
      syncViewerAnnotations();
    });
  }
});

watch(() => record.value?.scaleCalibration, () => {
  nextTick(applyRecordScale);
});

watch(viewerMode, () => {
  if (showModernViewer.value) {
    nextTick(syncViewerAnnotations);
  }
});

watch(activeTab, (tab) => {
  showHistory.value = false;
  localStorage.setItem('recordDetailTab', tab);
  if (tab === 'viewer') {
    viewerMounted.value = true;
    nextTick(() => {
      triggerResize();
      syncViewerAnnotations();
    });
  }
});

const recordCreatedAt = computed(() =>
  record.value?.date ? formatRecordDateTime(record.value.date) : ''
);

const recordUpdatedAt = computed(() =>
  record.value ? getRecordUpdatedAt(record.value) : ''
);

const exportFormats = [
  { id: 'json', label: 'JSON', icon: FileJson, download: true },
  { id: 'xml', label: 'XML', icon: FileText, download: true },
  { id: 'csv', label: 'CSV', icon: Table, download: true },
  { id: 'bibtex', label: 'BibTeX', icon: BookOpen, download: true },
  { id: 'ris', label: 'RIS', icon: BookOpen, download: true },
  { id: 'iiif', label: 'IIIF', icon: Library, download: true },
];

const exportUrl = (format) => exportRecordUrl(record.value?.slug || record.value?.id, format);

const toggleGuide = () => {
  toggleGuidePanel();
  localStorage.setItem('showGuide', showGuide.value.toString());
};

const toggleHistory = () => {
  showHistory.value = !showHistory.value;
};

onMounted(async () => {
  const storedGuide = localStorage.getItem('showGuide');
  if (storedGuide === 'true') {
    showGuide.value = true;
  }

  try {
    const param = Array.isArray(route.params.slug) ? route.params.slug[0]! : route.params.slug;
    record.value = await getRecord(param);
    try {
      recordTypes.value = await listRecordTypes();
    } catch {
      recordTypes.value = [];
    }

    if (record.value.slug && param !== record.value.slug) {
      router.replace(recordPath(record.value));
    }

    const storedTab = localStorage.getItem('recordDetailTab');
    if (storedTab === 'viewer' && record.value.status === 'done') {
      activeTab.value = 'viewer';
    }

    loading.value = false;
    await nextTick();
    if (activeTab.value === 'viewer') {
      triggerResize();
      syncViewerAnnotations();
    }
  } catch (err) {
    error.value = err.message;
    loading.value = false;
  }
});
</script>
