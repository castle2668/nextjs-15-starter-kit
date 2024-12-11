import { act, fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { clearAuth, setAuth } from '@/features/auth/store/authSlice'
import { store } from '@/lib/store'

import { UserMenu } from './UserMenu'

// Mock Next.js navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock auth API
vi.mock('@/features/auth/api', () => ({
  authApi: {
    logout: vi.fn(),
  },
}))

const renderWithProvider = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>)
}

describe('UserMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    store.dispatch(clearAuth())
  })

  it('未登入時不應該顯示選單', () => {
    renderWithProvider(<UserMenu />)
    expect(screen.queryByText('測試用戶')).not.toBeInTheDocument()
  })

  describe('已登入狀態', () => {
    beforeEach(() => {
      store.dispatch(
        setAuth({
          accessToken: 'test-token',
          user: { id: '1', name: '測試用戶', email: 'test@example.com' },
        })
      )
    })

    it('應該顯示使用者資訊', () => {
      renderWithProvider(<UserMenu />)
      expect(screen.getByText('測試用戶')).toBeInTheDocument()
      expect(screen.getByText('test@example.com')).toBeInTheDocument()
    })

    it('點擊選單應該顯示下拉選項', async () => {
      renderWithProvider(<UserMenu />)
      const userMenu = screen.getByText('測試用戶')

      await act(async () => {
        fireEvent.click(userMenu)
      })

      expect(screen.getByRole('menu')).toBeInTheDocument()
      expect(screen.getByText('開發者資訊')).toBeInTheDocument()
      expect(screen.getByText('登出系統')).toBeInTheDocument()
    })

    it('點擊登出應該清除認證狀態並導向登入頁', async () => {
      renderWithProvider(<UserMenu />)
      const userMenu = screen.getByText('測試用戶')

      await act(async () => {
        fireEvent.click(userMenu)
      })

      const logoutButton = screen.getByText('登出系統')
      await act(async () => {
        fireEvent.click(logoutButton)
      })

      const state = store.getState()
      expect(state.auth.accessToken).toBeNull()
      expect(state.auth.user).toBeNull()
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })
})
