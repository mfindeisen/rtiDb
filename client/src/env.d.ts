/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'vue' {
  export interface GlobalComponents {
    'modern-rti-viewer': import('vue').DefineComponent<{
      url?: string;
      src?: string;
    }>;
  }
}

export {};
