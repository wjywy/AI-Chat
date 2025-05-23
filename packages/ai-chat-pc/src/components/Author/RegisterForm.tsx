import { useState } from 'react'

interface RegisterFormProps {
  onSubmit: (userName: string, password: string, nickName: string, captcha: string) => void
  onSendCaptcha: (address: string) => void
  buttonText?: string
  loading?: boolean
}

export default function RegisterForm({
  onSubmit,
  onSendCaptcha,
  buttonText = '注册',
  loading = false
}: RegisterFormProps) {
  const [captchaSent, setCaptchaSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [address, setAddress] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.target as HTMLFormElement)
    const userName = formData.get('userName') as string
    const password = formData.get('password') as string
    const nickName = formData.get('nickName') as string
    const captcha = formData.get('captcha') as string

    // 表单验证
    if (password.length < 6 || password.length > 20) {
      setError('密码长度必须在6-20个字符之间')
      return
    }

    if (nickName.length < 2 || nickName.length > 20) {
      setError('昵称长度必须在2-20个字符之间')
      return
    }

    onSubmit(userName, password, nickName, captcha)
  }

  const handleSendCaptcha = async () => {
    setError(null)
    if (!address) {
      setError('请输入邮箱地址')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setError('请输入有效的邮箱地址')
      return
    }

    try {
      await onSendCaptcha(address)
      setCaptchaSent(true)
      let seconds = 60
      setCountdown(seconds)
      const timer = setInterval(() => {
        seconds -= 1
        setCountdown(seconds)
        if (seconds <= 0) {
          clearInterval(timer)
          setCaptchaSent(false)
        }
      }, 1000)
    } catch (error) {
      setError('验证码发送失败，请稍后重试')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      <div>
        <input
          type="email"
          name="userName"
          placeholder="邮箱"
          required
          disabled={loading}
          className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="密码 (6-20个字符)"
          required
          minLength={6}
          maxLength={20}
          disabled={loading}
          className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
      <div>
        <input
          type="text"
          name="nickName"
          placeholder="昵称 (2-20个字符)"
          required
          minLength={2}
          maxLength={20}
          disabled={loading}
          className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          name="captcha"
          placeholder="验证码"
          required
          disabled={loading}
          className="flex-grow px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={handleSendCaptcha}
          disabled={captchaSent || loading}
          className="text-xs px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
          {captchaSent ? `${countdown}秒后重试` : '发送验证码'}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition disabled:bg-emerald-300 disabled:cursor-not-allowed">
        {loading ? '处理中...' : buttonText}
      </button>
    </form>
  )
}
