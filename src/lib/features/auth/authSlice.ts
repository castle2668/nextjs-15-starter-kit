import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface User {
  id: string
  email: string
  name: string
}

// 定義狀態的介面
interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
}

// 初始狀態
const initialState: AuthState = {
  token: null,
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
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    // 清除登入狀態
    clearAuth: state => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
