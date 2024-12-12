// 認證相關的 API 呼叫封裝
import { fetchApi } from '@/lib/api'

import type { GetProfileResponse, LoginRequest, LoginResponse } from './types'

export const authApi = {
  // 登入 API
  login: (data: LoginRequest) =>
    fetchApi<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // 登出 API
  logout: () =>
    fetchApi('/api/auth/logout', {
      method: 'POST',
    }),

  // 取得個人資料 API
  getProfile: () =>
    fetchApi<GetProfileResponse>('/api/auth/profile', {
      method: 'GET',
    }),
}
