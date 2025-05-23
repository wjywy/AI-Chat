import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { crx } from '@crxjs/vite-plugin'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import fs from 'fs'

// 读取manifest.json文件内容
const manifestPath = path.resolve(__dirname, './public/manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // 启用对TypeScript的支持
      include: ['**/*.tsx', '**/*.ts']
    }),
    crx({
      manifest,
      browser: 'chrome'
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
