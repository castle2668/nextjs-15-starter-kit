'use client'

import { toggleTheme } from '@/lib/features/theme/themeSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { IconButton } from '@mui/material'

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(state => state.theme)

  return (
    <IconButton
      onClick={() => dispatch(toggleTheme())}
      color="inherit"
      aria-label="切換主題"
    >
      {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
