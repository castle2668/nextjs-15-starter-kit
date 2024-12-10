'use client'

import { AuthProvider } from '@/components/AuthProvider'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { ThemeWrapper } from '@/components/layouts/ThemeWrapper'
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
                <AuthProvider>
                  <DashboardLayout>
                    {children}
                    <Snackbar />
                  </DashboardLayout>
                </AuthProvider>
              </ThemeWrapper>
            </AppRouterCacheProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
