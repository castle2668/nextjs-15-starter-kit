'use client'

import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
})

const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
})

export { lightTheme, darkTheme }
