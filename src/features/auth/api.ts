import { fetchApi } from '@/lib/api'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export const authApi = {
  login: (data: LoginRequest) =>
    fetchApi<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    fetchApi('/auth/logout', {
      method: 'POST',
    }),

  getProfile: () =>
    fetchApi('/auth/profile', {
      method: 'GET',
    }),
}
