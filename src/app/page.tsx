'use client'

import Button from '@mui/material/Button'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-4 text-3xl font-bold">Next.js + MUI + Tailwind CSS</h1>
      <Button variant="contained" className="bg-blue-500">
        Hello World
      </Button>
    </main>
  )
}