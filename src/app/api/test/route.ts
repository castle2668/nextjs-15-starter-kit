import { NextResponse } from 'next/server'

export async function GET() {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 500))

  return NextResponse.json({
    message: '這是一個需要認證的 API',
    timestamp: new Date().toISOString(),
  })
}
