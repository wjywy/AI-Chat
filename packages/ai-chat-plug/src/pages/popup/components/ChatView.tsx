import React from 'react'
import { ChatView as BaseChatView } from '../../../components'
import { useChatState } from '../hooks/useChatState'

/**
 * Popup页面的聊天视图组件-容器组件
 */
export function ChatView() {
  // 从自定义Hook获取聊天相关的状态和方法
  const {
    messages, // 消息列表
    loading, // 加载状态
    sendMessage, // 发送消息方法
    clearMessages // 清空消息方法
  } = useChatState()

  // 将状态和方法传递给UI展示组件
  return (
    <BaseChatView
      messages={messages}
      loading={loading}
      onSendMessage={sendMessage}
      onClearMessages={clearMessages}
    />
  )
}

export default ChatView
