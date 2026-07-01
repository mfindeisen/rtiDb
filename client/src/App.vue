<template>
  <div class="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <nav class="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
      <router-link to="/">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          RTI Database
        </h1>
      </router-link>
      <div class="flex items-center space-x-6">
        <router-link to="/" class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors" active-class="!text-blue-600 dark:!text-white">Gallery</router-link>
        <router-link to="/admin" class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors" active-class="!text-blue-600 dark:!text-white">Admin Upload</router-link>
        
        <button @click="toggleTheme" class="ml-4 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors" title="Toggle Theme">
          <Sun v-if="isDark" class="w-5 h-5" />
          <Moon v-else class="w-5 h-5" />
        </button>
      </div>
    </nav>
    <main class="flex-grow p-8">
      <router-view></router-view>
    </main>
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
