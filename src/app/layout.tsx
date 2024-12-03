import { Providers } from './providers'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body id="__next">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
