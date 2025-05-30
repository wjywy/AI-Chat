import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bubble } from '@ant-design/x'
import { useTranslation } from 'react-i18next'
import AIRichInput from '@pc/components/AIRichInput'
import { useConversationStore } from '@pc/store'

type Conversation = {
  id: string
  title: string
}

const messages = [
  {
    content: 'Hello, Ant Design X!',
    role: 'user'
  }
]

export function ConversationDetail() {
  const { id } = useParams()
  const { conversations } = useConversationStore()
  const { t } = useTranslation()
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)

  useEffect(() => {
    const found = conversations.find((c) => c.id === id)
    setCurrentConversation(found || null)
  }, [conversations, id])

  return (
    <div className="p-4">
      <div className="p-4 rounded-lg shadow">
        {currentConversation ? (
          <>
            <h1 className="text-xl font-bold dark:text-white">{currentConversation.title}</h1>
            <div className="mt-4">
              <Bubble.List items={messages} />
              {/* Replaced Sender with AIRichInput */}
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
