<template>
  <div class="page-shell space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
      <Button variant="ghost" class="justify-start sm:justify-center" @click="$router.push('/')">
        <ArrowLeft class="w-4 h-4 mr-2" /> Back to Gallery
      </Button>
    </div>
    <AuthAuditPanel @unauthorized="logout" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeft } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { logout as authLogout } from '@/composables/useAuth';
import AuthAuditPanel from '@/components/admin/AuthAuditPanel.vue';

const router = useRouter();

const logout = async () => {
  await authLogout();
  router.push('/login');
};
</script>
