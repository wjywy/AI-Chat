import { create } from 'zustand'
import { useConversationStore } from './useConversationStore'
import type { Role } from '@pc/types/common'
import type { MessageContent } from '@pc/types/chat'

export type MessageProps = {
  content: MessageContent[] | string // 兼容旧格式
  role: Role
}

export type ChatMessageProps = Map<string, MessageProps[]>

export interface ChatStoreProps {
  messages: ChatMessageProps
  addMessage: ({ content, role }: MessageProps) => void
  addChunkMessage: (chunk: string) => void
}

export const useChatStore = create<ChatStoreProps>((set, get) => ({
  messages: new Map(),
  addMessage: ({ content, role }: MessageProps) => {
    const { selectedId } = useConversationStore.getState() // 获取实时的 selectedId
    set((state) => ({
      messages: state.messages.set(selectedId as string, [
        ...(state.messages.get(selectedId as string) || []),
        { content, role }
      ])
    }))
  },

  addChunkMessage: (chunk: string) => {
    console.log('chunk', chunk)
    const { selectedId } = useConversationStore.getState() // 获取实时的 selectedId
    set((state) => {
      const currentMessages = state.messages.get(selectedId as string) || []
      const lastMessage = currentMessages[currentMessages.length - 1]
      if (lastMessage && lastMessage.role === 'system') {
        // 如果最后一条消息是一个 chunk，则更新其内容
        lastMessage.content += chunk
      } else {
        // 否则，添加一个新的 chunk 消息
        currentMessages.push({ content: chunk, role: 'system' })
      }
      return {
        messages: state.messages.set(selectedId as string, currentMessages)
      }
    })
  }
}))
