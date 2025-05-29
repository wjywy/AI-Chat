import { create } from 'zustand'

export interface ChatMessageProps {
  content: string
  role: 'user' | 'system'
}

export interface ChatStoreProps {
  messages: ChatMessageProps[]
  addMessage: (message: ChatMessageProps) => void
}

export const useChatStore = create<ChatStoreProps>((set, get) => ({
  messages: [],
  addMessage: (message: ChatMessageProps) => {
    set((state) => ({
      messages: [...state.messages, message]
    }))
  }
}))
