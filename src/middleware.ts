import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import {
  generateTokens,
  getUserIdFromToken,
  verifyToken,
} from './app/api/auth/_db'

const PUBLIC_PATHS = ['/login']
const PUBLIC_API_PATHS = ['/api/auth/login']

// 檢查是否為 API 請求
function isApiRequest(pathname: string) {
  return pathname.startsWith('/api/')
}

// 處理 API 路由的認證
async function handleApiAuth(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value
  const pathname = request.nextUrl.pathname

  // 公開 API 直接放行
  if (PUBLIC_API_PATHS.includes(pathname)) {
    return NextResponse.next()
  }

  // access token 有效
  if (accessToken && (await verifyToken(accessToken, 'access'))) {
    return NextResponse.next()
  }

  // access token 無效但有 refresh token
  if (refreshToken && (await verifyToken(refreshToken, 'refresh'))) {
    const userId = await getUserIdFromToken(refreshToken)

    if (userId) {
      const newTokens = await generateTokens(userId)
      const response = NextResponse.next()

      response.cookies.set('access_token', newTokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60,
      })

      response.cookies.set('refresh_token', newTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      })

      return response
    }
  }

  // 所有 token 都無效
  return NextResponse.json({ message: '未授權的請求' }, { status: 401 })
}

// 處理頁面路由的認證
async function handlePageAuth(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  // 如果沒有任何 token
  if (
    !accessToken &&
    !refreshToken &&
    !PUBLIC_PATHS.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // access token 有效
  if (accessToken && (await verifyToken(accessToken, 'access'))) {
    if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // access token 無效但有 refresh token
  if (refreshToken && (await verifyToken(refreshToken, 'refresh'))) {
    const userId = await getUserIdFromToken(refreshToken)

    if (userId) {
      const newTokens = await generateTokens(userId)

      const response = NextResponse.next()

      response.cookies.set('access_token', newTokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 15, // 15 分鐘
      })

      response.cookies.set('refresh_token', newTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 天
      })

      return response
    }
  }

  // 如果不是公開路徑，且所有 token 都無效，才重導向到登入頁
  if (!PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// 主要的 middleware 函數
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 根據請求類型選擇不同的處理方式
  if (isApiRequest(pathname)) {
    return handleApiAuth(request)
  } else {
    return handlePageAuth(request)
  }
}

// 配置需要執行 middleware 的路徑
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
