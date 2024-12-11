// API 請求的核心邏輯
import Cookies from 'js-cookie'

import { showSnackbar } from '@/features/snackbar/store/snackbarSlice'
import { store } from '@/lib/store'

import { clearAuth, setAuth } from '../features/auth/store/authSlice'

interface FetchOptions extends RequestInit {
  baseURL?: string // 自定義的基礎 URL
  // 可以擴充更多自定義選項
  skipAuth?: boolean // e.g. 是否跳過認證
}

interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

// 請求攔截器: 自動加入 token 到請求標頭
async function requestInterceptor(url: string, options: FetchOptions) {
  const {
    baseURL = '', // 本地 API 不需要 baseURL，但保留彈性
    skipAuth = false,
    ...init
  } = options

  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')

  // 如果需要認證，加入 token
  if (!skipAuth) {
    const token =
      store.getState().auth.accessToken || Cookies.get('access_token')
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

// 響應攔截器: 處理 token 過期與更新
async function responseInterceptor(response: Response) {
  if (response.status === 401) {
    const errorData = await response.json()

    // 檢查是否為 token 過期
    if (errorData.code === 'TOKEN_EXPIRED') {
      try {
        // 用 refresh token 換新的 access token
        const newTokens = await fetchApi<RefreshTokenResponse>(
          '/api/auth/refresh',
          {
            method: 'POST',
            skipAuth: true, // 跳過 token 驗證
          }
        )

        // 更新 Redux store
        store.dispatch(
          setAuth({
            accessToken: newTokens.accessToken,
            user: store.getState().auth.user!,
          })
        )

        // 重試原本的請求
        return fetch(response.url, {
          ...response,
          headers: {
            ...response.headers,
            Authorization: `Bearer ${newTokens.accessToken}`,
          },
        })
      } catch {
        // 如果 refresh token 也過期，才需要重新登入
        store.dispatch(clearAuth())
        window.location.href = '/login'
      }
    }
  }

  // 檢查是否需要重新整理 token
  const newToken = response.headers.get('X-New-Token')
  if (newToken) {
    store.dispatch(
      setAuth({
        accessToken: newToken,
        user: store.getState().auth.user!,
      })
    )
  }

  // 如果回應不是 2xx，拋出錯誤
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    store.dispatch(
      showSnackbar({
        message: errorData.message || '帳號或密碼錯誤',
        severity: 'error',
      })
    )

    // 處理特定狀態碼
    switch (response.status) {
      case 401:
        // 登入頁的 401 錯誤不需要自動跳轉
        if (window.location.pathname === '/login') {
          store.dispatch(
            showSnackbar({
              message: errorData.message || '帳號或密碼錯誤',
              severity: 'error',
            })
          )
        } else {
          // 其他頁面的 401 錯誤需要清除 token 並跳轉
          store.dispatch(clearAuth())
          store.dispatch(
            showSnackbar({
              message: '登入已過期，請重新登入',
              severity: 'error',
            })
          )
          window.location.href = '/login'
        }
        break
      case 403:
        store.dispatch(
          showSnackbar({
            message: errorData.message || '權限不足',
            severity: 'error',
          })
        )
        break
      case 404:
        store.dispatch(
          showSnackbar({
            message: errorData.message || '找不到資源',
            severity: 'error',
          })
        )
        break
      default:
        store.dispatch(
          showSnackbar({
            message: errorData.message || '請求失敗',
            severity: 'error',
          })
        )
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
    super(`${status} ${statusText}`) // 設置錯誤消息
    this.name = 'ApiError' // 設置錯誤名稱
  }
}

// 統一的 API 請求函式
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
    store.dispatch(
      showSnackbar({ message: '網路連線異常，請稍後再試', severity: 'error' })
    )
    throw new Error('網路連線異常，請稍後再試')
  }
}
