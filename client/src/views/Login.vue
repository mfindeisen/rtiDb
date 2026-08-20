<template>
  <div
    ref="rootEl"
    class="relative flex flex-1 w-full items-center justify-center overflow-hidden p-6 md:p-10 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900"
    :style="lightStyle"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="login-rti-wash" aria-hidden="true" />
    <div ref="specimenEl" class="login-specimen relative z-10 w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';

const ORBIT_PERIOD_MS = 64_000;
const ORBIT_RADIUS = 0.62;
const FOLLOW_TAU_MS = 420;

const rootEl = ref<HTMLElement | null>(null);
const specimenEl = ref<HTMLElement | null>(null);
const guided = ref(false);
const light = reactive({ dx: 0, dy: -ORBIT_RADIUS });
const origin = reactive({ x: 0, y: 0 });

let angle = -Math.PI / 2;
let lightAngle = -Math.PI / 2;
let lightRadius = ORBIT_RADIUS;
let targetAngle = -Math.PI / 2;
let targetRadius = ORBIT_RADIUS;
let raf = 0;
let lastTs = 0;
let reducedMotion = false;

function clampToDome(dx: number, dy: number) {
  const len = Math.hypot(dx, dy);
  if (len > 1) return { dx: dx / len, dy: dy / len };
  return { dx, dy };
}

function updateOrigin() {
  const root = rootEl.value;
  const specimen = specimenEl.value ?? root;
  if (!root || !specimen) return;
  const canvas = root.getBoundingClientRect();
  const spec = specimen.getBoundingClientRect();
  origin.x = spec.left + spec.width / 2 - canvas.left;
  origin.y = spec.top + spec.height / 2 - canvas.top;
}

function shortestAngleDelta(from: number, to: number) {
  let diff = to - from;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return diff;
}

function applyLight() {
  light.dx = Math.cos(lightAngle) * lightRadius;
  light.dy = Math.sin(lightAngle) * lightRadius;
}

function placeOnOrbit() {
  targetAngle = angle;
  targetRadius = ORBIT_RADIUS;
}

function tick(ts: number) {
  updateOrigin();
  const dt = Math.min(32, lastTs ? ts - lastTs : 16);
  lastTs = ts;

  if (!guided.value && !reducedMotion) {
    angle += (dt / ORBIT_PERIOD_MS) * Math.PI * 2;
    placeOnOrbit();
  }

  const follow = 1 - Math.exp(-dt / FOLLOW_TAU_MS);
  lightAngle += shortestAngleDelta(lightAngle, targetAngle) * follow;
  lightRadius += (targetRadius - lightRadius) * follow;
  applyLight();
  raf = requestAnimationFrame(tick);
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || !rootEl.value) return;
  updateOrigin();
  const canvas = rootEl.value.getBoundingClientRect();
  const dome = Math.min(canvas.width, canvas.height) * 0.42;
  const next = clampToDome(
    (event.clientX - canvas.left - origin.x) / dome,
    (event.clientY - canvas.top - origin.y) / dome,
  );
  const r = Math.hypot(next.dx, next.dy);
  targetRadius = r;
  if (r > 0.04) {
    targetAngle = Math.atan2(next.dy, next.dx);
    angle = targetAngle;
  }
  guided.value = true;
}

function onPointerLeave() {
  guided.value = false;
  lastTs = 0;
}

const lightStyle = computed(() => {
  const azimuth = Math.atan2(light.dy, light.dx) * (180 / Math.PI);
  return {
    '--origin-x': `${origin.x}px`,
    '--origin-y': `${origin.y}px`,
    '--light-angle': `${azimuth + 90}deg`,
    '--shadow-x': `${(-light.dx * 16).toFixed(1)}px`,
    '--shadow-y': `${(8 - light.dy * 14).toFixed(1)}px`,
  };
});

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  updateOrigin();
  placeOnOrbit();
  lightAngle = targetAngle;
  lightRadius = targetRadius;
  applyLight();
  raf = requestAnimationFrame(tick);
});

onUnmounted(() => {
  cancelAnimationFrame(raf);
});
</script>

<style scoped>
.login-rti-wash {
  position: absolute;
  left: var(--origin-x);
  top: var(--origin-y);
  width: 200vmax;
  height: 200vmax;
  margin: -100vmax 0 0 -100vmax;
  pointer-events: none;
  transform-origin: 50% 50%;
  transform: rotate(var(--light-angle));
  background: radial-gradient(
    ellipse 70% 55% at 50% 18%,
    color-mix(in srgb, var(--brand-from) 22%, transparent) 0%,
    color-mix(in srgb, var(--brand-from) 10%, transparent) 42%,
    transparent 72%
  );
}

:global(html.dark) .login-rti-wash {
  background: radial-gradient(
    ellipse 70% 55% at 50% 18%,
    color-mix(in srgb, var(--brand-from) 28%, transparent) 0%,
    color-mix(in srgb, var(--brand-from) 12%, transparent) 42%,
    transparent 72%
  );
}

.login-specimen :deep([data-slot='card']) {
  box-shadow:
    0 10px 28px color-mix(in srgb, #0f172a 7%, transparent),
    var(--shadow-x) var(--shadow-y) 22px color-mix(in srgb, #0f172a 12%, transparent);
}

:global(html.dark) .login-specimen :deep([data-slot='card']) {
  box-shadow:
    0 10px 28px color-mix(in srgb, black 28%, transparent),
    var(--shadow-x) var(--shadow-y) 24px color-mix(in srgb, black 36%, transparent);
}
</style>
