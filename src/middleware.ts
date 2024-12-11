import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { verifyToken } from './app/api/auth/_db'

// 不需要驗證的 API 路徑
const PUBLIC_API_PATHS = ['/api/auth/login', '/api/auth/refresh']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // API 路由的處理: 檢查 API 請求的 token 驗證
  if (pathname.startsWith('/api')) {
    // 跳過不需要驗證的 API 路徑
    if (PUBLIC_API_PATHS.includes(pathname)) {
      return NextResponse.next()
    }

    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided', code: 'NO_TOKEN' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    if (!verifyToken(token, 'access')) {
      return NextResponse.json(
        { message: 'Token expired', code: 'TOKEN_EXPIRED' },
        { status: 401 }
      )
    }
  }
  // 頁面路由的處理: 檢查是否需要認證
  else {
    const token = request.cookies.get('access_token')?.value

    if (!token && !pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
