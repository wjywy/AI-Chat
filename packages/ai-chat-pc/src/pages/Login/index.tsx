import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/Author/AuthLayout'
import EmailForm from '../../components/Author/EmailForm'
import AuthLink from '../../components/Author/AuthLink'
import FooterLinks from '../../components/Author/FooterLinks'
import AuthLanguageSwitch from '../../components/Author/AuthLanguageSwitch'
import { useUserStore } from '../../store/useUserStore'
import { userService } from '../../services/userService'
import type { LoginParams } from '@pc/types/user'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const storeError = useUserStore((state) => state.error)

  // 获取之前尝试访问的路径
  const from = location.state?.from || '/'

  const handleEmailSubmit = async ({ userName, password }: LoginParams) => {
    setLoading(true)
    setError(null)
    try {
      const params: LoginParams = {
        userName,
        password
      }
      await userService.login(params)
      // 登录成功后重定向到之前尝试访问的路径或首页
      navigate(from, { replace: true })
    } catch (error) {
      setError(error instanceof Error ? error.message : t('form.loginFailed'))
      console.error('登录失败', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title={t('app.login')}>
      <div className="space-y-4">
        <AuthLanguageSwitch />

        {(error || storeError) && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error || storeError}
          </div>
        )}
        <EmailForm
          onSubmit={handleEmailSubmit}
          loading={loading}
          buttonText={t('app.login')}
          usernamePlaceholder={t('form.inputUsername')}
          passwordPlaceholder={t('form.inputPassword')}
        />

        <AuthLink isLogin={true} />
      </div>

      <FooterLinks />
    </AuthLayout>
  )
}
