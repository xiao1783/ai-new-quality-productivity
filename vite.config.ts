import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  // GitHub Pages 项目站点路径：https://xiao1783.github.io/ai-new-quality-productivity/
  base: '/ai-new-quality-productivity/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ['echarts'],
          motion: ['framer-motion'],
          vendor: ['react', 'react-dom', 'lucide-react'],
        },
      },
    },
  },
})
