import React from 'react'

import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center pt-16 px-4">
      <header className="absolute top-6 left-6">
        <h1 className="text-xl font-bold ">ChatGPT</h1>
      </header>

      <div className="w-full max-w-xs mt-32">
        <h1 className="text-2xl font-bold text-center mb-8">{title}</h1>
        {children}
      </div>
    </div>
  )
}
