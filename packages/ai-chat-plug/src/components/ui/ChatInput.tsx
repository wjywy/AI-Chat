import React from 'react'
import { Sender } from '@ant-design/x'

// 定义组件接收的参数类型 (Props)
type ChatInputProps = {
  placeholder?: string // 输入框提示文字 (可选)
  loading?: boolean // 是否显示"发送中"状态 (可选)
  onSubmit: (content: string) => void // 发送消息的回调函数 (必需)
  disabled?: boolean // 是否禁用输入框 (可选)
  className?: string // 自定义CSS样式 (可选)
}

/**
 * 通用聊天输入框组件
 */
export function ChatInput(props: ChatInputProps) {
  // 解构props，设置默认值
  const {
    placeholder = '输入消息...', // 如果没传placeholder，就用这个默认值
    loading = false, // 如果没传loading，就用false
    onSubmit, // 这个是必需的，所以没有默认值
    disabled = false, // 如果没传disabled，就用false
    className = '' // 如果没传className，就用空字符串
  } = props

  return (
    <div className={`border-t p-4 bg-gray-50 ${className}`}>
      <Sender onSubmit={onSubmit} loading={loading} placeholder={placeholder} disabled={disabled} />
    </div>
  )
}
