'use client'

import Cookies from 'js-cookie'
import { useEffect, useRef } from 'react'

import { useAppDispatch } from '@/lib/hooks'

import { authApi } from '../api'
import { setAuth } from '../store/authSlice'
import type { GetProfileResponse } from '../types'

// 應用程式啟動時的認證狀態初始化
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const initialized = useRef(false)

  useEffect(() => {
    // 避免重複初始化
    // 第一次執行：initialized.current = false，繼續執行
    // 第二次執行：initialized.current = true，直接返回
    if (initialized.current) return
    initialized.current = true

    // 只會執行一次的初始化邏輯
    const accessToken = Cookies.get('access_token')
    if (accessToken) {
      // 只會呼叫一次
      authApi
        .getProfile()
        .then(response => {
          dispatch(
            setAuth({
              accessToken,
              user: response.user,
            })
          )
        })
        .catch(() => {
          Cookies.remove('access_token')
        })
    }
  }, [dispatch])

  return <>{children}</>
}
