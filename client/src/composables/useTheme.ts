import { ref } from 'vue';

const isDark = ref(false);

function applyTheme(dark: boolean) {
  isDark.value = dark;
  document.documentElement.classList.toggle('dark', dark);
  localStorage.theme = dark ? 'dark' : 'light';
}

export function useTheme() {
  function initTheme() {
    applyTheme(localStorage.theme === 'dark');
  }

  function toggleTheme() {
    applyTheme(!isDark.value);
  }

  return { isDark, initTheme, toggleTheme };
}
