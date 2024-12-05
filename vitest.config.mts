/// <reference types="vitest" />  // TypeScript 的型別參考
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // 主要配置
  plugins: [react()], // 啟用 React 插件

  // 測試相關設定
  test: {
    globals: true, // 允許使用全域函數（如 describe, it, expect）
    environment: 'jsdom', // 使用 jsdom 模擬瀏覽器環境
    setupFiles: ['./src/test/setup.ts'], // 測試前執行的設定檔
    include: ['**/*.test.{ts,tsx}'], // 要包含的測試檔案 pattern
    // 覆蓋率報告設定
    coverage: {
      provider: 'v8', // 使用 V8 引擎的覆蓋率工具
      reporter: ['text', 'json', 'html'], // 產生三種格式的報告
    },
  },

  // 路徑別名設定
  resolve: {
    alias: {
      '@': '/src', // 允許使用 @/ 作為 src/ 的別名
    },
  },
})
