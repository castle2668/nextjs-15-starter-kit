import { type LoginRequest, type LoginResponse } from '@/features/auth/api'
import { HttpResponse, delay, http } from 'msw'

export const handlers = [
  http.post('*/auth/login', async ({ request }) => {
    try {
      await delay(500)

      const body = (await request.json()) as LoginRequest
      const { email, password } = body

      if (email === 'test@example.com' && password === 'password') {
        return HttpResponse.json<LoginResponse>({
          token: 'fake-jwt-token',
          user: {
            id: '1',
            email,
            name: '測試用戶',
          },
        })
      }

      return new HttpResponse(JSON.stringify({ message: '帳號或密碼錯誤' }), {
        status: 401,
      })
    } catch (error) {
      console.error('MSW handler error:', error)
      return new HttpResponse(JSON.stringify({ message: '伺服器錯誤' }), {
        status: 500,
      })
    }
  }),

  http.post('*/auth/logout', async () => {
    await delay(500)
    return new HttpResponse(null, { status: 204 })
  }),
]
