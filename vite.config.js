import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    visualizer({
      open: false,
      filename: 'dist/bundle-stats.html',
      gzipSize: true,
      brotliSize: true
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React - smallest possible initial bundle
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'vendor-react'
          }
          // Router - loaded on app start but small
          if (id.includes('node_modules/react-router-dom/') || id.includes('node_modules/@remix-run/')) {
            return 'vendor-router'
          }
          // framer-motion is large (~100KB gzipped) - split it out
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion'
          }
          // Lucide-react - tree-shake friendly, keep separate
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons'
          }
          // React Query - data fetching
          if (id.includes('node_modules/@tanstack/')) {
            return 'vendor-query'
          }
          // Charts - only loaded in dashboard
          if (id.includes('node_modules/chart.js/') || id.includes('node_modules/react-chartjs-2/')) {
            return 'vendor-charts'
          }
          // Paystack - only loaded in payment
          if (id.includes('node_modules/react-paystack/')) {
            return 'vendor-paystack'
          }
          // Small utilities
          if (id.includes('node_modules/zustand/') || id.includes('node_modules/prop-types/') || id.includes('node_modules/react-hot-toast/')) {
            return 'vendor-utils'
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://dera-api.daraexpress.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
