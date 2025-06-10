import { SearchOutlined } from '@ant-design/icons'
import { Sender } from '@ant-design/x'
import { Bubble } from '@ant-design/x'
import { useRef, useEffect, useState } from 'react'

import { sessionApi } from '@pc/apis/session'
import { useThemeStore } from '@pc/store'

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
            <style>
              {`
                .search-sender.ant-x-sender {
                  border: 1px solid #E5E7EB !important;
                  border-radius: 0.5rem !important;
                  box-shadow: none !important;
                }
                .search-sender.ant-x-sender:hover {
                  border-color: #9CA3AF !important;
                }
                .search-sender.ant-x-sender:focus-within {
                  border-color: #6B7280 !important;
                }
                .search-sender .ant-x-sender-submit {
                  background-color: transparent !important;
                  border: none !important;
                  color: #6B7280 !important;
                }
                .search-sender .ant-x-sender-submit:hover {
                  background-color: #F3F4F6 !important;
                  color: #374151 !important;
                }
              `}
            </style>
            <Sender
              placeholder="搜索聊天记录..."
              onSubmit={handleSubmit}
              prefix={<SearchOutlined className="text-gray-500" />}
              className="search-sender"
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
