interface EmailFormProps {
  onSubmit: (userName: string, password: string) => void
  buttonText?: string
  loading?: boolean
}

export default function EmailForm({
  onSubmit,
  buttonText = '登录',
  loading = false
}: EmailFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const userName = formData.get('userName') as string
    const password = formData.get('password') as string
    onSubmit(userName, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="userName"
          placeholder="用户名/邮箱"
          required
          disabled={loading}
          className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="密码"
          required
          disabled={loading}
          className="w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
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
