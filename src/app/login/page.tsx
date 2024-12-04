'use client'

import { LoginForm } from '@/features/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat blur-md"
        style={{ backgroundImage: 'url(/images/background.jpg)' }}
      />

      <LoginForm />
    </main>
  )
}
