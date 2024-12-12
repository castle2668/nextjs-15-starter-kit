import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-development-secret'
)

export interface TokenPair {
  accessToken: string
  refreshToken: string
  userId: string
}

// 產生 token pair
export async function generateTokens(userId: string): Promise<TokenPair> {
  const accessToken = await new jose.SignJWT({ userId, type: 'access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(JWT_SECRET)

  const refreshToken = await new jose.SignJWT({ userId, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  return {
    accessToken,
    refreshToken,
    userId,
  }
}

// 驗證 token
export async function verifyToken(
  token: string,
  type: 'access' | 'refresh'
): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)

    return payload.type === type
  } catch (error) {
    return false
  }
}

// 從 token 解析出 userId
export async function getUserIdFromToken(
  token: string
): Promise<string | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload.userId as string
  } catch {
    return null
  }
}
