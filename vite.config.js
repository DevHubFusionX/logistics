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
    target: ['es2020', 'chrome80', 'safari13'],
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    reportCompressedSize: false,
    // Drop console.log and debugger statements in production (reduces TBT)
    esbuild: {
      drop: ['console', 'debugger'],
      pure: ['console.log', 'console.debug', 'console.warn', 'console.error'],
      legalComments: 'none',
    },
    rollupOptions: {
      treeshake: {
        // 'no-external' is safe: tree-shakes internal side-effect-free modules
        // while leaving third-party packages (CSS, Zustand persist, etc.) intact.
        // moduleSideEffects: false breaks Tailwind @layer and Zustand persist.
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/react-router-dom/') || id.includes('node_modules/@remix-run/')) {
            return 'vendor-router'
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/@tanstack/')) {
            return 'vendor-query'
          }
          if (id.includes('node_modules/chart.js/') || id.includes('node_modules/react-chartjs-2/')) {
            return 'vendor-charts'
          }
          if (id.includes('node_modules/react-paystack/')) {
            return 'vendor-paystack'
          }
          // Heavy maps library — only used in admin, never load on public pages
          if (id.includes('node_modules/react-simple-maps/') || id.includes('node_modules/d3')) {
            return 'vendor-maps'
          }
          // Tour/onboarding libraries — never needed on first load
          if (id.includes('node_modules/react-joyride/') || id.includes('node_modules/onborda')) {
            return 'vendor-tours'
          }
          if (id.includes('node_modules/zustand/') || id.includes('node_modules/prop-types/') || id.includes('node_modules/react-hot-toast/')) {
            return 'vendor-utils'
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
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
