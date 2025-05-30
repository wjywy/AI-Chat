import { request } from '@pc/utils'
import type { Data } from '@pc/utils/request'
import type { ChatMessage, ChatSession } from '@pc/types/session'

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
  }
}
