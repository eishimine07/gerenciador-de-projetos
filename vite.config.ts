/// <reference types="vitest" />
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const plugins = [
    vue(),
    vuetify({ autoImport: true }),
  ]

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      deps: {
        inline: ['vuetify'],
      },
      port: 8080,
    },
    test: {
      clearMocks: true,
      coverage: {
        reporter: ['json', 'html'],
      },
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./vitest.setup.ts'],
    },
  }
})
