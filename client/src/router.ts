import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Gallery from './views/Gallery.vue';
import AdvancedSearch from './views/AdvancedSearch.vue';
import Admin from './views/Admin.vue';
import Login from './views/Login.vue';
import RecordDetail from './views/RecordDetail.vue';
import { isAuthenticated, getCurrentUser, postLoginPath, waitForAuth, hasPermission, canAccessAdmin } from '@/composables/useAuth';

const routes: RouteRecordRaw[] = [
  { path: '/login', component: Login, meta: { guest: true } },
  { path: '/', component: Gallery, meta: { requiresAuth: true } },
  { path: '/record/:slug', component: RecordDetail, meta: { requiresAuth: true } },
  { path: '/search', component: AdvancedSearch, meta: { requiresAuth: true } },
  { path: '/admin', component: Admin, meta: { requiresAuth: true } },
  {
    path: '/admin/audit',
    component: () => import('./views/AuthAudit.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/records/:id/edit',
    component: () => import('./views/AdminRecordEdit.vue'),
    meta: { requiresAuth: true, requiresEditRecord: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  await waitForAuth();
  const authed = isAuthenticated();
  const user = getCurrentUser();

  if (to.meta.guest) {
    if (authed) {
      return postLoginPath(to.query.redirect);
    }
    return;
  }

  if (to.meta.requiresAuth && !authed) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }

  if (to.path.startsWith('/admin')) {
    if (user?.role === 'researcher' || !canAccessAdmin()) {
      return '/';
    }
    if (to.meta.requiresAdmin && user?.role !== 'admin') {
      return '/admin';
    }
    if (to.meta.requiresEditRecord && !hasPermission('edit_record')) {
      return '/admin';
    }
  }
});

export default router;
