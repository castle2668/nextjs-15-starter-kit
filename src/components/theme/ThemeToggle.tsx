'use client'

import { useThemeStore } from '@/stores/theme'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { IconButton } from '@mui/material'

export function ThemeToggle() {
  // Zustand 會自動從 { state: { theme: 'light' } } 中提取出 theme 值
  const { theme, toggleTheme } = useThemeStore()

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
