import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/Author/AuthLayout'
import EmailForm from '../../components/Author/EmailForm'
import AuthLink from '../../components/Author/AuthLink'
import Divider from '../../components/Author/Divider'
import SocialLoginButtons from '../../components/Author/SocialLoginButtons'
import FooterLinks from '../../components/Author/FooterLinks'
import { useAuthStore } from '../../store/useAuthStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthStore()

  // 获取之前尝试访问的路径
  const from = location.state?.from || '/'

  const handleEmailSubmit = async (email: string) => {
    setEmail(email)
    try {
      // Todo: 登录逻辑
      await login(email, 'password')
      // 登录成功后重定向 暂定为首页
      navigate('/', { replace: true })
    } catch (error) {
      console.error('登录失败', error)
    }
  }

  const handleGoogleLogin = () => {
    console.log('Google登录')
    // 实现Google登录，成功后重定向
  }

  const handleMicrosoftLogin = () => {
    console.log('Microsoft登录')
    // 实现Microsoft登录，成功后重定向
  }

  const handleAppleLogin = () => {
    console.log('Apple登录')
    // 实现Apple登录，成功后重定向
  }

  return (
    <AuthLayout title="登录">
      <div className="space-y-4">
        <EmailForm onSubmit={handleEmailSubmit} />

        <AuthLink isLogin={true} />

        <Divider />

        <SocialLoginButtons
          onGoogleLogin={handleGoogleLogin}
          onMicrosoftLogin={handleMicrosoftLogin}
          onAppleLogin={handleAppleLogin}
          isLogin={true}
        />
      </div>

      <FooterLinks />
    </AuthLayout>
  )
}
