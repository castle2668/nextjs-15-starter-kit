import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import type { AuthState, User } from '../types'

// 初始狀態
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
}

// 創建 slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 設置認證狀態，同時更新 cookie
    setAuth: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken?: string
        user: User
      }>
    ) => {
      // access token 存在普通 cookie
      Cookies.set('access_token', action.payload.accessToken, {
        expires: 1 / 24 / 60, // 1分鐘
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      })
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    // 清除認證狀態，同時清除 cookie
    clearAuth: state => {
      Cookies.remove('access_token')
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
