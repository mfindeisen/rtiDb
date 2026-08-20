<template>
  <ConfigProvider :teleport-to="overlayContainer">
  <div class="flex flex-col lg:min-h-svh text-foreground transition-colors duration-300">
    <nav
      v-if="showNav"
      class="sticky top-0 z-[100] bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
    >
      <div class="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3">
        <router-link to="/" class="min-w-0 shrink flex items-center gap-2.5" @click="mobileMenuOpen = false">
          <img v-if="siteConfig.logoUrl" :src="siteConfig.logoUrl" alt="" class="h-8 w-8 sm:h-9 sm:w-9 object-contain shrink-0" />
          <h1 class="text-lg sm:text-2xl font-bold bg-clip-text text-transparent truncate bg-gradient-to-r from-[var(--brand-from)] to-[var(--brand-to)]">
            {{ siteConfig.siteName }}
          </h1>
        </router-link>

        <div class="hidden lg:flex items-center gap-4 xl:gap-6 flex-wrap justify-end">
          <router-link to="/" class="nav-link">Gallery</router-link>
          <router-link to="/search" class="nav-link">Search</router-link>
          <router-link v-if="showAdminLink" to="/admin" class="nav-link" :class="{ 'router-link-active': route.path.startsWith('/admin') }">Admin</router-link>
          <a href="/api/docs" target="_blank" rel="noopener" class="nav-link">Swagger API</a>
          <a href="/docs/" target="_blank" class="nav-link">Documentation</a>
          <Button variant="ghost" size="sm" class="text-slate-500 dark:text-slate-400" @click="handleLogout">
            Logout
          </Button>
          <ThemeToggle />
        </div>

        <div class="flex lg:hidden items-center gap-1 shrink-0">
          <ThemeToggle />
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
        <router-link v-if="showAdminLink" to="/admin" class="mobile-nav-link" :class="{ 'router-link-active': route.path.startsWith('/admin') }" @click="mobileMenuOpen = false">Admin</router-link>
        <a href="/api/docs" target="_blank" rel="noopener" class="mobile-nav-link" @click="mobileMenuOpen = false">Swagger API</a>
        <a href="/docs/" target="_blank" class="mobile-nav-link" @click="mobileMenuOpen = false">Documentation</a>
        <Button variant="ghost" class="mobile-nav-link w-full justify-start text-red-600 dark:text-red-400" @click="handleLogout">
          Logout
        </Button>
      </div>
    </nav>

    <main :class="showNav ? 'lg:flex-1 min-w-0 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8' : 'flex-1 flex flex-col min-w-0'">
      <router-view />
    </main>

    <ConfirmDialogHost />

    <footer class="border-t bg-background">
      <div class="page-shell flex flex-col items-center gap-3 px-4 py-6 pb-28 text-center text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:py-6">
        <a href="/api/docs" target="_blank" rel="noopener" class="hover:text-foreground hover:underline underline-offset-4">
          Swagger API
        </a>
        <a href="https://github.com/mfindeisen/rtiDb" target="_blank" rel="noopener" class="hover:text-foreground hover:underline underline-offset-4">
          GitHub rtiDb
        </a>
        <a href="https://github.com/mfindeisen/modernRtiViewer" target="_blank" rel="noopener" class="hover:text-foreground hover:underline underline-offset-4">
          GitHub modernRtiViewer
        </a>
      </div>
    </footer>
  </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ConfigProvider } from 'reka-ui';
import { Menu, X } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle.vue';
import ConfirmDialogHost from '@/components/ConfirmDialogHost.vue';
import { logout, useAuth } from '@/composables/useAuth';
import { useTheme } from '@/composables/useTheme';
import { useSiteConfig } from '@/composables/useSiteConfig';
import { useOverlayContainer } from '@/composables/useOverlayContainer';

const route = useRoute();
const router = useRouter();
const { initTheme } = useTheme();
const { config: siteConfig } = useSiteConfig();
const { canAccessAdmin: showAdminLink } = useAuth();
const overlayContainer = useOverlayContainer();
const mobileMenuOpen = ref(false);

const showNav = computed(() => !route.meta.guest);

watch(() => route.fullPath, () => {
  mobileMenuOpen.value = false;
});

const handleLogout = async () => {
  mobileMenuOpen.value = false;
  await logout();
  router.push('/login');
};

onMounted(() => {
  initTheme();
});
</script>
