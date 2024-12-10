'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { authApi } from '@/features/auth/api'
import { showSnackbar } from '@/features/snackbar/store/snackbarSlice'
import { ApiError } from '@/lib/api'
import { useAppDispatch } from '@/lib/hooks'

import { setAuth } from '../store/authSlice'

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
      className="w-[300px] space-y-4 rounded-lg p-6"
    >
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        登入
      </h1>

      <TextField
        {...register('email')}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        variant="outlined"
        fullWidth
      />

      <TextField
        {...register('password')}
        type="password"
        label="密碼"
        error={!!errors.password}
        helperText={errors.password?.message}
        variant="outlined"
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        className="mt-4 bg-emerald-500 py-3 text-lg hover:bg-emerald-600"
      >
        {isSubmitting ? '登入中...' : '登入'}
      </Button>
    </form>
  )
}
