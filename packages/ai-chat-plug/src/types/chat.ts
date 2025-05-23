/**
 * 聊天功能专用类型定义
 */

// AI模型的详细信息
export type Model = {
  id: string // 模型唯一标识 (如: 'gpt-3.5-turbo')
  name: string // 模型显示名称 (如: 'GPT-3.5')
  description: string // 模型描述信息
}

// 消息发送状态
export type MessageStatus = 'sending' | 'sent' | 'failed'

// 单个聊天会话的信息
export type ChatSession = {
  id: string // 会话唯一标识
  title: string // 会话标题
  createdAt: number // 创建时间戳
  lastMessageAt: number // 最后一条消息时间戳
}

// 扩展的聊天消息 (在基础Message上增加状态)
export type ChatMessage = {
  id: string // 消息ID
  role: 'user' | 'assistant' // 消息角色
  content: string // 消息内容
  timestamp: number // 发送时间
  status?: MessageStatus // 发送状态 (可选)
}
