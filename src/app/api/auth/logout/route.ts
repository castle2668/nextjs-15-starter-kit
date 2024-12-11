// 處理登出
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { db } from '../_db'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value

    if (refreshToken) {
      // 取得對應的 token pair
      const tokens = db.tokens.get(refreshToken)
      if (tokens) {
        // 將所有相關 token 加入黑名單
        db.blacklist.add(refreshToken)
        db.blacklist.add(tokens.accessToken)
        // 從資料庫移除
        db.tokens.delete(refreshToken)
      }
    }

    const response = NextResponse.json({ message: '登出成功' })

    // 清除 refresh token cookie
    response.cookies.delete('refresh_token')

    return response
  } catch (error) {
    return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 })
  }
}
