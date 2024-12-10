import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// 每次測試後自動清理 DOM，避免測試之間互相影響
afterEach(() => {
  cleanup()
})
