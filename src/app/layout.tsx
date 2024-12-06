'use client'

import { Header } from '@/components/Header'
import { ThemeWrapper } from '@/components/theme/ThemeWrapper'
import { Snackbar } from '@/components/ui/Snackbar'
import { persistor, store } from '@/lib/store'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Roboto } from 'next/font/google'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeWrapper>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Snackbar />
                </div>
              </ThemeWrapper>
            </AppRouterCacheProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
