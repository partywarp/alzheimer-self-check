import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  plugins: [tailwindcss()],
  base: command === 'serve' ? '/' : '/alzheimer-self-check/',
  build: {
    rollupOptions: {
      input: ['index.html', 'science.html', 'about.html'],
    },
  },
}))
