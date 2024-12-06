import { expect, test } from '@playwright/test'

test.describe('首頁', () => {
  test('應顯示正確的標題和按鈕', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', {
        name: '歡迎來到我們的平台',
      })
    ).toBeVisible()

    await expect(
      page.getByRole('button', {
        name: '立即登入',
      })
    ).toBeVisible()
  })

  test('主題切換功能應可以正常運作', async ({ page }) => {
    await page.goto('/')

    // 檢查初始主題
    const initialTheme = await page.evaluate(() => {
      try {
        // 1. 獲取 persist:root 的內容
        const persistRoot = localStorage.getItem('persist:root')
        if (!persistRoot) return 'light'

        // 2. 解析整個 Redux 狀態
        const reduxState = JSON.parse(persistRoot)

        // 3. 解析主題狀態
        const themeState = JSON.parse(reduxState.theme)

        // 4. 返回實際的主題值
        return themeState.theme
      } catch {
        return 'light' // 如果解析失敗，返回預設主題
      }
    })

    // 點擊主題切換按鈕
    const themeButton = page.getByRole('button', { name: '切換主題' })
    await themeButton.click()

    // 檢查更新後的主題
    const updatedTheme = await page.evaluate(() => {
      try {
        const persistRoot = localStorage.getItem('persist:root')
        if (!persistRoot) return 'light'

        const reduxState = JSON.parse(persistRoot)
        const themeState = JSON.parse(reduxState.theme)
        return themeState.theme
      } catch {
        return 'light'
      }
    })

    // 驗證主題是否正確切換
    expect(updatedTheme).toBe(initialTheme === 'light' ? 'dark' : 'light')
  })
})
