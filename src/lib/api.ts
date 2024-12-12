// API 請求的核心邏輯
export async function fetchApi<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error('請求失敗')
    }

    return response.json()
  } catch (error) {
    throw new Error('網路連線異常，請稍後再試')
  }
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
    super(`${status} ${statusText}`) // 設置錯誤消息
    this.name = 'ApiError' // 設置錯誤名稱
  }
}
