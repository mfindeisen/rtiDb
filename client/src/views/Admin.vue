<template>
  <div class="page-shell space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
      <Button variant="ghost" class="justify-start sm:justify-center" @click="$router.push('/')">
        <ArrowLeft class="w-4 h-4 mr-2" /> Back to Gallery
      </Button>
    </div>

    <Tabs v-model="activeTab">
      <TabsList v-if="userRole === 'admin'" class="mb-6 w-full grid grid-cols-2 gap-1 p-1 h-auto min-h-0 group-data-horizontal/tabs:h-auto sm:grid-cols-4 sm:w-auto sm:inline-flex sm:group-data-horizontal/tabs:h-8">
        <TabsTrigger value="records" aria-label="Records & Upload" class="h-auto min-h-10 whitespace-normal px-2 py-2 gap-1.5 text-xs sm:h-[calc(100%-1px)] sm:whitespace-nowrap sm:py-0.5 sm:text-sm">
          <FolderOpen class="w-4 h-4 shrink-0" />
          <span class="sm:hidden">Records</span>
          <span class="hidden sm:inline">Records & Upload</span>
        </TabsTrigger>
        <TabsTrigger value="catalog" class="h-auto min-h-10 whitespace-normal px-2 py-2 gap-1.5 text-xs sm:h-[calc(100%-1px)] sm:whitespace-nowrap sm:py-0.5 sm:text-sm">
          <Shapes class="w-4 h-4 shrink-0" /> Catalog
        </TabsTrigger>
        <TabsTrigger value="site" class="h-auto min-h-10 whitespace-normal px-2 py-2 gap-1.5 text-xs sm:h-[calc(100%-1px)] sm:whitespace-nowrap sm:py-0.5 sm:text-sm">
          <Palette class="w-4 h-4 shrink-0" /> Site
        </TabsTrigger>
        <TabsTrigger value="users" aria-label="User Management" class="h-auto min-h-10 whitespace-normal px-2 py-2 gap-1.5 text-xs sm:h-[calc(100%-1px)] sm:whitespace-nowrap sm:py-0.5 sm:text-sm">
          <Users class="w-4 h-4 shrink-0" />
          <span class="sm:hidden">Users</span>
          <span class="hidden sm:inline">User Management</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="records">
        <AdminRecordsTab />
      </TabsContent>

      <TabsContent v-if="userRole === 'admin'" value="catalog" class="space-y-10">
        <CatalogTypesPanel />
        <CatalogViewsPanel />
      </TabsContent>

      <TabsContent v-if="userRole === 'admin'" value="site" class="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        <SiteBrandingPanel />
        <SiteDateTimePanel />
      </TabsContent>

      <TabsContent v-if="userRole === 'admin'" value="users">
        <UserManagementPanel @unauthorized="logout" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, FolderOpen, Users, Shapes, Palette } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCurrentUser, logout as authLogout } from '@/composables/useAuth';
import UserManagementPanel from '@/components/admin/UserManagementPanel.vue';
import SiteBrandingPanel from '@/components/admin/SiteBrandingPanel.vue';
import SiteDateTimePanel from '@/components/admin/SiteDateTimePanel.vue';
import CatalogTypesPanel from '@/components/admin/CatalogTypesPanel.vue';
import CatalogViewsPanel from '@/components/admin/CatalogViewsPanel.vue';
import AdminRecordsTab from '@/components/admin/AdminRecordsTab.vue';

const router = useRouter();
const userRole = ref(getCurrentUser()?.role || 'editor');
const activeTab = ref('records');

const logout = async () => {
  await authLogout();
  router.push('/login');
};
</script>
