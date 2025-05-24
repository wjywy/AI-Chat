import { create } from 'zustand'

type Conversation = {
  id: number
  title: string
}

interface ConversationState {
  // 核心状态
  selectedId: number | null
  conversations: Conversation[]

  // 核心操作
  setSelectedId: (id: number | null) => void
  addConversation: (conversation: Conversation) => void
  deleteConversation: (id: number) => void
  updateConversation: (id: number, updates: Partial<Conversation>) => void
}

const useConversationStore = create<ConversationState>()((set, get) => ({
  // 初始状态
  selectedId: null,
  conversations: [
    { id: 1, title: '对话1' },
    { id: 2, title: '对话2' }
  ],

  // 核心方法
  setSelectedId: (id) => set({ selectedId: id }),

  addConversation: (conversation) =>
    set({
      conversations: [...get().conversations, conversation]
    }),

  deleteConversation: (id) => {
    const { selectedId, conversations } = get()
    if (selectedId === id) {
      set({ selectedId: null })
    }
    set({
      conversations: conversations.filter((c) => c.id !== id)
    })
  },

  updateConversation: (id, updates) =>
    set({
      conversations: get().conversations.map((c) => (c.id === id ? { ...c, ...updates } : c))
    })
}))

export default useConversationStore
