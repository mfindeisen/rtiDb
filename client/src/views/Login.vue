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
        <h2 class="text-xl font-bold text-center text-slate-800 dark:text-white mb-6">Login</h2>
        <form @submit.prevent="handleLogin" class="space-y-5" autocomplete="on">
          <div class="flex flex-col text-left">
            <label for="username" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Username</label>
            <input
              id="username"
              v-model="username"
              name="username"
              type="text"
              autocomplete="username"
              autocapitalize="none"
              spellcheck="false"
              required
              placeholder="admin"
              class="form-input"
              :disabled="isLoading"
            />
          </div>
          <div class="flex flex-col text-left">
            <label for="password" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Password</label>
            <input
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
          <button type="submit" class="btn-primary w-full" :disabled="isLoading">
            {{ isLoading ? 'Signing in…' : 'Sign in' }}
          </button>
        </form>
        <p v-if="error" class="mt-4 text-sm text-red-600 dark:text-red-400 text-center">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { postLoginPath } from '../lib/auth.js';

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
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem('adminToken', data.token);
      router.push(postLoginPath(route.query.redirect));
    } else {
      error.value = data.error || 'Login failed';
    }
  } catch (err) {
    console.error('Login error', err);
    error.value = 'Failed to connect to server';
  } finally {
    isLoading.value = false;
  }
};
</script>
