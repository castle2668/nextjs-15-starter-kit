'use client'

import { authApi } from '@/features/auth/api'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { Button, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { theme } = useThemeStore()
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      setAuth(data.token, data.user)
      router.push('/') // 登入成功後導向首頁
    },
    onError: error => {
      // 這裡可以加入錯誤處理，例如顯示錯誤訊息
      console.error('登入失敗:', error)
    },
  })

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        email,
        password,
      })
    } catch (error) {
      // 錯誤已經在 onError 中處理
    }
  }

  return (
    <div
      className={cn(
        'relative z-10',
        'flex w-[300px] flex-col items-center gap-4',
        'rounded-lg p-8',
        theme === 'dark' ? 'bg-black/25' : 'bg-white/25',
        'backdrop-blur-lg'
      )}
    >
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
        disabled={loginMutation.isPending}
        className={cn(
          'py-3 text-lg text-white',
          theme === 'dark'
            ? 'bg-blue-500/90 hover:bg-blue-500'
            : 'bg-blue-600/90 hover:bg-blue-600'
        )}
      >
        {loginMutation.isPending ? '登入中...' : '登入'}
      </Button>
    </div>
  )
}
