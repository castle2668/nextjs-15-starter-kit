'use client'

import { clearAuth } from '@/lib/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Avatar, Menu, MenuItem } from '@mui/material'
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
      <div
        className="flex cursor-pointer items-center gap-3 rounded-lg p-2 px-2 transition-colors hover:bg-white/10"
        onClick={handleMenu}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          {user.name[0]}
        </Avatar>
        <div className="flex flex-col">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-white/80">{user.email}</div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              mt: -1,
              minWidth: 120,
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>開發者資訊</MenuItem>
        <MenuItem onClick={handleLogout}>登出系統</MenuItem>
      </Menu>
    </div>
  )
}
