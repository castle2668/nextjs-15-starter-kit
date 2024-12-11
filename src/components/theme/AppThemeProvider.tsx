'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
      },
    },
    dark: {
      palette: {
        mode: 'dark',
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
})

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <CssVarsProvider defaultMode="light" theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  )
}
