import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/Author/AuthLayout'
import RegisterForm from '../../components/Author/RegisterForm'
import AuthLink from '../../components/Author/AuthLink'
import AuthLanguageSwitch from '../../components/Author/AuthLanguageSwitch'
import FooterLinks from '../../components/Author/FooterLinks'
import { useUserStore } from '../../store/useUserStore'
import { userService } from '../../services/userService'
import type { RegisterParams, CaptchaParams } from '@pc/types/user'

export default function CreateAccount() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { error } = useUserStore()

  const handleRegisterSubmit = async ({
    userName,
    password,
    nickName,
    captcha
  }: RegisterParams) => {
    setLoading(true)
    try {
      const params: RegisterParams = {
        userName,
        password,
        nickName,
        captcha
      }
      await userService.createAccount(params)
      // 注册成功后会自动登录并重定向到首页
      navigate('/', { replace: true })
    } catch (error) {
      console.error('注册失败', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendCaptcha = async (params: CaptchaParams) => {
    try {
      await userService.sendCaptcha(params)
    } catch (error) {
      console.error('验证码发送失败', error)
    }
  }

  // const handleGoogleLogin = () => {
  //   console.log('Google登录')
  //   // 实现Google登录，成功后重定向
  // }

  // const handleMicrosoftLogin = () => {
  //   console.log('Microsoft登录')
  //   // 实现Microsoft登录，成功后重定向
  // }

  // const handleAppleLogin = () => {
  //   console.log('Apple登录')
  //   // 实现Apple登录，成功后重定向
  // }

  return (
    <AuthLayout title="创建账户">
      <div className="space-y-4">
        <AuthLanguageSwitch />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <RegisterForm
          onSubmit={handleRegisterSubmit}
          onSendCaptcha={handleSendCaptcha}
          loading={loading}
        />

        <AuthLink isLogin={false} />

        {/* <Divider /> */}
      </div>

      <FooterLinks />
    </AuthLayout>
  )
}
