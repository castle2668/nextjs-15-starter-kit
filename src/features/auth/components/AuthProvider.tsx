'use client'

import Cookies from 'js-cookie'
import { useEffect } from 'react'

import { useAppDispatch } from '@/lib/hooks'

import { authApi } from '../api'
import { setAuth } from '../store/authSlice'
import type { GetProfileResponse } from '../types'

// 應用程式啟動時的認證狀態初始化
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // 頁面重新整理時，從 cookie 恢復認證狀態
    const accessToken = Cookies.get('access_token')
    // 如果有 token，呼叫 API 取得使用者資料
    if (accessToken) {
      authApi
        .getProfile()
        .then((response: GetProfileResponse) => {
          // 更新 Redux store 中的認證狀態
          dispatch(
            setAuth({
              accessToken,
              user: response.user,
            })
          )
        })
        .catch(() => {
          // 如果 API 呼叫失敗，移除 cookie
          Cookies.remove('access_token')
        })
    }
  }, [dispatch])

  return <>{children}</>
}
