import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Esto debería establecer la base de la ruta relativa
  plugins: [react()],
  server: {
    proxy: {
      '/phonebook/api/persons': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
