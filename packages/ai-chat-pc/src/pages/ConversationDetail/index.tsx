import { Bubble } from '@ant-design/x'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import AIRichInput from '@pc/components/AIRichInput'
import { useConversationStore, useChatStore } from '@pc/store'

type Conversation = {
  id: string
  title: string
}

export function ConversationDetail() {
  const { id } = useParams()
  const { conversations } = useConversationStore()
  const { messages } = useChatStore()
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)

  useEffect(() => {
    const found = conversations.find((c) => c.id === id)
    setCurrentConversation(found || null)
  }, [conversations, id])

  const chatMessages = id ? messages.get(id) || [] : []

  return (
    <div className="p-4">
      <div className="p-4 rounded-lg shadow">
        {currentConversation ? (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold dark:text-white">{currentConversation.title}</h1>
            </div>
            <div className="mt-4">
              <Bubble.List items={chatMessages} />
              <AIRichInput />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">not found</div>
        )}
      </div>
    </div>
  )
}
