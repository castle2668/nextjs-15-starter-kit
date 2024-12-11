'use client'

import { Box, CircularProgress } from '@mui/material'

import { useAppSelector } from '@/lib/hooks'

// 保護需要認證的頁面
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  // 檢查 isAuthenticated 狀態，如果未認證，顯示載入中元件
  if (!isAuthenticated) {
    return (
      <Box
        className="flex h-[calc(100vh-64px)] items-center justify-center"
        role="status"
      >
        <CircularProgress />
      </Box>
    )
  }

  return <>{children}</>
}
