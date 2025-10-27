import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://dera-api-age1.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
