import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface AuthLinkProps {
  isLogin: boolean
}

export default function AuthLink({ isLogin }: AuthLinkProps) {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      {isLogin ? (
        <>
          <span>{t('auth.noAccount')}</span>
          <Link to="/create-account" className="text-emerald-500 hover:underline ml-1">
            {t('auth.register')}
          </Link>
        </>
      ) : (
        <>
          <span>{t('auth.haveAccount')}</span>
          <Link to="/login" className="text-emerald-500 hover:underline ml-1">
            {t('auth.login')}
          </Link>
        </>
      )}
    </div>
  )
}
