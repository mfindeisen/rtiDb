import { createRouter, createWebHistory } from 'vue-router';
import Gallery from './views/Gallery.vue';
import AdvancedSearch from './views/AdvancedSearch.vue';
import Admin from './views/Admin.vue';
import Login from './views/Login.vue';
import RecordDetail from './views/RecordDetail.vue';
import { isAuthenticated, parseTokenPayload, postLoginPath } from './lib/auth.js';

const routes = [
  { path: '/login', component: Login, meta: { guest: true } },
  { path: '/', component: Gallery, meta: { requiresAuth: true } },
  { path: '/search', component: AdvancedSearch, meta: { requiresAuth: true } },
  { path: '/admin', component: Admin, meta: { requiresAuth: true } },
  { path: '/record/:slug', component: RecordDetail, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authed = isAuthenticated();
  const payload = parseTokenPayload();

  if (to.meta.guest) {
    if (authed) {
      next(postLoginPath(to.query.redirect));
    } else {
      next();
    }
    return;
  }

  if (to.meta.requiresAuth && !authed) {
    next({ path: '/login', query: { redirect: to.fullPath } });
    return;
  }

  if (to.path === '/admin' && payload?.role === 'researcher') {
    next('/');
    return;
  }

  next();
});

export default router;
