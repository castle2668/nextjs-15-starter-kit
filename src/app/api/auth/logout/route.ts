import { NextResponse } from 'next/server'

// 模擬登出 API
export async function POST(request: Request) {
  try {
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 500))

    // 回傳成功的響應
    return NextResponse.json({ message: '登出成功' })
  } catch (error) {
    // 回傳 500 錯誤
    return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 })
  }
}
