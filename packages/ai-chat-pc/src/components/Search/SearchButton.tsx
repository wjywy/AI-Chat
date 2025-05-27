import { useState, useRef, useEffect } from 'react'
import { Sender } from '@ant-design/x'
import useThemeStore from '@pc/store/useThemeStore'

export const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'

  const handleSubmit = (value: string) => {
    if (value.trim()) {
      console.log('搜索:', value.trim())
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsOpen(true)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isDark
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              : 'bg-black text-white hover:bg-gray-800'
          }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-gray-500/10 dark:bg-gray-900/30 z-[9998]" />
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20">
            <div
              ref={modalRef}
              className={`w-[640px] rounded-xl border shadow-2xl overflow-hidden ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
              <Sender
                placeholder="搜索聊天记录..."
                onSubmit={handleSubmit}
                styles={{
                  input: {
                    fontSize: '1.125rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    color: isDark ? '#e5e7eb' : 'inherit'
                  }
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}
