import { expect, test } from '@playwright/test'

// 測試資料
const TEST_USER = {
  email: 'test@example.com',
  password: '123456',
}

test.describe('認證功能測試', () => {
  test('應該可以成功登入並登出', async ({ page }) => {
    // 前往登入頁
    await page.goto('/login')

    // 確認在登入頁面
    await expect(page.getByRole('heading', { name: '登入' })).toBeVisible()

    // 填寫登入表單
    await page.getByLabel('Email').fill(TEST_USER.email)
    await page.getByLabel('密碼').fill(TEST_USER.password)

    // 點擊登入按鈕
    await page.getByRole('button', { name: '登入' }).click()

    // 等待導向到首頁
    await expect(page).toHaveURL('/')

    // 確認登入成功
    await expect(page.getByText('測試用戶')).toBeVisible()

    // 測試認證 API
    await page.getByRole('button', { name: '測試認證 API' }).click()
    await expect(page.getByText('這是一個需要認證的 API')).toBeVisible()

    // 執行登出
    await page.getByText('測試用戶').click()
    await page.getByText('登出系統').click()

    // 確認已登出並回到登入頁
    await expect(page).toHaveURL('/login')
  })

  test('登入失敗應該顯示錯誤訊息', async ({ page }) => {
    await page.goto('/login')

    // 使用錯誤的密碼
    await page.getByLabel('Email').fill(TEST_USER.email)
    await page.getByLabel('密碼').fill('wrong_password')

    await page.getByRole('button', { name: '登入' }).click()

    // 確認顯示錯誤訊息
    await expect(page.getByText('帳號或密碼錯誤')).toBeVisible()
  })

  test('未登入時應該重新導向到登入頁', async ({ page }) => {
    // 嘗試直接訪問首頁
    await page.goto('/')

    // 應該被重新導向到登入頁
    await expect(page).toHaveURL('/login')
  })
})
