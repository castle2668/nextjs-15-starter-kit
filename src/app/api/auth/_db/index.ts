interface TokenPair {
  accessToken: string
  refreshToken: string
  userId: string
  createdAt: number
}

// 模擬資料庫
export const db = {
  tokens: new Map<string, TokenPair>(), // refreshToken => TokenPair
  blacklist: new Set<string>(), // 儲存已失效的 token
}

// 產生 token 的輔助函式
export function generateTokens(userId: string): TokenPair {
  return {
    accessToken: `access_${userId}_${Date.now()}`,
    refreshToken: `refresh_${userId}_${Date.now()}`,
    userId,
    createdAt: Date.now(),
  }
}

// 驗證 token 的輔助函式
export function verifyToken(
  token: string,
  type: 'access' | 'refresh'
): boolean {
  if (db.blacklist.has(token)) return false

  // 檢查格式
  const parts = token.split('_')
  if (parts.length !== 3 || parts[0] !== type) return false

  const timestamp = parseInt(parts[2])
  const now = Date.now()

  // access token 1分鐘過期
  if (type === 'access') {
    return now - timestamp < 1000 * 60
  }

  // refresh token 7天過期
  return now - timestamp < 1000 * 60 * 60 * 24 * 7
}
