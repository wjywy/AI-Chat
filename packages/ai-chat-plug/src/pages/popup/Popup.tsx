import React, { useState } from 'react'
import { Bubble, Sender } from '@ant-design/x'
import { Message, ChatMode, CHAT_MODES } from '../../types/chat'

const Popup = () => {
  const [mode, setMode] = useState<ChatMode>(CHAT_MODES.CHAT)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  // 处理发送消息
  const handleSend = (content: string) => {
    if (!content.trim()) return

    const newMessage: Message = {
      content,
      role: 'user'
    }

    setMessages(prev => [...prev, newMessage])
    // TODO: 实际的消息发送逻辑
  }

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="flex-1 overflow-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-lg font-medium">
            {mode === CHAT_MODES.CHAT ? '对话' : '智读'}
          </div>
          <div className="flex gap-4">
            <button
              className={`px-3 py-1 rounded ${
                mode === CHAT_MODES.CHAT
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setMode(CHAT_MODES.CHAT)}
            >
              对话
            </button>
            <button
              className={`px-3 py-1 rounded ${
                mode === CHAT_MODES.READ
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setMode(CHAT_MODES.READ)}
            >
              智读
            </button>
          </div>
        </div>
        {mode === CHAT_MODES.READ && (
          <div className="text-gray-600 mb-4 px-4 py-2 bg-gray-50">
            选择网页内容，AI 将帮助您理解和分析。
          </div>
        )}
        <div className="p-4">
          <Bubble.List items={messages} />
        </div>
      </div>
      <div className="border-t p-4">
        <Sender onSubmit={handleSend} loading={loading} />
      </div>
    </div>
  )
}

export default Popup
