import React from 'react'
import { useTranslation } from 'react-i18next'

import type { LoginParams } from '@pc/types/user'

interface EmailFormProps {
  onSubmit: (params: LoginParams) => void
  buttonText?: string
  loading?: boolean
  usernamePlaceholder?: string
  passwordPlaceholder?: string
}

export default function EmailForm({
  onSubmit,
  buttonText = '登录',
  loading = false,
  usernamePlaceholder,
  passwordPlaceholder
}: EmailFormProps) {
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const userName = formData.get('userName') as string
    const password = formData.get('password') as string
    onSubmit({ userName, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="userName"
          placeholder={usernamePlaceholder || t('form.inputUsername')}
          required
          disabled={loading}
          className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder={passwordPlaceholder || t('form.inputPassword')}
          required
          disabled={loading}
          className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition disabled:bg-emerald-300 disabled:cursor-not-allowed">
        {loading ? t('common.processing') : buttonText}
      </button>
    </form>
  )
}
