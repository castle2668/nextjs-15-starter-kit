import { useAuthStore } from '@/stores/auth'
import { useSnackbarStore } from '@/stores/snackbar'

interface FetchOptions extends RequestInit {
  baseURL?: string // 自定義的基礎 URL
  // 可以擴充更多自定義選項
  skipAuth?: boolean // e.g. 是否跳過認證
}

// 請求攔截器
async function requestInterceptor(url: string, options: FetchOptions) {
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
    const token = useAuthStore.getState().token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  return {
    url: `${baseURL}${url}`,
    options: {
      ...init,
      headers,
    },
  }
}

// 響應攔截器
async function responseInterceptor(response: Response) {
  // 檢查是否需要重新整理 token
  const newToken = response.headers.get('X-New-Token')
  if (newToken) {
    useAuthStore.getState().setAuth(newToken, useAuthStore.getState().user!)
  }

  // 如果回應不是 2xx，拋出錯誤
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const { showSnackbar } = useSnackbarStore.getState()

    // 處理特定狀態碼
    switch (response.status) {
      case 401:
        // 登入頁的 401 錯誤不需要自動跳轉
        if (window.location.pathname === '/login') {
          showSnackbar(errorData.message || '帳號或密碼錯誤', 'error')
        } else {
          // 其他頁面的 401 錯誤需要清除 token 並跳轉
          useAuthStore.getState().clearAuth()
          showSnackbar('登入已過期，請重新登入', 'error')
          window.location.href = '/login'
        }
        break
      case 403:
        showSnackbar(errorData.message || '權限不足', 'error')
        break
      case 404:
        showSnackbar(errorData.message || '找不到資源', 'error')
        break
      default:
        showSnackbar(errorData.message || '請求失敗', 'error')
    }

    throw new ApiError(response.status, response.statusText, errorData)
  }

  // 如果是 204 No Content，直接返回 null
  if (response.status === 204) {
    return null
  }

  return response.json()
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
  try {
    // 執行請求攔截器
    const intercepted = await requestInterceptor(url, options)

    // 發送請求
    const response = await fetch(intercepted.url, intercepted.options)

    // 執行響應攔截器
    return await responseInterceptor(response)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    // 處理網路錯誤等
    useSnackbarStore
      .getState()
      .showSnackbar('網路連線異常，請稍後再試', 'error')
    throw new Error('網路連線異常，請稍後再試')
  }
}
