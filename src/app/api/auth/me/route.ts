// 處理取得個人資料
import { NextResponse } from 'next/server'

const MOCK_USER = {
  id: '1',
  email: 'test@example.com',
  name: '測試用戶',
}

export async function GET(request: Request) {
  try {
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      user: MOCK_USER,
    })
  } catch (error) {
    return NextResponse.json({ message: '無法獲取用戶資訊' }, { status: 401 })
  }
}
