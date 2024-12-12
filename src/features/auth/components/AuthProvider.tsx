'use client'

import { useEffect, useRef } from 'react'

import { useAppDispatch } from '@/lib/hooks'

import { authApi } from '../api'
import { clearUser, setUser } from '../store/userSlice'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // 直接呼叫 API 檢查登入狀態
    authApi
      .getProfile()
      .then(response => {
        dispatch(setUser({ user: response.user }))
      })
      .catch(() => {
        dispatch(clearUser())
      })
  }, [dispatch])

  return <>{children}</>
}
