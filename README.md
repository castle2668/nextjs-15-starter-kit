# Next.js 15 Starter Kit

基於 Next.js 15 的前端開發模板，整合 MUI v6 和 TailwindCSS，並配備完整的程式碼品質控制工具。

## 使用技術

- Next.js 15.0.3 + React 18
- Material-UI 6.1.9
- TailwindCSS 3.4.1
- TypeScript 5.x
- ESLint + Prettier
- Husky + lint-staged

## 快速開始

安裝依賴：

```bash
npm install
```

啟動開發環境（使用 Turbopack）：

```bash
npm run dev
```

## 開發指令

```bash
npm run dev          # 開發環境
npm run build        # 建置專案
npm run start        # 執行產品環境
npm run lint         # 程式碼檢查
npm run format       # 格式化程式碼
```

## Git 提交規範

本專案使用 [Husky](https://typicode.github.io/husky/) 和 [lint-staged](https://github.com/okonet/lint-staged) 來確保程式碼品質：

- **Husky**：在 Git 提交時自動運行腳本
- **lint-staged**：只檢查和格式化暫存區的文件

提交程式碼時會自動執行：

- JS/TS 文件：ESLint 檢查 + Prettier 格式化
- 其他文件：Prettier 格式化

## 參考文件

- [Next.js](https://nextjs.org/docs)
- [MUI](https://mui.com/material-ui/)
- [TailwindCSS](https://tailwindcss.com/docs)

## 部署

Next.js 官方建議使用 [Vercel](https://vercel.com) 部署。
