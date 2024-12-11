// 集中管理所有認證相關的介面定義
// 使用者資料
export interface User {
  id: string
  email: string
  name: string
}

// 登入 API 請求
export interface LoginRequest {
  email: string
  password: string
}

// 登入 API 回應
export interface LoginResponse {
  accessToken: string
  user: User
}

// 取得用戶資料 API 回應
export interface GetProfileResponse {
  user: User
}

// Redux Store 中認證狀態的結構
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
}
