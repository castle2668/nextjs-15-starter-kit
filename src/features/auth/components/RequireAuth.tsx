'use client'

import { Box, CircularProgress } from '@mui/material'

import { useAppSelector } from '@/lib/hooks'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = useAppSelector(state => state.user.user)

  if (!user) {
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
