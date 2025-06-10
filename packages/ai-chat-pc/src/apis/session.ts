import { request } from '@pc/utils'

import type { ChatMessage, ChatSession } from '@pc/types/session'
import type { Data } from '@pc/utils/request'

export const sessionApi = {
  // 新建会话
  createChat: (chatTitle: string): Promise<Data<ChatSession>> => {
    return request<ChatSession>('chat/createChat', 'POST', { chatTitle })
  },

  // 获取用户所有会话
  getUserChats: (): Promise<Data<ChatSession[]>> => {
    return request<ChatSession[]>('/chat/userChat', 'GET')
  },

  // 获取单个会话接口
  getChatById: (id: string): Promise<Data<ChatSession>> => {
    return request<ChatSession>(`/chat/${id}`, 'GET')
  },

  // 更新会话标题
  updateChatTitle: (chatId: string, title: string): Promise<Data<object>> => {
    return request<object>(`/chat/updateTitle`, 'POST', { title, chatId })
  },

  // 删除会话接口
  deleteChatById: (id: string): Promise<Data<object>> => {
    return request<object>(`/chat/deleteChat/${id}`, 'GET')
  },

  // 获取该会话的所有历史消息
  getChatHistory: (id: string): Promise<Data<ChatMessage[]>> => {
    return request(`/chat/messages/${id}`)
  },

  // 分享会话（生成分享链接）
  shareChat: (chatId: string): Promise<Data<{ shareId: string }>> => {
    // 模拟数据，实际应该调用后端API
    return Promise.resolve({
      code: 1,
      msg: null,
      data: {
        shareId: `share_${chatId}_${Date.now()}`
      }
    })
  },

  // 获取分享的会话
  getSharedChat: (
    shareId: string
  ): Promise<
    Data<{
      conversation: ChatSession
      messages: ChatMessage[]
    }>
  > => {
    // 模拟数据，实际应该调用后端API
    const chatId = shareId.split('_')[1]
    return Promise.resolve({
      code: 1,
      msg: null,
      data: {
        conversation: {
          id: chatId,
          title: '分享的会话',
          isActive: true,
          userId: 1,
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString()
        },
        messages: [
          {
            id: '1',
            role: 'user',
            content: '你好，这是一条分享的消息',
            chatId: chatId,
            createdAt: new Date().toISOString(),
            imgUrl: null,
            fileContent: null
          },
          {
            id: '2',
            role: 'system',
            content: '你好！我是AI助手，很高兴为你服务。这是一个分享的会话示例。',
            chatId: chatId,
            createdAt: new Date().toISOString(),
            imgUrl: null,
            fileContent: null
          }
        ]
      }
    })
  },
  // 搜索聊天记录
  searchMessages: (keyword: string): Promise<Data<ChatMessage[]>> => {
    return request<ChatMessage[]>(`/chat/searchChat`, 'GET', { keyWord: keyword })
  }
}
