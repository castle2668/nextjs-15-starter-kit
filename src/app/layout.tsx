'use client'

import { Header } from '@/components/Header'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { ThemeWrapper } from '@/components/theme/ThemeWrapper'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Roboto } from 'next/font/google'
import { useEffect } from 'react'

import './globals.css'

// 初始化 MSW 模擬 API 請求
async function initMocks() {
  if (typeof window === 'undefined') return

  if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
    const { worker } = await import('@/mocks/browser')
    return worker.start({
      onUnhandledRequest: 'bypass', // 對於未處理的請求直接放行
    })
  }
}

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 啟用 MSW 模擬 API 請求
  useEffect(() => {
    initMocks()
  }, [])

  return (
    <html lang="zh-TW">
      <body id="__next" className={roboto.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <QueryProvider>
            <ThemeWrapper>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
              </div>
            </ThemeWrapper>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
