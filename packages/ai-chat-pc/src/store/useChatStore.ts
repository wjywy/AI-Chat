import { create } from 'zustand'
import { useConversationStore } from './useConversationStore'
import type { Role } from '@pc/types/common'

export type MessageProps = {
  content: string
  role: Role
}

export type ChatMessageProps = Map<string, MessageProps[]>

export interface ChatStoreProps {
  messages: ChatMessageProps
  addMessage: ({ content, role }: MessageProps) => void
}

export const useChatStore = create<ChatStoreProps>((set, get) => ({
  messages: new Map(),
  addMessage: ({ content, role }: MessageProps) => {
    const selectedId = useConversationStore.getState().selectedId // 获取实时的 selectedId
    set((state) => ({
      messages: state.messages.set(selectedId as string, [
        ...(state.messages.get(selectedId as string) || []),
        { content, role }
      ])
    }))
  }
}))
