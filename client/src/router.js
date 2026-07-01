import { createRouter, createWebHistory } from 'vue-router';
import Gallery from './views/Gallery.vue';
import Admin from './views/Admin.vue';
import Login from './views/Login.vue';
import RecordDetail from './views/RecordDetail.vue';

const routes = [
  { path: '/', component: Gallery },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin, meta: { requiresAuth: true } },
  { path: '/record/:id', component: RecordDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/admin');
  } else {
    next();
  }
});

export default router;
