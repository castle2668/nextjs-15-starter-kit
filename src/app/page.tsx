'use client'

import { ThemeToggle } from '@/components/ThemeToggle'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'
import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { theme } = useTheme()

  const handleLogin = () => {
    console.log('Email:', email)
    console.log('Password:', password)
  }

  return (
    <main className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat blur-md"
        style={{ backgroundImage: 'url(/images/background.jpg)' }}
      />

      <div
        className={cn(
          'relative z-10',
          'flex w-[300px] flex-col items-center gap-4',
          'rounded-lg p-8',
          theme === 'dark' ? 'bg-black/25' : 'bg-white/25',
          'backdrop-blur-lg'
        )}
      >
        <ThemeToggle />

        <Typography
          variant="h5"
          component="h1"
          className={cn(
            'mb-4 font-bold drop-shadow-lg',
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          )}
        >
          登入
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={cn(
            'mb-4',
            theme === 'dark'
              ? '[&_.MuiInputBase-input]:text-white [&_.MuiInputBase-root]:bg-black/50 [&_.MuiInputLabel-root]:text-white/70 [&_.MuiOutlinedInput-notchedOutline]:border-white/30'
              : '[&_.MuiInputBase-root]:bg-white/90'
          )}
        />

        <TextField
          label="密碼"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={cn(
            'mb-6',
            theme === 'dark'
              ? '[&_.MuiInputBase-input]:text-white [&_.MuiInputBase-root]:bg-black/50 [&_.MuiInputLabel-root]:text-white/70 [&_.MuiOutlinedInput-notchedOutline]:border-white/30'
              : '[&_.MuiInputBase-root]:bg-white/90'
          )}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          className={cn(
            'py-3 text-lg text-white',
            theme === 'dark'
              ? 'bg-blue-500/90 hover:bg-blue-500'
              : 'bg-blue-600/90 hover:bg-blue-600'
          )}
        >
          登入
        </Button>
      </div>
    </main>
  )
}
