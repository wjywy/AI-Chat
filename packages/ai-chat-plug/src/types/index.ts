/**
 * 基础类型定义文件
 *
 * 这个文件定义了整个项目用到的数据结构
 * 就像给项目建立一个"词汇表"，规定每种数据长什么样
 */

// 单条聊天消息的数据结构
export type Message = {
  id: string // 消息唯一标识符
  role: 'user' | 'assistant' // 消息来源：用户 或 AI助手
  content: string // 消息内容文本
  timestamp: number // 消息发送时间戳
}

// 网页内容的数据结构
export type PageContent = {
  title: string // 网页标题
  url: string // 网页链接地址
  content: string // 网页主要文本内容
  excerpt?: string // 网页摘要 (可选)
  html?: string // 网页完整HTML (可选)
  images?: PageImage[] // 网页图片列表 (可选)
}

// 网页图片的数据结构
export type PageImage = {
  src: string // 图片链接地址
  alt?: string // 图片描述文字 (可选)
  width?: number // 图片宽度 (可选)
  height?: number // 图片高度 (可选)
}

// 聊天模式定义
export type ChatMode = 'chat' | 'read'

// 聊天模式常量 (使用常量避免拼写错误)
export const CHAT_MODES = {
  CHAT: 'chat' as ChatMode, // 普通聊天模式
  READ: 'read' as ChatMode // 智读模式
}

// 浮动气泡组件的配置
export type ChatBubbleProps = {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

// AI模型选择选项
export const MODEL_OPTIONS = [
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5' },
  { value: 'gpt-4', label: 'GPT-4' }
]

// 导出聊天相关的类型定义
export * from './chat'
