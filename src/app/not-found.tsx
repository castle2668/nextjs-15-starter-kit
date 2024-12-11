'use client'

import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <Box className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <Box className="text-center">
        <Typography
          variant="h1"
          className="mb-4 text-8xl font-bold text-gray-800"
        >
          404
        </Typography>
        <Typography variant="h4" className="mb-6 text-gray-600">
          找不到頁面
        </Typography>
        <Typography className="mb-8 text-gray-500">
          抱歉，您要尋找的頁面不存在或已被移除。
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push('/')}
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          返回首頁
        </Button>
      </Box>
    </Box>
  )
}
