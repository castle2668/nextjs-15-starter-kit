'use client'

import { Header } from '@/components/Header'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { ThemeWrapper } from '@/components/theme/ThemeWrapper'
import { Snackbar } from '@/components/ui/Snackbar'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Roboto } from 'next/font/google'

import './globals.css'

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
  return (
    <html lang="zh-TW">
      <body id="__next" className={roboto.variable}>
        {/* MUI 的 SSR 支援 */}
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <QueryProvider>
            <ThemeWrapper>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Snackbar />
              </div>
            </ThemeWrapper>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
