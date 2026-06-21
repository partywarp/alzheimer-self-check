import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  plugins: [tailwindcss()],
  base: command === 'serve' ? '/' : process.env.BASE_PATH,
  build: {
    rollupOptions: {
      input: ['index.html', 'science.html', 'about.html'],
    },
  },
}))
