import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/Author/AuthLayout'
import EmailForm from '../../components/Author/EmailForm'
import AuthLink from '../../components/Author/AuthLink'
import Divider from '../../components/Author/Divider'
import SocialLoginButtons from '../../components/Author/SocialLoginButtons'
import FooterLinks from '../../components/Author/FooterLinks'
import { useAuthStore } from '../../store/useAuthStore'
import { authService } from '../../services/authService'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const storeError = useAuthStore((state) => state.error)

  // 获取之前尝试访问的路径
  const from = location.state?.from || '/'

  const handleEmailSubmit = async (userName: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      await authService.login(userName, password)
      // 登录成功后重定向到之前尝试访问的路径或首页
      navigate(from, { replace: true })
    } catch (error) {
      setError(error instanceof Error ? error.message : '登录失败，请稍后重试')
      console.error('登录失败', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    setError(null)
    console.log('Google登录')
    // 实现Google登录，成功后重定向
  }

  const handleMicrosoftLogin = () => {
    setError(null)
    console.log('Microsoft登录')
    // 实现Microsoft登录，成功后重定向
  }

  const handleAppleLogin = () => {
    setError(null)
    console.log('Apple登录')
    // 实现Apple登录，成功后重定向
  }

  const handlePhoneNumberLogin = () => {
    setError(null)
    console.log('手机号登录')
    // 实现手机号登录，成功后重定向
  }

  return (
    <AuthLayout title="登录">
      <div className="space-y-4">
        {(error || storeError) && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error || storeError}
          </div>
        )}
        <EmailForm onSubmit={handleEmailSubmit} loading={loading} buttonText="登录" />

        <AuthLink isLogin={true} />

        <Divider />

        <SocialLoginButtons
          onGoogleLogin={handleGoogleLogin}
          onMicrosoftLogin={handleMicrosoftLogin}
          onAppleLogin={handleAppleLogin}
          onPhoneNumberLogin={handlePhoneNumberLogin}
          isLogin={true}
        />
      </div>

      <FooterLinks />
    </AuthLayout>
  )
}
