'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { darkTheme, lightTheme } from '@/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <MUIThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
