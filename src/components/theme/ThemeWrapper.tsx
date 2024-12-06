'use client'

import { useAppSelector } from '@/lib/hooks'
import { darkTheme, lightTheme } from '@/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useAppSelector(state => state.theme)

  return (
    <MUIThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
