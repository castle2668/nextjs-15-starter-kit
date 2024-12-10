'use client'

import { setAuth } from '@/lib/features/auth/authSlice'
import { useAppDispatch } from '@/lib/hooks'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

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
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const { user } = await response.json()
            dispatch(setAuth({ token, user }))
          } else {
            // 如果獲取用戶資訊失敗，清除 token
            Cookies.remove('token')
          }
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
