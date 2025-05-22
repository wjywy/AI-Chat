// 基础消息类型
export type Message = {
  content: string
  role: 'user' | 'assistant'
}

// 对话模式
export type ChatMode = 'chat' | 'read'

// 常用常量
export const CHAT_MODES = {
  CHAT: 'chat',
  READ: 'read'
} as const

// 模型选项
export const MODEL_OPTIONS = [
  {
    value: 'gpt-4',
    label: 'GPT-4'
  },
  {
    value: 'gpt-3.5-turbo',
    label: 'GPT-3.5'
  }
]

// 模型定义
export type Model = {
  id: string
  name: string
  description: string
}

// 聊天状态
export type ChatState = {
  messages: Message[]
  selectedModel: string
  mode: ChatMode
  loading: boolean
}
