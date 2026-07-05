<template>
  <div class="flex flex-col min-h-screen text-foreground transition-colors duration-300">
    <nav
      v-if="showNav"
      class="sticky top-0 z-[100] bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
    >
      <div class="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3">
        <router-link to="/" class="min-w-0 shrink" @click="mobileMenuOpen = false">
          <h1 class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent truncate">
            RTI Database
          </h1>
        </router-link>

        <div class="hidden lg:flex items-center gap-4 xl:gap-6 flex-wrap justify-end">
          <router-link to="/" class="nav-link">Gallery</router-link>
          <router-link to="/search" class="nav-link">Search</router-link>
          <router-link v-if="canAccessAdmin" to="/admin" class="nav-link">Admin</router-link>
          <a href="/api/docs" target="_blank" rel="noopener" class="nav-link">Swagger API</a>
          <a href="/docs/" target="_blank" class="nav-link">Documentation</a>
          <Button variant="ghost" size="sm" class="text-slate-500 dark:text-slate-400" @click="handleLogout">
            Logout
          </Button>
          <Button variant="ghost" size="icon" @click="toggleTheme" title="Toggle Theme">
            <Sun v-if="isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </Button>
        </div>

        <div class="flex lg:hidden items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" @click="toggleTheme" title="Toggle Theme">
            <Sun v-if="isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" :aria-expanded="mobileMenuOpen" aria-label="Open menu" @click="mobileMenuOpen = !mobileMenuOpen">
            <X v-if="mobileMenuOpen" class="w-5 h-5" />
            <Menu v-else class="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        v-if="mobileMenuOpen"
        class="lg:hidden border-t border-slate-200/80 dark:border-white/10 px-4 py-3 pb-4 space-y-1 bg-white/95 dark:bg-slate-950/95"
      >
        <router-link to="/" class="mobile-nav-link" @click="mobileMenuOpen = false">Gallery</router-link>
        <router-link to="/search" class="mobile-nav-link" @click="mobileMenuOpen = false">Search</router-link>
        <router-link v-if="canAccessAdmin" to="/admin" class="mobile-nav-link" @click="mobileMenuOpen = false">Admin</router-link>
        <a href="/api/docs" target="_blank" rel="noopener" class="mobile-nav-link" @click="mobileMenuOpen = false">Swagger API</a>
        <a href="/docs/" target="_blank" class="mobile-nav-link" @click="mobileMenuOpen = false">Documentation</a>
        <button type="button" class="mobile-nav-link w-full text-left text-red-600 dark:text-red-400" @click="handleLogout">
          Logout
        </button>
      </div>
    </nav>

    <main :class="showNav ? 'flex-grow px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8' : 'flex-grow flex flex-col'">
      <router-view />
    </main>

    <footer
      v-if="showNav"
      class="py-5 px-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs md:text-sm text-center"
    >
      <a href="/api/docs" target="_blank" rel="noopener" class="nav-link">Swagger API</a>
      <span class="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
      <a href="https://github.com/mfindeisen/rtiDb" target="_blank" class="flex items-center justify-center space-x-1.5 nav-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" class="w-4 h-4"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
        <span>mfindeisen/rtiDb</span>
      </a>
      <span class="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
      <a href="https://github.com/mfindeisen/modernRtiViewer" target="_blank" class="flex items-center justify-center space-x-1.5 nav-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" class="w-4 h-4"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
        <span>mfindeisen/modernRtiViewer</span>
      </a>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Sun, Moon, Menu, X } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { canAccessAdmin, logout } from './lib/auth.js';

const route = useRoute();
const router = useRouter();
const isDark = ref(false);
const mobileMenuOpen = ref(false);

const showNav = computed(() => !route.meta.guest);

watch(() => route.fullPath, () => {
  mobileMenuOpen.value = false;
});

const handleLogout = () => {
  mobileMenuOpen.value = false;
  logout();
  router.push('/login');
};

onMounted(() => {
  if (localStorage.theme === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
};
</script>
