import { useState } from 'react'
import AuthLayout from '../../components/Author/AuthLayout'
import EmailForm from '../../components/Author/EmailForm'
import AuthLink from '../../components/Author/AuthLink'
import Divider from '../../components/Author/Divider'
import SocialLoginButtons from '../../components/Author/SocialLoginButtons'
import FooterLinks from '../../components/Author/FooterLinks'

export default function CreateAccount() {
  const [email, setEmail] = useState('')

  const handleEmailSubmit = (email: string) => {
    setEmail(email)
    console.log('注册邮箱:', email)
    // 这里添加注册逻辑
  }

  const handleGoogleLogin = () => {
    console.log('Google注册')
    // 实现Google注册
  }

  const handleMicrosoftLogin = () => {
    console.log('Microsoft注册')
    // 实现Microsoft注册
  }

  const handleAppleLogin = () => {
    console.log('Apple注册')
    // 实现Apple注册
  }

  return (
    <AuthLayout title="创建帐户">
      <div className="space-y-4">
        <EmailForm onSubmit={handleEmailSubmit} />

        <AuthLink isLogin={false} />

        <Divider />

        <SocialLoginButtons
          onGoogleLogin={handleGoogleLogin}
          onMicrosoftLogin={handleMicrosoftLogin}
          onAppleLogin={handleAppleLogin}
          isLogin={false}
        />
      </div>

      <FooterLinks />
    </AuthLayout>
  )
}
