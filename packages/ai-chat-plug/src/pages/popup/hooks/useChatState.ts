import { useState } from 'react'
import { CHAT_MODES } from '../../../types'

/**
 * 聊天状态管理Hook
 */
export function useChatState() {
  // === 状态定义 ===
  // 聊天模式：'chat' 或 'read'
  const [mode, setMode] = useState(CHAT_MODES.CHAT)

  // 消息列表：存储所有消息
  const [messages, setMessages] = useState([])

  // 加载状态：显示"AI正在回复..."
  const [loading, setLoading] = useState(false)

  // === 核心功能函数 ===

  // 发送消息
  function sendMessage(content) {
    // 检查是否为空消息
    if (!content.trim()) return

    // 1. 添加用户消息
    const userMessage = {
      id: Date.now().toString(),
      content: content,
      role: 'user',
      timestamp: Date.now()
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])

    // 2. 显示加载状态
    setLoading(true)

    // 3. 模拟AI回复
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: '我是AI助手，我收到了您的消息。', // 固定回复
        role: 'assistant',
        timestamp: Date.now()
      }

      setMessages((currentMessages) => [...currentMessages, aiMessage])
      setLoading(false)
    }, 1000) // 1秒后回复
  }

  // 清空消息
  function clearMessages() {
    setMessages([])
  }

  // 切换模式
  function switchMode(newMode) {
    setMode(newMode)
  }

  // === 返回值 ===
  return {
    // 状态
    mode,
    messages,
    loading,

    // 操作函数
    setMode: switchMode,
    sendMessage,
    clearMessages,

    // 计算属性（便利属性）
    hasMessages: messages.length > 0,
    isReadMode: mode === CHAT_MODES.READ,
    isChatMode: mode === CHAT_MODES.CHAT
  }
}
