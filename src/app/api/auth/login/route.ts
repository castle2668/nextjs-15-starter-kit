import { NextResponse } from 'next/server'

const MOCK_USER = {
  id: '1',
  email: 'test@example.com',
  name: '測試用戶',
}

const MOCK_PASSWORD = '123456'

// 登入 API
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email === MOCK_USER.email && password === MOCK_PASSWORD) {
      return NextResponse.json({
        token: 'mock_token_' + Date.now(),
        user: MOCK_USER,
      })
    }

    // 回傳 401 錯誤
    return NextResponse.json({ message: '帳號或密碼錯誤' }, { status: 401 })
  } catch (error) {
    // 回傳 500 錯誤
    return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 })
  }
}
