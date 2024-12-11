'use client'

import { Box, Button, Card, Typography } from '@mui/material'
import { useState } from 'react'

import type { TestResponse } from '@/app/api/test/types'
import { RequireAuth } from '@/features/auth/components/RequireAuth'
import { fetchApi } from '@/lib/api'

export default function HomePage() {
  const [testMessage, setTestMessage] = useState('')

  const handleTestApi = async () => {
    try {
      const response = await fetchApi<TestResponse>('/api/test')
      setTestMessage(response.message)
    } catch (error) {
      console.error('API 測試失敗:', error)
    }
  }

  return (
    <RequireAuth>
      <Box className="space-y-6">
        <div className="space-y-4">
          <Button variant="contained" onClick={handleTestApi}>
            測試認證 API
          </Button>
          {testMessage && (
            <div className="mt-2 text-green-600">{testMessage}</div>
          )}
        </div>

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
    </RequireAuth>
  )
}
