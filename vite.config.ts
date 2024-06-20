import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      include: ['src/**/*'],
      exclude: ['src/main.ts'],
    },
  },
})
