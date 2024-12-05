'use client'

import { authApi } from '@/features/auth/api'
import { ApiError } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'
import { useSnackbarStore } from '@/stores/snackbar'
import { useThemeStore } from '@/stores/theme'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
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
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const router = useRouter()

  const { theme } = useThemeStore()
  const { setAuth } = useAuthStore()
  const { showSnackbar } = useSnackbarStore()

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      setAuth(data.token, data.user)
      showSnackbar('登入成功!', 'success')
      router.push('/') // 登入成功後導向首頁
    },
    onError: error => {
      // 檢查是否為 ApiError
      if (error instanceof ApiError) {
        showSnackbar(error.data.message, 'error')
      } else {
        showSnackbar('登入失敗，請稍後再試', 'error')
      }
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data)
    } catch (error) {
      // 錯誤處理已在 mutation 中
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
