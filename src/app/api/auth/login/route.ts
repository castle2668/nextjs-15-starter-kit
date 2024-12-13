// 處理登入
import { NextResponse } from 'next/server'

import { db, generateTokens } from '../_db'

const MOCK_USER = {
  id: '1',
  email: 'test@example.com',
  name: '測試用戶',
}

const MOCK_PASSWORD = '123456'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email === MOCK_USER.email && password === MOCK_PASSWORD) {
      const tokens = generateTokens(MOCK_USER.id)

      // 儲存 token 對應關係
      db.tokens.set(tokens.refreshToken, tokens)

      const response = NextResponse.json({
        accessToken: tokens.accessToken,
        user: MOCK_USER,
      })

      // 設定 refresh token 到 HttpOnly cookie
      response.cookies.set('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7天
      })

      return response
    }

    return NextResponse.json({ message: '帳號或密碼錯誤' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 })
  }
}
