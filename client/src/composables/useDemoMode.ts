import { computed, readonly, ref } from 'vue';
import { getDemoInfo, type DemoInfo } from '@/api/demo';

const demoInfo = ref<DemoInfo>({ demoMode: false });
const loaded = ref(false);

export async function loadDemoInfo(): Promise<DemoInfo> {
  demoInfo.value = await getDemoInfo();
  loaded.value = true;
  return demoInfo.value;
}

export function useDemoMode() {
  return {
    demoInfo: readonly(demoInfo),
    loaded: readonly(loaded),
    demoMode: computed(() => demoInfo.value.demoMode),
    demoCredentials: computed(() => {
      if (!demoInfo.value.demoMode) return null;
      const { username, password } = demoInfo.value;
      if (!username || password == null) return null;
      return { username, password };
    }),
  };
}
