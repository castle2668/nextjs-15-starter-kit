import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Header } from './Header'

// Mock Next.js 的 navigation，確保 router 相關的功能不會報錯
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}))

describe('Header', () => {
  // 共用的測試
  it('應該顯示應用名稱', () => {
    render(<Header />)
    expect(screen.getByText('我的應用')).toBeInTheDocument()
  })

  // 未登入狀態的測試群組
  describe('未登入狀態', () => {
    beforeEach(() => {
      vi.mock('@/stores/auth', () => ({
        useAuthStore: () => ({
          isAuthenticated: false,
          user: null,
        }),
      }))
    })

    it('不應該顯示使用者選單', () => {
      render(<Header />)
      expect(
        screen.queryByRole('button', { name: /使用者/i })
      ).not.toBeInTheDocument()
    })
  })

  // 已登入狀態的測試群組
  describe('已登入狀態', () => {
    beforeEach(() => {
      vi.mock('@/stores/auth', () => ({
        useAuthStore: () => ({
          isAuthenticated: true,
          user: { name: '測試用戶' },
        }),
      }))
    })

    it('應該顯示使用者選單', () => {
      render(<Header />)
      expect(screen.getByText('測試用戶')).toBeInTheDocument()
    })
  })
})
