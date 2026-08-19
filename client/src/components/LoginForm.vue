<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <div class="text-center space-y-2">
      <img v-if="siteConfig.logoUrl" :src="siteConfig.logoUrl" alt="" class="h-14 w-14 mx-auto object-contain" />
      <h1 class="w-fit mx-auto text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-from)] to-[var(--brand-to)]">
        {{ siteConfig.siteName }}
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        {{ siteConfig.tagline }}
      </p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle class="font-semibold">Login to your account</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
        <CardAction>
          <ThemeToggle />
        </CardAction>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin" autocomplete="on">
          <FieldGroup>
            <Field>
              <FieldLabel for="username" class="font-semibold">Username</FieldLabel>
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
                :disabled="isLoading"
              />
            </Field>
            <Field>
              <FieldLabel for="password" class="font-semibold">Password</FieldLabel>
              <div class="relative">
                <Input
                  id="password"
                  v-model="password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  placeholder="••••••••"
                  class="pr-9"
                  :disabled="isLoading"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  class="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  :disabled="isLoading"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" />
                  <Eye v-else />
                </Button>
              </div>
            </Field>
            <Field>
              <Button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Signing in…' : 'Login' }}
              </Button>
            </Field>
            <Field v-if="error">
              <Alert variant="destructive">
                <AlertDescription>{{ error }}</AlertDescription>
              </Alert>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Eye, EyeOff } from '@lucide/vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { postLoginPath } from '@/composables/useAuth';
import { useSiteConfig } from '@/composables/useSiteConfig';
import { login } from '@/api/auth';
import { ApiError } from '@/api/client';

const props = defineProps<{
  class?: string
}>()

const { config: siteConfig } = useSiteConfig();
const router = useRouter();
const route = useRoute();
const username = ref('');
const password = ref('');
const showPassword = ref(false);
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
