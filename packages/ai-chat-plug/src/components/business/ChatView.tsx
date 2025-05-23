import React from 'react'
import { Bubble } from '@ant-design/x'
import { Message } from '../../types'
import { ChatInput } from '../ui/ChatInput'

// 定义这个组件需要接收的参数
type ChatViewProps = {
  messages: Message[] // 消息列表数据
  loading?: boolean // 是否正在发送消息 (可选)
  onSendMessage: (content: string) => void // 发送消息的回调函数
  onClearMessages?: () => void // 清空消息的回调函数 (可选)
}

/**
 * 普通聊天视图组件
 *
 *  专门处理聊天功能的完整界面
 * 组件组合
 * 数据流
 */
export function ChatView(props: ChatViewProps) {
  // 解构props，获取所需的数据和函数
  const {
    messages, // 消息列表
    loading = false, // 加载状态，默认false
    onSendMessage, // 发送消息的处理函数
    onClearMessages // 清空消息的处理函数
  } = props

  return (
    <div className="flex flex-col h-full">
      {/* 第1部分：消息显示区域 */}
      <div className="flex-1 overflow-auto p-4">
        {/* 条件渲染：有消息时显示消息列表，没消息时显示欢迎界面 */}
        {messages.length > 0 ? (
          // 有消息：使用Bubble.List组件显示
          <Bubble.List items={messages} />
        ) : (
          // 没消息：显示欢迎提示
          <div className="text-center text-gray-400 mt-8">
            <div className="text-4xl mb-2">💬</div>
            <div className="text-sm">开始对话吧！</div>
            <div className="text-xs text-gray-300 mt-2">我是你的AI助手，有什么可以帮你的吗？</div>
          </div>
        )}
      </div>

      {/* 第2部分：输入区域 */}
      <ChatInput placeholder="输入消息..." loading={loading} onSubmit={onSendMessage} />
    </div>
  )
}
