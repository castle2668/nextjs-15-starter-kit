'use client'

import { useAuthStore } from '@/stores/auth'
import { AppBar, Toolbar, Typography } from '@mui/material'

import { UserMenu } from './UserMenu'
import { ThemeToggle } from './theme/ThemeToggle'

export function Header() {
  const { isAuthenticated } = useAuthStore()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          我的應用
        </Typography>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated && <UserMenu />}
        </div>
      </Toolbar>
    </AppBar>
  )
}
