import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 從 cookie 或 localStorage 取得 token
  const token = request.cookies.get('token')?.value

  // 如果沒有 token 且不是在登入頁面，重定向到登入頁面
  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 如果有 token 且在登入頁面，重定向到首頁
  if (token && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// 配置需要進行驗證的路徑
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
