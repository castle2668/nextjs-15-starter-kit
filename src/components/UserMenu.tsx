'use client'

import { useAuthStore } from '@/stores/auth'
import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function UserMenu() {
  const { user, clearAuth } = useAuthStore()
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
    clearAuth()
    handleClose()
    router.push('/login')
  }

  return (
    <div>
      <Button
        onClick={handleMenu}
        sx={{
          color: '#fff',
          backgroundColor: theme => theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme => theme.palette.primary.dark,
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
