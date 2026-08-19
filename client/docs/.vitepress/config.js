import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "RTI Ecosystem Documentation",
  description: "Unified documentation portal for rtiDb, modernRtiViewer, rtiprep, and neural_rti.",
  base: '/docs/',
  outDir: '../dist/docs',
  ignoreDeadLinks: 'localhostLinks',
  markdown: {
    math: true,
  },
  vite: {
    server: {
      port: 5174,
      strictPort: true,
      host: '127.0.0.1',
      hmr: {
        host: '127.0.0.1',
        port: 5174,
        clientPort: 5174,
      },
    },
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/guide/getting-started' },
      { text: 'rtiDb', link: '/guide/rtidb' },
      { text: 'API', link: '/guide/api' },
      { text: 'Viewer', link: '/guide/viewer' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Ecosystem Overview', link: '/guide/getting-started' },
        ]
      },
      {
        text: 'rtiDb',
        items: [
          { text: 'Catalog & Admin', link: '/guide/rtidb' },
          { text: 'REST API', link: '/guide/api' },
        ]
      },
      {
        text: 'Viewer & Processing',
        items: [
          { text: 'modernRtiViewer', link: '/guide/viewer' },
          { text: 'rtiprep (Go CLI)', link: '/guide/rtiprep' },
          { text: 'neural_rti (Python)', link: '/guide/neural-rti' },
        ]
      },
      {
        text: 'Technical & Math',
        items: [
          { text: 'Viewer Architecture', link: '/technical/architecture' },
          { text: 'Math & Shaders (PTM/HSH/Neural)', link: '/technical/math' },
          { text: 'Neural RTI Architecture', link: '/technical/neural-rti' },
          { text: 'Case Study: DEMO-2024-SEAL-001', link: '/technical/case-study' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mfindeisen/rtiDb' }
    ],

    footer: {
      message: 'Developed by <a href="https://github.com/mfindeisen" target="_blank">Matthias Findeisen</a>',
      copyright: ''
    }
  }
})
