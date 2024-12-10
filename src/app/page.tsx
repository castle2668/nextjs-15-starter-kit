'use client'

import { Box, Card, Typography } from '@mui/material'

export default function HomePage() {
  return (
    <Box className="space-y-6">
      <Typography variant="h5" className="font-medium text-gray-800">
        專案概覽
      </Typography>

      {/* 主要統計數據 */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="mb-1 text-gray-500">已安裝套件</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-medium">42</span>
            <span className="text-gray-500">個</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-1 text-gray-500">TypeScript 覆蓋率</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-medium text-emerald-500">98</span>
            <span className="text-gray-500">%</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-1 text-gray-500">待更新套件</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-medium text-amber-500">5</span>
            <span className="text-gray-500">個</span>
          </div>
        </Card>
      </div>

      {/* 次要統計數據 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="mb-1 text-gray-500">測試覆蓋率</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-medium">92%</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-1 text-gray-500">構建時間</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-medium">2.4s</span>
          </div>
        </Card>
      </div>

      {/* 專案資訊 */}
      <Card className="p-6">
        <div className="mb-4 text-lg font-medium">最新更新</div>
        <div className="space-y-2 text-gray-600">
          <div>• 升級至 Next.js 15.0.0</div>
          <div>• 整合 Material UI v6</div>
          <div>• 新增 Tailwind CSS 支援</div>
          <div>• 更新開發工具鏈</div>
        </div>
      </Card>

      {/* 效能分析 */}
      <Card className="h-[300px] p-6">
        <div className="mb-4 text-lg font-medium">效能分析</div>
        <div className="text-gray-500">構建效能圖表區域</div>
      </Card>
    </Box>
  )
}
