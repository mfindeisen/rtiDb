<template>
  <div class="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <nav class="sticky top-0 z-[100] flex justify-between items-center px-8 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
      <router-link to="/">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          RTI Database
        </h1>
      </router-link>
      <div class="flex items-center space-x-6">
        <router-link to="/" class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors" active-class="!text-blue-600 dark:!text-white">Gallery</router-link>
        <router-link to="/admin" class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors" active-class="!text-blue-600 dark:!text-white">Admin Upload</router-link>
        <a href="/docs/" target="_blank" class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">Documentation</a>
        
        <button @click="toggleTheme" class="ml-4 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors" title="Toggle Theme">
          <Sun v-if="isDark" class="w-5 h-5" />
          <Moon v-else class="w-5 h-5" />
        </button>
      </div>
    </nav>
    <main class="flex-grow p-8">
      <router-view></router-view>
    </main>
    <footer class="py-6 border-t border-slate-200 dark:border-white/10 flex justify-center items-center space-x-6 text-xs md:text-sm">
      <a href="https://github.com/mfindeisen/rtiDb" target="_blank" class="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" class="w-4 h-4"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
        <span>mfindeisen/rtiDb</span>
      </a>
      <span class="text-slate-300 dark:text-slate-700">|</span>
      <a href="https://github.com/mfindeisen/modernRtiViewer" target="_blank" class="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" class="w-4 h-4"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
        <span>mfindeisen/modernRtiViewer</span>
      </a>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Sun, Moon } from '@lucide/vue';

const isDark = ref(false);

onMounted(() => {
  // Default to light mode unless user explicitly selected dark previously
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
