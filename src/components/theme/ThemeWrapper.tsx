'use client'

import { useThemeStore } from '@/stores/theme'
import { darkTheme, lightTheme } from '@/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()

  return (
    <MUIThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
