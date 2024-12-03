import { ThemeWrapper } from '@/components/ThemeWrapper'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Roboto } from 'next/font/google'

import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body id="__next" className={roboto.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider>
            <ThemeWrapper>{props.children}</ThemeWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
