import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

interface User {
  id: string
  email: string
  name: string
}

// 定義狀態的介面
interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// 初始狀態
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

// 創建 slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 設置登入狀態
    setAuth: (state, action: PayloadAction<{ token: string; user: User }>) => {
      // 將 token 存在 cookie 中
      Cookies.set('token', action.payload.token, {
        expires: 7, // 7天後過期
        secure: process.env.NODE_ENV === 'production', // 生產環境才使用 secure
        sameSite: 'strict',
      })

      // 用戶資訊存在 Redux 中
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    // 清除登入狀態
    clearAuth: state => {
      // 清除 cookie 中的 token
      Cookies.remove('token')

      // 清除 Redux 中的用戶資訊
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
