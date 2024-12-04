type FetchOptions = RequestInit & {
  baseURL?: string // 自定義的基礎 URL
  // 可以擴充更多自定義選項
  skipAuth?: boolean // e.g. 是否跳過認證
}

export class ApiError extends Error {
  constructor(
    public status: number, // HTTP 狀態碼
    public statusText: string, // HTTP 狀態文本
    public data: {
      // 錯誤詳細數據
      message: string
      [key: string]: any
    }
  ) {
    super(`${status} ${statusText}`) // 調用父類構造函數，設置錯誤消息
    this.name = 'ApiError' // 設置錯誤名稱
  }
}

export async function fetchApi<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    baseURL = process.env.NEXT_PUBLIC_API_URL,
    skipAuth = false,
    ...init
  } = options

  // 準備 headers
  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')

  // 如果需要認證，加入 token
  if (!skipAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  try {
    const response = await fetch(`${baseURL}${url}`, {
      ...init,
      headers,
    })

    // 檢查是否需要重新整理 token
    const newToken = response.headers.get('X-New-Token')
    if (newToken) {
      localStorage.setItem('token', newToken)
    }

    // 如果回應不是 2xx，拋出錯誤
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // 401 錯誤不需要自動跳轉到登入頁
      // 因為這可能是用戶輸入錯誤的帳密
      if (response.status === 401 && url === '/auth/login') {
        throw new ApiError(response.status, response.statusText, errorData)
      }

      // 處理特定狀態碼
      switch (response.status) {
        case 401:
          // 其他 401 錯誤才需要清除 token 並跳轉
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          // 處理權限不足
          break
        case 404:
          // 處理找不到資源
          break
      }

      throw new ApiError(response.status, response.statusText, errorData)
    }

    // 如果是 204 No Content，直接返回 null
    if (response.status === 204) {
      return null as T
    }

    return response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    // 處理網路錯誤等
    throw new Error('網路連線異常，請稍後再試')
  }
}
