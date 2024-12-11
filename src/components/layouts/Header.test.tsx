import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'

import { store } from '@/lib/store'

import { Header } from './Header'

const renderWithProvider = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>)
}

describe('Header', () => {
  it('應該顯示應用名稱', () => {
    renderWithProvider(<Header />)
    expect(screen.getByText('Next.js 開發環境')).toBeInTheDocument()
  })

  it('應該顯示主題切換按鈕', () => {
    renderWithProvider(<Header />)
    expect(screen.getByRole('button', { name: '切換主題' })).toBeInTheDocument()
  })
})
