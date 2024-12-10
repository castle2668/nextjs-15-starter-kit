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

interface GetProfileResponse {
  user: {
    id: string
    email: string
    name: string
  }
}

export const authApi = {
  login: (data: LoginRequest) =>
    fetchApi<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      skipAuth: true,
    }),

  logout: () =>
    fetchApi('/api/auth/logout', {
      method: 'POST',
    }),

  getProfile: () =>
    fetchApi<GetProfileResponse>('/api/auth/me', {
      method: 'GET',
    }),
}
