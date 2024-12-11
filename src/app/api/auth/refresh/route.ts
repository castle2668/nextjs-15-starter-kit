// 處理 refresh token 更新
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { db, generateTokens, verifyToken } from '../_db'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const oldRefreshToken = cookieStore.get('refresh_token')?.value

    if (!oldRefreshToken) {
      return NextResponse.json(
        { message: 'No refresh token', code: 'NO_REFRESH_TOKEN' },
        { status: 401 }
      )
    }

    // 驗證 refresh token
    if (!verifyToken(oldRefreshToken, 'refresh')) {
      return NextResponse.json(
        { message: 'Invalid refresh token', code: 'INVALID_REFRESH_TOKEN' },
        { status: 401 }
      )
    }

    // 取得對應的 token pair
    const oldTokens = db.tokens.get(oldRefreshToken)
    if (!oldTokens) {
      return NextResponse.json(
        { message: 'Token not found', code: 'TOKEN_NOT_FOUND' },
        { status: 401 }
      )
    }

    // 產生新的 token pair
    const newTokens = generateTokens(oldTokens.userId)

    // 更新資料庫
    db.tokens.delete(oldRefreshToken)
    db.tokens.set(newTokens.refreshToken, newTokens)

    // 將舊的 token 加入黑名單
    db.blacklist.add(oldRefreshToken)
    db.blacklist.add(oldTokens.accessToken)

    const response = NextResponse.json({
      accessToken: newTokens.accessToken,
    })

    // 設定新的 refresh token
    response.cookies.set('refresh_token', newTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    return NextResponse.json({ message: '無法更新 token' }, { status: 500 })
  }
}
