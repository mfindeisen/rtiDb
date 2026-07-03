import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "RTI Ecosystem Documentation",
  description: "Unified documentation portal for rtiDb, modernRtiViewer, rtiprep, and neural_rti.",
  base: '/docs/',
  outDir: '../dist/docs',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/guide/getting-started' },
      { text: 'rtiDb', link: '/guide/rtidb' },
      { text: 'Viewer', link: '/technical/architecture' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Ecosystem Overview', link: '/guide/getting-started' },
        ]
      },
      {
        text: 'Ecosystem Components',
        items: [
          { text: 'rtiDb (Database & Server)', link: '/guide/rtidb' },
          { text: 'modernRtiViewer (Three.js)', link: '/technical/architecture' },
          { text: 'rtiprep (Go CLI Slicer)', link: '/guide/rtiprep' },
          { text: 'neural_rti (Python AI Pipeline)', link: '/guide/neural-rti' }
        ]
      },
      {
        text: 'Technical & Math',
        items: [
          { text: 'Math & Shaders (PTM/HSH)', link: '/technical/math' },
          { text: 'Neural RTI Architecture', link: '/technical/neural-rti' },
          { text: 'Case Study: DEMO-2024-SEAL-001', link: '/technical/case-study' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mfindeisen/rtiDb' }
    ],

    footer: {
      message: 'Developed by <a href="https://github.com/mfindeisen" target="_blank">Matthias Findeisen</a> | Unified RTI Ecosystem',
      copyright: 'Copyright © 2026-present'
    }
  }
})
