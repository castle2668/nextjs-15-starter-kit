import { AppBar, Box, Toolbar } from '@mui/material'

import { ThemeToggle } from '../theme/ThemeToggle'

export function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        color: 'text.primary',
      }}
    >
      <Toolbar className="px-0">
        <Box className="flex w-full items-center justify-between">
          <Box className="text-lg font-medium text-gray-800">
            Next.js 開發環境
          </Box>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
