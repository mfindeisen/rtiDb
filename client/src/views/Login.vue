<template>
  <div
    ref="rootEl"
    class="relative flex flex-1 w-full items-center justify-center overflow-hidden p-6 md:p-10 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900"
    :style="lightStyle"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="login-rti-wash" aria-hidden="true" />
    <div ref="specimenEl" class="relative z-10 w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';

const ORBIT_PERIOD_MS = 64_000;
const ORBIT_RADIUS = 0.62;
const FOLLOW = 0.07;

const rootEl = ref<HTMLElement | null>(null);
const specimenEl = ref<HTMLElement | null>(null);
const guided = ref(false);
const light = reactive({ dx: 0, dy: -ORBIT_RADIUS });
const target = reactive({ dx: 0, dy: -ORBIT_RADIUS });

let angle = -Math.PI / 2;
let raf = 0;
let lastTs = 0;
let reducedMotion = false;

function clampToDome(dx: number, dy: number) {
  const len = Math.hypot(dx, dy);
  if (len > 1) return { dx: dx / len, dy: dy / len };
  return { dx, dy };
}

function placeOnOrbit() {
  target.dx = Math.cos(angle) * ORBIT_RADIUS;
  target.dy = Math.sin(angle) * ORBIT_RADIUS;
}

function tick(ts: number) {
  if (!guided.value && !reducedMotion) {
    const dt = lastTs ? ts - lastTs : 16;
    lastTs = ts;
    angle += (dt / ORBIT_PERIOD_MS) * Math.PI * 2;
    placeOnOrbit();
  } else {
    lastTs = ts;
  }

  light.dx += (target.dx - light.dx) * FOLLOW;
  light.dy += (target.dy - light.dy) * FOLLOW;
  raf = requestAnimationFrame(tick);
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !rootEl.value) return;
  const specimen = (specimenEl.value ?? rootEl.value).getBoundingClientRect();
  const canvas = rootEl.value.getBoundingClientRect();
  const cx = specimen.left + specimen.width / 2;
  const cy = specimen.top + specimen.height / 2;
  const dome = Math.min(canvas.width, canvas.height) * 0.42;
  const next = clampToDome(
    (event.clientX - cx) / dome,
    (event.clientY - cy) / dome,
  );
  target.dx = next.dx;
  target.dy = next.dy;
  angle = Math.atan2(next.dy, next.dx);
  guided.value = true;
}

function onPointerLeave() {
  guided.value = false;
  lastTs = 0;
}

const lightStyle = computed(() => ({
  '--light-x': `${50 + light.dx * 36}%`,
  '--light-y': `${50 + light.dy * 32}%`,
}));

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  placeOnOrbit();
  light.dx = target.dx;
  light.dy = target.dy;
  raf = requestAnimationFrame(tick);
});

onUnmounted(() => {
  cancelAnimationFrame(raf);
});
</script>

<style scoped>
.login-rti-wash {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 90% 75% at var(--light-x) var(--light-y),
    color-mix(in srgb, var(--brand-from) 16%, transparent) 0%,
    transparent 62%
  );
}

:global(html.dark) .login-rti-wash {
  background: radial-gradient(
    ellipse 90% 75% at var(--light-x) var(--light-y),
    color-mix(in srgb, var(--brand-from) 22%, transparent) 0%,
    transparent 64%
  );
}
</style>
