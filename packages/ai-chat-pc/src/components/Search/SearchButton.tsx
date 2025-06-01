import { Sender } from '@ant-design/x'
import { useRef, useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Bubble } from '@ant-design/x'

import { useThemeStore } from '@pc/store'
import { sessionApi } from '@pc/apis/session'
import type { ChatMessage } from '@pc/types/session'

interface SearchButtonProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchButton = ({ isOpen, onClose }: SearchButtonProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { theme } = useThemeStore()
  const isDark = theme === 'dark'
  const [searchResults, setSearchResults] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (value: string) => {
    if (value.trim()) {
      setIsLoading(true)
      try {
        const { data } = await sessionApi.searchMessages(value.trim())
        setSearchResults(data)
      } catch (error) {
        console.error('搜索失败:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-gray-500/10 dark:bg-gray-900/30 z-[9998]" />
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20">
        <div
          ref={modalRef}
          className={`w-[640px] rounded-xl border shadow-2xl overflow-hidden ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium dark:text-white">搜索聊天记录</h3>
          </div>
          <div className="p-4">
            <Sender
              placeholder="搜索聊天记录..."
              onSubmit={handleSubmit}
              prefix={<SearchOutlined />}
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
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="text-center text-gray-500 dark:text-gray-400">搜索中...</div>
            ) : searchResults.length > 0 ? (
              <Bubble.List
                items={searchResults.map((message, index) => ({
                  key: index,
                  role: message.role === 'system' ? 'ai' : 'user',
                  content: message.content
                }))}
                roles={{
                  ai: {
                    placement: 'start',
                    style: {
                      maxWidth: 600
                    }
                  },
                  user: {
                    placement: 'end'
                  }
                }}
              />
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">输入关键词开始搜索</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
