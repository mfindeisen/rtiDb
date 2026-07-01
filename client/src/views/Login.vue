<template>
  <div class="max-w-md mx-auto mt-20">
    <div class="glass-card">
      <h2 class="text-3xl font-bold mb-6 text-slate-800 dark:text-white text-center">Admin Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="flex flex-col text-left">
          <label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Username</label>
          <input type="text" v-model="username" required placeholder="admin" class="form-input" />
        </div>
        
        <div class="flex flex-col text-left">
          <label class="mb-2 font-medium text-slate-700 dark:text-slate-200">Password</label>
          <input type="password" v-model="password" required placeholder="••••••••" class="form-input" />
        </div>
        
        <button type="submit" class="btn-primary w-full mt-4" :disabled="isLoading">
          {{ isLoading ? 'Authenticating...' : 'Login' }}
        </button>
      </form>

      <div v-if="error" class="mt-4 p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 rounded-lg text-center">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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
      body: JSON.stringify({ username: username.value, password: password.value })
    });
    
    const data = await res.json();
    
    if (res.ok && data.token) {
      localStorage.setItem('adminToken', data.token);
      router.push('/admin');
    } else {
      error.value = data.error || 'Login failed';
    }
  } catch (err) {
    console.error("Login error", err);
    error.value = 'Failed to connect to server';
  } finally {
    isLoading.value = false;
  }
};
</script>
