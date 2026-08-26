import { ref } from 'vue';

const isDark = ref(false);

function applyTheme(dark: boolean) {
  isDark.value = dark;
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  localStorage.theme = dark ? 'dark' : 'light';
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute('content', dark ? '#0a0f1a' : '#f8fafc');
  }
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
