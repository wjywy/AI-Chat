import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthLanguageSwitch from '@pc/components/Author/AuthLanguageSwitch'
import AuthLayout from '@pc/components/Author/AuthLayout'
import AuthLink from '@pc/components/Author/AuthLink'
import FooterLinks from '@pc/components/Author/FooterLinks'
import RegisterForm from '@pc/components/Author/RegisterForm'
import { userService } from '@pc/services/userService'
import { useUserStore } from '@pc/store/useUserStore'

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
