'use client'

import './globals.css'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Roboto } from 'next/font/google'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { AppThemeProvider } from '@/components/theme/AppThemeProvider'
import { AuthProvider } from '@/features/auth/components/AuthProvider'
import { Snackbar } from '@/features/snackbar/components/Snackbar'
import { persistor, store } from '@/lib/store'

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
    <html lang="en">
      <body id="__next" className={roboto.variable}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <AppThemeProvider>
                <AuthProvider>
                  <DashboardLayout>
                    {children}
                    <Snackbar />
                  </DashboardLayout>
                </AuthProvider>
              </AppThemeProvider>
            </AppRouterCacheProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
