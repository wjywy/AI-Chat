import { message } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import AuthLanguageSwitch from '@pc/components/Author/AuthLanguageSwitch'
import AuthLayout from '@pc/components/Author/AuthLayout'
import AuthLink from '@pc/components/Author/AuthLink'
import EmailForm from '@pc/components/Author/EmailForm'
import FooterLinks from '@pc/components/Author/FooterLinks'
import { userService } from '@pc/services/userService'

import type { LoginParams } from '@pc/types/user'

export default function Login() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [_, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

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
      message.error('登录失败，请检查账号或密码是否有误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title={t('app.login')}>
      <div className="space-y-4">
        <AuthLanguageSwitch />
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
