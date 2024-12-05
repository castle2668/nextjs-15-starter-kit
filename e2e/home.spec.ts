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
      const themeData = localStorage.getItem('theme')
      return themeData ? JSON.parse(themeData).state.theme : 'light'
    })

    // 點擊主題切換按鈕
    const themeButton = page.getByRole('button', { name: '切換主題' })
    await themeButton.click()

    // 直接檢查更新後的主題
    const updatedTheme = await page.evaluate(() => {
      const themeData = localStorage.getItem('theme')
      return themeData ? JSON.parse(themeData).state.theme : 'light'
    })

    // 驗證主題是否正確切換
    expect(updatedTheme).toBe(initialTheme === 'light' ? 'dark' : 'light')
  })
})
