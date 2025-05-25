import { create } from 'zustand'
import { sessionApi } from '../apis/session'
import type { ChatSession } from '../types/session'

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
  fetchConversations: () => Promise<void>
  addConversation: (conversation: Conversation) => void
  deleteConversation: (id: string) => Promise<void>
  updateConversation: (id: string, updates: Partial<Conversation>) => Promise<void>
}

const useConversationStore = create<ConversationState>()((set, get) => ({
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
      set({ error: '获取会话列表失败', loading: false })
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
      set({ error: '删除会话失败' })
    }
  },

  updateConversation: async (id, updates) => {
    try {
      await sessionApi.getChatById(id) // 假设更新是通过获取最新数据实现的
      set({
        conversations: get().conversations.map((c) => (c.id === id ? { ...c, ...updates } : c))
      })
    } catch (error) {
      set({ error: '更新会话失败' })
    }
  }
}))

export default useConversationStore
