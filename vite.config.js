import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 
import path from 'path'

export default defineConfig({
  plugins: [
    react(), 
    svgr() 
  ],
  resolve: {
    alias: {
      '@2d': path.resolve(__dirname, './2d'),
      '@3d': path.resolve(__dirname, './3d'),
      '@shared': path.resolve(__dirname, './shared'),
    }
  }
})