import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/clio_vue3/', // ← 這裡輸入 repo 名稱
})
