import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES
        ? "HAL-TH467-Deploy"         
        : "./",
  server: {
    host: true,
    watch: {
      usePolling: true
    }
  },
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions: {
      scss: {
        additionalData: [

        ]
      },
    },
  },
  resolve: {
    alias: {
      '@/': path.join(__dirname, './src/'),
      '@assets': path.join(__dirname, './src/assets/'),
      '@css' : path.join(__dirname, './src/assets/css/'),
      '@scss': path.join(__dirname, './src/assets/scss/'),
    },
  },
})
