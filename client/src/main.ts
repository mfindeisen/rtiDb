import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { initAuth } from '@/composables/useAuth';
import { loadSiteConfig } from '@/composables/useSiteConfig';

void Promise.all([initAuth(), loadSiteConfig()]).finally(() => {
  createApp(App).use(router).mount('#app');
});
