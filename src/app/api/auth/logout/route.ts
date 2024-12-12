// 處理登出
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({ message: '登出成功' })

    // 清除所有認證相關的 cookies
    response.cookies.delete('access_token')
    response.cookies.delete('refresh_token')

    return response
  } catch (error) {
    return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 })
  }
}
