import { create } from 'zustand'

import { sessionApi } from '../apis/session'

type Conversation = {
  id: string
  title: string
}

interface ConversationState {
  selectedId: string | null
  conversations: Conversation[]
  loading: boolean
  error: string | null

  setSelectedId: (id: string | null) => void
  // createConversation: (title: string) => Promise<Conversation>
  fetchConversations: () => Promise<void>
  addConversation: (conversation: Conversation) => void
  deleteConversation: (id: string) => Promise<void>
  updateConversation: (id: string, updates: Partial<Conversation>) => Promise<void>
}

export const useConversationStore = create<ConversationState>()((set, get) => ({
  // 初始状态
  selectedId: null,
  conversations: [],
  loading: false,
  error: null,

  setSelectedId: (id) => set({ selectedId: id }),

  fetchConversations: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await sessionApi.getUserChats()
      set({
        conversations: data.map((session) => ({
          id: session.id,
          title: session.title
        })),
        loading: false
      })
    } catch (error) {
      console.error(error)
      // 添加默认数据
      set({
        conversations: [
          {
            id: 'default-1',
            title: '示例会话1'
          },
          {
            id: 'default-2',
            title: '示例会话2'
          }
        ],
        loading: false,
        error: '获取会话列表失败'
      })
    }
  },

  addConversation: (conversation) =>
    set({
      conversations: [...get().conversations, conversation]
    }),

  deleteConversation: async (id) => {
    try {
      await sessionApi.deleteChatById(id)
      const { selectedId, conversations } = get()
      if (selectedId === id) {
        set({ selectedId: null })
      }
      set({
        conversations: conversations.filter((c) => c.id !== id)
      })
    } catch (error) {
      console.error(error)
      set({ error: '删除会话失败' })
    }
  },

  updateConversation: async (id, updates) => {
    try {
      const { title } = updates

      if (!title) {
        set({ error: '标题不能为空' })
        return
      }

      await sessionApi.updateChatTitle(id, title)
      set({
        conversations: get().conversations.map((c) => (c.id === id ? { ...c, ...updates } : c))
      })
    } catch (error) {
      console.error(error)
      set({ error: '更新会话失败' })
    }
  }
}))
