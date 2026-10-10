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
    // 项目位于 OneDrive 目录，esbuild 0.21 在 renderChunk 阶段转译大 chunk 时
    // 与 Windows Defender 实时扫描存在「写完即删」竞态（packet.bin Access denied）。
    // target esnext + terser 时 Vite 会跳过 renderChunk 的 esbuild 降级转译；
    // TS/TSX 转换在小文件 transform 阶段已完成，不受影响。
    target: 'esnext',
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
