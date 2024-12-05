import { expect, test } from '@playwright/test'

test.describe('認證功能', () => {
  test('應可以成功登入', async ({ page }) => {
    await page.goto('/login')

    // 填寫登入表單
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('密碼').fill('123456')

    // 點擊登入按鈕
    await page.getByRole('button', { name: '登入' }).click()

    // 驗證是否成功登入
    await expect(page.getByText('測試用戶')).toBeVisible()
    await expect(page).toHaveURL('/')
  })

  test('輸入錯誤密碼應顯示錯誤訊息', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('密碼').fill('wrong_password')

    await page.getByRole('button', { name: '登入' }).click()

    await expect(page.getByText('帳號或密碼錯誤')).toBeVisible()
  })
})
