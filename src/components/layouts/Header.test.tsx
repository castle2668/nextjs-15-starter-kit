import { clearAuth, setAuth } from '@/lib/features/auth/authSlice'
import { store } from '@/lib/store'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Header } from './Header'

// Mock Next.js 的 navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}))

// 建立一個包含 Provider 的渲染函數
const renderWithProvider = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>)
}

describe('Header', () => {
  it('應該顯示應用名稱', () => {
    renderWithProvider(<Header />)
    expect(screen.getByText('我的應用')).toBeInTheDocument()
  })

  // 未登入狀態的測試群組
  describe('未登入狀態', () => {
    beforeEach(() => {
      store.dispatch(clearAuth())
    })

    it('不應該顯示使用者選單', () => {
      renderWithProvider(<Header />)
      expect(
        screen.queryByRole('button', { name: /使用者/i })
      ).not.toBeInTheDocument()
    })
  })

  // 已登入狀態的測試群組
  describe('已登入狀態', () => {
    beforeEach(() => {
      store.dispatch(
        setAuth({
          token: 'test-token',
          user: { id: '1', name: '測試用戶', email: 'test@example.com' },
        })
      )
    })

    it('應該顯示使用者選單', () => {
      renderWithProvider(<Header />)
      expect(screen.getByText('測試用戶')).toBeInTheDocument()
    })
  })
})
