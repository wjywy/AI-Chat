// 消息类型
export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// 聊天状态类型
export type ChatState = {
  messages: Message[]
  loading: boolean
  selectedModel: string
  isSmartReading: boolean
  sendMessage: (text: string, pageContent?: PageContent) => Promise<void>
  toggleSmartReading: () => void
  setSelectedModel: (model: string) => void
  copyLastMessage: () => void
  clearMessages: () => void
}

// 页面内容类型
export type PageContent = {
  title: string
  url: string
  content: string
  excerpt?: string
  html?: string
  images?: PageImage[]
}

// 页面图片类型
export type PageImage = {
  src: string
  alt?: string
  width?: number
  height?: number
}

// 浮动气泡属性
export type ChatBubbleProps = {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

// 模型选项
export const MODEL_OPTIONS = [
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5' },
  { value: 'gpt-4', label: 'GPT-4' }
]

export * from './chat'
