'use client'

import Cookies from 'js-cookie'
import { useEffect } from 'react'

import { authApi } from '@/features/auth/api'
import { useAppDispatch } from '@/lib/hooks'

import { setAuth } from '../store/authSlice'

// 用戶登入成功 → 獲得 token
// 頁面重新整理 → AuthProvider 檢查到 token
// 呼叫 /api/auth/me 獲取最新的用戶資訊
// 更新 Redux store
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function initAuth() {
      const token = Cookies.get('token')
      if (token) {
        try {
          const { user } = await authApi.getProfile()
          dispatch(setAuth({ token, user }))
        } catch (error) {
          console.error('Failed to fetch user info:', error)
          Cookies.remove('token')
        }
      }
    }

    initAuth()
  }, [dispatch])

  return <>{children}</>
}
