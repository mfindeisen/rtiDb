import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { initAuth } from '@/composables/useAuth';
import { loadDemoInfo } from '@/composables/useDemoMode';
import { loadSiteConfig } from '@/composables/useSiteConfig';

void Promise.all([initAuth(), loadSiteConfig(), loadDemoInfo()]).finally(() => {
  createApp(App).use(router).mount('#app');
});
