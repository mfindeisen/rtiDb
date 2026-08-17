import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Gallery from './views/Gallery.vue';
import AdvancedSearch from './views/AdvancedSearch.vue';
import Admin from './views/Admin.vue';
import Login from './views/Login.vue';
import RecordDetail from './views/RecordDetail.vue';
import { isAuthenticated, getCurrentUser, postLoginPath, waitForAuth } from '@/composables/useAuth';

const routes: RouteRecordRaw[] = [
  { path: '/login', component: Login, meta: { guest: true } },
  { path: '/', component: Gallery, meta: { public: true } },
  { path: '/record/:slug', component: RecordDetail, meta: { public: true } },
  { path: '/search', component: AdvancedSearch, meta: { requiresAuth: true } },
  { path: '/admin', component: Admin, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  await waitForAuth();
  const authed = isAuthenticated();
  const user = getCurrentUser();

  if (to.meta.guest) {
    if (authed) {
      next(postLoginPath(to.query.redirect));
    } else {
      next();
    }
    return;
  }

  if (to.meta.public) {
    next();
    return;
  }

  if (to.meta.requiresAuth && !authed) {
    next({ path: '/login', query: { redirect: to.fullPath } });
    return;
  }

  if (to.path === '/admin' && user?.role === 'researcher') {
    next('/');
    return;
  }

  next();
});

export default router;
