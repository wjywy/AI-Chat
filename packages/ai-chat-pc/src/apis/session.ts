import { request } from '@pc/utils'
import type { Data } from '@pc/utils/request'
import type { ChatSession, ChatMessage } from '@pc/types/session'

export const sessionApi = {
  // 获取用户所有会话
  getUserChats: (): Promise<Data<ChatSession[]>> => {
    return request<ChatSession[]>('/chat/userChat', 'GET')
  },

  // 获取单个会话接口
  getChatById: (id: string): Promise<Data<ChatSession>> => {
    return request<ChatSession>(`/chat/${id}`, 'GET')
  },

  // 删除会话接口
  deleteChatById: (id: string): Promise<Data<object>> => {
    return request<object>(`/chat/deleteChat/${id}`, 'GET')
  }
}
