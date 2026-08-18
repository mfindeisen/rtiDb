<template>
  <div class="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          RTI Database
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Sign in to browse catalog records, RTI scans, and annotations.
        </p>
      </div>

      <div class="glass-card">
        <div class="relative mb-6">
          <h2 class="text-xl font-bold text-center text-slate-800 dark:text-white">Login</h2>
          <div class="absolute inset-y-0 right-0 flex items-center">
            <ThemeToggle />
          </div>
        </div>
        <form @submit.prevent="handleLogin" class="space-y-5" autocomplete="on">
          <div class="flex flex-col text-left">
            <Label for="username" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Username</Label>
            <Input
              id="username"
              v-model="username"
              name="username"
              type="text"
              autocomplete="username"
              autocapitalize="none"
              spellcheck="false"
              required
              placeholder="username"
              class="form-input"
              :disabled="isLoading"
            />
          </div>
          <div class="flex flex-col text-left">
            <Label for="password" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Password</Label>
            <Input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              placeholder="••••••••"
              class="form-input"
              :disabled="isLoading"
            />
          </div>
          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? 'Signing in…' : 'Sign in' }}
          </Button>
        </form>
        <Alert v-if="error" variant="destructive" class="mt-4">
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { postLoginPath } from '@/composables/useAuth';
import { login } from '@/api/auth';
import { ApiError } from '@/api/client';

const router = useRouter();
const route = useRoute();
const username = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');

const handleLogin = async () => {
  isLoading.value = true;
  error.value = '';

  try {
    await login(username.value, password.value);
    router.push(postLoginPath(route.query.redirect));
  } catch (err) {
    console.error('Login error', err);
    if (err instanceof ApiError) {
      try {
        const data = JSON.parse(err.body) as { error?: string; retryAfterSeconds?: number };
        if (err.status === 429) {
          const wait = data.retryAfterSeconds ? ` Try again in ${data.retryAfterSeconds}s.` : '';
          error.value = (data.error || 'Too many login attempts.') + wait;
        } else {
          error.value = data.error || 'Login failed';
        }
      } catch {
        error.value = err.body || 'Login failed';
      }
    } else {
      error.value = 'Failed to connect to server';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
