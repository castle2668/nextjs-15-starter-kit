'use client'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { IconButton } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles'

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

// 主題切換按鈕組件
export const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme()

  return (
    <IconButton
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      color="inherit"
      aria-label="切換主題"
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

// 主題包裝器
export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <CssVarsProvider defaultMode="light" theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  )
}
