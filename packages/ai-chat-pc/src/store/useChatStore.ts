import { create } from 'zustand'

import { useConversationStore } from './useConversationStore'

import type { MessageContent } from '@pc/types/chat'
import type { Role } from '@pc/types/common'

export type MessageProps = {
  content: MessageContent[] // 兼容旧格式
  role: Role
}

export type ChatMessageProps = Map<string, MessageProps[]>

export interface ChatStoreProps {
  messages: ChatMessageProps
  addMessage: ({ content, role }: MessageProps) => void
  addChunkMessage: (chunk: string) => void
}

export const useChatStore = create<ChatStoreProps>((set) => ({
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
    const { selectedId } = useConversationStore.getState() // 获取实时的 selectedId
    set((state) => {
      const currentMessages = state.messages.get(selectedId as string) || []
      const lastMessage = currentMessages[currentMessages.length - 1]

      if (lastMessage && lastMessage.role === 'system') {
        // 如果最后一条消息是系统消息，则更新其内容
        const lastContent = lastMessage.content
        const lastTextContent = lastContent[lastContent.length - 1]

        // 如果最后一个内容项是文本类型，则追加到该文本内容中
        if (lastTextContent && lastTextContent.type === 'text') {
          lastTextContent.content += chunk
        }
      } else {
        // 否则，添加一个新的系统消息，包含文本内容
        currentMessages.push({
          content: [
            {
              type: 'text',
              content: chunk
            }
          ],
          role: 'system'
        })
      }

      return {
        messages: state.messages.set(selectedId as string, currentMessages)
      }
    })
  }
}))
