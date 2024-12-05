'use client'

import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const { theme } = useThemeStore()
  const { isAuthenticated } = useAuthStore()

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat blur-md"
        style={{ backgroundImage: 'url(/images/background.jpg)' }}
      />

      <div
        className={cn(
          'relative z-10',
          'flex w-[600px] flex-col items-center gap-6',
          'rounded-lg p-12',
          theme === 'dark' ? 'bg-black/25' : 'bg-white/25',
          'backdrop-blur-lg'
        )}
      >
        <Typography
          variant="h3"
          component="h1"
          className={cn(
            'font-bold drop-shadow-lg',
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          )}
        >
          歡迎來到我們的平台
        </Typography>

        <Typography
          variant="h6"
          className={cn(
            'text-center',
            theme === 'dark' ? 'text-white/80' : 'text-gray-600'
          )}
        >
          這是一個專業的管理系統，提供完整的解決方案，
          幫助您更有效率地管理業務流程。
        </Typography>

        <div className="mt-4 flex gap-4">
          <Button
            variant="contained"
            onClick={() => router.push(isAuthenticated ? '/about' : '/login')}
            className={cn(
              'px-8 py-3 text-lg text-white',
              theme === 'dark'
                ? 'bg-blue-500/90 hover:bg-blue-500'
                : 'bg-blue-600/90 hover:bg-blue-600'
            )}
          >
            {isAuthenticated ? '進入系統' : '立即登入'}
          </Button>
        </div>
      </div>
    </main>
  )
}
