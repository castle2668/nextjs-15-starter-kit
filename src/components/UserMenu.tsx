'use client'

import { clearAuth } from '@/lib/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function UserMenu() {
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  if (!user) return null

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(clearAuth())
    handleClose()
    router.push('/login')
  }

  return (
    <div>
      <Button
        onClick={handleMenu}
        sx={{
          color: '#fff',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // 懸停時顯示半透明白色
          },
        }}
        startIcon={
          <Avatar sx={{ width: 32, height: 32 }}>{user.name[0]}</Avatar>
        }
      >
        {user.name}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>個人資料</MenuItem>
        <MenuItem onClick={handleLogout}>登出</MenuItem>
      </Menu>
    </div>
  )
}
