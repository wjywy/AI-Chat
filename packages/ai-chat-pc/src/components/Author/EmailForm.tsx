interface EmailFormProps {
  onSubmit: (email: string) => void
  buttonText?: string
}

export default function EmailForm({ onSubmit, buttonText = '继续' }: EmailFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    onSubmit(email)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          name="email"
          placeholder="电子邮件地址"
          required
          className="w-full px-4 py-3 border rounded-md  border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition">
        {buttonText}
      </button>
    </form>
  )
}
