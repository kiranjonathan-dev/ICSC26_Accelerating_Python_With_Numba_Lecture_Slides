import { defineConfig } from 'slidev'

export default defineConfig({
  mermaid: {
    theme: 'base',
    themeVariables: {
      // Node styling
      primaryColor: 'var(--nv-c-sky)',
      primaryBorderColor: 'var(--nv-c-sky-dark)',
      primaryTextColor: 'var(--nv-c-on-accent)',

      // Edges / arrows
      lineColor: 'var(--nv-c-sky-dark)',

      // Background follows theme
      background: 'transparent',

      // Typography
      fontFamily: 'inherit',
    },
  },
})
