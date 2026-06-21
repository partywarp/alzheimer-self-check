import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const productionBase = () => {
  const base = process.env.BASE_PATH || '/'
  return base.endsWith('/') ? base : `${base}/`
}

export default defineConfig(({ command }) => ({
  plugins: [tailwindcss()],
  base: command === 'serve' ? '/' : productionBase(),
  build: {
    rollupOptions: {
      input: ['index.html', 'science.html', 'about.html'],
    },
  },
}))
