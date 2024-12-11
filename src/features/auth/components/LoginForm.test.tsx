import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it, vi } from 'vitest'

import { authApi } from '@/features/auth/api'
import { store } from '@/lib/store'

import { LoginForm } from './LoginForm'

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock auth API
vi.mock('@/features/auth/api', () => ({
  authApi: {
    login: vi.fn(),
  },
}))

const renderWithProvider = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>)
}

describe('LoginForm', () => {
  it('應該顯示登入表單', () => {
    renderWithProvider(<LoginForm />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('密碼')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '登入' })).toBeInTheDocument()
  })

  it('空白欄位應該顯示錯誤訊息', async () => {
    renderWithProvider(<LoginForm />)
    const submitButton = screen.getByRole('button', { name: '登入' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('請輸入有效的 Email')).toBeInTheDocument()
      expect(screen.getByText('密碼至少需要 6 個字元')).toBeInTheDocument()
    })
  })

  it('登入成功應該導向首頁', async () => {
    const mockLoginResponse = {
      accessToken: 'test-token',
      user: { id: '1', name: '測試用戶', email: 'test@example.com' },
    }

    vi.mocked(authApi.login).mockResolvedValueOnce(mockLoginResponse)

    renderWithProvider(<LoginForm />)

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('密碼'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: '登入' }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })
})
