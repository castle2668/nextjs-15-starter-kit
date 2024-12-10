import { NextResponse } from 'next/server'

const MOCK_USER = {
  id: '1',
  email: 'test@example.com',
  name: '測試用戶',
}

export async function GET(request: Request) {
  try {
    // 在實際應用中，這裡應該：
    // 1. 從 header 取得 token
    // 2. 驗證 token
    // 3. 從資料庫取得用戶資訊

    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      user: MOCK_USER,
    })
  } catch (error) {
    return NextResponse.json({ message: '無法獲取用戶資訊' }, { status: 401 })
  }
}
