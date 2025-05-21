interface SocialLoginButtonsProps {
  onGoogleLogin: () => void
  onMicrosoftLogin: () => void
  onAppleLogin: () => void
  onPhoneNumberLogin?: () => void
  isLogin: boolean
}

export default function SocialLoginButtons({
  onGoogleLogin,
  onMicrosoftLogin,
  onAppleLogin,
  onPhoneNumberLogin,
  isLogin
}: SocialLoginButtonsProps) {
  // 定义所有社交登录按钮数据
  const socialButtons = [
    {
      name: 'Google',
      onClick: onGoogleLogin,
      icon: (
        <svg
          className="ml-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
      label: '继续使用 Google 登录'
    },
    {
      name: 'Microsoft',
      onClick: onMicrosoftLogin,
      icon: (
        <svg
          className="ml-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18">
          <path fill="#00A4EF" d="M11.4 24H0V12.6h11.4V24z" />
          <path fill="#FFB900" d="M24 24H12.6V12.6H24V24z" />
          <path fill="#F25022" d="M11.4 11.4H0V0h11.4v11.4z" />
          <path fill="#7FBA00" d="M24 11.4H12.6V0H24v11.4z" />
        </svg>
      ),
      label: '继续使用 Microsoft 帐户登录'
    },
    {
      name: 'Apple',
      onClick: onAppleLogin,
      icon: (
        <svg
          className="ml-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.16-.23 2.26-.92 3.46-.83 1.47.12 2.58.71 3.31 1.71-2.93 1.75-2.05 5.5.39 6.62-.68 1.35-1.39 2.7-2.24 4.68z" />
          <path d="M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.26 2.4-2.02 4.34-3.74 4.25z" />
        </svg>
      ),
      label: '继续使用 Apple 登录'
    }
  ]

  // 如果是登录页面且提供了手机登录方法，添加手机登录按钮
  if (isLogin && onPhoneNumberLogin) {
    socialButtons.push({
      name: 'Phone',
      onClick: onPhoneNumberLogin,
      icon: (
        <svg
          className="ml-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor">
          <path d="M17,2 L7,2 C5.9,2 5,2.9 5,4 L5,20 C5,21.1 5.9,22 7,22 L17,22 C18.1,22 19,21.1 19,20 L19,4 C19,2.9 18.1,2 17,2 Z M17,18 L7,18 L7,4 L17,4 L17,18 Z M12,16 C12.6,16 13,15.6 13,15 C13,14.4 12.6,14 12,14 C11.4,14 11,14.4 11,15 C11,15.6 11.4,16 12,16 Z" />
        </svg>
      ),
      label: '使用手机号码登录'
    })
  }

  return (
    <div className="space-y-4">
      {socialButtons.map((button) => (
        <button key={button.name} onClick={button.onClick} type="button" className="social-btn">
          {button.icon}
          <span>{button.label}</span>
        </button>
      ))}
    </div>
  )
}
