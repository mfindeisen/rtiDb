<template>
  <Button variant="ghost" size="icon" title="Toggle Theme" @click="toggleTheme">
    <Sun v-if="isDark" class="w-5 h-5" />
    <Moon v-else class="w-5 h-5" />
  </Button>
</template>

<script setup lang="ts">
import { Sun, Moon } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>
