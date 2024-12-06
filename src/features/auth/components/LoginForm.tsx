'use client'

import { authApi } from '@/features/auth/api'
import { ApiError } from '@/lib/api'
import { setAuth } from '@/lib/features/auth/authSlice'
import { showSnackbar } from '@/lib/features/snackbar/snackbarSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// 定義驗證 schema
const loginSchema = z.object({
  email: z.string().email('請輸入有效的 Email'),
  password: z.string().min(6, '密碼至少需要 6 個字元'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const router = useRouter()
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(state => state.theme)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    try {
      const response = await authApi.login(data)
      dispatch(setAuth({ token: response.token, user: response.user }))
      dispatch(showSnackbar({ message: '登入成功!', severity: 'success' }))
      router.push('/')
    } catch (error) {
      if (error instanceof ApiError) {
        dispatch(
          showSnackbar({ message: error.data.message, severity: 'error' })
        )
      } else {
        dispatch(
          showSnackbar({ message: '登入失敗，請稍後再試', severity: 'error' })
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        {...register('email')}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        variant="outlined"
        fullWidth
        className={cn(
          'mb-4',
          theme === 'dark'
            ? '[&_.MuiInputBase-input]:text-white [&_.MuiInputBase-root]:bg-black/50 [&_.MuiInputLabel-root]:text-white/70 [&_.MuiOutlinedInput-notchedOutline]:border-white/30'
            : '[&_.MuiInputBase-root]:bg-white/90'
        )}
      />

      <TextField
        {...register('password')}
        type="password"
        label="密碼"
        error={!!errors.password}
        helperText={errors.password?.message}
        variant="outlined"
        fullWidth
        className={cn(
          'mb-6',
          theme === 'dark'
            ? '[&_.MuiInputBase-input]:text-white [&_.MuiInputBase-root]:bg-black/50 [&_.MuiInputLabel-root]:text-white/70 [&_.MuiOutlinedInput-notchedOutline]:border-white/30'
            : '[&_.MuiInputBase-root]:bg-white/90'
        )}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        className={cn(
          'py-3 text-lg text-white',
          theme === 'dark'
            ? 'bg-blue-500/90 hover:bg-blue-500'
            : 'bg-blue-600/90 hover:bg-blue-600'
        )}
      >
        {isSubmitting ? '登入中...' : '登入'}
      </Button>
    </form>
  )
}
