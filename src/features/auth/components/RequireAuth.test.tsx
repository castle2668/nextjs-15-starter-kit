import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'

import { clearAuth, setAuth } from '@/features/auth/store/authSlice'
import { store } from '@/lib/store'

import { RequireAuth } from './RequireAuth'

const renderWithProvider = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>)
}

describe('RequireAuth', () => {
  it('未認證時應該顯示載入中', () => {
    store.dispatch(clearAuth())
    renderWithProvider(
      <RequireAuth>
        <div>Protected Content</div>
      </RequireAuth>
    )

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('已認證時應該顯示子組件', () => {
    store.dispatch(
      setAuth({
        accessToken: 'test-token',
        user: { id: '1', name: '測試用戶', email: 'test@example.com' },
      })
    )

    renderWithProvider(
      <RequireAuth>
        <div>Protected Content</div>
      </RequireAuth>
    )

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })
})
